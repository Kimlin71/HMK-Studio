// Makes one fixed demo PDF per pattern in public/patterns/: pattern-1-demo.pdf and so on. One A4 page each.
// Run once, and again when a pattern, its picture or the demo measurements change:
//
//   npm run make:pattern-pdf
//
// No dependencies: Node 22.18+ reads the TypeScript data directly, and the PDF is written by hand (Helvetica is a built-in PDF font,
// the JPEG picture is embedded as it is). The pages are dummies: the picture of the pattern, a prototype notice and the demo
// measurements of the fictional customer "Kund Demo". Nothing is fitted or generated per order.

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { demoMeasurements, measurementSets } from '../src/content/pattern.ts'
import { patternProducts } from '../src/content/patterns.ts'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')

const PAGE_W = 595.28
const PAGE_H = 841.89
const MARGIN = 42

const labels = {
  shoulder: 'Axelbredd / Shoulder width',
  bust: 'Bröstvidd / Bust',
  upperBody: 'Överkroppslängd / Upper-body length',
  sleeve: 'Ärmlängd / Sleeve length',
  length: 'Önskad plagglängd / Desired garment length',
  waist: 'Midja / Waist',
  hip: 'Stuss / Hip',
  inseam: 'Innerbenslängd / Inseam',
  crotch: 'Skrevlängd / Crotch length',
}

// Text is written in WinAnsi (one byte per character), which covers å, ä and ö. The en dash and curly quotes are replaced.
const plain = (text) => text.replace(/[’‘]/g, "'")
const escape = (text) => plain(text).replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)')
const num = (value) => value.toFixed(2)

// Width and height of a JPEG, read from its start-of-frame marker.
function jpegSize(bytes) {
  let offset = 2
  while (offset < bytes.length) {
    if (bytes[offset] !== 0xff) throw new Error('Not a JPEG')
    const marker = bytes[offset + 1]
    const length = bytes.readUInt16BE(offset + 2)
    if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
      return { height: bytes.readUInt16BE(offset + 5), width: bytes.readUInt16BE(offset + 7), components: bytes[offset + 9] }
    }
    offset += 2 + length
  }
  throw new Error('No size found in the JPEG')
}

function buildPdf(product) {
  const ops = []
  const text = (x, y, size, content, { bold = false, grey = 0.15 } = {}) => {
    ops.push(`BT /${bold ? 'F2' : 'F1'} ${size} Tf ${grey} g ${num(x)} ${num(y)} Td (${escape(content)}) Tj ET`)
  }

  text(MARGIN, PAGE_H - 62, 20, product.name, { bold: true })
  ops.push(`q 0.65 0.22 0.29 rg ${num(MARGIN)} ${num(PAGE_H - 106)} ${num(PAGE_W - 2 * MARGIN)} 28 re f Q`)
  text(MARGIN + 10, PAGE_H - 96, 11, 'PROTOTYP, INTE ETT RIKTIGT MÖNSTER  /  PROTOTYPE, NOT A REAL PATTERN', { bold: true, grey: 1 })
  text(MARGIN, PAGE_H - 126, 9.5, 'Demo för Hyang-Mee Studio. Ett dummymönster: inget mönster har anpassats eller ritats efter måtten.')
  text(MARGIN, PAGE_H - 139, 9.5, 'Demo for Hyang-Mee Studio. A dummy pattern: nothing has been fitted or drawn from the measurements.')

  text(MARGIN, PAGE_H - 170, 11, 'Mått för / Measurements for: Kund Demo (fiktiv kund / fictional customer)', { bold: true })
  const keys = measurementSets[product.measurements]
  keys.forEach((key, index) => {
    const y = PAGE_H - 190 - index * 15
    text(MARGIN, y, 10.5, labels[key])
    text(MARGIN + 270, y, 10.5, `${demoMeasurements[key]} cm`, { bold: true })
  })

  // The picture of the pattern, scaled to fit the space under the measurements.
  const jpeg = readFileSync(resolve(root, 'public', product.image.slice(1)))
  const { width, height, components } = jpegSize(jpeg)
  const boxW = PAGE_W - 2 * MARGIN
  const boxH = PAGE_H - 190 - keys.length * 15 - 80
  const scale = Math.min(boxW / width, boxH / height)
  const drawW = width * scale
  const drawH = height * scale
  const x = (PAGE_W - drawW) / 2
  const y = 56 + (boxH - drawH)
  ops.push(`q ${num(drawW)} 0 0 ${num(drawH)} ${num(x)} ${num(y)} cm /Im1 Do Q`)

  text(MARGIN, 36, 8, 'Fast demofil / fixed demo file. Inget sparas eller skickas. Nothing is saved or sent.', { grey: 0.4 })

  const content = ops.join('\n')
  const objects = [
    { dict: '<< /Type /Catalog /Pages 2 0 R >>' },
    { dict: '<< /Type /Pages /Kids [3 0 R] /Count 1 >>' },
    { dict: `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_W} ${PAGE_H}] /Contents 6 0 R /Resources << /Font << /F1 4 0 R /F2 5 0 R >> /XObject << /Im1 7 0 R >> >> >>` },
    { dict: '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>' },
    { dict: '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>' },
    { dict: `<< /Length ${Buffer.byteLength(content, 'latin1')} >>`, stream: Buffer.from(content, 'latin1') },
    {
      dict: `<< /Type /XObject /Subtype /Image /Width ${width} /Height ${height} /ColorSpace /${components === 1 ? 'DeviceGray' : 'DeviceRGB'} /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpeg.length} >>`,
      stream: jpeg,
    },
    { dict: `<< /Title (${escape(product.name)} - prototype demo pattern) /Producer (scripts/make-pattern-pdf.mjs) >>` },
  ]

  const parts = [Buffer.from('%PDF-1.4\n%\xe2\xe3\xcf\xd3\n', 'latin1')]
  const offsets = []
  let size = parts[0].length
  objects.forEach((object, index) => {
    const head = Buffer.from(`${index + 1} 0 obj\n${object.dict}\n`, 'latin1')
    const body = object.stream ? [Buffer.from('stream\n', 'latin1'), object.stream, Buffer.from('\nendstream\n', 'latin1')] : []
    const tail = Buffer.from('endobj\n', 'latin1')
    offsets.push(size)
    for (const piece of [head, ...body, tail]) {
      parts.push(piece)
      size += piece.length
    }
  })
  const xref = `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n${offsets.map((offset) => `${String(offset).padStart(10, '0')} 00000 n \n`).join('')}`
  parts.push(Buffer.from(`${xref}trailer\n<< /Size ${objects.length + 1} /Root 1 0 R /Info 8 0 R >>\nstartxref\n${size}\n%%EOF\n`, 'latin1'))
  return Buffer.concat(parts)
}

mkdirSync(resolve(root, 'public/patterns'), { recursive: true })
for (const product of patternProducts) {
  const file = resolve(root, 'public', product.pdf.slice(1))
  const pdf = buildPdf(product)
  writeFileSync(file, pdf)
  console.log(`Wrote ${file} (${pdf.length} bytes)`)
}

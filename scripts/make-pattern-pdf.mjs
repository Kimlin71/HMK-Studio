// Makes public/patterns/proportion-study-01-demo.pdf: one fixed A4 page for the prototype.
// Run once, and again only when the pattern rules or the demo measurements change:
//
//   node scripts/make-pattern-pdf.mjs
//
// No dependencies: Node 22.18+ reads the TypeScript source directly, and the PDF is written by hand (Helvetica is a built-in PDF font).
// The pieces are drawn by generatePattern() from src/content/pattern.ts for the fictional customer "Kund Demo".
// The file is a fixed asset, not generated per order, and says so on the page.

import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { demoMeasurements, generatePattern, measurementKeys } from '../src/content/pattern.ts'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const output = resolve(root, 'public/patterns/proportion-study-01-demo.pdf')

const PAGE_W = 595.28
const PAGE_H = 841.89
const MARGIN = 42
const SCALE = 5.6 // PDF points per cm of pattern, about 1:5

// Text is written in WinAnsi (one byte per character), which covers å, ä and ö. Keep to plain characters.
const escape = (text) => text.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)')
const num = (value) => value.toFixed(2)

const ops = []
const text = (x, y, size, content, { bold = false, anchor = 'start', grey = 0.15 } = {}) => {
  const width = content.length * size * 0.5 // Helvetica averages about half an em per character
  const startX = anchor === 'middle' ? x - width / 2 : anchor === 'end' ? x - width : x
  ops.push(`BT /${bold ? 'F2' : 'F1'} ${size} Tf ${grey} g ${num(startX)} ${num(y)} Td (${escape(content)}) Tj ET`)
}
const path = (points, { width = 1, dash = null, closed = false, rgb = '0.06 0.12 0.42' } = {}) => {
  const [first, ...rest] = points
  ops.push(`q ${rgb} RG ${num(width)} w ${dash ? `[${dash}] 0 d` : '[] 0 d'} 1 j 1 J ${num(first[0])} ${num(first[1])} m ${rest.map(([x, y]) => `${num(x)} ${num(y)} l`).join(' ')} ${closed ? 'h' : ''} S Q`)
}

// Title block.
text(MARGIN, PAGE_H - 62, 22, 'Proportion Study 01', { bold: true })
text(MARGIN, PAGE_H - 84, 12, 'Måttanpassat mönster, skjorta  /  Measured pattern, shirt')
ops.push(`q 0.65 0.22 0.29 rg ${num(MARGIN)} ${num(PAGE_H - 126)} ${num(PAGE_W - 2 * MARGIN)} 28 re f Q`)
text(MARGIN + 10, PAGE_H - 116, 11, 'PROTOTYP, INTE ETT RIKTIGT MÖNSTER  /  PROTOTYPE, NOT A REAL PATTERN', { bold: true, grey: 1 })
text(MARGIN, PAGE_H - 144, 9.5, 'Demo för Hyang-Mee Studio. Ritat för demonstration, inte ett provsytt mönster.')
text(MARGIN, PAGE_H - 157, 9.5, 'Demo for Hyang-Mee Studio. Drawn for demonstration, not a tested pattern.')

// Measurements of the fictional customer.
const labels = {
  shoulder: ['Axelbredd', 'Shoulder width'],
  bust: ['Bröstvidd', 'Bust'],
  upperBody: ['Överkroppslängd', 'Upper-body length'],
  sleeve: ['Ärmlängd', 'Sleeve length'],
  length: ['Önskad plagglängd', 'Desired garment length'],
}
const shortLabels = { shoulder: 'Axelbredd', bust: 'Bröstvidd', upperBody: 'Överkropp', sleeve: 'Ärmlängd', length: 'Längd' }
text(MARGIN, PAGE_H - 186, 11, 'Mått för / Measurements for: Kund Demo (fiktiv kund / fictional customer)', { bold: true })
measurementKeys.forEach((key, index) => {
  const y = PAGE_H - 206 - index * 15
  text(MARGIN, y, 10.5, `${labels[key][0]} / ${labels[key][1]}`)
  text(MARGIN + 250, y, 10.5, `${demoMeasurements[key]} cm`, { bold: true })
})

// Pieces in a row, tops aligned.
const pieces = generatePattern(demoMeasurements)
const gap = 22
const totalWidth = pieces.reduce((sum, piece) => sum + piece.width * SCALE, 0) + gap * (pieces.length - 1)
let cursor = (PAGE_W - totalWidth) / 2
const top = PAGE_H - 310
const names = { back: ['Bakstycke', 'Back'], front: ['Framstycke', 'Front'], sleeve: ['Ärm', 'Sleeve'] }
const toPage = (piece, originX) => ([x, y]) => [originX + (x - piece.minX) * SCALE, top - y * SCALE]

for (const piece of pieces) {
  const map = toPage(piece, cursor)
  path(piece.outline.map(map), { width: 1.4, closed: true })
  const fold = piece.foldEdge ? piece.edges.find((edge) => edge.id === piece.foldEdge) : null
  if (fold) path(fold.points.map(map), { width: 1.6, dash: '5 3', rgb: '0.65 0.22 0.29' })
  const grain = [piece.grainLine.from, piece.grainLine.to].map(map)
  path(grain, { width: 0.8, rgb: '0.35 0.29 0.21' })
  for (const mark of piece.marks) {
    const [a, b] = [mark.from, mark.to].map(map)
    path([a, b], { width: 0.9, rgb: '0.65 0.22 0.29' })
    const [lx, ly] = map(mark.label.at)
    text(lx, ly, 8, shortLabels[mark.key], { anchor: mark.label.anchor, bold: true })
    text(lx, ly - 10, 8, `${demoMeasurements[mark.key]} cm`, { anchor: mark.label.anchor })
  }
  const [nx, ny] = map(piece.nameAt)
  text(nx, ny, 10, names[piece.id][0], { bold: true })
  text(nx, ny - 11, 9, names[piece.id][1])
  cursor += piece.width * SCALE + gap
}

text(MARGIN, top - 62 * SCALE - 34, 9, 'Streckad kant: läggs mot tygets vikning. Pil: trådriktning. Mått i cm. Skala ca 1:5, inte i full storlek.')
text(MARGIN, top - 62 * SCALE - 47, 9, 'Dashed edge: placed on the fold. Line: grain direction. Measurements in cm. Scale about 1:5, not full size.')
text(MARGIN, 40, 8, 'Fast demofil / fixed demo file. Inget sparas eller skickas. Nothing is saved or sent.', { grey: 0.4 })

// PDF file: catalog, pages, page, two fonts, content stream.
const content = ops.join('\n')
const objects = [
  '<< /Type /Catalog /Pages 2 0 R >>',
  '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
  `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_W} ${PAGE_H}] /Contents 6 0 R /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> >>`,
  '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>',
  '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>',
  `<< /Length ${Buffer.byteLength(content, 'latin1')} >>\nstream\n${content}\nendstream`,
  '<< /Title (Proportion Study 01 - prototype demo pattern) /Producer (scripts/make-pattern-pdf.mjs) >>',
]

let pdf = '%PDF-1.4\n'
const offsets = []
objects.forEach((body, index) => {
  offsets.push(Buffer.byteLength(pdf, 'latin1'))
  pdf += `${index + 1} 0 obj\n${body}\nendobj\n`
})
const xref = Buffer.byteLength(pdf, 'latin1')
pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n${offsets.map((offset) => `${String(offset).padStart(10, '0')} 00000 n \n`).join('')}`
pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R /Info 7 0 R >>\nstartxref\n${xref}\n%%EOF\n`

mkdirSync(dirname(output), { recursive: true })
writeFileSync(output, Buffer.from(pdf, 'latin1'))
console.log(`Wrote ${output} (${Buffer.byteLength(pdf, 'latin1')} bytes)`)

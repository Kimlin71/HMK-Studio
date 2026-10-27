import type { ConnectKind, ConnectParts, ElementKind, ModuleColour } from '../content/jewellery'

// Graphic colour studies only. These are drawings, not photographs and not construction drawings.

const tone = (colour: ModuleColour) => `var(--tone-${colour})`
const EDGE = 'var(--drawing-edge)'
const detail = (colour: ModuleColour) =>
  colour === 'indigo' || colour === 'ochre' || colour === 'vandyke' ? 'rgba(255, 252, 245, 0.55)' : 'rgba(15, 30, 107, 0.45)'

export type Placement = { x: number; y: number }

export function Cord({ d, colour }: { d: string; colour: ModuleColour }) {
  return (
    <>
      <path d={d} fill="none" stroke={EDGE} strokeLinecap="round" strokeWidth="4.6" />
      <path d={d} fill="none" stroke={tone(colour)} strokeLinecap="round" strokeWidth="3" />
    </>
  )
}

export function Ring({ x, y, r, colour }: Placement & { r: number; colour: ModuleColour }) {
  return (
    <>
      <circle cx={x} cy={y} fill="none" r={r} stroke={EDGE} strokeWidth="4.6" />
      <circle cx={x} cy={y} fill="none" r={r} stroke={tone(colour)} strokeWidth="3" />
    </>
  )
}

export function Knot({ x, y, size, colour }: Placement & { size: number; colour: ModuleColour }) {
  const half = size / 2
  return (
    <g>
      <path d={`M${x} ${y - size}L${x + size} ${y}L${x} ${y + size}L${x - size} ${y}Z`} fill={tone(colour)} stroke={EDGE} strokeLinejoin="round" strokeWidth="1" />
      <path d={`M${x} ${y - half}L${x + half} ${y}L${x} ${y + half}L${x - half} ${y}Z`} fill="none" stroke={detail(colour)} strokeLinejoin="round" strokeWidth="0.9" />
      <path d={`M${x - half} ${y - half}L${x + half} ${y + half}M${x + half} ${y - half}L${x - half} ${y + half}`} fill="none" stroke={detail(colour)} strokeWidth="0.9" />
    </g>
  )
}

export function Bead({ x, y, r, colour }: Placement & { r: number; colour: ModuleColour }) {
  return (
    <g>
      <circle cx={x} cy={y} fill={tone(colour)} r={r} stroke={EDGE} strokeWidth="1" />
      <circle cx={x} cy={y} fill="none" r={r * 0.62} stroke={detail(colour)} strokeWidth="0.9" />
      <circle cx={x} cy={y} fill="var(--ground, var(--white))" r={r * 0.22} stroke={EDGE} strokeWidth="0.8" />
    </g>
  )
}

const strands = [-3, -2, -1, 0, 1, 2, 3]

export function Tassel({ x, top, height, width, colour }: { x: number; top: number; height: number; width: number; colour: ModuleColour }) {
  const bottom = top + height
  return (
    <g>
      <path d={`M${x - 3.5} ${top + 6}L${x + 3.5} ${top + 6}L${x + width / 2} ${bottom}Q${x} ${bottom + 5} ${x - width / 2} ${bottom}Z`} fill={tone(colour)} stroke={EDGE} strokeLinejoin="round" strokeWidth="1" />
      {strands.map((k) => (
        <line key={k} stroke={detail(colour)} strokeWidth="0.7" x1={x + k * 1.1} x2={x + (k * width) / 7.5} y1={top + 8} y2={bottom} />
      ))}
      <rect fill={tone(colour)} height="6" rx="1.5" stroke={EDGE} strokeWidth="1" width="8" x={x - 4} y={top} />
    </g>
  )
}

function Layout({ kind, parts }: { kind: ConnectKind; parts: ConnectParts }) {
  const { knot, cord, bead, tassel, accent } = parts

  switch (kind) {
    case 'pendant':
      return (
        <>
          <Cord colour={cord} d="M14 0C20 62 48 82 60 88C72 82 100 62 106 0" />
          <Knot colour={knot} size={13} x={60} y={100} />
          {bead ? <Bead colour={bead} r={15} x={60} y={132} /> : null}
        </>
      )
    case 'earrings-quiet':
      return (
        <>
          {[38, 82].map((x) => (
            <g key={x}>
              <Ring colour={cord} r={4} x={x} y={18} />
              <Cord colour={cord} d={`M${x} 22L${x} 52`} />
              <Knot colour={knot} size={11} x={x} y={62} />
            </g>
          ))}
        </>
      )
    case 'earrings-long':
      return (
        <>
          {[38, 82].map((x) => (
            <g key={x}>
              <Ring colour={cord} r={4} x={x} y={12} />
              <Cord colour={cord} d={`M${x} 16L${x} 36`} />
              <Knot colour={knot} size={10} x={x} y={46} />
              {tassel ? <Tassel colour={tassel} height={62} top={56} width={18} x={x} /> : null}
            </g>
          ))}
        </>
      )
    case 'bracelet':
      return (
        <>
          <Cord colour={cord} d="M14 80A46 30 0 1 1 106 80A46 30 0 1 1 14 80" />
          <Knot colour={knot} size={11} x={60} y={50} />
          {bead ? (
            <>
              <Bead colour={bead} r={8} x={14} y={80} />
              <Bead colour={bead} r={8} x={106} y={80} />
            </>
          ) : null}
          {accent ? <Bead colour={accent} r={5} x={60} y={110} /> : null}
        </>
      )
    case 'bag-charm':
      return (
        <>
          <Ring colour={cord} r={9} x={60} y={14} />
          <Cord colour={cord} d="M60 23L60 66" />
          <Knot colour={knot} size={12} x={60} y={76} />
          {bead ? <Bead colour={bead} r={12} x={60} y={106} /> : null}
          {tassel ? <Tassel colour={tassel} height={36} top={116} width={20} x={60} /> : null}
        </>
      )
  }
}

export function ConnectPieceDrawing({ kind, parts }: { kind: ConnectKind; parts: ConnectParts }) {
  return (
    <svg aria-hidden="true" className="connect-drawing" focusable="false" viewBox={kind === 'earrings-quiet' ? '20 4 80 80' : '0 0 120 160'}>
      <Layout kind={kind} parts={parts} />
    </svg>
  )
}

export function ConnectElementDrawing({ kind, colour }: { kind: ElementKind; colour: ModuleColour }) {
  return (
    <svg aria-hidden="true" className="connect-drawing connect-drawing--element" focusable="false" viewBox="0 0 48 56">
      {kind === 'knot' ? <Knot colour={colour} size={17} x={24} y={28} /> : null}
      {kind === 'bead' ? <Bead colour={colour} r={19} x={24} y={28} /> : null}
      {kind === 'tassel' ? <Tassel colour={colour} height={40} top={4} width={24} x={24} /> : null}
    </svg>
  )
}

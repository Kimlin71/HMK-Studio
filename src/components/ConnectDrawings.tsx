import type { ElementKind, ModuleColour } from '../content/jewellery'
import { detail, EDGE, tone } from './drawingStyle'

// Graphic colour studies only. These are drawings, not photographs and not construction drawings.

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

export function ConnectElementDrawing({ kind, colour }: { kind: ElementKind; colour: ModuleColour }) {
  return (
    <svg aria-hidden="true" className="connect-drawing connect-drawing--element" focusable="false" viewBox="0 0 48 56">
      {kind === 'knot' ? <Knot colour={colour} size={17} x={24} y={28} /> : null}
      {kind === 'bead' ? <Bead colour={colour} r={19} x={24} y={28} /> : null}
      {kind === 'tassel' ? <Tassel colour={colour} height={40} top={4} width={24} x={24} /> : null}
    </svg>
  )
}

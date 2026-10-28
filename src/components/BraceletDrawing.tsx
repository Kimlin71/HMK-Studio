import { braceletStyles, type BraceletDesign } from '../content/bracelet'
import type { ModuleColour } from '../content/jewellery'
import { detail, EDGE, tone } from './drawingStyle'
import { SignaturePearlShape } from './SignaturePearlDrawing'

// Graphic colour study only: a drawing, not a photograph and not a construction drawing.
// The signature pearl is always drawn once, in the centre, whatever the design.

const WIDTH = 440
const CENTRE = WIDTH / 2
const BASE_Y = 70
const SAG = 24
const SPACING = 36
const BEAD_RADIUS = 13
const SIGNATURE_RADIUS = 19

// Quadratic cord: the ends sit at BASE_Y and the middle hangs SAG/2 lower, so the bracelet reads as lying on a surface.
const CORD_PATH = `M10 ${BASE_Y}Q${CENTRE} ${BASE_Y + SAG} ${WIDTH - 10} ${BASE_Y}`
const cordY = (x: number) => {
  const t = (x - 10) / (WIDTH - 20)
  return BASE_Y + 2 * t * (1 - t) * SAG
}

function KnotBand({ x, colour }: { x: number; colour: ModuleColour }) {
  const y = cordY(x)
  return (
    <g>
      <path d={`M${x} ${y - 9}L${x + 9} ${y}L${x} ${y + 9}L${x - 9} ${y}Z`} fill={tone(colour)} stroke={EDGE} strokeLinejoin="round" strokeWidth="1" />
      <path d={`M${x - 4.5} ${y - 4.5}L${x + 4.5} ${y + 4.5}M${x + 4.5} ${y - 4.5}L${x - 4.5} ${y + 4.5}`} fill="none" stroke={detail(colour)} strokeWidth="0.9" />
    </g>
  )
}

function Pearl({ x, r, colour }: { x: number; r: number; colour: ModuleColour }) {
  const y = cordY(x)
  return (
    <g className="bracelet-drawing__bead">
      <circle cx={x} cy={y} fill={tone(colour)} r={r} stroke={EDGE} strokeWidth="1" />
      <ellipse cx={x - r * 0.3} cy={y - r * 0.35} fill="rgba(255, 252, 245, 0.6)" rx={r * 0.3} ry={r * 0.2} transform={`rotate(-30 ${x - r * 0.3} ${y - r * 0.35})`} />
    </g>
  )
}

function SignaturePearl({ x, r, design }: { x: number; r: number; design: BraceletDesign }) {
  const y = cordY(x)
  return (
    <g className="bracelet-drawing__signature">
      <circle cx={x} cy={y} fill="none" r={r + 5} stroke={EDGE} strokeDasharray="2 3" strokeWidth="1" />
      <SignaturePearlShape pearl={design.signature} r={r} x={x} y={y} />
    </g>
  )
}

function Crystal({ x, r, colour }: { x: number; r: number; colour: ModuleColour }) {
  const y = cordY(x)
  const points = [0, 1, 2, 3, 4, 5]
    .map((k) => {
      const angle = (Math.PI / 3) * k - Math.PI / 6
      return `${(x + r * Math.cos(angle)).toFixed(2)} ${(y + r * Math.sin(angle)).toFixed(2)}`
    })
    .join('L')
  return (
    <g className="bracelet-drawing__bead">
      <path d={`M${points}Z`} fill={tone(colour)} stroke={EDGE} strokeLinejoin="round" strokeWidth="1" />
      <path d={`M${x} ${y - r}L${x - r * 0.5} ${y}L${x} ${y + r}M${x} ${y - r}L${x + r * 0.5} ${y}L${x} ${y + r}M${x - r * 0.5} ${y}L${x + r * 0.5} ${y}`} fill="none" stroke={detail(colour)} strokeWidth="0.9" />
    </g>
  )
}

export function BraceletDrawing({ design }: { design: BraceletDesign }) {
  const style = braceletStyles[design.style]
  const sideCount = (style.beadCount - 1) / 2
  const offsets = Array.from({ length: sideCount }, (_, i) => (i + 1) * SPACING)
  const groupHalf = sideCount * SPACING
  const knotXs = [groupHalf + 24, groupHalf + 46]

  return (
    <svg aria-hidden="true" className="bracelet-drawing" focusable="false" viewBox={`0 0 ${WIDTH} 130`}>
      <path d={CORD_PATH} fill="none" stroke={EDGE} strokeLinecap="round" strokeWidth="5.6" />
      <path d={CORD_PATH} fill="none" stroke={tone(design.cord)} strokeLinecap="round" strokeWidth="4" />
      {style.knotBands ? knotXs.flatMap((offset) => [CENTRE - offset, CENTRE + offset]).map((x) => <KnotBand colour={design.cord} key={x} x={x} />) : null}
      {offsets.flatMap((offset) => [CENTRE - offset, CENTRE + offset]).map((x) =>
        style.beadType === 'crystal'
          ? <Crystal colour={design.beadColour} key={x} r={BEAD_RADIUS} x={x} />
          : <Pearl colour={design.beadColour} key={x} r={BEAD_RADIUS} x={x} />,
      )}
      <SignaturePearl design={design} r={SIGNATURE_RADIUS} x={CENTRE} />
    </svg>
  )
}

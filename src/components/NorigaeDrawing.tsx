import type { NorigaeDesign, TasselLengthId } from '../content/norigae'
import { Bead, Cord, Knot, Ring, Tassel } from './ConnectDrawings'
import { SignaturePearlShape } from './SignaturePearlDrawing'

// Graphic study of a Norigae built from the shared CONNECT drawing primitives. Not a photograph and not a construction drawing.
// Top to bottom: hanging loop, knot, pendant (signature pearl, always drawn), optional second element, tassel.

const tasselHeights: Record<TasselLengthId, number> = { short: 30, medium: 50, long: 72 }

const CENTRE = 60
const KNOT_Y = 58
const PEARL_Y = 90
const SECOND_Y = 124

export function NorigaeDrawing({ design }: { design: NorigaeDesign }) {
  const { knotStyle, knotColour, cordColour, pendant, secondElement, secondColour, tasselColour, tasselLength } = design
  const tasselTop = secondElement === 'none' ? 112 : 142
  const tasselHeight = tasselHeights[tasselLength]

  return (
    <svg aria-hidden="true" className="norigae-drawing" focusable="false" viewBox="0 0 120 230">
      <Ring colour={cordColour} r={8} x={CENTRE} y={14} />
      <Cord colour={cordColour} d={`M${CENTRE} 22L${CENTRE} ${tasselTop}`} />
      {knotStyle === 'layered' ? <Knot colour={cordColour} size={20} x={CENTRE} y={KNOT_Y} /> : null}
      {knotStyle === 'ringed' ? <Ring colour={cordColour} r={19} x={CENTRE} y={KNOT_Y} /> : null}
      <Knot colour={knotColour} size={knotStyle === 'layered' ? 13 : 14} x={CENTRE} y={KNOT_Y} />
      <SignaturePearlShape pearl={pendant} r={15} x={CENTRE} y={PEARL_Y} />
      {secondElement === 'bead' ? <Bead colour={secondColour} r={10} x={CENTRE} y={SECOND_Y} /> : null}
      {secondElement === 'knot' ? <Knot colour={secondColour} size={10} x={CENTRE} y={SECOND_Y} /> : null}
      <Tassel colour={tasselColour} height={tasselHeight} top={tasselTop} width={22} x={CENTRE} />
    </svg>
  )
}

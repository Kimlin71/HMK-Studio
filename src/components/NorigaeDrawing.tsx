import type { NorigaeDesign, TasselLengthId } from '../content/norigae'
import { Cord, Knot, Ring, Tassel } from './ConnectDrawings'
import { SignaturePearlShape } from './SignaturePearlDrawing'

// Graphic study of a Norigae built from the shared CONNECT drawing primitives. Not a photograph and not a construction drawing.
// Top to bottom: hanging loop, knot, pendant (signature pearl, always drawn), tassel.

const tasselHeights: Record<TasselLengthId, number> = { short: 30, medium: 50, long: 72 }

const CENTRE = 60
const KNOT_Y = 58
const PEARL_Y = 90
const TASSEL_TOP = 112

export function NorigaeDrawing({ design }: { design: NorigaeDesign }) {
  const { knotColour, cordColour, pendant, tasselColour, tasselLength } = design

  return (
    <svg aria-hidden="true" className="norigae-drawing" focusable="false" viewBox="0 0 120 230">
      <Ring colour={cordColour} r={8} x={CENTRE} y={14} />
      <Cord colour={cordColour} d={`M${CENTRE} 22L${CENTRE} ${TASSEL_TOP}`} />
      <Knot colour={knotColour} size={14} x={CENTRE} y={KNOT_Y} />
      <SignaturePearlShape pearl={pendant} r={15} x={CENTRE} y={PEARL_Y} />
      <Tassel colour={tasselColour} height={tasselHeights[tasselLength]} top={TASSEL_TOP} width={22} x={CENTRE} />
    </svg>
  )
}

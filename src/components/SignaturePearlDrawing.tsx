import type { SignaturePearlDesign } from '../content/signaturePearl'
import { EDGE, tone } from './drawingStyle'

// Graphic study of the two-colour signature pearl. Always drawn once per piece. Not a photograph.
// The second colour covers a yin-yang-like half; each colour has one dot in the other colour's half.

export function SignaturePearlShape({ x, y, r, pearl }: { x: number; y: number; r: number; pearl: SignaturePearlDesign }) {
  const { first, second, pattern } = pearl
  const half = r / 2
  const dot = r / 7
  const secondHalf = `M0 ${-r}A${r} ${r} 0 0 1 0 ${r}A${half} ${half} 0 0 1 0 0A${half} ${half} 0 0 0 0 ${-r}Z`

  return (
    <g>
      <g transform={`translate(${x} ${y}) rotate(${pattern === 'horizontal' ? 90 : 0})`}>
        <circle fill={tone(first)} r={r} />
        <path d={secondHalf} fill={tone(second)} />
        <circle cx={0} cy={-half} fill={tone(second)} r={dot} />
        <circle cx={0} cy={half} fill={tone(first)} r={dot} />
        <circle fill="none" r={r} stroke={EDGE} strokeWidth="1" />
      </g>
      <ellipse cx={x - r * 0.3} cy={y - r * 0.35} fill="rgba(255, 252, 245, 0.45)" rx={r * 0.26} ry={r * 0.17} transform={`rotate(-30 ${x - r * 0.3} ${y - r * 0.35})`} />
    </g>
  )
}

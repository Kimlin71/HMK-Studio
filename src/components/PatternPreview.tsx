import { formatMeasurement, type Measurements, type PatternPiece, type Point } from '../content/pattern'
import { useCopy } from '../i18n/LanguageContext'

// SVG drawing of the pattern pieces from generatePattern(). Units in the SVG are centimetres.
// Each piece is its own SVG, drawn at 8 px per cm, so lines (2.4 px) and labels (16 px) stay readable
// in a compressed screen share and shrink only on very narrow screens.

const PAD = 3
const PX_PER_CM = 8
const toPath = (points: readonly Point[]) => points.map(([x, y], index) => `${index === 0 ? 'M' : 'L'}${x.toFixed(2)} ${y.toFixed(2)}`).join(' ')

// A small arrow head at `tip`, pointing away from `from`.
function arrowHead(tip: Point, from: Point): string {
  const angle = Math.atan2(tip[1] - from[1], tip[0] - from[0])
  const size = 0.9
  const left: Point = [tip[0] - size * Math.cos(angle - 0.45), tip[1] - size * Math.sin(angle - 0.45)]
  const right: Point = [tip[0] - size * Math.cos(angle + 0.45), tip[1] - size * Math.sin(angle + 0.45)]
  return `M${left[0].toFixed(2)} ${left[1].toFixed(2)} L${tip[0].toFixed(2)} ${tip[1].toFixed(2)} L${right[0].toFixed(2)} ${right[1].toFixed(2)}`
}

function PieceDrawing({ piece, measurements }: { piece: PatternPiece; measurements: Measurements }) {
  const { copy, language } = useCopy()
  const text = copy.pattern
  const viewBox = `${piece.minX - PAD} ${-PAD} ${piece.width + 2 * PAD} ${piece.height + 2 * PAD}`
  const widthPx = (piece.width + 2 * PAD) * PX_PER_CM
  const fold = piece.foldEdge ? piece.edges.find((edge) => edge.id === piece.foldEdge) : undefined

  return (
    <svg
      aria-hidden="true"
      className="pattern-piece"
      data-piece={piece.id}
      focusable="false"
      style={{ width: `min(100%, ${widthPx}px)` }}
      viewBox={viewBox}
    >
      <path className="pattern-piece__shape" d={`${toPath(piece.outline)} Z`} />
      {fold ? <path className="pattern-piece__fold" d={toPath(fold.points)} /> : null}
      <path className="pattern-piece__grain" d={toPath([piece.grainLine.from, piece.grainLine.to])} />
      <path className="pattern-piece__arrow" d={`${arrowHead(piece.grainLine.to, piece.grainLine.from)} ${arrowHead(piece.grainLine.from, piece.grainLine.to)}`} />
      {piece.marks.map((mark) => (
        <g key={mark.key}>
          <path className="pattern-piece__dimension" d={toPath([mark.from, mark.to])} />
          <path className="pattern-piece__arrow pattern-piece__arrow--dimension" d={`${arrowHead(mark.to, mark.from)} ${arrowHead(mark.from, mark.to)}`} />
          <text className="pattern-piece__label" textAnchor={mark.label.anchor} x={mark.label.at[0]} y={mark.label.at[1]}>
            <tspan x={mark.label.at[0]}>{text.form.fields[mark.key].short}</tspan>
            <tspan dy="2.3" x={mark.label.at[0]}>{formatMeasurement(measurements[mark.key], language)}</tspan>
          </text>
        </g>
      ))}
      <text className="pattern-piece__name" x={piece.nameAt[0]} y={piece.nameAt[1]}>{text.preview.pieces[piece.id]}</text>
    </svg>
  )
}

export function PatternPreview({ pieces, measurements }: { pieces: PatternPiece[]; measurements: Measurements }) {
  const { copy } = useCopy()
  const text = copy.pattern.preview

  return (
    <figure aria-label={text.alt} className="pattern-preview">
      <div className="pattern-preview__pieces">
        {pieces.map((piece) => <PieceDrawing key={piece.id} measurements={measurements} piece={piece} />)}
      </div>
      <figcaption className="pattern-preview__legend">
        <span>{text.legend.measurements}</span>
        <span>{text.legend.halves}</span>
        <span>{text.legend.fold}</span>
        <span>{text.legend.grain}</span>
      </figcaption>
    </figure>
  )
}


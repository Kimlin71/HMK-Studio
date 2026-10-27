import { useState, type CSSProperties } from 'react'
import { reconstructImages, type EditorialPiece } from '../content/products'
import { useCopy } from '../i18n/LanguageContext'

// Before/after comparison. The shirt is shown on the left, the reconstructed garment on the right.
// A native range input carries the interaction, so mouse, touch and keyboard all work.
export function ReconstructCompare({ piece }: { piece: EditorialPiece }) {
  const { copy } = useCopy()
  const { compare } = copy
  const [position, setPosition] = useState(50)

  return (
    <figure className="compare" style={{ '--pos': `${position}%` } as CSSProperties}>
      <div className="compare__stage">
        <img alt={compare.beforeAlt} className="compare__image" loading="eager" src={reconstructImages.before} />
        <img alt={compare.afterAlt} className="compare__image compare__image--after" loading="eager" src={reconstructImages.after} />
        <span aria-hidden="true" className="compare__label compare__label--before">{compare.before}</span>
        <span aria-hidden="true" className="compare__label compare__label--after">{compare.after}</span>
        <span className="image-note">{compare.imageNote}</span>
        <input
          aria-label={compare.sliderLabel}
          aria-valuetext={compare.sliderValue(Math.round(position))}
          className="compare__input"
          max={100}
          min={0}
          onChange={(event) => setPosition(Number(event.target.value))}
          step={1}
          type="range"
          value={position}
        />
        <span aria-hidden="true" className="compare__handle"><span /></span>
      </div>
      <figcaption className="compare__caption">
        <span>{piece.name}</span>
        <span>{compare.leftRight(compare.beforeCaption, compare.afterCaption)}</span>
      </figcaption>
    </figure>
  )
}

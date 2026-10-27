import { useState, type CSSProperties } from 'react'
import { reconstructStages, type EditorialPiece } from '../content/products'

const [before, after] = reconstructStages

// Before/after comparison. The shirt is shown on the left, the reconstructed garment on the right.
// A native range input carries the interaction, so mouse, touch and keyboard all work.
export function ReconstructCompare({ piece }: { piece: EditorialPiece }) {
  const [position, setPosition] = useState(50)

  return (
    <figure className="compare" style={{ '--pos': `${position}%` } as CSSProperties}>
      <div className="compare__stage">
        <img alt={before.alt} className="compare__image" loading="eager" src={before.src} />
        <img alt={after.alt} className="compare__image compare__image--after" loading="eager" src={after.src} />
        <span aria-hidden="true" className="compare__label compare__label--before" lang="en">Before</span>
        <span aria-hidden="true" className="compare__label compare__label--after" lang="en">After</span>
        <span className="image-note">Konceptbild · före / efter, ej foto</span>
        <input
          aria-label="Jämför före och efter. Dra åt vänster eller höger."
          aria-valuetext={`Skjortan visas till ${Math.round(position)} procent från vänster, den omsydda, moderna hanboken till höger`}
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
        <span>Vänster · {before.caption.replace('Före · ', '')} / Höger · {after.caption.replace('Efter · ', '')}</span>
      </figcaption>
    </figure>
  )
}

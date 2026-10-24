import { useEffect, useRef } from 'react'
import type { EditorialPiece } from '../content/products'

type ProductDialogProps = {
  piece: EditorialPiece | null
  onClose: () => void
}

export function ProductDialog({ piece, onClose }: ProductDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (piece && !dialog.open) dialog.showModal()
    if (!piece && dialog.open) dialog.close()
  }, [piece])

  return (
    <dialog aria-labelledby="piece-title" className="piece-dialog" onClose={onClose} onClick={(event) => {
      if (event.target === dialogRef.current) dialogRef.current?.close()
    }} ref={dialogRef}>
      {piece && (
        <article className="piece-detail">
          <button aria-label="Stäng produktdetaljer" className="piece-detail__close" onClick={() => dialogRef.current?.close()} type="button">Stäng <span aria-hidden="true">×</span></button>
          <div className="piece-detail__image-wrap">
            {/* Replace with the atelier's own photographs when real pieces are added. */}
            <img alt={piece.imageAlt} className="piece-detail__image" src={piece.image} style={{ objectPosition: piece.imagePosition }} />
            <span className="piece-detail__area">{piece.area} / Fiktivt demo · Illustration</span>
          </div>
          <div className="piece-detail__copy">
            <p className="eyebrow">{piece.category}</p>
            <h2 id="piece-title">{piece.name}</h2>
            <p className="piece-detail__story">{piece.story}</p>
            <dl>
              <div><dt>Material</dt><dd>{piece.material}</dd></div>
              <div><dt>Hantverk</dt><dd>{piece.craftsmanship}</dd></div>
              {piece.upcycling && <div><dt>Återbruk</dt><dd>{piece.upcycling}</dd></div>}
              {piece.petiteNote && <div><dt>Proportion</dt><dd>{piece.petiteNote}</dd></div>}
              {piece.related && <div><dt>Att bära tillsammans</dt><dd>{piece.related}</dd></div>}
            </dl>
            <p className="piece-detail__demo-note">Fiktivt redaktionellt demoexempel, illustrerat med en grafisk platshållare. Material och hantverk beskriver konceptet, inte ett tillverkat plagg. Inga köp eller beställningar tas emot.</p>
          </div>
        </article>
      )}
    </dialog>
  )
}

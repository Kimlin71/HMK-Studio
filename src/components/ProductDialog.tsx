import { useEffect, useRef } from 'react'
import type { EditorialPiece } from '../content/products'
import { useCopy } from '../i18n/LanguageContext'

type ProductDialogProps = {
  piece: EditorialPiece | null
  onClose: () => void
}

export function ProductDialog({ piece, onClose }: ProductDialogProps) {
  const { copy } = useCopy()
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (piece && !dialog.open) dialog.showModal()
    if (!piece && dialog.open) dialog.close()
  }, [piece])

  const pieceCopy = piece ? copy.pieces[piece.id] : null
  const { fields } = copy.dialog

  return (
    <dialog aria-labelledby="piece-title" aria-describedby="piece-demo-note" className="piece-dialog" onClose={onClose} onKeyDown={(event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        dialogRef.current?.close()
      }
    }} onClick={(event) => {
      if (event.target === dialogRef.current) dialogRef.current?.close()
    }} ref={dialogRef}>
      {piece && pieceCopy && (
        <>
          <div className="piece-dialog__toolbar">
            <button aria-label={copy.dialog.closeLabel} className="piece-detail__close" onClick={() => dialogRef.current?.close()} type="button">{copy.dialog.close} <span aria-hidden="true">×</span></button>
          </div>
          <article className="piece-detail">
            <div className="piece-detail__image-wrap">
              {/* Replace with the studio's own photographs when real pieces are added. */}
              <img alt={pieceCopy.imageAlt} className="piece-detail__image" src={piece.image} style={{ objectPosition: piece.imagePosition }} />
              <span className="piece-detail__area"><span lang="en">{piece.area}</span> / {pieceCopy.imageLabel}</span>
            </div>
            <div className="piece-detail__copy">
              <p className="eyebrow">{pieceCopy.category}</p>
              <h2 id="piece-title">{piece.name}</h2>
              <p className="piece-detail__story">{pieceCopy.story}</p>
              <dl>
                <div><dt>{fields.material}</dt><dd>{pieceCopy.material}</dd></div>
                <div><dt>{fields.craft}</dt><dd>{pieceCopy.craftsmanship}</dd></div>
                {pieceCopy.upcycling && <div><dt>{fields.reuse}</dt><dd>{pieceCopy.upcycling}</dd></div>}
                {pieceCopy.petiteNote && <div><dt>{fields.proportion}</dt><dd>{pieceCopy.petiteNote}</dd></div>}
                <div><dt>{fields.together}</dt><dd>{pieceCopy.related}</dd></div>
              </dl>
              <p className="piece-detail__demo-note" id="piece-demo-note">{pieceCopy.demoNote}</p>
            </div>
          </article>
        </>
      )}
    </dialog>
  )
}

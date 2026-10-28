import type { EditorialPiece } from '../content/products'
import { useCopy } from '../i18n/LanguageContext'
import { PieceDialogShell } from './PieceDialogShell'

type ProductDialogProps = {
  piece: EditorialPiece | null
  onClose: () => void
}

export function ProductDialog({ piece, onClose }: ProductDialogProps) {
  const { copy } = useCopy()
  const pieceCopy = piece ? copy.pieces[piece.id] : null
  const { fields } = copy.dialog

  return (
    <PieceDialogShell describedBy="piece-demo-note" labelledBy="piece-title" onClose={onClose} open={Boolean(piece && pieceCopy)}>
      {piece && pieceCopy && (
        <article className="piece-detail">
          <div className="piece-detail__image-wrap">
            {/* Replace with the studio's own photographs when real pieces are added. */}
            <img alt={pieceCopy.imageAlt} className="piece-detail__image" src={piece.image} style={{ objectPosition: piece.imagePosition }} />
          </div>
          <div className="piece-detail__copy">
            <p className="eyebrow">{pieceCopy.category}</p>
            <h2 id="piece-title" lang="en">{piece.name}</h2>
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
      )}
    </PieceDialogShell>
  )
}

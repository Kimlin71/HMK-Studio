import type { HanbokItem } from '../content/shop'
import { useCopy } from '../i18n/LanguageContext'
import { HanbokBadges } from './HanbokBadges'
import { PieceDialogShell } from './PieceDialogShell'

type HanbokDialogProps = {
  item: HanbokItem | null
  onClose: () => void
}

// Detail view for a hanbok piece. Dialog behaviour comes from PieceDialogShell. Read-only copy.
export function HanbokDialog({ item, onClose }: HanbokDialogProps) {
  const { copy } = useCopy()
  const text = copy.shop.hanbok
  const card = copy.shop.card
  const itemCopy = item ? text.items[item.id] : null
  const fits = text.fits

  return (
    <PieceDialogShell describedBy="hanbok-demo-note" labelledBy="hanbok-title" onClose={onClose} open={Boolean(item && itemCopy)}>
      {item && itemCopy && (
        <article className="piece-detail hanbok-detail">
          <div className="piece-detail__image-wrap">
            {/* Replace with the studio's own photographs when real pieces are added. */}
            <img alt={card.items[item.id].imageAlt} className="piece-detail__image" src={item.image} style={{ objectPosition: item.imagePosition }} />
            <span className="piece-detail__area"><span lang="en">WEAR</span> / {card.imageNote}</span>
          </div>
          <div className="piece-detail__copy">
            <p className="eyebrow">{itemCopy.category}</p>
            <h2 id="hanbok-title" lang="en">{item.name}</h2>
            <HanbokBadges />
            <p className="piece-detail__story">{itemCopy.story}</p>
            <dl>
              <div><dt>{text.fields.status}</dt><dd>{text.oneOfAKindNote}</dd></div>
              <div><dt>{text.fields.material}</dt><dd>{itemCopy.material}</dd></div>
              <div><dt>{text.fields.sourceShirt}</dt><dd>{itemCopy.sourceShirt}</dd></div>
            </dl>
            <section aria-labelledby="hanbok-fits-title" className="hanbok-fits">
              <h3 id="hanbok-fits-title">{fits.title}</h3>
              <p>{fits.intro}</p>
              <dl>
                <div><dt>{fits.shoulder.label}</dt><dd>{fits.shoulder.text}</dd></div>
                <div><dt>{fits.sleeve.label}</dt><dd>{fits.sleeve.text}</dd></div>
                <div><dt>{fits.length.label}</dt><dd>{fits.length.text}</dd></div>
                <div><dt>{fits.wrapTie.label}</dt><dd>{fits.wrapTie.text}</dd></div>
              </dl>
            </section>
            <p className="hanbok-detail__ask">{text.ask}</p>
            <p className="piece-detail__demo-note" id="hanbok-demo-note">{text.demoNote}</p>
          </div>
        </article>
      )}
    </PieceDialogShell>
  )
}

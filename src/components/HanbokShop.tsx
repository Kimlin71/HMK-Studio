import { useState } from 'react'
import { shopAnchors, type HanbokItem } from '../content/shop'
import { useCopy } from '../i18n/LanguageContext'
import { HanbokBadges } from './HanbokBadges'
import { HanbokDialog } from './HanbokDialog'
import './HanbokShop.css'

// Hanbok list. Every piece is a demo and one of a kind. Nothing here can be ordered, and no
// measurements or contact details are asked for. Mounts at #hanbok-lista.
export function HanbokShop({ items }: { items: HanbokItem[] }) {
  const { copy } = useCopy()
  const [selected, setSelected] = useState<HanbokItem | null>(null)
  const card = copy.shop.card
  const text = copy.shop.hanbok

  return (
    <div className="hanbok-shop" id={shopAnchors.hanbokList}>
      <h4 className="hanbok-shop__title">{text.title}</h4>
      <ul className="hanbok-shop__list">
        {items.map((item) => (
          <li className="hanbok-card" key={item.id}>
            <div className="hanbok-card__image-wrap">
              <img alt={card.items[item.id].imageAlt} className="hanbok-card__image" loading="lazy" src={item.image} style={{ objectPosition: item.imagePosition }} />
              {/* The view from behind appears on hover and keyboard focus. Decorative: the front picture carries the description. */}
              {item.hoverImage ? <img alt="" className="hanbok-card__image hanbok-card__image--back" loading="lazy" src={item.hoverImage} /> : null}
              <span className="image-note">{card.imageNote}</span>
            </div>
            <HanbokBadges />
            <h5 className="hanbok-card__name" lang="en">{item.name}</h5>
            <p className="hanbok-card__note">{text.oneOfAKindNote}</p>
            <p className="hanbok-card__price"><span>{card.priceLabel}</span> {card.priceTbd}</p>
            <button
              aria-label={text.detailsButtonLabel(item.name)}
              className="hanbok-card__details"
              onClick={() => setSelected(item)}
              type="button"
            >
              {text.detailsButton}
            </button>
          </li>
        ))}
      </ul>
      <p className="hanbok-shop__ask">{text.ask}</p>
      <HanbokDialog item={selected} onClose={() => setSelected(null)} />
    </div>
  )
}

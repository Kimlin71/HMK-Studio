import type { ShopItem } from '../content/shop'
import { useCopy } from '../i18n/LanguageContext'

type ShopItemCardProps = {
  item: ShopItem
}

// Demo item card. The order button is deliberately inactive: nothing is ordered, sent or stored.
export function ShopItemCard({ item }: ShopItemCardProps) {
  const { copy } = useCopy()
  const text = copy.shop.card
  const noteId = `shop-order-note-${item.id}`

  return (
    <article className="shop-card">
      <div className="shop-card__image-wrap">
        {item.image ? (
          // Replace concept images with the studio's own photographs when available.
          <img alt={text.items[item.id].imageAlt} className="shop-card__image" loading="lazy" src={item.image} style={{ objectPosition: item.imagePosition }} />
        ) : null}
        <span className="image-note">{text.imageNote}</span>
      </div>
      <div className="shop-card__meta">
        <h4 className="shop-card__name" lang="en">{item.name}</h4>
        <p className="shop-card__demo">{text.demoLabel}</p>
      </div>
      <p className="shop-card__price"><span>{text.priceLabel}</span> {text.priceTbd}</p>
      <button aria-describedby={noteId} className="shop-card__order" disabled type="button">{text.orderButton}</button>
      <p className="shop-card__note" id={noteId}>{text.orderNote}</p>
    </article>
  )
}

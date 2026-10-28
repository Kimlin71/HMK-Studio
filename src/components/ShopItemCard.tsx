import { useState } from 'react'
import { shopItemToNewCartItem } from '../content/cart'
import { price } from '../content/prices'
import type { ShopItem } from '../content/shop'
import { useCopy } from '../i18n/LanguageContext'
import { AddToCartButton } from './AddToCartButton'
import { Price } from './Price'

type ShopItemCardProps = {
  item: ShopItem
}

// Demo item card. The button puts the item in the in-memory cart. Nothing is ordered, sent or stored.
export function ShopItemCard({ item }: ShopItemCardProps) {
  const { copy } = useCopy()
  const text = copy.shop.card
  const cartItem = shopItemToNewCartItem(item)
  const [missing, setMissing] = useState(false)

  return (
    <article className={`shop-card shop-card--${item.category}`}>
      <div className="shop-card__image-wrap">
        {/* Replace concept images with the studio's own photographs when available. */}
        {missing ? (
          <p className="shop-card__pending">{text.imagePending}</p>
        ) : (
          <>
            <img alt={text.items[item.id].imageAlt} className="shop-card__image" loading="lazy" onError={() => setMissing(true)} src={item.image} style={{ objectPosition: item.imagePosition }} />
            <span className="image-note">{text.imageNote}</span>
          </>
        )}
      </div>
      <div className="shop-card__meta">
        <h4 className="shop-card__name" lang="en">{item.name}</h4>
        <p className="shop-card__demo">{cartItem ? text.prototypeLabel : text.demoLabel}</p>
      </div>
      <p className="shop-card__price">
        <span>{text.priceLabel}</span> {cartItem ? <Price amount={price(cartItem)} /> : text.priceTbd}
      </p>
      {cartItem ? <AddToCartButton item={cartItem} /> : null}
    </article>
  )
}

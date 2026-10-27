import { shopAnchors, shopCategories, shopItems, type ShopCategory } from '../content/shop'
import { useCopy } from '../i18n/LanguageContext'
import { BraceletBuilder } from './BraceletBuilder'
import { ShopItemCard } from './ShopItemCard'
import './ShopSection.css'

// Mount points for later tickets. Each id is the anchor its builder or list replaces the placeholder in:
// T2 bracelet builder -> #armband-bygge, T3 Maedeup builder -> #maedeup-bygge, T4 hanbok list -> #hanbok-lista.
const mountIds: Record<ShopCategory, string> = {
  bracelet: shopAnchors.braceletBuilder,
  maedeup: shopAnchors.maedeupBuilder,
  hanbok: shopAnchors.hanbokList,
}

function ShopMountPlaceholder({ category }: { category: ShopCategory }) {
  const { copy } = useCopy()
  const text = copy.shop[category]

  if (category === 'bracelet') return <BraceletBuilder />

  return (
    <div className="shop-mount" id={mountIds[category]}>
      <p className="shop-mount__label">{copy.shop.section.placeholderLabel}</p>
      <h4>{text.title}</h4>
      <p>{text.placeholder}</p>
    </div>
  )
}

export function ShopSection() {
  const { copy } = useCopy()
  const text = copy.shop.section

  return (
    <section aria-labelledby="shop-title" className="shop section-shell" id={shopAnchors.section}>
      <div className="shop__intro">
        <p className="eyebrow">{text.eyebrow}</p>
        <h2 id="shop-title">{text.title}</h2>
        <p className="shop__lead">{text.intro}</p>
        <p className="image-disclosure">{text.disclosure}</p>
      </div>
      {shopCategories.map((category) => {
        const items = shopItems.filter((item) => item.category === category)
        const categoryText = text.categories[category]

        return (
          <div aria-labelledby={`shop-${category}-title`} className="shop-category" key={category} role="group">
            <div className="shop-category__head">
              <h3 id={`shop-${category}-title`}>{categoryText.title}</h3>
              <p>{categoryText.description}</p>
            </div>
            <div className="shop-category__items">
              {items.map((item) => <ShopItemCard item={item} key={item.id} />)}
              <ShopMountPlaceholder category={category} />
            </div>
          </div>
        )
      })}
    </section>
  )
}

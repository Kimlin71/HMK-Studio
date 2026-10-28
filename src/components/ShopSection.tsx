import { hanbokItems, shopAnchors, shopCategories, shopItems } from '../content/shop'
import { useCopy } from '../i18n/LanguageContext'
import { NorigaeBuilder } from './NorigaeBuilder'
import { HanbokShop } from './HanbokShop'
import { ShopItemCard } from './ShopItemCard'
import './ShopSection.css'

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
        const categoryText = text.categories[category]

        return (
          <div aria-labelledby={`shop-${category}-title`} className="shop-category" key={category} role="group">
            <div className="shop-category__head">
              <h3 id={`shop-${category}-title`}>{categoryText.title}</h3>
              <p>{categoryText.description}</p>
            </div>
            <div className="shop-category__items">
              {category === 'hanbok' ? <HanbokShop items={hanbokItems} /> : (
                <>
                  {shopItems.filter((item) => item.category === category).map((item) => <ShopItemCard item={item} key={item.id} />)}
                  {category === 'maedeup' ? <NorigaeBuilder /> : null}
                </>
              )}
            </div>
          </div>
        )
      })}
    </section>
  )
}

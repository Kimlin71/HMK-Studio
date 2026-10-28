import { formatPrice } from '../content/prices'
import { useCopy } from '../i18n/LanguageContext'

// A fictional price, always with its "demo" marker. The amount comes from price() in src/content/prices.ts.
export function Price({ amount }: { amount: number }) {
  const { language, copy } = useCopy()
  return (
    <span className="price">
      <span className="price__amount">{formatPrice(amount, language)}</span>
      <span className="price__marker">{copy.cart.priceMarker}</span>
    </span>
  )
}

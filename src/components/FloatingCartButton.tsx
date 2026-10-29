import { useCart } from '../cart/CartContext'
import { cartItemCount } from '../content/cart'
import { useCopy } from '../i18n/LanguageContext'
import './FloatingCartButton.css'

// Pinned to the bottom-right corner once the cart holds something, so the cart is reachable from anywhere on the long page.
// The header button stays the main entry point; this one only appears when there is something to find.
export function FloatingCartButton() {
  const { copy } = useCopy()
  const { items, openPanel } = useCart()
  const count = cartItemCount(items)

  if (count === 0) return null

  return (
    <button aria-haspopup="dialog" aria-label={copy.header.cartButton.label(count)} className="floating-cart" onClick={openPanel} type="button">
      <svg aria-hidden="true" className="floating-cart__icon" focusable="false" viewBox="0 0 24 24">
        <path d="M5 8h14l-1.2 11.2a1 1 0 0 1-1 .8H7.2a1 1 0 0 1-1-.8L5 8Z" />
        <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
      </svg>
      <span aria-hidden="true" className="floating-cart__text">{copy.header.cartButton.text}</span>
      {/* key restarts the small pop each time the count changes */}
      <span aria-hidden="true" className="floating-cart__count" key={count}>{count}</span>
    </button>
  )
}

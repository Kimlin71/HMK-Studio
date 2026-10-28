import { useCart } from '../cart/CartContext'
import { cartItemCount } from '../content/cart'
import { useCopy } from '../i18n/LanguageContext'

// Header button with the item count. The dialog it opens returns focus here when it closes.
export function CartButton() {
  const { copy } = useCopy()
  const { items, openPanel } = useCart()
  const count = cartItemCount(items)

  return (
    <button aria-haspopup="dialog" aria-label={copy.header.cartButton.label(count)} className="cart-button" onClick={openPanel} type="button">
      <svg aria-hidden="true" className="cart-button__icon" focusable="false" viewBox="0 0 24 24">
        <path d="M5 8h14l-1.2 11.2a1 1 0 0 1-1 .8H7.2a1 1 0 0 1-1-.8L5 8Z" />
        <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
      </svg>
      <span aria-hidden="true" className="cart-button__text">{copy.header.cartButton.text}</span>
      <span aria-hidden="true" className="cart-button__count">{count}</span>
    </button>
  )
}

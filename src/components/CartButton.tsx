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
      <span aria-hidden="true">{copy.header.cartButton.text}</span>
      <span aria-hidden="true" className="cart-button__count">{count}</span>
    </button>
  )
}

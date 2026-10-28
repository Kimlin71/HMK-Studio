import { useCart } from '../cart/CartContext'
import { cartTotal } from '../content/cart'
import { shopAnchors } from '../content/shop'
import { useCopy } from '../i18n/LanguageContext'
import { goTo } from '../routing/useRoute'
import { OrderLines } from './OrderLines'
import { PieceDialogShell } from './PieceDialogShell'
import { Price } from './Price'
import './CartPanel.css'

// The cart as a dialog: native <dialog> through PieceDialogShell, so Escape closes it, focus is trapped while it is open
// and focus returns to the cart button that opened it.
export function CartPanel() {
  const { copy } = useCopy()
  const { items, panelOpen, closePanel, remove, startOver } = useCart()
  const text = copy.cart.panel

  return (
    <PieceDialogShell className="cart-dialog" closeLabel={copy.dialog.close} describedBy="cart-notice" labelledBy="cart-title" onClose={closePanel} open={panelOpen}>
      <div className="cart-panel">
        <h2 id="cart-title">{text.title}</h2>
        <p className="prototype-notice" id="cart-notice">{copy.prototypeNotice}</p>
        {items.length === 0 ? (
          <p className="cart-panel__empty">{text.empty}</p>
        ) : (
          <>
            <OrderLines items={items} onRemove={remove} />
            <p className="cart-panel__total">
              <span>{text.total}</span>
              <Price amount={cartTotal(items)} />
            </p>
            <div className="cart-panel__actions">
              <button
                className="cart-panel__checkout"
                onClick={() => {
                  closePanel()
                  goTo('checkout')
                }}
                type="button"
              >
                {text.checkout}
              </button>
              <button className="cart-panel__link" onClick={startOver} type="button">{text.startOver}</button>
            </div>
          </>
        )}
        <a className="cart-panel__shop" href={`#${shopAnchors.section}`} onClick={closePanel}>{copy.checkout.back}</a>
      </div>
    </PieceDialogShell>
  )
}

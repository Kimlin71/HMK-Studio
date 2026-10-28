import { useEffect, useState } from 'react'
import { useCart } from '../cart/CartContext'
import type { NewCartItem } from '../content/cart'
import { useCopy } from '../i18n/LanguageContext'

const CONFIRMATION_MS = 2500

type AddToCartButtonProps = {
  item: NewCartItem
  /** Described by this element, for example the "nothing is sent" note under a builder. */
  describedBy?: string
}

// Adds one item to the in-memory cart and says so in a polite status line (read out by screen readers) for a moment.
export function AddToCartButton({ item, describedBy }: AddToCartButtonProps) {
  const { copy } = useCopy()
  const { add } = useCart()
  const [added, setAdded] = useState(0)

  useEffect(() => {
    if (added === 0) return
    const timer = window.setTimeout(() => setAdded(0), CONFIRMATION_MS)
    return () => window.clearTimeout(timer)
  }, [added])

  return (
    <div className="add-to-cart">
      <button
        aria-describedby={describedBy}
        className="add-to-cart__button"
        onClick={() => {
          add(item)
          setAdded((count) => count + 1)
        }}
        type="button"
      >
        {copy.cart.add.button}
      </button>
      <p className="add-to-cart__status" role="status">{added > 0 ? copy.cart.add.added : ''}</p>
    </div>
  )
}

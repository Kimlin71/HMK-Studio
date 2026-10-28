import { createContext, useContext } from 'react'
import type { CartItem, NewCartItem } from '../content/cart'
import type { Order } from '../content/order'

// In-memory cart state for the prototype. Nothing here is stored: a reload empties the cart and forgets the order.
export type CartState = {
  items: CartItem[]
  /** The confirmed order, kept only until "start over" or a reload. */
  order: Order | null
  panelOpen: boolean
  add: (item: NewCartItem) => void
  remove: (id: string) => void
  openPanel: () => void
  closePanel: () => void
  /** Turns the cart into the confirmed order and empties the cart. */
  placeOrder: () => void
  /** Empties the cart, forgets the order and closes the panel. */
  startOver: () => void
}

export const CartContext = createContext<CartState>({
  items: [],
  order: null,
  panelOpen: false,
  add: () => {},
  remove: () => {},
  openPanel: () => {},
  closePanel: () => {},
  placeOrder: () => {},
  startOver: () => {},
})

export const useCart = () => useContext(CartContext)

import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { addItem, removeItem, type CartItem, type NewCartItem } from '../content/cart'
import { placeOrder as buildOrder, type Order } from '../content/order'
import { CartContext } from './CartContext'

// React state around the plain cart functions in src/content/cart.ts. Memory only: no storage, no network.
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [order, setOrder] = useState<Order | null>(null)
  const [orderCount, setOrderCount] = useState(0)
  const [panelOpen, setPanelOpen] = useState(false)

  const add = useCallback((item: NewCartItem) => setItems((current) => addItem(current, item)), [])
  const remove = useCallback((id: string) => setItems((current) => removeItem(current, id)), [])
  const openPanel = useCallback(() => setPanelOpen(true), [])
  const closePanel = useCallback(() => setPanelOpen(false), [])

  const placeOrder = useCallback(() => {
    setOrder(buildOrder(items, orderCount + 1))
    setOrderCount(orderCount + 1)
    setItems([])
  }, [items, orderCount])

  const startOver = useCallback(() => {
    setItems([])
    setOrder(null)
    setPanelOpen(false)
  }, [])

  const value = useMemo(
    () => ({ items, order, panelOpen, add, remove, openPanel, closePanel, placeOrder, startOver }),
    [items, order, panelOpen, add, remove, openPanel, closePanel, placeOrder, startOver],
  )
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

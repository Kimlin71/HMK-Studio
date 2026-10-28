// Cart: plain module, no React and no storage. The cart is a list the caller keeps in memory.
// Every function returns a new list and leaves the old one untouched.

import type { BraceletItemId, ShopItem } from './shop.ts'
import { norigaeProducts, type NorigaeDesign, type NorigaeProductId } from './norigae.ts'
import type { Measurements } from './pattern.ts'
import type { PatternProductId } from './patterns.ts'
import { price } from './prices.ts'

/** What is added: one of the three kinds the prototype sells. Hanbok is a demo piece and has no cart item. */
export type NewCartItem =
  | { kind: 'bracelet'; braceletId: BraceletItemId }
  /** `productId` is set when a finished piece from the shop is bought, and absent for the customer's own design. */
  | { kind: 'norigae'; design: NorigaeDesign; productId?: NorigaeProductId }
  | { kind: 'pattern'; patternId: PatternProductId; measurements: Measurements }

export type CartItem = NewCartItem & { id: string; quantity: 1 }

const idNumber = (id: string) => Number(id.replace('item-', ''))

/** A new id that no item in the cart has, also after a removal. */
function nextId(items: readonly CartItem[]) {
  return `item-${items.reduce((highest, item) => Math.max(highest, idNumber(item.id)), 0) + 1}`
}

export function addItem(items: readonly CartItem[], item: NewCartItem): CartItem[] {
  return [...items, { ...item, id: nextId(items), quantity: 1 }]
}

export const removeItem = (items: readonly CartItem[], id: string): CartItem[] => items.filter((item) => item.id !== id)

export const cartTotal = (items: readonly CartItem[]) => items.reduce((sum, item) => sum + price(item) * item.quantity, 0)

export const cartItemCount = (items: readonly CartItem[]) => items.reduce((sum, item) => sum + item.quantity, 0)

export const hasPattern = (items: readonly CartItem[]) => items.some((item) => item.kind === 'pattern')

/**
 * The cart item a shop card adds: a bracelet as it is, a finished Norigae with the colours of its photograph. Hanbok has none.
 */
export function shopItemToNewCartItem(item: Pick<ShopItem, 'id' | 'category'>): NewCartItem | null {
  if (item.category === 'bracelet') return { kind: 'bracelet', braceletId: item.id as BraceletItemId }
  if (item.category === 'maedeup') {
    const productId = item.id as NorigaeProductId
    return { kind: 'norigae', design: norigaeProducts[productId], productId }
  }
  return null
}

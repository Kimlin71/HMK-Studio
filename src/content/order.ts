// Customer and order for the mocked checkout: plain module, no React, no network, no storage.
// DEMO CONTENT: one fictional customer. Nothing here is a real person, address or card.

import { cartTotal, hasPattern, type CartItem } from './cart.ts'
import { getPatternProduct, type PatternProduct } from './patterns.ts'

/** The mock payment waits this long before the confirmation shows. */
export const PAYMENT_DELAY_MS = 1500

export type CustomerField = 'name' | 'address' | 'postcode' | 'city' | 'email' | 'card'

export const customerFields: CustomerField[] = ['name', 'address', 'postcode', 'city', 'email', 'card']

export type Customer = Record<CustomerField, string>

/** Fictional details for "Kund Demo". The card number is the well-known payment test number. */
export const demoCustomer: Customer = {
  name: 'Kund Demo',
  address: 'Demovägen 1',
  postcode: '111 11',
  city: 'Demostad',
  email: 'kund.demo@example.se',
  card: '4242 4242 4242 4242',
}

export type CustomerErrors = Partial<Record<CustomerField, 'required'>>

/** Every field only has to be filled in. The card number is never checked beyond that and never leaves the page. */
export function validateCustomer(customer: Customer): CustomerErrors {
  const errors: CustomerErrors = {}
  for (const field of customerFields) {
    if (customer[field].trim() === '') errors[field] = 'required'
  }
  return errors
}

export type Order = {
  number: string
  items: CartItem[]
  total: number
  hasPattern: boolean
}

export const formatOrderNumber = (sequence: number) => `HMS-DEMO-${String(sequence).padStart(4, '0')}`

/** The confirmed order. The sequence is a counter the caller keeps in memory. Customer details are deliberately not part of it. */
export function placeOrder(items: readonly CartItem[], sequence: number): Order {
  return { number: formatOrderNumber(sequence), items: [...items], total: cartTotal(items), hasPattern: hasPattern(items) }
}

/** The distinct patterns in an order, once each, for the download links on the confirmation. */
export function orderedPatterns(order: Pick<Order, 'items'>): PatternProduct[] {
  const found: PatternProduct[] = []
  for (const item of order.items) {
    if (item.kind !== 'pattern') continue
    const product = getPatternProduct(item.patternId)
    if (product && !found.includes(product)) found.push(product)
  }
  return found
}

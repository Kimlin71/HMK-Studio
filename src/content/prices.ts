// Prices: the only place that holds an amount. Plain module, no React.
// DEMO CONTENT: every amount is fictional and is always shown with a "demo" marker. Sweden and SEK only.

import type { NewCartItem } from './cart.ts'
import type { Language } from './copy/types.ts'
import type { TasselLengthId } from './norigae.ts'

/** Fictional SEK amounts. Change prices here and nowhere else. */
export const priceList = {
  bracelet: 350,
  norigae: 450,
  pattern: 149,
  /** Added to a Norigae per tassel length. */
  tasselSurcharge: { short: 0, medium: 0, long: 50 } satisfies Record<TasselLengthId, number>,
} as const

/** Price of one cart item in SEK. */
export function price(item: NewCartItem): number {
  switch (item.kind) {
    case 'bracelet':
      return priceList.bracelet
    case 'norigae':
      return priceList.norigae + priceList.tasselSurcharge[item.design.tasselLength]
    case 'pattern':
      return priceList.pattern
  }
}

const NBSP = '\u00a0'

// Swedish: 1 049 kr (non-breaking spaces). English: SEK 1,049. Written by hand so the result does not depend on the browser's locale data.
const grouped = (amount: number, separator: string) => String(Math.round(amount)).replace(/\B(?=(\d{3})+(?!\d))/g, separator)

export function formatPrice(amount: number, language: Language): string {
  return language === 'sv' ? `${grouped(amount, NBSP)}${NBSP}kr` : `SEK ${grouped(amount, ',')}`
}

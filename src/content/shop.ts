import type { SignaturePearlDesign } from './signaturePearl.ts'

// Language-independent shop catalogue. Visible text lives in src/content/copy/ under `shop`.
// DEMO CONTENT: every item is a fictional placeholder, never stock for sale. Prices are not numbers on purpose.

export type ShopCategory = 'bracelet' | 'maedeup' | 'hanbok'

export const shopCategories: ShopCategory[] = ['bracelet', 'maedeup', 'hanbok']

export type HanbokItemId = 'shirt-hanbok-demo' | 'shirt-hanbok-demo-2'

export type BraceletItemId = 'signature-bracelet-1' | 'signature-bracelet-2' | 'signature-bracelet-3'

/**
 * The signature pearl of each finished bracelet, read from the photographs (the dividing line is drawn horizontally).
 * Shown in the cart so a bracelet is described by its colours, as a Norigae is.
 */
export const braceletPearls: Record<BraceletItemId, SignaturePearlDesign> = {
  'signature-bracelet-1': { first: 'glaucous', second: 'cameo', pattern: 'horizontal' },
  'signature-bracelet-2': { first: 'indigo', second: 'ivory', pattern: 'horizontal' },
  'signature-bracelet-3': { first: 'khaki', second: 'vandyke', pattern: 'horizontal' },
}

export type ShopItemId = BraceletItemId | 'maedeup-norigae-demo' | HanbokItemId

export type ShopItem = {
  id: ShopItemId
  category: ShopCategory
  /** English proper name, shown in both languages. */
  name: string
  image: string
  imagePosition?: string
}

export const shopItems: ShopItem[] = [
  // Bracelets: finished products shown from the founder's photographs (background removed, transparent WebP).
  { id: 'signature-bracelet-1', category: 'bracelet', name: 'Signature Bracelet No. 1', image: '/images/shop/bracelets/bracelet-1.webp' },
  { id: 'signature-bracelet-2', category: 'bracelet', name: 'Signature Bracelet No. 2', image: '/images/shop/bracelets/bracelet-2.webp' },
  { id: 'signature-bracelet-3', category: 'bracelet', name: 'Signature Bracelet No. 3', image: '/images/shop/bracelets/bracelet-3.webp' },
  {
    id: 'maedeup-norigae-demo',
    category: 'maedeup',
    name: 'Maedeup Norigae No. 1',
    // The founder's photograph, also shown in the builder. Cart and checkout add the design it shows.
    image: '/images/shop/norigae/norigae-reference.webp',
  },
  {
    id: 'shirt-hanbok-demo',
    category: 'hanbok',
    name: 'Shirt Hanbok No. 1',
    image: '/images/shop/hanbok/hanbok-1.jpg',
  },
  {
    id: 'shirt-hanbok-demo-2',
    category: 'hanbok',
    name: 'Shirt Hanbok No. 2',
    image: '/images/shop/hanbok/hanbok-2.jpg',
  },
]

export type HanbokItem = ShopItem & { id: HanbokItemId }

// Selected once here, so no component repeats the category filter.
export const hanbokItems: HanbokItem[] = shopItems.filter((item): item is HanbokItem => item.category === 'hanbok')

// Anchors for the shop section and the places where the Norigae builder and the hanbok list mount.
export const shopAnchors = {
  section: 'butik',
  maedeupBuilder: 'maedeup-bygge',
  hanbokList: 'hanbok-lista',
} as const

export const getShopItem = (id: ShopItemId) => shopItems.find((item) => item.id === id)

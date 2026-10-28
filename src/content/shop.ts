import type { NorigaeProductId } from './norigae.ts'
import type { SignaturePearlDesign } from './signaturePearl.ts'

// Language-independent shop catalogue. Visible text lives in src/content/copy/ under `shop`.
// DEMO CONTENT: every item is a fictional placeholder, never stock for sale. Prices are not numbers on purpose.

export type ShopCategory = 'bracelet' | 'maedeup' | 'pattern' | 'hanbok'

export const shopCategories: ShopCategory[] = ['bracelet', 'maedeup', 'pattern', 'hanbok']

export type HanbokItemId = 'shirt-hanbok-demo' | 'shirt-hanbok-demo-2' | 'shirt-hanbok-demo-3'

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

export type ShopItemId = BraceletItemId | NorigaeProductId | HanbokItemId

export type ShopItem = {
  id: ShopItemId
  category: ShopCategory
  /** English proper name, shown in both languages. */
  name: string
  image: string
  imagePosition?: string
  /** Shown instead of `image` while the card is hovered or focused with the keyboard (hanbok: the view from behind). */
  hoverImage?: string
}

export const shopItems: ShopItem[] = [
  // Bracelets: finished products shown from the founder's photographs (background removed, transparent WebP).
  { id: 'signature-bracelet-1', category: 'bracelet', name: 'Signature Bracelet No. 1', image: '/images/shop/bracelets/bracelet-1.webp' },
  { id: 'signature-bracelet-2', category: 'bracelet', name: 'Signature Bracelet No. 2', image: '/images/shop/bracelets/bracelet-2.webp' },
  { id: 'signature-bracelet-3', category: 'bracelet', name: 'Signature Bracelet No. 3', image: '/images/shop/bracelets/bracelet-3.webp' },
  // Maedeup with Norigae: four finished pieces from the founder's photographs. The builder below is for a design of one's own.
  { id: 'maedeup-norigae-1', category: 'maedeup', name: 'Maedeup Norigae No. 1', image: '/images/shop/norigae/maedeup-norigae-1.webp' },
  { id: 'maedeup-norigae-2', category: 'maedeup', name: 'Maedeup Norigae No. 2', image: '/images/shop/norigae/maedeup-norigae-2.webp' },
  { id: 'maedeup-norigae-3', category: 'maedeup', name: 'Maedeup Norigae No. 3', image: '/images/shop/norigae/maedeup-norigae-3.jpg' },
  { id: 'maedeup-norigae-4', category: 'maedeup', name: 'Maedeup Norigae No. 4', image: '/images/shop/norigae/maedeup-norigae-4.jpg' },
  {
    id: 'shirt-hanbok-demo',
    category: 'hanbok',
    name: 'Shirt Hanbok No. 1',
    image: '/images/shop/hanbok/hanbok-1.jpg',
    hoverImage: '/images/shop/hanbok/hanbok-1b.jpg',
  },
  {
    id: 'shirt-hanbok-demo-2',
    category: 'hanbok',
    name: 'Shirt Hanbok No. 2',
    image: '/images/shop/hanbok/hanbok-2.jpg',
    hoverImage: '/images/shop/hanbok/hanbok-2b.jpg',
  },
  {
    id: 'shirt-hanbok-demo-3',
    category: 'hanbok',
    name: 'Shirt Hanbok No. 3',
    image: '/images/shop/hanbok/striped-hanbok-front.jpg',
    hoverImage: '/images/shop/hanbok/striped-hanbok-back.jpg',
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

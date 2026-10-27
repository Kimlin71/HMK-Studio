// Language-independent shop catalogue. Visible text lives in src/content/copy/ under `shop`.
// DEMO CONTENT: every item is a fictional placeholder, never stock for sale. Prices are not numbers on purpose.

export type ShopCategory = 'bracelet' | 'maedeup' | 'hanbok'

export const shopCategories: ShopCategory[] = ['bracelet', 'maedeup', 'hanbok']

export type ShopItemId = 'signature-bracelet-demo' | 'maedeup-norigae-demo' | 'shirt-hanbok-demo'

export type ShopItem = {
  id: ShopItemId
  category: ShopCategory
  /** English proper name, shown in both languages. */
  name: string
  image?: string
  imagePosition?: string
  status: 'demo'
}

export const shopItems: ShopItem[] = [
  {
    id: 'signature-bracelet-demo',
    category: 'bracelet',
    name: 'Signature Bracelet No. 1',
    image: '/images/macro-signature-pearl.png',
    status: 'demo',
  },
  {
    id: 'maedeup-norigae-demo',
    category: 'maedeup',
    name: 'Maedeup Norigae No. 1',
    image: '/images/knot-study.png',
    status: 'demo',
  },
  {
    id: 'shirt-hanbok-demo',
    category: 'hanbok',
    name: 'Shirt Hanbok No. 1',
    image: '/images/hanbok2.jpg',
    imagePosition: 'center 14%',
    status: 'demo',
  },
]

// Anchors for the shop section and the places where the builders and the hanbok list mount.
export const shopAnchors = {
  section: 'butik',
  braceletBuilder: 'armband-bygge',
  maedeupBuilder: 'maedeup-bygge',
  hanbokList: 'hanbok-lista',
} as const

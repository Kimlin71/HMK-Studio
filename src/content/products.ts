// Language-independent structure of the three offerings and the fictional demo pieces.
// All visible text lives in src/content/copy/ (one file per language).

// ACCENTED replaces the earlier working name ADORN. The CSS/anchor id stays "accented".
export type ProductArea = 'WEAR' | 'MAKE' | 'ACCENTED'
export type CollectionId = 'reconstruct' | 'reproportion' | 'connect'
export type PieceId = 'the-crossing-shirt' | 'proportion-study-01' | 'knot-no-01'

export type Collection = {
  id: CollectionId
  area: ProductArea
  number: string
}

export const collections: Collection[] = [
  { id: 'reconstruct', area: 'WEAR', number: '03' },
  { id: 'reproportion', area: 'MAKE', number: '04' },
  { id: 'connect', area: 'ACCENTED', number: '05' },
]

// RECONSTRUCT before/after. Both are concept images with the same framing, not photographs of a made garment.
export const reconstructImages = {
  before: '/images/hanbok1.jpg',
  after: '/images/hanbok2.jpg',
} as const

export type EditorialPiece = {
  id: PieceId
  collectionId: CollectionId
  status: 'editorial-prototype'
  name: string
  area: ProductArea
  image: string
  imagePosition?: string
}

// DEMO CONTENT — replace these fictional editorial pieces with real products and photography.
export const editorialPieces: EditorialPiece[] = [
  {
    id: 'the-crossing-shirt',
    collectionId: 'reconstruct',
    status: 'editorial-prototype',
    name: 'The Crossing Shirt',
    area: 'WEAR',
    image: reconstructImages.after,
    imagePosition: 'center 20%',
  },
  {
    id: 'proportion-study-01',
    collectionId: 'reproportion',
    status: 'editorial-prototype',
    name: 'Proportion Study 01',
    area: 'MAKE',
    image: '/images/pattern-study.png',
  },
  {
    id: 'knot-no-01',
    collectionId: 'connect',
    status: 'editorial-prototype',
    name: 'Knot no. 01',
    area: 'ACCENTED',
    image: '/images/knot-study.jpg',
    imagePosition: 'center 46%',
  },
]

// Future pattern downloads: connect pattern pieces and instruction files here once real digital products are ready.

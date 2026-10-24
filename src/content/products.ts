export type ProductArea = 'WEAR' | 'MAKE' | 'ADORN'

export type Collection = {
  id: string
  area: ProductArea
  number: string
  concept: string
  title: string
  paragraphs: string[]
  action: string
}

export const collections: Collection[] = [
  {
    id: 'reconstruct', area: 'WEAR', number: '03', concept: 'RECONSTRUCT',
    title: 'EXISTING FORM. NEW EXPRESSION.',
    paragraphs: [
      'A familiar shirt becomes the starting point rather than the finished object.',
      'Existing details meet new proportions, overlapping forms, ties and silhouettes influenced by Korean clothing traditions.',
    ],
    action: 'Discover garments',
  },
  {
    id: 'reproportion', area: 'MAKE', number: '04', concept: 'REPROPORTION',
    title: 'SMALLER IS NOT THE SAME AS PETITE.',
    paragraphs: [
      'Petite is about proportion, not simply size.',
      'Patterns developed with attention to torso length, placement, balance and the relationship between the parts of a garment.',
      'Because a pattern should adapt to the person wearing it.',
    ],
    action: 'Explore patterns',
  },
  {
    id: 'connect', area: 'ADORN', number: '05', concept: 'CONNECT',
    title: 'ONE LANGUAGE. MANY COMBINATIONS.',
    paragraphs: [
      'Knot. Bead. Tassel. Colour.',
      'Individual elements are designed to work together, allowing colours and forms to move between pieces.',
      'Combine indigo with ivory. Ochre with celadon. A quiet combination today, something bolder tomorrow.',
    ],
    action: 'Create your combination',
  },
]

export type EditorialPiece = {
  id: string
  collectionId: Collection['id']
  status: 'editorial-prototype'
  name: string
  area: ProductArea
  category: string
  image: string
  imageAlt: string
  material: string
  story: string
  craftsmanship: string
  upcycling?: string
  petiteNote?: string
  related?: string
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
    category: 'Omarbetad skjorta · Formstudie',
    image: '/images/silhouette-study.svg',
    imageAlt: 'Grafisk plaggstudie i djup indigo med röda sömlinjer',
    material: 'Materialplatshållare. Faktisk sammansättning anges när ett dokumenterat plagg finns.',
    story: 'En klassisk herrskjorta får ett nytt liv genom en omlottstängning och en mjuk, förskjuten silhuett. Bekant nog att bära ofta, annorlunda nog att kännas som din.',
    craftsmanship: 'Formidé: omlott, förskjutna linjer och knytning. Konstruktion och utförande är ännu inte dokumenterade.',
    upcycling: 'Ursprungsskjortan väljs för sin kvalitet och blir utgångspunkten för ett nytt plagg — inte ett material att dölja.',
    petiteNote: 'Axel- och ärmlängd balanseras med plaggets volym för att silhuetten ska kännas avsiktlig på en petite kropp.',
    related: 'CONNECT — knut, signaturpärla och tofs som en gemensam detaljidé.',
    imagePosition: 'center 27%',
  },
  {
    id: 'proportion-study-01',
    collectionId: 'reproportion',
    status: 'editorial-prototype',
    name: 'Proportion Study 01',
    area: 'MAKE',
    category: 'Symönster · Petite proportioner',
    image: '/images/pattern-study.svg',
    imageAlt: 'Grafisk mönsterstudie med proportioner och sömlinjer',
    material: 'Koncept för ett digitalt symönster i vävd kvalitet. Inga mönsterfiler eller måttguider finns att ladda ned.',
    story: 'Ett skjortmönster som börjar i proportionerna: kortare överkropp, balanserad ärm och en fåll placerad där plagget får sitt rätta fall.',
    craftsmanship: 'Koncept för placering av axel, midja och ärm. Provning, instruktioner och måttunderlag återstår att dokumentera.',
    petiteNote: 'Utformat för petite proportioner från första mönsterlinjen — inte nedskalat från ett standardblock.',
    related: 'Matcha med The Crossing Shirt för en gemensam silhuett och en detalj i samma ton.',
  },
  {
    id: 'knot-no-01',
    collectionId: 'connect',
    status: 'editorial-prototype',
    name: 'Knot no. 01',
    area: 'ADORN',
    category: 'Modulär detalj · Formstudie',
    image: '/images/knot-study.svg',
    imageAlt: 'Grafisk studie av en handknuten tråd med tofs',
    material: 'Materialplatshållare. Snodd, pärla, tofs och kopplingar behöver specificeras för verkliga objekt.',
    story: 'En studie av hur knut, pärla, tofs och koppling kan bilda en helhet. Tanken är att färger och delar ska kunna kombineras inom och mellan smycken, dekorativa objekt och plagg.',
    craftsmanship: 'Koncept för sammankopplade delar. Illustrationens knut är en grafisk studie, inte en dokumenterad knutteknik eller färdig produkt.',
    related: 'Formgiven för att bäras tillsammans med The Crossing Shirt och andra plagg från ateljén.',
    imagePosition: 'center 46%',
  },
]

// Future pattern downloads: connect pattern pieces and instruction files here once real digital products are ready.

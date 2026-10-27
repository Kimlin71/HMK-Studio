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
      'Garments are sewn anew into a fusion of Korean roots and a Scandinavian upbringing: overlapping forms, ties and new proportions, held in a quiet, restrained silhouette.',
      'The first concept is a hanbok in a modern style. It is a beginning, not the limit — more garments are to come.',
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
      'Combine indigo with ivory. Ochre with glaucous blue. Cameo pink with a touch of earth. A quiet combination today, something bolder tomorrow.',
    ],
    action: 'Create your combination',
  },
]

// RECONSTRUCT before/after sequence. Both are concept images (same framing, so they cross-fade as one transformation), not photographs of a made garment.
export const reconstructStages = [
  {
    id: 'before',
    label: 'Before',
    src: '/images/hanbok1.jpg',
    alt: 'Konceptbild: kvinna i en ljusblå randig, rak skjorta med knappar och bröstficka. Utgångspunkten före omformningen.',
    caption: 'Före · den befintliga skjortan',
    holdMs: 3800,
  },
  {
    id: 'after',
    label: 'After',
    src: '/images/hanbok2.jpg',
    alt: 'Konceptbild: samma skjorta omsydd till en modern hanbok, en fusion av koreansk inspiration och skandinavisk minimalism, med diagonal omlottstängning och ett långt knutet band vid sidan.',
    caption: 'Efter · omsydd till en modern hanbok',
    holdMs: 4800,
  },
] as const

export type EditorialPiece = {
  id: string
  collectionId: Collection['id']
  status: 'editorial-prototype'
  name: string
  area: ProductArea
  category: string
  image: string
  imageAlt: string
  imageLabel?: string
  demoNote?: string
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
    category: 'Omsydd skjorta · Modern hanbok · Formstudie',
    image: '/images/hanbok2.jpg',
    imageAlt: reconstructStages[1].alt,
    imageLabel: 'Konceptbild · ej foto',
    demoNote: 'Fiktivt redaktionellt demoexempel, illustrerat med en konceptbild. Bilden är en art direction-referens, inte ett foto av ett tillverkat plagg. Material och hantverk beskriver konceptet. Inga köp eller beställningar tas emot.',
    material: 'Materialplatshållare. Faktisk sammansättning anges när ett dokumenterat plagg finns.',
    story: 'En klassisk herrskjorta syms om och blir en modern hanbok — en fusion av koreanska rätter och en skandinavisk uppväxt. Omlottstängning, knytning och en mjuk, förskjuten silhuett i ett stilla uttryck. Det är det första konceptet, inte det enda: fler omsydda plagg är på väg. Bekant nog att bära ofta, annorlunda nog att kännas som din.',
    craftsmanship: 'Formidé: omlott, förskjutna linjer och knytning, med avskalade detaljer. Konstruktion och utförande är ännu inte dokumenterade.',
    upcycling: 'Ursprungsskjortan väljs för sin kvalitet och blir utgångspunkten för ett nytt plagg — inte ett material att dölja.',
    petiteNote: 'Axel- och ärmlängd balanseras med plaggets volym för att silhuetten ska kännas avsiktlig på en petite kropp.',
    related: 'CONNECT — knut, signaturpärla och tofs som en gemensam detaljidé.',
    imagePosition: 'center 20%',
  },
  {
    id: 'proportion-study-01',
    collectionId: 'reproportion',
    status: 'editorial-prototype',
    name: 'Proportion Study 01',
    area: 'MAKE',
    category: 'Symönster · Petite proportioner',
    image: '/images/pattern-study.png',
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
    image: '/images/knot-study.png',
    imageAlt: 'Grafisk studie av en handknuten tråd med tofs',
    material: 'Materialplatshållare. Snodd, pärla, tofs och kopplingar behöver specificeras för verkliga objekt.',
    story: 'En studie av hur knut, pärla, tofs och koppling kan bilda en helhet. Tanken är att färger och delar ska kunna kombineras inom och mellan smycken, dekorativa objekt och plagg.',
    craftsmanship: 'Koncept för sammankopplade delar. Illustrationens knut är en grafisk studie, inte en dokumenterad knutteknik eller färdig produkt.',
    related: 'Formgiven för att bäras tillsammans med The Crossing Shirt och andra plagg från ateljén.',
    imagePosition: 'center 46%',
  },
]

// Future pattern downloads: connect pattern pieces and instruction files here once real digital products are ready.

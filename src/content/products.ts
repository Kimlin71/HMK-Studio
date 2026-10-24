export type ProductArea = 'WEAR' | 'MAKE' | 'ADORN'

export type EditorialPiece = {
  id: string
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
    name: 'The Crossing Shirt',
    area: 'WEAR',
    category: 'Omarbetad skjorta · Formstudie',
    image: '/images/silhouette-study.svg',
    imageAlt: 'Grafisk plaggstudie i djup indigo med röda sömlinjer',
    material: 'Återbrukad bomullsskjorta, japansk bomull och växtfärgat band.',
    story: 'En klassisk herrskjorta får ett nytt liv genom en omlottstängning och en mjuk, förskjuten silhuett. Bekant nog att bära ofta, annorlunda nog att kännas som din.',
    craftsmanship: 'Sprättad och omarbetad för hand i ateljén. Avslutad med handsydda knappar och en tunn knytning i sidan.',
    upcycling: 'Ursprungsskjortan väljs för sin kvalitet och blir utgångspunkten för ett nytt plagg — inte ett material att dölja.',
    petiteNote: 'Axel- och ärmlängd balanseras med plaggets volym för att silhuetten ska kännas avsiktlig på en petite kropp.',
    related: 'Knot no. 01 — vinröd bomullssnodd med mjuk tofs.',
    imagePosition: 'center 27%',
  },
  {
    id: 'proportion-study-01',
    name: 'Proportion Study 01',
    area: 'MAKE',
    category: 'Symönster · Petite proportioner',
    image: '/images/pattern-study.svg',
    imageAlt: 'Grafisk mönsterstudie med proportioner och sömlinjer',
    material: 'Koncept för ett digitalt symönster i vävd kvalitet. Inga mönsterfiler eller måttguider finns att ladda ned.',
    story: 'Ett skjortmönster som börjar i proportionerna: kortare överkropp, balanserad ärm och en fåll placerad där plagget får sitt rätta fall.',
    craftsmanship: 'Utvecklat och provsytt i ateljén med tydliga instruktioner, måttdiagram och stegvisa arbetsbilder.',
    petiteNote: 'Utformat för petite proportioner från första mönsterlinjen — inte nedskalat från ett standardblock.',
    related: 'Matcha med The Crossing Shirt för en gemensam silhuett och en detalj i samma ton.',
  },
  {
    id: 'knot-no-01',
    name: 'Knot no. 01',
    area: 'ADORN',
    category: 'Handknuten detalj · Liten serie',
    image: '/images/knot-study.svg',
    imageAlt: 'Grafisk studie av en handknuten tråd med tofs',
    material: 'Växtfärgad bomullssnodd, återbrukad sidenrest och matt metallring.',
    story: 'En koreansk knut med lugn närvaro och en oväntad proportion. Bär den som smycke, fäst den i en skjorta eller låt den följa med från en look till nästa.',
    craftsmanship: 'Knutens form byggs långsamt för hand. Varje liten serie får variationer i färg och avslut.',
    related: 'Formgiven för att bäras tillsammans med The Crossing Shirt och andra plagg från ateljén.',
    imagePosition: 'center 46%',
  },
]

// Future pattern downloads: connect pattern pieces and instruction files here once real digital products are ready.

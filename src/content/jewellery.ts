// CONNECT colour system.
// Palette set by the founder: Ivory Buff, Deep Indigo, Cameo Pink (core), Ochre Red, Light Glaucous Blue (character)
// and Khaki, Vandyke Brown (earthy accents). Names and hex values mirror the tokens in src/index.css.
// Deep Indigo has separate screen (#0F1E6B) and print (#000831, CMYK 100/92/52/60) values.
// Everything below is editorial colour-study content: no stock, no verified materials, no purchasable variants.

export type ModuleColour = 'indigo' | 'ivory' | 'cameo' | 'ochre' | 'glaucous' | 'khaki' | 'vandyke'
export type ModuleId = 'knot' | 'cord' | 'bead' | 'tassel'
export type PaletteGroupId = 'core' | 'character' | 'earth'

export const colourDefinitions: Record<ModuleColour, { label: string; hex: string; detail?: string }> = {
  ivory: { label: 'Ivory Buff', hex: '#EBD999' },
  // Screen value is bluer than the print value, which would read as black on screen.
  indigo: { label: 'Deep Indigo', hex: '#0F1E6B', detail: 'Tryck: #000831 · CMYK 100/92/52/60' },
  cameo: { label: 'Cameo Pink', hex: '#E5BCBC' },
  ochre: { label: 'Ochre Red', hex: '#A7374B' },
  glaucous: { label: 'Light Glaucous Blue', hex: '#A6E6DB' },
  khaki: { label: 'Khaki', hex: '#C49007' },
  vandyke: { label: 'Vandyke Brown', hex: '#513412' },
}

export const colourLabels = Object.fromEntries(
  Object.entries(colourDefinitions).map(([id, { label }]) => [id, label]),
) as Record<ModuleColour, string>

export const paletteGroups: { id: PaletteGroupId; label: string; note: string; colours: ModuleColour[] }[] = [
  { id: 'core', label: 'Kärna', note: 'Basen i de flesta kombinationer.', colours: ['ivory', 'indigo', 'cameo'] },
  { id: 'character', label: 'Karaktär', note: 'Färgerna som syns först.', colours: ['ochre', 'glaucous'] },
  { id: 'earth', label: 'Jordiga accenter', note: 'Små, dämpade markeringar.', colours: ['khaki', 'vandyke'] },
]

export const allColours: ModuleColour[] = paletteGroups.flatMap((group) => group.colours)

export type ColourFamily = {
  id: string
  number: string
  label: string
  colours: { colour: ModuleColour; accent?: boolean }[]
  note: string
}

// Combinations 01-03 are the priority pairings; 04-06 bring in Cameo Pink and the earthy accents.
// A piece uses one family, or stays nearly monochrome. No piece shows every colour.
export const colourFamilies: ColourFamily[] = [
  {
    id: 'indigo-ivory', number: '01', label: 'Deep Indigo + Ivory Buff',
    colours: [{ colour: 'indigo' }, { colour: 'ivory' }],
    note: 'Mörkt och ljust i jämvikt. Ivory Buff bär lika gärna knut, snodd, pärla och tofs.',
  },
  {
    id: 'ochre-glaucous', number: '02', label: 'Ochre Red + Light Glaucous Blue',
    colours: [{ colour: 'ochre' }, { colour: 'glaucous' }],
    note: 'Varmt möter svalt. Det mest uttalade färgmötet — används sparsamt.',
  },
  {
    id: 'ivory-glaucous', number: '03', label: 'Ivory Buff + Light Glaucous Blue + Deep Indigo accent',
    colours: [{ colour: 'ivory' }, { colour: 'glaucous' }, { colour: 'indigo', accent: true }],
    note: 'Ljust och stilla. Deep Indigo förekommer bara som en liten detalj.',
  },
  {
    id: 'cameo-indigo', number: '04', label: 'Cameo Pink + Deep Indigo',
    colours: [{ colour: 'cameo' }, { colour: 'indigo' }],
    note: 'Mjukt möter djupt. Cameo Pink gör Deep Indigo varmare.',
  },
  {
    id: 'vandyke-khaki', number: '05', label: 'Vandyke Brown + Khaki',
    colours: [{ colour: 'vandyke' }, { colour: 'khaki' }],
    note: 'Jordigt och dämpat. Khaki ger ljus åt Vandyke Brown.',
  },
  {
    id: 'ivory-cameo', number: '06', label: 'Ivory Buff + Cameo Pink + Vandyke Brown accent',
    colours: [{ colour: 'ivory' }, { colour: 'cameo' }, { colour: 'vandyke', accent: true }],
    note: 'Nästan monokromt och stilla, med en liten jordig markering.',
  },
]

export type ModuleDefinition = { id: ModuleId; label: string; description: string }

export const jewelleryModules: ModuleDefinition[] = [
  { id: 'knot', label: 'KNOT', description: 'Knuten · första förbindelsen' },
  { id: 'cord', label: 'CORD', description: 'Snodden · bärande linje' },
  { id: 'bead', label: 'BEAD', description: 'Pärlan · en gemensam detalj' },
  { id: 'tassel', label: 'TASSEL', description: 'Tofsen · form i rörelse' },
]

export type ModuleSelection = Record<ModuleId, ModuleColour>

export const initialCombination: ModuleSelection = {
  knot: 'indigo', cord: 'indigo', bead: 'ivory', tassel: 'ivory',
}

// Starting points for the colour study. Each is a suggestion, not a product variant.
export const combinationPresets: { id: string; label: string; selection: ModuleSelection }[] = [
  { id: 'indigo-ivory', label: 'Deep Indigo + Ivory Buff', selection: initialCombination },
  { id: 'ochre-glaucous', label: 'Ochre Red + Light Glaucous Blue', selection: { knot: 'ochre', cord: 'ochre', bead: 'glaucous', tassel: 'glaucous' } },
  { id: 'ivory-glaucous', label: 'Ivory Buff + Light Glaucous Blue + Deep Indigo accent', selection: { knot: 'ivory', cord: 'indigo', bead: 'ivory', tassel: 'glaucous' } },
  { id: 'cameo-indigo', label: 'Cameo Pink + Deep Indigo', selection: { knot: 'cameo', cord: 'indigo', bead: 'indigo', tassel: 'cameo' } },
  { id: 'vandyke-khaki', label: 'Vandyke Brown + Khaki', selection: { knot: 'vandyke', cord: 'vandyke', bead: 'khaki', tassel: 'khaki' } },
  { id: 'ivory-cameo', label: 'Ivory Buff + Cameo Pink + Vandyke Brown accent', selection: { knot: 'ivory', cord: 'vandyke', bead: 'ivory', tassel: 'cameo' } },
]

export type ConnectKind = 'pendant' | 'earrings-long' | 'earrings-quiet' | 'bracelet' | 'bag-charm'
export type PieceRole = 'anchor' | 'statement' | 'quiet' | 'modular'

export type ConnectParts = {
  knot: ModuleColour
  cord: ModuleColour
  bead?: ModuleColour
  tassel?: ModuleColour
  accent?: ModuleColour
}

export type ConnectFamilyPiece = {
  id: string
  kind: ConnectKind
  name: string
  swedish: string
  role: PieceRole
  roleLabel: string
  colourway: string
  description: string
  parts: ConnectParts
}

// Not every colour in every piece: one anchor, one quiet piece, the rest demonstrate exchange between families.
export const connectPieces: ConnectFamilyPiece[] = [
  {
    id: 'signature-pendant', kind: 'pendant', name: 'Signature Pendant', swedish: 'Signaturhänge',
    role: 'anchor', roleLabel: 'Anchor · signature bead', colourway: 'Deep Indigo + Ivory Buff',
    description: 'En knut, en pärla. Den Ivory Buff-färgade signaturpärlan syns först — resten drar sig tillbaka mot Deep Indigo.',
    parts: { knot: 'indigo', cord: 'indigo', bead: 'ivory' },
  },
  {
    id: 'quiet-knot-earrings', kind: 'earrings-quiet', name: 'Quiet Knot Earrings', swedish: 'Stilla knutörhängen, utan tofs',
    role: 'quiet', roleLabel: 'Quiet · utan tofs', colourway: 'Cameo Pink · nära monokrom',
    description: 'Bara knuten, i en enda färg. Det stillaste smycket i familjen.',
    parts: { knot: 'cameo', cord: 'cameo' },
  },
  {
    id: 'long-knot-earrings', kind: 'earrings-long', name: 'Long Knot Earrings', swedish: 'Långa knutörhängen med tofs',
    role: 'statement', roleLabel: 'Statement · med tofs', colourway: 'Ochre Red + Light Glaucous Blue',
    description: 'Rörelsen ligger i tofsen. Ingen pärla — knuten och tofsen räcker.',
    parts: { knot: 'ochre', cord: 'ochre', tassel: 'glaucous' },
  },
  {
    id: 'modular-bracelet', kind: 'bracelet', name: 'Modular Bracelet', swedish: 'Modulärt armband',
    role: 'modular', roleLabel: 'Modular · utbytbara delar', colourway: 'Ivory Buff + Light Glaucous Blue + Deep Indigo accent',
    description: 'Delarna kan bytas mellan färgfamiljer. Deep Indigo är bara en liten pärla.',
    parts: { knot: 'ivory', cord: 'glaucous', bead: 'ivory', accent: 'indigo' },
  },
  {
    id: 'bag-charm', kind: 'bag-charm', name: 'Bag Charm', swedish: 'Väskberlock',
    role: 'modular', roleLabel: 'Modular · jordiga accenter', colourway: 'Vandyke Brown + Khaki + Ivory Buff',
    description: 'Samma delar som hänget i jordiga toner: Vandyke Brown och Khaki, med en Ivory Buff-tofs.',
    parts: { knot: 'vandyke', cord: 'vandyke', bead: 'khaki', tassel: 'ivory' },
  },
]

export type ElementKind = 'knot' | 'bead' | 'tassel'

// Interchangeable elements: a small selection per kind, deliberately not every colour.
export const connectElements: { kind: ElementKind; label: string; description: string; colours: ModuleColour[] }[] = [
  { kind: 'knot', label: 'KNOT', description: 'Knut', colours: ['indigo', 'ivory', 'cameo', 'vandyke'] },
  { kind: 'bead', label: 'BEAD', description: 'Signaturpärla', colours: ['ivory', 'glaucous', 'khaki', 'ochre'] },
  { kind: 'tassel', label: 'TASSEL', description: 'Tofs', colours: ['ivory', 'cameo', 'glaucous', 'ochre'] },
]

export const connectIntro = {
  eyebrow: 'The CONNECT family',
  title: 'One bead. Many pieces.',
  origin: 'Inspired by Korean decorative knotwork',
  lead: 'Fem smycken och ett bibliotek av utbytbara delar. Signaturpärlan är det som återkommer; övrigt är medvetet tystare. Inte varje del är lika dekorerad och inte varje färg finns i varje smycke.',
}

export const connectStatus = {
  disclosure:
    'Teckningarna är grafiska färgstudier, inte fotografier av färdiga fysiska produkter. Eventuella genererade konceptbilder är endast referenser för art direction och visas inte som produktbilder. Inga smycken är till salu, och konstruktion och material är ännu inte dokumenterade.',
  pending: [
    { label: 'Original atelier photography', status: 'Väntar' },
    { label: 'Macro photography of the physical signature bead', status: 'Väntar' },
    { label: 'Final approval of founder copy', status: 'Godkänd av grundaren' },
  ],
}

export const signatureBead = {
  title: 'THE SIGNATURE BEAD',
  subtitle: 'One detail. A connecting thread.',
  paragraphs: [
    'A recurring sculptural element designed to move between knots, tassels, jewellery and garments.',
    'Recognisable on its own. Designed to belong to something larger.',
  ],
  colourNote: 'Samma form i varje färg. Ivory Buff är en egen smyckesfärg, inte en neutral bakgrund.',
  colours: ['ivory', 'indigo', 'cameo', 'ochre', 'glaucous'] as ModuleColour[],
  // Macro study of the bead. Shown as a concept/art-direction image, not as a photograph of a finished physical product.
  // If this is replaced by the atelier's own macro photograph, update label, caption and the status list in connectStatus together.
  macroImage: {
    src: '/images/macro-signature-pearl.png',
    alt: 'Makrostudie av två blanka, glaserade pärlor med ett svängt tvåfärgsmönster och ett genomgående hål, en i Deep Indigo och rosa och en i Ivory och Ochre Red, på ljus linneduk. Konceptbild, inte ett foto av en färdig produkt.',
    label: 'Konceptbild · makrostudie',
    caption: 'Makrostudie av signaturpärlan som art direction-referens, inte ett fotografi av en färdig fysisk produkt.',
  },
  imageBrief: 'Makrofotografi av signaturpärlan, med hela formen och hålets anslutning synliga.',
}

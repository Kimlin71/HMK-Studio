// CONNECT colour system: language-independent data. Visible text lives in src/content/copy/.
// Palette set by the founder, based on Wada Sanzo's colour theory and named after his naming:
// Ivory Buff, Deep Indigo, Cameo Pink (core), Ochre Red, Light Glaucous Blue (character), Khaki, Vandyke Brown (earthy accents).
// Colour names are proper names and stay in English in both languages.
// Deep Indigo has separate screen (#0F1E6B) and print (#000831, CMYK 100/92/52/60) values.
// Everything here is editorial colour-study content: no stock, no verified materials, no purchasable variants.

export type ModuleColour = 'indigo' | 'ivory' | 'cameo' | 'ochre' | 'glaucous' | 'khaki' | 'vandyke'
/** Ids of the six colour families. Shared by the CONNECT study and both builders' presets. */
export type ColourFamilyId = 'indigo-ivory' | 'ochre-glaucous' | 'ivory-glaucous' | 'cameo-indigo' | 'vandyke-khaki' | 'ivory-cameo'
export type PaletteGroupId = 'core' | 'character' | 'earth'

export const colourDefinitions: Record<ModuleColour, { label: string; hex: string; printNote?: boolean }> = {
  ivory: { label: 'Ivory Buff', hex: '#EBD999' },
  indigo: { label: 'Deep Indigo', hex: '#0F1E6B', printNote: true },
  cameo: { label: 'Cameo Pink', hex: '#E5BCBC' },
  ochre: { label: 'Ochre Red', hex: '#A7374B' },
  glaucous: { label: 'Light Glaucous Blue', hex: '#A6E6DB' },
  khaki: { label: 'Khaki', hex: '#C49007' },
  vandyke: { label: 'Vandyke Brown', hex: '#513412' },
}

export const colourLabels = Object.fromEntries(
  Object.entries(colourDefinitions).map(([id, { label }]) => [id, label]),
) as Record<ModuleColour, string>

export const paletteGroups: { id: PaletteGroupId; colours: ModuleColour[] }[] = [
  { id: 'core', colours: ['ivory', 'indigo', 'cameo'] },
  { id: 'character', colours: ['ochre', 'glaucous'] },
  { id: 'earth', colours: ['khaki', 'vandyke'] },
]

export const allColours: ModuleColour[] = paletteGroups.flatMap((group) => group.colours)

// Combinations 01-03 are the priority pairings; 04-06 bring in Cameo Pink and the earthy accents.
// A piece uses one family, or stays nearly monochrome. No piece shows every colour.
export const colourFamilies: { id: ColourFamilyId; number: string; colours: { colour: ModuleColour; accent?: boolean }[] }[] = [
  { id: 'indigo-ivory', number: '01', colours: [{ colour: 'indigo' }, { colour: 'ivory' }] },
  { id: 'ochre-glaucous', number: '02', colours: [{ colour: 'ochre' }, { colour: 'glaucous' }] },
  { id: 'ivory-glaucous', number: '03', colours: [{ colour: 'ivory' }, { colour: 'glaucous' }, { colour: 'indigo', accent: true }] },
  { id: 'cameo-indigo', number: '04', colours: [{ colour: 'cameo' }, { colour: 'indigo' }] },
  { id: 'vandyke-khaki', number: '05', colours: [{ colour: 'vandyke' }, { colour: 'khaki' }] },
  { id: 'ivory-cameo', number: '06', colours: [{ colour: 'ivory' }, { colour: 'cameo' }, { colour: 'vandyke', accent: true }] },
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
  /** Product name: a proper name, kept in English in both languages. */
  name: string
  role: PieceRole
  parts: ConnectParts
}

// Not every colour in every piece: one anchor, one quiet piece, the rest demonstrate exchange between families.
export const connectPieces: ConnectFamilyPiece[] = [
  { id: 'signature-pendant', kind: 'pendant', name: 'Signature Pendant', role: 'anchor', parts: { knot: 'indigo', cord: 'indigo', bead: 'ivory' } },
  { id: 'quiet-knot-earrings', kind: 'earrings-quiet', name: 'Quiet Knot Earrings', role: 'quiet', parts: { knot: 'cameo', cord: 'cameo' } },
  { id: 'long-knot-earrings', kind: 'earrings-long', name: 'Long Knot Earrings', role: 'statement', parts: { knot: 'ochre', cord: 'ochre', tassel: 'glaucous' } },
  { id: 'modular-bracelet', kind: 'bracelet', name: 'Modular Bracelet', role: 'modular', parts: { knot: 'ivory', cord: 'glaucous', bead: 'ivory', accent: 'indigo' } },
  { id: 'bag-charm', kind: 'bag-charm', name: 'Bag Charm', role: 'modular', parts: { knot: 'vandyke', cord: 'vandyke', bead: 'khaki', tassel: 'ivory' } },
]

export type ElementKind = 'knot' | 'bead' | 'tassel'

// Interchangeable elements: a small selection per kind, deliberately not every colour.
export const connectElements: { kind: ElementKind; colours: ModuleColour[] }[] = [
  { kind: 'knot', colours: ['indigo', 'ivory', 'cameo', 'vandyke'] },
  { kind: 'bead', colours: ['ivory', 'glaucous', 'khaki', 'ochre'] },
  { kind: 'tassel', colours: ['ivory', 'cameo', 'glaucous', 'ochre'] },
]

export const signatureBeadColours: ModuleColour[] = ['ivory', 'indigo', 'cameo', 'ochre', 'glaucous']

// Macro study of the bead: a concept image, never a photograph of a finished physical product.
export const signatureBeadImage = '/images/macro-signature-pearl.png'

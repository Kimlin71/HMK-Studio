// CONNECT colour system: language-independent data. Visible text lives in src/content/copy/.
// Palette set by the founder, based on Wada Sanzo's colour theory and named after his naming:
// Ivory Buff, Deep Indigo, Cameo Pink (core), Ochre Red, Light Glaucous Blue (character), Khaki, Vandyke Brown (earthy accents).
// Colour names are proper names and stay in English in both languages.
// Deep Indigo has separate screen (#0F1E6B) and print (#000831, CMYK 100/92/52/60) values.
// Everything here is editorial colour-study content: no stock, no verified materials, no purchasable variants.

export type ModuleColour = 'indigo' | 'ivory' | 'cameo' | 'ochre' | 'glaucous' | 'khaki' | 'vandyke'
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

export type ElementKind = 'knot' | 'bead' | 'tassel'

export const signatureBeadColours: ModuleColour[] = ['ivory', 'indigo', 'cameo', 'ochre', 'glaucous']

// Macro study of the bead: a concept image, never a photograph of a finished physical product.
export const signatureBeadImage = '/images/macro-signature-pearl.jpg'

// Picture under the ACCENTED body text. The founder's own picture goes here; until the file exists a placeholder is shown.
export const connectFamilyImage = '/images/shop/connect/connect-family.webp'

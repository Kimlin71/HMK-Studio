// The signature pearl is always two colours: two halves divided by a curved line, with a dot of each colour in the other half.
// `pattern` is the direction of that dividing line: vertical (left and right halves) or horizontal (top and bottom halves).
// Language-independent data. Visible text lives in src/content/copy/ under `shop.signaturePearl`.

import type { ModuleColour } from './jewellery'

export type PearlPattern = 'vertical' | 'horizontal'

export const pearlPatterns: PearlPattern[] = ['vertical', 'horizontal']

export type SignaturePearlDesign = {
  first: ModuleColour
  second: ModuleColour
  pattern: PearlPattern
}

export const samePearl = (a: SignaturePearlDesign, b: SignaturePearlDesign) =>
  a.first === b.first && a.second === b.second && a.pattern === b.pattern

// Maedeup + Norigae builder: language-independent data. Visible text lives in src/content/copy/ under `shop.maedeup`.
// A Norigae is modelled as: top knot, pendant (the signature pearl, always present, two colours), an optional second element and a tassel.
// Knot styles are graphic studies inspired by Korean decorative knotwork, not documented techniques.
// Nothing here is stock, a product variant or an order.

import { allColours, type ColourFamilyId, type ModuleColour } from './jewellery'
import { samePearl, type SignaturePearlDesign } from './signaturePearl'

export type KnotStyleId = 'diamond' | 'layered' | 'ringed'
export type SecondElementId = 'none' | 'bead' | 'knot'
export type TasselLengthId = 'short' | 'medium' | 'long'

export const knotStyleIds: KnotStyleId[] = ['diamond', 'layered', 'ringed']
export const secondElementIds: SecondElementId[] = ['none', 'bead', 'knot']
export const tasselLengthIds: TasselLengthId[] = ['short', 'medium', 'long']

/** Colours offered for knot, cord, second element and tassel: the whole CONNECT palette. */
export const norigaeColours: ModuleColour[] = allColours

export type NorigaeDesign = {
  knotStyle: KnotStyleId
  knotColour: ModuleColour
  cordColour: ModuleColour
  /** The signature pearl: two colours and a pattern. There is deliberately no way to remove the pearl. */
  pendant: SignaturePearlDesign
  secondElement: SecondElementId
  secondColour: ModuleColour
  tasselColour: ModuleColour
  tasselLength: TasselLengthId
}

export const initialNorigae: NorigaeDesign = {
  knotStyle: 'diamond',
  knotColour: 'indigo',
  cordColour: 'indigo',
  pendant: { first: 'ivory', second: 'indigo', pattern: 'vertical' },
  secondElement: 'none',
  secondColour: 'ivory',
  tasselColour: 'ivory',
  tasselLength: 'medium',
}

/**
 * The design that the founder's photograph shows: everything Deep Indigo, a pearl in Deep Indigo and Cameo Pink, a long tassel, no second element.
 * While the customer's design equals this one, the photograph is a true preview.
 */
export const norigaeShowcase: NorigaeDesign = {
  knotStyle: 'ringed',
  knotColour: 'indigo',
  cordColour: 'indigo',
  pendant: { first: 'indigo', second: 'cameo', pattern: 'vertical' },
  secondElement: 'none',
  secondColour: 'indigo',
  tasselColour: 'indigo',
  tasselLength: 'long',
}
export const norigaePhoto = '/images/shop/norigae/norigae-reference.webp'

export function isNorigaeShowcase(design: NorigaeDesign) {
  const s = norigaeShowcase
  return (
    design.knotStyle === s.knotStyle &&
    design.knotColour === s.knotColour &&
    design.cordColour === s.cordColour &&
    samePearl(design.pendant, s.pendant) &&
    design.secondElement === s.secondElement &&
    (design.secondElement === 'none' || design.secondColour === s.secondColour) &&
    design.tasselColour === s.tasselColour &&
    design.tasselLength === s.tasselLength
  )
}

export type NorigaeColourField = 'knotColour' | 'cordColour' | 'secondColour' | 'tasselColour'

// Colour starting points. Ids match colourFamilies so the family names in copy.connect.families are reused.
// A preset sets colours only: the knot style, tassel length and pearl pattern stay.
export const norigaePresets: { id: ColourFamilyId; colours: Pick<NorigaeDesign, NorigaeColourField>; pearl: [ModuleColour, ModuleColour] }[] = [
  { id: 'indigo-ivory', pearl: ['ivory', 'indigo'], colours: { knotColour: 'indigo', cordColour: 'indigo', secondColour: 'ivory', tasselColour: 'ivory' } },
  { id: 'ochre-glaucous', pearl: ['glaucous', 'ochre'], colours: { knotColour: 'ochre', cordColour: 'ochre', secondColour: 'glaucous', tasselColour: 'glaucous' } },
  { id: 'ivory-glaucous', pearl: ['ivory', 'glaucous'], colours: { knotColour: 'ivory', cordColour: 'indigo', secondColour: 'glaucous', tasselColour: 'glaucous' } },
  { id: 'cameo-indigo', pearl: ['indigo', 'cameo'], colours: { knotColour: 'cameo', cordColour: 'indigo', secondColour: 'cameo', tasselColour: 'cameo' } },
  { id: 'vandyke-khaki', pearl: ['ivory', 'ochre'], colours: { knotColour: 'vandyke', cordColour: 'vandyke', secondColour: 'khaki', tasselColour: 'khaki' } },
  { id: 'ivory-cameo', pearl: ['ivory', 'cameo'], colours: { knotColour: 'ivory', cordColour: 'vandyke', secondColour: 'cameo', tasselColour: 'cameo' } },
]

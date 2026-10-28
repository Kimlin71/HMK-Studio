// Maedeup + Norigae builder: language-independent data. Visible text lives in src/content/copy/ under `shop.maedeup`.
// A Norigae is modelled as: top knot, pendant (the signature pearl, always present, two colours) and a tassel.
// The knot is one fixed shape, a graphic study inspired by Korean decorative knotwork, not a documented technique.
// Nothing here is stock, a product variant or an order.

import { allColours, type ModuleColour } from './jewellery.ts'
import { samePearl, type SignaturePearlDesign } from './signaturePearl.ts'

export type TasselLengthId = 'short' | 'medium' | 'long'

export const tasselLengthIds: TasselLengthId[] = ['short', 'medium', 'long']

/** Colours offered for knot, cord, second element and tassel: the whole CONNECT palette. */
export const norigaeColours: ModuleColour[] = allColours

export type NorigaeDesign = {
  knotColour: ModuleColour
  cordColour: ModuleColour
  /** The signature pearl: two colours and a pattern. There is deliberately no way to remove the pearl. */
  pendant: SignaturePearlDesign
  tasselColour: ModuleColour
  tasselLength: TasselLengthId
}

export const initialNorigae: NorigaeDesign = {
  knotColour: 'indigo',
  cordColour: 'indigo',
  pendant: { first: 'ivory', second: 'indigo', pattern: 'vertical' },
  tasselColour: 'ivory',
  tasselLength: 'medium',
}

/**
 * The design that the founder's photograph shows: Deep Indigo knot and cord, a pearl in Deep Indigo and Cameo Pink, a long Cameo Pink tassel.
 * While the customer's design equals this one, the photograph is a true preview.
 */
export const norigaeShowcase: NorigaeDesign = {
  knotColour: 'indigo',
  cordColour: 'indigo',
  pendant: { first: 'indigo', second: 'cameo', pattern: 'vertical' },
  tasselColour: 'cameo',
  tasselLength: 'long',
}
export const norigaePhoto = '/images/shop/norigae/norigae-reference.webp'

export function isNorigaeShowcase(design: NorigaeDesign) {
  const s = norigaeShowcase
  return (
    design.knotColour === s.knotColour &&
    design.cordColour === s.cordColour &&
    samePearl(design.pendant, s.pendant) &&
    design.tasselColour === s.tasselColour &&
    design.tasselLength === s.tasselLength
  )
}

export type NorigaeColourField = 'knotColour' | 'cordColour' | 'tasselColour'

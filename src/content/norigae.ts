// Maedeup + Norigae builder: language-independent data. Visible text lives in src/content/copy/ under `shop.maedeup`.
// A Norigae is modelled as: top knot, pendant (the signature pearl, always present), an optional second element and a tassel.
// Knot styles are graphic studies inspired by Korean decorative knotwork, not documented techniques.
// Nothing here is stock, a product variant or an order.

import { allColours, signatureBeadColours, type ColourFamilyId, type ModuleColour } from './jewellery'

export type KnotStyleId = 'diamond' | 'layered' | 'ringed'
export type SecondElementId = 'none' | 'bead' | 'knot'
export type TasselLengthId = 'short' | 'medium' | 'long'

export const knotStyleIds: KnotStyleId[] = ['diamond', 'layered', 'ringed']
export const secondElementIds: SecondElementId[] = ['none', 'bead', 'knot']
export const tasselLengthIds: TasselLengthId[] = ['short', 'medium', 'long']

/** Colours offered for knot, cord, second element and tassel: the whole CONNECT palette. */
export const norigaeColours: ModuleColour[] = allColours
/** The pendant is always the signature pearl, so only the pearl colours are offered. */
export const pendantColours: ModuleColour[] = signatureBeadColours

export type NorigaeDesign = {
  knotStyle: KnotStyleId
  knotColour: ModuleColour
  cordColour: ModuleColour
  /** Colour of the signature pearl. There is deliberately no way to remove the pearl. */
  pendantColour: ModuleColour
  secondElement: SecondElementId
  secondColour: ModuleColour
  tasselColour: ModuleColour
  tasselLength: TasselLengthId
}

export const initialNorigae: NorigaeDesign = {
  knotStyle: 'diamond',
  knotColour: 'indigo',
  cordColour: 'indigo',
  pendantColour: 'ivory',
  secondElement: 'none',
  secondColour: 'ivory',
  tasselColour: 'ivory',
  tasselLength: 'medium',
}

export type NorigaeColourField = 'knotColour' | 'cordColour' | 'pendantColour' | 'secondColour' | 'tasselColour'

type NorigaeColours = Pick<NorigaeDesign, NorigaeColourField>

// Colour starting points. Ids match colourFamilies so the family names in copy.connect.families are reused.
export const norigaePresets: { id: ColourFamilyId; colours: NorigaeColours }[] = [
  { id: 'indigo-ivory', colours: { knotColour: 'indigo', cordColour: 'indigo', pendantColour: 'ivory', secondColour: 'ivory', tasselColour: 'ivory' } },
  { id: 'ochre-glaucous', colours: { knotColour: 'ochre', cordColour: 'ochre', pendantColour: 'glaucous', secondColour: 'glaucous', tasselColour: 'glaucous' } },
  { id: 'ivory-glaucous', colours: { knotColour: 'ivory', cordColour: 'indigo', pendantColour: 'ivory', secondColour: 'glaucous', tasselColour: 'glaucous' } },
  { id: 'cameo-indigo', colours: { knotColour: 'cameo', cordColour: 'indigo', pendantColour: 'indigo', secondColour: 'cameo', tasselColour: 'cameo' } },
  { id: 'vandyke-khaki', colours: { knotColour: 'vandyke', cordColour: 'vandyke', pendantColour: 'ivory', secondColour: 'khaki', tasselColour: 'khaki' } },
  { id: 'ivory-cameo', colours: { knotColour: 'ivory', cordColour: 'vandyke', pendantColour: 'ivory', secondColour: 'cameo', tasselColour: 'cameo' } },
]

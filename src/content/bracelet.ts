// Bracelet choices: language-independent data. Visible text lives in src/content/copy/ under `shop.bracelet`.
// The customer picks one of three designs and can then change the colours. The signature pearl is part of every design.
// Colour study only: nothing here is stock, a price or a purchasable variant, and nothing is stored or sent.
import { allColours, type ColourFamilyId, type ModuleColour } from './jewellery'
import type { SignaturePearlDesign } from './signaturePearl'

export type BeadType = 'pearl' | 'crystal'
export type WristSize = 's' | 'm' | 'l'
export type BraceletStyleId = 'no-1' | 'no-2' | 'no-3'

export type BraceletColours = {
  cord: ModuleColour
  beadColour: ModuleColour
  /** Two colours and a pattern. The pearl can never be removed. */
  signature: SignaturePearlDesign
}

export type BraceletStyle = {
  id: BraceletStyleId
  /** English proper name, shown in both languages. */
  name: string
  beadType: BeadType
  /** Total number of beads including the signature pearl. Always odd so the signature pearl can sit in the centre. */
  beadCount: number
  knotBands: boolean
  /** Photo of the design in its base colours. Placeholder path until the founder's photographs are in place. */
  photo: string
  /** The colours the photograph shows. */
  base: BraceletColours
}

export const braceletStyles: Record<BraceletStyleId, BraceletStyle> = {
  'no-1': {
    id: 'no-1',
    name: 'Signature Bracelet No. 1',
    beadType: 'pearl',
    beadCount: 5,
    knotBands: true,
    photo: '/images/shop/bracelets/bracelet-1.webp',
    base: { cord: 'indigo', beadColour: 'ivory', signature: { first: 'ochre', second: 'ivory', pattern: 'vertical' } },
  },
  'no-2': {
    id: 'no-2',
    name: 'Signature Bracelet No. 2',
    beadType: 'crystal',
    beadCount: 7,
    knotBands: true,
    photo: '/images/shop/bracelets/bracelet-2.webp',
    base: { cord: 'ochre', beadColour: 'glaucous', signature: { first: 'ivory', second: 'indigo', pattern: 'horizontal' } },
  },
  'no-3': {
    id: 'no-3',
    name: 'Signature Bracelet No. 3',
    beadType: 'pearl',
    beadCount: 3,
    knotBands: false,
    photo: '/images/shop/bracelets/bracelet-3.webp',
    base: { cord: 'vandyke', beadColour: 'ivory', signature: { first: 'cameo', second: 'vandyke', pattern: 'vertical' } },
  },
}

export const braceletStyleIds: BraceletStyleId[] = ['no-1', 'no-2', 'no-3']

export type BraceletDesign = BraceletColours & {
  style: BraceletStyleId
  size: WristSize
}

export const braceletCordColours: ModuleColour[] = allColours
export const braceletBeadColours: ModuleColour[] = allColours
export const braceletSizes: WristSize[] = ['s', 'm', 'l']

export const defaultBraceletDesign: BraceletDesign = { style: 'no-1', size: 'm', ...braceletStyles['no-1'].base }

/** True while the colours are those of the photograph, so the photograph is a true preview. */
export function hasBaseColours(design: BraceletDesign) {
  const { base } = braceletStyles[design.style]
  return (
    design.cord === base.cord &&
    design.beadColour === base.beadColour &&
    design.signature.first === base.signature.first &&
    design.signature.second === base.signature.second &&
    design.signature.pattern === base.signature.pattern
  )
}

// Colour starting points, not product variants. Ids match colourFamilies, so labels come from copy.connect.families.
// A preset sets colours only: the chosen design, size and pearl pattern stay.
export const braceletPresets: { id: ColourFamilyId; cord: ModuleColour; beadColour: ModuleColour; pearl: [ModuleColour, ModuleColour] }[] = [
  { id: 'indigo-ivory', cord: 'indigo', beadColour: 'ivory', pearl: ['ochre', 'ivory'] },
  { id: 'ochre-glaucous', cord: 'ochre', beadColour: 'glaucous', pearl: ['ivory', 'ochre'] },
  { id: 'ivory-glaucous', cord: 'ivory', beadColour: 'glaucous', pearl: ['indigo', 'ivory'] },
  { id: 'cameo-indigo', cord: 'cameo', beadColour: 'indigo', pearl: ['ivory', 'cameo'] },
  { id: 'vandyke-khaki', cord: 'vandyke', beadColour: 'khaki', pearl: ['ivory', 'ochre'] },
  { id: 'ivory-cameo', cord: 'vandyke', beadColour: 'ivory', pearl: ['cameo', 'ivory'] },
]

// Bracelet builder: language-independent data. Visible text lives in src/content/copy/ under `shop.bracelet`.
// Colour study only: nothing here is stock, a price or a purchasable variant, and nothing is stored or sent.
import { allColours, signatureBeadColours, type ColourFamilyId, type ModuleColour } from './jewellery'

export type BeadType = 'pearl' | 'crystal'
export type WristSize = 's' | 'm' | 'l'

export type BraceletDesign = {
  cord: ModuleColour
  beadType: BeadType
  beadColour: ModuleColour
  /** Total number of beads including the signature pearl. Always odd so the signature pearl can sit in the centre. */
  beadCount: number
  size: WristSize
  /** The signature pearl is part of every design. It has a colour but can never be removed. */
  signatureColour: ModuleColour
}

export const braceletCordColours: ModuleColour[] = allColours
export const braceletBeadColours: ModuleColour[] = allColours
export const braceletSignatureColours: ModuleColour[] = signatureBeadColours
export const braceletBeadTypes: BeadType[] = ['pearl', 'crystal']
export const braceletSizes: WristSize[] = ['s', 'm', 'l']
export const braceletBeadCounts: number[] = [3, 5, 7, 9]

export const defaultBraceletDesign: BraceletDesign = {
  cord: 'indigo',
  beadType: 'pearl',
  beadColour: 'ivory',
  beadCount: 5,
  size: 'm',
  signatureColour: 'ochre',
}

// Starting points, not product variants. Ids match colourFamilies, so labels come from copy.connect.families.
export const braceletPresets: { id: ColourFamilyId; design: Omit<BraceletDesign, 'size'> }[] = [
  { id: 'indigo-ivory', design: { cord: 'indigo', beadType: 'pearl', beadColour: 'ivory', beadCount: 5, signatureColour: 'ochre' } },
  { id: 'ochre-glaucous', design: { cord: 'ochre', beadType: 'crystal', beadColour: 'glaucous', beadCount: 7, signatureColour: 'ivory' } },
  { id: 'ivory-glaucous', design: { cord: 'ivory', beadType: 'crystal', beadColour: 'glaucous', beadCount: 5, signatureColour: 'indigo' } },
  { id: 'cameo-indigo', design: { cord: 'cameo', beadType: 'pearl', beadColour: 'indigo', beadCount: 7, signatureColour: 'ivory' } },
  { id: 'vandyke-khaki', design: { cord: 'vandyke', beadType: 'pearl', beadColour: 'khaki', beadCount: 5, signatureColour: 'ivory' } },
  { id: 'ivory-cameo', design: { cord: 'vandyke', beadType: 'pearl', beadColour: 'ivory', beadCount: 3, signatureColour: 'cameo' } },
]

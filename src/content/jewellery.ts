export type ModuleColour = 'indigo' | 'ochre' | 'ivory' | 'celadon' | 'signature'
export type ModuleId = 'knot' | 'bead' | 'tassel'

type ModuleOption = { id: ModuleColour; label: string }
type JewelleryModule = {
  id: ModuleId
  label: string
  description: string
  options: ModuleOption[]
}

const colours: ModuleOption[] = [
  { id: 'indigo', label: 'Indigo' },
  { id: 'ochre', label: 'Ochre' },
  { id: 'ivory', label: 'Ivory' },
  { id: 'celadon', label: 'Celadon' },
]

// Editorial choices only: these do not represent stock, purchasable variants or verified colours.
export const jewelleryModules: JewelleryModule[] = [
  { id: 'knot', label: 'KNOT', description: 'Knuten · första förbindelsen', options: colours },
  {
    id: 'bead', label: 'BEAD', description: 'Pärlan · en gemensam detalj',
    options: [
      { id: 'signature', label: 'Signature' },
      { id: 'ivory', label: 'Ivory' },
      { id: 'celadon', label: 'Celadon' },
      { id: 'ochre', label: 'Ochre' },
    ],
  },
  { id: 'tassel', label: 'TASSEL', description: 'Tofsen · form i rörelse', options: colours },
]

export const initialCombination: Record<ModuleId, ModuleColour> = {
  knot: 'indigo', bead: 'signature', tassel: 'ivory',
}

export const signatureBead = {
  title: 'THE SIGNATURE BEAD',
  subtitle: 'One detail. A connecting thread.',
  paragraphs: [
    'A recurring sculptural element designed to move between knots, tassels, jewellery and garments.',
    'Recognisable on its own. Designed to belong to something larger.',
  ],
  imageBrief: 'Makrofotografi av signaturpärlan, med hela formen och hålets anslutning synliga.',
}
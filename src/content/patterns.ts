// Sewing patterns for sale in the prototype shop. Language-independent data. Visible text lives in src/content/copy/ under `pattern.products`.
// DEMO CONTENT: dummy patterns. They have no construction rules: the customer's five measurements go into the cart and nothing is drawn or fitted.
import type { MeasurementSetId } from './pattern.ts'

// To add a pattern: add its id here, its picture under public/images/shop/patterns/, its text in sv.ts and en.ts, and run `npm run make:pattern-pdf`.

export type PatternProductId = 'pattern-1' | 'pattern-2' | 'pattern-3'

export type SkillLevel = 'beginnerIntermediate'

export type PatternFabric = 'outer' | 'lining' | 'tie'

export type PatternMaterial = 'silkInterfacing'

export type PatternProduct = {
  id: PatternProductId
  /** English proper name, shown in both languages. */
  name: string
  image: string
  /** The fixed demo PDF, made by scripts/make-pattern-pdf.mjs. */
  pdf: string
  /** Which measurements the customer is asked for. */
  measurements: MeasurementSetId
  skill?: SkillLevel
  /** Left out when the pattern has no fabric table yet. */
  fabrics: { fabric: PatternFabric; widthCm: number; yards: number }[]
  extras: { material: PatternMaterial; widthCm: number; yards: number }[]
}

export const patternProducts: PatternProduct[] = [
  {
    id: 'pattern-1',
    name: 'Women’s Hanbok Vest Korean Pattern',
    image: '/images/shop/patterns/pattern-1.jpg',
    pdf: '/patterns/pattern-1-demo.pdf',
    measurements: 'top',
    skill: 'beginnerIntermediate',
    fabrics: [
      { fabric: 'outer', widthCm: 140, yards: 1 },
      { fabric: 'lining', widthCm: 145, yards: 1.5 },
      { fabric: 'tie', widthCm: 135, yards: 0.5 },
    ],
    extras: [{ material: 'silkInterfacing', widthCm: 110, yards: 1 }],
  },
  {
    id: 'pattern-2',
    name: 'Mandarin Neck Flare Sleeve Crop Blouse Sewing Pattern',
    image: '/images/shop/patterns/pattern-2.jpg',
    pdf: '/patterns/pattern-2-demo.pdf',
    measurements: 'top',
    fabrics: [],
    extras: [],
  },
  {
    id: 'pattern-3',
    name: 'Pleated Ankle Trousers Sewing Pattern',
    image: '/images/shop/patterns/pattern-3.jpg',
    pdf: '/patterns/pattern-3-demo.pdf',
    measurements: 'trousers',
    fabrics: [],
    extras: [],
  },
]

export const getPatternProduct = (id: PatternProductId) => patternProducts.find((product) => product.id === id)

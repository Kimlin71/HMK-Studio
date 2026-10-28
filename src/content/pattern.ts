// Measured pattern (sv: måttanpassat mönster): plain module, no React and no DOM.
// Five measurements in, pattern pieces out. This is the seam to a real shop: the same function can move to a server.
// Language-independent data. Visible text lives in src/content/copy/ under `pattern`.
// DEMO CONTENT: a prototype for demonstration, not a tested pattern.
//
// Garment: a straight shirt following `proportion-study-01` ("shorter upper body, balanced sleeve, hem where the garment falls right").
// Waist and hip are not measured because the shirt is straight.

export type MeasurementKey = 'shoulder' | 'bust' | 'upperBody' | 'sleeve' | 'length'

export const measurementKeys: MeasurementKey[] = ['shoulder', 'bust', 'upperBody', 'sleeve', 'length']

/** All five measurements, in cm. */
export type Measurements = Record<MeasurementKey, number>

/** What a form holds: a number, or null while a field is empty or unreadable. */
export type MeasurementInput = Record<MeasurementKey, number | null>

/** The fictional customer's measurements ("Kund Demo"). Not a real person. */
export const demoMeasurements: Measurements = { shoulder: 37, bust: 88, upperBody: 36, sleeve: 56, length: 62 }

/** Plausible ranges in cm, inclusive. Shown as a hint and used for validation. */
export const measurementRanges: Record<MeasurementKey, { min: number; max: number }> = {
  shoulder: { min: 32, max: 46 },
  bust: { min: 76, max: 120 },
  upperBody: { min: 31, max: 48 },
  sleeve: { min: 46, max: 68 },
  length: { min: 50, max: 90 },
}

export type MeasurementError = 'required' | 'tooLow' | 'tooHigh' | 'shoulderVsBust' | 'lengthVsUpperBody'

export type MeasurementErrors = Partial<Record<MeasurementKey, MeasurementError>>

/** The hem must fall at least this far below the waist. */
const MIN_HEM_BELOW_WAIST_CM = 6

/**
 * Reads what a person typed in a measurement field: comma or point as the decimal mark. Empty or unreadable text is null.
 * A negative number is returned as it is, so validation can say it is too small.
 */
export function readMeasurementField(text: string): number | null {
  const cleaned = text.trim().replace(',', '.')
  if (cleaned === '') return null
  const value = Number(cleaned)
  return Number.isFinite(value) ? value : null
}

/**
 * One error code per field, nothing for a valid field.
 * 1. Each value must be present and inside its plausible range.
 * 2. Two cross rules, checked only when both fields are in range:
 *    - the shoulder must fit inside the bust: shoulder <= bust / 2 - 1 (otherwise the armhole collapses);
 *    - the hem must fall below the waist: length >= upper-body length + 6 cm.
 */
export function validateMeasurements(input: MeasurementInput): MeasurementErrors {
  const errors: MeasurementErrors = {}
  for (const key of measurementKeys) {
    const value = input[key]
    const { min, max } = measurementRanges[key]
    if (value === null || !Number.isFinite(value)) errors[key] = 'required'
    else if (value < min) errors[key] = 'tooLow'
    else if (value > max) errors[key] = 'tooHigh'
  }
  if (!errors.shoulder && !errors.bust && input.shoulder! > input.bust! / 2 - 1) errors.shoulder = 'shoulderVsBust'
  if (!errors.upperBody && !errors.length && input.length! < input.upperBody! + MIN_HEM_BELOW_WAIST_CM) errors.length = 'lengthVsUpperBody'
  return errors
}

/** All five values, or null when any field is invalid. */
export function toMeasurements(input: MeasurementInput): Measurements | null {
  return Object.keys(validateMeasurements(input)).length === 0 ? (input as Measurements) : null
}

/** Anchor of the measurement form in the MAKE section. */
export const patternAnchor = 'mattanpassat-monster'

/** A measurement for display: decimal comma in Swedish, point in English, always with its unit. */
export const formatMeasurement = (value: number, language: 'sv' | 'en') =>
  `${language === 'sv' ? String(value).replace('.', ',') : String(value)}\u00a0cm`

export const sameMeasurements = (a: Measurements, b: Measurements) => measurementKeys.every((key) => a[key] === b[key])

/** A point in cm. x grows to the right, y grows downwards. */
export type Point = readonly [number, number]

export type PatternPieceId = 'back' | 'front' | 'sleeve'

export type PatternEdge = { id: string; points: Point[] }

export type PatternMark = {
  key: MeasurementKey
  from: Point
  to: Point
  /** Where the label goes, as the position of its first line, and which side of that point the text grows to. */
  label: { at: Point; anchor: 'start' | 'middle' | 'end' }
}

export type PatternPiece = {
  id: PatternPieceId
  /** Left edge of the piece (0 for the body pieces, minus the half bicep for the sleeve). Width and height are in cm. */
  minX: number
  width: number
  height: number
  /** Closed outline, first point repeated at the end. */
  outline: Point[]
  edges: PatternEdge[]
  /** Edge id that sits on the fold of the fabric, if any. */
  foldEdge?: string
  grainLine: { from: Point; to: Point }
  /** Where the piece name starts (text anchored at its start). */
  nameAt: Point
  marks: PatternMark[]
}

/** Seam edges that should match must agree within this many cm. */
export const SEAM_TOLERANCE_CM = 0.3
/** The sleeve cap is a little longer than the two armholes together, so the sleeve can be eased in. */
export const CAP_EASE_CM = 1.5

// Fixed construction values, in cm.
const BODY_EASE_CM = 10 // total ease on the bust, shared by four quarters
const NECK_HALF_CM = 7
const BACK_NECK_DROP_CM = 2
const FRONT_NECK_DROP_CM = 7
const SHOULDER_DROP_CM = 4
const UNDERARM_SHARE = 0.55 // underarm sits at 55 % of the neck-to-waist length
const BICEP_SHARE = 0.38 // half the bicep is 38 % of the armhole length
const WRIST_SHARE = 0.62 // half the wrist is 62 % of half the bicep
const CURVE_STEPS = 16

export const polylineLength = (points: readonly Point[]) =>
  points.slice(1).reduce((sum, [x, y], index) => sum + Math.hypot(x - points[index][0], y - points[index][1]), 0)

function curve(start: Point, control: Point, end: Point): Point[] {
  return Array.from({ length: CURVE_STEPS + 1 }, (_, index) => {
    const t = index / CURVE_STEPS
    const a = (1 - t) * (1 - t)
    const b = 2 * (1 - t) * t
    const c = t * t
    return [a * start[0] + b * control[0] + c * end[0], a * start[1] + b * control[1] + c * end[1]] as const
  })
}

const line = (start: Point, end: Point): Point[] => [start, end]

function closedOutline(edges: PatternEdge[]): Point[] {
  return edges.flatMap((edge, index) => (index === 0 ? edge.points : edge.points.slice(1)))
}

/**
 * How each measurement changes each piece. Back and front are drawn as halves with the centre on the fold (x = 0).
 *
 * Shoulder width (1): half of it is the x of the shoulder point on back and front, and it sets the width of the back
 *   shoulder seam. The sleeve cap follows through the armhole.
 * Bust (2): each half piece is (bust + 10) / 4 wide, so the side seams sit one quarter of the bust plus ease from the fold.
 * Upper-body length (3): neck to waist. The underarm level is 55 % of it, so a shorter upper body gives a shallower armhole.
 *   The waist mark sits at this length.
 * Sleeve length (4): the sleeve piece is exactly this long, from the top of the cap to the wrist.
 * Desired garment length (5): the hem of back and front sits this far below the high point of the shoulder.
 *
 * Seams that must agree:
 *   - back and front side seams run from the underarm to the hem, so they are equal;
 *   - back and front shoulder seams run between the same two points, so they are equal;
 *   - the sleeve cap is solved (bisection on its height) so its length equals back armhole + front armhole + CAP_EASE_CM.
 * The sleeve width is derived from that cap length, so any set of valid measurements gives a sleeve that fits.
 */
export function generatePattern(m: Measurements): PatternPiece[] {
  const half = m.shoulder / 2
  const width = (m.bust + BODY_EASE_CM) / 4
  const underarm = m.upperBody * UNDERARM_SHARE
  const hem = m.length
  const neck: Point = [NECK_HALF_CM, 0]
  const shoulderPoint: Point = [half, SHOULDER_DROP_CM]
  const underarmPoint: Point = [width, underarm]
  const hemSide: Point = [width, hem]

  const body = (id: 'back' | 'front'): PatternPiece => {
    const isBack = id === 'back'
    const neckDrop = isBack ? BACK_NECK_DROP_CM : FRONT_NECK_DROP_CM
    const centreTop: Point = [0, neckDrop]
    const edges: PatternEdge[] = [
      { id: 'neck', points: curve(centreTop, [NECK_HALF_CM * 0.6, neckDrop], neck) },
      { id: 'shoulder', points: line(neck, shoulderPoint) },
      { id: 'armhole', points: curve(shoulderPoint, [isBack ? half : half - 1.2, underarm], underarmPoint) },
      { id: 'side', points: line(underarmPoint, hemSide) },
      { id: 'hem', points: line(hemSide, [0, hem]) },
      { id: 'centre', points: line([0, hem], centreTop) },
    ]
    // Labels are two short lines (name, value) placed inside the piece, clear of the other marks, the grain line and the piece name.
    const marks: PatternMark[] = isBack
      ? [
          { key: 'shoulder', from: [0, SHOULDER_DROP_CM], to: [half, SHOULDER_DROP_CM], label: { at: [half / 2, SHOULDER_DROP_CM + 1.5], anchor: 'middle' } },
          { key: 'length', from: [2.5, BACK_NECK_DROP_CM], to: [2.5, hem], label: { at: [3.4, hem / 2 - 1.5], anchor: 'start' } },
        ]
      : [
          { key: 'bust', from: [0, underarm], to: [width, underarm], label: { at: [width - 0.8, underarm + 1.5], anchor: 'end' } },
          { key: 'upperBody', from: [NECK_HALF_CM, 0], to: [NECK_HALF_CM, m.upperBody], label: { at: [NECK_HALF_CM + 1, 14], anchor: 'start' } },
        ]
    return {
      id,
      minX: 0,
      width,
      height: hem,
      outline: closedOutline(edges),
      edges,
      foldEdge: 'centre',
      grainLine: { from: [width * (isBack ? 0.62 : 0.72), underarm + 6], to: [width * (isBack ? 0.62 : 0.72), hem - 9] },
      nameAt: [4.5, hem - 3],
      marks,
    }
  }

  const back = body('back')
  const front = body('front')
  const armholeLength = (piece: PatternPiece) => polylineLength(piece.edges.find((edge) => edge.id === 'armhole')!.points)
  const capTarget = armholeLength(back) + armholeLength(front) + CAP_EASE_CM

  const bicep = BICEP_SHARE * capTarget
  const halfCap = (capHeight: number) => polylineLength(curve([-bicep, capHeight], [-bicep * 0.8, 0], [0, 0]))
  let low = 0
  let high = m.sleeve
  for (let step = 0; step < 60; step += 1) {
    const middle = (low + high) / 2
    if (2 * halfCap(middle) < capTarget) low = middle
    else high = middle
  }
  const capHeight = (low + high) / 2
  const wrist = WRIST_SHARE * bicep
  const capLeft = curve([-bicep, capHeight], [-bicep * 0.8, 0], [0, 0])
  const capRight = curve([bicep, capHeight], [bicep * 0.8, 0], [0, 0]).reverse()
  const sleeveEdges: PatternEdge[] = [
    { id: 'cap', points: [...capLeft, ...capRight.slice(1)] },
    { id: 'underarmRight', points: line([bicep, capHeight], [wrist, m.sleeve]) },
    { id: 'hem', points: line([wrist, m.sleeve], [-wrist, m.sleeve]) },
    { id: 'underarmLeft', points: line([-wrist, m.sleeve], [-bicep, capHeight]) },
  ]
  const sleeve: PatternPiece = {
    id: 'sleeve',
    minX: -bicep,
    width: 2 * bicep,
    height: m.sleeve,
    outline: closedOutline(sleeveEdges),
    edges: sleeveEdges,
    grainLine: { from: [bicep * 0.45, capHeight + 4], to: [bicep * 0.45, m.sleeve - 9] },
    nameAt: [-wrist + 1, m.sleeve - 3],
    marks: [{ key: 'sleeve', from: [0, 0], to: [0, m.sleeve], label: { at: [-0.8, m.sleeve * 0.45], anchor: 'end' } }],
  }

  return [back, front, sleeve]
}

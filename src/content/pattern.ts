// Measurements for the dummy patterns in the prototype shop: plain module, no React and no DOM.
// Each pattern asks for its own set of measurements (a top asks for five, trousers for four). They are checked for plausibility and go
// into the cart with the pattern.
// DEMO CONTENT: no pattern is drawn or fitted from them. A real shop would feed them to the pattern rules on a server.
// Language-independent data. Visible text lives in src/content/copy/ under `pattern`.

import type { Language } from './copy/types.ts'

export type MeasurementKey = 'shoulder' | 'bust' | 'upperBody' | 'sleeve' | 'length' | 'waist' | 'hip' | 'inseam' | 'crotch'

/** Which measurements a pattern asks for. */
export type MeasurementSetId = 'top' | 'trousers'

export const measurementSets: Record<MeasurementSetId, MeasurementKey[]> = {
  top: ['shoulder', 'bust', 'upperBody', 'sleeve', 'length'],
  trousers: ['waist', 'hip', 'inseam', 'crotch'],
}

/** Measurements in cm. A set holds only the keys the pattern asks for. */
export type Measurements = Partial<Record<MeasurementKey, number>>

/** What a form holds: a number, or null while a field is empty or unreadable. */
export type MeasurementInput = Partial<Record<MeasurementKey, number | null>>

/** The fictional customer's measurements ("Kund Demo"). Not a real person. */
export const demoMeasurements: Required<Measurements> = {
  shoulder: 37,
  bust: 88,
  upperBody: 36,
  sleeve: 56,
  length: 62,
  waist: 72,
  hip: 96,
  inseam: 76,
  crotch: 68,
}

/** Plausible ranges in cm, inclusive. Shown as a hint and used for validation. */
export const measurementRanges: Record<MeasurementKey, { min: number; max: number }> = {
  shoulder: { min: 32, max: 46 },
  bust: { min: 76, max: 120 },
  upperBody: { min: 31, max: 48 },
  sleeve: { min: 46, max: 68 },
  length: { min: 50, max: 90 },
  waist: { min: 56, max: 110 },
  hip: { min: 80, max: 130 },
  inseam: { min: 60, max: 90 },
  crotch: { min: 55, max: 85 },
}

export type MeasurementError = 'required' | 'tooLow' | 'tooHigh' | 'shoulderVsBust' | 'lengthVsUpperBody' | 'waistVsHip'

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
 * One error code per field in `keys`, nothing for a valid field.
 * 1. Each value must be present and inside its plausible range.
 * 2. Cross rules, checked only when both fields are asked for and in range:
 *    - the shoulder must fit inside the bust: shoulder <= bust / 2 - 1 (otherwise the armhole collapses);
 *    - the hem must fall below the waist: length >= upper-body length + 6 cm;
 *    - the waist must not be larger than the hip.
 */
export function validateMeasurements(input: MeasurementInput, keys: readonly MeasurementKey[]): MeasurementErrors {
  const errors: MeasurementErrors = {}
  for (const key of keys) {
    const value = input[key]
    const { min, max } = measurementRanges[key]
    if (value === null || value === undefined || !Number.isFinite(value)) errors[key] = 'required'
    else if (value < min) errors[key] = 'tooLow'
    else if (value > max) errors[key] = 'tooHigh'
  }
  const ok = (key: MeasurementKey) => keys.includes(key) && !errors[key]
  if (ok('shoulder') && ok('bust') && input.shoulder! > input.bust! / 2 - 1) errors.shoulder = 'shoulderVsBust'
  if (ok('upperBody') && ok('length') && input.length! < input.upperBody! + MIN_HEM_BELOW_WAIST_CM) errors.length = 'lengthVsUpperBody'
  if (ok('waist') && ok('hip') && input.waist! > input.hip!) errors.waist = 'waistVsHip'
  return errors
}

/** The values of `keys`, or null when any field is invalid. */
export function toMeasurements(input: MeasurementInput, keys: readonly MeasurementKey[]): Measurements | null {
  if (Object.keys(validateMeasurements(input, keys)).length > 0) return null
  return Object.fromEntries(keys.map((key) => [key, input[key]])) as Measurements
}

/** A measurement for display: decimal comma in Swedish, point in English, always with its unit. */
export const formatMeasurement = (value: number, language: Language) =>
  `${language === 'sv' ? String(value).replace('.', ',') : String(value)}\u00a0cm`

/** The keys a set of measurements holds, in the order the form asks for them. */
export const measuredKeys = (measurements: Measurements): MeasurementKey[] =>
  Object.values(measurementSets).flat().filter((key) => measurements[key] !== undefined)

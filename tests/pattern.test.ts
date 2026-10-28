import assert from 'node:assert/strict'
import test from 'node:test'
import {
  demoMeasurements,
  formatMeasurement,
  measuredKeys,
  measurementRanges,
  measurementSets,
  readMeasurementField,
  toMeasurements,
  validateMeasurements,
  type MeasurementKey,
  type Measurements,
} from '../src/content/pattern.ts'

const top = measurementSets.top
const trousers = measurementSets.trousers

const extremeSmall: Measurements = { shoulder: 32, bust: 76, upperBody: 31, sleeve: 46, length: 50 }
const extremeLarge: Measurements = { shoulder: 46, bust: 120, upperBody: 48, sleeve: 68, length: 90 }

test('the sets ask for the right measurements: five for a top, four for trousers', () => {
  assert.deepEqual(top, ['shoulder', 'bust', 'upperBody', 'sleeve', 'length'])
  assert.deepEqual(trousers, ['waist', 'hip', 'inseam', 'crotch'])
})

test('demo measurements are valid for every set', () => {
  for (const keys of Object.values(measurementSets)) assert.deepEqual(validateMeasurements(demoMeasurements, keys), {})
})

test('only the fields of the set are checked', () => {
  assert.deepEqual(validateMeasurements({ waist: 72, hip: 96, inseam: 76, crotch: 68 }, trousers), {})
  assert.equal(validateMeasurements({ waist: 72, hip: 96, inseam: 76 }, trousers).crotch, 'required')
})

test('empty or missing values are required', () => {
  const errors = validateMeasurements({ ...demoMeasurements, bust: null, sleeve: Number.NaN }, top)
  assert.equal(errors.bust, 'required')
  assert.equal(errors.sleeve, 'required')
  assert.equal(errors.shoulder, undefined)
})

test('values outside the plausible range are rejected per field', () => {
  for (const key of Object.keys(measurementRanges) as MeasurementKey[]) {
    const { min, max } = measurementRanges[key]
    const keys = trousers.includes(key) ? trousers : top
    assert.equal(validateMeasurements({ ...demoMeasurements, [key]: min - 1 }, keys)[key], 'tooLow', `${key} low`)
    assert.equal(validateMeasurements({ ...demoMeasurements, [key]: max + 1 }, keys)[key], 'tooHigh', `${key} high`)
  }
})

test('range limits themselves are accepted', () => {
  assert.deepEqual(validateMeasurements(extremeSmall, top), {})
  assert.deepEqual(validateMeasurements(extremeLarge, top), {})
  assert.deepEqual(validateMeasurements({ waist: 56, hip: 80, inseam: 60, crotch: 55 }, trousers), {})
  assert.deepEqual(validateMeasurements({ waist: 110, hip: 130, inseam: 90, crotch: 85 }, trousers), {})
})

test('cross rules: shoulder must fit the bust, hem below the waist, waist not larger than the hip', () => {
  assert.equal(validateMeasurements({ ...demoMeasurements, bust: 76, shoulder: 45 }, top).shoulder, 'shoulderVsBust')
  assert.equal(validateMeasurements({ ...demoMeasurements, upperBody: 47, length: 52 }, top).length, 'lengthVsUpperBody')
  assert.equal(validateMeasurements({ ...demoMeasurements, waist: 100, hip: 90 }, trousers).waist, 'waistVsHip')
})

test('readMeasurementField accepts comma or point and returns null for empty or unreadable text', () => {
  assert.equal(readMeasurementField('37'), 37)
  assert.equal(readMeasurementField(' 37,5 '), 37.5)
  assert.equal(readMeasurementField('37.5'), 37.5)
  assert.equal(readMeasurementField(''), null)
  assert.equal(readMeasurementField('abc'), null)
  assert.equal(readMeasurementField('-5'), -5)
})

test('formatMeasurement uses a decimal comma in Swedish and keeps the unit', () => {
  assert.equal(formatMeasurement(37, 'sv'), '37\u00a0cm')
  assert.equal(formatMeasurement(37.5, 'sv'), '37,5\u00a0cm')
  assert.equal(formatMeasurement(37.5, 'en'), '37.5\u00a0cm')
})

test('toMeasurements returns only the values of the set, and null when any field is invalid', () => {
  assert.deepEqual(toMeasurements(demoMeasurements, trousers), { waist: 72, hip: 96, inseam: 76, crotch: 68 })
  assert.equal(toMeasurements({ ...demoMeasurements, bust: null }, top), null)
  assert.equal(toMeasurements({ ...demoMeasurements, sleeve: 10 }, top), null)
})

test('measuredKeys lists the keys a cart item holds, in form order', () => {
  assert.deepEqual(measuredKeys({ crotch: 68, waist: 72 }), ['waist', 'crotch'])
  assert.deepEqual(measuredKeys({}), [])
})

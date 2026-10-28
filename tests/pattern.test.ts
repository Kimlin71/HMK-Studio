import assert from 'node:assert/strict'
import test from 'node:test'
import {
  CAP_EASE_CM,
  SEAM_TOLERANCE_CM,
  demoMeasurements,
  generatePattern,
  measurementKeys,
  measurementRanges,
  parseMeasurement,
  polylineLength,
  validateMeasurements,
  type Measurements,
  type PatternPiece,
} from '../src/content/pattern.ts'

const extremePetite: Measurements = { shoulder: 32, bust: 76, upperBody: 31, sleeve: 46, length: 50 }
const extremeLarge: Measurements = { shoulder: 46, bust: 120, upperBody: 48, sleeve: 68, length: 90 }

const piece = (pieces: PatternPiece[], id: PatternPiece['id']) => {
  const found = pieces.find((item) => item.id === id)
  assert.ok(found, `piece ${id} exists`)
  return found
}
const edgeLength = (item: PatternPiece, id: string) => {
  const edge = item.edges.find((candidate) => candidate.id === id)
  assert.ok(edge, `edge ${id} exists on ${item.id}`)
  return polylineLength(edge.points)
}

test('demo measurements are valid', () => {
  assert.deepEqual(validateMeasurements(demoMeasurements), {})
})

test('empty or missing values are required', () => {
  const errors = validateMeasurements({ ...demoMeasurements, bust: null, sleeve: Number.NaN })
  assert.equal(errors.bust, 'required')
  assert.equal(errors.sleeve, 'required')
  assert.equal(errors.shoulder, undefined)
})

test('values outside the plausible range are rejected per field', () => {
  for (const key of measurementKeys) {
    const { min, max } = measurementRanges[key]
    assert.equal(validateMeasurements({ ...demoMeasurements, [key]: min - 1 })[key], 'tooLow')
    assert.equal(validateMeasurements({ ...demoMeasurements, [key]: max + 1 })[key], 'tooHigh')
  }
})

test('range limits themselves are accepted', () => {
  assert.deepEqual(validateMeasurements(extremePetite), {})
  assert.deepEqual(validateMeasurements(extremeLarge), {})
})

test('cross rules: shoulder must fit the bust, hem must fall below the waist', () => {
  assert.equal(validateMeasurements({ ...demoMeasurements, bust: 76, shoulder: 45 }).shoulder, 'shoulderVsBust')
  assert.equal(validateMeasurements({ ...demoMeasurements, upperBody: 47, length: 52 }).length, 'lengthVsUpperBody')
})

test('parseMeasurement accepts decimals with comma or point and rejects text', () => {
  assert.equal(parseMeasurement('37'), 37)
  assert.equal(parseMeasurement(' 37,5 '), 37.5)
  assert.equal(parseMeasurement('37.5'), 37.5)
  assert.equal(parseMeasurement(''), null)
  assert.equal(parseMeasurement('abc'), null)
  assert.equal(parseMeasurement('-5'), null)
})

test('the same measurements always give the same pieces', () => {
  assert.deepEqual(generatePattern(demoMeasurements), generatePattern({ ...demoMeasurements }))
})

test('changing a measurement changes the pieces', () => {
  const before = generatePattern(demoMeasurements)
  const longer = generatePattern({ ...demoMeasurements, length: demoMeasurements.length + 6 })
  assert.equal(piece(longer, 'back').height - piece(before, 'back').height, 6)
  const wider = generatePattern({ ...demoMeasurements, bust: demoMeasurements.bust + 8 })
  assert.equal(piece(wider, 'front').width - piece(before, 'front').width, 2)
})

for (const [name, measurements] of [
  ['demo', demoMeasurements],
  ['extreme petite', extremePetite],
  ['extreme large', extremeLarge],
] as const) {
  test(`seams are consistent for ${name} measurements`, () => {
    const pieces = generatePattern(measurements)
    const back = piece(pieces, 'back')
    const front = piece(pieces, 'front')
    const sleeve = piece(pieces, 'sleeve')

    assert.ok(Math.abs(edgeLength(back, 'side') - edgeLength(front, 'side')) <= SEAM_TOLERANCE_CM, 'side seams equal')
    assert.ok(Math.abs(edgeLength(back, 'shoulder') - edgeLength(front, 'shoulder')) <= SEAM_TOLERANCE_CM, 'shoulder seams equal')

    const armhole = edgeLength(back, 'armhole') + edgeLength(front, 'armhole')
    const cap = edgeLength(sleeve, 'cap')
    assert.ok(Math.abs(cap - (armhole + CAP_EASE_CM)) <= SEAM_TOLERANCE_CM, `cap ${cap.toFixed(2)} fits armhole ${armhole.toFixed(2)} plus ease`)

    assert.ok(edgeLength(sleeve, 'underarmLeft') > 0)
    assert.ok(Math.abs(edgeLength(sleeve, 'underarmLeft') - edgeLength(sleeve, 'underarmRight')) <= SEAM_TOLERANCE_CM)
    assert.ok(Math.abs(sleeve.height - measurements.sleeve) < 1e-9, 'sleeve piece is as long as the measurement')
    assert.ok(Math.abs(back.height - measurements.length) < 1e-9, 'hem sits at the desired length')

    for (const item of pieces) {
      for (const [x, y] of item.outline) assert.ok(Number.isFinite(x) && Number.isFinite(y))
    }
  })
}

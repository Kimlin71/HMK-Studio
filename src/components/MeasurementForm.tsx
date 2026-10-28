import { useId, useState } from 'react'
import { price } from '../content/prices'
import {
  demoMeasurements,
  measurementRanges,
  measurementSets,
  readMeasurementField,
  toMeasurements,
  validateMeasurements,
  type MeasurementError,
  type MeasurementInput,
  type MeasurementKey,
} from '../content/pattern'
import type { PatternProduct } from '../content/patterns'
import { useCopy } from '../i18n/LanguageContext'
import { AddToCartButton } from './AddToCartButton'
import { Price } from './Price'
import './MeasurementForm.css'

// The measurement fields the pattern asks for, pre-filled for "Kund Demo", and the add button. The customer's measurements go into the cart with the pattern.
// The ranges and checks live in src/content/pattern.ts. This component only reads and shows them. No pattern is drawn from the values.
export function MeasurementForm({ pattern }: { pattern: PatternProduct }) {
  const { copy } = useCopy()
  const text = copy.pattern.form
  const idPrefix = useId()
  const keys = measurementSets[pattern.measurements]
  const [texts, setTexts] = useState<Partial<Record<MeasurementKey, string>>>(() => Object.fromEntries(keys.map((key) => [key, String(demoMeasurements[key])])))

  const input: MeasurementInput = Object.fromEntries(keys.map((key) => [key, readMeasurementField(texts[key] ?? '')]))
  const errors = validateMeasurements(input, keys)
  const measurements = toMeasurements(input, keys)

  const errorText = (error: MeasurementError, key: MeasurementKey) => {
    const range = measurementRanges[key]
    if (error === 'tooLow') return text.errors.tooLow(range.min)
    if (error === 'tooHigh') return text.errors.tooHigh(range.max)
    return text.errors[error]
  }

  return (
    <form className="measure__form" noValidate onSubmit={(event) => event.preventDefault()}>
      <fieldset>
        <legend>
          <span>{text.legend}</span>
          <span className="demo-tag">{copy.demoTag}</span>
        </legend>
        <p className="measure__customer">{text.customer} <strong>{text.customerName}</strong></p>
        <p className="measure__demo-note" id={`${idPrefix}-demo`}>{text.demoNote}</p>
        <div className="measure__fields">
          {keys.map((key) => {
            const field = text.fields[key]
            const range = measurementRanges[key]
            const error = errors[key]
            const hintId = `${idPrefix}-${key}-hint`
            const errorId = `${idPrefix}-${key}-error`
            return (
              <div className={error ? 'measure__field measure__field--error' : 'measure__field'} key={key}>
                <label htmlFor={`${idPrefix}-${key}`}>{field.label}</label>
                <div className="measure__control">
                  <input
                    aria-describedby={[hintId, error ? errorId : '', `${idPrefix}-demo`].filter(Boolean).join(' ')}
                    aria-invalid={error ? true : undefined}
                    autoComplete="off"
                    id={`${idPrefix}-${key}`}
                    inputMode="decimal"
                    max={range.max}
                    min={range.min}
                    onChange={(event) => setTexts((previous) => ({ ...previous, [key]: event.target.value }))}
                    step="0.5"
                    type="number"
                    value={texts[key] ?? ''}
                  />
                  <span aria-hidden="true">{copy.cart.unit}</span>
                </div>
                <p className="measure__hint" id={hintId}><span>{field.hint}</span> <span>{text.range(range.min, range.max)}</span></p>
                {error ? <p className="measure__error" id={errorId}>{errorText(error, key)}</p> : null}
              </div>
            )
          })}
        </div>
        <p className="measure__summary" role="status">{measurements ? '' : text.invalidSummary}</p>
        <div className="measure__buy">
          <p className="norigae__price"><span>{copy.shop.card.priceLabel}</span> <Price amount={price({ kind: 'pattern', patternId: pattern.id, measurements: demoMeasurements })} /></p>
          {measurements ? <AddToCartButton item={{ kind: 'pattern', patternId: pattern.id, measurements }} /> : (
            <button aria-disabled="true" className="measure__generate" disabled type="button">{copy.cart.add.button}</button>
          )}
        </div>
      </fieldset>
    </form>
  )
}

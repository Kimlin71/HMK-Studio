import { useId, useState, type FormEvent } from 'react'
import { price } from '../content/prices'
import {
  demoMeasurements,
  generatePattern,
  measurementKeys,
  measurementRanges,
  patternAnchor,
  readMeasurementField,
  sameMeasurements,
  toMeasurements,
  validateMeasurements,
  type MeasurementError,
  type MeasurementInput,
  type MeasurementKey,
  type Measurements,
} from '../content/pattern'
import { useCopy } from '../i18n/LanguageContext'
import { AddToCartButton } from './AddToCartButton'
import { PatternPreview } from './PatternPreview'
import { Price } from './Price'
import './MeasurementForm.css'

const initialTexts = Object.fromEntries(measurementKeys.map((key) => [key, String(demoMeasurements[key])])) as Record<MeasurementKey, string>

// The measured-pattern part of MAKE: five fields pre-filled for "Kund Demo", a generate button and the SVG preview.
// The rules (ranges, cross rules, the pieces) live in src/content/pattern.ts. This component only reads and shows them.
export function MeasurementForm() {
  const { copy } = useCopy()
  const text = copy.pattern
  const idPrefix = useId()
  const [texts, setTexts] = useState(initialTexts)
  const [generated, setGenerated] = useState<Measurements>(demoMeasurements)

  const input = Object.fromEntries(measurementKeys.map((key) => [key, readMeasurementField(texts[key])])) as MeasurementInput
  const errors = validateMeasurements(input)
  const valid = Object.keys(errors).length === 0
  const current = toMeasurements(input)
  const stale = current !== null && !sameMeasurements(current, generated)

  const errorText = (error: MeasurementError, key: MeasurementKey) => {
    const range = measurementRanges[key]
    if (error === 'tooLow') return text.form.errors.tooLow(range.min)
    if (error === 'tooHigh') return text.form.errors.tooHigh(range.max)
    return text.form.errors[error]
  }

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (current) setGenerated(current)
  }

  return (
    <div aria-labelledby={`${idPrefix}-title`} className="measure" id={patternAnchor} role="group">
      <div className="measure__heading">
        <p className="eyebrow">{text.eyebrow}</p>
        <h3 id={`${idPrefix}-title`}>{text.title}</h3>
        <p>{text.intro}</p>
        <p className="prototype-notice">{copy.prototypeNotice}</p>
      </div>
      <div className="measure__workspace">
        <form className="measure__form" noValidate onSubmit={onSubmit}>
          <fieldset>
            <legend>
              <span>{text.form.legend}</span>
              <span className="demo-tag">{copy.demoTag}</span>
            </legend>
            <p className="measure__customer">{text.form.customer} <strong>{text.form.customerName}</strong></p>
            <p className="measure__demo-note" id={`${idPrefix}-demo`}>{text.form.demoNote}</p>
            {measurementKeys.map((key) => {
              const field = text.form.fields[key]
              const range = measurementRanges[key]
              const error = errors[key]
              const hintId = `${idPrefix}-${key}-hint`
              const errorId = `${idPrefix}-${key}-error`
              return (
                <div className={error ? 'measure__field measure__field--error' : 'measure__field'} key={key}>
                  <label htmlFor={`${idPrefix}-${key}`}>{field.label}</label>
                  <div className="measure__control">
                    <input
                      aria-describedby={`${hintId} ${error ? errorId : ''} ${idPrefix}-demo`.replace(/\s+/g, ' ').trim()}
                      aria-invalid={error ? true : undefined}
                      autoComplete="off"
                      id={`${idPrefix}-${key}`}
                      inputMode="decimal"
                      max={range.max}
                      min={range.min}
                      onChange={(event) => setTexts((previous) => ({ ...previous, [key]: event.target.value }))}
                      step="0.5"
                      type="number"
                      value={texts[key]}
                    />
                    <span aria-hidden="true">cm</span>
                  </div>
                  <p className="measure__hint" id={hintId}>{field.hint}. {text.form.range(range.min, range.max)}</p>
                  {error ? <p className="measure__error" id={errorId}>{errorText(error, key)}</p> : null}
                </div>
              )
            })}
            <p className="measure__summary" role="status">{valid ? '' : text.form.invalidSummary}</p>
            <button aria-disabled={!valid} className="measure__generate" disabled={!valid} type="submit">{text.form.generate}</button>
          </fieldset>
        </form>
        <div className="measure__result">
          <h4>{text.preview.title}</h4>
          <p className="image-disclosure measure__note">{text.preview.note}</p>
          <PatternPreview measurements={generated} pieces={generatePattern(generated)} />
          <p className="measure__stale" role="status">{stale ? text.preview.stale : ''}</p>
          <div className="measure__buy">
            <p className="norigae__price"><span>{copy.shop.card.priceLabel}</span> <Price amount={price({ kind: 'pattern', measurements: generated })} /></p>
            <AddToCartButton item={{ kind: 'pattern', measurements: generated }} />
          </div>
        </div>
      </div>
    </div>
  )
}

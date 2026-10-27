import { useId, useState, type ReactNode } from 'react'
import {
  braceletBeadColours,
  braceletBeadCounts,
  braceletBeadTypes,
  braceletCordColours,
  braceletPresets,
  braceletSignatureColours,
  braceletSizes,
  defaultBraceletDesign,
  type BraceletDesign,
} from '../content/bracelet'
import { colourLabels, type ModuleColour } from '../content/jewellery'
import { shopAnchors } from '../content/shop'
import { useCopy } from '../i18n/LanguageContext'
import { BraceletDrawing } from './BraceletDrawing'
import './BraceletBuilder.css'

type OptionGroupProps<T extends string | number> = {
  legend: string
  description: string
  name: string
  options: { value: T; label: ReactNode; swatch?: ModuleColour }[]
  value: T
  onChange: (value: T) => void
}

// Native radio inputs: arrow keys move within a group, Tab moves between groups.
function OptionGroup<T extends string | number>({ legend, description, name, options, value, onChange }: OptionGroupProps<T>) {
  return (
    <fieldset className="bracelet-options">
      <legend><span>{legend}</span> <small>{description}</small></legend>
      <div className="bracelet-options__row">
        {options.map((option) => (
          <label className="bracelet-option" key={option.value}>
            <input checked={option.value === value} name={name} onChange={() => onChange(option.value)} type="radio" value={option.value} />
            {option.swatch ? <span aria-hidden="true" className={`bracelet-option__swatch tone--${option.swatch}`} /> : null}
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}

const colourOptions = (colours: ModuleColour[]) =>
  colours.map((colour) => ({ value: colour, swatch: colour, label: <span lang="en">{colourLabels[colour]}</span> }))

export function BraceletBuilder() {
  const { copy } = useCopy()
  const text = copy.shop.bracelet
  const idPrefix = useId()
  const [design, setDesign] = useState<BraceletDesign>(defaultBraceletDesign)
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'failed'>('idle')

  const update = (patch: Partial<BraceletDesign>) => {
    setDesign((current) => ({ ...current, ...patch }))
    setCopyStatus('idle')
  }

  const beadTypeName = text.summary.beadTypeNames[design.beadType]
  const size = text.size.options[design.size]
  const otherBeads = design.beadCount - 1

  // Plain-text version of the summary. Only this string ever leaves the page, and only to the user's own clipboard.
  const plainSummary = [
    text.copy.heading,
    `${text.summary.cord}: ${colourLabels[design.cord]}`,
    `${text.summary.beads}: ${otherBeads} ${beadTypeName}, ${colourLabels[design.beadColour]}`,
    `${text.summary.signature}: 1, ${colourLabels[design.signatureColour]}`,
    `${text.summary.size}: ${size.label} (${size.range})`,
  ].join('\n')

  const copyDesign = async () => {
    try {
      await navigator.clipboard.writeText(plainSummary)
      setCopyStatus('copied')
    } catch {
      setCopyStatus('failed')
    }
  }

  return (
    <div aria-labelledby={`${idPrefix}-title`} className="bracelet-builder" id={shopAnchors.braceletBuilder} role="group">
      <div className="bracelet-builder__heading">
        <p className="eyebrow">{text.eyebrow}</p>
        <h4 id={`${idPrefix}-title`}>{text.title}</h4>
        <p>{text.intro}</p>
        <p className="image-disclosure" id={`${idPrefix}-note`}>{text.note}</p>
      </div>
      <div className="bracelet-builder__workspace">
        <div aria-hidden="true" className="bracelet-builder__preview">
          <span className="eyebrow">{text.previewEyebrow}</span>
          <BraceletDrawing design={design} />
          <span className="bracelet-builder__preview-note">{text.previewNote}</span>
        </div>
        <div aria-describedby={`${idPrefix}-note`} className="bracelet-builder__controls">
          <div className="bracelet-presets">
            <p className="eyebrow">{text.presetsEyebrow}</p>
            <div className="bracelet-presets__row">
              {braceletPresets.map((preset) => (
                <button
                  className="bracelet-preset"
                  key={preset.id}
                  onClick={() => update(preset.design)}
                  type="button"
                >
                  <span lang="en">{copy.connect.families[preset.id].label}</span>
                </button>
              ))}
            </div>
          </div>
          <OptionGroup
            description={text.cord.description}
            legend={text.cord.legend}
            name={`${idPrefix}-cord`}
            onChange={(cord) => update({ cord })}
            options={colourOptions(braceletCordColours)}
            value={design.cord}
          />
          <OptionGroup
            description={text.beadType.description}
            legend={text.beadType.legend}
            name={`${idPrefix}-bead-type`}
            onChange={(beadType) => update({ beadType })}
            options={braceletBeadTypes.map((type) => ({ value: type, label: text.beadType.options[type] }))}
            value={design.beadType}
          />
          <OptionGroup
            description={text.beadColour.description}
            legend={text.beadColour.legend}
            name={`${idPrefix}-bead-colour`}
            onChange={(beadColour) => update({ beadColour })}
            options={colourOptions(braceletBeadColours)}
            value={design.beadColour}
          />
          <OptionGroup
            description={text.beadCount.description}
            legend={text.beadCount.legend}
            name={`${idPrefix}-bead-count`}
            onChange={(beadCount) => update({ beadCount })}
            options={braceletBeadCounts.map((count) => ({ value: count, label: count }))}
            value={design.beadCount}
          />
          <OptionGroup
            description={`${text.signature.description} · ${text.signature.fixed}`}
            legend={text.signature.legend}
            name={`${idPrefix}-signature`}
            onChange={(signatureColour) => update({ signatureColour })}
            options={colourOptions(braceletSignatureColours)}
            value={design.signatureColour}
          />
          <OptionGroup
            description={text.size.description}
            legend={text.size.legend}
            name={`${idPrefix}-size`}
            onChange={(next) => update({ size: next })}
            options={braceletSizes.map((key) => ({
              value: key,
              label: <>{text.size.options[key].label} <small>{text.size.options[key].range}</small></>,
            }))}
            value={design.size}
          />
          <output aria-live="polite" className="bracelet-builder__summary">
            <strong>{text.summary.prefix}</strong>
            <span>{text.summary.cord}: <span lang="en">{colourLabels[design.cord]}</span></span>
            <span>{text.summary.beads}: {otherBeads} {beadTypeName}, <span lang="en">{colourLabels[design.beadColour]}</span></span>
            <span>{text.summary.signature}: 1, <span lang="en">{colourLabels[design.signatureColour]}</span></span>
            <span>{text.summary.size}: {size.label} ({size.range})</span>
          </output>
          <div className="bracelet-builder__copy">
            <button className="bracelet-copy" onClick={copyDesign} type="button">{text.copy.label}</button>
            <p className="bracelet-builder__status" role="status">
              {copyStatus === 'copied' ? text.copy.copied : copyStatus === 'failed' ? text.copy.failed : ''}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

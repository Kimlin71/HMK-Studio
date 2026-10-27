import { useState, type ReactNode } from 'react'
import { colourLabels, type ModuleColour } from '../content/jewellery'
import {
  initialNorigae,
  knotStyleIds,
  norigaeColours,
  norigaePresets,
  pendantColours,
  secondElementIds,
  tasselLengthIds,
  type NorigaeDesign,
} from '../content/norigae'
import { shopAnchors } from '../content/shop'
import { useCopy } from '../i18n/LanguageContext'
import { NorigaeDrawing } from './NorigaeDrawing'
import './NorigaeBuilder.css'

type ColourKey = 'knot' | 'cord' | 'pendant' | 'second' | 'tassel'

const colourFields: Record<ColourKey, keyof NorigaeDesign> = {
  knot: 'knotColour',
  cord: 'cordColour',
  pendant: 'pendantColour',
  second: 'secondColour',
  tassel: 'tasselColour',
}

function ColourFieldset({
  id,
  legend,
  hint,
  colours,
  value,
  onChange,
}: {
  id: string
  legend: string
  hint: string
  colours: ModuleColour[]
  value: ModuleColour
  onChange: (colour: ModuleColour) => void
}) {
  return (
    <fieldset className="norigae-options">
      <legend><span>{legend}</span> <small>{hint}</small></legend>
      <div className="norigae-options__row">
        {colours.map((colour) => (
          <label className="norigae-option" key={colour}>
            <input checked={value === colour} name={id} onChange={() => onChange(colour)} type="radio" value={colour} />
            <span aria-hidden="true" className={`norigae-option__swatch tone--${colour}`} />
            <span lang="en">{colourLabels[colour]}</span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}

function ChoiceFieldset<T extends string>({
  id,
  legend,
  hint,
  options,
  value,
  onChange,
}: {
  id: string
  legend: string
  hint: string
  options: { id: T; label: string; description?: string }[]
  value: T
  onChange: (value: T) => void
}) {
  return (
    <fieldset className="norigae-options">
      <legend><span>{legend}</span> <small>{hint}</small></legend>
      <div className="norigae-options__row norigae-options__row--choice">
        {options.map((option) => (
          <label className="norigae-option norigae-option--text" key={option.id}>
            <input checked={value === option.id} name={id} onChange={() => onChange(option.id)} type="radio" value={option.id} />
            <span>{option.label}</span>
            {option.description ? <small>{option.description}</small> : null}
          </label>
        ))}
      </div>
    </fieldset>
  )
}

export function NorigaeBuilder() {
  const { copy } = useCopy()
  const text = copy.shop.maedeup
  const [design, setDesign] = useState<NorigaeDesign>(initialNorigae)
  const [copyStatus, setCopyStatus] = useState<'idle' | 'done' | 'failed'>('idle')

  const update = (patch: Partial<NorigaeDesign>) => {
    setDesign((current) => ({ ...current, ...patch }))
    setCopyStatus('idle')
  }

  const hasSecond = design.secondElement !== 'none'
  const labels = text.summary.labels

  // One ordered list of summary rows: used for the live summary and for the copied text.
  const rows: { label: string; value: string; colour?: ModuleColour }[] = [
    { label: labels.knot, value: text.knotStyle.options[design.knotStyle].label, colour: design.knotColour },
    { label: labels.cord, value: '', colour: design.cordColour },
    { label: labels.pendant, value: '', colour: design.pendantColour },
    ...(hasSecond ? [{ label: labels.second, value: text.secondElement.options[design.secondElement], colour: design.secondColour }] : []),
    { label: labels.tassel, value: text.tasselLength.options[design.tasselLength], colour: design.tasselColour },
  ]

  const plainRow = (row: (typeof rows)[number]) =>
    `${row.label}: ${[row.value, row.colour ? colourLabels[row.colour] : ''].filter(Boolean).join(', ')}`

  const renderRow = (row: (typeof rows)[number]): ReactNode => (
    <>
      {row.label}: {row.value ? `${row.value}, ` : ''}
      {row.colour ? <span lang="en">{colourLabels[row.colour]}</span> : null}
    </>
  )

  const copyDesign = async () => {
    const lines = [text.copy.heading, ...rows.map(plainRow), text.pearlNote, text.copy.footer]
    try {
      await navigator.clipboard.writeText(lines.join('\n'))
      setCopyStatus('done')
    } catch {
      setCopyStatus('failed')
    }
  }

  const colourSets: { key: ColourKey; colours: ModuleColour[]; show: boolean }[] = [
    { key: 'knot', colours: norigaeColours, show: true },
    { key: 'cord', colours: norigaeColours, show: true },
    { key: 'pendant', colours: pendantColours, show: true },
    { key: 'second', colours: norigaeColours, show: hasSecond },
    { key: 'tassel', colours: norigaeColours, show: true },
  ]

  return (
    <div aria-labelledby="norigae-title" className="norigae" id={shopAnchors.maedeupBuilder} role="group">
      <div className="norigae__heading">
        <h4 id="norigae-title">{text.title}</h4>
        <p>{text.intro}</p>
        <p className="image-disclosure" id="norigae-note">{text.note}</p>
      </div>
      <div className="norigae__workspace">
        <div className="norigae__preview">
          <span className="norigae__label">{text.previewLabel}</span>
          <div className="norigae__drawing" role="img" aria-label={text.previewAlt}>
            <NorigaeDrawing design={design} />
          </div>
          <span className="norigae__label">{text.previewNote}</span>
        </div>
        <div aria-describedby="norigae-note" className="norigae__controls">
          <div className="norigae-presets">
            <p className="norigae__label" id="norigae-presets-label">{text.presetsLabel}</p>
            <div aria-labelledby="norigae-presets-label" className="norigae-presets__row" role="group">
              {norigaePresets.map((preset) => (
                <button className="norigae-preset" key={preset.id} onClick={() => update(preset.colours)} type="button">
                  <span lang="en">{copy.connect.families[preset.id].label}</span>
                </button>
              ))}
            </div>
          </div>
          <ChoiceFieldset
            hint={text.knotStyle.hint}
            id="norigae-knot-style"
            legend={text.knotStyle.legend}
            onChange={(knotStyle) => update({ knotStyle })}
            options={knotStyleIds.map((id) => ({ id, ...text.knotStyle.options[id] }))}
            value={design.knotStyle}
          />
          {colourSets.filter((set) => set.show).map((set) => (
            <ColourFieldset
              colours={set.colours}
              hint={text.colours[set.key].hint}
              id={`norigae-${set.key}`}
              key={set.key}
              legend={text.colours[set.key].legend}
              onChange={(colour) => update({ [colourFields[set.key]]: colour })}
              value={design[colourFields[set.key]] as ModuleColour}
            />
          ))}
          <p className="norigae__pearl">{text.pearlNote}</p>
          <ChoiceFieldset
            hint={text.secondElement.hint}
            id="norigae-second"
            legend={text.secondElement.legend}
            onChange={(secondElement) => update({ secondElement })}
            options={secondElementIds.map((id) => ({ id, label: text.secondElement.options[id] }))}
            value={design.secondElement}
          />
          <ChoiceFieldset
            hint={text.tasselLength.hint}
            id="norigae-length"
            legend={text.tasselLength.legend}
            onChange={(tasselLength) => update({ tasselLength })}
            options={tasselLengthIds.map((id) => ({ id, label: text.tasselLength.options[id] }))}
            value={design.tasselLength}
          />
          <div aria-live="polite" className="norigae__summary" role="status">
            <p>{text.summary.prefix}</p>
            <ul>
              {rows.map((row) => <li key={row.label}>{renderRow(row)}</li>)}
            </ul>
          </div>
          <div className="norigae__copy">
            <button className="norigae__copy-button" onClick={copyDesign} type="button">{text.copy.button}</button>
            <p className="norigae__copy-status" role="status">
              {copyStatus === 'done' ? text.copy.success : copyStatus === 'failed' ? text.copy.failure : ''}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

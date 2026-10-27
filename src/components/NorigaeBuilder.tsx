import { useId, useState, type ReactNode } from 'react'
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
import { ColourOptionGroup, CopyDesign, OptionGroup, PresetRow } from './BuilderControls'
import { NorigaeDrawing } from './NorigaeDrawing'
import { useCopyToClipboard } from './useCopyToClipboard'
import './NorigaeBuilder.css'

type ColourKey = 'knot' | 'cord' | 'pendant' | 'second' | 'tassel'

const colourFields: Record<ColourKey, keyof NorigaeDesign> = {
  knot: 'knotColour',
  cord: 'cordColour',
  pendant: 'pendantColour',
  second: 'secondColour',
  tassel: 'tasselColour',
}

export function NorigaeBuilder() {
  const { copy } = useCopy()
  const text = copy.shop.maedeup
  const [design, setDesign] = useState<NorigaeDesign>(initialNorigae)
  const clipboard = useCopyToClipboard()
  const idPrefix = useId()

  const update = (patch: Partial<NorigaeDesign>) => {
    setDesign((current) => ({ ...current, ...patch }))
    clipboard.reset()
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

  const plainSummary = [text.copy.heading, ...rows.map(plainRow), text.pearlNote, text.copy.footer].join('\n')

  const colourSets: { key: ColourKey; colours: ModuleColour[]; show: boolean }[] = [
    { key: 'knot', colours: norigaeColours, show: true },
    { key: 'cord', colours: norigaeColours, show: true },
    { key: 'pendant', colours: pendantColours, show: true },
    { key: 'second', colours: norigaeColours, show: hasSecond },
    { key: 'tassel', colours: norigaeColours, show: true },
  ]

  return (
    <div aria-labelledby={`${idPrefix}-title`} className="norigae" id={shopAnchors.maedeupBuilder} role="group">
      <div className="norigae__heading">
        <h4 id={`${idPrefix}-title`}>{text.title}</h4>
        <p>{text.intro}</p>
        <p className="image-disclosure" id={`${idPrefix}-note`}>{text.note}</p>
      </div>
      <div className="norigae__workspace">
        <div className="norigae__preview">
          <span className="norigae__label">{text.previewLabel}</span>
          <div className="norigae__drawing" role="img" aria-label={text.previewAlt}>
            <NorigaeDrawing design={design} />
          </div>
          <span className="norigae__label">{text.previewNote}</span>
        </div>
        <div aria-describedby={`${idPrefix}-note`} className="norigae__controls">
          <PresetRow label={text.presetsLabel} onSelect={(preset) => update(preset.colours)} presets={norigaePresets} />
          <OptionGroup
            hint={text.knotStyle.hint}
            legend={text.knotStyle.legend}
            name={`${idPrefix}-knot-style`}
            onChange={(knotStyle) => update({ knotStyle })}
            options={knotStyleIds.map((id) => ({ value: id, label: text.knotStyle.options[id].label, detail: text.knotStyle.options[id].description }))}
            value={design.knotStyle}
            wide
          />
          {colourSets.filter((set) => set.show).map((set) => (
            <ColourOptionGroup
              colours={set.colours}
              hint={text.colours[set.key].hint}
              key={set.key}
              legend={text.colours[set.key].legend}
              name={`${idPrefix}-${set.key}`}
              onChange={(colour) => update({ [colourFields[set.key]]: colour })}
              value={design[colourFields[set.key]] as ModuleColour}
            />
          ))}
          <p className="norigae__pearl">{text.pearlNote}</p>
          <OptionGroup
            hint={text.secondElement.hint}
            legend={text.secondElement.legend}
            name={`${idPrefix}-second-element`}
            onChange={(secondElement) => update({ secondElement })}
            options={secondElementIds.map((id) => ({ value: id, label: text.secondElement.options[id] }))}
            value={design.secondElement}
            wide
          />
          <OptionGroup
            hint={text.tasselLength.hint}
            legend={text.tasselLength.legend}
            name={`${idPrefix}-length`}
            onChange={(tasselLength) => update({ tasselLength })}
            options={tasselLengthIds.map((id) => ({ value: id, label: text.tasselLength.options[id] }))}
            value={design.tasselLength}
            wide
          />
          <div aria-live="polite" className="norigae__summary" role="status">
            <p>{text.summary.prefix}</p>
            <ul>
              {rows.map((row) => <li key={row.label}>{renderRow(row)}</li>)}
            </ul>
          </div>
          <CopyDesign
            copiedText={text.copy.success}
            failedText={text.copy.failure}
            label={text.copy.button}
            onCopy={() => clipboard.copy(plainSummary)}
            status={clipboard.status}
          />
        </div>
      </div>
    </div>
  )
}

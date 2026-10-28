import { useId, useState } from 'react'
import type { ModuleColour } from '../content/jewellery'
import {
  initialNorigae,
  isNorigaeShowcase,
  knotStyleIds,
  norigaeColours,
  norigaePhoto,
  norigaePresets,
  secondElementIds,
  tasselLengthIds,
  type NorigaeColourField,
  type NorigaeDesign,
} from '../content/norigae'
import { shopAnchors } from '../content/shop'
import { useCopy } from '../i18n/LanguageContext'
import { BuilderSummary, ColourOptionGroup, CopyDesign, OptionGroup, PresetRow } from './BuilderControls'
import { DesignPreview } from './DesignPreview'
import { NorigaeDrawing } from './NorigaeDrawing'
import { PearlControls } from './PearlControls'
import { summaryRowText, type SummaryRow } from './builderSummary'
import { useCopyToClipboard } from './useCopyToClipboard'
import './NorigaeBuilder.css'

type ColourKey = 'knot' | 'cord' | 'second' | 'tassel'

const colourFields: Record<ColourKey, NorigaeColourField> = {
  knot: 'knotColour',
  cord: 'cordColour',
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
  const rows: SummaryRow[] = [
    { label: labels.knot, value: text.knotStyle.options[design.knotStyle].label, colours: [design.knotColour] },
    { label: labels.cord, colours: [design.cordColour] },
    { label: labels.pendant, value: copy.shop.signaturePearl.pattern.options[design.pendant.pattern], colours: [design.pendant.first, design.pendant.second] },
    ...(hasSecond ? [{ label: labels.second, value: text.secondElement.options[design.secondElement], colours: [design.secondColour] }] : []),
    { label: labels.tassel, value: text.tasselLength.options[design.tasselLength], colours: [design.tasselColour] },
  ]

  const plainSummary = [text.copy.heading, ...rows.map(summaryRowText), text.pearlNote, text.copy.footer].join('\n')

  const colourGroup = (key: ColourKey, colours: ModuleColour[]) => (
    <ColourOptionGroup
      colours={colours}
      hint={text.colours[key].hint}
      legend={text.colours[key].legend}
      name={`${idPrefix}-${key}`}
      onChange={(colour) => update({ [colourFields[key]]: colour })}
      value={design[colourFields[key]]}
    />
  )

  return (
    <div aria-describedby={`${idPrefix}-note`} aria-labelledby={`${idPrefix}-title`} className="norigae" id={shopAnchors.maedeupBuilder} role="group">
      <div className="norigae__heading">
        <h4 id={`${idPrefix}-title`}>{text.title}</h4>
        <p>{text.intro}</p>
        <p className="image-disclosure" id={`${idPrefix}-note`}>{text.note}</p>
      </div>
      <div className="norigae__workspace">
        <div className="norigae__preview">
          <span className="norigae__label">{text.previewLabel}</span>
          <DesignPreview
            drawing={<NorigaeDrawing design={design} />}
            drawingClassName="norigae__drawing"
            idPrefix={idPrefix}
            photo={norigaePhoto}
            photoAlt={text.photoAlt}
            photoMatches={isNorigaeShowcase(design)}
          />
        </div>
        <div className="norigae__controls">
          <PresetRow label={text.presetsLabel} onSelect={(preset) => update({ ...preset.colours, pendant: { ...design.pendant, first: preset.pearl[0], second: preset.pearl[1] } })} presets={norigaePresets} />
          <OptionGroup
            hint={text.knotStyle.hint}
            legend={text.knotStyle.legend}
            name={`${idPrefix}-knot-style`}
            onChange={(knotStyle) => update({ knotStyle })}
            options={knotStyleIds.map((id) => ({ value: id, label: text.knotStyle.options[id].label, detail: text.knotStyle.options[id].description }))}
            value={design.knotStyle}
            wide
          />
          {colourGroup('knot', norigaeColours)}
          {colourGroup('cord', norigaeColours)}
          <PearlControls idPrefix={idPrefix} onChange={(pendant) => update({ pendant })} value={design.pendant} />
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
          {hasSecond ? colourGroup('second', norigaeColours) : null}
          {colourGroup('tassel', norigaeColours)}
          <OptionGroup
            hint={text.tasselLength.hint}
            legend={text.tasselLength.legend}
            name={`${idPrefix}-length`}
            onChange={(tasselLength) => update({ tasselLength })}
            options={tasselLengthIds.map((id) => ({ value: id, label: text.tasselLength.options[id] }))}
            value={design.tasselLength}
            wide
          />
          <BuilderSummary prefix={text.summary.prefix} rows={rows} />
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

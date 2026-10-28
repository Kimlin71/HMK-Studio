import { useId, useState } from 'react'
import {
  braceletBeadColours,
  braceletCordColours,
  braceletPresets,
  braceletSizes,
  braceletStyleIds,
  braceletStyles,
  defaultBraceletDesign,
  hasBaseColours,
  type BraceletDesign,
} from '../content/bracelet'
import { shopAnchors } from '../content/shop'
import { useCopy } from '../i18n/LanguageContext'
import { BraceletDrawing } from './BraceletDrawing'
import { BuilderSummary, ColourOptionGroup, CopyDesign, OptionGroup, PresetRow } from './BuilderControls'
import { DesignPreview } from './DesignPreview'
import { PearlControls } from './PearlControls'
import { summaryRowText, type SummaryRow } from './builderSummary'
import { useCopyToClipboard } from './useCopyToClipboard'
import './BraceletBuilder.css'

export function BraceletBuilder() {
  const { copy } = useCopy()
  const text = copy.shop.bracelet
  const idPrefix = useId()
  const [design, setDesign] = useState<BraceletDesign>(defaultBraceletDesign)
  const clipboard = useCopyToClipboard()

  const update = (patch: Partial<BraceletDesign>) => {
    setDesign((current) => ({ ...current, ...patch }))
    clipboard.reset()
  }

  const style = braceletStyles[design.style]
  const size = text.size.options[design.size]
  const labels = text.summary.labels

  const rows: SummaryRow[] = [
    { label: labels.style, value: style.name },
    { label: labels.cord, colours: [design.cord] },
    { label: labels.beads, value: `${style.beadCount - 1} ${text.summary.beadTypeNames[style.beadType]}`, colours: [design.beadColour] },
    { label: labels.signature, value: `${text.summary.signatureCount}, ${copy.shop.signaturePearl.pattern.options[design.signature.pattern]}`, colours: [design.signature.first, design.signature.second] },
    { label: labels.size, value: `${size.label} (${size.range})` },
  ]

  const plainSummary = [text.copy.heading, ...rows.map(summaryRowText), text.copy.footer].join('\n')

  return (
    <div aria-describedby={`${idPrefix}-note`} aria-labelledby={`${idPrefix}-title`} className="bracelet-builder" id={shopAnchors.braceletBuilder} role="group">
      <div className="bracelet-builder__heading">
        <p className="eyebrow">{text.eyebrow}</p>
        <h4 id={`${idPrefix}-title`}>{text.title}</h4>
        <p>{text.intro}</p>
        <p className="image-disclosure" id={`${idPrefix}-note`}>{text.note}</p>
      </div>
      <div className="bracelet-builder__workspace">
        <div className="bracelet-builder__preview">
          <span className="eyebrow">{text.previewLabel}</span>
          <DesignPreview
            drawing={<BraceletDrawing design={design} />}
            idPrefix={idPrefix}
            photo={style.photo}
            photoAlt={text.photoAlt[design.style]}
            photoMatches={hasBaseColours(design)}
          />
        </div>
        <div className="bracelet-builder__controls">
          <OptionGroup
            hint={text.style.hint}
            legend={text.style.legend}
            name={`${idPrefix}-style`}
            onChange={(next) => setDesign({ ...defaultBraceletDesign, ...braceletStyles[next].base, style: next, size: design.size })}
            options={braceletStyleIds.map((id) => ({
              value: id,
              label: <span lang="en">{braceletStyles[id].name}</span>,
              detail: text.style.options[id],
            }))}
            value={design.style}
            wide
          />
          <PresetRow
            label={text.presetsLabel}
            onSelect={(preset) => update({ cord: preset.cord, beadColour: preset.beadColour, signature: { ...design.signature, first: preset.pearl[0], second: preset.pearl[1] } })}
            presets={braceletPresets}
          />
          <ColourOptionGroup
            colours={braceletCordColours}
            hint={text.cord.hint}
            legend={text.cord.legend}
            name={`${idPrefix}-cord`}
            onChange={(cord) => update({ cord })}
            value={design.cord}
          />
          <ColourOptionGroup
            colours={braceletBeadColours}
            hint={text.beadColour.hint}
            legend={text.beadColour.legend}
            name={`${idPrefix}-bead-colour`}
            onChange={(beadColour) => update({ beadColour })}
            value={design.beadColour}
          />
          <PearlControls idPrefix={idPrefix} onChange={(signature) => update({ signature })} value={design.signature} />
          <OptionGroup
            hint={text.size.hint}
            legend={text.size.legend}
            name={`${idPrefix}-size`}
            onChange={(next) => update({ size: next })}
            options={braceletSizes.map((key) => ({ value: key, label: text.size.options[key].label, detail: text.size.options[key].range }))}
            value={design.size}
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

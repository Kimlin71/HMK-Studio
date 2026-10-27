import { useId, useState } from 'react'
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
import { shopAnchors } from '../content/shop'
import { useCopy } from '../i18n/LanguageContext'
import { BraceletDrawing } from './BraceletDrawing'
import { BuilderSummary, ColourOptionGroup, CopyDesign, OptionGroup, PresetRow } from './BuilderControls'
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

  const beadTypeName = text.summary.beadTypeNames[design.beadType]
  const size = text.size.options[design.size]
  const labels = text.summary.labels

  const rows: SummaryRow[] = [
    { label: labels.cord, colour: design.cord },
    { label: labels.beads, value: `${design.beadCount - 1} ${beadTypeName}`, colour: design.beadColour },
    { label: labels.signature, value: text.summary.signatureCount, colour: design.signatureColour },
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
          <BraceletDrawing design={design} />
          <span className="bracelet-builder__preview-note">{text.previewNote}</span>
        </div>
        <div className="bracelet-builder__controls">
          <PresetRow label={text.presetsLabel} onSelect={(preset) => update(preset.design)} presets={braceletPresets} />
          <ColourOptionGroup
            colours={braceletCordColours}
            hint={text.cord.hint}
            legend={text.cord.legend}
            name={`${idPrefix}-cord`}
            onChange={(cord) => update({ cord })}
            value={design.cord}
          />
          <OptionGroup
            hint={text.beadType.hint}
            legend={text.beadType.legend}
            name={`${idPrefix}-bead-type`}
            onChange={(beadType) => update({ beadType })}
            options={braceletBeadTypes.map((type) => ({ value: type, label: text.beadType.options[type] }))}
            value={design.beadType}
          />
          <ColourOptionGroup
            colours={braceletBeadColours}
            hint={text.beadColour.hint}
            legend={text.beadColour.legend}
            name={`${idPrefix}-bead-colour`}
            onChange={(beadColour) => update({ beadColour })}
            value={design.beadColour}
          />
          <OptionGroup
            hint={text.beadCount.hint}
            legend={text.beadCount.legend}
            name={`${idPrefix}-bead-count`}
            onChange={(beadCount) => update({ beadCount })}
            options={braceletBeadCounts.map((count) => ({ value: count, label: count }))}
            value={design.beadCount}
          />
          <ColourOptionGroup
            colours={braceletSignatureColours}
            hint={text.signature.hint}
            legend={text.signature.legend}
            name={`${idPrefix}-signature`}
            onChange={(signatureColour) => update({ signatureColour })}
            value={design.signatureColour}
          />
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

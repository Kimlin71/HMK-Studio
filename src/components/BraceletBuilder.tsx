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
import { colourLabels } from '../content/jewellery'
import { shopAnchors } from '../content/shop'
import { useCopy } from '../i18n/LanguageContext'
import { BraceletDrawing } from './BraceletDrawing'
import { ColourOptionGroup, CopyDesign, OptionGroup, PresetRow } from './BuilderControls'
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
  const otherBeads = design.beadCount - 1

  // Plain-text version of the summary. Only this string ever leaves the page, and only to the user's own clipboard.
  const plainSummary = [
    text.copy.heading,
    `${text.summary.cord}: ${colourLabels[design.cord]}`,
    `${text.summary.beads}: ${otherBeads} ${beadTypeName}, ${colourLabels[design.beadColour]}`,
    `${text.summary.signature}: 1, ${colourLabels[design.signatureColour]}`,
    `${text.summary.size}: ${size.label} (${size.range})`,
  ].join('\n')

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
          <PresetRow label={text.presetsEyebrow} onSelect={(preset) => update(preset.design)} presets={braceletPresets} />
          <ColourOptionGroup
            colours={braceletCordColours}
            hint={text.cord.description}
            legend={text.cord.legend}
            name={`${idPrefix}-cord`}
            onChange={(cord) => update({ cord })}
            value={design.cord}
          />
          <OptionGroup
            hint={text.beadType.description}
            legend={text.beadType.legend}
            name={`${idPrefix}-bead-type`}
            onChange={(beadType) => update({ beadType })}
            options={braceletBeadTypes.map((type) => ({ value: type, label: text.beadType.options[type] }))}
            value={design.beadType}
          />
          <ColourOptionGroup
            colours={braceletBeadColours}
            hint={text.beadColour.description}
            legend={text.beadColour.legend}
            name={`${idPrefix}-bead-colour`}
            onChange={(beadColour) => update({ beadColour })}
            value={design.beadColour}
          />
          <OptionGroup
            hint={text.beadCount.description}
            legend={text.beadCount.legend}
            name={`${idPrefix}-bead-count`}
            onChange={(beadCount) => update({ beadCount })}
            options={braceletBeadCounts.map((count) => ({ value: count, label: count }))}
            value={design.beadCount}
          />
          <ColourOptionGroup
            colours={braceletSignatureColours}
            hint={`${text.signature.description} · ${text.signature.fixed}`}
            legend={text.signature.legend}
            name={`${idPrefix}-signature`}
            onChange={(signatureColour) => update({ signatureColour })}
            value={design.signatureColour}
          />
          <OptionGroup
            hint={text.size.description}
            legend={text.size.legend}
            name={`${idPrefix}-size`}
            onChange={(next) => update({ size: next })}
            options={braceletSizes.map((key) => ({ value: key, label: text.size.options[key].label, detail: text.size.options[key].range }))}
            value={design.size}
          />
          <output aria-live="polite" className="bracelet-builder__summary">
            <strong>{text.summary.prefix}</strong>
            <span>{text.summary.cord}: <span lang="en">{colourLabels[design.cord]}</span></span>
            <span>{text.summary.beads}: {otherBeads} {beadTypeName}, <span lang="en">{colourLabels[design.beadColour]}</span></span>
            <span>{text.summary.signature}: 1, <span lang="en">{colourLabels[design.signatureColour]}</span></span>
            <span>{text.summary.size}: {size.label} ({size.range})</span>
          </output>
          <CopyDesign
            copiedText={text.copy.copied}
            failedText={text.copy.failed}
            label={text.copy.label}
            onCopy={() => clipboard.copy(plainSummary)}
            status={clipboard.status}
          />
        </div>
      </div>
    </div>
  )
}

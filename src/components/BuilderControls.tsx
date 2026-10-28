import type { ReactNode } from 'react'
import { colourLabels, type ModuleColour } from '../content/jewellery'
import type { SummaryRow } from './builderSummary'
import type { CopyStatus } from './useCopyToClipboard'
import './BuilderControls.css'

// Controls shared by the bracelet and Maedeup builders. Native radio inputs throughout:
// arrow keys move within a group, Tab moves between groups.

type Option<T extends string | number> = {
  value: T
  label: ReactNode
  /** Secondary line under the label, for example a size range. */
  detail?: ReactNode
  swatch?: ModuleColour
}

type OptionGroupProps<T extends string | number> = {
  legend: string
  hint: string
  name: string
  options: Option<T>[]
  value: T
  onChange: (value: T) => void
  /** Wider cells, for text choices that carry a description. */
  wide?: boolean
}

export function OptionGroup<T extends string | number>({ legend, hint, name, options, value, onChange, wide }: OptionGroupProps<T>) {
  return (
    <fieldset className="builder-options">
      <legend><span>{legend}</span> <small>{hint}</small></legend>
      <div className={wide ? 'builder-options__row builder-options__row--wide' : 'builder-options__row'}>
        {options.map((option) => (
          <label className="builder-option" key={option.value}>
            <input checked={option.value === value} name={name} onChange={() => onChange(option.value)} type="radio" value={option.value} />
            {option.swatch ? <span aria-hidden="true" className={`builder-option__swatch tone--${option.swatch}`} /> : null}
            <span>{option.label}</span>
            {option.detail ? <small>{option.detail}</small> : null}
          </label>
        ))}
      </div>
    </fieldset>
  )
}

type ColourOptionGroupProps = Omit<OptionGroupProps<ModuleColour>, 'options'> & { colours: ModuleColour[] }

// Colour names are proper names and stay English in both languages.
export function ColourOptionGroup({ colours, ...props }: ColourOptionGroupProps) {
  return (
    <OptionGroup
      {...props}
      options={colours.map((colour) => ({ value: colour, swatch: colour, label: <span lang="en">{colourLabels[colour]}</span> }))}
    />
  )
}

// Live summary shared by both builders: one <output>, one row per choice. Colour names stay English.
export function BuilderSummary({ prefix, rows }: { prefix: string; rows: SummaryRow[] }) {
  return (
    <output aria-live="polite" className="builder-summary">
      <strong>{prefix}</strong>
      {rows.map((row) => (
        <span key={row.label}>
          {row.label}: {row.value ? `${row.value}, ` : ''}
          {row.colours?.map((colour, index) => (
            <span key={colour + index}>{index > 0 ? ' + ' : null}<span lang="en">{colourLabels[colour]}</span></span>
          ))}
        </span>
      ))}
    </output>
  )
}

type CopyDesignProps = {
  label: string
  copiedText: string
  failedText: string
  status: CopyStatus
  onCopy: () => void
}

export function CopyDesign({ label, copiedText, failedText, status, onCopy }: CopyDesignProps) {
  return (
    <div className="builder-copy">
      <button className="builder-button" onClick={onCopy} type="button">{label}</button>
      <p className="builder-copy__status" role="status">
        {status === 'copied' ? copiedText : status === 'failed' ? failedText : ''}
      </p>
    </div>
  )
}

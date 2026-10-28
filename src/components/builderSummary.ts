import { colourLabels, type ModuleColour } from '../content/jewellery'

export type SummaryRow = {
  label: string
  /** Text value, already resolved from copy. */
  value?: string
  /** One colour, or two for the signature pearl. */
  colours?: ModuleColour[]
}

// Plain-text row for the clipboard. Only this text ever leaves the page, and only to the visitor's own clipboard.
export function summaryRowText(row: SummaryRow) {
  return `${row.label}: ${[row.value, row.colours?.map((colour) => colourLabels[colour]).join(' + ')].filter(Boolean).join(', ')}`
}

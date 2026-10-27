import { colourLabels, type ModuleColour } from '../content/jewellery'

export type SummaryRow = {
  label: string
  /** Text value, already resolved from copy. */
  value?: string
  colour?: ModuleColour
}

// Plain-text row for the clipboard. Only this text ever leaves the page, and only to the visitor's own clipboard.
export function summaryRowText(row: SummaryRow) {
  return `${row.label}: ${[row.value, row.colour ? colourLabels[row.colour] : ''].filter(Boolean).join(', ')}`
}

import type { Copy } from '../content/copy/types'
import { colourLabels, type ModuleColour } from '../content/jewellery'
import type { NorigaeDesign } from '../content/norigae'

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

// One ordered list of rows for a Norigae: used by the builder summary, the copied text, the cart and the checkout.
export function norigaeSummaryRows(design: NorigaeDesign, copy: Copy): SummaryRow[] {
  const text = copy.shop.maedeup
  const labels = text.summary.labels
  return [
    { label: labels.knot, colours: [design.knotColour] },
    { label: labels.cord, colours: [design.cordColour] },
    { label: labels.pendant, value: copy.shop.signaturePearl.pattern.options[design.pendant.pattern], colours: [design.pendant.first, design.pendant.second] },
    { label: labels.tassel, value: text.tasselLength.options[design.tasselLength], colours: [design.tasselColour] },
  ]
}

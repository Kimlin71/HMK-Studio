import { useCopy } from '../i18n/LanguageContext'
import type { CartItem } from '../content/cart'
import { braceletPearls, getShopItem } from '../content/shop'
import { formatMeasurement, measurementKeys } from '../content/pattern'
import { price } from '../content/prices'
import { norigaeSummaryRows, type SummaryRow } from './builderSummary'
import { SummaryRowContent } from './BuilderControls'
import { Price } from './Price'
import type { Copy } from '../content/copy/types'

type Line = { name: string; nameLang?: 'en'; kind: string; rows: SummaryRow[] }

// What one cart item looks like, taken from the item data (never copied text), in the current language.
function describe(item: CartItem, copy: Copy, language: 'sv' | 'en'): Line {
  const kinds = copy.cart.kinds
  switch (item.kind) {
    case 'bracelet': {
      const pearl = braceletPearls[item.braceletId]
      return {
        name: getShopItem(item.braceletId)?.name ?? item.braceletId,
        nameLang: 'en',
        kind: kinds.bracelet,
        rows: [{ label: copy.shop.maedeup.summary.labels.pendant, value: copy.shop.signaturePearl.pattern.options[pearl.pattern], colours: [pearl.first, pearl.second] }],
      }
    }
    case 'norigae':
      return { name: kinds.norigae, kind: kinds.norigae, rows: norigaeSummaryRows(item.design, copy) }
    case 'pattern':
      return {
        name: kinds.pattern,
        kind: kinds.pattern,
        rows: measurementKeys.map((key) => ({ label: copy.pattern.form.fields[key].label, value: formatMeasurement(item.measurements[key], language) })),
      }
  }
}

type OrderLinesProps = {
  items: readonly CartItem[]
  /** When given, each line gets a remove button. */
  onRemove?: (id: string) => void
}

// One list shared by the cart panel, the checkout and the confirmation.
export function OrderLines({ items, onRemove }: OrderLinesProps) {
  const { copy, language } = useCopy()

  return (
    <ul className="order-lines">
      {items.map((item) => {
        const line = describe(item, copy, language)
        return (
          <li className="order-line" key={item.id}>
            <div className="order-line__head">
              <p className="order-line__kind">{line.kind}</p>
              <h4 className="order-line__name" lang={line.nameLang}>{line.name}</h4>
              <Price amount={price(item)} />
            </div>
            <ul className="order-line__rows">
              {line.rows.map((row) => <li key={row.label}><SummaryRowContent row={row} /></li>)}
            </ul>
            {onRemove ? (
              <button aria-label={copy.cart.panel.remove(line.name)} className="order-line__remove" onClick={() => onRemove(item.id)} type="button">
                {copy.cart.panel.removeText}
              </button>
            ) : null}
          </li>
        )
      })}
    </ul>
  )
}

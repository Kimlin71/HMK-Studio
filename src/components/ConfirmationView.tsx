import { useCart } from '../cart/CartContext'
import { patternPdf } from '../content/patternFile'
import { shopAnchors } from '../content/shop'
import { useCopy } from '../i18n/LanguageContext'
import { FlowShell } from './FlowShell'
import { OrderLines } from './OrderLines'
import { Price } from './Price'

// Order confirmation. The order exists only in memory: a reload shows the empty state. The download link appears only when the order holds a pattern.
export function ConfirmationView() {
  const { copy } = useCopy()
  const text = copy.confirmation
  const { order, startOver } = useCart()

  if (!order) {
    return (
      <FlowShell title={text.title}>
        <p className="flow__empty">{text.empty}</p>
        <a className="flow__button" href={`#${shopAnchors.section}`}>{text.emptyAction}</a>
      </FlowShell>
    )
  }

  return (
    <FlowShell title={text.title}>
      <p className="flow__thanks">{text.thanks}</p>
      <p className="flow__order-number"><span>{text.orderNumber}</span> <strong>{order.number}</strong></p>
      <section aria-labelledby="order-items-title" className="flow__panel">
        <h2 id="order-items-title">{text.items}</h2>
        <OrderLines items={order.items} />
        <p className="flow__total"><span>{copy.cart.panel.total}</span> <Price amount={order.total} /></p>
      </section>
      {order.hasPattern ? (
        <section aria-labelledby="order-download-title" className="flow__panel flow__download">
          <h2 id="order-download-title">{text.downloadTitle}</h2>
          <p className="flow__small">{copy.pattern.download.note}</p>
          <a className="flow__button" download href={patternPdf}>{copy.pattern.download.button} <span className="flow__file">{copy.pattern.download.fileHint}</span></a>
        </section>
      ) : null}
      <button className="flow__button flow__button--quiet" onClick={() => { startOver(); window.location.hash = '' }} type="button">{text.startOver}</button>
    </FlowShell>
  )
}

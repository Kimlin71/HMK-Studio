import { useEffect, useId, useRef, useState, type FormEvent } from 'react'
import { useCart } from '../cart/CartContext'
import { cartTotal } from '../content/cart'
import { PAYMENT_DELAY_MS, customerFields, demoCustomer, validateCustomer, type Customer } from '../content/order'
import { formatPrice } from '../content/prices'
import { shopAnchors } from '../content/shop'
import { useCopy } from '../i18n/LanguageContext'
import { goTo } from '../routing/useRoute'
import { FlowShell } from './FlowShell'
import { OrderLines } from './OrderLines'
import { Price } from './Price'

// Checkout. Fictional pre-filled customer, a mocked payment with a short delay and then the confirmation.
// The card number lives in this component's state only: never logged, stored, sent or put in the URL.
export function CheckoutView() {
  const { copy, language } = useCopy()
  const text = copy.checkout
  const { items, placeOrder } = useCart()
  const idPrefix = useId()
  const [customer, setCustomer] = useState<Customer>(demoCustomer)
  const [tried, setTried] = useState(false)
  const [processing, setProcessing] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  // Leaving the view cancels a payment that has not finished.
  useEffect(() => () => window.clearTimeout(timer.current), [])

  const errors = validateCustomer(customer)
  const hasErrors = Object.keys(errors).length > 0
  const total = cartTotal(items)

  if (items.length === 0) {
    return (
      <FlowShell title={text.title}>
        <p className="flow__empty">{text.empty}</p>
        <a className="flow__button" href={`#${shopAnchors.section}`}>{text.emptyAction}</a>
      </FlowShell>
    )
  }

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    setTried(true)
    if (hasErrors || processing) return
    setProcessing(true)
    timer.current = window.setTimeout(() => {
      placeOrder()
      goTo('confirmation')
    }, PAYMENT_DELAY_MS)
  }

  return (
    <FlowShell title={text.title}>
      <div className="flow__grid">
        <section aria-labelledby={`${idPrefix}-summary`} className="flow__panel">
          <h2 id={`${idPrefix}-summary`}>{text.summary}</h2>
          <OrderLines items={items} />
          <p className="flow__total"><span>{copy.cart.panel.total}</span> <Price amount={total} /></p>
          <p className="flow__small">{text.delivery}</p>
        </section>
        <form className="flow__panel flow__form" noValidate onSubmit={onSubmit}>
          <h2>{text.detailsTitle} <span className="demo-tag">{copy.demoTag}</span></h2>
          <p className="flow__demo-note" id={`${idPrefix}-demo`}>{text.detailsNote}</p>
          {customerFields.map((field) => {
            const error = tried ? errors[field] : undefined
            const hintId = `${idPrefix}-${field}-hint`
            const errorId = `${idPrefix}-${field}-error`
            const hint = text.fields[field].hint
            return (
              <div className={error ? 'flow__field flow__field--error' : 'flow__field'} key={field}>
                <label htmlFor={`${idPrefix}-${field}`}>{text.fields[field].label} <span className="demo-tag">{copy.demoTag}</span></label>
                <input
                  aria-describedby={[hint ? hintId : '', error ? errorId : '', `${idPrefix}-demo`].filter(Boolean).join(' ')}
                  aria-invalid={error ? true : undefined}
                  autoComplete="off"
                  id={`${idPrefix}-${field}`}
                  inputMode={field === 'card' || field === 'postcode' ? 'numeric' : field === 'email' ? 'email' : 'text'}
                  onChange={(event) => setCustomer((previous) => ({ ...previous, [field]: event.target.value }))}
                  type="text"
                  value={customer[field]}
                />
                {hint ? <p className="flow__hint" id={hintId}>{hint}</p> : null}
                {error ? <p className="flow__error" id={errorId}>{text.errors.required}</p> : null}
              </div>
            )
          })}
          <h2>{text.payment.title}</h2>
          <p className="flow__small">{text.payment.note}</p>
          <p className="flow__summary" role="status">{processing ? text.processing : tried && hasErrors ? text.errors.summary : ''}</p>
          <button className="flow__button flow__button--pay" disabled={processing} type="submit">
            {processing ? text.processing : text.pay(formatPrice(total, language))}
          </button>
          <a className="flow__link" href={`#${shopAnchors.section}`}>{text.back}</a>
        </form>
      </div>
    </FlowShell>
  )
}

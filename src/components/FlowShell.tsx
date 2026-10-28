import { useEffect, useRef, type ReactNode } from 'react'
import { useCart } from '../cart/CartContext'
import { useCopy } from '../i18n/LanguageContext'
import { Wordmark } from './Wordmark'
import { LanguageSwitch } from './LanguageSwitch'
import './FlowViews.css'

// Frame for the checkout and the confirmation: a slim header, the prototype notice on every screen and a "start over" button.
// The heading takes focus on arrival so keyboard and screen-reader users land at the top of the new view.
export function FlowShell({ title, children }: { title: string; children: ReactNode }) {
  const { copy } = useCopy()
  const { startOver } = useCart()
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    headingRef.current?.focus()
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="flow">
      <header className="flow__header">
        <Wordmark />
        <div className="flow__header-end">
          <LanguageSwitch />
          <button className="flow__start-over" onClick={() => { startOver(); window.location.hash = '' }} type="button">{copy.checkout.startOver}</button>
        </div>
      </header>
      <main className="flow__main" id="main-content">
        <p className="prototype-notice flow__notice">{copy.prototypeNotice}</p>
        <h1 className="flow__title" ref={headingRef} tabIndex={-1}>{title}</h1>
        {children}
      </main>
    </div>
  )
}

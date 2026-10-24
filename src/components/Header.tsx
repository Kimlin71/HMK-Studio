import { useState } from 'react'
import { navigation } from '../content/site'

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="site-header">
      <a className="wordmark" href="#hem" aria-label="Ateljé — till startsidan">
        <span className="wordmark__name">ATELJÉ</span>
        <span className="wordmark__caption">FORM · TEXTIL · DETALJ</span>
      </a>
      <button
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
        aria-label={menuOpen ? 'Stäng menyn' : 'Öppna menyn'}
        className="menu-toggle"
        onClick={() => setMenuOpen((open) => !open)}
        type="button"
      >
        <span />
        <span />
      </button>
      <nav
        aria-label="Huvudnavigation"
        className={menuOpen ? 'primary-nav primary-nav--open' : 'primary-nav'}
        id="primary-navigation"
      >
        {navigation.map((item) => (
          <a href={item.href} key={item.label} onClick={() => setMenuOpen(false)}>
            {item.label}
          </a>
        ))}
      </nav>
      {/* Future language switch: add Swedish / English routing when translated pages exist. */}
      <a className="header-contact" href="#kontakt">Kontakt <span aria-hidden="true">↗</span></a>
    </header>
  )
}

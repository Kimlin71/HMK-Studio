import { useRef, useState } from 'react'
import { navigation } from '../content/site'
import { useCopy } from '../i18n/LanguageContext'
import { CartButton } from './CartButton'
import { LanguageSwitch } from './LanguageSwitch'
import { Wordmark } from './Wordmark'

export function Header() {
  const { copy } = useCopy()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuToggleRef = useRef<HTMLButtonElement>(null)

  return (
    <header className="site-header" onKeyDown={(event) => {
      if (event.key === 'Escape' && menuOpen) {
        setMenuOpen(false)
        menuToggleRef.current?.focus()
      }
    }}>
      <Wordmark />
      <button
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
        aria-label={menuOpen ? copy.header.menuClose : copy.header.menuOpen}
        className="menu-toggle"
        ref={menuToggleRef}
        onClick={() => setMenuOpen((open) => !open)}
        type="button"
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>
      <nav
        aria-label={copy.header.navLabel}
        className={menuOpen ? 'primary-nav primary-nav--open' : 'primary-nav'}
        id="primary-navigation"
      >
        {navigation.map((item) => (
          <a href={item.href} key={item.key} onClick={() => setMenuOpen(false)}>
            {copy.header.nav[item.key]}
          </a>
        ))}
      </nav>
      <div className="header-end">
        <CartButton />
        <LanguageSwitch />
        <a className="header-contact" href="#kontakt">{copy.header.contact} <span aria-hidden="true">↗</span></a>
      </div>
    </header>
  )
}

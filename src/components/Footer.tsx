import { useCopy } from '../i18n/LanguageContext'
import { Wordmark } from './Wordmark'

export function Footer() {
  const { copy } = useCopy()
  const { footer } = copy

  return (
    <footer className="site-footer" id="kontakt">
      <div className="site-footer__top">
        <Wordmark footer />
        <p className="site-footer__thought">{footer.thought[0]}<br /><em>{footer.thought[1]}</em></p>
        <div className="site-footer__contact"><span>{footer.contactSoon}</span><a href="#nyhetsbrev">{footer.newsletterLink} <span aria-hidden="true">↓</span></a></div>
      </div>
      <div className="site-footer__bottom">
        <span>{footer.legal}</span>
        <span className="site-footer__social"><span>{footer.instagram}</span><span>{footer.pinterest}</span></span>
        <span>Form · Proportion · Connection</span>
      </div>
      {/* Future commerce: connect product detail views to variants, made-to-order enquiries and a checkout only when ready. */}
    </footer>
  )
}

export function Footer() {
  return (
    <footer className="site-footer" id="kontakt">
      <div className="site-footer__top">
        <a className="wordmark wordmark--footer" href="#hem" aria-label="Ateljé — till sidans början">
          <span className="wordmark__name">ATELJÉ</span>
          <span className="wordmark__caption">FORM · TEXTIL · DETALJ</span>
        </a>
        <p className="site-footer__thought">Designed for proportion.<br /><em>Made with intention.</em></p>
        <div className="site-footer__contact"><span>Kontaktfunktion öppnar snart.</span><a href="#nyhetsbrev">Om det kommande nyhetsbrevet <span aria-hidden="true">↓</span></a></div>
      </div>
      <div className="site-footer__bottom">
        <span>© 2026 ATELJÉ — DEMO</span>
        <span className="site-footer__social"><span>Instagram · snart</span><span>Pinterest · snart</span></span>
        <span>Form · Proportion · Connection</span>
      </div>
      {/* Future commerce: connect product detail views to variants, made-to-order enquiries and a checkout only when ready. */}
    </footer>
  )
}

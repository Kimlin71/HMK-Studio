import { useCopy } from '../i18n/LanguageContext'

export function Newsletter() {
  const { copy } = useCopy()
  const text = copy.newsletter

  return (
    <section aria-labelledby="newsletter-title" className="newsletter" id="nyhetsbrev">
      <div>
        <p className="eyebrow"><span>09</span> / {text.eyebrow}</p>
        <h2 id="newsletter-title">{text.title}</h2>
        <p>{text.text}</p>
      </div>
      <form aria-label={text.formLabel} aria-describedby="newsletter-note" className="newsletter__form" onSubmit={(event) => event.preventDefault()}>
        <label htmlFor="newsletter-email">{text.emailLabel}</label>
        <div className="newsletter__input-row">
          <input autoComplete="off" disabled id="newsletter-email" placeholder={text.placeholder} type="email" />
          <button aria-label={text.buttonLabel} disabled type="submit">{text.button} <span aria-hidden="true">↗</span></button>
        </div>
        <p id="newsletter-note">{text.note}</p>
      </form>
    </section>
  )
}

import { useCopy } from '../i18n/LanguageContext'

export function BrandIntro() {
  const { copy } = useCopy()
  const { brandIntro } = copy

  return (
    <section aria-labelledby="intro-title" className="brand-intro section-shell" id="filosofi">
      <div className="section-marker"><span>02</span><span>{brandIntro.marker}</span></div>
      <div className="brand-intro__content">
        <p className="eyebrow">{brandIntro.eyebrow}</p>
        <h2 id="intro-title">{brandIntro.titleTop}{' '}<br /><em>{brandIntro.titleEm}</em></h2>
        <div className="brand-intro__lower">
          <p>{brandIntro.lead}</p>
          <p>{brandIntro.body}</p>
        </div>
        <div className="brand-intro__thread" aria-hidden="true"><span /> <b>{copy.tagline}</b></div>
      </div>
    </section>
  )
}

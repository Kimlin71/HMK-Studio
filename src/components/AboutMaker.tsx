import { useCopy } from '../i18n/LanguageContext'

export function AboutMaker() {
  const { copy } = useCopy()
  const text = copy.about

  return (
    <section aria-labelledby="about-title" className="about-maker section-shell" id="om-ateljen">
      <div className="section-marker"><span>08</span><span>{text.marker}</span></div>
      <div className="about-maker__image">
        {/* Concept environment image (art direction). Replace with an approved studio photograph when available, never an unrelated founder portrait. */}
        <img alt={text.imageAlt} loading="lazy" src="/images/atelier-study.png" />
        <span className="image-note">{text.imageNote}</span>
        <span className="about-maker__image-quote">{text.quote[0]}<br />{text.quote[1]}</span>
      </div>
      <div className="about-maker__copy">
        <p className="eyebrow">{text.eyebrow}</p>
        <h2 id="about-title">{text.titleTop}<br /><em>{text.titleEm}</em></h2>
        <p>{text.p1}</p>
        <p>{text.p2}</p>
        <a className="text-link" href="#filosofi">{text.link} <span aria-hidden="true">↗</span></a>
        <div className="about-maker__signature">{copy.tagline} <span>✳</span></div>
      </div>
    </section>
  )
}

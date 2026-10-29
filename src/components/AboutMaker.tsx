import { useState } from 'react'
import { aboutImage } from '../content/site'
import { useCopy } from '../i18n/LanguageContext'

export function AboutMaker() {
  const { copy } = useCopy()
  const text = copy.about
  const [missing, setMissing] = useState(false)

  return (
    <section aria-labelledby="about-title" className="about-maker section-shell" id="om-ateljen">
      <div className="section-marker"><span>08</span><span>{text.marker}</span></div>
      <div className="about-maker__image">
        {/* The founder's own picture goes here. Until the file exists the frame shows a placeholder. */}
        {missing ? (
          <p className="about-maker__pending">{text.imagePending}</p>
        ) : (
          <img alt={text.imageAlt} loading="lazy" onError={() => setMissing(true)} src={aboutImage} />
        )}
        <span className="about-maker__image-quote">{text.quote[0]}<br />{text.quote[1]}</span>
      </div>
      <div className="about-maker__copy">
        <h2 id="about-title">{text.titleTop}<br /><em>{text.titleEm}</em></h2>
        <p>{text.p1}</p>
        <p>{text.p2}</p>
        <a className="text-link" href="#filosofi">{text.link} <span aria-hidden="true">↗</span></a>
        <div className="about-maker__signature">{copy.tagline} <span>✳</span></div>
      </div>
    </section>
  )
}

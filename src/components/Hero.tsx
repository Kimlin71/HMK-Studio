import type { ProductArea } from '../content/products'
import { useCopy } from '../i18n/LanguageContext'

const doorOrder: { area: ProductArea; href: string }[] = [
  { area: 'WEAR', href: '#wear' },
  { area: 'MAKE', href: '#make' },
  { area: 'ACCENTED', href: '#accented' },
]

// First screen: one headline, one sentence that says what the studio is, and three doors into the offerings.
export function Hero() {
  const { copy } = useCopy()
  const { hero } = copy

  return (
    <section aria-labelledby="hero-title" className="hero" id="hem">
      <div className="hero__copy">
        <p className="eyebrow"><span className="eyebrow__line" /> {hero.eyebrow}</p>
        <h1 id="hero-title" lang="en">{hero.titleTop}{' '}<br /><em>{hero.titleEm}</em></h1>
        <p className="hero__lead">{hero.lead}</p>
        <div className="hero__actions">
          <a className="button button--dark" href="#wear">{hero.primaryCta} <span aria-hidden="true">↗</span></a>
          <a className="text-link" href="#filosofi">{hero.secondaryCta} <span aria-hidden="true">↓</span></a>
        </div>
        <p className="hero__index" lang="en">{hero.index}</p>
      </div>
      <div className="hero__visual">
        {/* Concept image (art direction). Replace with an approved studio photograph when available. */}
        <img
          alt={hero.imageAlt}
          className="hero__image"
          fetchPriority="high"
          width="896"
          height="1200"
          src="/images/hero-proportions.jpg"
        />
        <div className="hero__image-note"><span>{hero.imageNote[0]}</span><span>{hero.imageNote[1]}</span></div>
        <span aria-hidden="true" className="hero__thread" />
        <span className="hero__seal" lang="en">{hero.seal[0]}<br />{hero.seal[1]}</span>
      </div>
      <nav aria-label={hero.doorsLabel} className="hero__doors">
        {doorOrder.map(({ area, href }, index) => (
          <a className="hero__door" href={href} key={area}>
            <span className="hero__door-number">0{index + 1}</span>
            <span className="hero__door-title" lang="en">{hero.doors[area].title}</span>
            <span className="hero__door-text">{hero.doors[area].text}</span>
            <span aria-hidden="true" className="hero__door-arrow">↓</span>
          </a>
        ))}
      </nav>
    </section>
  )
}

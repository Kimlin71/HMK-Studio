import type { ProductArea } from '../content/products'
import { heroTiles } from '../content/site'
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
        <h1 id="hero-title">{hero.titleTop}{' '}<br /><em>{hero.titleEm}</em></h1>
        <p className="hero__lead">{hero.lead}</p>
        <div className="hero__actions">
          <a className="button button--dark" href="#wear">{hero.primaryCta} <span aria-hidden="true">↗</span></a>
          <a className="text-link" href="#filosofi">{hero.secondaryCta} <span aria-hidden="true">↓</span></a>
        </div>
        <p className="hero__index">{hero.index}</p>
      </div>
      <div className="hero__visual">
        {/* Concept images (art direction). Replace with approved studio photographs when available. */}
        {heroTiles.map((tile, index) => (
          <figure className={`hero__tile hero__tile--${tile.area.toLowerCase()}`} key={tile.area}>
            <img
              alt={hero.tiles[tile.area].alt}
              className="hero__image"
              fetchPriority={index === 0 ? 'high' : undefined}
              height={tile.height}
              src={tile.image}
              style={{ objectPosition: tile.position }}
              width={tile.width}
            />
            <figcaption lang="en">{tile.area}</figcaption>
          </figure>
        ))}
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

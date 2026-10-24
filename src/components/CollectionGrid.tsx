import { collections, type EditorialPiece } from '../content/products'
import { ModularJewellery } from './ModularJewellery'

type CollectionGridProps = {
  pieces: EditorialPiece[]
  onExplore: (piece: EditorialPiece) => void
}

export function CollectionGrid({ pieces, onExplore }: CollectionGridProps) {
  return (
    <div className="collections">
      {collections.map((collection) => {
        const { area } = collection
        const piece = pieces.find((item) => item.collectionId === collection.id)
        if (!piece) return null

        return (
          <section aria-labelledby={`${area.toLowerCase()}-title`} className={`collection collection--${area.toLowerCase()}`} id={area.toLowerCase()} key={area}>
            <div className="collection__intro">
              <div className="section-marker"><span>{collection.number}</span><span>{area}</span></div>
              <p className="eyebrow" lang="en">{collection.concept}</p>
              <h2 id={`${area.toLowerCase()}-title`} lang="en">{collection.title}</h2>
              <div className="collection__description" lang="en">
                {collection.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              {area === 'ADORN' ? (
                <a className="text-link collection__link" href="#kombination" lang="en">{collection.action} <span aria-hidden="true">↓</span></a>
              ) : (
                <button className="text-link collection__link" lang="en" onClick={() => onExplore(piece)} type="button">{collection.action} <span aria-hidden="true">↗</span></button>
              )}
            </div>
            <button aria-label={`Visa ${piece.name}, fiktivt demo, ${piece.category}`} className="piece-card" onClick={() => onExplore(piece)} type="button">
              <span className="piece-card__image-wrap">
                {/* Replace illustrations with the atelier's own photographs when available. */}
                <img alt={piece.imageAlt} className="piece-card__image" loading="lazy" src={piece.image} style={{ objectPosition: piece.imagePosition }} />
                <span className="image-note">Fiktivt demo · Illustration</span>
                <span className="piece-card__open" aria-hidden="true">↗</span>
              </span>
              <span className="piece-card__meta"><span>{piece.name}</span><span>{piece.category}</span></span>
            </button>
            {area === 'ADORN' ? <ModularJewellery /> : null}
          </section>
        )
      })}
    </div>
  )
}

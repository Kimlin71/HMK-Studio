import { collections, type EditorialPiece } from '../content/products'
import { useCopy } from '../i18n/LanguageContext'
import { ConnectFamily } from './ConnectFamily'
import { ModularJewellery } from './ModularJewellery'
import { ReconstructCompare } from './ReconstructCompare'

type CollectionGridProps = {
  pieces: EditorialPiece[]
  onExplore: (piece: EditorialPiece) => void
}

export function CollectionGrid({ pieces, onExplore }: CollectionGridProps) {
  const { copy } = useCopy()

  return (
    <div className="collections">
      {collections.map((collection) => {
        const { area } = collection
        const slug = area.toLowerCase()
        const text = copy.collections[collection.id]
        const piece = pieces.find((item) => item.collectionId === collection.id)
        if (!piece) return null
        const pieceCopy = copy.pieces[piece.id]

        return (
          <section aria-labelledby={`${slug}-title`} className={`collection collection--${slug}`} id={slug} key={area}>
            <div className="collection__intro">
              <div className="section-marker"><span>{collection.number}</span><span lang="en">{area}</span></div>
              <p className="eyebrow" lang="en">{text.concept}</p>
              <h2 id={`${slug}-title`}>{text.title}</h2>
              <div className="collection__description">
                {text.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              {area === 'ACCENTED' ? (
                <a className="text-link collection__link" href="#kombination">{text.action} <span aria-hidden="true">↓</span></a>
              ) : (
                <button className="text-link collection__link" onClick={() => onExplore(piece)} type="button">{text.action} <span aria-hidden="true">↗</span></button>
              )}
            </div>
            {area === 'WEAR' ? <ReconstructCompare piece={piece} /> : (
              <button aria-label={copy.collectionCard.open(piece.name, pieceCopy.category)} className="piece-card" onClick={() => onExplore(piece)} type="button">
                <span className="piece-card__image-wrap">
                  {/* Replace illustrations with the studio's own photographs when available. */}
                  <img alt={pieceCopy.imageAlt} className="piece-card__image" loading="lazy" src={piece.image} style={{ objectPosition: piece.imagePosition }} />
                  <span className="image-note">{copy.collectionCard.imageNote}</span>
                  <span className="piece-card__open" aria-hidden="true">↗</span>
                </span>
                <span className="piece-card__meta"><span>{piece.name}</span><span>{pieceCopy.category}</span></span>
              </button>
            )}
            {area === 'ACCENTED' ? <><ConnectFamily /><ModularJewellery /></> : null}
          </section>
        )
      })}
    </div>
  )
}

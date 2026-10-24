import type { EditorialPiece, ProductArea } from '../content/products'

type CollectionGridProps = {
  pieces: EditorialPiece[]
  onExplore: (piece: EditorialPiece) => void
}

const areaCopy: Record<ProductArea, { number: string; verb: string; title: string; description: string }> = {
  WEAR: {
    number: '02', verb: 'RECONSTRUCT', title: 'Plagg med ett nytt perspektiv.',
    description: 'Herrskjortor får nytt liv i moderna silhuetter med en stillsam blinkning till hanbokens form.',
  },
  MAKE: {
    number: '03', verb: 'REPROPORTION', title: 'Mönster som börjar i proportion.',
    description: 'Petite är inte bara mindre. Det handlar om var sömmen, ärmen och balansen faktiskt landar.',
  },
  ADORN: {
    number: '04', verb: 'CONNECT', title: 'Små detaljer. Ett sammanhang.',
    description: 'Handknutna detaljer och smycken som låter hantverk och personlighet följa med genom hela looken.',
  },
}

const areas: ProductArea[] = ['WEAR', 'MAKE', 'ADORN']

export function CollectionGrid({ pieces, onExplore }: CollectionGridProps) {
  return (
    <div className="collections">
      {areas.map((area, index) => {
        const piece = pieces.find((item) => item.area === area)
        if (!piece) return null
        const copy = areaCopy[area]

        return (
          <section aria-labelledby={`${area.toLowerCase()}-title`} className={`collection collection--${area.toLowerCase()}`} id={area.toLowerCase()} key={area}>
            <div className="collection__intro">
              <div className="section-marker"><span>{copy.number}</span><span>{copy.verb}</span></div>
              <p className="eyebrow">{area} <span>—</span> {index === 0 ? 'Bära' : index === 1 ? 'Skapa' : 'Förbinda'}</p>
              <h2 id={`${area.toLowerCase()}-title`}>{copy.title}</h2>
              <p className="collection__description">{copy.description}</p>
              <button className="text-link collection__link" onClick={() => onExplore(piece)} type="button">Utforska {area.toLowerCase()} <span aria-hidden="true">↗</span></button>
              <span aria-hidden="true" className="collection__thread" />
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
          </section>
        )
      })}
    </div>
  )
}

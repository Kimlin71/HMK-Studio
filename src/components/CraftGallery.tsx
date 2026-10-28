import { craftImages } from '../content/site'
import { useCopy } from '../i18n/LanguageContext'

export function CraftGallery() {
  const { copy } = useCopy()
  const text = copy.craft

  return (
    <section aria-labelledby="craft-title" className="craft section-shell" id="hantverk">
      <div className="section-marker"><span>07</span><span>{text.marker}</span></div>
      <div className="craft__heading">
        <p className="eyebrow">{text.eyebrow}</p>
        <h2 id="craft-title">{text.titleTop}<br /><em>{text.titleEm}</em></h2>
        <p>{text.text}</p>
      </div>
      <div className="craft__gallery">
        {craftImages.map((item, index) => (
          <figure className={`craft-card ${item.className}`} key={item.className}>
            <img alt={text.details[index].alt} loading="lazy" src={item.image} />
            <figcaption><span>0{index + 1} / {text.details[index].title}</span><span>{text.details[index].note}</span></figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

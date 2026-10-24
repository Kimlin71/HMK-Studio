import { craftDetails } from '../content/site'

export function CraftGallery() {
  return (
    <section aria-labelledby="craft-title" className="craft section-shell" id="hantverk">
      <div className="section-marker"><span>07</span><span>Studio · form och material</span></div>
      <div className="craft__heading">
        <p className="eyebrow">Designbeslut i detalj</p>
        <h2 id="craft-title">Placering, balans<br /><em>och förbindelser.</em></h2>
        <p>En söm påverkar silhuetten. Material ger tyngd och balans. En knut förbinder linjer och detaljer till en helhet.</p>
      </div>
      <div className="craft__gallery">
        {craftDetails.map((item, index) => (
          <figure className={`craft-card ${item.className}`} key={item.title}>
            {/* Photography placeholder: macro image of stitching, cloth texture, knotwork or hand-finished jewellery. */}
            <img alt={item.alt} loading="lazy" src={item.image} />
            <figcaption><span>0{index + 1} / {item.title}</span><span>{item.note}</span></figcaption>
          </figure>
        ))}
      </div>
      <p className="image-disclosure">Grafiska platshållare · Detaljstudier som ersätts med ateljéns egna närbilder.</p>
    </section>
  )
}

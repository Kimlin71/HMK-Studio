import { craftDetails } from '../content/site'

export function CraftGallery() {
  return (
    <section aria-labelledby="craft-title" className="craft section-shell" id="hantverk">
      <div className="section-marker"><span>07</span><span>Process & material</span></div>
      <div className="craft__heading">
        <p className="eyebrow">Det som handen vet</p>
        <h2 id="craft-title">Omsorg syns<br /><em>i detaljerna.</em></h2>
        <p>Varje val bär samma tanke — från första mönsterlinjen till den sista knuten.</p>
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

export function AboutMaker() {
  return (
    <section aria-labelledby="about-title" className="about-maker section-shell" id="om-ateljen">
      <div className="section-marker"><span>08</span><span>Om ateljén</span></div>
      <div className="about-maker__image">
        {/* Replace with an approved photograph of the atelier, never an unrelated founder portrait. */}
        <img alt="Illustrerat arbetsbord med tygprover och trådar i ateljéns färgpalett" loading="lazy" src="/images/atelier-study.svg" />
        <span className="image-note">Bildplatshållare · Illustration</span>
        <span className="about-maker__image-quote">En liten ateljé<br />med många trådar.</span>
      </div>
      <div className="about-maker__copy">
        <p className="eyebrow">Textutkast · godkänns av grundaren</p>
        <h2 id="about-title">En personlig erfarenhet.<br /><em>En tanke om proportion.</em></h2>
        <p>Grundarens egen erfarenhet av petite-storlekar är utgångspunkten för idén om proportion: det räcker inte alltid att korta ett plagg.</p>
        <p>Längd, sömmarnas placering och materialets balans behöver samspela med personen som bär plagget. Den tanken binder samman plagg, mönster och detaljer.</p>
        <a className="text-link" href="#filosofi">Om petite och proportion <span aria-hidden="true">↗</span></a>
        <div className="about-maker__signature" lang="en">FORM · PROPORTION · CONNECTION <span>✳</span></div>
      </div>
    </section>
  )
}

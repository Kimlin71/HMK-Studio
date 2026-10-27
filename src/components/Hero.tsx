export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="hero" id="hem">
      <div className="hero__copy">
        <p className="eyebrow"><span className="eyebrow__line" /> Ett textilt designuniversum</p>
        <h1 id="hero-title" lang="en">MADE FOR{' '}<br /><em>YOUR PROPORTIONS</em></h1>
        <p className="hero__subtitle" lang="en">Contemporary clothing, patterns and objects inspired by Korean craft.</p>
        <p className="hero__description">Plagg, mönster och objekt — sammanförda genom form, proportion och rekonstruktion.</p>
        <div className="hero__actions">
          <a className="button button--dark" href="#wear" lang="en">Explore the collection <span aria-hidden="true">↗</span></a>
          <a className="text-link" href="#filosofi">Om petite och proportion <span aria-hidden="true">↓</span></a>
        </div>
        <p className="hero__index" lang="en">01 / FORM FOLLOWS YOU</p>
      </div>
      <div className="hero__visual">
        {/* Concept image (art direction). Replace with an approved studio photograph when available. */}
        <img
          alt="Konceptbild: kvinna i profil i en kort, omsydd blårandig skjorta med ett knutet band, mörka vida byxor och handgjorda smücken med tofsar, mot en varm beige vägg. Inte ett foto av en färdig produkt."
          className="hero__image"
          fetchPriority="high"
          width="896"
          height="1200"
          src="/images/hero-proportions.jpg"
        />
        <div className="hero__image-note"><span>Konceptbild · ej foto</span><span>Art direction-referens</span></div>
        <span aria-hidden="true" className="hero__thread" />
        <span className="hero__seal" lang="en">STUDIO<br />EDITION 01</span>
      </div>
      <div className="hero__bottomline"><span lang="en">Reconstruct</span><i /> <span lang="en">Reproportion</span><i /> <span lang="en">Connect</span><span className="hero__scroll">Scrolla för att upptäcka ↓</span></div>
    </section>
  )
}

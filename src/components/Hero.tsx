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
        {/* Replace the stock clothing-rail image with the atelier's own editorial photograph. */}
        <img
          alt="En rad plagg på trägalgar mot en ljus vägg"
          className="hero__image"
          fetchPriority="high"
          width="1800"
          height="1200"
          sizes="(max-width: 640px) 90vw, 50vw"
          srcSet="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=640&q=85 640w, https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=960&q=85 960w, https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1440&q=85 1440w, https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1800&q=85 1800w"
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1800&q=90"
        />
        <div className="hero__image-note"><span>Bildplatshållare · Unsplash</span><span>Inte ateljéns egna plagg</span></div>
        <span aria-hidden="true" className="hero__thread" />
        <span className="hero__seal" lang="en">STUDIO<br />EDITION 01</span>
      </div>
      <div className="hero__bottomline"><span lang="en">Reconstruct</span><i /> <span lang="en">Reproportion</span><i /> <span lang="en">Connect</span><span className="hero__scroll">Scrolla för att upptäcka ↓</span></div>
    </section>
  )
}

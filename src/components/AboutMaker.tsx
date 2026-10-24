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
        <p className="eyebrow">En personlig utgångspunkt</p>
        <h2 id="about-title">Två nyfikenheter.<br /><em>En gemensam form.</em></h2>
        <p>Ateljén växte fram ur två intressen som länge levde sida vid sida: koreansk form och hantverk, och en egen längtan efter plagg och mönster som förstår petite proportioner.</p>
        <p>Det ena handlar om linjer, material och detaljer. Det andra om hur kläder möter en verklig kropp. Här får de mötas i plagg som görs om med omtanke och detaljer som knyter ihop helheten.</p>
        <a className="text-link" href="#kontakt">Läs mer om ateljén <span aria-hidden="true">↗</span></a>
        <div className="about-maker__signature">Made slowly, in Sweden <span>✳</span></div>
      </div>
    </section>
  )
}

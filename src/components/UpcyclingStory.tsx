export function UpcyclingStory() {
  return (
    <section aria-labelledby="upcycling-title" className="upcycling section-shell" id="process">
      <div className="section-marker"><span>05</span><span>Material i rörelse</span></div>
      <div className="upcycling__heading">
        <p className="eyebrow">Från det som finns</p>
        <h2 id="upcycling-title">Ett plagg.<br /><em>En ny riktning.</em></h2>
      </div>
      <div className="upcycling__sequence">
        <figure className="process-step process-step--shirt">
          {/* Replace with the actual source garment when a documented reconstruction is available. */}
          <img alt="Grafisk studie av överlappande tygprover" loading="lazy" src="/images/fabric-study.svg" />
          <figcaption><span>01</span> Utgångsmaterialet</figcaption>
        </figure>
        <div className="process-arrow" aria-hidden="true"><span>→</span><small>dekonstruera</small></div>
        <figure className="process-step process-step--detail">
          {/* Illustration placeholder: replace with a close-up photograph of cutting, seams or pattern work. */}
          <img alt="Grafisk mönsterstudie med sömlinjer och justerad proportion" loading="lazy" src="/images/pattern-study.svg" />
          <figcaption><span>02</span> Se om proportionen</figcaption>
        </figure>
        <div className="process-arrow" aria-hidden="true"><span>→</span><small>bygga om</small></div>
        <figure className="process-step process-step--result">
          {/* Illustration placeholder: replace with the finished reconstructed garment photographed on-body. */}
          <img alt="Skiss av en ny omlottform och dess sömnadslinjer" loading="lazy" src="/images/silhouette-study.svg" />
          <figcaption><span>03</span> En ny silhuett</figcaption>
        </figure>
      </div>
      <p className="image-disclosure">Illustrerad process · Grafiska platshållare, inte dokumentation av ett färdigt plagg.</p>
      <p className="upcycling__note">Befintliga plagg är inte en kompromiss. De är material, historia och början på något annat.</p>
    </section>
  )
}

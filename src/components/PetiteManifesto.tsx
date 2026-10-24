export function PetiteManifesto() {
  return (
    <section aria-labelledby="petite-title" className="petite-manifesto" id="petite">
      <div className="petite-manifesto__number">06 <span>/ MÅTT PÅ RIKTIGT</span></div>
      <div className="petite-manifesto__content">
        <p className="eyebrow">En annan utgångspunkt</p>
        <h2 id="petite-title">Petite är en<br /><em>proportion,</em><br />inte bara en storlek.</h2>
        <p className="petite-manifesto__body">När längd och proportion förändras flyttar sig också plaggets balans. En axel, en midja, en ärm — små justeringar kan förändra hela känslan.</p>
        <p className="petite-manifesto__body">Mönstren här utvecklas med petite kroppar i åtanke från första linjen. Inte för att det finns en rätt kropp, utan för att kläder kan ge fler kroppar plats.</p>
        <a className="button button--light" href="#make">Upptäck petite-mönster <span aria-hidden="true">↗</span></a>
      </div>
      <div className="petite-manifesto__visual">
        {/* Illustration placeholder: replace with a petite-fit photograph showing garment length and balance, without implying one ideal body. */}
        <img alt="Silhuettstudie som visar linjer, balans och proportion" loading="lazy" src="/images/silhouette-study.svg" />
        <span className="image-note">Bildplatshållare · Illustration</span>
        <span className="measurement measurement--vertical">LÄNGD / BALANS / RÖRELSE</span>
        <span className="measurement measurement--horizontal">01 — 03</span>
      </div>
      <span aria-hidden="true" className="petite-manifesto__thread" />
    </section>
  )
}

import { signatureBead } from '../content/jewellery'

export function SignatureBead() {
  return (
    <section aria-labelledby="bead-title" className="signature-bead section-shell" id="signaturparlan">
      <div className="section-marker"><span>06</span><span>En sammanbindande detalj</span></div>
      <div className="signature-bead__copy" lang="en">
        <p className="eyebrow">FORM · PROPORTION · CONNECTION</p>
        <h2 id="bead-title">{signatureBead.title}</h2>
        <p className="signature-bead__lead">{signatureBead.subtitle}</p>
        {signatureBead.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
      <figure className="signature-bead__image">
        <div className="signature-bead__placeholder">
          <span className="eyebrow">Bildplatshållare / 06</span>
          <p>En detalj.<br /><em>På nära håll.</em></p>
          <span>Ateljéns makrofotografi inväntas.</span>
        </div>
        <figcaption>{signatureBead.imageBrief} Ingen pärlbild eller färdig form finns att visa ännu.</figcaption>
      </figure>
    </section>
  )
}
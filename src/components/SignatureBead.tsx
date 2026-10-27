import { signatureBead } from '../content/jewellery'
import { ColourSwatch } from './ColourSwatch'
import { ConnectElementDrawing } from './ConnectDrawings'

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
        <div className="signature-bead__concept">
          <img alt={signatureBead.macroImage.alt} loading="lazy" src={signatureBead.macroImage.src} />
          <span className="image-note">{signatureBead.macroImage.label}</span>
        </div>
        <figcaption>
          {signatureBead.macroImage.caption}{' '}
          <strong>Ateljéns makrofotografi av den fysiska pärlan inväntas.</strong> {signatureBead.imageBrief}
        </figcaption>
      </figure>
      <div className="signature-bead__colours">
        <p>{signatureBead.colourNote}</p>
        <ul aria-label="Signaturpärlan i olika färger">
          {signatureBead.colours.map((colour) => (
            <li key={colour}>
              <ConnectElementDrawing colour={colour} kind="bead" />
              <ColourSwatch colour={colour} />
            </li>
          ))}
        </ul>
        <small>Grafisk färgstudie, inte ett foto av den fysiska pärlan.</small>
      </div>
    </section>
  )
}

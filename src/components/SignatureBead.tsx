import { signatureBeadColours, signatureBeadImage } from '../content/jewellery'
import { useCopy } from '../i18n/LanguageContext'
import { ColourSwatch } from './ColourSwatch'
import { ConnectElementDrawing } from './ConnectDrawings'

export function SignatureBead() {
  const { copy } = useCopy()
  const text = copy.signatureBead

  return (
    <section aria-labelledby="bead-title" className="signature-bead section-shell" id="signaturparlan">
      <div className="section-marker"><span>06</span><span>{text.marker}</span></div>
      <div className="signature-bead__copy">
        <p className="eyebrow">{copy.tagline}</p>
        <h2 id="bead-title">{text.title}</h2>
        <p className="signature-bead__lead">{text.subtitle}</p>
        {text.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
      <figure className="signature-bead__image">
        <div className="signature-bead__concept">
          <img alt={text.macro.alt} loading="lazy" src={signatureBeadImage} />
          <span className="image-note">{text.macro.label}</span>
        </div>
        <figcaption>
          {text.macro.caption}{' '}
          <strong>{text.pendingPhoto}</strong> {text.imageBrief}
        </figcaption>
      </figure>
      <div className="signature-bead__colours">
        <p>{text.colourNote}</p>
        <ul aria-label={text.coloursLabel}>
          {signatureBeadColours.map((colour) => (
            <li key={colour}>
              <ConnectElementDrawing colour={colour} kind="bead" />
              <ColourSwatch colour={colour} />
            </li>
          ))}
        </ul>
        <small>{text.coloursFootnote}</small>
      </div>
    </section>
  )
}

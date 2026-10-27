import { colourDefinitions, colourFamilies, connectElements, connectPieces, paletteGroups } from '../content/jewellery'
import { useCopy } from '../i18n/LanguageContext'
import { ColourSwatch } from './ColourSwatch'
import { ConnectElementDrawing, ConnectPieceDrawing } from './ConnectDrawings'

export function ConnectFamily() {
  const { copy } = useCopy()
  const text = copy.connect
  const [anchor, ...others] = connectPieces

  return (
    <div aria-labelledby="connect-family-title" className="connect-family" id="connect-familj" role="group">
      <div className="connect-family__heading">
        <p className="eyebrow">{text.eyebrow}</p>
        <h3 id="connect-family-title">{text.title}</h3>
        <p className="connect-family__origin">{text.origin}</p>
      </div>
      <p className="connect-family__lead">{text.lead}</p>

      <div aria-label={text.paletteLabel} className="connect-palette" role="group">
        <p className="connect-palette__note">{text.paletteNote}</p>
        {paletteGroups.map((group) => (
          <div className="connect-palette__group" key={group.id}>
            <p className="eyebrow">{text.paletteGroups[group.id].label}</p>
            <p>{text.paletteGroups[group.id].note}</p>
            <ul>
              {group.colours.map((colour) => (
                <li key={colour}>
                  <span aria-hidden="true" className={`connect-palette__chip tone--${colour}`} />
                  <span className="connect-palette__name">
                    <span lang="en">{colourDefinitions[colour].label}</span>
                    <small>{colourDefinitions[colour].hex}</small>
                    {colourDefinitions[colour].printNote ? <small>{text.indigoPrint}</small> : null}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <ul aria-label={text.familiesLabel} className="colour-families">
        {colourFamilies.map((family) => (
          <li className="colour-family" key={family.id}>
            <span className="colour-family__number">{family.number}</span>
            <strong lang="en">{text.families[family.id].label}</strong>
            <span className="colour-family__swatches">
              {family.colours.map(({ colour, accent }) => <ColourSwatch colour={colour} key={colour} note={accent ? text.accentNote : undefined} />)}
            </span>
            <span className="colour-family__note">{text.families[family.id].note}</span>
          </li>
        ))}
      </ul>

      <ul aria-label={text.piecesLabel} className="connect-pieces">
        {[anchor, ...others].map((piece) => {
          const pieceText = text.pieces[piece.id]
          const used = Array.from(new Set([piece.parts.knot, piece.parts.cord, piece.parts.bead, piece.parts.tassel, piece.parts.accent].filter((c): c is NonNullable<typeof c> => Boolean(c))))
          return (
            <li className={`connect-piece connect-piece--${piece.role}`} key={piece.id}>
              <div className="connect-piece__figure">
                <ConnectPieceDrawing kind={piece.kind} parts={piece.parts} />
                <span className="image-note">{text.figureNote}</span>
              </div>
              <div className="connect-piece__copy">
                <p className="eyebrow">{pieceText.roleLabel}</p>
                <h4 lang="en">{piece.name}</h4>
                {pieceText.subtitle ? <p className="connect-piece__sv">{pieceText.subtitle}</p> : null}
                <p>{pieceText.description}</p>
                <span className="connect-piece__colours">
                  {used.map((colour) => <ColourSwatch colour={colour} key={colour} />)}
                </span>
              </div>
            </li>
          )
        })}
      </ul>

      <div className="connect-elements">
        <div className="connect-elements__heading">
          <p className="eyebrow">{text.elementsEyebrow}</p>
          <p>{text.elementsNote}</p>
        </div>
        <div className="connect-elements__groups">
          {connectElements.map((group) => (
            <div className="connect-element-group" key={group.kind}>
              <p className="connect-element-group__label"><span>{text.elementNames[group.kind].label}</span> <small>{text.elementNames[group.kind].description}</small></p>
              <ul>
                {group.colours.map((colour) => (
                  <li key={colour}>
                    <ConnectElementDrawing colour={colour} kind={group.kind} />
                    <ColourSwatch colour={colour} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="connect-status">
        <p className="image-disclosure">{text.disclosure}</p>
        <ul aria-label={text.statusLabel}>
          {text.pending.map((item) => (
            <li key={item.label}><span>{item.label}</span><em>{item.status}</em></li>
          ))}
        </ul>
      </div>
    </div>
  )
}

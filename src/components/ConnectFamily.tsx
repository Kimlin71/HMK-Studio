import { colourDefinitions, colourFamilies, connectElements, connectIntro, connectPieces, connectStatus, paletteGroups } from '../content/jewellery'
import { ColourSwatch } from './ColourSwatch'
import { ConnectElementDrawing, ConnectPieceDrawing } from './ConnectDrawings'

export function ConnectFamily() {
  const [anchor, ...others] = connectPieces

  return (
    <div aria-labelledby="connect-family-title" className="connect-family" id="connect-familj" role="group">
      <div className="connect-family__heading" lang="en">
        <p className="eyebrow">{connectIntro.eyebrow}</p>
        <h3 id="connect-family-title">{connectIntro.title}</h3>
        <p className="connect-family__origin">{connectIntro.origin}</p>
      </div>
      <p className="connect-family__lead">{connectIntro.lead}</p>

      <div aria-label="Paletten" className="connect-palette" role="group">
        {paletteGroups.map((group) => (
          <div className="connect-palette__group" key={group.id}>
            <p className="eyebrow">{group.label}</p>
            <p>{group.note}</p>
            <ul>
              {group.colours.map((colour) => (
                <li key={colour}>
                  <span aria-hidden="true" className={`connect-palette__chip tone--${colour}`} />
                  <span className="connect-palette__name"><span lang="en">{colourDefinitions[colour].label}</span><small>{colourDefinitions[colour].hex}</small>{colourDefinitions[colour].detail ? <small>{colourDefinitions[colour].detail}</small> : null}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <ul aria-label="Färgfamiljer" className="colour-families">
        {colourFamilies.map((family) => (
          <li className="colour-family" key={family.id}>
            <span className="colour-family__number">{family.number}</span>
            <strong lang="en">{family.label}</strong>
            <span className="colour-family__swatches">
              {family.colours.map(({ colour, accent }) => <ColourSwatch colour={colour} key={colour} note={accent ? 'accent' : undefined} />)}
            </span>
            <span className="colour-family__note">{family.note}</span>
          </li>
        ))}
      </ul>

      <ul aria-label="Smycken i CONNECT" className="connect-pieces">
        {[anchor, ...others].map((piece) => {
          const used = Array.from(new Set([piece.parts.knot, piece.parts.cord, piece.parts.bead, piece.parts.tassel, piece.parts.accent].filter((c): c is NonNullable<typeof c> => Boolean(c))))
          return (
            <li className={`connect-piece connect-piece--${piece.role}`} key={piece.id}>
              <div className="connect-piece__figure">
                <ConnectPieceDrawing kind={piece.kind} parts={piece.parts} />
                <span className="image-note">Färgstudie · ej produktbild</span>
              </div>
              <div className="connect-piece__copy">
                <p className="eyebrow" lang="en">{piece.roleLabel}</p>
                <h4 lang="en">{piece.name}</h4>
                <p className="connect-piece__sv">{piece.swedish}</p>
                <p>{piece.description}</p>
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
          <p className="eyebrow" lang="en">Interchangeable elements</p>
          <p>Utbytbara delar. Knut, pärla och tofs kan flytta mellan smycken och mellan färgfamiljer — en delmängd visas här, inte varje färg i varje del.</p>
        </div>
        <div className="connect-elements__groups">
          {connectElements.map((group) => (
            <div className="connect-element-group" key={group.kind}>
              <p className="connect-element-group__label"><span lang="en">{group.label}</span> <small>{group.description}</small></p>
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
        <p className="image-disclosure">{connectStatus.disclosure}</p>
        <ul aria-label="Status för bilder och text">
          {connectStatus.pending.map((item) => (
            <li key={item.label}><span lang="en">{item.label}</span><em>{item.status}</em></li>
          ))}
        </ul>
      </div>
    </div>
  )
}

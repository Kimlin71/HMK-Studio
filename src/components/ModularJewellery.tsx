import { useState } from 'react'
import { allColours, colourLabels, combinationPresets, initialCombination, moduleIds, type ModuleSelection } from '../content/jewellery'
import { useCopy } from '../i18n/LanguageContext'
import { ColourSwatch } from './ColourSwatch'
import { ConnectPieceDrawing } from './ConnectDrawings'

export function ModularJewellery() {
  const { copy } = useCopy()
  const text = copy.modular
  const [selection, setSelection] = useState<ModuleSelection>(initialCombination)

  return (
    <div aria-labelledby="combination-title" className="modular-study" id="kombination">
      <div className="modular-study__heading">
        <p className="eyebrow">{text.eyebrow}</p>
        <h3 id="combination-title">{text.title}</h3>
        <p>{text.intro}</p>
        <p className="image-disclosure" id="combination-note">{text.note}</p>
      </div>
      <div className="modular-study__workspace">
        <div aria-hidden="true" className="modular-study__preview">
          <span className="eyebrow">{text.previewEyebrow}</span>
          <div className="modular-study__drawing">
            <ConnectPieceDrawing
              kind="bag-charm"
              parts={{ knot: selection.knot, cord: selection.cord, bead: selection.bead, tassel: selection.tassel }}
            />
          </div>
          <div className="module-connection">
            {moduleIds.map((id) => (
              <div className="module-sample" key={id}>
                <span className="module-sample__label" lang="en">{text.modules[id].label}</span>
                <ColourSwatch colour={selection[id]} />
              </div>
            ))}
          </div>
          <span className="modular-study__preview-note">{text.previewNote}</span>
        </div>
        <div aria-describedby="combination-note" className="modular-study__controls">
          <div className="module-presets">
            <p className="eyebrow">{text.presetsEyebrow}</p>
            <div className="module-presets__row">
              {combinationPresets.map((preset) => (
                <button className="module-preset" key={preset.id} onClick={() => setSelection(preset.selection)} type="button">
                  <span lang="en">{copy.connect.families[preset.id].label}</span>
                </button>
              ))}
            </div>
          </div>
          {moduleIds.map((id) => (
            <fieldset className="module-options" key={id}>
              <legend><span lang="en">{text.modules[id].label}</span> <small>{text.modules[id].description}</small></legend>
              <div className="module-options__row">
                {allColours.map((colour) => (
                  <label className="module-option" key={colour}>
                    <input
                      checked={selection[id] === colour}
                      name={id}
                      onChange={() => setSelection((current) => ({ ...current, [id]: colour }))}
                      type="radio"
                      value={colour}
                    />
                    <span aria-hidden="true" className={`module-option__swatch tone--${colour}`} />
                    <span lang="en">{colourLabels[colour]}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          ))}
          <output aria-live="polite" className="modular-study__summary">
            {text.summaryPrefix} {moduleIds.map((id) => `${text.modules[id].label}: ${colourLabels[selection[id]]}`).join(' · ')}
          </output>
          <a className="text-link" href="#signaturparlan">{text.link} <span aria-hidden="true">↓</span></a>
        </div>
      </div>
    </div>
  )
}

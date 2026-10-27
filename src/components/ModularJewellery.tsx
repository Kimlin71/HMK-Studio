import { useState } from 'react'
import {
  allColours, colourLabels, combinationPresets, initialCombination, jewelleryModules,
  type ModuleSelection,
} from '../content/jewellery'
import { ColourSwatch } from './ColourSwatch'
import { ConnectPieceDrawing } from './ConnectDrawings'

export function ModularJewellery() {
  const [selection, setSelection] = useState<ModuleSelection>(initialCombination)

  return (
    <div aria-labelledby="combination-title" className="modular-study" id="kombination">
      <div className="modular-study__heading">
        <p className="eyebrow">En studie i förbindelser</p>
        <h3 id="combination-title">Delar som byter färgfamilj.</h3>
        <p>Flytta färger fritt mellan knut, snodd, pärla och tofs — delarna behöver inte höra till samma färgfamilj. Börja i en av de sex färgkombinationerna och byt en del i taget.</p>
        <p className="image-disclosure" id="combination-note">Redaktionell prototyp, inte en e-handelskonfigurator. Schemat visar färgmöten, inte faktisk konstruktion eller material. Inget sparas eller beställs.</p>
      </div>
      <div className="modular-study__workspace">
        <div aria-hidden="true" className="modular-study__preview">
          <span className="eyebrow">Färgstudie / ej produktbild</span>
          <div className="modular-study__drawing">
            <ConnectPieceDrawing
              kind="bag-charm"
              parts={{ knot: selection.knot, cord: selection.cord, bead: selection.bead, tassel: selection.tassel }}
            />
          </div>
          <div className="module-connection">
            {jewelleryModules.map((module) => (
              <div className="module-sample" key={module.id}>
                <span className="module-sample__label" lang="en">{module.label}</span>
                <ColourSwatch colour={selection[module.id]} />
              </div>
            ))}
          </div>
          <span className="modular-study__preview-note">Samma formspråk. Olika färger.</span>
        </div>
        <div aria-describedby="combination-note" className="modular-study__controls">
          <div className="module-presets">
            <p className="eyebrow">Utgångspunkt</p>
            <div className="module-presets__row">
              {combinationPresets.map((preset) => (
                <button className="module-preset" key={preset.id} onClick={() => setSelection(preset.selection)} type="button">
                  <span lang="en">{preset.label}</span>
                </button>
              ))}
            </div>
          </div>
          {jewelleryModules.map((module) => (
            <fieldset className="module-options" key={module.id}>
              <legend><span lang="en">{module.label}</span> <small>{module.description}</small></legend>
              <div className="module-options__row">
                {allColours.map((colour) => (
                  <label className="module-option" key={colour}>
                    <input
                      checked={selection[module.id] === colour}
                      name={module.id}
                      onChange={() => setSelection((current) => ({ ...current, [module.id]: colour }))}
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
            Din färgstudie: {jewelleryModules.map((module) => `${module.label}: ${colourLabels[selection[module.id]]}`).join(' · ')}
          </output>
          <a className="text-link" href="#signaturparlan">Se den sammanbindande detaljen <span aria-hidden="true">↓</span></a>
        </div>
      </div>
    </div>
  )
}

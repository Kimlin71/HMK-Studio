import { useState } from 'react'
import { initialCombination, jewelleryModules } from '../content/jewellery'

export function ModularJewellery() {
  const [selection, setSelection] = useState(initialCombination)
  const selectedModules = jewelleryModules.map((module) => ({
    ...module,
    selected: module.options.find((option) => option.id === selection[module.id]) ?? module.options[0],
  }))

  return (
    <div aria-labelledby="combination-title" className="modular-study" id="kombination">
      <div className="modular-study__heading">
        <p className="eyebrow">En studie i förbindelser</p>
        <h3 id="combination-title">Tre delar. Ditt färgmöte.</h3>
        <p>Blanda färger fritt mellan knut, pärla och tofs — delarna behöver inte ha samma färg. Kopplingar är tänkta att förbinda dem inom och mellan smycken, dekorativa objekt och plagg.</p>
        <p className="image-disclosure" id="combination-note">Redaktionell prototyp, inte en e-handelskonfigurator. Schemat visar färgmöten, inte faktisk konstruktion eller material. Inget sparas eller beställs.</p>
      </div>
      <div className="modular-study__workspace">
        <div aria-hidden="true" className="modular-study__preview">
          <span className="eyebrow">Färgstudie / ej produktbild</span>
          <div className="module-connection">
            {selectedModules.map((module) => (
              <div className="module-sample" key={module.id}>
                <span className={`module-sample__colour module-colour--${module.selected.id}`} />
                <span>{module.label}<small>{module.selected.label}</small></span>
              </div>
            ))}
          </div>
          <span className="modular-study__preview-note">Samma formspråk. Olika färger.</span>
        </div>
        <div aria-describedby="combination-note" className="modular-study__controls">
          {jewelleryModules.map((module) => (
            <fieldset className="module-options" key={module.id}>
              <legend><span lang="en">{module.label}</span> <small>{module.description}</small></legend>
              <div className="module-options__row">
                {module.options.map((option) => (
                  <label className="module-option" key={option.id}>
                    <input
                      checked={selection[module.id] === option.id}
                      name={module.id}
                      onChange={() => setSelection((current) => ({ ...current, [module.id]: option.id }))}
                      type="radio"
                      value={option.id}
                    />
                    <span aria-hidden="true" className={`module-option__swatch module-colour--${option.id}`} />
                    <span lang="en">{option.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          ))}
          <output aria-live="polite" className="modular-study__summary">
            Din färgstudie: {selectedModules.map((module) => `${module.label}: ${module.selected.label}`).join(' · ')}
          </output>
          <a className="text-link" href="#signaturparlan">Se den sammanbindande detaljen <span aria-hidden="true">↓</span></a>
        </div>
      </div>
    </div>
  )
}
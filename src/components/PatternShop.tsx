import { useState } from 'react'
import { patternProducts, type PatternProduct } from '../content/patterns'
import { price } from '../content/prices'
import { demoMeasurements } from '../content/pattern'
import { useCopy } from '../i18n/LanguageContext'
import { MeasurementForm } from './MeasurementForm'
import { PieceDialogShell } from './PieceDialogShell'
import { Price } from './Price'
import './PatternShop.css'

// Sewing patterns: dummy products. A card opens a dialog with the pattern, its fabric needs and the measurement form.
// Nothing is fitted or drawn, and the dialog stores and sends nothing.
export function PatternShop() {
  const { copy } = useCopy()
  const text = copy.pattern
  const [selected, setSelected] = useState<PatternProduct | null>(null)
  const [missing, setMissing] = useState<string[]>([])

  return (
    <>
      {patternProducts.map((product) => (
        <article className="shop-card shop-card--pattern" key={product.id}>
          <div className="shop-card__image-wrap">
            {missing.includes(product.id) ? (
              <p className="shop-card__pending">{copy.shop.card.imagePending}</p>
            ) : (
              <>
                <img alt={text.products[product.id].imageAlt} className="shop-card__image" loading="lazy" onError={() => setMissing((ids) => [...ids, product.id])} src={product.image} />
                <span className="image-note">{copy.shop.card.imageNote}</span>
              </>
            )}
          </div>
          <div className="shop-card__meta">
            <h4 className="shop-card__name" lang="en">{product.name}</h4>
            <p className="shop-card__demo">{copy.shop.card.prototypeLabel}</p>
          </div>
          <p className="shop-card__price"><span>{copy.shop.card.priceLabel}</span> <Price amount={price({ kind: 'pattern', patternId: product.id, measurements: demoMeasurements })} /></p>
          <button aria-label={text.card.openLabel(product.name)} className="add-to-cart__button" onClick={() => setSelected(product)} type="button">{text.card.open}</button>
        </article>
      ))}
      <PatternDialog onClose={() => setSelected(null)} product={selected} />
    </>
  )
}

function PatternDialog({ product, onClose }: { product: PatternProduct | null; onClose: () => void }) {
  const { copy } = useCopy()
  const text = copy.pattern

  return (
    <PieceDialogShell className="pattern-dialog" describedBy="pattern-dialog-note" labelledBy="pattern-dialog-title" onClose={onClose} open={product !== null}>
      {product ? (
        <article className="pattern-dialog__body">
          <div className="pattern-dialog__picture">
            <img alt={text.products[product.id].imageAlt} src={product.image} />
          </div>
          <div className="pattern-dialog__copy">
            <h2 id="pattern-dialog-title" lang="en">{product.name}</h2>
            <p className="prototype-notice">{copy.prototypeNotice}</p>
            <p className="pattern-dialog__note" id="pattern-dialog-note">{text.dialogNote}</p>
            <p>{text.products[product.id].description}</p>
            {product.skill ? <p className="pattern-dialog__skill"><span>{text.card.skillLabel}</span> {text.skill[product.skill]}</p> : null}
            {product.fabrics.length > 0 ? (
              <section aria-labelledby="pattern-fabric-title" className="pattern-dialog__table">
                <h3 id="pattern-fabric-title">{text.details.fabricTitle}</h3>
                <table>
                  <thead><tr><th scope="col" /><th scope="col">{text.details.widthLabel}</th><th scope="col">{text.details.amountLabel}</th></tr></thead>
                  <tbody>
                    {product.fabrics.map((row) => (
                      <tr key={row.fabric}><th scope="row">{text.details.fabrics[row.fabric]}</th><td>{text.details.width(row.widthCm)}</td><td>{text.details.yards(row.yards)}</td></tr>
                    ))}
                  </tbody>
                </table>
              </section>
            ) : null}
            {product.extras.length > 0 ? (
              <section aria-labelledby="pattern-extras-title" className="pattern-dialog__table">
                <h3 id="pattern-extras-title">{text.details.extrasTitle}</h3>
                <table>
                  <tbody>
                    {product.extras.map((row) => (
                      <tr key={row.material}><th scope="row">{text.details.extras[row.material]}</th><td>{text.details.width(row.widthCm)}</td><td>{text.details.yards(row.yards)}</td></tr>
                    ))}
                  </tbody>
                </table>
              </section>
            ) : null}
            <MeasurementForm key={product.id} pattern={product} />
          </div>
        </article>
      ) : null}
    </PieceDialogShell>
  )
}

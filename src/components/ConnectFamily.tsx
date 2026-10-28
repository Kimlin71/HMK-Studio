import { useState } from 'react'
import { connectFamilyImage } from '../content/jewellery'
import { useCopy } from '../i18n/LanguageContext'
import './ConnectFamily.css'

export function ConnectFamily() {
  const { copy } = useCopy()
  const text = copy.connect
  const [missing, setMissing] = useState(false)

  return (
    <div aria-labelledby="connect-family-title" className="connect-family" id="connect-familj" role="group">
      <div className="connect-family__text">
        <div className="connect-family__heading">
          <p className="eyebrow">{text.eyebrow}</p>
          <h3 id="connect-family-title">{text.title}</h3>
          <p className="connect-family__origin">{text.origin}</p>
        </div>
        <p className="connect-family__lead">{text.lead}</p>
      </div>
      <figure className="connect-family__figure">
        {missing ? (
          <p className="connect-family__pending">{text.image.pending}</p>
        ) : (
          <>
            <img alt={text.image.alt} loading="lazy" onError={() => setMissing(true)} src={connectFamilyImage} />
          </>
        )}
      </figure>
    </div>
  )
}

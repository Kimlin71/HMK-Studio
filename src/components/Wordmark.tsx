import { useId } from 'react'
import { useCopy } from '../i18n/LanguageContext'

type WordmarkProps = {
  footer?: boolean
}

// Hyang-Mee Studio wordmark, made to look stamped.
// Seal: a square Ochre Red stamp (like a Japanese hanko / Korean dojang) with a double frame, holding an "H" whose crossbar is a knot.
// The stamp look comes from an SVG filter: the edge wobbles slightly, ink pools unevenly and tiny gaps break the fill,
// as if pressed by hand. The filter is applied to the seal only; the name stays crisp and readable.
// Drawn as text + inline SVG: there is no final logotype yet.
export function Wordmark({ footer = false }: WordmarkProps) {
  const { copy } = useCopy()
  const filterId = `stamp-${useId().replace(/:/g, '')}`

  return (
    <a
      aria-label={footer ? copy.wordmark.top : copy.wordmark.home}
      className={footer ? 'wordmark wordmark--footer' : 'wordmark'}
      href="#hem"
    >
      <svg aria-hidden="true" className="wordmark__seal" focusable="false" viewBox="0 0 48 48">
        <defs>
          <filter colorInterpolationFilters="sRGB" height="140%" id={filterId} width="140%" x="-20%" y="-20%">
            {/* Wobble the edge a little. */}
            <feTurbulence baseFrequency="0.045" numOctaves="2" result="wobble" seed="7" type="fractalNoise" />
            <feDisplacementMap in="SourceGraphic" in2="wobble" result="edged" scale="1.6" xChannelSelector="R" yChannelSelector="G" />
            {/* Uneven ink: fine grain punches tiny gaps in the fill. */}
            <feTurbulence baseFrequency="0.9" numOctaves="2" result="grain" seed="3" type="fractalNoise" />
            <feColorMatrix in="grain" result="gaps" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -9 5.6" />
            <feComposite in="edged" in2="gaps" operator="in" />
          </filter>
        </defs>
        <g filter={`url(#${filterId})`} transform="rotate(-3 24 24)">
          <rect className="wordmark__seal-ground" height="44" rx="3.5" width="44" x="2" y="2" />
          <rect fill="none" height="35" rx="1.8" stroke="var(--seal-ink)" strokeOpacity="0.85" strokeWidth="1.1" width="35" x="6.5" y="6.5" />
          <g fill="none" stroke="var(--seal-ink)" strokeLinecap="round" strokeWidth="2.8">
            <path d="M16 13V35M32 13V35" />
            <path d="M16 24H19.8M28.2 24H32" />
          </g>
          <path d="M24 19L29 24L24 29L19 24Z" fill="var(--seal-ink)" />
          <path d="M24 29V34.2M22 34.2H26" fill="none" stroke="var(--seal-ink)" strokeLinecap="round" strokeWidth="1.5" />
        </g>
      </svg>
      <span className="wordmark__text">
        <span className="wordmark__name">Hyang-Mee</span>
        <span className="wordmark__studio">Studio</span>
        {footer ? <span className="wordmark__caption">FORM · TEXTIL · DETALJ</span> : null}
      </span>
    </a>
  )
}

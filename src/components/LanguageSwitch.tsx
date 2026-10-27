import { languages } from '../i18n/copy'
import { useCopy } from '../i18n/LanguageContext'

const labels = { sv: 'SV', en: 'EN' } as const
const names = { sv: 'Svenska', en: 'English' } as const

// A two-option toggle. Each option is a real button with its own language name, so it reads correctly for screen readers
// in either language (lang attribute on each option).
export function LanguageSwitch() {
  const { language, setLanguage, copy } = useCopy()

  return (
    <div aria-label={copy.header.languageLabel} className="language-switch" role="group">
      {languages.map((code) => (
        <button
          aria-label={names[code]}
          aria-pressed={language === code}
          className="language-switch__option"
          key={code}
          lang={code}
          onClick={() => setLanguage(code)}
          type="button"
        >
          {labels[code]}
        </button>
      ))}
    </div>
  )
}

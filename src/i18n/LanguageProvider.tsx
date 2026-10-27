import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Language } from '../content/copy/types'
import { copyByLanguage, detectLanguage } from './copy'
import { LanguageContext } from './LanguageContext'

// The whole site is rendered from one language at a time. The choice is saved in this browser only (no personal data).
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(detectLanguage)
  const copy = copyByLanguage[language]

  const setLanguage = useCallback((next: Language) => {
    setLanguageState(next)
    try {
      window.localStorage.setItem('hms-language', next)
    } catch {
      // Not saved; the choice still applies for this visit.
    }
  }, [])

  // Keep the document in step: screen readers and browsers read <html lang>, and the tab title follows the language.
  useEffect(() => {
    document.documentElement.lang = language
    document.title = copy.meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', copy.meta.description)
  }, [language, copy])

  const value = useMemo(() => ({ language, copy, setLanguage }), [language, copy, setLanguage])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

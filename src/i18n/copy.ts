import { en } from '../content/copy/en'
import { sv } from '../content/copy/sv'
import type { Copy, Language } from '../content/copy/types'

export const copyByLanguage: Record<Language, Copy> = { sv, en }
export const languages: Language[] = ['sv', 'en']
export const defaultLanguage: Language = 'sv'

export const isLanguage = (value: unknown): value is Language => value === 'sv' || value === 'en'

// Swedish is the default. A saved choice wins; otherwise the browser language decides.
export function detectLanguage(): Language {
  try {
    const saved = window.localStorage.getItem('hms-language')
    if (isLanguage(saved)) return saved
  } catch {
    // Storage can be unavailable (private mode); fall through to the browser language.
  }
  const browser = window.navigator.language?.toLowerCase() ?? ''
  if (browser.startsWith('sv')) return 'sv'
  if (browser.startsWith('en')) return 'en'
  return defaultLanguage
}

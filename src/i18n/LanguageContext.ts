import { createContext, useContext } from 'react'
import type { Copy, Language } from '../content/copy/types'
import { copyByLanguage, defaultLanguage } from './copy'

export type LanguageState = {
  language: Language
  copy: Copy
  setLanguage: (language: Language) => void
}

export const LanguageContext = createContext<LanguageState>({
  language: defaultLanguage,
  copy: copyByLanguage[defaultLanguage],
  setLanguage: () => {},
})

export const useCopy = () => useContext(LanguageContext)

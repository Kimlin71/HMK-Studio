import type { ElementKind, ModuleId, PaletteGroupId } from '../jewellery'
import type { CollectionId, PieceId, ProductArea } from '../products'

export type Language = 'sv' | 'en'

export type PieceCopy = {
  category: string
  imageAlt: string
  imageLabel: string
  demoNote: string
  material: string
  story: string
  craftsmanship: string
  upcycling?: string
  petiteNote?: string
  related: string
}

export type ConnectPieceCopy = {
  /** Translation of the product name, shown under it. Omitted when it would only repeat the name. */
  subtitle?: string
  roleLabel: string
  description: string
}

// One Copy per language. Both languages must satisfy this type, so a missing string is a compile error.
export type Copy = {
  meta: { title: string; description: string }
  skipLink: string
  collectionsLabel: string
  tagline: string
  wordmark: { home: string; top: string; caption: string }
  header: {
    navLabel: string
    menuOpen: string
    menuClose: string
    contact: string
    languageLabel: string
    nav: { home: string; wear: string; make: string; accented: string; studio: string; about: string }
  }
  hero: {
    eyebrow: string
    titleTop: string
    titleEm: string
    lead: string
    primaryCta: string
    secondaryCta: string
    index: string
    imageAlt: string
    imageNote: [string, string]
    seal: [string, string]
    doorsLabel: string
    doors: Record<ProductArea, { title: string; text: string }>
    scroll: string
  }
  brandIntro: { marker: string; eyebrow: string; titleTop: string; titleEm: string; lead: string; body: string }
  collections: Record<CollectionId, { concept: string; title: string; paragraphs: string[]; action: string }>
  collectionCard: { open: (name: string, category: string) => string; imageNote: string }
  compare: {
    before: string
    after: string
    beforeAlt: string
    afterAlt: string
    beforeCaption: string
    afterCaption: string
    imageNote: string
    sliderLabel: string
    sliderValue: (percent: number) => string
    leftRight: (left: string, right: string) => string
  }
  pieces: Record<PieceId, PieceCopy>
  dialog: {
    close: string
    closeLabel: string
    fields: { material: string; craft: string; reuse: string; proportion: string; together: string }
  }
  connect: {
    eyebrow: string
    title: string
    origin: string
    lead: string
    paletteLabel: string
    paletteNote: string
    paletteGroups: Record<PaletteGroupId, { label: string; note: string }>
    indigoPrint: string
    familiesLabel: string
    families: Record<string, { label: string; note: string }>
    accentNote: string
    piecesLabel: string
    figureNote: string
    pieces: Record<string, ConnectPieceCopy>
    elementsEyebrow: string
    elementsNote: string
    elementNames: Record<ElementKind, { label: string; description: string }>
    statusLabel: string
    disclosure: string
    pending: { label: string; status: string }[]
  }
  modular: {
    eyebrow: string
    title: string
    intro: string
    note: string
    previewEyebrow: string
    previewNote: string
    presetsEyebrow: string
    modules: Record<ModuleId, { label: string; description: string }>
    summaryPrefix: string
    link: string
  }
  signatureBead: {
    marker: string
    title: string
    subtitle: string
    paragraphs: string[]
    colourNote: string
    coloursLabel: string
    coloursFootnote: string
    macro: { alt: string; label: string; caption: string }
    pendingPhoto: string
    imageBrief: string
  }
  craft: {
    marker: string
    eyebrow: string
    titleTop: string
    titleEm: string
    text: string
    details: { title: string; note: string; alt: string }[]
    disclosure: string
  }
  about: {
    marker: string
    imageAlt: string
    imageNote: string
    quote: [string, string]
    eyebrow: string
    titleTop: string
    titleEm: string
    p1: string
    p2: string
    link: string
  }
  newsletter: {
    eyebrow: string
    title: string
    text: string
    formLabel: string
    emailLabel: string
    placeholder: string
    buttonLabel: string
    button: string
    note: string
  }
  footer: {
    thought: [string, string]
    contactSoon: string
    newsletterLink: string
    legal: string
    instagram: string
    pinterest: string
  }
}

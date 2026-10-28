import type { ColourFamilyId, ElementKind, PaletteGroupId } from '../jewellery'
import type { CollectionId, PieceId, ProductArea } from '../products'
import type { BeadType, BraceletStyleId, WristSize } from '../bracelet'
import type { KnotStyleId, SecondElementId, TasselLengthId } from '../norigae'
import type { PearlPattern } from '../signaturePearl'
import type { HanbokItemId, ShopCategory, ShopItemId } from '../shop'

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
    nav: { home: string; wear: string; make: string; accented: string; shop: string; studio: string; about: string }
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
    families: Record<ColourFamilyId, { label: string; note: string }>
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
  // Shop. T1 owns `section` and `card`. T2 owns `bracelet`, T3 `maedeup`, T4 `hanbok`: each extends only its own sub-object.
  shop: {
    section: {
      eyebrow: string
      title: string
      intro: string
      disclosure: string
      categories: Record<ShopCategory, { title: string; description: string }>
    }
    card: {
      demoLabel: string
      imageNote: string
      priceLabel: string
      priceTbd: string
      orderButton: string
      orderNote: string
      items: Record<ShopItemId, { imageAlt: string }>
    }
    // Both builders share these key names for the same concepts: title, intro, note, previewLabel, previewNote,
    // presetsLabel, `hint` on option groups, summary and copy.
    bracelet: {
      title: string
      eyebrow: string
      intro: string
      note: string
      previewLabel: string
      presetsLabel: string
      style: { legend: string; hint: string; options: Record<BraceletStyleId, string> }
      photoAlt: Record<BraceletStyleId, string>
      cord: { legend: string; hint: string }
      beadColour: { legend: string; hint: string }
      size: { legend: string; hint: string; options: Record<WristSize, { label: string; range: string }> }
      summary: {
        prefix: string
        labels: Record<'style' | 'cord' | 'beads' | 'signature' | 'size', string>
        /** Value shown for the signature pearl count: exactly one. */
        signatureCount: string
        beadTypeNames: Record<BeadType, string>
      }
      copy: { button: string; success: string; failure: string; heading: string; footer: string }
    }
    maedeup: {
      title: string
      intro: string
      note: string
      previewLabel: string
      presetsLabel: string
      photoAlt: string
      pearlNote: string
      knotStyle: { legend: string; hint: string; options: Record<KnotStyleId, { label: string; description: string }> }
      colours: Record<'knot' | 'cord' | 'second' | 'tassel', { legend: string; hint: string }>
      secondElement: { legend: string; hint: string; options: Record<SecondElementId, string> }
      tasselLength: { legend: string; hint: string; options: Record<TasselLengthId, string> }
      summary: { prefix: string; labels: Record<'knot' | 'cord' | 'pendant' | 'second' | 'tassel', string> }
      copy: { button: string; success: string; failure: string; heading: string; footer: string }
    }

    signaturePearl: {
      first: { legend: string; hint: string }
      second: { legend: string; hint: string }
      pattern: { legend: string; hint: string; options: Record<PearlPattern, string> }
    }
    preview: {
      legend: string
      hint: string
      options: { photo: string; drawing: string }
      photoNote: string
      photoDiffers: string
      photoMissing: string
      drawingNote: string
    }
    hanbok: {
      title: string
      oneOfAKind: string
      oneOfAKindNote: string
      detailsButton: string
      detailsButtonLabel: (name: string) => string
      fields: { status: string; material: string; sourceShirt: string }
      fits: {
        title: string
        intro: string
        shoulder: { label: string; text: string }
        sleeve: { label: string; text: string }
        length: { label: string; text: string }
        wrapTie: { label: string; text: string }
      }
      ask: string
      demoNote: string
      items: Record<HanbokItemId, { category: string; story: string; material: string; sourceShirt: string }>
    }
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

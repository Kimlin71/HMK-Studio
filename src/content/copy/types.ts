import type { CollectionId, PieceId, ProductArea } from '../products'
import type { TasselLengthId } from '../norigae'
import type { PearlPattern } from '../signaturePearl'
import type { HanbokItemId, ShopCategory, ShopItemId } from '../shop'
import type { MeasurementKey } from '../pattern'
import type { PatternFabric, PatternMaterial, PatternProductId, SkillLevel } from '../patterns'
import type { CustomerField } from '../order'

export type Language = 'sv' | 'en'

export type PieceCopy = {
  category: string
  imageAlt: string
  demoNote: string
  material: string
  story: string
  craftsmanship: string
  upcycling?: string
  petiteNote?: string
  related: string
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
    cartButton: { text: string; label: (count: number) => string }
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
    /** Picture of what each offering is, shown as a tile next to the headline. */
    tiles: Record<ProductArea, { alt: string }>
    seal: [string, string]
    doorsLabel: string
    doors: Record<ProductArea, { title: string; text: string }>
    scroll: string
  }
  brandIntro: { marker: string; eyebrow: string; titleTop: string; titleEm: string; lead: string; body: string }
  collections: Record<CollectionId, { concept: string; title: string; paragraphs: string[]; action: string }>
  collectionCard: { open: (name: string, category: string) => string }
  compare: {
    before: string
    after: string
    beforeAlt: string
    afterAlt: string
    beforeCaption: string
    afterCaption: string
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
    image: { alt: string; pending: string }
  }
  // Shop. T1 owns `section` and `card`. T2 owns `bracelet`, T3 `maedeup`, T4 `hanbok`: each extends only its own sub-object.
  shop: {
    section: {
      /** The banner that marks the start of the shop. */
      banner: { eyebrow: string; title: string; line: string }
      eyebrow: string
      title: string
      intro: string
      disclosure: string
      categories: Record<ShopCategory, { title: string; description: string }>
    }
    card: {
      demoLabel: string
      /** Label on cards that can be put in the demo cart. */
      prototypeLabel: string
      priceLabel: string
      priceTbd: string
      /** Shown instead of the picture while the picture file is missing. */
      imagePending: string
      items: Record<ShopItemId, { imageAlt: string }>
    }
    maedeup: {
      title: string
      intro: string
      note: string
      previewLabel: string
      photoAlt: string
      pearlNote: string
      colours: Record<'knot' | 'cord' | 'tassel', { legend: string; hint: string }>
      tasselLength: { legend: string; hint: string; options: Record<TasselLengthId, string> }
      summary: { prefix: string; labels: Record<'knot' | 'cord' | 'pendant' | 'tassel', string> }
      copy: { button: string; success: string; failure: string; heading: string; footer: string }
      /** Shown under the add button: this exact design goes in the cart. */
      addNote: string
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
      availability: string
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
  /** Said on every screen of the shop flow. */
  prototypeNotice: string
  /** Small tag next to every field a visitor can type in. */
  demoTag: string
  cart: {
    add: { button: string; added: string }
    panel: {
      title: string
      empty: string
      total: string
      removeText: string
      remove: (name: string) => string
      checkout: string
      startOver: string
    }
    /** Said next to every price and total. */
    priceMarker: string
    /** Small kind label above each cart line. */
    kinds: { bracelet: string; norigae: string; pattern: string }
    /** Summary label for a measurement value, for example `37 cm`. */
    unit: string
  }
  pattern: {
    card: { skillLabel: string; open: string; openLabel: (name: string) => string }
    skill: Record<SkillLevel, string>
    products: Record<PatternProductId, { description: string; imageAlt: string }>
    details: {
      fabricTitle: string
      extrasTitle: string
      widthLabel: string
      amountLabel: string
      yards: (amount: number) => string
      width: (cm: number) => string
      fabrics: Record<PatternFabric, string>
      extras: Record<PatternMaterial, string>
    }
    dialogNote: string
    form: {
      legend: string
      customer: string
      customerName: string
      demoNote: string
      range: (min: number, max: number) => string
      fields: Record<MeasurementKey, { label: string; hint: string }>
      errors: Record<'required' | 'shoulderVsBust' | 'lengthVsUpperBody' | 'waistVsHip', string> & {
        tooLow: (min: number) => string
        tooHigh: (max: number) => string
      }
      invalidSummary: string
    }
    download: { button: string; note: string; fileHint: string }
  }
  checkout: {
    title: string
    back: string
    summary: string
    empty: string
    emptyAction: string
    detailsTitle: string
    detailsNote: string
    fields: Record<CustomerField, { label: string; hint?: string }>
    errors: { required: string; summary: string }
    payment: { title: string; note: string }
    pay: (total: string) => string
    processing: string
    startOver: string
    delivery: string
  }
  confirmation: {
    title: string
    thanks: string
    orderNumber: string
    items: string
    empty: string
    emptyAction: string
    downloadTitle: string
    startOver: string
  }
  signatureBead: {
    marker: string
    title: string
    subtitle: string
    paragraphs: string[]
    colourNote: string
    coloursLabel: string
    coloursFootnote: string
    macro: { alt: string; caption: string }
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
    imagePending: string
    quote: [string, string]
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

import type { Copy } from './types'

// English copy. APPROVED by the founder (2026-10-27): all texts in this file and in sv.ts.
// Keep the two files in step: change both when a sentence changes.
export const en: Copy = {
  meta: {
    title: 'Hyang-Mee Studio — Form · Textile · Detail',
    description:
      'Hyang-Mee Studio: an editorial prototype about garments sewn anew, petite patterns and accents inspired by Korean craft. It shows design concepts and clearly labelled placeholder images, not a range for sale.',
  },
  skipLink: 'Skip to content',
  collectionsLabel: 'The studio’s three connected expressions',
  wordmark: { home: 'Hyang-Mee Studio — to the home page', top: 'Hyang-Mee Studio — to the top of the page' },
  header: {
    navLabel: 'Main navigation',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    contact: 'Contact',
    languageLabel: 'Language',
    nav: { home: 'Home', wear: 'WEAR', make: 'MAKE', accented: 'ACCENTED', studio: 'Studio', about: 'About' },
  },
  hero: {
    eyebrow: 'A Korean–Scandinavian studio',
    titleTop: 'MADE FOR',
    titleEm: 'YOUR PROPORTIONS',
    lead: 'Garments sewn anew, patterns for petite proportions and accents made by hand. Korean roots, a Scandinavian upbringing.',
    primaryCta: 'See the concept',
    secondaryCta: 'About petite and proportion',
    index: '01 / FORM FOLLOWS YOU',
    imageAlt:
      'Concept image: a woman in profile in a short, re-sewn blue-striped shirt with a knotted tie, dark wide trousers and handmade jewellery with tassels, against a warm beige wall. Not a photograph of a finished product.',
    imageNote: ['Concept image · not a photo', 'Art-direction reference'],
    seal: ['STUDIO', 'EDITION 01'],
    doorsLabel: 'What the studio makes',
    doors: {
      WEAR: { title: 'WEAR', text: 'Existing garments sewn anew.' },
      MAKE: { title: 'MAKE', text: 'Sewing patterns for petite proportions.' },
      ACCENTED: { title: 'ACCENTED', text: 'Knots, tassels and small details.' },
    },
    scroll: 'Scroll to explore ↓',
  },
  brandIntro: {
    marker: 'Manifesto',
    eyebrow: 'The body is not a size chart',
    titleTop: 'Clothes aren’t',
    titleEm: 'bodies',
    lead: 'A smaller size isn’t simply a shorter version of a larger one.',
    body: 'Proportion is about length, balance and placement. Through reconstruction a garment can take a new form — clothes should adapt to people, not the other way round.',
  },
  collections: {
    reconstruct: {
      concept: 'RECONSTRUCT',
      title: 'EXISTING FORM. NEW EXPRESSION.',
      paragraphs: [
        'A familiar shirt becomes the starting point rather than the finished object.',
        'Garments are sewn anew into a fusion of Korean roots and a Scandinavian upbringing: overlapping forms, ties and new proportions, held in a quiet, restrained silhouette.',
        'The first concept is a hanbok in a modern style. It is a beginning, not the limit — more garments are to come.',
      ],
      action: 'Discover garments',
    },
    reproportion: {
      concept: 'REPROPORTION',
      title: 'SMALLER IS NOT THE SAME AS PETITE.',
      paragraphs: [
        'Petite is about proportion, not simply size.',
        'Patterns developed with attention to torso length, placement, balance and the relationship between the parts of a garment.',
        'Because a pattern should adapt to the person wearing it.',
      ],
      action: 'Explore patterns',
    },
    connect: {
      concept: 'CONNECT',
      title: 'ONE LANGUAGE. MANY COMBINATIONS.',
      paragraphs: [
        'Knot. Bead. Tassel. Colour.',
        'Individual elements are designed to work together, allowing colours and forms to move between pieces.',
        'Combine indigo with ivory. Ochre with glaucous blue. Cameo pink with a touch of earth. A quiet combination today, something bolder tomorrow.',
      ],
      action: 'Create your combination',
    },
  },
  collectionCard: {
    open: (name, category) => `View ${name}, fictional demo, ${category}`,
    imageNote: 'Fictional demo · Illustration',
  },
  compare: {
    before: 'Before',
    after: 'After',
    beforeAlt: 'Concept image: a woman in a light-blue striped, straight shirt with buttons and a chest pocket. The starting point before the reconstruction.',
    afterAlt:
      'Concept image: the same shirt re-sewn into a modern hanbok, a fusion of Korean inspiration and Scandinavian minimalism, with a diagonal wrap closure and a long knotted tie at the side.',
    beforeCaption: 'the existing shirt',
    afterCaption: 'sewn anew into a modern hanbok',
    imageNote: 'Concept image · before / after, not a photo',
    sliderLabel: 'Compare before and after. Drag left or right.',
    sliderValue: (percent) => `The shirt is shown ${percent} percent from the left, the re-sewn modern hanbok on the right`,
    leftRight: (left, right) => `Left · ${left} / Right · ${right}`,
  },
  pieces: {
    'the-crossing-shirt': {
      category: 'Re-sewn shirt · Modern hanbok · Form study',
      imageAlt:
        'Concept image: a shirt re-sewn into a modern hanbok, a fusion of Korean inspiration and Scandinavian minimalism, with a diagonal wrap closure and a long knotted tie at the side.',
      imageLabel: 'Concept image · not a photo',
      demoNote:
        'Fictional editorial demo, illustrated with a concept image. The image is an art-direction reference, not a photograph of a made garment. Material and craft describe the concept. No purchases or orders are taken.',
      material: 'Material placeholder. The actual composition is stated once a documented garment exists.',
      story:
        'A classic men’s shirt is sewn anew and becomes a modern hanbok — a fusion of Korean roots and a Scandinavian upbringing. A wrap closure, a tie and a soft, offset silhouette in a quiet expression. It is the first concept, not the only one: more re-sewn garments are on their way. Familiar enough to wear often, different enough to feel like yours.',
      craftsmanship: 'Form idea: wrap, offset lines and tying, with pared-back details. Construction and finishing are not yet documented.',
      upcycling: 'The original shirt is chosen for its quality and becomes the starting point for a new garment — not a material to hide.',
      petiteNote: 'Shoulder and sleeve length are balanced against the volume of the garment so the silhouette feels intentional on a petite body.',
      related: 'ACCENTED — knot, signature bead and tassel as a shared detail idea.',
    },
    'proportion-study-01': {
      category: 'Sewing pattern · Petite proportions',
      imageAlt: 'Graphic pattern study with proportions and seam lines',
      imageLabel: 'Fictional demo · Illustration',
      demoNote:
        'Fictional editorial demo, illustrated with a graphic placeholder. Material and craft describe the concept, not a made garment. No purchases or orders are taken.',
      material: 'Concept for a digital sewing pattern in a woven fabric. No pattern files or measurement guides are available to download.',
      story: 'A shirt pattern that starts from proportion: a shorter torso, a balanced sleeve and a hem placed where the garment falls right.',
      craftsmanship: 'Concept for the placement of shoulder, waist and sleeve. Fitting, instructions and measurement guides remain to be documented.',
      petiteNote: 'Designed for petite proportions from the first pattern line — not scaled down from a standard block.',
      related: 'Pair it with The Crossing Shirt for a shared silhouette and a detail in the same tone.',
    },
    'knot-no-01': {
      category: 'Modular detail · Form study',
      imageAlt: 'Graphic study of a hand-knotted cord with a tassel',
      imageLabel: 'Fictional demo · Illustration',
      demoNote:
        'Fictional editorial demo, illustrated with a graphic placeholder. Material and craft describe the concept, not a made piece. No purchases or orders are taken.',
      material: 'Material placeholder. Cord, bead, tassel and fittings need to be specified for real objects.',
      story:
        'A study of how knot, bead, tassel and fitting can form a whole. The idea is that colours and parts can be combined within and between jewellery, decorative objects and garments.',
      craftsmanship: 'Concept for connected parts. The illustration’s knot is a graphic study, not a documented knot technique or a finished product.',
      related: 'Designed to be worn with The Crossing Shirt and other garments from the studio.',
    },
  },
  dialog: {
    close: 'Close',
    closeLabel: 'Close product details',
    fields: { material: 'Material', craft: 'Craft', reuse: 'Reuse', proportion: 'Proportion', together: 'To wear together' },
  },
  connect: {
    eyebrow: 'The CONNECT family',
    title: 'One bead. Many pieces.',
    origin: 'Inspired by Korean decorative knotwork',
    lead: 'Five pieces and a library of interchangeable parts. The signature bead is what recurs; the rest is deliberately quieter. Not every part is equally decorated, and not every colour appears in every piece.',
    paletteLabel: 'The palette',
    paletteGroups: {
      core: { label: 'Core', note: 'The base of most combinations.' },
      character: { label: 'Character', note: 'The colours that show first.' },
      earth: { label: 'Earthy accents', note: 'Small, muted marks.' },
    },
    indigoPrint: 'Print: #000831 · CMYK 100/92/52/60',
    familiesLabel: 'Colour families',
    families: {
      'indigo-ivory': { label: 'Deep Indigo + Ivory Buff', note: 'Dark and light in balance. Ivory Buff carries the knot, cord, bead and tassel equally well.' },
      'ochre-glaucous': { label: 'Ochre Red + Light Glaucous Blue', note: 'Warm meets cool. The boldest colour meeting — used sparingly.' },
      'ivory-glaucous': { label: 'Ivory Buff + Light Glaucous Blue + Deep Indigo accent', note: 'Light and still. Deep Indigo appears only as a small detail.' },
      'cameo-indigo': { label: 'Cameo Pink + Deep Indigo', note: 'Soft meets deep. Cameo Pink warms Deep Indigo.' },
      'vandyke-khaki': { label: 'Vandyke Brown + Khaki', note: 'Earthy and muted. Khaki lights up Vandyke Brown.' },
      'ivory-cameo': { label: 'Ivory Buff + Cameo Pink + Vandyke Brown accent', note: 'Nearly monochrome and still, with a small earthy mark.' },
    },
    accentNote: 'accent',
    piecesLabel: 'Pieces in CONNECT',
    figureNote: 'Colour study · not a product image',
    pieces: {
      'signature-pendant': {
        subtitle: undefined,
        roleLabel: 'Anchor · signature bead',
        description: 'One knot, one bead. The Ivory Buff signature bead shows first — the rest recedes into Deep Indigo.',
      },
      'quiet-knot-earrings': {
        roleLabel: 'Quiet · no tassel',
        description: 'Just the knot, in a single colour. The stillest piece in the family.',
      },
      'long-knot-earrings': {
        roleLabel: 'Statement · with tassel',
        description: 'The movement is in the tassel. No bead — the knot and the tassel are enough.',
      },
      'modular-bracelet': {
        roleLabel: 'Modular · interchangeable parts',
        description: 'The parts can be swapped between colour families. Deep Indigo is only a small bead.',
      },
      'bag-charm': {
        roleLabel: 'Modular · earthy accents',
        description: 'The same parts as the pendant in earthy tones: Vandyke Brown and Khaki, with an Ivory Buff tassel.',
      },
    },
    elementsEyebrow: 'Interchangeable elements',
    elementsNote: 'Knot, bead and tassel can move between pieces and between colour families — a subset is shown here, not every colour in every part.',
    elementNames: {
      knot: { label: 'KNOT', description: 'Knot' },
      bead: { label: 'BEAD', description: 'Signature bead' },
      tassel: { label: 'TASSEL', description: 'Tassel' },
    },
    statusLabel: 'Status of images and text',
    disclosure:
      'The drawings are graphic colour studies, not photographs of finished physical products. Any generated concept images are art-direction references only and are not shown as product images. No jewellery is for sale, and construction and materials are not yet documented.',
    pending: [
      { label: 'Original studio photography', status: 'Pending' },
      { label: 'Macro photography of the physical signature bead', status: 'Pending' },
      { label: 'Final approval of founder copy', status: 'Approved by the founder' },
    ],
  },
  modular: {
    eyebrow: 'A study in connections',
    title: 'Parts that change colour family.',
    intro:
      'Move colours freely between knot, cord, bead and tassel — the parts do not need to belong to the same colour family. Start from one of the six colour combinations and change one part at a time.',
    note: 'Editorial prototype, not an e-commerce configurator. The diagram shows colour meetings, not actual construction or materials. Nothing is saved or ordered.',
    previewEyebrow: 'Colour study / not a product image',
    previewNote: 'Same form language. Different colours.',
    presetsEyebrow: 'Starting point',
    modules: {
      knot: { label: 'KNOT', description: 'The knot · the first connection' },
      cord: { label: 'CORD', description: 'The cord · the carrying line' },
      bead: { label: 'BEAD', description: 'The bead · a shared detail' },
      tassel: { label: 'TASSEL', description: 'The tassel · form in motion' },
    },
    summaryPrefix: 'Your colour study:',
    link: 'See the connecting detail',
  },
  signatureBead: {
    marker: 'A connecting detail',
    title: 'THE SIGNATURE BEAD',
    subtitle: 'One detail. A connecting thread.',
    paragraphs: [
      'A recurring sculptural element designed to move between knots, tassels, jewellery and garments.',
      'Recognisable on its own. Designed to belong to something larger.',
    ],
    colourNote: 'The same form in every colour. Ivory Buff is a jewellery colour in its own right, not a neutral background.',
    coloursLabel: 'The signature bead in different colours',
    coloursFootnote: 'Graphic colour study, not a photograph of the physical bead.',
    macro: {
      alt: 'Macro study of two glossy, glazed beads with a curving two-colour pattern and a through-hole, one in Deep Indigo and pink and one in Ivory and Ochre Red, on pale linen. Concept image, not a photograph of a finished product.',
      label: 'Concept image · macro study',
      caption: 'Macro study of the signature bead as an art-direction reference, not a photograph of a finished physical product.',
    },
    pendingPhoto: 'The studio’s macro photograph of the physical bead is pending.',
    imageBrief: 'Macro photograph of the signature bead, with the whole form and the connection of the hole visible.',
  },
  craft: {
    marker: 'Studio · form and material',
    eyebrow: 'Design decisions in detail',
    titleTop: 'Placement, balance',
    titleEm: 'and connections.',
    text: 'A seam affects the silhouette. Material gives weight and balance. A knot joins lines and details into a whole.',
    details: [
      { title: 'Seam placement', note: 'A line that changes the silhouette.', alt: 'Graphic close-up of a red hand-sewn seam through textile' },
      { title: 'Material in balance', note: 'Weight and structure in relation to form.', alt: 'Overlapping textile samples in the studio’s colour palette' },
      { title: 'The knot as a connection', note: 'Lines and details are tied into a whole.', alt: 'Graphic detail study of thread, knot and tassel' },
    ],
    disclosure: 'Graphic placeholders · Detail studies to be replaced by the studio’s own close-ups.',
  },
  about: {
    marker: 'About the studio',
    imageAlt:
      'Concept image in five parts of the studio environment: spools of thread, beads and bracelets, a mannequin with a wrap shirt and pattern pieces, a leather bag with a bead charm and a moodboard with fabric samples. Not a photograph of finished products.',
    imageNote: 'Environment image · concept, not a photo',
    quote: ['A small studio', 'with many threads.'],
    eyebrow: 'The founder’s text · approved',
    titleTop: 'A personal experience.',
    titleEm: 'A thought about proportion.',
    p1: 'The founder’s own experience of petite sizes is the starting point for the idea of proportion: it is not always enough to shorten a garment.',
    p2: 'Length, seam placement and the balance of the material need to work with the person wearing the garment. That thought ties garments, patterns and details together.',
    link: 'About petite and proportion',
  },
  newsletter: {
    eyebrow: 'Letters from the studio',
    title: 'News, not noise.',
    text: 'A place for future notes on form, material and design process. The newsletter is not open for sign-up.',
    formLabel: 'Newsletter preview',
    emailLabel: 'Email address',
    placeholder: 'name@example.com',
    buttonLabel: 'The newsletter is not open yet',
    button: 'Soon',
    note: 'Inactive prototype form. No data is sent or stored.',
  },
  footer: {
    thought: ['Designed for proportion.', 'Made with intention.'],
    contactSoon: 'Contact form opens soon.',
    newsletterLink: 'About the upcoming newsletter',
    legal: '© 2026 HYANG-MEE STUDIO — DEMO',
    instagram: 'Instagram · soon',
    pinterest: 'Pinterest · soon',
  },
}

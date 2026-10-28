// Language-independent site structure. Visible text lives in src/content/copy/.

export const navigation = [
  { key: 'home', href: '#hem' },
  { key: 'wear', href: '#wear' },
  { key: 'make', href: '#make' },
  { key: 'accented', href: '#accented' },
  { key: 'shop', href: '#butik' },
  { key: 'studio', href: '#hantverk' },
  { key: 'about', href: '#om-ateljen' },
] as const

// Picture in the About section. A concept image, not a photograph of the founder. If the file is missing, a placeholder is shown.
export const aboutImage = '/images/personal-experience.jpg'

export const craftImages = [
  { image: '/images/stitch-detail.png', className: 'craft-image--stitch' },
  { image: '/images/fabric-study.png', className: 'craft-image--fabric' },
  { image: '/images/knot-study.jpg', className: 'craft-image--knot' },
]

// The three tiles next to the headline on the first screen: one picture per offering, so a visitor sees at once what the studio makes.
// Concept images, not photographs of finished products.
export const heroTiles = [
  { area: 'WEAR', image: '/images/shop/hanbok/hanbok-1.jpg', width: 1045, height: 1400, position: 'center 12%' },
  { area: 'ACCENTED', image: '/images/shop/norigae/maedeup-norigae-4.jpg', width: 1282, height: 1717, position: 'center 40%' },
  { area: 'MAKE', image: '/images/shop/patterns/pattern-3.jpg', width: 815, height: 812, position: 'center top' },
] as const

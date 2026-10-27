// Language-independent site structure. Visible text lives in src/content/copy/.

export const navigation = [
  { key: 'home', href: '#hem' },
  { key: 'wear', href: '#wear' },
  { key: 'make', href: '#make' },
  { key: 'accented', href: '#accented' },
  { key: 'studio', href: '#hantverk' },
  { key: 'about', href: '#om-ateljen' },
] as const

export const craftImages = [
  { image: '/images/stitch-detail.png', className: 'craft-image--stitch' },
  { image: '/images/fabric-study.png', className: 'craft-image--fabric' },
  { image: '/images/knot-study.png', className: 'craft-image--knot' },
]

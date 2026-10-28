// Hash routes, no router library. Only the checkout and the confirmation leave the normal page.
// Every other hash (#butik, #maedeup-bygge and so on) is an anchor on the normal page.

export type Route = 'home' | 'checkout' | 'confirmation'

const hashes = { checkout: '#kassa', confirmation: '#bekraftelse' } as const

export function parseRoute(hash: string): Route {
  if (hash === hashes.checkout) return 'checkout'
  if (hash === hashes.confirmation) return 'confirmation'
  return 'home'
}

export const routeHash = (route: Exclude<Route, 'home'>) => hashes[route]

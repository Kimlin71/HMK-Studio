import { useSyncExternalStore } from 'react'
import { parseRoute, routeHash, type Route } from '../content/routes'

// Hash routing without a library. The browser's back and forward buttons work because the hash is the state.
const subscribe = (onChange: () => void) => {
  window.addEventListener('hashchange', onChange)
  return () => window.removeEventListener('hashchange', onChange)
}

export function useRoute(): Route {
  return parseRoute(useSyncExternalStore(subscribe, () => window.location.hash, () => ''))
}

export const goTo = (route: Exclude<Route, 'home'>) => {
  window.location.hash = routeHash(route)
}

/** Back to the shop section on the normal page. */
export const goToShop = (shopAnchor: string) => {
  window.location.hash = `#${shopAnchor}`
}

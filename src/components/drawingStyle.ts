import type { ModuleColour } from '../content/jewellery'

// Shared look of the graphic colour studies (CONNECT drawings, bracelet and Norigae builders).
// These are drawings, not photographs and not construction drawings.

export const tone = (colour: ModuleColour) => `var(--tone-${colour})`

export const EDGE = 'var(--drawing-edge)'

/** Fine detail lines: light on the dark colours, deep indigo on the light ones. */
export const detail = (colour: ModuleColour) =>
  colour === 'indigo' || colour === 'ochre' || colour === 'vandyke' ? 'rgba(255, 252, 245, 0.55)' : 'rgba(15, 30, 107, 0.45)'

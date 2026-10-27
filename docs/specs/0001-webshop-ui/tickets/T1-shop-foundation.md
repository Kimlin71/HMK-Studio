# T1: Shop foundation

Spec: [../spec.md](../spec.md). Blocked by: none. Blocks: T2, T3, T4.

## What

Create the shared structure the other tickets plug into, with no builder logic yet.

- `src/content/shop.ts`: language-independent catalogue data: `ShopCategory = 'bracelet' | 'maedeup' | 'hanbok'`, `ShopItem` (`id`, `category`, `name` (English proper name), `image?`, `status: 'demo'`), an `shopItems` array with 1 or 2 demo items per category. No prices as numbers; display "price to be announced" from copy.
- `ShopSection` component in `src/components/`, rendered in `App.tsx` between the collections and `SignatureBead`, id `butik` (anchor), plus a `shop` entry in `navigation` (`src/content/site.ts`) and `header.nav.shop` copy.
- Shop item card component (reuse `piece-card` look where sensible): demo label, "price to be announced", an **inactive** "Order" button with an explanatory note ("Ordering opens later. Nothing is sent or stored.").
- Reserve builder mount points in the section: `#armband-bygge` for the bracelet builder (T2), `#maedeup-bygge` for the Maedeup builder (T3), and hanbok list (T4). Render a clearly labelled placeholder for each so the page works before T2 to T4 land.
- Copy: add `shop` to `Copy` in `types.ts` with sub-objects `shop.section`, `shop.card`, `shop.bracelet`, `shop.maedeup`, `shop.hanbok` (T2 to T4 each own and extend only their sub-object). Fill sv and en.
- Component-scoped CSS in `src/components/ShopSection.css` (imported by the component) to keep `App.css` conflicts away. Reuse existing tokens (`--ink-*`, tones).

## Acceptance

- [ ] `#butik` renders, is in the header nav (sv + en), and works with the mobile menu.
- [ ] Every visible string comes from copy; sv and en compile against `Copy`.
- [ ] No cart, price numbers, form that collects data, or network call.
- [ ] Demo items are labelled as demo and cannot be ordered.
- [ ] `npm run build` and `npm run lint` pass. No horizontal overflow at 320 px.

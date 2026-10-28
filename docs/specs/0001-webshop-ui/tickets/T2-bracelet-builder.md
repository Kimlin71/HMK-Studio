# T2: Bracelet builder

Spec: [../spec.md](../spec.md). Blocked by: T1. Blocks: T6.

## What

A "Design your own bracelet" builder mounted at `#armband-bygge`.

- Data in `src/content/shop.ts` (or `src/content/bracelet.ts`): macramé cord colours (from `colourDefinitions`), bead types `pearl | crystal`, bead colours, wrist size options (S/M/L with a cm range shown in copy), number of beads (e.g. 3 to 9).
- The **signature pearl is always present** (exactly one, centred, colour chosen from `signatureBeadColours`). Customers cannot remove it.
- Live SVG preview component `BraceletDrawing.tsx`, in the style of `ConnectDrawings.tsx` (graphic study, `aria-hidden`, labelled "colour study, not a product image").
- Controls: radio groups/fieldsets like `ModularJewellery.tsx` (native inputs, visible focus, labels with `lang="en"` colour names), a bead-count control, a size control, presets.
- Summary in an `<output aria-live="polite">`, plus a client-only **Copy my design** button (clipboard) with a status message. No fetch, no storage, no personal data.
- Copy under `shop.bracelet` in sv and en. Component CSS in `src/components/BraceletBuilder.css`.

## Acceptance

- [ ] Fully keyboard operable; fieldsets/legends; summary announced politely.
- [ ] Exactly one signature pearl in every state.
- [ ] sv/en parity; no hard-coded visible text.
- [ ] No ordering, storage or network call. Disclosure note present.
- [ ] `npm run build` and `npm run lint` pass; 320 to 1440 px layout checked.

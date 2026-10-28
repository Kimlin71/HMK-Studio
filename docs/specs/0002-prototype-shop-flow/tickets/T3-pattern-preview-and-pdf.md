# T3: Pattern preview, add to cart and PDF

Spec: [../spec.md](../spec.md). Blocked by: T2. Blocks: T4.

## What

- `PatternPreview` component: draws the pieces from `generatePattern` as SVG with piece names, grain line, and the five measurements marked on the pieces. Lines at least 2 px at 1280 px and labels at least 14 px so they survive a Teams screen share. Changing a measurement and generating again visibly changes the pieces. Marked "Prototype: generated for demonstration, not a tested pattern".
- An **Add to cart** button after generation: adds a `pattern` cart item (T1) holding the five measurements, price from `price()`.
- A **pre-made PDF** at `public/patterns/proportion-study-01-demo.pdf`, made by the agent: A4, title, "Prototype, not a real pattern", the fictional customer's measurements, and a simple drawing of the pieces for the demo measurements. Tooling is chosen when implementing (for example a small script with a PDF library run once, not shipped as a dependency). Document how it was made in the PR so it can be redone.
- Copy under `pattern.preview` and `pattern.download` (sv and en).

## Acceptance

- [ ] Preview matches `generatePattern` output for the entered measurements.
- [ ] Pattern can be added to the cart and appears there with its five measurements.
- [ ] The PDF opens, is clearly marked as a prototype and shows the demo measurements.
- [ ] Readable at 1280 and 1920 px at the size it appears on screen; works at 320 px.
- [ ] sv/en parity; `npm run build` and `npm run lint` pass.

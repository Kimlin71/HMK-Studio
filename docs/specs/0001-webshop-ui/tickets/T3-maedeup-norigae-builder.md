# T3: Maedeup + Norigae builder

Spec: [../spec.md](../spec.md). Blocked by: T1. Blocks: T6.

## What

A "Design your own Maedeup and Norigae" builder mounted at `#maedeup-bygge`.

- A **Norigae** is a hanging ornament of knot, pendant and tassel, traditionally worn on a hanbok. Model it as: top knot, pendant (signature pearl, always present), optional second element, tassel.
- Data: knot style options (a small set, described generically as inspired by Korean decorative knotwork, no claim about documented techniques), cord colours, pendant bead colour from `signatureBeadColours`, tassel colour, tassel length (short/medium/long). Reuse `ModuleColour` and `ConnectFamily` palette.
- Reuse and extend the existing `Knot`, `Bead` and `Tassel` drawing primitives from `ConnectDrawings.tsx` (export them or add a new `NorigaeDrawing.tsx` that imports shared parts; do not duplicate code).
- Controls, summary, **Copy my design** and disclosure follow the same pattern as T2 (extract shared pieces if T2 has already landed; otherwise keep consistent naming so T6 can unify).
- Copy under `shop.maedeup` in sv and en. Component CSS in `src/components/NorigaeBuilder.css`.

## Acceptance

- [ ] Signature pearl is always present.
- [ ] Keyboard operable, labelled, polite live summary.
- [ ] sv/en parity; terms spelled Maedeup and Norigae.
- [ ] No ordering, storage or network call.
- [ ] `npm run build` and `npm run lint` pass; 320 to 1440 px layout checked.

# T5: Docs

Spec: [../spec.md](../spec.md). Blocked by: T1. Blocks: T6. Markdown only.

## What

- `README.md`: describe the prototype flow, what is mocked, how to run the demo, the seams towards a real shop (cart module, `price()`, `generatePattern`, the PDF being a fixed file), and which files to replace first when it becomes real.
- `docs/adr/0002-shop-ui-before-commerce.md`: add a status line "partly superseded by ADR 0003" so it no longer reads as the current state for ordering.
- `docs/adr/0003-hardcoded-shop-prototype.md`: add one line that the bracelet is chosen from three designs and not built freely, if it matters to the decision. Skip if not.
- `CONTEXT.md`: only if a term changed while building. Keep it a glossary.
- A short `docs/demo-script.md`: a two-minute walk-through in the order the founder clicks, with the exact choices to make for the Norigae to match the photograph, and what to say at each step.

## Acceptance

- [ ] A new reader can run the demo from the README.
- [ ] No page claims real ordering, payment or storage.
- [ ] The demo script fits two minutes and matches the final UI.

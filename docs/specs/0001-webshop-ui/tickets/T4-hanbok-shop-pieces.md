# T4: Hanbok shop pieces

Spec: [../spec.md](../spec.md). Blocked by: T1. Blocks: T6.

## What

Present WEAR hanboks made from second-hand men's shirts as shop pieces, in the hanbok area of the shop section from T1.

- Demo items in `src/content/shop.ts` (1 to 3), reusing `reconstructImages` and existing concept images. Each is labelled **demo** and **one of a kind**: every piece comes from one unique second-hand shirt, so no colour or size is repeated.
- Item detail (extend `ProductDialog` or add a small shop detail): story, material placeholder, source-shirt note ("original shirt: placeholder"), a "How it fits" block that explains the proportion considerations (shoulder, sleeve, length, the wrap and tie) as copy only. **No measurement form and no inputs.**
- A neutral "ask about a piece" line that says enquiries open later. No email address, no form.
- Copy under `shop.hanbok` in sv and en. Component CSS in `src/components/HanbokShop.css` as needed.

## Acceptance

- [ ] One-of-a-kind and demo status visible on card and detail.
- [ ] No inputs, no collection of measurements or contact details.
- [ ] Dialog keeps the existing focus handling, `Escape` and close behaviour.
- [ ] sv/en parity; no hard-coded visible text.
- [ ] `npm run build` and `npm run lint` pass; 320 to 1440 px layout checked.

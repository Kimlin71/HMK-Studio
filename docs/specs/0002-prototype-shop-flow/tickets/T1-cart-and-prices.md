# T1: Cart state, prices and add to cart

Spec: [../spec.md](../spec.md). Blocked by: none. Blocks: T4, T5.

## What

- `src/content/cart.ts` (plain module, no React): `CartItem` as a union of `bracelet` (the whole `BraceletDesign`), `norigae` (the whole `NorigaeDesign`) and `pattern` (the five measurements, filled in by T2/T3), with `id`, `quantity: 1`. Pure functions `addItem`, `removeItem`, `total`. No storage.
- `src/content/prices.ts`: one pure `price(item)` per kind, fictional SEK amounts as numbers in one place, small surcharges (crystals, long tassel, second element). A `formatPrice` that writes `350 kr` in Swedish and `SEK 350` in English, always with a "demo" marker next to the total.
- `CartProvider` + `useCart` (React context, in-memory state) in `src/cart/`. The cart also holds a rendered summary of each item (colours, pearl, size) taken from the item data, not copied text.
- An **Add to cart** button in the bracelet builder and the Norigae builder, and a small **cart button** with item count in the header that opens the cart panel (a dialog like `PieceDialogShell`, or a section) with items, a remove button, the total and a "Go to checkout" link to `#kassa`.
- Remove the inactive "Order" buttons and "Ordering opens later" notes from the bracelet and Norigae parts of the shop. Hanbok keeps its demo status and has no buy button.
- Copy: add `cart` to `Copy` (sv and en), including every label, the demo marker and "Prototype, no real order".

## Acceptance

- [ ] A bracelet and a Norigae can be added; the cart shows their design (name, colours, both pearl colours and pattern, size) and a total in SEK.
- [ ] Prices come only from `price()`. No price literal in a component.
- [ ] Cart state is lost on reload and nothing is written to storage.
- [ ] Cart panel is keyboard operable, focus returns to the cart button on close, `Escape` closes it.
- [ ] sv/en parity; `npm run build` and `npm run lint` pass.

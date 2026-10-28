# T4: Checkout, mock payment and confirmation

Spec: [../spec.md](../spec.md). Blocked by: T1, T3. Blocks: T6.

## What

- Hash routing without a library: a small `useHashRoute` hook reading `location.hash`. Routes: none (the normal page), `#kassa`, `#bekraftelse`. Browser back and forward work. An empty cart on `#kassa` shows an empty state with a link back to the shop.
- **Checkout view** (`#kassa`): order summary using the same cart data (Norigae and bracelet shown with their design, the pattern with its five measurements, prices from `price()`), a form with fictional pre-filled customer details ("Kund Demo", a fake address in Sweden, a fake email at `example.se`, a clearly fake card number such as the well-known test number), each field editable, each labelled "demo", and a line "Nothing is saved or sent. Do not enter real details." The card field is a plain text input with no real validation beyond non-empty, and never leaves the page.
- **Pay** button: about 1.5 s delay with a "Processing…" state (disabled while processing, announced with `role="status"`), then navigates to `#bekraftelse`. No provider, no network.
- **Confirmation view** (`#bekraftelse`): "Prototype, no real order", a fictional order number generated from a counter in memory, the item list and total, and for a pattern a **Download pattern** link to the PDF from T3. A "Start over" button clears the cart and returns to the shop.
- Every screen in the flow carries the prototype notice.
- Copy under `checkout` and `confirmation` (sv and en).

## Acceptance

- [ ] The whole flow (add item, cart, checkout, pay, confirmation, download, start over) works with keyboard only.
- [ ] Back and forward behave sensibly; reloading `#bekraftelse` shows the empty state, not stale data.
- [ ] No `fetch`, no storage, no payment SDK. The card field value is never logged, stored or put in the URL.
- [ ] Download link is only shown when the order contains a pattern.
- [ ] sv/en parity; `npm run build` and `npm run lint` pass.

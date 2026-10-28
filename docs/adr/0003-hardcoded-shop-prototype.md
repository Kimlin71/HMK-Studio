---
status: accepted
---

# Hard-coded shop prototype with mocked cart, checkout and measurements

The site is a prototype for a school presentation, not a live shop. It may now contain a cart, a checkout, a measurement form and a pattern download, but every one of them runs on fixed, fictional data: no real name, address, card, email or measurement is ever entered, stored or sent, and each screen is labelled as a prototype. This replaces the "no cart, checkout, payment or personal data" part of [ADR 0001](./0001-editorial-first-vite-site.md) and the "ordering stays inactive" part of [ADR 0002](./0002-shop-ui-before-commerce.md) for the whole site; the rest of both still applies (Swedish first, copy in `src/content/copy/`, demo content labelled).

Considered options: keep everything inactive (cannot show a purchase flow in the presentation), or build a real backend with Stripe (not needed for the presentation and would handle personal data). The goal is that the prototype can become a real shop later, so the seams are kept: prices, the cart, the customer, the order and the pattern rules live in `src/content/` and plain functions, not inside UI components.

Bracelets are three finished products the customer picks, not a free builder; only the Maedeup with Norigae is built by the customer. The cart, checkout and confirmation share one flow for all three kinds of item (bracelet, Norigae, measured pattern).

Consequences:

- Measurement fields are pre-filled with a fictional customer ("Kund Demo") and show a visible note that nothing is saved or sent.
- The pattern is drawn in the browser from the five measurements by a pure function (measurements in, pattern pieces out). The PDF download is a fixed, pre-made file, not generated.
- Payment is a mock: a button leads to an order confirmation. No payment provider is called.
- The prototype is for Sweden and SEK only.
- Real payment, real personal data, accounts and server-side PDF generation still need their own spec and a new ADR that supersedes this one.

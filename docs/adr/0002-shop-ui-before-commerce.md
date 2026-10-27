# Shop UI before commerce

The shop section (bracelets, Maedeup with Norigae, hanboks) and its two builders ship before any payment: prices read "price to be announced", the builders and the order button store and send nothing (the only thing the site keeps is the language choice, in the visitor's own browser under `localStorage` key `hms-language`), and ordering stays inactive, so the pieces can be explored and the design language tested without handling personal data or money. [ADR 0001](./0001-editorial-first-vite-site.md) still applies in full: forms stay inactive, there is no cart, checkout or personal data, and demo content is never presented as stock for sale. Stripe Checkout with a minimal serverless backend, measurement-based petite patterns, and server-side PDF generation after payment are planned in separate specs.

Consequences:

- Builder state lives only in local React state; the only output is an on-screen summary the customer may copy to the clipboard.
- A custom design is a combination on screen, not an order, and no copy may suggest otherwise.
- Introducing payment, accounts or any collection of personal data needs its own spec and a new ADR that supersedes the relevant part of ADR 0001.

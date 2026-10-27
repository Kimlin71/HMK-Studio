# T5: Docs, ADR and glossary

Spec: [../spec.md](../spec.md). Blocked by: none. Blocks: T6. Touches only Markdown files (no conflicts with T1 to T4).

## What

- `docs/adr/0002-shop-ui-before-commerce.md`: record that the shop UI and builders ship before payment, nothing is stored, ordering stays inactive, and Stripe Checkout + a minimal serverless backend (and server-side PDFs after payment) are planned in separate specs. Reference ADR 0001 and say how it still applies.
- `CONTEXT.md`: add glossary terms **Maedeup**, **Norigae**, **Signature pearl**, **Custom design** (a customer's on-screen combination, not an order), **One-of-a-kind piece**. Keep the "describes the creative world, not the implementation" rule. Add `_Avoid_` lines where useful (for example "Maedup" misspelling).
- `README.md`: short section on the shop UI, the builders, and what is deliberately inactive; link to the spec.
- Do not edit `.github/copilot-instructions.md`.

## Acceptance

- [ ] ADR 0002 is short (one paragraph plus consequences) and matches ADR 0001's style.
- [ ] Glossary terms are consistent with the spec.
- [ ] No claims that anything is for sale or can be ordered.

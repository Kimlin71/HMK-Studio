# T6: Integration polish

Spec: [../spec.md](../spec.md). Blocked by: T2, T3, T4, T5.

## What

- Resolve duplication between the bracelet and Maedeup builders (shared controls, summary, copy-to-clipboard hook).
- Remove the T1 placeholders now replaced by real builders.
- Check the order of sections, nav anchors, mobile menu and the site thread bead markers on the new section.
- Re-run the full-page contrast and layout checks (320, 375, 640, 768, 1024, 1440 px) and fix issues.
- Ensure `Copy` parity, `lang="en"` on proper names, and demo/placeholder labelling across all new UI.

## Acceptance

- [ ] `npm run build` and `npm run lint` pass.
- [ ] No cart, checkout, payment, stored or transmitted data anywhere.
- [ ] README and ADR 0002 match what shipped.

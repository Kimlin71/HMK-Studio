# T6: Demo polish for Teams

Spec: [../spec.md](../spec.md). Blocked by: T4, T5.

## What

- Walk the full flow at 1280 and 1920 px, then 375 px, in sv and en. Fix overflow, clipped text and anything that does not fit a screen share.
- Teams compresses video: check that text is at least 16 px body and 14 px labels at 1280 px, that pearl dividing lines and pattern lines are visible when the browser is zoomed to the size shown in a share, and that animations are few and short (the 1.5 s payment delay is the longest).
- Contrast scan of all new blocks (cart, checkout, confirmation, pattern preview).
- Make the flow restartable in one click at any step ("Start over"), so a mistake during the presentation costs seconds.
- Confirm there is no real-data path: grep for `fetch`, `XMLHttpRequest`, `sendBeacon`, `localStorage` and `sessionStorage` (only `hms-language` is allowed).
- Time the demo script from T5. It must fit about two minutes.

## Acceptance

- [ ] No horizontal overflow at 320, 375, 768, 1280, 1920 px, sv and en.
- [ ] Contrast and size checks pass.
- [ ] Demo script timed at two minutes or less.
- [ ] `npm run build` and `npm run lint` pass.

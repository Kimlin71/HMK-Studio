# T2: Measurement form and pattern rules

Spec: [../spec.md](../spec.md). Blocked by: none. Blocks: T3.

## What

- `src/content/pattern.ts` (plain module, no React): `Measurements` (`shoulder`, `bust`, `upperBody`, `sleeve`, `length`, in cm), the fictional customer `demoMeasurements` ("Kund Demo"), the plausible ranges per measurement, and `validateMeasurements(m)` returning one error code per field. Pure and unit-testable.
- `generatePattern(m): PatternPiece[]`: a pure function from the five measurements to pattern pieces (back, front, sleeve), each a list of points or paths in cm plus labels. Write the rule for how each measurement changes each piece in a comment block above the function, following the table in the spec. Seam edges (shoulder, side, sleeve) must stay consistent: the front and back side seams must be equal length, the sleeve cap must fit the armhole within a stated tolerance.
- A **measurement form** component in the MAKE section: five number inputs, pre-filled with `demoMeasurements`, each with a label, unit, plausible range as hint, and an inline error. A visible line on the form: "Demo: fictional measurements. Nothing is saved or sent." The "Generate pattern" button is enabled only when all five are valid. Inputs use native `type="number"` with `inputMode="decimal"`, labels and `aria-describedby` for hint and error.
- Copy under `pattern.form` (sv and en), including all error texts.
- Add a short test script or a type-checked example in the ticket description proving the seam consistency for the demo measurements and one extreme petite set (the build has no test runner, so keep the check as a small `node` script under `scripts/` and say how to run it).

## Acceptance

- [ ] The same five measurements always give the same pieces (pure, deterministic).
- [ ] Invalid, empty or out-of-range input disables generation and shows a clear message per field.
- [ ] Side seams equal in length and sleeve cap within tolerance for the demo and the extreme set (script output shown in the PR).
- [ ] No `fetch`/storage; labelled as demo; sv/en parity; `npm run build` and `npm run lint` pass.

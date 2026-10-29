# Hyang-Mee Studio — form, textile, detail

A bilingual (Swedish and English) editorial website for Hyang-Mee Studio, built with React, TypeScript and Vite. The wordmark is set in text with a stamped SVG seal (the same seal is the favicon, `public/favicon.svg`); no finished logo exists yet. FORM · PROPORTION · CONNECTION ties WEAR / RECONSTRUCT, MAKE / REPROPORTION and ACCENTED / CONNECT together. ACCENTED replaces the working name ADORN.

> The Swedish README is [`README.md`](README.md). This file is its English counterpart; keep both in step.

## Language

- Swedish is the default. A saved choice (`localStorage`, key `hms-language`, no personal data) comes first, then the browser language (`sv` or `en`), otherwise Swedish.
- The language switch (SV / EN) is in the header. The choice also sets `<html lang>`, the page title and the meta description.
- All visible text lives in `src/content/copy/sv.ts` and `en.ts`. Both follow the `Copy` type in `types.ts`; a missing string is a compile error. No visible text is hard-coded in components.
- Proper names are not translated: WEAR, MAKE, ACCENTED, product names and Wada Sanzo's colour names.
- All texts in `sv.ts` and `en.ts` were approved by the founder (2026-10-27). Language adjustments (tone, rhythm, clarity) may be made without new approval, but both languages must change together. Changed meaning, new claims and the founder text (`about`) need the founder's approval.
- The language choice is stored only in the visitor's own browser (`localStorage`) and contains no personal data. It is never sent anywhere.

## Run locally

Requires Node 22.18 or later.

- `npm run dev` starts Vite for local development.
- `npm run build` type-checks and builds the production site.
- `npm run lint` runs Oxlint.
- `npm test` runs the unit tests in `tests/` (Node's built-in test runner, nothing extra to install).
- `npm run make:pattern-pdf` regenerates the demo PDFs in `public/patterns/` (see [The shop prototype flow](#the-shop-prototype-flow)).
- `npm run preview` serves the production build locally.

## Content and components

- `src/content/products.ts` holds the language-independent structure of categories and fictional, clearly marked demo products, with stable ids, a category link and an explicit prototype status.
- `src/content/jewellery.ts` holds the palette, the colour combinations and the colour parts of the jewellery. The choices do not represent stock or purchasable variants.
- `src/content/shop.ts` holds the shop's language-independent catalogue (fictional demo items, `hanbokItems`), the bracelets' signature pearls (`braceletPearls`) and anchors.
- `src/content/prices.ts`, `cart.ts`, `order.ts`, `pattern.ts`, `patterns.ts` and `routes.ts` are the shop's business rules as pure modules, see [The shop prototype flow](#the-shop-prototype-flow).
- `src/content/norigae.ts` holds the Norigae builder data (the Norigae is built freely; the bracelets are three ready-made products). `src/content/signaturePearl.ts` describes the signature pearl: two colours and a vertical or horizontal pattern.
- Photos for the preview live in `public/images/shop/bracelets/` (`bracelet-1.webp` to `bracelet-3.webp`, background removed; in `bracelet-1.webp` the black dot on the signature pearl was recoloured pink with `scripts/recolor-bracelet-dot.py`, so do not rerun `scripts/remove-norigae-background.py` on `originals/bracelet-1.original.png` without repeating that step) and `public/images/shop/norigae/`. `maedeup-norigae-1.webp` and `-2.webp` are cut out with `scripts/remove-norigae-background.py`; `maedeup-norigae-3.jpg` and `-4.jpg` keep their background. All four are the ready-made products; `norigae-reference.webp` is shown in the builder. A photo cannot change colour, so it is shown as the preview only when the customer's choice matches the colours in the photo (`hasBaseColours`, `isNorigaeShowcase`). Otherwise, and if the photo is missing, the drawing is shown.
- `src/content/site.ts` holds the navigation anchors and the craft images.
- `src/content/copy/` holds all text, one file per language.
- `src/i18n/` holds the language context, language selection and provider.
- `src/cart/` holds the cart's React state (`CartProvider`, `useCart`) and `src/routing/` holds the hash routing.
- `src/components/` holds the page's reusable sections and the product detail dialog.
  - The shop: `ShopSection`, `ShopItemCard`, `NorigaeBuilder` (+ `NorigaeDrawing`), `HanbokShop`, `HanbokDialog` and `HanbokBadges`.
  - The prototype flow: `AddToCartButton`, `CartButton`, `FloatingCartButton` (fixed bottom-right once the cart has items), `CartPanel`, `OrderLines`, `Price`, `PatternShop`, `MeasurementForm`, `FlowShell`, `CheckoutView` and `ConfirmationView`.
  - Shared parts: `BuilderControls`, `PearlControls`, `SignaturePearlDrawing`, `DesignPreview` (photo or drawing), `builderSummary`, `useCopyToClipboard` and the dialog shell `PieceDialogShell`, which `ProductDialog` also uses.
- `src/index.css` holds design variables and global accessibility rules.
- `src/App.css` holds responsive presentation.
- `CONTEXT.md` defines the brand's central concepts.

### Imagery

The images are local files (PNG and JPG, at most 400 kB each) in `public/images/`: graphic illustrations and concept images (`atelier-study.jpg`, `macro-signature-pearl.jpg`, `pattern-study.jpg`, `personal-experience.jpg`, `try-your-own-colours.jpg`). The concept images are art-direction references, not photos of finished products. The three front-page images (hanbok, Norigae and trouser pattern, see `heroTiles` in `src/content/site.ts`) reuse the shop's concept images. Large original files live in `originals/` and are not shipped with the site. No external images are used, and the project has no photos from the atelier yet.

Concept images carry no labels on the image itself (at Kim's request). That they are concept images is stated in the alt texts, in the "Demo content" notice at the top of the shop and in the "Demo · prototype" label on the cards. Placeholders for missing images ("Picture coming") and fictional demo items remain marked. The illustrations do not document real garments, people or work processes.

The newsletter and contact are visual prototypes with no data collection or handling. The shop is a hard-coded prototype (see below): cart, checkout and payment exist, but everything is mocked with fictional details and nothing is saved or sent.

## Story and interaction

The home page follows: hero (one message and three doors: WEAR, MAKE, ACCENTED) → manifesto → RECONSTRUCT → REPROPORTION → CONNECT → Shop → signature pearl → studio → about → newsletter. The existing typography and asymmetric collection layout are kept; the petite message lives in MAKE instead of a duplicated section.

CONNECT contains an editorial colour study with four separate radio groups: KNOT, CORD, BEAD and TASSEL. The palette has seven colours in three groups (core: Ivory Buff, Deep Indigo, Cameo Pink; character: Ochre Red, Light Glaucous Blue; earthy accents: Khaki, Vandyke Brown) and is defined in `src/index.css` and `src/content/jewellery.ts`. Six preset combinations are provided as a starting point. Colour names are shown together with swatches, and the arrow keys change option within a group. The choices exist only in the component's memory and reset on reload. No storage, network request, order or verified product construction is connected to the study.

The signature pearl image is a concept image (macro study), not a photo. A real macro photo of the physical pearl is still missing. This is stated in the alt text, not in any text on the page. The founder text (About the atelier) is approved by the founder; only text the founder has seen is covered, not other editorial text. No manufacturing, origin or material claims may be added without supporting evidence.

## The shop prototype flow

The shop (**Butik**, `#butik`, with its own link in the menu) is a **hard-coded prototype** for a presentation ([ADR 0003](docs/adr/0003-hardcoded-shop-prototype.md), spec [0002](docs/specs/0002-prototype-shop-flow/spec.md)). It shows a complete flow, but everything is mocked. What applies to the whole site:

- Sweden and SEK only. All prices are fictional and marked "demo".
- The cart lives in memory (React state) and disappears on reload. Nothing is saved: the only thing the site keeps is the language choice in the visitor's own browser (`hms-language`).
- No `fetch`, no payment provider, no backend. The checkout details belong to a fictional customer, "Kund Demo", with the card number 4242 4242 4242 4242. Every field is marked "demo", and the card field never leaves the page.
- Every screen in the flow shows "Prototype · no real order". "Start over" is available in every step.

**The path through the demo:**

1. **Bracelets** (three ready-made) and **Maedeup with Norigae** (four ready-made, or your own design in the builder) are put in the cart with "Add to cart". The ready-made Norigae products have the colours from their photos (`norigaeProducts` in `src/content/norigae.ts`). Hanbok are demo garments and cannot be bought. The hanbok cards show the back when you hover over them (`hoverImage` in `src/content/shop.ts`).
2. **Sewing patterns** (the category in the shop, `PatternShop`): three dummy patterns with image, text and price. A card opens a dialog with the pattern's information, fabric requirement and a measurement form prefilled for Kund Demo. The shirt and waistcoat patterns ask for five measurements (shoulder width, chest, upper-body length, sleeve length, garment length), the trousers for four (waist, seat, inseam, crotch length). The measurements are validated (`src/content/pattern.ts`) and travel with the item into the cart. **No pattern is fitted or drawn**: it is a prototype.
3. **The cart** (the button in the header) is a dialog with lines, removal and a total. From there you go to **`#kassa`** (checkout).
4. **`#kassa`**: summary, fictional details and a pay button. The payment waits about 1.5 s ("Processing…") and leads to **`#bekraftelse`** (confirmation).
5. **`#bekraftelse`**: order number (`HMS-DEMO-0001` and upwards, counted in memory), the lines and the total. A pattern in the order gives a download link to the demo PDF. Reloading shows the empty state.

Hash routing is done without a library (`src/routing/useRoute.ts`): only `#kassa` and `#bekraftelse` switch view; other hashes are anchors. The back button works.

### Seams towards a real shop

The business rules live in pure modules without React, so they can be moved to a server:

| Part | File | First replaced by |
| --- | --- | --- |
| Prices and price format | `src/content/prices.ts` (`price()`, `formatPrice()`) | a price list or product database |
| Cart | `src/content/cart.ts` (`addItem`, `removeItem`, `cartTotal`) and `src/cart/` (React state) | a server-stored cart |
| Customer and order | `src/content/order.ts` (`demoCustomer`, `placeOrder`) | real customer and order handling |
| Payment | `PAYMENT_DELAY_MS` and `CheckoutView` | a payment provider (requires a new spec and a new ADR) |
| Patterns and measurements | `src/content/patterns.ts` (the products), `src/content/pattern.ts` (measurement sets and validation) | a server function that fits the pattern to the measurements |
| Pattern PDF | `public/patterns/pattern-N-demo.pdf`, made by `scripts/make-pattern-pdf.mjs` | a PDF generated per order after payment |
| Routes | `src/content/routes.ts` | a real router |

### Pattern PDFs

The PDFs are fixed files, not generated per order. `scripts/make-pattern-pdf.mjs` makes one A4 page per pattern, with no dependencies: the pattern's image, the mark "PROTOTYPE, NOT A REAL PATTERN" (printed in Swedish and English) and Kund Demo's measurements. Run `npm run make:pattern-pdf` when a pattern, an image or the demo measurements change. A pattern is added in `src/content/patterns.ts` (image in `public/images/shop/patterns/`, text in `sv.ts` and `en.ts`).

### Tests

- `tests/pattern.test.ts`: the measurement sets, range and cross-rule validation, reading fields.
- `tests/shop-flow.test.ts`: prices, cart, order, pattern products, Norigae products, routes.

### Builders

The builders (Maedeup with Norigae, and the bracelets' three designs) keep their choices only in the component's memory. Besides putting the design in the cart, the summary can be copied to the clipboard. Every design always has a signature pearl in two colours. Hanbok garments are presented as unique, each made from a single second-hand shirt.

Real payment, accounts, a backend or collection of real personal data requires a new spec and a new ADR (see [ADR 0003](docs/adr/0003-hardcoded-shop-prototype.md)).

See also [`docs/demo-script.md`](docs/demo-script.md): a walkthrough of about two minutes in the order the presentation is clicked through.

## When the atelier's own photos exist

- Put approved images in `public/images/`; use only people and work the atelier has the right to show.
- Change the image source and alt text together. Describe what the image actually shows, not the planned subject.
- For object images: update `src/content/products.ts` and check both the card and the dialog. Keep the demo marking as long as the objects are fictional.
- For other sections: update the relevant component or `src/content/site.ts`. Remove the placeholder marking only when the pictured subject is verified.
- Process images must show the same real garment through the steps before they may be presented as before/after documentation.
- Review cropping, legibility and image loading on mobile and large screens; then run build and lint.

The product display is deliberately easy to replace with real products later. See the table of seams under [The shop prototype flow](#the-shop-prototype-flow) for what is replaced first.

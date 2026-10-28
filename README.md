# Hyang-Mee Studio — form, textil, detalj

En tvåspråkig (svenska och engelska) redaktionell webbplats för Hyang-Mee Studio, byggd med React, TypeScript och Vite. Ordmärket är satt i text med en stämplad SVG-sigill (samma sigill är favicon, `public/favicon.svg`) och någon färdig logotyp finns ännu inte. FORM · PROPORTION · CONNECTION håller WEAR / RECONSTRUCT, MAKE / REPROPORTION och ACCENTED / CONNECT samman. ACCENTED ersätter arbetsnamnet ADORN.

## Språk

- Svenska är standard. Ett sparat val (`localStorage`, nyckel `hms-language`, ingen personuppgift) går först, därefter webbläsarens språk (`sv` eller `en`), annars svenska.
- Språkväxlaren (SV / EN) ligger i sidhuvudet. Valet sätter även `<html lang>`, sidtitel och metabeskrivning.
- All synlig text ligger i `src/content/copy/sv.ts` och `en.ts`. Båda följer typen `Copy` i `types.ts`; en saknad sträng är ett kompileringsfel.
- Egennamn översätts inte: WEAR, MAKE, ACCENTED, produktnamn och Wada Sanzos färgnamn.
- Alla texter i `sv.ts` och `en.ts` är godkända av grundaren (2026-10-27). Språkliga justeringar (ton, rytm, tydlighet) får göras utan nytt godkännande, men båda språken ska ändras tillsammans. Ändrad innebörd, nya påståenden och grundartexten (`about`) kräver grundarens godkännande.
- Språkvalet sparas bara i den egna webbläsaren (`localStorage`) och innehåller ingen personuppgift. Det skickas aldrig någonstans.

## Starta lokalt

- `npm run dev` startar Vite för lokal utveckling.
- `npm run build` typkontrollerar och bygger den produktionsoptimerade sajten.
- `npm run lint` kör Oxlint.
- `npm test` kör enhetstesterna i `tests/` (Node 22.18 eller senare, ingen testlösning att installera).
- `npm run make:pattern-pdf` gör om demo-PDF:en i `public/patterns/` (se Butikens prototypflöde).
- `npm run preview` visar produktionsbygget lokalt.

## Innehåll och komponenter

- `src/content/products.ts` innehåller den språkoberoende strukturen för kategorier och fiktiva, tydligt markerade demo-produkter med stabila id:n, kategorikoppling och explicit prototypstatus.
- `src/content/jewellery.ts` innehåller paletten, färgkombinationerna och smyckenas färgdelar. Valen representerar inte lager eller köpbara varianter.
- `src/content/shop.ts` innehåller butikens språkoberoende katalog (fiktiva demoobjekt, `hanbokItems`), armbandens signaturpärlor (`braceletPearls`) och ankare.
- `src/content/prices.ts`, `cart.ts`, `order.ts`, `pattern.ts`, `patterns.ts` och `routes.ts` är butikens affärsregler som rena moduler, se Butikens prototypflöde.
- `src/content/norigae.ts` innehåller Norigaens byggardata (Norigaen byggs fritt, armbanden är tre färdiga produkter). `src/content/signaturePearl.ts` beskriver signaturpärlan: två färger och vertikalt eller horisontellt mönster.
- Foton till förhandsvisningen ligger i `public/images/shop/bracelets/` (`bracelet-1.webp` till `bracelet-3.webp`, utan bakgrund) och `public/images/shop/norigae/` (`maedeup-norigae-1.jpg` till `-4.jpg` är de färdiga produkterna, `norigae-reference.webp` visas i byggaren). Ett foto kan inte byta färg och visas därför bara som förhandsvisning när kundens val stämmer med färgerna på fotot (`hasBaseColours`, `isNorigaeShowcase`). Annars, och om fotot saknas, visas teckningen.
- `src/content/site.ts` innehåller navigationens ankare och hantverksbilderna.
- `src/content/copy/` innehåller all text, en fil per språk.
- `src/i18n/` innehåller språkkontext, val av språk och leverantör.
- `src/cart/` innehåller varukorgens React-tillstånd (`CartProvider`, `useCart`) och `src/routing/` hash-routingen.
- `src/components/` innehåller sidans återanvändbara sektioner och produktdetaljdialog. Butiken består av `ShopSection`, `ShopItemCard`, `NorigaeBuilder` (+ `NorigaeDrawing`), `HanbokShop`, `HanbokDialog` och `HanbokBadges`. Prototypflödet består av `AddToCartButton`, `CartButton`, `CartPanel`, `OrderLines`, `Price`, `PatternShop`, `MeasurementForm`, `FlowShell`, `CheckoutView` och `ConfirmationView`. De delade delarna är `BuilderControls`, `PearlControls`, `SignaturePearlDrawing`, `DesignPreview` (foto eller teckning), `builderSummary`, `useCopyToClipboard` och dialogskalet `PieceDialogShell`, som även `ProductDialog` använder.
- `src/index.css` innehåller designvariabler och globala tillgänglighetsregler.
- `src/App.css` innehåller responsiv presentation.
- `CONTEXT.md` definierar varumärkets centrala begrepp.

Bildmaterialet består av lokala bilder (PNG och JPG, högst 400 kB var) i `public/images/`: grafiska illustrationer samt konceptbilder (`atelier-study.jpg`, `macro-signature-pearl.jpg`, `pattern-study.jpg`, `try-your-own-colours.jpg`) som är art direction-referenser och inte foton av färdiga produkter. Introbilden (`hero-proportions.jpg`) är också en konceptbild. Stora originalfiler ligger i `originals/` och levereras inte med sajten. Inga externa bilder används längre. Inga egna ateljéfoton finns i projektet ännu. Bildplatshållare och fiktiva demoobjekt är märkta i sidan och produktdialogen; illustrationerna dokumenterar inte verkliga plagg, personer eller arbetsprocesser.

Nyhetsbrev och kontakt är visuella prototyper utan insamling eller hantering av uppgifter. Butiken är en hårdkodad prototyp (se nedan): varukorg, kassa och betalning finns, men allt är mockat med fiktiva uppgifter och inget sparas eller skickas.

## Berättelse och interaktion

Startsidan följer hero (ett budskap och tre dörrar: WEAR, MAKE, ACCENTED) → manifest → RECONSTRUCT → REPROPORTION → CONNECT → Butik → signaturpärla → studio → om oss → nyhetsbrev. Den befintliga typografin och asymmetriska samlingslayouten behålls; petite-budskapet ligger nu i MAKE i stället för i en dubblerad sektion.

CONNECT innehåller en redaktionell färgstudie med fyra separata radiogrupper: KNOT, CORD, BEAD och TASSEL. Paletten har sju färger i tre grupper (kärna: Ivory Buff, Deep Indigo, Cameo Pink; karaktär: Ochre Red, Light Glaucous Blue; jordiga accenter: Khaki, Vandyke Brown) och definieras i `src/index.css` och `src/content/jewellery.ts`. Sex förvalda kombinationer finns som utgångspunkt. Färgnamn visas tillsammans med färgprover. Tangentbordets piltangenter byter alternativ inom en grupp. Valen finns enbart i komponentens minne och återställs vid omladdning. Ingen lagring, nätverksbegäran, beställning eller verifierad produktkonstruktion är kopplad till studien.

Signaturpärlans bild är en konceptbild (makrostudie), inte ett foto: ett riktigt makrofoto av den fysiska pärlan saknas fortfarande och märks som väntande. Grundartexten (Om ateljén) är godkänd av grundaren; endast text som grundaren sett omfattas, inte övrig redaktionell text. Inga tillverknings-, ursprungs- eller materialpåståenden ska läggas till utan underlag.

## Butikens prototypflöde

Butiken (**Butik**, `#butik`, med egen länk i menyn) är en **hårdkodad prototyp** för en redovisning ([ADR 0003](docs/adr/0003-hardcoded-shop-prototype.md), spec [0002](docs/specs/0002-prototype-shop-flow/spec.md)). Den visar ett helt flöde, men allt är mockat. Det som gäller för hela sajten:

- Bara Sverige och SEK. Alla priser är fiktiva och märks "demo".
- Varukorgen finns i minnet (React-tillstånd) och försvinner vid omladdning. Inget sparas: det enda sajten behåller är språkvalet i den egna webbläsaren (`hms-language`).
- Inga `fetch`, ingen betalleverantör, ingen backend. Kassans uppgifter är en fiktiv kund, "Kund Demo", med kortnumret 4242 4242 4242 4242. Varje fält är märkt "demo", och kortfältet lämnar aldrig sidan.
- Varje skärm i flödet visar "Prototyp · ingen riktig beställning". "Börja om" finns i varje steg.

**Vägen genom demon:**

1. **Armband** (tre färdiga), **Maedeup med Norigae** (fyra färdiga, eller en egen design i byggaren) läggs i varukorgen med "Lägg i varukorgen". De färdiga Norigae-produkterna har färgerna från sina foton (`norigaeProducts` i `src/content/norigae.ts`). Hanbok är demoplagg och kan inte köpas. Hanbokkorten visar baksidan när man pekar på dem (`hoverImage` i `src/content/shop.ts`).
2. **Sömnadsmönster** (kategorin i butiken, `PatternShop`): tre dummymönster med bild, text och pris. Ett kort öppnar en pop-up med mönstrets information, tygåtgång och ett måttformulär förifyllt för Kund Demo. Skjort- och västmönstren frågar efter fem mått (axelbredd, bröstvidd, överkroppslängd, ärmlängd, plagglängd), byxorna efter fyra (midja, stuss, innerbenslängd, skrevlängd). Måtten kontrolleras (`src/content/pattern.ts`) och följer med i varukorgen. **Inget mönster anpassas eller ritas**: det är en prototyp.
3. **Varukorgen** (knappen i sidhuvudet) är en dialog med rader, borttagning och totalsumma. Därifrån går man till **`#kassa`**.
4. **`#kassa`**: sammanfattning, fiktiva uppgifter och en betalknapp. Betalningen väntar cirka 1,5 s ("Behandlar…") och leder till **`#bekraftelse`**.
5. **`#bekraftelse`**: ordernummer (`HMS-DEMO-0001` och uppåt, räknas i minnet), raderna och summan. Ett mönster i ordern ger en nedladdningslänk till demo-PDF:en. Omladdning visar tomt läge.

Hash-routing görs utan bibliotek (`src/routing/useRoute.ts`): bara `#kassa` och `#bekraftelse` byter vy, övriga hash är ankare. Bakåtknappen fungerar.

**Sömmarna mot en riktig butik.** Affärsreglerna ligger i rena moduler utan React, så de kan flyttas till en server:

| Del | Fil | Byts först mot |
| --- | --- | --- |
| Priser och prisformat | `src/content/prices.ts` (`price()`, `formatPrice()`) | prislista eller produktdatabas |
| Varukorg | `src/content/cart.ts` (`addItem`, `removeItem`, `cartTotal`) och `src/cart/` (React-tillstånd) | serverlagrad varukorg |
| Kund och order | `src/content/order.ts` (`demoCustomer`, `placeOrder`) | riktig kund- och orderhantering |
| Betalning | `PAYMENT_DELAY_MS` och `CheckoutView` | betalleverantör (kräver ny spec och nytt ADR) |
| Mönster och mått | `src/content/patterns.ts` (produkterna), `src/content/pattern.ts` (måttuppsättningar och kontroll) | serverfunktion som anpassar mönstret efter måtten |
| Mönster-PDF | `public/patterns/pattern-N-demo.pdf`, gjorda av `scripts/make-pattern-pdf.mjs` | PDF som genereras per order efter betalning |
| Rutter | `src/content/routes.ts` | en riktig router |

**Mönster-PDF:erna är fasta filer**, inte genererade per order. `scripts/make-pattern-pdf.mjs` gör en A4-sida per mönster, utan beroenden: mönstrets bild, markeringen "Prototyp, inte ett riktigt mönster" och Kund Demos mått. Kör `npm run make:pattern-pdf` när ett mönster, en bild eller demomåtten ändras. Ett mönster läggs till i `src/content/patterns.ts` (bild i `public/images/shop/patterns/`, text i `sv.ts` och `en.ts`).

**Tester.** `tests/pattern.test.ts` (måttuppsättningarna, kontroll av intervall och korsregler, avläsning av fält) och `tests/shop-flow.test.ts` (priser, varukorg, order, mönsterprodukter, Norigae-produkter, rutter).

**Byggarna** (Maedeup med Norigae, och armbandens tre designer) är desamma som tidigare: valen finns bara i komponentens minne, och förutom att lägga designen i varukorgen kan sammanfattningen kopieras till urklipp. Varje design har alltid en signaturpärla i två färger. Hanbokplagg presenteras som unika, gjorda av en enda second hand-skjorta.

Riktig betalning, konton, backend eller insamling av riktiga personuppgifter kräver en ny spec och ett nytt ADR (se [ADR 0003](docs/adr/0003-hardcoded-shop-prototype.md)).

Se även [`docs/demo-script.md`](docs/demo-script.md): en genomgång på cirka två minuter i den ordning redovisningen klickas.

## När ateljéns egna foton finns

- Lägg godkända bilder i `public/images/`; använd bara personer och verk som ateljén har rätt att visa.
- Byt bildkälla och alt-text tillsammans. Beskriv det bilden faktiskt visar, inte det planerade motivet.
- För objektbilder: uppdatera `src/content/products.ts` och kontrollera både kort och dialog. Behåll demomärkningen så länge objekten är fiktiva.
- För övriga sektioner: uppdatera berörd komponent eller `src/content/site.ts`. Ta bort platshållarmärkning först när det visade motivet är verifierat.
- Processbilder ska visa samma verkliga plagg genom stegen innan de får presenteras som före/efter-dokumentation.
- Granska beskärning, läsbarhet och bildladdning på mobil och stor skärm; kör sedan bygg och lint.

Produktvisningen är avsiktligt enkel att ersätta med riktiga produkter senare. Se tabellen över sömmar under Butikens prototypflöde för vad som byts först.

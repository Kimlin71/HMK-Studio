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
- `npm run preview` visar produktionsbygget lokalt.

## Innehåll och komponenter

- `src/content/products.ts` innehåller den språkoberoende strukturen för kategorier och fiktiva, tydligt markerade demo-produkter med stabila id:n, kategorikoppling och explicit prototypstatus.
- `src/content/jewellery.ts` innehåller paletten, färgkombinationerna och smyckenas färgdelar. Valen representerar inte lager eller köpbara varianter.
- `src/content/shop.ts` innehåller butikens språkoberoende katalog (fiktiva demoobjekt, `hanbokItems`) och ankare.
- `src/content/bracelet.ts` och `src/content/norigae.ts` innehåller armbandets och Norigaens byggardata. Armbandet har tre färdiga designer med färgval, Norigaen byggs fritt. `src/content/signaturePearl.ts` beskriver signaturpärlan: två färger och vertikalt eller horisontellt mönster.
- Foton till förhandsvisningen ligger i `public/images/shop/bracelets/` (`bracelet-1.webp` till `bracelet-3.webp`, utan bakgrund) och `public/images/shop/norigae/norigae-reference.webp`. Ett foto kan inte byta färg och visas därför bara som förhandsvisning när kundens val stämmer med färgerna på fotot (`hasBaseColours`, `isNorigaeShowcase`). Annars, och om fotot saknas, visas teckningen.
- `src/content/site.ts` innehåller navigationens ankare och hantverksbilderna.
- `src/content/copy/` innehåller all text, en fil per språk.
- `src/i18n/` innehåller språkkontext, val av språk och leverantör.
- `src/components/` innehåller sidans återanvändbara sektioner och produktdetaljdialog. Butiken består av `ShopSection`, `ShopItemCard`, `BraceletBuilder` (+ `BraceletDrawing`), `NorigaeBuilder` (+ `NorigaeDrawing`), `HanbokShop`, `HanbokDialog` och `HanbokBadges`. De delade delarna är `BuilderControls`, `PearlControls`, `SignaturePearlDrawing`, `DesignPreview` (foto eller teckning), `builderSummary`, `useCopyToClipboard` och dialogskalet `PieceDialogShell`, som även `ProductDialog` använder.
- `src/index.css` innehåller designvariabler och globala tillgänglighetsregler.
- `src/App.css` innehåller responsiv presentation.
- `CONTEXT.md` definierar varumärkets centrala begrepp.

Bildmaterialet består av lokala bilder (PNG och JPG, högst 400 kB var) i `public/images/`: grafiska illustrationer samt konceptbilder (`atelier-study.jpg`, `macro-signature-pearl.jpg`) som är art direction-referenser och inte foton av färdiga produkter. Introbilden (`hero-proportions.jpg`) är också en konceptbild. Stora originalfiler ligger i `originals/` och levereras inte med sajten. Inga externa bilder används längre. Inga egna ateljéfoton finns i projektet ännu. Bildplatshållare och fiktiva demoobjekt är märkta i sidan och produktdialogen; illustrationerna dokumenterar inte verkliga plagg, personer eller arbetsprocesser.

Nyhetsbrev och kontakt är visuella prototyper utan insamling eller hantering av uppgifter. Butiken är byggd som gränssnitt (se nedan), men beställning är inaktiv: inga priser, order, varukorg, checkout eller betalningar är implementerade.

## Berättelse och interaktion

Startsidan följer hero (ett budskap och tre dörrar: WEAR, MAKE, ACCENTED) → manifest → RECONSTRUCT → REPROPORTION → CONNECT → Butik → signaturpärla → studio → om oss → nyhetsbrev. Den befintliga typografin och asymmetriska samlingslayouten behålls; petite-budskapet ligger nu i MAKE i stället för i en dubblerad sektion.

CONNECT innehåller en redaktionell färgstudie med fyra separata radiogrupper: KNOT, CORD, BEAD och TASSEL. Paletten har sju färger i tre grupper (kärna: Ivory Buff, Deep Indigo, Cameo Pink; karaktär: Ochre Red, Light Glaucous Blue; jordiga accenter: Khaki, Vandyke Brown) och definieras i `src/index.css` och `src/content/jewellery.ts`. Sex förvalda kombinationer finns som utgångspunkt. Färgnamn visas tillsammans med färgprover. Tangentbordets piltangenter byter alternativ inom en grupp. Valen finns enbart i komponentens minne och återställs vid omladdning. Ingen lagring, nätverksbegäran, beställning eller verifierad produktkonstruktion är kopplad till studien.

Signaturpärlans bild är en konceptbild (makrostudie), inte ett foto: ett riktigt makrofoto av den fysiska pärlan saknas fortfarande och märks som väntande. Grundartexten (Om ateljén) är godkänd av grundaren; endast text som grundaren sett omfattas, inte övrig redaktionell text. Inga tillverknings-, ursprungs- eller materialpåståenden ska läggas till utan underlag.

## Shop-gränssnitt och byggare

Butiken (**Butik**, `#butik`, med egen länk i menyn) är byggd som enbart gränssnitt: beställning är inaktiv och priser visas som "pris meddelas senare". Specen [`docs/specs/0001-webshop-ui/spec.md`](docs/specs/0001-webshop-ui/spec.md) beskriver en shopsektion med armband, Maedeup med Norigae och hanbokplagg, samt två val med live-förhandsvisning: tre färdiga armband där kunden byter färger, och en Maedeup + Norigae-byggare. Varje design har alltid en signaturpärla i två färger. Hanbokplagg presenteras som unika, gjorda av en enda second hand-skjorta.

Medvetet inaktivt: priser visas som "pris meddelas senare", och det finns ingen varukorg, kassa, betalning, inloggning eller insamling av personuppgifter. Byggarna och beställningsknappen sparar och skickar ingenting: valen finns bara i komponentens minne, och det enda resultatet är en sammanfattning på skärmen som kan kopieras till urklipp. Det enda sajten behåller är språkvalet i den egna webbläsaren (`hms-language`). En design är ett utkast, inte en beställning. Beslutet finns i [`docs/adr/0002-shop-ui-before-commerce.md`](docs/adr/0002-shop-ui-before-commerce.md); Stripe Checkout, mönster med måttformulär och PDF-generering på servern efter betalning är separata, senare specar.

## När ateljéns egna foton finns

- Lägg godkända bilder i `public/images/`; använd bara personer och verk som ateljén har rätt att visa.
- Byt bildkälla och alt-text tillsammans. Beskriv det bilden faktiskt visar, inte det planerade motivet.
- För objektbilder: uppdatera `src/content/products.ts` och kontrollera både kort och dialog. Behåll demomärkningen så länge objekten är fiktiva.
- För övriga sektioner: uppdatera berörd komponent eller `src/content/site.ts`. Ta bort platshållarmärkning först när det visade motivet är verifierat.
- Processbilder ska visa samma verkliga plagg genom stegen innan de får presenteras som före/efter-dokumentation.
- Granska beskärning, läsbarhet och bildladdning på mobil och stor skärm; kör sedan bygg och lint.

Produktvisningen är avsiktligt enkel att ersätta med riktiga produkter senare. Kommentarer markerar framtida webshop/checkout, produktvarianter, symönsterfiler för nedladdning och specialbeställningar.

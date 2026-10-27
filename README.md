# Hyang-Mee Studio — form, textil, detalj

En tvåspråkig (svenska och engelska) redaktionell webbplats för Hyang-Mee Studio, byggd med React, TypeScript och Vite. Ordmärket är satt i text med en stämplad SVG-sigill (samma sigill är favicon, `public/favicon.svg`) och någon färdig logotyp finns ännu inte. FORM · PROPORTION · CONNECTION håller WEAR / RECONSTRUCT, MAKE / REPROPORTION och ACCENTED / CONNECT samman. ACCENTED ersätter arbetsnamnet ADORN.

## Språk

- Svenska är standard. Ett sparat val (`localStorage`, nyckel `hms-language`, ingen personuppgift) går först, därefter webbläsarens språk (`sv` eller `en`), annars svenska.
- Språkväxlaren (SV / EN) ligger i sidhuvudet. Valet sätter även `<html lang>`, sidtitel och metabeskrivning.
- All synlig text ligger i `src/content/copy/sv.ts` och `en.ts`. Båda följer typen `Copy` i `types.ts`; en saknad sträng är ett kompileringsfel.
- Egennamn översätts inte: WEAR, MAKE, ACCENTED, produktnamn och Wada Sanzos färgnamn.
- Alla texter i `sv.ts` och `en.ts` är godkända av grundaren (2026-10-27). När en mening ändras ska båda språken ändras och nytt godkännande behövs.
- Språkvalet sparas bara i den egna webbläsaren (`localStorage`) och innehåller ingen personuppgift. Det skickas aldrig någonstans.

## Starta lokalt

- `npm run dev` startar Vite för lokal utveckling.
- `npm run build` typkontrollerar och bygger den produktionsoptimerade sajten.
- `npm run lint` kör Oxlint.
- `npm run preview` visar produktionsbygget lokalt.

## Innehåll och komponenter

- `src/content/products.ts` innehåller den språkoberoende strukturen för kategorier och fiktiva, tydligt markerade demo-produkter med stabila id:n, kategorikoppling och explicit prototypstatus.
- `src/content/jewellery.ts` innehåller paletten, färgkombinationerna och smyckenas färgdelar. Valen representerar inte lager eller köpbara varianter.
- `src/content/site.ts` innehåller navigationens ankare och hantverksbilderna.
- `src/content/copy/` innehåller all text, en fil per språk.
- `src/i18n/` innehåller språkkontext, val av språk och leverantör.
- `src/components/` innehåller sidans återanvändbara sektioner och produktdetaljdialog.
- `src/index.css` innehåller designvariabler och globala tillgänglighetsregler.
- `src/App.css` innehåller responsiv presentation.
- `CONTEXT.md` definierar varumärkets centrala begrepp.

Bildmaterialet består av lokala PNG-bilder i `public/images/`: grafiska illustrationer samt konceptbilder (`atelier-study.png`, `macro-signature-pearl.png`) som är art direction-referenser och inte foton av färdiga produkter. Introbilden (`hero-proportions.jpg`) är också en konceptbild. Stora originalfiler ligger i `originals/` och levereras inte med sajten. Inga externa bilder används längre. Inga egna ateljéfoton finns i projektet ännu. Bildplatshållare och fiktiva demoobjekt är märkta i sidan och produktdialogen; illustrationerna dokumenterar inte verkliga plagg, personer eller arbetsprocesser.

Nyhetsbrev och kontakt är visuella prototyper utan insamling eller hantering av uppgifter. Inga priser, order, varukorg, checkout eller betalningar är implementerade.

## Berättelse och interaktion

Startsidan följer hero (ett budskap och tre dörrar: WEAR, MAKE, ACCENTED) → manifest → RECONSTRUCT → REPROPORTION → CONNECT → signaturpärla → studio → om oss → nyhetsbrev. Den befintliga typografin och asymmetriska samlingslayouten behålls; petite-budskapet ligger nu i MAKE i stället för i en dubblerad sektion.

CONNECT innehåller en redaktionell färgstudie med fyra separata radiogrupper: KNOT, CORD, BEAD och TASSEL. Paletten har sju färger i tre grupper (kärna: Ivory Buff, Deep Indigo, Cameo Pink; karaktär: Ochre Red, Light Glaucous Blue; jordiga accenter: Khaki, Vandyke Brown) och definieras i `src/index.css` och `src/content/jewellery.ts`. Sex förvalda kombinationer finns som utgångspunkt. Färgnamn visas tillsammans med färgprover. Tangentbordets piltangenter byter alternativ inom en grupp. Valen finns enbart i komponentens minne och återställs vid omladdning. Ingen lagring, nätverksbegäran, beställning eller verifierad produktkonstruktion är kopplad till studien.

Signaturpärlans bild är en konceptbild (makrostudie), inte ett foto: ett riktigt makrofoto av den fysiska pärlan saknas fortfarande och märks som väntande. Grundartexten (Om ateljén) är godkänd av grundaren; endast text som grundaren sett omfattas, inte övrig redaktionell text. Inga tillverknings-, ursprungs- eller materialpåståenden ska läggas till utan underlag.

## När ateljéns egna foton finns

- Lägg godkända bilder i `public/images/`; använd bara personer och verk som ateljén har rätt att visa.
- Byt bildkälla och alt-text tillsammans. Beskriv det bilden faktiskt visar, inte det planerade motivet.
- För objektbilder: uppdatera `src/content/products.ts` och kontrollera både kort och dialog. Behåll demomärkningen så länge objekten är fiktiva.
- För övriga sektioner: uppdatera berörd komponent eller `src/content/site.ts`. Ta bort platshållarmärkning först när det visade motivet är verifierat.
- Processbilder ska visa samma verkliga plagg genom stegen innan de får presenteras som före/efter-dokumentation.
- Granska beskärning, läsbarhet och bildladdning på mobil och stor skärm; kör sedan bygg och lint.

Produktvisningen är avsiktligt enkel att ersätta med riktiga produkter senare. Kommentarer markerar framtida webshop/checkout, produktvarianter, symönsterfiler för nedladdning och specialbeställningar.

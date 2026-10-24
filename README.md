# ATELJÉ — form, textil, detalj

En svensk förstautgåva av en redaktionell ateljéwebbplats byggd med React, TypeScript och Vite. Designvärlden håller WEAR, MAKE och ADORN samman genom proportion, återbruk och hantverk.

## Starta lokalt

- `npm run dev` startar Vite för lokal utveckling.
- `npm run build` typkontrollerar och bygger den produktionsoptimerade sajten.
- `npm run lint` kör Oxlint.
- `npm run preview` visar produktionsbygget lokalt.

## Innehåll och komponenter

- `src/content/products.ts` innehåller fiktiva, tydligt markerade demo-produkter.
- `src/content/site.ts` innehåller navigation och hantverksgalleri.
- `src/components/` innehåller sidans återanvändbara sektioner och produktdetaljdialog.
- `src/index.css` innehåller designvariabler och globala tillgänglighetsregler.
- `src/App.css` innehåller responsiv presentation.
- `CONTEXT.md` definierar varumärkets centrala begrepp.

Bildmaterialet består av lokala SVG-studier i `public/images/` och en extern Unsplash-bild i introduktionen. Inga egna ateljéfoton finns i projektet ännu. Bildplatshållare och fiktiva demoobjekt är märkta i sidan och produktdialogen; illustrationerna dokumenterar inte verkliga plagg, personer eller arbetsprocesser.

Nyhetsbrev och kontakt är visuella prototyper utan insamling eller hantering av uppgifter. Inga priser, order, varukorg, checkout eller betalningar är implementerade.

## När ateljéns egna foton finns

- Lägg godkända bilder i `public/images/`; använd bara personer och verk som ateljén har rätt att visa.
- Byt bildkälla och alt-text tillsammans. Beskriv det bilden faktiskt visar, inte det planerade motivet.
- För objektbilder: uppdatera `src/content/products.ts` och kontrollera både kort och dialog. Behåll demomärkningen så länge objekten är fiktiva.
- För övriga sektioner: uppdatera berörd komponent eller `src/content/site.ts`. Ta bort platshållarmärkning först när det visade motivet är verifierat.
- Processbilder ska visa samma verkliga plagg genom stegen innan de får presenteras som före/efter-dokumentation.
- Granska beskärning, läsbarhet och bildladdning på mobil och stor skärm; kör sedan bygg och lint.

Produktvisningen är avsiktligt enkel att ersätta med riktiga produkter senare. Kommentarer markerar framtida webshop/checkout, produktvarianter, symönsterfiler för nedladdning, specialbeställningar och svensk/engelsk språkväxling.

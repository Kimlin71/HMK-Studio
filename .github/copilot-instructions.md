# Arbetsregler för HMK Studio

- Bevara svenska som standardspråk. Sajten finns på svenska och engelska; all synlig text ligger i `src/content/copy/sv.ts` och `en.ts` och båda måste ha samma struktur (typen `Copy`). Hårdkoda ingen synlig text i komponenter.
- WEAR, MAKE och ACCENTED är varumärkets kategorietiketter (ACCENTED ersätter arbetsnamnet ADORN) och översätts inte. Färgnamn (Wada Sanzo) och produktnamn är egennamn och förblir engelska i båda språken.
- Håll varumärkets erbjudanden samman genom proportion, rekonstruktion och hantverk.
- Lägg återanvändbara UI-delar i `src/components/` och presentationsinnehåll/demo-produkter i `src/content/`.
- Märk platshållartext och bilder tydligt; använd inte demo-innehåll som om det vore produkter till salu.
- Varukorg, kassa, måttformulär och mönsternedladdning får finnas som hårdkodad prototyp (ADR 0003), men bara med fiktiva data: inga riktiga uppgifter får skrivas in, sparas eller skickas, inget betalningsanrop görs, och varje skärm märks som prototyp.
- Lägg inte till riktig betalning, konton, backend eller insamling av riktiga personuppgifter utan en ny spec och ett nytt ADR.
- Kontrollera ändringar med `npm run build` och `npm run lint`.

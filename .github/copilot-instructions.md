# Arbetsregler för HMK Studio

- Bevara svenska som standardspråk. Sajten finns på svenska och engelska; all synlig text ligger i `src/content/copy/sv.ts` och `en.ts` och båda måste ha samma struktur (typen `Copy`). Hårdkoda ingen synlig text i komponenter.
- WEAR, MAKE och ACCENTED är varumärkets kategorietiketter (ACCENTED ersätter arbetsnamnet ADORN) och översätts inte. Färgnamn (Wada Sanzo) och produktnamn är egennamn och förblir engelska i båda språken.
- Håll varumärkets erbjudanden samman genom proportion, rekonstruktion och hantverk.
- Lägg återanvändbara UI-delar i `src/components/` och presentationsinnehåll/demo-produkter i `src/content/`.
- Märk platshållartext och bilder tydligt; använd inte demo-innehåll som om det vore produkter till salu.
- Behåll formulär inaktiva tills integritet, lagring och inskick uttryckligen har utformats.
- Lägg inte till varukorg, checkout, betalningar eller insamling av personuppgifter utan ett separat godkänt krav.
- Kontrollera ändringar med `npm run build` och `npm run lint`.

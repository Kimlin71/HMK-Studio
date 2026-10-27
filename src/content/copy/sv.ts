import type { Copy } from './types'

// Svensk text. GODKÄND av grundaren (2026-10-27): alla texter i den här filen och i en.ts.
// Håll de båda filerna i takt: ändra båda när en mening ändras.
export const sv: Copy = {
  meta: {
    title: 'Hyang-Mee Studio — Form · Textil · Detalj',
    description:
      'Hyang-Mee Studio: en redaktionell prototyp om omsydda plagg, petite-mönster och accenter inspirerade av koreanskt hantverk. Visar designkoncept och tydligt märkta platshållarbilder, inte ett försäljningsutbud.',
  },
  skipLink: 'Hoppa till innehållet',
  collectionsLabel: 'Studions tre sammanhängande uttryck',
  wordmark: { home: 'Hyang-Mee Studio — till startsidan', top: 'Hyang-Mee Studio — till sidans början' },
  header: {
    navLabel: 'Huvudnavigation',
    menuOpen: 'Öppna menyn',
    menuClose: 'Stäng menyn',
    contact: 'Kontakt',
    languageLabel: 'Språk',
    nav: { home: 'Hem', wear: 'WEAR', make: 'MAKE', accented: 'ACCENTED', studio: 'Studio', about: 'Om oss' },
  },
  hero: {
    eyebrow: 'En koreansk–skandinavisk studio',
    titleTop: 'MADE FOR',
    titleEm: 'YOUR PROPORTIONS',
    lead: 'Omsydda plagg, mönster för petite proportioner och accenter gjorda för hand. Koreanska rötter, skandinavisk uppväxt.',
    primaryCta: 'Se konceptet',
    secondaryCta: 'Om petite och proportion',
    index: '01 / FORM FOLLOWS YOU',
    imageAlt:
      'Konceptbild: kvinna i profil i en kort, omsydd blårandig skjorta med ett knutet band, mörka vida byxor och handgjorda smycken med tofsar, mot en varm beige vägg. Inte ett foto av en färdig produkt.',
    imageNote: ['Konceptbild · ej foto', 'Art direction-referens'],
    seal: ['STUDIO', 'EDITION 01'],
    doorsLabel: 'Vad studion gör',
    doors: {
      WEAR: { title: 'WEAR', text: 'Befintliga plagg som sys om.' },
      MAKE: { title: 'MAKE', text: 'Sömnadsmönster för petite proportioner.' },
      ACCENTED: { title: 'ACCENTED', text: 'Knutar, tofsar och små detaljer.' },
    },
    scroll: 'Scrolla för att upptäcka ↓',
  },
  brandIntro: {
    marker: 'Manifest',
    eyebrow: 'Kroppen är inte en storlekstabell',
    titleTop: 'Kläder är inte',
    titleEm: 'kroppar',
    lead: 'En mindre storlek är inte bara en kortare version av en större.',
    body: 'Proportion handlar om längd, balans och placering. Genom rekonstruktion kan ett plagg få en ny form — kläder ska anpassas till människor, inte tvärtom.',
  },
  collections: {
    reconstruct: {
      concept: 'RECONSTRUCT',
      title: 'BEFINTLIG FORM. NYTT UTTRYCK.',
      paragraphs: [
        'En välbekant skjorta blir en utgångspunkt snarare än något färdigt.',
        'Plagg syms om till en fusion av koreanska rötter och en skandinavisk uppväxt: överlappande former, knytningar och nya proportioner i en stilla, återhållen silhuett.',
        'Det första konceptet är en hanbok i modern stil. Det är en början, inte en gräns — fler plagg är på väg.',
      ],
      action: 'Upptäck plaggen',
    },
    reproportion: {
      concept: 'REPROPORTION',
      title: 'MINDRE ÄR INTE DET SAMMA SOM PETITE.',
      paragraphs: [
        'Petite handlar om proportion, inte bara storlek.',
        'Mönster som utvecklas med uppmärksamhet på bålens längd, placering, balans och förhållandet mellan plaggets delar.',
        'För ett mönster ska anpassas efter den som bär plagget.',
      ],
      action: 'Utforska mönstren',
    },
    connect: {
      concept: 'CONNECT',
      title: 'ETT SPRÅK. MÅNGA KOMBINATIONER.',
      paragraphs: [
        'Knut. Pärla. Tofs. Färg.',
        'Enskilda delar är utformade för att fungera tillsammans, så att färger och former kan flytta mellan smycken.',
        'Kombinera indigo med ivory. Ochre med glaucous blue. Cameo pink med en gnutta jord. En stilla kombination i dag, något djärvare i morgon.',
      ],
      action: 'Skapa din kombination',
    },
  },
  collectionCard: {
    open: (name, category) => `Visa ${name}, fiktivt demo, ${category}`,
    imageNote: 'Fiktivt demo · Illustration',
  },
  compare: {
    before: 'Före',
    after: 'Efter',
    beforeAlt: 'Konceptbild: kvinna i en ljusblå randig, rak skjorta med knappar och bröstficka. Utgångspunkten före omformningen.',
    afterAlt:
      'Konceptbild: samma skjorta omsydd till en modern hanbok, en fusion av koreansk inspiration och skandinavisk minimalism, med diagonal omlottstängning och ett långt knutet band vid sidan.',
    beforeCaption: 'den befintliga skjortan',
    afterCaption: 'omsydd till en modern hanbok',
    imageNote: 'Konceptbild · före / efter, ej foto',
    sliderLabel: 'Jämför före och efter. Dra åt vänster eller höger.',
    sliderValue: (percent) => `Skjortan visas till ${percent} procent från vänster, den omsydda, moderna hanboken till höger`,
    leftRight: (left, right) => `Vänster · ${left} / Höger · ${right}`,
  },
  pieces: {
    'the-crossing-shirt': {
      category: 'Omsydd skjorta · Modern hanbok · Formstudie',
      imageAlt:
        'Konceptbild: skjorta omsydd till en modern hanbok, en fusion av koreansk inspiration och skandinavisk minimalism, med diagonal omlottstängning och ett långt knutet band vid sidan.',
      imageLabel: 'Konceptbild · ej foto',
      demoNote:
        'Fiktivt redaktionellt demoexempel, illustrerat med en konceptbild. Bilden är en art direction-referens, inte ett foto av ett tillverkat plagg. Material och hantverk beskriver konceptet. Inga köp eller beställningar tas emot.',
      material: 'Materialplatshållare. Faktisk sammansättning anges när ett dokumenterat plagg finns.',
      story:
        'En klassisk herrskjorta syms om och blir en modern hanbok — en fusion av koreanska rötter och en skandinavisk uppväxt. Omlottstängning, knytning och en mjuk, förskjuten silhuett i ett stilla uttryck. Det är det första konceptet, inte det enda: fler omsydda plagg är på väg. Bekant nog att bära ofta, annorlunda nog att kännas som din.',
      craftsmanship: 'Formidé: omlott, förskjutna linjer och knytning, med avskalade detaljer. Konstruktion och utförande är ännu inte dokumenterade.',
      upcycling: 'Ursprungsskjortan väljs för sin kvalitet och blir utgångspunkten för ett nytt plagg — inte ett material att dölja.',
      petiteNote: 'Axel- och ärmlängd balanseras med plaggets volym för att silhuetten ska kännas avsiktlig på en petite kropp.',
      related: 'ACCENTED — knut, signaturpärla och tofs som en gemensam detaljidé.',
    },
    'proportion-study-01': {
      category: 'Symönster · Petite proportioner',
      imageAlt: 'Grafisk mönsterstudie med proportioner och sömlinjer',
      imageLabel: 'Fiktivt demo · Illustration',
      demoNote:
        'Fiktivt redaktionellt demoexempel, illustrerat med en grafisk platshållare. Material och hantverk beskriver konceptet, inte ett tillverkat plagg. Inga köp eller beställningar tas emot.',
      material: 'Koncept för ett digitalt symönster i vävd kvalitet. Inga mönsterfiler eller måttguider finns att ladda ned.',
      story: 'Ett skjortmönster som börjar i proportionerna: kortare överkropp, balanserad ärm och en fåll placerad där plagget får sitt rätta fall.',
      craftsmanship: 'Koncept för placering av axel, midja och ärm. Provning, instruktioner och måttunderlag återstår att dokumentera.',
      petiteNote: 'Utformat för petite proportioner från första mönsterlinjen — inte nedskalat från ett standardblock.',
      related: 'Matcha med The Crossing Shirt för en gemensam silhuett och en detalj i samma ton.',
    },
    'knot-no-01': {
      category: 'Modulär detalj · Formstudie',
      imageAlt: 'Grafisk studie av en handknuten tråd med tofs',
      imageLabel: 'Fiktivt demo · Illustration',
      demoNote:
        'Fiktivt redaktionellt demoexempel, illustrerat med en grafisk platshållare. Material och hantverk beskriver konceptet, inte ett tillverkat föremål. Inga köp eller beställningar tas emot.',
      material: 'Materialplatshållare. Snodd, pärla, tofs och kopplingar behöver specificeras för verkliga objekt.',
      story:
        'En studie av hur knut, pärla, tofs och koppling kan bilda en helhet. Tanken är att färger och delar ska kunna kombineras inom och mellan smycken, dekorativa objekt och plagg.',
      craftsmanship: 'Koncept för sammankopplade delar. Illustrationens knut är en grafisk studie, inte en dokumenterad knutteknik eller färdig produkt.',
      related: 'Formgiven för att bäras tillsammans med The Crossing Shirt och andra plagg från studion.',
    },
  },
  dialog: {
    close: 'Stäng',
    closeLabel: 'Stäng produktdetaljer',
    fields: { material: 'Material', craft: 'Hantverk', reuse: 'Återbruk', proportion: 'Proportion', together: 'Att bära tillsammans' },
  },
  connect: {
    eyebrow: 'CONNECT-familjen',
    title: 'En pärla. Många smycken.',
    origin: 'Inspired by Korean decorative knotwork',
    lead: 'Fem smycken och ett bibliotek av utbytbara delar. Signaturpärlan är det som återkommer; övrigt är medvetet tystare. Inte varje del är lika dekorerad och inte varje färg finns i varje smycke.',
    paletteLabel: 'Paletten',
    paletteGroups: {
      core: { label: 'Kärna', note: 'Basen i de flesta kombinationer.' },
      character: { label: 'Karaktär', note: 'Färgerna som syns först.' },
      earth: { label: 'Jordiga accenter', note: 'Små, dämpade markeringar.' },
    },
    indigoPrint: 'Tryck: #000831 · CMYK 100/92/52/60',
    familiesLabel: 'Färgfamiljer',
    families: {
      'indigo-ivory': { label: 'Deep Indigo + Ivory Buff', note: 'Mörkt och ljust i jämvikt. Ivory Buff bär lika gärna knut, snodd, pärla och tofs.' },
      'ochre-glaucous': { label: 'Ochre Red + Light Glaucous Blue', note: 'Varmt möter svalt. Det mest uttalade färgmötet — används sparsamt.' },
      'ivory-glaucous': { label: 'Ivory Buff + Light Glaucous Blue + Deep Indigo accent', note: 'Ljust och stilla. Deep Indigo förekommer bara som en liten detalj.' },
      'cameo-indigo': { label: 'Cameo Pink + Deep Indigo', note: 'Mjukt möter djupt. Cameo Pink gör Deep Indigo varmare.' },
      'vandyke-khaki': { label: 'Vandyke Brown + Khaki', note: 'Jordigt och dämpat. Khaki ger ljus åt Vandyke Brown.' },
      'ivory-cameo': { label: 'Ivory Buff + Cameo Pink + Vandyke Brown accent', note: 'Nästan monokromt och stilla, med en liten jordig markering.' },
    },
    accentNote: 'accent',
    piecesLabel: 'Smycken i CONNECT',
    figureNote: 'Färgstudie · ej produktbild',
    pieces: {
      'signature-pendant': {
        subtitle: 'Signaturhänge',
        roleLabel: 'Ankare · signaturpärla',
        description: 'En knut, en pärla. Den Ivory Buff-färgade signaturpärlan syns först — resten drar sig tillbaka mot Deep Indigo.',
      },
      'quiet-knot-earrings': {
        subtitle: 'Stilla knutörhängen, utan tofs',
        roleLabel: 'Stilla · utan tofs',
        description: 'Bara knuten, i en enda färg. Det stillaste smycket i familjen.',
      },
      'long-knot-earrings': {
        subtitle: 'Långa knutörhängen med tofs',
        roleLabel: 'Uttalat · med tofs',
        description: 'Rörelsen ligger i tofsen. Ingen pärla — knuten och tofsen räcker.',
      },
      'modular-bracelet': {
        subtitle: 'Modulärt armband',
        roleLabel: 'Modulärt · utbytbara delar',
        description: 'Delarna kan bytas mellan färgfamiljer. Deep Indigo är bara en liten pärla.',
      },
      'bag-charm': {
        subtitle: 'Väskberlock',
        roleLabel: 'Modulärt · jordiga accenter',
        description: 'Samma delar som hänget i jordiga toner: Vandyke Brown och Khaki, med en Ivory Buff-tofs.',
      },
    },
    elementsEyebrow: 'Utbytbara delar',
    elementsNote: 'Knut, pärla och tofs kan flytta mellan smycken och mellan färgfamiljer — en delmängd visas här, inte varje färg i varje del.',
    elementNames: {
      knot: { label: 'KNOT', description: 'Knut' },
      bead: { label: 'BEAD', description: 'Signaturpärla' },
      tassel: { label: 'TASSEL', description: 'Tofs' },
    },
    statusLabel: 'Status för bilder och text',
    disclosure:
      'Teckningarna är grafiska färgstudier, inte fotografier av färdiga fysiska produkter. Eventuella genererade konceptbilder är endast referenser för art direction och visas inte som produktbilder. Inga smycken är till salu, och konstruktion och material är ännu inte dokumenterade.',
    pending: [
      { label: 'Originalfoton från studion', status: 'Väntar' },
      { label: 'Makrofoto av den fysiska signaturpärlan', status: 'Väntar' },
      { label: 'Slutgodkännande av grundartexten', status: 'Godkänd av grundaren' },
    ],
  },
  modular: {
    eyebrow: 'En studie i förbindelser',
    title: 'Delar som byter färgfamilj.',
    intro:
      'Flytta färger fritt mellan knut, snodd, pärla och tofs — delarna behöver inte höra till samma färgfamilj. Börja i en av de sex färgkombinationerna och byt en del i taget.',
    note: 'Redaktionell prototyp, inte en e-handelskonfigurator. Schemat visar färgmöten, inte faktisk konstruktion eller material. Inget sparas eller beställs.',
    previewEyebrow: 'Färgstudie / ej produktbild',
    previewNote: 'Samma formspråk. Olika färger.',
    presetsEyebrow: 'Utgångspunkt',
    modules: {
      knot: { label: 'KNOT', description: 'Knuten · första förbindelsen' },
      cord: { label: 'CORD', description: 'Snodden · bärande linje' },
      bead: { label: 'BEAD', description: 'Pärlan · en gemensam detalj' },
      tassel: { label: 'TASSEL', description: 'Tofsen · form i rörelse' },
    },
    summaryPrefix: 'Din färgstudie:',
    link: 'Se den sammanbindande detaljen',
  },
  signatureBead: {
    marker: 'En sammanbindande detalj',
    title: 'SIGNATURPÄRLAN',
    subtitle: 'En detalj. En förbindande tråd.',
    paragraphs: [
      'Ett återkommande skulpturalt element som är format för att flytta mellan knutar, tofsar, smycken och plagg.',
      'Igenkännlig i sig själv. Gjord för att höra till något större.',
    ],
    colourNote: 'Samma form i varje färg. Ivory Buff är en egen smyckesfärg, inte en neutral bakgrund.',
    coloursLabel: 'Signaturpärlan i olika färger',
    coloursFootnote: 'Grafisk färgstudie, inte ett foto av den fysiska pärlan.',
    macro: {
      alt: 'Makrostudie av två blanka, glaserade pärlor med ett svängt tvåfärgsmönster och ett genomgående hål, en i Deep Indigo och rosa och en i Ivory och Ochre Red, på ljus linneduk. Konceptbild, inte ett foto av en färdig produkt.',
      label: 'Konceptbild · makrostudie',
      caption: 'Makrostudie av signaturpärlan som art direction-referens, inte ett fotografi av en färdig fysisk produkt.',
    },
    pendingPhoto: 'Studions makrofotografi av den fysiska pärlan inväntas.',
    imageBrief: 'Makrofotografi av signaturpärlan, med hela formen och hålets anslutning synliga.',
  },
  craft: {
    marker: 'Studio · form och material',
    eyebrow: 'Designbeslut i detalj',
    titleTop: 'Placering, balans',
    titleEm: 'och förbindelser.',
    text: 'En söm påverkar silhuetten. Material ger tyngd och balans. En knut förbinder linjer och detaljer till en helhet.',
    details: [
      { title: 'Sömmens placering', note: 'En linje som förändrar silhuetten.', alt: 'Grafisk närbild av en röd handsydd söm genom textil' },
      { title: 'Material i balans', note: 'Tyngd och struktur i relation till formen.', alt: 'Överlappande textilprover i studions färgpalett' },
      { title: 'Knuten som förbindelse', note: 'Linjer och detaljer knyts till en helhet.', alt: 'Grafisk detaljstudie av tråd, knut och tofs' },
    ],
    disclosure: 'Grafiska platshållare · Detaljstudier som ersätts med studions egna närbilder.',
  },
  about: {
    marker: 'Om studion',
    imageAlt:
      'Konceptbild i fem delar av studiomiljön: trådspolar, pärlor och armband, en docka med omlottskjorta och mönsterdelar, en läderväska med pärlberlock samt en moodboard med tygprover. Inte ett foto av färdiga produkter.',
    imageNote: 'Miljöbild · konceptbild, ej foto',
    quote: ['En liten studio', 'med många trådar.'],
    eyebrow: 'Grundarens text · godkänd',
    titleTop: 'En personlig erfarenhet.',
    titleEm: 'En tanke om proportion.',
    p1: 'Grundarens egen erfarenhet av petite-storlekar är utgångspunkten för idén om proportion: det räcker inte alltid att korta ett plagg.',
    p2: 'Längd, sömmarnas placering och materialets balans behöver samspela med personen som bär plagget. Den tanken binder samman plagg, mönster och detaljer.',
    link: 'Om petite och proportion',
  },
  newsletter: {
    eyebrow: 'Brev från studion',
    title: 'Nyheter, inte brus.',
    text: 'En plats för framtida anteckningar om form, material och designprocess. Nyhetsbrevet är inte öppet för anmälan.',
    formLabel: 'Förhandsvisning av nyhetsbrev',
    emailLabel: 'E-postadress',
    placeholder: 'namn@exempel.se',
    buttonLabel: 'Nyhetsbrevet är inte öppet ännu',
    button: 'Snart',
    note: 'Inaktivt prototypformulär. Inga uppgifter skickas eller lagras.',
  },
  footer: {
    thought: ['Gjord för proportion.', 'Skapad med avsikt.'],
    contactSoon: 'Kontaktfunktion öppnar snart.',
    newsletterLink: 'Om det kommande nyhetsbrevet',
    legal: '© 2026 HYANG-MEE STUDIO — DEMO',
    instagram: 'Instagram · snart',
    pinterest: 'Pinterest · snart',
  },
}

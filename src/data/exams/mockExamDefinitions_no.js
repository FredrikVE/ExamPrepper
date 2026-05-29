// src/data/exams/mockExamDefinitions_no.js
export const mockExamDefinitions_no = {
  id: "mock-exam-definitions-no",
  subjectId: "in5431",
  baseId: "mock-exam-definitions",
  lang: "no",
  title: "Øveeksamen: Viktige definisjoner",
  description: "Begrepsøving for IN5431: digitalisering, arkitektur, governance, prosess, business case, prosjekter, rammeverk og Designed for Digital.",
  questions: [
    {
      id: 1,
      type: "dragDrop",
      title: "Digitisering, digitalisering og digital transformasjon",
      points: 2,
      prompt: "Dra hvert begrep til den mest presise definisjonen.",
      source: "Fasit: IN5431, Designed for Digital og forelesning om digital strategy/digital transformation.",
      cards: [
        { id: "digitisering", text: "Digitisering" },
        { id: "digitalisering", text: "Digitalisering" },
        { id: "digital-transformasjon", text: "Digital transformasjon" },
        { id: "digital-strategy", text: "Digital strategy" }
      ],
      targets: [
        {
          id: "digitisering",
          description: "Teknisk omforming eller digital støtte til eksisterende informasjon/prosesser",
          correctCardId: "digitisering",
          correctLabel: "Digitisering",
          whyCorrect: "Digitisering er den mer tekniske siden: å gjøre informasjon eller eksisterende prosesser digitale.",
          whyWrong: "Denne definisjonen handler primært om teknisk digital representasjon eller støtte, ikke om bred organisatorisk endring.",
          whyExtended: ["Eksempel: å erstatte papirskjemaer med digitale skjemaer eller registrere data digitalt."]
        },
        {
          id: "digitalisering",
          description: "Sosio-teknisk endring der digitale ressurser brukes til å endre praksis, tjenester og verdiskaping",
          correctCardId: "digitalisering",
          correctLabel: "Digitalisering",
          whyCorrect: "Digitalisering handler om hvordan digital teknologi endrer arbeid, prosesser og verdiskaping.",
          whyWrong: "Denne definisjonen er bredere enn ren digitisering, men mindre total enn digital transformasjon.",
          whyExtended: ["Digitalisering berører samspillet mellom mennesker, prosesser og teknologi."]
        },
        {
          id: "digital-transformasjon",
          description: "Betydelig organisatorisk endring drevet eller muliggjort av omfattende bruk av digital teknologi",
          correctCardId: "digital-transformasjon",
          correctLabel: "Digital transformasjon",
          whyCorrect: "Digital transformasjon viser til større organisatoriske endringer over tid, ikke bare enkeltstående digitaliseringstiltak.",
          whyWrong: "Denne definisjonen beskriver omfattende organisatorisk endring, ikke bare ny programvare eller automatisering.",
          whyExtended: ["Digital transformasjon kan endre forretningsmodeller, organisasjonsstruktur, arbeidsprosesser og verdiforslag."]
        },
        {
          id: "digital-strategy",
          description: "En organisatorisk strategi formulert og gjennomført ved å bruke digitale ressurser til å skape differensiell verdi",
          correctCardId: "digital-strategy",
          correctLabel: "Digital strategy",
          whyCorrect: "Digital strategy handler om hvordan digitale ressurser brukes strategisk for å skape verdi.",
          whyWrong: "Dette er en strategi-definisjon, ikke en definisjon av transformasjon eller ren teknisk digitisering.",
          whyExtended: ["I pensum skilles digital strategi fra både business strategy og IT-strategy."]
        }
      ]
    },
    {
      id: 2,
      type: "single",
      title: "Hva er digital transformasjon?",
      points: 1,
      prompt: "Hvilket utsagn beskriver best digital transformasjon?",
      source: "Fasit: IN5431, forelesning om digital strategy and digital transformation.",
      options: [
        {
          text: "Betydelig organisatorisk endring drevet eller muliggjort av omfattende bruk av digital teknologi.",
          correct: true,
          why: "Riktig: digital transformasjon handler om omfattende organisatorisk endring, ikke bare enkeltstående IT-tiltak.",
          whyExtended: ["Begrepet peker på endringer i hvordan mennesker arbeider, hvordan prosesser organiseres og hvordan virksomheten skaper verdi."]
        },
        {
          text: "Å skanne papirskjemaer og lagre dem som PDF-er.",
          correct: false,
          why: "Feil: dette er et typisk eksempel på digitisering, ikke digital transformasjon.",
          whyExtended: ["Digital transformasjon krever mer enn teknisk omforming av informasjon."]
        },
        {
          text: "Å kjøpe et nytt IT-system uten å endre arbeidsprosesser eller organisering.",
          correct: false,
          why: "Feil: ny teknologi alene er ikke nok til å kalles digital transformasjon.",
          whyExtended: ["Pensum legger vekt på samspillet mellom mennesker, prosesser og teknologi."]
        },
        {
          text: "Å etablere en IT-avdeling som håndterer drift.",
          correct: false,
          why: "Feil: dette beskriver organisering av IT-funksjonen, ikke nødvendigvis transformasjon.",
          whyExtended: ["En IT-avdeling kan støtte transformasjon, men er ikke i seg selv digital transformasjon."]
        }
      ]
    },
    {
      id: 3,
      type: "drag-categorize",
      title: "Eksempler: digitisering, digitalisering og transformasjon",
      points: 2,
      prompt: "Dra hvert eksempel til riktig begrepskategori.",
      source: "Fasit: IN5431, digitalisering og digital transformasjon.",
      items: [
        { id: "scan-paper", label: "Skanne papirskjemaer" },
        { id: "digital-registration", label: "Registrere tidligere manuelle data digitalt" },
        { id: "change-workflow", label: "Endre arbeidsprosesser ved hjelp av digitale systemer" },
        { id: "data-customer", label: "Bruke data til å forbedre kundeopplevelsen" },
        { id: "new-business-model", label: "Utvikle en ny digital forretningsmodell" },
        { id: "org-redesign", label: "Omfattende prosess- og organisasjonsredesign" }
      ],
      categories: [
        { id: "digitisering", label: "Digitisering" },
        { id: "digitalisering", label: "Digitalisering" },
        { id: "digital-transformasjon", label: "Digital transformasjon" }
      ],
      correctAnswer: {
        digitisering: ["scan-paper", "digital-registration"],
        digitalisering: ["change-workflow", "data-customer"],
        "digital-transformasjon": ["new-business-model", "org-redesign"]
      },
      itemFeedback: {
        "scan-paper": { whyCorrect: "Å skanne papir er et teknisk eksempel på digitisering.", whyWrong: "Dette er teknisk omforming, ikke bred organisatorisk transformasjon.", whyExtended: ["Digitisering er ofte første steg, men ikke nok i seg selv."] },
        "digital-registration": { whyCorrect: "Digital registrering av tidligere manuelle data er digitisering.", whyWrong: "Dette handler om å gjøre data digitale, ikke om å endre forretningsmodell.", whyExtended: ["Eksempelet kan muliggjøre senere digitalisering."] },
        "change-workflow": { whyCorrect: "Når arbeidsprosesser endres med digital teknologi, er vi i digitalisering.", whyWrong: "Her endres praksis og prosess, ikke bare dataformat.", whyExtended: ["Digitalisering er sosio-teknisk: både teknologi og arbeid endres."] },
        "data-customer": { whyCorrect: "Bruk av data for bedre kundeopplevelse er digitalisering.", whyWrong: "Dette handler om verdiskaping og praksis, mer enn bare teknisk digitisering.", whyExtended: ["Kan bli del av digital transformasjon hvis det skaleres til større organisatorisk endring."] },
        "new-business-model": { whyCorrect: "Ny digital forretningsmodell er et typisk transformasjonseksempel.", whyWrong: "Dette er mer omfattende enn bare prosessforbedring.", whyExtended: ["Transformasjon handler ofte om nye verdiforslag og nye måter å organisere virksomheten på."] },
        "org-redesign": { whyCorrect: "Omfattende redesign av prosesser og organisasjon peker mot digital transformasjon.", whyWrong: "Dette er ikke bare digital støtte til en eksisterende prosess.", whyExtended: ["Transformasjon skjer når digitale ressurser endrer virksomhetens måte å fungere på."] }
      }
    },
    {
      id: 4,
      type: "dragDrop",
      title: "Arkitekturdefinisjoner",
      points: 2,
      prompt: "Dra hvert arkitekturbegrep til riktig definisjon.",
      source: "Fasit: IN5431, forelesning om IT Architecture og TOGAF.",
      cards: [
        { id: "architecture-design", text: "Architecture as design" },
        { id: "togaf-iso", text: "TOGAF / ISO-style definition" },
        { id: "togaf-structure", text: "TOGAF structural definition" },
        { id: "fowler", text: "Fowler perspective" },
        { id: "enterprise-architecture", text: "Enterprise Architecture" }
      ],
      targets: [
        {
          id: "architecture-design",
          description: "Design av et system eller en gruppe systemer",
          correctCardId: "architecture-design",
          correctLabel: "Architecture as design",
          whyCorrect: "Arkitektur handler alltid om design av et system eller en gruppe systemer.",
          whyWrong: "Denne definisjonen peker på det mest grunnleggende arkitekturpoenget: design.",
          whyExtended: ["I IT-sammenheng kan systemet være programvare, organisasjonens IT-portefølje eller en gruppe sammenkoblede systemer."]
        },
        {
          id: "togaf-iso",
          description: "Fundamentale konsepter eller egenskaper ved en entitet i sitt miljø og styrende prinsipper for realisering og evolusjon",
          correctCardId: "togaf-iso",
          correctLabel: "TOGAF / ISO-style definition",
          whyCorrect: "Dette er den brede TOGAF/ISO-lignende definisjonen av arkitektur.",
          whyWrong: "Nøkkelordene er fundamental concepts/properties, environment og governing principles.",
          whyExtended: ["Definisjonen inkluderer livsløp og utvikling over tid."]
        },
        {
          id: "togaf-structure",
          description: "Strukturen av komponenter, deres relasjoner, og prinsipper/retningslinjer for design og evolusjon over tid",
          correctCardId: "togaf-structure",
          correctLabel: "TOGAF structural definition",
          whyCorrect: "Dette er den mer strukturelle TOGAF-definisjonen av arkitektur.",
          whyWrong: "Nøkkelordene er components, interrelationships, principles and guidelines.",
          whyExtended: ["Denne definisjonen er nyttig når man skal forstå systemstruktur og utvikling over tid."]
        },
        {
          id: "fowler",
          description: "Arkitektur er 'the important stuff'",
          correctCardId: "fowler",
          correctLabel: "Fowler perspective",
          whyCorrect: "Fowler er kjent for et mer pragmatisk perspektiv: arkitektur er det viktige som er vanskelig å endre.",
          whyWrong: "Dette er ikke TOGAFs formelle definisjon, men Fowlers mer praktiske perspektiv.",
          whyExtended: ["Fowler-perspektivet er mer samarbeidsorientert og mindre top-down enn klassisk enterprise architecture."]
        },
        {
          id: "enterprise-architecture",
          description: "Helhetlig arbeid for å integrere fragmenterte prosesser/systemer slik at de støtter strategi og endring",
          correctCardId: "enterprise-architecture",
          correctLabel: "Enterprise Architecture",
          whyCorrect: "Enterprise Architecture handler om helheten på tvers av virksomheten.",
          whyWrong: "Denne definisjonen handler om portefølje, prosesser og strategi på virksomhetsnivå.",
          whyExtended: ["TOGAF er ett rammeverk for enterprise architecture."]
        }
      ]
    },
    {
      id: 5,
      type: "fill",
      title: "Architecture is always about...",
      points: 1,
      prompt: "Architecture is always about the ________ of a system — or a group of systems.",
      answers: ["design", "utforming"],
      answerKey: "design",
      source: "Fasit: IN5431, IT Architecture.",
      whyCorrect: "Arkitektur handler grunnleggende om design/utforming av systemer.",
      whyWrong: "Det sentrale ordet i formuleringen er design. Arkitektur er ikke bare dokumentasjon, kode eller drift."
    },
    {
      id: 6,
      type: "multi",
      title: "Hva inngår i TOGAF-definisjoner av arkitektur?",
      points: 2,
      prompt: "Marker utsagnene som passer med TOGAF/ISO-lignende definisjoner av architecture.",
      source: "Fasit: IN5431, TOGAF definition of architecture.",
      options: [
        { text: "Fundamental concepts or properties of an entity.", correct: true, why: "Riktig: dette inngår i den brede definisjonen.", whyExtended: ["Arkitektur beskriver fundamentale konsepter/egenskaper ved en entitet."] },
        { text: "The entity in its environment.", correct: true, why: "Riktig: miljøet rundt entiteten er del av definisjonen.", whyExtended: ["Arkitektur forstås ikke isolert, men i kontekst."] },
        { text: "Governing principles for realization and evolution.", correct: true, why: "Riktig: styrende prinsipper for realisering og evolusjon inngår.", whyExtended: ["Arkitektur handler også om hvordan systemet skal utvikles over tid."] },
        { text: "Structure of components and their interrelationships.", correct: true, why: "Riktig: komponenter og relasjoner er sentralt i den strukturelle definisjonen.", whyExtended: ["Denne delen peker på systemstruktur."] },
        { text: "Only the source code structure of one application.", correct: false, why: "Feil: TOGAF/EA er bredere enn kildekode i én applikasjon.", whyExtended: ["Arkitektur kan gjelde virksomhet, data, applikasjoner, teknologi og livsløp."] },
        { text: "Only project budget and timeline.", correct: false, why: "Feil: budsjett og tidsplan er prosjektstyring, ikke arkitekturdefinisjon.", whyExtended: ["Prosjektplaner kan påvirkes av arkitektur, men er ikke definisjonen av arkitektur."] }
      ]
    },
    {
      id: 7,
      type: "dragDrop",
      title: "TOGAF architecture taxonomy",
      points: 2,
      prompt: "Dra hver TOGAF-arkitekturtype til riktig forklaring.",
      source: "Fasit: IN5431, IT Architecture og TOGAF.",
      cards: [
        { id: "business-architecture", text: "Business Architecture" },
        { id: "data-architecture", text: "Data Architecture" },
        { id: "application-architecture", text: "Application Architecture" },
        { id: "technology-architecture", text: "Technology Architecture" }
      ],
      targets: [
        {
          id: "business-architecture",
          description: "Strategi, governance, organisasjon og sentrale forretningsprosesser",
          correctCardId: "business-architecture",
          correctLabel: "Business Architecture",
          whyCorrect: "Business Architecture beskriver virksomhetens prosesser, organisering, governance og strategiske kontekst.",
          whyWrong: "Denne forklaringen handler om business-laget, ikke data, applikasjoner eller teknologi.",
          whyExtended: ["Dette laget er koblingen mellom strategi og arkitekturarbeid."]
        },
        {
          id: "data-architecture",
          description: "Logiske og fysiske dataressurser og data management resources",
          correctCardId: "data-architecture",
          correctLabel: "Data Architecture",
          whyCorrect: "Data Architecture handler om dataressurser og hvordan de forvaltes.",
          whyWrong: "Nøkkelordet her er dataressurser, ikke applikasjoner eller infrastruktur.",
          whyExtended: ["Data Architecture er viktig for integrasjon og informasjonsflyt på tvers."]
        },
        {
          id: "application-architecture",
          description: "Applikasjoner, deres interaksjoner og forhold til forretningsprosesser",
          correctCardId: "application-architecture",
          correctLabel: "Application Architecture",
          whyCorrect: "Application Architecture beskriver applikasjonsporteføljen og hvordan applikasjoner støtter prosesser.",
          whyWrong: "Denne forklaringen handler om applikasjoner og deres samspill.",
          whyExtended: ["Det er her man ser hvordan systemer støtter forretningsbehov."]
        },
        {
          id: "technology-architecture",
          description: "Programvare, maskinvare, infrastruktur, middleware, nettverk og standarder",
          correctCardId: "technology-architecture",
          correctLabel: "Technology Architecture",
          whyCorrect: "Technology Architecture beskriver den tekniske infrastrukturen som applikasjoner og data bygger på.",
          whyWrong: "Nøkkelordene er infrastruktur, nettverk, middleware og tekniske standarder.",
          whyExtended: ["Dette laget legger grunnlaget for drift, integrasjon og tekniske kapabiliteter."]
        }
      ]
    },
    {
      id: 8,
      type: "single",
      title: "TOGAF ADM",
      points: 1,
      prompt: "Hva betyr ADM i TOGAF-sammenheng?",
      source: "Fasit: IN5431, TOGAF Architecture Development Method.",
      options: [
        { text: "Architecture Development Method — en strukturert metode for arkitekturarbeid.", correct: true, why: "Riktig: ADM er TOGAFs metode for å utvikle og forvalte arkitektur.", whyExtended: ["ADM er kjernen i TOGAF som rammeverk for enterprise architecture."] },
        { text: "Agile Delivery Model — en metode for sprintplanlegging.", correct: false, why: "Feil: dette blander TOGAF med agile delivery.", whyExtended: ["Scrum/SAFe er mer relevante for agile delivery."] },
        { text: "Application Data Matrix — en tabell for datakvalitet.", correct: false, why: "Feil: ADM står ikke for Application Data Matrix i TOGAF.", whyExtended: ["TOGAF har modeller og artefakter, men ADM betyr Architecture Development Method."] },
        { text: "Automated Decision Management — et system for automatiserte beslutninger.", correct: false, why: "Feil: dette er ikke TOGAFs ADM.", whyExtended: ["TOGAF handler om arkitekturarbeid, ikke automatisert beslutningsstyring som sådan."] }
      ]
    },
    {
      id: 9,
      type: "multi",
      title: "TOGAF vs Fowler",
      points: 2,
      prompt: "Marker utsagnene som passer med pensumets skille mellom TOGAF og Fowler-perspektivet.",
      source: "Fasit: IN5431, IT Architecture perspectives.",
      options: [
        { text: "TOGAF representerer et mer formelt arkitekturperspektiv.", correct: true, why: "Riktig: TOGAF er et formelt rammeverk for enterprise architecture.", whyExtended: ["Det gir metoder, begreper og arkitekturtaksonomi."] },
        { text: "TOGAF forbindes ofte med mer sentralisert arkitekturarbeid.", correct: true, why: "Riktig: i pensum knyttes TOGAF ofte til formell og sentralisert styring.", whyExtended: ["Dette står i kontrast til mer desentraliserte/agile perspektiver."] },
        { text: "Fowler beskriver arkitektur som 'the important stuff'.", correct: true, why: "Riktig: dette er den klassiske Fowler-formuleringen.", whyExtended: ["Poenget er at arkitektur handler om viktige beslutninger og strukturer som er vanskelige å endre."] },
        { text: "Fowler-perspektivet er mer samarbeidsorientert og desentralisert.", correct: true, why: "Riktig: pensum setter Fowler mer i retning av samarbeid og desentralisert orientering.", whyExtended: ["Dette kan passe bedre med agile arbeidsformer."] },
        { text: "Fowler er hovedsakelig et rammeverk for project governance.", correct: false, why: "Feil: project governance er mer PRINCE2 enn Fowler.", whyExtended: ["Fowler er relevant i diskusjoner om software architecture."] },
        { text: "TOGAF er hovedsakelig et rammeverk for IT Service Management.", correct: false, why: "Feil: IT Service Management hører til ITIL, ikke TOGAF.", whyExtended: ["TOGAF handler om enterprise architecture."] }
      ]
    },
    {
      id: 10,
      type: "dragDrop",
      title: "Governance, management og accountability",
      points: 2,
      prompt: "Dra hvert begrep til riktig forklaring.",
      source: "Fasit: IN5431, IT governance og Accountability Framework.",
      cards: [
        { id: "governance", text: "Governance" },
        { id: "management", text: "Management" },
        { id: "accountability", text: "Accountability" },
        { id: "decision-rights", text: "Decision rights" }
      ],
      targets: [
        { id: "governance", description: "Bestemmer hvem som tar beslutninger og hvem som holdes ansvarlig", correctCardId: "governance", correctLabel: "Governance", whyCorrect: "Governance handler om beslutningsrettigheter og ansvarlighet.", whyWrong: "Denne forklaringen handler om styringsstrukturen rundt beslutninger, ikke selve utførelsen.", whyExtended: ["IT governance handler ikke primært om å ta alle IT-beslutninger, men om hvem som systematisk skal ta og bidra til dem."] },
        { id: "management", description: "Tar og gjennomfører beslutninger innenfor styringsstrukturen", correctCardId: "management", correctLabel: "Management", whyCorrect: "Management handler om å lede og gjennomføre arbeid innenfor governance-rammene.", whyWrong: "Dette beskriver utførelse og ledelse, ikke fordelingen av beslutningsrettigheter.", whyExtended: ["Governance setter rammene; management handler om handling innenfor rammene."] },
        { id: "accountability", description: "Å være ansvarlig for resultater og konsekvenser", correctCardId: "accountability", correctLabel: "Accountability", whyCorrect: "Accountability betyr at noen holdes ansvarlig for resultatet.", whyWrong: "Nøkkelordet er ansvar for outcomes, ikke bare rett til å bestemme.", whyExtended: ["I D4D handler Accountability Framework om ansvar for digitale tilbud og komponenter."] },
        { id: "decision-rights", description: "Myndighet til å ta eller bidra til bestemte beslutninger", correctCardId: "decision-rights", correctLabel: "Decision rights", whyCorrect: "Decision rights beskriver hvem som har myndighet til å ta eller bidra til beslutninger.", whyWrong: "Dette handler om beslutningsmyndighet, ikke generell ansvarlighet eller drift.", whyExtended: ["Weill & Ross bruker decision rights som kjerne i IT governance."] }
      ]
    },
    {
      id: 11,
      type: "single",
      title: "Hva er IT governance primært?",
      points: 1,
      prompt: "Hva er IT governance primært opptatt av?",
      source: "Fasit: IN5431, IT governance, Weill & Ross.",
      options: [
        { text: "Å bestemme hvem som systematisk tar og bidrar til IT-beslutninger, og hvem som holdes ansvarlig.", correct: true, why: "Riktig: IT governance handler om decision rights og accountability.", whyExtended: ["Management tar beslutninger; governance bestemmer hvem som skal ta dem og hvordan ansvar fordeles."] },
        { text: "Å la IT-avdelingen ta alle beslutninger alene.", correct: false, why: "Feil: dette beskriver én mulig arketype, IT monarchy, ikke governance som helhet.", whyExtended: ["Governance kan være business monarchy, federal, duopoly, feudal, anarchy osv."] },
        { text: "Å skrive kildekode raskere.", correct: false, why: "Feil: dette handler mer om utviklingspraksis enn governance.", whyExtended: ["Governance er styring av beslutningsrettigheter og ansvar."] },
        { text: "Å velge programmeringsspråk for hvert prosjekt.", correct: false, why: "Feil: det kan være en teknisk beslutning, men er ikke selve definisjonen av IT governance.", whyExtended: ["Spørsmålet i governance er hvem som skal ha myndighet til slike beslutninger."] }
      ]
    },
    {
      id: 12,
      type: "dragDrop",
      title: "IT governance decision domains",
      points: 2,
      prompt: "Dra hvert beslutningsdomene til riktig forklaring.",
      source: "Fasit: IN5431, IT governance decision domains.",
      cards: [
        { id: "it-principles", text: "IT principles" },
        { id: "it-architecture", text: "IT architecture" },
        { id: "it-infrastructure", text: "IT infrastructure strategies" },
        { id: "business-application-needs", text: "Business application needs" },
        { id: "it-investment", text: "IT investment" }
      ],
      targets: [
        { id: "it-principles", description: "ITs rolle, ønsket atferd og overordnede finansierings-/styringsprinsipper", correctCardId: "it-principles", correctLabel: "IT principles", whyCorrect: "IT principles handler om de overordnede prinsippene for ITs rolle i virksomheten.", whyWrong: "Denne forklaringen er overordnet og prinsipiell, ikke en konkret applikasjonsbeslutning.", whyExtended: ["Domenet oversetter forretningsprinsipper til IT-prinsipper."] },
        { id: "it-architecture", description: "Integrasjon, standardisering og logikk for kjerneprosesser/data", correctCardId: "it-architecture", correctLabel: "IT architecture", whyCorrect: "IT architecture handler om standardisering, integrasjon og kjerneprosesser.", whyWrong: "Nøkkelordene er integration og standardization.", whyExtended: ["Dette domenet henger sammen med operating model og enterprise architecture."] },
        { id: "it-infrastructure", description: "Felles tekniske tjenester og infrastrukturkapabiliteter", correctCardId: "it-infrastructure", correctLabel: "IT infrastructure strategies", whyCorrect: "IT infrastructure strategies handler om felles infrastruktur og tekniske tjenester.", whyWrong: "Dette er mer grunnleggende teknisk plattform enn business application needs.", whyExtended: ["Eksempler kan være nettverk, identitetstjenester, sikkerhet og felles plattformtjenester."] },
        { id: "business-application-needs", description: "Forretningskrav og muligheter for nye eller endrede applikasjoner", correctCardId: "business-application-needs", correctLabel: "Business application needs", whyCorrect: "Business application needs starter i forretningsenhetenes behov for applikasjoner.", whyWrong: "Denne forklaringen handler om konkrete applikasjonsbehov, ikke overordnet prinsipp eller infrastruktur.", whyExtended: ["Her vurderes behov for nye systemer eller endringer i eksisterende systemer."] },
        { id: "it-investment", description: "Finansiering, prioritering og porteføljebeslutninger", correctCardId: "it-investment", correctLabel: "IT investment", whyCorrect: "IT investment handler om hvilke IT-initiativer som skal finansieres og prioriteres.", whyWrong: "Når spørsmålet handler om funding og prioritering, er det investeringsdomenet.", whyExtended: ["Dette domenet kobler IT-porteføljen til virksomhetens strategiske prioriteringer."] }
      ]
    },
    {
      id: 13,
      type: "dragDrop",
      title: "IT governance archetypes",
      points: 2,
      prompt: "Dra hver styringsarketype til riktig beslutningslogikk.",
      source: "Fasit: IN5431, Weill & Ross governance archetypes.",
      cards: [
        { id: "business-monarchy", text: "Business monarchy" },
        { id: "it-monarchy", text: "IT monarchy" },
        { id: "federal", text: "Federal" },
        { id: "it-duopoly", text: "IT duopoly" },
        { id: "feudal", text: "Feudal" },
        { id: "anarchy", text: "Anarchy" }
      ],
      targets: [
        { id: "business-monarchy", description: "Toppledere i virksomheten tar beslutningen", correctCardId: "business-monarchy", correctLabel: "Business monarchy", whyCorrect: "Business monarchy betyr at senior business executives bestemmer.", whyWrong: "Nøkkelordet er toppledere i forretningen, ikke IT-ledere eller lokale enheter.", whyExtended: ["CIO kan være med, men arketypen er business-ledet."] },
        { id: "it-monarchy", description: "IT-ledere tar beslutningen", correctCardId: "it-monarchy", correctLabel: "IT monarchy", whyCorrect: "IT monarchy betyr at IT-ledere har beslutningsretten.", whyWrong: "Nøkkelordet er IT-ledere.", whyExtended: ["Dette er en sentralisert IT-ledet arketype."] },
        { id: "federal", description: "Corporate-level og business unit-ledere deler beslutningsmyndighet", correctCardId: "federal", correctLabel: "Federal", whyCorrect: "Federal kombinerer sentralt nivå og forretningsenheter.", whyWrong: "Denne forklaringen handler om en føderal modell, ikke bare IT + én forretningsgruppe.", whyExtended: ["Analogien er sentralregjering og delstater."] },
        { id: "it-duopoly", description: "IT-ledere og forretningsrepresentanter bestemmer sammen", correctCardId: "it-duopoly", correctLabel: "IT duopoly", whyCorrect: "IT duopoly er en to-parti-modell: IT + business.", whyWrong: "Nøkkelordene er IT-ledere og forretningsrepresentanter sammen.", whyExtended: ["Duopoly er smalere enn federal."] },
        { id: "feudal", description: "Forretningsenheter bestemmer uavhengig av hverandre", correctCardId: "feudal", correctLabel: "Feudal", whyCorrect: "Feudal betyr at business units tar egne separate beslutninger.", whyWrong: "Dette er desentralisering til forretningsenheter, ikke til individuelle brukere.", whyExtended: ["Kan gi lokal tilpasning, men kan svekke standardisering."] },
        { id: "anarchy", description: "Individuelle brukere eller små grupper følger sin egen IT-agenda", correctCardId: "anarchy", correctLabel: "Anarchy", whyCorrect: "Anarchy er den mest desentraliserte arketypen.", whyWrong: "Nøkkelordet er individuelle brukere/små grupper.", whyExtended: ["Dette kan gi stor frihet, men ofte lav standardisering og kontroll."] }
      ]
    },
    {
      id: 14,
      type: "fill",
      title: "Business process",
      points: 1,
      prompt: "A business process is a set of ________ with a logical order and dependencies, aiming to produce a desired result.",
      answers: ["activities", "aktiviteter"],
      answerKey: "activities / aktiviteter",
      source: "Fasit: IN5431, Business processes and IT Architecture.",
      whyCorrect: "En business process består av aktiviteter med logisk orden og avhengigheter.",
      whyWrong: "Det manglende ordet er activities/aktiviteter. Prosessbegrepet handler om aktiviteter som produserer et ønsket resultat."
    },
    {
      id: 15,
      type: "dragDrop",
      title: "Prosessbegreper",
      points: 2,
      prompt: "Dra hvert prosessbegrep til riktig forklaring.",
      source: "Fasit: IN5431, business process modeling og BPMN.",
      cards: [
        { id: "business-process", text: "Business process" },
        { id: "bpmn", text: "BPMN" },
        { id: "swimlane", text: "Swimlane" },
        { id: "sequence-flow", text: "Sequence flow" },
        { id: "manual-activity", text: "Manual activity" },
        { id: "automatic-activity", text: "Automatic activity" }
      ],
      targets: [
        { id: "business-process", description: "Aktiviteter med logisk orden og avhengigheter som produserer et ønsket resultat", correctCardId: "business-process", correctLabel: "Business process", whyCorrect: "Dette er definisjonen av en forretningsprosess.", whyWrong: "Forklaringen beskriver hele prosessen, ikke en enkelt BPMN-notasjon.", whyExtended: ["Prosesser kan modelleres på ulike detaljnivåer."] },
        { id: "bpmn", description: "Vanlig formell notasjon for å modellere prosesser", correctCardId: "bpmn", correctLabel: "BPMN", whyCorrect: "BPMN er en vanlig notasjon for prosessmodellering.", whyWrong: "Dette beskriver et modelleringsspråk, ikke en aktivitet eller rolle.", whyExtended: ["BPMN brukes til å vise hendelser, aktiviteter, flyt og ansvar."] },
        { id: "swimlane", description: "Viser roller eller aktører som har ansvar for aktiviteter i prosessen", correctCardId: "swimlane", correctLabel: "Swimlane", whyCorrect: "Swimlanes viser hvem som gjør hva i prosessen.", whyWrong: "Nøkkelordet er roller/aktører.", whyExtended: ["I Umbrella Heaven-eksempelet vises kunde, virksomhet og betalingsleverandør i ulike baner."] },
        { id: "sequence-flow", description: "Viser rekkefølgen mellom aktiviteter", correctCardId: "sequence-flow", correctLabel: "Sequence flow", whyCorrect: "Sequence flow viser flyten/rekkefølgen i prosessen.", whyWrong: "Dette handler om piler/flyt mellom aktiviteter.", whyExtended: ["Det viser logisk rekkefølge og avhengighet."] },
        { id: "manual-activity", description: "Aktivitet som utføres manuelt av en person", correctCardId: "manual-activity", correctLabel: "Manual activity", whyCorrect: "Manual activity er en aktivitet utført av et menneske.", whyWrong: "Nøkkelordet er manuelt.", whyExtended: ["I prosessmodeller skilles ofte manuelle og automatiserte aktiviteter."] },
        { id: "automatic-activity", description: "Aktivitet som utføres automatisk av et system", correctCardId: "automatic-activity", correctLabel: "Automatic activity", whyCorrect: "Automatic activity utføres av et system.", whyWrong: "Nøkkelordet er automatisk/systemutført.", whyExtended: ["Automatiserte aktiviteter er viktige for å forstå koblingen mellom prosess og IT-systemer."] }
      ]
    },
    {
      id: 16,
      type: "single",
      title: "Hvorfor bryr CIO-er seg om prosesser?",
      points: 1,
      prompt: "Hvorfor er business processes relevante for CIO-er og IT-arkitektur?",
      source: "Fasit: IN5431, Business processes and IT Architecture.",
      options: [
        { text: "Fordi prosesser viser hvordan arbeid, systemer, roller og avhengigheter henger sammen.", correct: true, why: "Riktig: prosessmodeller gjør koblingen mellom mennesker, arbeid og systemer synlig.", whyExtended: ["Dette er nødvendig for å analysere og endre IT-porteføljen og organisasjonens arbeidsmåter."] },
        { text: "Fordi prosessmodeller erstatter strategi.", correct: false, why: "Feil: prosessmodeller støtter analyse og endring, men erstatter ikke strategi.", whyExtended: ["Strategi svarer på hva virksomheten skal oppnå; prosessmodeller hjelper å forstå hvordan arbeid utføres."] },
        { text: "Fordi alle prosesser alltid bør automatiseres fullt ut.", correct: false, why: "Feil: pensum sier ikke at alle prosesser bør automatiseres.", whyExtended: ["Poenget er å forstå prosesser og vurdere hensiktsmessige endringer."] },
        { text: "Fordi business processes bare er tekniske workflows.", correct: false, why: "Feil: forretningsprosesser inkluderer mennesker, roller, aktiviteter og organisasjon, ikke bare teknologi.", whyExtended: ["Prosessanalyse er sosio-teknisk."] }
      ]
    },
    {
      id: 17,
      type: "dragDrop",
      title: "Generisk beslutningsmodell",
      points: 2,
      prompt: "Dra hvert steg i den generiske beslutningsmodellen til riktig forklaring.",
      source: "Fasit: IN5431, CIO Toolbox 1, generic decision-making process.",
      cards: [
        { id: "understand", text: "Understand the situation" },
        { id: "synthesize", text: "Synthesize options" },
        { id: "evaluate", text: "Evaluate and propose" }
      ],
      targets: [
        { id: "understand", description: "Analyser problemet, konteksten og hvorfor situasjonen er som den er", correctCardId: "understand", correctLabel: "Understand the situation", whyCorrect: "Første steg er å forstå situasjonen og rotårsakene.", whyWrong: "Dette er analysefasen før man lager løsninger.", whyExtended: ["Her vurderes blant annet intern kompetanse, tekniske assets og kulturelle faktorer."] },
        { id: "synthesize", description: "Utvikle alternative handlinger eller konsepter", correctCardId: "synthesize", correctLabel: "Synthesize options", whyCorrect: "Andre steg er å lage alternative konsepter eller handlingsvalg.", whyWrong: "Dette handler om å skape alternativer, ikke evaluere dem ennå.", whyExtended: ["Målet er å sikre at relevante alternativer faktisk vurderes."] },
        { id: "evaluate", description: "Sammenlign alternativer og anbefal et valg", correctCardId: "evaluate", correctLabel: "Evaluate and propose", whyCorrect: "Tredje steg er evaluering og anbefaling.", whyWrong: "Dette er steget der man bruker business case, plus/minus-metode eller andre evalueringsmåter.", whyExtended: ["Detaljnivået bør skaleres etter beslutningens konsekvens, usikkerhet og tillit."] }
      ]
    },
    {
      id: 18,
      type: "dragDrop",
      title: "Business case-begreper",
      points: 3,
      prompt: "Dra hvert business case-begrep til riktig forklaring.",
      source: "Fasit: IN5431, Business case, NPV og alternative analysis.",
      cards: [
        { id: "expected-benefit", text: "Expected benefit" },
        { id: "expected-cost", text: "Expected cost" },
        { id: "timing", text: "Timing" },
        { id: "risk", text: "Risk" },
        { id: "npv", text: "NPV" },
        { id: "discount-rate", text: "Discount rate" },
        { id: "risk-premium", text: "Risk premium" }
      ],
      targets: [
        { id: "expected-benefit", description: "Hvilken verdi alternativet forventes å skape", correctCardId: "expected-benefit", correctLabel: "Expected benefit", whyCorrect: "Expected benefit er forventet nytte/verdi.", whyWrong: "Dette handler om nyttesiden, ikke kostnad eller risiko.", whyExtended: ["Nytte kan være kvantifiserbar eller ikke-kvantifiserbar."] },
        { id: "expected-cost", description: "Hva alternativet forventes å kreve av ressurser", correctCardId: "expected-cost", correctLabel: "Expected cost", whyCorrect: "Expected cost er forventet kostnad/ressursbruk.", whyWrong: "Dette handler om hva alternativet krever, ikke hva det skaper.", whyExtended: ["Kostnad kan være investering, drift, vedlikehold eller endringskostnad."] },
        { id: "timing", description: "Når gevinster og kostnader oppstår", correctCardId: "timing", correctLabel: "Timing", whyCorrect: "Timing handler om når kontantstrømmer og gevinster kommer.", whyWrong: "Dette er tidsdimensjonen i business case.", whyExtended: ["Timing er sentralt i NPV fordi fremtidige gevinster diskonteres."] },
        { id: "risk", description: "Sannsynligheten for at gevinster eller kostnader avviker fra estimatene", correctCardId: "risk", correctLabel: "Risk", whyCorrect: "Risk handler om usikkerhet i estimater.", whyWrong: "Dette handler om avvik fra forventning, ikke selve kostnaden.", whyExtended: ["Risiko kan håndteres med risikopremie eller sensitivitet i estimater."] },
        { id: "npv", description: "Nåverdi av fremtidige kontantstrømmer minus investeringskostnad", correctCardId: "npv", correctLabel: "NPV", whyCorrect: "NPV sammenligner nåverdien av fremtidige kontantstrømmer med investeringskostnaden.", whyWrong: "Dette er den kvantitative business case-beregningen.", whyExtended: ["NPV brukes til å sammenligne alternativer økonomisk."] },
        { id: "discount-rate", description: "Renten som brukes til å diskontere fremtidige kontantstrømmer til nåverdi", correctCardId: "discount-rate", correctLabel: "Discount rate", whyCorrect: "Diskonteringsrenten konverterer fremtidige verdier til nåverdi.", whyWrong: "Dette er satsen i NPV-beregningen, ikke totalbudsjettet.", whyExtended: ["Høyere diskonteringsrente gjør fremtidige gevinster mindre verdt i dag."] },
        { id: "risk-premium", description: "Ekstra påslag i diskonteringen for å reflektere usikkerhet", correctCardId: "risk-premium", correctLabel: "Risk premium", whyCorrect: "Risk premium er et risikopåslag som kan øke diskonteringsrenten.", whyWrong: "Dette handler om risikojustering, ikke en ordinær kostnadspost.", whyExtended: ["I forelesningseksempler brukes ulik risikopremie for ulike alternativer."] }
      ]
    },
    {
      id: 19,
      type: "single",
      title: "Diskonteringsrente",
      points: 1,
      prompt: "Hva er rollen til diskonteringsrenten i NPV?",
      source: "Fasit: IN5431, Business case og NPV.",
      options: [
        { text: "Den konverterer fremtidige kontantstrømmer til nåverdi.", correct: true, why: "Riktig: diskonteringsrenten brukes for å regne fremtidige verdier om til verdi i dag.", whyExtended: ["Dette gjør timing og risiko relevante i business case."] },
        { text: "Den fjerner all prosjektrisiko.", correct: false, why: "Feil: diskonteringsrenten kan reflektere risiko, men fjerner den ikke.", whyExtended: ["Estimater er fortsatt usikre."] },
        { text: "Den beregner totalbudsjettet direkte.", correct: false, why: "Feil: budsjettet er en kostnadsestimering; diskonteringsrenten brukes i nåverdiberegning.", whyExtended: ["Discount rate er ikke det samme som total cost."] },
        { text: "Den rangerer kvalitative gevinster automatisk.", correct: false, why: "Feil: kvalitative gevinster må vurderes separat.", whyExtended: ["Business case er mer enn NPV; non-quantifiable benefits må også vurderes."] }
      ]
    },
    {
      id: 20,
      type: "drag-categorize",
      title: "Kvantifiserbare og ikke-kvantifiserbare gevinster",
      points: 2,
      prompt: "Dra hvert eksempel til riktig type gevinst i en business case.",
      source: "Fasit: IN5431, Business case.",
      items: [
        { id: "time-saved", label: "Tidsbesparelse" },
        { id: "conversion-rate", label: "Økt konverteringsrate" },
        { id: "reduced-cost", label: "Reduserte driftskostnader" },
        { id: "increased-revenue", label: "Økte inntekter" },
        { id: "compliance", label: "Compliance" },
        { id: "security", label: "Sikkerhet" },
        { id: "safety", label: "Safety" },
        { id: "reputation", label: "Bedre omdømme" }
      ],
      categories: [
        { id: "quantifiable", label: "Quantifiable benefits" },
        { id: "non-quantifiable", label: "Non-quantifiable benefits" }
      ],
      correctAnswer: {
        quantifiable: ["time-saved", "conversion-rate", "reduced-cost", "increased-revenue"],
        "non-quantifiable": ["compliance", "security", "safety", "reputation"]
      },
      itemFeedback: {
        "time-saved": { whyCorrect: "Tidsbesparelse kan ofte måles og verdsettes.", whyWrong: "Dette er typisk kvantifiserbart.", whyExtended: ["Tid kan omregnes til kostnad eller kapasitet."] },
        "conversion-rate": { whyCorrect: "Konverteringsrate er en målbar gevinst.", whyWrong: "Dette er kvantitativt fordi det kan måles i prosent/tall.", whyExtended: ["Relevansen avhenger av type digital tjeneste."] },
        "reduced-cost": { whyCorrect: "Reduserte kostnader er kvantifiserbare.", whyWrong: "Dette er en økonomisk effekt som kan tallfestes.", whyExtended: ["Kostnadsreduksjon er ofte sentralt i NPV."] },
        "increased-revenue": { whyCorrect: "Økte inntekter er kvantifiserbare.", whyWrong: "Dette er en monetær gevinst.", whyExtended: ["Forventet inntekt kan inngå i kontantstrømmer."] },
        compliance: { whyCorrect: "Compliance er ofte viktig, men vanskelig å tallfeste direkte.", whyWrong: "Dette er typisk ikke-kvantifiserbar nytte.", whyExtended: ["Kan likevel være avgjørende for valg."] },
        security: { whyCorrect: "Sikkerhet er ofte en ikke-kvantifiserbar eller vanskelig kvantifiserbar gevinst.", whyWrong: "Sikkerhet er sjelden fullt fanget i enkel NPV.", whyExtended: ["Risiko og konsekvenser kan vurderes kvalitativt."] },
        safety: { whyCorrect: "Safety er ofte en ikke-kvantifiserbar gevinst.", whyWrong: "Safety handler om trygghet/skadeforebygging, ikke nødvendigvis direkte inntekt.", whyExtended: ["I noen sektorer kan dette være helt avgjørende."] },
        reputation: { whyCorrect: "Omdømme er vanligvis vanskelig å tallfeste presist.", whyWrong: "Dette er typisk kvalitativ gevinst.", whyExtended: ["Kan påvirke verdi, men er ofte usikkert å måle direkte."] }
      }
    },
    {
      id: 21,
      type: "dragDrop",
      title: "Prosjekt og triple constraint",
      points: 2,
      prompt: "Dra hvert prosjektbegrep til riktig forklaring.",
      source: "Fasit: IN5431, Projects og triple constraint.",
      cards: [
        { id: "project", text: "Project" },
        { id: "scope", text: "Scope" },
        { id: "time", text: "Time" },
        { id: "cost", text: "Cost" },
        { id: "triple-constraint", text: "Triple constraint" },
        { id: "prince2", text: "PRINCE2" }
      ],
      targets: [
        { id: "project", description: "Midlertidig organisasjon som leverer spesifiserte resultater innen en spesifisert periode", correctCardId: "project", correctLabel: "Project", whyCorrect: "Et prosjekt er en temporary organization med spesifiserte resultater og tidsrom.", whyWrong: "Denne definisjonen beskriver prosjekt, ikke et rammeverk eller én begrensning.", whyExtended: ["Prosjekter brukes til å organisere utvikling og endring."] },
        { id: "scope", description: "Hva prosjektet forventes å levere", correctCardId: "scope", correctLabel: "Scope", whyCorrect: "Scope beskriver leveranseomfanget.", whyWrong: "Dette handler om hva som skal leveres, ikke tid eller kostnad.", whyExtended: ["Endringer i scope påvirker ofte tid og kostnad."] },
        { id: "time", description: "Tidsplan eller deadline", correctCardId: "time", correctLabel: "Time", whyCorrect: "Time er tidsbegrensningen i triple constraint.", whyWrong: "Nøkkelordene er tidsplan/deadline.", whyExtended: ["Kortere tid kan kreve mer ressurser eller redusert scope."] },
        { id: "cost", description: "Budsjett eller ressursbegrensning", correctCardId: "cost", correctLabel: "Cost", whyCorrect: "Cost er budsjett-/ressursbegrensningen.", whyWrong: "Dette handler om ressursbruk, ikke hva som skal leveres.", whyExtended: ["Kostnad påvirkes av scope og time."] },
        { id: "triple-constraint", description: "Scope, time og cost samlet", correctCardId: "triple-constraint", correctLabel: "Triple constraint", whyCorrect: "Triple constraint er trekanten mellom scope, time og cost.", whyWrong: "Dette beskriver kombinasjonen av de tre begrensningene.", whyExtended: ["Når alle tre låses, blir prosjektet sårbart."] },
        { id: "prince2", description: "Rammeverk for project governance and management", correctCardId: "prince2", correctLabel: "PRINCE2", whyCorrect: "PRINCE2 er et prosjektstyringsrammeverk.", whyWrong: "Dette er ikke en begrensning, men et rammeverk for prosjektstyring.", whyExtended: ["PRINCE2 har prinsipper, temaer og prosesser."] }
      ]
    },
    {
      id: 22,
      type: "single",
      title: "Hva er problemet med triple constraint?",
      points: 1,
      prompt: "Hva er hovedpoenget med triple constraint i prosjektstyring?",
      source: "Fasit: IN5431, Projects og triple constraint.",
      options: [
        { text: "Hvis scope, time og cost alle er fastlåst, blir prosjektet sårbart.", correct: true, why: "Riktig: når alle tre begrensninger låses, blir det lite handlingsrom.", whyExtended: ["Endring eller usikkerhet må da tas ut som redusert kvalitet, stress, forsinkelser eller skuffelse."] },
        { text: "Et prosjekt lykkes alltid hvis alle tre er fastlåst på forhånd.", correct: false, why: "Feil: dette er motsatt av læringspoenget.", whyExtended: ["Fastlåsing av alt kan gi urealistiske forventninger."] },
        { text: "Triple constraint handler bare om kostnader.", correct: false, why: "Feil: det handler om scope, time og cost samlet.", whyExtended: ["Trekanten viser avhengigheten mellom de tre."] },
        { text: "Triple constraint brukes bare i agile produktteam.", correct: false, why: "Feil: triple constraint er særlig knyttet til prosjektstyring.", whyExtended: ["Produktteam-logikk er mer kontinuerlig og outcome-orientert."] }
      ]
    },
    {
      id: 23,
      type: "drag-categorize",
      title: "Project vs product team",
      points: 2,
      prompt: "Dra hvert utsagn til riktig organiseringslogikk.",
      source: "Fasit: IN5431, Projects, products and agile methods.",
      items: [
        { id: "temporary", label: "Temporary organization" },
        { id: "specified-result", label: "Specified result" },
        { id: "specified-period", label: "Specified period" },
        { id: "scope-time-cost", label: "Scope/time/cost constraints" },
        { id: "lasting-ownership", label: "Lasting ownership" },
        { id: "continuous-development", label: "Continuous development" },
        { id: "outcome-output", label: "Outcome over output" },
        { id: "operate-improve", label: "Operates and improves a product over time" }
      ],
      categories: [
        { id: "project", label: "Project" },
        { id: "product-team", label: "Product team" }
      ],
      correctAnswer: {
        project: ["temporary", "specified-result", "specified-period", "scope-time-cost"],
        "product-team": ["lasting-ownership", "continuous-development", "outcome-output", "operate-improve"]
      },
      itemFeedback: {
        temporary: { whyCorrect: "Prosjekter er midlertidige organisasjoner.", whyWrong: "Midlertidighet er prosjektlogikk, ikke produktteamlogikk.", whyExtended: ["Prosjektet avsluttes når leveransen er ferdig."] },
        "specified-result": { whyCorrect: "Prosjekter etableres for å levere spesifiserte resultater.", whyWrong: "Produktteam har mer varig ansvar over tid.", whyExtended: ["Prosjektet har en definert leveranse."] },
        "specified-period": { whyCorrect: "Prosjekter har en spesifisert periode.", whyWrong: "Produktteam er mer varige.", whyExtended: ["Tidsavgrensningen er sentral i prosjektdefinisjonen."] },
        "scope-time-cost": { whyCorrect: "Scope/time/cost er klassisk prosjektstyring.", whyWrong: "Triple constraint hører primært til prosjektlogikk.", whyExtended: ["Alle tre fastlåst gjør prosjektet sårbart."] },
        "lasting-ownership": { whyCorrect: "Produktteam har varig eierskap til produkt/tjeneste.", whyWrong: "Varig eierskap passer bedre med produktteam enn prosjekt.", whyExtended: ["Teamet følger produktet over tid."] },
        "continuous-development": { whyCorrect: "Kontinuerlig utvikling er produktteamlogikk.", whyWrong: "Prosjekter har vanligvis start og slutt.", whyExtended: ["Produktteam kombinerer utvikling og drift over tid."] },
        "outcome-output": { whyCorrect: "Outcome over output er typisk produktteam-/agile-logikk.", whyWrong: "Prosjekter er ofte mer leveranse-/output-orienterte.", whyExtended: ["Outcome handler om faktisk verdi/effekt."] },
        "operate-improve": { whyCorrect: "Å drifte og forbedre over tid passer med produktteam.", whyWrong: "Dette er ikke midlertidig prosjektlogikk.", whyExtended: ["Produktteam har kontinuerlig ansvar."] }
      }
    },
    {
      id: 24,
      type: "dragDrop",
      title: "Frameworks and intended use",
      points: 2,
      prompt: "Dra hvert rammeverk til riktig intended usage.",
      source: "Fasit: IN5431, Frameworks and best practice.",
      cards: [
        { id: "togaf", text: "TOGAF" },
        { id: "prince2", text: "PRINCE2" },
        { id: "scrum", text: "Scrum" },
        { id: "safe", text: "SAFe" },
        { id: "itil", text: "ITIL" },
        { id: "prosci-adkar", text: "Prosci / ADKAR" }
      ],
      targets: [
        { id: "togaf", description: "Enterprise architecture", correctCardId: "togaf", correctLabel: "TOGAF", whyCorrect: "TOGAF er et enterprise architecture-rammeverk.", whyWrong: "Enterprise architecture peker på TOGAF.", whyExtended: ["TOGAF knyttes til IT Architecture i CIO toolboxen."] },
        { id: "prince2", description: "Project governance and management", correctCardId: "prince2", correctLabel: "PRINCE2", whyCorrect: "PRINCE2 er for project governance and management.", whyWrong: "Project governance and management peker på PRINCE2.", whyExtended: ["PRINCE2 er knyttet til Projects i CIO toolboxen."] },
        { id: "scrum", description: "Agile software delivery", correctCardId: "scrum", correctLabel: "Scrum", whyCorrect: "Scrum er et smidig rammeverk for software delivery.", whyWrong: "Agile software delivery peker på Scrum.", whyExtended: ["Scrum knyttes til product teams and agile methods."] },
        { id: "safe", description: "Scaled agile software delivery", correctCardId: "safe", correctLabel: "SAFe", whyCorrect: "SAFe står for Scaled Agile Framework og handler om skalering av agile.", whyWrong: "Scaled agile software delivery peker på SAFe.", whyExtended: ["SAFe knyttes også til product teams and agile methods."] },
        { id: "itil", description: "IT Service Management", correctCardId: "itil", correctLabel: "ITIL", whyCorrect: "ITIL er et rammeverk for IT Service Management.", whyWrong: "IT Service Management peker på ITIL.", whyExtended: ["ITIL er relevant for IT management, men ikke et kjerneverktøy i CIO toolboxen."] },
        { id: "prosci-adkar", description: "Change management", correctCardId: "prosci-adkar", correctLabel: "Prosci / ADKAR", whyCorrect: "Prosci/ADKAR er modeller for change management.", whyWrong: "Change management peker på Prosci/ADKAR.", whyExtended: ["Change management er relevant for IT-ledelse, men står utenfor selve CIO toolbox-tabellen."] }
      ]
    },
    {
      id: 25,
      type: "drag-categorize",
      title: "Frameworks: kobling til CIO toolbox",
      points: 2,
      prompt: "Dra rammeverkene til kategorien som samsvarer med pilene i figuren 'Frameworks and best practice'.",
      source: "Fasit: IN5431, Frameworks and best practice / CIO toolbox slide.",
      items: [
        { id: "togaf", label: "TOGAF" },
        { id: "prince2", label: "PRINCE2" },
        { id: "scrum", label: "Scrum" },
        { id: "safe", label: "SAFe" },
        { id: "itil", label: "ITIL" },
        { id: "prosci-adkar", label: "Prosci / ADKAR model" }
      ],
      categories: [
        { id: "it-architecture", label: "IT Architecture" },
        { id: "projects", label: "Projects" },
        { id: "product-teams", label: "Product teams and agile methods" },
        { id: "not-used", label: "Not used in CIO-toolbox" }
      ],
      correctAnswer: {
        "it-architecture": ["togaf"],
        projects: ["prince2"],
        "product-teams": ["scrum", "safe"],
        "not-used": ["itil", "prosci-adkar"]
      },
      itemFeedback: {
        togaf: { whyCorrect: "TOGAF peker til IT Architecture i figuren.", whyWrong: "TOGAF er enterprise architecture og kobles til IT Architecture.", whyExtended: ["TOGAF er et rammeverk for arkitekturarbeid."] },
        prince2: { whyCorrect: "PRINCE2 peker til Projects i figuren.", whyWrong: "PRINCE2 er project governance and management.", whyExtended: ["Derfor kobles det til prosjektverktøyet."] },
        scrum: { whyCorrect: "Scrum peker til Product teams and agile methods.", whyWrong: "Scrum er agile software delivery.", whyExtended: ["Scrum hører til smidige metoder."] },
        safe: { whyCorrect: "SAFe peker til Product teams and agile methods.", whyWrong: "SAFe er scaled agile software delivery.", whyExtended: ["Både Scrum og SAFe havner i samme kategori."] },
        itil: { whyCorrect: "ITIL har ingen pil inn i CIO toolboxen i figuren.", whyWrong: "ITIL er IT Service Management, men vises ikke som kjerneverktøy i CIO toolboxen.", whyExtended: ["Det er relevant som best practice, men ikke del av de syv verktøyene."] },
        "prosci-adkar": { whyCorrect: "Prosci/ADKAR har ingen pil inn i CIO toolboxen i figuren.", whyWrong: "Prosci/ADKAR er change management, men ikke kjerneverktøy i CIO toolboxen.", whyExtended: ["Det er et tilgrensende management framework."] }
      }
    },
    {
      id: 26,
      type: "dragDrop",
      title: "D4D-byggeklosser",
      points: 2,
      prompt: "Dra hver Designed for Digital-byggekloss til riktig definisjon.",
      source: "Fasit: IN5431, Designed for Digital, fem byggeklosser.",
      cards: [
        { id: "ob", text: "Operational Backbone" },
        { id: "sci", text: "Shared Customer Insights" },
        { id: "dp", text: "Digital Platform" },
        { id: "af", text: "Accountability Framework" },
        { id: "exdp", text: "External Developer Platform" }
      ],
      targets: [
        { id: "ob", description: "Standardiserte og integrerte systemer, prosesser og data for kjerneoperasjoner", correctCardId: "ob", correctLabel: "Operational Backbone", whyCorrect: "Operational Backbone er den stabile operasjonelle ryggraden.", whyWrong: "Denne definisjonen handler om core operations, standardisering og integrasjon.", whyExtended: ["OB gir stabilitet og effektivitet i kjerneprosessene."] },
        { id: "sci", description: "Organisasjonslæring om hva kunder vil betale for og hvordan digitale teknologier kan levere", correctCardId: "sci", correctLabel: "Shared Customer Insights", whyCorrect: "Shared Customer Insights handler om læring om kundebehov og digitale muligheter.", whyWrong: "Nøkkelordene er customers og organizational learning.", whyExtended: ["SCI hjelper virksomheten å finne digitale tilbud kunder faktisk verdsetter."] },
        { id: "dp", description: "Repositorium av business-, data- og infrastrukturkomponenter for rask konfigurering av digitale tilbud", correctCardId: "dp", correctLabel: "Digital Platform", whyCorrect: "Digital Platform er et lager av gjenbrukbare komponenter.", whyWrong: "Denne definisjonen handler om reusable components for digital offerings.", whyExtended: ["DP gjør rask innovasjon og gjenbruk lettere."] },
        { id: "af", description: "Fordeling av ansvar for digitale tilbud og komponenter som balanserer autonomi og alignment", correctCardId: "af", correctLabel: "Accountability Framework", whyCorrect: "Accountability Framework fordeler ansvar og balanserer autonomi og alignment.", whyWrong: "Nøkkelordene er responsibilities, autonomy og alignment.", whyExtended: ["AF skal muliggjøre innovasjon uten kaos."] },
        { id: "exdp", description: "Digitale komponenter som åpnes for eksterne parter", correctCardId: "exdp", correctLabel: "External Developer Platform", whyCorrect: "External Developer Platform åpner komponenter for eksterne utviklere/partnere.", whyWrong: "Nøkkelordet er external parties.", whyExtended: ["Dette kan skape økosystemer og eksterne innovasjonsmuligheter."] }
      ]
    },
    {
      id: 27,
      type: "dragDrop",
      title: "Digital business design-begreper",
      points: 2,
      prompt: "Dra hvert D4D-begrep til riktig forklaring.",
      source: "Fasit: IN5431, Designed for Digital.",
      cards: [
        { id: "digital-business-design", text: "Digital business design" },
        { id: "digital-offering", text: "Digital offering" },
        { id: "smacit", text: "SMACIT" },
        { id: "operational-backbone", text: "Operational backbone" },
        { id: "digital-platform", text: "Digital platform" }
      ],
      targets: [
        { id: "digital-business-design", description: "Konfigurasjon av mennesker, prosesser og teknologi for digitale verdiforslag og tilbud", correctCardId: "digital-business-design", correctLabel: "Digital business design", whyCorrect: "Digital business design handler om helheten: people, processes and technology.", whyWrong: "Denne definisjonen beskriver helhetlig organisatorisk design, ikke bare en digital komponent.", whyExtended: ["D4D understreker at dette er et topplederansvar, ikke bare IT-avdelingens ansvar."] },
        { id: "digital-offering", description: "En konkret løsning som leverer på et digitalt verdiforslag", correctCardId: "digital-offering", correctLabel: "Digital offering", whyCorrect: "Digital offering er det konkrete tilbudet kunden møter.", whyWrong: "Dette handler om løsning/tilbud, ikke hele organisasjonsdesignet.", whyExtended: ["Et digitalt tilbud kombinerer kundebehov og digitale teknologiske muligheter."] },
        { id: "smacit", description: "Social, Mobile, Analytics, Cloud and Internet of Things", correctCardId: "smacit", correctLabel: "SMACIT", whyCorrect: "SMACIT er akronymet for teknologiene som driver digital økonomi.", whyWrong: "Denne forklaringen er et akronym, ikke en byggekloss.", whyExtended: ["SMACIT-teknologier muliggjør nye digitale verdiforslag."] },
        { id: "operational-backbone", description: "Stabilt fundament for standardiserte og integrerte kjerneoperasjoner", correctCardId: "operational-backbone", correctLabel: "Operational backbone", whyCorrect: "Operational backbone er fundamentet for stabil drift.", whyWrong: "Nøkkelordene er stable foundation, core operations, standardization og integration.", whyExtended: ["Uten en god OB kan digital innovasjon bli hemmet av fragmenterte systemer."] },
        { id: "digital-platform", description: "Gjenbrukbare komponenter som muliggjør rask bygging av digitale tilbud", correctCardId: "digital-platform", correctLabel: "Digital platform", whyCorrect: "Digital platform gir gjenbrukbare komponenter for raske digitale tilbud.", whyWrong: "Denne forklaringen handler om reusable components, ikke stable core operations.", whyExtended: ["Digital Platform bygger ofte på Operational Backbone, men har annen innovasjonslogikk."] }
      ]
    },
    {
      id: 28,
      type: "SequenceOrder",
      title: "Double Diamond – rekkefølgen i designprosessen",
      points: 2,
      prompt: "Sett fasene i Double Diamond-modellen i riktig rekkefølge.",
      source: "Fasit: IN5431, CIO Toolbox 2: Projects, products and design thinking, slide ‘Example: the double diamond’.",
      items: [
        { id: "discover", label: "Discover" },
        { id: "define", label: "Define" },
        { id: "develop", label: "Develop" },
        { id: "deliver", label: "Deliver" }
      ],
      correctOrder: [
        "discover",
        "define",
        "develop",
        "deliver"
      ],
      itemFeedback: {
        discover: {
          whyCorrect: "Discover kommer først fordi fasen handler om å forstå problemet før man antar hva løsningen er.",
          whyWrong: "Discover må komme først. Før man definerer eller løser problemet, må man forstå situasjonen og menneskene som påvirkes.",
          whyExtended: [
            "I denne fasen snakker man med og bruker tid sammen med mennesker som er berørt av problemet.",
            "Målet er å utforske problemet, ikke hoppe rett til løsning."
          ]
        },
        define: {
          whyCorrect: "Define kommer etter Discover fordi innsikten fra utforskningen brukes til å definere utfordringen tydeligere.",
          whyWrong: "Define bygger på innsikten fra Discover. Man bør ikke definere utfordringen før man har undersøkt den.",
          whyExtended: [
            "Denne fasen snevrer inn problemet og hjelper teamet å formulere en mer presis utfordring.",
            "Poenget er ofte å redefinere problemet basert på ny innsikt."
          ]
        },
        develop: {
          whyCorrect: "Develop kommer etter Define fordi man først bør utvikle løsningsforslag når problemet er tydelig definert.",
          whyWrong: "Develop hører hjemme etter Define. Først når utfordringen er tydelig, kan man utforske ulike løsninger.",
          whyExtended: [
            "I denne fasen utvikles flere mulige svar på det definerte problemet.",
            "Fasen kan innebære idéutvikling, inspirasjon utenfra og co-design med ulike grupper."
          ]
        },
        deliver: {
          whyCorrect: "Deliver kommer til slutt fordi løsninger testes, forbedres eller forkastes etter at de er utviklet.",
          whyWrong: "Deliver kommer sist. Man kan ikke teste og forbedre løsninger før de er utviklet.",
          whyExtended: [
            "Denne fasen handler om å teste løsninger i liten skala.",
            "Løsninger som ikke fungerer forkastes, mens lovende løsninger forbedres."
          ]
        }
      },
      whyCorrect: "Double Diamond følger rekkefølgen Discover → Define → Develop → Deliver.",
      whyExtended: [
        "Den første diamanten handler om å forstå og definere problemet.",
        "Den andre diamanten handler om å utvikle og levere løsninger.",
        "Modellen veksler mellom å åpne opp for innsikt og muligheter, og å snevre inn mot en tydelig definisjon eller løsning."
      ],
      whyExtendedImageRefs: [
        { moduleId: "cio-tool-box", groupId: "design-thinking", imageId: "double_diamond_model" }
      ]
    }
  ]
};

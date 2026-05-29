// src/data/exams/mockExamSustainability_no.js
export const mockExamSustainability_no = {
  id: "mock-exam-sustainability-no",
  subjectId: "in5431",
  baseId: "mock-exam-sustainability",
  lang: "no",
  title: "Øveeksamen: Bærekraft, rapportering og IT-ledelse",
  description: "Eksamensnære oppgaver fra forelesningen Sustainability: Implications for management. Vekt på bærekraftsbegreper, digitaliseringens dobbelte rolle, sirkulærøkonomi, shipping-caset, CSRD, dobbel vesentlighet, scope 1–3 og implikasjoner for IT governance.",
  modeLabel: "BÆREKRAFT",
  estimatedMinutes: "45–60",
  sortOrder: 95,
  questions: [
    {
      id: 1,
      type: "multi",
      title: "Hvorfor bærekraft angår IT-ledelse",
      points: 1,
      moduleId: "sustainability",
      groupId: "management",
      prompt: "Marker utsagnene som best forklarer hvorfor bærekraft er relevant for organisasjoner og IT-ledere i forelesningen.",
      source: "Fasit: IN5431 Sustainability: Implications for management, slide 5.",
      options: [
        {
          text: "Virksomheter bør bruke digital teknologi ansvarlig.",
          correct: true,
          why: "Riktig: forelesningen peker eksplisitt på ansvarlig bruk av digital teknologi.",
          whyExtended: [
            "Digital teknologi kan støtte bærekraft, men har også materialitet, energiforbruk, e-avfall og sosiale konsekvenser.",
            "Derfor er ikke IT-ledelse bare et spørsmål om effektivisering, men også om ansvarlig bruk, styring og prioritering.",
            "Dette kobler bærekraft direkte til governance, datakvalitet og beslutninger om digitale løsninger."
          ]
        },
        {
          text: "Bærekraftsomstillinger krever og muliggjør innovasjon.",
          correct: true,
          why: "Riktig: bærekraftsomstilling kan både kreve nye løsninger og åpne for innovasjon.",
          whyExtended: [
            "Forelesningen diskuterer blant annet sirkulærøkonomi, digitale produktpass, ruteoptimalisering i shipping og nye datadrevne rapporteringsregimer.",
            "Slike endringer krever ofte nye prosesser, dataflyter, plattformer og samarbeidsformer.",
            "Dermed er bærekraft ikke bare compliance, men også en driver for digital og organisatorisk innovasjon."
          ]
        },
        {
          text: "Top-down bærekraftspolitikk kan være avhengig av datarapportering.",
          correct: true,
          why: "Riktig: forelesningen kobler politikk, rapporteringskrav og data.",
          whyExtended: [
            "CSRD, MRV, ETS og FuelEU Maritime viser at regulering ofte krever datafangst, rapportering, verifikasjon og sporbarhet.",
            "Dette gjør IT-systemer og datastyring sentrale for at virksomheter skal kunne dokumentere utslipp og bærekraftsarbeid.",
            "IT governance blir viktig fordi rapporterte data kan gi økonomiske gevinster eller sanksjoner."
          ]
        },
        {
          text: "Bærekraft er primært et kommunikasjons- og merkevaretema uten kobling til IT-systemer.",
          correct: false,
          why: "Galt: forelesningen viser flere konkrete koblinger til IT-systemer, data og governance.",
          whyExtended: [
            "Digital produktpass, noon reports, rapporteringssystemer, dataverifisering og ruteoptimalisering er alle eksempler på teknologiske og organisatoriske koblinger.",
            "Bærekraftspolitikk får praktiske konsekvenser gjennom datakrav, rapporteringsplikt og styringssystemer.",
            "Å redusere temaet til kommunikasjon overser både innovasjons- og governance-dimensjonen."
          ]
        }
      ]
    },
    {
      id: 2,
      type: "drag-categorize",
      title: "Digital teknologi: bidrag og belastninger",
      points: 2,
      moduleId: "sustainability",
      groupId: "digital-technology",
      prompt: "Dra hvert utsagn til riktig kategori: positivt bidrag til bærekraftsomstilling eller negativ bærekraftsbelastning.",
      source: "Fasit: IN5431 Sustainability, slides 3–4.",
      items: [
        { id: "virtualization", label: "Virtualisering: digitale løsninger kan erstatte fysiske aktiviteter" },
        { id: "optimization", label: "Optimalisering: redusere sløsing gjennom bedre beslutninger" },
        { id: "monitoring", label: "Overvåking og måling som informerer handling" },
        { id: "innovation", label: "Nye teknologier kan drive bærekraftsinnovasjon" },
        { id: "rare-earth", label: "Utvinning av sjeldne jordarter og konfliktfylte mineraler" },
        { id: "e-waste", label: "Elektronisk avfall" },
        { id: "energy", label: "Energiforbruk i digital infrastruktur" },
        { id: "social-disruption", label: "Sosial uro, for eksempel rundt plattformtjenester i nabolag" }
      ],
      categories: [
        { id: "positive", label: "Positivt bidrag" },
        { id: "negative", label: "Negativ belastning" }
      ],
      correctAnswer: {
        positive: ["virtualization", "optimization", "monitoring", "innovation"],
        negative: ["rare-earth", "e-waste", "energy", "social-disruption"]
      },
      itemFeedback: {
        virtualization: {
          whyCorrect: "Virtualisering er et positivt bidrag fordi digitale løsninger kan erstatte fysiske prosesser eller reiser.",
          whyWrong: "Dette er ikke primært en belastning, men ett av forelesningens eksempler på hvordan digital teknologi kan støtte omstilling.",
          whyExtended: ["Poenget er likevel ikke at digital teknologi alltid er bærekraftig; effekten må vurderes konkret."]
        },
        optimization: {
          whyCorrect: "Optimalisering er et positivt bidrag fordi bedre data og analyse kan redusere sløsing.",
          whyWrong: "Optimalisering er i forelesningen plassert på bidragssiden, ikke som en direkte negativ effekt.",
          whyExtended: ["Shipping-caset viser dette gjennom ruteoptimalisering og redusert drivstofforbruk."]
        },
        monitoring: {
          whyCorrect: "Monitoring kan støtte bærekraft fordi måling gjør det mulig å handle og dokumentere utvikling.",
          whyWrong: "Overvåking/måling er et muliggjørende bidrag, særlig i regulering og rapportering.",
          whyExtended: ["Bærekraftspolitikk er ofte avhengig av data som kan rapporteres, valideres og verifiseres."]
        },
        innovation: {
          whyCorrect: "Nye teknologier kan drive innovasjon som støtter bærekraftsomstillinger.",
          whyWrong: "Innovasjon er ikke i seg selv en negativ belastning, selv om teknologien som brukes også må vurderes kritisk.",
          whyExtended: ["Bærekraftsomstillinger kan åpne for nye tjenester, nye forretningsmodeller og nye digitale infrastrukturer."]
        },
        "rare-earth": {
          whyCorrect: "Sjeldne jordarter, gruvedrift og konfliktmineraler viser at ICT også er materielle artefakter.",
          whyWrong: "Dette er en negativ belastning, ikke et eksempel på digital teknologi som reduserer ressursbruk.",
          whyExtended: ["Forelesningen advarer mot å forstå ICT som bare virtuelt."]
        },
        "e-waste": {
          whyCorrect: "Elektronisk avfall er en konkret miljøbelastning fra digital teknologi.",
          whyWrong: "E-avfall er ikke et positivt bærekraftsbidrag, men et problem som må håndteres.",
          whyExtended: ["Dette kobler direkte til sirkulærøkonomi og behovet for å holde materialer i kretsløp lengst mulig."]
        },
        energy: {
          whyCorrect: "Energiforbruk er en negativ belastning fordi digital infrastruktur krever strøm og fysisk utstyr.",
          whyWrong: "Energiforbruk er ikke automatisk bærekraftig selv om tjenesten er digital.",
          whyExtended: ["Forelesningen trekker spesielt fram energiforbruk som en negativ miljøkonsekvens."]
        },
        "social-disruption": {
          whyCorrect: "Sosial uro er en negativ sosial effekt av enkelte digitale tjenester og plattformer.",
          whyWrong: "Dette handler ikke om effektivisering, men om sosiale konsekvenser av digitalisering.",
          whyExtended: ["Bærekraft forstås flerdimensjonalt: sosiale virkninger må vurderes sammen med økonomi og miljø."]
        }
      }
    },
    {
      id: 3,
      type: "dragDrop",
      title: "Sentrale bærekraftsbegreper",
      points: 2,
      moduleId: "sustainability",
      groupId: "core-concepts",
      prompt: "Dra hvert begrep til den mest presise forklaringen.",
      source: "Fasit: IN5431 Sustainability, slides 8–23.",
      cards: [
        { id: "sdg", text: "Sustainable Development Goals" },
        { id: "planetary-boundaries", text: "Planetary boundaries" },
        { id: "doughnut", text: "Doughnut economics" },
        { id: "degrowth", text: "Degrowth / vekstfri utvikling" },
        { id: "netzero", text: "Net Zero" },
        { id: "twin-transition", text: "Twin transitions" }
      ],
      targets: [
        {
          id: "sdg",
          description: "FN-agendaen for 2015–2030 med 17 mål og 169 delmål",
          correctCardId: "sdg",
          correctLabel: "Sustainable Development Goals",
          whyCorrect: "SDG-ene er FNs bærekraftsmål i Agenda 2030.",
          whyWrong: "Denne forklaringen handler om FNs målstruktur, ikke planetens tålegrenser eller rapportering.",
          whyExtended: ["Forelesningen bruker SDG-ene som et inngangspunkt til bærekraft som styrings- og politikkfelt."]
        },
        {
          id: "planetary-boundaries",
          description: "Rammeverk for biofysiske grenser som menneskelig aktivitet ikke bør overskride",
          correctCardId: "planetary-boundaries",
          correctLabel: "Planetary boundaries",
          whyCorrect: "Planetary boundaries handler om miljømessige tålegrenser.",
          whyWrong: "Dette er ikke et rapporteringsdirektiv eller en økonomisk vekstkritikk, men en modell for planetens tålegrenser.",
          whyExtended: ["Forelesningen viser utviklingen fra 2009 til 2023, der flere grenser er overskredet."]
        },
        {
          id: "doughnut",
          description: "Modell som kombinerer sosialt fundament med planetære grenser",
          correctCardId: "doughnut",
          correctLabel: "Doughnut economics",
          whyCorrect: "Smultringøkonomi kobler velferdsmål og økologiske grenser.",
          whyWrong: "Denne forklaringen handler om Raworths smultringmodell, ikke bare utslippsregnskap.",
          whyExtended: ["Poenget er å utvikle samfunn innenfor et trygt og rettferdig handlingsrom."]
        },
        {
          id: "degrowth",
          description: "Kritikk av vekstideologi og søken etter alternativer til BNP-vekst som mål på forbedring",
          correctCardId: "degrowth",
          correctLabel: "Degrowth / vekstfri utvikling",
          whyCorrect: "Degrowth frigjør forståelsen av utvikling fra kravet om økonomisk vekst.",
          whyWrong: "Denne forklaringen handler om vekstkritikk, ikke om netto null-utslipp.",
          whyExtended: ["Forelesningen nevner også postgrowth og steady-state economics som beslektede begreper."]
        },
        {
          id: "netzero",
          description: "Utslipp av klimagasser balanseres med mengden som fjernes fra atmosfæren",
          correctCardId: "netzero",
          correctLabel: "Net Zero",
          whyCorrect: "Net Zero betyr at utslipp balanseres av fjerning/opptak.",
          whyWrong: "Dette er ikke bare digital transformasjon; det er et klimamål knyttet til klimagasser.",
          whyExtended: ["Forelesningen presiserer at GHG er bredere enn bare CO2."]
        },
        {
          id: "twin-transition",
          description: "Digital transformasjon og bærekraftsomstilling må forstås i sammenheng",
          correctCardId: "twin-transition",
          correctLabel: "Twin transitions",
          whyCorrect: "Twin transitions handler om samspillet mellom digital og grønn omstilling.",
          whyWrong: "Dette er ikke en enkelt utslippskategori, men et perspektiv på samtidig digital og bærekraftig transformasjon.",
          whyExtended: ["Forelesningen er kritisk: digitale effektiviseringsgevinster må veies mot strømbruk og sjeldne materialer."]
        }
      ]
    },
    {
      id: 4,
      type: "drag-categorize",
      title: "Tre dimensjoner av bærekraft",
      points: 2,
      moduleId: "sustainability",
      groupId: "three-dimensions",
      prompt: "Dra hvert utsagn til riktig område i modellen for de tre bærekraftsdimensjonene.",
      source: "Fasit: IN5431 Sustainability, slide 12.",
      items: [
        { id: "profit", label: "Økonomisk dimensjon / profit" },
        { id: "people", label: "Sosial dimensjon / people" },
        { id: "planet", label: "Miljømessig dimensjon / planet" },
        { id: "equitable", label: "Økonomisk + sosialt: rettferdig" },
        { id: "bearable", label: "Miljømessig + sosialt: varig / tålelig" },
        { id: "viable", label: "Økonomisk + miljømessig: levedyktig" },
        { id: "sustainable", label: "Alle tre dimensjoner: bærekraftig" }
      ],
      categories: [
        { id: "single-dimension", label: "Én dimensjon" },
        { id: "two-dimensions", label: "To dimensjoner" },
        { id: "all-dimensions", label: "Alle tre dimensjoner" }
      ],
      correctAnswer: {
        "single-dimension": ["profit", "people", "planet"],
        "two-dimensions": ["equitable", "bearable", "viable"],
        "all-dimensions": ["sustainable"]
      },
      itemFeedback: {
        profit: {
          whyCorrect: "Økonomi er én av de tre grunnleggende dimensjonene.",
          whyWrong: "Profit er ikke et overlapp mellom dimensjoner, men den økonomiske dimensjonen i triple bottom line.",
          whyExtended: ["Triple bottom line oppsummeres som profit, people and planet."]
        },
        people: {
          whyCorrect: "Sosial bærekraft er én av de tre grunnleggende dimensjonene.",
          whyWrong: "People er ikke en kombinasjon, men den sosiale dimensjonen.",
          whyExtended: ["Sosiale virkninger av digital teknologi, som plattformkonflikter, hører inn her."]
        },
        planet: {
          whyCorrect: "Miljø er én av de tre grunnleggende dimensjonene.",
          whyWrong: "Planet er ikke en kombinasjon, men den miljømessige dimensjonen.",
          whyExtended: ["Energi, e-avfall, materialbruk og utslipp hører særlig inn her."]
        },
        equitable: {
          whyCorrect: "Rettferdig/equitable ligger i overlappet mellom økonomisk og sosial dimensjon.",
          whyWrong: "Dette er ikke alle tre dimensjoner, men et todimensjonalt overlapp.",
          whyExtended: ["Forelesningen plasserer economic + social som equitable/rettferdig."]
        },
        bearable: {
          whyCorrect: "Varig/bearable ligger i overlappet mellom miljømessig og sosial dimensjon.",
          whyWrong: "Dette er ikke bare miljø eller bare sosialt, men et samspill mellom de to.",
          whyExtended: ["Modellen viser at en løsning må være sosialt akseptabel og miljømessig tålelig."]
        },
        viable: {
          whyCorrect: "Levedyktig/viable ligger i overlappet mellom økonomisk og miljømessig dimensjon.",
          whyWrong: "Dette er ikke alle tre dimensjoner, men et todimensjonalt overlapp.",
          whyExtended: ["En løsning kan være økonomisk og miljømessig levedyktig uten nødvendigvis å dekke sosial rettferdighet."]
        },
        sustainable: {
          whyCorrect: "Bærekraftig ligger i overlappet mellom økonomisk, sosial og miljømessig dimensjon.",
          whyWrong: "I modellen krever bærekraft at alle tre dimensjoner ivaretas samtidig.",
          whyExtended: ["Dette er grunnen til at bærekraftsvurderinger ofte er flerdimensjonale og fulle av trade-offs."]
        }
      },
      whyCorrect: "Modellen skiller mellom økonomisk, sosial og miljømessig bærekraft, og viser hvordan overlappene får ulike betydninger.",
      whyExtended: [
        "Forelesningen kobler modellen til triple bottom line: profit, people and planet.",
        "En eksamensnær forståelse er å kunne bruke modellen på konkrete cases, ikke bare gjengi ordene."
      ],
      whyExtendedImageRefs: [
        { moduleId: "sustainability", groupId: "three-dimensions", imageId: "sustainability_three_dimensions" }
      ]
    },
    {
      id: 5,
      type: "single",
      title: "Net Zero og klimagasser",
      points: 1,
      moduleId: "sustainability",
      groupId: "core-concepts",
      prompt: "En virksomhet sier at den skal bli Net Zero. Hvilket utsagn er mest presist etter forelesningen?",
      source: "Fasit: IN5431 Sustainability, slide 22.",
      options: [
        {
          text: "Net Zero betyr at virksomheten balanserer utslipp av klimagasser med mengden som fjernes fra atmosfæren.",
          correct: true,
          why: "Riktig: Net Zero handler om balanse mellom utslipp og fjerning/opptak.",
          whyExtended: [
            "Forelesningen bruker også begreper som netto null, karbonnøytralt og klimanøytralt.",
            "Det er viktig at GHG omfatter flere klimagasser enn bare CO2.",
            "Praktiske tiltak kan være utfasing av fossil energi, karbonfangst og -lagring, treplanting, regenerativt landbruk og bevaring av våtmarker."
          ]
        },
        {
          text: "Net Zero betyr at all digital teknologi fjernes fra organisasjonen.",
          correct: false,
          why: "Galt: Net Zero handler om utslipp og opptak av klimagasser, ikke om å avvikle digital teknologi.",
          whyExtended: [
            "Digital teknologi kan både hjelpe og skade bærekraft; poenget er styrt og ansvarlig bruk.",
            "Net Zero er et klimamål, ikke en IT-avviklingsstrategi."
          ]
        },
        {
          text: "Net Zero betyr bare at CO2-utslipp rapporteres, uavhengig av andre klimagasser.",
          correct: false,
          why: "Galt: forelesningen presiserer at GHG er bredere enn CO2.",
          whyExtended: [
            "Scope-rapportering og klimagassregnskap må forstås bredere enn bare karbondioksid.",
            "Å ignorere andre klimagasser ville gi et for snevert bilde."
          ]
        },
        {
          text: "Net Zero betyr at økonomisk vekst alltid må prioriteres over utslippskutt.",
          correct: false,
          why: "Galt: dette motsier bærekraftsperspektivet i forelesningen.",
          whyExtended: [
            "Forelesningen diskuterer også degrowth/postgrowth som kritikk av vekst som eneste mål.",
            "Net Zero er knyttet til klimamål, ikke til å prioritere vekst over utslippskutt."
          ]
        }
      ]
    },
    {
      id: 6,
      type: "single",
      title: "Sirkulærøkonomi",
      points: 1,
      moduleId: "sustainability",
      groupId: "circular-economy",
      prompt: "Hvilken beskrivelse passer best med sirkulærøkonomi slik den presenteres i forelesningen?",
      source: "Fasit: IN5431 Sustainability, slide 27.",
      options: [
        {
          text: "Å holde produkter, ressurser og materialer i omløp så lenge som mulig for å minimere ressursbruk, avfall og forurensning.",
          correct: true,
          why: "Riktig: dette er kjernen i sirkulærøkonomi i forelesningen.",
          whyExtended: [
            "Forelesningen setter sirkulærøkonomi opp mot lineær 'bruk-og-kast-økonomi'.",
            "Det handler både om miljøvern og om å redesigne prosesser, produkter og verdikjeder.",
            "Digital teknologi kan støtte dette gjennom informasjon om materialer, markeder, delingsplattformer og produktpass."
          ]
        },
        {
          text: "Å produsere mest mulig nytt utstyr, så lenge det er digitalt.",
          correct: false,
          why: "Galt: sirkulærøkonomi handler om å redusere ressursbruk og avfall, ikke øke produksjon ukritisk.",
          whyExtended: [
            "Digitalt utstyr har også materialitet, energiforbruk og avfallsproblemer.",
            "Sirkulærøkonomi er derfor særlig relevant for ICT og elektronikk."
          ]
        },
        {
          text: "Å skille økonomiske vurderinger helt fra miljømessige vurderinger.",
          correct: false,
          why: "Galt: bærekraft krever at økonomiske, sosiale og miljømessige hensyn ses sammen.",
          whyExtended: [
            "Sirkulærøkonomi prøver nettopp å endre økonomiske logikker for å redusere miljøbelastning.",
            "Dette kan gi nye forretningsmodeller, for eksempel X-as-a-service."
          ]
        },
        {
          text: "Å erstatte all rapportering med frivillig markedsføring.",
          correct: false,
          why: "Galt: forelesningen vektlegger tvert imot data, rapportering og regulering.",
          whyExtended: [
            "Sirkulærøkonomi kobles blant annet til LCA, MFA, EPD og Digital Product Passport.",
            "Disse krever dokumentasjon, standarder og data, ikke bare kommunikasjon."
          ]
        }
      ]
    },
    {
      id: 7,
      type: "dragDrop",
      title: "Verktøy for sirkulærøkonomi",
      points: 2,
      moduleId: "sustainability",
      groupId: "circular-economy",
      prompt: "Dra hvert verktøy eller rammeverk til riktig forklaring.",
      source: "Fasit: IN5431 Sustainability, slides 35 og 37.",
      cards: [
        { id: "lca", text: "Life Cycle Assessment (LCA)" },
        { id: "mfa", text: "Material Flow Analysis (MFA)" },
        { id: "epd", text: "Environmental Product Declaration (EPD)" },
        { id: "dpp", text: "Digital Product Passport" }
      ],
      targets: [
        {
          id: "lca",
          description: "Vurdering av miljødata fra råvareuttak, produksjon, bruksfase og avhending",
          correctCardId: "lca",
          correctLabel: "Life Cycle Assessment (LCA)",
          whyCorrect: "LCA vurderer miljøpåvirkning gjennom livsløpet.",
          whyWrong: "Denne forklaringen handler om livsløpsanalyse, ikke produktpass eller materialstrømsregnskap.",
          whyExtended: ["Forelesningen sier at en EPD lages basert på en LCA."]
        },
        {
          id: "mfa",
          description: "Analyse av materialstrømmer og materialkostnader i prosesser eller verdikjeder",
          correctCardId: "mfa",
          correctLabel: "Material Flow Analysis (MFA)",
          whyCorrect: "MFA handler om materialstrømmer.",
          whyWrong: "Denne forklaringen peker på materialstrøm, ikke livsløpsdeklarasjon.",
          whyExtended: ["Forelesningen nevner ISO 14052:2017 Material flow cost accounting."]
        },
        {
          id: "epd",
          description: "Miljødeklarasjon for et produkt, laget på grunnlag av LCA",
          correctCardId: "epd",
          correctLabel: "Environmental Product Declaration (EPD)",
          whyCorrect: "EPD er en miljødeklarasjon basert på livsløpsanalyse.",
          whyWrong: "Dette er ikke en generell markedsløsning, men dokumentasjon av produktets miljødata.",
          whyExtended: ["Forelesningen kobler EPD til ISO 14025 Type III Environmental Labels and Declarations."]
        },
        {
          id: "dpp",
          description: "Digital dokumentasjon av opprinnelse, materialer, produksjonsprosess og miljøpåvirkning",
          correctCardId: "dpp",
          correctLabel: "Digital Product Passport",
          whyCorrect: "Digital Product Passport gjør produktdata tilgjengelige digitalt.",
          whyWrong: "Dette er ikke en manuell livsløpsanalyse, men digital produktdokumentasjon.",
          whyExtended: ["Forelesningen knytter DPP til EU og kommende krav for flere produktgrupper, inkludert ICT og elektronikk."]
        }
      ]
    },
    {
      id: 8,
      type: "multi",
      title: "Digital teknologi i sirkulærøkonomi",
      points: 1,
      moduleId: "sustainability",
      groupId: "circular-economy",
      prompt: "Hvilke eksempler viser hvordan digital teknologi kan støtte sirkulærøkonomi?",
      source: "Fasit: IN5431 Sustainability, slide 38.",
      options: [
        {
          text: "Informasjon om materialer, komponenter og kvalitet.",
          correct: true,
          why: "Riktig: informasjon om materialer er en sentral digital støttefunksjon.",
          whyExtended: ["Sirkulære modeller krever at aktører vet hva produkter inneholder og hvilken kvalitet ressursene har."]
        },
        {
          text: "Digitale produktpass med data om opprinnelse, materialer og miljøpåvirkning.",
          correct: true,
          why: "Riktig: Digital Product Passports er eksplisitt nevnt i forelesningen.",
          whyExtended: ["DPP kan gjøre det lettere å reparere, gjenbruke, resirkulere og dokumentere produkter."]
        },
        {
          text: "Markeder som kobler tilbud og etterspørsel etter materialer.",
          correct: true,
          why: "Riktig: digitale markeder kan koble aktører som har og trenger materialer.",
          whyExtended: ["Dette kan redusere avfall ved at overskuddsmaterialer finner ny bruk."]
        },
        {
          text: "Delingsplattformer og X-as-a-service-modeller.",
          correct: true,
          why: "Riktig: forelesningen nevner både sharing platforms og servitization.",
          whyExtended: ["Servitization kan flytte fokus fra salg av nye produkter til tilgang, vedlikehold og bedre ressursutnyttelse."]
        },
        {
          text: "Å fjerne all data om materialer slik at produkter blir enklere å selge videre.",
          correct: false,
          why: "Galt: sirkulærøkonomi krever mer, ikke mindre, informasjon om materialer og produkter.",
          whyExtended: ["Uten materialdata blir reparasjon, gjenbruk, sortering og dokumentasjon vanskeligere."]
        }
      ]
    },
    {
      id: 9,
      type: "drag-categorize",
      title: "Shipping-caset: tre nivåer av digitalisering",
      points: 2,
      moduleId: "sustainability",
      groupId: "shipping",
      prompt: "Dra hvert eksempel til den delen av shipping-caset det passer best med.",
      source: "Fasit: IN5431 Sustainability, slides 43–56.",
      items: [
        { id: "sensor-speed", label: "Sensorer brukes til å velge drivstoffeffektiv fart" },
        { id: "hull-cleaning", label: "Prediktiv rengjøring av skrog for å redusere friksjon" },
        { id: "noon-reports", label: "Noon reports sendes fra skip til land" },
        { id: "route-weather", label: "Ruteoptimalisering kobler vær-, hav- og drivstoffdata" },
        { id: "mrv", label: "MRV krever Monitoring, Reporting and Verification" },
        { id: "ets", label: "ETS gir kostnader og insentiver knyttet til utslipp" }
      ],
      categories: [
        { id: "digital-ship", label: "The digital ship" },
        { id: "connected-ship", label: "The connected ship" },
        { id: "regulatory-context", label: "Regulatory context" }
      ],
      correctAnswer: {
        "digital-ship": ["sensor-speed", "hull-cleaning"],
        "connected-ship": ["noon-reports", "route-weather"],
        "regulatory-context": ["mrv", "ets"]
      },
      itemFeedback: {
        "sensor-speed": {
          whyCorrect: "Dette passer med the digital ship: data om skipets ytelse brukes til å redusere drivstofforbruk.",
          whyWrong: "Dette er ombord- og ytelsesoptimalisering, ikke primært regulering.",
          whyExtended: ["Forelesningen nevner blant annet fart i forhold til bølgehøyde, motoroppsett og trim."]
        },
        "hull-cleaning": {
          whyCorrect: "Prediktiv skrogrengjøring passer med digital ship fordi sensordata og modeller brukes til operasjonelle beslutninger.",
          whyWrong: "Dette er ikke rapportering til myndigheter, men optimalisering av skipets friksjon og drivstofforbruk.",
          whyExtended: ["Begroing på skroget øker friksjon og dermed drivstoffbruk."]
        },
        "noon-reports": {
          whyCorrect: "Noon reports viser the connected ship: data sendes fra skipet til land.",
          whyWrong: "Dette handler om datadeling og tilkobling, ikke bare lokale sensorer ombord.",
          whyExtended: ["Rapportene inneholder blant annet posisjon, fart, vær, ETA og mengder av drivstoff og olje ombord."]
        },
        "route-weather": {
          whyCorrect: "Ruteoptimalisering kobler skipets data med globale datainfrastrukturer.",
          whyWrong: "Dette er mer enn isolert skipsteknologi; det bygger på tilkobling og eksterne datakilder.",
          whyExtended: ["Forelesningen nevner værdata, havdata, varsler om isfjell og tyfoner."]
        },
        mrv: {
          whyCorrect: "MRV er del av det regulatoriske landskapet: Monitoring, Reporting and Verification.",
          whyWrong: "MRV handler primært om rapportering og verifikasjon, ikke om rutevalg i seg selv.",
          whyExtended: ["Regulering krever data som dokumenterer drivstoffbruk og utslipp."]
        },
        ets: {
          whyCorrect: "ETS er et regulatorisk regime som knytter økonomiske kostnader til utslipp.",
          whyWrong: "ETS er ikke en sensor eller rutealgoritme, men et cap-and-trade-system utvidet til maritim transport.",
          whyExtended: ["Forelesningen sier at ETS driver aktørene mot hyppigere rapportering og kontinuerlig verifikasjon."]
        }
      }
    },
    {
      id: 10,
      type: "single",
      title: "Ruteoptimalisering i shipping",
      points: 1,
      moduleId: "sustainability",
      groupId: "shipping",
      prompt: "Et rederi vil redusere drivstofforbruk gjennom digitale rutevalg. Hvilken vurdering er mest i tråd med forelesningen?",
      source: "Fasit: IN5431 Sustainability, slide 54.",
      options: [
        {
          text: "Ruteoptimalisering må balansere tidskrav mot drivstoffkostnader og koble skipets data med eksterne data som vær og havforhold.",
          correct: true,
          why: "Riktig: forelesningen beskriver nettopp denne avveiningen og datakoblingen.",
          whyExtended: [
            "OptiRoute-eksempelet bruker rutingalgoritmer, værvarsler og drivstoffmodeller.",
            "Ruteoptimalisering brukes både før og under reisen, med dynamiske omberegninger basert på oppdatert vær.",
            "Dette er et godt eksempel på twin transitions: digitalisering brukes for å støtte utslippsreduksjon."
          ]
        },
        {
          text: "Ruteoptimalisering handler bare om å velge korteste geografiske rute.",
          correct: false,
          why: "Galt: korteste rute er ikke nødvendigvis lavest utslipp eller lavest kostnad.",
          whyExtended: [
            "Vær, bølger, strømmer, motorbelastning og tidskrav påvirker drivstofforbruk.",
            "Derfor må rutevalg sees som en dynamisk optimaliseringsoppgave."
          ]
        },
        {
          text: "Ruteoptimalisering krever ingen eksterne datainfrastrukturer.",
          correct: false,
          why: "Galt: forelesningen understreker koblingen til værdata, havdata og andre globale infrastrukturer.",
          whyExtended: [
            "GPS, satellittkommunikasjon, værdata og havdata er viktige underliggende infrastrukturer.",
            "Uten slike datakilder blir ruteoptimalisering langt svakere."
          ]
        },
        {
          text: "Ruteoptimalisering er kun et rapporteringskrav og har ingen operasjonell nytte.",
          correct: false,
          why: "Galt: ruteoptimalisering har direkte operasjonell nytte gjennom redusert drivstoffbruk og bedre planlegging.",
          whyExtended: [
            "Regulatorisk rapportering er en annen del av shipping-caset.",
            "Ruteoptimalisering er først og fremst en operasjonell bruk av data, selv om data også kan få regulatoriske og finansielle sekundærvirkninger."
          ]
        }
      ]
    },
    {
      id: 11,
      type: "multi",
      title: "Noon reports og flerbruk av data",
      points: 1,
      moduleId: "sustainability",
      groupId: "shipping",
      prompt: "Hvilke påstander om noon reports og data fra skip er riktige ifølge forelesningen?",
      source: "Fasit: IN5431 Sustainability, slides 49 og 52.",
      options: [
        {
          text: "Data kan brukes av mannskapet ombord til operasjonelle vurderinger.",
          correct: true,
          why: "Riktig: data brukes blant annet til å beregne tid til destinasjon, bunkringsbehov og ytelse.",
          whyExtended: ["Dette viser at samme data kan ha lokal operasjonell nytte før de får bredere organisatorisk eller regulatorisk bruk."]
        },
        {
          text: "Data kan sendes til ship management på land for å overvåke drift og optimalisere ytelse.",
          correct: true,
          why: "Riktig: noon reports kobler skipet til landbasert ledelse.",
          whyExtended: ["Forelesningen viser at historiske data fra ett skip og sammenligning på flåtenivå muliggjør analyse."]
        },
        {
          text: "Data kan brukes til regulatorisk compliance, for eksempel drivstoff- og utslippsrapportering.",
          correct: true,
          why: "Riktig: regulering er en sentral sekundærbruk av operative data.",
          whyExtended: ["Dette er koblingen fra operasjonelle data til global governance og bærekraftspolitikk."]
        },
        {
          text: "Data kan deles med tredjeparter som serviceleverandører.",
          correct: true,
          why: "Riktig: forelesningen nevner deling med tredjeparter.",
          whyExtended: ["Dette kan muliggjøre plattformtjenester, ytelsesanalyse og andre datadrevne tjenester."]
        },
        {
          text: "Noon reports inneholder bare skipets navn og aldri posisjon, vær eller drivstoffdata.",
          correct: false,
          why: "Galt: forelesningen lister mange datatyper, inkludert posisjon, fart, vind, sjøforhold og drivstoffmengder.",
          whyExtended: ["At rapportene er datarike er nettopp grunnen til at de kan brukes til flere formål."]
        }
      ]
    },
    {
      id: 12,
      type: "single",
      title: "Regulering som datadriver",
      points: 1,
      moduleId: "sustainability",
      groupId: "shipping",
      prompt: "Hva er den viktigste IT-ledelsesimplikasjonen av at ETS introduserer nye kostnader for skipsreiser?",
      source: "Fasit: IN5431 Sustainability, slide 56.",
      options: [
        {
          text: "Aktører får sterkere insentiver til hyppigere datarapportering og mer kontinuerlig verifikasjon.",
          correct: true,
          why: "Riktig: forelesningen sier at ETS driver mer frekvent rapportering og kontinuerlig verifikasjon.",
          whyExtended: [
            "Når utslipp får direkte økonomiske konsekvenser, øker kravene til datafangst, datakvalitet og sporbarhet.",
            "Dette kobler regulatoriske mål til konkrete IT-systemer og governance-praksiser.",
            "Det er ikke nok å ha data; de må kunne valideres og brukes i rapportering og beslutninger."
          ]
        },
        {
          text: "IT-systemer blir mindre relevante fordi ETS er et rent juridisk rammeverk.",
          correct: false,
          why: "Galt: et juridisk rammeverk kan skape store krav til data og systemstøtte.",
          whyExtended: [
            "Regulering implementeres ofte gjennom rapporteringskrav, datastandarder, verifikasjon og økonomiske insentiver.",
            "Dermed blir IT-ledelse sentralt for å etterleve regelverket."
          ]
        },
        {
          text: "Rederier kan slutte å samle inn operasjonelle data så lenge de betaler kvoter.",
          correct: false,
          why: "Galt: kvoter og kostnader forutsetter at utslipp kan måles og dokumenteres.",
          whyExtended: ["Uten data kan ikke utslipp, kostnader eller etterlevelse beregnes troverdig."]
        },
        {
          text: "Regulering fjerner behovet for dataverifisering fordi myndighetene alltid vet utslippene direkte.",
          correct: false,
          why: "Galt: forelesningen vektlegger rapportering og verifikasjon.",
          whyExtended: ["MRV står nettopp for Monitoring, Reporting and Verification."]
        }
      ]
    },
    {
      id: 13,
      type: "drag-categorize",
      title: "Infrastrukturer i shipping-caset",
      points: 2,
      moduleId: "sustainability",
      groupId: "shipping",
      prompt: "Dra hver infrastruktur eller plattform til riktig nivå.",
      source: "Fasit: IN5431 Sustainability, slide 59.",
      items: [
        { id: "gps", label: "GPS-systemet" },
        { id: "satellite", label: "Satellittkommunikasjon og internett" },
        { id: "weather-ocean", label: "Værdata og havdata" },
        { id: "ais", label: "AIS-systemet for skipsposisjon" },
        { id: "ship-registries", label: "Skipsregistre, for eksempel Lloyds" },
        { id: "imo-dcs", label: "IMO DCS og EMSA THETIS for rapportering" },
        { id: "vesselinsight", label: "Kongsberg VesselInsight" },
        { id: "veracity", label: "Veritas Veracity" }
      ],
      categories: [
        { id: "universal", label: "Universelle infrastrukturer" },
        { id: "sector", label: "Maritime sektorinfrastrukturer" },
        { id: "corporate", label: "Virksomhets-/plattforminfrastrukturer" }
      ],
      correctAnswer: {
        universal: ["gps", "satellite", "weather-ocean"],
        sector: ["ais", "ship-registries", "imo-dcs"],
        corporate: ["vesselinsight", "veracity"]
      },
      itemFeedback: {
        gps: { whyCorrect: "GPS er en universell infrastruktur som mange sektorer bygger på.", whyWrong: "GPS er ikke spesifikk for maritim sektor eller én virksomhet.", whyExtended: ["Shipping-caset viser hvordan digitale tjenester ofte bygger på lag av infrastrukturer."] },
        satellite: { whyCorrect: "Satellittkommunikasjon og internett er universelle infrastrukturer.", whyWrong: "Dette er ikke én bedriftsplattform, men generell kommunikasjonsinfrastruktur.", whyExtended: ["Tilkobling er en forutsetning for connected ship og datadeling."] },
        "weather-ocean": { whyCorrect: "Vær- og havdata er universelle datainfrastrukturer som brukes i ruteoptimalisering.", whyWrong: "Dette er ikke en rapporteringsordning, men eksterne data som mange aktører kan bruke.", whyExtended: ["Ruteoptimalisering kobler skipets data med globale vær- og havdata."] },
        ais: { whyCorrect: "AIS er en maritim sektorinfrastruktur for skipsposisjon.", whyWrong: "AIS er ikke en generell internettinfrastruktur eller én bedriftsplattform.", whyExtended: ["AIS gir posisjonsdata som er særlig viktig i maritim sektor."] },
        "ship-registries": { whyCorrect: "Skipsregistre er maritime sektorinfrastrukturer.", whyWrong: "Dette er ikke en universal infrastruktur som GPS, men sektorspesifikk registrering.", whyExtended: ["Forelesningen nevner Lloyds som eksempel."] },
        "imo-dcs": { whyCorrect: "IMO DCS og EMSA THETIS er sektorinfrastrukturer for rapportering.", whyWrong: "Dette er ikke en bedriftsplattform, men rapporteringsinfrastruktur knyttet til sektoren og regulering.", whyExtended: ["DCS står for Data Collection System for drivstofforbruk."] },
        vesselinsight: { whyCorrect: "VesselInsight er et eksempel på virksomhets-/plattforminfrastruktur.", whyWrong: "Dette er en konkret plattformaktør, ikke en global basisinfrastruktur.", whyExtended: ["Forelesningen nevner Kongsberg som eksempel på corporate infrastructure."] },
        veracity: { whyCorrect: "Veracity er et eksempel på virksomhets-/plattforminfrastruktur.", whyWrong: "Dette er ikke en universell infrastruktur eller offentlig rapporteringsregime.", whyExtended: ["Slike plattformer kan samle, analysere og dele data i økosystemet."] }
      }
    },
    {
      id: 14,
      type: "single",
      title: "Fra SOX til CSRD: governance-logikk",
      points: 1,
      moduleId: "sustainability",
      groupId: "reporting",
      prompt: "Forelesningen sammenligner Enron/SOX med bærekraftsrapportering. Hva er hovedpoenget med sammenligningen?",
      source: "Fasit: IN5431 Sustainability, slides 62–63.",
      options: [
        {
          text: "Sterkere rapporteringskrav kan drive investeringer i informasjonssystemer, internkontroll, dataintegritet og IT governance.",
          correct: true,
          why: "Riktig: SOX-eksempelet brukes for å vise hvordan rapportering kan omforme governance og systemlandskap.",
          whyExtended: [
            "Etter Enron måtte ledere sertifisere nøyaktighet i finansielle rapporter, revisors uavhengighet ble styrket, og interne kontroller ble viktigere.",
            "Forelesningen spør om krav til bærekraftsrapportering kan drive en tilsvarende utvidelse og styrking av IT governance.",
            "CSRD kan dermed forstås som mer enn rapporteringsplikt: det kan endre systemer, datapraksis og ansvarslinjer."
          ]
        },
        {
          text: "SOX viser at rapporteringskrav alltid reduserer behovet for IT governance.",
          correct: false,
          why: "Galt: forelesningen beskriver det motsatte: sterkere rapportering kan styrke governance.",
          whyExtended: ["Dataintegritet og internkontroll blir mer, ikke mindre, sentralt når rapporterte data får høy betydning."]
        },
        {
          text: "Bærekraftsrapportering skiller seg helt fra finansrapportering fordi datakvalitet ikke betyr noe.",
          correct: false,
          why: "Galt: dataveracity, validering og verifikasjon er sentrale poenger i forelesningen.",
          whyExtended: ["Når rapporterte bærekraftsdata kan gi gevinster eller sanksjoner, blir datakvalitet kritisk."]
        },
        {
          text: "Enron/SOX brukes bare som et historisk eksempel uten relevans for IT-ledelse.",
          correct: false,
          why: "Galt: sammenligningen er eksplisitt knyttet til IT governance.",
          whyExtended: ["Forelesningen viser at finansrapportering drev informasjonssystemer og governance, og spør om CSRD kan få lignende effekt."]
        }
      ]
    },
    {
      id: 15,
      type: "dragDrop",
      title: "Dobbel vesentlighet",
      points: 2,
      moduleId: "sustainability",
      groupId: "reporting",
      prompt: "Dra hvert begrep til den mest presise forklaringen i modellen for dobbel vesentlighet.",
      source: "Fasit: IN5431 Sustainability, slide 72.",
      cards: [
        { id: "financial-materiality", text: "Finansiell vesentlighet" },
        { id: "impact-materiality", text: "Påvirkningsvesentlighet" },
        { id: "double-materiality", text: "Dobbel vesentlighet" },
        { id: "company-affected", text: "Påvirkning på selskapet" },
        { id: "company-affects", text: "Påvirkning fra selskapet" }
      ],
      targets: [
        {
          id: "financial-materiality",
          description: "Hvordan klima, miljø og mennesker påvirker selskapets økonomiske situasjon og investorrelevante risiko",
          correctCardId: "financial-materiality",
          correctLabel: "Finansiell vesentlighet",
          whyCorrect: "Finansiell vesentlighet handler om påvirkning på selskapet og er primært relevant for investorer.",
          whyWrong: "Denne forklaringen handler om outside-in-risiko for selskapet, ikke selskapets påvirkning på omverdenen.",
          whyExtended: ["I figuren går pilen fra klima/miljø/mennesker mot selskapet." ]
        },
        {
          id: "impact-materiality",
          description: "Hvordan selskapets aktiviteter påvirker klima, miljø og mennesker",
          correctCardId: "impact-materiality",
          correctLabel: "Påvirkningsvesentlighet",
          whyCorrect: "Påvirkningsvesentlighet handler om selskapets påvirkning på omverdenen.",
          whyWrong: "Dette er inside-out-perspektivet, ikke primært investorens risiko for selskapet.",
          whyExtended: ["I figuren går pilen fra selskapet mot klima, miljø og mennesker." ]
        },
        {
          id: "double-materiality",
          description: "Rapporteringen må vurdere både finansiell vesentlighet og påvirkningsvesentlighet",
          correctCardId: "double-materiality",
          correctLabel: "Dobbel vesentlighet",
          whyCorrect: "Dobbel vesentlighet kombinerer begge retninger.",
          whyWrong: "Dette er ikke bare ett perspektiv, men kombinasjonen av begge.",
          whyExtended: ["CSRD bygger på at virksomheter må vurdere både hvordan bærekraftsforhold påvirker dem, og hvordan de påvirker omverdenen."]
        },
        {
          id: "company-affected",
          description: "Outside-in: eksterne bærekraftsforhold påvirker selskapet",
          correctCardId: "company-affected",
          correctLabel: "Påvirkning på selskapet",
          whyCorrect: "Påvirkning på selskapet beskriver den finansielle vesentlighetsretningen.",
          whyWrong: "Dette er ikke selskapets påvirkning utad, men påvirkning fra omverden inn mot selskapet.",
          whyExtended: ["Eksempel: klimaendringer kan påvirke kostnader, risiko eller verdsetting."]
        },
        {
          id: "company-affects",
          description: "Inside-out: selskapets drift påvirker klima, miljø og mennesker",
          correctCardId: "company-affects",
          correctLabel: "Påvirkning fra selskapet",
          whyCorrect: "Påvirkning fra selskapet beskriver påvirkningsvesentlighet.",
          whyWrong: "Dette er ikke finansiell risiko inn mot selskapet, men selskapets effekt på omverdenen.",
          whyExtended: ["Eksempel: utslipp, ressursbruk eller arbeidsforhold i verdikjeden."]
        }
      ],
      whyCorrect: "Dobbel vesentlighet krever at rapporteringen dekker både påvirkning på selskapet og påvirkning fra selskapet.",
      whyExtended: [
        "Finansiell vesentlighet er primært relevant for investorer.",
        "Påvirkningsvesentlighet er også relevant for forbrukere, sivilt samfunn, ansatte og investorer.",
        "Dette gjør rapportering til et bredere governance-spørsmål enn tradisjonell finansiell risiko alene."
      ],
      whyExtendedImageRefs: [
        { moduleId: "sustainability", groupId: "reporting", imageId: "double_materiality" }
      ]
    },
    {
      id: 16,
      type: "single",
      title: "Case: vesentlighet i en IT-portefølje",
      points: 1,
      moduleId: "sustainability",
      groupId: "reporting",
      prompt: "En IT-leder kartlegger at ekstremvær kan gjøre datasenterdrift dyrere og mindre stabil. Hvilken del av dobbel vesentlighet beskriver dette best?",
      source: "Fasit: IN5431 Sustainability, slide 72.",
      options: [
        {
          text: "Finansiell vesentlighet, fordi eksterne klima- og miljøforhold påvirker selskapet.",
          correct: true,
          why: "Riktig: dette er påvirkning på selskapet.",
          whyExtended: [
            "Ekstremvær er et eksternt bærekraftsforhold som kan påvirke kostnader, risiko og drift.",
            "Dette er outside-in-retningen i dobbel vesentlighet.",
            "For IT governance betyr det at infrastruktur, beredskap, kostnader og leverandørrisiko kan bli del av bærekraftsrapporteringen."
          ],
          whyExtendedImageRefs: [
            { moduleId: "sustainability", groupId: "reporting", imageId: "double_materiality" }
          ]
        },
        {
          text: "Påvirkningsvesentlighet, fordi selskapet påvirker miljø og mennesker direkte i dette eksempelet.",
          correct: false,
          why: "Galt: caset beskriver først og fremst hvordan miljøforhold påvirker selskapet.",
          whyExtended: ["Påvirkningsvesentlighet ville for eksempel vært datasenterets energibruk eller utslippseffekter på omverdenen."]
        },
        {
          text: "Scope 2, fordi ekstremvær alltid er kjøpt elektrisitet.",
          correct: false,
          why: "Galt: Scope 2 er en utslippskategori, ikke en vesentlighetsretning.",
          whyExtended: ["Ekstremvær kan påvirke strømpris eller tilgjengelighet, men selve vesentlighetsvurderingen her er finansiell."]
        },
        {
          text: "Degrowth, fordi all datasenterdrift må stoppes umiddelbart.",
          correct: false,
          why: "Galt: caset handler om risikovurdering og rapportering, ikke en generell påstand om vekstfri utvikling.",
          whyExtended: ["Degrowth er et bredere samfunnsøkonomisk perspektiv, ikke fasiten på dette konkrete vesentlighetscaset."]
        }
      ]
    },
    {
      id: 17,
      type: "drag-categorize",
      title: "Scope 1, 2 og 3",
      points: 2,
      moduleId: "sustainability",
      groupId: "reporting",
      prompt: "Dra hvert utslippseksempel til riktig scope-kategori.",
      source: "Fasit: IN5431 Sustainability, slides 73–74.",
      items: [
        { id: "company-vehicles", label: "Utslipp fra virksomhetens egne kjøretøy" },
        { id: "owned-boiler", label: "Utslipp fra en kjele eller fabrikk selskapet selv eier og kontrollerer" },
        { id: "purchased-electricity", label: "Utslipp knyttet til innkjøpt elektrisitet" },
        { id: "purchased-heating", label: "Utslipp knyttet til innkjøpt fjernvarme, damp eller kjøling" },
        { id: "supplier-components", label: "Utslipp fra leverandørers produksjon av innkjøpte komponenter" },
        { id: "business-travel", label: "Utslipp fra ansattes forretningsreiser" },
        { id: "use-of-products", label: "Utslipp ved bruk av produkter selskapet har solgt" },
        { id: "end-of-life", label: "Utslipp ved avhending av solgte produkter" }
      ],
      categories: [
        { id: "scope1", label: "Scope 1" },
        { id: "scope2", label: "Scope 2" },
        { id: "scope3", label: "Scope 3" }
      ],
      correctAnswer: {
        scope1: ["company-vehicles", "owned-boiler"],
        scope2: ["purchased-electricity", "purchased-heating"],
        scope3: ["supplier-components", "business-travel", "use-of-products", "end-of-life"]
      },
      itemFeedback: {
        "company-vehicles": { whyCorrect: "Egne kjøretøy er direkte utslipp fra kilder selskapet eier eller kontrollerer.", whyWrong: "Dette er ikke innkjøpt energi eller verdikjedeutslipp, men direkte utslipp.", whyExtended: ["Scope 1 dekker direkte utslipp fra egne/kontrollerte kilder."] },
        "owned-boiler": { whyCorrect: "En eid og kontrollert kjele/fabrikk gir direkte utslipp og hører til Scope 1.", whyWrong: "Dette er direkte utslipp fra selskapets egen kilde, ikke indirekte utslipp fra innkjøpt energi.", whyExtended: ["Kontroll/eierskap er nøkkelordet for Scope 1."] },
        "purchased-electricity": { whyCorrect: "Innkjøpt elektrisitet hører til Scope 2.", whyWrong: "Dette er indirekte utslipp fra kjøpt energi, ikke direkte utslipp fra egne kilder.", whyExtended: ["Forelesningen definerer Scope 2 som indirekte utslipp fra kjøpt elektrisitet, damp, varme og kjøling."] },
        "purchased-heating": { whyCorrect: "Innkjøpt varme, damp eller kjøling hører til Scope 2.", whyWrong: "Dette er energien selskapet kjøper inn, ikke øvrige verdikjedeutslipp.", whyExtended: ["Scope 2 dekker kjøpt energi som brukes av virksomheten."] },
        "supplier-components": { whyCorrect: "Leverandørers produksjon er øvrige utslipp knyttet til selskapets aktiviteter og hører til Scope 3.", whyWrong: "Dette er ikke en kilde selskapet selv eier eller kontrollerer.", whyExtended: ["Scope 3 omfatter andre utslipp i verdikjeden, både oppstrøms og nedstrøms."] },
        "business-travel": { whyCorrect: "Forretningsreiser er typisk Scope 3 fordi utslippene skjer utenfor selskapets direkte kontrollerte kilder.", whyWrong: "Dette er ikke innkjøpt elektrisitet, og heller ikke nødvendigvis selskapets egne kjøretøy.", whyExtended: ["I scope-figuren ligger business travel under Scope 3."] },
        "use-of-products": { whyCorrect: "Bruk av solgte produkter er nedstrøms Scope 3.", whyWrong: "Dette skjer etter at produktet er solgt og er ikke direkte utslipp fra selskapets egne kilder.", whyExtended: ["Nedstrøms Scope 3 er viktig i dobbel vesentlighet fordi produkter kan påvirke utslipp hos kunder og samfunnet."] },
        "end-of-life": { whyCorrect: "Avhending av solgte produkter er nedstrøms Scope 3.", whyWrong: "Dette er ikke innkjøpt energi, men en verdikjedeeffekt etter produktets bruk.", whyExtended: ["Dette kobler Scope 3 til sirkulærøkonomi og produktdesign."] }
      },
      whyCorrect: "Scope 1 er direkte utslipp, Scope 2 er indirekte utslipp fra kjøpt energi, og Scope 3 er øvrige utslipp knyttet til virksomhetens aktiviteter.",
      whyExtended: [
        "For IT-ledere er dette relevant fordi utslippsdata må samles fra egne systemer, energileverandører, leverandørkjeder, reise- og produktdata.",
        "Scope 3 er ofte vanskeligst fordi data ligger utenfor virksomhetens direkte kontroll."
      ],
      whyExtendedImageRefs: [
        { moduleId: "sustainability", groupId: "reporting", imageId: "scope_1_2_3" }
      ]
    },
    {
      id: 18,
      type: "fill",
      title: "Scope-begrep",
      points: 1,
      moduleId: "sustainability",
      groupId: "reporting",
      prompt: "Scope ________ omfatter alle andre utslipp knyttet til virksomhetens aktiviteter, utover direkte utslipp og innkjøpt energi.",
      answers: ["3", "tre", "scope 3"],
      answerKey: "3 / tre / scope 3",
      source: "Fasit: IN5431 Sustainability, slide 73.",
      whyCorrect: "Scope 3 er definert som alle andre utslipp assosiert med selskapets aktiviteter.",
      whyWrong: "Scope 1 er direkte utslipp fra egne/kontrollerte kilder, og Scope 2 er indirekte utslipp fra kjøpt elektrisitet, varme, damp og kjøling.",
      whyExtendedImageRefs: [
        { moduleId: "sustainability", groupId: "reporting", imageId: "scope_1_2_3" }
      ]
    },
    {
      id: 19,
      type: "multi",
      title: "Bærekraftsrapportering og IT governance",
      points: 1,
      moduleId: "sustainability",
      groupId: "reporting",
      prompt: "Marker de riktige implikasjonene for IT governance når bærekraftsrapportering blir viktigere.",
      source: "Fasit: IN5431 Sustainability, slide 77.",
      options: [
        {
          text: "Flere typer data må samles inn og rapporteres.",
          correct: true,
          why: "Riktig: forelesningen sier at datatypene som samles inn og rapporteres utvides.",
          whyExtended: [
            "Bærekraftsdata kan omfatte energi, utslipp, leverandørkjeder, materialer, produkter, sosiale forhold og governance-data.",
            "Dette krever datamodeller, systemintegrasjon, eierskap og prosesser for datainnsamling."
          ]
        },
        {
          text: "Dataveracity blir kritisk, så validering og verifikasjon blir kjerneaktiviteter.",
          correct: true,
          why: "Riktig: dette er et hovedpoeng på slide 77.",
          whyExtended: [
            "Når rapporterte data kan føre til gevinster eller sanksjoner, øker behovet for sporbarhet og pålitelighet.",
            "IT governance må derfor avklare ansvar for datakilder, kontroller, kvalitet og revisjon."
          ]
        },
        {
          text: "Økonomiske insentiver og sanksjoner kan knyttes til rapporterte data.",
          correct: true,
          why: "Riktig: forelesningen peker på betydelige økonomiske insentiver knyttet til dataene.",
          whyExtended: [
            "Shipping-caset viser dette tydelig: utslippsdata kan påvirke kostnader, finansiering og regulering.",
            "Dette gjør data til et styringsobjekt, ikke bare en rapporteringsøvelse."
          ]
        },
        {
          text: "IT governance blir mindre relevant fordi bærekraftsrapportering bare gjøres av kommunikasjonsavdelingen.",
          correct: false,
          why: "Galt: forelesningen argumenterer for at rapporteringskrav kan utvide og styrke IT governance.",
          whyExtended: [
            "Kommunikasjon kan være en del av rapporteringen, men datafangst, systemstøtte, verifikasjon og kontroll er governance-utfordringer.",
            "Bærekraftsrapportering kan ligne finansrapportering ved at internkontroll og dataintegritet blir sentralt."
          ]
        },
        {
          text: "Rapporterte bærekraftsdata trenger ikke kunne spores tilbake til kilder.",
          correct: false,
          why: "Galt: sporbarhet, verifikasjon og datakvalitet er sentrale når data får styrings- og rapporteringsfunksjon.",
          whyExtended: ["Uten sporbarhet øker risikoen for feil, grønnvasking og sviktende compliance."]
        }
      ]
    },
    {
      id: 20,
      type: "single",
      title: "Dieselgate som advarsel",
      points: 1,
      moduleId: "sustainability",
      groupId: "reporting",
      prompt: "Hvorfor brukes Dieselgate som et relevant poeng i forelesningen om bærekraftsrapportering og politikk?",
      source: "Fasit: IN5431 Sustainability, slide 76.",
      options: [
        {
          text: "Det viser risikoen for at strenge regler og økonomiske insentiver kan føre til manipulasjon dersom data og verifikasjon svikter.",
          correct: true,
          why: "Riktig: Dieselgate illustrerer risikoen ved kontrollprogramvare og gap mellom test og faktisk bruk.",
          whyExtended: [
            "Forelesningen beskriver at utslippskontrollprogramvare bare ble aktivert under testbetingelser, mens reelle NOx-utslipp var langt høyere.",
            "Poenget for IT governance er at rapporteringssystemer, målemetoder og verifikasjon må være robuste mot manipulering.",
            "Når bærekraftsdata gir økonomiske konsekvenser, øker risikoen for strategisk rapportering eller juks."
          ]
        },
        {
          text: "Det viser at digitale systemer alltid gir perfekte utslippsdata.",
          correct: false,
          why: "Galt: Dieselgate viser nettopp at digitale systemer kan brukes til å manipulere målinger.",
          whyExtended: ["Teknologi gir ikke automatisk sannhet; governance og kontroll er nødvendig."]
        },
        {
          text: "Det viser at rapportering bør avskaffes fordi ingen data kan verifiseres.",
          correct: false,
          why: "Galt: poenget er behovet for bedre verifikasjon, ikke å avskaffe rapportering.",
          whyExtended: ["Uten rapportering blir regulering vanskelig; uten verifikasjon blir rapportering upålitelig."]
        },
        {
          text: "Det viser at Scope 2 alltid er viktigere enn Scope 1 og 3.",
          correct: false,
          why: "Galt: Dieselgate handler ikke om å rangere scope-kategorier.",
          whyExtended: ["Caset handler om rapporteringsrisiko, insentiver og måling under test versus faktisk drift."]
        }
      ]
    },
    {
      id: 21,
      type: "SequenceOrder",
      title: "Fra regulering til IT governance",
      points: 2,
      moduleId: "sustainability",
      groupId: "reporting",
      prompt: "Sett stegene i en logisk rekkefølge for hvordan bærekraftspolitikk kan bli til IT-governance-arbeid i en virksomhet.",
      source: "Fasit: IN5431 Sustainability, slides 5, 62–63 og 77.",
      items: [
        { id: "policy", label: "Top-down bærekraftspolitikk eller regulering etableres" },
        { id: "reporting-duty", label: "Virksomheten får rapporterings- eller dokumentasjonskrav" },
        { id: "data-needs", label: "Nye datatyper og datakilder må identifiseres" },
        { id: "systems-controls", label: "Systemstøtte, kontroller, validering og verifikasjon etableres" },
        { id: "governance", label: "Ansvar, beslutningsrettigheter og IT governance styrkes" }
      ],
      correctOrder: ["policy", "reporting-duty", "data-needs", "systems-controls", "governance"],
      itemFeedback: {
        policy: {
          whyCorrect: "Politikk eller regulering kommer først fordi den skaper kravene som virksomheten må respondere på.",
          whyWrong: "Uten en policy- eller reguleringsdriver er det uklart hvorfor nye rapporteringskrav oppstår.",
          whyExtended: ["Forelesningen sier at top-down bærekraftspolitikk kan være avhengig av datarapportering."]
        },
        "reporting-duty": {
          whyCorrect: "Rapporteringskravet følger av reguleringen og gjør at virksomheten må dokumentere bærekraftsforhold.",
          whyWrong: "Rapportering kommer før system- og governance-endringer fordi kravene definerer hva som må samles inn og dokumenteres.",
          whyExtended: ["CSRD og maritim MRV/ETS er eksempler på krav som gjør data operative og styringsrelevante."]
        },
        "data-needs": {
          whyCorrect: "Når rapporteringskravene er kjent, må virksomheten identifisere relevante datatyper og datakilder.",
          whyWrong: "Databehov kan ikke spesifiseres godt før man vet hva som skal rapporteres.",
          whyExtended: ["Scope 1, 2 og 3 illustrerer at data kan komme fra egne kilder, energileverandører og verdikjeden."]
        },
        "systems-controls": {
          whyCorrect: "Systemstøtte og kontroller etableres for å samle inn, validere og verifisere dataene.",
          whyWrong: "Kontroller bør bygges etter at databehovene er forstått, men før governance kan fungere stabilt.",
          whyExtended: ["Dataveracity, validering og verifikasjon er kjerneaktiviteter i forelesningen."]
        },
        governance: {
          whyCorrect: "Til slutt må ansvar, beslutningsrettigheter og styring forankres i IT governance.",
          whyWrong: "Governance kan ikke være siste ettertanke; men i denne logikken er det sluttresultatet av å operasjonalisere kravene.",
          whyExtended: ["Forelesningen antyder at bærekraftsrapportering kan drive videre utvidelse og styrking av IT governance."]
        }
      },
      whyCorrect: "En typisk kjede er regulering → rapporteringskrav → databehov → systemer og kontroller → styrket IT governance.",
      whyExtended: [
        "Dette speiler forelesningens sammenligning med finansrapportering etter Enron/SOX.",
        "Poenget er ikke bare å lage rapporter, men å bygge styringskapasitet for pålitelige bærekraftsdata."
      ]
    },
    {
      id: 22,
      type: "multi",
      title: "Twin transitions: kritisk forståelse",
      points: 1,
      moduleId: "sustainability",
      groupId: "twin-transitions",
      prompt: "Hvilke utsagn viser en god og kritisk forståelse av twin transitions?",
      source: "Fasit: IN5431 Sustainability, slide 23 og shipping-caset slides 39–59.",
      options: [
        {
          text: "Digital transformasjon og bærekraftsomstilling kan forsterke hverandre, men må analyseres sammen.",
          correct: true,
          why: "Riktig: twin transitions handler om samspillet mellom digital og bærekraftig transformasjon.",
          whyExtended: [
            "Shipping-caset viser hvordan digitalisering, datafangst og deling kan støtte lavere drivstofforbruk og rapportering.",
            "Samtidig har digitalisering egne miljømessige og sosiale kostnader."
          ]
        },
        {
          text: "Effektiviseringsgevinster fra digitalisering må vurderes opp mot økt strømbruk og bruk av sjeldne materialer.",
          correct: true,
          why: "Riktig: forelesningen siterer usikkerheten rundt om digitale gevinster kompenserer for økt strøm- og materialbruk.",
          whyExtended: ["Dette er et kjernepoeng for ansvarlig IT-ledelse: digitalisering er ikke automatisk grønn."]
        },
        {
          text: "Digitalisering er alltid bærekraftig fordi den er virtuell.",
          correct: false,
          why: "Galt: forelesningen understreker at ICT også er materielle artefakter.",
          whyExtended: ["Sjeldne jordarter, e-avfall, energiforbruk og sosial uro viser hvorfor en slik påstand er for enkel."]
        },
        {
          text: "Twin transitions kan kreve nye dataflyter, plattformer og governance-mekanismer.",
          correct: true,
          why: "Riktig: både sirkulærøkonomi, shipping-caset og CSRD peker på dette.",
          whyExtended: ["Data blir nødvendig for optimalisering, rapportering, verifikasjon og insentiver."]
        },
        {
          text: "Når en løsning er digital, trenger den ikke inngå i scope- eller vesentlighetsvurderinger.",
          correct: false,
          why: "Galt: digitale løsninger kan ha både direkte, indirekte og verdikjedebaserte utslipp samt sosiale konsekvenser.",
          whyExtended: ["Dobbel vesentlighet og scope 1–3 gjør digitale løsninger relevante for rapportering og styring."]
        }
      ]
    },
    {
      id: 23,
      type: "single",
      title: "Case: Digital Product Passport for elektronikk",
      points: 1,
      moduleId: "sustainability",
      groupId: "circular-economy",
      prompt: "En produsent av elektronikk forbereder Digital Product Passport. Hvilken datalogikk er mest relevant?",
      source: "Fasit: IN5431 Sustainability, slides 35 og 38.",
      options: [
        {
          text: "Samle og gjøre tilgjengelig data om opprinnelse, materialer, produksjonsprosess og miljøpåvirkning for å støtte sirkulærøkonomi.",
          correct: true,
          why: "Riktig: dette er kjernen i Digital Product Passport slik forelesningen beskriver det.",
          whyExtended: [
            "Digital Product Passport gjør produktinformasjon tilgjengelig gjennom livsløpet.",
            "For elektronikk er dette særlig relevant fordi produktene inneholder materialer, komponenter og miljøpåvirkning som må dokumenteres.",
            "Forelesningen viser at kravene etter planen kommer for ICT, elektronikk, metaller og batterier fra 2028."
          ]
        },
        {
          text: "Slette materialdata når produktet selges for å beskytte leverandørkjeden mot innsyn.",
          correct: false,
          why: "Galt: DPP handler om mer tilgjengelig produktinformasjon, ikke mindre.",
          whyExtended: ["Uten materialdata blir reparasjon, gjenbruk, resirkulering og miljørapportering vanskeligere."]
        },
        {
          text: "Kun registrere markedsføringsbilder og salgspris, fordi miljødata ikke er relevant.",
          correct: false,
          why: "Galt: miljøpåvirkning, materialer og produksjonsprosess er sentrale.",
          whyExtended: ["Et produktpass er ikke bare en salgskatalog, men dokumentasjon som kan støtte sirkulære verdikjeder."]
        },
        {
          text: "Erstatte LCA og EPD med muntlige vurderinger uten sporbare data.",
          correct: false,
          why: "Galt: forelesningen kobler sirkulærøkonomi til standardiserte analyser og dokumentasjon.",
          whyExtended: ["LCA, EPD, MFA og DPP peker i retning av mer strukturert datagrunnlag, ikke mindre."]
        }
      ]
    },
    {
      id: 24,
      type: "single",
      title: "Sekundærvirkninger av data",
      points: 1,
      moduleId: "sustainability",
      groupId: "shipping",
      prompt: "I shipping-caset brukes data rapportert for regulatorisk compliance også i Poseidon Principles. Hva er det viktigste poenget?",
      source: "Fasit: IN5431 Sustainability, slide 58.",
      options: [
        {
          text: "Operasjonelle og regulatoriske data kan få sekundære virkninger, for eksempel gjennom finansiering og insentiver for grønnere drift.",
          correct: true,
          why: "Riktig: forelesningen sier at operasjonelle data også flyter til andre aktører og får sekundær impact.",
          whyExtended: [
            "Poseidon Principles bruker data rapportert for regulatorisk compliance i IMO DCS-systemet.",
            "Banker kan bruke dataene til climate alignment i låneporteføljer og tilby bærekraftslinkede lån med bedre betingelser.",
            "Dette viser hvordan data kan bevege seg fra operasjonell drift til governance, regulering og finansielle insentiver."
          ]
        },
        {
          text: "Data som samles for compliance kan aldri brukes utenfor myndighetsrapportering.",
          correct: false,
          why: "Galt: Poseidon Principles er et eksempel på sekundær bruk av slike data.",
          whyExtended: ["Forelesningen viser at samme data kan brukes av mannskap, ledelse, regulatorer, tjenesteleverandører og finansaktører."]
        },
        {
          text: "Bærekraftslinkede lån er irrelevante for datakvalitet fordi banker ikke bruker rapporterte data.",
          correct: false,
          why: "Galt: forelesningen beskriver at data brukes i finansielle vurderinger.",
          whyExtended: ["Når data påvirker lånebetingelser, blir veracity og verifikasjon enda viktigere."]
        },
        {
          text: "Poseidon Principles viser at utslippsdata kun er tekniske data uten styringsmessig betydning.",
          correct: false,
          why: "Galt: poenget er nettopp at tekniske og operasjonelle data får styringsmessig betydning.",
          whyExtended: ["Data kan skape insentiver, påvirke finansiering og støtte global governance."]
        }
      ]
    }
  ]
};

//src/data/exams/mockExam1_no.js
export const mockExam1_no = {
  id: "mock-exam-1-no",
  subjectId: "in5431",
  baseId: "mock-exam-1",
  lang: "no",
  title: "Øveeksamen 1: Full repetisjon",
  description: "CIO toolbox, D4D, IT governance, strategy og sustainability.",
  questions: [
    {
      id: 1,
      type: "fill",
      title: "Business process",
      points: 1,
      prompt: "En forretnings________ er kombinasjonen av et sett aktiviteter i en virksomhet med en struktur som beskriver deres logiske rekkefølge og avhengighet, der målet er å produsere et ønsket resultat.",
      answers: ["prosess", "process", "forretningsprosess", "business process"],
      answerKey: "prosess / forretningsprosess",
      source: "Fasit: Forelesning 5, Business processes and IT Architecture, slide 'What is a business process?'",
      whyCorrect: "Setningen er definisjonen av business process: et sett aktiviteter med logisk orden og avhengigheter som produserer et ønsket resultat.",
      whyWrong: "Andre begreper som project, platform eller architecture passer ikke fordi definisjonen handler om selve arbeidsflyten av aktiviteter i en virksomhet."
    },
    {
      id: 2,
      type: "multi",
      title: "Net present value",
      points: 1,
      prompt: "Marker de riktige utsagnene om Net Present Value (NPV).",
      source: "Fasit: Forelesning 4, Projects/products/design thinking, slide 'From last week: Business case'.",
      options: [
        {
          text: "NPV tar hensyn til tidspunktet for nytte/kontantstrømmer.",
          correct: true,
          why: "Riktig: fremtidige kontantstrømmer diskonteres, så timing er sentralt.",
          whyExtended: [
            "NPV-formelen diskonterer fremtidige kontantstrømmer med en diskonteringsrate, slik at verdien av penger i dag og om fem år ikke behandles likt.",
            "Forelesning 3 viser NPV-formelen: NPV = Σ(Result_i / (1+r)^i) − I, der timing er innebygd i eksponenten.",
            "Business case-verktøyet i CIO toolbox krever estimater av benefit, cost, timing og risk — timing er altså én av fire pilarer."
          ]
        },
        {
          text: "Risiko håndteres typisk ved å øke estimert kostnad direkte i alle år.",
          correct: false,
          why: "Galt: risiko kan reflekteres i risikopremie/diskonteringsrate eller usikkerhet i estimater, men dette utsagnet gjør det for snevert og mekanisk.",
          whyExtended: [
            "Forelesning 3 viser at risiko typisk håndteres gjennom risikopremie i diskonteringsraten — ikke ved å legge på kostnad direkte.",
            "NPV-eksempelet bruker ulik risikopremie per alternativ (2 % vs. 10 %), noe som endrer diskonteringsraten, ikke kostnadsestimatene.",
            "Å øke kostnad direkte i alle år er en grov forenkling som ikke fanger opp at risiko varierer mellom alternativer og over tid.",
            "Forelesningen understreker at risikojustering har enorm innvirkning på resultatet — det krever nyansert vurdering, ikke mekanisk påslag."
          ]
        },
        {
          text: "NPV er en kvantitativ metode i en business case.",
          correct: true,
          why: "Riktig: NPV er en strukturert, kvantitativ beregning i business case.",
          whyExtended: [
            "Forelesning 4 beskriver business case som 'a structured and quantitative approach to structure decision making', der NPV er hovedmetoden.",
            "CIO toolbox-tabellen plasserer NPV under 'Quantitative approach' i business case-verktøyet.",
            "NPV brukes sammen med kvalitative vurderinger (compliance, sikkerhet, trygghet) som ikke lar seg tallfeste."
          ]
        },
        {
          text: "De viktigste estimatene er vanligvis konverteringsrate og diskonteringsrate alene.",
          correct: false,
          why: "Galt: business case/NPV krever nytte, kostnad, timing og risiko. Konverteringsrate kan være relevant i noen cases, men er ikke generelt nok.",
          whyExtended: [
            "Forelesning 3 lister fire faktorer som må estimeres for NPV: cost of implementation, quantitative return, timing of the return og risk.",
            "Konverteringsrate er kun ett eksempel på en kvantifiserbar nytte — den er ikke universell for alle business cases.",
            "Diskonteringsrate alene fanger ikke opp hele bildet: du trenger også å estimere kostnader, nytte og tidspunkter for kontantstrømmene.",
            "Forelesningen presiserer at for ikke-trivielle utviklingsinitiativer er korrekte estimater umulige — det er alltid estimater med usikkerhet."
          ]
        }
      ]
    },
    {
      id: 3,
      type: "single",
      title: "CIO toolbox",
      points: 1,
      prompt: "Hvilket verktøy i CIO toolbox er særlig knyttet til prioritering av digitale tjenester og finansiering?",
      source: "Fasit: Forelesning 3, CIO Toolbox 1, tabellen 'The CIO toolbox'.",
      options: [
        {
          text: "Business case",
          correct: true,
          why: "Riktig: business case brukes for prioritering av digitale tjenester og finansiering.",
          whyExtended: [
            "CIO toolbox-tabellen viser eksplisitt at Business case har 'Prioritization of digital services and funding' som typical purpose.",
            "Business case analyserer benefit, cost, timing og risk for hvert alternativ — og muliggjør dermed prioritering mellom konkurrerende initiativ.",
            "NPV, som er kjerneberegningen i business case, gir et sammenligningsgrunnlag for å rangere investeringsalternativer."
          ]
        },
        {
          text: "PRINCE2",
          correct: false,
          why: "Galt: PRINCE2 er knyttet til prosjektstyring og governance, ikke primært prioritering av finansiering.",
          whyExtended: [
            "PRINCE2 er et rammeverk for prosjektstyring (project governance and management) — det ligger under verktøyet 'Projects' i CIO toolbox.",
            "Forelesning 6 plasserer PRINCE2 under 'Project governance and management' med opprinnelse fra UK government.",
            "PRINCE2 har riktignok 'continued business justification' som et prinsipp, men det handler om å opprettholde begrunnelse under prosjektet — ikke om den opprinnelige investeringsprioriteringen.",
            "Typical purpose for Projects-verktøyet er 'Plan and organize development', ikke finansieringsprioritering."
          ]
        },
        {
          text: "ITIL",
          correct: false,
          why: "Galt: ITIL handler om IT service management/drift, ikke business case-prioritering.",
          whyExtended: [
            "ITIL (IT Infrastructure Library) er et rammeverk for IT service management og ligger utenfor selve CIO toolbox i kurset.",
            "Forelesning 6 plasserer ITIL under 'Outside the toolbox, but part of IT management' sammen med change management og procurement.",
            "ITIL fokuserer på stabil drift av IT-tjenester — ikke på å velge mellom investeringsalternativer eller prioritere finansiering.",
            "Kursets CIO toolbox-modell har syv verktøy, og ITIL er ikke ett av dem."
          ]
        },
        {
          text: "BPMN",
          correct: false,
          why: "Galt: BPMN er en notasjon for prosessmodellering, ikke finansieringsprioritering.",
          whyExtended: [
            "BPMN (Business Process Model and Notation) er en modelleringsteknikk som hører til under IT Architecture-verktøyet i CIO toolbox.",
            "IT Architecture har 'Analyze and structure the IT portfolio — both within and among systems and services' som typical purpose.",
            "BPMN brukes til å kartlegge prosessflyt med roller, aktiviteter og avhengigheter — det er en analyseteknikk, ikke et prioriteringsverktøy.",
            "Finansieringsbeslutninger krever NPV og business case, ikke prosessdiagrammer."
          ]
        }
      ]
    },
    {
      id: 4,
      type: "single",
      title: "Alternative analysis",
      points: 1,
      prompt: "Hvilken situasjon tilsier normalt mer detaljert alternativanalyse?",
      source: "Fasit: Forelesning 3, slide 'A spectrum of decision making effort'.",
      options: [
        {
          text: "Lav påvirkning og høy erfaring",
          correct: false,
          why: "Galt: dette tilsier ofte mindre analyse, fordi risiko og usikkerhet er lavere.",
          whyExtended: [
            "CIO toolbox-modellen sier eksplisitt: 'Low impact / familiar → less formal analysis'.",
            "Når organisasjonen har høy erfaring med lignende beslutninger, er usikkerheten lavere og behovet for strukturert analyse mindre.",
            "Forelesning 3 oppsummerer at for beslutninger med lav påvirkning kan enklere prosedyrer og etablert praksis brukes.",
            "Det er kombinasjonen av høy impact + lav erfaring + lav tillit som driver behovet for detaljert analyse."
          ]
        },
        {
          text: "Høy påvirkning, lite tidligere erfaring og lav tillit mellom beslutningstakere",
          correct: true,
          why: "Riktig: høy impact, lite erfaring og lav tillit/shared perspective krever mer strukturert analyse.",
          whyExtended: [
            "Forelesning 3 oppsummerer: 'For high impact decisions, little prior experience, less trust and/or shared perspective among decision makers: spending time to make a business case is often worthwhile.'",
            "CIO toolbox-modellen beskriver dette som et spektrum: 'High impact / low experience / low trust → detailed alternative analysis'.",
            "Lav tillit mellom beslutningstakere betyr at en transparent og strukturert prosess er nødvendig for å bygge konsensus.",
            "Forelesningen understreker at business case-arbeid ikke er eksakt vitenskap — bias, erfaring og politikk påvirker resultatet."
          ]
        },
        {
          text: "En rutinebeslutning med etablert praksis",
          correct: false,
          why: "Galt: rutinebeslutninger kan ofte håndteres med enklere prosedyre eller erfaring.",
          whyExtended: [
            "Rutinebeslutninger tilsvarer 'low impact / familiar' i spekteret — de krever ikke samme grad av formell analyse.",
            "I Cynefin-termer ville en rutinebeslutning ligge i 'clear'-domenet, der etablerte prosedyrer er tilstrekkelig.",
            "Forelesning 3 viser at analyseinnsats bør skaleres med situasjonen — rutiner trenger ikke business case.",
            "Å bruke detaljert alternativanalyse på rutinebeslutninger ville vært unødvendig ressursbruk."
          ]
        },
        {
          text: "Når alle alternativer har lik risiko",
          correct: false,
          why: "Galt: lik risiko alene er ikke hovedgrunnen til detaljert analyse; usikkerhet, impact og erfaring er viktigere.",
          whyExtended: [
            "Forelesning 3 identifiserer impact, erfaring og tillit som hoveddriverne for analyseinnsats — ikke risikoprofil alene.",
            "Hvis alle alternativer har lik risiko, kan det faktisk forenkle analysen fordi risikodimensjonen faller bort som differensieringsfaktor.",
            "Det er usikkerhet og uenighet blant beslutningstakere som gjør detaljert analyse verdifull — ikke at risiko er lik.",
            "NPV-beregningen viser at når risikopremien er lik, blir rangeringen bestemt av nytte, kostnad og timing alene."
          ]
        }
      ]
    },
    {
      id: 5,
      type: "fill",
      title: "Digital Business Design",
      points: 1,
      prompt: "Digital business design er en helhetlig organisatorisk konfigurasjon av mennesker, prosesser og ________.",
      answers: ["teknologi", "technology", "it", "digital teknologi"],
      answerKey: "teknologi / technology",
      source: "Fasit: Forelesning 7 og Operational Backbone-forelesningen, definisjon av Digital Business Design.",
      whyCorrect: "Riktig fordi digital business design beskriver samspillet mellom people, processes and technology, ikke bare IT-systemer isolert.",
      whyWrong: "Galt hvis svaret peker på bare data, strategi eller arkitektur. Begrepet er eksplisitt tredelt: mennesker, prosesser og teknologi."
    },
    {
      id: 6,
      type: "multi",
      title: "Designed for Digital",
      moduleId: "designed-for-digital",
      groupId: "d4d-building-blocks",
      points: 1,
      prompt: "Hvilke av disse er blant de fem D4D-byggeklossene?",
      source: "Fasit: Forelesning 13, Designed for digital summary, slide 'Assembling the building blocks'.",
      options: [
        {
          text: "Operational Backbone",
          correct: true,
          why: "Riktig: en av de fem byggeklossene.",
          whyExtended: [
            "Operational Backbone er definert som 'a coherent set of standardized, integrated systems, processes, and data supporting a company's core operations'.",
            "OB er en av de fem byggeklossene som D4D-boken og forelesning 13 identifiserer som nødvendige for digital suksess.",
            "44 % av ledere identifiserer OB som den største hindringen for digital transformasjon — det viser hvor sentral denne byggeklossen er.",
            "OB tilhører architecture transformation i D4D sin dual transformation-teori."
          ],
          whyExtendedImageRefs: [
            { imageId: "operational-backbone" }
          ]
        },
        {
          text: "Shared Customer Insights",
          correct: true,
          why: "Riktig: en av de fem byggeklossene.",
          whyExtended: [
            "Shared Customer Insights er definert som 'organizational learning about what customers will pay for and how digital technologies can deliver to their demands'.",
            "Byggeklossen handler om felles forståelse av kundebehov og markedsmuligheter — delt på tvers av organisasjonen.",
            "Forelesning 8 viser at dette er grunnlaget for kundedrevne digitale tilbud (digital offerings).",
            "SCI tilhører governance transformation i D4D sin dual transformation-teori."
          ],
          whyExtendedImageRefs: [
            { imageId: "shared-customer-insights" }
          ]
        },
        {
          text: "PRINCE2",
          correct: false,
          why: "Galt: PRINCE2 er et prosjektstyringsrammeverk i CIO toolbox, ikke en D4D-byggekloss.",
          whyExtended: [
            "D4D-byggeklossene beskriver organisatoriske kapabiliteter (capabilities), ikke metoder eller rammeverk for prosjektstyring.",
            "PRINCE2 er et prosjektstyringsrammeverk med opprinnelse i UK government og hører til under 'Projects'-verktøyet i CIO toolbox.",
            "De fem D4D-byggeklossene er: Operational Backbone, Shared Customer Insights, Digital Platform, Accountability Framework og External Developer Platform.",
            "PRINCE2 fokuserer på governance av enkeltprosjekter, mens D4D handler om varige organisatoriske evner for digital transformasjon."
          ]
        },
        {
          text: "Digital Platform",
          correct: true,
          why: "Riktig: en av de fem byggeklossene.",
          whyExtended: [
            "Digital Platform er definert som 'repository of business, data, and infrastructure components used to rapidly configure digital offerings'.",
            "DP gir tilgang til gjenbrukbare data-, business- og teknologikomponenter som muliggjør rask innovasjon.",
            "Forelesning 10 skiller tydelig DP fra OB: OB gir stabilitet, mens DP muliggjør eksperimentering og kontinuerlig forbedring.",
            "DP tilhører architecture transformation sammen med OB."
          ],
          whyExtendedImageRefs: [
            { imageId: "digital-platform" }
          ]
        },
        {
          text: "Accountability Framework",
          correct: true,
          why: "Riktig: en av de fem byggeklossene.",
          whyExtended: [
            "Accountability Framework er definert som 'distribution of responsibilities for digital offerings and components that balances autonomy and alignment'.",
            "AF sikrer at digitale initiativer følges opp med klart eierskap — component owners fremfor prosjektledere.",
            "Forelesning 11 vektlegger balansen mellom autonomi (kreativitet, hastighet) og alignment (felles retning, gjenbruk).",
            "AF tilhører governance transformation i D4D sin dual transformation-teori."
          ],
          whyExtendedImageRefs: [
            { imageId: "accountability-framework" }
          ]
        },
        {
          text: "External Developer Platform",
          correct: true,
          why: "Riktig: en av de fem byggeklossene.",
          whyExtended: [
            "External Developer Platform er definert som 'repository of digital components open to external parties'.",
            "ExDP åpner digitale komponenter for partnere og eksterne utviklere, typisk via API-er og boundary resources.",
            "Forelesning 12 viser to typer ExDP: én som lar partnere bruke interne komponenter (som Google Maps), og én som skaper en markedsplass (som Apple App Store).",
            "D4D-roadmapen anbefaler å ikke forhaste seg med ExDP — det krever moden OB og DP først."
          ],
          whyExtendedImageRefs: [
            { imageId: "external-developer-platform" }
          ]
        }
      ]
    },
    {
      id: 7,
      type: "single",
      title: "Operational Backbone",
      points: 1,
      prompt: "Hva beskriver best en Operational Backbone?",
      source: "Fasit: Forelesning 9, Operational Backbone, og D4D-definisjonsarket.",
      options: [
        {
          text: "Et midlertidig prosjektteam for digital innovasjon",
          correct: false,
          why: "Galt: dette beskriver mer et prosjekt eller produktteam, ikke en stabil operasjonell ryggrad.",
          whyExtended: [
            "OB er per definisjon en varig, stabil kapabilitet — ikke en midlertidig organisasjon som et prosjekt.",
            "Forelesning 4 definerer et prosjekt som 'a temporary organization established to deliver specified results within a specified period' — det er det motsatte av OB.",
            "OB handler om standardisering og integrasjon av kjerneprosesser over tid, ikke om tidsavgrensede innovasjonsinitiativ.",
            "Digital innovasjon støttes av Digital Platform og produktteam, ikke av Operational Backbone direkte."
          ]
        },
        {
          text: "Et sammenhengende sett av standardiserte og integrerte systemer, prosesser og data som støtter kjernedrift",
          correct: true,
          why: "Riktig: OB handler om standardisering, integrasjon og stabil støtte til core operations.",
          whyExtended: [
            "Definisjonen fra D4D-definisjonsarket: 'A coherent set of standardized, integrated systems, processes, and data supporting a company's core operations.'",
            "Forelesning 9 understreker at OB gir en 'tightly integrated, bulletproof production environment to ensure reliability and security of business processes'.",
            "MIT CISR-forskningen viser at selskaper med effektiv OB er 2.5 ganger mer smidige og 44 % mer innovative enn selskaper uten.",
            "OB er fundamentet som muliggjør videre digital transformasjon — uten fungerende OB mangler man stabil grunn å bygge på."
          ]
        },
        {
          text: "En ekstern markedsplass for tredjepartsutviklere",
          correct: false,
          why: "Galt: dette ligner External Developer Platform.",
          whyExtended: [
            "En ekstern markedsplass for tredjepartsutviklere beskriver External Developer Platform (ExDP), den femte D4D-byggeklossen.",
            "ExDP åpner digitale komponenter for eksterne parter, for eksempel gjennom API-er — som Apple App Store eller Google Maps-plattformen.",
            "OB er internt rettet og handler om standardisering av kjerneprosesser, mens ExDP er utadrettet mot økosystemet.",
            "Forelesning 12 presiserer at ExDP krever en veldesignet og godt forvaltet intern plattform (OB + DP) som forutsetning."
          ]
        },
        {
          text: "En metode for kundereiser og empatiintervjuer",
          correct: false,
          why: "Galt: dette passer bedre med design thinking/shared customer insight-praksiser.",
          whyExtended: [
            "Kundereiser og empatiintervjuer er teknikker fra design thinking, som er verktøy nr. 3 i CIO toolbox.",
            "Design thinking brukes når problemet er uklart og krever utforskning — med double diamond-prosessen: Discover, Define, Develop, Deliver.",
            "Shared Customer Insights som D4D-byggekloss handler om organisatorisk læring om hva kunder vil betale for, men OB er ikke denne byggeklossen.",
            "OB fokuserer på systemer, prosesser og data for stabil drift — det er en infrastruktur-kapabilitet, ikke en brukerinnsiktsmetode."
          ]
        }
      ]
    },
    {
      id: 8,
      type: "single",
      title: "Digital Platform",
      points: 1,
      prompt: "Hva er hovedformålet med en Digital Platform i D4D?",
      source: "Fasit: Forelesning 10, Digital Platform, slides 'A digital platform - what is it' og 'Digital platform'.",
      options: [
        {
          text: "Å erstatte alle forretningsprosesser med manuelle rutiner",
          correct: false,
          why: "Galt: en digital platform handler om komponenter og digital innovasjon, ikke manuelle rutiner.",
          whyExtended: [
            "Digital Platform handler om det motsatte av manuelle rutiner — det er et repository av gjenbrukbare digitale komponenter.",
            "DP muliggjør rask innovasjon og kontinuerlig forbedring gjennom modulære business-, data- og infrastrukturkomponenter.",
            "Forelesning 10 skiller mellom OB (som automatiserer og standardiserer drift) og DP (som muliggjør eksperimentering med nye digitale tilbud).",
            "Å erstatte digitale prosesser med manuelle rutiner ville være et tilbakeskritt som undergraver hele D4D-logikken."
          ]
        },
        {
          text: "Å gi gjenbrukbare business-, data- og infrastrukturkomponenter for rask konfigurering av digitale tilbud",
          correct: true,
          why: "Riktig: dette er kjernen i definisjonen av Digital Platform.",
          whyExtended: [
            "D4D-definisjonsarket sier: 'Repository of business, data, and infrastructure components used to rapidly configure digital offerings.'",
            "Forelesning 12 deler DP-komponenter i fire typer: data components (API-tilgang til data), infrastructure components (autentisering, tilgangskontroll), business components (dashboards, kundevarsler) og cloud services (hosting, performance management).",
            "Forelesning 10 understreker at DP gir 'easy access to the data, business and technology components that make up digital offerings — experimentation, rapid innovation and continuous feature enhancement'.",
            "DP skiller seg fra OB ved å fokusere på fleksibilitet og gjenbruk fremfor stabilitet og standardisering."
          ]
        },
        {
          text: "Å bestemme hvem som har beslutningsrettigheter i IT-governance",
          correct: false,
          why: "Galt: dette er accountability/governance, ikke digital platform.",
          whyExtended: [
            "Beslutningsrettigheter tilhører Accountability Framework (AF) og IT governance, ikke Digital Platform.",
            "IT governance defineres som å spesifisere 'decision rights and accountability framework to encourage desirable behaviour in using IT' (Weill and Ross 2004).",
            "AF som D4D-byggekloss handler eksplisitt om fordelingen av ansvar for digitale tilbud og komponenter.",
            "DP er teknologisk og arkitektonisk orientert — det handler om komponenter og gjenbruk, ikke om beslutningsmyndighet."
          ]
        },
        {
          text: "Å lage en fullstendig prosjektplan før innovasjon starter",
          correct: false,
          why: "Galt: dette ligner prosjektlogikk, mens plattformen muliggjør rask eksperimentering og gjenbruk.",
          whyExtended: [
            "En fullstendig prosjektplan hører til prosjekttilnærmingen i CIO toolbox, med planlegging, roadmap og budsjett.",
            "DP er designet for det motsatte: rask konfigurering av digitale tilbud gjennom gjenbruk av modulære komponenter.",
            "Forelesning 10 understreker at DP handler om 'experimentation, rapid innovation and continuous feature enhancement' — ikke oppfølging av en forhåndsdefinert plan.",
            "Prosjektlogikk med triple constraint (scope, tid, kostnad) passer dårlig med den kontinuerlige, iterative utviklingen DP muliggjør."
          ]
        }
      ]
    },
    {
      id: 9,
      type: "fill",
      title: "Shared Customer Insights",
      points: 1,
      prompt: "Shared Customer Insights handler om organisatorisk læring om hva kunder er villige til å ________ for, og hvordan digital teknologi kan levere på kundenes krav.",
      answers: ["betale", "pay", "betale for"],
      answerKey: "betale / pay",
      source: "Fasit: Forelesning 8, Shared Customer Insight, og eksamens-eksempelfilen slide 'Example: Shared customer insights'.",
      whyCorrect: "Riktig fordi Shared Customer Insights defineres som organisasjonslæring om hva kunder vil betale for og hvordan digital teknologi kan møte behovene.",
      whyWrong: "Galt hvis svaret bare handler om hva kunder 'liker' eller 'bruker'. Poenget er betalingsvilje/verdi og koblingen til digitale løsninger."
    },
    {
      id: 10,
      type: "single",
      title: "Accountability Framework",
      points: 1,
      prompt: "Accountability Framework skal særlig balansere ...",
      source: "Fasit: Forelesning 11, Accountability Framework, slides om autonomy and alignment.",
      options: [
        {
          text: "kostnad og skatt",
          correct: false,
          why: "Galt: dette er ikke AF-kjernen.",
          whyExtended: [
            "Accountability Framework handler om organisatorisk ansvarsfordeling for digitale tilbud og komponenter, ikke om skattespørsmål.",
            "AF-definisjonen er: 'distribution of responsibilities for digital offerings and components that balances autonomy and alignment'.",
            "Kostnad kan være en faktor i beslutninger, men AF handler om hvem som har ansvar og beslutningsmyndighet — ikke om finansiell optimalisering.",
            "Forelesning 11 fokuserer på temaer som component owners, metrics, tillit og empowered teams — ikke på regnskaps- eller skatteforhold."
          ]
        },
        {
          text: "autonomi og alignment",
          correct: true,
          why: "Riktig: AF fordeler ansvar for digitale tilbud og komponenter slik at autonomi balanseres med samordning.",
          whyExtended: [
            "D4D-definisjonsarket sier eksplisitt: 'Distribution of responsibilities for digital offerings and components that balances autonomy and alignment.'",
            "Forelesning 11 beskriver AF-nøkkelmekanismer: empowered teams (autonomi), modular architecture (løs kobling), missions (felles retning) og knowledge sharing (alignment).",
            "AF fremmer 'component owners, not project owners', 'metrics, not directives', 'trust, not control' og 'experiments, not major launches'.",
            "Utfordringen AF adresserer er: hvordan frigjøre kreativitet og innovasjon (autonomi) uten å miste felles retning og standardisering (alignment)."
          ]
        },
        {
          text: "hardware og software",
          correct: false,
          why: "Galt: AF er organisatorisk/governance-orientert, ikke en hardware/software-balanse.",
          whyExtended: [
            "AF er en organisatorisk byggekloss som handler om roller, ansvar og beslutningsrettigheter — ikke om teknologivalg.",
            "Hardware/software-vurderinger hører mer til IT Architecture-verktøyet i CIO toolbox, der man analyserer infrastruktur og applikasjoner.",
            "Forelesning 11 handler om å 'encourage desirable behaviour in using IT' og 'empower people to imagine and build great components'.",
            "D4D skiller mellom arkitekturtransformasjon (OB, DP — tekniske komponenter) og governance-transformasjon (SCI, AF — organisatoriske mekanismer)."
          ]
        },
        {
          text: "scope og budsjett",
          correct: false,
          why: "Galt: dette passer bedre med prosjektstyring/triple constraint.",
          whyExtended: [
            "Scope og budsjett er kjernevariabler i prosjektstyringens triple constraint (scope, time, cost), ikke i Accountability Framework.",
            "Forelesning 4 presenterer triple constraint som en prosjektutfordring der fastlåsing av alle tre variabler gjør prosjekter 'particularly vulnerable to disappointment'.",
            "AF handler om å distribuere ansvar og gi autonomi innenfor alignment — det er et varig organisasjonsprinsipp, ikke en prosjektstyringsteknikk.",
            "Produktteam-logikken i CIO toolbox (verktøy 6) erstatter nettopp scope/budsjett-tenkning med 'outcome over output' og kontinuerlig utvikling."
          ]
        }
      ]
    },
    {
      id: 11,
      type: "single",
      title: "External Developer Platform",
      points: 1,
      prompt: "Hva beskriver best en External Developer Platform?",
      source: "Fasit: Forelesning 12, External Development Platform, slide 'External Developer Platform'.",
      options: [
        {
          text: "Et internt lønnssystem for ansatte",
          correct: false,
          why: "Galt: det er et internt system, ikke en plattform åpnet mot eksterne parter.",
          whyExtended: [
            "ExDP handler eksplisitt om å åpne digitale komponenter for eksterne parter — det er en utadrettet kapabilitet.",
            "Et lønnssystem er en intern støttefunksjon som verken har med plattformstrategi eller digital innovasjon å gjøre.",
            "Forelesning 12 viser at ExDP 'increases the payback on investments — you may need outside parties' creativity to generate digital offerings'.",
            "ExDP krever API-er og boundary resources som gir strukturert tilgang til kjernekomponenter — noe et lønnssystem ikke tilbyr."
          ]
        },
        {
          text: "Et repository av digitale komponenter som åpnes for eksterne parter",
          correct: true,
          why: "Riktig: ExDP åpner digitale komponenter for partnere/eksterne utviklere, ofte via API-er/boundary resources.",
          whyExtended: [
            "D4D-definisjonsarket sier: 'Repository of digital components open to external parties.'",
            "Forelesning 12 beskriver to typer ExDP: én der partnere bruker selskapets interne komponenter i sine egne tilbud (f.eks. Google Maps), og én som skaper en markedsplass for relaterte digitale tilbud (f.eks. Apple App Store).",
            "ExDP krever boundary resources — API-er, dokumentasjon og verktøy som lar eksterne bygge på plattformen.",
            "Forelesning 12 presiserer at ExDP krever 'a very well designed and managed internal platform' — det forutsetter moden OB og DP."
          ]
        },
        {
          text: "En teknikk for å lage BPMN-diagrammer",
          correct: false,
          why: "Galt: BPMN hører til prosessmodellering.",
          whyExtended: [
            "BPMN (Business Process Model and Notation) er en modelleringsteknikk under IT Architecture-verktøyet i CIO toolbox.",
            "BPMN brukes til å kartlegge prosessflyt med swimlanes, roller og aktiviteter — det er en intern analyseteknikk.",
            "ExDP handler om å åpne digitale komponenter mot omverdenen via API-er, ikke om intern prosessmodellering.",
            "Forelesning 5 plasserer BPMN under Business process modeling som del av IT Architecture."
          ]
        },
        {
          text: "En styringsarketype der sluttbrukere tar alle IT-beslutninger",
          correct: false,
          why: "Galt: dette beskriver Anarchy i IT governance, ikke ExDP.",
          whyExtended: [
            "Anarchy er den mest desentraliserte IT governance-arketypen der 'each individual user or small group pursues his, her or their own IT agenda' (Weill & Ross 2005).",
            "Forelesning 6 plasserer Anarchy som én av seks arketyper i styringsmatrisen — det er en governance-mekanisme, ikke en plattformstrategi.",
            "ExDP er en D4D-byggekloss som handler om å dele digitale komponenter med eksterne partnere, ikke om intern beslutningsmyndighet.",
            "De seks governance-arketypene (Business Monarchy, IT Monarchy, Federal, IT Duopoly, Feudal, Anarchy) tilhører IT governance-verktøyet, ikke D4D-byggeblokkene."
          ]
        }
      ]
    },
    {
      id: 12,
      type: "multi",
      title: "IT governance",
      points: 1,
      prompt: "Marker riktige utsagn om IT governance.",
      source: "Fasit: Forelesning 6, IT governance, slides 'IT governance' og 'Styringsmatrisen'.",
      options: [
        {
          text: "Det handler om å samkjøre IT-investeringer med virksomhetens prioriteringer.",
          correct: true,
          why: "Riktig: effective governance aligns IT investments with business priorities.",
          whyExtended: [
            "CIO toolbox-modellen sier at IT governance sin purpose er å 'align IT investments with business priorities and assign accountability for outcomes'.",
            "Forelesning 6 og kursoppsummeringen bekrefter at effektiv governance kobler IT-investeringer til overordnede forretningsprioriteringer.",
            "IT governance sikrer at organisasjonens IT-ressurser brukes i tråd med strategiske mål, ikke bare tekniske preferanser."
          ]
        },
        {
          text: "Det handler om hvem som tar IT-beslutninger og hvem som er ansvarlig for resultater.",
          correct: true,
          why: "Riktig: beslutningsrettigheter og accountability er kjernen.",
          whyExtended: [
            "Weill and Ross (2004) definerer IT governance som å 'specifying the decision rights and accountability framework to encourage desirable behaviour in using IT'.",
            "Forelesning 11 presiserer: 'IT governance is not about making IT decisions — management does that — but rather determines who systematically makes and contributes to those decisions.'",
            "Styringsmatrisen kobler beslutningsdomener med arketyper for å avklare hvem som bestemmer hva."
          ]
        },
        {
          text: "Det betyr at alle IT-beslutninger alltid skal tas av IT-avdelingen alene.",
          correct: false,
          why: "Galt: noen domener kan være IT monarchy, men IT governance handler nettopp om å avklare hvem som bestemmer, ikke at IT alltid bestemmer.",
          whyExtended: [
            "IT monarchy — der IT-ledere tar beslutningene — er bare én av seks arketyper. De andre inkluderer business monarchy, federal, duopoly, feudal og anarchy.",
            "Hele poenget med styringsmatrisen er at ulike beslutningsdomener kan ha ulike arketyper — IT-prinsipper kan styres av business monarchy mens IT-infrastruktur styres av IT monarchy.",
            "Forelesning 6 viser at governance handler om å finne riktig balanse mellom sentralisering (scale, compliance) og desentralisering (agility, local fit).",
            "Å la IT alltid bestemme alt ville ignorere at forretningsenheter og brukere har viktig innsikt i sine egne behov."
          ]
        },
        {
          text: "Det kan beskrives med en styringsmatrise med beslutningsdomener og styringsarketyper.",
          correct: true,
          why: "Riktig: styringsmatrisen kobler beslutningsdomener med arketyper som business monarchy, IT monarchy, federal, duopoly osv.",
          whyExtended: [
            "Forelesning 6 presenterer styringsmatrisen med fem beslutningsdomener (IT principles, IT architecture, IT infrastructure, business application needs, IT investment) langs én akse og seks arketyper langs den andre.",
            "Matrisen gjør det mulig å spesifisere hvem som bestemmer hva — f.eks. kan IT principles styres av business monarchy mens infrastructure styres av IT monarchy.",
            "Weill & Ross (2005) publiserte denne tilnærmingen i MIT Sloan Management Review som 'A Matrixed Approach to Designing IT Governance'."
          ]
        }
      ]
    },
    {
      id: 13,
      type: "single",
      title: "IT governance archetypes",
      points: 1,
      prompt: "Hvilken arketype beskriver at beslutninger tas av en IT-leder eller en gruppe IT-ledere?",
      source: "Fasit: Forelesning 6, summary of six archetypal approaches to IT decision making.",
      options: [
        {
          text: "Business Monarchy",
          correct: false,
          why: "Galt: business monarchy betyr at senior business executives tar beslutningene, eventuelt med CIO.",
          whyExtended: [
            "Forelesning 6 definerer Business Monarchy som 'the most centralized approach — a senior business executive or a group of senior executives, sometimes including the CIO, makes all the IT-related decisions for the enterprise'.",
            "Nøkkelen er at det er forretningsledere (ikke IT-ledere) som bestemmer, selv om CIO noen ganger er inkludert.",
            "Business Monarchy er den mest sentraliserte arketypen — alle IT-relaterte beslutninger i et gitt domene tas på toppnivå.",
            "Forskjellen fra IT Monarchy er hvem som sitter i førersetet: forretningsledere vs. IT-ledere."
          ]
        },
        {
          text: "IT Monarchy",
          correct: true,
          why: "Riktig: IT monarchy betyr at en IT executive eller gruppe IT executives tar beslutningene.",
          whyExtended: [
            "Forelesning 6 definerer IT Monarchy som: 'decisions are made by an individual IT executive or a group of IT executives'.",
            "IT Monarchy gir IT-ledelsen beslutningsmyndighet i det gitte domenet — det er sentralisert, men med IT-faglig forankring.",
            "I styringsmatrisen kan IT Monarchy brukes for domener der teknisk ekspertise er avgjørende, for eksempel IT-infrastruktur.",
            "De seks arketypene utgjør et spektrum fra svært sentralisert (Business/IT Monarchy) til svært desentralisert (Anarchy)."
          ]
        },
        {
          text: "Federal",
          correct: false,
          why: "Galt: federal kombinerer C-level og business representatives, ofte sammen med IT.",
          whyExtended: [
            "Forelesning 6 definerer Federal som: 'C-level executives and business representatives of all the operating groups collaborate with the IT department.'",
            "Federal-arketypen ligner et føderalt styresett der sentralmakt og lokale enheter samarbeider om beslutninger.",
            "Forskjellen fra IT Monarchy er at Federal inkluderer forretningsrepresentanter fra alle operasjonelle enheter, ikke bare IT-ledere.",
            "Federal er en samarbeidstilnærming — den innebærer bredere involvering enn både Business Monarchy og IT Monarchy."
          ]
        },
        {
          text: "Anarchy",
          correct: false,
          why: "Galt: anarchy betyr at enkeltbrukere eller små grupper følger egen IT-agenda.",
          whyExtended: [
            "Forelesning 6 definerer Anarchy som 'the most decentralized system, in which each individual user or small group pursues his, her or their own IT agenda'.",
            "Anarchy er det motsatte av monarchy — det er fullstendig desentralisert uten koordinert beslutningsmyndighet.",
            "Anarchy kan oppstå når governance-strukturer er svake eller fraværende, noe som kan føre til fragmentering og duplisering.",
            "Arketypen innebærer at ingen har overordnet ansvar — den plasseres nederst på sentraliseringsskalaen i Weill & Ross' modell."
          ]
        }
      ]
    },
    {
      id: 14,
      type: "single",
      title: "IT Architecture",
      points: 1,
      prompt: "Hvilket utsagn passer best med Fowler-perspektivet på arkitektur?",
      source: "Fasit: Forelesning 5, IT Architecture, perspektiver på arkitektur.",
      options: [
        {
          text: "Arkitektur er bare de formelle TOGAF-prosessene i ADM.",
          correct: false,
          why: "Galt: dette snevrer arkitektur inn til TOGAF. Fowler-perspektivet er mer pragmatisk.",
          whyExtended: [
            "TOGAF representerer et formelt og ofte sentralisert perspektiv på arkitektur, mens Fowler representerer et mer meritokratisk og desentralisert perspektiv.",
            "Forelesning 5 kontrasterer TOGAF (formal architecture governance) med Fowler (architecture as 'the important stuff').",
            "TOGAF bruker ADM (Architecture Development Method) som en strukturert prosess med definerte faser — dette er bare ett av flere syn på arkitektur i kurset.",
            "CIO toolbox-modellen nevner også Open Agile Architecture som et tredje perspektiv, med fokus på modularity, standardization og responsiveness."
          ]
        },
        {
          text: "Arkitektur er 'the important stuff' - det som utviklere og organisasjonen mener er viktig å forstå og ta vare på.",
          correct: true,
          why: "Riktig: Fowler brukes for å vise et mer kontekstuelt og samarbeidsorientert syn på arkitektur.",
          whyExtended: [
            "CIO toolbox-modellen beskriver Fowler-perspektivet som: 'architecture as \"the important stuff\"; collaborative, decentralized orientation'.",
            "Forelesning 5 sier at Fowler er 'the closest we get to an architecture thought leader in agile development' og representerer 'a more meritocratic and decentralized perspective'.",
            "Fowler-perspektivet handler om at arkitektur er det teamet kollektivt mener er viktig nok til å passe på — det er kontekstavhengig og pragmatisk.",
            "Dette perspektivet passer godt med agile utviklingsmetoder der team tar eierskap til tekniske valg."
          ]
        },
        {
          text: "Arkitektur gjelder kun fysisk nettverk og maskinvare.",
          correct: false,
          why: "Galt: IT-arkitektur kan omfatte systemer, software, data, integrasjoner og beslutninger.",
          whyExtended: [
            "TOGAF sin arkitekturtaksonomi inkluderer Business Architecture, Data Architecture, Application Architecture og Technology Architecture — ikke bare fysisk infrastruktur.",
            "Forelesning 5 viser at operating model, prosessintegrasjon og standardisering alle er arkitekturrelaterte konsepter.",
            "Selv Technology Architecture i TOGAF handler om 'logisk software og hardware capabilities', ikke bare fysiske nettverk.",
            "Arkitektur i kurset omfatter valg om systemer, data, integrasjon og organisering — det er et helhetlig perspektiv."
          ]
        },
        {
          text: "Arkitektur er identisk med prosjektledelse.",
          correct: false,
          why: "Galt: prosjektledelse organiserer leveranse; arkitektur handler om struktur, avhengigheter og viktige teknologiske/organisatoriske valg.",
          whyExtended: [
            "Prosjektledelse er verktøy nr. 5 i CIO toolbox med purpose 'Plan and organize development', mens IT Architecture er verktøy nr. 4 med purpose 'Analyze and structure the IT portfolio'.",
            "Prosjektledelse handler om å organisere en midlertidig leveranse innenfor scope, tid og kostnad (triple constraint).",
            "Arkitektur handler om varige strukturelle valg: operating model, prosessintegrasjon, komponentavhengigheter og teknologistandarder.",
            "Et prosjekt kan implementere arkitekturbeslutninger, men arkitekturen lever videre etter at prosjektet er avsluttet."
          ]
        }
      ]
    },
    {
      id: 15,
      type: "single",
      title: "Operating model",
      points: 1,
      prompt: "Et operating model beskriver ønsket nivå av ...",
      source: "Fasit: Forelesning 5, slide om operating model og fire operating models.",
      options: [
        {
          text: "business process integration og standardization",
          correct: true,
          why: "Riktig: operating model beskriver ønsket nivå av prosessintegrasjon og standardisering.",
          whyExtended: [
            "CIO toolbox-modellen beskriver operating model som 'process integration × standardization' med fire modeller: coordination, unification, diversification og replication.",
            "Forelesning 5 viser at operating model er en 'strategic bridge' under IT Architecture-verktøyet.",
            "Integration handler om i hvilken grad prosesser deler data og er koordinert på tvers. Standardization handler om i hvilken grad prosesser utføres likt.",
            "De fire operating models gir ulike kombinasjoner: høy/lav integrasjon × høy/lav standardisering."
          ]
        },
        {
          text: "individuell motivasjon og personlighet",
          correct: false,
          why: "Galt: dette er HR/ledelse, ikke operating model i D4D/EA-forstand.",
          whyExtended: [
            "Individuell motivasjon hører til HR og personalledelse, som ikke er del av CIO toolbox eller D4D-rammeverket.",
            "Operating model er et arkitekturkonsept som handler om organisatorisk design av prosesser og systemer, ikke individuell psykologi.",
            "Forelesning 5 handler om prosessintegrasjon og standardisering som arkitektonisk fundament — ikke om medarbeidertilfredshet.",
            "CIO toolbox-modellen nevner HR under 'Outside the toolbox, but part of IT management' — det er en separat disiplin."
          ]
        },
        {
          text: "risikopremie og rente",
          correct: false,
          why: "Galt: dette hører til business case/NPV.",
          whyExtended: [
            "Risikopremie og diskonteringsrate er sentrale i NPV-beregningen under business case-verktøyet (verktøy 1 i CIO toolbox).",
            "Forelesning 3 viser NPV-formelen der diskonteringsraten (inkludert risikopremie) brukes til å beregne nåverdien av fremtidige kontantstrømmer.",
            "Operating model handler om prosessdesign og organisering, ikke om finansielle beregninger.",
            "Business case og operating model er to helt ulike verktøy i CIO toolbox med ulike formål."
          ]
        },
        {
          text: "antall ansatte og antall møter",
          correct: false,
          why: "Galt: operating model handler om integrasjon/standardisering av prosesser, ikke administrativ kapasitet.",
          whyExtended: [
            "Operating model defineres langs dimensjonene prosessintegrasjon og prosessstandardisering — ikke etter bemanning eller møtefrekvens.",
            "Antall ansatte er et kapasitetsspørsmål; operating model handler om hvordan prosesser er strukturert og koordinert.",
            "De fire operating models (coordination, unification, diversification, replication) handler alle om prosessdesign, ikke om organisasjonsstørrelse.",
            "Selv et lite team kan operere med et unification-modell (høy integrasjon + høy standardisering) — det er designvalget som avgjør, ikke antall personer."
          ]
        }
      ]
    },
    {
      id: 16,
      type: "fill",
      title: "Project",
      points: 1,
      prompt: "Et prosjekt er en ________ organisasjon etablert for å levere spesifiserte resultater eller produkter innen en spesifisert periode.",
      answers: ["midlertidig", "temporary", "temporær", "ad hoc", "ad-hoc"],
      answerKey: "midlertidig / temporary",
      source: "Fasit: Forelesning 4, slide 'What is a project?'.",
      whyCorrect: "Riktig fordi prosjektet defineres som en temporary organization med spesifisert resultat og tidsperiode.",
      whyWrong: "Galt hvis svaret antyder permanent linjeorganisasjon. Prosjektets særtrekk er nettopp midlertidig organisering."
    },
    {
      id: 17,
      type: "multi",
      title: "Scrum og agile",
      points: 1,
      prompt: "Marker utsagn som passer med Scrum/agile tankegang i kurset.",
      source: "Fasit: IN5431 summary, Scrum: self-organizing teams, sprints, value prioritization.",
      options: [
        {
          text: "Arbeidet grupperes ofte i sprinter.",
          correct: true,
          why: "Riktig: Scrum organiserer arbeid i sprints.",
          whyExtended: [
            "Kursoppsummeringen lister 'work is grouped in sprints' som et nøkkeltrekk ved Scrum.",
            "Sprinter er tidsavgrensede iterasjoner (typisk 1–4 uker) der teamet leverer et inkrement av produktet.",
            "Sprint-strukturen gjør at teamet regelmessig kan evaluere progresjon og justere prioriteringer."
          ]
        },
        {
          text: "Team er selvorganiserende.",
          correct: true,
          why: "Riktig: selvorganiserende team er sentralt i Scrum/agile.",
          whyExtended: [
            "Kursoppsummeringen lister 'self-organizing teams' som et kjernetrekk ved Scrum.",
            "Selvorganiserende team er knyttet til agile-verdien 'individuals and interactions over processes and tools'.",
            "Forelesning 4 og CIO toolbox-modellen beskriver produktteam-logikken: 'Autonomy vs. alignment' og 'lasting ownership of a digital product/service'.",
            "Agile-manifestets fire verdier understreker at mennesker og samarbeid prioriteres over prosesser og verktøy."
          ]
        },
        {
          text: "Oppgaver prioriteres etter verdi.",
          correct: true,
          why: "Riktig: backlog/prioritering etter verdi er sentralt.",
          whyExtended: [
            "Kursoppsummeringen lister 'tasks are prioritized by value' som et nøkkeltrekk ved Scrum.",
            "Product backlog ordnes etter forretningsverdi, slik at de viktigste funksjonene leveres først.",
            "Dette står i kontrast til prosjektbasert tenkning der oppgaverekkefølgen gjerne styres av avhengigheter og milepæler.",
            "Verdiprioritering støtter agile-verdien 'responding to change over following a plan'."
          ]
        },
        {
          text: "Alt scope, tid og kostnad bør låses helt fra start for å sikre smidighet.",
          correct: false,
          why: "Galt: dette er mer klassisk prosjekt/triple constraint og passer dårlig med læring og tilpasning i agile.",
          whyExtended: [
            "Triple constraint (scope, time, cost) er et prosjektstyringskonsept fra forelesning 4 — CIO toolbox-modellen sier 'Scope, time, cost — all three fixed → vulnerable'.",
            "Å låse alle tre variabler er nettopp det som gjør tradisjonelle prosjekter sårbare, ifølge forelesningen.",
            "Agile og Scrum bygger på motsatt logikk: tilpass scope basert på læring, lever verdi iterativt, og bruk feedback til å justere kursen.",
            "Kursoppsummeringen lister agile-verdien 'responding to change over following a plan' — fastlåsing fra start motarbeider dette.",
            "Agile method er 'NOT a process to follow or tools to use, but a mindset on how people think' — det handler om fleksibilitet og læring."
          ]
        }
      ]
    },
    {
      id: 18,
      type: "single",
      title: "Design thinking",
      points: 1,
      prompt: "Når passer design thinking best?",
      source: "Fasit: Forelesning 4, Design thinking, og CIO toolbox purpose-tabellen.",
      options: [
        {
          text: "Når problemet er uklart og må utforskes med brukerinnsikt, prototyping og testing",
          correct: true,
          why: "Riktig: design thinking er eksplorativt og passer når problem/brukerbehov er usikkert.",
          whyExtended: [
            "CIO toolbox-modellen beskriver design thinking som 'Explorative approach — when the problem is unclear'.",
            "Nøkkelpraksis inkluderer problem-reframing, user insight, co-design, prototyping og small-scale testing.",
            "Design thinking bruker double diamond-prosessen: Discover → Define → Develop → Deliver.",
            "I Cynefin-termer passer design thinking best i complex-domenet der viktige faktorer er ukjente og eksperimentering er nødvendig."
          ]
        },
        {
          text: "Når løsningen allerede er kjent og bare skal driftes billigst mulig",
          correct: false,
          why: "Galt: da passer standard prosess/drift bedre enn eksplorativ design thinking.",
          whyExtended: [
            "Når løsningen er kjent, er situasjonen i Cynefin-termer 'clear' eller 'complicated' — da er prosedyrer og ekspertanalyse mer passende.",
            "Design thinking sin styrke er å utforske ukjente problemer og brukerbehov — den tilfører lite verdi når svaret allerede er kjent.",
            "Driftsoptimalisering hører til ITIL og IT service management, som ligger utenfor CIO toolbox men er del av IT management.",
            "Å bruke design thinking for et kjent driftsproblem ville vært unødvendig ressursbruk og feil verktøy for konteksten."
          ]
        },
        {
          text: "Når eneste mål er å beregne diskontert kontantstrøm",
          correct: false,
          why: "Galt: dette er business case/NPV, ikke design thinking.",
          whyExtended: [
            "Diskontert kontantstrøm (NPV) er kjerneberegningen i business case-verktøyet (verktøy 1 i CIO toolbox).",
            "Business case handler om 'rational choices & utility maximisation' — det er analytisk og kvantitativt.",
            "Design thinking handler om å forstå brukerbehov og utforske løsningsrom — det er kvalitativt og eksplorativt.",
            "De to verktøyene adresserer ulike stadier: design thinking avdekker hva som bør bygges, business case evaluerer om det er verdt å investere."
          ]
        },
        {
          text: "Når alle beslutninger skal tas av én IT-leder",
          correct: false,
          why: "Galt: dette beskriver IT monarchy, ikke design thinking.",
          whyExtended: [
            "IT Monarchy er en governance-arketype der 'decisions are made by an individual IT executive or a group of IT executives' (forelesning 6).",
            "Design thinking er et verktøy for innovasjon og utforskning, ikke en governance-mekanisme for beslutningsfordeling.",
            "Design thinking involverer typisk tverrfaglige team, brukerinnsikt og co-design — det er deltakende, ikke sentralisert.",
            "IT governance og design thinking løser ulike problemer: governance handler om hvem som bestemmer, design thinking handler om hva som bør lages."
          ]
        }
      ]
    },
    {
      id: 19,
      type: "single",
      title: "Strategy",
      points: 1,
      prompt: "Ifølge Porter-perspektivet i kurset er strategi primært ...",
      source: "Fasit: Forelesning 2, Strategy, slides om operational effectiveness vs strategic positioning.",
      options: [
        {
          text: "å utføre de samme aktivitetene litt mer effektivt enn rivaler",
          correct: false,
          why: "Galt: dette er operational effectiveness. Det er nødvendig, men ikke tilstrekkelig for strategi.",
          whyExtended: [
            "Forelesning 2 sier eksplisitt: 'Operational effectiveness is necessary, but not sufficient to achieve sustainable competitive advantage.'",
            "Operational effectiveness defineres som 'Perform similar activities better than rivals perform them' — det er 'best practice', ikke strategi.",
            "Porter argumenterer for at rivaler raskt kan kopiere operasjonelle forbedringer, så de gir bare midlertidig fortrinn.",
            "Eksempler på OE-aktiviteter fra forelesningen: quality assurance, project management, HR — viktige, men ikke strategisk differensierende."
          ]
        },
        {
          text: "å velge en unik posisjon, gjøre trade-offs og skape et sammenhengende aktivitetssystem",
          correct: true,
          why: "Riktig: Porter-perspektivet vektlegger unique activities, fit og trade-offs.",
          whyExtended: [
            "Forelesning 2 oppsummerer: 'A working strategy must make explicit trade-offs and choices — it is not sustainable to excel at everything.'",
            "Porter: 'Competitive strategy is about being different — about choosing a different set of activities to deliver a unique mix of value.'",
            "Strategi krever et sammenhengende aktivitetssystem: 'Activities must be aligned and coherent with the overall strategy.'",
            "Forelesningen viser at strategisk posisjonering handler om å gjøre andre ting enn konkurrentene, eller gjøre lignende ting på andre måter — med eksempler som IKEA, Southwest Airlines og BIC."
          ]
        },
        {
          text: "å kjøpe det nyeste IT-systemet",
          correct: false,
          why: "Galt: teknologi kan støtte strategi, men er ikke strategi i seg selv.",
          whyExtended: [
            "Porter-perspektivet handler om aktiviteter og posisjonering, ikke om teknologianskaffelse isolert.",
            "Forelesning 2 viser at strategi handler om trade-offs og hva man velger å ikke gjøre — teknologi er et virkemiddel, ikke et mål.",
            "Kursoppsummeringen om digital business design sier eksplisitt: 'NOT IT architecture — cool architecture that doesn't solve business challenge is inadequate.'",
            "Strategisk bruk av IT handler om å støtte unike aktiviteter og verdiskapning, ikke om å ha nyest mulig teknologi."
          ]
        },
        {
          text: "å maksimere antall prosjekter i porteføljen",
          correct: false,
          why: "Galt: strategi handler også om prioritering og hva man ikke skal gjøre.",
          whyExtended: [
            "Porter-perspektivet vektlegger trade-offs: 'about making trade-offs in competing — what NOT to do?'",
            "Forelesning 2 oppsummerer at strategi krever fokus og prioritering — flere prosjekter betyr ikke bedre strategi.",
            "Et sammenhengende aktivitetssystem forutsetter at aktiviteter forsterker hverandre — å spre seg tynt undergraver fit.",
            "D4D-oppsummeringen advarer mot nettopp dette under risiko ved digital transformasjon: 'dividing resources across so many building blocks → may not make real progress'."
          ]
        }
      ]
    },
    {
      id: 20,
      type: "fill",
      title: "SMACIT",
      points: 1,
      prompt: "SMACIT står for Social, Mobile, Analytics, Cloud og Internet of ________.",
      answers: ["things", "ting", "iot"],
      answerKey: "Things / IoT",
      source: "Fasit: Forelesning 7, Designed for digital, SMACIT slide.",
      whyCorrect: "Riktig: SMACIT = Social, Mobile, Analytics, Cloud, Internet of Things.",
      whyWrong: "Galt hvis siste ledd ikke viser til IoT/Internet of Things, fordi akronymet i pensum bruker dette som T-en."
    },
    {
      id: 21,
      type: "single",
      title: "Digital strategy",
      points: 1,
      prompt: "Hva er en digital strategy i Danilova-forelesningen?",
      source: "Fasit: Forelesning 14, Digital strategy and the digital transformation, slide 'What is a digital strategy?'.",
      options: [
        {
          text: "En ren IT-anskaffelsesplan",
          correct: false,
          why: "Galt: dette er for snevert og ligner IT-strategy/anskaffelse.",
          whyExtended: [
            "Forelesning 14 skiller mellom business strategy, IT-strategy og digital strategy — de er ikke det samme.",
            "IT-strategy handler om anskaffelse og forvaltning av teknologi, mens digital strategy handler om å utnytte digitale ressurser for å skape differensiell verdi.",
            "En anskaffelsesplan ser på kostnader og tekniske krav, mens digital strategy handler om verdiskapning og konkurransefortrinn.",
            "Kursoppsummeringen sier at digital business design handler om 'NOT an endstate, but requires continually distinguishing between stable and dynamic' — det er langt bredere enn anskaffelse."
          ]
        },
        {
          text: "En organisatorisk strategi formulert og utført ved å utnytte digitale ressurser for å skape differensiell verdi",
          correct: true,
          why: "Riktig: dette er definisjonen brukt i forelesningen.",
          whyExtended: [
            "Forelesning 14 presenterer definisjonen fra Bharadwaj et al. (2013): 'An organizational strategy formulated and executed by leveraging digital resources to create differential value.'",
            "Nøkkelen er at det er en organisatorisk strategi — ikke bare en teknologiplan — som bruker digitale ressurser strategisk.",
            "Differensiell verdi betyr verdi som skiller seg fra konkurrentene — det kobler digital strategy til Porters strategiske posisjonering.",
            "Forelesning 14 sier at ledere bør kunne stille spørsmål om digital teknologis characteristics, opportunities, prerequisites og consequences."
          ]
        },
        {
          text: "En liste over alle systemer organisasjonen eier",
          correct: false,
          why: "Galt: dette er mer IT-portefølje/arkitekturdokumentasjon.",
          whyExtended: [
            "En systemliste er en del av IT-porteføljeforvaltning eller enterprise architecture-dokumentasjon, ikke en digital strategy.",
            "IT Architecture-verktøyet i CIO toolbox har purpose 'Analyze and structure the IT portfolio' — det er kartlegging, ikke strategi.",
            "Digital strategy handler om å bruke digitale ressurser for verdiskapning, ikke om å dokumentere eksisterende systemer.",
            "Strategisk bruk av IT-porteføljen krever at den kobles til organisasjonens overordnede mål og posisjonering."
          ]
        },
        {
          text: "En BPMN-modell av kundereisen",
          correct: false,
          why: "Galt: BPMN/kundereise kan støtte analyse, men er ikke definisjonen av digital strategy.",
          whyExtended: [
            "BPMN er en modelleringsnotasjon for prosessflyt — den tilhører IT Architecture-verktøyet, ikke strategidefinisjonen.",
            "En kundereise kan gi verdifull innsikt som informerer strategi, men kundereisemodellen i seg selv er ikke strategien.",
            "Digital strategy handler om å formulere og utføre en organisatorisk strategi med digitale ressurser — det er langt bredere enn én modell.",
            "BPMN-modeller kan brukes som verktøy i design thinking eller prosessanalyse, men de er ikke et strategisk sluttprodukt."
          ]
        }
      ]
    },
    {
      id: 22,
      type: "multi",
      title: "Sustainability og IT management",
      points: 1,
      prompt: "Marker riktige utsagn om bærekraft og digital teknologi.",
      source: "Fasit: Forelesning 15, Sustainability: Implications for management, slides 3-5.",
      options: [
        {
          text: "Digital teknologi kan bidra gjennom virtualisering, optimalisering, monitorering og innovasjon.",
          correct: true,
          why: "Riktig: dette listes eksplisitt som måter digital teknologi kan støtte bærekraftstransisjoner.",
          whyExtended: [
            "Forelesning 15 slide 3 lister fire måter: Virtualization (digital replace physical), Optimization (reduce waste), Monitoring (informing action), Drive innovation (new technologies).",
            "Disse representerer den positive siden av digital teknologis bærekraftsbidrag — men forelesningen presiserer at teknologi også har negative impacts.",
            "Twin transitions-perspektivet (digital transformasjon + bærekraftstransisjon) viser at begge må ses i sammenheng."
          ]
        },
        {
          text: "Digital teknologi har ingen negative miljømessige eller sosiale konsekvenser fordi den er virtuell.",
          correct: false,
          why: "Galt: forelesningen understreker materialitet, e-avfall, energibruk og sosial disrupsjon.",
          whyExtended: [
            "Forelesning 15 slide 4 sier eksplisitt: 'ICT is not only virtual, also material artefacts' — med fire konkrete negative impacts.",
            "Negative impacts inkluderer: Rare Earth Minerals/mining/conflicts, Electronic waste, Energy consumption og Social disruption (f.eks. Airbnb-konflikter i nabolag).",
            "Forelesningen siterer forskning: 'It is unclear whether the increased electricity and rare material use due to digitalization will be compensated by efficiency gains and sustainable behaviors fostered by digital innovations.'",
            "Slide 5 oppsummerer at organisasjoner bør 'employ digital technology responsibly' — nettopp fordi det finnes negative konsekvenser."
          ]
        },
        {
          text: "IKT har også materielle sider som mineraler, e-avfall og energiforbruk.",
          correct: true,
          why: "Riktig: dette er sentrale negative impacts i forelesningen.",
          whyExtended: [
            "Forelesning 15 slide 4 lister eksplisitt: Rare Earth Minerals (mining, conflicts), Electronic waste og Energy consumption.",
            "Digital Product Passport (EU) vil fra 2028 gjelde for ICT og electronics — nettopp fordi materialitetens miljøpåvirkning krever dokumentasjon.",
            "Bærekraft handler om tre dimensjoner: economic, social og environmental — IKTs materielle side påvirker spesielt den miljømessige dimensjonen."
          ]
        },
        {
          text: "Top-down bærekraftspolitikk kan kreve data og rapportering.",
          correct: true,
          why: "Riktig: forelesningen kobler bærekraftspolitikk til rapportering og data.",
          whyExtended: [
            "Forelesning 15 slide 5 sier: 'Top-down sustainability policies rely on data reporting.'",
            "Forelesningen dekker EU-krav til bærekraftsrapportering, inkludert konsepter som double materiality og scope 1, 2 og 3.",
            "Dette kobler bærekraft direkte til IT management: data-innsamling, systemstøtte og rapporteringsverktøy er nødvendige for å oppfylle kravene.",
            "Forelesningen oppsummerer at bærekraft er relevant for IT-ledere fordi 'sustainability transitions require/enable innovation' og politikk krever data."
          ]
        }
      ]
    },
    {
      id: 23,
      type: "single",
      title: "Cynefin",
      points: 1,
      prompt: "Hvilken styringstilnærming passer best i et komplekst domene?",
      source: "Fasit: CIO toolbox model, meta-tool Cynefin.",
      options: [
        {
          text: "Følg beste praksis og standardprosedyre",
          correct: false,
          why: "Galt: dette passer best i clear-domene.",
          whyExtended: [
            "Forelesning 4 definerer clear-domenet: 'issues occurring are typically well known, and can be solved by previously agreed and often written procedures.'",
            "CIO toolbox-modellen sier: 'Clear → procedures, best practice.'",
            "I Cynefin-modellen bruker clear-domenet tilnærmingen Sense → Categorize → Respond — gjenkjenn situasjonen og bruk etablert prosedyre.",
            "Best practice fungerer i forutsigbare situasjoner, men i komplekse situasjoner er viktige faktorer ukjente — prosedyrer kan ikke dekke det ukjente."
          ]
        },
        {
          text: "Ekspertanalyse alene",
          correct: false,
          why: "Galt: dette passer bedre i complicated-domene.",
          whyExtended: [
            "Forelesning 4 definerer complicated-domenet: 'a lot of non-trivial decisions have to be made — however, the cause-and-effect relationships are still possible to analyze in advance. This is said to be the «domain of experts».'",
            "CIO toolbox-modellen sier: 'Complicated → expert analysis, planning.'",
            "I Cynefin-modellen bruker complicated-domenet Sense → Analyze → Respond — analyser situasjonen med ekspertise og velg tilnærming.",
            "I complex-domenet er årsak-virkning ukjent på forhånd — ekspertanalyse alene er utilstrekkelig fordi man ikke vet hva man skal analysere."
          ]
        },
        {
          text: "Eksperimentering, læring og iterasjon",
          correct: true,
          why: "Riktig: complex-domene krever probe/sense/respond, eksperimentering og læring.",
          whyExtended: [
            "Forelesning 4 definerer complex-domenet: 'several important factors influencing the outcome are unknown, and experimentation is typically necessary to look for an approach to move towards the desired outcome.'",
            "CIO toolbox-modellen sier: 'Complex → experimentation, design thinking, agile.'",
            "I Cynefin-modellen bruker complex-domenet Probe → Sense → Respond — prøv noe, observer resultatene, og tilpass basert på læring.",
            "Denne tilnærmingen kobler direkte til design thinking (utforskning) og agile (iterasjon og tilpasning) i CIO toolbox."
          ]
        },
        {
          text: "Umiddelbar handling uten analyse",
          correct: false,
          why: "Galt: dette passer bedre i chaotic-domene.",
          whyExtended: [
            "Forelesning 4 definerer chaotic-domenet: 'there is typically an emergency which requires immediate action to move into a more stable state.'",
            "CIO toolbox-modellen sier: 'Chaotic → immediate action.'",
            "I Cynefin-modellen bruker chaotic-domenet Act → Sense → Respond — handle først for å stabilisere, og analyser etterpå.",
            "I komplekse situasjoner har man tid til å eksperimentere og lære — det er i kaotiske situasjoner man må handle umiddelbart uten forutgående analyse."
          ]
        }
      ]
    },
    {
      id: 24,
      type: "multi",
      title: "Operational Backbone vs Digital Platform",
      points: 1,
      prompt: "Marker riktige forskjeller mellom Operational Backbone og Digital Platform.",
      source: "Fasit: Forelesning 10, Digital Platform, slide 'An Operational Backbone is Not Enough for Digital Success'.",
      options: [
        {
          text: "Operational Backbone vektlegger stabilitet, standardisering og integrerte kjerneprosesser.",
          correct: true,
          why: "Riktig: OB er en reliable, integrated production environment for core processes.",
          whyExtended: [
            "Forelesning 10 beskriver OB som: 'tightly integrated, bulletproof production environment to ensure the reliability and security of business processes — reliable and transparent.'",
            "OB-definisjonen vektlegger standardisering og integrasjon av systemer, prosesser og data.",
            "Forelesning 9 viser eksempler: Nordstrom bruker OB til korrekt lagerstyring; Kaiser Permanente bruker OB for standardisert behandling på tvers av enheter.",
            "OB handler om å gjøre eksisterende kjerneprosesser pålitelige og effektive — det er fundamentet for videre digital suksess."
          ]
        },
        {
          text: "Digital Platform vektlegger komponenter som kan brukes til rask innovasjon og digitale tilbud.",
          correct: true,
          why: "Riktig: DP gir tilgang til data-, business- og teknologikomponenter for digital offerings.",
          whyExtended: [
            "Forelesning 10 beskriver DP som: 'provides easy access to the data, business and technology components that make up digital offerings — experimentation, rapid innovation and continuous feature enhancement.'",
            "DP består av gjenbrukbare komponenter: data components, infrastructure components, business components og cloud services.",
            "Forskjellen mellom OB og DP er fokus: OB = stabilitet og sikkerhet for kjerneprosesser; DP = eksperimentering og innovasjon for nye tilbud.",
            "D4D-roadmapen anbefaler: 'Fix the backbone' først, deretter 'Don't put off your digital platform for long — connect the modules.'"
          ]
        },
        {
          text: "Operational Backbone og Digital Platform er alltid det samme begrepet.",
          correct: false,
          why: "Galt: de henger sammen, men OB er stabil kjerne mens DP muliggjør gjenbruk og innovasjon.",
          whyExtended: [
            "Forelesning 10 sin tittelslide sier eksplisitt: 'An Operational Backbone is Not Enough for Digital Success' — de er altså to ulike ting.",
            "OB og DP har ulike formål: OB sikrer pålitelig drift, DP muliggjør rask utvikling av nye digitale tilbud.",
            "De er to separate D4D-byggeklosser som samvirker: OB gir stabilt fundament, DP bygger videre med gjenbrukbare komponenter.",
            "I D4D sin transformasjonsteori tilhører begge architecture transformation, men de adresserer ulike sider av arkitekturen."
          ]
        },
        {
          text: "En svak Operational Backbone kan bli et hinder for digital transformasjon.",
          correct: true,
          why: "Riktig: forelesningen peker på OB som et mulig hinder når systemer, data og prosesser er fragmenterte.",
          whyExtended: [
            "Forelesning 9 rapporterer: '44% of executives in established companies identified the operational backbone as the one building block that is currently the biggest obstacle to digital transformation.'",
            "Utfordringer med svak OB inkluderer legacy-systemer, fragmenterte data og manglende prosessstandardisering.",
            "D4D-roadmapen prioriterer derfor: 'Fix the backbone — you need to have a proper structure on the data, processes and applications.'",
            "Uten stabil OB mangler man grunnlaget for Digital Platform, og dermed også for rask innovasjon og nye digitale tilbud."
          ]
        }
      ]
    },
    {
      id: 25,
      type: "single",
      title: "Management frameworks",
      points: 1,
      prompt: "Hva er en god holdning til management frameworks i IN5431?",
      source: "Fasit: Forelesning 3/4/6, CIO toolbox concluding remarks.",
      options: [
        {
          text: "Rammeverk er alltid best practice og bør følges likt i alle situasjoner.",
          correct: false,
          why: "Galt: kurset understreker at rammeverk er kontekstavhengige.",
          whyExtended: [
            "Forelesning 6 sier eksplisitt: 'For these (and similar) frameworks and methods, their usefulness and value is highly context-sensitive — and sometimes disputed.'",
            "CIO toolbox-modellen starter med 'Read the room: understand purpose, strategy, resources, maturity and context' — kontekst kommer alltid først.",
            "Cynefin-rammeverket viser at ulike situasjoner krever ulike tilnærminger — best practice passer bare i clear-domenet.",
            "Forelesning 3 oppsummerer: 'No standard way of making choices' — det finnes ikke én universell tilnærming."
          ]
        },
        {
          text: "Rammeverk er mål i seg selv.",
          correct: false,
          why: "Galt: toolbox-metaforen sier at verktøy bare er meningsfulle hvis de tjener formålet.",
          whyExtended: [
            "CIO toolbox-modellen sier eksplisitt: 'Verktøy er ikke mål i seg selv — de er meningsfulle bare hvis de tjener sitt formål.'",
            "Toolbox-metaforen understreker at man velger verktøy basert på jobben som skal gjøres, ikke for verktøyets skyld.",
            "CIO toolbox-modellen sier: 'You cannot lead by theory: frameworks help, but leadership requires dialogue, judgement and learning.'",
            "Å behandle rammeverk som mål ville undergrave hele poenget med CIO toolbox: verktøy skal tilpasses situasjon og kontekst."
          ]
        },
        {
          text: "Rammeverk kan redusere usikkerhet og strukturere praksis, men må tilpasses kontekst, mennesker, miljø og strategi.",
          correct: true,
          why: "Riktig: dette er den mest presise IN5431-holdningen til frameworks.",
          whyExtended: [
            "CIO toolbox-modellen oppsummerer tilnærmingen i tre steg: (1) Read the room — forstå formål, strategi, ressurser og kontekst; (2) Choose the right tool; (3) You cannot lead by theory.",
            "Forelesning 6 sier at rammeverk er 'highly context-sensitive and sometimes disputed' — de har verdi, men ikke universell verdi.",
            "Kursoppsummeringen knytter rammeverk til at 'leadership requires dialogue, judgement and learning' — det er ikke nok å følge en oppskrift.",
            "Denne holdningen reflekteres i hele kursstrukturen: syv ulike verktøy med Cynefin som meta-verktøy for å velge riktig tilnærming basert på situasjon."
          ]
        },
        {
          text: "Rammeverk bør unngås fordi de aldri gir verdi.",
          correct: false,
          why: "Galt: rammeverk kan gi verdi, men må brukes kritisk og kontekstsensitivt.",
          whyExtended: [
            "CIO toolbox-modellen viser at rammeverk som PRINCE2, TOGAF, Scrum og ITIL har klare formål og bruksområder.",
            "Forelesning 3 argumenterer for at business case er verdifullt 'for high impact decisions, little prior experience, less trust' — rammeverk gir struktur i usikre situasjoner.",
            "CIO toolbox-tilnærmingen handler om å velge riktig verktøy for riktig situasjon — ikke om å unngå verktøy helt.",
            "Rammeverk reduserer usikkerhet, gir felles språk og strukturerer praksis — men bare når de tilpasses kontekst."
          ]
        }
      ]
    }
  ]
};
//src/data/questions.js
export const QUESTIONS = [
  {
    id: 1,
    type: "fill",
    title: "Business process",
    points: 1,
    prompt: "A business ________ is the combination of a set of activities within an enterprise with a structure describing their logical order and dependence whose objective is to produce a desired result.",
    answers: ["process", "prosess", "business process", "forretningsprosess"],
    answerKey: "process / business process / forretningsprosess",
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
      { text: "NPV tar hensyn til tidspunktet for nytte/kontantstrømmer.", correct: true, why: "Riktig: fremtidige kontantstrømmer diskonteres, så timing er sentralt." },
      { text: "Risiko håndteres typisk ved å øke estimert kostnad direkte i alle år.", correct: false, why: "Galt: risiko kan reflekteres i risikopremie/diskonteringsrate eller usikkerhet i estimater, men dette utsagnet gjør det for snevert og mekanisk." },
      { text: "NPV er en kvantitativ metode i en business case.", correct: true, why: "Riktig: NPV er en strukturert, kvantitativ beregning i business case." },
      { text: "De viktigste estimatene er vanligvis konverteringsrate og diskonteringsrate alene.", correct: false, why: "Galt: business case/NPV krever nytte, kostnad, timing og risiko. Konverteringsrate kan være relevant i noen cases, men er ikke generelt nok." }
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
      { text: "Business case", correct: true, why: "Riktig: business case brukes for prioritering av digitale tjenester og finansiering." },
      { text: "PRINCE2", correct: false, why: "Galt: PRINCE2 er knyttet til prosjektstyring og governance, ikke primært prioritering av finansiering." },
      { text: "ITIL", correct: false, why: "Galt: ITIL handler om IT service management/drift, ikke business case-prioritering." },
      { text: "BPMN", correct: false, why: "Galt: BPMN er en notasjon for prosessmodellering, ikke finansieringsprioritering." }
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
      { text: "Lav påvirkning og høy erfaring", correct: false, why: "Galt: dette tilsier ofte mindre analyse, fordi risiko og usikkerhet er lavere." },
      { text: "Høy påvirkning, lite tidligere erfaring og lav tillit mellom beslutningstakere", correct: true, why: "Riktig: høy impact, lite erfaring og lav tillit/shared perspective krever mer strukturert analyse." },
      { text: "En rutinebeslutning med etablert praksis", correct: false, why: "Galt: rutinebeslutninger kan ofte håndteres med enklere prosedyre eller erfaring." },
      { text: "Når alle alternativer har lik risiko", correct: false, why: "Galt: lik risiko alene er ikke hovedgrunnen til detaljert analyse; usikkerhet, impact og erfaring er viktigere." }
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
    points: 1,
    prompt: "Hvilke av disse er blant de fem D4D-byggeklossene?",
    source: "Fasit: Forelesning 13, Designed for digital summary, slide 'Assembling the building blocks'.",
    options: [
      { text: "Operational Backbone", correct: true, why: "Riktig: en av de fem byggeklossene." },
      { text: "Shared Customer Insights", correct: true, why: "Riktig: en av de fem byggeklossene." },
      { text: "PRINCE2", correct: false, why: "Galt: PRINCE2 er et prosjektstyringsrammeverk i CIO toolbox, ikke en D4D-byggekloss." },
      { text: "Digital Platform", correct: true, why: "Riktig: en av de fem byggeklossene." },
      { text: "Accountability Framework", correct: true, why: "Riktig: en av de fem byggeklossene." },
      { text: "External Developer Platform", correct: true, why: "Riktig: en av de fem byggeklossene." }
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
      { text: "Et midlertidig prosjektteam for digital innovasjon", correct: false, why: "Galt: dette beskriver mer et prosjekt eller produktteam, ikke en stabil operasjonell ryggrad." },
      { text: "Et sammenhengende sett av standardiserte og integrerte systemer, prosesser og data som støtter kjernedrift", correct: true, why: "Riktig: OB handler om standardisering, integrasjon og stabil støtte til core operations." },
      { text: "En ekstern markedsplass for tredjepartsutviklere", correct: false, why: "Galt: dette ligner External Developer Platform." },
      { text: "En metode for kundereiser og empatiintervjuer", correct: false, why: "Galt: dette passer bedre med design thinking/shared customer insight-praksiser." }
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
      { text: "Å erstatte alle forretningsprosesser med manuelle rutiner", correct: false, why: "Galt: en digital platform handler om komponenter og digital innovasjon, ikke manuelle rutiner." },
      { text: "Å gi gjenbrukbare business-, data- og infrastrukturkomponenter for rask konfigurering av digitale tilbud", correct: true, why: "Riktig: dette er kjernen i definisjonen av Digital Platform." },
      { text: "Å bestemme hvem som har beslutningsrettigheter i IT-governance", correct: false, why: "Galt: dette er accountability/governance, ikke digital platform." },
      { text: "Å lage en fullstendig prosjektplan før innovasjon starter", correct: false, why: "Galt: dette ligner prosjektlogikk, mens plattformen muliggjør rask eksperimentering og gjenbruk." }
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
      { text: "kostnad og skatt", correct: false, why: "Galt: dette er ikke AF-kjernen." },
      { text: "autonomi og alignment", correct: true, why: "Riktig: AF fordeler ansvar for digitale tilbud og komponenter slik at autonomi balanseres med samordning." },
      { text: "hardware og software", correct: false, why: "Galt: AF er organisatorisk/governance-orientert, ikke en hardware/software-balanse." },
      { text: "scope og budsjett", correct: false, why: "Galt: dette passer bedre med prosjektstyring/triple constraint." }
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
      { text: "Et internt lønnssystem for ansatte", correct: false, why: "Galt: det er et internt system, ikke en plattform åpnet mot eksterne parter." },
      { text: "Et repository av digitale komponenter som åpnes for eksterne parter", correct: true, why: "Riktig: ExDP åpner digitale komponenter for partnere/eksterne utviklere, ofte via API-er/boundary resources." },
      { text: "En teknikk for å lage BPMN-diagrammer", correct: false, why: "Galt: BPMN hører til prosessmodellering." },
      { text: "En styringsarketype der sluttbrukere tar alle IT-beslutninger", correct: false, why: "Galt: dette beskriver Anarchy i IT governance, ikke ExDP." }
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
      { text: "Det handler om å samkjøre IT-investeringer med virksomhetens prioriteringer.", correct: true, why: "Riktig: effective governance aligns IT investments with business priorities." },
      { text: "Det handler om hvem som tar IT-beslutninger og hvem som er ansvarlig for resultater.", correct: true, why: "Riktig: beslutningsrettigheter og accountability er kjernen." },
      { text: "Det betyr at alle IT-beslutninger alltid skal tas av IT-avdelingen alene.", correct: false, why: "Galt: noen domener kan være IT monarchy, men IT governance handler nettopp om å avklare hvem som bestemmer, ikke at IT alltid bestemmer." },
      { text: "Det kan beskrives med en styringsmatrise med beslutningsdomener og styringsarketyper.", correct: true, why: "Riktig: styringsmatrisen kobler beslutningsdomener med arketyper som business monarchy, IT monarchy, federal, duopoly osv." }
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
      { text: "Business Monarchy", correct: false, why: "Galt: business monarchy betyr at senior business executives tar beslutningene, eventuelt med CIO." },
      { text: "IT Monarchy", correct: true, why: "Riktig: IT monarchy betyr at en IT executive eller gruppe IT executives tar beslutningene." },
      { text: "Federal", correct: false, why: "Galt: federal kombinerer C-level og business representatives, ofte sammen med IT." },
      { text: "Anarchy", correct: false, why: "Galt: anarchy betyr at enkeltbrukere eller små grupper følger egen IT-agenda." }
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
      { text: "Arkitektur er bare de formelle TOGAF-prosessene i ADM.", correct: false, why: "Galt: dette snevrer arkitektur inn til TOGAF. Fowler-perspektivet er mer pragmatisk." },
      { text: "Arkitektur er 'the important stuff' - det som utviklere og organisasjonen mener er viktig å forstå og ta vare på.", correct: true, why: "Riktig: Fowler brukes for å vise et mer kontekstuelt og samarbeidsorientert syn på arkitektur." },
      { text: "Arkitektur gjelder kun fysisk nettverk og maskinvare.", correct: false, why: "Galt: IT-arkitektur kan omfatte systemer, software, data, integrasjoner og beslutninger." },
      { text: "Arkitektur er identisk med prosjektledelse.", correct: false, why: "Galt: prosjektledelse organiserer leveranse; arkitektur handler om struktur, avhengigheter og viktige teknologiske/organisatoriske valg." }
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
      { text: "business process integration og standardization", correct: true, why: "Riktig: operating model beskriver ønsket nivå av prosessintegrasjon og standardisering." },
      { text: "individuell motivasjon og personlighet", correct: false, why: "Galt: dette er HR/ledelse, ikke operating model i D4D/EA-forstand." },
      { text: "risikopremie og rente", correct: false, why: "Galt: dette hører til business case/NPV." },
      { text: "antall ansatte og antall møter", correct: false, why: "Galt: operating model handler om integrasjon/standardisering av prosesser, ikke administrativ kapasitet." }
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
      { text: "Arbeidet grupperes ofte i sprinter.", correct: true, why: "Riktig: Scrum organiserer arbeid i sprints." },
      { text: "Team er selvorganiserende.", correct: true, why: "Riktig: selvorganiserende team er sentralt i Scrum/agile." },
      { text: "Oppgaver prioriteres etter verdi.", correct: true, why: "Riktig: backlog/prioritering etter verdi er sentralt." },
      { text: "Alt scope, tid og kostnad bør låses helt fra start for å sikre smidighet.", correct: false, why: "Galt: dette er mer klassisk prosjekt/triple constraint og passer dårlig med læring og tilpasning i agile." }
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
      { text: "Når problemet er uklart og må utforskes med brukerinnsikt, prototyping og testing", correct: true, why: "Riktig: design thinking er eksplorativt og passer når problem/brukerbehov er usikkert." },
      { text: "Når løsningen allerede er kjent og bare skal driftes billigst mulig", correct: false, why: "Galt: da passer standard prosess/drift bedre enn eksplorativ design thinking." },
      { text: "Når eneste mål er å beregne diskontert kontantstrøm", correct: false, why: "Galt: dette er business case/NPV, ikke design thinking." },
      { text: "Når alle beslutninger skal tas av én IT-leder", correct: false, why: "Galt: dette beskriver IT monarchy, ikke design thinking." }
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
      { text: "å utføre de samme aktivitetene litt mer effektivt enn rivaler", correct: false, why: "Galt: dette er operational effectiveness. Det er nødvendig, men ikke tilstrekkelig for strategi." },
      { text: "å velge en unik posisjon, gjøre trade-offs og skape et sammenhengende aktivitetssystem", correct: true, why: "Riktig: Porter-perspektivet vektlegger unique activities, fit og trade-offs." },
      { text: "å kjøpe det nyeste IT-systemet", correct: false, why: "Galt: teknologi kan støtte strategi, men er ikke strategi i seg selv." },
      { text: "å maksimere antall prosjekter i porteføljen", correct: false, why: "Galt: strategi handler også om prioritering og hva man ikke skal gjøre." }
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
      { text: "En ren IT-anskaffelsesplan", correct: false, why: "Galt: dette er for snevert og ligner IT-strategy/anskaffelse." },
      { text: "En organisatorisk strategi formulert og utført ved å utnytte digitale ressurser for å skape differensiell verdi", correct: true, why: "Riktig: dette er definisjonen brukt i forelesningen." },
      { text: "En liste over alle systemer organisasjonen eier", correct: false, why: "Galt: dette er mer IT-portefølje/arkitekturdokumentasjon." },
      { text: "En BPMN-modell av kundereisen", correct: false, why: "Galt: BPMN/kundereise kan støtte analyse, men er ikke definisjonen av digital strategy." }
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
      { text: "Digital teknologi kan bidra gjennom virtualisering, optimalisering, monitorering og innovasjon.", correct: true, why: "Riktig: dette listes eksplisitt som måter digital teknologi kan støtte bærekraftstransisjoner." },
      { text: "Digital teknologi har ingen negative miljømessige eller sosiale konsekvenser fordi den er virtuell.", correct: false, why: "Galt: forelesningen understreker materialitet, e-avfall, energibruk og sosial disrupsjon." },
      { text: "IKT har også materielle sider som mineraler, e-avfall og energiforbruk.", correct: true, why: "Riktig: dette er sentrale negative impacts i forelesningen." },
      { text: "Top-down bærekraftspolitikk kan kreve data og rapportering.", correct: true, why: "Riktig: forelesningen kobler bærekraftspolitikk til rapportering og data." }
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
      { text: "Følg beste praksis og standardprosedyre", correct: false, why: "Galt: dette passer best i clear-domene." },
      { text: "Ekspertanalyse alene", correct: false, why: "Galt: dette passer bedre i complicated-domene." },
      { text: "Eksperimentering, læring og iterasjon", correct: true, why: "Riktig: complex-domene krever probe/sense/respond, eksperimentering og læring." },
      { text: "Umiddelbar handling uten analyse", correct: false, why: "Galt: dette passer bedre i chaotic-domene." }
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
      { text: "Operational Backbone vektlegger stabilitet, standardisering og integrerte kjerneprosesser.", correct: true, why: "Riktig: OB er en reliable, integrated production environment for core processes." },
      { text: "Digital Platform vektlegger komponenter som kan brukes til rask innovasjon og digitale tilbud.", correct: true, why: "Riktig: DP gir tilgang til data-, business- og teknologikomponenter for digital offerings." },
      { text: "Operational Backbone og Digital Platform er alltid det samme begrepet.", correct: false, why: "Galt: de henger sammen, men OB er stabil kjerne mens DP muliggjør gjenbruk og innovasjon." },
      { text: "En svak Operational Backbone kan bli et hinder for digital transformasjon.", correct: true, why: "Riktig: forelesningen peker på OB som et mulig hinder når systemer, data og prosesser er fragmenterte." }
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
      { text: "Rammeverk er alltid best practice og bør følges likt i alle situasjoner.", correct: false, why: "Galt: kurset understreker at rammeverk er kontekstavhengige." },
      { text: "Rammeverk er mål i seg selv.", correct: false, why: "Galt: toolbox-metaforen sier at verktøy bare er meningsfulle hvis de tjener formålet." },
      { text: "Rammeverk kan redusere usikkerhet og strukturere praksis, men må tilpasses kontekst, mennesker, miljø og strategi.", correct: true, why: "Riktig: dette er den mest presise IN5431-holdningen til frameworks." },
      { text: "Rammeverk bør unngås fordi de aldri gir verdi.", correct: false, why: "Galt: rammeverk kan gi verdi, men må brukes kritisk og kontekstsensitivt." }
    ]
  }
];

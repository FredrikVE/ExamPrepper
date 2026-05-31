// src/data/exams/mockExam4b_no.js
export const mockExam4b_no = {
  id: "mock-exam-4b-no",
  subjectId: "in5431",
  baseId: "mock-exam-4b",
  lang: "no",
  title: "Øveeksamen 4B: CIO Toolbox – rammeverk og arkitektur",
  description: "Governance-arketyper, TOGAF ADM, Cynefin-plassering, produktteam, D4D-transformasjon og digital strategi – blandet teori og anvendelse.",
  modeLabel: "CIO TOOLBOX B",
  estimatedMinutes: "35–50",
  sortOrder: 41,
  questions: [
    {
      id: 1,
      type: "single",
      title: "Business case vs. alternativanalyse",
      points: 1,
      prompt: "Hvordan henger business case (verktøy 1) og alternativanalyse (verktøy 2) sammen?",
      source: "Kilde: Forelesning 3, CIO toolbox-modellen, notat mellom verktøy 1 og verktøy 2.",
      options: [
        {
          text: "Business case er én evalueringsmetode i alternativanalyse, trinn 3. Verktøyene er separate, men tett koblet",
          correct: true,
          why: "Riktig: CIO toolbox-modellen sier dette eksplisitt.",
          whyExtended: [
            "CIO toolbox-modellen har et notat: 'Business case (tool 1) is one evaluation method inside alternative analysis (tool 2, step 3). They are separate tools but tightly connected.'",
            "Alternativanalyse har tre trinn. Business case hører hjemme i trinn 3, Evaluate and propose, som en av flere evalueringsmetoder.",
            "Andre evalueringsmetoder i trinn 3 er plus/minus-metoden, kostnadsrangering og real options.",
            "Dette betyr at enhver business case er del av en alternativanalyse, men ikke enhver alternativanalyse krever en full finansiell business case."
          ]
        },
        {
          text: "De er helt urelaterte verktøy som brukes i ulike bransjer",
          correct: false,
          why: "Galt: de beskrives eksplisitt som tett koblet i CIO toolbox-modellen.",
          whyExtended: [
            "CIO toolbox-modellen inneholder et spesifikt notat som forklarer koblingen mellom dem – de er ikke adskilte i den forstanden.",
            "Begge verktøyene ligger under kategorien 'VALG' i CIO Toolbox, som viser at de har beslektede formål.",
            "Business case fokuserer på kvantitativ og kvalitativ evaluering. Alternativanalyse gir den bredere prosessen som inkluderer evaluering.",
            "Begge brukes på tvers av bransjer – de er generelle ledelsesverktøy, ikke bransjespesifikke."
          ]
        },
        {
          text: "Alternativanalyse erstatter business case fullstendig",
          correct: false,
          why: "Galt: business case er en metode innenfor alternativanalyse, ikke noe som erstattes av den.",
          whyExtended: [
            "Business case gir spesifikke analytiske verktøy (NPV, risikovurdering) som alternativanalyse ikke erstatter.",
            "Alternativanalyse er en bredere prosess. Den trenger evalueringsmetoder som business case for å fungere i trinn 3.",
            "CIO Toolbox beholder dem som separate nummererte verktøy (1 og 2) fordi de har ulik verdi.",
            "For beslutninger med stor betydning kan en formell finansiell business case innenfor alternativanalysen være nyttig."
          ]
        },
        {
          text: "Business case gjøres alltid etter at alternativanalysen er ferdig",
          correct: false,
          why: "Galt: business case brukes innenfor trinn 3 i alternativanalysen, ikke etterpå.",
          whyExtended: [
            "CIO toolbox-modellen plasserer business case inne i alternativanalyse trinn 3 (Evaluate and propose).",
            "Å gjøre business case etter alternativanalysen ville bety å evaluere alternativer etter at anbefalingen allerede er gitt.",
            "Den logiske flyten er: forstå situasjonen → generer alternativer → evaluer alternativer (blant annet med business case) → foreslå.",
            "En business case som separat øvelse før eller etter alternativanalyse ville miste koblingen til de konkrete alternativene som evalueres."
          ]
        }
      ],
      whyExtendedImageRefs: [
        "generic_decision_making_process_no",
        "NPV_formula"
      ]
    },
    {
      id: 2,
      type: "dragDrop",
      title: "CIO Toolbox: verktøy og formål",
      points: 3,
      prompt: "Dra hvert CIO Toolbox-verktøy til riktig formål.",
      source: "Kilde: CIO Toolbox-forelesningene, oversiktstabell over verktøy og formål.",
      moduleId: "cio-tool-box",
      groupId: "decision-making",
      cards: [
        { id: "tool-business-case", text: "Business case" },
        { id: "tool-alternative-analysis", text: "Alternative analysis" },
        { id: "tool-design-thinking", text: "Design thinking" },
        { id: "tool-it-architecture", text: "IT Architecture" },
        { id: "tool-projects", text: "Projects" },
        { id: "tool-product-teams", text: "Product teams and agile methods" },
        { id: "tool-it-governance", text: "IT governance" }
      ],
      targets: [
        { id: "purpose-prioritization-funding", description: "Prioritering av digitale tjenester og finansiering", correctCardId: "tool-business-case", correctLabel: "Business case", whyCorrect: "Business case brukes til å prioritere digitale tjenester og finansiering.", whyWrong: "Business case hører til prioritering og finansiering fordi det sammenligner forventet nytte, kostnad, tidspunkt og risiko.", whyExtended: ["Det er både beslutningsstøtte og kommunikasjonsverktøy.", "Det kan inkludere både NPV og gevinster som ikke kan tallfestes."] },
        { id: "purpose-vendor-product-choice", description: "Leverandørvalg og produktvalg", correctCardId: "tool-alternative-analysis", correctLabel: "Alternative analysis", whyCorrect: "Alternative analysis brukes til leverandørvalg og produktvalg.", whyWrong: "Alternative analysis hører til leverandør- og produktvalg fordi det strukturerer alternativer og evaluerer dem.", whyExtended: ["Den generiske prosessen er understand the situation, synthesize options, evaluate and propose.", "Business case kan være én evalueringsmetode inne i alternative analysis."] },
        { id: "purpose-unclear-problem", description: "Utforsking når problemet er uklart", correctCardId: "tool-design-thinking", correctLabel: "Design thinking", whyCorrect: "Design thinking brukes når problemet er uklart og må utforskes.", whyWrong: "Design thinking hører til utforsking fordi det bruker brukerinnsikt, reframing, prototyping og testing.", whyExtended: ["Det er nyttig når organisasjonen ikke er sikker på hvilket problem som bør løses.", "Double Diamond er kjernemodellen i forelesningen."] },
        { id: "purpose-structure-portfolio", description: "Analysere og strukturere IT-porteføljen", correctCardId: "tool-it-architecture", correctLabel: "IT Architecture", whyCorrect: "IT Architecture brukes til å analysere og strukturere IT-porteføljen.", whyWrong: "IT Architecture hører til strukturering av IT-porteføljen innenfor og mellom systemer og tjenester.", whyExtended: ["Relevante undertemaer er operating model, business process modeling og enterprise architecture.", "TOGAF er et rammeverk koblet til dette verktøyet."] },
        { id: "purpose-plan-organize-development", description: "Planlegge og organisere utvikling", correctCardId: "tool-projects", correctLabel: "Projects", whyCorrect: "Projects brukes til å planlegge og organisere utvikling som midlertidige organisasjoner.", whyWrong: "Projects hører til planlegging og organisering av utvikling fordi de leverer spesifiserte resultater innen en avgrenset periode.", whyExtended: ["PRINCE2 er et eksempel på et rammeverk for prosjektstyring og project governance.", "Projects er særlig relevant når arbeid kan planlegges rundt en definert leveranse."] },
        { id: "purpose-continuous-product-development", description: "Kontinuerlig produktutvikling og drift", correctCardId: "tool-product-teams", correctLabel: "Product teams and agile methods", whyCorrect: "Product teams and agile methods støtter kontinuerlig produktutvikling og drift.", whyWrong: "Product teams hører til kontinuerlig produktutvikling fordi de har varig eierskap til et produkt eller en tjeneste.", whyExtended: ["Nøkkelkontrasten til projects er varig eierskap fremfor midlertidig leveranse.", "Scrum og SAFe er smidige rammeverk knyttet til dette området."] },
        { id: "purpose-distribute-responsibility", description: "Fordele IT-ansvar mellom organisasjonsenheter", correctCardId: "tool-it-governance", correctLabel: "IT governance", whyCorrect: "IT governance fordeler IT-ansvar mellom organisasjonsenheter.", whyWrong: "IT governance hører til fordeling av ansvar fordi det bestemmer hvem som tar IT-beslutninger og hvem som står ansvarlig.", whyExtended: ["Weill og Ross beskriver beslutningsdomener, arketyper og governance-matrise.", "Et sentralt dilemma er sentralisering versus desentralisering."] }
      ],
      whyExtendedImageRefs: [
        "generic_decision_making_process_no",
        "double_diamond_model",
        "it_governance_matrix"
      ]
    },
    {
      id: 3,
      type: "fill",
      title: "Definisjon av IT governance",
      points: 1,
      prompt: "IT governance tar ikke selve IT-beslutningene. ________ gjør det. IT governance bestemmer hvem som tar beslutningene, hvem som bidrar, og hvem som står ansvarlig for resultatene.",
      answers: [
        "management",
        "ledelse",
        "IT-management",
        "IT-styring",
        "administrasjon"
      ],
      answerKey: "IT-management / IT-Styring",
      source: "Kilde: Forelesning 11, Accountability Framework, lysbilde 'IT governance', sitat fra Weill og Ross (2004).",
      whyCorrect: "Riktig fordi Weill og Ross skiller mellom management og governance. Ledelsen tar beslutningene. Governance bestemmer beslutningsrettigheter, bidrag og ansvar for resultatene.",
      whyWrong: "Galt hvis svaret er governance, styret eller CIO. Nøkkelskillet er at governance setter strukturen, mens management tar beslutningene innenfor den strukturen.",
      whyExtendedImageRefs: [
        "decision_rights_matrix"
      ]
    },
    {
      id: 4,
      type: "single",
      title: "Fowler vs. TOGAF",
      points: 1,
      prompt: "Hva er den sentrale forskjellen mellom TOGAF-perspektivet og Fowler-perspektivet på arkitektur?",
      source: "Kilde: Forelesning 5, CIO Toolbox 3, lysbilde 'Different views on architecture and architects'.",
      options: [
        {
          text: "TOGAF representerer et formelt og ofte sentralisert perspektiv. Fowler representerer et mer meritokratisk og desentralisert perspektiv",
          correct: true,
          why: "Riktig: dette er skillet som trekkes i forelesning 5.",
          whyExtended: [
            "Forelesning 5 sier: 'The Open Group – through TOGAF – represents a formal, and often centralized, perspective on architecture and architecture work.'",
            "I kontrast: 'Martin Fowler – who is the closest we get to an architecture thought leader in agile development, represents a more meritocratic and decentralized perspective.'",
            "CIO toolbox-modellen beskriver: 'TOGAF = formal architecture governance, often more centralized' vs. 'Fowler = architecture as the important stuff. Collaborative, decentralized orientation'.",
            "Dette speiler en bredere spenning i IT-ledelse mellom strukturert styring og smidig samarbeid."
          ]
        },
        {
          text: "TOGAF er bare for små oppstartsbedrifter, mens Fowler er for store virksomheter",
          correct: false,
          why: "Galt: TOGAF forbindes faktisk oftere med større og mer komplekse organisasjoner.",
          whyExtended: [
            "TOGAF har opphav i det amerikanske forsvaret – et miljø med store og komplekse organisasjoner – og brukes primært av større virksomheter.",
            "Fowlers perspektiv er vanligere i agile utviklingsmiljøer, som kan finnes både i startups og store team.",
            "Valget mellom perspektivene handler ikke om virksomhetsstørrelse, men om ledelsesfilosofi: formell styring vs. samarbeidende beslutningstaking.",
            "Store organisasjoner kan bruke begge tilnærmingene – spørsmålet er sentralisering vs. desentralisering av arkitekturbeslutninger."
          ]
        },
        {
          text: "De er identiske tilnærminger med ulike navn",
          correct: false,
          why: "Galt: forelesning 5 kontrasterer dem eksplisitt som ulike syn på arkitektur.",
          whyExtended: [
            "Forelesning 5 presenterer dem som alternativer på et spekter fra formell/sentralisert til samarbeidende/desentralisert.",
            "TOGAF bruker en strukturert Architecture Development Method (ADM) med definerte faser og roller.",
            "Fowler ser arkitektur som fremvoksende – 'the important stuff' som teamet kollektivt identifiserer og bryr seg om.",
            "CIO Toolbox nevner også Open Agile Architecture som et tredje perspektiv, noe som viser at flere syn finnes."
          ]
        },
        {
          text: "Fowler avviser hele arkitekturbegrepet",
          correct: false,
          why: "Galt: Fowler definerer arkitektur annerledes, men avviser det ikke.",
          whyExtended: [
            "Fowler definerer arkitektur som 'the important stuff' – han omformulerer hva arkitektur betyr i stedet for å avvise det.",
            "Hans perspektiv er at arkitektur er det teamet kollektivt anser som viktig å forstå og bevare.",
            "Dette er en pragmatisk redefinisjon, ikke en avvisning – den flytter arkitektur fra formell dokumentasjon til felles forståelse.",
            "Forelesning 5 presenterer Fowler som 'the closest we get to an architecture thought leader in agile development' – han er sterkt engasjert i arkitektur, bare fra en annen vinkel."
          ]
        }
      ],
      whyExtendedImageRefs: [
        "togaf_arkitekturtaksonomi",
        "togaf_levels_model"
      ]
    },
    {
      id: 5,
      type: "dragDrop",
      title: "Arkitekturperspektiver: TOGAF, Fowler og Open Agile Architecture",
      points: 3,
      prompt: "Dra hvert arkitekturperspektiv til beskrivelsen som best fanger det slik det brukes i kurset.",
      source: "Kilde: Forelesning 5, CIO Toolbox 3, lysbilder om ulike syn på arkitektur og Open Agile Architecture.",
      moduleId: "cio-tool-box",
      groupId: "enterprise-architecture",
      cards: [
        { id: "perspective-togaf", text: "TOGAF" },
        { id: "perspective-fowler", text: "Martin Fowler" },
        { id: "perspective-open-agile", text: "Open Agile Architecture" },
        { id: "perspective-enterprise-architecture", text: "Enterprise Architecture" }
      ],
      targets: [
        { id: "formal-centralized", description: "Formelt og ofte sentralisert perspektiv på arkitekturarbeid", correctCardId: "perspective-togaf", correctLabel: "TOGAF", whyCorrect: "TOGAF representerer det formelle og ofte sentraliserte synet på arkitekturarbeid i forelesningen.", whyWrong: "Denne beskrivelsen hører til TOGAF fordi forelesningen kontrasterer TOGAFs formelle og sentraliserte orientering med Fowlers mer desentraliserte perspektiv.", whyExtended: ["TOGAF er et enterprise architecture-rammeverk fra The Open Group.", "Det assosieres med arkitekturstyring og strukturerte metoder som ADM."] },
        { id: "important-stuff", description: "Architecture is 'the important stuff'. Samarbeidsorientert og mer desentralisert", correctCardId: "perspective-fowler", correctLabel: "Martin Fowler", whyCorrect: "Fowlers perspektiv er at architecture handler om det utviklere og interessenter vurderer som viktig.", whyWrong: "Denne beskrivelsen hører til Martin Fowler fordi forelesningen bruker Fowler som et mer meritokratisk og desentralisert arkitekturperspektiv.", whyExtended: ["Fowler plasseres nærmere smidig utviklingstenkning enn TOGAF."] },
        { id: "modularity-standardization-responsiveness", description: "Modularitet, standardisering og innebygd evne til endring", correctCardId: "perspective-open-agile", correctLabel: "Open Agile Architecture", whyCorrect: "Open Agile Architecture oppsummeres med modularitet, standardisering og responsiveness to change.", whyWrong: "Denne beskrivelsen hører til Open Agile Architecture fordi forelesningen presenterer det som et alternativ til TOGAF med modularitet, standardisering og responsiveness to change.", whyExtended: ["Modularitet støtter teamautonomi og resiliens.", "Responsiveness to change hindrer architecture fra å bli en statisk kontrollmekanisme."] },
        { id: "optimize-fragmented-legacy", description: "Optimalisere fragmenterte prosesser til et integrert miljø som støtter forretningsstrategien", correctCardId: "perspective-enterprise-architecture", correctLabel: "Enterprise Architecture", whyCorrect: "Enterprise Architecture presenteres som en tilnærming for å optimalisere fragmenterte prosesser og systemer til et integrert miljø som støtter strategi.", whyWrong: "Denne beskrivelsen hører til Enterprise Architecture som bredt fagfelt, ikke til ett bestemt rammeverk eller én forfatter.", whyExtended: ["Enterprise Architecture er bredere enn TOGAF, selv om TOGAF er et stort rammeverk for enterprise architecture-arbeid."] }
      ],
      whyExtendedImageRefs: [
        "togaf_arkitekturtaksonomi",
        "togaf_levels_model",
        "togaf_adm_no"
      ]
    },
    {
      id: 6,
      type: "multi",
      title: "Kjennetegn ved produktteam",
      points: 1,
      prompt: "Marker riktige kjennetegn ved produktteam ifølge CIO Toolbox.",
      source: "Kilde: Forelesning 4, CIO Toolbox 2, lysbilder om produktteam og agil utvikling.",
      options: [
        {
          text: "Varig eierskap til et digitalt produkt eller en digital tjeneste",
          correct: true,
          why: "Riktig: produktteam har kontinuerlig, langsiktig ansvar for produktet sitt.",
          whyExtended: [
            "CIO toolbox-modellen sier: 'Lasting ownership of a digital product/service' som et sentralt kjennetegn.",
            "Dette står i kontrast til prosjekter, som er midlertidige organisasjoner som oppløses etter levering.",
            "Varig eierskap betyr at teamet bygger dyp kunnskap om produktet, brukerne og teknologien over tid.",
            "Forelesning 4 understreker: 'Ensure continuity by creating lasting product teams instead of projects.'"
          ]
        },
        {
          text: "Outcome over output",
          correct: true,
          why: "Riktig: produktteam måler suksess etter resultater, ikke mengden leveranser.",
          whyExtended: [
            "CIO toolbox-modellen lister 'Outcome over output' som et kjerneprinsipp for produktteam.",
            "Outcome = forretningsresultatet eller kundeverdien som oppnås. Output = funksjoner, kode eller dokumenter som produseres.",
            "Forelesning 4 sier: 'Focus on outcome not output' – det som betyr noe er effekten, ikke aktiviteten.",
            "Prinsippet kobler til produktteam-poenget: 'Give team members autonomy to innovate and explore.'"
          ]
        },
        {
          text: "Alt scope, all tid og alle kostnader er låst fra starten",
          correct: false,
          why: "Galt: å låse alle tre elementene i triple constraint er et prosjektkjennetegn og gjør prosjekter sårbare.",
          whyExtended: [
            "CIO toolbox-modellen sier: 'Scope, time, cost – all three fixed → vulnerable' under prosjekter, ikke produktteam.",
            "Produktteam omfavner endring: 'Pivots and learning expected' er listet som et produktteamkjennetegn.",
            "Agile metoder prioriterer å respondere på endring fremfor å følge en plan – å låse alt fra starten motsier dette.",
            "Produktteam justerer scope kontinuerlig basert på brukerfeedback og forretningsprioriteringer."
          ]
        },
        {
          text: "Pivots og læring forventes",
          correct: true,
          why: "Riktig: produktteam er designet for å lære og endre retning ved behov.",
          whyExtended: [
            "CIO toolbox-modellen lister 'Pivots and learning expected' som et produktteamkjennetegn.",
            "Forelesning 4-oppsummeringen sier: 'Expect pivotal change' – retningsendringer er normale, ikke feil.",
            "Dette kobler til det komplekse domenet i Cynefin, der eksperimentering er nødvendig fordi viktige faktorer er ukjente.",
            "Silicon Valley-ledelseslærdommene inkluderer: 'Embrace pivots' og 'Nurture a culture of innovation.'"
          ]
        },
        {
          text: "Teamet oppløses etter hver sprint",
          correct: false,
          why: "Galt: produktteam har varig eierskap – de oppløses ikke.",
          whyExtended: [
            "Produktteam består over tid med kontinuerlig eierskap til produktet eller tjenesten.",
            "Å oppløse teamet etter hver sprint ville gjøre teamet til et veldig kort prosjekt og fjerne akkumulert kunnskap.",
            "Sprinter er iterasjoner innenfor teamets løpende arbeid, ikke sluttpunkter som avslutter teamet.",
            "Hele poenget med produktteam fremfor prosjekter er kontinuitet – 'Ensure continuity by creating lasting product teams instead of projects.'"
          ]
        }
      ],
      whyExtendedImageRefs: [
        "cynefin_theory_of_everything"
      ]
    },
    {
      id: 7,
      type: "single",
      title: "Governance vs. management",
      points: 1,
      prompt: "Ifølge Weill og Ross, hva er hovedforskjellen mellom IT governance og IT management?",
      source: "Kilde: Forelesning 6 og forelesning 11, lysbilder om definisjonen av IT governance.",
      options: [
        {
          text: "Governance bestemmer hvem som tar og bidrar til IT-beslutninger. Management tar og implementerer dem i praksis",
          correct: true,
          why: "Riktig: dette er skillet fra Weill og Ross (2004).",
          whyExtended: [
            "Forelesning 11 siterer: 'IT governance is not about making IT decisions – management does that – but rather determines who systematically makes and contributes to those decisions.'",
            "Governance er det strukturelle rammeverket: hvem har beslutningsrettigheter og ansvar.",
            "Management er den operasjonelle aktiviteten: å faktisk analysere, beslutte og implementere.",
            "Styringsmatrisen spesifiserer strukturen. Ledere opererer innenfor strukturen for å ta konkrete beslutninger."
          ]
        },
        {
          text: "Det er ingen forskjell. Begrepene betyr det samme",
          correct: false,
          why: "Galt: kurset skiller eksplisitt mellom dem.",
          whyExtended: [
            "Weill og Ross-definisjonen skiller tydelig mellom å sette opp beslutningsrettigheter (governance) og å utøve dem (management).",
            "Å behandle dem som synonymer ville blande sammen 'hvem bør bestemme' med 'hva bør bestemmes'.",
            "Kurset har en egen forelesning om IT governance nettopp fordi det er et annet begrep enn management.",
            "Styringsmatrisen ville vært meningsløs hvis governance og management var det samme."
          ]
        },
        {
          text: "Governance gjelder bare IT-avdelingen. Management gjelder resten av organisasjonen",
          correct: false,
          why: "Galt: governance involverer både forretnings- og IT-interessenter.",
          whyExtended: [
            "Styringsarketypene inkluderer Business Monarchy og Federal system – begge involverer forretningsledere sterkt.",
            "De fem beslutningsdomenene inkluderer 'business application needs' – et domene der forretningsinteressenter har sentral input.",
            "Governance er en organisatorisk evne, ikke bare en IT-funksjon.",
            "Hele poenget med styringsmatrisen er å avgjøre riktig balanse mellom IT- og forretningsinvolvering på tvers av beslutningsdomener."
          ]
        },
        {
          text: "Management kommer alltid før governance i tid",
          correct: false,
          why: "Galt: governance-strukturer bør etableres for å styre management-beslutninger.",
          whyExtended: [
            "Governance setter rammeverket som management opererer innenfor – strukturen bør finnes før beslutninger tas.",
            "Uten governance-strukturer kan management-beslutninger bli inkonsistente, dupliserte eller motstridende.",
            "Styringsmatrisen er ment å etableres proaktivt, ikke som en ettertanke.",
            "Management-aktiviteter skjer kontinuerlig innenfor governance-rammeverket – det er ikke et sekvensielt forhold."
          ]
        }
      ],
      whyExtendedImageRefs: [
        "decision_rights_matrix"
      ]
    },
    {
      id: 8,
      type: "dragDrop",
      title: "IT governance-arketyper",
      points: 3,
      prompt: "Dra hver beskrivelse til riktig IT governance-arketype.",
      source: "Kilde: Forelesning 6, IT governance, Weill og Ross governance-arketyper.",
      moduleId: "cio-tool-box",
      groupId: "it-governance",
      cards: [
        { id: "business-monarchy-desc", text: "Toppledere i virksomheten tar beslutningen" },
        { id: "it-monarchy-desc", text: "IT-ledere tar beslutningen" },
        { id: "feudal-desc", text: "Forretningsenheter eller prosesseiere tar separate lokale beslutninger" },
        { id: "federal-desc", text: "Toppledelse og representanter fra forretningsenheter deler beslutningsmyndighet" },
        { id: "it-duopoly-desc", text: "IT-ledere og én forretningsgruppe bestemmer sammen" },
        { id: "anarchy-desc", text: "Individuelle brukere eller små grupper følger sin egen IT-agenda" }
      ],
      targets: [
        { id: "business-monarchy", description: "Business Monarchy", correctCardId: "business-monarchy-desc", correctLabel: "Toppledere i virksomheten tar beslutningen", whyCorrect: "Business Monarchy betyr at toppledere i virksomheten tar beslutningen.", whyWrong: "Denne beskrivelsen hører til Business Monarchy fordi beslutningsrettighetene ligger hos forretningsledelsen.", whyExtended: ["CIO kan være involvert, men arketypen er ledet av forretningen.", "Dette er en sentralisert governance-arketype."] },
        { id: "it-monarchy", description: "IT Monarchy", correctCardId: "it-monarchy-desc", correctLabel: "IT-ledere tar beslutningen", whyCorrect: "IT Monarchy betyr at IT-ledere tar beslutningen.", whyWrong: "Denne beskrivelsen hører til IT Monarchy fordi beslutningsrettighetene ligger hos IT-ledere.", whyExtended: ["Den er sentralisert som Business Monarchy, men beslutningsmyndigheten ligger i IT-funksjonen.", "Den skiller seg fra IT Duopoly, der IT deler beslutningsmyndighet med forretningsrepresentanter."] },
        { id: "feudal", description: "Feudal", correctCardId: "feudal-desc", correctLabel: "Forretningsenheter eller prosesseiere tar separate lokale beslutninger", whyCorrect: "Feudal betyr at forretningsenheter tar separate lokale beslutninger.", whyWrong: "Denne beskrivelsen hører til Feudal fordi beslutningsmyndigheten er desentralisert til forretningsenheter eller prosesser.", whyExtended: ["Feudal governance gir lokale enheter autonomi.", "Risikoen er fragmentering på tvers av virksomheten."] },
        { id: "federal", description: "Federal", correctCardId: "federal-desc", correctLabel: "Toppledelse og representanter fra forretningsenheter deler beslutningsmyndighet", whyCorrect: "Federal kombinerer sentrale aktører med representanter fra forretningsenheter.", whyWrong: "Denne beskrivelsen hører til Federal fordi den blander sentral og lokal beslutningsmyndighet.", whyExtended: ["Forelesningen sammenligner dette med et føderalt politisk system.", "Modellen forsøker å balansere koordinering på virksomhetsnivå med lokal kunnskap."] },
        { id: "it-duopoly", description: "IT Duopoly", correctCardId: "it-duopoly-desc", correctLabel: "IT-ledere og én forretningsgruppe bestemmer sammen", whyCorrect: "IT Duopoly betyr at IT og forretningsrepresentanter bestemmer sammen.", whyWrong: "Denne beskrivelsen hører til IT Duopoly fordi det er en todelt ordning mellom IT og forretning.", whyExtended: ["Nøkkelsignalet er at IT deler beslutningsrettigheter med én forretningsgruppe.", "Den skiller seg fra Federal, som har bredere sentral og lokal representasjon."] },
        { id: "anarchy", description: "Anarchy", correctCardId: "anarchy-desc", correctLabel: "Individuelle brukere eller små grupper følger sin egen IT-agenda", whyCorrect: "Anarchy betyr at individuelle brukere eller små grupper følger sin egen IT-agenda.", whyWrong: "Denne beskrivelsen hører til Anarchy fordi beslutningsrettighetene i praksis overlates til individer eller små grupper.", whyExtended: ["Anarchy er den mest desentraliserte arketypen.", "Den kan skape problemer for standardisering, integrasjon og sikkerhet."] }
      ],
      whyExtendedImageRefs: [
        "decision_rights_matrix"
      ]
    },
    {
      id: 9,
      type: "single",
      title: "Federal-arketypen",
      points: 1,
      prompt: "Hvilken IT governance-arketype innebærer at C-level-ledere og forretningsrepresentanter fra alle operative grupper samarbeider med IT-avdelingen?",
      source: "Kilde: Forelesning 6, CIO Toolbox 4, lysbilde 'Summary: Six archetypal approaches to IT decision making'.",
      options: [
        {
          text: "Business Monarchy",
          correct: false,
          why: "Galt: Business Monarchy er at toppledere i virksomheten (eventuelt med CIO) tar beslutninger – ikke at alle operative grupper samarbeider.",
          whyExtended: [
            "Forelesning 6 definerer Business Monarchy som den mest sentraliserte tilnærmingen, der en toppleder eller gruppe toppledere, noen ganger inkludert CIO, tar alle IT-relaterte beslutninger.",
            "Hovedforskjellen er at Business Monarchy er top-down-beslutningstaking av toppledere, ikke samarbeid med alle operative grupper.",
            "Business Monarchy krever ikke input fra forretningsrepresentanter i individuelle operative enheter.",
            "Det er den mest sentraliserte arketypen, mens Federal er mer samarbeidende."
          ]
        },
        {
          text: "IT Duopoly",
          correct: false,
          why: "Galt: IT Duopoly er en topartsmodell med IT-ledere og forretningsledere, ikke den fulle føderale strukturen.",
          whyExtended: [
            "Forelesning 6 definerer IT Duopoly som: 'a two-party decision-making approach involves IT executives and a group of business leaders representing the operating units.'",
            "Forskjellen fra Federal er omfang: Duopoly involverer IT + utvalgte forretningsledere, mens Federal involverer C-level + alle operative grupper + IT.",
            "Federal er bredere og mer inkluderende enn Duopoly – det ligner en stat der sentralt og lokalt nivå samarbeider.",
            "Duopoly er en bilateral relasjon. Federal er et multilateralt samarbeid."
          ]
        },
        {
          text: "Federal",
          correct: true,
          why: "Riktig: Federal involverer C-level-ledere og forretningsrepresentanter fra alle operative grupper i samarbeid med IT.",
          whyExtended: [
            "Forelesning 6 definerer Federal slik: 'C-level executives and business representatives of all the operating groups collaborate with the IT department. This is equivalent to the central government and the states working together.'",
            "Federal er en samarbeidsarketype som inkluderer representasjon fra alle nivåer og enheter i organisasjonen.",
            "Den balanserer sentral myndighet (C-level), lokal representasjon (operative grupper) og teknisk ekspertise (IT).",
            "Federal-modellen passer når beslutninger krever bred forankring og når ulike enheter har legitime, men ulike behov."
          ]
        },
        {
          text: "Feudal",
          correct: false,
          why: "Galt: Feudal betyr at hver forretningsenhet eller prosessleder tar separate beslutninger basert på lokale behov.",
          whyExtended: [
            "Forelesning 6 definerer Feudal slik: 'business unit or process leaders make separate decisions on the basis of the unit or process needs.'",
            "Feudal er desentralisert uten samarbeid – hver enhet handler uavhengig, ikke sammen.",
            "Forskjellen fra Federal er at Feudal mangler det samarbeidende elementet – enheter tar isolerte beslutninger.",
            "Feudal kan føre til fragmentering og duplisering fordi det ikke finnes en koordineringsmekanisme på tvers av enheter."
          ]
        }
      ],
      whyExtendedImageRefs: [
        "it_governance_matrix"
      ]
    },
    {
      id: 10,
      type: "dragDrop",
      title: "IT governance-beslutningsdomener",
      points: 3,
      prompt: "Dra hver beskrivelse til riktig IT governance-beslutningsdomene.",
      source: "Kilde: Forelesning 6, IT governance, Weill og Ross beslutningsdomener.",
      moduleId: "cio-tool-box",
      groupId: "it-governance",
      cards: [
        { id: "principles-domain-desc", text: "ITs rolle i virksomheten og overordnede prinsipper for bruk av IT" },
        { id: "architecture-domain-desc", text: "Kjerneprosesser, dataintegrasjon og standardisering av tekniske evner" },
        { id: "infrastructure-domain-desc", text: "Felles tekniske tjenester og grunnleggende IT-evner" },
        { id: "business-app-domain-desc", text: "Forretningskrav og behov for applikasjoner" },
        { id: "investment-domain-desc", text: "Hvilke IT-initiativer som skal finansieres og prioriteres" }
      ],
      targets: [
        { id: "it-principles", description: "IT Principles", correctCardId: "principles-domain-desc", correctLabel: "ITs rolle i virksomheten og overordnede prinsipper for bruk av IT", whyCorrect: "IT Principles handler om ITs rolle og overordnede retning i virksomheten.", whyWrong: "Denne beskrivelsen hører til IT Principles fordi den handler om den overordnede rollen og prinsippene for IT.", whyExtended: ["IT principles oversetter business principles til retningslinjer for IT.", "De er bredere enn application needs eller infrastructure services."] },
        { id: "it-architecture", description: "IT Architecture", correctCardId: "architecture-domain-desc", correctLabel: "Kjerneprosesser, dataintegrasjon og standardisering av tekniske evner", whyCorrect: "IT Architecture handler om kjerneprosesser, dataintegrasjon og standardisering.", whyWrong: "Denne beskrivelsen hører til IT Architecture fordi nøkkelsignalene er integrasjon og standardisering.", whyExtended: ["Arkitekturbeslutninger definerer felles tekniske evner og prosess- og datalogikk på tvers av virksomheten.", "Her blir operating model relevant."] },
        { id: "it-infrastructure", description: "IT Infrastructure", correctCardId: "infrastructure-domain-desc", correctLabel: "Felles tekniske tjenester og grunnleggende IT-evner", whyCorrect: "IT Infrastructure handler om felles tekniske tjenester og grunnleggende IT-evner.", whyWrong: "Denne beskrivelsen hører til IT Infrastructure fordi den handler om felles tekniske tjenester.", whyExtended: ["Eksempler er nettverk, identitet, sikkerhetstjenester, skyplattformer og felles driftsevner.", "Infrastrukturbeslutninger gjør applikasjons- og forretningsevner mulig."] },
        { id: "business-application-needs", description: "Business Application Needs", correctCardId: "business-app-domain-desc", correctLabel: "Forretningskrav og behov for applikasjoner", whyCorrect: "Business Application Needs handler om applikasjoner som forretningsenheter og prosesser trenger.", whyWrong: "Denne beskrivelsen hører til Business Application Needs fordi den starter med forretningskrav til applikasjoner.", whyExtended: ["Dette domenet handler om hva forretningen trenger at applikasjoner skal gjøre.", "Det skiller seg fra architecture, som fokuserer på integrasjons- og standardiseringslogikk."] },
        { id: "it-investment", description: "IT Investment", correctCardId: "investment-domain-desc", correctLabel: "Hvilke IT-initiativer som skal finansieres og prioriteres", whyCorrect: "IT Investment handler om finansiering og prioritering av IT-initiativer.", whyWrong: "Denne beskrivelsen hører til IT Investment fordi nøkkelsignalet er finansiering og prioritering.", whyExtended: ["Investeringsbeslutninger bestemmer hvilke IT-initiativer som får ressurser.", "Dette kobler governance til business case og porteføljeprioritering."] }
      ],
      whyExtendedImageRefs: [
        "Domene_modell_IT_beslutninger_spm"
      ]
    },
    {
      id: 11,
      type: "fill",
      title: "Styringsmatrisen",
      points: 1,
      prompt: "Styringsmatrisen kombinerer beslutnings-________ med governance-arketyper for å tydeliggjøre hvem som bestemmer hva i IT governance.",
      answers: [
        "domener",
        "domene",
        "områder",
        "domains",
        "domain",
        "areas"
      ],
      answerKey: "domener",
      source: "Kilde: Forelesning 6, CIO Toolbox 4, lysbilde 'Styringsmatrisen'.",
      whyCorrect: "Riktig fordi styringsmatrisen har de fem beslutningsdomenene (IT principles, IT architecture, IT infrastructure, business application needs, IT investment) på én akse og de seks arketypene på den andre.",
      whyWrong: "Galt hvis svaret viser til verktøy, metoder eller arketyper. Matrisen kombinerer domener (hva som besluttes) med arketyper (hvem som bestemmer), ikke med andre strukturelle elementer.",
      whyExtendedImageRefs: [
        "it_governance_matrix"
      ]
    },
    {
      id: 12,
      type: "single",
      title: "Cynefin og triple constraint",
      points: 1,
      prompt: "Ifølge forelesningen, hvordan henger antallet faste triple constraint-elementer sammen med Cynefin-domener?",
      source: "Kilde: Forelesning 4, CIO Toolbox 2, lysbilde om Cynefin og triple constraint mapping.",
      options: [
        {
          text: "Flere faste begrensninger kombinert med flere kompleksitetsfaktorer skyver situasjonen mot høyere Cynefin-domener (complex/chaotic)",
          correct: true,
          why: "Riktig: forelesningen viser at flere faste begrensninger og flere kompleksitetsfaktorer øker Cynefin-domenet.",
          whyExtended: [
            "Forelesning 4 presenterer en tabell som mapper faste triple constraint-faktorer og ekstra kompleksitetsfaktorer til Cynefin-domener.",
            "Et prosjekt med 3 faste faktorer og 0 ekstra kompleksitet er Complex. Med 3 faste faktorer og 1+ ekstra kompleksitet blir det Chaotic.",
            "Et prosjekt med 1 fast faktor og 2 ekstra kompleksitetsfaktorer er Clear. Med 1 fast faktor og 3+ blir det Complex.",
            "Nøkkelinnsikten er at låsing av alle begrensninger fjerner fleksibilitet, mens kompleksitetsfaktorer tilfører ukjente – sammen eskalerer de ledelsesutfordringen."
          ],
          whyExtendedImageRefs: [
              "cynefin_theory_of_everything",
              "Triple-Constraint-Explained-1080x1080-1",
              "triple_constraint_1"
            ]
        },
        {
          text: "Antallet faste begrensninger har ingen sammenheng med Cynefin i det hele tatt",
          correct: false,
          why: "Galt: forelesningen mapper eksplisitt triple constraint-elementer til Cynefin-domener.",
          whyExtended: [
            "Forelesning 4 har et eget lysbilde om koblingen mellom triple constraint og Cynefin-domener.",
            "Artikkelen som refereres i forelesningen presenterer en metode for å velge prosjektledelsestilnærming basert på faste begrensninger og kompleksitetsfaktorer.",
            "Å ignorere triple constraint-Cynefin-koblingen ville bety å miste et viktig integrasjonspunkt mellom verktøy 5 (prosjekter) og metaverktøyet (Cynefin).",
            "Mappingen gir en praktisk måte å vurdere hvilken ledelsestilnærming et prosjekt trenger."
          ]
        },
        {
          text: "Å låse alle tre begrensningene gir alltid en Clear-situasjon",
          correct: false,
          why: "Galt: å låse alle tre begrensningene (scope, tid, kostnad) indikerer faktisk Complex eller Chaotic, ikke Clear.",
          whyExtended: [
            "Tabellen i forelesning 4 viser at 3 faste begrensninger med 0 kompleksitetsfaktorer mappes til Complex, ikke Clear.",
            "CIO toolbox-modellen sier: 'Scope, time, cost – all three fixed → vulnerable.'",
            "Clear-situasjoner har lav kompleksitet og få faste begrensninger – de er velkjente problemer med kjente løsninger.",
            "Å låse alle tre begrensningene fjerner all fleksibilitet, som gjør prosjektet mer komplekst å styre, ikke enklere."
          ]
        },
        {
          text: "Chaotic-situasjoner har alltid null faste begrensninger",
          correct: false,
          why: "Galt: Chaotic kan oppstå med hvilket som helst antall faste begrensninger hvis kompleksiteten er høy nok.",
          whyExtended: [
            "Tabellen i forelesning 4 viser at Chaotic kan oppstå med 1 fast faktor (+ 4+ kompleksitet), 2 faste (+ 2+) eller 3 faste (+ 1+).",
            "Det er kombinasjonen av faste begrensninger og kompleksitetsfaktorer som avgjør Cynefin-domenet.",
            "Selv med 1 fast begrensning kan nok ekstra kompleksitetsfaktorer (4+) skyve situasjonen til Chaotic.",
            "Mappingen er en todimensjonal vurdering, ikke bare basert på én variabel alene."
          ]
        }
      ],
      moduleId: "cio-tool-box",
      groupId: "cynefin"
    },
{
      id: 13,
      type: "matrix-placement",
      title: "Cynefin: domener og styringstilnærming",
      points: 4,
      prompt: "Dra hver styringstilnærming til riktig Cynefin-domene.",
      source: "Kilde: Forelesning 4, CIO Toolbox 2, Cynefin som metaverktøy for valg av styringstilnærming.",
      moduleId: "cio-tool-box",
      groupId: "cynefin",
      itemBankTitle: "Styringstilnærminger",
      itemBankSubtitle: "Plasser hvert kort i domenet der tilnærmingen passer best.",
      itemBankHint: "Bruk forklaringsbildet som støtte. Klar, komplisert, kompleks og kaotisk krever ulike måter å respondere på.",
      matrix: {
        xAxis: {
          label: "Årsak-virkning og forutsigbarhet",
          lowLabel: "Uklar",
          highLabel: "Tydeligere"
        },
        yAxis: {
          label: "Behov for analyse før handling",
          lowLabel: "Lavt",
          highLabel: "Høyt"
        },
        quadrants: [
          {
            id: "complex",
            x: "low",
            y: "high",
            title: "Kompleks (Complex)",
            description: "Utforsk (probe), forstå (sense), responder (respond). Fremvoksende praksis."
          },
          {
            id: "complicated",
            x: "high",
            y: "high",
            title: "Komplisert (Complicated)",
            description: "Forstå (sense), analyser (analyze), responder (respond). God praksis."
          },
          {
            id: "chaotic",
            x: "low",
            y: "low",
            title: "Kaotisk (Chaotic)",
            description: "Handle (act), forstå (sense), responder (respond). Ny praksis."
          },
          {
            id: "clear",
            x: "high",
            y: "low",
            title: "Klar (Clear)",
            description: "Forstå (sense), kategoriser (categorize), responder (respond). Beste praksis."
          }
        ]
      },
      items: [
        {
          id: "experimentation-learning",
          label: "Bruk eksperimentering, design thinking og læring",
          correctQuadrantId: "complex"
        },
        {
          id: "expert-analysis-planning",
          label: "Bruk ekspertanalyse og planlegging",
          correctQuadrantId: "complicated"
        },
        {
          id: "immediate-stabilization",
          label: "Handle umiddelbart for å stabilisere situasjonen",
          correctQuadrantId: "chaotic"
        },
        {
          id: "procedures-best-practice",
          label: "Bruk prosedyrer og best practice",
          correctQuadrantId: "clear"
        }
      ],
      itemFeedback: {
        "experimentation-learning": {
          whyCorrect: "Riktig. Denne tilnærmingen hører til det komplekse domenet.",
          whyWrong: "Denne tilnærmingen hører til Kompleks, fordi problemet ikke kan analyseres sikkert på forhånd.",
          whyExtended: [
            "I komplekse situasjoner er viktige årsaksforhold ukjente før man prøver noe.",
            "Derfor passer probe, sense, respond bedre enn ren ekspertanalyse eller faste prosedyrer.",
            "Design thinking passer godt her fordi metoden bruker brukerinnsikt, prototyping og læring."
          ]
        },
        "expert-analysis-planning": {
          whyCorrect: "Riktig. Denne tilnærmingen hører til det kompliserte domenet.",
          whyWrong: "Denne tilnærmingen hører til Komplisert, fordi årsak-virkning kan analyseres, men krever ekspertise.",
          whyExtended: [
            "I kompliserte situasjoner finnes det ikke nødvendigvis ett åpenbart svar.",
            "Eksperter kan analysere situasjonen og velge en god praksis.",
            "Business case og alternative analysis passer ofte her når problemet kan utredes."
          ]
        },
        "immediate-stabilization": {
          whyCorrect: "Riktig. Denne tilnærmingen hører til det kaotiske domenet.",
          whyWrong: "Denne tilnærmingen hører til Kaotisk, fordi situasjonen først må stabiliseres.",
          whyExtended: [
            "I kaotiske situasjoner er det ikke tid til lang analyse før første respons.",
            "Første steg er å handle for å skape orden nok til å forstå situasjonen.",
            "Etter stabilisering kan man forstå og respondere mer målrettet."
          ]
        },
        "procedures-best-practice": {
          whyCorrect: "Riktig. Denne tilnærmingen hører til det klare domenet.",
          whyWrong: "Denne tilnærmingen hører til Klar, fordi situasjonen er kjent og kan håndteres med etablerte prosedyrer.",
          whyExtended: [
            "I klare situasjoner er årsak-virkning tydelig.",
            "Man kan forstå situasjonen, kategorisere den og bruke beste praksis.",
            "Feilen er å gjøre en rutinesituasjon mer komplisert enn nødvendig."
          ]
        }
      },
      whyExtendedImageRefs: [
        "cynefin_model"
      ]
    },
{
      id: 14,
      type: "drag-categorize",
      title: "Cynefin: primærplassering av rammeverk",
      points: 4,
      prompt: "Sorter hvert rammeverk eller hver praksis til Cynefin-domenet der det primært hører hjemme. Bruk bare primærplasseringen fra forklaringsfiguren.",
      source: "Kilde: Cynefin-rammeverk-figuren for IN5431, public/subjects/in5431/cio-tool-box/cynefin/cynefin_frameworks.png.",
      moduleId: "cio-tool-box",
      groupId: "cynefin",
      items: [
        { id: "cynefin-design-thinking", label: "Design thinking" },
        { id: "cynefin-double-diamond", label: "Double diamond" },
        { id: "cynefin-experimentation", label: "Eksperimentering" },
        { id: "cynefin-scrum", label: "Scrum" },
        { id: "cynefin-product-teams", label: "Produktteam" },
        { id: "cynefin-agile-methods", label: "Agile methods" },
        { id: "cynefin-prince2-projects", label: "PRINCE2 / prosjekter" },
        { id: "cynefin-kanban", label: "Kanban" },
        { id: "cynefin-immediate-action", label: "Umiddelbar handling" },
        { id: "cynefin-crisis-stabilization", label: "Krisestabilisering" },
        { id: "cynefin-procedures", label: "Kjente prosedyrer" },
        { id: "cynefin-standardization", label: "Standardisering" },
        { id: "cynefin-best-practice", label: "Beste praksis" },
        { id: "cynefin-itil", label: "ITIL" }
      ],
      categories: [
        { id: "complex", label: "Kompleks: uklart problem, løsningen læres frem" },
        { id: "complicated", label: "Komplisert: problemet kan analyseres av eksperter" },
        { id: "chaotic", label: "Kaotisk: stabiliser før analyse" },
        { id: "clear", label: "Tydelig / Clear: kjent årsak-virkning" }
      ],
      correctAnswer: {
        complex: [
          "cynefin-design-thinking",
          "cynefin-double-diamond",
          "cynefin-experimentation",
          "cynefin-scrum",
          "cynefin-agile-methods"
        ],
        complicated: [
          "cynefin-product-teams",
          "cynefin-prince2-projects",
          "cynefin-kanban"
        ],
        chaotic: [
          "cynefin-immediate-action",
          "cynefin-crisis-stabilization"
        ],
        clear: [
          "cynefin-procedures",
          "cynefin-standardization",
          "cynefin-best-practice",
          "cynefin-itil"
        ]
      },
      itemFeedback: {
        "cynefin-design-thinking": {
          whyCorrect: "Riktig. Design thinking er primært plassert i Kompleks fordi problemet er uklart og må utforskes gjennom brukerinnsikt, prototyping og læring.",
          whyWrong: "Design thinking skal plasseres i Kompleks. Metoden passer når problemet ikke er gitt på forhånd, og løsningen må læres frem.",
          whyExtended: [
            "I komplekse situasjoner er årsak-virkning først synlig etter at man har prøvd noe.",
            "Design thinking bruker utforskning, problem-reframing, co-design og testing i liten skala.",
            "Dette passer bedre med probe, sense, respond enn med ren ekspertanalyse eller faste prosedyrer."
          ]
        },
        "cynefin-double-diamond": {
          whyCorrect: "Riktig. Double diamond er primært plassert i Kompleks fordi den strukturerer utforskning av problemrom og løsningsrom.",
          whyWrong: "Double diamond skal plasseres i Kompleks. Modellen brukes når man må utforske og lære før løsningen kan fastsettes.",
          whyExtended: [
            "Discover og Define åpner og avgrenser problemforståelsen.",
            "Develop og Deliver åpner og tester løsningsrommet.",
            "Dette passer i situasjoner der man ikke bare kan analysere seg frem til svaret på forhånd."
          ]
        },
        "cynefin-experimentation": {
          whyCorrect: "Riktig. Eksperimentering er primært plassert i Kompleks fordi læring skjer gjennom forsøk og respons.",
          whyWrong: "Eksperimentering skal plasseres i Kompleks. Poenget er å prøve, observere og justere når problemet er uklart.",
          whyExtended: [
            "Komplekse problemer krever probe, sense, respond.",
            "Små eksperimenter gjør det mulig å lære uten å låse seg til en tung plan for tidlig.",
            "Dette skiller seg fra Komplisert, der eksperter kan analysere seg frem til en god løsning."
          ]
        },
        "cynefin-scrum": {
          whyCorrect: "Riktig. Scrum er primært plassert i Kompleks fordi korte iterasjoner støtter læring og tilpasning.",
          whyWrong: "Scrum skal plasseres i Kompleks. Her vektlegges iterativ læring, ikke bare leveranseplanlegging.",
          whyExtended: [
            "Scrum kan inneholde planlegging, men primærplasseringen her handler om læring gjennom iterasjoner.",
            "Sprintene gir hyppige muligheter til å inspisere og tilpasse arbeidet.",
            "Derfor plasseres Scrum sammen med design thinking og agile methods."
          ]
        },
        "cynefin-product-teams": {
          whyCorrect: "Riktig. Produktteam er primært plassert i Komplisert i denne fasiten fordi det handler om organisering, varig eierskap og styrt videreutvikling av et digitalt produkt.",
          whyWrong: "Produktteam skal plasseres i Komplisert i denne fasiten. Her vektlegges produktteam som organiseringsform for utvikling og drift, ikke som ren eksperimentering.",
          whyExtended: [
            "Produktteam eier en digital tjeneste over tid og prioriterer videreutvikling innenfor en styrt ramme.",
            "Teamet kan lære og tilpasse seg, men selve organiseringsformen handler også om ansvar, kontinuitet og planlagt forbedring.",
            "Derfor plasseres produktteam her sammen med PRINCE2 / prosjekter og Kanban i denne forenklede Cynefin-sorteringen."
          ]
        },
        "cynefin-agile-methods": {
          whyCorrect: "Riktig. Agile methods er primært plassert i Kompleks fordi de støtter iterasjon, feedback og læring under usikkerhet.",
          whyWrong: "Agile methods skal plasseres i Kompleks. Den primære logikken er å arbeide iterativt når behov og løsning ikke er helt kjent.",
          whyExtended: [
            "Smidige metoder passer godt når kravene endrer seg eller ikke er fullt forstått.",
            "Feedback brukes til å justere kursen underveis.",
            "Dette gjør dem nært koblet til probe, sense, respond."
          ]
        },
        "cynefin-prince2-projects": {
          whyCorrect: "Riktig. PRINCE2 / prosjekter er primært plassert i Komplisert fordi prosjektstyring bygger på planlegging, roller og kontroll.",
          whyWrong: "PRINCE2 / prosjekter skal plasseres i Komplisert. Primærlogikken er analyse, planlegging og strukturert gjennomføring.",
          whyExtended: [
            "Prosjekter brukes til å levere bestemte resultater innen tid, kostnad og omfang.",
            "PRINCE2 gir styringsstruktur med roller, prosesser og kontrollpunkter.",
            "Dette passer best når arbeidet kan planlegges og analyseres før gjennomføring."
          ]
        },
        "cynefin-kanban": {
          whyCorrect: "Riktig. Kanban er primært plassert i Komplisert i denne fasiten fordi arbeidet styres gjennom synlig flyt, begrenset WIP og forbedring av prosessen.",
          whyWrong: "Kanban skal plasseres i Komplisert i denne fasiten. Her vektlegges styring, analyse og forbedring av arbeidsflyt.",
          whyExtended: [
            "Kanban gjør arbeid, køer og flaskehalser synlige.",
            "Metoden brukes ofte til å styre og forbedre en kjent arbeidsflyt.",
            "Derfor plasseres den her sammen med planlegging og prosjektstyring."
          ]
        },
        "cynefin-immediate-action": {
          whyCorrect: "Riktig. Umiddelbar handling er primært plassert i Kaotisk fordi situasjonen må stabiliseres før analyse gir mening.",
          whyWrong: "Umiddelbar handling skal plasseres i Kaotisk. I kaos er første steg å handle for å skape nok orden til å forstå situasjonen.",
          whyExtended: [
            "I kaotiske situasjoner er det ikke tid til lang analyse først.",
            "Handlingsmønsteret er act, sense, respond.",
            "Etter stabilisering kan situasjonen eventuelt flyttes over i et annet domene."
          ]
        },
        "cynefin-crisis-stabilization": {
          whyCorrect: "Riktig. Krisestabilisering er primært plassert i Kaotisk fordi målet først er å skape kontroll.",
          whyWrong: "Krisestabilisering skal plasseres i Kaotisk. Før eksperter kan analysere, må situasjonen stabiliseres.",
          whyExtended: [
            "Kaos betyr at årsak-virkning ikke kan brukes som grunnlag for rolig analyse i starten.",
            "Første respons er å stoppe skade, skape kontroll og få oversikt.",
            "Deretter kan man forstå og respondere mer systematisk."
          ]
        },
        "cynefin-procedures": {
          whyCorrect: "Riktig. Kjente prosedyrer er primært plassert i Tydelig / Clear fordi årsak-virkning er kjent og handlingen kan standardiseres.",
          whyWrong: "Kjente prosedyrer skal plasseres i Tydelig / Clear. De passer når situasjonen er kjent og riktig respons allerede er etablert.",
          whyExtended: [
            "I tydelige situasjoner kan man forstå, kategorisere og respondere.",
            "Kjente prosedyrer gjør kjent arbeid repeterbart.",
            "Feilen er å behandle en rutinesituasjon som om den krever tung analyse eller eksperimentering."
          ]
        },
        "cynefin-standardization": {
          whyCorrect: "Riktig. Standardisering er primært plassert i Tydelig / Clear fordi kjente prosesser kan gjøres likt og repeterbart.",
          whyWrong: "Standardisering skal plasseres i Tydelig / Clear. Den passer når man allerede vet hva som fungerer og ønsker lik utførelse.",
          whyExtended: [
            "Standardisering reduserer variasjon i kjente prosesser.",
            "Det gir mening når årsak-virkning er forstått og praksis kan følges.",
            "Når problemet er uklart, kan for tidlig standardisering hemme læring."
          ]
        },
        "cynefin-best-practice": {
          whyCorrect: "Riktig. Beste praksis er primært plassert i Tydelig / Clear fordi etablert praksis kan følges direkte.",
          whyWrong: "Beste praksis skal plasseres i Tydelig / Clear. Det passer når riktig respons er kjent fra før.",
          whyExtended: [
            "Clear-domenet handler om situasjoner der årsak-virkning er tydelig.",
            "Da kan man kategorisere situasjonen og følge etablert best practice.",
            "I komplekse situasjoner finnes ikke beste praksis på samme måte før man har lært mer."
          ]
        },
        "cynefin-itil": {
          whyCorrect: "Riktig. ITIL er primært plassert i Tydelig / Clear her fordi det representerer etablert praksis for IT Service Management.",
          whyWrong: "ITIL skal plasseres i Tydelig / Clear i denne sorteringen. Her vektlegges ITIL som prosedyrer og beste praksis for IT-tjenester.",
          whyExtended: [
            "ITIL er relevant for styring, drift og leveranse av IT-tjenester.",
            "I denne Cynefin-koblingen plasseres det som etablert best practice.",
            "Det betyr ikke at all IT-drift alltid er enkel, men at ITIL primært representerer standardisert praksis."
          ]
        }
      },
      whyExtendedImageRefs: [
        "cynefin_frameworks"
      ]
    },
    {
      id: 15,
      type: "single",
      title: "Open Agile Architecture",
      points: 1,
      prompt: "Hva er de tre nøkkelprinsippene i Open Agile Architecture-perspektivet som ble nevnt i kurset?",
      source: "Kilde: Forelesning 5, CIO Toolbox 3, lysbilde 'Alternative to TOGAF: Open Agile Architecture'.",
      options: [
        {
          text: "Modularitet, standardisering og innebygd responsivitet overfor endring",
          correct: true,
          why: "Riktig: dette er de tre prinsippene fra lysbildet om Open Agile Architecture.",
          whyExtended: [
            "Forelesning 5 lister: 'Modularity, to facilitate team autonomy and increase resilience', 'Standardization, to facilitate product or operating model reconfiguration', 'Architecting for a built-in responsiveness to change.'",
            "Disse prinsippene bygger bro mellom den formelle TOGAF-tilnærmingen og Fowlers agile perspektiv.",
            "Modularitet muliggjør autonomien produktteam trenger. Standardisering muliggjør alignment som governance krever.",
            "Open Agile Architecture kommer fra The Open Group – samme organisasjon som står bak TOGAF – og viser en utvikling i tenkningen deres."
          ]
        },
        {
          text: "Hastighet, kostnadsreduksjon og minimering av antall ansatte",
          correct: false,
          why: "Galt: dette er mål for operasjonell effektivitet, ikke arkitekturprinsipper.",
          whyExtended: [
            "Open Agile Architecture fokuserer på strukturelle prinsipper for hvordan virksomhetsarkitektur bør utformes, ikke på kostnadsmetrikker.",
            "Modularitet handler om teamautonomi og resiliens, ikke om å redusere bemanning.",
            "Standardisering handler om å muliggjøre rekonfigurasjon, ikke om å kutte kostnader.",
            "Arkitekturprinsipper styrer designbeslutninger. Effektivitetsmål styrer operasjonell ledelse."
          ]
        },
        {
          text: "Hierarki, kommando-og-kontroll og fast scope",
          correct: false,
          why: "Galt: dette beskriver en tradisjonell, rigid ledelsesstil – det motsatte av agil arkitektur.",
          whyExtended: [
            "Open Agile Architecture verdsetter eksplisitt 'responsiveness to change' – det motsatte av fast scope.",
            "Modularitet 'facilitates team autonomy' – det motsatte av kommando-og-kontroll.",
            "Agil arkitektur søker å være adaptiv, ikke hierarkisk og rigid.",
            "'Agile' i Open Agile Architecture signaliserer samsvar med agile verdier om fleksibilitet og responsivitet."
          ]
        },
        {
          text: "Markedsføring, salg og kundeanskaffelse",
          correct: false,
          why: "Galt: dette er forretningsfunksjoner, ikke arkitekturprinsipper.",
          whyExtended: [
            "Arkitekturprinsipper veileder hvordan tekniske og organisatoriske evner struktureres, ikke hvordan markedsføring gjøres.",
            "Forretningsfunksjoner kan representeres i Business Architecture, men er ikke arkitekturprinsipper i seg selv.",
            "Open Agile Architecture handler om hvordan man designer for tilpasningsevne, ikke om spesifikke forretningsaktiviteter.",
            "De tre prinsippene (modularitet, standardisering, responsivitet) er strukturelle valg, ikke funksjonelle strategier."
          ]
        }
      ],
      whyExtendedImageRefs: [
        "togaf_levels_model"
      ]
    },
    {
      id: 16,
      type: "single",
      title: "TOGAF ADM",
      points: 1,
      prompt: "I TOGAF-kontekst, hva er ADM?",
      source: "Kilde: Forelesning 5, CIO Toolbox 3, lysbildet 'TOGAF: The Architecture Development Method (ADM)'.",
      moduleId: "cio-tool-box",
      groupId: "enterprise-architecture",
      options: [
        { text: "Architecture Development Method. En strukturert metode for å utvikle og styre enterprise architecture", correct: true, why: "Riktig: ADM står for Architecture Development Method og er den sentrale strukturerte metoden i TOGAF.", whyExtended: ["Forelesningen presenterer TOGAF gjennom Architecture Development Method (ADM).", "ADM strukturerer arkitekturarbeid gjennom faser og governance fremfor ad hoc-arbeid.", "I CIO Toolbox hører dette under IT Architecture."] },
        { text: "Agile Delivery Model. En Scrum-metode for sprintplanlegging", correct: false, why: "Galt: ADM er ikke en Scrum- eller sprint-planning-metode.", whyExtended: ["Scrum hører til smidig programvareleveranse og produktteam, ikke TOGAFs enterprise architecture-metode.", "ADM står for Architecture Development Method, ikke Agile Delivery Model."] },
        { text: "Application Data Matrix. En liste over databasetabeller for én applikasjon", correct: false, why: "Galt: TOGAF inkluderer Data og Application Architecture, men ADM betyr ikke Application Data Matrix.", whyExtended: ["ADM er en metode for architecture development på virksomhetsnivå, ikke et lokalt databaseartefakt."] },
        { text: "Automated Decision Management. En governance-modell som erstatter arkitekter med automatiserte regler", correct: false, why: "Galt: ADM handler om strukturert architecture development, ikke om å automatisere bort arkitekturfaglig dømmekraft.", whyExtended: ["Rammeverk støtter arkitekturarbeid, men erstatter ikke ledelse, dialog og kontekstuell dømmekraft."] }
      ],
      whyExtendedImageRefs: [
        "togaf_adm_en",
        "togaf_adm_no"
      ]
    },
    {
      id: 17,
      type: "multi",
      title: "TOGAF og forbehold ved enterprise architecture",
      points: 1,
      prompt: "Marker utsagnene som passer med hvordan TOGAF og enterprise architecture presenteres i kurset.",
      source: "Kilde: Forelesning 5, CIO Toolbox 3, lysbilder om TOGAF, Enterprise Architecture og ulike arkitekturperspektiver.",
      moduleId: "cio-tool-box",
      groupId: "enterprise-architecture",
      options: [
        { text: "TOGAF er knyttet til enterprise architecture og et formelt, ofte sentralisert perspektiv på arkitekturarbeid.", correct: true, why: "Riktig: forelesningen presenterer TOGAF som formelt og ofte sentralisert.", whyExtended: ["TOGAF introduseres som et rammeverk for enterprise architecture.", "Dette kontrasteres med Fowlers mer meritokratiske og desentraliserte arkitekturperspektiv."] },
        { text: "Enterprise architecture skal redusere fragmentering og skape et integrert miljø som støtter forretningsstrategien.", correct: true, why: "Riktig: dette er formålet med enterprise architecture slik det presenteres i forelesningen.", whyExtended: ["Forelesningen beskriver EA som en måte å optimalisere fragmenterte legacy-prosesser til et integrert miljø.", "Det handler ikke bare om teknisk dokumentasjon, men om å støtte strategisk gjennomføring."] },
        { text: "TOGAF erstatter behovet for å forstå forretningsprosesser fordi det bare handler om maskinvare og nettverk.", correct: false, why: "Galt: TOGAF inkluderer Business Architecture og Application/Data-lag, ikke bare maskinvare og nettverk.", whyExtended: ["TOGAF taxonomy inkluderer Business, Data, Application og Technology Architecture.", "Technology Architecture er bare ett av fire lag."] },
        { text: "Enterprise architecture-initiativer kan bli for top-down og fortsette uten å levere konkret forretningsverdi.", correct: true, why: "Riktig: kurset peker på at EA kan være vanskelig, top-down og kritisert for begrensede konkrete resultater.", whyExtended: ["Et vanlig problem er at EA-initiativer kan virke endeløse uten tydelige resultater.", "Derfor er poenget ikke at TOGAF alltid er best, men at nytten er kontekstavhengig."] },
        { text: "Fowler og TOGAF presenteres som identiske syn med ulike navn.", correct: false, why: "Galt: forelesningen kontrasterer TOGAF og Fowler som ulike arkitekturperspektiver.", whyExtended: ["TOGAF er det formelle, ofte sentraliserte perspektivet.", "Fowler representerer et mer meritokratisk og desentralisert perspektiv knyttet til smidig utvikling."] }
      ],
      whyExtendedImageRefs: [
        "togaf_arkitekturtaksonomi",
        "togaf_adm_no"
      ]
    },
    {
      id: 18,
      type: "drag-categorize",
      title: "D4D transformation theory",
      points: 3,
      prompt: "Dra hvert element til transformation area det hører til i Designed for Digital summary model.",
      source: "Kilde: Forelesning 13, Designed for Digital summary, lysbilde om transformation theory.",
      moduleId: "designed-for-digital",
      groupId: "overview",
      items: [
        { id: "new-digital-value-propositions", label: "New value creation through digital value propositions" },
        { id: "operational-backbone-transform", label: "Operational Backbone" },
        { id: "digital-platform-transform", label: "Digital Platform" },
        { id: "digital-offerings-transform", label: "Digital Offerings" },
        { id: "shared-customer-insight-transform", label: "Shared Customer Insight" },
        { id: "accountability-framework-transform", label: "Accountability Framework" }
      ],
      categories: [
        { id: "business-transformation", label: "Business Transformation" },
        { id: "architecture-transformation", label: "Architecture Transformation" },
        { id: "governance-transformation", label: "Governance Transformation" }
      ],
      correctAnswer: {
        "business-transformation": ["new-digital-value-propositions"],
        "architecture-transformation": ["operational-backbone-transform", "digital-platform-transform", "digital-offerings-transform"],
        "governance-transformation": ["shared-customer-insight-transform", "accountability-framework-transform"]
      },
      itemFeedback: {
        "new-digital-value-propositions": { whyCorrect: "Business Transformation handler om ny verdiskaping gjennom digital value propositions.", whyWrong: "New digital value propositions hører til Business Transformation fordi de endrer hvordan virksomheten skaper verdi.", whyExtended: ["D4D summary skiller mellom business, architecture og governance transformation."] },
        "operational-backbone-transform": { whyCorrect: "Operational Backbone hører til Architecture Transformation.", whyWrong: "Operational Backbone hører til Architecture Transformation fordi den strukturerer core systems, processes og data.", whyExtended: ["Den gir et stabilt fundament for digital business."] },
        "digital-platform-transform": { whyCorrect: "Digital Platform hører til Architecture Transformation.", whyWrong: "Digital Platform hører til Architecture Transformation fordi den er en reusable component architecture for digital offerings.", whyExtended: ["Plattformen gir teams tilgang til business, data og infrastructure components."] },
        "digital-offerings-transform": { whyCorrect: "Digital Offerings hører til Architecture Transformation i denne modellen.", whyWrong: "Digital Offerings er gruppert under Architecture Transformation sammen med OB og DP i summary-sliden.", whyExtended: ["Digital offerings er konkrete software-enabled løsninger levert til kunder."] },
        "shared-customer-insight-transform": { whyCorrect: "Shared Customer Insight hører til Governance Transformation.", whyWrong: "Shared Customer Insight hører til Governance Transformation fordi det former organizational learning og prioritering.", whyExtended: ["Det handler om hvordan virksomheten lærer hva den bør bygge."] },
        "accountability-framework-transform": { whyCorrect: "Accountability Framework hører til Governance Transformation.", whyWrong: "Accountability Framework hører til Governance Transformation fordi det fordeler ownership og decision responsibility.", whyExtended: ["Det balanserer autonomy og alignment."] }
      },
      whyExtendedImageRefs: [
        "D4D-overview"
      ]
    },
    {
      id: 19,
      type: "single",
      title: "Rammeverk utenfor verktøykassen",
      points: 1,
      prompt: "Hvilket av følgende beskrives som 'utenfor verktøykassen, men del av IT-ledelse' i CIO toolbox-modellen?",
      source: "Kilde: CIO toolbox-modellen, nederste seksjon.",
      options: [
        {
          text: "Endringsledelse (Prosci / ADKAR)",
          correct: true,
          why: "Riktig: endringsledelse er eksplisitt listet som utenfor verktøykassen, men del av IT-ledelse.",
          whyExtended: [
            "CIO toolbox-modellens nederste seksjon lister: 'Outside the toolbox, but part of IT management: Change management (Prosci / ADKAR), IT service management (ITIL), Procurement / outsourcing, Communication, HR.'",
            "Endringsledelse handler om hvordan mennesker adopterer og tilpasser seg organisatoriske endringer – en kritisk suksessfaktor for IT-initiativer.",
            "Prosci / ADKAR-modellen listes i forelesning 6 sin rammeverksoversikt som et endringsledelsesrammeverk med privat opphav.",
            "Selv om det ikke er ett av de sju kjerneverktøyene, er endringsledelse avgjørende for vellykket implementering av IT-beslutninger."
          ]
        },
        {
          text: "Business case",
          correct: false,
          why: "Galt: business case er verktøy 1 inne i CIO Toolbox.",
          whyExtended: [
            "Business case er det første nummererte verktøyet i CIO Toolbox, med formål 'Prioritization of digital services and funding.'",
            "Det er ett av de sju kjerneverktøyene, ikke en ekstern ledelsesdisiplin.",
            "Business case inkluderer NPV, kvalitative vurderinger og kommunikativ effekt – det er fullt innenfor verktøykassen.",
            "Kategorien 'utenfor verktøykassen' inneholder støttedisipliner som supplerer de sju kjerneverktøyene."
          ]
        },
        {
          text: "Design thinking",
          correct: false,
          why: "Galt: design thinking er verktøy 3 inne i CIO Toolbox.",
          whyExtended: [
            "Design thinking er det tredje nummererte verktøyet, med formål 'Prioritization and product choice – when the problem is unclear.'",
            "Det inkluderer Double Diamond-prosessen, problemreframing, brukerinnsikt og prototyping – alt inne i verktøykassen.",
            "Design thinking er kategorisert under 'INNOVASJON / UTFORSKNING' i CIO toolbox-modellen.",
            "'Utenfor verktøykassen'-elementene er støttedisipliner, ikke innovasjonsmetoder."
          ]
        },
        {
          text: "IT governance",
          correct: false,
          why: "Galt: IT governance er verktøy 7 inne i CIO Toolbox.",
          whyExtended: [
            "IT governance er det sjuende og siste nummererte verktøyet i CIO Toolbox.",
            "Formålet er: 'How to distribute responsibility for IT among organizational units?'",
            "IT governance inkluderer de fem beslutningsdomenene, seks arketypene og styringsmatrisen – alt inne i verktøykassen.",
            "IT governance er kategorisert under 'STYRING' i CIO toolbox-modellen."
          ],
          whyExtendedImageRefs: [
            "it_governance_matrix"
          ]
        }
      ],
      whyExtendedImageRefs: [
        "prince2_framework_model"
      ]
    },
    {
      id: 20,
      type: "dragDrop",
      title: "Elementer i digital strategi",
      points: 2,
      prompt: "Dra hver betydning til riktig element i en digital strategi.",
      source: "Kilde: Digital strategy-forelesning, innholdet i en digital strategi.",
      moduleId: "strategy",
      groupId: "digital-strategy",
      cards: [
        { id: "vision-meaning", text: "En utfordrende og inspirerende retning for digital endring" },
        { id: "portfolio-meaning", text: "Et prioritert sett av digitale initiativer" },
        { id: "roadmap-meaning", text: "Et planleggingsverktøy for timing og rekkefølge på initiativer" },
        { id: "responsibility-meaning", text: "En definisjon av hvem som eier hva og står ansvarlig for hva" }
      ],
      targets: [
        { id: "digital-vision", description: "Digital visjon", correctCardId: "vision-meaning", correctLabel: "En utfordrende og inspirerende retning for digital endring", whyCorrect: "En digital visjon gir en utfordrende og inspirerende retning.", whyWrong: "Denne betydningen hører til digital visjon fordi den handler om retning og ambisjon.", whyExtended: ["En digital visjon bør styre digitale initiativer, ikke bare beskrive et systemkjøp."] },
        { id: "portfolio-of-initiatives", description: "Portefølje av digitale initiativer", correctCardId: "portfolio-meaning", correctLabel: "Et prioritert sett av digitale initiativer", whyCorrect: "En portefølje av digitale initiativer er det prioriterte settet av digitale tiltak.", whyWrong: "Denne betydningen hører til porteføljen av digitale initiativer fordi den handler om valg og prioritering av initiativer.", whyExtended: ["Porteføljen gjør visjonen om til konkrete initiativer."] },
        { id: "roadmap", description: "Roadmap", correctCardId: "roadmap-meaning", correctLabel: "Et planleggingsverktøy for timing og rekkefølge på initiativer", whyCorrect: "Et roadmap er et planleggingsverktøy for timing og rekkefølge.", whyWrong: "Denne betydningen hører til roadmap fordi den handler om når og i hvilken rekkefølge initiativer skal skje.", whyExtended: ["Roadmap lister ikke bare initiativer. Den sekvenserer dem over tid."] },
        { id: "definition-of-responsibility", description: "Ansvarsdefinisjon", correctCardId: "responsibility-meaning", correctLabel: "En definisjon av hvem som eier hva og står ansvarlig for hva", whyCorrect: "Ansvarsdefinisjonen klargjør eierskap og ansvar.", whyWrong: "Denne betydningen hører til ansvarsdefinisjon fordi den svarer på hvem som eier hva.", whyExtended: ["Uten ansvar kan en digital strategi bli en ønskeliste i stedet for en gjennomføringsplan."] }
      ],
      whyExtendedImageRefs: [
        "digital_strategy_model"
      ]
    }
  ]
};

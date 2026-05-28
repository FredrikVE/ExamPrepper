// src/data/exams/mockExam4_no.js
export const mockExam4_no = {
  id: "mock-exam-4-no",
  subjectId: "in5431",
  baseId: "mock-exam-4",
  lang: "no",
  title: "Øvingseksamen 4: CIO Toolbox",
  description: "Business case, alternativanalyse, design thinking, IT-arkitektur, prosjekter, produktteam, IT-styring og Cynefin.",
  questions: [
    {
      id: 1,
      type: "single",
      title: "Oversikt over CIO Toolbox",
      points: 1,
      prompt: "Hva er hovedbudskapet bak metaforen 'verktøykasse' i CIO Toolbox?",
      source: "Kilde: Forelesning 3, CIO Toolbox 1, introduksjonsslide og CIO toolbox-modellen.",
      options: [
        {
          text: "Verktøy er ikke mål i seg selv — de er bare meningsfulle hvis de tjener formålet sitt",
          correct: true,
          why: "Riktig: CIO toolbox-modellen sier eksplisitt at dette er det styrende prinsippet.",
          whyExtended: [
            "CIO toolbox-modellen åpner med: 'Tools are not goals in themselves — they are only meaningful if they serve their purpose.'",
            "Verktøykassemetaforen understreker at man må velge riktig verktøy ut fra beslutningen — slik en håndverker velger riktig verktøy for jobben.",
            "Forelesning 6 forsterker dette: for slike rammeverk og metoder er nytte og verdi svært kontekstavhengig — og noen ganger omdiskutert.",
            "Tretrinnstilnærmingen er: (1) Les rommet, (2) Velg riktig verktøy, (3) Du kan ikke lede kun med teori."
          ]
        },
        {
          text: "Alle organisasjoner må alltid bruke alle de sju verktøyene samtidig",
          correct: false,
          why: "Galt: verktøykassen brukes selektivt, avhengig av situasjonen og beslutningen.",
          whyExtended: [
            "CIO toolbox-modellen sier: 'We use the term «CIO toolbox» informally and also subjectively. Although many CIOs use many of these tools, few will use them all.'",
            "Verktøykassemetaforen betyr at man velger det passende verktøyet — å bruke alle verktøy samtidig ville vært upraktisk og unødvendig.",
            "Ulike situasjoner krever ulike verktøy: et kjent problem kan kreve en business case, mens et uklart problem kan kreve design thinking.",
            "Metaverktøyet Cynefin er nettopp ment å hjelpe til med å velge riktig ledelsestilnærming basert på kontekst."
          ]
        },
        {
          text: "Verktøykassen erstatter behovet for ledererfaring og dømmekraft",
          correct: false,
          why: "Galt: CIO toolbox-modellen sier eksplisitt at ledelse krever dialog, dømmekraft og læring.",
          whyExtended: [
            "Trinn 3 i CIO toolbox-modellen sier: 'You cannot lead by theory: frameworks help, but leadership requires dialogue, judgement and learning.'",
            "Rammeverk strukturerer beslutningstaking, men kan ikke erstatte kontekstforståelse og mellommenneskelige ferdigheter.",
            "Forelesning 3 påpeker: 'No standard way of making choices' — det finnes alltid et menneskelig element i beslutninger.",
            "Modellen fremhever 'Read the room' som første trinn, som krever vurdering av formål, strategi, ressurser, modenhet og kontekst."
          ]
        },
        {
          text: "Verktøykassen gjelder bare IT-avdelinger, ikke forretningsledere",
          correct: false,
          why: "Galt: CIO Toolbox handler om skjæringspunktet mellom forretningsledelse og IT-ledelse.",
          whyExtended: [
            "IT-styring involverer eksplisitt forretningsledere gjennom arketyper som Business Monarchy og Federal system.",
            "Business case-verktøyet handler om prioritering av digitale tjenester og finansiering — en forretningsbeslutning, ikke bare en IT-beslutning.",
            "Operating model-konseptet kobler prosessintegrasjon og standardisering til IT-arkitektur — altså en bro mellom virksomhet og IT.",
            "Kurset handler om IT-ledelsesutfordringer og strategier på organisasjonsnivå, ikke bare internt i IT-avdelinger."
          ]
        }
      ]
    },
    {
      id: 2,
      type: "multi",
      title: "Komponenter i en business case",
      points: 1,
      prompt: "Marker de riktige utsagnene om business case-verktøyet i CIO Toolbox.",
      source: "Kilde: Forelesning 3, CIO Toolbox 1, lysbilder om utility maximisation og bruk av NPV.",
      options: [
        {
          text: "For hvert alternativ bør du analysere forventet nytte, kostnad, tidspunkt og risiko.",
          correct: true,
          why: "Riktig: dette er de fire faktorene i utility maximisation.",
          whyExtended: [
            "Forelesning 3 presenterer utility maximisation med fire faktorer: '(a) the expected benefit, (b) the expected cost, (c) the timing, (d) the estimated risk.'",
            "CIO toolbox-modellen plasserer dette under 'Rational choices & utility maximisation' for business case-verktøyet.",
            "Hver faktor dekker en egen dimensjon: nytte er det du får, kostnad er det du investerer, tidspunkt er når nytten kommer, og risiko er sannsynligheten for at estimatene er feil.",
            "For ikke-trivielle initiativer er det umulig å sette disse verdiene helt korrekt — de er alltid estimater."
          ]
        },
        {
          text: "NPV har en sterk kommunikativ effekt utover den numeriske presisjonen.",
          correct: true,
          why: "Riktig: forelesningen fremhever eksplisitt den kommunikative rollen til business cases.",
          whyExtended: [
            "Forelesning 3 sier: 'NPV has a strong communicative effect. In a decision process, NPV is often presented together with a set of non-quantifiable benefits.'",
            "CIO toolbox-modellen lister 'Communicative effect — Business case as communication and transparency tool, not just calculation' som et viktig aspekt.",
            "Selv når NPV-estimater er upresise, skaper den strukturerte formen åpenhet om antakelser og gjør uenigheter synlige.",
            "Dette betyr at en business case har to formål: analytisk (sammenligne alternativer) og kommunikativt (bygge felles forståelse)."
          ]
        },
        {
          text: "En business case kan alltid gi en helt presis prediksjon av utfallet.",
          correct: false,
          why: "Galt: forelesningen understreker at estimater alltid er usikre, spesielt for ikke-trivielle initiativer.",
          whyExtended: [
            "Forelesning 3 sier eksplisitt: 'For any non-trivial development initiative, setting these values correctly is impossible — they are estimates.'",
            "Nytte kan være 'hard or impossible to estimate numerically — in particular if they are related to safety or security.'",
            "Forelesning 3 påpeker også at det ikke finnes 'completely rational actors' — beslutninger påvirkes av individers følelser og organisasjonens kulturelle kontekst.",
            "Risikopremien i NPV-beregninger er selv et estimat — business case er en strukturert tilnærming, ikke en presis spådom."
          ]
        },
        {
          text: "Kvalitative gevinster som etterlevelse, sikkerhet og trygghet bør også vurderes sammen med NPV.",
          correct: true,
          why: "Riktig: CIO toolbox-modellen inkluderer eksplisitt ikke-kvantifiserbare gevinster.",
          whyExtended: [
            "CIO toolbox-modellen lister 'Qualitative considerations — Non-quantifiable benefits: compliance, security, safety' som del av business case-verktøyet.",
            "Forelesning 3 sier at NPV ofte presenteres sammen med et sett ikke-kvantifiserbare gevinster for hvert alternativ.",
            "Noen av de viktigste gevinstene (regulatorisk etterlevelse, sikkerhetsforbedringer, trygghet) kan ikke uttrykkes som kontantstrømmer.",
            "En fullstendig business case kombinerer derfor kvantitativ NPV med kvalitativ vurdering — tall alene er ikke nok."
          ]
        }
      ]
    },
    {
      id: 3,
      type: "fill",
      title: "NPV-formel",
      points: 1,
      prompt: "I en business case brukes ________ for å ta hensyn til risikoen for at fremtidige kontantstrømmer ikke materialiserer seg som forventet.",
      answers: [
        "diskonteringsrate",
        "diskonteringsrente",
        "diskonteringsfaktor",
        "risikopremie",
        "discount rate",
        "risk premium"
      ],
      answerKey: "diskonteringsrate / risikopremie",
      source: "Kilde: Forelesning 3, CIO Toolbox 1, lysbilder om finansiell business case og NPV.",
      whyCorrect: "Riktig fordi diskonteringsraten (som inkluderer en risikopremie) reduserer nåverdien av fremtidige kontantstrømmer for å reflektere usikkerhet. Høyere risiko betyr høyere diskonteringsrate, som senker NPV.",
      whyWrong: "Galt hvis svaret bare viser til rente uten risikodimensjonen, eller til begreper som konverteringsrate, som er en spesifikk forretningsmetrik og ikke den generelle finansielle justeringsmekanismen."
    },
    {
      id: 4,
      type: "single",
      title: "Prosess for alternativanalyse",
      points: 1,
      prompt: "Hva er riktig rekkefølge på trinnene i den generiske beslutningsprosessen (alternativanalyse)?",
      source: "Kilde: Forelesning 3, CIO Toolbox 1, lysbilde om generic decision making process.",
      options: [
        {
          text: "1. Forstå situasjonen, 2. Syntetiser alternativer, 3. Evaluer og foreslå",
          correct: true,
          why: "Riktig: dette er de tre trinnene i den generiske beslutningsprosessen.",
          whyExtended: [
            "CIO toolbox-modellen beskriver de tre trinnene: (1) Understand the situation (root-cause analysis), (2) Synthesize options (concepts), (3) Evaluate and propose.",
            "Trinn 1 fokuserer på å forstå 'hvorfor' — intern kompetanse, tekniske ressurser og kulturelle faktorer.",
            "Trinn 2 handler om å presentere alternative handlinger som 'concepts' — et internt konsistent sett med arbeid. Målet er å sikre at alle relevante alternativer vurderes.",
            "Trinn 3 bruker evalueringsmetoder som business case (verktøy 1), plus/minus-metoden, kostnadsrangering og real options."
          ]
        },
        {
          text: "1. Evaluer og foreslå, 2. Forstå situasjonen, 3. Syntetiser alternativer",
          correct: false,
          why: "Galt: du kan ikke evaluere før du har forstått situasjonen og generert alternativer.",
          whyExtended: [
            "Evaluering krever alternativer å sammenligne — først må du forstå problemet og utvikle alternativer.",
            "Å starte med evaluering betyr å bedømme løsninger uten å vite hvilket problem du prøver å løse.",
            "Forelesningen plasserer rotårsaksanalyse først nettopp fordi situasjonsforståelsen former hvilke alternativer som er relevante.",
            "Den generiske prosessen følger en logisk sekvens: diagnostiser → generer → evaluer."
          ]
        },
        {
          text: "1. Syntetiser alternativer, 2. Evaluer og foreslå, 3. Forstå situasjonen",
          correct: false,
          why: "Galt: å generere alternativer før situasjonen er forstått kan føre til at man løser feil problem.",
          whyExtended: [
            "Design thinking sin Discover-fase viser samme poeng: du må forstå problemet før du genererer løsninger.",
            "Uten situasjonsforståelse kan alternativene adressere symptomer i stedet for rotårsaker.",
            "CIO toolbox-modellen plasserer 'Understand the situation (root-cause analysis)' som trinn 1 fordi det forankrer hele prosessen.",
            "Å forstå situasjonen etter evaluering ville gjort evalueringen meningsløs — du ville ikke vite hvilke kriterier som betyr noe."
          ]
        },
        {
          text: "1. Implementer det billigste alternativet, 2. Analyser resultatene, 3. Prøv neste alternativ",
          correct: false,
          why: "Galt: dette beskriver prøving og feiling, ikke strukturert alternativanalyse.",
          whyExtended: [
            "Alternativanalyse er en strukturert, analytisk tilnærming — ikke tilfeldig eksperimentering.",
            "Å velge det billigste alternativet ignorerer business case-logikken om å veie nytte, kostnad, tidspunkt og risiko samlet.",
            "Den generiske prosessen krever evaluering av alle relevante alternativer før anbefaling gis.",
            "Prøving og feiling kan passe i Cynefins komplekse domene (probe-sense-respond), men alternativanalyse er laget for det kompliserte domenet."
          ]
        }
      ]
    },
    {
      id: 5,
      type: "single",
      title: "Business case vs. alternativanalyse",
      points: 1,
      prompt: "Hvordan henger business case (verktøy 1) og alternativanalyse (verktøy 2) sammen?",
      source: "Kilde: Forelesning 3, CIO toolbox-modellen, notat mellom verktøy 1 og verktøy 2.",
      options: [
        {
          text: "Business case er én evalueringsmetode inne i alternativanalyse (trinn 3); de er separate verktøy, men tett koblet",
          correct: true,
          why: "Riktig: CIO toolbox-modellen sier dette eksplisitt.",
          whyExtended: [
            "CIO toolbox-modellen har et notat: 'Business case (tool 1) is one evaluation method inside alternative analysis (tool 2, step 3). They are separate tools but tightly connected.'",
            "Alternativanalyse har tre trinn; business case hører hjemme i trinn 3 (Evaluate and propose) som en av flere evalueringsmetoder.",
            "Andre evalueringsmetoder i trinn 3 er plus/minus-metoden, kostnadsrangering og real options.",
            "Dette betyr at enhver business case er del av en alternativanalyse, men ikke enhver alternativanalyse krever en full finansiell business case."
          ]
        },
        {
          text: "De er helt urelaterte verktøy som brukes i ulike bransjer",
          correct: false,
          why: "Galt: de beskrives eksplisitt som tett koblet i CIO toolbox-modellen.",
          whyExtended: [
            "CIO toolbox-modellen inneholder et spesifikt notat som forklarer koblingen mellom dem — de er ikke adskilte i den forstanden.",
            "Begge verktøyene ligger under kategorien 'VALG' i CIO Toolbox, som viser at de har beslektede formål.",
            "Business case fokuserer på kvantitativ og kvalitativ evaluering; alternativanalyse gir den bredere prosessen som inkluderer evaluering.",
            "Begge brukes på tvers av bransjer — de er generelle ledelsesverktøy, ikke bransjespesifikke."
          ]
        },
        {
          text: "Alternativanalyse erstatter business case fullstendig",
          correct: false,
          why: "Galt: business case er en metode innenfor alternativanalyse, ikke noe som erstattes av den.",
          whyExtended: [
            "Business case gir spesifikke analytiske verktøy (NPV, risikovurdering) som alternativanalyse ikke erstatter.",
            "Alternativanalyse er en bredere prosess; den trenger evalueringsmetoder som business case for å fungere i trinn 3.",
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
      ]
    },
    {
      id: 6,
      type: "single",
      title: "Design thinking-tilnærming",
      points: 1,
      prompt: "Hva er nøkkelinnsikten i 'Discover'-fasen i Double Diamond?",
      source: "Kilde: Forelesning 4, CIO Toolbox 2, lysbilde 'The Discover phase'.",
      options: [
        {
          text: "Poenget med reframing er ikke å finne det 'ekte' problemet, men å se om det finnes et bedre problem å løse",
          correct: true,
          why: "Riktig: dette er en direkte innsikt fra Discover-fasen, med vekt på problemreframing.",
          whyExtended: [
            "Forelesning 4 siterer Wedell-Wedellsborg: 'The point of reframing is not to find the real problem but, rather, to see if there is a better one to solve.'",
            "Forelesningen sier også at ideen om at det finnes ett enkelt rotproblem kan være misvisende; problemer er ofte multikausale og kan angripes på mange måter.",
            "Discover-fasen handler om å forstå, ikke anta, hva problemet er — den innebærer å snakke med og bruke tid med menneskene som påvirkes av problemene.",
            "Dette står i kontrast til den analytiske tilnærmingen i business case/alternativanalyse, der problemet antas å være forstått."
          ]
        },
        {
          text: "Discover-fasen handler om å implementere den endelige løsningen i full skala",
          correct: false,
          why: "Galt: Discover handler om å forstå problemet, ikke om å implementere løsninger.",
          whyExtended: [
            "Discover-fasen er den første diamanten i Double Diamond — den fokuserer på divergent utforskning av problemrommet.",
            "Implementering skjer i Deliver-fasen, som er den siste fasen i Double Diamond.",
            "Fullskala implementering unngås eksplisitt i design thinking; Deliver-fasen innebærer å teste ulike løsninger i liten skala.",
            "Å hoppe til implementering i Discover-fasen ville hoppe over forståelse, definering og utvikling — tre kritiske faser."
          ]
        },
        {
          text: "Discover-fasen beregner NPV for hver potensiell løsning",
          correct: false,
          why: "Galt: NPV er del av business case-verktøyet, ikke Discover-fasen i design thinking.",
          whyExtended: [
            "Discover-fasen er kvalitativ og utforskende — den bruker teknikker som brukerinnsikt, observasjon og empati.",
            "NPV-beregning hører til business case-verktøyet (verktøy 1) og evalueringssteget i alternativanalyse (verktøy 2).",
            "Design thinking og business case har ulike formål: design thinking utforsker hva som bør bygges, mens business case vurderer om det er verdt å investere.",
            "I CIO Toolbox er dette separate verktøy med ulike typiske formål."
          ]
        },
        {
          text: "Discover-fasen tildeler styringsarketyper til hver forretningsenhet",
          correct: false,
          why: "Galt: styringsarketyper hører til IT governance-verktøyet, ikke design thinking.",
          whyExtended: [
            "Styringsarketyper (Business Monarchy, IT Monarchy, Federal osv.) er del av verktøy 7 (IT-styring) i CIO Toolbox.",
            "Discover-fasen handler om å forstå brukerbehov og problemrommet, ikke organisatoriske beslutningsstrukturer.",
            "IT governance avgjør 'who systematically makes and contributes to decisions' — design thinking avgjør 'hvilket problem bør vi løse'.",
            "Dette er helt ulike aktiviteter med ulike formål i CIO Toolbox."
          ]
        }
      ]
    },
    {
      id: 7,
      type: "multi",
      title: "TOGAFs arkitekturtaksonomi",
      points: 1,
      prompt: "Hvilke av følgende er blant de fire arkitekturtypene i TOGAF-taksonomien?",
      source: "Kilde: Forelesning 5, CIO Toolbox 3, lysbilde 'Architecture taxonomy (according to TOGAF)'.",
      options: [
        {
          text: "Business Architecture",
          correct: true,
          why: "Riktig: Business Architecture definerer forretningsstrategi, governance, organisasjon og sentrale forretningsprosesser.",
          whyExtended: [
            "Forelesning 5 definerer Business Architecture som: 'defines the business strategy, governance, organization, and key business processes.'",
            "Business Architecture er det første laget i TOGAF-taksonomien og kobler arkitektur til forretningsmål.",
            "Det bygger bro mellom strategi (forelesning 2) og implementering ved å definere hvordan organisasjonen fungerer på arkitekturnivå.",
            "Business Architecture former kravene til de tre andre arkitekturtypene."
          ]
        },
        {
          text: "Data Architecture",
          correct: true,
          why: "Riktig: Data Architecture beskriver strukturen i organisasjonens logiske og fysiske dataressurser.",
          whyExtended: [
            "Forelesning 5 definerer Data Architecture som: 'describes the structure of an organization's logical and physical data assets and data management resources.'",
            "Data Architecture er kritisk fordi dataintegrasjon og standardisering er viktige dimensjoner i operating model.",
            "I D4D-termer er pålitelige og tilgjengelige masterdata en kjernefunksjon i Operational Backbone.",
            "Data Architecture kobler også til Digital Platform-byggeklossen, der datakomponenter gjøres tilgjengelige for gjenbruk."
          ]
        },
        {
          text: "Marketing Architecture",
          correct: false,
          why: "Galt: Marketing Architecture er ikke del av TOGAF-taksonomien.",
          whyExtended: [
            "De fire TOGAF-arkitekturene er: Business, Data, Application og Technology Architecture.",
            "Markedsføring er en forretningsfunksjon, ikke en arkitekturtype i TOGAF-rammeverket.",
            "Markedsføringsaktiviteter kan representeres innen Business Architecture som forretningsprosesser, men er ikke et eget arkitekturlag.",
            "TOGAF fokuserer på strukturelle perspektiver på hvordan virksomheten er organisert teknisk og operasjonelt."
          ]
        },
        {
          text: "Application Architecture",
          correct: true,
          why: "Riktig: Application Architecture gir en plan for applikasjoner, samspill mellom dem og relasjoner til kjerneprosesser.",
          whyExtended: [
            "Forelesning 5 definerer Application Architecture som: 'provides a blueprint for the individual applications to be deployed, their interactions, and their relationships to the core business processes of the organization.'",
            "Application Architecture kartlegger hvilke applikasjoner som finnes, hvordan de samhandler, og hvordan de støtter forretningsprosesser.",
            "Dette er sentralt for å forstå IT-porteføljen — som er det typiske formålet med IT Architecture-verktøyet i CIO Toolbox.",
            "I D4D-termer hjelper Application Architecture med å identifisere hvilke komponenter som bør høre til Operational Backbone versus Digital Platform."
          ]
        },
        {
          text: "Technology Architecture",
          correct: true,
          why: "Riktig: Technology Architecture beskriver logiske programvare- og maskinvarekapabiliteter som støtter business-, data- og applikasjonstjenester.",
          whyExtended: [
            "Forelesning 5 definerer Technology Architecture som: 'describes the logical software and hardware capabilities that are required to support the deployment of business, data, and application services; this includes IT infrastructure, middleware, networks, communications, processing, standards, etc.'",
            "Technology Architecture er det mest tekniske laget og handler om infrastruktur og plattformer.",
            "Det kobler til IT governance-beslutningsdomenet 'IT infrastructure strategies' fra forelesning 6.",
            "Technology Architecture understøtter alle de andre arkitekturlagene — uten passende infrastruktur kan applikasjoner og data ikke fungere."
          ]
        }
      ]
    },
    {
      id: 8,
      type: "single",
      title: "Operating model-kvadranter",
      points: 1,
      prompt: "Hvilken operating model har en organisasjon med høy prosessstandardisering, men lav prosessintegrasjon?",
      source: "Kilde: Forelesning 5, CIO Toolbox 3, lysbilde om operating model og fire operating models.",
      options: [
        {
          text: "Coordination",
          correct: false,
          why: "Galt: Coordination har høy integrasjon, men lav standardisering.",
          whyExtended: [
            "Coordination betyr at forretningsenheter deler data og kunder (høy integrasjon), men opererer med ulike prosesser (lav standardisering).",
            "Eksempel: et finansselskap der ulike produktlinjer deler kundedata, men har enhetsspesifikke prosesser.",
            "Høy integrasjon betyr at prosesser er koblet og deler data på tvers av enheter; lav standardisering betyr at prosessene varierer mellom enheter.",
            "Coordination er motsetningen til Replication på standardiseringsaksen."
          ]
        },
        {
          text: "Unification",
          correct: false,
          why: "Galt: Unification har både høy integrasjon og høy standardisering.",
          whyExtended: [
            "Unification betyr at forretningsprosesser er både sterkt standardiserte og sterkt integrerte på tvers av organisasjonen.",
            "Denne modellen gir størst stordriftsfordeler, men minst fleksibilitet for lokal tilpasning.",
            "Eksempel: en butikkjede der alle butikker følger identiske prosesser og bruker samme systemer.",
            "Unification krever den mest sentraliserte tilnærmingen til IT-ledelse."
          ]
        },
        {
          text: "Diversification",
          correct: false,
          why: "Galt: Diversification har både lav integrasjon og lav standardisering.",
          whyExtended: [
            "Diversification betyr at forretningsenheter opererer uavhengig med ulike prosesser og minimal datadeling.",
            "Denne modellen gir maksimal lokal autonomi, men minimale synergier på tvers av organisasjonen.",
            "Eksempel: et konglomerat med helt uavhengige forretningslinjer som deler lite utover konsernstyring.",
            "Diversification stiller færrest krav til felles IT-infrastruktur."
          ]
        },
        {
          text: "Replication",
          correct: true,
          why: "Riktig: Replication har høy standardisering, men lav integrasjon.",
          whyExtended: [
            "Replication betyr at forretningsenheter følger standardiserte prosesser (høy standardisering), men opererer uavhengig uten omfattende datadeling (lav integrasjon).",
            "Eksempel: en franchisemodell der hver lokasjon følger samme prosedyrer, men håndterer egne data uavhengig.",
            "CIO toolbox-modellen beskriver operating model som 'process integration × standardization' med fire modeller som resultat.",
            "Replication gir stordriftsfordeler gjennom standardiserte prosesser samtidig som enheter kan operere selvstendig."
          ]
        }
      ]
    },
    {
      id: 9,
      type: "single",
      title: "Fowler vs. TOGAF",
      points: 1,
      prompt: "Hva er den sentrale forskjellen mellom TOGAF-perspektivet og Fowler-perspektivet på arkitektur?",
      source: "Kilde: Forelesning 5, CIO Toolbox 3, lysbilde 'Different views on architecture and architects'.",
      options: [
        {
          text: "TOGAF representerer et formelt, ofte sentralisert perspektiv; Fowler representerer et mer meritokratisk og desentralisert perspektiv",
          correct: true,
          why: "Riktig: dette er skillet som trekkes i forelesning 5.",
          whyExtended: [
            "Forelesning 5 sier: 'The Open Group — through TOGAF — represents a formal, and often centralized, perspective on architecture and architecture work.'",
            "I kontrast: 'Martin Fowler — who is the closest we get to an architecture thought leader in agile development, represents a more meritocratic and decentralized perspective.'",
            "CIO toolbox-modellen beskriver: 'TOGAF = formal architecture governance, often more centralized' vs. 'Fowler = architecture as the important stuff; collaborative, decentralized orientation'.",
            "Dette speiler en bredere spenning i IT-ledelse mellom strukturert styring og smidig samarbeid."
          ]
        },
        {
          text: "TOGAF er bare for små oppstartsbedrifter, mens Fowler er for store virksomheter",
          correct: false,
          why: "Galt: TOGAF forbindes faktisk oftere med større og mer komplekse organisasjoner.",
          whyExtended: [
            "TOGAF har opphav i det amerikanske forsvaret — et miljø med store og komplekse organisasjoner — og brukes primært av større virksomheter.",
            "Fowlers perspektiv er vanligere i agile utviklingsmiljøer, som kan finnes både i startups og store team.",
            "Valget mellom perspektivene handler ikke om virksomhetsstørrelse, men om ledelsesfilosofi: formell styring vs. samarbeidende beslutningstaking.",
            "Store organisasjoner kan bruke begge tilnærmingene — spørsmålet er sentralisering vs. desentralisering av arkitekturbeslutninger."
          ]
        },
        {
          text: "De er identiske tilnærminger med ulike navn",
          correct: false,
          why: "Galt: forelesning 5 kontrasterer dem eksplisitt som ulike syn på arkitektur.",
          whyExtended: [
            "Forelesning 5 presenterer dem som alternativer på et spekter fra formell/sentralisert til samarbeidende/desentralisert.",
            "TOGAF bruker en strukturert Architecture Development Method (ADM) med definerte faser og roller.",
            "Fowler ser arkitektur som fremvoksende — 'the important stuff' som teamet kollektivt identifiserer og bryr seg om.",
            "CIO Toolbox nevner også Open Agile Architecture som et tredje perspektiv, noe som viser at flere syn finnes."
          ]
        },
        {
          text: "Fowler avviser hele arkitekturbegrepet",
          correct: false,
          why: "Galt: Fowler definerer arkitektur annerledes, men avviser det ikke.",
          whyExtended: [
            "Fowler definerer arkitektur som 'the important stuff' — han omformulerer hva arkitektur betyr i stedet for å avvise det.",
            "Hans perspektiv er at arkitektur er det teamet kollektivt anser som viktig å forstå og bevare.",
            "Dette er en pragmatisk redefinisjon, ikke en avvisning — den flytter arkitektur fra formell dokumentasjon til felles forståelse.",
            "Forelesning 5 presenterer Fowler som 'the closest we get to an architecture thought leader in agile development' — han er sterkt engasjert i arkitektur, bare fra en annen vinkel."
          ]
        }
      ]
    },
    {
      id: 10,
      type: "fill",
      title: "Triple constraint",
      points: 1,
      prompt: "Prosjekter med fast kostnad, scope og ________ er spesielt sårbare for skuffelse.",
      answers: [
        "tid",
        "time",
        "tidsplan",
        "frist",
        "deadline",
        "schedule"
      ],
      answerKey: "tid",
      source: "Kilde: Forelesning 4, CIO Toolbox 2, lysbilde 'The triple constraint'.",
      whyCorrect: "Riktig fordi triple constraint består av scope, kostnad og tid. Når alle tre er faste, finnes det ingen fleksibilitet til justering, noe som gjør prosjektet svært sårbart for skuffelse.",
      whyWrong: "Galt hvis svaret viser til kvalitet, risiko eller ressurser — selv om dette er viktige prosjektforhold, består triple constraint spesifikt av scope, kostnad og tid."
    },
    {
      id: 11,
      type: "multi",
      title: "PRINCE2-prinsipper",
      points: 1,
      prompt: "Hvilke av følgende er blant de sju PRINCE2-prinsippene?",
      source: "Kilde: Forelesning 4, CIO Toolbox 2, og kursoppsummering om PRINCE2.",
      options: [
        {
          text: "Continued business justification",
          correct: true,
          why: "Riktig: det kreves en forsvarlig grunn gjennom hele prosjektets levetid.",
          whyExtended: [
            "PRINCE2-prinsipp 1: 'Continued business justification — a justifiable reason required to run a project.'",
            "Det betyr at business casen må være gyldig gjennom hele prosjektet — hvis begrunnelsen forsvinner, bør prosjektet stoppes.",
            "Dette kobler til business case-verktøyet i CIO Toolbox: business case er ikke bare en øvelse i starten, men en løpende bekymring.",
            "PRINCE2 har 'business case' som ett av sine sju temaer, noe som forsterker koblingen til fortsatt begrunnelse."
          ],
          whyExtendedImageRefs: [
            {
              imageId: "prince2_framework_model"
            }
          ]
        },
        {
          text: "Manage by stages",
          correct: true,
          why: "Riktig: prosjekter bør planlegges, overvåkes og kontrolleres fase for fase.",
          whyExtended: [
            "PRINCE2-prinsipp 4: 'Manage by stages — should be planned, monitored and controlled stage by stage.'",
            "Fasebasert styring gir jevnlige beslutningspunkter der prosjektstyret kan godkjenne neste fase.",
            "Dette gir naturlige sjekkpunkter for å revurdere business case og justere planer basert på læring.",
            "Manage by stages balanserer detaljert planlegging på kort sikt med mer overordnet planlegging for senere faser."
          ],
          whyExtendedImageRefs: [
            {
              imageId: "prince2_framework_model"
            }
          ]
        },
        {
          text: "Alltid maksimer antall teammedlemmer",
          correct: false,
          why: "Galt: dette er ikke et PRINCE2-prinsipp. PRINCE2 fokuserer på definerte roller, begrunnelse og tilpasning.",
          whyExtended: [
            "De sju PRINCE2-prinsippene er: continued business justification, learn from experience, defined roles and responsibilities, manage by stages, manage by exception, focus on products, tailor to suit the project environment.",
            "Ingen av disse handler om å maksimere teamstørrelse — det ville motsagt prinsippet om å tilpasse til prosjektmiljøet.",
            "PRINCE2-prinsipp 3 handler om 'defined roles and responsibilities: clear organizational structure; accountability' — kvalitet på roller, ikke antall personer.",
            "Flere teammedlemmer kan ofte gi kommunikasjonskostnader som bremser prosjektet."
          ]
        },
        {
          text: "Tailor to suit the project environment",
          correct: true,
          why: "Riktig: PRINCE2 skal tilpasses det konkrete miljøet, størrelsen, kompleksiteten og risikoen.",
          whyExtended: [
            "PRINCE2-prinsipp 7: 'Tailor to suit the project environment — tailored to suit environment, size, complexity, importance, capability and risk.'",
            "Dette stemmer med CIO Toolbox sitt overordnede budskap om at rammeverk er kontekstavhengige.",
            "Et lite prosjekt med lav risiko bør bruke en lettere PRINCE2-implementering enn et stort og komplekst prosjekt.",
            "Tilpasningsprinsippet kobler også til Cynefin: ledelsestilnærmingen bør passe kompleksiteten i situasjonen."
          ],
          whyExtendedImageRefs: [
            {
              imageId: "prince2_framework_model"
            }
          ]
        },
        {
          text: "Ignorer tidligere erfaringer for å bevare et friskt perspektiv",
          correct: false,
          why: "Galt: PRINCE2 krever eksplisitt læring fra erfaring.",
          whyExtended: [
            "PRINCE2-prinsipp 2: 'Learn from experience — continually seek and draw lessons.'",
            "Dette er det motsatte av å ignorere tidligere erfaringer — PRINCE2 krever at lærdom fanges opp og brukes.",
            "Å lære av erfaring kobler til det bredere agile/produktteam-prinsippet om pivots og læring.",
            "Kursoppsummeringen identifiserer læring som et nøkkelprinsipp for prosjektsuksess."
          ]
        }
      ],
      moduleId: "cio-tool-box",
      groupId: "prince2"
    },
    {
      id: 12,
      type: "single",
      title: "Prosjekter vs. produktteam",
      points: 1,
      prompt: "Hva er en sentral forskjell mellom prosjekttilnærmingen og produktteamtilnærmingen?",
      source: "Kilde: Forelesning 4, CIO Toolbox 2, lysbilder om prosjekter og produktteam.",
      options: [
        {
          text: "Prosjekter er midlertidige organisasjoner; produktteam har varig eierskap til et digitalt produkt eller en digital tjeneste",
          correct: true,
          why: "Riktig: dette er den grunnleggende forskjellen mellom de to tilnærmingene.",
          whyExtended: [
            "CIO toolbox-modellen definerer et prosjekt som 'temporary organization — Specified results within a specified period.'",
            "Produktteam beskrives med 'Lasting ownership of a digital product/service' og 'Continuous development and operations.'",
            "Forelesning 4 oppsummerer: 'Ensure continuity by creating lasting product teams instead of projects.'",
            "Skillet er sentralt: prosjekter oppløses etter levering, mens produktteam består og forbedrer produktet kontinuerlig."
          ]
        },
        {
          text: "Prosjekter fokuserer på outcome, mens produktteam fokuserer på output",
          correct: false,
          why: "Galt: det er motsatt — produktteam fokuserer på outcome over output.",
          whyExtended: [
            "CIO toolbox-modellen sier at produktteamlogikken inkluderer 'Outcome over output.'",
            "Outcome betyr forretningsresultatet eller kundeverdien som oppnås; output betyr leveransene som produseres.",
            "Prosjekter måler ofte suksess ved å levere definert scope til tid og budsjett (output), mens produktteam måler suksess gjennom verdien som skapes (outcome).",
            "Forelesning 4 understreker at produktteam bør fokusere på 'what difference does it make' fremfor 'how much did we deliver'."
          ]
        },
        {
          text: "Produktteam bruker aldri planlegging eller estimering",
          correct: false,
          why: "Galt: produktteam planlegger, men på et annet nivå — for eksempel sprintplanlegging i Scrum.",
          whyExtended: [
            "Kursoppsummeringen sier at Scrum 'requires planning at the sprint level' — produktteam planlegger altså.",
            "Produktteam planlegger iterativt og tilpasser seg basert på tilbakemelding og læring, i stedet for å lage en full plan på forhånd.",
            "Agil planlegging handler om å prioritere etter verdi og justere kursen, ikke om å ikke ha plan.",
            "Skillet er ikke planlegging vs. ingen planlegging, men detaljert forhåndsplanlegging (prosjekter) vs. adaptiv iterativ planlegging (produktteam)."
          ]
        },
        {
          text: "Prosjekter feiler alltid, mens produktteam alltid lykkes",
          correct: false,
          why: "Galt: forelesningen sier at begge tilnærmingene kan være nyttige eller problematiske.",
          whyExtended: [
            "Forelesning 4 konkluderer: 'Both projects or autonomous product teams can be useful or troublesome.'",
            "Prosjekter har klare fordeler: flere interessenter kan involveres enkelt, og komplekse avhengigheter kan løses gjennom nøye planlegging.",
            "Produktteam har også utfordringer: balansen mellom autonomi og alignment, riktig grad av autonomi og tilpasning av agile praksiser.",
            "Valget avhenger av kontekst — noe som kobler til Cynefin som metaverktøy for å velge riktig ledelsestilnærming."
          ]
        }
      ]
    },
    {
      id: 13,
      type: "single",
      title: "Styringsdilemma",
      points: 1,
      prompt: "Hva er kjernedilemmaet i IT-styring?",
      source: "Kilde: Forelesning 6, CIO Toolbox 4, lysbilder om IT governance og sentralisering vs. desentralisering.",
      options: [
        {
          text: "Sentralisering (skala, etterlevelse) versus desentralisering (smidighet, lokal tilpasning)",
          correct: true,
          why: "Riktig: dette er det grunnleggende styringsdilemmaet som beskrives i CIO toolbox-modellen.",
          whyExtended: [
            "CIO toolbox-modellen lister 'Governance dilemma: Centralization (scale, compliance) vs. decentralization (agility, local fit).'.",
            "Sentralisering gir stordriftsfordeler, konsistens og etterlevelse av standarder, men kan redusere responsivitet.",
            "Desentralisering muliggjør smidighet og lokal tilpasning, men kan føre til fragmentering, duplisering og manglende standarder.",
            "Styringsmatrisen lar organisasjoner bruke ulike arketyper for ulike beslutningsdomener — IT-infrastruktur kan være sentralisert mens business application needs kan være desentralisert."
          ]
        },
        {
          text: "Om man skal bruke Scrum eller PRINCE2",
          correct: false,
          why: "Galt: valg av utviklingsmetode er en operasjonell beslutning, ikke kjernen i styringsdilemmaet.",
          whyExtended: [
            "Scrum og PRINCE2 er rammeverk for å organisere utvikling (verktøy 5 og 6 i CIO Toolbox), ikke selve styringsmekanismer.",
            "IT-styring handler om 'who systematically makes and contributes to decisions', ikke hvilken metode man bruker.",
            "Styringsdilemmaet er strukturelt — hvordan beslutningsmyndighet fordeles på tvers av organisasjonen.",
            "Metodevalg kan være en konsekvens av styringsbeslutninger, men er ikke selve styringsdilemmaet."
          ]
        },
        {
          text: "Om man skal investere i IT i det hele tatt",
          correct: false,
          why: "Galt: IT-styring antar at IT-investeringer finnes og fokuserer på hvordan de skal styres.",
          whyExtended: [
            "IT-styring defineres som å samkjøre IT-investeringer med overordnede forretningsprioriteringer — det forutsetter at investeringer gjøres.",
            "Spørsmålet om man skal investere i IT er en strategisk forretningsbeslutning, ikke et styringsdilemma.",
            "Styringsdilemmaet handler om hvordan beslutningstaking om IT organiseres, ikke om IT skal finnes.",
            "Ett av de fem styringsdomenene er 'IT investment and prioritization' — som handler om å fordele investeringer, ikke eliminere dem."
          ]
        },
        {
          text: "Om CIO bør rapportere til CEO eller CFO",
          correct: false,
          why: "Galt: dette er et spørsmål om rapporteringslinje, ikke kjernen i styringsdilemmaet.",
          whyExtended: [
            "Kjernedilemmaet i styring handler om balansen mellom sentralisert og desentralisert beslutningstaking i hele organisasjonen.",
            "CIOs rapporteringslinje kan påvirke styringsresultater, men dilemmaet er bredere enn én rapporteringsrelasjon.",
            "Styringsmatrisen omfatter alle forretningsenheter og flere beslutningsdomener — ikke bare CIOs posisjon.",
            "Styringsarketyper som Federal og IT Duopoly involverer mange interessenter utover CIO."
          ]
        }
      ]
    },
    {
      id: 14,
      type: "multi",
      title: "Fem beslutningsdomener i IT governance",
      points: 1,
      prompt: "Marker alle fem beslutningsdomener i IT governance ifølge Weill & Ross.",
      source: "Kilde: Forelesning 6, CIO Toolbox 4, lysbilde 'Categories of important IT decisions'.",
      options: [
        {
          text: "IT principles",
          correct: true,
          why: "Riktig: IT principles er ett av de fem beslutningsdomenene.",
          whyExtended: [
            "IT principles dekker ITs rolle i virksomheten, ønsket atferd og finansieringsmodell.",
            "Dette domenet setter overordnet retning for hvordan IT skal fungere i organisasjonen.",
            "Det oversetter forretningsstrategi til overordnede IT-retningslinjer som former alle andre beslutninger.",
            "Kursoppsummeringen beskriver IT principles som: 'how to translate from business; role of IT in business; desirable behaviors; funding.'"
          ]
        },
        {
          text: "IT architecture",
          correct: true,
          why: "Riktig: IT architecture er ett av de fem beslutningsdomenene.",
          whyExtended: [
            "IT architecture-beslutninger dekker standardisering av prosesser, dataintegrasjon og teknologivalg.",
            "Dette kobler direkte til verktøy 4 (IT Architecture) i CIO Toolbox, inkludert operating model, BPMN og TOGAF.",
            "Arkitekturbeslutninger avgjør hvor tett koblede eller løst koblede systemer er på tvers av organisasjonen.",
            "Kursoppsummeringen lister: 'core business process + relates; what data + how integration; tech capability standardization.'"
          ]
        },
        {
          text: "IT infrastructure strategies",
          correct: true,
          why: "Riktig: IT infrastructure strategies er ett av de fem beslutningsdomenene.",
          whyExtended: [
            "IT infrastructure-beslutninger dekker kritiske tjenester, servicekrav, prising og outsourcing.",
            "Infrastrukturbeslutninger har ofte nytte av sentralisering for å oppnå stordriftsfordeler.",
            "Kursoppsummeringen beskriver: 'critical services to achieve strategic goals; what should be implemented enterprise-wide; pricing; plan for keeping tech up-to-date; what services should be outsourced.'"
          ]
        },
        {
          text: "Business application needs",
          correct: true,
          why: "Riktig: business application needs er ett av de fem beslutningsdomenene.",
          whyExtended: [
            "Business application needs dekker markedsmuligheter, strategiske eksperimenter og beslutninger innenfor arkitekturstandarder.",
            "Dette domenet er ofte mer desentralisert fordi forretningsenheter best forstår egne applikasjonsbehov.",
            "Kursoppsummeringen beskriver: 'market and business process opportunities; strategic experiments design; how to address within architectural standards; accountability on outcomes.'"
          ]
        },
        {
          text: "IT investment and prioritization",
          correct: true,
          why: "Riktig: IT investment and prioritization er ett av de fem beslutningsdomenene.",
          whyExtended: [
            "IT investment-beslutninger dekker de viktigste prosessendringene, fordeling i IT-porteføljen og relativ betydning av virksomhetsovergripende vs. enhetsspesifikke investeringer.",
            "Dette domenet kobler direkte til business case-verktøyet (verktøy 1) — prioritering av digitale tjenester og finansiering.",
            "Investeringsbeslutninger er ofte de mest politisk sensitive fordi de avgjør ressursfordeling.",
            "Kursoppsummeringen beskriver: 'most important process changes; distribution in the current IT portfolio; relative importance of enterprise-wide vs business unit investment; business value of IT projects.'"
          ]
        },
        {
          text: "IT marketing and branding",
          correct: false,
          why: "Galt: markedsføring og branding er ikke ett av de fem IT governance-beslutningsdomenene.",
          whyExtended: [
            "De fem domenene ifølge Weill & Ross er: IT principles, IT architecture, IT infrastructure, business application needs og IT investment.",
            "Markedsføring er en forretningsfunksjon, ikke et IT governance-domene i Weill & Ross-rammeverket.",
            "IT governance fokuserer på det strukturelle spørsmålet om hvem som bestemmer over IT-ressurser, ikke hvordan IT markedsføres internt.",
            "Styringsmatrisen bruker disse fem spesifikke domenene koblet mot seks arketyper."
          ]
        }
      ]
    },
    {
      id: 15,
      type: "single",
      title: "Governance vs. management",
      points: 1,
      prompt: "Ifølge Weill og Ross, hva er hovedforskjellen mellom IT governance og IT management?",
      source: "Kilde: Forelesning 6 og forelesning 11, lysbilder om definisjonen av IT governance.",
      options: [
        {
          text: "Governance avgjør hvem som systematisk tar og bidrar til IT-beslutninger; management tar og implementerer dem faktisk",
          correct: true,
          why: "Riktig: dette er skillet fra Weill og Ross (2004).",
          whyExtended: [
            "Forelesning 11 siterer: 'IT governance is not about making IT decisions — management does that — but rather determines who systematically makes and contributes to those decisions.'",
            "Governance er det strukturelle rammeverket: hvem har beslutningsrettigheter og ansvar.",
            "Management er den operasjonelle aktiviteten: å faktisk analysere, beslutte og implementere.",
            "Styringsmatrisen spesifiserer strukturen; ledere opererer innenfor strukturen for å ta konkrete beslutninger."
          ]
        },
        {
          text: "Det er ingen forskjell; begrepene betyr det samme",
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
          text: "Governance gjelder bare IT-avdelingen; management gjelder resten av organisasjonen",
          correct: false,
          why: "Galt: governance involverer både forretnings- og IT-interessenter.",
          whyExtended: [
            "Styringsarketypene inkluderer Business Monarchy og Federal system — begge involverer forretningsledere sterkt.",
            "De fem beslutningsdomenene inkluderer 'business application needs' — et domene der forretningsinteressenter har sentral input.",
            "Governance er en organisatorisk kapabilitet, ikke bare en IT-funksjon.",
            "Hele poenget med styringsmatrisen er å avgjøre riktig balanse mellom IT- og forretningsinvolvering på tvers av beslutningsdomener."
          ]
        },
        {
          text: "Management kommer alltid før governance i tid",
          correct: false,
          why: "Galt: governance-strukturer bør etableres for å styre management-beslutninger.",
          whyExtended: [
            "Governance setter rammeverket som management opererer innenfor — strukturen bør finnes før beslutninger tas.",
            "Uten governance-strukturer kan management-beslutninger bli inkonsistente, dupliserte eller motstridende.",
            "Styringsmatrisen er ment å etableres proaktivt, ikke som en ettertanke.",
            "Management-aktiviteter skjer kontinuerlig innenfor governance-rammeverket — det er ikke et sekvensielt forhold."
          ]
        }
      ]
    },
    {
      id: 16,
      type: "single",
      title: "Cynefin og CIO Toolbox",
      points: 1,
      prompt: "Hvordan kobler Cynefin seg til de andre verktøyene i CIO Toolbox?",
      source: "Kilde: Forelesning 4 og CIO toolbox-modellen, metaverktøyet Cynefin.",
      options: [
        {
          text: "Cynefin kobler business case (analysere) ↔ design thinking (utforske) ↔ prosjekter (planlegge) ↔ produktteam (iterere)",
          correct: true,
          why: "Riktig: CIO toolbox-modellen viser denne koblingen eksplisitt.",
          whyExtended: [
            "CIO toolbox-modellen sier: 'Connects business case (analyze) ↔ design thinking (explore) ↔ projects (plan) ↔ product teams (iterate).'",
            "I en komplisert situasjon (analyserbar) passer business case og strukturert planlegging.",
            "I en kompleks situasjon (ukjente faktorer) trengs design thinking og agile/produktteam med eksperimentering.",
            "Cynefin fungerer som et metaverktøy som hjelper til med å avgjøre hvilket av de andre verktøyene som passer best i konteksten."
          ],
          whyExtendedImageRefs: [
            {
              imageId: "cynefin_theory_of_everything"
            }
          ]
        },
        {
          text: "Cynefin erstatter alle andre verktøy i CIO Toolbox",
          correct: false,
          why: "Galt: Cynefin er et metaverktøy som hjelper med å velge blant de andre verktøyene, ikke en erstatning.",
          whyExtended: [
            "Cynefin er merket som 'META-TOOL' i CIO toolbox-modellen, som betyr at det opererer på et nivå over de andre verktøyene.",
            "Formålet er 'Choose management approach based on context' — det veileder valg av verktøy, ikke gjennomfører arbeidet.",
            "Du trenger fortsatt de faktiske verktøyene (business case, design thinking, PRINCE2 osv.) for å gjøre arbeidet.",
            "Cynefin gir kontekstbevissthet; de andre verktøyene gir metoder og rammeverk."
          ]
        },
        {
          text: "Cynefin er bare relevant for IT-infrastrukturbeslutninger",
          correct: false,
          why: "Galt: Cynefin gjelder enhver ledelsessituasjon på tvers av CIO Toolbox-kontekster.",
          whyExtended: [
            "Cynefin er et generelt rammeverk for å velge ledelsestilnærming basert på situasjonskompleksitet.",
            "Det ble introdusert i prosjektforelesningen, men 'connects across the toolbox' ifølge CIO toolbox-modellen.",
            "Cynefin gjelder like mye strategiske beslutninger, utviklingstilnærminger, styringsstrukturer og operasjonelle utfordringer.",
            "De fire domenene (Clear, Complicated, Complex, Chaotic) beskriver generelle situasjonstrekk, ikke spesifikke IT-domener."
          ]
        },
        {
          text: "Cynefin er identisk med TOGAF Architecture Development Method",
          correct: false,
          why: "Galt: Cynefin er et sense-making-rammeverk; TOGAF ADM er en arkitekturutviklingsmetode.",
          whyExtended: [
            "Cynefin (Snowden and Boone, 2007) kategoriserer situasjoner etter kompleksitet for å styre ledelsestilnærming.",
            "TOGAF ADM er en strukturert metode for å utvikle virksomhetsarkitektur gjennom definerte faser.",
            "De har helt ulike formål: Cynefin hjelper med å avgjøre hvordan en situasjon bør angripes; TOGAF ADM beskriver hvordan arkitekturarbeid gjøres.",
            "Cynefin er et metaverktøy; TOGAF er et operasjonelt rammeverk innen IT Architecture-verktøyet."
          ]
        }
      ],
      moduleId: "cio-tool-box",
      groupId: "cynefin"
    },
    {
      id: 17,
      type: "single",
      title: "Cynefin-domener",
      points: 1,
      prompt: "I hvilket Cynefin-domene er årsak-virkning fortsatt mulig å analysere på forhånd, noe som gjør det til 'ekspertenes domene'?",
      source: "Kilde: Forelesning 4, CIO Toolbox 2, lysbilde om Cynefin.",
      options: [
        {
          text: "Clear",
          correct: false,
          why: "Galt: clear-domenet gjelder kjente problemer med etablerte prosedyrer — ingen ekspertanalyse trengs.",
          whyExtended: [
            "Forelesning 4 definerer clear som situasjoner der problemer typisk er velkjente og kan løses gjennom tidligere avtalte og ofte skriftlige prosedyrer.",
            "Clear-situasjoner bruker Sense → Categorize → Respond — gjenkjenn mønsteret og bruk standardresponsen.",
            "Clear er domenet for best practice, ikke ekspertanalyse — svarene er allerede kjent.",
            "Clear-situasjoner har minst kompleksitet: få faste begrensninger og få kompleksitetsfaktorer."
          ]
        },
        {
          text: "Complicated",
          correct: true,
          why: "Riktig: complicated-domenet kalles eksplisitt 'ekspertenes domene', der analyse er mulig.",
          whyExtended: [
            "Forelesning 4 definerer complicated slik: 'a lot of non-trivial decisions have to be made — however, the cause-and-effect relationships are still possible to analyze in advance. This is said to be the domain of experts.'",
            "Complicated-situasjoner bruker Sense → Analyze → Respond — bruk ekspertise til å analysere situasjonen og finne riktig tilnærming.",
            "Nøkkelforskjellen fra complex er at svaret i complicated-situasjoner kan finnes gjennom analyse — det krever bare ekspertise.",
            "Eksempler er ingeniørutfordringer, detaljert planlegging og strukturert beslutningstaking der problemet er forstått, men løsningen krever kompetanse."
          ],
          whyExtendedImageRefs: [
            {
              imageId: "cynefin_theory_of_everything"
            }
          ]
        },
        {
          text: "Complex",
          correct: false,
          why: "Galt: i complex-domenet er viktige faktorer ukjente og eksperimentering er nødvendig.",
          whyExtended: [
            "Forelesning 4 definerer complex slik: 'several important factors influencing the outcome are unknown, and experimentation is typically necessary.'",
            "Complex-situasjoner bruker Probe → Sense → Respond — du må prøve ut ting og lære av resultatene.",
            "I complex-situasjoner kan årsak-virkning først forstås i ettertid, ikke predikeres på forhånd.",
            "Dette er domenet der design thinking og agile metoder passer best."
          ]
        },
        {
          text: "Chaotic",
          correct: false,
          why: "Galt: chaotic-domenet krever umiddelbar handling uten forutgående analyse.",
          whyExtended: [
            "Forelesning 4 definerer chaotic slik: 'there is typically an emergency which requires immediate action to move into a more stable state.'",
            "Chaotic-situasjoner bruker Act → Sense → Respond — stabiliser først, analyser senere.",
            "Det er ikke tid til ekspertanalyse i kaos — prioriteten er å få situasjonen under kontroll.",
            "Chaotic er det mest ekstreme domenet, med flest kompleksitetsfaktorer og faste begrensninger."
          ]
        }
      ],
      moduleId: "cio-tool-box",
      groupId: "cynefin"
    },
    {
      id: 18,
      type: "fill",
      title: "Definisjon av IT governance",
      points: 1,
      prompt: "IT governance handler ikke om å ta IT-beslutninger — ________ gjør det — men avgjør heller hvem som systematisk tar og bidrar til disse beslutningene.",
      answers: [
        "management",
        "ledelse",
        "administrasjon"
      ],
      answerKey: "management / ledelse",
      source: "Kilde: Forelesning 11, Accountability Framework, lysbilde 'IT governance', sitat fra Weill og Ross (2004).",
      whyCorrect: "Riktig fordi Weill og Ross-definisjonen eksplisitt sier at management (ikke governance) tar beslutningene, mens governance avgjør hvem som har rett og ansvar til å ta dem.",
      whyWrong: "Galt hvis svaret er governance, styret eller CIO. Nøkkelskillet er at governance setter strukturen, mens management opererer innenfor den."
    },
    {
      id: 19,
      type: "single",
      title: "Federal-arketypen",
      points: 1,
      prompt: "Hvilken IT governance-arketype innebærer at C-level-ledere og forretningsrepresentanter fra alle operative grupper samarbeider med IT-avdelingen?",
      source: "Kilde: Forelesning 6, CIO Toolbox 4, lysbilde 'Summary: Six archetypal approaches to IT decision making'.",
      options: [
        {
          text: "Business Monarchy",
          correct: false,
          why: "Galt: Business Monarchy er at toppledere i virksomheten (eventuelt med CIO) tar beslutninger — ikke at alle operative grupper samarbeider.",
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
            "Federal er bredere og mer inkluderende enn Duopoly — det ligner en stat der sentralt og lokalt nivå samarbeider.",
            "Duopoly er en bilateral relasjon; Federal er et multilateralt samarbeid."
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
            "Feudal er desentralisert uten samarbeid — hver enhet handler uavhengig, ikke sammen.",
            "Forskjellen fra Federal er at Feudal mangler det samarbeidende elementet — enheter tar isolerte beslutninger.",
            "Feudal kan føre til fragmentering og duplisering fordi det ikke finnes en koordineringsmekanisme på tvers av enheter."
          ]
        }
      ]
    },
    {
      id: 20,
      type: "single",
      title: "Management framework vs. fashion",
      points: 1,
      prompt: "Hva er en 'management fashion' ifølge kurset?",
      source: "Kilde: Forelesning 4, CIO Toolbox 2, og kursoppsummering.",
      options: [
        {
          text: "Et management framework som har nådd kritisk masse og blitt et intersubjektivt fenomen",
          correct: true,
          why: "Riktig: dette er definisjonen av management fashion brukt i kurset.",
          whyExtended: [
            "Kursoppsummeringen definerer: 'Management fashion: management framework that has reached a critical mass and has become an intersubjective phenomenon.'",
            "En management fashion betyr at et rammeverk er blitt bredt adoptert og diskutert — det har blitt en trend i ledelsespraksis.",
            "Dette betyr ikke nødvendigvis at rammeverket er bra eller dårlig — det betyr at det er populært nok til å bli et felles referansepunkt.",
            "Skillet fra management framework handler om adopsjonsskala: et framework er en strukturert tilnærming; en fashion er et bredt adoptert framework."
          ]
        },
        {
          text: "Et rammeverk som er bevist å fungere perfekt i alle kontekster",
          correct: false,
          why: "Galt: kurset sier eksplisitt at rammeverk er kontekstavhengige og noen ganger omdiskuterte.",
          whyExtended: [
            "Forelesning 6 sier: 'For these (and similar) frameworks and methods, their usefulness and value is highly context-sensitive — and sometimes disputed.'",
            "Ingen rammeverk fungerer perfekt i alle kontekster — dette er et kjernebudskap i CIO Toolbox.",
            "Management fashions kan være hypet: at noe er populært betyr ikke at det passer overalt.",
            "CIO Toolbox oppfordrer til å 'Read the room' først — kontekst avgjør alltid om et rammeverk passer."
          ]
        },
        {
          text: "Et synonym for management framework — begrepene betyr det samme",
          correct: false,
          why: "Galt: kurset skiller mellom framework (struktur) og fashion (popularitet).",
          whyExtended: [
            "Et management framework er: 'a combination of interlinked items that supports a particular approach to a specific objective' — det er strukturelt.",
            "En management fashion legger til dimensjonen bred adopsjon — et framework blir fashion når det når kritisk masse.",
            "Ikke alle framework blir fashions — noen forblir nisjeverktøy eller spesialiserte verktøy.",
            "Skillet er viktig fordi popularitet (fashion) kan skape press om å adoptere et rammeverk uavhengig av kontekst."
          ]
        },
        {
          text: "Et begrep for utdaterte rammeverk som ikke lenger brukes",
          correct: false,
          why: "Galt: management fashion viser til nåværende popularitet, ikke foreldelse.",
          whyExtended: [
            "Fashion-metaforen viser til bred nåværende adopsjon, som trender i klær — det handler om hva som er populært nå.",
            "En management fashion kan bli utdatert, men begrepet i seg selv beskriver toppunktet for adopsjon, ikke nedgangen.",
            "Rammeverk som Scrum og SAFe kan forstås som aktuelle management fashions — de er bredt adoptert og diskutert.",
            "Kurset bruker begrepet for å vise at popularitet ikke betyr universell anvendbarhet."
          ]
        }
      ]
    },
    {
      id: 21,
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
            "Outcome = forretningsresultatet eller kundeverdien som oppnås; output = funksjoner, kode eller dokumenter som produseres.",
            "Forelesning 4 sier: 'Focus on outcome not output' — det som betyr noe er effekten, ikke aktiviteten.",
            "Prinsippet kobler til produktteam-poenget: 'Give team members autonomy to innovate and explore.'"
          ]
        },
        {
          text: "Alt scope, all tid og alle kostnader er låst fra starten",
          correct: false,
          why: "Galt: å låse alle tre elementene i triple constraint er et prosjektkjennetegn og gjør prosjekter sårbare.",
          whyExtended: [
            "CIO toolbox-modellen sier: 'Scope, time, cost — all three fixed → vulnerable' under prosjekter, ikke produktteam.",
            "Produktteam omfavner endring: 'Pivots and learning expected' er listet som et produktteamkjennetegn.",
            "Agile metoder prioriterer å respondere på endring fremfor å følge en plan — å låse alt fra starten motsier dette.",
            "Produktteam justerer scope kontinuerlig basert på brukerfeedback og forretningsprioriteringer."
          ]
        },
        {
          text: "Pivots og læring forventes",
          correct: true,
          why: "Riktig: produktteam er designet for å lære og endre retning ved behov.",
          whyExtended: [
            "CIO toolbox-modellen lister 'Pivots and learning expected' som et produktteamkjennetegn.",
            "Forelesning 4-oppsummeringen sier: 'Expect pivotal change' — retningsendringer er normale, ikke feil.",
            "Dette kobler til det komplekse domenet i Cynefin, der eksperimentering er nødvendig fordi viktige faktorer er ukjente.",
            "Silicon Valley-ledelseslærdommene inkluderer: 'Embrace pivots' og 'Nurture a culture of innovation.'"
          ]
        },
        {
          text: "Teamet oppløses etter hver sprint",
          correct: false,
          why: "Galt: produktteam har varig eierskap — de oppløses ikke.",
          whyExtended: [
            "Produktteam består over tid med kontinuerlig eierskap til produktet eller tjenesten.",
            "Å oppløse teamet etter hver sprint ville gjøre teamet til et veldig kort prosjekt og fjerne akkumulert kunnskap.",
            "Sprinter er iterasjoner innenfor teamets løpende arbeid, ikke sluttpunkter som avslutter teamet.",
            "Hele poenget med produktteam fremfor prosjekter er kontinuitet — 'Ensure continuity by creating lasting product teams instead of projects.'"
          ]
        }
      ]
    },
    {
      id: 22,
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
            "Modularitet muliggjør autonomien produktteam trenger; standardisering muliggjør alignment som governance krever.",
            "Open Agile Architecture kommer fra The Open Group — samme organisasjon som står bak TOGAF — og viser en utvikling i tenkningen deres."
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
            "Arkitekturprinsipper styrer designbeslutninger; effektivitetsmål styrer operasjonell ledelse."
          ]
        },
        {
          text: "Hierarki, kommando-og-kontroll og fast scope",
          correct: false,
          why: "Galt: dette beskriver en tradisjonell, rigid ledelsesstil — det motsatte av agil arkitektur.",
          whyExtended: [
            "Open Agile Architecture verdsetter eksplisitt 'responsiveness to change' — det motsatte av fast scope.",
            "Modularitet 'facilitates team autonomy' — det motsatte av kommando-og-kontroll.",
            "Agil arkitektur søker å være adaptiv, ikke hierarkisk og rigid.",
            "'Agile' i Open Agile Architecture signaliserer samsvar med agile verdier om fleksibilitet og responsivitet."
          ]
        },
        {
          text: "Markedsføring, salg og kundeanskaffelse",
          correct: false,
          why: "Galt: dette er forretningsfunksjoner, ikke arkitekturprinsipper.",
          whyExtended: [
            "Arkitekturprinsipper veileder hvordan tekniske og organisatoriske kapabiliteter struktureres, ikke hvordan markedsføring gjøres.",
            "Forretningsfunksjoner kan representeres i Business Architecture, men er ikke arkitekturprinsipper i seg selv.",
            "Open Agile Architecture handler om hvordan man designer for tilpasningsevne, ikke om spesifikke forretningsaktiviteter.",
            "De tre prinsippene (modularitet, standardisering, responsivitet) er strukturelle valg, ikke funksjonelle strategier."
          ]
        }
      ]
    },
    {
      id: 23,
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
            "Et prosjekt med 3 faste faktorer og 0 ekstra kompleksitet er Complex; med 3 faste faktorer og 1+ ekstra kompleksitet blir det Chaotic.",
            "Et prosjekt med 1 fast faktor og 2 ekstra kompleksitetsfaktorer er Clear; med 1 fast faktor og 3+ blir det Complex.",
            "Nøkkelinnsikten er at låsing av alle begrensninger fjerner fleksibilitet, mens kompleksitetsfaktorer tilfører ukjente — sammen eskalerer de ledelsesutfordringen."
          ],
          whyExtendedImageRefs: [
            {
              imageId: "cynefin_theory_of_everything"
            },
            {
              imageId: "triple_constraint_1",
              moduleId: "cio-tool-box",
              groupId: "triple-constraint"
            }
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
            "CIO toolbox-modellen sier: 'Scope, time, cost — all three fixed → vulnerable.'",
            "Clear-situasjoner har lav kompleksitet og få faste begrensninger — de er velkjente problemer med kjente løsninger.",
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
      id: 24,
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
      whyWrong: "Galt hvis svaret viser til verktøy, metoder eller arketyper. Matrisen kombinerer domener (hva som besluttes) med arketyper (hvem som bestemmer), ikke med andre strukturelle elementer."
    },
    {
      id: 25,
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
            "Endringsledelse handler om hvordan mennesker adopterer og tilpasser seg organisatoriske endringer — en kritisk suksessfaktor for IT-initiativer.",
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
            "Business case inkluderer NPV, kvalitative vurderinger og kommunikativ effekt — det er fullt innenfor verktøykassen.",
            "Kategorien 'utenfor verktøykassen' inneholder støttedisipliner som supplerer de sju kjerneverktøyene."
          ]
        },
        {
          text: "Design thinking",
          correct: false,
          why: "Galt: design thinking er verktøy 3 inne i CIO Toolbox.",
          whyExtended: [
            "Design thinking er det tredje nummererte verktøyet, med formål 'Prioritization and product choice — when the problem is unclear.'",
            "Det inkluderer Double Diamond-prosessen, problemreframing, brukerinnsikt og prototyping — alt inne i verktøykassen.",
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
            "IT governance inkluderer de fem beslutningsdomenene, seks arketypene og styringsmatrisen — alt inne i verktøykassen.",
            "IT governance er kategorisert under 'STYRING' i CIO toolbox-modellen."
          ]
        }
      ]
    }
  ]
};

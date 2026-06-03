// src/data/exams/mockExam4a_no.js
export const mockExam4a_no = {
  id: "mock-exam-4a-no",
  subjectId: "in5431",
  baseId: "mock-exam-4a",
  lang: "no",
  title: "Øveeksamen 4A: CIO Toolbox – verktøy og beslutninger",
  description: "Business case, design thinking, TOGAF, prosjekt vs. produkt, IT-styring, Cynefin, D4D og bærekraft – blandet teori og anvendelse.",
  modeLabel: "CIO TOOLBOX A",
  estimatedMinutes: "45–60",
  sortOrder: 40,
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
          text: "Verktøy er ikke mål i seg selv – de er bare meningsfulle hvis de tjener formålet sitt",
          correct: true,
          why: "Riktig: CIO toolbox-modellen sier eksplisitt at dette er det styrende prinsippet.",
          whyExtended: [
            "CIO toolbox-modellen åpner med: 'Tools are not goals in themselves – they are only meaningful if they serve their purpose.'",
            "Verktøykassemetaforen understreker at man må velge riktig verktøy ut fra beslutningen – slik en håndverker velger riktig verktøy for jobben.",
            "Forelesning 6 forsterker dette: for slike rammeverk og metoder er nytte og verdi svært kontekstavhengig – og noen ganger omdiskutert.",
            "Tretrinnstilnærmingen er: (1) Les rommet, (2) Velg riktig verktøy, (3) Du kan ikke lede kun med teori."
          ]
        },
        {
          text: "Alle organisasjoner må alltid bruke alle de sju verktøyene samtidig",
          correct: false,
          why: "Galt: verktøykassen brukes selektivt, avhengig av situasjonen og beslutningen.",
          whyExtended: [
            "CIO toolbox-modellen sier: 'We use the term «CIO toolbox» informally and also subjectively. Although many CIOs use many of these tools, few will use them all.'",
            "Verktøykassemetaforen betyr at man velger det passende verktøyet – å bruke alle verktøy samtidig ville vært upraktisk og unødvendig.",
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
            "Forelesning 3 påpeker: 'No standard way of making choices' – det finnes alltid et menneskelig element i beslutninger.",
            "Modellen fremhever 'Read the room' som første trinn, som krever vurdering av formål, strategi, ressurser, modenhet og kontekst."
          ]
        },
        {
          text: "Verktøykassen gjelder bare IT-avdelinger, ikke forretningsledere",
          correct: false,
          why: "Galt: CIO Toolbox handler om skjæringspunktet mellom forretningsledelse og IT-ledelse.",
          whyExtended: [
            "IT-styring involverer eksplisitt forretningsledere gjennom arketyper som Business Monarchy og Federal system.",
            "Business case-verktøyet handler om prioritering av digitale tjenester og finansiering – en forretningsbeslutning, ikke bare en IT-beslutning.",
            "Operating model-konseptet kobler prosessintegrasjon og standardisering til IT-arkitektur – altså en bro mellom virksomhet og IT.",
            "Kurset handler om IT-ledelsesutfordringer og strategier på organisasjonsnivå, ikke bare internt i IT-avdelinger."
          ]
        }
      ],
      whyExtendedImageRefs: [
        "generic_decision_making_process_no"
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
            "For ikke-trivielle initiativer er det umulig å sette disse verdiene helt korrekt – de er alltid estimater."
          ]
        },
        {
          text: "NPV har en sterk kommunikativ effekt utover den numeriske presisjonen.",
          correct: true,
          why: "Riktig: forelesningen fremhever eksplisitt den kommunikative rollen til business cases.",
          whyExtended: [
            "Forelesning 3 sier: 'NPV has a strong communicative effect. In a decision process, NPV is often presented together with a set of non-quantifiable benefits.'",
            "CIO toolbox-modellen lister 'Communicative effect – Business case as communication and transparency tool, not just calculation' som et viktig aspekt.",
            "Selv når NPV-estimater er upresise, skaper den strukturerte formen åpenhet om antakelser og gjør uenigheter synlige.",
            "Dette betyr at en business case har to formål: analytisk (sammenligne alternativer) og kommunikativt (bygge felles forståelse)."
          ]
        },
        {
          text: "En business case kan alltid gi en helt presis prediksjon av utfallet.",
          correct: false,
          why: "Galt: forelesningen understreker at estimater alltid er usikre, spesielt for ikke-trivielle initiativer.",
          whyExtended: [
            "Forelesning 3 sier eksplisitt: 'For any non-trivial development initiative, setting these values correctly is impossible – they are estimates.'",
            "Nytte kan være 'hard or impossible to estimate numerically – in particular if they are related to safety or security.'",
            "Forelesning 3 påpeker også at det ikke finnes 'completely rational actors' – beslutninger påvirkes av individers følelser og organisasjonens kulturelle kontekst.",
            "Risikopremien i NPV-beregninger er selv et estimat – business case er en strukturert tilnærming, ikke en presis spådom."
          ]
        },
        {
          text: "Kvalitative gevinster som etterlevelse, sikkerhet og trygghet bør også vurderes sammen med NPV.",
          correct: true,
          why: "Riktig: CIO toolbox-modellen inkluderer eksplisitt ikke-kvantifiserbare gevinster.",
          whyExtended: [
            "CIO toolbox-modellen lister 'Qualitative considerations – Non-quantifiable benefits: compliance, security, safety' som del av business case-verktøyet.",
            "Forelesning 3 sier at NPV ofte presenteres sammen med et sett ikke-kvantifiserbare gevinster for hvert alternativ.",
            "Noen av de viktigste gevinstene (regulatorisk etterlevelse, sikkerhetsforbedringer, trygghet) kan ikke uttrykkes som kontantstrømmer.",
            "En fullstendig business case kombinerer derfor kvantitativ NPV med kvalitativ vurdering – tall alene er ikke nok."
          ]
        }
      ],
      whyExtendedImageRefs: [
        "NPV_formula",
        "PV_formula"
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
      whyWrong: "Galt hvis svaret bare viser til rente uten risikodimensjonen, eller til begreper som konverteringsrate, som er en spesifikk forretningsmetrik og ikke den generelle finansielle justeringsmekanismen.",
      whyExtendedImageRefs: [
        "NPV_formula",
        "PV_formula"
      ]
    },
    {
      id: 4,
      type: "drag-categorize",
      title: "Business case factors",
      points: 2,
      prompt: "Dra hvert kort til riktig business case-kategori.",
      source: "Kilde: CIO Toolbox 1, business case, utility maximisation og gevinster som ikke kan tallfestes.",
      moduleId: "cio-tool-box",
      groupId: "business-case",
      items: [
        { id: "expected-benefit", label: "Forventet nytte" },
        { id: "expected-cost", label: "Forventet kostnad" },
        { id: "timing", label: "Timing: når nytte og kostnader oppstår" },
        { id: "risk", label: "Risiko for at nytte eller kostnader avviker fra estimatene" },
        { id: "compliance", label: "Etterlevelse av juridiske eller regulatoriske krav" },
        { id: "security-safety", label: "Forbedringer i sikkerhet eller trygghet" }
      ],
      categories: [
        { id: "business-case-factor", label: "Business case-faktor" },
        { id: "non-quantifiable-benefit", label: "Gevinst som ikke kan tallfestes" }
      ],
      correctAnswer: {
        "business-case-factor": ["expected-benefit", "expected-cost", "timing", "risk"],
        "non-quantifiable-benefit": ["compliance", "security-safety"]
      },
      itemFeedback: {
        "expected-benefit": { whyCorrect: "Forventet nytte er en kjernefaktor i utility maximisation.", whyWrong: "Forventet nytte hører til Business case-faktor fordi det er en av de fire hovedfaktorene: nytte, kostnad, timing og risiko.", whyExtended: ["Nytte kan være økonomisk eller ikke-økonomisk.", "Det vanskelige er å estimere dem realistisk."] },
        "expected-cost": { whyCorrect: "Forventet kostnad er en kjernefaktor i utility maximisation.", whyWrong: "Forventet kostnad hører til Business case-faktor fordi kostnad er del av sammenligningen av alternativer.", whyExtended: ["Kostnad inkluderer investering og ofte drifts- og vedlikeholdskostnader."] },
        timing: { whyCorrect: "Timing er en kjernefaktor fordi fremtidig nytte diskonteres.", whyWrong: "Timing hører til Business case-faktor fordi tidspunktet for nytte og kostnader påvirker verdi.", whyExtended: ["Derfor er present value og NPV viktige i finansielle business cases."] },
        risk: { whyCorrect: "Risiko er en kjernefaktor fordi estimater kan være feil.", whyWrong: "Risiko hører til Business case-faktor fordi beslutningstakere må vurdere usikkerhet i nytte og kostnader.", whyExtended: ["Risiko kan reflekteres i en risikopremie eller høyere diskonteringsrate."] },
        compliance: { whyCorrect: "Etterlevelse er en gevinst som ofte ikke kan tallfestes og vurderes sammen med NPV.", whyWrong: "Etterlevelse hører til gevinster som ikke kan tallfestes fordi det kan være avgjørende selv om det er vanskelig å prissette direkte.", whyExtended: ["Noen initiativer er nødvendige for å møte juridiske eller regulatoriske krav."] },
        "security-safety": { whyCorrect: "Forbedringer i sikkerhet og trygghet er gevinster som ofte ikke kan tallfestes.", whyWrong: "Sikkerhet eller trygghet hører til gevinster som ikke kan tallfestes fordi verdien kan være vanskelig å uttrykke som kontantstrøm.", whyExtended: ["Unngåtte hendelser, resiliens og trygghet kan være strategisk viktig."] }
      },
      whyExtendedImageRefs: [
        "NPV_formula",
        "PV_formula"
      ]
    },
    {
      id: 5,
      type: "single",
      title: "Prosess for alternativanalyse",
      points: 1,
      moduleId: "cio-tool-box",
      groupId: "decision-making",
      prompt: "Hva er riktig rekkefølge på trinnene i den generiske beslutningsprosessen (alternativanalyse)?",
      source: "Kilde: Forelesning 3, CIO Toolbox 1, lysbilde om generic decision making process.",
      options: [
        {
          text: "1. Forstå situasjonen, 2. Syntetiser alternativer, 3. Evaluer og foreslå",
          correct: true,
          why: "Riktig: dette er de tre trinnene i den generiske beslutningsprosessen.",
          whyExtended: [
            "CIO toolbox-modellen beskriver de tre trinnene: (1) Understand the situation (root-cause analysis), (2) Synthesize options (concepts), (3) Evaluate and propose.",
            "Trinn 1 fokuserer på å forstå 'hvorfor' – intern kompetanse, tekniske ressurser og kulturelle faktorer.",
            "Trinn 2 handler om å presentere alternative handlinger som 'concepts' – et internt konsistent sett med arbeid. Målet er å sikre at alle relevante alternativer vurderes.",
            "Trinn 3 bruker evalueringsmetoder som business case (verktøy 1), plus/minus-metoden, kostnadsrangering og real options."
          ],
          whyExtendedImageRefs: [
            "generic_decision_making_process_no"
          ]
        },
        {
          text: "1. Evaluer og foreslå, 2. Forstå situasjonen, 3. Syntetiser alternativer",
          correct: false,
          why: "Galt: du kan ikke evaluere før du har forstått situasjonen og generert alternativer.",
          whyExtended: [
            "Evaluering krever alternativer å sammenligne – først må du forstå problemet og utvikle alternativer.",
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
            "Å forstå situasjonen etter evaluering ville gjort evalueringen meningsløs – du ville ikke vite hvilke kriterier som betyr noe."
          ]
        },
        {
          text: "1. Implementer det billigste alternativet, 2. Analyser resultatene, 3. Prøv neste alternativ",
          correct: false,
          why: "Galt: dette beskriver prøving og feiling, ikke strukturert alternativanalyse.",
          whyExtended: [
            "Alternativanalyse er en strukturert, analytisk tilnærming – ikke tilfeldig eksperimentering.",
            "Å velge det billigste alternativet ignorerer business case-logikken om å veie nytte, kostnad, tidspunkt og risiko samlet.",
            "Den generiske prosessen krever evaluering av alle relevante alternativer før anbefaling gis.",
            "Prøving og feiling kan passe i Cynefins komplekse domene (probe-sense-respond), men alternativanalyse er laget for det kompliserte domenet."
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
            "Forelesningen sier også at ideen om ett enkelt rotproblem kan være misvisende. Problemer er ofte multikausale og kan angripes på mange måter.",
            "Discover-fasen handler om å forstå, ikke anta, hva problemet er – den innebærer å snakke med og bruke tid med menneskene som påvirkes av problemene.",
            "Dette står i kontrast til den analytiske tilnærmingen i business case/alternativanalyse, der problemet antas å være forstått."
          ]
        },
        {
          text: "Discover-fasen handler om å implementere den endelige løsningen i full skala",
          correct: false,
          why: "Galt: Discover handler om å forstå problemet, ikke om å implementere løsninger.",
          whyExtended: [
            "Discover-fasen er den første diamanten i Double Diamond – den fokuserer på divergent utforskning av problemrommet.",
            "Implementering skjer i Deliver-fasen, som er den siste fasen i Double Diamond.",
            "Fullskala implementering unngås eksplisitt i design thinking. Deliver-fasen innebærer å teste ulike løsninger i liten skala.",
            "Å hoppe til implementering i Discover-fasen ville hoppe over forståelse, definering og utvikling – tre kritiske faser."
          ]
        },
        {
          text: "Discover-fasen beregner NPV for hver potensiell løsning",
          correct: false,
          why: "Galt: NPV er del av business case-verktøyet, ikke Discover-fasen i design thinking.",
          whyExtended: [
            "Discover-fasen er kvalitativ og utforskende – den bruker teknikker som brukerinnsikt, observasjon og empati.",
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
            "IT governance avgjør 'who systematically makes and contributes to decisions' – design thinking avgjør 'hvilket problem bør vi løse'.",
            "Dette er helt ulike aktiviteter med ulike formål i CIO Toolbox."
          ]
        }
      ],
      whyExtendedImageRefs: [
        "double_diamond_model"
      ]
    },
    {
      id: 7,
      type: "dragDrop",
      title: "Design thinking og Double Diamond",
      points: 2,
      prompt: "Dra hver aktivitet til riktig Double Diamond-fase.",
      source: "Kilde: CIO Toolbox 2, Design thinking og Double Diamond-modellen.",
      moduleId: "cio-tool-box",
      groupId: "design-thinking",
      cards: [
        { id: "user-research", text: "Brukerinnsikt og forståelse av situasjonen" },
        { id: "problem-reframing", text: "Reframing av problem og definering av utfordring" },
        { id: "generate-solution-ideas", text: "Generere alternative løsningsideer og bruke co-design" },
        { id: "prototype-test", text: "Prototype, test, forkast eller forbedre løsninger" }
      ],
      targets: [
        { id: "discover", description: "Discover", correctCardId: "user-research", correctLabel: "Brukerinnsikt og forståelse av situasjonen", whyCorrect: "Discover handler om å forstå brukere og situasjonen.", whyWrong: "Brukerinnsikt hører til Discover fordi fasen åpner problemrommet.", whyExtended: ["Målet er å lære fra de som påvirkes før problemet defineres for smalt.", "Dette er den første divergente fasen i Double Diamond."] },
        { id: "define", description: "Define", correctCardId: "problem-reframing", correctLabel: "Reframing av problem og definering av utfordring", whyCorrect: "Define handler om reframing og presisering av utfordringen.", whyWrong: "Reframing av problem hører til Define fordi fasen konvergerer mot en tydeligere problemformulering.", whyExtended: ["Poenget er ikke nødvendigvis å finne det ene sanne problemet, men et bedre problem å løse."] },
        { id: "develop", description: "Develop", correctCardId: "generate-solution-ideas", correctLabel: "Generere alternative løsningsideer og bruke co-design", whyCorrect: "Develop handler om å generere løsningsideer og co-designe alternativer.", whyWrong: "Å generere løsningsideer hører til Develop fordi fasen åpner løsningsrommet.", whyExtended: ["Team utforsker mulige svar på det definerte problemet."] },
        { id: "deliver", description: "Deliver", correctCardId: "prototype-test", correctLabel: "Prototype, test, forkast eller forbedre løsninger", whyCorrect: "Deliver handler om prototyping, testing og forbedring eller forkasting av løsninger.", whyWrong: "Prototype og testing hører til Deliver fordi fasen snevrer inn løsninger gjennom småskala testing.", whyExtended: ["Deliver betyr ikke blind launch. Det betyr å teste hvilken løsning som virker."] }
      ],
      whyExtendedImageRefs: [
        "double_diamond_model"
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
            "Høy integrasjon betyr at prosesser er koblet og deler data på tvers av enheter. Lav standardisering betyr at prosessene varierer mellom enheter.",
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
      ],
      whyExtendedImageRefs: [
        "operating_model_matrix_no"
      ]
    },
    {
      id: 9,
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
            "Dette er sentralt for å forstå IT-porteføljen – som er det typiske formålet med IT Architecture-verktøyet i CIO Toolbox.",
            "I D4D-termer hjelper Application Architecture med å identifisere hvilke komponenter som bør høre til Operational Backbone versus Digital Platform."
          ]
        },
        {
          text: "Technology Architecture",
          correct: true,
          why: "Riktig: Technology Architecture beskriver logiske programvare- og maskinvareevner som støtter business-, data- og applikasjonstjenester.",
          whyExtended: [
            "Forelesning 5 definerer Technology Architecture som: 'describes the logical software and hardware capabilities that are required to support the deployment of business, data, and application services. This includes IT infrastructure, middleware, networks, communications, processing, standards, etc.'",
            "Technology Architecture er det mest tekniske laget og handler om infrastruktur og plattformer.",
            "Det kobler til IT governance-beslutningsdomenet 'IT infrastructure strategies' fra forelesning 6.",
            "Technology Architecture understøtter alle de andre arkitekturlagene – uten passende infrastruktur kan applikasjoner og data ikke fungere."
          ]
        }
      ],
      whyExtendedImageRefs: [
        "togaf_arkitekturtaksonomi"
      ]
    },
    {
      id: 10,
      type: "dragDrop",
      title: "TOGAFs arkitekturtaksonomi",
      points: 3,
      prompt: "Dra hver TOGAF-arkitekturtype til beskrivelsen som passer best.",
      source: "Kilde: Forelesning 5, CIO Toolbox 3, lysbildet 'Architecture taxonomy (according to TOGAF)'.",
      moduleId: "cio-tool-box",
      groupId: "enterprise-architecture",
      cards: [
        { id: "togaf-business-architecture", text: "Business Architecture" },
        { id: "togaf-data-architecture", text: "Data Architecture" },
        { id: "togaf-application-architecture", text: "Application Architecture" },
        { id: "togaf-technology-architecture", text: "Technology Architecture" }
      ],
      targets: [
        { id: "business-architecture", description: "Definerer forretningsstrategi, governance, organisasjon og sentrale forretningsprosesser", correctCardId: "togaf-business-architecture", correctLabel: "Business Architecture", whyCorrect: "Business Architecture beskriver forretningssiden av virksomheten: strategi, governance, organisasjon og sentrale forretningsprosesser.", whyWrong: "Denne beskrivelsen hører til Business Architecture fordi den gjelder strategi, governance, struktur og forretningsprosesser, ikke data, applikasjoner eller infrastruktur.", whyExtended: ["I TOGAFs taksonomi er Business Architecture laget nærmest strategi og organisasjonsdesign."] },
        { id: "data-architecture", description: "Beskriver logiske og fysiske dataressurser og dataforvaltning", correctCardId: "togaf-data-architecture", correctLabel: "Data Architecture", whyCorrect: "Data Architecture beskriver strukturen i dataressurser og dataforvaltning.", whyWrong: "Denne beskrivelsen hører til Data Architecture fordi den handler om dataressurser og dataforvaltning.", whyExtended: ["Data Architecture er viktig fordi integrasjon og standardisering ofte krever felles datadefinisjoner og masterdata."] },
        { id: "application-architecture", description: "Gir en blueprint for applikasjoner, samspill mellom dem og forholdet til kjerneprosesser", correctCardId: "togaf-application-architecture", correctLabel: "Application Architecture", whyCorrect: "Application Architecture beskriver applikasjoner, hvordan de samhandler og hvordan de støtter kjerneprosesser.", whyWrong: "Denne beskrivelsen hører til Application Architecture fordi den handler om applikasjonsportefølje og koblingen til forretningsprosesser.", whyExtended: ["Application Architecture er sentral når man analyserer og strukturerer systemporteføljen."] },
        { id: "technology-architecture", description: "Beskriver programvare- og maskinvareevner som infrastruktur, middleware, nettverk og standarder", correctCardId: "togaf-technology-architecture", correctLabel: "Technology Architecture", whyCorrect: "Technology Architecture beskriver de tekniske evnene som trengs for å støtte business, data og applikasjonstjenester.", whyWrong: "Denne beskrivelsen hører til Technology Architecture fordi den gjelder infrastruktur, middleware, nettverk, prosessering og standarder.", whyExtended: ["Technology Architecture er det mest tekniske laget i TOGAF taxonomy."] }
      ],
      whyExtendedImageRefs: [
        "togaf_arkitekturtaksonomi",
        "togaf_levels_model"
      ]
    },
    {
      id: 11,
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
      whyWrong: "Galt hvis svaret viser til kvalitet, risiko eller ressurser – selv om dette er viktige prosjektforhold, består triple constraint spesifikt av scope, kostnad og tid.",
      whyExtendedImageRefs: [
        "Triple-Constraint-Explained-1080x1080-1",
        "triple_constraint_1"
      ]
    },
    {
      id: 12,
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
            "PRINCE2-prinsipp 1: 'Continued business justification – a justifiable reason required to run a project.'",
            "Det betyr at business casen må være gyldig gjennom hele prosjektet – hvis begrunnelsen forsvinner, bør prosjektet stoppes.",
            "Dette kobler til business case-verktøyet i CIO Toolbox: business case er ikke bare en øvelse i starten, men en løpende bekymring.",
            "PRINCE2 har 'business case' som ett av sine sju temaer, noe som forsterker koblingen til fortsatt begrunnelse."
          ],
          whyExtendedImageRefs: [
              "prince2_framework_model"
            ]
        },
        {
          text: "Manage by stages",
          correct: true,
          why: "Riktig: prosjekter bør planlegges, overvåkes og kontrolleres fase for fase.",
          whyExtended: [
            "PRINCE2-prinsipp 4: 'Manage by stages – should be planned, monitored and controlled stage by stage.'",
            "Fasebasert styring gir jevnlige beslutningspunkter der prosjektstyret kan godkjenne neste fase.",
            "Dette gir naturlige sjekkpunkter for å revurdere business case og justere planer basert på læring.",
            "Manage by stages balanserer detaljert planlegging på kort sikt med mer overordnet planlegging for senere faser."
          ],
          whyExtendedImageRefs: [
              "prince2_framework_model"
            ]
        },
        {
          text: "Alltid maksimer antall teammedlemmer",
          correct: false,
          why: "Galt: dette er ikke et PRINCE2-prinsipp. PRINCE2 fokuserer på definerte roller, begrunnelse og tilpasning.",
          whyExtended: [
            "De sju PRINCE2-prinsippene er: continued business justification, learn from experience, defined roles and responsibilities, manage by stages, manage by exception, focus on products, tailor to suit the project environment.",
            "Ingen av disse handler om å maksimere teamstørrelse – det ville motsagt prinsippet om å tilpasse til prosjektmiljøet.",
            "PRINCE2-prinsipp 3 handler om 'defined roles and responsibilities: clear organizational structure and accountability' – kvalitet på roller, ikke antall personer.",
            "Flere teammedlemmer kan ofte gi kommunikasjonskostnader som bremser prosjektet."
          ]
        },
        {
          text: "Tailor to suit the project environment",
          correct: true,
          why: "Riktig: PRINCE2 skal tilpasses det konkrete miljøet, størrelsen, kompleksiteten og risikoen.",
          whyExtended: [
            "PRINCE2-prinsipp 7: 'Tailor to suit the project environment – tailored to suit environment, size, complexity, importance, capability and risk.'",
            "Dette stemmer med CIO Toolbox sitt overordnede budskap om at rammeverk er kontekstavhengige.",
            "Et lite prosjekt med lav risiko bør bruke en lettere PRINCE2-implementering enn et stort og komplekst prosjekt.",
            "Tilpasningsprinsippet kobler også til Cynefin: ledelsestilnærmingen bør passe kompleksiteten i situasjonen."
          ],
          whyExtendedImageRefs: [
              "prince2_framework_model"
            ]
        },
        {
          text: "Ignorer tidligere erfaringer for å bevare et friskt perspektiv",
          correct: false,
          why: "Galt: PRINCE2 krever eksplisitt læring fra erfaring.",
          whyExtended: [
            "PRINCE2-prinsipp 2: 'Learn from experience – continually seek and draw lessons.'",
            "Dette er det motsatte av å ignorere tidligere erfaringer – PRINCE2 krever at lærdom fanges opp og brukes.",
            "Å lære av erfaring kobler til det bredere agile/produktteam-prinsippet om pivots og læring.",
            "Kursoppsummeringen identifiserer læring som et nøkkelprinsipp for prosjektsuksess."
          ]
        }
      ],
      moduleId: "cio-tool-box",
      groupId: "prince2"
    },
    {
      id: 13,
      type: "single",
      title: "Prosjekter vs. produktteam",
      points: 1,
      prompt: "Hva er en sentral forskjell mellom prosjekttilnærmingen og produktteamtilnærmingen?",
      source: "Kilde: Forelesning 4, CIO Toolbox 2, lysbilder om prosjekter og produktteam.",
      options: [
        {
          text: "Prosjekter er midlertidige organisasjoner. Produktteam har varig eierskap til et digitalt produkt eller en digital tjeneste",
          correct: true,
          why: "Riktig: dette er den grunnleggende forskjellen mellom de to tilnærmingene.",
          whyExtended: [
            "CIO toolbox-modellen definerer et prosjekt som 'temporary organization – Specified results within a specified period.'",
            "Produktteam beskrives med 'Lasting ownership of a digital product/service' og 'Continuous development and operations.'",
            "Forelesning 4 oppsummerer: 'Ensure continuity by creating lasting product teams instead of projects.'",
            "Skillet er sentralt: prosjekter oppløses etter levering, mens produktteam består og forbedrer produktet kontinuerlig."
          ]
        },
        {
          text: "Prosjekter fokuserer på outcome, mens produktteam fokuserer på output",
          correct: false,
          why: "Galt: det er motsatt – produktteam fokuserer på outcome over output.",
          whyExtended: [
            "CIO toolbox-modellen sier at produktteamlogikken inkluderer 'Outcome over output.'",
            "Outcome betyr forretningsresultatet eller kundeverdien som oppnås. Output betyr leveransene som produseres.",
            "Prosjekter måler ofte suksess ved å levere definert scope til tid og budsjett (output), mens produktteam måler suksess gjennom verdien som skapes (outcome).",
            "Forelesning 4 understreker at produktteam bør fokusere på 'what difference does it make' fremfor 'how much did we deliver'."
          ]
        },
        {
          text: "Produktteam bruker aldri planlegging eller estimering",
          correct: false,
          why: "Galt: produktteam planlegger, men på et annet nivå – for eksempel sprintplanlegging i Scrum.",
          whyExtended: [
            "Kursoppsummeringen sier at Scrum 'requires planning at the sprint level' – produktteam planlegger altså.",
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
            "Valget avhenger av kontekst – noe som kobler til Cynefin som metaverktøy for å velge riktig ledelsestilnærming."
          ]
        }
      ],
      whyExtendedImageRefs: [
        "prince2_framework_model",
        "cynefin_theory_of_everything"
      ]
    },
    {
      id: 14,
      type: "drag-categorize",
      title: "Prosjekt vs. produktteam",
      points: 2,
      prompt: "Dra hvert utsagn til den organiseringslogikken det beskriver best.",
      source: "Kilde: CIO Toolbox 2, projects, product teams and agile methods.",
      moduleId: "cio-tool-box",
      groupId: "triple-constraint",
      items: [
        { id: "temporary-organization", label: "Midlertidig organisasjon" },
        { id: "specified-result-period", label: "Spesifisert resultat innen en avgrenset periode" },
        { id: "triple-constraint", label: "Scope, tid og kostnad er sentrale begrensninger" },
        { id: "lasting-ownership", label: "Varig eierskap til et digitalt produkt eller en digital tjeneste" },
        { id: "continuous-development-operations", label: "Kontinuerlig utvikling og drift" },
        { id: "outcome-over-output", label: "Outcome over output. Pivots og læring forventes" }
      ],
      categories: [
        { id: "project", label: "Prosjekt" },
        { id: "product-team", label: "Produktteam / smidige metoder" }
      ],
      correctAnswer: {
        project: ["temporary-organization", "specified-result-period", "triple-constraint"],
        "product-team": ["lasting-ownership", "continuous-development-operations", "outcome-over-output"]
      },
      itemFeedback: {
        "temporary-organization": { whyCorrect: "Et prosjekt er en midlertidig organisasjon.", whyWrong: "Midlertidig organisasjon hører til Prosjekt, ikke Produktteam, fordi prosjekter etableres for en avgrenset periode.", whyExtended: ["Produktteam er mer varige strukturer."] },
        "specified-result-period": { whyCorrect: "Spesifisert resultat innen en avgrenset periode er prosjektlogikk.", whyWrong: "Dette hører til Prosjekt fordi prosjekter defineres rundt en leveranse og en tidsgrense.", whyExtended: ["Prosjektplanlegging bruker ofte roadmaps, estimater, budsjetter og milepæler."] },
        "triple-constraint": { whyCorrect: "Scope, tid og kostnad er sentrale i prosjektstyring.", whyWrong: "Triple constraint hører til Prosjekt fordi prosjektleveranser ofte styres gjennom scope, tid og kostnad.", whyExtended: ["Forelesningen advarer om at prosjekter der alle tre er låst er spesielt sårbare."] },
        "lasting-ownership": { whyCorrect: "Varig eierskap er produktteamlogikk.", whyWrong: "Varig eierskap hører til Produktteam / smidige metoder, ikke midlertidig prosjektlogikk.", whyExtended: ["Produktteam eier et digitalt produkt eller en digital tjeneste over tid."] },
        "continuous-development-operations": { whyCorrect: "Kontinuerlig utvikling og drift er produktteamlogikk.", whyWrong: "Kontinuerlig utvikling og drift hører til Produktteam / smidige metoder fordi arbeidet fortsetter etter lansering.", whyExtended: ["Teamet lærer fra bruk og forbedrer produktet kontinuerlig."] },
        "outcome-over-output": { whyCorrect: "Outcome over output, pivots og læring er produktteamlogikk.", whyWrong: "Outcome over output hører til Produktteam / smidige metoder fordi produktteam optimaliserer for verdi og læring, ikke bare forhåndsdefinerte leveranser.", whyExtended: ["Pivots forventes når læring viser at planen var feil."] }
      },
      whyExtendedImageRefs: [
        "Triple-Constraint-Explained-1080x1080-1",
        "triple_constraint_1"
      ]
    },
    {
      id: 15,
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
            "CIO toolbox-modellen lister governance-dilemmaet: sentralisering gir skala og compliance, mens desentralisering gir agilitet og lokal tilpasning.",
            "Sentralisering gir stordriftsfordeler, konsistens og etterlevelse av standarder, men kan redusere responsivitet.",
            "Desentralisering muliggjør smidighet og lokal tilpasning, men kan føre til fragmentering, duplisering og manglende standarder.",
            "Styringsmatrisen lar organisasjoner bruke ulike arketyper for ulike beslutningsdomener – IT-infrastruktur kan være sentralisert mens business application needs kan være desentralisert."
          ]
        },
        {
          text: "Om man skal bruke Scrum eller PRINCE2",
          correct: false,
          why: "Galt: valg av utviklingsmetode er en operasjonell beslutning, ikke kjernen i styringsdilemmaet.",
          whyExtended: [
            "Scrum og PRINCE2 er rammeverk for å organisere utvikling (verktøy 5 og 6 i CIO Toolbox), ikke selve styringsmekanismer.",
            "IT-styring handler om 'who systematically makes and contributes to decisions', ikke hvilken metode man bruker.",
            "Styringsdilemmaet er strukturelt – hvordan beslutningsmyndighet fordeles på tvers av organisasjonen.",
            "Metodevalg kan være en konsekvens av styringsbeslutninger, men er ikke selve styringsdilemmaet."
          ]
        },
        {
          text: "Om man skal investere i IT i det hele tatt",
          correct: false,
          why: "Galt: IT-styring antar at IT-investeringer finnes og fokuserer på hvordan de skal styres.",
          whyExtended: [
            "IT-styring defineres som å samkjøre IT-investeringer med overordnede forretningsprioriteringer – det forutsetter at investeringer gjøres.",
            "Spørsmålet om man skal investere i IT er en strategisk forretningsbeslutning, ikke et styringsdilemma.",
            "Styringsdilemmaet handler om hvordan beslutningstaking om IT organiseres, ikke om IT skal finnes.",
            "Ett av de fem styringsdomenene er 'IT investment and prioritization' – som handler om å fordele investeringer, ikke eliminere dem."
          ]
        },
        {
          text: "Om CIO bør rapportere til CEO eller CFO",
          correct: false,
          why: "Galt: dette er et spørsmål om rapporteringslinje, ikke kjernen i styringsdilemmaet.",
          whyExtended: [
            "Kjernedilemmaet i styring handler om balansen mellom sentralisert og desentralisert beslutningstaking i hele organisasjonen.",
            "CIOs rapporteringslinje kan påvirke styringsresultater, men dilemmaet er bredere enn én rapporteringsrelasjon.",
            "Styringsmatrisen omfatter alle forretningsenheter og flere beslutningsdomener – ikke bare CIOs posisjon.",
            "Styringsarketyper som Federal og IT Duopoly involverer mange interessenter utover CIO."
          ]
        }
      ],
      whyExtendedImageRefs: [
        "it_governance_matrix"
      ]
    },
    {
      id: 16,
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
            "Kursoppsummeringen beskriver IT principles som: 'how to translate from business, role of IT in business, desirable behaviors, funding.'"
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
            "Kursoppsummeringen lister: 'core business process + relates, what data + how integration, tech capability standardization.'"
          ]
        },
        {
          text: "IT infrastructure strategies",
          correct: true,
          why: "Riktig: IT infrastructure strategies er ett av de fem beslutningsdomenene.",
          whyExtended: [
            "IT infrastructure-beslutninger dekker kritiske tjenester, servicekrav, prising og outsourcing.",
            "Infrastrukturbeslutninger har ofte nytte av sentralisering for å oppnå stordriftsfordeler.",
            "Kursoppsummeringen beskriver: 'critical services to achieve strategic goals, what should be implemented enterprise-wide, pricing, plan for keeping tech up-to-date, what services should be outsourced.'"
          ]
        },
        {
          text: "Business application needs",
          correct: true,
          why: "Riktig: business application needs er ett av de fem beslutningsdomenene.",
          whyExtended: [
            "Business application needs dekker markedsmuligheter, strategiske eksperimenter og beslutninger innenfor arkitekturstandarder.",
            "Dette domenet er ofte mer desentralisert fordi forretningsenheter best forstår egne applikasjonsbehov.",
            "Kursoppsummeringen beskriver: 'market and business process opportunities, strategic experiments design, how to address within architectural standards, accountability on outcomes.'"
          ]
        },
        {
          text: "IT investment and prioritization",
          correct: true,
          why: "Riktig: IT investment and prioritization er ett av de fem beslutningsdomenene.",
          whyExtended: [
            "IT investment-beslutninger dekker de viktigste prosessendringene, fordeling i IT-porteføljen og relativ betydning av virksomhetsovergripende vs. enhetsspesifikke investeringer.",
            "Dette domenet kobler direkte til business case-verktøyet (verktøy 1) – prioritering av digitale tjenester og finansiering.",
            "Investeringsbeslutninger er ofte de mest politisk sensitive fordi de avgjør ressursfordeling.",
            "Kursoppsummeringen beskriver: 'most important process changes, distribution in the current IT portfolio, relative importance of enterprise-wide vs business unit investment, business value of IT projects.'"
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
      ],
      whyExtendedImageRefs: [
        "Domene_modell_IT_beslutninger_spm"
      ]
    },
{
      id: 17,
      type: "dragDrop",
      title: "IT governance matrix",
      points: 3,
      prompt: "Dra hver IT governance-archetype til beskrivelsen som passer best.",
      source: "Kilde: Forelesning 6, CIO Toolbox 4, lysbilder om six archetypal approaches og governance matrix. Weill & Ross (2004).",
      cards: [
        { id: "business-monarchy", text: "Business Monarchy" },
        { id: "it-monarchy", text: "IT Monarchy" },
        { id: "federal", text: "Federal" },
        { id: "duopoly", text: "Duopoly" },
        { id: "feudal", text: "Feudal" },
        { id: "anarchy", text: "Anarchy" }
      ],
      targets: [
        {
          id: "business-monarchy",
          description: "Top business executives tar IT-beslutninger",
          correctCardId: "business-monarchy",
          correctLabel: "Business Monarchy",
          whyCorrect: "Business Monarchy betyr at senior business executives tar beslutningen på vegne av virksomheten.",
          whyWrong: "Denne beskrivelsen er Business Monarchy, fordi beslutningsmyndigheten ligger hos toppledelsen i forretningen, ikke hos IT-ledere, business units eller individuelle brukere.",
          whyExtended: [
            "Nøkkelsignalet er 'top business executives'.",
            "CIO kan være involvert, men arketypen er fortsatt business-led, ikke IT-led.",
            "I governance matrix beskriver dette hvem som bestemmer innenfor et bestemt IT decision domain."
          ]
        },
        {
          id: "it-monarchy",
          description: "IT leaders tar beslutningene",
          correctCardId: "it-monarchy",
          correctLabel: "IT Monarchy",
          whyCorrect: "IT Monarchy betyr at én IT-leder eller en gruppe IT-ledere tar beslutningen.",
          whyWrong: "Denne beskrivelsen er IT Monarchy, fordi decision rights er plassert hos IT leaders, ikke hos business executives eller lokale business units.",
          whyExtended: [
            "Nøkkelsignalet er 'IT leaders'.",
            "Dette skiller seg fra Business Monarchy, der toppledelsen i forretningen tar beslutningene.",
            "Det skiller seg også fra Duopoly, der IT deler beslutningsmyndighet med business representatives."
          ]
        },
        {
          id: "feudal",
          description: "Business units bestemmer uavhengig",
          correctCardId: "feudal",
          correctLabel: "Feudal",
          whyCorrect: "Feudal governance betyr at business unit- eller prosessledere tar separate beslutninger basert på behovene i sin egen enhet.",
          whyWrong: "Denne beskrivelsen er Feudal: lokale business units tar separate og uavhengige beslutninger.",
          whyExtended: [
            "Nøkkelsignalet er at business units bestemmer uavhengig.",
            "Feudal governance er desentralisert, men desentraliseringen skjer til business units eller prosesser.",
            "Dette skiller seg fra Anarchy, der individuelle brukere eller små grupper følger sin egen IT-agenda."
          ]
        },
        {
          id: "duopoly",
          description: "IT og business representatives bestemmer sammen",
          correctCardId: "duopoly",
          correctLabel: "Duopoly",
          whyCorrect: "IT Duopoly betyr at IT leaders og business representatives deler beslutningsmyndighet.",
          whyWrong: "Denne beskrivelsen er Duopoly, fordi beslutningen deles spesifikt mellom IT og business representatives.",
          whyExtended: [
            "Nøkkelsignalet er todelingen: IT + business.",
            "Duopoly er ikke det samme som Federal: Federal kombinerer corporate-level leadership og business units bredere.",
            "Duopoly passer når beslutninger krever både teknisk ekspertise og business ownership."
          ]
        },
        {
          id: "anarchy",
          description: "Hver enkelt bruker følger sin egen IT-agenda",
          correctCardId: "anarchy",
          correctLabel: "Anarchy",
          whyCorrect: "Anarchy er den mest desentraliserte arketypen: individuelle brukere eller små grupper følger sin egen IT-agenda.",
          whyWrong: "Denne beskrivelsen er Anarchy, fordi decision rights ikke er plassert hos ledere, IT eller business units, men i praksis hos individuelle brukere.",
          whyExtended: [
            "Nøkkelsignalet er 'each individual user'.",
            "Anarchy kan gi lokal frihet, men skaper ofte problemer med standardization, integration og security.",
            "Det er ytterpunktet motsatt av monarchy-baserte og sentraliserte beslutninger."
          ]
        },
        {
          id: "federal",
          description: "Sentrale og lokale aktører deler beslutningsmyndighet",
          correctCardId: "federal",
          correctLabel: "Federal",
          whyCorrect: "Federal governance kombinerer sentrale/corporate aktører med representanter fra business units.",
          whyWrong: "Denne beskrivelsen er Federal, fordi modellen blander sentral beslutningsmyndighet med lokal business-unit-representasjon.",
          whyExtended: [
            "Nøkkelsignalet er kombinasjonen av sentrale og lokale aktører.",
            "Forelesningen sammenligner dette med et føderalt politisk system med sentralt og lokalt nivå.",
            "Federal governance forsøker å balansere enterprise-wide coordination med lokal kunnskap."
          ]
        }
      ],
      whyExtendedImageRefs: [
        "it_governance_matrix",
        "decision_rights_matrix"
      ]
    },
    {
      id: 18,
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
              "cynefin_theory_of_everything"
            ]
        },
        {
          text: "Cynefin erstatter alle andre verktøy i CIO Toolbox",
          correct: false,
          why: "Galt: Cynefin er et metaverktøy som hjelper med å velge blant de andre verktøyene, ikke en erstatning.",
          whyExtended: [
            "Cynefin er merket som 'META-TOOL' i CIO toolbox-modellen, som betyr at det opererer på et nivå over de andre verktøyene.",
            "Formålet er 'Choose management approach based on context' – det veileder valg av verktøy, ikke gjennomfører arbeidet.",
            "Du trenger fortsatt de faktiske verktøyene (business case, design thinking, PRINCE2 osv.) for å gjøre arbeidet.",
            "Cynefin gir kontekstbevissthet. De andre verktøyene gir metoder og rammeverk."
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
          why: "Galt: Cynefin er et sense-making-rammeverk. TOGAF ADM er en arkitekturutviklingsmetode.",
          whyExtended: [
            "Cynefin (Snowden and Boone, 2007) kategoriserer situasjoner etter kompleksitet for å styre ledelsestilnærming.",
            "TOGAF ADM er en strukturert metode for å utvikle virksomhetsarkitektur gjennom definerte faser.",
            "De har helt ulike formål. Cynefin hjelper med å avgjøre hvordan en situasjon bør angripes. TOGAF ADM beskriver hvordan arkitekturarbeid gjøres.",
            "Cynefin er et metaverktøy. TOGAF er et operasjonelt rammeverk innen IT Architecture-verktøyet."
          ]
        }
      ],
      moduleId: "cio-tool-box",
      groupId: "cynefin"
    },
    {
      id: 19,
      type: "single",
      title: "Cynefin-domener",
      points: 1,
      prompt: "I hvilket Cynefin-domene er årsak-virkning fortsatt mulig å analysere på forhånd, noe som gjør det til 'ekspertenes domene'?",
      source: "Kilde: Forelesning 4, CIO Toolbox 2, lysbilde om Cynefin.",
      options: [
        {
          text: "Clear",
          correct: false,
          why: "Galt: clear-domenet gjelder kjente problemer med etablerte prosedyrer – ingen ekspertanalyse trengs.",
          whyExtended: [
            "Forelesning 4 definerer clear som situasjoner der problemer typisk er velkjente og kan løses gjennom tidligere avtalte og ofte skriftlige prosedyrer.",
            "Clear-situasjoner bruker Sense → Categorize → Respond – gjenkjenn mønsteret og bruk standardresponsen.",
            "Clear er domenet for best practice, ikke ekspertanalyse – svarene er allerede kjent.",
            "Clear-situasjoner har minst kompleksitet: få faste begrensninger og få kompleksitetsfaktorer."
          ]
        },
        {
          text: "Complicated",
          correct: true,
          why: "Riktig: complicated-domenet kalles eksplisitt 'ekspertenes domene', der analyse er mulig.",
          whyExtended: [
            "Forelesning 4 definerer complicated slik: 'a lot of non-trivial decisions have to be made – however, the cause-and-effect relationships are still possible to analyze in advance. This is said to be the domain of experts.'",
            "Complicated-situasjoner bruker Sense → Analyze → Respond – bruk ekspertise til å analysere situasjonen og finne riktig tilnærming.",
            "Nøkkelforskjellen fra complex er at svaret i complicated-situasjoner kan finnes gjennom analyse – det krever bare ekspertise.",
            "Eksempler er ingeniørutfordringer, detaljert planlegging og strukturert beslutningstaking der problemet er forstått, men løsningen krever kompetanse."
          ],
          whyExtendedImageRefs: [
              "cynefin_theory_of_everything"
            ]
        },
        {
          text: "Complex",
          correct: false,
          why: "Galt: i complex-domenet er viktige faktorer ukjente og eksperimentering er nødvendig.",
          whyExtended: [
            "Forelesning 4 definerer complex slik: 'several important factors influencing the outcome are unknown, and experimentation is typically necessary.'",
            "Complex-situasjoner bruker Probe → Sense → Respond – du må prøve ut ting og lære av resultatene.",
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
            "Chaotic-situasjoner bruker Act → Sense → Respond – stabiliser først, analyser senere.",
            "Det er ikke tid til ekspertanalyse i kaos – prioriteten er å få situasjonen under kontroll.",
            "Chaotic er det mest ekstreme domenet, med flest kompleksitetsfaktorer og faste begrensninger."
          ]
        }
      ],
      moduleId: "cio-tool-box",
      groupId: "cynefin"
    },
    {
      id: 20,
      type: "dragDrop",
      title: "Cynefin og styringstilnærming",
      points: 2,
      prompt: "Dra hver styringstilnærming til Cynefin-domenet der den passer best.",
      source: "Kilde: CIO Toolbox-forelesningene, Cynefin som metaverktøy for valg av styringstilnærming.",
      moduleId: "cio-tool-box",
      groupId: "cynefin",
      cards: [
        { id: "procedure-best-practice", text: "Bruk prosedyrer og best practice" },
        { id: "expert-analysis-planning", text: "Bruk ekspertanalyse og planlegging" },
        { id: "experimentation-learning", text: "Bruk eksperimentering, design thinking og læring" },
        { id: "immediate-action", text: "Handle umiddelbart for å stabilisere situasjonen" }
      ],
      targets: [
        { id: "clear", description: "Clear", correctCardId: "procedure-best-practice", correctLabel: "Bruk prosedyrer og best practice", whyCorrect: "Clear-situasjoner passer for prosedyrer og best practice.", whyWrong: "Prosedyrer og best practice hører til Clear-situasjoner, der årsak og virkning er tydelige.", whyExtended: ["I Clear-situasjoner kan lederen sense, categorize og respond.", "Poenget er å ikke overkomplisere en rutinesituasjon."] },
        { id: "complicated", description: "Complicated", correctCardId: "expert-analysis-planning", correctLabel: "Bruk ekspertanalyse og planlegging", whyCorrect: "Complicated-situasjoner krever ekspertanalyse og planlegging.", whyWrong: "Ekspertanalyse og planlegging hører til Complicated-situasjoner, der årsak og virkning finnes, men krever ekspertise.", whyExtended: ["Business case og alternativanalyse passer her når problemet kan analyseres.", "Det kan finnes flere gode praksiser, ikke bare én opplagt best practice."] },
        { id: "complex", description: "Complex", correctCardId: "experimentation-learning", correctLabel: "Bruk eksperimentering, design thinking og læring", whyCorrect: "Complex-situasjoner krever eksperimentering, læring og iterasjon.", whyWrong: "Eksperimentering hører til Complex-situasjoner, der svaret ikke kan være fullt kjent på forhånd.", whyExtended: ["Design thinking og smidige produktteam er nyttige når problem eller løsning er usikker.", "Lederen bruker probe, sense og respond."] },
        { id: "chaotic", description: "Chaotic", correctCardId: "immediate-action", correctLabel: "Handle umiddelbart for å stabilisere situasjonen", whyCorrect: "Chaotic-situasjoner krever umiddelbar handling for å stabilisere situasjonen.", whyWrong: "Umiddelbar handling hører til Chaotic-situasjoner, der det ikke er tid til detaljert analyse før handling.", whyExtended: ["Første mål er å etablere nok orden til å flytte situasjonen ut av kaos.", "Lang analyse passer vanligvis dårlig i første respons."] }
      ],
      whyExtendedImageRefs: [
        "cynefin_theory_of_everything"
      ]
    },
    {
      id: 21,
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
            "En management fashion betyr at et rammeverk er blitt bredt adoptert og diskutert – det har blitt en trend i ledelsespraksis.",
            "Dette betyr ikke nødvendigvis at rammeverket er bra eller dårlig – det betyr at det er populært nok til å bli et felles referansepunkt.",
            "Skillet fra management framework handler om adopsjonsskala: et framework er en strukturert tilnærming. En fashion er et bredt adoptert framework."
          ]
        },
        {
          text: "Et rammeverk som er bevist å fungere perfekt i alle kontekster",
          correct: false,
          why: "Galt: kurset sier eksplisitt at rammeverk er kontekstavhengige og noen ganger omdiskuterte.",
          whyExtended: [
            "Forelesning 6 sier: 'For these (and similar) frameworks and methods, their usefulness and value is highly context-sensitive – and sometimes disputed.'",
            "Ingen rammeverk fungerer perfekt i alle kontekster – dette er et kjernebudskap i CIO Toolbox.",
            "Management fashions kan være hypet: at noe er populært betyr ikke at det passer overalt.",
            "CIO Toolbox oppfordrer til å 'Read the room' først – kontekst avgjør alltid om et rammeverk passer."
          ]
        },
        {
          text: "Et synonym for management framework – begrepene betyr det samme",
          correct: false,
          why: "Galt: kurset skiller mellom framework (struktur) og fashion (popularitet).",
          whyExtended: [
            "Et management framework er: 'a combination of interlinked items that supports a particular approach to a specific objective' – det er strukturelt.",
            "En management fashion legger til dimensjonen bred adopsjon – et framework blir fashion når det når kritisk masse.",
            "Ikke alle framework blir fashions – noen forblir nisjeverktøy eller spesialiserte verktøy.",
            "Skillet er viktig fordi popularitet (fashion) kan skape press om å adoptere et rammeverk uavhengig av kontekst."
          ]
        },
        {
          text: "Et begrep for utdaterte rammeverk som ikke lenger brukes",
          correct: false,
          why: "Galt: management fashion viser til nåværende popularitet, ikke foreldelse.",
          whyExtended: [
            "Fashion-metaforen viser til bred nåværende adopsjon, som trender i klær – det handler om hva som er populært nå.",
            "En management fashion kan bli utdatert, men begrepet i seg selv beskriver toppunktet for adopsjon, ikke nedgangen.",
            "Rammeverk som Scrum og SAFe kan forstås som aktuelle management fashions – de er bredt adoptert og diskutert.",
            "Kurset bruker begrepet for å vise at popularitet ikke betyr universell anvendbarhet."
          ]
        }
      ],
      whyExtendedImageRefs: [
        "cynefin_theory_of_everything"
      ]
    },
    {
      id: 22,
      type: "drag-categorize",
      title: "Frameworks and best practice",
      points: 3,
      prompt: "Dra hvert framework til CIO Toolbox-verktøyet det er koblet til i lysbildet. Frameworks uten pil skal plasseres under 'Not used in CIO-toolbox'.",
      source: "Kilde: Forelesning 6, CIO Toolbox 4, lysbildet 'Frameworks and «best practice»'.",
      moduleId: "cio-tool-box",
      groupId: "framewoks",
      items: [
        { id: "togaf", label: "TOGAF" },
        { id: "prince2", label: "Prince 2" },
        { id: "scrum", label: "Scrum" },
        { id: "safe", label: "SAFe" },
        { id: "itil", label: "ITIL" },
        { id: "prosci-adkar", label: "Prosci / ADKAR model" }
      ],
      categories: [
        { id: "it-architecture", label: "IT Architecture" },
        { id: "projects", label: "Prosjekter" },
        { id: "product-teams-agile", label: "Produktteam og smidige metoder" },
        { id: "not-used-in-cio-toolbox", label: "Not used in CIO-toolbox" }
      ],
      correctAnswer: {
        "it-architecture": ["togaf"],
        projects: ["prince2"],
        "product-teams-agile": ["scrum", "safe"],
        "not-used-in-cio-toolbox": ["itil", "prosci-adkar"]
      },
      itemFeedback: {
        togaf: {
          whyCorrect: "TOGAF peker i lysbildet mot IT Architecture.",
          whyWrong: "TOGAF skal under IT Architecture, fordi lysbildet kobler enterprise architecture / TOGAF til IT Architecture-verktøyet i CIO Toolbox.",
          whyExtended: ["TOGAF brukes for enterprise architecture.", "IT Architecture-verktøyet handler om å analysere og strukturere IT portfolio."]
        },
        prince2: {
          whyCorrect: "Prince 2 peker i lysbildet mot Projects.",
          whyWrong: "Prince 2 skal under Projects, fordi det er et project governance and management framework.",
          whyExtended: ["Projects handler om å planlegge og organisere development.", "Prince 2 er ikke et architecture- eller agile framework."]
        },
        scrum: {
          whyCorrect: "Scrum peker mot Product teams and agile methods.",
          whyWrong: "Scrum skal under Product teams and agile methods, fordi det er et agile software delivery framework.",
          whyExtended: ["Scrum brukes for smidig utvikling.", "Det hører ikke til Project governance slik Prince 2 gjør."]
        },
        safe: {
          whyCorrect: "SAFe peker mot Product teams and agile methods.",
          whyWrong: "SAFe skal under Product teams and agile methods, fordi det er et scaled agile framework.",
          whyExtended: ["SAFe handler om å skalere agile delivery.", "Det plasseres sammen med Scrum i CIO Toolbox-mappingen."]
        },
        itil: {
          whyCorrect: "ITIL har ingen pil inn i CIO Toolbox i dette lysbildet.",
          whyWrong: "ITIL skal ikke under IT Architecture, Projects eller Product teams her. Det plasseres under Not used in CIO-toolbox.",
          whyExtended: ["ITIL er relevant for IT Service Management.", "I denne toolbox-modellen er det utenfor de sju kjerneverktøyene."]
        },
        "prosci-adkar": {
          whyCorrect: "Prosci / ADKAR har ingen pil inn i CIO Toolbox i dette lysbildet.",
          whyWrong: "Prosci / ADKAR skal under Not used in CIO-toolbox i denne mappingen.",
          whyExtended: ["Prosci / ADKAR er change management.", "Change management er relevant for IT management, men er ikke ett av de sju CIO Toolbox-verktøyene her."]
        }
      },
      whyExtendedImageRefs: [
        "framewoks_and_best_practices",
        "ITIL"
      ]
    },
    {
      id: 23,
      type: "drag-categorize",
      title: "Bærekraftsrapportering: Scope 1, 2 og 3",
      points: 2,
      prompt: "Dra hvert utslippseksempel til riktig scope i rapporteringen.",
      source: "Kilde: Sustainability-forelesning, bærekraftsrapportering og Scope 1, 2 og 3.",
      moduleId: "sustainability",
      groupId: "reporting",
      items: [
        { id: "company-vehicles", label: "Drivstoff brukt av virksomhetens egne kjøretøy" },
        { id: "onsite-boilers", label: "Utslipp fra kjeler eller generatorer virksomheten kontrollerer" },
        { id: "purchased-electricity", label: "Innkjøpt strøm brukt i kontorer eller datasentre" },
        { id: "purchased-heating-cooling", label: "Innkjøpt varme, kjøling eller damp" },
        { id: "supplier-emissions", label: "Utslipp fra leverandører og innkjøpte varer" },
        { id: "business-travel", label: "Jobbreiser og ansattes pendling" },
        { id: "customer-use", label: "Kunders bruk av virksomhetens produkter" }
      ],
      categories: [
        { id: "scope-1", label: "Scope 1: Direkte utslipp" },
        { id: "scope-2", label: "Scope 2: Innkjøpt energi" },
        { id: "scope-3", label: "Scope 3: Utslipp i verdikjeden" }
      ],
      correctAnswer: {
        "scope-1": ["company-vehicles", "onsite-boilers"],
        "scope-2": ["purchased-electricity", "purchased-heating-cooling"],
        "scope-3": ["supplier-emissions", "business-travel", "customer-use"]
      },
      itemFeedback: {
        "company-vehicles": { whyCorrect: "Virksomhetens egne kjøretøy gir direkte utslipp og er Scope 1.", whyWrong: "Utslipp fra virksomhetens egne kjøretøy hører til Scope 1 fordi organisasjonen direkte kontrollerer kilden.", whyExtended: ["Scope 1 dekker direkte utslipp fra kilder organisasjonen eier eller kontrollerer."] },
        "onsite-boilers": { whyCorrect: "Kjeler eller generatorer virksomheten kontrollerer gir direkte Scope 1-utslipp.", whyWrong: "Forbrenning i virksomhetens egne eller kontrollerte anlegg hører til Scope 1 fordi organisasjonen selv slipper ut klimagasser.", whyExtended: ["Dette skiller seg fra innkjøpt strøm, som er Scope 2."] },
        "purchased-electricity": { whyCorrect: "Innkjøpt strøm er Scope 2.", whyWrong: "Innkjøpt strøm hører til Scope 2 fordi utslippene er indirekte, men energirelaterte.", whyExtended: ["Organisasjonen bruker strømmen, men utslippene skjer der strømmen produseres."] },
        "purchased-heating-cooling": { whyCorrect: "Innkjøpt varme, kjøling eller damp er Scope 2.", whyWrong: "Innkjøpt varme eller kjøling hører til Scope 2 fordi det er innkjøpt energi.", whyExtended: ["Scope 2 dekker indirekte utslipp fra innkjøpt strøm, varme, damp eller kjøling."] },
        "supplier-emissions": { whyCorrect: "Leverandørutslipp er Scope 3-utslipp i verdikjeden.", whyWrong: "Leverandørutslipp hører til Scope 3 fordi de skjer oppstrøms i verdikjeden.", whyExtended: ["Scope 3 inkluderer indirekte utslipp utenfor Scope 2, som innkjøpte varer og tjenester."] },
        "business-travel": { whyCorrect: "Jobbreiser og pendling er Scope 3-utslipp i verdikjeden.", whyWrong: "Jobbreiser og pendling hører til Scope 3 fordi de er indirekte utslipp i verdikjeden.", whyExtended: ["De skyldes organisasjonens aktivitet, men skjer vanligvis i eiendeler organisasjonen ikke eier eller kontrollerer."] },
        "customer-use": { whyCorrect: "Kunders bruk av produkter er Scope 3-utslipp nedstrøms i verdikjeden.", whyWrong: "Kunders bruk hører til Scope 3 fordi det skjer nedstrøms i verdikjeden.", whyExtended: ["Scope 3 kan inkludere både oppstrøms og nedstrøms utslipp."] }
      },
      whyExtendedImageRefs: [
        "scope_1_2_3_model",
        "scope_1_2_3"
      ]
    },
    {
      id: 24,
      type: "dragDrop",
      title: "Designed for Digital building blocks",
      points: 3,
      prompt: "Dra hver definisjon til riktig Designed for Digital building block.",
      source: "Kilde: Designed for Digital-forelesningene, definisjoner av D4D building blocks.",
      moduleId: "designed-for-digital",
      groupId: "overview",
      cards: [
        { id: "d4d-def-ob", text: "Et sammenhengende sett av standardiserte og integrerte systems, processes og data som støtter core operations" },
        { id: "d4d-def-sci", text: "Organizational learning om hva kunder vil betale for, og hvordan digital technologies kan levere på behovene deres" },
        { id: "d4d-def-dp", text: "Et repository av business, data og infrastructure components som brukes til raskt å konfigurere digital offerings" },
        { id: "d4d-def-af", text: "En fordeling av ansvar for digital offerings og components som balanserer autonomy og alignment" },
        { id: "d4d-def-exdp", text: "Et repository av digital components som er åpent for external parties" }
      ],
      targets: [
        {
          id: "operational-backbone",
          description: "Operational Backbone",
          correctCardId: "d4d-def-ob",
          correctLabel: "Et sammenhengende sett av standardiserte og integrerte systems, processes og data som støtter core operations",
          whyCorrect: "Operational Backbone er den standardiserte og integrerte kjernen av systems, processes og data.",
          whyWrong: "Denne definisjonen hører til Operational Backbone: den handler om stabil core operations, ikke customer learning eller ecosystem access.",
          whyExtended: ["Operational Backbone støtter reliable end-to-end transaction processing og master data.", "Dette er exploit/stability-siden av digital business design."]
        },
        {
          id: "shared-customer-insights",
          description: "Shared Customer Insights",
          correctCardId: "d4d-def-sci",
          correctLabel: "Organizational learning om hva kunder vil betale for, og hvordan digital technologies kan levere på behovene deres",
          whyCorrect: "Shared Customer Insights handler om organizational learning om customer demand og digitale muligheter.",
          whyWrong: "Denne definisjonen hører til Shared Customer Insights fordi nøkkelsignalet er hva kunder vil betale for.",
          whyExtended: ["Building blocken hjelper virksomheten å oppdage hvilke digital offerings kundene faktisk verdsetter.", "Den bygges gjennom experiments, co-creation og shared learning."]
        },
        {
          id: "digital-platform",
          description: "Digital Platform",
          correctCardId: "d4d-def-dp",
          correctLabel: "Et repository av business, data og infrastructure components som brukes til raskt å konfigurere digital offerings",
          whyCorrect: "Digital Platform er et repository av reusable business, data og infrastructure components.",
          whyWrong: "Denne definisjonen hører til Digital Platform fordi den beskriver reusable components for rask konfigurering av digital offerings.",
          whyExtended: ["Digital Platform gjør experimentation og rapid innovation lettere.", "Den skiller seg fra Operational Backbone: OB kjører core business stabilt, mens DP muliggjør nye digital offerings."]
        },
        {
          id: "accountability-framework",
          description: "Accountability Framework",
          correctCardId: "d4d-def-af",
          correctLabel: "En fordeling av ansvar for digital offerings og components som balanserer autonomy og alignment",
          whyCorrect: "Accountability Framework fordeler ansvar samtidig som det balanserer autonomy og alignment.",
          whyWrong: "Denne definisjonen hører til Accountability Framework fordi den handler om roles, decision rights og ownership.",
          whyExtended: ["AF hjelper teams å innovere uten å skape chaos.", "Den definerer hvem som eier digital offerings og digital components."]
        },
        {
          id: "external-developer-platform",
          description: "External Developer Platform",
          correctCardId: "d4d-def-exdp",
          correctLabel: "Et repository av digital components som er åpent for external parties",
          whyCorrect: "External Developer Platform åpner digital components for external parties.",
          whyWrong: "Denne definisjonen hører til External Developer Platform fordi nøkkelsignalet er external parties.",
          whyExtended: ["ExDP bruker ofte APIs eller andre boundary resources.", "Den bør normalt komme etter at den interne plattformen er moden nok."]
        }
      ],
      whyExtendedImageRefs: [
        "D4D-overview",
        "OB",
        "SCI",
        "DP",
        "AF",
        "ExDP"
      ]
    },
    {
      id: 25,
      type: "drag-categorize",
      title: "Kursstruktur: tre deler av IN5431",
      points: 3,
      prompt: "Dra hvert tema til den delen av IN5431-pensumet det primært hører til.",
      source: "Kilde: Forelesning 2, kursoversikten: Strategy and strategic context. Management tools and frameworks. Designed for digital.",
      moduleId: "strategy",
      groupId: "action-plan",
      items: [
        { id: "purpose", label: "Formål" },
        { id: "strategic-goals", label: "Strategiske mål" },
        { id: "stakeholders", label: "Interessenter" },
        { id: "operational-effectiveness", label: "Operasjonell effektivitet" },
        { id: "strategic-positioning", label: "Strategisk posisjonering" },
        { id: "action-plan-roadmap", label: "Handlingsplan / roadmap" },
        { id: "business-case", label: "Business case" },
        { id: "alternative-analysis", label: "Alternative analysis" },
        { id: "design-thinking", label: "Design thinking" },
        { id: "it-architecture-tool", label: "IT Architecture" },
        { id: "projects", label: "Prosjekter" },
        { id: "product-teams-agile", label: "Produktteam og smidige metoder" },
        { id: "it-governance-tool", label: "IT governance" },
        { id: "cynefin", label: "Cynefin" },
        { id: "digital-business-design", label: "Digital business design" },
        { id: "digital-offerings", label: "Digitale tilbud" },
        { id: "shared-customer-insights", label: "Shared Customer Insights" },
        { id: "operational-backbone", label: "Operational Backbone" },
        { id: "digital-platform", label: "Digital Platform" },
        { id: "accountability-framework", label: "Accountability Framework" },
        { id: "external-developer-platform", label: "External Developer Platform" }
      ],
      categories: [
        { id: "strategy-context", label: "Strategi og strategisk kontekst" },
        { id: "cio-toolkit", label: "Ledelsesverktøy og rammeverk: CIO-verktøykassen" },
        { id: "designed-for-digital", label: "Designed for digital" }
      ],
      correctAnswer: {
        "strategy-context": ["purpose", "strategic-goals", "stakeholders", "operational-effectiveness", "strategic-positioning", "action-plan-roadmap"],
        "cio-toolkit": ["business-case", "alternative-analysis", "design-thinking", "it-architecture-tool", "projects", "product-teams-agile", "it-governance-tool", "cynefin"],
        "designed-for-digital": ["digital-business-design", "digital-offerings", "shared-customer-insights", "operational-backbone", "digital-platform", "accountability-framework", "external-developer-platform"]
      },
      itemFeedback: {
        purpose: { whyCorrect: "Formål hører til strategi og strategisk kontekst.", whyWrong: "Formål hører til strategi og strategisk kontekst fordi denne delen spør hva organisasjonen prøver å oppnå og for hvem.", whyExtended: ["Strategiforelesningen kobler formål til mål, interessenter og alignment."] },
        "strategic-goals": { whyCorrect: "Strategiske mål hører til strategi og strategisk kontekst.", whyWrong: "Strategiske mål hører til strategi og strategisk kontekst fordi de definerer hva organisasjonen bør forbedre eller oppnå før verktøy velges.", whyExtended: ["CIO Toolbox-metoder brukes senere for å analysere, prioritere og organisere initiativer som støtter disse målene."] },
        stakeholders: { whyCorrect: "Interessenter hører til strategi og strategisk kontekst.", whyWrong: "Interessenter hører til strategi og strategisk kontekst fordi strategiforelesningen diskuterer eiere, medlemmer, borgere, politikere, styrer og administrasjon.", whyExtended: ["Interessenter forklarer hvem organisasjonen arbeider for og hvem som setter forventninger."] },
        "operational-effectiveness": { whyCorrect: "Operasjonell effektivitet hører til strategi og strategisk kontekst.", whyWrong: "Operasjonell effektivitet hører til strategi og strategisk kontekst, særlig i Porters skille mellom operational effectiveness og strategic positioning.", whyExtended: ["Operasjonell effektivitet er nødvendig, men er ikke det samme som strategi."] },
        "strategic-positioning": { whyCorrect: "Strategisk posisjonering hører til strategi og strategisk kontekst.", whyWrong: "Strategisk posisjonering hører til strategi og strategisk kontekst fordi det handler om å gjøre andre aktiviteter eller lignende aktiviteter på andre måter.", whyExtended: ["Dette gir kontekst for hvilke digitale og IT-relaterte initiativer som bør støttes."] },
        "action-plan-roadmap": { whyCorrect: "Handlingsplan / roadmap hører til strategi og strategisk kontekst.", whyWrong: "Handlingsplan / roadmap hører her til strategi og strategisk kontekst fordi strategiprosessen bør gi aktiviteter, ansvar, rekkefølge og estimater.", whyExtended: ["Handlingsplanen oversetter strategiske mål til konkret arbeid."] },
        "business-case": { whyCorrect: "Business case hører til ledelsesverktøy og rammeverk i CIO-verktøykassen.", whyWrong: "Business case hører til CIO-verktøykassen fordi det er et beslutningsverktøy for prioritering av digitale tjenester og finansiering.", whyExtended: ["Det er et ledelsesverktøy, ikke en D4D-byggekloss."] },
        "alternative-analysis": { whyCorrect: "Alternative analysis hører til ledelsesverktøy og rammeverk i CIO-verktøykassen.", whyWrong: "Alternative analysis hører til CIO-verktøykassen fordi det støtter leverandørvalg, produktvalg og evaluering av alternativer.", whyExtended: ["Prosessen går fra understand the situation til synthesize options og evaluate."] },
        "design-thinking": { whyCorrect: "Design thinking hører til ledelsesverktøy og rammeverk i CIO-verktøykassen.", whyWrong: "Design thinking hører til CIO-verktøykassen fordi det er en utforskende tilnærming for uklare problemer.", whyExtended: ["Det kobles til discovery, reframing, prototyping og testing."] },
        "it-architecture-tool": { whyCorrect: "IT Architecture hører til ledelsesverktøy og rammeverk i CIO-verktøykassen.", whyWrong: "IT Architecture hører til CIO-verktøykassen fordi det brukes til å analysere og strukturere IT-portefølje, systemer og tjenester.", whyExtended: ["Det inkluderer operating model, business processes og enterprise architecture-perspektiver som TOGAF."] },
        projects: { whyCorrect: "Prosjekter hører til ledelsesverktøy og rammeverk i CIO-verktøykassen.", whyWrong: "Prosjekter hører til CIO-verktøykassen fordi de er en måte å planlegge og organisere utviklingsarbeid på.", whyExtended: ["A project is a temporary organization."] },
        "product-teams-agile": { whyCorrect: "Produktteam og smidige metoder hører til ledelsesverktøy og rammeverk i CIO-verktøykassen.", whyWrong: "Produktteam og smidige metoder hører til CIO-verktøykassen fordi det handler om varig eierskap og kontinuerlig utvikling.", whyExtended: ["Scrum og SAFe er smidige rammeverk knyttet til dette området."] },
        "it-governance-tool": { whyCorrect: "IT governance hører til ledelsesverktøy og rammeverk i CIO-verktøykassen.", whyWrong: "IT governance hører til CIO-verktøykassen fordi det handler om hvem som tar IT-beslutninger og hvem som står ansvarlig.", whyExtended: ["Kurset bruker Weill og Ross til beslutningsdomener og governance-arketyper."] },
        cynefin: { whyCorrect: "Cynefin hører til ledelsesverktøy og rammeverk i CIO-verktøykassen.", whyWrong: "Cynefin hører til CIO-verktøykassen fordi det hjelper å velge styringstilnærming basert på kontekst.", whyExtended: ["Det fungerer som et metaverktøy."] },
        "digital-business-design": { whyCorrect: "Digital business design hører til Designed for digital.", whyWrong: "Digital business design hører til Designed for digital fordi det er den sentrale organiserende ideen i D4D-delen.", whyExtended: ["Det handler om helhetlig konfigurering av mennesker, prosesser og teknologi."] },
        "digital-offerings": { whyCorrect: "Digital offerings hører til Designed for digital.", whyWrong: "Digital offerings hører til Designed for digital fordi D4D fokuserer på nye programvarebaserte tilbud og value propositions.", whyExtended: ["Digital offerings er konkrete løsninger som leverer digital value proposition."] },
        "shared-customer-insights": { whyCorrect: "Shared Customer Insights hører til Designed for digital.", whyWrong: "Shared Customer Insights hører til Designed for digital fordi det er en av de fem D4D-byggeklossene.", whyExtended: ["Det er organisatorisk læring om hva kunder vil betale for."] },
        "operational-backbone": { whyCorrect: "Operational Backbone hører til Designed for digital.", whyWrong: "Operational Backbone hører til Designed for digital fordi det er en av de fem D4D-byggeklossene.", whyExtended: ["Det er det standardiserte og integrerte fundamentet for kjerneoperasjoner."] },
        "digital-platform": { whyCorrect: "Digital Platform hører til Designed for digital.", whyWrong: "Digital Platform hører til Designed for digital fordi det er en av de fem D4D-byggeklossene.", whyExtended: ["Det er et repository av gjenbrukbare forretnings-, data- og infrastrukturkomponenter."] },
        "accountability-framework": { whyCorrect: "Accountability Framework hører til Designed for digital.", whyWrong: "Accountability Framework hører til Designed for digital fordi det er en av de fem D4D-byggeklossene.", whyExtended: ["Det balanserer autonomi og alignment."] },
        "external-developer-platform": { whyCorrect: "External Developer Platform hører til Designed for digital.", whyWrong: "External Developer Platform hører til Designed for digital fordi det er en av de fem D4D-byggeklossene.", whyExtended: ["Det åpner digitale komponenter for eksterne partnere, ofte via API-er eller boundary resources."] }
      }
    }
  ]
};

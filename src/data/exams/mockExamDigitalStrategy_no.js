// src/data/exams/mockExamDigitalStrategy_no.js
export const mockExamDigitalStrategy_no = {
  id: "mock-exam-digital-strategy-no",
  subjectId: "in5431",
  baseId: "mock-exam-digital-strategy",
  lang: "no",
  title: "Øveeksamen: Digital strategy and digital transformation",
  description: "Eksamenssett kun for Danilova-forelesningen om digital strategy, digital transformation, barriers, organizational inertia, leadership og CDO.",
  modeLabel: "FORELESNINGSDRILL",
  estimatedMinutes: "40–55",
  sortOrder: 140,
  questions: [
    {
      id: 1,
      type: "single",
      title: "Digital technology som strategisk ressurs",
      moduleId: "strategy",
      groupId: "digital-strategy",
      points: 1,
      prompt: "Hva er det beste faglige poenget i starten av forelesningen, der Solow/Carr-problemet settes opp mot digital technology as a resource?",
      source: "Fasit: Forelesning 14, Digital strategy and the digital transformation, slides 2, 10–12.",
      options: [
        {
          text: "Digital technology gir automatisk varig competitive advantage så lenge teknologien er ny.",
          correct: false,
          why: "Galt: forelesningen problematiserer nettopp at teknologi i seg selv ikke automatisk gir strategisk effekt.",
          whyExtended: [
            "Carr-poenget i starten er at IT kan bli commodity dersom alle bruker de samme standardiserte løsningene.",
            "Strategisk verdi kommer ikke fra å eie teknologi alene, men fra hvordan digitale ressurser kobles til organisasjon, prosesser, verdiforslag og konkurranseposisjon.",
            "Dette er hvorfor forelesningen senere skiller mellom business strategy, IT-strategy og digital strategy."
          ]
        },
        {
          text: "Digital technology får strategisk betydning når organisasjonen bruker digitale ressurser til å skape differential value.",
          correct: true,
          why: "Riktig: dette fanger kjernen i digital strategy-definisjonen og kobler teknologi til strategisk verdiskaping.",
          whyExtended: [
            "Forelesningen definerer digital strategy som en organisatorisk strategi formulert og utført ved å utnytte digitale ressurser for å skape differential value.",
            "Poenget er ikke bare anskaffelse av teknologi, men å bruke digitale ressurser til å endre verdiskaping, kundeinteraksjon, prosesser eller posisjon i økosystemet.",
            "Derfor må ledere forstå både characteristics, opportunities, prerequisites og consequences ved digital technology."
          ],
          whyExtendedImageRefs: [
            { moduleId: "strategy", groupId: "digital-strategy", imageId: "digital_strategy_definition" }
          ]
        },
        {
          text: "Digital technology er bare operasjonell infrastruktur og hører derfor kun hjemme i IT-strategy.",
          correct: false,
          why: "Galt: forelesningen skiller IT-strategy fra digital strategy, men viser at digital technology også kan være strategisk.",
          whyExtended: [
            "IT-strategy kan handle om teknologivalg og IT-kapasiteter, men digital strategy handler om organisatorisk verdiskaping gjennom digitale ressurser.",
            "Når digital teknologi endrer kundeinteraksjon, business models eller økosystemposisjon, er det mer enn intern IT-infrastruktur.",
            "Dette er også hvorfor digitalization analyseres på macro, meso og micro level."
          ]
        },
        {
          text: "Digital technology er strategisk bare når CIO alene eier alle beslutninger om teknologien.",
          correct: false,
          why: "Galt: forelesningen legger vekt på tverrfunksjonell involvering, ikke at CIO alene skal eie alt.",
          whyExtended: [
            "Digital business strategy beskrives som trans-functional, og forelesningen spør eksplisitt hvorfor hele organisasjonen må involveres.",
            "CIO/CDO kan være viktige roller, men digital transformation krever også ledelse, kultur, kompetanse og samarbeid på tvers.",
            "Å isolere digital strategy til én rolle ville svekke koblingen til business, prosesser og mennesker."
          ]
        }
      ]
    },
    {
      id: 2,
      type: "dragDrop",
      title: "Business strategy, IT-strategy og digital strategy",
      moduleId: "strategy",
      groupId: "digital-strategy",
      points: 2,
      prompt: "Dra hvert utsagn til riktig strategitype.",
      source: "Fasit: Forelesning 14, slides 12–13, 'What is a digital strategy?' og eksempel med kundeservice/customer management system.",
      cards: [
        { id: "business-strategy", text: "Business strategy" },
        { id: "it-strategy", text: "IT-strategy" },
        { id: "digital-strategy", text: "Digital strategy" }
      ],
      targets: [
        {
          id: "business-strategy",
          description: "Vi skal være best i vår sektor på customer service.",
          correctCardId: "business-strategy",
          correctLabel: "Business strategy",
          whyCorrect: "Dette er business strategy fordi utsagnet beskriver en overordnet forretningsposisjon og konkurranseambisjon.",
          whyWrong: "Utsagnet handler ikke primært om hvilken teknologi som skal kjøpes, men om hvilken verdi og posisjon virksomheten ønsker.",
          whyExtended: [
            "Business strategy setter retning for hva virksomheten ønsker å oppnå i markedet eller sektoren.",
            "Digital strategy kan støtte denne ambisjonen, men er ikke identisk med den overordnede business strategy."
          ]
        },
        {
          id: "it-strategy",
          description: "Vi skal anskaffe det beste customer management system i markedet.",
          correctCardId: "it-strategy",
          correctLabel: "IT-strategy",
          whyCorrect: "Dette er IT-strategy fordi utsagnet handler om anskaffelse/valg av et bestemt IT-system.",
          whyWrong: "Et systemkjøp kan støtte en digital strategy, men er ikke i seg selv en strategi for digital verdiskaping.",
          whyExtended: [
            "Forelesningens eksempel plasserer dette som IT-strategy: fokus er på systemanskaffelse og teknologivalg.",
            "Uten kobling til kundeinteraksjon, prosesser og differential value blir dette for snevert til å være digital strategy."
          ]
        },
        {
          id: "digital-strategy",
          description: "Vi skal bruke digital technology til å fornye hvordan vi interagerer med kundene.",
          correctCardId: "digital-strategy",
          correctLabel: "Digital strategy",
          whyCorrect: "Dette er digital strategy fordi digitale ressurser brukes til å endre kundeinteraksjon og verdiskaping.",
          whyWrong: "Utsagnet handler ikke bare om forretningsmål eller systemkjøp, men om å utnytte digitale ressurser strategisk.",
          whyExtended: [
            "Forelesningen bruker dette som digital strategy-eksempel: digital technology kobles til fornyelse av kundeinteraksjon.",
            "Dette er bredere enn IT procurement og mer konkret digitalt enn en generell business strategy."
          ]
        }
      ],
      whyExtendedImageRefs: [
        { moduleId: "strategy", groupId: "digital-strategy", imageId: "business_it_digital_strategy_example" }
      ]
    },
    {
      id: 3,
      type: "fill",
      title: "Definisjon av digital strategy",
      moduleId: "strategy",
      groupId: "digital-strategy",
      points: 1,
      prompt: "Digital strategy er en organisatorisk strategi formulert og utført ved å utnytte digitale ________ for å skape differential value.",
      answers: ["ressurser", "resources", "digitale ressurser", "digital resources"],
      answerKey: "digitale ressurser / digital resources",
      source: "Fasit: Forelesning 14, slide 12, definisjon fra Bharadwaj et al. (2013).",
      whyCorrect: "Riktig: definisjonen bruker digital resources som det strategien utnytter for å skape differential value.",
      whyWrong: "Galt hvis svaret bare peker på systemer, IT-avdeling eller prosjekter. Definisjonen handler om digitale ressurser som strategisk grunnlag.",
      whyExtended: [
        "Nøkkelpoenget er at digital strategy ikke er en ren IT-plan, men en organisatorisk strategi.",
        "Digital resources kan omfatte teknologi, data, digitale komponenter, plattformer og kompetanser som brukes til å skape ny eller differensierende verdi."
      ],
      whyExtendedImageRefs: [
        { moduleId: "strategy", groupId: "digital-strategy", imageId: "digital_strategy_definition" }
      ]
    },
    {
      id: 4,
      type: "multi",
      title: "Innholdet i en digital strategy",
      moduleId: "strategy",
      groupId: "digital-strategy",
      points: 2,
      prompt: "Marker de elementene forelesningen beskriver som innhold i en digital strategy.",
      source: "Fasit: Forelesning 14, slide 14, 'The content of a digital strategy'.",
      options: [
        {
          text: "A digital vision",
          correct: true,
          why: "Riktig: digital vision skal være utfordrende og inspirerende.",
          whyExtended: [
            "Digital vision gir retning og mening for den digitale utviklingen.",
            "I Nordic Choice/Strawberry-caset uttrykkes dette som ambisjonen om 'the best digital guest journey in the Nordic market'."
          ],
          whyExtendedImageRefs: [
            { moduleId: "strategy", groupId: "digital-strategy", imageId: "digital_strategy_content" }
          ]
        },
        {
          text: "A portfolio of digital initiatives",
          correct: true,
          why: "Riktig: strategien må prioritere konkrete digitale initiativer/prosjekter.",
          whyExtended: [
            "En strategi uten prioriterte initiativer blir lett en visjon uten gjennomføring.",
            "Portfolio-tankegangen kobler digital strategy til prioritering og faktisk endring."
          ]
        },
        {
          text: "A roadmap",
          correct: true,
          why: "Riktig: roadmap er planleggingsverktøyet som viser rekkefølge og tidslinje.",
          whyExtended: [
            "Roadmapen gjør strategien mer gjennomførbar ved å koble initiativer til tid og avhengigheter.",
            "I forelesningen kobles dette til digital initiatives and roadmap."
          ]
        },
        {
          text: "A definition of responsibility",
          correct: true,
          why: "Riktig: ansvar må defineres for at strategien skal kunne gjennomføres.",
          whyExtended: [
            "Digital strategy krever governance og tydelige roller; mangel på tydelige roller og ansvar er også en barriere for digital transformation.",
            "Ansvarsplassering kobler strategien til gjennomføring, accountability og ledelse."
          ]
        },
        {
          text: "En komplett liste over alle gamle systemer som aldri skal endres",
          correct: false,
          why: "Galt: dette er ikke et strategisk innholdselement og bryter med ideen om utvikling og transformasjon.",
          whyExtended: [
            "Systemoversikt kan være nyttig i IT architecture, men er ikke i seg selv digital strategy.",
            "Digital strategy handler om vision, initiatives, roadmap og responsibility — ikke om å fryse eksisterende systemportefølje."
          ]
        },
        {
          text: "Et løfte om at alle digitale initiativer skal gjennomføres samtidig",
          correct: false,
          why: "Galt: strategien krever prioritering, ikke ukritisk maksimering av antall initiativer.",
          whyExtended: [
            "Portfolio og roadmap handler nettopp om å velge, prioritere og sekvensere digital initiatives.",
            "Å gjøre alt samtidig øker risikoen for uklart ansvar, ressursmangel og manglende koordinering."
          ]
        }
      ]
    },
    {
      id: 5,
      type: "drag-categorize",
      title: "Macro, meso og micro level",
      moduleId: "strategy",
      groupId: "digital-strategy",
      points: 2,
      prompt: "Dra hvert eksempel til riktig nivå for digitalization impact.",
      source: "Fasit: Forelesning 14, slides 4 og 40, 'The impact of digital technology and digitalization on organizations'.",
      items: [
        { id: "business-models", label: "Endrer business models og økosystemposisjon" },
        { id: "ecosystem", label: "Endrer organisasjonens plass i et ecosystem" },
        { id: "processes", label: "Endrer business processes og reporting lines" },
        { id: "governance", label: "Endrer leadership, governance, values og culture" },
        { id: "tasks", label: "Endrer innholdet og karakteren i arbeidsoppgaver" },
        { id: "skills", label: "Skaper nye krav til competence and skills" }
      ],
      categories: [
        { id: "macro", label: "Macro level" },
        { id: "meso", label: "Meso level" },
        { id: "micro", label: "Micro level" }
      ],
      correctAnswer: {
        macro: ["business-models", "ecosystem"],
        meso: ["processes", "governance"],
        micro: ["tasks", "skills"]
      },
      itemFeedback: {
        "business-models": {
          whyCorrect: "Business models hører til macro level fordi dette handler om organisasjonens strategiske posisjon og verdiskaping.",
          whyWrong: "Dette er bredere enn prosessnivå eller individuelle arbeidsoppgaver.",
          whyExtended: ["Macro level handler om strategy, business models og ecosystems."]
        },
        ecosystem: {
          whyCorrect: "Ecosystem-posisjon hører til macro level.",
          whyWrong: "Økosystemposisjon er ikke bare en intern prosess- eller kompetanseendring.",
          whyExtended: ["Forelesningen sier at digitalization alters business models and the organization's position within an ecosystem."]
        },
        processes: {
          whyCorrect: "Business processes og reporting lines hører til meso level.",
          whyWrong: "Dette er organisatoriske strukturer og prosesser, ikke individuelle oppgaver alene.",
          whyExtended: ["Meso level handler om business processes, organization og reporting lines."]
        },
        governance: {
          whyCorrect: "Leadership, governance, values og culture ligger på meso level i figuren.",
          whyWrong: "Dette handler om organisering og styring, ikke primært økosystemposisjon eller enkeltoppgaver.",
          whyExtended: ["Meso level beskriver hvordan organisasjonen må endre sine interne strukturer og styringsformer."]
        },
        tasks: {
          whyCorrect: "Innholdet i arbeidsoppgaver hører til micro level.",
          whyWrong: "Dette er den konkrete arbeidshverdagen, ikke hele business model.",
          whyExtended: ["Micro level handler om tasks, communication, collaboration og decision processes."]
        },
        skills: {
          whyCorrect: "Nye krav til competence and skills hører til micro level.",
          whyWrong: "Kompetansekrav merkes hos personer og roller, selv om de også får organisatoriske konsekvenser.",
          whyExtended: ["Digitalization endrer hva ansatte må kunne og hvordan de samarbeider og tar beslutninger."]
        }
      },
      whyExtendedImageRefs: [
        { moduleId: "strategy", groupId: "digital-strategy", imageId: "macro_meso_micro_impact" }
      ]
    },
    {
      id: 6,
      type: "multi",
      title: "Lederes spørsmål om digital technology",
      moduleId: "strategy",
      groupId: "digital-strategy",
      points: 1,
      prompt: "Hvilke spørsmål bør ledere kunne stille om digital technology ifølge forelesningen?",
      source: "Fasit: Forelesning 14, slide 11, 'The questions leaders should be able to ask about digital technology'.",
      options: [
        {
          text: "Characteristics",
          correct: true,
          why: "Riktig: ledere må forstå teknologiens kjennetegn.",
          whyExtended: ["Uten å forstå characteristics er det vanskelig å vurdere hva teknologien faktisk kan og ikke kan gjøre."],
          whyExtendedImageRefs: [
            { moduleId: "strategy", groupId: "digital-strategy", imageId: "digital_technology_leader_questions" }
          ]
        },
        {
          text: "Opportunities",
          correct: true,
          why: "Riktig: ledere må kunne se muligheter for verdiskaping og endring.",
          whyExtended: ["Digital strategy handler om å utnytte digitale ressurser til differential value, ikke bare forstå teknologien teknisk."]
        },
        {
          text: "Prerequisites",
          correct: true,
          why: "Riktig: ledere må forstå forutsetninger for å lykkes.",
          whyExtended: ["Prerequisites kan være kompetanse, governance, prosesser, data, kultur og digital foundation."]
        },
        {
          text: "Consequences",
          correct: true,
          why: "Riktig: ledere må forstå konsekvenser for organisasjon, prosesser, kompetanse og strategi.",
          whyExtended: ["Konsekvenser kan ligge på macro, meso og micro level."]
        },
        {
          text: "Hvilken leverandør er billigst akkurat nå?",
          correct: false,
          why: "Galt: pris kan være relevant i procurement, men dette er ikke et av de fire overordnede leder-spørsmålene i forelesningen.",
          whyExtended: ["Forelesningen løfter lederblikket fra anskaffelse til strategiske spørsmål om kjennetegn, muligheter, forutsetninger og konsekvenser."]
        }
      ]
    },
    {
      id: 7,
      type: "single",
      title: "Hva er digital transformation?",
      moduleId: "strategy",
      groupId: "digital-strategy",
      points: 1,
      prompt: "Hvilket utsagn beskriver best digital transformation i forelesningen?",
      source: "Fasit: Forelesning 14, slides 18–19, 'What is a digital transformation' og Kane et al. quote.",
      options: [
        {
          text: "Å implementere flere og bedre teknologier uten å endre organisasjonen.",
          correct: false,
          why: "Galt: forelesningen sier eksplisitt at digital transformation ikke bare handler om mer og bedre teknologi.",
          whyExtended: [
            "Teknologi kan være nødvendig, men ikke tilstrekkelig.",
            "Forelesningen vektlegger alignment mellom culture, people, structure og tasks."
          ]
        },
        {
          text: "Significant organizational change, driven or enabled by extensive use of digital technologies.",
          correct: true,
          why: "Riktig: dette er kjernedefinisjonen fra forelesningen.",
          whyExtended: [
            "Digital transformation kan innebære extensive process redesign, business model innovation og endret organizational identity.",
            "Det er altså en organisatorisk endring, ikke bare en IT-leveranse.",
            "Kane et al.-poenget er at mennesker, kultur, struktur og oppgaver må alignes med teknologien."
          ],
          whyExtendedImageRefs: [
            { moduleId: "strategy", groupId: "digital-strategy", imageId: "digital_transformation_definition" },
            { moduleId: "strategy", groupId: "digital-strategy", imageId: "digital_transformation_not_only_technology" }
          ]
        },
        {
          text: "Å erstatte en papirprosess med en PDF uten å endre arbeidspraksis.",
          correct: false,
          why: "Galt: dette er digitisering/digital støtte, ikke digital transformation.",
          whyExtended: [
            "Ren teknisk omforming av informasjon er for snevert til å være transformation.",
            "Digital transformation krever betydelig organisatorisk endring over tid."
          ]
        },
        {
          text: "Å lage en IT-strategy som utelukkende beskriver systemanskaffelser.",
          correct: false,
          why: "Galt: IT-strategy og digital transformation er ikke det samme.",
          whyExtended: [
            "Systemanskaffelser kan være en del av transformation, men ikke hele transformasjonen.",
            "Digital transformation berører business models, prosesser, kultur, kompetanse og organisering."
          ]
        }
      ]
    },
    {
      id: 8,
      type: "SequenceOrder",
      title: "Digital transformation som prosess",
      moduleId: "strategy",
      groupId: "digital-strategy",
      points: 2,
      prompt: "Plasser elementene i den rekkefølgen forelesningen bruker når digital transformation beskrives som en prosess.",
      source: "Fasit: Forelesning 14, slide 20, 'Digital transformation can be described as a process'.",
      items: [
        { id: "realization", label: "Realization that change is necessary" },
        { id: "vision-strategy", label: "Digital vision & strategy" },
        { id: "projects", label: "Digitalization projects" },
        { id: "investment", label: "Investment in digital technology and competence" },
        { id: "cdo-unit", label: "CDO and/or a digital unit" }
      ],
      correctOrder: ["realization", "vision-strategy", "projects", "investment", "cdo-unit"],
      itemFeedback: {
        realization: {
          whyCorrect: "Forelesningen starter prosessen med en realization that change is necessary.",
          whyWrong: "Før strategien kan formuleres må organisasjonen erkjenne behovet for endring.",
          whyExtended: ["Dette kan utløses av marked, teknologi, konkurranse, kundeadferd eller interne problemer."]
        },
        "vision-strategy": {
          whyCorrect: "Digital vision & strategy kommer etter erkjennelsen av endringsbehov.",
          whyWrong: "Strategien bør gi retning før prosjekter og investeringer settes i gang.",
          whyExtended: ["Uten digital vision & strategy kan digitalization projects bli fragmenterte lokale tiltak."]
        },
        projects: {
          whyCorrect: "Digitalization projects er de konkrete initiativene som følger av visjon og strategi.",
          whyWrong: "Prosjekter bør ikke komme før endringsbehov og strategisk retning er tydelig nok.",
          whyExtended: ["Prosjektene oversetter strategy til konkrete endringer i prosesser, tjenester eller tilbud."]
        },
        investment: {
          whyCorrect: "Investering i digital technology and competence trengs for å gjennomføre endringen.",
          whyWrong: "Investeringer bør kobles til strategien og initiativene, ikke gjøres helt løsrevet.",
          whyExtended: ["Forelesningen peker både på teknologi og kompetanse — ikke bare systemanskaffelse."]
        },
        "cdo-unit": {
          whyCorrect: "CDO og/eller digital unit er siste punkt i forelesningens prosessliste.",
          whyWrong: "CDO/digital unit er en mulig organisatorisk respons, men bør forstås i sammenheng med strategi, initiativer og investeringer.",
          whyExtended: ["Rollen kan bidra med koordinering, endringskraft og kobling mellom business og technology."]
        }
      },
      whyCorrect: "Rekkefølgen er: realization → digital vision & strategy → digitalization projects → investment → CDO/digital unit.",
      whyExtended: [
        "Dette er ikke en mekanisk oppskrift som alltid må gjennomføres likt, men forelesningen presenterer det som en typisk prosesslogikk for digital transformation.",
        "Poenget er å koble endringsbehov, strategisk retning, konkrete initiativer, ressurser og organisatorisk ansvar."
      ],
      whyExtendedImageRefs: [
        { moduleId: "strategy", groupId: "digital-strategy", imageId: "digital_transformation_process" }
      ]
    },
    {
      id: 9,
      type: "single",
      title: "Nordic Choice / Strawberry-caset",
      moduleId: "strategy",
      groupId: "digital-strategy",
      points: 1,
      prompt: "Hva illustrerer Nordic Choice / Strawberry-caset best i forelesningen?",
      source: "Fasit: Forelesning 14, slides 21–25, hotel sector, digital vision, chronology og digital guest journey.",
      options: [
        {
          text: "At digital transformation kan drives av en tydelig digital vision, organisatoriske grep og flere koordinerte digitale initiativer over flere år.",
          correct: true,
          why: "Riktig: caset viser en flerårig transformation med digital business strategy, CDO/eBerry, plattform, app, ny nettside og self-service check-in/out.",
          whyExtended: [
            "Den digitale visjonen var 'The best digital guest journey in the Nordic market'.",
            "Kronologien viser ikke én isolert IT-leveranse, men en serie organisatoriske og teknologiske initiativer fra 2014 til 2019.",
            "Caset brukes til å vise digital transformation i hotel sector, der kanaler og customer journey endres."
          ],
          whyExtendedImageRefs: [
            { moduleId: "strategy", groupId: "digital-strategy", imageId: "nordic_choice_chronology" },
            { moduleId: "strategy", groupId: "digital-strategy", imageId: "digital_guest_journey" }
          ]
        },
        {
          text: "At digital transformation alltid er ferdig på under ett år hvis man bare ansetter en CDO.",
          correct: false,
          why: "Galt: caset viser en flerårig utvikling, ikke en rask engangsaktivitet.",
          whyExtended: [
            "Forelesningen konkluderer med at digital transformation vanligvis tar år og ofte er vanskelig å avgrense.",
            "CDO/eBerry er viktige grep i caset, men ikke hele transformasjonen alene."
          ]
        },
        {
          text: "At IT-strategy og digital strategy er identiske fordi begge handler om å kjøpe systemer.",
          correct: false,
          why: "Galt: caset viser nettopp at digital strategy er bredere enn systemanskaffelser.",
          whyExtended: [
            "Digital guest journey, organisering, eBerry, app, nettside og self-service henger sammen som endring i kundeinteraksjon.",
            "Dette er mer enn å kjøpe ett customer management system."
          ]
        },
        {
          text: "At kultur er irrelevant så lenge den tekniske plattformen fungerer.",
          correct: false,
          why: "Galt: forelesningen viser også kulturspenningen mellom det etablerte og eBerry.",
          whyExtended: [
            "Kultur og organisering kan være både enabler og hindring i digital transformation.",
            "Forelesningen bruker senere kultur som et sentralt barrieretema."
          ]
        }
      ]
    },
    {
      id: 10,
      type: "multi",
      title: "Konklusjoner om digital transformation",
      moduleId: "strategy",
      groupId: "digital-strategy",
      points: 2,
      prompt: "Marker utsagnene som passer med forelesningens konklusjoner om digital transformation.",
      source: "Fasit: Forelesning 14, slide 26, 'What might we conclude on the digital transformation?'.",
      options: [
        {
          text: "Digital transformation kan være systematisk drevet fra toppen gjennom en klar digital strategy.",
          correct: true,
          why: "Riktig: dette er eksplisitt nevnt som en mulig driver.",
          whyExtended: ["Top-down digital strategy kan gi retning, prioritering og koordinering."],
          whyExtendedImageRefs: [
            { moduleId: "strategy", groupId: "digital-strategy", imageId: "digital_transformation_conclusions" }
          ]
        },
        {
          text: "Digital transformation kan også være resultat av mange lokale digitalization efforts.",
          correct: true,
          why: "Riktig: forelesningen åpner for både top-down og lokale drivere.",
          whyExtended: ["Lokale digitalization efforts kan akkumulere til større transformation, men kan også skape behov for koordinering."]
        },
        {
          text: "Digital transformation kan involvere hele organisasjonen, deler av organisasjonen eller en hel sektor.",
          correct: true,
          why: "Riktig: omfanget kan variere.",
          whyExtended: ["Hotel sector-eksemplet viser hvordan nye bookingkanaler og økosystemer kan påvirke en hel sektor."]
        },
        {
          text: "Digital transformation innebærer significant changes og tar ofte år å gjennomføre.",
          correct: true,
          why: "Riktig: forelesningen sier at transformation vanligvis tar år og ofte er vanskelig å avgrense.",
          whyExtended: ["Dette skiller transformation fra enkel implementering av et IT-system."]
        },
        {
          text: "Digital transformation er alltid et rent IT-prosjekt med tydelig start og slutt.",
          correct: false,
          why: "Galt: forelesningen sier at digital transformation ofte er vanskelig å avgrense og kan involvere hele organisasjonen eller sektoren.",
          whyExtended: ["Et rent IT-prosjekt er for snevert; transformation handler om mennesker, struktur, kultur, prosesser og verdiskaping."]
        }
      ]
    },
    {
      id: 11,
      type: "multi",
      title: "Barriers to digital transformation",
      moduleId: "strategy",
      groupId: "digital-strategy",
      points: 2,
      prompt: "Hvilke av disse er barriers to digital transformation ifølge forelesningen?",
      source: "Fasit: Forelesning 14, slide 28, 'What makes it hard to succeed?'.",
      options: [
        {
          text: "Lack of a coherent digital strategy",
          correct: true,
          why: "Riktig: forelesningen peker på at transformation kan feile når den ikke er strategisk forankret.",
          whyExtended: [
            "Uten coherent digital strategy kan initiativer bli fragmenterte og mangle prioritering.",
            "Dette kobler barriers-delen direkte tilbake til digital strategy-delen av forelesningen."
          ],
          whyExtendedImageRefs: [
            { moduleId: "strategy", groupId: "digital-strategy", imageId: "digital_transformation_barriers" }
          ]
        },
        {
          text: "Lack of governance & management",
          correct: true,
          why: "Riktig: uklare roller og ansvar er en sentral barriere.",
          whyExtended: ["Digital transformation krever tydelig ansvar, koordinering og ledelsesmessig oppfølging."]
        },
        {
          text: "Lack of cross-unit collaboration",
          correct: true,
          why: "Riktig: utilstrekkelig samarbeid på tvers er en gjentatt utfordring i forelesningen.",
          whyExtended: ["Dette blir særlig viktig fordi digital business strategy beskrives som trans-functional."]
        },
        {
          text: "Underestimated cultural barriers",
          correct: true,
          why: "Riktig: kultur kan være en stor hindring for digital maturity.",
          whyExtended: ["Tekniske verktøy kan bli underbrukt dersom kulturen ikke støtter nye arbeidsformer."]
        },
        {
          text: "Organizational inertia",
          correct: true,
          why: "Riktig: inertia er en egen barriere forelesningen går grundig inn i.",
          whyExtended: ["Inertia handler om at organisasjonen fortsetter i samme spor selv når omgivelsene endrer seg."]
        },
        {
          text: "For mye continuous learning og experimentation",
          correct: false,
          why: "Galt: forelesningen presenterer continuous learning og experimentation som del av en kultur for digitalization, ikke som barrierer.",
          whyExtended: ["Det motsatte — manglende læring, eksperimentering og samarbeid — gjør transformation vanskeligere."]
        }
      ]
    },
    {
      id: 12,
      type: "drag-categorize",
      title: "Barrierer vs. digitalization culture",
      moduleId: "strategy",
      groupId: "digital-strategy",
      points: 2,
      prompt: "Sorter hvert utsagn som enten en barrier to digital transformation eller en del av en culture for digitalization.",
      source: "Fasit: Forelesning 14, slides 28–30, barriers og 'A culture for digitalization'.",
      items: [
        { id: "unclear-roles", label: "Unclear roles and responsibilities" },
        { id: "inertia", label: "Organizational inertia" },
        { id: "lack-competence", label: "Lack of competence/skills/understanding" },
        { id: "flexibility", label: "Flexibility" },
        { id: "experimentation", label: "Experimentation" },
        { id: "knowledge-sharing", label: "Knowledge sharing" },
        { id: "room-failure", label: "Room for failure" }
      ],
      categories: [
        { id: "barrier", label: "Barrier" },
        { id: "culture", label: "Culture for digitalization" }
      ],
      correctAnswer: {
        barrier: ["unclear-roles", "inertia", "lack-competence"],
        culture: ["flexibility", "experimentation", "knowledge-sharing", "room-failure"]
      },
      itemFeedback: {
        "unclear-roles": {
          whyCorrect: "Uklare roller og ansvar hører til lack of governance & management, som er en barrier.",
          whyWrong: "Dette er ikke en kulturkapabilitet; det er et governance-problem.",
          whyExtended: ["Digital transformation krever tydelig ansvar fordi initiativene går på tvers av enheter."]
        },
        inertia: {
          whyCorrect: "Organizational inertia er eksplisitt listet som barrier.",
          whyWrong: "Inertia betyr stickiness og motstand mot endring, ikke en kultur for digitalization.",
          whyExtended: ["Inertia kan gi stabilitet, men kan også låse organisasjonen til gamle spor."]
        },
        "lack-competence": {
          whyCorrect: "Lack of competence/skills/understanding er en barrier.",
          whyWrong: "Manglende kompetanse er det motsatte av læring og kunnskapsdeling.",
          whyExtended: ["Digital transformation krever både teknisk og organisatorisk kompetanse."]
        },
        flexibility: {
          whyCorrect: "Flexibility er del av culture for digitalization.",
          whyWrong: "Flexibility er en enabler, ikke en barrier.",
          whyExtended: ["Fleksibilitet gjør det lettere å respondere på endrede omgivelser."]
        },
        experimentation: {
          whyCorrect: "Experimentation er del av culture for digitalization.",
          whyWrong: "Eksperimentering hjelper organisasjonen å lære, teste og redusere usikkerhet.",
          whyExtended: ["Forelesningen kobler også eksperimentering til måter å adressere inertia på."]
        },
        "knowledge-sharing": {
          whyCorrect: "Knowledge sharing er del av culture for digitalization.",
          whyWrong: "Kunnskapsdeling er en enabler for tverrfunksjonell transformation, ikke en hindring.",
          whyExtended: ["Dette motvirker silotenkning og ulike lokale forståelser."]
        },
        "room-failure": {
          whyCorrect: "Room for failure er del av culture for digitalization.",
          whyWrong: "En kultur med rom for feil gjør eksperimentering mulig.",
          whyExtended: ["Uten rom for feil blir organisasjonen ofte mer risikoavers og mindre lærende."]
        }
      },
      whyExtendedImageRefs: [
        { moduleId: "strategy", groupId: "digital-strategy", imageId: "digital_transformation_barriers" },
        { moduleId: "strategy", groupId: "digital-strategy", imageId: "culture_for_digitalization" }
      ]
    },
    {
      id: 13,
      type: "single",
      title: "Culture challenge",
      moduleId: "strategy",
      groupId: "digital-strategy",
      points: 1,
      prompt: "En virksomhet innfører et godt collaboration platform, men ansatte bruker det lite fordi kulturen er svært hierarkisk og beslutninger tas gjennom lange konsensusprosesser. Hva er den beste tolkningen?",
      source: "Fasit: Forelesning 14, slide 29, sitater om kultur som barriere for digital transformation.",
      options: [
        {
          text: "Problemet er bare teknisk; plattformen må byttes ut med en nyere løsning.",
          correct: false,
          why: "Galt: caset sier at plattformen fungerer, men kulturen hindrer bruk.",
          whyExtended: [
            "Forelesningen poengterer at digitale verktøy kan bli underbrukt dersom prevailing culture ikke støtter den nye arbeidsformen.",
            "Å bytte teknologi løser ikke nødvendigvis atferd, normer og beslutningsmønstre."
          ]
        },
        {
          text: "Dette viser at digital transformation krever endring i atferd og 'how things are done', ikke bare teknologi.",
          correct: true,
          why: "Riktig: dette er kjernepoenget i kultur-sliden.",
          whyExtended: [
            "Forelesningen viser at kultur kan være hovedgrunn til svak digital transformation performance.",
            "Digital transformation lykkes først når mennesker endrer hvordan de jobber, samhandler og tar beslutninger.",
            "Kultur er dermed en enabler eller hindring for digital maturity."
          ],
          whyExtendedImageRefs: [
            { moduleId: "strategy", groupId: "digital-strategy", imageId: "culture_as_barrier" }
          ]
        },
        {
          text: "Dette viser at governance og leadership ikke er relevant når plattformen allerede er valgt.",
          correct: false,
          why: "Galt: governance og leadership er nettopp nødvendig for å endre praksis og ansvar.",
          whyExtended: [
            "Lederes rolle er å utvikle kultur, skape forståelse og legge til rette for collective efforts.",
            "Teknologivalget er bare én del av transformation."
          ]
        },
        {
          text: "Dette er bare et micro-level problem og har ingen sammenheng med meso-level culture eller organization.",
          correct: false,
          why: "Galt: individuell bruk påvirkes av kultur og organisering på meso level.",
          whyExtended: [
            "Forelesningens macro/meso/micro-modell viser at oppgaver og samarbeid på micro level påvirkes av organisasjon, leadership, governance og culture på meso level.",
            "Derfor kan ikke problemet forstås isolert som individuell teknologibruk."
          ]
        }
      ]
    },
    {
      id: 14,
      type: "fill",
      title: "Organizational inertia",
      moduleId: "strategy",
      groupId: "digital-strategy",
      points: 1,
      prompt: "Forelesningen bruker begrepet organizational ________ om organisasjonens 'stickiness' og tendens til å fortsette i samme spor selv når omgivelsene endrer seg.",
      answers: ["inertia", "treghet", "organisatorisk treghet", "organizational inertia"],
      answerKey: "inertia / organisatorisk treghet",
      source: "Fasit: Forelesning 14, slide 31, 'Organizational Inertia'.",
      whyCorrect: "Riktig: organizational inertia beskriver motstandskraften eller tregheten som gjør at organisasjonen fortsetter i samme bane.",
      whyWrong: "Galt hvis svaret peker på strategy, roadmap eller governance alene. Begrepet i forelesningen er inertia.",
      whyExtended: [
        "Forelesningen beskriver inertia som vansken med å endre socio-technical systems like raskt som omgivelsene endrer seg.",
        "Inertia kan være nødvendig og positivt fordi det gir stabilitet, men kan også bli en barriere for digital transformation."
      ],
      whyExtendedImageRefs: [
        { moduleId: "strategy", groupId: "digital-strategy", imageId: "organizational_inertia_definition" }
      ]
    },
    {
      id: 15,
      type: "drag-categorize",
      title: "Inertia på individ- og organisasjonsnivå",
      moduleId: "strategy",
      groupId: "digital-strategy",
      points: 2,
      prompt: "Dra hvert eksempel til riktig kategori av inertia-mekanisme.",
      source: "Fasit: Forelesning 14, slides 33–34, 'Inertia – individual level' og 'Inertia – organizational level'.",
      items: [
        { id: "fear-change", label: "Fear of change and uncertainty" },
        { id: "status-quo", label: "Status quo bias" },
        { id: "schemas", label: "Cognitive schemas" },
        { id: "socio-tech-path", label: "Socio-technical path-dependencies" },
        { id: "economic-path", label: "Economic path-dependencies" },
        { id: "complexity", label: "Organizational complexity" },
        { id: "power", label: "Power structures and incentives" },
        { id: "formal-rules", label: "Formal rules and routines" }
      ],
      categories: [
        { id: "individual-psych", label: "Individual: psychological / behavioral" },
        { id: "individual-cognitive", label: "Individual: socio-cognitive" },
        { id: "org-sociotech", label: "Organizational: socio-technical" },
        { id: "org-economic", label: "Organizational: economic / structural" },
        { id: "org-political", label: "Organizational: political / cultural" }
      ],
      correctAnswer: {
        "individual-psych": ["fear-change"],
        "individual-cognitive": ["status-quo", "schemas"],
        "org-sociotech": ["socio-tech-path"],
        "org-economic": ["economic-path", "complexity"],
        "org-political": ["power", "formal-rules"]
      },
      itemFeedback: {
        "fear-change": {
          whyCorrect: "Fear of change and uncertainty er en individuell psykologisk/barrieremekanisme.",
          whyWrong: "Dette handler om individets reaksjon på usikkerhet, ikke om organisasjonens formelle strukturer.",
          whyExtended: ["Forelesningen nevner negative psychology som frykt for endring, usikkerhet og identity threats."]
        },
        "status-quo": {
          whyCorrect: "Status quo bias er en individuell socio-cognitive inertia-mekanisme.",
          whyWrong: "Dette er en kognitiv bias hos individer, ikke en økonomisk path-dependency.",
          whyExtended: ["Status quo bias betyr at vi overvurderer det vi allerede har sammenlignet med mulige gevinster ved endring."]
        },
        schemas: {
          whyCorrect: "Cognitive schemas er individuell socio-cognitive inertia.",
          whyWrong: "Dette handler om etablerte mentale modeller, ikke primært formal rules.",
          whyExtended: ["Etablerte skjemaer gjør at ny informasjon tolkes gjennom gamle forståelsesrammer."]
        },
        "socio-tech-path": {
          whyCorrect: "Socio-technical path-dependencies hører til organizational socio-technical inertia.",
          whyWrong: "Dette handler om samspillet mellom kompetanse, prosesser og teknologi på organisasjonsnivå.",
          whyExtended: ["Gamle prosesser og teknologivalg kan låse organisasjonen til eksisterende praksis."]
        },
        "economic-path": {
          whyCorrect: "Economic path-dependencies hører til economic and structural inertia.",
          whyWrong: "Business model, resources og technology er økonomiske/strukturelle bindinger.",
          whyExtended: ["Tidligere investeringer og ressursbindinger kan gjøre det vanskelig å endre retning."]
        },
        complexity: {
          whyCorrect: "Organizational complexity hører til economic and structural inertia.",
          whyWrong: "Kompleksitet er en strukturell hindring, ikke bare individuell motvilje.",
          whyExtended: ["Jo mer kompleks organisasjonen er, desto vanskeligere kan transformation bli å koordinere."]
        },
        power: {
          whyCorrect: "Power structures and incentives hører til political and cultural inertia.",
          whyWrong: "Dette handler om makt og insentiver, ikke bare teknologi eller kompetanse.",
          whyExtended: ["Eksisterende maktstrukturer kan ha interesse av å bevare nåværende praksis."]
        },
        "formal-rules": {
          whyCorrect: "Formal rules and routines hører til political and cultural inertia.",
          whyWrong: "Regler og rutiner kan stabilisere organisasjonen, men også hindre ny praksis.",
          whyExtended: ["Dette viser hvorfor transformation ofte krever endring i både formelle og uformelle strukturer."]
        }
      },
      whyExtendedImageRefs: [
        { moduleId: "strategy", groupId: "digital-strategy", imageId: "individual_inertia" },
        { moduleId: "strategy", groupId: "digital-strategy", imageId: "organizational_inertia_levels" }
      ]
    },
    {
      id: 16,
      type: "multi",
      title: "Hvordan adressere inertia",
      moduleId: "strategy",
      groupId: "digital-strategy",
      points: 2,
      prompt: "Hvilke tiltak passer med forelesningens forslag til hvordan man kan adressere inertia?",
      source: "Fasit: Forelesning 14, slide 35, 'How to address inertia'.",
      options: [
        {
          text: "Awareness, competence building og communication",
          correct: true,
          why: "Riktig: disse er eksplisitt nevnt i forelesningen.",
          whyExtended: ["Inertia må først gjøres synlig og forståelig før den kan endres."],
          whyExtendedImageRefs: [
            { moduleId: "strategy", groupId: "digital-strategy", imageId: "addressing_inertia" }
          ]
        },
        {
          text: "Change management",
          correct: true,
          why: "Riktig: endringsledelse er et eksplisitt tiltak.",
          whyExtended: ["Digital transformation er organisatorisk endring, ikke bare teknisk implementering."]
        },
        {
          text: "Building structures and culture for experimentation and learning",
          correct: true,
          why: "Riktig: eksperimentering og læring motvirker lock-in og status quo.",
          whyExtended: ["Dette kobles også til culture for digitalization: experimentation, learning og room for failure."]
        },
        {
          text: "Running pilot projects that demonstrate gains and reduce perceived risk",
          correct: true,
          why: "Riktig: pilotprosjekter kan redusere opplevd risiko og gjøre gevinster konkrete.",
          whyExtended: ["Dette er særlig relevant når status quo bias og fear of change gjør endring vanskelig."]
        },
        {
          text: "Investing in a more flexible digital foundation",
          correct: true,
          why: "Riktig: en mer fleksibel digital foundation kan redusere teknologisk og strukturell lock-in.",
          whyExtended: ["Teknologisk fleksibilitet kan gjøre det enklere å støtte nye digitale initiativer."]
        },
        {
          text: "Forby lokale eksperimenter og kun beskytte eksisterende rutiner",
          correct: false,
          why: "Galt: dette ville normalt forsterke inertia.",
          whyExtended: ["Forelesningen anbefaler strukturer for experimentation, learning, collaboration og ambidexterity — ikke ren bevaring av status quo."]
        }
      ]
    },
    {
      id: 17,
      type: "multi",
      title: "Leadership i digital transformation",
      moduleId: "strategy",
      groupId: "digital-strategy",
      points: 2,
      prompt: "Hvilke utsagn beskriver lederrollen i digital transformation ifølge forelesningen?",
      source: "Fasit: Forelesning 14, slides 37–38, 'What is the role of leaders?' og trans-functional digital business strategy.",
      options: [
        {
          text: "Leader engagement at all levels er en forutsetning for å lykkes.",
          correct: true,
          why: "Riktig: forelesningen sier eksplisitt at leader engagement at all levels er nødvendig.",
          whyExtended: ["Digital transformation skjer på tvers av funksjoner og nivåer, så ledelse kan ikke isoleres til toppen alene."],
          whyExtendedImageRefs: [
            { moduleId: "strategy", groupId: "digital-strategy", imageId: "leadership_role_digital_transformation" }
          ]
        },
        {
          text: "Ledere må kunne håndtere både technical og organizational changes.",
          correct: true,
          why: "Riktig: forelesningen kobler lederrollen til både tekniske og organisatoriske endringer.",
          whyExtended: ["Dette følger av at digital transformation ikke bare er teknologi, men også kultur, struktur, oppgaver og prosesser."]
        },
        {
          text: "Ledere bør utvikle en kultur preget av flexibility, collaboration, openness, autonomy, learning og experimentation.",
          correct: true,
          why: "Riktig: dette er direkte koblet til lederrollen og culture for digitalization.",
          whyExtended: ["Kulturen skal gjøre organisasjonen mer lærende og endringsdyktig."]
        },
        {
          text: "Ledere må utvikle ambidexterity: exploitation og exploration.",
          correct: true,
          why: "Riktig: forelesningen nevner ambidextrous organization som del av lederrollen.",
          whyExtended: ["Exploitation handler om å utnytte og forbedre eksisterende drift; exploration handler om innovasjon og nye muligheter."]
        },
        {
          text: "Digital strategy bør begrenses til IT-avdelingen fordi digital business strategy ikke er trans-functional.",
          correct: false,
          why: "Galt: forelesningen siterer at digital business strategy kan ses som inherently trans-functional.",
          whyExtended: ["Derfor trengs ledelse på tvers av organisasjonen og involvering av flere grupper."]
        }
      ]
    },
    {
      id: 18,
      type: "dragDrop",
      title: "CDO roles",
      moduleId: "strategy",
      groupId: "digital-strategy",
      points: 2,
      prompt: "Dra hver CDO role til den beste forklaringen.",
      source: "Fasit: Forelesning 14, slide 47, 'Why do we need a CDO?' og slide 48, 'The contribution of the CDO'.",
      cards: [
        { id: "entrepreneur", text: "Entrepreneurs / Digital Innovators" },
        { id: "evangelist", text: "Digital Evangelists / Digital Advocates" },
        { id: "coordinator", text: "Coordinators / Digital Harmonizers" },
        { id: "accelerator", text: "Digital Accelerators" }
      ],
      targets: [
        {
          id: "entrepreneur",
          description: "Driver fram nye digitale muligheter, offerings eller forretningsmessig innovasjon.",
          correctCardId: "entrepreneur",
          correctLabel: "Entrepreneurs / Digital Innovators",
          whyCorrect: "Entrepreneur/innovator-rollen handler om å skape og initiere digital innovasjon.",
          whyWrong: "Denne forklaringen passer best med innovasjonsrollen, ikke harmonisering eller advocacy.",
          whyExtended: ["CDO kan fungere som dedicated change agent i digital transformation."]
        },
        {
          id: "evangelist",
          description: "Skaper forståelse, entusiasme og legitimitet for digitalization på tvers av organisasjonen.",
          correctCardId: "evangelist",
          correctLabel: "Digital Evangelists / Digital Advocates",
          whyCorrect: "Evangelist/advocate-rollen handler om å fremme digital retning og få organisasjonen med.",
          whyWrong: "Dette er mer advocacy og meningsskaping enn teknisk koordinering alene.",
          whyExtended: ["Rollen er viktig fordi digital transformation krever at folk forstår og støtter endringsbehovet."]
        },
        {
          id: "coordinator",
          description: "Koordinerer digitalization efforts og bygger broer mellom business og technology / mellom grupper.",
          correctCardId: "coordinator",
          correctLabel: "Coordinators / Digital Harmonizers",
          whyCorrect: "Coordinator/harmonizer-rollen passer når organisasjonen trenger samordning på tvers.",
          whyWrong: "Denne forklaringen handler om harmonisering og koordinering, ikke primært evangelisering eller hurtig gjennomføring.",
          whyExtended: ["Forelesningen sier CDO kan bidra til å integrate the perspectives of business and technology og build bridges between groups."]
        },
        {
          id: "accelerator",
          description: "Øker tempoet i digital transformation og hjelper organisasjonen å bevege seg raskere fra idé til endring.",
          correctCardId: "accelerator",
          correctLabel: "Digital Accelerators",
          whyCorrect: "Accelerator-rollen handler om å få fart på digital transformation.",
          whyWrong: "Dette handler ikke først og fremst om å definere visjon, men om å akselerere endring.",
          whyExtended: ["Dette kan være viktig i competitive sectors eller når det finnes clear need for central coordination."]
        }
      ],
      whyExtendedImageRefs: [
        { moduleId: "strategy", groupId: "digital-strategy", imageId: "cdo_roles" },
        { moduleId: "strategy", groupId: "digital-strategy", imageId: "cdo_contribution" }
      ]
    },
    {
      id: 19,
      type: "single",
      title: "Hvorfor involvere hele organisasjonen?",
      moduleId: "strategy",
      groupId: "digital-strategy",
      points: 1,
      prompt: "Hvorfor argumenterer forelesningen for å involvere og engasjere hele organisasjonen i digital transformation?",
      source: "Fasit: Forelesning 14, slides 39–44, involvement, cross-functional processes, collaboration challenge og organization as network of groups.",
      options: [
        {
          text: "Fordi digitalization ofte berører cross-functional business processes, synergies, competence og forståelsen av hvorfor endring er nødvendig.",
          correct: true,
          why: "Riktig: dette oppsummerer slide 41 og kobler til trans-functional strategy.",
          whyExtended: [
            "Digitalization endrer ikke bare IT, men prosesser, organisering, samarbeid, beslutninger og kompetansebehov.",
            "Organisasjonen består av grupper med ulike perspektiver, interesser, mål, kulturer og identiteter, noe som gjør tverrfunksjonell involvering krevende men nødvendig.",
            "Hele organisasjonen må derfor forstå både big picture og lokale bidrag."
          ],
          whyExtendedImageRefs: [
            { moduleId: "strategy", groupId: "digital-strategy", imageId: "whole_organization_involvement" },
            { moduleId: "strategy", groupId: "digital-strategy", imageId: "organization_as_network_groups" }
          ]
        },
        {
          text: "Fordi digital transformation bare handler om å få alle ansatte til å bruke samme hardware.",
          correct: false,
          why: "Galt: dette reduserer transformation til teknisk standardisering.",
          whyExtended: ["Forelesningen legger vekt på prosesser, kultur, organisering, kompetanse og verdiskaping."]
        },
        {
          text: "Fordi lokale grupper alltid har identiske mål, kulturer og interesser.",
          correct: false,
          why: "Galt: forelesningen sier det motsatte.",
          whyExtended: ["Organisasjonen beskrives som et network of groups med ofte ulike perspektiver, interesser, mål, kulturer, identiteter og agendaer."]
        },
        {
          text: "Fordi digital strategy fungerer best når ingen har ansvar og alle gjør lokale initiativer uavhengig av hverandre.",
          correct: false,
          why: "Galt: forelesningen fremhever behov for strategy, governance, ansvar og koordinering.",
          whyExtended: ["Lokale initiativer kan bidra til transformation, men uten koordinering kan de også bli fragmenterte."]
        }
      ]
    },
    {
      id: 20,
      type: "single",
      title: "Når kan CDO være særlig viktig?",
      moduleId: "strategy",
      groupId: "digital-strategy",
      points: 1,
      prompt: "En organisasjon opererer i et highly competitive sector og har mange ukoordinerte digitalization efforts på tvers av enheter. Hvilken rolle/organisatorisk løsning peker forelesningen på som særlig relevant?",
      source: "Fasit: Forelesning 14, slides 46–48, CDO, roles og contribution.",
      options: [
        {
          text: "Chief Digital Officer (CDO) som change agent og koordinator for digital transformation",
          correct: true,
          why: "Riktig: forelesningen sier at CDO kan være særlig viktig i competitive sectors og ved behov for central coordination.",
          whyExtended: [
            "CDO kan være digital innovator, advocate, harmonizer og accelerator.",
            "Forelesningen beskriver CDO-bidraget som å integrere business og technology-perspektiver, etablere felles mål, bygge broer mellom grupper og styrke et holistic perspective.",
            "Dette passer spesielt når digitale initiativer må samordnes på tvers av organisasjonen."
          ],
          whyExtendedImageRefs: [
            { moduleId: "strategy", groupId: "digital-strategy", imageId: "cdo_roles" },
            { moduleId: "strategy", groupId: "digital-strategy", imageId: "cdo_contribution" }
          ]
        },
        {
          text: "Avvikle all sentral koordinering slik at hver enhet kan bygge sin egen digital strategy uavhengig.",
          correct: false,
          why: "Galt: caset beskriver clear need for central coordination, ikke mindre koordinering.",
          whyExtended: ["Ukoordinerte tiltak kan gi fragmentering, dobbeltarbeid og svakere felles retning."]
        },
        {
          text: "Erstatte digital strategy med en ren IT procurement plan.",
          correct: false,
          why: "Galt: dette er for snevert og løser ikke behovet for tverrfunksjonell transformation.",
          whyExtended: ["Digital strategy handler om organisatorisk verdiskaping gjennom digitale ressurser, ikke bare anskaffelser."]
        },
        {
          text: "La eksisterende inertia bestemme tempoet for endring.",
          correct: false,
          why: "Galt: organizational inertia er en barriere som må adresseres, ikke en styringsmekanisme.",
          whyExtended: ["Forelesningen foreslår awareness, competence building, communication, change management, pilots og fleksibel digital foundation for å adressere inertia."]
        }
      ]
    }
  ]
};

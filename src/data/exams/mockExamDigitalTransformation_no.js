// src/data/exams/mockExamDigitalTransformation_no.js
export const mockExamDigitalTransformation_no = {
  id: "mock-exam-digital-transformation-no",
  subjectId: "in5431",
  baseId: "mock-exam-digital-transformation",
  lang: "no",
  title: "Øveeksamen: Digital transformation",
  description: "Kort oppgavesett om definisjonen av digital transformation i Danilova-forelesningen.",
  modeLabel: "BEGREPSDRILL",
  estimatedMinutes: "12–18",
  sortOrder: 141,
  questions: [
    {
      id: 1,
      type: "single",
      title: "Hva er digital transformation?",
      moduleId: "strategy",
      groupId: "digital-transformation",
      points: 1,
      prompt: "Hvilket utsagn beskriver best digital transformation i Danilova-forelesningen?",
      source: "Fasit: Forelesning 14, Digital strategy and the digital transformation, slide 'What is a digital transformation'.",
      options: [
        {
          text: "En betydelig organisatorisk endring, drevet eller muliggjort av omfattende bruk av digitale teknologier.",
          correct: true,
          why: "Riktig: definisjonen kobler digital transformation til betydelig organisatorisk endring og omfattende bruk av digitale teknologier.",
          whyExtended: [
            "Poenget er ikke at organisasjonen kjøper mer teknologi.",
            "Endringen kan handle om prosesser, business model eller organizational identity."
          ]
        },
        {
          text: "En teknisk oppgradering av eksisterende IT-systemer uten organisatorisk endring.",
          correct: false,
          why: "Galt: digital transformation krever betydelig organisatorisk endring, ikke bare teknisk oppgradering.",
          whyExtended: [
            "Dette kan være et IT-tiltak, men det treffer ikke definisjonen av digital transformation.",
            "Kane-sitatet sier også at transformation handler om kultur, mennesker, struktur og oppgaver."
          ]
        },
        {
          text: "Å gjøre analoge data digitale uten å endre prosesser eller organisasjon.",
          correct: false,
          why: "Galt: dette ligger nærmere digitization enn digital transformation.",
          whyExtended: [
            "Digitization kan være nyttig, men definisjonen her handler om omfattende organisatorisk endring."
          ]
        },
        {
          text: "En digital strategi som bare beskriver hvilke systemer IT-avdelingen skal kjøpe.",
          correct: false,
          why: "Galt: digital transformation er bredere enn en innkjøpsplan for IT-systemer.",
          whyExtended: [
            "Definisjonen peker på organisatorisk endring, ikke bare valg av teknologi eller leverandør."
          ]
        }
      ],
      whyExtendedImageRefs: [
        "digital_transformation_process"
      ]
    },
    {
      id: 2,
      type: "multi",
      title: "Hva kan digital transformation innebære?",
      moduleId: "strategy",
      groupId: "digital-transformation",
      points: 2,
      prompt: "Marker utsagnene som støttes av definisjonen og Kane-sitatet.",
      source: "Fasit: Forelesning 14, slides 'What is a digital transformation' og Kane-sitatet fra The Technology Fallacy, s. 14.",
      options: [
        {
          text: "Digital transformation kan innebære omfattende process redesign.",
          correct: true,
          why: "Riktig: extensive process redesign står som ett mulig element i definisjonen.",
          whyExtended: [
            "Process redesign betyr at arbeidsflyt og rutiner endres, ikke bare at et system byttes ut."
          ]
        },
        {
          text: "Digital transformation kan innebære business model innovation.",
          correct: true,
          why: "Riktig: business model innovation står som ett mulig element i definisjonen.",
          whyExtended: [
            "Her handler endringen om hvordan virksomheten skaper, leverer eller fanger verdi."
          ]
        },
        {
          text: "Digital transformation kan innebære endret organizational identity.",
          correct: true,
          why: "Riktig: definisjonen nevner changed or transformed organizational identity.",
          whyExtended: [
            "Dette peker på at transformasjonen kan endre hva organisasjonen oppfatter seg selv som."
          ]
        },
        {
          text: "Digital transformation handler bare om å implementere flere og bedre teknologier.",
          correct: false,
          why: "Galt: Kane-sitatet sier eksplisitt at det ikke bare handler om flere og bedre teknologier.",
          whyExtended: [
            "Teknologi er en driver eller muliggjører, men transformasjonen ligger i organisasjonen."
          ]
        },
        {
          text: "Digital transformation innebærer å align'e culture, people, structure and tasks.",
          correct: true,
          why: "Riktig: Kane-sitatet sier at digital transformation innebærer alignment av culture, people, structure and tasks.",
          whyExtended: [
            "Dette forklarer hvorfor digital transformation er et ledelses- og organisasjonsspørsmål."
          ]
        },
        {
          text: "Digital transformation kan gjennomføres uten å berøre mennesker, oppgaver eller struktur.",
          correct: false,
          why: "Galt: dette bryter med Kane-sitatet om culture, people, structure and tasks.",
          whyExtended: [
            "Hvis endringen ikke berører organisasjonen, er det vanskelig å kalle det digital transformation i denne definisjonen."
          ]
        }
      ],
      whyExtendedImageRefs: [
        "digital_transformation_process"
      ]
    },
    {
      id: 3,
      type: "fill",
      title: "Definisjon av digital transformation",
      moduleId: "strategy",
      groupId: "digital-transformation",
      points: 1,
      prompt: "Digital transformation er en betydelig organisatorisk endring, drevet eller muliggjort av omfattende bruk av ________ teknologier.",
      answers: ["digitale", "digital", "digital technologies", "digitale teknologier"],
      answerKey: "digitale teknologier / digital technologies",
      source: "Fasit: Forelesning 14, slide 'What is a digital transformation'.",
      whyCorrect: "Riktig: definisjonen sier at endringen er driven or enabled by the extensive use of digital technologies.",
      whyWrong: "Galt hvis svaret ikke peker på digitale teknologier. Teknologi er driveren eller muliggjøreren i definisjonen.",
      whyExtended: [
        "Legg merke til at definisjonen også krever betydelig organisatorisk endring.",
        "Omfattende teknologibruk alene er derfor ikke nok."
      ],
      whyExtendedImageRefs: [
        "digital_transformation_process"
      ]
    },
    {
      id: 4,
      type: "dragDrop",
      title: "Begreper i definisjonen",
      moduleId: "strategy",
      groupId: "digital-transformation",
      points: 2,
      prompt: "Dra hvert begrep til riktig beskrivelse.",
      source: "Fasit: Forelesning 14, slides 'What is a digital transformation' og 'Digital transformation can be described as a process'.",
      cards: [
        { id: "digital-transformation", text: "Digital transformation" },
        { id: "process-redesign", text: "Process redesign" },
        { id: "business-model-innovation", text: "Business model innovation" },
        { id: "organizational-identity", text: "Organizational identity" },
        { id: "digital-vision-strategy", text: "Digital vision & strategy" }
      ],
      targets: [
        {
          id: "digital-transformation",
          description: "Betydelig organisatorisk endring drevet eller muliggjort av omfattende bruk av digitale teknologier.",
          correctCardId: "digital-transformation",
          correctLabel: "Digital transformation",
          whyCorrect: "Riktig: dette er selve definisjonen av digital transformation i forelesningen.",
          whyWrong: "Denne beskrivelsen handler om hele transformasjonen, ikke bare ett mulig element i den.",
          whyExtended: [
            "Definisjonen kombinerer organisatorisk endring og omfattende bruk av digital technology."
          ]
        },
        {
          id: "process-redesign",
          description: "Omfattende endring av arbeidsprosesser og måten arbeidet organiseres på.",
          correctCardId: "process-redesign",
          correctLabel: "Process redesign",
          whyCorrect: "Riktig: extensive process redesign er ett av elementene digital transformation kan innebære.",
          whyWrong: "Denne beskrivelsen handler om prosesser, ikke business model eller organizational identity.",
          whyExtended: [
            "Process redesign peker på endringer i arbeidsflyt, rutiner og oppgaver."
          ]
        },
        {
          id: "business-model-innovation",
          description: "Endring i hvordan virksomheten skaper, leverer eller fanger verdi.",
          correctCardId: "business-model-innovation",
          correctLabel: "Business model innovation",
          whyCorrect: "Riktig: business model innovation er ett av elementene digital transformation kan innebære.",
          whyWrong: "Denne beskrivelsen handler om verdiskaping og forretningsmodell, ikke bare interne prosesser.",
          whyExtended: [
            "I digital transformation kan teknologi muliggjøre nye verdiforslag eller nye måter å tjene penger på."
          ]
        },
        {
          id: "organizational-identity",
          description: "Endring i hva organisasjonen oppfatter seg selv som.",
          correctCardId: "organizational-identity",
          correctLabel: "Organizational identity",
          whyCorrect: "Riktig: definisjonen nevner changed or transformed organizational identity.",
          whyWrong: "Denne beskrivelsen handler om identitet, ikke om en digitaliseringsaktivitet eller et IT-prosjekt alene.",
          whyExtended: [
            "En transformasjon kan endre organisasjonens selvforståelse, rolle og måte å arbeide på."
          ]
        },
        {
          id: "digital-vision-strategy",
          description: "Retning for endringen etter at organisasjonen har erkjent at change is necessary.",
          correctCardId: "digital-vision-strategy",
          correctLabel: "Digital vision & strategy",
          whyCorrect: "Riktig: forelesningen beskriver digital vision & strategy som del av prosessen for digital transformation.",
          whyWrong: "Denne beskrivelsen handler om retning og strategi i prosessen, ikke selve definisjonen alene.",
          whyExtended: [
            "Digital vision & strategy kommer etter erkjennelsen av at endring er nødvendig."
          ]
        }
      ],
      whyExtendedImageRefs: [
        "digital_transformation_process"
      ]
    },
    {
      id: 5,
      type: "drag-categorize",
      title: "Elementer i digital transformation",
      moduleId: "strategy",
      groupId: "digital-transformation",
      points: 2,
      prompt: "Dra hvert eksempel til riktig element i definisjonen.",
      source: "Fasit: Forelesning 14, slide 'What is a digital transformation'.",
      items: [
        { id: "redesign-order-flow", label: "Endre hele ordreprosessen fra avdelingsvis arbeid til felles digital flyt" },
        { id: "redesign-tasks", label: "Endre oppgaver og ansvar fordi arbeidsflyten automatiseres" },
        { id: "subscription-model", label: "Gå fra produktsalg til digital subscription model" },
        { id: "platform-revenue", label: "Skape inntekter gjennom en digital platform med partnere" },
        { id: "from-retailer-to-service", label: "Se virksomheten som digital tjenesteleverandør i stedet for ren vareleverandør" },
        { id: "new-self-understanding", label: "Endre organisasjonens selvforståelse etter digital satsing" }
      ],
      categories: [
        { id: "process-redesign", label: "Extensive process redesign" },
        { id: "business-model-innovation", label: "Business model innovation" },
        { id: "organizational-identity", label: "Changed organizational identity" }
      ],
      correctAnswer: {
        "process-redesign": ["redesign-order-flow", "redesign-tasks"],
        "business-model-innovation": ["subscription-model", "platform-revenue"],
        "organizational-identity": ["from-retailer-to-service", "new-self-understanding"]
      },
      itemFeedback: {
        "redesign-order-flow": {
          whyCorrect: "Riktig: eksempelet handler om omfattende endring av arbeidsprosessen.",
          whyWrong: "Dette handler først om process redesign, ikke om revenue model eller identitet.",
          whyExtended: [
            "Process redesign er ett av elementene digital transformation kan innebære."
          ]
        },
        "redesign-tasks": {
          whyCorrect: "Riktig: når oppgaver og ansvar endres på grunn av ny arbeidsflyt, er dette process redesign.",
          whyWrong: "Dette handler om hvordan arbeidet gjøres, ikke om ny business model.",
          whyExtended: [
            "Kane-sitatet kobler også transformation til tasks og structure."
          ]
        },
        "subscription-model": {
          whyCorrect: "Riktig: subscription model endrer hvordan virksomheten fanger verdi.",
          whyWrong: "Dette handler om business model innovation, ikke bare prosessendring.",
          whyExtended: [
            "Business model innovation er ett av elementene forelesningen nevner."
          ]
        },
        "platform-revenue": {
          whyCorrect: "Riktig: inntekter gjennom digital platform med partnere handler om business model innovation.",
          whyWrong: "Dette handler om verdiskaping og inntektsmodell, ikke primært organizational identity.",
          whyExtended: [
            "Digital teknologi kan åpne for nye måter å skape og fange verdi på."
          ]
        },
        "from-retailer-to-service": {
          whyCorrect: "Riktig: dette peker på endret organizational identity.",
          whyWrong: "Eksempelet handler om hva organisasjonen oppfatter seg som, ikke bare om en ny prosess.",
          whyExtended: [
            "Changed organizational identity er ett av elementene digital transformation kan innebære."
          ]
        },
        "new-self-understanding": {
          whyCorrect: "Riktig: endret selvforståelse er kjernen i organizational identity.",
          whyWrong: "Dette handler om identitet, ikke om process redesign eller business model alene.",
          whyExtended: [
            "Organizational identity kan endres når digitale teknologier endrer virksomhetens rolle og arbeid."
          ]
        }
      },
      whyExtendedImageRefs: [
        "digital_transformation_process"
      ]
    },
    {
      id: 6,
      type: "matrix-placement",
      title: "To kriterier i definisjonen",
      moduleId: "strategy",
      groupId: "digital-transformation",
      points: 3,
      prompt: "Plasser casene etter de to kriteriene i definisjonen av digital transformation.",
      source: "Fasit: Forelesning 14, slide 'What is a digital transformation'. Matrisen bruker de to kriteriene betydelig organisatorisk endring og omfattende bruk av digitale teknologier.",
      matrix: {
        xAxis: {
          label: "Bruk av digitale teknologier",
          lowLabel: "Begrenset",
          highLabel: "Omfattende"
        },
        yAxis: {
          label: "Organisatorisk endring",
          lowLabel: "Lav",
          highLabel: "Betydelig"
        },
        quadrants: [
          {
            id: "low-change-low-tech",
            x: "low",
            y: "low",
            title: "Lav endring / Begrenset teknologibruk",
            description: "Mindre forbedring uten omfattende digital technology og uten organisatorisk transformasjon"
          },
          {
            id: "low-change-high-tech",
            x: "high",
            y: "low",
            title: "Lav endring / Omfattende teknologibruk",
            description: "Mye teknologi, men lite endring i kultur, struktur, mennesker eller oppgaver"
          },
          {
            id: "high-change-low-tech",
            x: "low",
            y: "high",
            title: "Betydelig endring / Begrenset teknologibruk",
            description: "Stor organisatorisk endring, men ikke primært drevet eller muliggjort av digital technology"
          },
          {
            id: "high-change-high-tech",
            x: "high",
            y: "high",
            title: "Betydelig endring / Omfattende teknologibruk",
            description: "Digital transformation etter definisjonen"
          }
        ]
      },
      items: [
        {
          id: "scan-archive",
          label: "Skanner arkivet og lagrer filene som PDF. Arbeidsmåten er ellers uendret.",
          correctQuadrantId: "low-change-low-tech",
          whyCorrect: "Riktig: caset har lav organisatorisk endring og begrenset digital teknologibruk.",
          whyWrong: "Galt: dette er ikke digital transformation fordi organisasjonen nesten ikke endres.",
          whyExtended: [
            "Caset ligger nærmere digitization enn digital transformation."
          ]
        },
        {
          id: "new-tools-same-work",
          label: "Innfører flere nye digitale systemer, men beholder samme struktur, ansvar og arbeidsprosesser.",
          correctQuadrantId: "low-change-high-tech",
          whyCorrect: "Riktig: caset har omfattende teknologibruk, men lav organisatorisk endring.",
          whyWrong: "Galt: mye teknologi alene er ikke nok til digital transformation i denne definisjonen.",
          whyExtended: [
            "Kane-sitatet sier at transformation også handler om culture, people, structure and tasks."
          ]
        },
        {
          id: "reorg-no-digital-driver",
          label: "Gjennomfører en stor omorganisering, men endringen er ikke drevet eller muliggjort av digitale teknologier.",
          correctQuadrantId: "high-change-low-tech",
          whyCorrect: "Riktig: caset har betydelig organisatorisk endring, men begrenset digital teknologibruk.",
          whyWrong: "Galt: definisjonen krever at endringen er driven or enabled by digital technologies.",
          whyExtended: [
            "Ikke all organizational change er digital transformation."
          ]
        },
        {
          id: "new-digital-business",
          label: "Bruker digitale teknologier til å redesigne prosesser, endre business model og etablere nye roller.",
          correctQuadrantId: "high-change-high-tech",
          whyCorrect: "Riktig: caset kombinerer omfattende digital teknologibruk med betydelig organisatorisk endring.",
          whyWrong: "Galt: dette treffer begge kriteriene i definisjonen av digital transformation.",
          whyExtended: [
            "Caset inkluderer process redesign, business model innovation og endringer i structure and tasks."
          ]
        }
      ],
      whyExtendedImageRefs: [
        "digital_transformation_process"
      ]
    },
    {
      id: 7,
      type: "SequenceOrder",
      title: "Digital transformation som prosess",
      moduleId: "strategy",
      groupId: "digital-transformation",
      points: 2,
      prompt: "Sett elementene i samme rekkefølge som prosessbeskrivelsen i forelesningen.",
      source: "Fasit: Forelesning 14, slide 'Digital transformation can be described as a process'.",
      items: [
        { id: "realization", label: "Triggered by a realization that change is necessary" },
        { id: "vision-strategy", label: "Digital vision & strategy" },
        { id: "digitalization-projects", label: "Digitalization projects" },
        { id: "investment", label: "Investment in digital technology and competence" },
        { id: "cdo-unit", label: "Chief Digital Officer and/or a digital unit" }
      ],
      correctOrder: [
        "realization",
        "vision-strategy",
        "digitalization-projects",
        "investment",
        "cdo-unit"
      ],
      itemFeedback: {
        realization: {
          whyCorrect: "Riktig: prosessen starter med en erkjennelse av at change is necessary.",
          whyWrong: "Denne skal først. Forelesningen beskriver prosessen som triggered by a realization that change is necessary.",
          whyExtended: [
            "Uten erkjennelsen av behovet for endring blir digital transformation lett redusert til enkeltprosjekter."
          ]
        },
        "vision-strategy": {
          whyCorrect: "Riktig: digital vision & strategy kommer etter erkjennelsen av behovet for endring.",
          whyWrong: "Digital vision & strategy kommer før konkrete digitalization projects i slide-rekkefølgen.",
          whyExtended: [
            "Vision and strategy gir retning for hvilke endringer og prosjekter organisasjonen skal gjennomføre."
          ]
        },
        "digitalization-projects": {
          whyCorrect: "Riktig: digitalization projects følger etter digital vision & strategy i prosessbeskrivelsen.",
          whyWrong: "Digitalization projects kommer etter at retning er satt gjennom digital vision & strategy.",
          whyExtended: [
            "Prosjektene er konkrete tiltak som skal realisere deler av transformasjonen."
          ]
        },
        investment: {
          whyCorrect: "Riktig: investment in digital technology and competence står etter digitalization projects i slide-rekkefølgen.",
          whyWrong: "Dette elementet skal plasseres etter digitalization projects i forelesningens liste.",
          whyExtended: [
            "Investeringene gjelder både digital technology og competence."
          ]
        },
        "cdo-unit": {
          whyCorrect: "Riktig: Chief Digital Officer and/or a digital unit står sist i prosesslisten på sliden.",
          whyWrong: "Dette elementet står sist i forelesningens prosessbeskrivelse.",
          whyExtended: [
            "CDO eller digital unit peker på organisering av digital transformation."
          ]
        }
      },
      whyExtendedImageRefs: [
        "digital_transformation_process"
      ]
    }
  ]
};

//src/data/exams/mockExamDragCategorize_no.js
export const mockExamDragCategorize_no = {
  id: "mock-exam-drag-categorize-no",
  subjectId: "in5431",
  baseId: "mock-exam-drag-categorize",
  lang: "no",
  title: "Øveeksamen: Drag-categorize test",
  description: "Fire korte testoppgaver for den nye dra-til-kategori-oppgavetypen: CIO Toolbox, D4D-byggeklosser, IT governance og transformation theory.",
  questions: [
    {
      id: 1,
      type: "drag-categorize",
      title: "CIO Toolbox-kategorier",
      points: 2,
      prompt: "Dra hvert verktøy til riktig kategori i CIO Toolbox.",
      source: "Fasit: IN5431, CIO Toolbox, forelesning 3–6.",
      items: [
        { id: "business-case", label: "Business case" },
        { id: "alternative-analysis", label: "Alternative analysis" },
        { id: "design-thinking", label: "Design thinking" },
        { id: "it-architecture", label: "IT Architecture" },
        { id: "projects", label: "Projects" },
        { id: "product-teams", label: "Product teams and agile methods" },
        { id: "it-governance", label: "IT governance" }
      ],
      categories: [
        { id: "valg", label: "VALG" },
        { id: "utforskning", label: "UTFORSKNING / INNOVASJON" },
        { id: "styring", label: "STYRING" },
        { id: "organisering", label: "ORGANISERING" }
      ],
      correctAnswer: {
        valg: ["business-case", "alternative-analysis"],
        utforskning: ["design-thinking"],
        styring: ["it-architecture", "it-governance"],
        organisering: ["projects", "product-teams"]
      },
      itemFeedback: {
        "business-case": {
          whyCorrect: "Business case hører til VALG fordi det brukes til prioritering av digitale tjenester og finansiering.",
          whyWrong: "Business case er et valgverktøy: det vurderer nytte, kostnad, timing og risiko.",
          whyExtended: [
            "Det er ikke et organiseringsverktøy, men et beslutningsgrunnlag."
          ]
        },
        "alternative-analysis": {
          whyCorrect: "Alternative analysis hører til VALG fordi det strukturerer valg mellom alternativer, leverandører eller produkter.",
          whyWrong: "Alternative analysis handler om å forstå situasjonen, lage alternativer og evaluere dem.",
          whyExtended: [
            "Business case kan brukes som én evalueringsmetode inni alternativanalysen."
          ]
        },
        "design-thinking": {
          whyCorrect: "Design thinking hører til UTFORSKNING / INNOVASJON fordi det brukes når problemet er uklart.",
          whyWrong: "Design thinking er en eksplorativ metode, ikke et styrings- eller organiseringsverktøy.",
          whyExtended: [
            "Typiske praksiser er brukerinnsikt, problem-reframing, co-design, prototyping og testing."
          ]
        },
        "it-architecture": {
          whyCorrect: "IT Architecture hører til STYRING fordi det analyserer og strukturerer prosesser, systemer og IT-porteføljen.",
          whyWrong: "IT Architecture handler om struktur og styring av IT-porteføljen, ikke om å organisere utviklingsteam.",
          whyExtended: [
            "Relevante begreper er operating model, BPMN, enterprise architecture og TOGAF."
          ]
        },
        "projects": {
          whyCorrect: "Projects hører til ORGANISERING fordi prosjekter er midlertidige organisasjoner for å levere bestemte resultater.",
          whyWrong: "Prosjekter brukes til å planlegge og organisere utviklingsarbeid.",
          whyExtended: [
            "PRINCE2 er et eksempel på et prosjektstyringsrammeverk."
          ]
        },
        "product-teams": {
          whyCorrect: "Product teams and agile methods hører til ORGANISERING fordi de organiserer kontinuerlig utvikling og drift.",
          whyWrong: "Produktteam handler om varig eierskap, kontinuerlig læring og utvikling, ikke om beslutningsanalyse.",
          whyExtended: [
            "Scrum og SAFe er eksempler på smidige rammeverk."
          ]
        },
        "it-governance": {
          whyCorrect: "IT governance hører til STYRING fordi det fordeler beslutningsrettigheter og ansvar for IT-resultater.",
          whyWrong: "IT governance handler om hvem som tar IT-beslutninger og hvem som holdes ansvarlig.",
          whyExtended: [
            "Weill & Ross beskriver beslutningsdomener, arketyper og en governance matrix."
          ]
        }
      }
    },
    {
      id: 2,
      type: "drag-categorize",
      title: "Designed for Digital-byggeklosser",
      points: 2,
      prompt: "Dra hver definisjon til riktig D4D-byggekloss.",
      source: "Fasit: IN5431, Designed for Digital, fem byggeklosser.",
      items: [
        { id: "d4d-def-ob", label: "Standardiserte og integrerte systemer, prosesser og data for kjerneoperasjoner" },
        { id: "d4d-def-sci", label: "Organisasjonslæring om hva kunder vil betale for" },
        { id: "d4d-def-dp", label: "Gjenbrukbare business-, data- og infrastrukturkomponenter" },
        { id: "d4d-def-af", label: "Ansvarsfordeling som balanserer autonomi og alignment" },
        { id: "d4d-def-exdp", label: "Digitale komponenter som åpnes for eksterne parter" }
      ],
      categories: [
        { id: "operational-backbone", label: "Operational Backbone" },
        { id: "shared-customer-insights", label: "Shared Customer Insights" },
        { id: "digital-platform", label: "Digital Platform" },
        { id: "accountability-framework", label: "Accountability Framework" },
        { id: "external-developer-platform", label: "External Developer Platform" }
      ],
      correctAnswer: {
        "operational-backbone": ["d4d-def-ob"],
        "shared-customer-insights": ["d4d-def-sci"],
        "digital-platform": ["d4d-def-dp"],
        "accountability-framework": ["d4d-def-af"],
        "external-developer-platform": ["d4d-def-exdp"]
      },
      itemFeedback: {
        "d4d-def-ob": {
          whyCorrect: "Operational Backbone er ryggraden av standardiserte og integrerte systemer, prosesser og data.",
          whyWrong: "Dette beskriver stabil kjerneoperasjon, ikke kundeinnsikt eller eksternt økosystem.",
          whyExtended: [
            "OB skal støtte effektiv og pålitelig drift av selskapets core operations."
          ]
        },
        "d4d-def-sci": {
          whyCorrect: "Shared Customer Insights handler om organisasjonslæring om kunder og digitale muligheter.",
          whyWrong: "Dette handler om kundeinnsikt, ikke tekniske komponenter eller driftssystemer.",
          whyExtended: [
            "Poenget er å forstå hva kunder vil betale for, og hvordan digital teknologi kan levere på behovene."
          ]
        },
        "d4d-def-dp": {
          whyCorrect: "Digital Platform er et repositorium av gjenbrukbare komponenter for digitale tilbud.",
          whyWrong: "Dette beskriver en intern digital plattform, ikke operational backbone eller external developer platform.",
          whyExtended: [
            "Komponentene kan være business-, data- og infrastrukturkomponenter."
          ]
        },
        "d4d-def-af": {
          whyCorrect: "Accountability Framework fordeler ansvar og balanserer autonomi og alignment.",
          whyWrong: "Dette handler om beslutnings- og ansvarsstruktur, ikke systemintegrasjon eller kundeinnsikt.",
          whyExtended: [
            "AF skal gjøre innovasjon mulig uten at organisasjonen mister samordning."
          ]
        },
        "d4d-def-exdp": {
          whyCorrect: "External Developer Platform åpner digitale komponenter for eksterne partnere.",
          whyWrong: "Dette handler om eksterne parter, ikke bare intern gjenbruk av komponenter.",
          whyExtended: [
            "API-er og boundary resources er typiske mekanismer for ExDP."
          ]
        }
      }
    },
    {
      id: 3,
      type: "drag-categorize",
      title: "IT governance: beslutningsdomener",
      points: 2,
      prompt: "Dra hvert spørsmål til riktig IT governance-beslutningsdomene.",
      source: "Fasit: IN5431, IT governance, Weill & Ross beslutningsdomener.",
      items: [
        { id: "it-principles-q", label: "Hva er IT sin rolle i virksomheten?" },
        { id: "it-architecture-q", label: "Hvilke kjerneprosesser skal standardiseres og integreres?" },
        { id: "it-infrastructure-q", label: "Hvilke felles IT-tjenester skal deles på tvers?" },
        { id: "business-app-q", label: "Hvilke applikasjoner trenger forretningsenhetene?" },
        { id: "it-investment-q", label: "Hvilke IT-initiativer skal finansieres og prioriteres?" }
      ],
      categories: [
        { id: "it-principles", label: "IT Principles" },
        { id: "it-architecture", label: "IT Architecture" },
        { id: "it-infrastructure", label: "IT Infrastructure" },
        { id: "business-application-needs", label: "Business Application Needs" },
        { id: "it-investment", label: "IT Investment" }
      ],
      correctAnswer: {
        "it-principles": ["it-principles-q"],
        "it-architecture": ["it-architecture-q"],
        "it-infrastructure": ["it-infrastructure-q"],
        "business-application-needs": ["business-app-q"],
        "it-investment": ["it-investment-q"]
      },
      itemFeedback: {
        "it-principles-q": {
          whyCorrect: "IT Principles handler om overordnede prinsipper for hvordan IT skal støtte virksomheten.",
          whyWrong: "Spørsmålet er overordnet og strategisk, derfor passer det ikke som applikasjons- eller infrastrukturbehov.",
          whyExtended: [
            "Dette domenet oversetter forretningsprinsipper til IT-prinsipper."
          ]
        },
        "it-architecture-q": {
          whyCorrect: "IT Architecture handler om kjerneprosesser, data, integrasjon og standardisering.",
          whyWrong: "Standardisering og integrasjon av kjerneprosesser er arkitekturspørsmål.",
          whyExtended: [
            "Dette domenet definerer logikken for data, prosesser og tekniske kapabiliteter på tvers."
          ]
        },
        "it-infrastructure-q": {
          whyCorrect: "IT Infrastructure handler om felles tekniske tjenester og infrastrukturkapabiliteter.",
          whyWrong: "Delte IT-tjenester er infrastrukturspørsmål, ikke investeringsprioritering alene.",
          whyExtended: [
            "Eksempler kan være nettverk, identitet, sikkerhet og felles plattformtjenester."
          ]
        },
        "business-app-q": {
          whyCorrect: "Business Application Needs handler om hvilke applikasjoner forretningsenhetene trenger.",
          whyWrong: "Dette spørsmålet starter i forretningsenhetenes behov, ikke i overordnet arkitektur eller prinsipper.",
          whyExtended: [
            "Domenet avgjør behov for nye eller endrede business applications."
          ]
        },
        "it-investment-q": {
          whyCorrect: "IT Investment handler om prioritering og finansiering av IT-initiativer.",
          whyWrong: "Når spørsmålet er hva som skal finansieres, er det et investeringsdomene.",
          whyExtended: [
            "Dette domenet avgjør hvilke initiativer som får ressurser."
          ]
        }
      }
    },
    {
      id: 4,
      type: "drag-categorize",
      title: "D4D: transformation theory",
      points: 2,
      prompt: "Dra hvert element til riktig transformasjonsområde i Designed for Digital.",
      source: "Fasit: IN5431, Designed for Digital summary, transformation theory.",
      items: [
        { id: "new-value-propositions", label: "Nye digitale verdiforslag" },
        { id: "operational-backbone-item", label: "Operational Backbone" },
        { id: "digital-platform-item", label: "Digital Platform" },
        { id: "digital-offerings-item", label: "Digital Offerings" },
        { id: "shared-customer-insight-item", label: "Shared Customer Insight" },
        { id: "accountability-framework-item", label: "Accountability Framework" }
      ],
      categories: [
        { id: "business-transformation", label: "Business Transformation" },
        { id: "architecture-transformation", label: "Architecture Transformation" },
        { id: "governance-transformation", label: "Governance Transformation" }
      ],
      correctAnswer: {
        "business-transformation": ["new-value-propositions"],
        "architecture-transformation": ["operational-backbone-item", "digital-platform-item", "digital-offerings-item"],
        "governance-transformation": ["shared-customer-insight-item", "accountability-framework-item"]
      },
      itemFeedback: {
        "new-value-propositions": {
          whyCorrect: "Business Transformation handler om ny verdiskaping gjennom digitale verdiforslag.",
          whyWrong: "Nye verdiforslag handler om forretningsmessig transformasjon, ikke primært arkitektur eller governance.",
          whyExtended: [
            "Dette er den delen som endrer hvordan virksomheten skaper verdi."
          ]
        },
        "operational-backbone-item": {
          whyCorrect: "Operational Backbone hører til Architecture Transformation.",
          whyWrong: "OB er en arkitekturmessig byggekloss for standardisering og integrasjon.",
          whyExtended: [
            "Den gir en stabil struktur for data, prosesser og systemer."
          ]
        },
        "digital-platform-item": {
          whyCorrect: "Digital Platform hører til Architecture Transformation fordi den består av gjenbrukbare digitale komponenter.",
          whyWrong: "Digital Platform er arkitektur for komponentgjenbruk og raske digitale tilbud.",
          whyExtended: [
            "Den gjør det mulig å konfigurere nye digitale tilbud raskere."
          ]
        },
        "digital-offerings-item": {
          whyCorrect: "Digital Offerings hører til Architecture Transformation i denne modellen.",
          whyWrong: "Digital offerings er konkrete løsninger som bygges på arkitekturen og plattformen.",
          whyExtended: [
            "De kobler kundeverdi med digitale kapabiliteter."
          ]
        },
        "shared-customer-insight-item": {
          whyCorrect: "Shared Customer Insight hører til Governance Transformation fordi organisasjonen må lære og styre etter kundeinnsikt.",
          whyWrong: "Kundeinnsikt handler om organisatorisk læring og prioritering, ikke bare teknisk arkitektur.",
          whyExtended: [
            "Det påvirker hvilke eksperimenter og digitale tilbud organisasjonen bør satse på."
          ]
        },
        "accountability-framework-item": {
          whyCorrect: "Accountability Framework hører til Governance Transformation fordi det fordeler ansvar og beslutningsrettigheter.",
          whyWrong: "AF handler om hvem som eier komponenter og digitale tilbud, og hvordan autonomi balanseres med alignment.",
          whyExtended: [
            "Governance handler her om å muliggjøre innovasjon uten kaos."
          ]
        }
      }
    },
    {
      id: 5,
      type: "matrix-placement",
      title: "Operating model matrix",
      points: 3,
      prompt: "Dra hver operasjonsmodell til riktig kvadrant.",
      source: "Fasit: IN5431, CIO Toolbox, forelesning 3–6.",
      matrix: {
        xAxis: {
          label: "Forretningsprosessintegrasjon",
          lowLabel: "Lav",
          highLabel: "Høy"
        },
        yAxis: {
          label: "Prosessstandardisering",
          lowLabel: "Lav",
          highLabel: "Høy"
        },
        quadrants: [
          {
            id: "high-standardization-low-integration",
            title: "Høy standardisering / Lav integrasjon",
            description: "Standardiserte, begrenset ende-til-ende prosessintegrering"
          },
          {
            id: "high-standardization-high-integration",
            title: "Høy standardisering / Høy integrasjon",
            description: "Fullt integrert og standardisert operasjonsmodell"
          },
          {
            id: "low-standardization-low-integration",
            title: "Lav standardisering / Lav integrasjon",
            description: "Lokal autonomi og variasjon"
          },
          {
            id: "low-standardization-high-integration",
            title: "Lav standardisering / Høy integrasjon",
            description: "Tilpassede prosesser med lokal tilpasning og fleksibilitet"
          }
        ]
      },
      items: [
        {
          id: "replication",
          label: "Replication",
          correctQuadrantId: "high-standardization-low-integration",
          why: "Replication har høy standardisering, men lav integrasjon."
        },
        {
          id: "unification",
          label: "Unification",
          correctQuadrantId: "high-standardization-high-integration",
          why: "Unification har både høy standardisering og høy integrasjon."
        },
        {
          id: "diversification",
          label: "Diversification",
          correctQuadrantId: "low-standardization-low-integration",
          why: "Diversification har lav standardisering og lav integrasjon."
        },
        {
          id: "coordination",
          label: "Coordination",
          correctQuadrantId: "low-standardization-high-integration",
          why: "Coordination har høy integrasjon, men lavere standardisering."
        }
      ]
    }
  ]
};

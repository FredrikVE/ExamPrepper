// src/data/exams/mockExam3_no.js
export const mockExam3_no = {
  id: "mock-exam-3-no",
  subjectId: "in5431",
  baseId: "mock-exam-3",
  lang: "no",
  title: "Øveeksamen 3: Case og vanskelige skiller",
  description: "Oppgaver som trener forvekslinger og anvendelse: PRINCE2, alternative evalueringsteknikker, arkitekturperspektiver, strategisk kontekst, digitaliseringskultur, D4D-detaljer og bærekraftsrammeverk.",
  modeLabel: "CASE OG SKILLE",
  estimatedMinutes: "45–60",
  sortOrder: 30,
  questions: [
    {
      id: 1,
      type: "multi",
      title: "Strategiprosessens handlingsplan",
      points: 1,
      moduleId: "strategy",
      groupId: "action-plan",
      prompt: "Marker elementene som ifølge forelesningen bør inngå i en fungerende action plan etter en strategiprosess.",
      source: "Fasit: Forelesning 4, slide 'Recall from our lecture on strategy that the result of a strategy process is an action plan'.",
      options: [
        {
          text: "Aktiviteter for å endre eller utvikle dagens drift slik at strategiske mål kan nås.",
          correct: true,
          why: "Riktig: handlingsplanen må konkretisere hvilke aktiviteter som skal endre eller utvikle organisasjonen.",
          whyExtended: [
            "Forelesningen lister dette som første punkt i action plan: activities to change or develop the current operation to meet strategic goals.",
            "Uten konkrete aktiviteter blir strategien bare en intensjon, ikke noe som kan gjennomføres.",
            "Dette knytter strategi til faktisk ledelsesarbeid: prioriterte tiltak må settes i gang for å oppnå ønskede resultater."
          ],
          whyExtendedImageRefs: [
            "strategy_action_plan_model"
          ]
        },
        {
          text: "Tildelt ansvar for aktivitetene.",
          correct: true,
          why: "Riktig: ansvar må fordeles for at planen skal kunne følges opp.",
          whyExtended: [
            "Forelesningen lister 'assigned responsibility for these activities' som et krav til action plan.",
            "Dette henger sammen med accountability: noen må kunne holdes ansvarlig for fremdrift og resultat.",
            "Uten ansvarliggjøring blir det vanskelig å vite hvem som skal ta beslutninger, eskalere problemer eller levere."
          ],
          whyExtendedImageRefs: [
            "strategy_action_plan_model"
          ]
        },
        {
          text: "Forventet rekkefølge og tidsramme for gjennomføring, altså et roadmap.",
          correct: true,
          why: "Riktig: et roadmap beskriver når og i hvilken rekkefølge tiltakene skal utføres.",
          whyExtended: [
            "Forelesningen formulerer dette som 'expected ordering and timeframe for executing the activities aka roadmap'.",
            "Roadmapet gjør planen operasjonell og hjelper organisasjonen å prioritere over tid.",
            "Dette er særlig viktig når tiltakene er avhengige av hverandre, for eksempel når et operasjonelt fundament må forbedres før nye digitale tilbud kan skaleres."
          ],
          whyExtendedImageRefs: [
            "strategy_action_plan_model"
          ]
        },
        {
          text: "Estimater og budsjett.",
          correct: true,
          why: "Riktig: planlagt endring krever ressurs- og kostnadsestimater.",
          whyExtended: [
            "Forelesningen lister 'estimates/budgets' som et eget punkt i handlingsplanen.",
            "Estimatene gjør det mulig å prioritere mellom tiltak og vurdere om organisasjonen har kapasitet.",
            "Dette kobler strategi til CIO toolbox-verktøy som business case, alternative analysis og prosjektplanlegging."
          ],
          whyExtendedImageRefs: [
            "strategy_action_plan_model"
          ]
        },
        {
          text: "En garanti om at alle detaljer er fastlåst før implementering starter.",
          correct: false,
          why: "Galt: forelesningen sier at detaljnivået kan variere, men at grunnkravene til en fungerende plan består.",
          whyExtended: [
            "Forelesningen understreker at moderne organisasjoner diskuterer hvor detaljert planleggingen bør være.",
            "Aktiviteter kan være detaljert på forhånd eller bare skissert, avhengig av kontekst og usikkerhet.",
            "Poenget er ikke å låse alle detaljer, men å ha nok struktur til å kunne handle, prioritere og følge opp."
          ]
        }
      ]
    },
    {
      id: 2,
      type: "fill",
      title: "Roadmap",
      points: 1,
      prompt: "I en action plan kalles forventet rekkefølge og tidsramme for aktivitetene ofte et ________.",
      answers: [
        "roadmap",
        "veikart"
      ],
      answerKey: "roadmap / veikart",
      source: "Fasit: Forelesning 4, action plan: expected ordering and timeframe for executing the activities aka roadmap.",
      whyCorrect: "Riktig: roadmap/veikart beskriver rekkefølge og tidsramme for gjennomføring.",
      whyWrong: "Galt hvis svaret beskriver en beregningsmetode eller governance-arketype. Her spørres det etter planens tids- og rekkefølgedimensjon.",
      whyExtendedImageRefs: [
        "strategy_action_plan_model"
      ]
    },
    {
      id: 3,
      type: "single",
      title: "Strategisk kontekst og interessenter",
      points: 1,
      prompt: "Hvilket utsagn passer best med forelesningens beskrivelse av private, private non-profit og offentlige organisasjoner?",
      source: "Fasit: Forelesning 2, slides 'Different organizations'.",
      options: [
        {
          text: "Alle organisasjonstyper har interessenter som setter mål, mens administrasjonen/toppledelsen har ansvar for dag-til-dag-arbeidet for å nå målene.",
          correct: true,
          why: "Riktig: forelesningen viser at eiere, medlemmer eller borgere/politikere setter mål, mens administrasjonen arbeider for å nå dem.",
          whyExtended: [
            "Private kommersielle organisasjoner har typisk eiere og styre som setter mål.",
            "Private non-profit-organisasjoner kan ha medlemmer og styre, mens offentlige organisasjoner har borgere, politikere og ofte styre.",
            "Poenget i strategiforelesningen er at ledelse handler om å øke sannsynligheten for at disse målene faktisk blir nådd."
          ]
        },
        {
          text: "Bare private selskaper har strategiske mål.",
          correct: false,
          why: "Galt: forelesningen understreker at alle organisasjonstyper har mål.",
          whyExtended: [
            "Også non-profit og offentlige organisasjoner har mål, men målene kommer fra andre interessenter.",
            "For offentlige organisasjoner er målene ofte politisk definert og knyttet til borgere.",
            "Strategi er derfor ikke bare et kommersielt fenomen, men en ledelsesoppgave i alle organisasjonstyper."
          ]
        },
        {
          text: "Offentlige organisasjoner trenger ikke administrasjon fordi politikere gjør dag-til-dag-arbeidet.",
          correct: false,
          why: "Galt: politikerne setter mål, men administrasjonen har ansvar for daglig arbeid.",
          whyExtended: [
            "Forelesningen skiller mellom målsetting fra interessenter og administrasjonens daglige ansvar.",
            "I offentlig sektor representerer politikere borgernes mål, men administrasjonen utfører og følger opp.",
            "Å blande disse rollene gjør det vanskelig å forstå styring, delegasjon og ansvar."
          ]
        },
        {
          text: "Strategi handler primært om at IT-avdelingen alene definerer organisasjonens mål.",
          correct: false,
          why: "Galt: IT kan være strategisk viktig, men organisasjonens mål kommer fra overordnet strategisk kontekst.",
          whyExtended: [
            "CIO og IT-funksjonen må forholde seg til organisasjonens formål, strategi og interessenter.",
            "IT-porteføljen bør støtte strategiske mål, ikke erstatte dem.",
            "Dette er grunnen til at kurset først etablerer strategi og styringsdokumenter som management context før CIO toolbox introduseres."
          ]
        }
      ],
      whyExtendedImageRefs: [
        "strategy_action_plan_model"
      ]
    },
    {
      id: 4,
      type: "multi",
      title: "Generic decision-making process",
      points: 1,
      moduleId: "cio-tool-box",
      groupId: "decision-making",
      prompt: "Marker stegene som hører til den generiske beslutningsprosessen i alternative analysis.",
      source: "Fasit: Forelesning 3 / IN5431 summary, Generic decision-making process.",
      options: [
        {
          text: "Understand the situation: forstå årsaker, kompetanse, teknologi og kulturelle forhold.",
          correct: true,
          why: "Riktig: første steg er å forstå situasjonen og de underliggende 'why'.",
          whyExtended: [
            "Alternative analysis starter med root-cause analysis og forståelse av situasjonen.",
            "Dette kan inkludere interne kompetanser, tekniske eiendeler og kulturelle faktorer.",
            "Uten dette risikerer man å løse feil problem eller sammenligne irrelevante alternativer."
          ],
          whyExtendedImageRefs: [
            "generic_decision_making_process_no"
          ]
        },
        {
          text: "Synthesize options: utvikle mulige konsepter eller alternative handlingsvalg.",
          correct: true,
          why: "Riktig: andre steg er å syntetisere alternativer.",
          whyExtended: [
            "Forelesningen beskriver et konsept som et internt konsistent sett av arbeid/tiltak.",
            "Poenget er å få frem relevante alternativer, ikke bare vurdere den første løsningen noen foreslår.",
            "Dette er særlig viktig ved leverandørvalg, produktvalg og større organisatoriske endringer."
          ],
          whyExtendedImageRefs: [
            "generic_decision_making_process_no"
          ]
        },
        {
          text: "Evaluate and propose: vurdere fordeler/ulemper og gi en anbefaling.",
          correct: true,
          why: "Riktig: tredje steg er evaluering og anbefaling.",
          whyExtended: [
            "Evalueringen kan bruke business case, plus/minus-metode, kostnadsrangering eller real options.",
            "Detaljnivået avhenger av impact, erfaring, usikkerhet og tillit mellom beslutningstakere.",
            "Målet er ikke bare analyse, men å gi et beslutningsgrunnlag."
          ],
          whyExtendedImageRefs: [
            "generic_decision_making_process_no"
          ]
        },
        {
          text: "Implement every alternative in parallel to avoid trade-offs.",
          correct: false,
          why: "Galt: alternative analysis handler om å velge og prioritere, ikke å gjøre alt samtidig.",
          whyExtended: [
            "Ressurser er begrensede, og management handler nettopp om prioritering.",
            "Å implementere alle alternativer kan splitte ressurser og redusere fremdrift.",
            "Dette strider også mot strategiforståelsen i kurset, der trade-offs og valg er sentralt."
          ]
        }
      ]
    },
    {
      id: 5,
      type: "single",
      title: "Plus/minus-metoden",
      points: 1,
      prompt: "Hva er plus/minus-metoden brukt til i forelesningen om business case og alternative analysis?",
      source: "Fasit: Forelesning 4, slide 'From last week: The plus/minus-method'.",
      options: [
        {
          text: "Å sammenligne alternativer kvalitativt og strukturert når nytte, risiko og andre effekter ikke lett kan tallfestes som NPV.",
          correct: true,
          why: "Riktig: plus/minus-metoden gir en strukturert, men ikke rent finansiell, vurdering av alternativer.",
          whyExtended: [
            "Eksempelet sammenligner konsepter på kostnader, nytte, risiko, real options og samlet vurdering.",
            "Metoden er nyttig når flere effekter er viktige, men ikke kan beregnes presist i kroner.",
            "Den kan brukes som del av alternative analysis, sammen med eller i stedet for en finansiell business case."
          ]
        },
        {
          text: "Å beregne diskontert kontantstrøm med eksakt risikopremie.",
          correct: false,
          why: "Galt: dette beskriver NPV, ikke plus/minus-metoden.",
          whyExtended: [
            "NPV bruker kontantstrømmer, diskonteringsrate og investeringer.",
            "Plus/minus-metoden er mer kvalitativ og rangerer ofte nytte med pluss/minus-markeringer.",
            "Metoden passer når effektene er vanskelige å tallfeste nøyaktig."
          ]
        },
        {
          text: "Å bestemme governance-arketype for hvert IT-beslutningsdomene.",
          correct: false,
          why: "Galt: dette hører til IT governance-matrisen, ikke plus/minus-metoden.",
          whyExtended: [
            "Governance-matrisen kombinerer beslutningsdomener og arketyper.",
            "Plus/minus-metoden brukes for evaluering av alternative konsepter eller tiltak.",
            "De to verktøyene svarer på forskjellige spørsmål: hva bør vi velge, versus hvem skal bestemme."
          ]
        },
        {
          text: "Å tegne prosessflyt med swimlanes.",
          correct: false,
          why: "Galt: dette er prosessmodellering/BPMN.",
          whyExtended: [
            "Swimlanes brukes til å vise roller eller organisatoriske enheter i en prosessmodell.",
            "Plus/minus-metoden er en evalueringsmetode for alternativer.",
            "BPMN ligger under IT Architecture-verktøyet i CIO toolbox, ikke alternative analysis sin evalueringsmetode."
          ]
        }
      ],
      whyExtendedImageRefs: [
        "generic_decision_making_process_no"
      ]
    },
    {
      id: 6,
      type: "multi",
      title: "Real options i alternativanalyse",
      points: 1,
      prompt: "Marker utsagn som passer med 'real options' slik det brukes i alternative analysis.",
      source: "Fasit: Forelesning 4, plus/minus-metoden og alternative analysis.",
      options: [
        {
          text: "Real options kan gi verdi fordi et valg holder fremtidige handlingsmuligheter åpne under usikkerhet.",
          correct: true,
          why: "Riktig: verdien ligger i fleksibilitet når fremtiden er usikker.",
          whyExtended: [
            "I forelesningens plus/minus-eksempel vurderes real options separat fra kostnad, nytte og risiko.",
            "Et alternativ kan være attraktivt selv om kortsiktig nytte er moderat, dersom det åpner for viktige fremtidige muligheter.",
            "Dette passer særlig i digitale initiativer der teknologi, brukeratferd og marked kan endre seg raskt."
          ]
        },
        {
          text: "Real options er relevant når man ikke kan vite sikkert hva som blir verdifullt senere.",
          correct: true,
          why: "Riktig: usikkerhet er nettopp grunnen til at opsjonsverdi kan være viktig.",
          whyExtended: [
            "Når beslutninger tas under høy usikkerhet, kan fleksibilitet være en egen form for verdi.",
            "Dette skiller seg fra en tradisjonell NPV-logikk der man prøver å estimere én forventet fremtid.",
            "Real options gjør beslutningstakere oppmerksomme på fremtidige veivalg og læringsmuligheter."
          ]
        },
        {
          text: "Real options betyr at man alltid skal velge alternativet med lavest investeringskostnad.",
          correct: false,
          why: "Galt: lav kostnad kan være bra, men real options handler om fremtidig fleksibilitet.",
          whyExtended: [
            "Et lavkostalternativ kan låse organisasjonen til en dårlig arkitektur eller leverandør.",
            "Et dyrere alternativ kan noen ganger være bedre hvis det muliggjør senere skalering, gjenbruk eller innovasjon.",
            "Derfor vurderes real options som egen dimensjon, ikke som synonym for lav kostnad."
          ]
        },
        {
          text: "Real options kan vurderes sammen med kostnadsrangering, plus/minus-metode og business case.",
          correct: true,
          why: "Riktig: forelesningen plasserer real options som én av flere evalueringsmåter.",
          whyExtended: [
            "Alternative analysis kan bruke flere metoder i evalueringssteget.",
            "NPV gir finansiell sammenligning, mens real options kan synliggjøre strategisk fleksibilitet.",
            "Dette gir et bredere beslutningsgrunnlag enn bare nåverdiberegning."
          ]
        }
      ],
      whyExtendedImageRefs: [
        "generic_decision_making_process_no"
      ]
    },
    {
      id: 7,
      type: "fill",
      title: "PRINCE2",
      points: 1,
      prompt: "PRINCE2-prinsippet 'continued business ________' betyr at prosjektet må ha en vedvarende forretningsmessig begrunnelse.",
      answers: [
        "justification",
        "begrunnelse",
        "business justification"
      ],
      answerKey: "justification / business justification",
      source: "Fasit: IN5431 summary, PRINCE2 principles.",
      whyCorrect: "Riktig: 'continued business justification' er et av PRINCE2-prinsippene.",
      whyWrong: "Galt hvis svaret peker på en seremoni eller en governance-arketype. Her spørres det etter PRINCE2-prinsippet om vedvarende begrunnelse.",
      whyExtendedImageRefs: [
        "prince2_framework_model"
      ]
    },
    {
      id: 8,
      type: "multi",
      title: "PRINCE2-prinsipper",
      points: 1,
      prompt: "Marker PRINCE2-prinsipper som er del av pensumoppsummeringen.",
      source: "Fasit: IN5431 summary, PRINCE2 Principles.",
      options: [
        {
          text: "Learn from experience.",
          correct: true,
          why: "Riktig: PRINCE2 sier at prosjektet kontinuerlig bør søke og trekke lærdom.",
          whyExtended: [
            "Dette betyr at erfaringer fra tidligere og pågående arbeid bør brukes aktivt.",
            "Prinsippet gjør prosjektstyring mer lærende og mindre mekanisk.",
            "Det passer med kursets poeng om at rammeverk er hjelpemidler, ikke mål i seg selv."
          ],
          whyExtendedImageRefs: [
              "prince2_framework_model"
            ]
        },
        {
          text: "Defined roles and responsibilities.",
          correct: true,
          why: "Riktig: klar rolle- og ansvarsfordeling er et sentralt PRINCE2-prinsipp.",
          whyExtended: [
            "Prosjektorganisasjonen må vite hvem som har ansvar for hva.",
            "Dette støtter accountability og reduserer uklarhet i koordineringen.",
            "Prinsippet henger sammen med prosjekt som en midlertidig organisasjon."
          ],
          whyExtendedImageRefs: [
              "prince2_framework_model"
            ]
        },
        {
          text: "Manage by stages.",
          correct: true,
          why: "Riktig: PRINCE2 legger opp til planlegging, monitorering og kontroll fase for fase.",
          whyExtended: [
            "Å styre i faser gir kontrollpunkter der prosjektet kan revurderes.",
            "Dette passer med usikkerhet i prosjekter: man bør ikke nødvendigvis låse hele prosjektet detaljert fra start.",
            "Fasevis styring gjør det mulig å justere planene basert på erfaring."
          ],
          whyExtendedImageRefs: [
              "prince2_framework_model"
            ]
        },
        {
          text: "Tailor to suit the project environment.",
          correct: true,
          why: "Riktig: PRINCE2 skal tilpasses kontekst, størrelse, kompleksitet, viktighet, evne og risiko.",
          whyExtended: [
            "Dette er viktig fordi kurset understreker at rammeverk er kontekstavhengige.",
            "Et tungt rammeverk brukt ukritisk kan bli byråkratisk og lite hensiktsmessig.",
            "Tilpasning gjør rammeverket mer relevant for faktisk prosjektmiljø."
          ],
          whyExtendedImageRefs: [
              "prince2_framework_model"
            ]
        },
        {
          text: "Maximize scope, time and cost simultaneously.",
          correct: false,
          why: "Galt: dette er ikke et PRINCE2-prinsipp, og det strider mot prosjektstyringens trade-off-logikk.",
          whyExtended: [
            "Prosjektstyring må håndtere begrensninger og prioriteringer, ikke maksimere alt.",
            "Forelesningen om triple constraint viser at scope, time og cost må forstås som gjensidig avhengige dimensjoner.",
            "Å maksimere alle samtidig er ikke realistisk ledelse."
          ]
        }
      ],
      moduleId: "cio-tool-box",
      groupId: "prince2"
    },
    {
      id: 9,
      type: "single",
      title: "PRINCE2 themes",
      points: 1,
      prompt: "Hvilket PRINCE2-theme er knyttet til at det etableres en risk management approach og et risk register?",
      source: "Fasit: IN5431 summary, PRINCE2 Themes.",
      options: [
        {
          text: "Risk",
          correct: true,
          why: "Riktig: risk-theme handler om hvordan risiko identifiseres, dokumenteres og håndteres.",
          whyExtended: [
            "Pensumoppsummeringen sier at risk management approach og risk register bør opprettes.",
            "Dette passer med prosjekters usikkerhet rundt forventninger, finansiering og gjennomføring.",
            "Risiko er ikke bare en kostnadspost, men en ledelsesoppgave gjennom hele prosjektet."
          ],
          whyExtendedImageRefs: [
              "prince2_framework_model"
            ]
        },
        {
          text: "Quality",
          correct: false,
          why: "Galt: quality-theme handler om kvalitetskrav, ikke risikoregister.",
          whyExtended: [
            "Quality er et eget PRINCE2-theme.",
            "Det er relevant for hva prosjektet skal levere og hvilke krav leveransen må oppfylle.",
            "Risikoregisteret hører derimot til risk-theme."
          ]
        },
        {
          text: "Organization",
          correct: false,
          why: "Galt: organization-theme handler mer om roller og ansvar.",
          whyExtended: [
            "Organization er viktig for prosjektets struktur og ansvar.",
            "Det forklarer ikke direkte risk management approach eller risk register.",
            "Spørsmålet peker eksplisitt på risikohåndtering."
          ]
        },
        {
          text: "Progress",
          correct: false,
          why: "Galt: progress handler om fremdrift og kontroll, ikke primært risikoregister.",
          whyExtended: [
            "Progress er viktig for å overvåke om prosjektet går etter plan.",
            "Risiko kan påvirke progress, men risikoregisteret hører til risk-theme.",
            "PRINCE2 skiller disse temaene for å tydeliggjøre ulike ledelsesoppgaver."
          ]
        }
      ],
      moduleId: "cio-tool-box",
      groupId: "prince2"
    },
    {
      id: 10,
      type: "multi",
      title: "IT-arkitekturperspektiver",
      points: 1,
      prompt: "Marker utsagn som passer med arkitekturperspektivene i forelesningen.",
      source: "Fasit: Forelesning 5, slides om different views on architecture and architects, Fowler og Open Agile Architecture.",
      options: [
        {
          text: "TOGAF representerer et mer formelt og ofte sentralisert perspektiv på arkitekturarbeid.",
          correct: true,
          why: "Riktig: forelesningen kontrasterer TOGAF med Fowler nettopp på dette punktet.",
          whyExtended: [
            "TOGAF gir en strukturert ramme for enterprise architecture.",
            "Det formelle perspektivet kan være nyttig når organisasjonen trenger styring, standardisering og felles metode.",
            "Men det er ikke det eneste arkitektursynet i kurset."
          ]
        },
        {
          text: "Martin Fowler representerer et mer meritokratisk og desentralisert perspektiv.",
          correct: true,
          why: "Riktig: forelesningen beskriver Fowler som mer meritokratisk og desentralisert.",
          whyExtended: [
            "Fowler-perspektivet passer godt med agile utviklingsmiljøer.",
            "Arkitekten er ikke nødvendigvis en kontrollerende beslutningstaker, men en samarbeidende rolle som følger med på viktige problemer.",
            "Dette står i kontrast til karikaturen av arkitekten som tar alle viktige beslutninger alene."
          ]
        },
        {
          text: "Open Agile Architecture vektlegger modularitet, standardisering og innebygget responsiveness to change.",
          correct: true,
          why: "Riktig: disse tre punktene listes eksplisitt i forelesningen.",
          whyExtended: [
            "Modularitet kan støtte teamautonomi og gjøre organisasjonen mer robust.",
            "Standardisering kan gjøre produkt- eller operating model-rekonfigurasjon enklere.",
            "Responsiveness to change gjør arkitekturen bedre egnet for endring."
          ]
        },
        {
          text: "Alle arkitekturperspektiver sier at én person alltid bør ta alle viktige tekniske beslutninger alene.",
          correct: false,
          why: "Galt: dette er en karikatur av Architectus Reloadus, ikke hele pensumperspektivet.",
          whyExtended: [
            "Fowler beskriver også Architectus Oryzus, som arbeider mer samarbeidende.",
            "Forelesningen viser flere perspektiver for å understreke at arkitekturarbeid er kontekstavhengig.",
            "Kurset advarer generelt mot å bruke rammeverk som mål i seg selv."
          ]
        }
      ],
      whyExtendedImageRefs: [
        "togaf_arkitekturtaksonomi",
        "togaf_levels_model"
      ]
    },
    {
      id: 11,
      type: "single",
      title: "Fowler: architecture as important stuff",
      points: 1,
      prompt: "Hva betyr Fowler-perspektivet 'architecture is about the important stuff'?",
      source: "Fasit: Forelesning 5, slide 'Different definitions' om Fowler og Johnson.",
      options: [
        {
          text: "Hva som er arkitektur avhenger av hva utviklerne og konteksten vurderer som viktig, ikke av én universell liste over komponenter.",
          correct: true,
          why: "Riktig: Fowler bruker 'important stuff' for å vise at arkitektur er kontekstavhengig.",
          whyExtended: [
            "Forelesningen bruker eksempelet med Oracle: i én applikasjon kan database/persistence være arkitektur, i en annen er det bildeanalyse som er det viktige.",
            "Dermed er arkitektur ikke bare en fast teknisk sjekkliste.",
            "Dette perspektivet passer med pragmatisk og samarbeidsorientert arkitekturarbeid."
          ]
        },
        {
          text: "Arkitektur er alltid det samme som databasevalg.",
          correct: false,
          why: "Galt: Fowler-eksempelet viser nettopp at databasevalg ikke alltid er arkitektur.",
          whyExtended: [
            "For enterprise applications kan persistence være svært viktig.",
            "For medisinsk bildeanalyse kan kompleksiteten ligge et helt annet sted.",
            "Arkitektur avhenger derfor av hva som er viktig i akkurat den konteksten."
          ]
        },
        {
          text: "Arkitektur er kun fysisk hardware og nettverk.",
          correct: false,
          why: "Galt: forelesningen beskriver arkitektur bredere enn fysisk infrastruktur.",
          whyExtended: [
            "TOGAF-taksonomien inkluderer business, data, application og technology architecture.",
            "Fowler-perspektivet handler om viktige designbeslutninger og tekniske/organisatoriske forhold.",
            "Fysisk infrastruktur kan være viktig, men det er ikke hele arkitekturen."
          ]
        },
        {
          text: "Arkitektur er det samme som PRINCE2.",
          correct: false,
          why: "Galt: PRINCE2 er project governance and management, ikke arkitekturperspektiv.",
          whyExtended: [
            "PRINCE2 hører til Projects-verktøyet i CIO toolbox.",
            "Arkitektur hører til verktøyet IT Architecture, som analyserer og strukturerer IT-porteføljen.",
            "De to verktøyene kan støtte hverandre, men de er ikke samme ting."
          ]
        }
      ],
      whyExtendedImageRefs: [
        "togaf_levels_model"
      ]
    },
    {
      id: 12,
      type: "multi",
      title: "BPMN og prosessmodellering",
      points: 1,
      prompt: "Marker elementer som passer med BPMN/prosessmodellering slik det brukes i forelesningen.",
      source: "Fasit: Forelesning 5, business process modeling og Umbrella Heaven-eksemplet.",
      options: [
        {
          text: "Swimlanes kan vise roller eller organisatoriske enheter i prosessen.",
          correct: true,
          why: "Riktig: BPMN-eksempler bruker baner for aktører som kunde, system, lager og betalingsleverandør.",
          whyExtended: [
            "Swimlanes gjør det tydelig hvem som utfører hvilke aktiviteter.",
            "Dette hjelper med å analysere ansvar, avhengigheter og koordinering.",
            "Prosessmodellering kan dermed synliggjøre hvordan organisasjonsstruktur og IT-systemer henger sammen."
          ]
        },
        {
          text: "Aktiviteter og sekvensflyt viser hva som skjer og i hvilken rekkefølge.",
          correct: true,
          why: "Riktig: prosessmodeller beskriver logisk orden og avhengighet mellom aktiviteter.",
          whyExtended: [
            "Dette henger sammen med definisjonen av business process.",
            "Sekvensflyt gjør avhengigheter og rekkefølge synlige.",
            "Det gir et grunnlag for analyse, forbedring og systemstøtte."
          ]
        },
        {
          text: "Start- og slutt-hendelser kan markere prosessens begynnelse og avslutning.",
          correct: true,
          why: "Riktig: dette er grunnleggende elementer i prosessmodeller.",
          whyExtended: [
            "Forelesningen viser start event, end event, aktiviteter og sequence flow i øvingsslidene.",
            "Slike elementer gir en felles notasjon for å diskutere prosesser.",
            "De gjør prosessen lesbar både for forretnings- og IT-personer."
          ]
        },
        {
          text: "NPV-formelen er et standard BPMN-symbol.",
          correct: false,
          why: "Galt: NPV er business case/finansiell analyse, ikke prosessmodellering.",
          whyExtended: [
            "NPV hører til business case-verktøyet.",
            "BPMN handler om prosessflyt, roller og avhengigheter.",
            "Å blande disse gjør det uklart hvilket CIO toolbox-verktøy som brukes til hva."
          ]
        }
      ],
      whyExtendedImageRefs: [
        "umbrella_heaven_ordering_process"
      ]
    },
    {
      id: 13,
      type: "multi",
      title: "Digitalisering på makro-, meso- og mikronivå",
      points: 1,
      prompt: "Marker riktige koblinger mellom nivå og effekt av digitalisering i Danilova-forelesningen.",
      source: "Fasit: Forelesning 14, slide 'The impact of digital technology and digitalization on organizations'.",
      options: [
        {
          text: "Makronivå: digitalisering endrer forretningsmodeller og organisasjonens posisjon i et økosystem.",
          correct: true,
          why: "Riktig: dette er definisjonen av macro level i sliden.",
          whyExtended: [
            "Makronivået handler om strategi, business models og ecosystems.",
            "Her analyseres hvordan digitalisering kan endre markedet og organisasjonens rolle.",
            "Dette er mer enn intern effektivisering."
          ]
        },
        {
          text: "Mesonivå: digitalisering endrer forretningsprosesser, organisasjon og rapporteringslinjer.",
          correct: true,
          why: "Riktig: dette er meso level i sliden.",
          whyExtended: [
            "Mesonivået handler om organisasjonens interne struktur og prosesser.",
            "Det inkluderer leadership, governance, reporting, values og culture.",
            "Dette forklarer hvorfor digital transformasjon ofte krever organisatorisk endring, ikke bare ny teknologi."
          ]
        },
        {
          text: "Mikronivå: digitalisering endrer oppgavenes karakter, kommunikasjon, samarbeid, beslutningsprosesser og kompetansekrav.",
          correct: true,
          why: "Riktig: dette er micro level i sliden.",
          whyExtended: [
            "Mikronivået handler om hvordan arbeid faktisk utføres av mennesker.",
            "Ny teknologi kan endre både arbeidsinnhold og kompetansebehov.",
            "Dette er grunnen til at digital transformasjon involverer hele organisasjonen."
          ]
        },
        {
          text: "Mikronivå: digitalisering påvirker bare globale økosystemer, ikke arbeidshverdagen.",
          correct: false,
          why: "Galt: mikronivået handler nettopp om arbeidshverdagen og oppgavenes karakter.",
          whyExtended: [
            "Globale økosystemer hører mer til makronivået.",
            "Mikronivået handler om tasks, communication, collaboration, decision processes og skills.",
            "Derfor må ansatte involveres og kompetanse bygges i transformasjonen."
          ]
        }
      ],
      whyExtendedImageRefs: [
        "digital_strategy_model"
      ]
    },
    {
      id: 14,
      type: "multi",
      title: "Hvorfor digital transformasjon er vanskelig",
      points: 1,
      prompt: "Marker utfordringer som forelesningen trekker frem som grunner til at digital transformasjon er vanskelig å lykkes med.",
      source: "Fasit: Forelesning 14, slide 'What makes it hard to succeed?'.",
      options: [
        {
          text: "Manglende strategisk forankring og mangel på en helhetlig digital strategi.",
          correct: true,
          why: "Riktig: forelesningen lister 'not strategically anchored' og mangel på coherent digital strategy.",
          whyExtended: [
            "Uten strategisk forankring blir digitalisering fragmentert.",
            "Dette kan føre til enkelttiltak som ikke bygger organisatorisk evne.",
            "Det henger også sammen med D4D-risikoen om å spre ressurser på for mange byggeklosser."
          ]
        },
        {
          text: "Uklar governance og management, inkludert uklare roller og ansvar.",
          correct: true,
          why: "Riktig: forelesningen lister mangel på governance & management.",
          whyExtended: [
            "Uklar beslutningsmyndighet gjør det vanskelig å prioritere, koordinere og følge opp.",
            "Dette kobler digital transformasjon til IT governance og accountability framework.",
            "Roller og ansvar er avgjørende når digitalisering går på tvers av enheter."
          ]
        },
        {
          text: "Manglende samarbeid på tvers av enheter og manglende kompetanse.",
          correct: true,
          why: "Riktig: begge nevnes som barrierer i forelesningen.",
          whyExtended: [
            "Digitalisering påvirker ofte cross-functional business processes.",
            "Manglende samarbeid skaper siloer og hindrer helhetlige digitale tilbud.",
            "Manglende kompetanse gjør at organisasjonen ikke forstår muligheter, forutsetninger eller konsekvenser."
          ]
        },
        {
          text: "Kulturelle barrierer og organizational inertia.",
          correct: true,
          why: "Riktig: forelesningen trekker frem kultur og treghet som sentrale barrierer.",
          whyExtended: [
            "Digital transformasjon krever at mennesker endrer hvordan arbeid utføres.",
            "En kultur som motarbeider eksperimentering eller samarbeid kan hindre digital modenhet.",
            "Organizational inertia beskriver organisasjonens tendens til å fortsette på samme spor."
          ]
        },
        {
          text: "At organisasjonen har for mye samarbeid, for mye læring og for mye eksperimentering.",
          correct: false,
          why: "Galt: forelesningen fremhever samarbeid, læring og eksperimentering som ønskede trekk ved digitaliseringskultur.",
          whyExtended: [
            "Sliden om culture for digitalization lister blant annet collaboration, continuous learning og experimentation.",
            "Problemet er oftere mangel på slike egenskaper, ikke at de finnes.",
            "Dette er også knyttet til ambidextrous organization: både exploitation og exploration må håndteres."
          ]
        }
      ],
      whyExtendedImageRefs: [
        "digital_strategy_model",
        "D4D-overview"
      ]
    },
    {
      id: 15,
      type: "fill",
      title: "Organizational inertia",
      points: 1,
      prompt: "Organisasjonens tendens til å fortsette på samme spor fordi sosiotekniske systemer er vanskelige å endre like raskt som omgivelsene, kalles organizational ________.",
      answers: [
        "inertia",
        "treghet",
        "organisatorisk treghet",
        "organisational inertia",
        "organizational inertia"
      ],
      answerKey: "inertia / organisatorisk treghet",
      source: "Fasit: Forelesning 14, slides 'Organizational Inertia'.",
      whyCorrect: "Riktig: organizational inertia beskriver motstand/treghet som gjør at organisasjonen fortsetter på samme sti.",
      whyWrong: "Galt hvis svaret beskriver smidighet eller innovasjon. Her spørres det om treghet i sosiotekniske systemer.",
      whyExtendedImageRefs: [
        "digital_strategy_model"
      ]
    },
    {
      id: 16,
      type: "single",
      title: "Kultur for digitalisering",
      points: 1,
      prompt: "Hvilket alternativ passer best med forelesningens beskrivelse av en kultur for digitalisering?",
      source: "Fasit: Forelesning 14, slide 'A culture for digitalization'.",
      options: [
        {
          text: "Fleksibilitet, samarbeid, åpenhet, smidighet, kontinuerlig læring, kunnskapsdeling, eksperimentering og rom for feil.",
          correct: true,
          why: "Riktig: dette er kjennetegnene forelesningen trekker frem.",
          whyExtended: [
            "Digital transformasjon krever at organisasjonen lærer og tilpasser seg.",
            "Eksperimentering og rom for feil er viktig fordi digitale initiativer ofte er usikre.",
            "Samarbeid og kunnskapsdeling er nødvendig fordi digitalisering påvirker prosesser på tvers av funksjoner."
          ]
        },
        {
          text: "Streng hierarkisk kontroll, lite samarbeid og null toleranse for feil.",
          correct: false,
          why: "Galt: dette motarbeider den digitaliseringskulturen forelesningen beskriver.",
          whyExtended: [
            "Hierarkisk kultur kan hindre bruk av samarbeidsplattformer og data-drevet beslutningstaking.",
            "Null toleranse for feil reduserer eksperimentering og læring.",
            "Forelesningen fremhever fleksibilitet og åpenhet, ikke rigid kontroll."
          ]
        },
        {
          text: "At digitalisering overlates fullstendig til IT-avdelingen alene.",
          correct: false,
          why: "Galt: forelesningen understreker involvering av hele organisasjonen.",
          whyExtended: [
            "Digitalisering påvirker macro-, meso- og micro-nivå.",
            "Det endrer forretningsmodeller, prosesser, oppgaver og kompetansekrav.",
            "Derfor må ledere og ansatte på tvers av organisasjonen involveres."
          ]
        },
        {
          text: "At man unngår eksperimentering og bare gjennomfører tiltak med garantert gevinst.",
          correct: false,
          why: "Galt: eksperimentering er eksplisitt del av digitaliseringskulturen.",
          whyExtended: [
            "Digitale initiativer innebærer ofte usikkerhet om kundebehov, teknologi og organisering.",
            "Test-and-learn og MVP-logikk i D4D bygger på at man lærer gjennom raske eksperimenter.",
            "Å kreve garantert gevinst før man lærer kan stoppe innovasjon."
          ]
        }
      ],
      whyExtendedImageRefs: [
        "digital_strategy_model"
      ]
    },
    {
      id: 17,
      type: "single",
      title: "Digital offering og sweet spot",
      points: 1,
      prompt: "Hva beskriver 'sweet spot' i Shared Customer Insights?",
      source: "Fasit: IN5431 Begreper, Kap. 2 Building Shared Customer Insights.",
      options: [
        {
          text: "Treffpunktet der kundens ønsker overlapper med det digital teknologi kan levere, og som kunden er villig til å betale for.",
          correct: true,
          why: "Riktig: sweet spot er overlappet mellom customer desires og digital solutions.",
          whyExtended: [
            "Digital offerings beskrives som skjæringspunktet mellom hva kunder ønsker og hva selskapet kan gjøre med digital teknologi.",
            "Et vellykket digitalt tilbud kan løse et problem kunden ikke nødvendigvis visste at de hadde.",
            "Shared Customer Insights handler om å bygge organisatorisk læring rundt dette."
          ]
        },
        {
          text: "Den billigste tekniske løsningen uavhengig av kundebehov.",
          correct: false,
          why: "Galt: sweet spot krever både kundebehov og digital løsningsevne.",
          whyExtended: [
            "Billigst mulig løsning er ikke nok hvis kunden ikke vil ha den.",
            "D4D-logikken vektlegger digitale tilbud som skaper ny verdi for kunden.",
            "Teknologi må kobles til innsikt i betalingsvilje og behov."
          ]
        },
        {
          text: "Et internt effektiviseringsmål i operational backbone.",
          correct: false,
          why: "Galt: operational backbone handler om kjerneprosesser, mens sweet spot hører til Shared Customer Insights.",
          whyExtended: [
            "OB kan gi stabilitet og data som muliggjør digitale tilbud.",
            "Sweet spot handler derimot om kundeverdi og digitale løsninger.",
            "Begge er D4D-byggeklosser, men de svarer på ulike spørsmål."
          ]
        },
        {
          text: "En PRINCE2-prosess for prosjektavslutning.",
          correct: false,
          why: "Galt: sweet spot er ikke prosjektstyring.",
          whyExtended: [
            "PRINCE2 har egne prosesser og prinsipper for prosjektstyring.",
            "Sweet spot kommer fra D4D/Shared Customer Insights.",
            "Det handler om digitale verdiforslag, ikke prosjektadministrasjon."
          ]
        }
      ],
      whyExtendedImageRefs: [
        "SCI"
      ]
    },
    {
      id: 18,
      type: "multi",
      title: "Eksperimentering i Shared Customer Insights",
      points: 1,
      prompt: "Marker praksiser som passer med bygging av Shared Customer Insights.",
      source: "Fasit: IN5431 Begreper, Minimum Viable Product, Test-and-learn process, Discovery-driven planning, Customer co-creation og Cross-functional teams.",
      options: [
        {
          text: "MVP: en tidlig versjon slippes til kunder eller testgruppe for rask tilbakemelding.",
          correct: true,
          why: "Riktig: MVP brukes for å lære raskt om ideen har verdi.",
          whyExtended: [
            "MVP reduserer risikoen for å bygge en full løsning ingen vil ha.",
            "Digitale tilbud er programvarebaserte og egner seg derfor for rask testing.",
            "Tilbakemeldingen kan brukes til å forbedre eller forkaste ideen."
          ],
          whyExtendedImageRefs: [
              "SCI"
            ]
        },
        {
          text: "Test-and-learn: raske eksperimenter brukes for å validere ideer.",
          correct: true,
          why: "Riktig: test-and-learn er en iterativ metode for å lære fra markedet.",
          whyExtended: [
            "Dette passer med usikkerheten rundt hva kunder faktisk vil betale for.",
            "Raske eksperimenter støtter kontinuerlig læring.",
            "Metoden kontrasteres med å bruke lang tid på en løsning uten validering."
          ],
          whyExtendedImageRefs: [
              "SCI"
            ]
        },
        {
          text: "Customer co-creation: selskapet jobber direkte med kunder tidlig i prosessen.",
          correct: true,
          why: "Riktig: kundesamarbeid kan validere verdiforslag tidlig.",
          whyExtended: [
            "Co-creation reduserer risiko for å bygge noe som ikke treffer faktiske behov.",
            "Det støtter Shared Customer Insights ved å gjøre kundeinnsikt til organisatorisk læring.",
            "Tverrfaglige team kan kombinere IT, produkt, drift, marked og risiko."
          ],
          whyExtendedImageRefs: [
              "SCI"
            ]
        },
        {
          text: "Big-bang delivery: bygg hele løsningen ferdig uten kundekontakt for å unngå usikkerhet.",
          correct: false,
          why: "Galt: dette motarbeider test-and-learn og kundeinnsikt.",
          whyExtended: [
            "Usikkerhet forsvinner ikke ved å ignorere kunden.",
            "D4D anbefaler eksperimentering nettopp fordi digital innovasjon er usikker.",
            "Å vente for lenge med tilbakemelding kan føre til kostbare feilinvesteringer."
          ]
        }
      ],
      moduleId: "designed-for-digital",
      groupId: "shared-customer-insights"
    },
    {
      id: 19,
      type: "multi",
      title: "Hindringer for Operational Backbone",
      points: 1,
      prompt: "Marker forhold som forelesningen knytter til problemer med en ineffektiv operational backbone.",
      source: "Fasit: Forelesning 9 og 10, Operational Backbone og Digital Platform, slides om problems with inefficient operational backbone.",
      options: [
        {
          text: "Siloer og funksjoner som optimaliserer lokalt, men hindrer integrasjon på tvers.",
          correct: true,
          why: "Riktig: silotenkning hindrer horisontal optimalisering og integrerte prosesser.",
          whyExtended: [
            "Operational backbone krever standardiserte og integrerte prosesser/data.",
            "Siloer kan føre til at samme informasjon må registreres flere ganger.",
            "Digital business krever ofte sømløse end-to-end-prosesser på tvers av enheter."
          ],
          whyExtendedImageRefs: [
              "OB"
            ]
        },
        {
          text: "Entrenched organizational habits, altså innarbeidede vaner som må avlæres.",
          correct: true,
          why: "Riktig: forelesningen sier at bygging av OB krever unlearning entrenched organizational habits.",
          whyExtended: [
            "Gamle rutiner, prosesser og praksiser kan hindre standardisering.",
            "Dette viser at OB ikke bare er teknisk arkitektur, men også organisatorisk endring.",
            "Vaner kan være knyttet til funksjoner, praksis og fragmenterte arkitekturer."
          ],
          whyExtendedImageRefs: [
              "OB"
            ]
        },
        {
          text: "Fragmenterte arkitekturer.",
          correct: true,
          why: "Riktig: fragmenterte arkitekturer nevnes som et problem for OB.",
          whyExtended: [
            "Fragmentering gjør integrasjon og datakvalitet vanskeligere.",
            "Det kan føre til flere innlogginger, dårlig oppdaterte systemer og duplisert registrering.",
            "En fungerende OB krever at systemer, prosesser og data henger sammen."
          ],
          whyExtendedImageRefs: [
              "OB"
            ]
        },
        {
          text: "For mye stabil masterdata og for godt integrerte prosesser.",
          correct: false,
          why: "Galt: stabil masterdata og integrerte prosesser er nettopp mål for OB.",
          whyExtended: [
            "OB skal gi reliable and accessible master data.",
            "Den skal støtte seamless end-to-end transaction processing.",
            "Problemet er typisk mangel på integrasjon og standardisering, ikke at den er for god."
          ]
        }
      ],
      moduleId: "designed-for-digital",
      groupId: "operational-backbone"
    },
    {
      id: 20,
      type: "single",
      title: "Componentization vs monolittiske systemer",
      points: 1,
      moduleId: "designed-for-digital",
      groupId: "digital-platform",
      prompt: "Hvorfor er componentization viktig i D4D/digital platform-logikken?",
      source: "Fasit: IN5431 Begreper, Kap. 4 Digital Platform: componentization og monolithic systems.",
      options: [
        {
          text: "Det bryter digitale tilbud og forretningsfunksjoner ned i mindre, gjenbrukbare komponenter som gir fart og smidighet.",
          correct: true,
          why: "Riktig: componentization muliggjør gjenbruk og raskere konfigurering av digitale tilbud.",
          whyExtended: [
            "Digital Platform er et repository av business-, data- og infrastrukturkomponenter.",
            "Gjenbrukbare komponenter kan brukes i flere digitale tilbud.",
            "Dette er motsatsen til monolittiske systemer som er bygget for ett bestemt produkt og ofte mangler gjenbrukbare APIer."
          ],
          whyExtendedImageRefs: [
            "DP"
          ]
        },
        {
          text: "Det betyr at alle systemer bør bygges som ett stort monolittisk system for å unngå integrasjon.",
          correct: false,
          why: "Galt: monolittiske systemer beskrives som motsetningen til digital platform.",
          whyExtended: [
            "Monolittiske systemer kan føre til redundans og treg utvikling.",
            "D4D legger vekt på modulære, gjenbrukbare komponenter.",
            "Målet er ikke å unngå all integrasjon, men å strukturere integrasjon på en håndterbar måte."
          ]
        },
        {
          text: "Det er en metode for å bestemme governance-arketyper.",
          correct: false,
          why: "Galt: governance-arketyper hører til IT governance, ikke componentization.",
          whyExtended: [
            "Componentization handler om digital platform og arkitektur for digitale tilbud.",
            "Governance-arketyper handler om hvem som tar IT-beslutninger.",
            "Begge kan henge sammen gjennom accountability framework, men de er ikke samme begrep."
          ]
        },
        {
          text: "Det betyr at digitale tilbud aldri trenger data eller infrastruktur.",
          correct: false,
          why: "Galt: digitale tilbud bygger nettopp på data-, business- og infrastrukturkomponenter.",
          whyExtended: [
            "Digital Platform inkluderer data components, business components og infrastructure components.",
            "Componentization gjør slike deler gjenbrukbare.",
            "Å fjerne data og infrastruktur ville undergravd plattformlogikken."
          ]
        }
      ]
    },
    {
      id: 21,
      type: "multi",
      title: "External Developer Platform i praksis",
      points: 1,
      prompt: "Marker utsagn som passer med External Developer Platform.",
      source: "Fasit: Forelesning 12, External Development Platform, slides 'External Developer Platform' og 'External developer platform'.",
      options: [
        {
          text: "ExDP åpner digitale komponenter for eksterne partnere.",
          correct: true,
          why: "Riktig: definisjonen er et repository av digitale komponenter åpent for eksterne parter.",
          whyExtended: [
            "Eksterne partnere kan bruke komponenter til å utvide porteføljen av digitale tilbud.",
            "Dette skaper økosystemlogikk heller enn bare intern verdikjede.",
            "ExDP bygger på at interne komponenter er godt designet og forvaltet."
          ],
          whyExtendedImageRefs: [
              "ExDP"
            ]
        },
        {
          text: "ExDP krever typisk APIer eller lignende boundary resources som gir strukturert tilgang.",
          correct: true,
          why: "Riktig: forelesningen nevner API eller lignende som strukturert tilgang til kjernekomponenter.",
          whyExtended: [
            "Boundary resources gjør det mulig å kontrollere hvordan eksterne aktører får tilgang.",
            "Dette gir en balanse mellom åpenhet og kontroll.",
            "Uten slike grensesnitt blir ekstern bruk ustrukturert og risikabel."
          ],
          whyExtendedImageRefs: [
              "ExDP"
            ]
        },
        {
          text: "ExDP kan enten la partnere bruke internt utviklede komponenter, eller skape en bransjeplattform/marked for relaterte digitale tilbud.",
          correct: true,
          why: "Riktig: forelesningen skiller mellom disse to typene.",
          whyExtended: [
            "Google Maps brukes som eksempel på at partnere kan bruke en komponent i egne tilbud.",
            "Apple brukes som eksempel på industri-/økosystemplattform.",
            "Begge variantene øker potensialet for ekstern innovasjon."
          ],
          whyExtendedImageRefs: [
              "ExDP"
            ]
        },
        {
          text: "ExDP betyr at alle interne data åpnes fritt uten styring, eierskap eller sikkerhet.",
          correct: false,
          why: "Galt: ExDP krever strukturert tilgang og en godt forvaltet intern plattform.",
          whyExtended: [
            "Forelesningen sier at ExDP krever en very well designed and managed internal platform.",
            "Å åpne alt uten styring ville skape sikkerhets-, personvern- og kvalitetsproblemer.",
            "ExDP forutsetter også accountability og kontroll med komponenter."
          ]
        }
      ],
      moduleId: "designed-for-digital",
      groupId: "external-developer-platform"
    },
    {
      id: 22,
      type: "multi",
      title: "Sustainability: tre dimensjoner og målkonflikter",
      points: 1,
      prompt: "Marker riktige utsagn om bærekraft slik det behandles i forelesningen.",
      source: "Fasit: Forelesning 15, slides 'Three dimensions of sustainability' og 'Framework to categorize interactions between goals'.",
      options: [
        {
          text: "Bærekraft beskrives gjennom økonomisk, sosial og miljømessig dimensjon.",
          correct: true,
          why: "Riktig: forelesningen lister disse tre dimensjonene.",
          whyExtended: [
            "Dette tilsvarer også triple bottom line-logikken: profit, people and planet.",
            "Digital teknologi kan påvirke alle tre dimensjoner, både positivt og negativt.",
            "Derfor er bærekraft mer enn bare klima eller miljø."
          ]
        },
        {
          text: "Triple bottom line kan beskrives som profit, people and planet.",
          correct: true,
          why: "Riktig: dette nevnes som parallell forståelse av bærekraft.",
          whyExtended: [
            "Profit viser til økonomisk bærekraft.",
            "People viser til sosial bærekraft.",
            "Planet viser til miljømessig bærekraft."
          ]
        },
        {
          text: "Mål kan ha både positive og negative interaksjoner med hverandre.",
          correct: true,
          why: "Riktig: forelesningen viser Nilsson et al.-rammeverket for målinteraksjoner.",
          whyExtended: [
            "Noen tiltak kan forsterke andre mål.",
            "Andre tiltak kan begrense eller motvirke andre bærekraftsmål.",
            "Dette gjør bærekraftsstyring til et spørsmål om trade-offs, ikke bare moralske intensjoner."
          ]
        },
        {
          text: "Alle bærekraftsmål kan behandles isolert uten trade-offs eller samspill.",
          correct: false,
          why: "Galt: forelesningen viser nettopp at mål kan påvirke hverandre.",
          whyExtended: [
            "Målinteraksjoner kan være både positive og negative.",
            "Digitalisering kan for eksempel gi effektivisering, men også økt energibruk eller materialbruk.",
            "Ledelse må derfor forstå samspill og konsekvenser på tvers av dimensjoner."
          ]
        }
      ],
      whyExtendedImageRefs: [
        "sustainability_three_dimensions"
      ]
    },
    {
      id: 23,
      type: "single",
      title: "Strategiske drivere i IT governance",
      points: 1,
      prompt: "Hva menes med strategic drivers i forbindelse med valg av IT-styringsmodell?",
      source: "Fasit: IN5431 Begreper, Strategic Drivers.",
      options: [
        {
          text: "Overordnede mål som profitt, ressursutnyttelse eller vekst bør påvirke hvor sentralisert eller desentralisert IT-styringen er.",
          correct: true,
          why: "Riktig: strategic drivers kobler organisasjonens mål til valg av governance-modell.",
          whyExtended: [
            "Sentralisering kan fremme kostnadseffektivitet og standardisering.",
            "Desentralisering kan fremme innovasjon og lokal tilpasning.",
            "Valg av governance er derfor ikke bare et teknisk spørsmål, men bør følge strategisk kontekst."
          ]
        },
        {
          text: "Strategic drivers betyr at alle IT-beslutninger alltid skal tas av enkeltbrukere.",
          correct: false,
          why: "Galt: dette beskriver anarchy, ikke strategic drivers.",
          whyExtended: [
            "Anarchy er den mest desentraliserte arketypen.",
            "Strategic drivers handler om hva som bør styre valg mellom sentralisering og desentralisering.",
            "Riktig styringsmodell avhenger av organisasjonens mål og situasjon."
          ]
        },
        {
          text: "Strategic drivers er en BPMN-notasjon for start-hendelser.",
          correct: false,
          why: "Galt: dette har ingenting med BPMN-symboler å gjøre.",
          whyExtended: [
            "BPMN brukes til prosessmodellering.",
            "Strategic drivers hører til IT governance og strategisk styring.",
            "Begrepet handler om mål som bør styre organisering av beslutningsmyndighet."
          ]
        },
        {
          text: "Strategic drivers er det samme som risikopremie i NPV.",
          correct: false,
          why: "Galt: risikopremie er del av finansiell business case, ikke strategic drivers.",
          whyExtended: [
            "NPV bruker risikopremie i diskonteringsraten.",
            "Strategic drivers handler om overordnede organisatoriske mål.",
            "De to kan begge påvirke beslutninger, men på ulike nivåer."
          ]
        }
      ],
      whyExtendedImageRefs: [
        "performance_based_IT-governance_model"
      ]
    },
    {
      id: 24,
      type: "multi",
      title: "Management frameworks: kontekst og verdi",
      points: 1,
      prompt: "Marker utsagn som passer med forelesningens syn på management frameworks.",
      source: "Fasit: Forelesning 6 og IN5431 summary, frameworks and best practice.",
      options: [
        {
          text: "Rammeverk kan redusere usikkerhet og støtte koordinert arbeid.",
          correct: true,
          why: "Riktig: pensumoppsummeringen beskriver rammeverk som nyttige fordi de kan redusere usikkerhet.",
          whyExtended: [
            "Rammeverk beskriver roller, prosesser og praksiser for koordinerte aktiviteter.",
            "De kan også støtte strategigjennomføring og intra-company connect.",
            "Dette forklarer hvorfor rammeverk brukes selv om de ikke er eksakt vitenskap."
          ]
        },
        {
          text: "Rammeverk er kontekstavhengige og noen ganger omdiskuterte.",
          correct: true,
          why: "Riktig: forelesningen avslutter med en caveat om at nytten er context-sensitive og disputed.",
          whyExtended: [
            "Det finnes ikke ett beste rammeverk for alle situasjoner.",
            "Mennesker, miljø og strategi påvirker om et rammeverk fungerer.",
            "Dette er et gjennomgående poeng i CIO toolbox: verktøyene er ikke mål i seg selv."
          ]
        },
        {
          text: "Rammeverk kan støtte lederes legitimitet ved å vise at de håndterer usikkerhet på en strukturert måte.",
          correct: true,
          why: "Riktig: oppsummeringen nevner at rammeverk kan støtte managers' reputation.",
          whyExtended: [
            "Rammeverk gir et språk og en struktur for å håndtere komplekse situasjoner.",
            "De kan gjøre beslutninger mer transparente for organisasjonen.",
            "Men dette betyr ikke at rammeverket automatisk gir riktig svar."
          ]
        },
        {
          text: "Et rammeverk bør alltid følges slavisk uansett organisasjon, mennesker og strategi.",
          correct: false,
          why: "Galt: kurset understreker at rammeverk må tilpasses kontekst.",
          whyExtended: [
            "PRINCE2 har til og med prinsippet 'tailor to suit the project environment'.",
            "CIO toolbox-modellen sier at verktøy bare er meningsfulle hvis de tjener sitt formål.",
            "Blind etterlevelse kan skape byråkrati og dårligere beslutninger."
          ]
        }
      ],
      whyExtendedImageRefs: [
        "cynefin_theory_of_everything"
      ]
    },
    {
      id: 25,
      type: "single",
      title: "Digital business strategy som transfunksjonell",
      points: 1,
      prompt: "Hvorfor bør hele organisasjonen involveres i digital transformasjon ifølge Danilova-forelesningen?",
      source: "Fasit: Forelesning 14, slides 'Why do we need to involve and engage the whole organization?' og 'digital business strategy can be viewed as inherently trans-functional'.",
      options: [
        {
          text: "Fordi digitalisering påvirker cross-functional business processes, kompetanse, forståelsen av behov for endring og synergier på tvers.",
          correct: true,
          why: "Riktig: forelesningen begrunner involvering med tverrfunksjonelle prosesser, helhet, synergier, kompetanse og endringsforståelse.",
          whyExtended: [
            "Digitalisering påvirker ikke bare IT-systemer, men også prosesser, rapporteringslinjer, arbeidsoppgaver og kompetansekrav.",
            "Digital business strategy beskrives som inherently trans-functional.",
            "Derfor må digital transformasjon eies og forstås på tvers av organisasjonen, ikke isoleres i én teknisk enhet."
          ]
        },
        {
          text: "Fordi digital transformasjon bare handler om å kjøpe ny teknologi.",
          correct: false,
          why: "Galt: forelesningen understreker både tekniske og organisatoriske endringer.",
          whyExtended: [
            "Lederrollen innebærer å håndtere både tekniske og organisatoriske endringer.",
            "Kultur, kompetanse, samarbeid og prosesser er avgjørende.",
            "Teknologikjøp alene skaper ikke digital transformasjon."
          ]
        },
        {
          text: "Fordi involvering av flere enheter alltid gjør beslutninger raskere og enklere.",
          correct: false,
          why: "Galt: involvering kan gjøre beslutninger mer krevende, men er nødvendig for helhet og gjennomføring.",
          whyExtended: [
            "Tverrfunksjonell involvering kan øke koordinasjonsbehovet.",
            "Poenget er at digitalisering påvirker mange deler av organisasjonen.",
            "Uten involvering øker risikoen for manglende samarbeid, kompetanse og endringsforståelse."
          ]
        },
        {
          text: "Fordi IT governance ikke lenger er relevant i digitale organisasjoner.",
          correct: false,
          why: "Galt: governance og management er fortsatt sentralt, og mangel på dette er en barriere.",
          whyExtended: [
            "Forelesningen nevner lack of governance & management som en utfordring.",
            "D4D har Accountability Framework som en egen byggekloss.",
            "Digital transformasjon gjør governance viktigere, ikke irrelevant."
          ]
        }
      ],
      whyExtendedImageRefs: [
        "digital_strategy_model"
      ]
    }
  ]
};

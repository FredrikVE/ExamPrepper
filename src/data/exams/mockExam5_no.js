// src/data/exams/mockExam5_no.js
export const mockExam5_no = {
  id: "mock-exam-5-no",
  subjectId: "in5431",
  baseId: "mock-exam-5",
  lang: "no",
  title: "Framework drill: PRINCE2, BPMN, TOGAF og Cynefin",
  description: "Målrettet rammeverkstrening i PRINCE2, BPMN, Design Thinking og Double Diamond, TOGAF og Cynefin.",
  modeLabel: "FRAMEWORK DRILL",
  estimatedMinutes: "45–60",
  sortOrder: 50,
  questions: [
    // ===== PRINCE2 (spørsmål 1–7) =====
    {
      id: 1,
      type: "multi",
      title: "PRINCE2 principles",
      points: 1,
      moduleId: "cio-tool-box",
      groupId: "prince2",
      prompt: "Hvilke av følgende er blant de syv PRINCE2 principles?",
      source: "Fasit: IN5431, CIO Toolbox 2 og kursoppsummering om PRINCE2.",
      options: [
        {
          text: "Continued business justification",
          correct: true,
          why: "Riktig: dette er PRINCE2 principle 1 — prosjektet må ha en gyldig begrunnelse gjennom hele levetiden.",
          whyExtended: [
            "Continued business justification betyr at Business case ikke bare lages i starten, men må være gyldig underveis.",
            "Hvis begrunnelsen forsvinner, bør prosjektet revurderes eller stoppes.",
            "Dette kobler PRINCE2 til Business case-verktøyet i CIO Toolbox."
          ],
          whyExtendedImageRefs: [
            {
              moduleId: "cio-tool-box",
              groupId: "prince2",
              imageId: "prince2_framework_model"
            }
          ]
        },
        {
          text: "Learn from experience",
          correct: true,
          why: "Riktig: dette er PRINCE2 principle 2 — prosjektet skal kontinuerlig hente og bruke læring.",
          whyExtended: [
            "Learn from experience betyr at prosjektet skal bruke erfaringer fra tidligere arbeid og dokumentere nye lessons learned.",
            "Uten dette risikerer organisasjonen å gjenta de samme feilene fra prosjekt til prosjekt."
          ],
          whyExtendedImageRefs: [
            {
              moduleId: "cio-tool-box",
              groupId: "prince2",
              imageId: "prince2_framework_model"
            }
          ]
        },
        {
          text: "Maximize team size to reduce risk",
          correct: false,
          why: "Feil: dette er ikke et PRINCE2 principle. Større team kan også gi mer koordinasjonsarbeid.",
          whyExtended: [
            "PRINCE2 handler om tydelige roller, ansvar og tilpasning til prosjektmiljøet — ikke om å gjøre teamet størst mulig.",
            "Defined roles and responsibilities er relevant her, men det betyr kvalitet i ansvarsfordelingen, ikke flest mulig personer."
          ]
        },
        {
          text: "Manage by exception",
          correct: true,
          why: "Riktig: dette er PRINCE2 principle 5 — riktig mengde myndighet delegeres innenfor avtalte toleranser.",
          whyExtended: [
            "Manage by exception betyr at ledelsen ikke skal mikrostyre alt, men gripe inn når toleranser for tid, kost, scope eller risiko overskrides.",
            "Dette gir kontroll uten å gjøre prosjektstyringen unødvendig tung."
          ],
          whyExtendedImageRefs: [
            {
              moduleId: "cio-tool-box",
              groupId: "prince2",
              imageId: "prince2_framework_model"
            }
          ]
        },
        {
          text: "Avoid all documentation to stay agile",
          correct: false,
          why: "Feil: PRINCE2 bruker dokumentasjon, men nivået skal tilpasses prosjektet.",
          whyExtended: [
            "Tailor to suit the project environment betyr å tilpasse dokumentasjon og governance, ikke å fjerne alt.",
            "Business case, plans, risk register og progress-oppfølging trenger et visst dokumentasjonsgrunnlag."
          ]
        }
      ]
    },
    {
      id: 2,
      type: "multi",
      title: "PRINCE2 themes",
      points: 1,
      moduleId: "cio-tool-box",
      groupId: "prince2",
      prompt: "Hvilke av følgende er blant de syv PRINCE2 themes?",
      source: "Fasit: IN5431, kursoppsummering om PRINCE2 themes.",
      options: [
        {
          text: "Business case",
          correct: true,
          why: "Riktig: Business case er en PRINCE2 theme som sikrer fortsatt prosjektbegrunnelse.",
          whyExtended: [
            "Business case-theme henger tett sammen med Continued business justification.",
            "Den syv themes er Business case, Organization, Quality, Plans, Risk, Change og Progress."
          ],
          whyExtendedImageRefs: [
            {
              moduleId: "cio-tool-box",
              groupId: "prince2",
              imageId: "prince2_framework_model"
            }
          ]
        },
        {
          text: "Risk",
          correct: true,
          why: "Riktig: Risk er en PRINCE2 theme og handler om å identifisere, vurdere og kontrollere risiko.",
          whyExtended: [
            "Risk management approach og risk register etableres i Initiating a project og følges opp gjennom prosjektet.",
            "Dette kobler også til Business case, der risiko er en sentral del av vurderingen."
          ],
          whyExtendedImageRefs: [
            {
              moduleId: "cio-tool-box",
              groupId: "prince2",
              imageId: "prince2_framework_model"
            }
          ]
        },
        {
          text: "Marketing",
          correct: false,
          why: "Feil: Marketing er ikke en PRINCE2 theme.",
          whyExtended: [
            "Marketing kan være en aktivitet eller leveranse i et prosjekt, men er ikke en governance-theme i PRINCE2.",
            "PRINCE2 themes beskriver styringshensyn som må håndteres gjennom prosjektets livsløp."
          ]
        },
        {
          text: "Change",
          correct: true,
          why: "Riktig: Change er en PRINCE2 theme som håndterer endringer i prosjektets baseline.",
          whyExtended: [
            "Change i PRINCE2 handler om change control for scope, krav og leveranser.",
            "Dette er ikke det samme som organisatorisk Change management, for eksempel Prosci/ADKAR."
          ],
          whyExtendedImageRefs: [
            {
              moduleId: "cio-tool-box",
              groupId: "prince2",
              imageId: "prince2_framework_model"
            }
          ]
        },
        {
          text: "Progress",
          correct: true,
          why: "Riktig: Progress er en PRINCE2 theme for oppfølging av prosjektets fremdrift mot plan.",
          whyExtended: [
            "Progress kobler til Manage by stages og Manage by exception.",
            "Prosjektet må kunne sammenligne faktisk fremdrift med plan og eskalere avvik."
          ],
          whyExtendedImageRefs: [
            {
              moduleId: "cio-tool-box",
              groupId: "prince2",
              imageId: "prince2_framework_model"
            }
          ]
        }
      ]
    },
    {
      id: 3,
      type: "single",
      title: "PRINCE2 processes",
      points: 1,
      moduleId: "cio-tool-box",
      groupId: "prince2",
      prompt: "Hvilken PRINCE2 process har ansvar for å autorisere og styre prosjektet på overordnet nivå gjennom prosjektets livsløp?",
      source: "Fasit: IN5431, kursoppsummering om PRINCE2 processes.",
      options: [
        {
          text: "Starting up a project",
          correct: false,
          why: "Feil: Starting up a project er en før-prosjekt-prosess som vurderer om prosjektet er verdt å initiere.",
          whyExtended: [
            "Denne prosessen skjer før prosjektet formelt starter.",
            "Den lager grunnlag for å avgjøre om prosjektet bør initieres, men styrer ikke prosjektet gjennom hele livsløpet."
          ]
        },
        {
          text: "Directing a project",
          correct: true,
          why: "Riktig: Directing a project er prosessen der Project Board styrer prosjektet på overordnet nivå.",
          whyExtended: [
            "Directing a project går fra prosjektstart til prosjektavslutning.",
            "Project Board autoriserer initiation, stages og closure, og gir retning når toleranser overskrides.",
            "Dette er nært koblet til Manage by exception."
          ],
          whyExtendedImageRefs: [
            {
              moduleId: "cio-tool-box",
              groupId: "prince2",
              imageId: "prince2_framework_model"
            }
          ]
        },
        {
          text: "Controlling a stage",
          correct: false,
          why: "Feil: Controlling a stage er Project Manager sin daglige styring innenfor én stage.",
          whyExtended: [
            "Dette handler om å tildele arbeid, følge opp progresjon og rapportere innenfor en stage.",
            "Det er ikke den overordnede styringen av hele prosjektet."
          ]
        },
        {
          text: "Closing a project",
          correct: false,
          why: "Feil: Closing a project skjer ved slutten av prosjektet og er ikke løpende styring.",
          whyExtended: [
            "Closing a project bekrefter leveranser, overleverer resultater og fanger lessons learned.",
            "Prosessen avslutter prosjektet, men autoriserer ikke prosjektet gjennom hele livsløpet."
          ]
        }
      ]
    },
    {
      id: 4,
      type: "fill",
      title: "PRINCE2 manage by stages",
      points: 1,
      prompt: "PRINCE2 principle 4 sier at prosjekter skal planlegges, monitoreres og kontrolleres ________ by ________.",
      answers: ["stage by stage", "stage", "stages", "fase for fase", "steg for steg"],
      answerKey: "stage by stage",
      source: "Fasit: IN5431, PRINCE2 principle 4: Manage by stages.",
      whyCorrect: "Riktig: Manage by stages betyr at prosjektet deles i håndterbare stages som planlegges og autoriseres separat.",
      whyWrong: "Feil hvis svaret viser til sprint by sprint, year by year eller task by task. I PRINCE2 er stages den sentrale kontrollenheten."
    },
    {
      id: 5,
      type: "single",
      title: "PRINCE2 focus on products",
      points: 1,
      moduleId: "cio-tool-box",
      groupId: "prince2",
      prompt: "Hva betyr PRINCE2 principle 'Focus on products'?",
      source: "Fasit: IN5431, PRINCE2 principle 6.",
      options: [
        {
          text: "Prosjektet skal fokusere på å definere, levere og oppfylle kvalitetskrav for sine products/deliverables",
          correct: true,
          why: "Riktig: Focus on products handler om produktdefinisjon, leveranse og kvalitet.",
          whyExtended: [
            "I PRINCE2 betyr product enhver leveranse, ikke bare fysiske produkter.",
            "Product descriptions tydeliggjør formål, innhold, kvalitetskriterier og kontrollmetoder.",
            "Poenget er at prosjektet skal levere konkrete resultater, ikke bare gjennomføre aktiviteter."
          ],
          whyExtendedImageRefs: [
            {
              moduleId: "cio-tool-box",
              groupId: "prince2",
              imageId: "prince2_framework_model"
            }
          ]
        },
        {
          text: "Prosjektet skal bare lage fysiske produkter, ikke tjenester eller software",
          correct: false,
          why: "Feil: product i PRINCE2 betyr enhver leveranse, inkludert dokumenter, software, tjenester og opplæring.",
          whyExtended: [
            "I IT management-kontekst er mange PRINCE2 products digitale eller organisatoriske leveranser.",
            "Prinsippet handler om leveranseorientering, ikke fysisk produksjon."
          ]
        },
        {
          text: "Prosjektteamet skal bruke mest mulig tid på markedsføring av produktet",
          correct: false,
          why: "Feil: Focus on products handler om leveranser og kvalitet, ikke marketing.",
          whyExtended: [
            "Marketing kan være en prosjektleveranse, men er ikke det PRINCE2-prinsippet betyr.",
            "Quality-theme støtter dette prinsippet ved å beskrive hvordan kvalitet skal verifiseres."
          ]
        },
        {
          text: "Project Manager skal alene bestemme hvilke produkter som skal leveres uten å involvere stakeholders",
          correct: false,
          why: "Feil: PRINCE2 legger vekt på definerte roller, ansvar og stakeholder-involvering.",
          whyExtended: [
            "Project Board autoriserer prosjektets retning og leveranser.",
            "Product descriptions bør avklares med relevante stakeholders for å sikre faktisk nytte."
          ]
        }
      ]
    },
    {
      id: 6,
      type: "single",
      title: "PRINCE2 tailor to suit",
      points: 1,
      moduleId: "cio-tool-box",
      groupId: "prince2",
      prompt: "Hvorfor har PRINCE2 prinsippet 'Tailor to suit the project environment'?",
      source: "Fasit: IN5431, PRINCE2 principle 7 og forelesningens poeng om rammeverk.",
      options: [
        {
          text: "Fordi rammeverk må tilpasses størrelse, kompleksitet, viktighet, capability og risiko — one size does not fit all",
          correct: true,
          why: "Riktig: PRINCE2 erkjenner at prosjekter varierer, og metoden må tilpasses konteksten.",
          whyExtended: [
            "Tailor to suit betyr å justere governance, dokumentasjon og prosessnivå etter prosjektmiljøet.",
            "Dette passer med CIO Toolbox-prinsippet: verktøy er ikke mål i seg selv, men må tjene formålet.",
            "Et lite internt prosjekt trenger lettere styring enn en stor enterprise transformation."
          ],
          whyExtendedImageRefs: [
            {
              moduleId: "cio-tool-box",
              groupId: "prince2",
              imageId: "prince2_framework_model"
            }
          ]
        },
        {
          text: "Fordi PRINCE2 bare er laget for britiske offentlige prosjekter",
          correct: false,
          why: "Feil: PRINCE2 har opphav i UK government, men er laget for å kunne tilpasses mange kontekster.",
          whyExtended: [
            "Tailoring-prinsippet finnes nettopp for at PRINCE2 skal kunne brukes utenfor den opprinnelige konteksten.",
            "Det er derfor ikke begrenset til én sektor."
          ]
        },
        {
          text: "Fordi alle prosjekter bør bruke maksimal governance og dokumentasjon",
          correct: false,
          why: "Feil: tailoring betyr riktig størrelse på governance, ikke mest mulig governance.",
          whyExtended: [
            "For mye dokumentasjon i et lite prosjekt kan skape treghet og sløsing.",
            "Poenget er å tilpasse styringen til risiko og kompleksitet."
          ]
        },
        {
          text: "Fordi Project Manager kan ignorere alle PRINCE2 principles hvis de virker upraktiske",
          correct: false,
          why: "Feil: tailoring betyr å tilpasse metoden, ikke å forkaste prinsippene.",
          whyExtended: [
            "PRINCE2 principles skal fortsatt gjelde.",
            "Det som tilpasses er hvordan prinsippene implementeres i en konkret kontekst."
          ]
        }
      ]
    },
    {
      id: 7,
      type: "fill",
      title: "PRINCE2 origin",
      points: 1,
      prompt: "PRINCE2 har opphav i ________ government som et rammeverk for project governance og project management.",
      answers: ["UK", "British", "United Kingdom", "the UK", "the British", "britisk", "Storbritannia"],
      answerKey: "UK / British",
      source: "Fasit: IN5431, CIO Toolbox 4, oversikt over rammeverksopphav.",
      whyCorrect: "Riktig: forelesningens rammeverkstabell plasserer PRINCE2 med opphav i UK government.",
      whyWrong: "Feil hvis svaret er US, private sector eller research. Det peker på andre rammeverk, som TOGAF, SAFe eller Scrum."
    },
    // ===== BPMN (spørsmål 8–12) =====
    {
      id: 8,
      type: "single",
      title: "BPMN purpose",
      points: 1,
      prompt: "Hva er hovedformålet med BPMN i CIO Toolbox?",
      source: "Fasit: IN5431, CIO Toolbox 3, business process modeling.",
      options: [
        {
          text: "Å modellere process flows med roles, activities og dependencies for å analysere og strukturere IT portfolio",
          correct: true,
          why: "Riktig: BPMN ligger under IT Architecture som verktøy for business process modeling.",
          whyExtended: [
            "CIO Toolbox plasserer BPMN under IT Architecture sammen med process flows, roles/swimlanes, activities og dependencies.",
            "BPMN hjelper organisasjoner å forstå, dokumentere og forbedre business processes.",
            "Dette støtter formålet med IT Architecture: å analysere og strukturere IT portfolio."
          ]
        },
        {
          text: "Å beregne Net Present Value for alternative investeringer",
          correct: false,
          why: "Feil: NPV hører til Business case, ikke BPMN.",
          whyExtended: [
            "Business case brukes til økonomisk vurdering av nytte, kostnad, timing og risiko.",
            "BPMN viser prosessflyt og ansvar, ikke finansiell nåverdi."
          ]
        },
        {
          text: "Å fordele IT decision rights mellom Business Monarchy, IT Monarchy og Federal",
          correct: false,
          why: "Feil: dette er IT governance, ikke BPMN.",
          whyExtended: [
            "Weill & Ross sin governance matrix handler om decision domains og archetypes.",
            "BPMN handler om prosesser, roller og flyt."
          ]
        },
        {
          text: "Å erstatte alle andre architecture-perspektiver i TOGAF",
          correct: false,
          why: "Feil: BPMN er ett prosessmodelleringsverktøy, ikke en erstatning for TOGAF.",
          whyExtended: [
            "TOGAF dekker Business, Data, Application og Technology Architecture.",
            "BPMN kan støtte Business Architecture, men dekker ikke hele enterprise architecture."
          ]
        }
      ]
    },
    {
      id: 9,
      type: "single",
      title: "BPMN swimlanes",
      points: 1,
      prompt: "Hva representerer swimlanes i et BPMN diagram?",
      source: "Fasit: IN5431, CIO Toolbox 3, BPMN-diagrammer.",
      options: [
        {
          text: "Management structure — divisions, departments, managers eller roles som eier deler av prosessen",
          correct: true,
          why: "Riktig: swimlanes viser organisatorisk ansvar for deler av prosessen.",
          whyExtended: [
            "Forelesningen sier at labels for swimlanes bør reflektere management structure i organisasjonen som eier prosessen.",
            "Swimlanes gjør det synlig hvem som gjør hva i prosessen."
          ]
        },
        {
          text: "Den finansielle kostnaden ved hver aktivitet",
          correct: false,
          why: "Feil: swimlanes viser ansvar og roller, ikke kostnader.",
          whyExtended: [
            "Kostnader kan analyseres i en Business case, men de er ikke det swimlanes primært representerer."
          ]
        },
        {
          text: "Cynefin domains: Clear, Complicated, Complex og Chaotic",
          correct: false,
          why: "Feil: Cynefin er et sense-making framework, ikke et BPMN-element.",
          whyExtended: [
            "Cynefin hjelper å velge management approach basert på kontekst.",
            "BPMN swimlanes modellerer organisatorisk ansvar i en arbeidsprosess."
          ]
        },
        {
          text: "De syv PRINCE2 processes",
          correct: false,
          why: "Feil: PRINCE2 processes er en project governance-struktur, ikke swimlanes i BPMN.",
          whyExtended: [
            "Et BPMN-diagram kan modellere en prosess i et PRINCE2-prosjekt, men swimlanes viser roller eller avdelinger."
          ]
        }
      ]
    },
    {
      id: 10,
      type: "single",
      title: "BPMN and As-Is / To-Be",
      points: 1,
      prompt: "Hvordan brukes BPMN typisk i business process redesign, ifølge forelesningen?",
      source: "Fasit: IN5431, CIO Toolbox 3, As-Is og To-Be i process redesign.",
      options: [
        {
          text: "Start med et diagram av prosessen slik den er nå (As-Is), og lag deretter én eller flere To-Be redesigns",
          correct: true,
          why: "Riktig: forelesningen beskriver eksplisitt en As-Is → To-Be-tilnærming.",
          whyExtended: [
            "As-Is viser dagens prosess og gjør ineffektivitet, avhengigheter og ansvar synlig.",
            "To-Be-diagrammer utforsker hvordan prosessen kan fungere etter redesign.",
            "Dette ligner Alternative analysis: forstå situasjonen før du syntetiserer alternativer."
          ]
        },
        {
          text: "Hopp over all analyse og implementer idealprosessen direkte",
          correct: false,
          why: "Feil: process redesign krever først forståelse av dagens prosess.",
          whyExtended: [
            "Uten As-Is-forståelse risikerer man å redesigne basert på antakelser.",
            "Dette bryter med grunnlogikken i både BPMN og Alternative analysis."
          ]
        },
        {
          text: "Bruk BPMN bare til å dokumentere ferdige prosjekter, aldri til fremtidig planlegging",
          correct: false,
          why: "Feil: To-Be-diagrammer viser at BPMN også brukes til fremtidig design.",
          whyExtended: [
            "BPMN er både dokumentasjon og designverktøy.",
            "I process redesign er fremtidige prosessalternativer en sentral del av arbeidet."
          ]
        },
        {
          text: "Lag nøyaktig ett BPMN diagram og aldri revider det",
          correct: false,
          why: "Feil: forelesningen åpner for én eller flere To-Be redesigns.",
          whyExtended: [
            "Business process redesign er iterativt.",
            "Flere To-Be-alternativer kan vurderes før man velger løsning."
          ]
        }
      ]
    },
    {
      id: 11,
      type: "fill",
      title: "Business process definition",
      points: 1,
      prompt: "A business process is the combination of a set of ________ within an enterprise with a structure describing their logical order and dependence whose objective is to produce a desired result.",
      answers: ["activities", "activity", "aktiviteter", "aktivitet"],
      answerKey: "activities",
      source: "Fasit: IN5431, CIO Toolbox 3, definisjon av business process.",
      whyCorrect: "Riktig: definisjonen bruker activities. En business process består av aktiviteter med logisk rekkefølge og avhengigheter som produserer et resultat.",
      whyWrong: "Feil hvis svaret er systems, projects eller tools. Definisjonen handler spesifikt om activities."
    },
    {
      id: 12,
      type: "single",
      title: "BPMN abstraction levels",
      points: 1,
      prompt: "På hvilket detaljnivå bør et BPMN diagram tegnes?",
      source: "Fasit: IN5431, CIO Toolbox 3, process modeling og abstraksjonsnivå.",
      options: [
        {
          text: "Det avhenger av abstraction level og formålet med analysen",
          correct: true,
          why: "Riktig: forelesningen sier at prosesser kan beskrives på ulike detaljnivå avhengig av formålet.",
          whyExtended: [
            "Et strategisk oversiktsdiagram trenger mindre detalj enn en kravspesifikasjon.",
            "Pragmatic approaches handler ofte om å fange og forstå prosesser, mens rigorous approaches brukes til dypere analyse."
          ]
        },
        {
          text: "Alltid på maksimalt detaljnivå med hvert mikro-steg dokumentert",
          correct: false,
          why: "Feil: detaljnivået skal passe formålet, ikke alltid maksimeres.",
          whyExtended: [
            "For mye detalj kan gjøre diagrammet vanskelig å forstå og vedlikeholde."
          ]
        },
        {
          text: "Alltid på høyeste nivå med bare tre bokser og to piler",
          correct: false,
          why: "Feil: noen analyser krever mer detaljer enn dette.",
          whyExtended: [
            "Et for grovt diagram kan skjule viktige avhengigheter, roller og aktiviteter."
          ]
        },
        {
          text: "BPMN tillater bare ett fast detaljnivå",
          correct: false,
          why: "Feil: BPMN kan brukes på flere abstraksjonsnivåer.",
          whyExtended: [
            "Sub-processes kan vises mer eller mindre detaljert, og diagrammet kan tilpasses analysens formål."
          ]
        }
      ]
    },
    // ===== DESIGN THINKING & DOUBLE DIAMOND (spørsmål 13–18) =====
    {
      id: 13,
      type: "single",
      title: "Double Diamond phases",
      points: 1,
      prompt: "Hva er de fire fasene i Double Diamond-modellen?",
      source: "Fasit: IN5431, CIO Toolbox 2, Double Diamond.",
      options: [
        {
          text: "Discover → Define → Develop → Deliver",
          correct: true,
          why: "Riktig: dette er de fire fasene i Double Diamond.",
          whyExtended: [
            "Første diamant, Discover og Define, handler om å forstå problemet.",
            "Andre diamant, Develop og Deliver, handler om å utvikle og teste løsninger.",
            "Discover og Develop er divergente faser, mens Define og Deliver er konvergente faser."
          ]
        },
        {
          text: "Plan → Build → Test → Deploy",
          correct: false,
          why: "Feil: dette ligner en tradisjonell software development lifecycle, ikke Double Diamond.",
          whyExtended: [
            "Plan-Build-Test-Deploy antar ofte at problemet allerede er forstått.",
            "Double Diamond starter med problemforståelse og reframing."
          ]
        },
        {
          text: "Sprint Planning → Daily Standup → Review → Retrospective",
          correct: false,
          why: "Feil: dette er Scrum ceremonies, ikke Double Diamond phases.",
          whyExtended: [
            "Scrum organiserer utviklingsarbeid i sprints, mens Double Diamond hjelper å utforske problem og løsning."
          ]
        },
        {
          text: "Analyze → Design → Implement → Evaluate",
          correct: false,
          why: "Feil: dette er en generisk prosessbeskrivelse, ikke Double Diamond.",
          whyExtended: [
            "Double Diamond har en tydelig divergent-konvergent struktur som denne modellen ikke viser."
          ]
        }
      ]
    },
    {
      id: 14,
      type: "single",
      title: "Design Thinking — problem-reframing",
      points: 1,
      prompt: "Hva er hensikten med problem-reframing i Discover-fasen, ifølge forelesningen?",
      source: "Fasit: IN5431, CIO Toolbox 2, Discover phase og Wedell-Wedellsborg.",
      options: [
        {
          text: "Ikke å finne det 'ekte' problemet, men å se om det finnes et bedre problem å løse",
          correct: true,
          why: "Riktig: dette er poenget med problem-reframing i forelesningen.",
          whyExtended: [
            "Problem-reframing utfordrer antakelser om hva problemet egentlig er.",
            "Poenget er ikke nødvendigvis at første problemforståelse er feil, men at en annen framing kan være mer nyttig.",
            "Dette passer når problemet er uklart og flere årsaker kan være involvert."
          ]
        },
        {
          text: "Å bevise at den opprinnelige problemformuleringen var feil",
          correct: false,
          why: "Feil: forelesningen sier at den opprinnelige framing ikke nødvendigvis er feil.",
          whyExtended: [
            "Reframing handler om utforskning, ikke om å tvinge frem at første forståelse var gal."
          ]
        },
        {
          text: "Å umiddelbart velge den billigste løsningen",
          correct: false,
          why: "Feil: Discover handler om problemforståelse, ikke kostnadsrangering.",
          whyExtended: [
            "Kostnader hører bedre hjemme i Business case eller Alternative analysis."
          ]
        },
        {
          text: "Å plassere problemet i IT governance archetypes",
          correct: false,
          why: "Feil: governance archetypes hører til IT governance, ikke Discover-fasen i Design Thinking.",
          whyExtended: [
            "Problem-reframing handler om hva som bør løses; governance archetypes handler om hvem som beslutter."
          ]
        }
      ]
    },
    {
      id: 15,
      type: "fill",
      title: "Design Thinking — Deliver phase",
      points: 1,
      prompt: "Deliver-fasen i Double Diamond innebærer å teste ulike løsninger i ________-scale, og forkaste dem som ikke fungerer.",
      answers: ["small", "liten", "liten-", "small-scale"],
      answerKey: "small / liten",
      source: "Fasit: IN5431, CIO Toolbox 2, Double Diamond — Deliver phase.",
      whyCorrect: "Riktig: Deliver handler om small-scale testing, forkasting av løsninger som ikke fungerer og forbedring av dem som gjør det.",
      whyWrong: "Feil hvis svaret er full eller large. Design Thinking tester i liten skala for å lære billig før større implementering."
    },
    {
      id: 16,
      type: "multi",
      title: "Design Thinking key practices",
      points: 1,
      prompt: "Hvilke av følgende er listet som key practices i Design Thinking i CIO Toolbox-modellen?",
      source: "Fasit: IN5431, CIO Toolbox-modellen, tool 3 Design Thinking.",
      options: [
        {
          text: "Problem-reframing",
          correct: true,
          why: "Riktig: problem-reframing er en sentral Design Thinking-praksis.",
          whyExtended: [
            "Problem-reframing utfordrer første problemforståelse og kan avdekke et bedre problem å løse.",
            "Dette er særlig relevant når problemområdet er uklart."
          ]
        },
        {
          text: "Prototyping",
          correct: true,
          why: "Riktig: prototyping er en key practice i Design Thinking.",
          whyExtended: [
            "Prototyping gjør det mulig å teste ideer før de bygges fullt ut.",
            "Dette støtter læring og reduserer risiko i utforskende arbeid."
          ]
        },
        {
          text: "Small-scale testing",
          correct: true,
          why: "Riktig: small-scale testing er en key practice.",
          whyExtended: [
            "Småskala testing gjør det mulig å forkaste dårlige ideer tidlig og forbedre lovende ideer."
          ]
        },
        {
          text: "Co-design",
          correct: true,
          why: "Riktig: co-design er en key practice i Design Thinking.",
          whyExtended: [
            "Co-design involverer ulike grupper og stakeholders i utviklingen av løsninger."
          ]
        },
        {
          text: "Net Present Value calculation",
          correct: false,
          why: "Feil: NPV hører til Business case, ikke Design Thinking.",
          whyExtended: [
            "Business case vurderer økonomisk nytte, kostnad, timing og risiko.",
            "Design Thinking handler mer om problemforståelse, brukerinnsikt og eksperimentering."
          ]
        }
      ]
    },
    {
      id: 17,
      type: "single",
      title: "Design Thinking and Cynefin",
      points: 1,
      moduleId: "cio-tool-box",
      groupId: "cynefin",
      prompt: "Hvilket Cynefin domain passer best med Design Thinking?",
      source: "Fasit: IN5431, CIO Toolbox-modellen, Cynefin og Design Thinking.",
      options: [
        {
          text: "Complex — der viktige faktorer er ukjente og experimentation er nødvendig",
          correct: true,
          why: "Riktig: Design Thinking er tydelig koblet til Complex domain i CIO Toolbox.",
          whyExtended: [
            "CIO Toolbox kobler Complex til experimentation, Design Thinking og agile.",
            "Når problemet er uklart, må man probe, sense og respond — altså lære gjennom eksperimentering."
          ]
        },
        {
          text: "Clear — der problemene er velkjente og procedures er nok",
          correct: false,
          why: "Feil: Clear domain passer bedre med procedures og best practice.",
          whyExtended: [
            "Design Thinking blir ofte unødvendig tungt når problemet allerede er godt forstått."
          ]
        },
        {
          text: "Chaotic — der umiddelbar handling trengs uten utforskning",
          correct: false,
          why: "Feil: Chaotic krever immediate action, ikke langsom utforskning.",
          whyExtended: [
            "I Chaotic domain må man først stabilisere situasjonen."
          ]
        },
        {
          text: "Design Thinking fungerer like godt i alle domains uten tilpasning",
          correct: false,
          why: "Feil: Cynefin brukes nettopp til å velge riktig tilnærming for riktig kontekst.",
          whyExtended: [
            "Kontekst er sentralt i CIO Toolbox: Read the room før du velger verktøy."
          ]
        }
      ]
    },
    {
      id: 18,
      type: "single",
      title: "Design Thinking as toolkit",
      points: 1,
      prompt: "Hva har Design Thinking blitt, utover å være en kognitiv prosess eller mindset, ifølge kurset?",
      source: "Fasit: IN5431, CIO Toolbox 2, Tschimmel (2012).",
      options: [
        {
          text: "Et effektivt toolkit for innovation processes som kobler creative design med traditional business thinking",
          correct: true,
          why: "Riktig: dette er karakteriseringen av Design Thinking som brukes i forelesningen.",
          whyExtended: [
            "Design Thinking fungerer som en bro mellom kreativ utforskning og mer strukturert business thinking.",
            "Toolkitet inkluderer blant annet problem-reframing, user insight, co-design, prototyping og small-scale testing."
          ]
        },
        {
          text: "En erstatning for all financial analysis i organisasjoner",
          correct: false,
          why: "Feil: Design Thinking supplerer Business case, men erstatter det ikke.",
          whyExtended: [
            "Design Thinking kan hjelpe med å finne hva som bør bygges, mens Business case vurderer om det er verdt investeringen."
          ]
        },
        {
          text: "Et strengt regulatory compliance framework",
          correct: false,
          why: "Feil: Design Thinking handler om innovation og exploration, ikke compliance governance.",
          whyExtended: [
            "Compliance kan være en constraint, men Design Thinking er ikke et compliance-rammeverk."
          ]
        },
        {
          text: "En metode bare for graphic designers",
          correct: false,
          why: "Feil: Design Thinking brukes av multidisciplinary teams i mange typer organisasjoner.",
          whyExtended: [
            "I IN5431 er Design Thinking plassert som et management tool i CIO Toolbox, ikke som en ren designmetode."
          ]
        }
      ]
    },
    // ===== TOGAF (spørsmål 19–22) =====
    {
      id: 19,
      type: "multi",
      title: "TOGAF architecture taxonomy",
      points: 1,
      prompt: "Hvilke av følgende er de fire architecture types i TOGAF taxonomy?",
      source: "Fasit: IN5431, CIO Toolbox 3, TOGAF architecture taxonomy.",
      options: [
        {
          text: "Business Architecture — definerer business strategy, governance, organization og key business processes",
          correct: true,
          why: "Riktig: Business Architecture er en av de fire TOGAF architecture types.",
          whyExtended: [
            "Business Architecture er det mest forretningsnære laget i TOGAF.",
            "Det kobler architecture work til strategi, organisering og business processes."
          ]
        },
        {
          text: "Data Architecture — beskriver logical og physical data assets og data management resources",
          correct: true,
          why: "Riktig: Data Architecture er en av de fire TOGAF architecture types.",
          whyExtended: [
            "Data Architecture handler om hvilke data organisasjonen har, hvordan de struktureres og hvordan de styres.",
            "Dette kobler til Operational Backbone, der master data er sentralt."
          ]
        },
        {
          text: "Application Architecture — gir blueprint for applications, deres interactions og relasjon til core business processes",
          correct: true,
          why: "Riktig: Application Architecture er en av de fire TOGAF architecture types.",
          whyExtended: [
            "Application Architecture viser hvordan applikasjoner henger sammen og støtter business processes.",
            "Dette støtter IT Architecture-verktøyets formål om å analysere og strukturere IT portfolio."
          ]
        },
        {
          text: "Technology Architecture — beskriver software og hardware capabilities som støtter business, data og application services",
          correct: true,
          why: "Riktig: Technology Architecture er en av de fire TOGAF architecture types.",
          whyExtended: [
            "Technology Architecture dekker blant annet infrastructure, middleware, networks, communications og standards.",
            "Dette er det mest tekniske arkitekturlaget."
          ]
        },
        {
          text: "Marketing Architecture — beskriver go-to-market strategy og advertising channels",
          correct: false,
          why: "Feil: Marketing Architecture er ikke en del av TOGAF taxonomy.",
          whyExtended: [
            "TOGAFs fire architecture types er Business, Data, Application og Technology.",
            "Marketing kan inngå som business process, men er ikke et eget TOGAF-lag."
          ]
        }
      ]
    },
    {
      id: 20,
      type: "single",
      title: "TOGAF ADM",
      points: 1,
      prompt: "Hva står ADM for i TOGAF, og hva er formålet?",
      source: "Fasit: IN5431, CIO Toolbox 3 og kursoppsummering om Enterprise Architecture.",
      options: [
        {
          text: "Architecture Development Method — en systematisk metode for å utvikle Enterprise Architecture",
          correct: true,
          why: "Riktig: ADM er TOGAFs strukturerte prosess for Enterprise Architecture.",
          whyExtended: [
            "ADM gir en stegvis tilnærming til architecture work på tvers av Business, Data, Application og Technology Architecture.",
            "Forelesningen plasserer TOGAF som et formelt og ofte sentralisert perspektiv på arkitekturarbeid."
          ]
        },
        {
          text: "Agile Delivery Management — en lettvektsmetode for sprints",
          correct: false,
          why: "Feil: ADM står for Architecture Development Method, ikke Agile Delivery Management.",
          whyExtended: [
            "Scrum og SAFe er agile rammeverk; TOGAF ADM er enterprise architecture."
          ]
        },
        {
          text: "Application Database Manager — et verktøy for database schemas",
          correct: false,
          why: "Feil: ADM er en arkitekturprosess, ikke et databaseverktøy.",
          whyExtended: [
            "ADM dekker hele enterprise architecture, ikke bare data eller databaser."
          ]
        },
        {
          text: "Advanced Decision Matrix — det samme som IT governance matrix",
          correct: false,
          why: "Feil: IT governance matrix kommer fra Weill & Ross, ikke TOGAF ADM.",
          whyExtended: [
            "TOGAF ADM hører til IT Architecture; governance matrix hører til IT governance."
          ]
        }
      ]
    },
    {
      id: 21,
      type: "single",
      title: "Why is EA hard?",
      points: 1,
      prompt: "Hvorfor regnes Enterprise Architecture Management (EAM) som vanskelig i kurset?",
      source: "Fasit: IN5431, CIO Toolbox 3 og kursoppsummering om Enterprise Architecture.",
      options: [
        {
          text: "EA-arbeid kan vare lenge uten konkrete resultater, og organisasjoner vokser organisk i stedet for å bli 'architected'",
          correct: true,
          why: "Riktig: kurset peker på både den endeløse karakteren ved EA og at organisasjoner utvikler seg organisk.",
          whyExtended: [
            "EA søker rasjonell struktur, mens organisasjoner endres gjennom press, politikk, tilpasning og emergente prosesser.",
            "Det skaper spenning mellom top-down architecture work og praktisk organisatorisk utvikling."
          ]
        },
        {
          text: "EA er enkelt fordi organisasjoner naturlig følger architecture blueprints",
          correct: false,
          why: "Feil: kurset understreker at organisasjoner ikke bare blir architected; de vokser og endres organisk.",
          whyExtended: [
            "Enterprise Architecture er verdifullt, men krevende fordi det berører business, data, applications og technology samtidig."
          ]
        },
        {
          text: "EA er vanskelig bare fordi TOGAF er skrevet på et tungt språk",
          correct: false,
          why: "Feil: utfordringen er organisatorisk og strukturell, ikke bare språklig.",
          whyExtended: [
            "EA krever koordinering på tvers av funksjoner og langsiktig commitment."
          ]
        },
        {
          text: "EA har ingen verdi og bør aldri forsøkes",
          correct: false,
          why: "Feil: kurset beskriver EAM som verdifullt, men vanskelig.",
          whyExtended: [
            "EA kan hjelpe organisasjoner med komplekse og fragmenterte IT portfolios, men krever realistiske forventninger."
          ]
        }
      ]
    },
    {
      id: 22,
      type: "fill",
      title: "TOGAF origin",
      points: 1,
      prompt: "TOGAF har opphav i ________ defence som et rammeverk for Enterprise Architecture.",
      answers: ["US", "American", "United States", "the US", "USA", "amerikansk"],
      answerKey: "US",
      source: "Fasit: IN5431, CIO Toolbox 4, oversikt over rammeverksopphav.",
      whyCorrect: "Riktig: forelesningens rammeverkstabell plasserer TOGAF med opphav i US defence.",
      whyWrong: "Feil hvis svaret er UK, research eller private sector. Det peker på andre rammeverk."
    },
    // ===== CYNEFIN (spørsmål 23–25) =====
    {
      id: 23,
      type: "multi",
      title: "Cynefin domains and approaches",
      points: 1,
      moduleId: "cio-tool-box",
      groupId: "cynefin",
      prompt: "Hvilke koblinger mellom Cynefin domain og approach er riktige?",
      source: "Fasit: IN5431, CIO Toolbox 2, Cynefin og CIO Toolbox-modellen.",
      options: [
        {
          text: "Clear → Sense, Categorize, Respond → best practice",
          correct: true,
          why: "Riktig: Clear situations bruker etablerte procedures og best practice.",
          whyExtended: [
            "I Clear domain er situasjonene velkjente og kan håndteres med etablerte prosedyrer.",
            "Approach er Sense → Categorize → Respond."
          ],
          whyExtendedImageRefs: [
            {
              moduleId: "cio-tool-box",
              groupId: "cynefin",
              imageId: "cynefin_theory_of_everything"
            }
          ]
        },
        {
          text: "Complicated → Probe, Sense, Respond → emergent practice",
          correct: false,
          why: "Feil: Probe-Sense-Respond og emergent practice hører til Complex domain, ikke Complicated.",
          whyExtended: [
            "Complicated bruker Sense → Analyze → Respond og good practice.",
            "I Complicated domain kan eksperter analysere årsak-virkning før handling."
          ]
        },
        {
          text: "Complex → Probe, Sense, Respond → emergent practice",
          correct: true,
          why: "Riktig: Complex situations krever experimentation og gir emergent practice.",
          whyExtended: [
            "I Complex domain er flere viktige faktorer ukjente.",
            "Man må prøve noe, observere effekten og tilpasse videre handling."
          ],
          whyExtendedImageRefs: [
            {
              moduleId: "cio-tool-box",
              groupId: "cynefin",
              imageId: "cynefin_theory_of_everything"
            }
          ]
        },
        {
          text: "Chaotic → Act, Sense, Respond → novel practice",
          correct: true,
          why: "Riktig: Chaotic situations krever immediate action for å stabilisere situasjonen.",
          whyExtended: [
            "I Chaotic domain må man handle først, deretter sense og respond.",
            "Novel practice betyr at responsen ofte er ny fordi situasjonen er akutt og uoversiktlig."
          ],
          whyExtendedImageRefs: [
            {
              moduleId: "cio-tool-box",
              groupId: "cynefin",
              imageId: "cynefin_theory_of_everything"
            }
          ]
        }
      ]
    },
    {
      id: 24,
      type: "single",
      title: "Cynefin and triple constraint",
      points: 1,
      moduleId: "cio-tool-box",
      groupId: "cynefin",
      prompt: "Hva skjer ifølge forelesningen når alle tre elementer i triple constraint, scope, time og cost, er låst?",
      source: "Fasit: IN5431, CIO Toolbox 2, Cynefin og triple constraint.",
      options: [
        {
          text: "Prosjektet blir mer complex — med 3 fixed factors og 0 added complexity factors plasseres det i Complex domain",
          correct: true,
          why: "Riktig: å låse alle tre begrensninger fjerner fleksibilitet og gjør prosjektet sårbart.",
          whyExtended: [
            "Forelesningen kobler 3 fixed constraints + 0 added complexity factors til Complex domain.",
            "Hvis alle tre er låst, finnes det ingen enkel safety valve når noe uventet skjer.",
            "Med ekstra complexity factors kan situasjonen bevege seg mot Chaotic."
          ],
          whyExtendedImageRefs: [
            {
              moduleId: "cio-tool-box",
              groupId: "cynefin",
              imageId: "cynefin_theory_of_everything"
            }
          ]
        },
        {
          text: "Prosjektet blir Clear og enkelt fordi alt er definert på forhånd",
          correct: false,
          why: "Feil: å låse alt skaper rigiditet, ikke nødvendigvis klarhet.",
          whyExtended: [
            "Clear domain handler om kjente problemer og etablerte procedures, ikke om at alle constraints er låst."
          ]
        },
        {
          text: "Triple constraint har ingen sammenheng med Cynefin domains",
          correct: false,
          why: "Feil: forelesningen kobler eksplisitt triple constraint til Cynefin domains.",
          whyExtended: [
            "Koblingen brukes for å forstå hvorfor rigide prosjekter blir vanskeligere å styre."
          ]
        },
        {
          text: "Å låse alle tre constraints har ingen effekt på project risk",
          correct: false,
          why: "Feil: det øker risiko fordi prosjektet mister fleksibilitet.",
          whyExtended: [
            "Når scope, time og cost alle er låst, må ethvert avvik enten absorberes umulig eller føre til krise."
          ]
        }
      ]
    },
    {
      id: 25,
      type: "single",
      title: "Cynefin as meta-tool",
      points: 1,
      moduleId: "cio-tool-box",
      groupId: "cynefin",
      prompt: "Hvorfor beskrives Cynefin som en 'meta-tool' i CIO Toolbox, heller enn som et vanlig verktøy?",
      source: "Fasit: IN5431, CIO Toolbox-modellen, Cynefin som meta-tool.",
      options: [
        {
          text: "Fordi Cynefin hjelper å velge hvilke andre verktøy som bør brukes basert på situasjonens complexity",
          correct: true,
          why: "Riktig: Cynefin ligger ett nivå over de andre verktøyene og veileder valg av management approach.",
          whyExtended: [
            "CIO Toolbox beskriver Cynefin som et verktøy for å choose management approach based on context.",
            "En meta-tool er et verktøy om verktøy: det gjør ikke jobben selv, men hjelper deg å velge riktig approach.",
            "Dette passer med hovedregelen: Read the room før du velger tool."
          ],
          whyExtendedImageRefs: [
            {
              moduleId: "cio-tool-box",
              groupId: "cynefin",
              imageId: "cynefin_theory_of_everything"
            }
          ]
        },
        {
          text: "Fordi det er det dyreste rammeverket å implementere",
          correct: false,
          why: "Feil: meta-tool handler om funksjon, ikke kostnad.",
          whyExtended: [
            "Cynefin er et sense-making framework, ikke et stort software- eller implementeringsprosjekt."
          ]
        },
        {
          text: "Fordi det ble oppfunnet etter alle de andre verktøyene",
          correct: false,
          why: "Feil: meta-tool handler om rollen i verktøykassen, ikke kronologi.",
          whyExtended: [
            "Cynefin kalles meta-tool fordi det hjelper å velge andre tools, ikke fordi det er nyere."
          ]
        },
        {
          text: "Fordi det erstatter behovet for de seks andre verktøyene",
          correct: false,
          why: "Feil: Cynefin hjelper å velge mellom verktøyene; det erstatter dem ikke.",
          whyExtended: [
            "Du trenger fortsatt Business case, Design Thinking, Projects, Product teams, IT Architecture og IT governance i passende situasjoner."
          ]
        }
      ]
    }
  ]
};

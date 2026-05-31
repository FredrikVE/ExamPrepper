// src/data/exams/mockExamDefinitions_en.js
export const mockExamDefinitions_en = {
  id: "mock-exam-definitions-en",
  subjectId: "in5431",
  baseId: "mock-exam-definitions",
  lang: "en",
  title: "Concept drill: definitions and key concepts",
  description: "Precise concept practice for IN5431: digitalization, architecture, governance, process, business case, projects, frameworks and Designed for Digital.",
  modeLabel: "CONCEPT DRILL",
  estimatedMinutes: "30–45",
  sortOrder: 80,
  questions: [
    {
      id: 1,
      type: "dragDrop",
      title: "Digitization, digitalization and digital transformation",
      points: 2,
      prompt: "Drag each concept to the most precise definition.",
      source: "Answer key: IN5431, Designed for Digital and the lecture on digital strategy/digital transformation.",
      cards: [
        { id: "digitisering", text: "Digitization" },
        { id: "digitalisering", text: "Digitalization" },
        { id: "digital-transformasjon", text: "Digital transformation" },
        { id: "digital-strategy", text: "Digital strategy" }
      ],
      targets: [
        {
          id: "digitisering",
          description: "Technical conversion or digital support for existing information/processes",
          correctCardId: "digitisering",
          correctLabel: "Digitization",
          whyCorrect: "Digitization is the more technical side: making information or existing processes digital.",
          whyWrong: "This definition is primarily about technical digital representation or support, not broad organizational change.",
          whyExtended: ["Example: replacing paper forms with digital forms or registering data digitally."]
        },
        {
          id: "digitalisering",
          description: "Socio-technical change where digital resources are used to change practices, services and value creation",
          correctCardId: "digitalisering",
          correctLabel: "Digitalization",
          whyCorrect: "Digitalization concerns how digital technology changes work, processes and value creation.",
          whyWrong: "This definition is broader than pure digitization, but less total than digital transformation.",
          whyExtended: ["Digitalization concerns the interplay between people, processes and technology."]
        },
        {
          id: "digital-transformasjon",
          description: "Significant organizational change driven or enabled by extensive use of digital technology",
          correctCardId: "digital-transformasjon",
          correctLabel: "Digital transformation",
          whyCorrect: "Digital transformation refers to larger organizational changes over time, not isolated digitalization initiatives.",
          whyWrong: "This definition describes comprehensive organizational change, not just new software or automation.",
          whyExtended: ["Digital transformation can change business models, organizational structure, work processes and value propositions."]
        },
        {
          id: "digital-strategy",
          description: "An organizational strategy formulated and executed by using digital resources to create differential value",
          correctCardId: "digital-strategy",
          correctLabel: "Digital strategy",
          whyCorrect: "Digital strategy is about how digital resources are used strategically to create value.",
          whyWrong: "This is a strategy definition, not a definition of transformation or pure technical digitization.",
          whyExtended: ["The curriculum distinguishes digital strategy from both business strategy and IT strategy."]
        }
      ]
    },
    {
      id: 2,
      type: "single",
      title: "What is digital transformation?",
      points: 1,
      prompt: "Which statement best describes digital transformation?",
      source: "Answer key: IN5431, lecture on digital strategy and digital transformation.",
      options: [
        {
          text: "Significant organizational change driven or enabled by extensive use of digital technology.",
          correct: true,
          why: "Correct: digital transformation is about comprehensive organizational change, not isolated IT measures.",
          whyExtended: ["The concept points to changes in how people work, how processes are organized and how the organization creates value."]
        },
        {
          text: "Scanning paper forms and storing them as PDFs.",
          correct: false,
          why: "Wrong: this is a typical example of digitization, not digital transformation.",
          whyExtended: ["Digital transformation requires more than technical conversion of information."]
        },
        {
          text: "Buying a new IT system without changing work processes or organization.",
          correct: false,
          why: "Wrong: new technology alone is not enough to qualify as digital transformation.",
          whyExtended: ["The curriculum emphasizes the interplay between people, processes and technology."]
        },
        {
          text: "Establishing an IT department to handle operations.",
          correct: false,
          why: "Wrong: this describes organization of the IT function, not necessarily transformation.",
          whyExtended: ["An IT department can support transformation, but it is not digital transformation in itself."]
        }
      ]
    },
    {
      id: 3,
      type: "drag-categorize",
      title: "Examples: digitization, digitalization and transformation",
      points: 2,
      prompt: "Drag each example to the correct concept category.",
      source: "Answer key: IN5431, digitalization and digital transformation.",
      items: [
        { id: "scan-paper", label: "Scan paper forms" },
        { id: "digital-registration", label: "Register previously manual data digitally" },
        { id: "change-workflow", label: "Change work processes using digital systems" },
        { id: "data-customer", label: "Use data to improve the customer experience" },
        { id: "new-business-model", label: "Develop a new digital business model" },
        { id: "org-redesign", label: "Comprehensive process and organizational redesign" }
      ],
      categories: [
        { id: "digitisering", label: "Digitization" },
        { id: "digitalisering", label: "Digitalization" },
        { id: "digital-transformasjon", label: "Digital transformation" }
      ],
      correctAnswer: {
        digitisering: ["scan-paper", "digital-registration"],
        digitalisering: ["change-workflow", "data-customer"],
        "digital-transformasjon": ["new-business-model", "org-redesign"]
      },
      itemFeedback: {
        "scan-paper": { whyCorrect: "Scanning paper is a technical example of digitization.", whyWrong: "This is technical conversion, not broad organizational transformation.", whyExtended: ["Digitization is often a first step, but not enough by itself."] },
        "digital-registration": { whyCorrect: "Digital registration of previously manual data is digitization.", whyWrong: "This is about making data digital, not changing a business model.", whyExtended: ["The example may enable later digitalization."] },
        "change-workflow": { whyCorrect: "When work processes are changed using digital technology, this is digitalization.", whyWrong: "Here practice and process change, not just data format.", whyExtended: ["Digitalization is socio-technical: both technology and work change."] },
        "data-customer": { whyCorrect: "Using data for a better customer experience is digitalization.", whyWrong: "This concerns value creation and practice more than pure technical digitization.", whyExtended: ["It can become part of digital transformation if scaled into larger organizational change."] },
        "new-business-model": { whyCorrect: "A new digital business model is a typical transformation example.", whyWrong: "This is more comprehensive than a process improvement.", whyExtended: ["Transformation often concerns new value propositions and new ways of organizing the business."] },
        "org-redesign": { whyCorrect: "Comprehensive redesign of processes and organization points toward digital transformation.", whyWrong: "This is not just digital support for an existing process.", whyExtended: ["Transformation happens when digital resources change how the organization works."] }
      }
    },
    {
      id: 4,
      type: "dragDrop",
      title: "Architecture definitions",
      points: 2,
      prompt: "Drag each architecture concept to the correct definition.",
      source: "Answer key: IN5431, lecture on IT Architecture and TOGAF.",
      cards: [
        { id: "architecture-design", text: "Architecture as design" },
        { id: "togaf-iso", text: "TOGAF / ISO-style definition" },
        { id: "togaf-structure", text: "TOGAF structural definition" },
        { id: "fowler", text: "Fowler perspective" },
        { id: "enterprise-architecture", text: "Enterprise Architecture" }
      ],
      targets: [
        { id: "architecture-design", description: "The design of a system or a group of systems", correctCardId: "architecture-design", correctLabel: "Architecture as design", whyCorrect: "Architecture is always about the design of a system or a group of systems.", whyWrong: "This definition points to the most basic architecture idea: design.", whyExtended: ["In an IT context, the system can be software, the organization's IT portfolio or a group of connected systems."] },
        { id: "togaf-iso", description: "Fundamental concepts or properties of an entity in its environment and governing principles for realization and evolution", correctCardId: "togaf-iso", correctLabel: "TOGAF / ISO-style definition", whyCorrect: "This is the broad TOGAF/ISO-style definition of architecture.", whyWrong: "The keywords are fundamental concepts/properties, environment and governing principles.", whyExtended: ["The definition includes lifecycle and evolution over time."] },
        { id: "togaf-structure", description: "The structure of components, their relationships, and principles/guidelines for design and evolution over time", correctCardId: "togaf-structure", correctLabel: "TOGAF structural definition", whyCorrect: "This is the more structural TOGAF definition of architecture.", whyWrong: "The keywords are components, interrelationships, principles and guidelines.", whyExtended: ["This definition is useful when understanding system structure and development over time."] },
        { id: "fowler", description: "Architecture is 'the important stuff'", correctCardId: "fowler", correctLabel: "Fowler perspective", whyCorrect: "Fowler is known for a pragmatic view: architecture is the important stuff that is hard to change.", whyWrong: "This is not TOGAF's formal definition, but Fowler's more practical perspective.", whyExtended: ["The Fowler perspective is more collaborative and less top-down than classical enterprise architecture."] },
        { id: "enterprise-architecture", description: "Holistic work to integrate fragmented processes/systems so they support strategy and change", correctCardId: "enterprise-architecture", correctLabel: "Enterprise Architecture", whyCorrect: "Enterprise Architecture concerns the whole across the organization.", whyWrong: "This definition concerns portfolio, processes and strategy at enterprise level.", whyExtended: ["TOGAF is one framework for Enterprise Architecture."] }
      ]
    },
    {
      id: 5,
      type: "fill",
      title: "Architecture is always about...",
      points: 1,
      prompt: "Architecture is always about the ________ of a system — or a group of systems.",
      answers: ["design"],
      answerKey: "design",
      source: "Answer key: IN5431, IT Architecture.",
      whyCorrect: "Architecture is fundamentally about the design of systems.",
      whyWrong: "The central word is design. Architecture is not just documentation, code or operations."
    },
    {
      id: 6,
      type: "multi",
      title: "What is included in TOGAF definitions of architecture?",
      points: 2,
      prompt: "Select the statements that fit TOGAF/ISO-style definitions of architecture.",
      source: "Answer key: IN5431, TOGAF definition of architecture.",
      options: [
        { text: "Fundamental concepts or properties of an entity.", correct: true, why: "Correct: this is included in the broad definition.", whyExtended: ["Architecture describes fundamental concepts/properties of an entity."] },
        { text: "The entity in its environment.", correct: true, why: "Correct: the environment around the entity is part of the definition.", whyExtended: ["Architecture is understood in context, not in isolation."] },
        { text: "Governing principles for realization and evolution.", correct: true, why: "Correct: governing principles for realization and evolution are included.", whyExtended: ["Architecture is also about how the system should develop over time."] },
        { text: "Structure of components and their interrelationships.", correct: true, why: "Correct: components and relationships are central in the structural definition.", whyExtended: ["This part points to system structure."] },
        { text: "Only the source code structure of one application.", correct: false, why: "Wrong: TOGAF/EA is broader than source code in one application.", whyExtended: ["Architecture may cover business, data, applications, technology and lifecycle."] },
        { text: "Only project budget and timeline.", correct: false, why: "Wrong: budget and timeline are project management, not the definition of architecture.", whyExtended: ["Project plans may be affected by architecture, but they are not architecture definitions."] }
      ]
    },
    {
      id: 7,
      type: "dragDrop",
      title: "TOGAF architecture taxonomy",
      points: 2,
      prompt: "Drag each TOGAF architecture type to the correct explanation.",
      source: "Answer key: IN5431, IT Architecture and TOGAF.",
      cards: [
        { id: "business-architecture", text: "Business Architecture" },
        { id: "data-architecture", text: "Data Architecture" },
        { id: "application-architecture", text: "Application Architecture" },
        { id: "technology-architecture", text: "Technology Architecture" }
      ],
      targets: [
        { id: "business-architecture", description: "Strategy, governance, organization and key business processes", correctCardId: "business-architecture", correctLabel: "Business Architecture", whyCorrect: "Business Architecture describes the organization's processes, organization, governance and strategic context.", whyWrong: "This explanation concerns the business layer, not data, applications or technology.", whyExtended: ["This layer links strategy and architecture work."] },
        { id: "data-architecture", description: "Logical and physical data assets and data management resources", correctCardId: "data-architecture", correctLabel: "Data Architecture", whyCorrect: "Data Architecture concerns data resources and how they are managed.", whyWrong: "The keyword is data resources, not applications or infrastructure.", whyExtended: ["Data Architecture is important for integration and information flow across the organization."] },
        { id: "application-architecture", description: "Applications, their interactions and their relationship to business processes", correctCardId: "application-architecture", correctLabel: "Application Architecture", whyCorrect: "Application Architecture describes the application portfolio and how applications support processes.", whyWrong: "This explanation concerns applications and their interaction.", whyExtended: ["This is where we see how systems support business needs."] },
        { id: "technology-architecture", description: "Software, hardware, infrastructure, middleware, networks and standards", correctCardId: "technology-architecture", correctLabel: "Technology Architecture", whyCorrect: "Technology Architecture describes the technical infrastructure that applications and data build on.", whyWrong: "The keywords are infrastructure, networks, middleware and technical standards.", whyExtended: ["This layer is the foundation for operations, integration and technical capabilities."] }
      ]
    },
    {
      id: 8,
      type: "single",
      title: "TOGAF ADM",
      points: 1,
      prompt: "What does ADM mean in TOGAF?",
      source: "Answer key: IN5431, TOGAF Architecture Development Method.",
      options: [
        { text: "Architecture Development Method — a structured method for architecture work.", correct: true, why: "Correct: ADM is TOGAF's method for developing and managing architecture.", whyExtended: ["ADM is the core of TOGAF as a framework for Enterprise Architecture."] },
        { text: "Agile Delivery Model — a method for sprint planning.", correct: false, why: "Wrong: this confuses TOGAF with agile delivery.", whyExtended: ["Scrum/SAFe are more relevant to agile delivery."] },
        { text: "Application Data Matrix — a table for data quality.", correct: false, why: "Wrong: ADM does not mean Application Data Matrix in TOGAF.", whyExtended: ["TOGAF has models and artifacts, but ADM means Architecture Development Method."] },
        { text: "Automated Decision Management — a system for automated decisions.", correct: false, why: "Wrong: this is not TOGAF's ADM.", whyExtended: ["TOGAF concerns architecture work, not automated decision management as such."] }
      ]
    },
    {
      id: 9,
      type: "multi",
      title: "TOGAF vs Fowler",
      points: 2,
      prompt: "Select the statements that fit the curriculum's distinction between TOGAF and the Fowler perspective.",
      source: "Answer key: IN5431, IT Architecture perspectives.",
      options: [
        { text: "TOGAF represents a more formal architecture perspective.", correct: true, why: "Correct: TOGAF is a formal framework for Enterprise Architecture.", whyExtended: ["It provides methods, concepts and an architecture taxonomy."] },
        { text: "TOGAF is often associated with more centralized architecture work.", correct: true, why: "Correct: in the curriculum TOGAF is often linked to formal and centralized governance.", whyExtended: ["This contrasts with more decentralized/agile perspectives."] },
        { text: "Fowler describes architecture as 'the important stuff'.", correct: true, why: "Correct: this is the classic Fowler formulation.", whyExtended: ["The point is that architecture concerns important decisions and structures that are difficult to change."] },
        { text: "The Fowler perspective is more collaborative and decentralized.", correct: true, why: "Correct: the curriculum places Fowler closer to collaboration and decentralized orientation.", whyExtended: ["This may fit better with agile ways of working."] },
        { text: "Fowler is mainly a framework for project governance.", correct: false, why: "Wrong: project governance is more PRINCE2 than Fowler.", whyExtended: ["Fowler is relevant in discussions of software architecture."] },
        { text: "TOGAF is mainly a framework for IT Service Management.", correct: false, why: "Wrong: IT Service Management belongs to ITIL, not TOGAF.", whyExtended: ["TOGAF concerns Enterprise Architecture."] }
      ]
    },
    {
      id: 10,
      type: "dragDrop",
      title: "Governance, management and accountability",
      points: 2,
      prompt: "Drag each concept to the correct explanation.",
      source: "Answer key: IN5431, IT governance and Accountability Framework.",
      cards: [
        { id: "governance", text: "Governance" },
        { id: "management", text: "Management" },
        { id: "accountability", text: "Accountability" },
        { id: "decision-rights", text: "Decision rights" }
      ],
      targets: [
        { id: "governance", description: "Determines who makes decisions and who is held accountable", correctCardId: "governance", correctLabel: "Governance", whyCorrect: "Governance is about decision rights and accountability.", whyWrong: "This explanation concerns the governance structure around decisions, not execution itself.", whyExtended: ["IT governance is not primarily about making all IT decisions, but about who systematically makes and contributes to them."] },
        { id: "management", description: "Makes and implements decisions within the governance structure", correctCardId: "management", correctLabel: "Management", whyCorrect: "Management is about leading and executing work within governance frames.", whyWrong: "This describes execution and leadership, not distribution of decision rights.", whyExtended: ["Governance sets the frames; management acts within the frames."] },
        { id: "accountability", description: "Being answerable for results and consequences", correctCardId: "accountability", correctLabel: "Accountability", whyCorrect: "Accountability means that someone is held responsible for the outcome.", whyWrong: "The keyword is responsibility for outcomes, not just the right to decide.", whyExtended: ["In D4D, the Accountability Framework concerns responsibility for digital offerings and components."] },
        { id: "decision-rights", description: "Authority to make or contribute to specific decisions", correctCardId: "decision-rights", correctLabel: "Decision rights", whyCorrect: "Decision rights describe who has the authority to make or contribute to decisions.", whyWrong: "This is about decision authority, not general accountability or operations.", whyExtended: ["Weill & Ross use decision rights as a core idea in IT governance."] }
      ]
    },
    {
      id: 11,
      type: "single",
      title: "What is IT governance primarily about?",
      points: 1,
      prompt: "What is IT governance primarily concerned with?",
      source: "Answer key: IN5431, IT governance, Weill & Ross.",
      options: [
        { text: "Determining who systematically makes and contributes to IT decisions, and who is held accountable.", correct: true, why: "Correct: IT governance concerns decision rights and accountability.", whyExtended: ["Management makes decisions; governance determines who should make them and how accountability is distributed."] },
        { text: "Letting the IT department make all decisions alone.", correct: false, why: "Wrong: this describes one possible archetype, IT monarchy, not governance as a whole.", whyExtended: ["Governance may be business monarchy, federal, duopoly, feudal, anarchy and so on."] },
        { text: "Writing source code faster.", correct: false, why: "Wrong: this is more about development practice than governance.", whyExtended: ["Governance is about decision rights and accountability."] },
        { text: "Choosing programming languages for every project.", correct: false, why: "Wrong: it may be a technical decision, but it is not the definition of IT governance.", whyExtended: ["The governance question is who should have authority to make such decisions."] }
      ]
    },
    {
      id: 12,
      type: "dragDrop",
      title: "IT governance decision domains",
      points: 2,
      prompt: "Drag each decision domain to the correct explanation.",
      source: "Answer key: IN5431, IT governance decision domains.",
      cards: [
        { id: "it-principles", text: "IT principles" },
        { id: "it-architecture", text: "IT architecture" },
        { id: "it-infrastructure", text: "IT infrastructure strategies" },
        { id: "business-application-needs", text: "Business application needs" },
        { id: "it-investment", text: "IT investment" }
      ],
      targets: [
        { id: "it-principles", description: "IT's role, desired behavior and overall financing/governance principles", correctCardId: "it-principles", correctLabel: "IT principles", whyCorrect: "IT principles concern the overarching principles for IT's role in the organization.", whyWrong: "This explanation is broad and principled, not a concrete application decision.", whyExtended: ["The domain translates business principles into IT principles."] },
        { id: "it-architecture", description: "Integration, standardization and logic for core processes/data", correctCardId: "it-architecture", correctLabel: "IT architecture", whyCorrect: "IT architecture concerns the logic for data, processes and technical capabilities across the organization.", whyWrong: "The key words are integration and standardization, not investment prioritization.", whyExtended: ["This domain connects closely to operating model and enterprise architecture."] },
        { id: "it-infrastructure", description: "Shared technical services, networks, platforms and standards", correctCardId: "it-infrastructure", correctLabel: "IT infrastructure strategies", whyCorrect: "IT infrastructure strategies concern shared technical services and infrastructure.", whyWrong: "This is about technical foundations, not specific business application requests.", whyExtended: ["Infrastructure decisions affect scalability, security and standardization."] },
        { id: "business-application-needs", description: "Business units' needs for applications and functionality", correctCardId: "business-application-needs", correctLabel: "Business application needs", whyCorrect: "Business application needs start from the application needs of business units.", whyWrong: "This is about business demand for application functionality, not infrastructure principles.", whyExtended: ["This domain concerns what applications the business needs to perform its work."] },
        { id: "it-investment", description: "Prioritizing and funding IT initiatives", correctCardId: "it-investment", correctLabel: "IT investment", whyCorrect: "IT investment concerns which IT initiatives receive funding and priority.", whyWrong: "This explanation concerns money and prioritization, not technical architecture.", whyExtended: ["It connects closely to Business case and Alternative analysis."] }
      ]
    },
    {
      id: 13,
      type: "dragDrop",
      title: "IT governance archetypes",
      points: 2,
      prompt: "Drag each governance archetype to the correct description.",
      source: "Answer key: IN5431, IT governance archetypes, Weill & Ross.",
      cards: [
        { id: "business-monarchy", text: "Business monarchy" },
        { id: "it-monarchy", text: "IT monarchy" },
        { id: "feudal", text: "Feudal" },
        { id: "federal", text: "Federal" },
        { id: "it-duopoly", text: "IT duopoly" },
        { id: "anarchy", text: "Anarchy" }
      ],
      targets: [
        { id: "business-monarchy", description: "Senior business executives make the IT decisions", correctCardId: "business-monarchy", correctLabel: "Business monarchy", whyCorrect: "Business monarchy means that senior business executives decide.", whyWrong: "The CIO may be involved, but the archetype is business-led.", whyExtended: ["This is a centralized business authority pattern."] },
        { id: "it-monarchy", description: "IT executives or IT specialists make the IT decisions", correctCardId: "it-monarchy", correctLabel: "IT monarchy", whyCorrect: "IT monarchy places decision authority with IT leadership.", whyWrong: "The key is that IT, not business units, holds the authority.", whyExtended: ["This can strengthen technical standardization but may weaken local business fit."] },
        { id: "feudal", description: "Business units make separate decisions for their own needs", correctCardId: "feudal", correctLabel: "Feudal", whyCorrect: "Feudal governance means separate business units decide independently.", whyWrong: "This is decentralized by business unit, not a shared federal model.", whyExtended: ["It can provide local fit, but may create fragmentation."] },
        { id: "federal", description: "Corporate leadership and business units share decision-making", correctCardId: "federal", correctLabel: "Federal", whyCorrect: "Federal combines central and local representation.", whyWrong: "The analogy is central government and states.", whyExtended: ["It tries to balance enterprise-wide alignment and local needs."] },
        { id: "it-duopoly", description: "IT leaders and one business group jointly make decisions", correctCardId: "it-duopoly", correctLabel: "IT duopoly", whyCorrect: "IT duopoly combines IT leadership with business representatives.", whyWrong: "The key is a two-party structure involving IT and business.", whyExtended: ["It is often used when IT expertise and business ownership both matter."] },
        { id: "anarchy", description: "Individuals or small groups make their own IT decisions", correctCardId: "anarchy", correctLabel: "Anarchy", whyCorrect: "Anarchy is the most decentralized archetype.", whyWrong: "This is not coordinated governance, but individual/local decision-making.", whyExtended: ["It may allow flexibility, but creates high risk of duplication and fragmentation."] }
      ]
    },
    {
      id: 14,
      type: "fill",
      title: "Business process",
      points: 1,
      prompt: "A business process is a set of ________ with a logical order and dependencies, aiming to produce a desired result.",
      answers: ["activities"],
      answerKey: "activities",
      source: "Answer key: IN5431, Business processes and IT Architecture.",
      whyCorrect: "A business process consists of activities with logical order and dependencies.",
      whyWrong: "The key term is activities. A process is not just a system, an organization chart or a document."
    },
    {
      id: 15,
      type: "dragDrop",
      title: "Process concepts",
      points: 2,
      prompt: "Drag each process concept to the correct explanation.",
      source: "Answer key: IN5431, business process modeling and BPMN.",
      cards: [
        { id: "business-process", text: "Business process" },
        { id: "bpmn", text: "BPMN" },
        { id: "swimlane", text: "Swimlane" },
        { id: "sequence-flow", text: "Sequence flow" },
        { id: "manual-activity", text: "Manual activity" },
        { id: "automatic-activity", text: "Automatic activity" }
      ],
      targets: [
        { id: "business-process", description: "Activities with logical order and dependencies that produce a desired result", correctCardId: "business-process", correctLabel: "Business process", whyCorrect: "A business process is structured work that produces a result.", whyWrong: "The key is activities, order, dependencies and desired result.", whyExtended: ["Process models help show how work actually happens."] },
        { id: "bpmn", description: "A notation for modeling business processes", correctCardId: "bpmn", correctLabel: "BPMN", whyCorrect: "BPMN is a common notation for process modeling.", whyWrong: "BPMN is not a project framework or architecture layer.", whyExtended: ["BPMN is used to show events, activities, flows and responsibilities."] },
        { id: "swimlane", description: "A visual lane that shows responsibility/role in a process model", correctCardId: "swimlane", correctLabel: "Swimlane", whyCorrect: "A swimlane shows who is responsible for activities in a process.", whyWrong: "The key is responsibility/role.", whyExtended: ["Swimlanes are useful for understanding handoffs between actors."] },
        { id: "sequence-flow", description: "The arrow/flow that shows the order of activities", correctCardId: "sequence-flow", correctLabel: "Sequence flow", whyCorrect: "Sequence flow shows order and dependency between activities.", whyWrong: "This is the flow between steps, not the actor or the task itself.", whyExtended: ["The flow indicates logical order and dependency."] },
        { id: "manual-activity", description: "An activity performed manually by a person", correctCardId: "manual-activity", correctLabel: "Manual activity", whyCorrect: "A manual activity is performed by a human actor.", whyWrong: "The keyword is manual.", whyExtended: ["Process models often distinguish manual and automated activities."] },
        { id: "automatic-activity", description: "An activity performed automatically by a system", correctCardId: "automatic-activity", correctLabel: "Automatic activity", whyCorrect: "An automatic activity is performed by a system.", whyWrong: "The keyword is automatic/system-executed.", whyExtended: ["Automated activities are important for understanding the link between process and IT systems."] }
      ]
    },
    {
      id: 16,
      type: "single",
      title: "Why do CIOs care about processes?",
      points: 1,
      prompt: "Why are business processes relevant for CIOs and IT architecture?",
      source: "Answer key: IN5431, Business processes and IT Architecture.",
      options: [
        { text: "Because processes show how work, systems, roles and dependencies fit together.", correct: true, why: "Correct: process models make the connection between people, work and systems visible.", whyExtended: ["This is necessary for analyzing and changing the IT portfolio and the organization's ways of working."] },
        { text: "Because process models replace strategy.", correct: false, why: "Wrong: process models support analysis and change, but do not replace strategy.", whyExtended: ["Strategy says what the organization should achieve; process models help understand how work is performed."] },
        { text: "Because all processes should always be fully automated.", correct: false, why: "Wrong: the curriculum does not say that all processes should be automated.", whyExtended: ["The point is to understand processes and assess appropriate changes."] },
        { text: "Because business processes are only technical workflows.", correct: false, why: "Wrong: business processes include people, roles, activities and organization, not only technology.", whyExtended: ["Process analysis is socio-technical."] }
      ]
    },
    {
      id: 17,
      type: "dragDrop",
      title: "Generic decision-making model",
      points: 2,
      prompt: "Drag each step in the generic decision-making model to the correct explanation.",
      source: "Answer key: IN5431, CIO Toolbox 1, generic decision-making process.",
      cards: [
        { id: "understand", text: "Understand the situation" },
        { id: "synthesize", text: "Synthesize options" },
        { id: "evaluate", text: "Evaluate and propose" }
      ],
      targets: [
        { id: "understand", description: "Analyze the problem, context and why the situation is as it is", correctCardId: "understand", correctLabel: "Understand the situation", whyCorrect: "The first step is to understand the situation and root causes.", whyWrong: "This is the analysis phase before solutions are created.", whyExtended: ["Here you consider internal competence, technical assets and cultural factors."] },
        { id: "synthesize", description: "Develop alternative actions or concepts", correctCardId: "synthesize", correctLabel: "Synthesize options", whyCorrect: "The second step is to create alternative concepts or courses of action.", whyWrong: "This is about creating alternatives, not evaluating them yet.", whyExtended: ["The goal is to ensure that relevant alternatives are actually considered."] },
        { id: "evaluate", description: "Compare alternatives and recommend a choice", correctCardId: "evaluate", correctLabel: "Evaluate and propose", whyCorrect: "The third step is evaluation and recommendation.", whyWrong: "This is the step where business case, plus/minus method or other evaluation methods are used.", whyExtended: ["The level of detail should scale with consequence, uncertainty and trust."] }
      ]
    },
    {
      id: 18,
      type: "dragDrop",
      title: "Business case concepts",
      points: 3,
      prompt: "Drag each Business case concept to the correct explanation.",
      source: "Answer key: IN5431, Business case, NPV and Alternative analysis.",
      cards: [
        { id: "expected-benefit", text: "Expected benefit" },
        { id: "expected-cost", text: "Expected cost" },
        { id: "timing", text: "Timing" },
        { id: "risk", text: "Risk" },
        { id: "npv", text: "NPV" },
        { id: "discount-rate", text: "Discount rate" },
        { id: "risk-premium", text: "Risk premium" }
      ],
      targets: [
        { id: "expected-benefit", description: "The value the alternative is expected to create", correctCardId: "expected-benefit", correctLabel: "Expected benefit", whyCorrect: "Expected benefit is expected value/utility.", whyWrong: "This is the benefit side, not cost or risk.", whyExtended: ["Benefits can be quantifiable or non-quantifiable."] },
        { id: "expected-cost", description: "The resources the alternative is expected to require", correctCardId: "expected-cost", correctLabel: "Expected cost", whyCorrect: "Expected cost is expected resource use/cost.", whyWrong: "This is about what the alternative requires, not what it creates.", whyExtended: ["Cost may be investment, operations, maintenance or change cost."] },
        { id: "timing", description: "When benefits and costs occur", correctCardId: "timing", correctLabel: "Timing", whyCorrect: "Timing is about when cash flows and benefits arrive.", whyWrong: "This is the time dimension in Business case.", whyExtended: ["Timing matters in NPV because future benefits are discounted."] },
        { id: "risk", description: "The probability that benefits or costs differ from estimates", correctCardId: "risk", correctLabel: "Risk", whyCorrect: "Risk concerns uncertainty in estimates.", whyWrong: "This is about deviation from expectation, not the cost itself.", whyExtended: ["Risk can be handled with a risk premium or sensitivity in estimates."] },
        { id: "npv", description: "Present value of future cash flows minus investment cost", correctCardId: "npv", correctLabel: "NPV", whyCorrect: "NPV compares the present value of future cash flows with the investment cost.", whyWrong: "This is the quantitative Business case calculation.", whyExtended: ["NPV is used to compare alternatives financially."] },
        { id: "discount-rate", description: "The rate used to discount future cash flows to present value", correctCardId: "discount-rate", correctLabel: "Discount rate", whyCorrect: "The discount rate converts future values into present value.", whyWrong: "This is the rate in the NPV calculation, not the total budget.", whyExtended: ["A higher discount rate makes future benefits worth less today."] },
        { id: "risk-premium", description: "An additional discounting premium used to reflect uncertainty", correctCardId: "risk-premium", correctLabel: "Risk premium", whyCorrect: "Risk premium is a risk adjustment that can increase the discount rate.", whyWrong: "This is risk adjustment, not an ordinary cost item.", whyExtended: ["Lecture examples use different risk premiums for different alternatives."] }
      ]
    },
    {
      id: 19,
      type: "single",
      title: "Discount rate",
      points: 1,
      prompt: "What is the role of the discount rate in NPV?",
      source: "Answer key: IN5431, Business case and NPV.",
      options: [
        { text: "It converts future cash flows to present value.", correct: true, why: "Correct: the discount rate is used to calculate what future values are worth today.", whyExtended: ["This makes timing and risk relevant in Business case."] },
        { text: "It removes all project risk.", correct: false, why: "Wrong: the discount rate can reflect risk, but it does not remove it.", whyExtended: ["Estimates are still uncertain."] },
        { text: "It calculates the total budget directly.", correct: false, why: "Wrong: the budget is a cost estimate; the discount rate is used in present value calculation.", whyExtended: ["Discount rate is not the same as total cost."] },
        { text: "It automatically ranks qualitative benefits.", correct: false, why: "Wrong: qualitative benefits must be assessed separately.", whyExtended: ["Business case is more than NPV; non-quantifiable benefits must also be considered."] }
      ]
    },
    {
      id: 20,
      type: "drag-categorize",
      title: "Quantifiable and non-quantifiable benefits",
      points: 2,
      prompt: "Drag each example to the correct type of benefit in a Business case.",
      source: "Answer key: IN5431, Business case.",
      items: [
        { id: "time-saved", label: "Time saved" },
        { id: "conversion-rate", label: "Increased conversion rate" },
        { id: "reduced-cost", label: "Reduced operating costs" },
        { id: "increased-revenue", label: "Increased revenue" },
        { id: "compliance", label: "Compliance" },
        { id: "security", label: "Security" },
        { id: "safety", label: "Safety" },
        { id: "reputation", label: "Better reputation" }
      ],
      categories: [
        { id: "quantifiable", label: "Quantifiable benefits" },
        { id: "non-quantifiable", label: "Non-quantifiable benefits" }
      ],
      correctAnswer: {
        quantifiable: ["time-saved", "conversion-rate", "reduced-cost", "increased-revenue"],
        "non-quantifiable": ["compliance", "security", "safety", "reputation"]
      },
      itemFeedback: {
        "time-saved": { whyCorrect: "Time saved can often be measured and valued.", whyWrong: "This is typically quantifiable.", whyExtended: ["Time can be translated into cost or capacity."] },
        "conversion-rate": { whyCorrect: "Conversion rate is a measurable benefit.", whyWrong: "This is quantitative because it can be measured in percentages/numbers.", whyExtended: ["Its relevance depends on the digital service."] },
        "reduced-cost": { whyCorrect: "Reduced operating costs can usually be quantified.", whyWrong: "This is a measurable financial effect.", whyExtended: ["Cost reduction is often central in Business case."] },
        "increased-revenue": { whyCorrect: "Increased revenue can be measured financially.", whyWrong: "This is normally quantifiable.", whyExtended: ["The estimate may still be uncertain."] },
        "compliance": { whyCorrect: "Compliance is often important, but difficult to quantify directly.", whyWrong: "Compliance is normally treated as a non-quantifiable benefit or constraint.", whyExtended: ["Some compliance effects can be monetized, but the key benefit is often legal/organizational legitimacy."] },
        "security": { whyCorrect: "Security benefits are often important but hard to value precisely.", whyWrong: "Security is not always easily quantifiable in advance.", whyExtended: ["It can reduce risk, but risk reduction is difficult to estimate perfectly."] },
        "safety": { whyCorrect: "Safety may be critical even if it is not easily converted into money.", whyWrong: "Safety is often a non-quantifiable benefit.", whyExtended: ["Safety can outweigh a purely financial NPV calculation."] },
        "reputation": { whyCorrect: "Reputation can matter greatly but is hard to quantify precisely.", whyWrong: "Better reputation is usually not a direct financial number in the Business case.", whyExtended: ["It may later affect revenue or trust."] }
      }
    },
    {
      id: 21,
      type: "dragDrop",
      title: "Project and triple constraint",
      points: 2,
      prompt: "Drag each project concept to the correct explanation.",
      source: "Answer key: IN5431, Projects and PRINCE2.",
      cards: [
        { id: "project", text: "Project" },
        { id: "temporary-organization", text: "Temporary organization" },
        { id: "scope", text: "Scope" },
        { id: "time", text: "Time" },
        { id: "cost", text: "Cost" },
        { id: "triple-constraint", text: "Triple constraint" }
      ],
      targets: [
        { id: "project", description: "A temporary organization established to deliver specified results/products within a specified period", correctCardId: "project", correctLabel: "Project", whyCorrect: "A project is a temporary organization with defined results and timeframe.", whyWrong: "The key is temporary organization and specified deliverables.", whyExtended: ["Projects are used to organize implementation of change."] },
        { id: "temporary-organization", description: "A time-limited structure created to coordinate a specific initiative", correctCardId: "temporary-organization", correctLabel: "Temporary organization", whyCorrect: "A project creates a temporary structure around work.", whyWrong: "This is not permanent line organization.", whyExtended: ["The temporary structure ends when the project ends."] },
        { id: "scope", description: "What the project is expected to deliver", correctCardId: "scope", correctLabel: "Scope", whyCorrect: "Scope is what is included in the delivery.", whyWrong: "Scope is not time or cost.", whyExtended: ["Changing scope affects time and cost."] },
        { id: "time", description: "Schedule or deadline", correctCardId: "time", correctLabel: "Time", whyCorrect: "Time is the schedule/deadline dimension.", whyWrong: "Time is not budget or scope.", whyExtended: ["Time constraints affect planning and risk."] },
        { id: "cost", description: "Budget or resource limitation", correctCardId: "cost", correctLabel: "Cost", whyCorrect: "Cost is the budget/resource dimension.", whyWrong: "Cost is not scope or schedule.", whyExtended: ["If cost is fixed, changes in scope/time become harder."] },
        { id: "triple-constraint", description: "The tension between scope, time and cost", correctCardId: "triple-constraint", correctLabel: "Triple constraint", whyCorrect: "Triple constraint describes the relationship between scope, time and cost.", whyWrong: "The point is the interaction among all three constraints.", whyExtended: ["When all three are fixed, the project becomes vulnerable."] }
      ]
    },
    {
      id: 22,
      type: "single",
      title: "What is the problem with triple constraint?",
      points: 1,
      prompt: "Why can a project become vulnerable when scope, time and cost are all fixed?",
      source: "Answer key: IN5431, Projects and triple constraint.",
      options: [
        { text: "Because there is little flexibility to handle uncertainty, learning or changing conditions.", correct: true, why: "Correct: when all three dimensions are fixed, the project has little room to adapt.", whyExtended: ["Uncertainty is normal in digital projects, especially when requirements or context change."] },
        { text: "Because fixed scope, time and cost always guarantee quality.", correct: false, why: "Wrong: fixing all constraints can reduce quality or increase risk.", whyExtended: ["Quality often becomes the hidden variable under pressure."] },
        { text: "Because projects should never have budgets.", correct: false, why: "Wrong: projects need budgets, but unrealistic fixed constraints are risky.", whyExtended: ["The issue is not budgeting itself, but rigidity under uncertainty."] },
        { text: "Because PRINCE2 forbids planning.", correct: false, why: "Wrong: PRINCE2 is strongly concerned with planning and governance.", whyExtended: ["The risk is unrealistic planning, not planning as such."] }
      ]
    },
    {
      id: 23,
      type: "drag-categorize",
      title: "Project vs product team",
      points: 2,
      prompt: "Drag each characteristic to the correct organizing logic.",
      source: "Answer key: IN5431, Projects, product teams and agile methods.",
      items: [
        { id: "temporary-delivery", label: "Temporary delivery organization" },
        { id: "specified-result", label: "Specified result within a specified period" },
        { id: "stage-control", label: "Planning, monitoring and control by stages" },
        { id: "lasting-ownership", label: "Lasting ownership of a digital product/service" },
        { id: "continuous-development", label: "Continuous development and operations" },
        { id: "outcome-learning", label: "Outcome, learning and pivots over time" }
      ],
      categories: [
        { id: "project", label: "Project logic" },
        { id: "product-team", label: "Product team logic" }
      ],
      correctAnswer: {
        project: ["temporary-delivery", "specified-result", "stage-control"],
        "product-team": ["lasting-ownership", "continuous-development", "outcome-learning"]
      },
      itemFeedback: {
        "temporary-delivery": { whyCorrect: "A project is a temporary organization.", whyWrong: "Temporary delivery points to project logic.", whyExtended: ["Product teams are more lasting."] },
        "specified-result": { whyCorrect: "Projects deliver specified results/products within a specified period.", whyWrong: "Specified result and timeframe are core project characteristics.", whyExtended: ["This matches the project definition from the lecture."] },
        "stage-control": { whyCorrect: "Stage control fits project governance, especially PRINCE2.", whyWrong: "Stage-by-stage planning and monitoring is project logic.", whyExtended: ["PRINCE2 manages projects by stages."] },
        "lasting-ownership": { whyCorrect: "Product teams have lasting ownership of a product/service.", whyWrong: "Lasting ownership points to product team logic.", whyExtended: ["This differs from temporary project delivery."] },
        "continuous-development": { whyCorrect: "Continuous development and operations fit product teams.", whyWrong: "Continuous ownership is not typical project logic.", whyExtended: ["Product teams often combine development and operations responsibility."] },
        "outcome-learning": { whyCorrect: "Product teams focus on outcomes, learning and pivots.", whyWrong: "This is more product/agile logic than fixed project delivery.", whyExtended: ["Pivots and learning are expected in product team logic."] }
      }
    },
    {
      id: 24,
      type: "dragDrop",
      title: "Frameworks and intended use",
      points: 2,
      prompt: "Drag each framework to its intended use in the curriculum.",
      source: "Answer key: IN5431, CIO Toolbox and framework lectures.",
      cards: [
        { id: "prince2", text: "PRINCE2" },
        { id: "scrum", text: "Scrum" },
        { id: "safe", text: "SAFe" },
        { id: "togaf", text: "TOGAF" },
        { id: "itil", text: "ITIL" },
        { id: "prosci-adkar", text: "Prosci / ADKAR" }
      ],
      targets: [
        { id: "prince2", description: "Project governance and project management", correctCardId: "prince2", correctLabel: "PRINCE2", whyCorrect: "PRINCE2 is a framework for project governance and management.", whyWrong: "This is the project framework, not architecture or IT service management.", whyExtended: ["PRINCE2 includes principles, themes and processes."] },
        { id: "scrum", description: "Agile software delivery in sprints", correctCardId: "scrum", correctLabel: "Scrum", whyCorrect: "Scrum is an agile framework based on sprints and self-organizing teams.", whyWrong: "This is agile delivery, not Enterprise Architecture.", whyExtended: ["Tasks are prioritized by value and handled in sprint cycles."] },
        { id: "safe", description: "Scaling agile methods in larger organizations", correctCardId: "safe", correctLabel: "SAFe", whyCorrect: "SAFe is used to scale agile methods.", whyWrong: "This is about scaled agile, not project governance in the PRINCE2 sense.", whyExtended: ["SAFe is relevant when agile work must be coordinated across a larger organization."] },
        { id: "togaf", description: "Enterprise Architecture and ADM", correctCardId: "togaf", correctLabel: "TOGAF", whyCorrect: "TOGAF is a framework for Enterprise Architecture.", whyWrong: "This is architecture work, not IT Service Management.", whyExtended: ["TOGAF uses ADM as its architecture development method."] },
        { id: "itil", description: "IT Service Management", correctCardId: "itil", correctLabel: "ITIL", whyCorrect: "ITIL is a framework for IT Service Management.", whyWrong: "This is not TOGAF or PRINCE2.", whyExtended: ["ITIL concerns service management, operations and service delivery."] },
        { id: "prosci-adkar", description: "Change management", correctCardId: "prosci-adkar", correctLabel: "Prosci / ADKAR", whyCorrect: "Prosci/ADKAR are change management models.", whyWrong: "This concerns organizational change, not Enterprise Architecture.", whyExtended: ["Change management is relevant for IT management, but outside the main CIO Toolbox table."] }
      ]
    },
    {
      id: 25,
      type: "drag-categorize",
      title: "Frameworks: link to the CIO Toolbox",
      points: 2,
      prompt: "Drag each framework or method to the CIO Toolbox area it fits best.",
      source: "Answer key: IN5431, CIO Toolbox overview.",
      items: [
        { id: "business-case", label: "Business case" },
        { id: "plus-minus", label: "Plus/minus method" },
        { id: "double-diamond", label: "Double Diamond" },
        { id: "togaf", label: "TOGAF" },
        { id: "bpmn", label: "BPMN" },
        { id: "prince2", label: "PRINCE2" },
        { id: "scrum", label: "Scrum" },
        { id: "weill-ross", label: "Weill & Ross governance matrix" }
      ],
      categories: [
        { id: "choice", label: "Choice / prioritization" },
        { id: "exploration", label: "Exploration / innovation" },
        { id: "architecture", label: "IT Architecture" },
        { id: "organizing", label: "Organizing development" },
        { id: "governance", label: "IT governance" }
      ],
      correctAnswer: {
        choice: ["business-case", "plus-minus"],
        exploration: ["double-diamond"],
        architecture: ["togaf", "bpmn"],
        organizing: ["prince2", "scrum"],
        governance: ["weill-ross"]
      },
      itemFeedback: {
        "business-case": { whyCorrect: "Business case supports choice and prioritization.", whyWrong: "Business case belongs to the choice part of the toolbox.", whyExtended: ["It is often used when evaluating investment alternatives."] },
        "plus-minus": { whyCorrect: "The plus/minus method is used to evaluate alternatives.", whyWrong: "Plus/minus belongs to choice/evaluation.", whyExtended: ["It can complement financial Business case."] },
        "double-diamond": { whyCorrect: "Double Diamond is central in Design Thinking and exploration.", whyWrong: "It is an exploratory innovation method.", whyExtended: ["Discover, Define, Develop, Deliver."] },
        togaf: { whyCorrect: "TOGAF belongs to IT Architecture.", whyWrong: "TOGAF is not a project method.", whyExtended: ["It is an Enterprise Architecture framework."] },
        bpmn: { whyCorrect: "BPMN belongs to business process modeling under IT Architecture.", whyWrong: "BPMN is used to model processes, not to manage projects.", whyExtended: ["It helps understand roles, activities and dependencies."] },
        prince2: { whyCorrect: "PRINCE2 belongs to projects and organizing development.", whyWrong: "PRINCE2 is a project framework.", whyExtended: ["It is used for project governance and management."] },
        scrum: { whyCorrect: "Scrum belongs to agile/product development methods.", whyWrong: "Scrum is not an Enterprise Architecture framework.", whyExtended: ["It organizes work in sprints."] },
        "weill-ross": { whyCorrect: "The Weill & Ross matrix belongs to IT governance.", whyWrong: "It concerns decision domains and governance archetypes.", whyExtended: ["It is used to analyze who should make IT decisions."] }
      }
    },
    {
      id: 26,
      type: "dragDrop",
      title: "D4D building blocks",
      points: 2,
      prompt: "Drag each D4D building block to the correct definition.",
      source: "Answer key: IN5431, Designed for Digital building blocks.",
      cards: [
        { id: "operational-backbone", text: "Operational Backbone" },
        { id: "shared-customer-insights", text: "Shared Customer Insights" },
        { id: "digital-platform", text: "Digital Platform" },
        { id: "accountability-framework", text: "Accountability Framework" },
        { id: "external-developer-platform", text: "External Developer Platform" }
      ],
      targets: [
        { id: "operational-backbone", description: "A coherent set of standardized and integrated systems, processes and data supporting core operations", correctCardId: "operational-backbone", correctLabel: "Operational Backbone", whyCorrect: "Operational Backbone provides stable, integrated and standardized core operations.", whyWrong: "This definition concerns core operations, not external partners or innovation components.", whyExtended: ["It supports efficiency, reliability and transparency."] },
        { id: "shared-customer-insights", description: "Organizational learning about what customers will pay for and how digital technologies can deliver to their demands", correctCardId: "shared-customer-insights", correctLabel: "Shared Customer Insights", whyCorrect: "Shared Customer Insights concerns learning about customers and digital opportunities.", whyWrong: "The key is customer learning, not internal process standardization.", whyExtended: ["It helps identify valuable digital offerings."] },
        { id: "digital-platform", description: "A repository of business, data and infrastructure components used to rapidly configure digital offerings", correctCardId: "digital-platform", correctLabel: "Digital Platform", whyCorrect: "Digital Platform is a repository of reusable components for digital offerings.", whyWrong: "This is about internal reusable components, not only core transaction processing.", whyExtended: ["It enables rapid innovation and continuous feature enhancement."] },
        { id: "accountability-framework", description: "Distribution of responsibilities for digital offerings and components that balances autonomy and alignment", correctCardId: "accountability-framework", correctLabel: "Accountability Framework", whyCorrect: "Accountability Framework distributes responsibility and balances autonomy with alignment.", whyWrong: "This concerns roles, responsibility and decision-making, not data components.", whyExtended: ["It should enable innovation without chaos."] },
        { id: "external-developer-platform", description: "A repository of digital components open to external parties", correctCardId: "external-developer-platform", correctLabel: "External Developer Platform", whyCorrect: "External Developer Platform opens digital components to partners or external developers.", whyWrong: "The key is external access through APIs or boundary resources.", whyExtended: ["It can extend the portfolio of digital offerings through ecosystem partners."] }
      ]
    },
    {
      id: 27,
      type: "dragDrop",
      title: "Digital business design concepts",
      points: 2,
      prompt: "Drag each Designed for Digital concept to the correct explanation.",
      source: "Answer key: IN5431, Designed for Digital.",
      cards: [
        { id: "digital-business-design", text: "Digital Business Design" },
        { id: "digital-offering", text: "Digital Offering" },
        { id: "digital-value-proposition", text: "Digital Value Proposition" },
        { id: "smacit", text: "SMACIT" },
        { id: "silos", text: "Silos" }
      ],
      targets: [
        { id: "digital-business-design", description: "Holistic organizational configuration of people, processes and technology to define and deliver digital value propositions", correctCardId: "digital-business-design", correctLabel: "Digital Business Design", whyCorrect: "Digital Business Design is holistic: people, processes and technology.", whyWrong: "This is broader than IT architecture alone.", whyExtended: ["It is a top management responsibility, not only an IT responsibility."] },
        { id: "digital-offering", description: "A specific solution that delivers on a digital value proposition", correctCardId: "digital-offering", correctLabel: "Digital Offering", whyCorrect: "Digital offerings are the concrete solutions customers use or experience.", whyWrong: "This is the offering, not the whole design of the company.", whyExtended: ["Digital offerings often combine software, data and user experience."] },
        { id: "digital-value-proposition", description: "Use of IT to create new digital offerings that enable new value creation", correctCardId: "digital-value-proposition", correctLabel: "Digital Value Proposition", whyCorrect: "Digital Value Proposition explains the value the digital offering should create.", whyWrong: "This is the value logic, not the technical platform itself.", whyExtended: ["It connects customer need and digital capability."] },
        { id: "smacit", description: "Social, Mobile, Analytics, Cloud and Internet of Things", correctCardId: "smacit", correctLabel: "SMACIT", whyCorrect: "SMACIT is the acronym for key digital technologies in the book.", whyWrong: "This is a technology acronym, not a governance framework.", whyExtended: ["SMACIT technologies enable many digital offerings."] },
        { id: "silos", description: "Organizational structures that optimize local units but hinder cross-company integration and synchronization", correctCardId: "silos", correctLabel: "Silos", whyCorrect: "Silos can block integration and synchronization across the company.", whyWrong: "This is an organizational problem, not a technology acronym.", whyExtended: ["Breaking silos is important for digital offerings that require cross-functional coordination."] }
      ]
    },
    {
      id: 28,
      type: "SequenceOrder",
      title: "Double Diamond – order of the design process",
      points: 2,
      prompt: "Place the Double Diamond phases in the correct order.",
      source: "Answer key: IN5431, Design Thinking and Double Diamond.",
      items: [
        { id: "discover", label: "Discover" },
        { id: "define", label: "Define" },
        { id: "develop", label: "Develop" },
        { id: "deliver", label: "Deliver" }
      ],
      correctOrder: ["discover", "define", "develop", "deliver"],
      itemFeedback: {
        discover: { whyCorrect: "Discover comes first because the problem and user context must be explored.", whyWrong: "You should not define or build before exploring the situation.", whyExtended: ["This phase uses user insight, observation and exploration."] },
        define: { whyCorrect: "Define comes after Discover because insights are used to frame the problem.", whyWrong: "The problem definition should be based on discovery, not assumed at the start.", whyExtended: ["Problem reframing is central here."] },
        develop: { whyCorrect: "Develop comes after the problem is defined because solution alternatives are created here.", whyWrong: "Development should be based on a clearer problem definition.", whyExtended: ["This phase may include co-design and prototyping."] },
        deliver: { whyCorrect: "Deliver comes last because solutions are tested, refined and delivered.", whyWrong: "Delivery should follow exploration, definition and solution development.", whyExtended: ["Small-scale testing is important in this phase."] }
      },
      whyCorrect: "The Double Diamond order is Discover → Define → Develop → Deliver.",
      whyExtended: ["The first diamond explores and defines the problem; the second develops and delivers solutions."],
      whyExtendedImageRefs: [
        "double_diamond_model"
      ]
    },
    {
      id: 29,
      type: "SequenceOrder",
      title: "Generic decision-making model – order",
      points: 2,
      prompt: "Place the generic decision-making process in the correct order.",
      source: "Answer key: IN5431, Alternative analysis and generic decision-making process.",
      items: [
        { id: "understand", label: "Understand the situation" },
        { id: "synthesize", label: "Synthesize options" },
        { id: "evaluate", label: "Evaluate and propose" }
      ],
      correctOrder: ["understand", "synthesize", "evaluate"],
      itemFeedback: {
        understand: { whyCorrect: "Understanding the situation comes first because the problem and context must be analyzed.", whyWrong: "Do not create or evaluate alternatives before understanding the situation.", whyExtended: ["This includes root causes, competence, technical assets and cultural factors."] },
        synthesize: { whyCorrect: "Synthesizing options comes second because alternatives must be created before they can be evaluated.", whyWrong: "Options are synthesized after situation analysis.", whyExtended: ["Options may be concepts, vendors, products or actions."] },
        evaluate: { whyCorrect: "Evaluate and propose comes last because the alternatives are compared here.", whyWrong: "A recommendation should not come before the alternatives are developed.", whyExtended: ["This is where Business case, plus/minus method or real options may be used."] }
      },
      whyCorrect: "The order is Understand the situation → Synthesize options → Evaluate and propose.",
      whyExtended: ["The process moves from problem understanding to alternatives and then to recommendation."],
      whyExtendedImageRefs: [
        "generic_decision_making_process"
      ]
    },
    {
      id: 30,
      type: "SequenceOrder",
      title: "PRINCE2 – simplified process order",
      points: 2,
      prompt: "Place the simplified PRINCE2 process flow in the most logical order.",
      source: "Answer key: IN5431, PRINCE2 processes.",
      items: [
        { id: "starting-up", label: "Starting up a project" },
        { id: "directing", label: "Directing a project" },
        { id: "initiating", label: "Initiating a project" },
        { id: "controlling", label: "Controlling a stage" },
        { id: "product-delivery", label: "Managing product delivery" },
        { id: "stage-boundaries", label: "Managing stage boundaries" },
        { id: "closing", label: "Closing a project" }
      ],
      correctOrder: ["starting-up", "directing", "initiating", "controlling", "product-delivery", "stage-boundaries", "closing"],
      itemFeedback: {
        "starting-up": { whyCorrect: "Starting up a project comes first because the project idea must be assessed before initiation.", whyWrong: "Start-up happens before full initiation and delivery.", whyExtended: ["It checks whether the project is worth initiating."] },
        directing: { whyCorrect: "Directing a project provides governance from the project board.", whyWrong: "Direction must be established before and during the project.", whyExtended: ["It is the governance layer around the project."] },
        initiating: { whyCorrect: "Initiating a project defines the project in more detail before controlled delivery.", whyWrong: "Initiation should occur before stage control and product delivery.", whyExtended: ["Plans, risk approach and business case are clarified here."] },
        controlling: { whyCorrect: "Controlling a stage happens during execution of a stage.", whyWrong: "Stage control comes after initiation and before stage boundary decisions.", whyExtended: ["The project manager monitors and controls work in the current stage."] },
        "product-delivery": { whyCorrect: "Managing product delivery concerns the delivery work within a stage.", whyWrong: "Product delivery happens during controlled execution, not before initiation.", whyExtended: ["Teams deliver agreed products."] },
        "stage-boundaries": { whyCorrect: "Managing stage boundaries happens when moving between stages.", whyWrong: "Boundary management requires a stage to have been controlled and delivered.", whyExtended: ["It supports decision-making about continuing the project."] },
        closing: { whyCorrect: "Closing a project comes last because the project is formally ended after deliverables and closure activities are handled.", whyWrong: "Closure comes after the project stages and deliverables are completed or the project is stopped in a controlled way.", whyExtended: ["The project should close in a controlled manner."] }
      },
      whyCorrect: "A simplified PRINCE2 order is Starting up → Directing → Initiating → Controlling a stage → Managing product delivery → Managing stage boundaries → Closing.",
      whyExtended: ["PRINCE2 is a project governance and management framework, so the process order is tied to control and accountability."],
      whyExtendedImageRefs: [
        "prince2_framework_model"
      ]
    },
    {
      id: 31,
      type: "SequenceOrder",
      title: "TOGAF ADM – architecture phases",
      points: 2,
      prompt: "Place the simplified TOGAF ADM phases in the correct order.",
      source: "Answer key: IN5431, TOGAF ADM.",
      items: [
        { id: "architecture-vision", label: "Architecture Vision" },
        { id: "business-architecture", label: "Business Architecture" },
        { id: "information-systems", label: "Information Systems Architecture" },
        { id: "technology-architecture", label: "Technology Architecture" },
        { id: "opportunities-solutions", label: "Opportunities and Solutions" },
        { id: "migration-planning", label: "Migration Planning" },
        { id: "implementation-governance", label: "Implementation Governance" },
        { id: "architecture-change", label: "Architecture Change Management" }
      ],
      correctOrder: ["architecture-vision", "business-architecture", "information-systems", "technology-architecture", "opportunities-solutions", "migration-planning", "implementation-governance", "architecture-change"],
      itemFeedback: {
        "architecture-vision": { whyCorrect: "Architecture Vision comes first because it establishes direction and scope for the architecture work.", whyWrong: "The vision should be set before describing business, information systems and technology architecture.", whyExtended: ["It frames the architecture effort."] },
        "business-architecture": { whyCorrect: "Business Architecture comes after the vision because business, processes and governance must be understood before information systems and technology are detailed.", whyWrong: "Business Architecture should come before Information Systems and Technology Architecture.", whyExtended: ["It connects strategy and organization to architecture."] },
        "information-systems": { whyCorrect: "Information Systems Architecture follows Business Architecture because data and applications must support business needs.", whyWrong: "Information systems should be designed after the business context is understood.", whyExtended: ["This includes Data Architecture and Application Architecture."] },
        "technology-architecture": { whyCorrect: "Technology Architecture follows because technical infrastructure should support the business and information systems architecture.", whyWrong: "Technology should not be detailed before business and information system needs are understood.", whyExtended: ["It covers infrastructure, platforms and technical standards."] },
        "opportunities-solutions": { whyCorrect: "Opportunities and Solutions comes after the target architectures because solution options can then be identified.", whyWrong: "Solutions should build on the architecture descriptions.", whyExtended: ["This phase moves from architecture descriptions toward implementation options."] },
        "migration-planning": { whyCorrect: "Migration Planning comes after solution options because the transition must be planned.", whyWrong: "Migration planning depends on knowing the target and solution options.", whyExtended: ["It creates a roadmap for moving from current to target architecture."] },
        "implementation-governance": { whyCorrect: "Implementation Governance follows migration planning because implementation must be governed against the architecture.", whyWrong: "Governance of implementation requires a plan and target architecture.", whyExtended: ["This supports alignment during implementation."] },
        "architecture-change": { whyCorrect: "Architecture Change Management comes last because architecture must be maintained and evolved after implementation.", whyWrong: "Change management of the architecture follows implementation and ongoing use.", whyExtended: ["Architecture is not a one-off document; it evolves."] }
      },
      whyCorrect: "The simplified ADM order is Architecture Vision → Business Architecture → Information Systems Architecture → Technology Architecture → Opportunities and Solutions → Migration Planning → Implementation Governance → Architecture Change Management.",
      whyExtended: ["ADM provides a structured lifecycle for architecture work."],
      whyExtendedImageRefs: [
        "togaf_adm_en"
      ]
    },
    {
      id: 32,
      type: "SequenceOrder",
      title: "Business case – from alternative to recommendation",
      points: 2,
      prompt: "Place the Business case evaluation logic in a reasonable order.",
      source: "Answer key: IN5431, Business case and utility maximization.",
      items: [
        { id: "define-option", label: "Define the alternative" },
        { id: "estimate-benefits", label: "Estimate expected benefits" },
        { id: "estimate-costs", label: "Estimate expected costs" },
        { id: "assess-timing", label: "Assess timing" },
        { id: "assess-risk-discount", label: "Assess risk / discount rate" },
        { id: "compare-recommend", label: "Compare and recommend" }
      ],
      correctOrder: ["define-option", "estimate-benefits", "estimate-costs", "assess-timing", "assess-risk-discount", "compare-recommend"],
      itemFeedback: {
        "define-option": { whyCorrect: "The alternative must be defined before it can be evaluated.", whyWrong: "You cannot estimate benefit, cost, timing or risk without knowing the alternative.", whyExtended: ["Alternatives may be concepts, vendors, products or initiatives."] },
        "estimate-benefits": { whyCorrect: "Expected benefits should be estimated early because they describe the value side.", whyWrong: "Benefits are one of the main Business case factors and must be estimated before recommendation.", whyExtended: ["Benefits may be quantifiable or non-quantifiable."] },
        "estimate-costs": { whyCorrect: "Expected costs must be estimated to understand the resource side.", whyWrong: "Costs are needed before comparison and recommendation.", whyExtended: ["Costs can include investment, maintenance and change costs."] },
        "assess-timing": { whyCorrect: "Timing matters because benefits and costs occur at different points in time.", whyWrong: "Timing should be assessed before NPV-style comparison.", whyExtended: ["Future values are discounted in NPV."] },
        "assess-risk-discount": { whyCorrect: "Risk and discount rate should be assessed before comparing alternatives.", whyWrong: "Risk affects how attractive an alternative is.", whyExtended: ["Risk premium can reflect uncertainty in estimates."] },
        "compare-recommend": { whyCorrect: "Compare and recommend comes last because alternatives can only be ranked after benefit, cost, timing and risk have been assessed.", whyWrong: "Recommendation should not come before the Business case factors are analyzed.", whyExtended: ["The recommendation may combine NPV and qualitative considerations."] }
      },
      whyCorrect: "A reasonable order is define the alternative → estimate benefits → estimate costs → assess timing → assess risk/discount rate → compare and recommend.",
      whyExtended: ["Business case is a structured way of making alternatives transparent, not a guarantee of perfectly rational choice."],
      whyExtendedImageRefs: [
        "NPV_formula"
      ]
    },
    {
      id: 33,
      type: "SequenceOrder",
      title: "From strategy to implementation",
      points: 2,
      prompt: "Place the management chain from strategic direction to implementation in a logical order.",
      source: "Answer key: IN5431, strategy, action plan and implementation.",
      items: [
        { id: "strategic-goals", label: "Strategic goals" },
        { id: "strategy", label: "Strategy" },
        { id: "action-plan", label: "Action plan" },
        { id: "roadmap-estimates", label: "Activities, roadmap and estimates" },
        { id: "implementation", label: "Implementation" }
      ],
      correctOrder: ["strategic-goals", "strategy", "action-plan", "roadmap-estimates", "implementation"],
      itemFeedback: {
        "strategic-goals": { whyCorrect: "Strategic goals come first because the organization needs to know what it is trying to achieve.", whyWrong: "Goals should be established before choosing a strategy and action plan.", whyExtended: ["Owners, members or citizens/politicians set expectations that become strategic goals."] },
        strategy: { whyCorrect: "Strategy comes after goals because strategy defines how the organization should position itself and make trade-offs.", whyWrong: "Strategy should be based on goals and purpose, not on random implementation activities.", whyExtended: ["Operational effectiveness is necessary, but not the same as strategy."] },
        "action-plan": { whyCorrect: "Action plan comes after strategy because the strategy must be translated into concrete activities and responsibility.", whyWrong: "The action plan is the output of the strategy process, not the starting point.", whyExtended: ["The lecture describes the action plan as a concrete result of the strategy process."] },
        "roadmap-estimates": { whyCorrect: "Activities, roadmap and estimates concretize the action plan through what should be done, sequence/timeline and resource estimates.", whyWrong: "Activities, roadmap and estimates should be developed after the action plan is established.", whyExtended: ["The curriculum says that an action plan should include activities, responsibility, expected order/timeframe and estimates/budgets."] },
        implementation: { whyCorrect: "Implementation comes last because the organization first needs goals, strategy and plan before actions are carried out.", whyWrong: "Implementation without goals, strategy and plan can become random and hard to govern.", whyExtended: ["Implementation can be organized as projects, product teams, reorganization or changed priorities in day-to-day operations."] }
      },
      whyCorrect: "A logical management chain is Strategic goals → Strategy → Action plan → Activities/roadmap/estimates → Implementation.",
      whyExtended: ["Strategy gives direction, but must be translated into concrete action.", "The action plan connects strategic choice to responsibility, timeline and resources."],
      whyExtendedImageRefs: [
        "strategy_action_plan_model"
      ]
    }
  ]
};

//src/data/exams/mockExam2_en.js
export const mockExam2_en = {
  id: "mock-exam-2-en",
  baseId: "mock-exam-2",
  lang: "en",
  title: "Practice Exam 2: Deep Dive",
  description: "Operating models, governance archetypes, D4D roadmap, sustainability and Cynefin.",
  questions: [
    {
      id: 101,
      type: "fill",
      title: "Digitization vs digitalization",
      points: 1,
      prompt: "________ is a sociotechnical process where digital technology is used to change one or more sociotechnical structures.",
      answers: ["digitalization"],
      answerKey: "Digitalization",
      source: "Source: Lecture 7, D4D building blocks, slide 'What is the difference between digitization, digitalization and digital transformation?'.",
      whyCorrect: "Digitalization is defined as sociotechnical change, as opposed to digitization which is purely technical conversion from analog to digital.",
      whyWrong: "Digitization is wrong because it only concerns technical conversion (e.g. paper to PDF). Digital transformation is too broad — it describes an entire organizational change over time."
    },
    {
      id: 102,
      type: "single",
      title: "Operating model: Coordination",
      points: 1,
      prompt: "Which operating model fits best for organizations with unique business units that need to know each other's transactions, but do NOT standardize processes?",
      source: "Source: Lecture 5, slide 'Four operating models' (Figure A1.1 from D4D).",
      options: [
        { text: "Diversification", correct: false, why: "Wrong: diversification has low integration AND low standardization. Here the integration is high." },
        { text: "Coordination", correct: true, why: "Correct: coordination = high integration, low standardization. Unique units that share data." },
        { text: "Unification", correct: false, why: "Wrong: unification has high standardization in addition to high integration." },
        { text: "Replication", correct: false, why: "Wrong: replication has high standardization but low integration." }
      ]
    },
    {
      id: 103,
      type: "single",
      title: "Operating model: Replication",
      points: 1,
      prompt: "Which operating model describes independent but similar business units that share best practices?",
      source: "Source: Lecture 5, slide 'Four operating models'.",
      options: [
        { text: "Coordination", correct: false, why: "Wrong: coordination requires that units share data/transactions (high integration)." },
        { text: "Unification", correct: false, why: "Wrong: unification also requires high integration between units." },
        { text: "Replication", correct: true, why: "Correct: low integration, high standardization — similar processes, but units operate independently." },
        { text: "Diversification", correct: false, why: "Wrong: diversification has low standardization, meaning different processes." }
      ]
    },
    {
      id: 104,
      type: "fill",
      title: "Digital transformation",
      points: 1,
      prompt: "Digital transformation is a significant organizational change, driven or enabled by the extensive use of ________ technologies.",
      answers: ["digital"],
      answerKey: "digital",
      source: "Source: Lecture 14, slide 'What is a digital transformation': 'A significant organizational change, driven or enabled by the extensive use of digital technologies.'",
      whyCorrect: "Correct because the definition explicitly links digital transformation to the extensive use of digital technologies.",
      whyWrong: "Wrong if the answer only points to 'new processes' or 'leadership'. Technology is a central driver/enabler in the definition."
    },
    {
      id: 105,
      type: "multi",
      title: "Contents of a digital strategy",
      points: 1,
      prompt: "Mark the elements that according to the lecture are part of a digital strategy.",
      source: "Source: Lecture 14, slide 'What is a digital strategy?' and subsequent slides.",
      options: [
        { text: "A digital vision — challenging and inspiring", correct: true, why: "Correct: digital vision is the first element." },
        { text: "A portfolio of digital initiatives", correct: true, why: "Correct: prioritization of digital projects/initiatives." },
        { text: "A roadmap", correct: true, why: "Correct: roadmap is a planning tool for implementation." },
        { text: "A definition of responsibilities", correct: true, why: "Correct: clarification of who owns and follows up." },
        { text: "A complete BPMN model of all processes", correct: false, why: "Wrong: BPMN is a process modeling tool, not part of the digital strategy definition." }
      ]
    },
    {
      id: 106,
      type: "single",
      title: "Governance vs management",
      points: 1,
      prompt: "What is the difference between IT governance and IT management according to Weill & Ross (2004)?",
      source: "Source: Lecture 11, slide on IT governance (Weill and Ross 2004).",
      options: [
        { text: "IT governance is about making IT decisions; management is about implementing them.", correct: false, why: "Wrong: governance is NOT about making decisions. Management does that." },
        { text: "IT governance determines who systematically makes and contributes to IT decisions; management makes and executes the decisions.", correct: true, why: "Correct: 'IT governance is not about making IT decisions — management does that — but rather determines who systematically makes and contributes to those decisions.'" },
        { text: "There is no difference; the terms are used interchangeably.", correct: false, why: "Wrong: the course clearly distinguishes them." },
        { text: "Governance is only for private companies; management is only for the public sector.", correct: false, why: "Wrong: both apply to all types of organizations." }
      ]
    },
    {
      id: 107,
      type: "single",
      title: "Federal vs IT Duopoly",
      points: 1,
      prompt: "What distinguishes Federal from IT Duopoly as a governance archetype?",
      source: "Source: Lecture 6, slide 'Summary: Six archetypal approaches to IT decision making'.",
      options: [
        { text: "Federal includes C-level and all operating groups together with IT; Duopoly is IT executives plus a group of business leaders.", correct: true, why: "Correct: Federal is broader (all representatives + IT), while Duopoly is a two-party approach (IT executives + business leaders)." },
        { text: "They are identical — both mean IT alone decides.", correct: false, why: "Wrong: that would be IT Monarchy." },
        { text: "Federal means each unit decides for itself; Duopoly means users decide.", correct: false, why: "Wrong: this describes Feudal and Anarchy respectively." },
        { text: "Federal only applies to IT infrastructure; Duopoly only applies to IT principles.", correct: false, why: "Wrong: archetypes can be applied to all five decision domains in the governance matrix." }
      ]
    },
    {
      id: 108,
      type: "multi",
      title: "Five decision domains in IT governance",
      points: 1,
      prompt: "Mark the correct decision domains in IT governance.",
      source: "Source: Lecture 6, slide 'Styringsmatrisen' and IT governance summary.",
      options: [
        { text: "IT principles", correct: true, why: "Correct: one of the five domains." },
        { text: "IT architecture", correct: true, why: "Correct: one of the five domains." },
        { text: "IT infrastructure strategies", correct: true, why: "Correct: one of the five domains." },
        { text: "Business application needs", correct: true, why: "Correct: one of the five domains." },
        { text: "IT investment and prioritization", correct: true, why: "Correct: one of the five domains." },
        { text: "IT marketing and branding", correct: false, why: "Wrong: marketing is not an IT governance domain in the Weill & Ross framework." }
      ]
    },
    {
      id: 109,
      type: "single",
      title: "Transformation theory",
      points: 1,
      prompt: "According to D4D, dual transformation requires three types of transformation. Which one includes Shared Customer Insights and Accountability Framework?",
      source: "Source: Lecture 13, D4D summary, slide 'Transformation theory'.",
      options: [
        { text: "Business Transformation", correct: false, why: "Wrong: business transformation is about new value creation through digital value propositions." },
        { text: "Architecture Transformation", correct: false, why: "Wrong: architecture transformation covers OB, DP and digital offerings." },
        { text: "Governance Transformation", correct: true, why: "Correct: governance transformation includes shared customer insight and accountability framework." },
        { text: "Cultural Transformation", correct: false, why: "Wrong: cultural transformation is not one of the three named transformations in the D4D model." }
      ]
    },
    {
      id: 110,
      type: "fill",
      title: "Circular economy",
      points: 1,
      prompt: "The circular economy is about protecting nature and the environment by keeping products, resources and materials in ________ as long as possible.",
      answers: ["circulation"],
      answerKey: "circulation",
      source: "Source: Lecture 15, slide 'The circular economy': 'Through keeping products, resources and materials in circulation as long as possible.'",
      whyCorrect: "Correct because circulation is the core of the circular economy definition — the opposite of linear 'use and discard'.",
      whyWrong: "Wrong if the answer is about 'production' or 'consumption'. The point is that things are kept in circulation, not that more is produced."
    },
    {
      id: 111,
      type: "multi",
      title: "Scope 1, 2 and 3",
      points: 1,
      prompt: "Mark the correct assignments of Scope categories.",
      source: "Source: Lecture 15, slide 'Scope 1, 2 and 3'.",
      options: [
        { text: "Scope 1: direct emissions from sources owned or controlled by the company", correct: true, why: "Correct: this is the definition of Scope 1." },
        { text: "Scope 2: indirect emissions from purchased electricity, steam, heat and cooling", correct: true, why: "Correct: this is the definition of Scope 2." },
        { text: "Scope 3: all other emissions related to the company's activities", correct: true, why: "Correct: Scope 3 covers the entire value chain." },
        { text: "Scope 2: direct emissions from the company's own factories", correct: false, why: "Wrong: own factories are Scope 1. Scope 2 is about purchased energy." }
      ]
    },
    {
      id: 112,
      type: "single",
      title: "Twin transitions",
      points: 1,
      prompt: "What is meant by 'twin transitions'?",
      source: "Source: Lecture 15, slide 'Twin transitions / tvilling-transformasjon'.",
      options: [
        { text: "Linking digital transformation and sustainability transition", correct: true, why: "Correct: twin transitions links digital transformation and sustainability transition." },
        { text: "Transition from project to product team, and from waterfall to agile", correct: false, why: "Wrong: this is an organizational change, not twin transitions." },
        { text: "Transition from Scope 1 to Scope 3 reporting", correct: false, why: "Wrong: this is about reporting scope, not the concept of twin transitions." },
        { text: "Transition from business monarchy to anarchy", correct: false, why: "Wrong: these are governance archetypes, not twin transitions." }
      ]
    },
    {
      id: 113,
      type: "single",
      title: "Double Diamond",
      points: 1,
      prompt: "What are the four phases of the Double Diamond model?",
      source: "Source: Lecture 3-4, Design thinking, CIO toolbox model.",
      options: [
        { text: "Plan → Build → Test → Deploy", correct: false, why: "Wrong: this resembles a traditional system development lifecycle." },
        { text: "Discover → Define → Develop → Deliver", correct: true, why: "Correct: these are the four phases of the Double Diamond." },
        { text: "Analyze → Design → Implement → Evaluate", correct: false, why: "Wrong: this is a generic process description, not the Double Diamond." },
        { text: "Sprint Planning → Daily Standup → Review → Retrospective", correct: false, why: "Wrong: these are Scrum ceremonies, not the Double Diamond." }
      ]
    },
    {
      id: 114,
      type: "fill",
      title: "Triple constraint",
      points: 1,
      prompt: "Projects where scope, time and ________ are all fixed are particularly vulnerable to disappointment.",
      answers: ["cost", "budget"],
      answerKey: "cost",
      source: "Source: Lecture 4, slide 'The triple constraint': 'Projects with fixed cost, scope and time are particularly vulnerable to disappointment.'",
      whyCorrect: "Correct because the triple constraint consists of scope, time and cost. All three fixed = high risk.",
      whyWrong: "Wrong if the answer points to quality, risk or resources. The model in the lecture explicitly uses scope, time and cost."
    },
    {
      id: 115,
      type: "single",
      title: "TOGAF architecture taxonomy",
      points: 1,
      prompt: "Which TOGAF architecture layer describes the structure of an organization's logical and physical data assets and data management resources?",
      source: "Source: Lecture 5, slide 'Architecture taxonomy (according to TOGAF)'.",
      options: [
        { text: "Business Architecture", correct: false, why: "Wrong: business architecture defines business strategy, governance, organization and key processes." },
        { text: "Data Architecture", correct: true, why: "Correct: data architecture describes the structure of logical and physical data assets and data management resources." },
        { text: "Application Architecture", correct: false, why: "Wrong: application architecture provides a blueprint for applications and their relationships to business processes." },
        { text: "Technology Architecture", correct: false, why: "Wrong: technology architecture describes logical software and hardware capabilities." }
      ]
    },
    {
      id: 116,
      type: "multi",
      title: "Autonomy & Alignment in AF",
      points: 1,
      prompt: "Mark statements that fit with Accountability Framework thinking.",
      source: "Source: Lecture 11, slides 'AF promotes Autonomy AND alignment'.",
      options: [
        { text: "Component owners, not project managers — responsible problem solvers", correct: true, why: "Correct: AF replaces project manager logic with component ownership." },
        { text: "Metrics, not directives — data driven", correct: true, why: "Correct: goal management rather than detailed directives." },
        { text: "Trust, not control", correct: true, why: "Correct: trust, not control is explicitly from the lecture." },
        { text: "All decisions should be centralized with one person for efficiency", correct: false, why: "Wrong: AF is about distributing responsibility and providing autonomy within alignment." }
      ]
    },
    {
      id: 117,
      type: "single",
      title: "Risk in digital transformation",
      points: 1,
      prompt: "According to D4D, what is one of the main risks of digital transformation?",
      source: "Source: Lecture 13, slide 'Risks of digital transformation'.",
      options: [
        { text: "That the organization spreads resources across too many building blocks without real progress on any of them", correct: true, why: "Correct: this is risk (1) in the D4D summary." },
        { text: "That the organization has too good an Operational Backbone", correct: false, why: "Wrong: a strong OB is an advantage, not a risk." },
        { text: "That the organization uses too many agile teams", correct: false, why: "Wrong: this is not one of the two named risks in D4D." },
        { text: "That the organization has too clear a digital vision", correct: false, why: "Wrong: a clear vision is recommended as positive in D4D." }
      ]
    },
    {
      id: 118,
      type: "fill",
      title: "Operational effectiveness",
      points: 1,
      prompt: "Operational effectiveness is necessary but not ________ to achieve sustainable competitive advantage.",
      answers: ["sufficient", "enough"],
      answerKey: "sufficient",
      source: "Source: Lecture 2, slide 16: 'Operational effectiveness is necessary, but not sufficient to achieve sustainable competitive advantage.'",
      whyCorrect: "Correct because the Porter lecture says OE is necessary but not sufficient — strategy requires trade-offs and unique positioning.",
      whyWrong: "Wrong if the answer suggests OE is completely unnecessary or that OE alone is strategy."
    },
    {
      id: 119,
      type: "single",
      title: "Digital platform components",
      points: 1,
      prompt: "Which type of component in the Digital Platform provides access to data from various sources through APIs?",
      source: "Source: Lecture 10, slide 'Digital platform'.",
      options: [
        { text: "Infrastructure components", correct: false, why: "Wrong: infrastructure components are core services like authentication and access control." },
        { text: "Data components", correct: true, why: "Correct: data components provide data from various sources and access to them through APIs." },
        { text: "Business components", correct: false, why: "Wrong: business components are dashboards, customer notifications and similar." },
        { text: "Cloud services", correct: false, why: "Wrong: cloud services are about hosting and performance management." }
      ]
    },
    {
      id: 120,
      type: "multi",
      title: "Digital roadmap sequence",
      points: 1,
      prompt: "Mark statements that match D4D's recommended sequence for digital transformation.",
      source: "Source: Lecture 13, D4D summary, slides on digital roadmap.",
      options: [
        { text: "Fix the backbone first", correct: true, why: "Correct: OB is the foundation that must be in place." },
        { text: "Don't postpone Digital Platform for too long — connect the modules", correct: true, why: "Correct: DP should come early after OB." },
        { text: "Don't rush into an External Developer Platform", correct: true, why: "Correct: ExDP requires mature internal capabilities first." },
        { text: "Start with ExDP before you have an operational backbone", correct: false, why: "Wrong: the roadmap explicitly says 'don't rush into an ExDP' — OB and DP must come first." }
      ]
    },
    {
      id: 121,
      type: "single",
      title: "Boundary resources",
      points: 1,
      prompt: "What are boundary resources in the context of External Developer Platform?",
      source: "Source: Lecture 12, External Development Platform.",
      options: [
        { text: "Internal HR documents shared with partners", correct: false, why: "Wrong: boundary resources are technical interfaces, not HR documents." },
        { text: "APIs, documentation and tools that let external parties build on the platform", correct: true, why: "Correct: boundary resources provide structured access to core components for external parties." },
        { text: "Physical offices where partners can work", correct: false, why: "Wrong: boundary resources are digital, not physical." },
        { text: "Project plans shared with subcontractors", correct: false, why: "Wrong: this is project documentation, not platform boundary resources." }
      ]
    },
    {
      id: 122,
      type: "single",
      title: "Double materiality",
      points: 1,
      prompt: "What does 'double materiality' mean in sustainability reporting?",
      source: "Source: Lecture 15, slide 'Double materiality (dobbel vesentlighet)'.",
      options: [
        { text: "That the organization must report both revenues and expenses", correct: false, why: "Wrong: that is ordinary financial reporting, not double materiality." },
        { text: "That reporting must consider both how the business impacts the world, and how sustainability impacts the business", correct: true, why: "Correct: this is the core of double materiality — impact both ways." },
        { text: "That one must use two different accounting standards", correct: false, why: "Wrong: double materiality is about perspective, not accounting standards." },
        { text: "That sustainability only concerns physical materials", correct: false, why: "Wrong: materiality in this context means significance, not physical materials." }
      ]
    },
    {
      id: 123,
      type: "fill",
      title: "Cynefin chaotic",
      points: 1,
      prompt: "In the Cynefin framework, a chaotic situation typically requires ________ action to move to a more stable state.",
      answers: ["immediate", "instant"],
      answerKey: "immediate",
      source: "Source: Lecture 4, slide on Cynefin: 'In a chaotic situation, there is typically an emergency which requires immediate action to move into a more stable state.'",
      whyCorrect: "Correct because the chaotic domain is characterized by emergencies where immediate action is needed.",
      whyWrong: "Wrong if the answer mentions 'analysis' or 'experimentation'. In chaos it is too late for thorough analysis — stabilization comes first."
    },
    {
      id: 124,
      type: "multi",
      title: "What OB does",
      points: 1,
      prompt: "Mark functions that belong to the Operational Backbone.",
      source: "Source: Lecture 9, Operational Backbone, and the IN5431 summary.",
      options: [
        { text: "Support seamless end-to-end transaction processing", correct: true, why: "Correct: this is a core function of OB." },
        { text: "Provide reliable and accessible master data", correct: true, why: "Correct: reliable core data is central." },
        { text: "Automate repetitive processes", correct: true, why: "Correct: automation of repetitive work is an OB function." },
        { text: "Replace all manual decision-making with AI", correct: false, why: "Wrong: OB is about standardization and integration, not about removing all human judgment." }
      ]
    },
    {
      id: 125,
      type: "single",
      title: "Management fashion",
      points: 1,
      prompt: "What is meant by 'management fashion' in the lecture?",
      source: "Source: Lecture 4 / CIO toolbox model / IN5431 summary.",
      options: [
        { text: "A framework that has reached a critical mass and become an intersubjective phenomenon", correct: true, why: "Correct: management fashion means a framework has become popular enough to become a 'fashion' in organizations." },
        { text: "A framework that is scientifically proven as the best for all contexts", correct: false, why: "Wrong: the lecture emphasizes that frameworks are context-dependent and sometimes disputed." },
        { text: "A method for designing clothing in the IT industry", correct: false, why: "Wrong: fashion is used here about the popularity/spread of management ideas, not clothing fashion." },
        { text: "A synonym for IT governance", correct: false, why: "Wrong: management fashion and IT governance are entirely different concepts." }
      ]
    }
  ]
};

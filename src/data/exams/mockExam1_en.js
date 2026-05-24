//src/data/exams/mockExam1_en.js
export const mockExam1_en = {
  id: "mock-exam-1-en",
  lang: "en",
  title: "Practice Exam 1: Full Review",
  description: "CIO toolbox, D4D, IT governance, strategy and sustainability.",
  questions: [
    {
      id: 1,
      type: "fill",
      title: "Business process",
      points: 1,
      prompt: "A business ________ is the combination of a set of activities within an enterprise with a structure describing their logical order and dependence whose objective is to produce a desired result.",
      answers: ["process", "business process"],
      answerKey: "process / business process",
      source: "Source: Lecture 5, Business processes and IT Architecture, slide 'What is a business process?'",
      whyCorrect: "The sentence is the definition of a business process: a set of activities with logical order and dependencies that produce a desired result.",
      whyWrong: "Other terms like project, platform or architecture don't fit because the definition describes the workflow of activities within an enterprise."
    },
    {
      id: 2,
      type: "multi",
      title: "Net present value",
      points: 1,
      prompt: "Mark the correct statements about Net Present Value (NPV).",
      source: "Source: Lecture 4, Projects/products/design thinking, slide 'From last week: Business case'.",
      options: [
        { text: "NPV takes into account the timing of cash flows.", correct: true, why: "Correct: future cash flows are discounted, so timing is central." },
        { text: "Risk is typically handled by directly increasing estimated cost in all years.", correct: false, why: "Wrong: risk can be reflected in risk premium/discount rate or uncertainty in estimates, but this statement is too narrow and mechanical." },
        { text: "NPV is a quantitative method in a business case.", correct: true, why: "Correct: NPV is a structured, quantitative calculation in a business case." },
        { text: "The most important estimates are usually conversion rate and discount rate alone.", correct: false, why: "Wrong: a business case/NPV requires benefits, costs, timing and risk. Conversion rate may be relevant in some cases but is not general enough." }
      ]
    },
    {
      id: 3,
      type: "single",
      title: "CIO toolbox",
      points: 1,
      prompt: "Which tool in the CIO toolbox is particularly linked to prioritization of digital services and funding?",
      source: "Source: Lecture 3, CIO Toolbox 1, table 'The CIO toolbox'.",
      options: [
        { text: "Business case", correct: true, why: "Correct: business case is used for prioritization of digital services and funding." },
        { text: "PRINCE2", correct: false, why: "Wrong: PRINCE2 is linked to project governance and management, not primarily funding prioritization." },
        { text: "ITIL", correct: false, why: "Wrong: ITIL is about IT service management/operations, not business case prioritization." },
        { text: "BPMN", correct: false, why: "Wrong: BPMN is a notation for process modeling, not funding prioritization." }
      ]
    },
    {
      id: 4,
      type: "single",
      title: "Alternative analysis",
      points: 1,
      prompt: "Which situation normally calls for more detailed alternative analysis?",
      source: "Source: Lecture 3, slide 'A spectrum of decision making effort'.",
      options: [
        { text: "Low impact and high experience", correct: false, why: "Wrong: this usually calls for less analysis because risk and uncertainty are lower." },
        { text: "High impact, little previous experience and low trust between decision-makers", correct: true, why: "Correct: high impact, little experience and low trust/shared perspective require more structured analysis." },
        { text: "A routine decision with established practice", correct: false, why: "Wrong: routine decisions can often be handled with simpler procedures or experience." },
        { text: "When all alternatives have equal risk", correct: false, why: "Wrong: equal risk alone is not the main reason for detailed analysis; uncertainty, impact and experience matter more." }
      ]
    },
    {
      id: 5,
      type: "fill",
      title: "Digital Business Design",
      points: 1,
      prompt: "Digital business design is a holistic organizational configuration of people, processes and ________.",
      answers: ["technology", "tech", "digital technology"],
      answerKey: "technology",
      source: "Source: Lecture 7 and the Operational Backbone lecture, definition of Digital Business Design.",
      whyCorrect: "Correct because digital business design describes the interplay between people, processes and technology.",
      whyWrong: "Wrong if the answer only points to data, strategy or architecture. The concept is explicitly three-part: people, processes and technology."
    },
    {
      id: 6,
      type: "multi",
      title: "Designed for Digital",
      points: 1,
      prompt: "Which of these are among the five D4D building blocks?",
      source: "Source: Lecture 13, Designed for digital summary, slide 'Assembling the building blocks'.",
      options: [
        { text: "Operational Backbone", correct: true, why: "Correct: one of the five building blocks." },
        { text: "Shared Customer Insights", correct: true, why: "Correct: one of the five building blocks." },
        { text: "PRINCE2", correct: false, why: "Wrong: PRINCE2 is a project management framework in the CIO toolbox, not a D4D building block." },
        { text: "Digital Platform", correct: true, why: "Correct: one of the five building blocks." },
        { text: "Accountability Framework", correct: true, why: "Correct: one of the five building blocks." },
        { text: "External Developer Platform", correct: true, why: "Correct: one of the five building blocks." }
      ]
    },
    {
      id: 7,
      type: "single",
      title: "Operational Backbone",
      points: 1,
      prompt: "What best describes an Operational Backbone?",
      source: "Source: Lecture 9, Operational Backbone, and the D4D definition sheet.",
      options: [
        { text: "A temporary project team for digital innovation", correct: false, why: "Wrong: this describes a project or product team, not a stable operational backbone." },
        { text: "A coherent set of standardized and integrated systems, processes and data supporting core operations", correct: true, why: "Correct: OB is about standardization, integration and stable support for core operations." },
        { text: "An external marketplace for third-party developers", correct: false, why: "Wrong: this resembles External Developer Platform." },
        { text: "A method for customer journeys and empathy interviews", correct: false, why: "Wrong: this fits better with design thinking/shared customer insight practices." }
      ]
    },
    {
      id: 8,
      type: "single",
      title: "Digital Platform",
      points: 1,
      prompt: "What is the main purpose of a Digital Platform in D4D?",
      source: "Source: Lecture 10, Digital Platform, slides 'A digital platform - what is it' and 'Digital platform'.",
      options: [
        { text: "To replace all business processes with manual routines", correct: false, why: "Wrong: a digital platform is about components and digital innovation, not manual routines." },
        { text: "To provide reusable business, data and infrastructure components for rapid configuration of digital offerings", correct: true, why: "Correct: this is the core of the Digital Platform definition." },
        { text: "To determine who has decision rights in IT governance", correct: false, why: "Wrong: this is accountability/governance, not digital platform." },
        { text: "To create a complete project plan before innovation starts", correct: false, why: "Wrong: this resembles project logic, while the platform enables rapid experimentation and reuse." }
      ]
    },
    {
      id: 9,
      type: "fill",
      title: "Shared Customer Insights",
      points: 1,
      prompt: "Shared Customer Insights is about organizational learning about what customers are willing to ________ for, and how digital technology can deliver on customer demands.",
      answers: ["pay"],
      answerKey: "pay",
      source: "Source: Lecture 8, Shared Customer Insight, and the exam example file.",
      whyCorrect: "Correct because Shared Customer Insights is defined as organizational learning about what customers will pay for and how digital technology can meet their needs.",
      whyWrong: "Wrong if the answer only mentions what customers 'like' or 'use'. The point is willingness to pay/value and the link to digital solutions."
    },
    {
      id: 10,
      type: "single",
      title: "Accountability Framework",
      points: 1,
      prompt: "The Accountability Framework should particularly balance ...",
      source: "Source: Lecture 11, Accountability Framework, slides on autonomy and alignment.",
      options: [
        { text: "cost and tax", correct: false, why: "Wrong: this is not the core of AF." },
        { text: "autonomy and alignment", correct: true, why: "Correct: AF distributes responsibilities for digital offerings and components so that autonomy is balanced with alignment." },
        { text: "hardware and software", correct: false, why: "Wrong: AF is organizational/governance-oriented, not a hardware/software balance." },
        { text: "scope and budget", correct: false, why: "Wrong: this fits better with project management/triple constraint." }
      ]
    },
    {
      id: 11,
      type: "single",
      title: "External Developer Platform",
      points: 1,
      prompt: "What best describes an External Developer Platform?",
      source: "Source: Lecture 12, External Development Platform, slide 'External Developer Platform'.",
      options: [
        { text: "An internal payroll system for employees", correct: false, why: "Wrong: that is an internal system, not a platform opened to external parties." },
        { text: "A repository of digital components opened to external parties", correct: true, why: "Correct: ExDP opens digital components to partners/external developers, often via APIs/boundary resources." },
        { text: "A technique for creating BPMN diagrams", correct: false, why: "Wrong: BPMN belongs to process modeling." },
        { text: "A governance archetype where end users make all IT decisions", correct: false, why: "Wrong: this describes Anarchy in IT governance, not ExDP." }
      ]
    },
    {
      id: 12,
      type: "multi",
      title: "IT governance",
      points: 1,
      prompt: "Mark the correct statements about IT governance.",
      source: "Source: Lecture 6, IT governance, slides 'IT governance' and 'Styringsmatrisen'.",
      options: [
        { text: "It is about aligning IT investments with business priorities.", correct: true, why: "Correct: effective governance aligns IT investments with business priorities." },
        { text: "It is about who makes IT decisions and who is accountable for results.", correct: true, why: "Correct: decision rights and accountability are at the core." },
        { text: "It means that all IT decisions should always be made by the IT department alone.", correct: false, why: "Wrong: some domains may be IT monarchy, but IT governance is precisely about clarifying who decides, not that IT always decides." },
        { text: "It can be described with a governance matrix with decision domains and governance archetypes.", correct: true, why: "Correct: the governance matrix links decision domains with archetypes like business monarchy, IT monarchy, federal, duopoly etc." }
      ]
    },
    {
      id: 13,
      type: "single",
      title: "IT governance archetypes",
      points: 1,
      prompt: "Which archetype describes decisions being made by an IT executive or a group of IT executives?",
      source: "Source: Lecture 6, summary of six archetypal approaches to IT decision making.",
      options: [
        { text: "Business Monarchy", correct: false, why: "Wrong: business monarchy means senior business executives make the decisions, possibly with CIO." },
        { text: "IT Monarchy", correct: true, why: "Correct: IT monarchy means an IT executive or group of IT executives makes the decisions." },
        { text: "Federal", correct: false, why: "Wrong: federal combines C-level and business representatives, often together with IT." },
        { text: "Anarchy", correct: false, why: "Wrong: anarchy means individual users or small groups pursue their own IT agenda." }
      ]
    },
    {
      id: 14,
      type: "single",
      title: "IT Architecture",
      points: 1,
      prompt: "Which statement best fits the Fowler perspective on architecture?",
      source: "Source: Lecture 5, IT Architecture, perspectives on architecture.",
      options: [
        { text: "Architecture is just the formal TOGAF processes in ADM.", correct: false, why: "Wrong: this narrows architecture down to TOGAF. The Fowler perspective is more pragmatic." },
        { text: "Architecture is 'the important stuff' — what developers and the organization consider important to understand and preserve.", correct: true, why: "Correct: Fowler is used to show a more contextual and collaborative view of architecture." },
        { text: "Architecture only concerns physical networks and hardware.", correct: false, why: "Wrong: IT architecture can include systems, software, data, integrations and decisions." },
        { text: "Architecture is identical to project management.", correct: false, why: "Wrong: project management organizes delivery; architecture is about structure, dependencies and important technological/organizational choices." }
      ]
    },
    {
      id: 15,
      type: "single",
      title: "Operating model",
      points: 1,
      prompt: "An operating model describes the desired level of ...",
      source: "Source: Lecture 5, slide on operating model and four operating models.",
      options: [
        { text: "business process integration and standardization", correct: true, why: "Correct: an operating model describes the desired level of process integration and standardization." },
        { text: "individual motivation and personality", correct: false, why: "Wrong: this is HR/leadership, not operating model in the D4D/EA sense." },
        { text: "risk premium and interest rate", correct: false, why: "Wrong: this belongs to business case/NPV." },
        { text: "number of employees and number of meetings", correct: false, why: "Wrong: an operating model is about integration/standardization of processes, not administrative capacity." }
      ]
    },
    {
      id: 16,
      type: "fill",
      title: "Project",
      points: 1,
      prompt: "A project is a ________ organization established to deliver specified results or products within a specified period.",
      answers: ["temporary", "temp"],
      answerKey: "temporary",
      source: "Source: Lecture 4, slide 'What is a project?'.",
      whyCorrect: "Correct because a project is defined as a temporary organization with a specified result and time period.",
      whyWrong: "Wrong if the answer suggests a permanent line organization. The defining feature of a project is precisely its temporary nature."
    },
    {
      id: 17,
      type: "multi",
      title: "Scrum and agile",
      points: 1,
      prompt: "Mark statements that fit with Scrum/agile thinking in the course.",
      source: "Source: IN5431 summary, Scrum: self-organizing teams, sprints, value prioritization.",
      options: [
        { text: "Work is often grouped in sprints.", correct: true, why: "Correct: Scrum organizes work in sprints." },
        { text: "Teams are self-organizing.", correct: true, why: "Correct: self-organizing teams are central in Scrum/agile." },
        { text: "Tasks are prioritized by value.", correct: true, why: "Correct: backlog/prioritization by value is central." },
        { text: "All scope, time and cost should be locked completely from the start to ensure agility.", correct: false, why: "Wrong: this is more classic project/triple constraint and fits poorly with learning and adaptation in agile." }
      ]
    },
    {
      id: 18,
      type: "single",
      title: "Design thinking",
      points: 1,
      prompt: "When does design thinking fit best?",
      source: "Source: Lecture 4, Design thinking, and CIO toolbox purpose table.",
      options: [
        { text: "When the problem is unclear and must be explored with user insight, prototyping and testing", correct: true, why: "Correct: design thinking is explorative and fits when the problem/user need is uncertain." },
        { text: "When the solution is already known and just needs to be operated as cheaply as possible", correct: false, why: "Wrong: then standard processes/operations fit better than explorative design thinking." },
        { text: "When the only goal is to calculate discounted cash flow", correct: false, why: "Wrong: this is business case/NPV, not design thinking." },
        { text: "When all decisions should be made by a single IT leader", correct: false, why: "Wrong: this describes IT monarchy, not design thinking." }
      ]
    },
    {
      id: 19,
      type: "single",
      title: "Strategy",
      points: 1,
      prompt: "According to the Porter perspective in the course, strategy is primarily ...",
      source: "Source: Lecture 2, Strategy, slides on operational effectiveness vs strategic positioning.",
      options: [
        { text: "performing the same activities slightly more efficiently than rivals", correct: false, why: "Wrong: this is operational effectiveness. It is necessary but not sufficient for strategy." },
        { text: "choosing a unique position, making trade-offs and creating a coherent activity system", correct: true, why: "Correct: the Porter perspective emphasizes unique activities, fit and trade-offs." },
        { text: "buying the newest IT system", correct: false, why: "Wrong: technology can support strategy but is not strategy in itself." },
        { text: "maximizing the number of projects in the portfolio", correct: false, why: "Wrong: strategy also involves prioritization and deciding what not to do." }
      ]
    },
    {
      id: 20,
      type: "fill",
      title: "SMACIT",
      points: 1,
      prompt: "SMACIT stands for Social, Mobile, Analytics, Cloud and Internet of ________.",
      answers: ["things", "iot"],
      answerKey: "Things / IoT",
      source: "Source: Lecture 7, Designed for digital, SMACIT slide.",
      whyCorrect: "Correct: SMACIT = Social, Mobile, Analytics, Cloud, Internet of Things.",
      whyWrong: "Wrong if the last part does not refer to IoT/Internet of Things, because the acronym in the curriculum uses this as the T."
    },
    {
      id: 21,
      type: "single",
      title: "Digital strategy",
      points: 1,
      prompt: "What is a digital strategy according to the Danilova lecture?",
      source: "Source: Lecture 14, Digital strategy and the digital transformation, slide 'What is a digital strategy?'.",
      options: [
        { text: "A pure IT procurement plan", correct: false, why: "Wrong: this is too narrow and resembles IT strategy/procurement." },
        { text: "An organizational strategy formulated and executed by leveraging digital resources to create differential value", correct: true, why: "Correct: this is the definition used in the lecture." },
        { text: "A list of all systems the organization owns", correct: false, why: "Wrong: this is more IT portfolio/architecture documentation." },
        { text: "A BPMN model of the customer journey", correct: false, why: "Wrong: BPMN/customer journey can support analysis but is not the definition of digital strategy." }
      ]
    },
    {
      id: 22,
      type: "multi",
      title: "Sustainability and IT management",
      points: 1,
      prompt: "Mark the correct statements about sustainability and digital technology.",
      source: "Source: Lecture 15, Sustainability: Implications for management, slides 3-5.",
      options: [
        { text: "Digital technology can contribute through virtualization, optimization, monitoring and innovation.", correct: true, why: "Correct: these are explicitly listed as ways digital technology can support sustainability transitions." },
        { text: "Digital technology has no negative environmental or social consequences because it is virtual.", correct: false, why: "Wrong: the lecture emphasizes materiality, e-waste, energy consumption and social disruption." },
        { text: "ICT also has material aspects such as minerals, e-waste and energy consumption.", correct: true, why: "Correct: these are central negative impacts in the lecture." },
        { text: "Top-down sustainability policy can require data and reporting.", correct: true, why: "Correct: the lecture links sustainability policy to reporting and data." }
      ]
    },
    {
      id: 23,
      type: "single",
      title: "Cynefin",
      points: 1,
      prompt: "Which management approach fits best in a complex domain?",
      source: "Source: CIO toolbox model, meta-tool Cynefin.",
      options: [
        { text: "Follow best practice and standard procedure", correct: false, why: "Wrong: this fits best in the clear domain." },
        { text: "Expert analysis alone", correct: false, why: "Wrong: this fits better in the complicated domain." },
        { text: "Experimentation, learning and iteration", correct: true, why: "Correct: the complex domain requires probe/sense/respond, experimentation and learning." },
        { text: "Immediate action without analysis", correct: false, why: "Wrong: this fits better in the chaotic domain." }
      ]
    },
    {
      id: 24,
      type: "multi",
      title: "Operational Backbone vs Digital Platform",
      points: 1,
      prompt: "Mark the correct differences between Operational Backbone and Digital Platform.",
      source: "Source: Lecture 10, Digital Platform, slide 'An Operational Backbone is Not Enough for Digital Success'.",
      options: [
        { text: "Operational Backbone emphasizes stability, standardization and integrated core processes.", correct: true, why: "Correct: OB is a reliable, integrated production environment for core processes." },
        { text: "Digital Platform emphasizes components that can be used for rapid innovation and digital offerings.", correct: true, why: "Correct: DP provides access to data, business and technology components for digital offerings." },
        { text: "Operational Backbone and Digital Platform are always the same concept.", correct: false, why: "Wrong: they are connected, but OB is the stable core while DP enables reuse and innovation." },
        { text: "A weak Operational Backbone can become an obstacle for digital transformation.", correct: true, why: "Correct: the lecture points out OB as a potential obstacle when systems, data and processes are fragmented." }
      ]
    },
    {
      id: 25,
      type: "single",
      title: "Management frameworks",
      points: 1,
      prompt: "What is a good attitude toward management frameworks in IN5431?",
      source: "Source: Lecture 3/4/6, CIO toolbox concluding remarks.",
      options: [
        { text: "Frameworks are always best practice and should be followed identically in all situations.", correct: false, why: "Wrong: the course emphasizes that frameworks are context-dependent." },
        { text: "Frameworks are goals in themselves.", correct: false, why: "Wrong: the toolbox metaphor says tools are only meaningful if they serve a purpose." },
        { text: "Frameworks can reduce uncertainty and structure practice, but must be adapted to context, people, environment and strategy.", correct: true, why: "Correct: this is the most precise IN5431 attitude toward frameworks." },
        { text: "Frameworks should be avoided because they never provide value.", correct: false, why: "Wrong: frameworks can provide value but must be used critically and context-sensitively." }
      ]
    }
  ]
};

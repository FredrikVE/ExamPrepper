// src/data/exams/mockExamDragCategorize_en.js
export const mockExamDragCategorize_en = {
  id: "mock-exam-drag-categorize-en",
  subjectId: "in5431",
  baseId: "mock-exam-drag-categorize",
  lang: "en",
  title: "Model training: drag, sort and place",
  description: "Five interactive tasks for model understanding: CIO Toolbox, D4D building blocks, IT governance, transformation theory and the operating model matrix.",
  modeLabel: "MODEL TRAINING",
  estimatedMinutes: "20–30",
  sortOrder: 90,
  questions: [
    {
      id: 1,
      type: "drag-categorize",
      title: "CIO Toolbox categories",
      points: 2,
      prompt: "Drag each tool to the correct category in the CIO Toolbox.",
      source: "Answer key: IN5431, CIO Toolbox, lectures 3–6.",
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
        { id: "choice", label: "CHOICE" },
        { id: "exploration", label: "EXPLORATION / INNOVATION" },
        { id: "governance", label: "GOVERNANCE" },
        { id: "organizing", label: "ORGANIZING" }
      ],
      correctAnswer: {
        choice: ["business-case", "alternative-analysis"],
        exploration: ["design-thinking"],
        governance: ["it-architecture", "it-governance"],
        organizing: ["projects", "product-teams"]
      },
      itemFeedback: {
        "business-case": {
          whyCorrect: "Business case belongs to CHOICE because it is used to prioritize digital services and funding.",
          whyWrong: "Business case is a choice tool: it evaluates benefit, cost, timing and risk.",
          whyExtended: [
            "It is not an organizing tool, but a decision basis."
          ]
        },
        "alternative-analysis": {
          whyCorrect: "Alternative analysis belongs to CHOICE because it structures choices between alternatives, vendors or products.",
          whyWrong: "Alternative analysis is about understanding the situation, synthesizing options and evaluating them.",
          whyExtended: [
            "Business case can be used as one evaluation method inside alternative analysis."
          ]
        },
        "design-thinking": {
          whyCorrect: "Design thinking belongs to EXPLORATION / INNOVATION because it is used when the problem is unclear.",
          whyWrong: "Design thinking is an explorative method, not a governance or organizing tool.",
          whyExtended: [
            "Typical practices are user insight, problem reframing, co-design, prototyping and testing."
          ]
        },
        "it-architecture": {
          whyCorrect: "IT Architecture belongs to GOVERNANCE because it analyzes and structures processes, systems and the IT portfolio.",
          whyWrong: "IT Architecture is about structure and governance of the IT portfolio, not about organizing development teams.",
          whyExtended: [
            "Relevant concepts are operating model, BPMN, enterprise architecture and TOGAF."
          ]
        },
        projects: {
          whyCorrect: "Projects belong to ORGANIZING because projects are temporary organizations for delivering specified results.",
          whyWrong: "Projects are used to plan and organize development work.",
          whyExtended: [
            "PRINCE2 is an example of a project governance and management framework."
          ]
        },
        "product-teams": {
          whyCorrect: "Product teams and agile methods belong to ORGANIZING because they organize continuous development and operations.",
          whyWrong: "Product teams are about lasting ownership, continuous learning and development, not decision analysis.",
          whyExtended: [
            "Scrum and SAFe are examples of agile frameworks."
          ]
        },
        "it-governance": {
          whyCorrect: "IT governance belongs to GOVERNANCE because it distributes decision rights and accountability for IT outcomes.",
          whyWrong: "IT governance is about who makes IT decisions and who is held accountable.",
          whyExtended: [
            "Weill & Ross describe decision domains, archetypes and a governance matrix."
          ]
        }
      }
    },
    {
      id: 2,
      type: "drag-categorize",
      title: "Designed for Digital building blocks",
      points: 2,
      prompt: "Drag each definition to the correct D4D building block.",
      source: "Answer key: IN5431, Designed for Digital, five building blocks.",
      items: [
        { id: "d4d-def-ob", label: "Standardized and integrated systems, processes and data for core operations" },
        { id: "d4d-def-sci", label: "Organizational learning about what customers will pay for" },
        { id: "d4d-def-dp", label: "Reusable business, data and infrastructure components" },
        { id: "d4d-def-af", label: "Distribution of responsibilities that balances autonomy and alignment" },
        { id: "d4d-def-exdp", label: "Digital components opened to external parties" }
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
          whyCorrect: "Operational Backbone is the backbone of standardized and integrated systems, processes and data.",
          whyWrong: "This describes stable core operations, not customer insight or an external ecosystem.",
          whyExtended: [
            "OB supports efficient and reliable operation of the company's core operations."
          ]
        },
        "d4d-def-sci": {
          whyCorrect: "Shared Customer Insights is organizational learning about customers and digital opportunities.",
          whyWrong: "This is about customer insight, not technical components or operational systems.",
          whyExtended: [
            "The point is to understand what customers will pay for, and how digital technology can deliver on their needs."
          ]
        },
        "d4d-def-dp": {
          whyCorrect: "Digital Platform is a repository of reusable components for digital offerings.",
          whyWrong: "This describes an internal digital platform, not operational backbone or external developer platform.",
          whyExtended: [
            "The components can be business, data and infrastructure components."
          ]
        },
        "d4d-def-af": {
          whyCorrect: "Accountability Framework distributes responsibilities and balances autonomy and alignment.",
          whyWrong: "This is about decision and accountability structure, not system integration or customer insight.",
          whyExtended: [
            "AF should enable innovation without losing organizational coordination."
          ]
        },
        "d4d-def-exdp": {
          whyCorrect: "External Developer Platform opens digital components to external partners.",
          whyWrong: "This is about external parties, not just internal reuse of components.",
          whyExtended: [
            "APIs and boundary resources are typical mechanisms for ExDP."
          ]
        }
      }
    },
    {
      id: 3,
      type: "drag-categorize",
      title: "IT governance: decision domains",
      points: 2,
      prompt: "Drag each question to the correct IT governance decision domain.",
      source: "Answer key: IN5431, IT governance, Weill & Ross decision domains.",
      items: [
        { id: "it-principles-q", label: "What is the role of IT in the organization?" },
        { id: "it-architecture-q", label: "Which core processes should be standardized and integrated?" },
        { id: "it-infrastructure-q", label: "Which shared IT services should be used across the organization?" },
        { id: "business-app-q", label: "Which applications do the business units need?" },
        { id: "it-investment-q", label: "Which IT initiatives should be funded and prioritized?" }
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
          whyCorrect: "IT Principles is about overarching principles for how IT should support the organization.",
          whyWrong: "The question is overarching and strategic, so it does not fit as an application or infrastructure need.",
          whyExtended: [
            "This domain translates business principles into IT principles."
          ]
        },
        "it-architecture-q": {
          whyCorrect: "IT Architecture is about core processes, data, integration and standardization.",
          whyWrong: "Standardization and integration of core processes are architecture questions.",
          whyExtended: [
            "This domain defines the logic for data, processes and technical capabilities across the organization."
          ]
        },
        "it-infrastructure-q": {
          whyCorrect: "IT Infrastructure is about shared technical services and infrastructure capabilities.",
          whyWrong: "Shared IT services are infrastructure questions, not investment prioritization alone.",
          whyExtended: [
            "Examples include networks, identity, security and shared platform services."
          ]
        },
        "business-app-q": {
          whyCorrect: "Business Application Needs is about which applications the business units need.",
          whyWrong: "This question starts from business unit needs, not from overarching architecture or principles.",
          whyExtended: [
            "The domain decides needs for new or changed business applications."
          ]
        },
        "it-investment-q": {
          whyCorrect: "IT Investment is about prioritization and funding of IT initiatives.",
          whyWrong: "When the question is what should be funded, it belongs to the investment domain.",
          whyExtended: [
            "This domain decides which initiatives receive resources."
          ]
        }
      }
    },
    {
      id: 4,
      type: "drag-categorize",
      title: "D4D: transformation theory",
      points: 2,
      prompt: "Drag each element to the correct transformation area in Designed for Digital.",
      source: "Answer key: IN5431, Designed for Digital summary, transformation theory.",
      items: [
        { id: "new-value-propositions", label: "New digital value propositions" },
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
          whyCorrect: "Business Transformation is about new value creation through digital value propositions.",
          whyWrong: "New value propositions are about business transformation, not primarily architecture or governance.",
          whyExtended: [
            "This is the part that changes how the organization creates value."
          ]
        },
        "operational-backbone-item": {
          whyCorrect: "Operational Backbone belongs to Architecture Transformation.",
          whyWrong: "OB is an architectural building block for standardization and integration.",
          whyExtended: [
            "It provides a stable structure for data, processes and systems."
          ]
        },
        "digital-platform-item": {
          whyCorrect: "Digital Platform belongs to Architecture Transformation because it consists of reusable digital components.",
          whyWrong: "Digital Platform is architecture for component reuse and rapid digital offerings.",
          whyExtended: [
            "It makes it possible to configure new digital offerings faster."
          ]
        },
        "digital-offerings-item": {
          whyCorrect: "Digital Offerings belongs to Architecture Transformation in this model.",
          whyWrong: "Digital offerings are concrete solutions built on the architecture and platform.",
          whyExtended: [
            "They connect customer value with digital capabilities."
          ]
        },
        "shared-customer-insight-item": {
          whyCorrect: "Shared Customer Insight belongs to Governance Transformation because the organization must learn and govern based on customer insight.",
          whyWrong: "Customer insight is about organizational learning and prioritization, not just technical architecture.",
          whyExtended: [
            "It influences which experiments and digital offerings the organization should prioritize."
          ]
        },
        "accountability-framework-item": {
          whyCorrect: "Accountability Framework belongs to Governance Transformation because it distributes responsibilities and decision rights.",
          whyWrong: "AF is about who owns components and digital offerings, and how autonomy is balanced with alignment.",
          whyExtended: [
            "Governance here is about enabling innovation without chaos."
          ]
        }
      }
    },
    {
      id: 5,
      type: "matrix-placement",
      title: "Operating model matrix",
      points: 3,
      prompt: "Drag each operating model to the correct quadrant.",
      source: "Answer key: IN5431, CIO Toolbox, lectures 3–6.",
      matrix: {
        xAxis: {
          label: "Business process integration",
          lowLabel: "Low",
          highLabel: "High"
        },
        yAxis: {
          label: "Process standardization",
          lowLabel: "Low",
          highLabel: "High"
        },
        quadrants: [
          {
            id: "high-standardization-low-integration",
            title: "High standardization / Low integration",
            description: "Standardized, limited end-to-end process integration"
          },
          {
            id: "high-standardization-high-integration",
            title: "High standardization / High integration",
            description: "Fully integrated and standardized operating model"
          },
          {
            id: "low-standardization-low-integration",
            title: "Low standardization / Low integration",
            description: "Local autonomy and variation"
          },
          {
            id: "low-standardization-high-integration",
            title: "Low standardization / High integration",
            description: "Customized processes with local adaptation and flexibility"
          }
        ]
      },
      items: [
        {
          id: "replication",
          label: "Replication",
          correctQuadrantId: "high-standardization-low-integration",
          why: "Replication means high standardization but low integration. Business units are relatively independent, but use similar or standardized processes so that best practices can be copied across units."
        },
        {
          id: "unification",
          label: "Unification",
          correctQuadrantId: "high-standardization-high-integration",
          why: "Unification means both high standardization and high integration. The organization operates as one unified entity with shared processes, shared data and tight coordination across units."
        },
        {
          id: "diversification",
          label: "Diversification",
          correctQuadrantId: "low-standardization-low-integration",
          why: "Diversification means low standardization and low integration. Business units have substantial local autonomy, different customers, different ways of working and little need for shared processes or shared data."
        },
        {
          id: "coordination",
          label: "Coordination",
          correctQuadrantId: "low-standardization-high-integration",
          why: "Coordination means high integration but low standardization. Units may have different processes, but must share information and coordinate across units, for example because one unit's transactions affect another."
        }
      ]
    }
  ]
};

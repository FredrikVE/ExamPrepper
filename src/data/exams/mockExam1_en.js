//src/data/exams/mockExam1_en.js
export const mockExam1_en = {
  id: "mock-exam-1-en",
  subjectId: "in5431",
  baseId: "mock-exam-1",
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
        {
          text: "NPV takes into account the timing of cash flows.",
          correct: true,
          why: "Correct: future cash flows are discounted, so timing is central.",
          whyExtended: [
            "The NPV formula discounts future cash flows with a discount rate, so the value of money today and in five years is not treated equally.",
            "Lecture 3 shows the NPV formula: NPV = Σ(Result_i / (1+r)^i) − I, where timing is built into the exponent.",
            "The business case tool in the CIO toolbox requires estimates of benefit, cost, timing and risk — timing is thus one of four pillars."
          ]
        },
        {
          text: "Risk is typically handled by directly increasing estimated cost in all years.",
          correct: false,
          why: "Wrong: risk can be reflected in risk premium/discount rate or uncertainty in estimates, but this statement is too narrow and mechanical.",
          whyExtended: [
            "Lecture 3 shows that risk is typically handled through a risk premium in the discount rate — not by adding cost directly.",
            "The NPV example uses different risk premiums per alternative (2% vs. 10%), which changes the discount rate, not the cost estimates.",
            "Directly increasing cost in all years is a crude simplification that does not capture that risk varies between alternatives and over time.",
            "The lecture emphasizes that risk adjustment has enormous impact on the result — it requires nuanced judgment, not mechanical add-ons."
          ]
        },
        {
          text: "NPV is a quantitative method in a business case.",
          correct: true,
          why: "Correct: NPV is a structured, quantitative calculation in a business case.",
          whyExtended: [
            "Lecture 4 describes the business case as 'a structured and quantitative approach to structure decision making', where NPV is the main method.",
            "The CIO toolbox table places NPV under 'Quantitative approach' in the business case tool.",
            "NPV is used alongside qualitative considerations (compliance, security, safety) that cannot be quantified."
          ]
        },
        {
          text: "The most important estimates are usually conversion rate and discount rate alone.",
          correct: false,
          why: "Wrong: a business case/NPV requires benefits, costs, timing and risk. Conversion rate may be relevant in some cases but is not general enough.",
          whyExtended: [
            "Lecture 3 lists four factors that must be estimated for NPV: cost of implementation, quantitative return, timing of the return and risk.",
            "Conversion rate is only one example of a quantifiable benefit — it is not universal for all business cases.",
            "The discount rate alone does not capture the full picture: you also need to estimate costs, benefits and the timing of cash flows.",
            "The lecture specifies that for non-trivial development initiatives, setting correct estimates is impossible — they are always estimates with uncertainty."
          ]
        }
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
        {
          text: "Business case",
          correct: true,
          why: "Correct: business case is used for prioritization of digital services and funding.",
          whyExtended: [
            "The CIO toolbox table explicitly shows that Business case has 'Prioritization of digital services and funding' as its typical purpose.",
            "Business case analyzes benefit, cost, timing and risk for each alternative — thereby enabling prioritization among competing initiatives.",
            "NPV, which is the core calculation in a business case, provides a basis for comparing and ranking investment alternatives."
          ]
        },
        {
          text: "PRINCE2",
          correct: false,
          why: "Wrong: PRINCE2 is linked to project governance and management, not primarily funding prioritization.",
          whyExtended: [
            "PRINCE2 is a framework for project governance and management — it falls under the 'Projects' tool in the CIO toolbox.",
            "Lecture 6 places PRINCE2 under 'Project governance and management' with origin from UK government.",
            "PRINCE2 does have 'continued business justification' as a principle, but that is about maintaining justification during the project — not about the initial investment prioritization.",
            "The typical purpose for the Projects tool is 'Plan and organize development', not funding prioritization."
          ]
        },
        {
          text: "ITIL",
          correct: false,
          why: "Wrong: ITIL is about IT service management/operations, not business case prioritization.",
          whyExtended: [
            "ITIL (IT Infrastructure Library) is a framework for IT service management and lies outside the CIO toolbox itself in the course.",
            "Lecture 6 places ITIL under 'Outside the toolbox, but part of IT management' together with change management and procurement.",
            "ITIL focuses on stable operation of IT services — not on choosing between investment alternatives or prioritizing funding.",
            "The course's CIO toolbox model has seven tools, and ITIL is not one of them."
          ]
        },
        {
          text: "BPMN",
          correct: false,
          why: "Wrong: BPMN is a notation for process modeling, not funding prioritization.",
          whyExtended: [
            "BPMN (Business Process Model and Notation) is a modeling technique that belongs under the IT Architecture tool in the CIO toolbox.",
            "IT Architecture has 'Analyze and structure the IT portfolio — both within and among systems and services' as its typical purpose.",
            "BPMN is used to map process flows with roles, activities and dependencies — it is an analysis technique, not a prioritization tool.",
            "Funding decisions require NPV and business case, not process diagrams."
          ]
        }
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
        {
          text: "Low impact and high experience",
          correct: false,
          why: "Wrong: this usually calls for less analysis because risk and uncertainty are lower.",
          whyExtended: [
            "The CIO toolbox model explicitly states: 'Low impact / familiar → less formal analysis'.",
            "When the organization has high experience with similar decisions, uncertainty is lower and the need for structured analysis is smaller.",
            "Lecture 3 summarizes that for decisions with low impact, simpler procedures and established practice can be used.",
            "It is the combination of high impact + low experience + low trust that drives the need for detailed analysis."
          ]
        },
        {
          text: "High impact, little previous experience and low trust between decision-makers",
          correct: true,
          why: "Correct: high impact, little experience and low trust/shared perspective require more structured analysis.",
          whyExtended: [
            "Lecture 3 summarizes: 'For high impact decisions, little prior experience, less trust and/or shared perspective among decision makers: spending time to make a business case is often worthwhile.'",
            "The CIO toolbox model describes this as a spectrum: 'High impact / low experience / low trust → detailed alternative analysis'.",
            "Low trust between decision-makers means that a transparent and structured process is necessary to build consensus.",
            "The lecture emphasizes that business case work is not exact science — bias, experience and politics influence the result."
          ]
        },
        {
          text: "A routine decision with established practice",
          correct: false,
          why: "Wrong: routine decisions can often be handled with simpler procedures or experience.",
          whyExtended: [
            "Routine decisions correspond to 'low impact / familiar' on the spectrum — they do not require the same degree of formal analysis.",
            "In Cynefin terms, a routine decision would be in the 'clear' domain, where established procedures are sufficient.",
            "Lecture 3 shows that analysis effort should scale with the situation — routines do not need a business case.",
            "Using detailed alternative analysis for routine decisions would be unnecessary resource expenditure."
          ]
        },
        {
          text: "When all alternatives have equal risk",
          correct: false,
          why: "Wrong: equal risk alone is not the main reason for detailed analysis; uncertainty, impact and experience matter more.",
          whyExtended: [
            "Lecture 3 identifies impact, experience and trust as the main drivers for analysis effort — not risk profile alone.",
            "If all alternatives have equal risk, it can actually simplify the analysis because risk drops out as a differentiating factor.",
            "It is uncertainty and disagreement among decision-makers that makes detailed analysis valuable — not that risk is equal.",
            "The NPV calculation shows that when the risk premium is equal, ranking is determined by benefits, costs and timing alone."
          ]
        }
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
      whyCorrect: "Correct because digital business design describes the interplay between people, processes and technology, not just IT systems in isolation.",
      whyWrong: "Wrong if the answer only points to data, strategy or architecture. The concept is explicitly three-part: people, processes and technology."
    },
    {
      id: 6,
      type: "multi",
      title: "Designed for Digital",
      moduleId: "designed-for-digital",
      groupId: "d4d-building-blocks",
      points: 1,
      prompt: "Which of these are among the five D4D building blocks?",
      source: "Source: Lecture 13, Designed for digital summary, slide 'Assembling the building blocks'.",
      options: [
        {
          text: "Operational Backbone",
          correct: true,
          why: "Correct: one of the five building blocks.",
          whyExtended: [
            "Operational Backbone is defined as 'a coherent set of standardized, integrated systems, processes, and data supporting a company's core operations'.",
            "OB is one of the five building blocks that the D4D book and Lecture 13 identify as necessary for digital success.",
            "44% of executives identify OB as the biggest obstacle to digital transformation — showing how central this building block is.",
            "OB belongs to architecture transformation in D4D's dual transformation theory."
          ],
          whyExtendedImageRefs: [
            { imageId: "OB", groupId: "operational-backbone" }
          ]
        },
        {
          text: "Shared Customer Insights",
          correct: true,
          why: "Correct: one of the five building blocks.",
          whyExtended: [
            "Shared Customer Insights is defined as 'organizational learning about what customers will pay for and how digital technologies can deliver to their demands'.",
            "This building block is about shared understanding of customer needs and market opportunities — shared across the organization.",
            "Lecture 8 shows that this is the foundation for customer-driven digital offerings.",
            "SCI belongs to governance transformation in D4D's dual transformation theory."
          ],
          whyExtendedImageRefs: [
            { imageId: "SCI", groupId: "shared-customer-insights" }
          ]
        },
        {
          text: "PRINCE2",
          correct: false,
          why: "Wrong: PRINCE2 is a project management framework in the CIO toolbox, not a D4D building block.",
          whyExtended: [
            "The D4D building blocks describe organizational capabilities, not methods or frameworks for project management.",
            "PRINCE2 is a project management framework originating from UK government and belongs under the 'Projects' tool in the CIO toolbox.",
            "The five D4D building blocks are: Operational Backbone, Shared Customer Insights, Digital Platform, Accountability Framework and External Developer Platform.",
            "PRINCE2 focuses on governance of individual projects, while D4D is about lasting organizational capabilities for digital transformation."
          ]
        },
        {
          text: "Digital Platform",
          correct: true,
          why: "Correct: one of the five building blocks.",
          whyExtended: [
            "Digital Platform is defined as 'repository of business, data, and infrastructure components used to rapidly configure digital offerings'.",
            "DP provides access to reusable data, business and technology components that enable rapid innovation.",
            "Lecture 10 clearly distinguishes DP from OB: OB provides stability, while DP enables experimentation and continuous improvement.",
            "DP belongs to architecture transformation together with OB."
          ],
          whyExtendedImageRefs: [
            { imageId: "DP", groupId: "digital-platform" }
          ]
        },
        {
          text: "Accountability Framework",
          correct: true,
          why: "Correct: one of the five building blocks.",
          whyExtended: [
            "Accountability Framework is defined as 'distribution of responsibilities for digital offerings and components that balances autonomy and alignment'.",
            "AF ensures that digital initiatives are followed up with clear ownership — component owners rather than project managers.",
            "Lecture 11 emphasizes the balance between autonomy (creativity, speed) and alignment (common direction, reuse).",
            "AF belongs to governance transformation in D4D's dual transformation theory."
          ],
          whyExtendedImageRefs: [
            { imageId: "AF", groupId: "accountability-framework" }
          ]
        },
        {
          text: "External Developer Platform",
          correct: true,
          why: "Correct: one of the five building blocks.",
          whyExtended: [
            "External Developer Platform is defined as 'repository of digital components open to external parties'.",
            "ExDP opens digital components to partners and external developers, typically via APIs and boundary resources.",
            "Lecture 12 shows two types of ExDP: one that lets partners use internal components in their own offerings (like Google Maps), and one that creates a marketplace (like Apple App Store).",
            "The D4D roadmap recommends not rushing into an ExDP — it requires a mature OB and DP first."
          ],
          whyExtendedImageRefs: [
            { imageId: "ExDP", groupId: "external-developer-platform" }
          ]
        }
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
        {
          text: "A temporary project team for digital innovation",
          correct: false,
          why: "Wrong: this describes a project or product team, not a stable operational backbone.",
          whyExtended: [
            "OB is by definition a lasting, stable capability — not a temporary organization like a project.",
            "Lecture 4 defines a project as 'a temporary organization established to deliver specified results within a specified period' — that is the opposite of OB.",
            "OB is about standardization and integration of core processes over time, not about time-limited innovation initiatives.",
            "Digital innovation is supported by Digital Platform and product teams, not by the Operational Backbone directly."
          ]
        },
        {
          text: "A coherent set of standardized and integrated systems, processes and data supporting core operations",
          correct: true,
          why: "Correct: OB is about standardization, integration and stable support for core operations.",
          whyExtended: [
            "The definition from the D4D definition sheet: 'A coherent set of standardized, integrated systems, processes, and data supporting a company's core operations.'",
            "Lecture 9 emphasizes that OB provides a 'tightly integrated, bulletproof production environment to ensure reliability and security of business processes'.",
            "MIT CISR research shows that companies with an effective OB are 2.5 times more agile and 44% more innovative than companies without.",
            "OB is the foundation that enables further digital transformation — without a functioning OB, you lack a stable base to build on."
          ]
        },
        {
          text: "An external marketplace for third-party developers",
          correct: false,
          why: "Wrong: this resembles External Developer Platform.",
          whyExtended: [
            "An external marketplace for third-party developers describes External Developer Platform (ExDP), the fifth D4D building block.",
            "ExDP opens digital components to external parties, for example through APIs — like Apple App Store or the Google Maps platform.",
            "OB is internally oriented and is about standardization of core processes, while ExDP is outward-facing toward the ecosystem.",
            "Lecture 12 specifies that ExDP requires 'a very well designed and managed internal platform' — it presupposes a mature OB and DP."
          ]
        },
        {
          text: "A method for customer journeys and empathy interviews",
          correct: false,
          why: "Wrong: this fits better with design thinking/shared customer insight practices.",
          whyExtended: [
            "Customer journeys and empathy interviews are techniques from design thinking, which is tool no. 3 in the CIO toolbox.",
            "Design thinking is used when the problem is unclear and requires exploration — with the double diamond process: Discover, Define, Develop, Deliver.",
            "Shared Customer Insights as a D4D building block is about organizational learning about what customers will pay for, but OB is not that building block.",
            "OB focuses on systems, processes and data for stable operations — it is an infrastructure capability, not a user insight method."
          ]
        }
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
        {
          text: "To replace all business processes with manual routines",
          correct: false,
          why: "Wrong: a digital platform is about components and digital innovation, not manual routines.",
          whyExtended: [
            "Digital Platform is about the opposite of manual routines — it is a repository of reusable digital components.",
            "DP enables rapid innovation and continuous improvement through modular business, data and infrastructure components.",
            "Lecture 10 distinguishes between OB (which automates and standardizes operations) and DP (which enables experimentation with new digital offerings).",
            "Replacing digital processes with manual routines would be a step backward that undermines the entire D4D logic."
          ]
        },
        {
          text: "To provide reusable business, data and infrastructure components for rapid configuration of digital offerings",
          correct: true,
          why: "Correct: this is the core of the Digital Platform definition.",
          whyExtended: [
            "The D4D definition sheet says: 'Repository of business, data, and infrastructure components used to rapidly configure digital offerings.'",
            "Lecture 12 divides DP components into four types: data components (API access to data), infrastructure components (authentication, access control), business components (dashboards, customer alerts) and cloud services (hosting, performance management).",
            "Lecture 10 emphasizes that DP provides 'easy access to the data, business and technology components that make up digital offerings — experimentation, rapid innovation and continuous feature enhancement'.",
            "DP differs from OB by focusing on flexibility and reuse rather than stability and standardization."
          ]
        },
        {
          text: "To determine who has decision rights in IT governance",
          correct: false,
          why: "Wrong: this is accountability/governance, not digital platform.",
          whyExtended: [
            "Decision rights belong to Accountability Framework (AF) and IT governance, not Digital Platform.",
            "IT governance is defined as specifying 'decision rights and accountability framework to encourage desirable behaviour in using IT' (Weill and Ross 2004).",
            "AF as a D4D building block explicitly deals with the distribution of responsibilities for digital offerings and components.",
            "DP is technology- and architecture-oriented — it is about components and reuse, not about decision authority."
          ]
        },
        {
          text: "To create a complete project plan before innovation starts",
          correct: false,
          why: "Wrong: this resembles project logic, while the platform enables rapid experimentation and reuse.",
          whyExtended: [
            "A complete project plan belongs to the project approach in the CIO toolbox, with planning, roadmap and budget.",
            "DP is designed for the opposite: rapid configuration of digital offerings through reuse of modular components.",
            "Lecture 10 emphasizes that DP is about 'experimentation, rapid innovation and continuous feature enhancement' — not following a predefined plan.",
            "Project logic with the triple constraint (scope, time, cost) is a poor fit for the continuous, iterative development that DP enables."
          ]
        }
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
        {
          text: "cost and tax",
          correct: false,
          why: "Wrong: this is not the core of AF.",
          whyExtended: [
            "Accountability Framework is about organizational distribution of responsibility for digital offerings and components, not about tax matters.",
            "The AF definition is: 'distribution of responsibilities for digital offerings and components that balances autonomy and alignment'.",
            "Cost may be a factor in decisions, but AF is about who has responsibility and decision authority — not about financial optimization.",
            "Lecture 11 focuses on topics like component owners, metrics, trust and empowered teams — not on accounting or tax matters."
          ]
        },
        {
          text: "autonomy and alignment",
          correct: true,
          why: "Correct: AF distributes responsibilities for digital offerings and components so that autonomy is balanced with alignment.",
          whyExtended: [
            "The D4D definition sheet explicitly states: 'Distribution of responsibilities for digital offerings and components that balances autonomy and alignment.'",
            "Lecture 11 describes AF key mechanisms: empowered teams (autonomy), modular architecture (loose coupling), missions (common direction) and knowledge sharing (alignment).",
            "AF promotes 'component owners, not project owners', 'metrics, not directives', 'trust, not control' and 'experiments, not major launches'.",
            "The challenge AF addresses is: how to unleash creativity and innovation (autonomy) without losing common direction and standardization (alignment)."
          ]
        },
        {
          text: "hardware and software",
          correct: false,
          why: "Wrong: AF is organizational/governance-oriented, not a hardware/software balance.",
          whyExtended: [
            "AF is an organizational building block about roles, responsibilities and decision rights — not about technology choices.",
            "Hardware/software considerations belong more to the IT Architecture tool in the CIO toolbox, where one analyzes infrastructure and applications.",
            "Lecture 11 is about 'encouraging desirable behaviour in using IT' and 'empowering people to imagine and build great components'.",
            "D4D distinguishes between architecture transformation (OB, DP — technical components) and governance transformation (SCI, AF — organizational mechanisms)."
          ]
        },
        {
          text: "scope and budget",
          correct: false,
          why: "Wrong: this fits better with project management/triple constraint.",
          whyExtended: [
            "Scope and budget are core variables in project management's triple constraint (scope, time, cost), not in the Accountability Framework.",
            "Lecture 4 presents the triple constraint as a project challenge where fixing all three variables makes projects 'particularly vulnerable to disappointment'.",
            "AF is about distributing responsibility and giving autonomy within alignment — it is a lasting organizational principle, not a project management technique.",
            "The product team logic in the CIO toolbox (tool 6) replaces precisely the scope/budget thinking with 'outcome over output' and continuous development."
          ]
        }
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
        {
          text: "An internal payroll system for employees",
          correct: false,
          why: "Wrong: that is an internal system, not a platform opened to external parties.",
          whyExtended: [
            "ExDP explicitly deals with opening digital components to external parties — it is an outward-facing capability.",
            "A payroll system is an internal support function that has nothing to do with platform strategy or digital innovation.",
            "Lecture 12 shows that ExDP 'increases the payback on investments — you may need outside parties' creativity to generate digital offerings'.",
            "ExDP requires APIs and boundary resources that give structured access to core components — something a payroll system does not offer."
          ]
        },
        {
          text: "A repository of digital components opened to external parties",
          correct: true,
          why: "Correct: ExDP opens digital components to partners/external developers, often via APIs/boundary resources.",
          whyExtended: [
            "The D4D definition sheet says: 'Repository of digital components open to external parties.'",
            "Lecture 12 describes two types of ExDP: one where partners use the company's internal components in their own offerings (e.g. Google Maps), and one that creates a marketplace for related digital offerings (e.g. Apple App Store).",
            "ExDP requires boundary resources — APIs, documentation and tools that let externals build on the platform.",
            "Lecture 12 specifies that ExDP requires 'a very well designed and managed internal platform' — it presupposes a mature OB and DP."
          ]
        },
        {
          text: "A technique for creating BPMN diagrams",
          correct: false,
          why: "Wrong: BPMN belongs to process modeling.",
          whyExtended: [
            "BPMN (Business Process Model and Notation) is a modeling technique under the IT Architecture tool in the CIO toolbox.",
            "BPMN is used to map process flows with swimlanes, roles and activities — it is an internal analysis technique.",
            "ExDP is about opening digital components to the outside world via APIs, not about internal process modeling.",
            "Lecture 5 places BPMN under Business process modeling as part of IT Architecture."
          ]
        },
        {
          text: "A governance archetype where end users make all IT decisions",
          correct: false,
          why: "Wrong: this describes Anarchy in IT governance, not ExDP.",
          whyExtended: [
            "Anarchy is the most decentralized IT governance archetype where 'each individual user or small group pursues his, her or their own IT agenda' (Weill & Ross 2005).",
            "Lecture 6 places Anarchy as one of six archetypes in the governance matrix — it is a governance mechanism, not a platform strategy.",
            "ExDP is a D4D building block about sharing digital components with external partners, not about internal decision authority.",
            "The six governance archetypes (Business Monarchy, IT Monarchy, Federal, IT Duopoly, Feudal, Anarchy) belong to the IT governance tool, not the D4D building blocks."
          ]
        }
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
        {
          text: "It is about aligning IT investments with business priorities.",
          correct: true,
          why: "Correct: effective governance aligns IT investments with business priorities.",
          whyExtended: [
            "The CIO toolbox model states that IT governance's purpose is to 'align IT investments with business priorities and assign accountability for outcomes'.",
            "Lecture 6 and the course summary confirm that effective governance links IT investments to overall business priorities.",
            "IT governance ensures that the organization's IT resources are used in accordance with strategic goals, not just technical preferences."
          ]
        },
        {
          text: "It is about who makes IT decisions and who is accountable for results.",
          correct: true,
          why: "Correct: decision rights and accountability are at the core.",
          whyExtended: [
            "Weill and Ross (2004) define IT governance as 'specifying the decision rights and accountability framework to encourage desirable behaviour in using IT'.",
            "Lecture 11 specifies: 'IT governance is not about making IT decisions — management does that — but rather determines who systematically makes and contributes to those decisions.'",
            "The governance matrix links decision domains with archetypes to clarify who decides what."
          ]
        },
        {
          text: "It means that all IT decisions should always be made by the IT department alone.",
          correct: false,
          why: "Wrong: some domains may be IT monarchy, but IT governance is precisely about clarifying who decides, not that IT always decides.",
          whyExtended: [
            "IT monarchy — where IT executives make the decisions — is just one of six archetypes. The others include business monarchy, federal, duopoly, feudal and anarchy.",
            "The whole point of the governance matrix is that different decision domains can have different archetypes — IT principles may be governed by business monarchy while IT infrastructure is governed by IT monarchy.",
            "Lecture 6 shows that governance is about finding the right balance between centralization (scale, compliance) and decentralization (agility, local fit).",
            "Having IT always decide everything would ignore that business units and users have important insight into their own needs."
          ]
        },
        {
          text: "It can be described with a governance matrix with decision domains and governance archetypes.",
          correct: true,
          why: "Correct: the governance matrix links decision domains with archetypes like business monarchy, IT monarchy, federal, duopoly etc.",
          whyExtended: [
            "Lecture 6 presents the governance matrix with five decision domains (IT principles, IT architecture, IT infrastructure, business application needs, IT investment) along one axis and six archetypes along the other.",
            "The matrix makes it possible to specify who decides what — e.g. IT principles may be governed by business monarchy while infrastructure is governed by IT monarchy.",
            "Weill & Ross (2005) published this approach in MIT Sloan Management Review as 'A Matrixed Approach to Designing IT Governance'."
          ]
        }
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
        {
          text: "Business Monarchy",
          correct: false,
          why: "Wrong: business monarchy means senior business executives make the decisions, possibly with CIO.",
          whyExtended: [
            "Lecture 6 defines Business Monarchy as 'the most centralized approach — a senior business executive or a group of senior executives, sometimes including the CIO, makes all the IT-related decisions for the enterprise'.",
            "The key is that it is business leaders (not IT leaders) who decide, even though the CIO is sometimes included.",
            "Business Monarchy is the most centralized archetype — all IT-related decisions in a given domain are made at the top level.",
            "The difference from IT Monarchy is who is in the driver's seat: business leaders vs. IT leaders."
          ]
        },
        {
          text: "IT Monarchy",
          correct: true,
          why: "Correct: IT monarchy means an IT executive or group of IT executives makes the decisions.",
          whyExtended: [
            "Lecture 6 defines IT Monarchy as: 'decisions are made by an individual IT executive or a group of IT executives'.",
            "IT Monarchy gives IT leadership decision authority in the given domain — it is centralized, but with IT-professional anchoring.",
            "In the governance matrix, IT Monarchy can be used for domains where technical expertise is crucial, for example IT infrastructure.",
            "The six archetypes form a spectrum from highly centralized (Business/IT Monarchy) to highly decentralized (Anarchy)."
          ]
        },
        {
          text: "Federal",
          correct: false,
          why: "Wrong: federal combines C-level and business representatives, often together with IT.",
          whyExtended: [
            "Lecture 6 defines Federal as: 'C-level executives and business representatives of all the operating groups collaborate with the IT department.'",
            "The Federal archetype resembles a federal government where central power and local units collaborate on decisions.",
            "The difference from IT Monarchy is that Federal includes business representatives from all operational units, not just IT leaders.",
            "Federal is a collaborative approach — it involves broader involvement than both Business Monarchy and IT Monarchy."
          ]
        },
        {
          text: "Anarchy",
          correct: false,
          why: "Wrong: anarchy means individual users or small groups pursue their own IT agenda.",
          whyExtended: [
            "Lecture 6 defines Anarchy as 'the most decentralized system, in which each individual user or small group pursues his, her or their own IT agenda'.",
            "Anarchy is the opposite of monarchy — it is completely decentralized without coordinated decision authority.",
            "Anarchy can arise when governance structures are weak or absent, which can lead to fragmentation and duplication.",
            "The archetype means that no one has overarching responsibility — it is placed at the bottom of the centralization scale in Weill & Ross's model."
          ]
        }
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
        {
          text: "Architecture is just the formal TOGAF processes in ADM.",
          correct: false,
          why: "Wrong: this narrows architecture down to TOGAF. The Fowler perspective is more pragmatic.",
          whyExtended: [
            "TOGAF represents a formal and often centralized perspective on architecture, while Fowler represents a more meritocratic and decentralized perspective.",
            "Lecture 5 contrasts TOGAF (formal architecture governance) with Fowler (architecture as 'the important stuff').",
            "TOGAF uses ADM (Architecture Development Method) as a structured process with defined phases — this is just one of several views on architecture in the course.",
            "The CIO toolbox model also mentions Open Agile Architecture as a third perspective, with focus on modularity, standardization and responsiveness."
          ]
        },
        {
          text: "Architecture is 'the important stuff' — what developers and the organization consider important to understand and preserve.",
          correct: true,
          why: "Correct: Fowler is used to show a more contextual and collaborative view of architecture.",
          whyExtended: [
            "The CIO toolbox model describes the Fowler perspective as: 'architecture as \"the important stuff\"; collaborative, decentralized orientation'.",
            "Lecture 5 says that Fowler is 'the closest we get to an architecture thought leader in agile development' and represents 'a more meritocratic and decentralized perspective'.",
            "The Fowler perspective is that architecture is what the team collectively considers important enough to look after — it is context-dependent and pragmatic.",
            "This perspective fits well with agile development methods where teams take ownership of technical choices."
          ]
        },
        {
          text: "Architecture only concerns physical networks and hardware.",
          correct: false,
          why: "Wrong: IT architecture can include systems, software, data, integrations and decisions.",
          whyExtended: [
            "TOGAF's architecture taxonomy includes Business Architecture, Data Architecture, Application Architecture and Technology Architecture — not just physical infrastructure.",
            "Lecture 5 shows that operating model, process integration and standardization are all architecture-related concepts.",
            "Even Technology Architecture in TOGAF deals with 'logical software and hardware capabilities', not just physical networks.",
            "Architecture in the course encompasses choices about systems, data, integration and organization — it is a holistic perspective."
          ]
        },
        {
          text: "Architecture is identical to project management.",
          correct: false,
          why: "Wrong: project management organizes delivery; architecture is about structure, dependencies and important technological/organizational choices.",
          whyExtended: [
            "Project management is tool no. 5 in the CIO toolbox with purpose 'Plan and organize development', while IT Architecture is tool no. 4 with purpose 'Analyze and structure the IT portfolio'.",
            "Project management is about organizing a temporary delivery within scope, time and cost (triple constraint).",
            "Architecture is about lasting structural choices: operating model, process integration, component dependencies and technology standards.",
            "A project can implement architectural decisions, but the architecture lives on after the project is finished."
          ]
        }
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
        {
          text: "business process integration and standardization",
          correct: true,
          why: "Correct: an operating model describes the desired level of process integration and standardization.",
          whyExtended: [
            "The CIO toolbox model describes operating model as 'process integration × standardization' with four models: coordination, unification, diversification and replication.",
            "Lecture 5 shows that the operating model is a 'strategic bridge' under the IT Architecture tool.",
            "Integration concerns the degree to which processes share data and are coordinated across units. Standardization concerns the degree to which processes are performed uniformly.",
            "The four operating models provide different combinations: high/low integration × high/low standardization."
          ]
        },
        {
          text: "individual motivation and personality",
          correct: false,
          why: "Wrong: this is HR/leadership, not operating model in the D4D/EA sense.",
          whyExtended: [
            "Individual motivation belongs to HR and personnel management, which is not part of the CIO toolbox or the D4D framework.",
            "Operating model is an architecture concept about organizational design of processes and systems, not individual psychology.",
            "Lecture 5 is about process integration and standardization as an architectural foundation — not about employee satisfaction.",
            "The CIO toolbox model mentions HR under 'Outside the toolbox, but part of IT management' — it is a separate discipline."
          ]
        },
        {
          text: "risk premium and interest rate",
          correct: false,
          why: "Wrong: this belongs to business case/NPV.",
          whyExtended: [
            "Risk premium and discount rate are central to the NPV calculation under the business case tool (tool 1 in the CIO toolbox).",
            "Lecture 3 shows the NPV formula where the discount rate (including risk premium) is used to calculate the present value of future cash flows.",
            "Operating model is about process design and organization, not about financial calculations.",
            "Business case and operating model are two completely different tools in the CIO toolbox with different purposes."
          ]
        },
        {
          text: "number of employees and number of meetings",
          correct: false,
          why: "Wrong: an operating model is about integration/standardization of processes, not administrative capacity.",
          whyExtended: [
            "Operating model is defined along the dimensions of process integration and process standardization — not by staffing or meeting frequency.",
            "Number of employees is a capacity question; operating model is about how processes are structured and coordinated.",
            "The four operating models (coordination, unification, diversification, replication) all deal with process design, not organization size.",
            "Even a small team can operate with a unification model (high integration + high standardization) — it is the design choice that matters, not the number of people."
          ]
        }
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
        {
          text: "Work is often grouped in sprints.",
          correct: true,
          why: "Correct: Scrum organizes work in sprints.",
          whyExtended: [
            "The course summary lists 'work is grouped in sprints' as a key feature of Scrum.",
            "Sprints are time-boxed iterations (typically 1–4 weeks) where the team delivers an increment of the product.",
            "The sprint structure allows the team to regularly evaluate progress and adjust priorities."
          ]
        },
        {
          text: "Teams are self-organizing.",
          correct: true,
          why: "Correct: self-organizing teams are central in Scrum/agile.",
          whyExtended: [
            "The course summary lists 'self-organizing teams' as a core feature of Scrum.",
            "Self-organizing teams are linked to the agile value 'individuals and interactions over processes and tools'.",
            "Lecture 4 and the CIO toolbox model describe the product team logic: 'Autonomy vs. alignment' and 'lasting ownership of a digital product/service'.",
            "The Agile Manifesto's four values emphasize that people and collaboration are prioritized over processes and tools."
          ]
        },
        {
          text: "Tasks are prioritized by value.",
          correct: true,
          why: "Correct: backlog/prioritization by value is central.",
          whyExtended: [
            "The course summary lists 'tasks are prioritized by value' as a key feature of Scrum.",
            "The product backlog is ordered by business value, so the most important features are delivered first.",
            "This contrasts with project-based thinking where task order is often driven by dependencies and milestones.",
            "Value prioritization supports the agile value 'responding to change over following a plan'."
          ]
        },
        {
          text: "All scope, time and cost should be locked completely from the start to ensure agility.",
          correct: false,
          why: "Wrong: this is more classic project/triple constraint and fits poorly with learning and adaptation in agile.",
          whyExtended: [
            "The triple constraint (scope, time, cost) is a project management concept from Lecture 4 — the CIO toolbox model states 'Scope, time, cost — all three fixed → vulnerable'.",
            "Locking all three variables is precisely what makes traditional projects vulnerable, according to the lecture.",
            "Agile and Scrum are built on the opposite logic: adapt scope based on learning, deliver value iteratively, and use feedback to adjust course.",
            "The course summary lists the agile value 'responding to change over following a plan' — locking from the start contradicts this.",
            "Agile method is 'NOT a process to follow or tools to use, but a mindset on how people think' — it is about flexibility and learning."
          ]
        }
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
        {
          text: "When the problem is unclear and must be explored with user insight, prototyping and testing",
          correct: true,
          why: "Correct: design thinking is explorative and fits when the problem/user need is uncertain.",
          whyExtended: [
            "The CIO toolbox model describes design thinking as 'Explorative approach — when the problem is unclear'.",
            "Key practices include problem-reframing, user insight, co-design, prototyping and small-scale testing.",
            "Design thinking uses the double diamond process: Discover → Define → Develop → Deliver.",
            "In Cynefin terms, design thinking fits best in the complex domain where important factors are unknown and experimentation is necessary."
          ]
        },
        {
          text: "When the solution is already known and just needs to be operated as cheaply as possible",
          correct: false,
          why: "Wrong: then standard processes/operations fit better than explorative design thinking.",
          whyExtended: [
            "When the solution is known, the situation is in Cynefin terms 'clear' or 'complicated' — then procedures and expert analysis are more appropriate.",
            "Design thinking's strength is exploring unknown problems and user needs — it adds little value when the answer is already known.",
            "Operations optimization belongs to ITIL and IT service management, which lies outside the CIO toolbox but is part of IT management.",
            "Using design thinking for a known operational problem would be unnecessary resource expenditure and the wrong tool for the context."
          ]
        },
        {
          text: "When the only goal is to calculate discounted cash flow",
          correct: false,
          why: "Wrong: this is business case/NPV, not design thinking.",
          whyExtended: [
            "Discounted cash flow (NPV) is the core calculation in the business case tool (tool 1 in the CIO toolbox).",
            "Business case is about 'rational choices & utility maximisation' — it is analytical and quantitative.",
            "Design thinking is about understanding user needs and exploring the solution space — it is qualitative and explorative.",
            "The two tools address different stages: design thinking uncovers what should be built, business case evaluates whether it is worth investing."
          ]
        },
        {
          text: "When all decisions should be made by a single IT leader",
          correct: false,
          why: "Wrong: this describes IT monarchy, not design thinking.",
          whyExtended: [
            "IT Monarchy is a governance archetype where 'decisions are made by an individual IT executive or a group of IT executives' (Lecture 6).",
            "Design thinking is a tool for innovation and exploration, not a governance mechanism for distributing decisions.",
            "Design thinking typically involves cross-functional teams, user insight and co-design — it is participatory, not centralized.",
            "IT governance and design thinking solve different problems: governance is about who decides, design thinking is about what should be built."
          ]
        }
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
        {
          text: "performing the same activities slightly more efficiently than rivals",
          correct: false,
          why: "Wrong: this is operational effectiveness. It is necessary but not sufficient for strategy.",
          whyExtended: [
            "Lecture 2 explicitly states: 'Operational effectiveness is necessary, but not sufficient to achieve sustainable competitive advantage.'",
            "Operational effectiveness is defined as 'Perform similar activities better than rivals perform them' — it is 'best practice', not strategy.",
            "Porter argues that rivals can quickly copy operational improvements, so they only give temporary advantage.",
            "Examples of OE activities from the lecture: quality assurance, project management, HR — important, but not strategically differentiating."
          ]
        },
        {
          text: "choosing a unique position, making trade-offs and creating a coherent activity system",
          correct: true,
          why: "Correct: the Porter perspective emphasizes unique activities, fit and trade-offs.",
          whyExtended: [
            "Lecture 2 summarizes: 'A working strategy must make explicit trade-offs and choices — it is not sustainable to excel at everything.'",
            "Porter: 'Competitive strategy is about being different — about choosing a different set of activities to deliver a unique mix of value.'",
            "Strategy requires a coherent activity system: 'Activities must be aligned and coherent with the overall strategy.'",
            "The lecture shows that strategic positioning is about doing different things from competitors, or doing similar things in different ways — with examples like IKEA, Southwest Airlines and BIC."
          ]
        },
        {
          text: "buying the newest IT system",
          correct: false,
          why: "Wrong: technology can support strategy but is not strategy in itself.",
          whyExtended: [
            "The Porter perspective is about activities and positioning, not about technology procurement in isolation.",
            "Lecture 2 shows that strategy is about trade-offs and what you choose not to do — technology is a means, not an end.",
            "The course summary on digital business design explicitly states: 'NOT IT architecture — cool architecture that doesn't solve business challenge is inadequate.'",
            "Strategic use of IT is about supporting unique activities and value creation, not about having the newest possible technology."
          ]
        },
        {
          text: "maximizing the number of projects in the portfolio",
          correct: false,
          why: "Wrong: strategy also involves prioritization and deciding what not to do.",
          whyExtended: [
            "The Porter perspective emphasizes trade-offs: 'about making trade-offs in competing — what NOT to do?'",
            "Lecture 2 summarizes that strategy requires focus and prioritization — more projects does not mean better strategy.",
            "A coherent activity system requires that activities reinforce each other — spreading thin undermines fit.",
            "The D4D summary warns against precisely this under risks of digital transformation: 'dividing resources across so many building blocks → may not make real progress'."
          ]
        }
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
        {
          text: "A pure IT procurement plan",
          correct: false,
          why: "Wrong: this is too narrow and resembles IT strategy/procurement.",
          whyExtended: [
            "Lecture 14 distinguishes between business strategy, IT-strategy and digital strategy — they are not the same.",
            "IT-strategy is about procurement and management of technology, while digital strategy is about leveraging digital resources to create differential value.",
            "A procurement plan looks at costs and technical requirements, while digital strategy is about value creation and competitive advantage.",
            "The course summary says that digital business design is about 'NOT an endstate, but requires continually distinguishing between stable and dynamic' — that is far broader than procurement."
          ]
        },
        {
          text: "An organizational strategy formulated and executed by leveraging digital resources to create differential value",
          correct: true,
          why: "Correct: this is the definition used in the lecture.",
          whyExtended: [
            "Lecture 14 presents the definition from Bharadwaj et al. (2013): 'An organizational strategy formulated and executed by leveraging digital resources to create differential value.'",
            "The key is that it is an organizational strategy — not just a technology plan — that uses digital resources strategically.",
            "Differential value means value that distinguishes you from competitors — it links digital strategy to Porter's strategic positioning.",
            "Lecture 14 says that leaders should be able to ask questions about digital technology's characteristics, opportunities, prerequisites and consequences."
          ]
        },
        {
          text: "A list of all systems the organization owns",
          correct: false,
          why: "Wrong: this is more IT portfolio/architecture documentation.",
          whyExtended: [
            "A system list is part of IT portfolio management or enterprise architecture documentation, not a digital strategy.",
            "The IT Architecture tool in the CIO toolbox has purpose 'Analyze and structure the IT portfolio' — that is inventory, not strategy.",
            "Digital strategy is about using digital resources for value creation, not about documenting existing systems.",
            "Strategic use of the IT portfolio requires linking it to the organization's overarching goals and positioning."
          ]
        },
        {
          text: "A BPMN model of the customer journey",
          correct: false,
          why: "Wrong: BPMN/customer journey can support analysis but is not the definition of digital strategy.",
          whyExtended: [
            "BPMN is a modeling notation for process flows — it belongs to the IT Architecture tool, not the strategy definition.",
            "A customer journey can provide valuable insight that informs strategy, but the customer journey model itself is not the strategy.",
            "Digital strategy is about formulating and executing an organizational strategy with digital resources — that is far broader than a single model.",
            "BPMN models can be used as tools in design thinking or process analysis, but they are not a strategic end product."
          ]
        }
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
        {
          text: "Digital technology can contribute through virtualization, optimization, monitoring and innovation.",
          correct: true,
          why: "Correct: these are explicitly listed as ways digital technology can support sustainability transitions.",
          whyExtended: [
            "Lecture 15 slide 3 lists four ways: Virtualization (digital replace physical), Optimization (reduce waste), Monitoring (informing action), Drive innovation (new technologies).",
            "These represent the positive side of digital technology's sustainability contribution — but the lecture specifies that technology also has negative impacts.",
            "The twin transitions perspective (digital transformation + sustainability transition) shows that both must be seen in context."
          ]
        },
        {
          text: "Digital technology has no negative environmental or social consequences because it is virtual.",
          correct: false,
          why: "Wrong: the lecture emphasizes materiality, e-waste, energy consumption and social disruption.",
          whyExtended: [
            "Lecture 15 slide 4 explicitly states: 'ICT is not only virtual, also material artefacts' — with four concrete negative impacts.",
            "Negative impacts include: Rare Earth Minerals/mining/conflicts, Electronic waste, Energy consumption and Social disruption (e.g. Airbnb conflicts in neighbourhoods).",
            "The lecture cites research: 'It is unclear whether the increased electricity and rare material use due to digitalization will be compensated by efficiency gains and sustainable behaviors fostered by digital innovations.'",
            "Slide 5 summarizes that organizations should 'employ digital technology responsibly' — precisely because there are negative consequences."
          ]
        },
        {
          text: "ICT also has material aspects such as minerals, e-waste and energy consumption.",
          correct: true,
          why: "Correct: these are central negative impacts in the lecture.",
          whyExtended: [
            "Lecture 15 slide 4 explicitly lists: Rare Earth Minerals (mining, conflicts), Electronic waste and Energy consumption.",
            "Digital Product Passport (EU) will from 2028 apply to ICT and electronics — precisely because materiality's environmental impact requires documentation.",
            "Sustainability involves three dimensions: economic, social and environmental — ICT's material side particularly affects the environmental dimension."
          ]
        },
        {
          text: "Top-down sustainability policy can require data and reporting.",
          correct: true,
          why: "Correct: the lecture links sustainability policy to reporting and data.",
          whyExtended: [
            "Lecture 15 slide 5 states: 'Top-down sustainability policies rely on data reporting.'",
            "The lecture covers EU requirements for sustainability reporting, including concepts like double materiality and scope 1, 2 and 3.",
            "This directly links sustainability to IT management: data collection, system support and reporting tools are necessary to fulfill the requirements.",
            "The lecture summarizes that sustainability is relevant for IT leaders because 'sustainability transitions require/enable innovation' and policy requires data."
          ]
        }
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
        {
          text: "Follow best practice and standard procedure",
          correct: false,
          why: "Wrong: this fits best in the clear domain.",
          whyExtended: [
            "Lecture 4 defines the clear domain: 'issues occurring are typically well known, and can be solved by previously agreed and often written procedures.'",
            "The CIO toolbox model states: 'Clear → procedures, best practice.'",
            "In the Cynefin model, the clear domain uses the approach Sense → Categorize → Respond — recognize the situation and use established procedure.",
            "Best practice works in predictable situations, but in complex situations important factors are unknown — procedures cannot cover the unknown."
          ]
        },
        {
          text: "Expert analysis alone",
          correct: false,
          why: "Wrong: this fits better in the complicated domain.",
          whyExtended: [
            "Lecture 4 defines the complicated domain: 'a lot of non-trivial decisions have to be made — however, the cause-and-effect relationships are still possible to analyze in advance. This is said to be the «domain of experts».'",
            "The CIO toolbox model states: 'Complicated → expert analysis, planning.'",
            "In the Cynefin model, the complicated domain uses Sense → Analyze → Respond — analyze the situation with expertise and choose approach.",
            "In the complex domain, cause-and-effect is unknown in advance — expert analysis alone is insufficient because you don't know what to analyze."
          ]
        },
        {
          text: "Experimentation, learning and iteration",
          correct: true,
          why: "Correct: the complex domain requires probe/sense/respond, experimentation and learning.",
          whyExtended: [
            "Lecture 4 defines the complex domain: 'several important factors influencing the outcome are unknown, and experimentation is typically necessary to look for an approach to move towards the desired outcome.'",
            "The CIO toolbox model states: 'Complex → experimentation, design thinking, agile.'",
            "In the Cynefin model, the complex domain uses Probe → Sense → Respond — try something, observe the results, and adapt based on learning.",
            "This approach connects directly to design thinking (exploration) and agile (iteration and adaptation) in the CIO toolbox."
          ]
        },
        {
          text: "Immediate action without analysis",
          correct: false,
          why: "Wrong: this fits better in the chaotic domain.",
          whyExtended: [
            "Lecture 4 defines the chaotic domain: 'there is typically an emergency which requires immediate action to move into a more stable state.'",
            "The CIO toolbox model states: 'Chaotic → immediate action.'",
            "In the Cynefin model, the chaotic domain uses Act → Sense → Respond — act first to stabilize, and analyze afterwards.",
            "In complex situations you have time to experiment and learn — it is in chaotic situations that you must act immediately without prior analysis."
          ]
        }
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
        {
          text: "Operational Backbone emphasizes stability, standardization and integrated core processes.",
          correct: true,
          why: "Correct: OB is a reliable, integrated production environment for core processes.",
          whyExtended: [
            "Lecture 10 describes OB as: 'tightly integrated, bulletproof production environment to ensure the reliability and security of business processes — reliable and transparent.'",
            "The OB definition emphasizes standardization and integration of systems, processes and data.",
            "Lecture 9 shows examples: Nordstrom uses OB for correct inventory management; Kaiser Permanente uses OB for standardized treatment across units.",
            "OB is about making existing core processes reliable and efficient — it is the foundation for further digital success."
          ]
        },
        {
          text: "Digital Platform emphasizes components that can be used for rapid innovation and digital offerings.",
          correct: true,
          why: "Correct: DP provides access to data, business and technology components for digital offerings.",
          whyExtended: [
            "Lecture 10 describes DP as: 'provides easy access to the data, business and technology components that make up digital offerings — experimentation, rapid innovation and continuous feature enhancement.'",
            "DP consists of reusable components: data components, infrastructure components, business components and cloud services.",
            "The difference between OB and DP is focus: OB = stability and security for core processes; DP = experimentation and innovation for new offerings.",
            "The D4D roadmap recommends: 'Fix the backbone' first, then 'Don't put off your digital platform for long — connect the modules.'"
          ]
        },
        {
          text: "Operational Backbone and Digital Platform are always the same concept.",
          correct: false,
          why: "Wrong: they are connected, but OB is the stable core while DP enables reuse and innovation.",
          whyExtended: [
            "Lecture 10's title slide explicitly states: 'An Operational Backbone is Not Enough for Digital Success' — so they are clearly two different things.",
            "OB and DP have different purposes: OB ensures reliable operations, DP enables rapid development of new digital offerings.",
            "They are two separate D4D building blocks that work together: OB provides a stable foundation, DP builds further with reusable components.",
            "In D4D's transformation theory, both belong to architecture transformation, but they address different sides of the architecture."
          ]
        },
        {
          text: "A weak Operational Backbone can become an obstacle for digital transformation.",
          correct: true,
          why: "Correct: the lecture points out OB as a potential obstacle when systems, data and processes are fragmented.",
          whyExtended: [
            "Lecture 9 reports: '44% of executives in established companies identified the operational backbone as the one building block that is currently the biggest obstacle to digital transformation.'",
            "Challenges with a weak OB include legacy systems, fragmented data and lack of process standardization.",
            "The D4D roadmap therefore prioritizes: 'Fix the backbone — you need to have a proper structure on the data, processes and applications.'",
            "Without a stable OB, you lack the foundation for Digital Platform, and thereby also for rapid innovation and new digital offerings."
          ]
        }
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
        {
          text: "Frameworks are always best practice and should be followed identically in all situations.",
          correct: false,
          why: "Wrong: the course emphasizes that frameworks are context-dependent.",
          whyExtended: [
            "Lecture 6 explicitly states: 'For these (and similar) frameworks and methods, their usefulness and value is highly context-sensitive — and sometimes disputed.'",
            "The CIO toolbox model starts with 'Read the room: understand purpose, strategy, resources, maturity and context' — context always comes first.",
            "The Cynefin framework shows that different situations require different approaches — best practice only fits in the clear domain.",
            "Lecture 3 summarizes: 'No standard way of making choices' — there is no single universal approach."
          ]
        },
        {
          text: "Frameworks are goals in themselves.",
          correct: false,
          why: "Wrong: the toolbox metaphor says tools are only meaningful if they serve a purpose.",
          whyExtended: [
            "The CIO toolbox model explicitly states: 'Tools are not goals in themselves — they are only meaningful if they serve their purpose.'",
            "The toolbox metaphor emphasizes that you choose tools based on the job to be done, not for the tool's sake.",
            "The CIO toolbox model states: 'You cannot lead by theory: frameworks help, but leadership requires dialogue, judgement and learning.'",
            "Treating frameworks as goals would undermine the entire point of the CIO toolbox: tools should be adapted to situation and context."
          ]
        },
        {
          text: "Frameworks can reduce uncertainty and structure practice, but must be adapted to context, people, environment and strategy.",
          correct: true,
          why: "Correct: this is the most precise IN5431 attitude toward frameworks.",
          whyExtended: [
            "The CIO toolbox model summarizes the approach in three steps: (1) Read the room — understand purpose, strategy, resources and context; (2) Choose the right tool; (3) You cannot lead by theory.",
            "Lecture 6 says that frameworks are 'highly context-sensitive and sometimes disputed' — they have value, but not universal value.",
            "The course summary links frameworks to the principle that 'leadership requires dialogue, judgement and learning' — it is not enough to follow a recipe.",
            "This attitude is reflected throughout the course structure: seven different tools with Cynefin as a meta-tool for choosing the right approach based on context."
          ]
        },
        {
          text: "Frameworks should be avoided because they never provide value.",
          correct: false,
          why: "Wrong: frameworks can provide value but must be used critically and context-sensitively.",
          whyExtended: [
            "The CIO toolbox model shows that frameworks like PRINCE2, TOGAF, Scrum and ITIL have clear purposes and use cases.",
            "Lecture 3 argues that a business case is valuable 'for high impact decisions, little prior experience, less trust' — frameworks provide structure in uncertain situations.",
            "The CIO toolbox approach is about choosing the right tool for the right situation — not about avoiding tools altogether.",
            "Frameworks reduce uncertainty, provide a common language and structure practice — but only when adapted to context."
          ]
        }
      ]
    }
  ]
};
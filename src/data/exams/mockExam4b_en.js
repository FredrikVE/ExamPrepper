// src/data/exams/mockExam4b_en.js
export const mockExam4b_en = {
  id: "mock-exam-4b-en",
  subjectId: "in5431",
  baseId: "mock-exam-4b",
  lang: "en",
  title: "Mock Exam 4B: CIO Toolbox – frameworks and architecture",
  description: "Governance archetypes, TOGAF ADM, Cynefin placement, product teams, D4D transformation and digital strategy – mixed theory and application.",
  modeLabel: "CIO TOOLBOX B",
  estimatedMinutes: "35–50",
  sortOrder: 41,
  questions: [
    {
      id: 1,
      type: "single",
      title: "Business case vs alternative analysis",
      points: 1,
      prompt: "How are business case (tool 1) and alternative analysis (tool 2) related?",
      source: "Source: Lecture 3, CIO toolbox model, note between tool 1 and tool 2.",
      options: [
        {
          text: "Business case is one evaluation method inside alternative analysis (step 3). They are separate tools but tightly connected",
          correct: true,
          why: "Correct: the CIO toolbox model explicitly states this relationship.",
          whyExtended: [
            "The CIO toolbox model contains a note: 'Business case (tool 1) is one evaluation method inside alternative analysis (tool 2, step 3). They are separate tools but tightly connected.'",
            "Alternative analysis has three steps. Business case fits into step 3 (Evaluate and propose) as one of several evaluation methods.",
            "Other evaluation methods in step 3 include plus/minus method, cost ranking, and real options.",
            "This means every business case is part of an alternative analysis, but not every alternative analysis requires a full financial business case."
          ]
        },
        {
          text: "They are completely unrelated tools used in different industries",
          correct: false,
          why: "Wrong: they are explicitly described as tightly connected in the CIO toolbox model.",
          whyExtended: [
            "The CIO toolbox model contains a specific note explaining their connection – they are not separate in that sense.",
            "Both tools fall under the 'VALG' (choice) category in the CIO toolbox, indicating they serve related purposes.",
            "Business case focuses on quantitative and qualitative evaluation. Alternative analysis provides the broader process that includes evaluation.",
            "Both are used across industries – they are general management tools, not industry-specific."
          ]
        },
        {
          text: "Alternative analysis replaces business case entirely",
          correct: false,
          why: "Wrong: business case is a method within alternative analysis, not replaced by it.",
          whyExtended: [
            "Business case provides specific analytical tools (NPV, risk assessment) that alternative analysis does not replicate.",
            "Alternative analysis is a broader process. It needs evaluation methods like business case to function in step 3.",
            "The CIO toolbox keeps them as separate numbered tools (1 and 2) precisely because they each have distinct value.",
            "For high-impact decisions, a formal financial business case within the alternative analysis is often worthwhile."
          ]
        },
        {
          text: "Business case is always done after alternative analysis is complete",
          correct: false,
          why: "Wrong: business case is used within step 3 of alternative analysis, not after it.",
          whyExtended: [
            "The CIO toolbox model places business case inside alternative analysis step 3 (Evaluate and propose).",
            "Doing the business case after alternative analysis would mean evaluating options after you have already made a recommendation.",
            "The logical flow is: understand situation → generate options → evaluate options (using business case among other methods) → propose.",
            "Business case as a separate exercise before or after alternative analysis would lose the connection to the specific alternatives being evaluated."
          ]
        }
      ],
      whyExtendedImageRefs: [
        "generic_decision_making_process",
        "NPV_formula"
      ]
    },
    {
      id: 2,
      type: "dragDrop",
      title: "CIO toolbox tools and purposes",
      points: 3,
      prompt: "Drag each CIO toolbox tool to its typical purpose.",
      source: "Source: CIO Toolbox lectures, overview table of tools and typical purposes.",
      moduleId: "cio-tool-box",
      groupId: "decision-making",
      cards: [
        {
          id: "tool-business-case",
          text: "Business case"
        },
        {
          id: "tool-alternative-analysis",
          text: "Alternative analysis"
        },
        {
          id: "tool-design-thinking",
          text: "Design thinking"
        },
        {
          id: "tool-it-architecture",
          text: "IT Architecture"
        },
        {
          id: "tool-projects",
          text: "Projects"
        },
        {
          id: "tool-product-teams",
          text: "Product teams and agile methods"
        },
        {
          id: "tool-it-governance",
          text: "IT governance"
        }
      ],
      targets: [
        {
          id: "purpose-prioritization-funding",
          description: "Prioritization of digital services and funding",
          correctCardId: "tool-business-case",
          correctLabel: "Business case",
          whyCorrect: "Business case is used to prioritize digital services and funding.",
          whyWrong: "Business case belongs with prioritization and funding because it compares expected benefit, cost, timing and risk.",
          whyExtended: [
            "It is a decision-support and communication tool.",
            "It can include both NPV and non-quantifiable benefits."
          ]
        },
        {
          id: "purpose-vendor-product-choice",
          description: "Vendor selection and product choice",
          correctCardId: "tool-alternative-analysis",
          correctLabel: "Alternative analysis",
          whyCorrect: "Alternative analysis is used for vendor selection and product choice.",
          whyWrong: "Alternative analysis belongs with vendor/product choice because it structures options and evaluates alternatives.",
          whyExtended: [
            "The generic process is: understand the situation, synthesize options, evaluate and propose.",
            "Business case can be one evaluation method inside alternative analysis."
          ]
        },
        {
          id: "purpose-unclear-problem",
          description: "Exploration when the problem is unclear",
          correctCardId: "tool-design-thinking",
          correctLabel: "Design thinking",
          whyCorrect: "Design thinking is used when the problem is unclear and needs exploration.",
          whyWrong: "Design thinking belongs with exploration because it uses user insight, reframing, prototyping and testing.",
          whyExtended: [
            "It is useful when the organization is not sure what problem to solve.",
            "The Double Diamond is the core model in the lecture."
          ]
        },
        {
          id: "purpose-structure-portfolio",
          description: "Analyze and structure the IT portfolio",
          correctCardId: "tool-it-architecture",
          correctLabel: "IT Architecture",
          whyCorrect: "IT Architecture is used to analyze and structure the IT portfolio.",
          whyWrong: "IT Architecture belongs with structuring the IT portfolio within and among systems and services.",
          whyExtended: [
            "Relevant subtopics are operating model, business process modeling and enterprise architecture.",
            "TOGAF is a framework connected to this tool."
          ]
        },
        {
          id: "purpose-plan-organize-development",
          description: "Plan and organize development",
          correctCardId: "tool-projects",
          correctLabel: "Projects",
          whyCorrect: "Projects are used to plan and organize development as temporary organizations.",
          whyWrong: "Projects belong with planning and organizing development because they deliver specified results within a specified period.",
          whyExtended: [
            "PRINCE2 is an example of a project governance and management framework.",
            "Projects are especially relevant when work can be planned around a defined delivery."
          ]
        },
        {
          id: "purpose-continuous-product-development",
          description: "Continuous product development and operations",
          correctCardId: "tool-product-teams",
          correctLabel: "Product teams and agile methods",
          whyCorrect: "Product teams and agile methods support continuous product development and operations.",
          whyWrong: "Product teams belong with continuous product development because they have lasting ownership of a product or service.",
          whyExtended: [
            "The key contrast with projects is lasting ownership rather than temporary delivery.",
            "Scrum and SAFe are examples of agile frameworks connected to this area."
          ]
        },
        {
          id: "purpose-distribute-responsibility",
          description: "Distribute responsibility for IT among organizational units",
          correctCardId: "tool-it-governance",
          correctLabel: "IT governance",
          whyCorrect: "IT governance distributes responsibility for IT among organizational units.",
          whyWrong: "IT governance belongs with distributing responsibility because it determines who makes IT decisions and who is accountable.",
          whyExtended: [
            "Weill and Ross describe decision domains, archetypes and a governance matrix.",
            "The central dilemma is often centralization versus decentralization."
          ]
        }
      ],
      whyExtendedImageRefs: [
        "generic_decision_making_process",
        "double_diamond_model",
        "it_governance_matrix"
      ]
    },
    {
      id: 3,
      type: "fill",
      title: "IT governance definition",
      points: 1,
      prompt: "According to Weill and Ross, who actually makes IT decisions? ________ makes the decisions. IT governance decides who should make and contribute to them.",
      answers: ["management"],
      answerKey: "management",
      source: "Source: Lecture 11, Accountability Framework, slide 'IT governance', quoting Weill and Ross (2004).",
      whyCorrect: "Correct because Weill and Ross separate management from governance. Management makes the IT decisions. IT governance defines who should make and contribute to those decisions.",
      whyWrong: "Wrong if the answer is governance, the board or the CIO. Governance sets the decision structure. Management works inside that structure.",
      whyExtendedImageRefs: [
        "decision_rights_matrix"
      ]
    },
    {
      id: 4,
      type: "single",
      title: "Fowler vs TOGAF",
      points: 1,
      prompt: "What is the key difference between the TOGAF perspective and the Fowler perspective on architecture?",
      source: "Source: Lecture 5, CIO Toolbox 3, slide 'Different views on architecture and architects'.",
      options: [
        {
          text: "TOGAF represents a formal, often centralized perspective. Fowler represents a more meritocratic and decentralized perspective",
          correct: true,
          why: "Correct: this is the distinction drawn in Lecture 5.",
          whyExtended: [
            "Lecture 5 states: 'The Open Group – through TOGAF – represents a formal, and often centralized, perspective on architecture and architecture work.'",
            "In contrast: 'Martin Fowler – who is the closest we get to an architecture thought leader in agile development, represents a more meritocratic and decentralized perspective.'",
            "The CIO toolbox model describes TOGAF as formal architecture governance, often more centralized. Fowler is described as architecture as \"the important stuff\", with a collaborative and decentralized orientation.",
            "This reflects a broader tension in IT management between structured governance and agile collaboration."
          ]
        },
        {
          text: "TOGAF is only for small startups while Fowler is for large enterprises",
          correct: false,
          why: "Wrong: TOGAF is actually more commonly associated with larger, more complex organizations.",
          whyExtended: [
            "TOGAF originated from US defence – an environment of large, complex organizations – and is used primarily by larger enterprises.",
            "Fowler's perspective is more common in agile development environments, which can include both startups and large teams.",
            "The choice between perspectives is not about company size but about management philosophy: formal governance vs. collaborative decision-making.",
            "Large organizations can use either approach. The question is about centralization vs. decentralization of architectural decisions."
          ]
        },
        {
          text: "They are identical approaches with different names",
          correct: false,
          why: "Wrong: Lecture 5 explicitly contrasts them as representing different views on architecture.",
          whyExtended: [
            "Lecture 5 presents them as alternatives on a spectrum from formal/centralized to collaborative/decentralized.",
            "TOGAF uses a structured Architecture Development Method (ADM) with defined phases and roles.",
            "Fowler views architecture as emergent – 'the important stuff' that the team collectively identifies and cares about.",
            "The CIO toolbox also mentions Open Agile Architecture as a third perspective, further showing that multiple views exist."
          ]
        },
        {
          text: "Fowler rejects the concept of architecture entirely",
          correct: false,
          why: "Wrong: Fowler defines architecture differently but does not reject it.",
          whyExtended: [
            "Fowler defines architecture as 'the important stuff' – he reframes what architecture means rather than rejecting it.",
            "His perspective is that architecture is what the team collectively considers important to understand and preserve.",
            "This is a pragmatic redefinition, not a rejection – it shifts architecture from formal documentation to shared understanding.",
            "Lecture 5 presents Fowler as 'the closest we get to an architecture thought leader in agile development' – he is deeply engaged with architecture, just from a different angle."
          ]
        }
      ],
      whyExtendedImageRefs: [
        "togaf_arkitekturtaksonomi",
        "togaf_levels_model"
      ]
    },
    {
      id: 5,
      type: "dragDrop",
      title: "Architecture perspectives: TOGAF, Fowler and Open Agile Architecture",
      points: 3,
      prompt: "Drag each architecture perspective to the description that best captures it in the course.",
      source: "Source: Lecture 5, CIO Toolbox 3, slides on different views on architecture and Open Agile Architecture.",
      moduleId: "cio-tool-box",
      groupId: "enterprise-architecture",
      cards: [
        {
          id: "perspective-togaf",
          text: "TOGAF"
        },
        {
          id: "perspective-fowler",
          text: "Martin Fowler"
        },
        {
          id: "perspective-open-agile",
          text: "Open Agile Architecture"
        },
        {
          id: "perspective-enterprise-architecture",
          text: "Enterprise Architecture"
        }
      ],
      targets: [
        {
          id: "formal-centralized",
          description: "Formal and often centralized perspective on architecture work",
          correctCardId: "perspective-togaf",
          correctLabel: "TOGAF",
          whyCorrect: "TOGAF represents the formal, often centralized view of architecture work in the lecture.",
          whyWrong: "This description belongs to TOGAF, because the lecture explicitly contrasts TOGAF's formal/centralized orientation with Fowler's more decentralized perspective.",
          whyExtended: [
            "TOGAF is presented as an enterprise architecture framework from The Open Group.",
            "It is associated with architecture governance and structured methods such as ADM.",
            "This is why it maps to the IT Architecture tool in the CIO toolbox."
          ]
        },
        {
          id: "important-stuff",
          description: "Architecture as 'the important stuff', with a collaborative and more decentralized orientation",
          correctCardId: "perspective-fowler",
          correctLabel: "Martin Fowler",
          whyCorrect: "Fowler's perspective is that architecture is about what developers and stakeholders regard as important.",
          whyWrong: "This description belongs to Martin Fowler, because the lecture uses Fowler to represent a more meritocratic and decentralized perspective on architecture.",
          whyExtended: [
            "The lecture contrasts Fowler with TOGAF: Fowler is closer to agile development thinking.",
            "His view emphasizes judgment, collaboration and attention to what actually matters in a given system.",
            "This does not mean architecture is unimportant. It means the architectural boundary depends on context."
          ]
        },
        {
          id: "modularity-standardization-responsiveness",
          description: "Modularity, standardization and built-in responsiveness to change",
          correctCardId: "perspective-open-agile",
          correctLabel: "Open Agile Architecture",
          whyCorrect: "Open Agile Architecture is summarized in the lecture by modularity, standardization and responsiveness to change.",
          whyWrong: "This description belongs to Open Agile Architecture, because the lecture presents it as an alternative to TOGAF with modularity, standardization and built-in responsiveness to change.",
          whyExtended: [
            "Modularity supports team autonomy and resilience.",
            "Standardization supports reconfiguration of products and operating models.",
            "Responsiveness to change keeps architecture from becoming a static control mechanism."
          ]
        },
        {
          id: "optimize-fragmented-legacy",
          description: "Optimize fragmented processes into an integrated environment that supports business strategy",
          correctCardId: "perspective-enterprise-architecture",
          correctLabel: "Enterprise Architecture",
          whyCorrect: "Enterprise Architecture is presented as an approach for optimizing fragmented processes and systems into an integrated environment that supports strategy.",
          whyWrong: "This description belongs to Enterprise Architecture as a broader field, not to one specific named framework or author.",
          whyExtended: [
            "Enterprise Architecture is broader than TOGAF, although TOGAF is a major framework for doing enterprise architecture work.",
            "The lecture emphasizes that organizations often have fragmented legacy processes and systems.",
            "EA aims to create an integrated environment responsive to change and supportive of business strategy."
          ]
        }
      ],
      whyExtendedImageRefs: [
        "togaf_arkitekturtaksonomi",
        "togaf_levels_model",
        "togaf_adm_en"
      ]
    },
    {
      id: 6,
      type: "multi",
      title: "Product team characteristics",
      points: 1,
      prompt: "Mark the correct characteristics of product teams according to the CIO toolbox.",
      source: "Source: Lecture 4, CIO Toolbox 2, slides on product teams and agile development.",
      options: [
        {
          text: "Lasting ownership of a digital product or service",
          correct: true,
          why: "Correct: product teams have continuous, long-term responsibility for their product.",
          whyExtended: [
            "The CIO toolbox model states: 'Lasting ownership of a digital product/service' as a key characteristic.",
            "This contrasts with projects, which are temporary organizations that dissolve after delivery.",
            "Lasting ownership means the team builds deep knowledge of their product, users and technology over time.",
            "Lecture 4 emphasizes: 'Ensure continuity by creating lasting product teams instead of projects.'"
          ]
        },
        {
          text: "Outcome over output",
          correct: true,
          why: "Correct: product teams measure success by results, not by the volume of deliverables.",
          whyExtended: [
            "The CIO toolbox model lists 'Outcome over output' as a core product team principle.",
            "Outcome = the business result or customer value achieved. Output = the features, code or documents produced.",
            "Lecture 4 states: 'Focus on outcome not output' – what matters is the impact, not the activity.",
            "This principle connects to the product team takeaway: 'Give team members autonomy to innovate and explore.'"
          ]
        },
        {
          text: "All scope, time and cost are fixed from the start",
          correct: false,
          why: "Wrong: fixing all three elements of the triple constraint is a project characteristic, and makes projects vulnerable.",
          whyExtended: [
            "The CIO toolbox model states: 'Scope, time, cost – all three fixed → vulnerable' under Projects, not product teams.",
            "Product teams embrace change: 'Pivots and learning expected' is listed as a product team characteristic.",
            "Agile methods prioritize responding to change over following a plan – locking everything from the start contradicts this.",
            "Product teams adjust scope continuously based on user feedback and business priorities."
          ]
        },
        {
          text: "Pivots and learning are expected",
          correct: true,
          why: "Correct: product teams are designed to learn and change direction as needed.",
          whyExtended: [
            "The CIO toolbox model lists 'Pivots and learning expected' as a product team characteristic.",
            "Lecture 4 takeaway: 'Expect pivotal change' – direction changes are normal, not failures.",
            "This connects to the complex domain in Cynefin, where experimentation is necessary because important factors are unknown.",
            "The Silicon Valley leadership lessons include: 'Embrace pivots' and 'Nurture a culture of innovation.'"
          ]
        },
        {
          text: "The team disbands after each sprint",
          correct: false,
          why: "Wrong: product teams have lasting ownership – they do not disband.",
          whyExtended: [
            "Product teams persist over time with continuous ownership of their product or service.",
            "Disbanding after each sprint would make the team equivalent to a very short project, losing accumulated knowledge.",
            "Sprints are iterations within the team's ongoing work, not endpoints that terminate the team.",
            "The whole point of product teams over projects is continuity – 'Ensure continuity by creating lasting product teams instead of projects.'"
          ]
        }
      ],
      whyExtendedImageRefs: [
        "cynefin_theory_of_everything"
      ]
    },
    {
      id: 7,
      type: "single",
      title: "Governance vs management",
      points: 1,
      prompt: "According to Weill and Ross, what is the key distinction between IT governance and IT management?",
      source: "Source: Lecture 6 and Lecture 11, slides on IT governance definition.",
      options: [
        {
          text: "Governance determines who systematically makes and contributes to IT decisions. Management actually makes and implements them",
          correct: true,
          why: "Correct: this is the distinction from Weill and Ross (2004).",
          whyExtended: [
            "Lecture 11 quotes: 'IT governance is not about making IT decisions – management does that – but rather determines who systematically makes and contributes to those decisions.'",
            "Governance is the structural framework: who has decision rights and accountability.",
            "Management is the operational activity: actually analyzing, deciding and implementing.",
            "The governance matrix specifies the structure. Managers operate within that structure to make actual decisions."
          ]
        },
        {
          text: "There is no difference. The terms are interchangeable",
          correct: false,
          why: "Wrong: the course explicitly distinguishes them.",
          whyExtended: [
            "The Weill and Ross definition makes a clear separation between setting up decision rights (governance) and exercising them (management).",
            "Treating them as interchangeable would conflate 'who should decide' with 'what should be decided.'",
            "The course dedicates an entire lecture to IT governance precisely because it is a distinct concept from management.",
            "The governance matrix would be meaningless if governance and management were the same thing."
          ]
        },
        {
          text: "Governance is only for the IT department. Management is for the rest of the organization",
          correct: false,
          why: "Wrong: governance involves both business and IT stakeholders.",
          whyExtended: [
            "The governance archetypes include Business Monarchy and Federal system – both heavily involving business leaders.",
            "The five decision domains include 'business application needs' – a domain where business stakeholders have primary input.",
            "Governance is an organizational capability, not an IT-only function.",
            "The whole point of the governance matrix is to determine the right balance of IT and business involvement across different decision domains."
          ]
        },
        {
          text: "Management always precedes governance in time",
          correct: false,
          why: "Wrong: governance structures should be established to guide management decisions.",
          whyExtended: [
            "Governance sets the framework within which management operates – the structure should exist before decisions are made.",
            "Without governance structures, management decisions may be inconsistent, duplicated or conflicting.",
            "The governance matrix is designed to be established proactively, not as an afterthought.",
            "Management activities occur continuously within the governance framework – it is not a sequential relationship."
          ]
        }
      ],
      whyExtendedImageRefs: [
        "decision_rights_matrix"
      ]
    },
    {
      id: 8,
      type: "dragDrop",
      title: "IT governance archetypes",
      points: 3,
      prompt: "Drag each description to the correct IT governance archetype.",
      source: "Source: Lecture 6, IT governance, Weill and Ross governance archetypes.",
      moduleId: "cio-tool-box",
      groupId: "it-governance",
      cards: [
        {
          id: "business-monarchy-desc",
          text: "Senior business executives make the decision for the enterprise"
        },
        {
          id: "it-monarchy-desc",
          text: "IT executives make the decision"
        },
        {
          id: "feudal-desc",
          text: "Business units or process owners make separate local decisions"
        },
        {
          id: "federal-desc",
          text: "Corporate-level leaders and business-unit representatives share authority"
        },
        {
          id: "it-duopoly-desc",
          text: "IT leaders and one business group decide together"
        },
        {
          id: "anarchy-desc",
          text: "Individual users or small groups pursue their own IT agenda"
        }
      ],
      targets: [
        {
          id: "business-monarchy",
          description: "Business Monarchy",
          correctCardId: "business-monarchy-desc",
          correctLabel: "Senior business executives make the decision for the enterprise",
          whyCorrect: "Business Monarchy means senior business executives make the decision.",
          whyWrong: "This description belongs to Business Monarchy because the decision rights sit with top business leadership.",
          whyExtended: [
            "The CIO may be involved, but the archetype is still business-led.",
            "This is a centralized governance archetype."
          ]
        },
        {
          id: "it-monarchy",
          description: "IT Monarchy",
          correctCardId: "it-monarchy-desc",
          correctLabel: "IT executives make the decision",
          whyCorrect: "IT Monarchy means IT leaders make the decision.",
          whyWrong: "This description belongs to IT Monarchy because the decision rights sit with IT executives.",
          whyExtended: [
            "It is centralized like business monarchy, but authority is placed in the IT function.",
            "It differs from IT duopoly, where IT shares authority with business representatives."
          ]
        },
        {
          id: "feudal",
          description: "Feudal",
          correctCardId: "feudal-desc",
          correctLabel: "Business units or process owners make separate local decisions",
          whyCorrect: "Feudal means business units make separate local decisions.",
          whyWrong: "This description belongs to Feudal because authority is decentralized to business units or processes.",
          whyExtended: [
            "Feudal governance gives local units autonomy.",
            "The risk is fragmentation across the enterprise."
          ]
        },
        {
          id: "federal",
          description: "Federal",
          correctCardId: "federal-desc",
          correctLabel: "Corporate-level leaders and business-unit representatives share authority",
          whyCorrect: "Federal combines central/corporate actors with business-unit representatives.",
          whyWrong: "This description belongs to Federal because it mixes central and local authority.",
          whyExtended: [
            "The lecture compares it to a federal political system.",
            "It tries to balance enterprise coordination with local knowledge."
          ]
        },
        {
          id: "it-duopoly",
          description: "IT Duopoly",
          correctCardId: "it-duopoly-desc",
          correctLabel: "IT leaders and one business group decide together",
          whyCorrect: "IT Duopoly means IT and business representatives decide together.",
          whyWrong: "This description belongs to IT Duopoly because it is specifically a two-party IT + business arrangement.",
          whyExtended: [
            "The key cue is that IT shares decision rights with one business group.",
            "It differs from Federal, which combines broader central and local representation."
          ]
        },
        {
          id: "anarchy",
          description: "Anarchy",
          correctCardId: "anarchy-desc",
          correctLabel: "Individual users or small groups pursue their own IT agenda",
          whyCorrect: "Anarchy means individual users or small groups follow their own IT agenda.",
          whyWrong: "This description belongs to Anarchy because decision rights are effectively left to individuals or small groups.",
          whyExtended: [
            "Anarchy is the most decentralized archetype.",
            "It can create problems for standardization, integration and security."
          ]
        }
      ],
      whyExtendedImageRefs: [
        "decision_rights_matrix"
      ]
    },
    {
      id: 9,
      type: "single",
      title: "Federal archetype",
      points: 1,
      prompt: "Which IT governance archetype involves C-level executives and business representatives from all operating groups collaborating with the IT department?",
      source: "Source: Lecture 6, CIO Toolbox 4, slide 'Summary: Six archetypal approaches to IT decision making'.",
      options: [
        {
          text: "Business Monarchy",
          correct: false,
          why: "Wrong: Business Monarchy is senior business executives (possibly with CIO) making decisions – not all operating groups collaborating.",
          whyExtended: [
            "Lecture 6 defines Business Monarchy as: 'the most centralized approach – a senior business executive or a group of senior executives, sometimes including the CIO, makes all the IT-related decisions.'",
            "The key difference is that Business Monarchy is top-down decision-making by senior leaders, not collaborative involvement of all operating groups.",
            "Business Monarchy does not require input from business representatives of individual operating units.",
            "It is the most centralized archetype, while Federal is more collaborative."
          ]
        },
        {
          text: "IT Duopoly",
          correct: false,
          why: "Wrong: IT Duopoly is a two-party approach with IT executives and business leaders, not the full federal structure.",
          whyExtended: [
            "Lecture 6 defines IT Duopoly as: 'a two-party decision-making approach involves IT executives and a group of business leaders representing the operating units.'",
            "The difference from Federal is scope: Duopoly involves IT + selected business leaders, while Federal involves C-level + all operating groups + IT.",
            "Federal is broader and more inclusive than Duopoly – it resembles a government where central and local levels collaborate.",
            "Duopoly is a bilateral relationship. Federal is a multilateral collaboration."
          ]
        },
        {
          text: "Federal",
          correct: true,
          why: "Correct: Federal involves C-level executives and business representatives of all operating groups collaborating with IT.",
          whyExtended: [
            "Lecture 6 defines Federal: 'C-level executives and business representatives of all the operating groups collaborate with the IT department. This is equivalent to the central government and the states working together.'",
            "Federal is a collaborative archetype that includes representation from all levels and units of the organization.",
            "It balances central authority (C-level) with local representation (operating groups) and technical expertise (IT).",
            "The Federal model is suitable when decisions require broad buy-in and when different units have legitimate but different needs."
          ]
        },
        {
          text: "Feudal",
          correct: false,
          why: "Wrong: Feudal means each business unit or process leader makes separate decisions based on local needs.",
          whyExtended: [
            "Lecture 6 defines Feudal: 'business unit or process leaders make separate decisions on the basis of the unit or process needs.'",
            "Feudal is decentralized without collaboration – each unit acts independently, not together.",
            "The difference from Federal is that Feudal lacks the collaborative element – units make isolated decisions.",
            "Feudal can lead to fragmentation and duplication because there is no coordinating mechanism across units."
          ]
        }
      ],
      whyExtendedImageRefs: [
        "it_governance_matrix"
      ]
    },
    {
      id: 10,
      type: "dragDrop",
      title: "IT governance decision domains",
      points: 3,
      prompt: "Drag each description to the correct IT governance decision domain.",
      source: "Source: Lecture 6, IT governance, Weill and Ross decision domains.",
      moduleId: "cio-tool-box",
      groupId: "it-governance",
      cards: [
        {
          id: "principles-domain-desc",
          text: "IT's role in the enterprise and the high-level principles for using IT"
        },
        {
          id: "architecture-domain-desc",
          text: "Core processes, data integration and standardization of technical capabilities"
        },
        {
          id: "infrastructure-domain-desc",
          text: "Shared technical services and foundational IT capabilities"
        },
        {
          id: "business-app-domain-desc",
          text: "Business requirements and needs for applications"
        },
        {
          id: "investment-domain-desc",
          text: "Which IT initiatives should be funded and prioritized"
        }
      ],
      targets: [
        {
          id: "it-principles",
          description: "IT Principles",
          correctCardId: "principles-domain-desc",
          correctLabel: "IT's role in the enterprise and the high-level principles for using IT",
          whyCorrect: "IT Principles concerns IT's role and high-level direction in the enterprise.",
          whyWrong: "This description belongs to IT Principles because it is about the overall role and principles of IT.",
          whyExtended: [
            "IT principles translate business principles into guidelines for IT.",
            "They are broader than application needs or infrastructure services."
          ]
        },
        {
          id: "it-architecture",
          description: "IT Architecture",
          correctCardId: "architecture-domain-desc",
          correctLabel: "Core processes, data integration and standardization of technical capabilities",
          whyCorrect: "IT Architecture concerns core processes, data integration and standardization.",
          whyWrong: "This description belongs to IT Architecture because the key cues are integration and standardization.",
          whyExtended: [
            "Architecture decisions define shared technical capabilities and process/data logic across the enterprise.",
            "This is where operating model concerns become relevant."
          ]
        },
        {
          id: "it-infrastructure",
          description: "IT Infrastructure",
          correctCardId: "infrastructure-domain-desc",
          correctLabel: "Shared technical services and foundational IT capabilities",
          whyCorrect: "IT Infrastructure concerns shared technical services and foundational capabilities.",
          whyWrong: "This description belongs to IT Infrastructure because it is about shared technical services.",
          whyExtended: [
            "Examples include networks, identity, security services, cloud platforms and shared operations capabilities.",
            "Infrastructure decisions enable application and business capabilities."
          ]
        },
        {
          id: "business-application-needs",
          description: "Business Application Needs",
          correctCardId: "business-app-domain-desc",
          correctLabel: "Business requirements and needs for applications",
          whyCorrect: "Business Application Needs concerns the applications required by business units and processes.",
          whyWrong: "This description belongs to Business Application Needs because it starts from business requirements for applications.",
          whyExtended: [
            "This domain is about what the business needs applications to do.",
            "It differs from architecture, which focuses on integration and standardization logic."
          ]
        },
        {
          id: "it-investment",
          description: "IT Investment",
          correctCardId: "investment-domain-desc",
          correctLabel: "Which IT initiatives should be funded and prioritized",
          whyCorrect: "IT Investment concerns funding and prioritization of IT initiatives.",
          whyWrong: "This description belongs to IT Investment because the key cue is funding and prioritization.",
          whyExtended: [
            "Investment decisions determine which IT initiatives receive resources.",
            "This links governance to business case and portfolio prioritization."
          ]
        }
      ],
      whyExtendedImageRefs: [
        "Domene_modell_IT_beslutninger_spm"
      ]
    },
    {
      id: 11,
      type: "fill",
      title: "Governance matrix",
      points: 1,
      prompt: "The governance matrix combines decision ________ with governance archetypes to clarify who decides what in IT governance.",
      answers: ["domains", "domain", "areas"],
      answerKey: "domains",
      source: "Source: Lecture 6, CIO Toolbox 4, slide 'Styringsmatrisen'.",
      whyCorrect: "Correct because the governance matrix (styringsmatrisen) has the five decision domains (IT principles, IT architecture, IT infrastructure, business application needs, IT investment) on one axis and the six archetypes on the other.",
      whyWrong: "Wrong if the answer refers to tools, methods or archetypes. The matrix combines domains (what is being decided) with archetypes (who decides), not with other structural elements.",
      whyExtendedImageRefs: [
        "it_governance_matrix"
      ]
    },
    {
      id: 12,
      type: "single",
      title: "Cynefin and triple constraint",
      points: 1,
      moduleId: "cio-tool-box",
      groupId: "cynefin",
      prompt: "According to the lecture, how does the number of fixed triple constraint elements relate to Cynefin domains?",
      source: "Source: Lecture 4, CIO Toolbox 2, slide on Cynefin and triple constraint mapping.",
      options: [
        {
          text: "More fixed constraints combined with more added complexity factors push toward higher Cynefin domains (complex/chaotic)",
          correct: true,
          why: "Correct: the lecture shows that fixing more constraints and adding complexity factors increases the Cynefin domain.",
          whyExtended: [
            "Lecture 4 presents a table mapping fixed triple constraint factors and added complexity factors to Cynefin domains.",
            "A project with 3 fixed factors and 0 added complexity is Complex. With 3 fixed factors and 1+ added complexity it becomes Chaotic.",
            "A project with 1 fixed factor and 2 added complexity factors is Clear. With 1 fixed factor and 3+ it becomes Complex.",
            "The key insight is that fixed constraints remove flexibility, while complexity factors add unknowns. Together they escalate the management challenge."
          ],
          whyExtendedImageRefs: [
            "cynefin_theory_of_everything"
          ]
        },
        {
          text: "The number of fixed constraints has no relationship to Cynefin at all",
          correct: false,
          why: "Wrong: the lecture explicitly maps triple constraint elements to Cynefin domains.",
          whyExtended: [
            "Lecture 4 dedicates a slide to mapping the triple constraint to Cynefin domains.",
            "The article referenced in the lecture presents a method to choose project management approach based on fixed constraints and complexity factors.",
            "Ignoring the triple constraint-Cynefin connection would miss a key integration point between tools 5 (Projects) and the meta-tool (Cynefin).",
            "The mapping provides a practical way to assess which management approach a project needs."
          ]
        },
        {
          text: "Fixing all three constraints always results in a Clear situation",
          correct: false,
          why: "Wrong: fixing all three constraints (scope, time, cost) actually indicates Complex or Chaotic, not Clear.",
          whyExtended: [
            "Lecture 4's table shows that 3 fixed constraints with 0 complexity factors maps to Complex, not Clear.",
            "The CIO toolbox model states: 'Scope, time, cost – all three fixed → vulnerable.'",
            "Clear situations have low complexity and few fixed constraints – they are well-understood problems with known solutions.",
            "Fixing all three constraints removes all flexibility, which makes the project more complex to manage, not simpler."
          ]
        },
        {
          text: "Chaotic situations always have zero fixed constraints",
          correct: false,
          why: "Wrong: Chaotic can occur with any number of fixed constraints if complexity is high enough.",
          whyExtended: [
            "Lecture 4's table shows Chaotic can occur with 1 fixed factor (+ 4+ complexity), 2 fixed (+ 2+), or 3 fixed (+ 1+).",
            "It is the combination of fixed constraints and complexity factors that determines the Cynefin domain.",
            "Even with 1 fixed constraint, enough added complexity factors (4+) can push the situation to Chaotic.",
            "The mapping is a two-dimensional assessment, not simply based on one variable alone."
          ]
        }
      ]
    },
{
      id: 13,
      type: "matrix-placement",
      title: "Cynefin: domains and management approach",
      points: 4,
      prompt: "Drag each management approach to the Cynefin domain where it fits best.",
      source: "Source: Lecture 4, CIO Toolbox 2, Cynefin as a meta-tool for choosing management approach.",
      moduleId: "cio-tool-box",
      groupId: "cynefin",
      itemBankTitle: "Management approaches",
      itemBankSubtitle: "Place each card in the domain where the approach fits best.",
      itemBankHint: "Use the explanation image as support. Clear, complicated, complex and chaotic require different ways to respond.",
      matrix: {
        xAxis: {
          label: "Cause-effect predictability",
          lowLabel: "Unclear",
          highLabel: "Clearer"
        },
        yAxis: {
          label: "Need for analysis before action",
          lowLabel: "Low",
          highLabel: "High"
        },
        quadrants: [
          {
            id: "complex",
            x: "low",
            y: "high",
            title: "Complex",
            description: "Probe, sense, respond. Emergent practice."
          },
          {
            id: "complicated",
            x: "high",
            y: "high",
            title: "Complicated",
            description: "Sense, analyze, respond. Good practice."
          },
          {
            id: "chaotic",
            x: "low",
            y: "low",
            title: "Chaotic",
            description: "Act, sense, respond. Novel practice."
          },
          {
            id: "clear",
            x: "high",
            y: "low",
            title: "Clear",
            description: "Sense, categorize, respond. Best practice."
          }
        ]
      },
      items: [
        {
          id: "experimentation-learning",
          label: "Use experimentation, design thinking and learning",
          correctQuadrantId: "complex"
        },
        {
          id: "expert-analysis-planning",
          label: "Use expert analysis and planning",
          correctQuadrantId: "complicated"
        },
        {
          id: "immediate-stabilization",
          label: "Act immediately to stabilize the situation",
          correctQuadrantId: "chaotic"
        },
        {
          id: "procedures-best-practice",
          label: "Use procedures and best practice",
          correctQuadrantId: "clear"
        }
      ],
      itemFeedback: {
        "experimentation-learning": {
          whyCorrect: "Correct. This approach belongs in the complex domain.",
          whyWrong: "This approach belongs in Complex, because the problem cannot be analyzed reliably in advance.",
          whyExtended: [
            "In complex situations, important causal relationships are unknown before trying something.",
            "That is why probe, sense, respond fits better than pure expert analysis or fixed procedures.",
            "Design thinking fits here because it uses user insight, prototyping and learning."
          ]
        },
        "expert-analysis-planning": {
          whyCorrect: "Correct. This approach belongs in the complicated domain.",
          whyWrong: "This approach belongs in Complicated, because cause and effect can be analyzed, but require expertise.",
          whyExtended: [
            "In complicated situations, there is not necessarily one obvious answer.",
            "Experts can analyze the situation and choose a good practice.",
            "Business case and alternative analysis often fit here when the problem can be investigated."
          ]
        },
        "immediate-stabilization": {
          whyCorrect: "Correct. This approach belongs in the chaotic domain.",
          whyWrong: "This approach belongs in Chaotic, because the situation must first be stabilized.",
          whyExtended: [
            "In chaotic situations, there is no time for long analysis before the first response.",
            "The first step is to act to create enough order to understand the situation.",
            "After stabilization, the organization can sense and respond more deliberately."
          ]
        },
        "procedures-best-practice": {
          whyCorrect: "Correct. This approach belongs in the clear domain.",
          whyWrong: "This approach belongs in Clear, because the situation is known and can be handled with established procedures.",
          whyExtended: [
            "In clear situations, cause and effect are obvious.",
            "The organization can sense the situation, categorize it and use best practice.",
            "The mistake is to overcomplicate a routine situation."
          ]
        }
      },
      whyExtendedImageRefs: [
        "cynefin_model"
      ]
    },
{
      id: 14,
      type: "drag-categorize",
      title: "Cynefin: primary placement of frameworks",
      points: 4,
      prompt: "Sort each framework or practice into the Cynefin domain where it primarily belongs. Use only the primary placement from the explanation figure.",
      source: "Source: IN5431 Cynefin frameworks figure, public/subjects/in5431/cio-tool-box/cynefin/cynefin_frameworks.png.",
      moduleId: "cio-tool-box",
      groupId: "cynefin",
      items: [
        { id: "cynefin-design-thinking", label: "Design thinking" },
        { id: "cynefin-double-diamond", label: "Double diamond" },
        { id: "cynefin-experimentation", label: "Experimentation" },
        { id: "cynefin-scrum", label: "Scrum" },
        { id: "cynefin-product-teams", label: "Product teams" },
        { id: "cynefin-agile-methods", label: "Agile methods" },
        { id: "cynefin-prince2-projects", label: "PRINCE2 / projects" },
        { id: "cynefin-kanban", label: "Kanban" },
        { id: "cynefin-immediate-action", label: "Immediate action" },
        { id: "cynefin-crisis-stabilization", label: "Crisis stabilization" },
        { id: "cynefin-procedures", label: "Known procedures" },
        { id: "cynefin-standardization", label: "Standardization" },
        { id: "cynefin-best-practice", label: "Best practice" },
        { id: "cynefin-itil", label: "ITIL" }
      ],
      categories: [
        { id: "complex", label: "Complex: unclear problem, solution must be learned" },
        { id: "complicated", label: "Complicated: experts can analyze the problem" },
        { id: "chaotic", label: "Chaotic: stabilize before analysis" },
        { id: "clear", label: "Clear: known cause and effect" }
      ],
      correctAnswer: {
        complex: [
          "cynefin-design-thinking",
          "cynefin-double-diamond",
          "cynefin-experimentation",
          "cynefin-scrum",
          "cynefin-agile-methods"
        ],
        complicated: [
          "cynefin-product-teams",
          "cynefin-prince2-projects",
          "cynefin-kanban"
        ],
        chaotic: [
          "cynefin-immediate-action",
          "cynefin-crisis-stabilization"
        ],
        clear: [
          "cynefin-procedures",
          "cynefin-standardization",
          "cynefin-best-practice",
          "cynefin-itil"
        ]
      },
      itemFeedback: {
        "cynefin-design-thinking": {
          whyCorrect: "Correct. Design thinking primarily belongs in Complex because the problem is unclear and must be explored through user insight, prototyping and learning.",
          whyWrong: "Design thinking belongs in Complex. It fits when the problem is not fixed in advance and the solution must be learned.",
          whyExtended: [
            "In complex situations, cause and effect become visible only after trying something.",
            "Design thinking uses exploration, problem reframing, co-design and small-scale testing.",
            "This fits probe, sense, respond better than pure expert analysis or fixed procedures."
          ]
        },
        "cynefin-double-diamond": {
          whyCorrect: "Correct. Double diamond primarily belongs in Complex because it structures exploration of both the problem space and the solution space.",
          whyWrong: "Double diamond belongs in Complex. The model is used when the organization must explore and learn before the solution can be fixed.",
          whyExtended: [
            "Discover and Define open and narrow the problem understanding.",
            "Develop and Deliver open and test the solution space.",
            "This fits situations where the answer cannot simply be analyzed in advance."
          ]
        },
        "cynefin-experimentation": {
          whyCorrect: "Correct. Experimentation primarily belongs in Complex because learning happens through probes and response.",
          whyWrong: "Experimentation belongs in Complex. The point is to try, observe and adjust when the problem is unclear.",
          whyExtended: [
            "Complex problems require probe, sense, respond.",
            "Small experiments allow learning without locking into a heavy plan too early.",
            "This differs from Complicated, where experts can analyze toward a good solution."
          ]
        },
        "cynefin-scrum": {
          whyCorrect: "Correct. Scrum primarily belongs in Complex because short iterations support learning and adaptation.",
          whyWrong: "Scrum belongs in Complex. The emphasis here is iterative learning, not only delivery planning.",
          whyExtended: [
            "Scrum can include planning, but this primary placement emphasizes learning through iterations.",
            "Sprints create frequent opportunities to inspect and adapt the work.",
            "That is why Scrum is placed with design thinking and agile methods."
          ]
        },
        "cynefin-product-teams": {
          whyCorrect: "Correct. Product teams primarily belong in Complicated in this answer key because they concern organization, lasting ownership and governed development of a digital product.",
          whyWrong: "Product teams belong in Complicated in this answer key. Here the emphasis is product teams as an organizing form for development and operations, not pure experimentation.",
          whyExtended: [
            "Product teams own a digital service over time and prioritize further development within a governed setting.",
            "The team can learn and adapt, but the organizing form also concerns responsibility, continuity and planned improvement.",
            "That is why product teams are placed here with PRINCE2 / projects and Kanban in this simplified Cynefin sorting."
          ]
        },
        "cynefin-agile-methods": {
          whyCorrect: "Correct. Agile methods primarily belong in Complex because they support iteration, feedback and learning under uncertainty.",
          whyWrong: "Agile methods belong in Complex. Their primary logic is iterative work when needs and solutions are not fully known.",
          whyExtended: [
            "Agile methods fit when requirements change or are not fully understood.",
            "Feedback is used to adjust direction during the work.",
            "This connects them closely to probe, sense, respond."
          ]
        },
        "cynefin-prince2-projects": {
          whyCorrect: "Correct. PRINCE2 / projects primarily belongs in Complicated because project management relies on planning, roles and control.",
          whyWrong: "PRINCE2 / projects belongs in Complicated. The primary logic here is analysis, planning and structured execution.",
          whyExtended: [
            "Projects are used to deliver specified results within time, cost and scope.",
            "PRINCE2 provides governance structure with roles, processes and control points.",
            "This fits best when work can be planned and analyzed before execution."
          ]
        },
        "cynefin-kanban": {
          whyCorrect: "Correct. Kanban primarily belongs in Complicated in this answer key because work is managed through visible flow, WIP limits and process improvement.",
          whyWrong: "Kanban belongs in Complicated in this answer key. The emphasis is workflow management, analysis and improvement.",
          whyExtended: [
            "Kanban makes work, queues and bottlenecks visible.",
            "It is often used to manage and improve an understood workflow.",
            "That is why it is placed here with planning and project management."
          ]
        },
        "cynefin-immediate-action": {
          whyCorrect: "Correct. Immediate action primarily belongs in Chaotic because the situation must be stabilized before analysis makes sense.",
          whyWrong: "Immediate action belongs in Chaotic. In chaos, the first step is to act to create enough order to understand the situation.",
          whyExtended: [
            "In chaotic situations, there is no time for long analysis first.",
            "The action pattern is act, sense, respond.",
            "After stabilization, the situation may move into another domain."
          ]
        },
        "cynefin-crisis-stabilization": {
          whyCorrect: "Correct. Crisis stabilization primarily belongs in Chaotic because the first goal is to create control.",
          whyWrong: "Crisis stabilization belongs in Chaotic. Before experts can analyze, the situation must be stabilized.",
          whyExtended: [
            "Chaos means cause and effect cannot be used as a basis for calm analysis at the start.",
            "The first response is to stop harm, create control and gain an overview.",
            "Then the organization can sense and respond more systematically."
          ]
        },
        "cynefin-procedures": {
          whyCorrect: "Correct. Known procedures primarily belong in Clear because cause and effect are known and action can be standardized.",
          whyWrong: "Known procedures belong in Clear. They fit when the situation is known and the right response is already established.",
          whyExtended: [
            "In clear situations, the organization can sense, categorize and respond.",
            "Known procedures make known work repeatable.",
            "The mistake is to treat a routine situation as if it needs heavy analysis or experimentation."
          ]
        },
        "cynefin-standardization": {
          whyCorrect: "Correct. Standardization primarily belongs in Clear because known processes can be made uniform and repeatable.",
          whyWrong: "Standardization belongs in Clear. It fits when the organization already knows what works and wants consistent execution.",
          whyExtended: [
            "Standardization reduces variation in known processes.",
            "It makes sense when cause and effect are understood and practice can be followed.",
            "When the problem is unclear, premature standardization can block learning."
          ]
        },
        "cynefin-best-practice": {
          whyCorrect: "Correct. Best practice primarily belongs in Clear because established practice can be followed directly.",
          whyWrong: "Best practice belongs in Clear. It fits when the right response is already known.",
          whyExtended: [
            "The clear domain covers situations where cause and effect are obvious.",
            "The organization can categorize the situation and follow established best practice.",
            "In complex situations, best practice does not exist in the same way until more has been learned."
          ]
        },
        "cynefin-itil": {
          whyCorrect: "Correct. ITIL primarily belongs in Clear here because it represents established practice for IT Service Management.",
          whyWrong: "ITIL belongs in Clear in this sorting. Here ITIL is treated as procedures and best practice for IT services.",
          whyExtended: [
            "ITIL is relevant for governance, operation and delivery of IT services.",
            "In this Cynefin mapping, it is placed as established best practice.",
            "This does not mean all IT operations are simple, but that ITIL primarily represents standardized practice."
          ]
        }
      },
      whyExtendedImageRefs: [
        "cynefin_frameworks"
      ]
    },
    {
      id: 15,
      type: "single",
      title: "Open Agile Architecture",
      points: 1,
      prompt: "What are the three key principles of the Open Agile Architecture perspective mentioned in the course?",
      source: "Source: Lecture 5, CIO Toolbox 3, slide 'Alternative to TOGAF: Open Agile Architecture'.",
      options: [
        {
          text: "Modularity, standardization, and built-in responsiveness to change",
          correct: true,
          why: "Correct: these are the three principles from the Open Agile Architecture slide.",
          whyExtended: [
            "Lecture 5 lists: 'Modularity, to facilitate team autonomy and increase resilience', 'Standardization, to facilitate product or operating model reconfiguration', 'Architecting for a built-in responsiveness to change.'",
            "These principles bridge the formal TOGAF approach with Fowler's agile perspective.",
            "Modularity enables the autonomy that product teams need. Standardization enables the alignment that governance requires.",
            "Open Agile Architecture comes from The Open Group – the same organization behind TOGAF – showing evolution in their thinking."
          ]
        },
        {
          text: "Speed, cost reduction, and headcount minimization",
          correct: false,
          why: "Wrong: these are operational efficiency goals, not architecture principles.",
          whyExtended: [
            "Open Agile Architecture focuses on structural principles for how to design enterprise architecture, not on cost metrics.",
            "Modularity is about team autonomy and resilience, not about reducing headcount.",
            "Standardization is about enabling reconfiguration, not about cutting costs.",
            "Architecture principles guide design decisions. Efficiency goals guide operational management."
          ]
        },
        {
          text: "Hierarchy, command-and-control, and fixed scope",
          correct: false,
          why: "Wrong: these describe a traditional, rigid management style – the opposite of agile architecture.",
          whyExtended: [
            "Open Agile Architecture values 'responsiveness to change'. This is the opposite of fixed scope.",
            "Modularity 'facilitates team autonomy'. This is the opposite of command-and-control.",
            "Agile architecture aims to be adaptive, not hierarchical and rigid.",
            "The 'Agile' in Open Agile Architecture signals alignment with agile values of flexibility and responsiveness."
          ]
        },
        {
          text: "Marketing, sales, and customer acquisition",
          correct: false,
          why: "Wrong: these are business functions, not architecture principles.",
          whyExtended: [
            "Architecture principles guide how to structure technical and organizational capabilities, not how to do marketing.",
            "Business functions may be represented in Business Architecture, but they are not architecture principles themselves.",
            "Open Agile Architecture is about how to design for adaptability, not about specific business activities.",
            "The three principles (modularity, standardization, responsiveness) are structural choices, not functional strategies."
          ]
        }
      ],
      whyExtendedImageRefs: [
        "togaf_levels_model"
      ]
    },
    {
      id: 16,
      type: "single",
      title: "TOGAF ADM",
      points: 1,
      prompt: "In the TOGAF context, what is ADM?",
      source: "Source: Lecture 5, CIO Toolbox 3, slide 'TOGAF: The Architecture Development Method (ADM)'.",
      moduleId: "cio-tool-box",
      groupId: "enterprise-architecture",
      options: [
        {
          text: "Architecture Development Method – a structured method for developing and managing enterprise architecture",
          correct: true,
          why: "Correct: ADM stands for Architecture Development Method and is the core structured method in TOGAF.",
          whyExtended: [
            "The lecture presents TOGAF through the Architecture Development Method (ADM).",
            "ADM structures architecture work through phases and governance rather than treating architecture as an ad hoc activity.",
            "In the CIO toolbox, this belongs under IT Architecture because it helps analyze and structure the IT portfolio and architecture work.",
            "A key exam cue is the word 'method': TOGAF is not only a taxonomy of architecture layers, but also a method for architecture development."
          ]
        },
        {
          text: "Agile Delivery Model – a Scrum method for sprint planning",
          correct: false,
          why: "Wrong: ADM is not a Scrum or sprint-planning method.",
          whyExtended: [
            "Scrum belongs to agile software delivery and product teams, not to TOGAF's enterprise architecture method.",
            "ADM stands for Architecture Development Method, not Agile Delivery Model.",
            "TOGAF is mapped to IT Architecture, while Scrum is mapped to Product teams and agile methods in the frameworks slide.",
            "This distinction is important because both are frameworks, but they support different management problems."
          ]
        },
        {
          text: "Application Data Matrix – a list of database tables for one application",
          correct: false,
          why: "Wrong: TOGAF includes Data and Application Architecture, but ADM does not mean Application Data Matrix.",
          whyExtended: [
            "ADM is a method for architecture development across the enterprise, not a local database artifact.",
            "The TOGAF taxonomy includes Business, Data, Application and Technology Architecture, but ADM refers to the process/method side of TOGAF.",
            "Application and data concerns may appear within ADM work, but they are not the meaning of ADM itself.",
            "Do not confuse architecture layers with the Architecture Development Method."
          ]
        },
        {
          text: "Automated Decision Management – a governance model for replacing architects with automated rules",
          correct: false,
          why: "Wrong: ADM is about structured architecture development, not automating away architectural judgment.",
          whyExtended: [
            "The lecture emphasizes that architecture work still requires judgment about what should be coordinated centrally and what can be decentralized.",
            "TOGAF may be formal and centralized, but it is not described as automated decision-making.",
            "Frameworks guide architecture work. They do not replace leadership, dialogue and contextual judgment.",
            "The correct expansion is Architecture Development Method."
          ]
        }
      ],
      whyExtendedImageRefs: [
        "togaf_adm_en",
        "togaf_adm_no"
      ]
    },
    {
      id: 17,
      type: "multi",
      title: "TOGAF and enterprise architecture caveats",
      points: 1,
      prompt: "Mark the statements that fit how TOGAF and enterprise architecture are presented in the course.",
      source: "Source: Lecture 5, CIO Toolbox 3, slides on TOGAF, Enterprise Architecture and different architecture perspectives.",
      moduleId: "cio-tool-box",
      groupId: "enterprise-architecture",
      options: [
        {
          text: "TOGAF is associated with enterprise architecture and a formal, often centralized perspective on architecture work.",
          correct: true,
          why: "Correct: the lecture explicitly presents TOGAF as formal and often centralized.",
          whyExtended: [
            "TOGAF is introduced as a framework for enterprise architecture.",
            "The Open Group, through TOGAF, represents the formal and often centralized perspective in the lecture.",
            "This contrasts with Fowler's more meritocratic and decentralized architecture perspective.",
            "The point is not that TOGAF is always wrong, but that its usefulness depends on context."
          ]
        },
        {
          text: "Enterprise architecture aims to reduce fragmentation and create an integrated environment that supports business strategy.",
          correct: true,
          why: "Correct: this is the purpose of enterprise architecture presented in the lecture.",
          whyExtended: [
            "The lecture defines the purpose of enterprise architecture as optimizing fragmented legacy processes into an integrated environment.",
            "The target environment should be responsive to change and supportive of business strategy delivery.",
            "This explains why enterprise architecture sits between business processes and IT architecture in the CIO toolbox.",
            "It is not just technical documentation. It is supposed to support strategic execution."
          ]
        },
        {
          text: "TOGAF replaces the need to understand business processes because it is only about hardware and networks.",
          correct: false,
          why: "Wrong: TOGAF includes Business Architecture and Application/Data layers, not only hardware and networks.",
          whyExtended: [
            "The TOGAF taxonomy includes Business, Data, Application and Technology Architecture.",
            "Business Architecture explicitly covers business strategy, governance, organization and key business processes.",
            "Technology Architecture is only one of the four layers, not the whole framework.",
            "The lecture places TOGAF in the broader context of business processes and IT architecture."
          ]
        },
        {
          text: "Enterprise architecture initiatives can become too top-down and continue without producing concrete business value.",
          correct: true,
          why: "Correct: the course notes that EA can be hard, top-down and sometimes criticized for limited concrete results.",
          whyExtended: [
            "The course summary notes that enterprise architecture management can be holistic and useful for complex portfolios, but difficult in practice.",
            "A common challenge is that EA initiatives can seem to go on forever without concrete results.",
            "The lecture also contrasts central coordination with more decentralized architecture thinking.",
            "This is why the exam point is not 'TOGAF is always best', but 'TOGAF is one formal architecture framework whose value is context-sensitive'."
          ]
        },
        {
          text: "Fowler and TOGAF are presented as identical views with different names.",
          correct: false,
          why: "Wrong: the lecture explicitly contrasts TOGAF and Fowler as different architecture perspectives.",
          whyExtended: [
            "TOGAF is the formal, often centralized perspective.",
            "Fowler represents a more meritocratic and decentralized perspective associated with agile development.",
            "Fowler's phrase 'architecture is about the important stuff' signals context-sensitive judgment rather than a fixed formal taxonomy alone.",
            "Understanding this contrast is more important than memorizing TOGAF as a universally correct method."
          ]
        }
      ],
      whyExtendedImageRefs: [
        "togaf_arkitekturtaksonomi",
        "togaf_adm_en"
      ]
    },
    {
      id: 18,
      type: "drag-categorize",
      title: "D4D transformation theory",
      points: 3,
      prompt: "Drag each element to the transformation area it belongs to in the Designed for Digital summary model.",
      source: "Source: Lecture 13, Designed for Digital summary, transformation theory slide.",
      moduleId: "designed-for-digital",
      groupId: "overview",
      items: [
        { id: "new-digital-value-propositions", label: "New value creation through digital value propositions" },
        { id: "operational-backbone-transform", label: "Operational Backbone" },
        { id: "digital-platform-transform", label: "Digital Platform" },
        { id: "digital-offerings-transform", label: "Digital Offerings" },
        { id: "shared-customer-insight-transform", label: "Shared Customer Insight" },
        { id: "accountability-framework-transform", label: "Accountability Framework" }
      ],
      categories: [
        { id: "business-transformation", label: "Business Transformation" },
        { id: "architecture-transformation", label: "Architecture Transformation" },
        { id: "governance-transformation", label: "Governance Transformation" }
      ],
      correctAnswer: {
        "business-transformation": ["new-digital-value-propositions"],
        "architecture-transformation": ["operational-backbone-transform", "digital-platform-transform", "digital-offerings-transform"],
        "governance-transformation": ["shared-customer-insight-transform", "accountability-framework-transform"]
      },
      itemFeedback: {
        "new-digital-value-propositions": {
          whyCorrect: "Business Transformation is about new value creation through digital value propositions.",
          whyWrong: "New digital value propositions belong to Business Transformation, because they change how the organization creates value.",
          whyExtended: [
            "The D4D summary separates business, architecture and governance transformation.",
            "Business transformation is the value proposition layer."
          ]
        },
        "operational-backbone-transform": {
          whyCorrect: "Operational Backbone belongs to Architecture Transformation.",
          whyWrong: "Operational Backbone belongs to Architecture Transformation because it structures core systems, processes and data.",
          whyExtended: [
            "It provides the stable, reliable foundation for digital business.",
            "In the transformation theory slide it is grouped together with Digital Platform and Digital Offerings."
          ]
        },
        "digital-platform-transform": {
          whyCorrect: "Digital Platform belongs to Architecture Transformation.",
          whyWrong: "Digital Platform belongs to Architecture Transformation because it is a reusable component architecture for digital offerings.",
          whyExtended: [
            "The platform gives teams access to business, data and infrastructure components.",
            "It connects the operational backbone to innovation-facing digital offerings."
          ]
        },
        "digital-offerings-transform": {
          whyCorrect: "Digital Offerings belongs to Architecture Transformation in this model.",
          whyWrong: "Digital Offerings is grouped under Architecture Transformation in the summary slide, together with OB and DP.",
          whyExtended: [
            "Digital offerings are the concrete software-enabled solutions delivered to customers.",
            "They depend on the architecture and platform components underneath them."
          ]
        },
        "shared-customer-insight-transform": {
          whyCorrect: "Shared Customer Insight belongs to Governance Transformation.",
          whyWrong: "Shared Customer Insight belongs to Governance Transformation because it shapes organizational learning and prioritization.",
          whyExtended: [
            "It is not only a data or architecture issue. It concerns how the organization learns what to build.",
            "The summary slide groups it with Accountability Framework under governance transformation."
          ]
        },
        "accountability-framework-transform": {
          whyCorrect: "Accountability Framework belongs to Governance Transformation.",
          whyWrong: "Accountability Framework belongs to Governance Transformation because it allocates ownership and decision responsibility.",
          whyExtended: [
            "It balances autonomy and alignment for digital offerings and components.",
            "This is governance because it determines responsibility and accountability."
          ]
        }
      },
      whyExtendedImageRefs: [
        "D4D-overview"
      ]
    },
    {
      id: 19,
      type: "single",
      title: "Frameworks outside the toolbox",
      points: 1,
      prompt: "Which of the following is described as 'outside the toolbox but part of IT management' in the CIO toolbox model?",
      source: "Source: CIO toolbox model, bottom section.",
      options: [
        {
          text: "Change management (Prosci / ADKAR)",
          correct: true,
          why: "Correct: change management is explicitly listed as outside the toolbox but part of IT management.",
          whyExtended: [
            "The CIO toolbox model's bottom section lists: 'Outside the toolbox, but part of IT management: Change management (Prosci / ADKAR), IT service management (ITIL), Procurement / outsourcing, Communication, HR.'",
            "Change management deals with how people adopt and adapt to organizational changes. This is a critical success factor for IT initiatives.",
            "Prosci / ADKAR model is listed in Lecture 6's framework overview as a change management framework with private origin.",
            "While not one of the seven core tools, change management is essential for successful implementation of IT decisions."
          ]
        },
        {
          text: "Business case",
          correct: false,
          why: "Wrong: business case is tool 1 inside the CIO toolbox.",
          whyExtended: [
            "Business case is the first numbered tool in the CIO toolbox, with purpose 'Prioritization of digital services and funding.'",
            "It is one of the seven core tools, not an external management discipline.",
            "Business case includes NPV, qualitative considerations and communicative effect. It is fully inside the toolbox.",
            "The 'outside the toolbox' category contains supporting disciplines that complement the seven core tools."
          ]
        },
        {
          text: "Design thinking",
          correct: false,
          why: "Wrong: design thinking is tool 3 inside the CIO toolbox.",
          whyExtended: [
            "Design thinking is the third numbered tool. Its purpose is 'Prioritization and product choice – when the problem is unclear.'",
            "It includes the Double Diamond process, problem-reframing, user insight and prototyping. These are all inside the toolbox.",
            "Design thinking is categorized under 'INNOVASJON / UTFORSKNING' in the CIO toolbox model.",
            "The 'outside the toolbox' items are supporting disciplines, not innovation methods."
          ]
        },
        {
          text: "IT governance",
          correct: false,
          why: "Wrong: IT governance is tool 7 inside the CIO toolbox.",
          whyExtended: [
            "IT governance is the seventh and final numbered tool in the CIO toolbox.",
            "Its purpose is: 'How to distribute responsibility for IT among organizational units?'",
            "IT governance includes the five decision domains, six archetypes and the governance matrix. These are all inside the toolbox.",
            "IT governance is categorized under 'STYRING' (governance/steering) in the CIO toolbox model."
          ],
          whyExtendedImageRefs: [
            "it_governance_matrix"
          ]
        }
      ],
      whyExtendedImageRefs: [
        "prince2_framework_model"
      ]
    },
    {
      id: 20,
      type: "dragDrop",
      title: "Digital strategy elements",
      points: 2,
      prompt: "Drag each meaning to the correct element of a digital strategy.",
      source: "Source: Digital strategy lecture, content of a digital strategy.",
      moduleId: "strategy",
      groupId: "digital-strategy",
      cards: [
        {
          id: "vision-meaning",
          text: "A challenging and inspiring direction for digital change"
        },
        {
          id: "portfolio-meaning",
          text: "A prioritized set of digital initiatives"
        },
        {
          id: "roadmap-meaning",
          text: "A planning tool for timing and sequencing initiatives"
        },
        {
          id: "responsibility-meaning",
          text: "A definition of who owns and is accountable for what"
        }
      ],
      targets: [
        {
          id: "digital-vision",
          description: "Digital vision",
          correctCardId: "vision-meaning",
          correctLabel: "A challenging and inspiring direction for digital change",
          whyCorrect: "A digital vision gives a challenging and inspiring direction.",
          whyWrong: "This meaning belongs to Digital vision because it is about direction and ambition.",
          whyExtended: [
            "A digital vision should guide digital initiatives, not just describe a system purchase.",
            "It connects digital resources to desired value creation."
          ]
        },
        {
          id: "portfolio-of-initiatives",
          description: "Portfolio of digital initiatives",
          correctCardId: "portfolio-meaning",
          correctLabel: "A prioritized set of digital initiatives",
          whyCorrect: "A portfolio of digital initiatives is the prioritized set of digital efforts.",
          whyWrong: "This meaning belongs to Portfolio of digital initiatives because it is about choosing and prioritizing initiatives.",
          whyExtended: [
            "The portfolio turns the vision into a set of concrete initiatives.",
            "It creates a bridge to prioritization and funding decisions."
          ]
        },
        {
          id: "roadmap",
          description: "Roadmap",
          correctCardId: "roadmap-meaning",
          correctLabel: "A planning tool for timing and sequencing initiatives",
          whyCorrect: "A roadmap is a planning tool for timing and sequencing.",
          whyWrong: "This meaning belongs to Roadmap because it is about when and in what order initiatives should happen.",
          whyExtended: [
            "The roadmap does not only list initiatives. It sequences them over time.",
            "It helps coordinate dependencies and communicate the journey."
          ]
        },
        {
          id: "definition-of-responsibility",
          description: "Definition of responsibility",
          correctCardId: "responsibility-meaning",
          correctLabel: "A definition of who owns and is accountable for what",
          whyCorrect: "Definition of responsibility clarifies ownership and accountability.",
          whyWrong: "This meaning belongs to Definition of responsibility because it answers who owns what.",
          whyExtended: [
            "Without responsibility, a digital strategy can become a wish list rather than an execution plan.",
            "This connects digital strategy to governance and accountability."
          ]
        }
      ],
      whyExtendedImageRefs: [
        "digital_strategy_model"
      ]
    }
  ]
};

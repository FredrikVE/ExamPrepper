// src/data/exams/mockExam3_en.js
export const mockExam3_en = {
  id: "mock-exam-3-en",
  subjectId: "in5431",
  baseId: "mock-exam-3",
  lang: "en",
  title: "Practice Exam 3: Cases and Hard Distinctions",
  description: "Questions that train conceptual distinctions and application: PRINCE2, alternative evaluation techniques, architecture perspectives, strategic context, digitalization culture, D4D details and sustainability frameworks.",
  modeLabel: "CASE AND CONTRASTS",
  estimatedMinutes: "45–60",
  sortOrder: 30,
  questions: [
    {
      id: 201,
      type: "multi",
      title: "The action plan in a strategy process",
      points: 1,
      moduleId: "strategy",
      groupId: "action-plan",
      prompt: "Mark the elements that, according to the lecture, should be included in a working action plan after a strategy process.",
      source: "Source: Lecture 4, slide 'Recall from our lecture on strategy that the result of a strategy process is an action plan'.",
      options: [
        {
          text: "Activities to change or develop the current operation so that strategic goals can be achieved.",
          correct: true,
          why: "Correct: the action plan must specify which activities will change or develop the organization.",
          whyExtended: [
            "The lecture lists this as the first element of an action plan: activities to change or develop the current operation to meet strategic goals.",
            "Without concrete activities, strategy remains an intention rather than something that can be implemented.",
            "This connects strategy to actual management work: prioritized initiatives must be started to achieve the desired results."
          ],
          whyExtendedImageRefs: [
            {
              moduleId: "strategy",
              groupId: "action-plan",
              imageId: "strategy_action_plan_model"
            }
          ]
        },
        {
          text: "Assigned responsibility for the activities.",
          correct: true,
          why: "Correct: responsibility must be allocated so that the plan can be followed up.",
          whyExtended: [
            "The lecture lists 'assigned responsibility for these activities' as a requirement for an action plan.",
            "This connects to accountability: someone must be responsible for progress and outcomes.",
            "Without accountability, it becomes difficult to know who should make decisions, escalate problems or deliver."
          ],
          whyExtendedImageRefs: [
            {
              moduleId: "strategy",
              groupId: "action-plan",
              imageId: "strategy_action_plan_model"
            }
          ]
        },
        {
          text: "Expected ordering and timeframe for execution, meaning a roadmap.",
          correct: true,
          why: "Correct: a roadmap describes when and in which order the activities should be carried out.",
          whyExtended: [
            "The lecture formulates this as 'expected ordering and timeframe for executing the activities aka roadmap'.",
            "The roadmap makes the plan operational and helps the organization prioritize over time.",
            "This is especially important when activities depend on one another, for example when an operational backbone must be improved before new digital offerings can be scaled."
          ],
          whyExtendedImageRefs: [
            {
              moduleId: "strategy",
              groupId: "action-plan",
              imageId: "strategy_action_plan_model"
            }
          ]
        },
        {
          text: "Estimates and budget.",
          correct: true,
          why: "Correct: planned change requires resource and cost estimates.",
          whyExtended: [
            "The lecture lists 'estimates/budgets' as a separate element of the action plan.",
            "The estimates make it possible to prioritize between initiatives and assess whether the organization has enough capacity.",
            "This links strategy to CIO toolbox tools such as business case, alternative analysis and project planning."
          ],
          whyExtendedImageRefs: [
            {
              moduleId: "strategy",
              groupId: "action-plan",
              imageId: "strategy_action_plan_model"
            }
          ]
        },
        {
          text: "A guarantee that every detail is locked before implementation starts.",
          correct: false,
          why: "Wrong: the lecture says the level of detail may vary, but the basic requirements for a working plan remain.",
          whyExtended: [
            "The lecture emphasizes that modern organizations debate how detailed planning should be.",
            "Activities can be detailed in advance or only outlined, depending on context and uncertainty.",
            "The point is not to lock every detail, but to have enough structure to act, prioritize and follow up."
          ]
        }
      ]
    },
    {
      id: 202,
      type: "fill",
      title: "Roadmap",
      points: 1,
      prompt: "In an action plan, the expected ordering and timeframe for the activities is often called a ________.",
      answers: [
        "roadmap"
      ],
      answerKey: "roadmap",
      source: "Source: Lecture 4, action plan: expected ordering and timeframe for executing the activities aka roadmap.",
      whyCorrect: "Correct: a roadmap describes the ordering and timeframe for implementation.",
      whyWrong: "Wrong if the answer describes a calculation method or a governance archetype. The question asks for the time and ordering dimension of the plan.",
      whyExtendedImageRefs: [
        { moduleId: "strategy", groupId: "action-plan", imageId: "strategy_action_plan_model" }
      ]
    },
    {
      id: 203,
      type: "single",
      title: "Strategic context and stakeholders",
      points: 1,
      prompt: "Which statement best matches the lecture's description of private, private non-profit and public organizations?",
      source: "Source: Lecture 2, slides 'Different organizations'.",
      options: [
        {
          text: "All organization types have stakeholders who set goals, while the administration/top management is responsible for day-to-day work to achieve those goals.",
          correct: true,
          why: "Correct: the lecture shows that owners, members or citizens/politicians set goals, while the administration works to achieve them.",
          whyExtended: [
            "Private commercial organizations typically have owners and a board that set goals.",
            "Private non-profit organizations may have members and a board, while public organizations have citizens, politicians and often a board.",
            "The point in the strategy lecture is that management is about increasing the likelihood that these goals are actually achieved."
          ]
        },
        {
          text: "Only private companies have strategic goals.",
          correct: false,
          why: "Wrong: the lecture emphasizes that all organization types have goals.",
          whyExtended: [
            "Non-profit and public organizations also have goals, but those goals come from different stakeholders.",
            "For public organizations, goals are often politically defined and linked to citizens.",
            "Strategy is therefore not only a commercial phenomenon, but a management task in all organization types."
          ]
        },
        {
          text: "Public organizations do not need administration because politicians handle the day-to-day work.",
          correct: false,
          why: "Wrong: politicians set goals, but the administration is responsible for daily work.",
          whyExtended: [
            "The lecture distinguishes between goal-setting by stakeholders and the administration's daily responsibility.",
            "In the public sector, politicians represent citizens' goals, but the administration executes and follows up.",
            "Mixing these roles makes it difficult to understand governance, delegation and responsibility."
          ]
        },
        {
          text: "Strategy is primarily about the IT department alone defining the organization's goals.",
          correct: false,
          why: "Wrong: IT can be strategically important, but organizational goals come from the broader strategic context.",
          whyExtended: [
            "The CIO and the IT function must relate to the organization's purpose, strategy and stakeholders.",
            "The IT portfolio should support strategic goals, not replace them.",
            "This is why the course first establishes strategy and governing documents as the management context before introducing the CIO toolbox."
          ]
        }
      ],
      whyExtendedImageRefs: [
        { moduleId: "strategy", groupId: "action-plan", imageId: "strategy_action_plan_model" }
      ]
    },
    {
      id: 204,
      type: "multi",
      title: "Generic decision-making process",
      points: 1,
      moduleId: "cio-tool-box",
      groupId: "decision-making",
      prompt: "Mark the steps that belong to the generic decision-making process in alternative analysis.",
      source: "Source: Lecture 3 / IN5431 summary, Generic decision-making process.",
      options: [
        {
          text: "Understand the situation: understand causes, competence, technology and cultural factors.",
          correct: true,
          why: "Correct: the first step is to understand the situation and the underlying 'why'.",
          whyExtended: [
            "Alternative analysis starts with root-cause analysis and understanding the situation.",
            "This can include internal competencies, technical assets and cultural factors.",
            "Without this, one risks solving the wrong problem or comparing irrelevant alternatives."
          ],
          whyExtendedImageRefs: [
            {
              moduleId: "cio-tool-box",
              groupId: "decision-making",
              imageId: "generic_decision_making_process"
            }
          ]
        },
        {
          text: "Synthesize options: develop possible concepts or alternative courses of action.",
          correct: true,
          why: "Correct: the second step is to synthesize alternatives.",
          whyExtended: [
            "The lecture describes a concept as an internally consistent set of work or initiatives.",
            "The point is to identify relevant alternatives, not only evaluate the first solution someone suggests.",
            "This is especially important in vendor selection, product choice and larger organizational changes."
          ],
          whyExtendedImageRefs: [
            {
              moduleId: "cio-tool-box",
              groupId: "decision-making",
              imageId: "generic_decision_making_process"
            }
          ]
        },
        {
          text: "Evaluate and propose: assess pros/cons and provide a recommendation.",
          correct: true,
          why: "Correct: the third step is evaluation and recommendation.",
          whyExtended: [
            "The evaluation can use business case, plus/minus method, cost ranking or real options.",
            "The level of detail depends on impact, experience, uncertainty and trust between decision-makers.",
            "The goal is not just analysis, but to provide a basis for decision-making."
          ],
          whyExtendedImageRefs: [
            {
              moduleId: "cio-tool-box",
              groupId: "decision-making",
              imageId: "generic_decision_making_process"
            }
          ]
        },
        {
          text: "Implement every alternative in parallel to avoid trade-offs.",
          correct: false,
          why: "Wrong: alternative analysis is about choosing and prioritizing, not doing everything at once.",
          whyExtended: [
            "Resources are limited, and management is precisely about prioritization.",
            "Implementing all alternatives may split resources and reduce progress.",
            "This also conflicts with the course's understanding of strategy, where trade-offs and choices are central."
          ]
        }
      ]
    },
    {
      id: 205,
      type: "single",
      title: "The plus/minus method",
      points: 1,
      prompt: "What is the plus/minus method used for in the lecture on business case and alternative analysis?",
      source: "Source: Lecture 4, slide 'From last week: The plus/minus-method'.",
      options: [
        {
          text: "To compare alternatives qualitatively and in a structured way when benefits, risks and other effects are not easily quantified as NPV.",
          correct: true,
          why: "Correct: the plus/minus method provides a structured, but not purely financial, assessment of alternatives.",
          whyExtended: [
            "The example compares concepts on costs, benefits, risk, real options and overall assessment.",
            "The method is useful when several effects matter, but cannot be calculated precisely in monetary terms.",
            "It can be used as part of alternative analysis, together with or instead of a financial business case."
          ]
        },
        {
          text: "To calculate discounted cash flow with an exact risk premium.",
          correct: false,
          why: "Wrong: this describes NPV, not the plus/minus method.",
          whyExtended: [
            "NPV uses cash flows, discount rate and investments.",
            "The plus/minus method is more qualitative and often ranks benefits with plus/minus marks.",
            "The method fits when effects are difficult to quantify exactly."
          ]
        },
        {
          text: "To determine the governance archetype for each IT decision domain.",
          correct: false,
          why: "Wrong: this belongs to the IT governance matrix, not the plus/minus method.",
          whyExtended: [
            "The governance matrix combines decision domains and archetypes.",
            "The plus/minus method is used to evaluate alternative concepts or initiatives.",
            "The two tools answer different questions: what should we choose, versus who should decide."
          ]
        },
        {
          text: "To draw process flows with swimlanes.",
          correct: false,
          why: "Wrong: this is process modeling/BPMN.",
          whyExtended: [
            "Swimlanes are used to show roles or organizational units in a process model.",
            "The plus/minus method is an evaluation method for alternatives.",
            "BPMN belongs under the IT Architecture tool in the CIO toolbox, not under alternative analysis as an evaluation method."
          ]
        }
      ],
      whyExtendedImageRefs: [
        { moduleId: "cio-tool-box", groupId: "decision-making", imageId: "generic_decision_making_process" }
      ]
    },
    {
      id: 206,
      type: "multi",
      title: "Real options in alternative analysis",
      points: 1,
      prompt: "Mark the statements that fit with 'real options' as used in alternative analysis.",
      source: "Source: Lecture 4, plus/minus method and alternative analysis.",
      options: [
        {
          text: "Real options can provide value because a choice keeps future courses of action open under uncertainty.",
          correct: true,
          why: "Correct: the value lies in flexibility when the future is uncertain.",
          whyExtended: [
            "In the lecture's plus/minus example, real options are assessed separately from cost, benefit and risk.",
            "An alternative can be attractive even if short-term benefits are moderate, if it opens important future possibilities.",
            "This is especially relevant in digital initiatives where technology, user behavior and markets may change quickly."
          ]
        },
        {
          text: "Real options are relevant when one cannot know for certain what will become valuable later.",
          correct: true,
          why: "Correct: uncertainty is exactly why option value can matter.",
          whyExtended: [
            "When decisions are made under high uncertainty, flexibility can be a form of value in itself.",
            "This differs from a traditional NPV logic where one tries to estimate one expected future.",
            "Real options make decision-makers aware of future paths and learning opportunities."
          ]
        },
        {
          text: "Real options mean that one should always choose the alternative with the lowest investment cost.",
          correct: false,
          why: "Wrong: low cost can be good, but real options are about future flexibility.",
          whyExtended: [
            "A low-cost alternative may lock the organization into a poor architecture or vendor.",
            "A more expensive alternative can sometimes be better if it enables later scaling, reuse or innovation.",
            "Therefore, real options are assessed as their own dimension, not as a synonym for low cost."
          ]
        },
        {
          text: "Real options can be assessed together with cost ranking, the plus/minus method and business case.",
          correct: true,
          why: "Correct: the lecture places real options as one of several evaluation methods.",
          whyExtended: [
            "Alternative analysis can use several methods in the evaluation step.",
            "NPV provides financial comparison, while real options can reveal strategic flexibility.",
            "This gives a broader decision basis than net present value alone."
          ]
        }
      ],
      whyExtendedImageRefs: [
        { moduleId: "cio-tool-box", groupId: "decision-making", imageId: "generic_decision_making_process" }
      ]
    },
    {
      id: 207,
      type: "fill",
      title: "PRINCE2",
      points: 1,
      prompt: "The PRINCE2 principle 'continued business ________' means that the project must have an ongoing business rationale.",
      answers: [
        "justification",
        "business justification"
      ],
      answerKey: "justification / business justification",
      source: "Source: IN5431 summary, PRINCE2 principles.",
      whyCorrect: "Correct: 'continued business justification' is one of the PRINCE2 principles.",
      whyWrong: "Wrong if the answer points to a ceremony or governance archetype. The question asks for the PRINCE2 principle about ongoing justification.",
      whyExtendedImageRefs: [
        { moduleId: "cio-tool-box", groupId: "prince2", imageId: "prince2_framework_model" }
      ]
    },
    {
      id: 208,
      type: "multi",
      title: "PRINCE2 principles",
      points: 1,
      moduleId: "cio-tool-box",
      groupId: "prince2",
      prompt: "Mark the PRINCE2 principles that are part of the course summary.",
      source: "Source: IN5431 summary, PRINCE2 Principles.",
      options: [
        {
          text: "Learn from experience.",
          correct: true,
          why: "Correct: PRINCE2 says that the project should continuously seek and draw lessons.",
          whyExtended: [
            "This means that experiences from previous and ongoing work should be actively used.",
            "The principle makes project governance more learning-oriented and less mechanical.",
            "It fits with the course's point that frameworks are aids, not goals in themselves."
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
          text: "Defined roles and responsibilities.",
          correct: true,
          why: "Correct: clear distribution of roles and responsibilities is a central PRINCE2 principle.",
          whyExtended: [
            "The project organization must know who is responsible for what.",
            "This supports accountability and reduces ambiguity in coordination.",
            "The principle connects to the project as a temporary organization."
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
          text: "Manage by stages.",
          correct: true,
          why: "Correct: PRINCE2 is based on planning, monitoring and controlling stage by stage.",
          whyExtended: [
            "Managing by stages creates control points where the project can be reassessed.",
            "This fits uncertainty in projects: one should not necessarily lock the entire project in detail from the start.",
            "Stage-based governance makes it possible to adjust plans based on experience."
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
          text: "Tailor to suit the project environment.",
          correct: true,
          why: "Correct: PRINCE2 should be adapted to context, size, complexity, importance, capability and risk.",
          whyExtended: [
            "This matters because the course emphasizes that frameworks are context-dependent.",
            "A heavy framework used uncritically can become bureaucratic and inappropriate.",
            "Tailoring makes the framework more relevant to the actual project environment."
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
          text: "Maximize scope, time and cost simultaneously.",
          correct: false,
          why: "Wrong: this is not a PRINCE2 principle, and it conflicts with the trade-off logic of project management.",
          whyExtended: [
            "Project management must handle constraints and priorities, not maximize everything.",
            "The lecture on the triple constraint shows that scope, time and cost must be understood as mutually dependent dimensions.",
            "Maximizing all of them at the same time is not realistic management."
          ]
        }
      ]
    },
    {
      id: 209,
      type: "single",
      title: "PRINCE2 themes",
      points: 1,
      moduleId: "cio-tool-box",
      groupId: "prince2",
      prompt: "Which PRINCE2 theme is linked to establishing a risk management approach and a risk register?",
      source: "Source: IN5431 summary, PRINCE2 Themes.",
      options: [
        {
          text: "Risk",
          correct: true,
          why: "Correct: the risk theme concerns how risks are identified, documented and managed.",
          whyExtended: [
            "The course summary says that a risk management approach and a risk register should be created.",
            "This fits projects' uncertainty around expectations, funding and implementation.",
            "Risk is not just a cost item, but a management task throughout the project."
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
          text: "Quality",
          correct: false,
          why: "Wrong: the quality theme concerns quality requirements, not the risk register.",
          whyExtended: [
            "Quality is a separate PRINCE2 theme.",
            "It is relevant to what the project should deliver and what requirements the delivery must meet.",
            "The risk register, however, belongs to the risk theme."
          ]
        },
        {
          text: "Organization",
          correct: false,
          why: "Wrong: the organization theme is more about roles and responsibilities.",
          whyExtended: [
            "Organization is important for the project's structure and accountability.",
            "It does not directly explain the risk management approach or risk register.",
            "The question explicitly points to risk management."
          ]
        },
        {
          text: "Progress",
          correct: false,
          why: "Wrong: progress concerns monitoring and control of progress, not primarily the risk register.",
          whyExtended: [
            "Progress is important for monitoring whether the project is going according to plan.",
            "Risk can affect progress, but the risk register belongs to the risk theme.",
            "PRINCE2 separates these themes to clarify different management tasks."
          ]
        }
      ]
    },
    {
      id: 210,
      type: "multi",
      title: "IT architecture perspectives",
      points: 1,
      prompt: "Mark the statements that match the architecture perspectives in the lecture.",
      source: "Source: Lecture 5, slides on different views on architecture and architects, Fowler and Open Agile Architecture.",
      options: [
        {
          text: "TOGAF represents a more formal and often centralized perspective on architecture work.",
          correct: true,
          why: "Correct: the lecture contrasts TOGAF with Fowler on precisely this point.",
          whyExtended: [
            "TOGAF provides a structured framework for enterprise architecture.",
            "The formal perspective can be useful when the organization needs governance, standardization and a common method.",
            "But it is not the only architecture view in the course."
          ]
        },
        {
          text: "Martin Fowler represents a more meritocratic and decentralized perspective.",
          correct: true,
          why: "Correct: the lecture describes Fowler as more meritocratic and decentralized.",
          whyExtended: [
            "The Fowler perspective fits well with agile development environments.",
            "The architect is not necessarily a controlling decision-maker, but a collaborative role that pays attention to important problems.",
            "This contrasts with the caricature of the architect who makes all important decisions alone."
          ]
        },
        {
          text: "Open Agile Architecture emphasizes modularity, standardization and built-in responsiveness to change.",
          correct: true,
          why: "Correct: these three points are explicitly listed in the lecture.",
          whyExtended: [
            "Modularity can support team autonomy and make the organization more robust.",
            "Standardization can make product or operating model reconfiguration easier.",
            "Responsiveness to change makes the architecture better suited for change."
          ]
        },
        {
          text: "All architecture perspectives say that one person should always make all important technical decisions alone.",
          correct: false,
          why: "Wrong: this is a caricature of Architectus Reloadus, not the full curriculum perspective.",
          whyExtended: [
            "Fowler also describes Architectus Oryzus, who works more collaboratively.",
            "The lecture presents several perspectives to emphasize that architecture work is context-dependent.",
            "The course generally warns against using frameworks as goals in themselves."
          ]
        }
      ],
      whyExtendedImageRefs: [
        { moduleId: "cio-tool-box", groupId: "enterprise-architecture", imageId: "togaf_arkitekturtaksonomi" },
        { moduleId: "cio-tool-box", groupId: "enterprise-architecture", imageId: "togaf_levels_model" }
      ]
    },
    {
      id: 211,
      type: "single",
      title: "Fowler: architecture as important stuff",
      points: 1,
      prompt: "What does Fowler's perspective 'architecture is about the important stuff' mean?",
      source: "Source: Lecture 5, slide 'Different definitions' on Fowler and Johnson.",
      options: [
        {
          text: "What counts as architecture depends on what developers and the context consider important, not on one universal list of components.",
          correct: true,
          why: "Correct: Fowler uses 'important stuff' to show that architecture is context-dependent.",
          whyExtended: [
            "The lecture uses the Oracle example: in one application, database/persistence may be architecture, while in another, image analysis is the important part.",
            "Architecture is therefore not just a fixed technical checklist.",
            "This perspective fits pragmatic and collaborative architecture work."
          ]
        },
        {
          text: "Architecture is always the same as the database choice.",
          correct: false,
          why: "Wrong: the Fowler example shows precisely that database choice is not always architecture.",
          whyExtended: [
            "For enterprise applications, persistence may be very important.",
            "For medical image analysis, the complexity may lie somewhere completely different.",
            "Architecture therefore depends on what is important in that specific context."
          ]
        },
        {
          text: "Architecture is only physical hardware and networks.",
          correct: false,
          why: "Wrong: the lecture describes architecture more broadly than physical infrastructure.",
          whyExtended: [
            "The TOGAF taxonomy includes business, data, application and technology architecture.",
            "The Fowler perspective concerns important design decisions and technical/organizational matters.",
            "Physical infrastructure can be important, but it is not the whole architecture."
          ]
        },
        {
          text: "Architecture is the same as PRINCE2.",
          correct: false,
          why: "Wrong: PRINCE2 is project governance and management, not an architecture perspective.",
          whyExtended: [
            "PRINCE2 belongs under the Projects tool in the CIO toolbox.",
            "Architecture belongs under the IT Architecture tool, which analyzes and structures the IT portfolio.",
            "The two tools can support each other, but they are not the same thing."
          ]
        }
      ],
      whyExtendedImageRefs: [
        { moduleId: "cio-tool-box", groupId: "enterprise-architecture", imageId: "togaf_levels_model" }
      ]
    },
    {
      id: 212,
      type: "multi",
      title: "BPMN and process modeling",
      points: 1,
      prompt: "Mark the elements that fit with BPMN/process modeling as used in the lecture.",
      source: "Source: Lecture 5, business process modeling and the Umbrella Heaven example.",
      options: [
        {
          text: "Swimlanes can show roles or organizational units in the process.",
          correct: true,
          why: "Correct: BPMN examples use lanes for actors such as customer, system, warehouse and payment provider.",
          whyExtended: [
            "Swimlanes make it clear who performs which activities.",
            "This helps analyze responsibility, dependencies and coordination.",
            "Process modeling can thereby reveal how organizational structure and IT systems are connected."
          ]
        },
        {
          text: "Activities and sequence flow show what happens and in which order.",
          correct: true,
          why: "Correct: process models describe logical order and dependency between activities.",
          whyExtended: [
            "This connects to the definition of a business process.",
            "Sequence flow makes dependencies and ordering visible.",
            "It provides a basis for analysis, improvement and system support."
          ]
        },
        {
          text: "Start and end events can mark the beginning and end of the process.",
          correct: true,
          why: "Correct: these are basic elements in process models.",
          whyExtended: [
            "The lecture shows start event, end event, activities and sequence flow in the exercise slides.",
            "Such elements provide a shared notation for discussing processes.",
            "They make the process readable for both business and IT people."
          ]
        },
        {
          text: "The NPV formula is a standard BPMN symbol.",
          correct: false,
          why: "Wrong: NPV is business case/financial analysis, not process modeling.",
          whyExtended: [
            "NPV belongs to the business case tool.",
            "BPMN concerns process flow, roles and dependencies.",
            "Mixing these makes it unclear which CIO toolbox tool is used for what."
          ]
        }
      ],
      whyExtendedImageRefs: [
        { moduleId: "cio-tool-box", groupId: "business-process-modeling", imageId: "umbrella_heaven_ordering_process" }
      ]
    },
    {
      id: 213,
      type: "multi",
      title: "Digitalization at macro, meso and micro level",
      points: 1,
      prompt: "Mark the correct links between level and effect of digitalization in the Danilova lecture.",
      source: "Source: Lecture 14, slide 'The impact of digital technology and digitalization on organizations'.",
      options: [
        {
          text: "Macro level: digitalization changes business models and the organization's position in an ecosystem.",
          correct: true,
          why: "Correct: this is the definition of the macro level in the slide.",
          whyExtended: [
            "The macro level concerns strategy, business models and ecosystems.",
            "Here one analyzes how digitalization can change the market and the organization's role.",
            "This is more than internal efficiency improvement."
          ]
        },
        {
          text: "Meso level: digitalization changes business processes, organization and reporting lines.",
          correct: true,
          why: "Correct: this is the meso level in the slide.",
          whyExtended: [
            "The meso level concerns the organization's internal structure and processes.",
            "It includes leadership, governance, reporting, values and culture.",
            "This explains why digital transformation often requires organizational change, not just new technology."
          ]
        },
        {
          text: "Micro level: digitalization changes the character of tasks, communication, collaboration, decision processes and competence requirements.",
          correct: true,
          why: "Correct: this is the micro level in the slide.",
          whyExtended: [
            "The micro level concerns how work is actually performed by people.",
            "New technology can change both work content and competence needs.",
            "This is why digital transformation involves the whole organization."
          ]
        },
        {
          text: "Micro level: digitalization only affects global ecosystems, not everyday work.",
          correct: false,
          why: "Wrong: the micro level is precisely about everyday work and the character of tasks.",
          whyExtended: [
            "Global ecosystems belong more to the macro level.",
            "The micro level concerns tasks, communication, collaboration, decision processes and skills.",
            "Employees must therefore be involved and competence must be developed in the transformation."
          ]
        }
      ],
      whyExtendedImageRefs: [
        { moduleId: "strategy", groupId: "digital-strategy", imageId: "digital_strategy_model" }
      ]
    },
    {
      id: 214,
      type: "multi",
      title: "Why digital transformation is difficult",
      points: 1,
      prompt: "Mark the challenges that the lecture highlights as reasons why digital transformation is difficult to succeed with.",
      source: "Source: Lecture 14, slide 'What makes it hard to succeed?'.",
      options: [
        {
          text: "Lack of strategic anchoring and lack of a coherent digital strategy.",
          correct: true,
          why: "Correct: the lecture lists 'not strategically anchored' and lack of coherent digital strategy.",
          whyExtended: [
            "Without strategic anchoring, digitalization becomes fragmented.",
            "This can lead to isolated initiatives that do not build organizational capability.",
            "It also connects to the D4D risk of spreading resources across too many building blocks."
          ]
        },
        {
          text: "Unclear governance and management, including unclear roles and responsibilities.",
          correct: true,
          why: "Correct: the lecture lists lack of governance & management.",
          whyExtended: [
            "Unclear decision rights make it difficult to prioritize, coordinate and follow up.",
            "This connects digital transformation to IT governance and the accountability framework.",
            "Roles and responsibilities are crucial when digitalization cuts across organizational units."
          ]
        },
        {
          text: "Lack of collaboration across units and lack of competence.",
          correct: true,
          why: "Correct: both are mentioned as barriers in the lecture.",
          whyExtended: [
            "Digitalization often affects cross-functional business processes.",
            "Lack of collaboration creates silos and prevents coherent digital offerings.",
            "Lack of competence means the organization does not understand opportunities, prerequisites or consequences."
          ]
        },
        {
          text: "Cultural barriers and organizational inertia.",
          correct: true,
          why: "Correct: the lecture highlights culture and inertia as central barriers.",
          whyExtended: [
            "Digital transformation requires people to change how work is performed.",
            "A culture that resists experimentation or collaboration can prevent digital maturity.",
            "Organizational inertia describes the organization's tendency to continue on the same path."
          ]
        },
        {
          text: "That the organization has too much collaboration, too much learning and too much experimentation.",
          correct: false,
          why: "Wrong: the lecture presents collaboration, continuous learning and experimentation as desired features of digitalization culture.",
          whyExtended: [
            "The slide on culture for digitalization lists collaboration, continuous learning and experimentation.",
            "The problem is more often a lack of such qualities, not that they exist.",
            "This also connects to the ambidextrous organization: both exploitation and exploration must be handled."
          ]
        }
      ],
      whyExtendedImageRefs: [
        { moduleId: "strategy", groupId: "digital-strategy", imageId: "digital_strategy_model" },
        { moduleId: "designed-for-digital", groupId: "overview", imageId: "D4D-overview" }
      ]
    },
    {
      id: 215,
      type: "fill",
      title: "Organizational inertia",
      points: 1,
      prompt: "The organization's tendency to continue on the same path because sociotechnical systems are difficult to change as quickly as the environment is called organizational ________.",
      answers: [
        "inertia",
        "organizational inertia",
        "organisational inertia"
      ],
      answerKey: "inertia / organizational inertia",
      source: "Source: Lecture 14, slides 'Organizational Inertia'.",
      whyCorrect: "Correct: organizational inertia describes resistance/slowness that makes the organization continue on the same path.",
      whyWrong: "Wrong if the answer describes agility or innovation. The question asks about inertia in sociotechnical systems.",
      whyExtendedImageRefs: [
        { moduleId: "strategy", groupId: "digital-strategy", imageId: "digital_strategy_model" }
      ]
    },
    {
      id: 216,
      type: "single",
      title: "Culture for digitalization",
      points: 1,
      prompt: "Which option best matches the lecture's description of a culture for digitalization?",
      source: "Source: Lecture 14, slide 'A culture for digitalization'.",
      options: [
        {
          text: "Flexibility, collaboration, openness, agility, continuous learning, knowledge sharing, experimentation and room for failure.",
          correct: true,
          why: "Correct: these are the characteristics the lecture highlights.",
          whyExtended: [
            "Digital transformation requires the organization to learn and adapt.",
            "Experimentation and room for failure are important because digital initiatives are often uncertain.",
            "Collaboration and knowledge sharing are necessary because digitalization affects processes across functions."
          ]
        },
        {
          text: "Strict hierarchical control, little collaboration and zero tolerance for failure.",
          correct: false,
          why: "Wrong: this works against the digitalization culture described in the lecture.",
          whyExtended: [
            "Hierarchical culture can hinder use of collaboration platforms and data-driven decision-making.",
            "Zero tolerance for failure reduces experimentation and learning.",
            "The lecture emphasizes flexibility and openness, not rigid control."
          ]
        },
        {
          text: "That digitalization is left entirely to the IT department alone.",
          correct: false,
          why: "Wrong: the lecture emphasizes involvement of the whole organization.",
          whyExtended: [
            "Digitalization affects macro, meso and micro levels.",
            "It changes business models, processes, tasks and competence requirements.",
            "Leaders and employees across the organization must therefore be involved."
          ]
        },
        {
          text: "That experimentation is avoided and only initiatives with guaranteed benefits are implemented.",
          correct: false,
          why: "Wrong: experimentation is explicitly part of digitalization culture.",
          whyExtended: [
            "Digital initiatives often involve uncertainty about customer needs, technology and organization.",
            "Test-and-learn and MVP logic in D4D are based on learning through rapid experiments.",
            "Requiring guaranteed benefits before learning can stop innovation."
          ]
        }
      ],
      whyExtendedImageRefs: [
        { moduleId: "strategy", groupId: "digital-strategy", imageId: "digital_strategy_model" }
      ]
    },
    {
      id: 217,
      type: "single",
      title: "Digital offering and sweet spot",
      points: 1,
      prompt: "What does the 'sweet spot' describe in Shared Customer Insights?",
      source: "Source: IN5431 Concepts, Chapter 2 Building Shared Customer Insights.",
      options: [
        {
          text: "The point where customer desires overlap with what digital technology can deliver, and what the customer is willing to pay for.",
          correct: true,
          why: "Correct: the sweet spot is the overlap between customer desires and digital solutions.",
          whyExtended: [
            "Digital offerings are described as the intersection between what customers want and what the company can do with digital technology.",
            "A successful digital offering can solve a problem the customer did not necessarily know they had.",
            "Shared Customer Insights is about building organizational learning around this."
          ]
        },
        {
          text: "The cheapest technical solution regardless of customer needs.",
          correct: false,
          why: "Wrong: the sweet spot requires both customer need and digital solution capability.",
          whyExtended: [
            "The cheapest possible solution is not enough if the customer does not want it.",
            "The D4D logic emphasizes digital offerings that create new customer value.",
            "Technology must be connected to insight into willingness to pay and needs."
          ]
        },
        {
          text: "An internal efficiency target in the operational backbone.",
          correct: false,
          why: "Wrong: operational backbone concerns core processes, while the sweet spot belongs to Shared Customer Insights.",
          whyExtended: [
            "OB can provide stability and data that enable digital offerings.",
            "The sweet spot, however, concerns customer value and digital solutions.",
            "Both are D4D building blocks, but they answer different questions."
          ]
        },
        {
          text: "A PRINCE2 process for project closure.",
          correct: false,
          why: "Wrong: the sweet spot is not project management.",
          whyExtended: [
            "PRINCE2 has its own processes and principles for project governance.",
            "The sweet spot comes from D4D/Shared Customer Insights.",
            "It concerns digital value propositions, not project administration."
          ]
        }
      ],
      whyExtendedImageRefs: [
        { moduleId: "designed-for-digital", groupId: "shared-customer-insights", imageId: "SCI" }
      ]
    },
    {
      id: 218,
      type: "multi",
      title: "Experimentation in Shared Customer Insights",
      points: 1,
      moduleId: "designed-for-digital",
      groupId: "shared-customer-insights",
      prompt: "Mark practices that fit with building Shared Customer Insights.",
      source: "Source: IN5431 Concepts, Minimum Viable Product, Test-and-learn process, Discovery-driven planning, Customer co-creation and Cross-functional teams.",
      options: [
        {
          text: "MVP: an early version is released to customers or a test group for rapid feedback.",
          correct: true,
          why: "Correct: MVP is used to learn quickly whether the idea has value.",
          whyExtended: [
            "MVP reduces the risk of building a full solution no one wants.",
            "Digital offerings are software-based and therefore suitable for rapid testing.",
            "Feedback can be used to improve or reject the idea."
          ],
          whyExtendedImageRefs: [
            {
              moduleId: "designed-for-digital",
              groupId: "shared-customer-insights",
              imageId: "SCI"
            }
          ]
        },
        {
          text: "Test-and-learn: rapid experiments are used to validate ideas.",
          correct: true,
          why: "Correct: test-and-learn is an iterative method for learning from the market.",
          whyExtended: [
            "This fits the uncertainty about what customers will actually pay for.",
            "Rapid experiments support continuous learning.",
            "The method contrasts with spending a long time on a solution without validation."
          ],
          whyExtendedImageRefs: [
            {
              moduleId: "designed-for-digital",
              groupId: "shared-customer-insights",
              imageId: "SCI"
            }
          ]
        },
        {
          text: "Customer co-creation: the company works directly with customers early in the process.",
          correct: true,
          why: "Correct: customer collaboration can validate value propositions early.",
          whyExtended: [
            "Co-creation reduces the risk of building something that does not match actual needs.",
            "It supports Shared Customer Insights by turning customer insight into organizational learning.",
            "Cross-functional teams can combine IT, product, operations, market and risk."
          ],
          whyExtendedImageRefs: [
            {
              moduleId: "designed-for-digital",
              groupId: "shared-customer-insights",
              imageId: "SCI"
            }
          ]
        },
        {
          text: "Big-bang delivery: build the entire solution without customer contact to avoid uncertainty.",
          correct: false,
          why: "Wrong: this works against test-and-learn and customer insight.",
          whyExtended: [
            "Uncertainty does not disappear by ignoring the customer.",
            "D4D recommends experimentation precisely because digital innovation is uncertain.",
            "Waiting too long for feedback can lead to costly misinvestments."
          ]
        }
      ]
    },
    {
      id: 219,
      type: "multi",
      title: "Obstacles to Operational Backbone",
      points: 1,
      moduleId: "designed-for-digital",
      groupId: "operational-backbone",
      prompt: "Mark the conditions that the lecture connects to problems with an inefficient operational backbone.",
      source: "Source: Lectures 9 and 10, Operational Backbone and Digital Platform, slides on problems with inefficient operational backbone.",
      options: [
        {
          text: "Silos and functions that optimize locally but prevent integration across the organization.",
          correct: true,
          why: "Correct: silo thinking prevents horizontal optimization and integrated processes.",
          whyExtended: [
            "Operational backbone requires standardized and integrated processes/data.",
            "Silos can lead to the same information being registered multiple times.",
            "Digital business often requires seamless end-to-end processes across units."
          ],
          whyExtendedImageRefs: [
            {
              moduleId: "designed-for-digital",
              groupId: "operational-backbone",
              imageId: "OB"
            }
          ]
        },
        {
          text: "Entrenched organizational habits that must be unlearned.",
          correct: true,
          why: "Correct: the lecture says that building OB requires unlearning entrenched organizational habits.",
          whyExtended: [
            "Old routines, processes and practices can prevent standardization.",
            "This shows that OB is not only technical architecture, but also organizational change.",
            "Habits can be linked to functions, practices and fragmented architectures."
          ],
          whyExtendedImageRefs: [
            {
              moduleId: "designed-for-digital",
              groupId: "operational-backbone",
              imageId: "OB"
            }
          ]
        },
        {
          text: "Fragmented architectures.",
          correct: true,
          why: "Correct: fragmented architectures are mentioned as a problem for OB.",
          whyExtended: [
            "Fragmentation makes integration and data quality more difficult.",
            "It can lead to multiple logins, poorly updated systems and duplicate registration.",
            "A working OB requires systems, processes and data to fit together."
          ],
          whyExtendedImageRefs: [
            {
              moduleId: "designed-for-digital",
              groupId: "operational-backbone",
              imageId: "OB"
            }
          ]
        },
        {
          text: "Too much stable master data and overly well-integrated processes.",
          correct: false,
          why: "Wrong: stable master data and integrated processes are precisely goals for OB.",
          whyExtended: [
            "OB should provide reliable and accessible master data.",
            "It should support seamless end-to-end transaction processing.",
            "The problem is typically lack of integration and standardization, not that it is too good."
          ]
        }
      ]
    },
    {
      id: 220,
      type: "single",
      title: "Componentization vs monolithic systems",
      points: 1,
      moduleId: "designed-for-digital",
      groupId: "digital-platform",
      prompt: "Why is componentization important in the D4D/digital platform logic?",
      source: "Source: IN5431 Concepts, Chapter 4 Digital Platform: componentization and monolithic systems.",
      options: [
        {
          text: "It breaks digital offerings and business functionality into smaller, reusable components that provide speed and agility.",
          correct: true,
          why: "Correct: componentization enables reuse and faster configuration of digital offerings.",
          whyExtended: [
            "Digital Platform is a repository of business, data and infrastructure components.",
            "Reusable components can be used in several digital offerings.",
            "This is the opposite of monolithic systems built for one specific product and often lacking reusable APIs."
          ],
          whyExtendedImageRefs: [
            {
              moduleId: "designed-for-digital",
              groupId: "digital-platform",
              imageId: "DP"
            }
          ]
        },
        {
          text: "It means that all systems should be built as one large monolithic system to avoid integration.",
          correct: false,
          why: "Wrong: monolithic systems are described as the opposite of a digital platform.",
          whyExtended: [
            "Monolithic systems can lead to redundancy and slow development.",
            "D4D emphasizes modular, reusable components.",
            "The goal is not to avoid all integration, but to structure integration in a manageable way."
          ]
        },
        {
          text: "It is a method for determining governance archetypes.",
          correct: false,
          why: "Wrong: governance archetypes belong to IT governance, not componentization.",
          whyExtended: [
            "Componentization concerns the digital platform and architecture for digital offerings.",
            "Governance archetypes concern who makes IT decisions.",
            "The two can be connected through an accountability framework, but they are not the same concept."
          ]
        },
        {
          text: "It means that digital offerings never need data or infrastructure.",
          correct: false,
          why: "Wrong: digital offerings are built precisely on data, business and infrastructure components.",
          whyExtended: [
            "Digital Platform includes data components, business components and infrastructure components.",
            "Componentization makes such parts reusable.",
            "Removing data and infrastructure would undermine the platform logic."
          ]
        }
      ]
    },
    {
      id: 221,
      type: "multi",
      title: "External Developer Platform in practice",
      points: 1,
      moduleId: "designed-for-digital",
      groupId: "external-developer-platform",
      prompt: "Mark the statements that fit with External Developer Platform.",
      source: "Source: Lecture 12, External Development Platform, slides 'External Developer Platform' and 'External developer platform'.",
      options: [
        {
          text: "ExDP opens digital components to external partners.",
          correct: true,
          why: "Correct: the definition is a repository of digital components open to external parties.",
          whyExtended: [
            "External partners can use components to extend the portfolio of digital offerings.",
            "This creates ecosystem logic rather than only an internal value chain.",
            "ExDP builds on internal components being well designed and managed."
          ],
          whyExtendedImageRefs: [
            {
              moduleId: "designed-for-digital",
              groupId: "external-developer-platform",
              imageId: "ExDP"
            }
          ]
        },
        {
          text: "ExDP typically requires APIs or similar boundary resources that provide structured access.",
          correct: true,
          why: "Correct: the lecture mentions APIs or similar mechanisms as structured access to core components.",
          whyExtended: [
            "Boundary resources make it possible to control how external actors get access.",
            "This gives a balance between openness and control.",
            "Without such interfaces, external use becomes unstructured and risky."
          ],
          whyExtendedImageRefs: [
            {
              moduleId: "designed-for-digital",
              groupId: "external-developer-platform",
              imageId: "ExDP"
            }
          ]
        },
        {
          text: "ExDP can either allow partners to use internally developed components, or create an industry platform/market for related digital offerings.",
          correct: true,
          why: "Correct: the lecture distinguishes between these two types.",
          whyExtended: [
            "Google Maps is used as an example where partners can use a component in their own offerings.",
            "Apple is used as an example of an industry/ecosystem platform.",
            "Both variants increase the potential for external innovation."
          ],
          whyExtendedImageRefs: [
            {
              moduleId: "designed-for-digital",
              groupId: "external-developer-platform",
              imageId: "ExDP"
            }
          ]
        },
        {
          text: "ExDP means that all internal data is opened freely without governance, ownership or security.",
          correct: false,
          why: "Wrong: ExDP requires structured access and a well-managed internal platform.",
          whyExtended: [
            "The lecture says ExDP requires a very well designed and managed internal platform.",
            "Opening everything without governance would create security, privacy and quality problems.",
            "ExDP also presupposes accountability and control over components."
          ]
        }
      ]
    },
    {
      id: 222,
      type: "multi",
      title: "Sustainability: three dimensions and goal conflicts",
      points: 1,
      prompt: "Mark the correct statements about sustainability as treated in the lecture.",
      source: "Source: Lecture 15, slides 'Three dimensions of sustainability' and 'Framework to categorize interactions between goals'.",
      options: [
        {
          text: "Sustainability is described through economic, social and environmental dimensions.",
          correct: true,
          why: "Correct: the lecture lists these three dimensions.",
          whyExtended: [
            "This also corresponds to the triple bottom line logic: profit, people and planet.",
            "Digital technology can affect all three dimensions, both positively and negatively.",
            "Sustainability is therefore more than just climate or environment."
          ]
        },
        {
          text: "Triple bottom line can be described as profit, people and planet.",
          correct: true,
          why: "Correct: this is mentioned as a parallel understanding of sustainability.",
          whyExtended: [
            "Profit refers to economic sustainability.",
            "People refers to social sustainability.",
            "Planet refers to environmental sustainability."
          ]
        },
        {
          text: "Goals can have both positive and negative interactions with one another.",
          correct: true,
          why: "Correct: the lecture shows the Nilsson et al. framework for goal interactions.",
          whyExtended: [
            "Some initiatives can reinforce other goals.",
            "Other initiatives can constrain or counteract other sustainability goals.",
            "This makes sustainability management a question of trade-offs, not just moral intentions."
          ]
        },
        {
          text: "All sustainability goals can be treated in isolation without trade-offs or interaction.",
          correct: false,
          why: "Wrong: the lecture shows precisely that goals can affect one another.",
          whyExtended: [
            "Goal interactions can be both positive and negative.",
            "Digitalization can, for example, improve efficiency but also increase energy or material use.",
            "Management must therefore understand interactions and consequences across dimensions."
          ]
        }
      ],
      whyExtendedImageRefs: [
        { moduleId: "sustainability", groupId: "three-dimensions", imageId: "sustainability_three_dimensions" }
      ]
    },
    {
      id: 223,
      type: "single",
      title: "Strategic drivers in IT governance",
      points: 1,
      prompt: "What is meant by strategic drivers in connection with choosing an IT governance model?",
      source: "Source: IN5431 Concepts, Strategic Drivers.",
      options: [
        {
          text: "Overall goals such as profit, resource utilization or growth should influence how centralized or decentralized IT governance is.",
          correct: true,
          why: "Correct: strategic drivers connect the organization's goals to the choice of governance model.",
          whyExtended: [
            "Centralization can promote cost efficiency and standardization.",
            "Decentralization can promote innovation and local fit.",
            "The choice of governance is therefore not only a technical question, but should follow strategic context."
          ]
        },
        {
          text: "Strategic drivers mean that all IT decisions should always be made by individual users.",
          correct: false,
          why: "Wrong: this describes anarchy, not strategic drivers.",
          whyExtended: [
            "Anarchy is the most decentralized archetype.",
            "Strategic drivers concern what should guide the choice between centralization and decentralization.",
            "The right governance model depends on the organization's goals and situation."
          ]
        },
        {
          text: "Strategic drivers are a BPMN notation for start events.",
          correct: false,
          why: "Wrong: this has nothing to do with BPMN symbols.",
          whyExtended: [
            "BPMN is used for process modeling.",
            "Strategic drivers belong to IT governance and strategic management.",
            "The concept concerns goals that should guide the organization of decision rights."
          ]
        },
        {
          text: "Strategic drivers are the same as risk premium in NPV.",
          correct: false,
          why: "Wrong: risk premium is part of financial business case, not strategic drivers.",
          whyExtended: [
            "NPV uses risk premium in the discount rate.",
            "Strategic drivers concern overarching organizational goals.",
            "Both can influence decisions, but at different levels."
          ]
        }
      ],
      whyExtendedImageRefs: [
        { moduleId: "cio-tool-box", groupId: "it-governance", imageId: "performance_based_IT-governance_model" }
      ]
    },
    {
      id: 224,
      type: "multi",
      title: "Management frameworks: context and value",
      points: 1,
      prompt: "Mark the statements that fit with the lecture's view of management frameworks.",
      source: "Source: Lecture 6 and IN5431 summary, frameworks and best practice.",
      options: [
        {
          text: "Frameworks can reduce uncertainty and support coordinated work.",
          correct: true,
          why: "Correct: the course summary describes frameworks as useful because they can reduce uncertainty.",
          whyExtended: [
            "Frameworks describe roles, processes and practices for coordinated activities.",
            "They can also support strategy implementation and intra-company connect.",
            "This explains why frameworks are used even though they are not exact science."
          ]
        },
        {
          text: "Frameworks are context-dependent and sometimes disputed.",
          correct: true,
          why: "Correct: the lecture concludes with a caveat that usefulness is context-sensitive and disputed.",
          whyExtended: [
            "There is no one best framework for all situations.",
            "People, environment and strategy affect whether a framework works.",
            "This is a recurring point in the CIO toolbox: tools are not goals in themselves."
          ]
        },
        {
          text: "Frameworks can support managers' legitimacy by showing that they handle uncertainty in a structured way.",
          correct: true,
          why: "Correct: the summary mentions that frameworks can support managers' reputation.",
          whyExtended: [
            "Frameworks provide a language and structure for handling complex situations.",
            "They can make decisions more transparent to the organization.",
            "But this does not mean the framework automatically gives the right answer."
          ]
        },
        {
          text: "A framework should always be followed mechanically regardless of organization, people and strategy.",
          correct: false,
          why: "Wrong: the course emphasizes that frameworks must be adapted to context.",
          whyExtended: [
            "PRINCE2 even has the principle 'tailor to suit the project environment'.",
            "The CIO toolbox model says that tools are meaningful only if they serve their purpose.",
            "Blind compliance can create bureaucracy and worse decisions."
          ]
        }
      ],
      whyExtendedImageRefs: [
        { moduleId: "cio-tool-box", groupId: "cynefin", imageId: "cynefin_theory_of_everything" }
      ]
    },
    {
      id: 225,
      type: "single",
      title: "Digital business strategy as trans-functional",
      points: 1,
      prompt: "Why should the whole organization be involved in digital transformation according to the Danilova lecture?",
      source: "Source: Lecture 14, slides 'Why do we need to involve and engage the whole organization?' and 'digital business strategy can be viewed as inherently trans-functional'.",
      options: [
        {
          text: "Because digitalization affects cross-functional business processes, competence, understanding of the need for change and synergies across the organization.",
          correct: true,
          why: "Correct: the lecture justifies involvement through cross-functional processes, holistic understanding, synergies, competence and understanding of change.",
          whyExtended: [
            "Digitalization affects not only IT systems, but also processes, reporting lines, work tasks and competence requirements.",
            "Digital business strategy is described as inherently trans-functional.",
            "Digital transformation must therefore be owned and understood across the organization, not isolated in one technical unit."
          ]
        },
        {
          text: "Because digital transformation is only about buying new technology.",
          correct: false,
          why: "Wrong: the lecture emphasizes both technical and organizational changes.",
          whyExtended: [
            "The leadership role involves handling both technical and organizational changes.",
            "Culture, competence, collaboration and processes are crucial.",
            "Technology purchases alone do not create digital transformation."
          ]
        },
        {
          text: "Because involving more units always makes decisions faster and easier.",
          correct: false,
          why: "Wrong: involvement can make decisions more demanding, but it is necessary for coherence and implementation.",
          whyExtended: [
            "Cross-functional involvement can increase the need for coordination.",
            "The point is that digitalization affects many parts of the organization.",
            "Without involvement, the risk of lacking collaboration, competence and change understanding increases."
          ]
        },
        {
          text: "Because IT governance is no longer relevant in digital organizations.",
          correct: false,
          why: "Wrong: governance and management remain central, and lack of these is a barrier.",
          whyExtended: [
            "The lecture mentions lack of governance & management as a challenge.",
            "D4D has Accountability Framework as a separate building block.",
            "Digital transformation makes governance more important, not irrelevant."
          ]
        }
      ],
      whyExtendedImageRefs: [
        { moduleId: "strategy", groupId: "digital-strategy", imageId: "digital_strategy_model" }
      ]
    }
  ]
};

// src/data/exams/mockExam5_en.js
export const mockExam5_en = {
  id: "mock-exam-5-en",
  subjectId: "in5431",
  baseId: "mock-exam-5",
  lang: "en",
  title: "Practice Exam 5: Frameworks Deep Dive",
  description: "PRINCE2, BPMN, Design Thinking & Double Diamond, TOGAF and Cynefin.",
  questions: [
    // ===== PRINCE2 (questions 1–7) =====
    {
      id: 1,
      type: "multi",
      title: "PRINCE2 principles",
      points: 1,
      moduleId: "cio-tool-box",
      groupId: "prince2",
      prompt: "Which of the following are among the seven PRINCE2 principles?",
      source: "Source: Lecture 4, CIO Toolbox 2, and course summary on PRINCE2.",
      options: [
        {
          text: "Continued business justification",
          correct: true,
          why: "Correct: principle 1 — a justifiable reason is required throughout the project's life.",
          whyExtended: [
            "PRINCE2 principle 1: 'Continued business justification — a justifiable reason required to run a project.'",
            "This means the business case must remain valid throughout the project — if justification disappears, the project should be stopped.",
            "This connects to the business case tool (tool 1) in the CIO toolbox: justification is not just an upfront exercise but an ongoing concern.",
            "PRINCE2 also has 'business case' as one of its seven themes, reinforcing the link between the principle and the theme."
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
          why: "Correct: principle 2 — continually seek and draw lessons.",
          whyExtended: [
            "PRINCE2 principle 2: 'Learn from experience — continually seek and draw lessons.'",
            "This requires the project to capture lessons learned and apply them from previous projects.",
            "Learning from experience connects to the broader agile/product team principle of pivots and learning.",
            "Without learning, organizations repeat mistakes across projects — this principle prevents that."
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
          why: "Wrong: this is not a PRINCE2 principle. Adding people can actually increase communication overhead.",
          whyExtended: [
            "The seven PRINCE2 principles are: continued business justification, learn from experience, defined roles and responsibilities, manage by stages, manage by exception, focus on products, tailor to suit the project environment.",
            "None of these relate to maximizing team size — that would contradict the principle of tailoring to the project environment.",
            "PRINCE2 principle 3 focuses on 'defined roles and responsibilities: clear organizational structure; accountability' — quality of roles, not quantity of people.",
            "Brooks's Law from software engineering suggests that adding people to a late project makes it later, due to communication overhead."
          ]
        },
        {
          text: "Manage by exception",
          correct: true,
          why: "Correct: principle 5 — give the right amount of authority to work effectively.",
          whyExtended: [
            "PRINCE2 principle 5: 'Manage by exception — give right amount of authority to work effectively.'",
            "This means delegating authority within defined tolerances, and escalating only when tolerances are exceeded.",
            "Manage by exception prevents micro-management while maintaining control — the project board only intervenes when needed.",
            "This principle supports efficiency: managers at each level handle issues within their authority, freeing senior management for exceptional situations."
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
          why: "Wrong: PRINCE2 uses documentation (business case, plans, risk registers) but tailors the level to the project.",
          whyExtended: [
            "PRINCE2 principle 7 is 'Tailor to suit the project environment' — this includes adjusting documentation level, not eliminating it.",
            "PRINCE2 themes like 'plans', 'risk' and 'business case' all involve documentation appropriate to the project's needs.",
            "The principle is about right-sizing documentation, not eliminating it — a small project needs less than a large one.",
            "Avoiding all documentation would undermine principles like 'continued business justification' and 'manage by stages', which require documented checkpoints."
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
      prompt: "Which of the following are among the seven PRINCE2 themes?",
      source: "Source: Course summary on PRINCE2 themes.",
      options: [
        {
          text: "Business case",
          correct: true,
          why: "Correct: the business case theme maintains the project's justification throughout its lifecycle.",
          whyExtended: [
            "The business case theme connects directly to principle 1 (continued business justification).",
            "It ensures that the project remains viable and worth investing in at every stage gate.",
            "The business case theme also links to tool 1 in the CIO toolbox — both deal with structured justification of investments.",
            "The seven themes are: business case, organization, quality, plans, risk, change, progress."
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
          why: "Correct: the risk theme ensures risks are identified, assessed and controlled.",
          whyExtended: [
            "The risk theme requires a risk management approach and risk register to be created during the 'initiating a project' process.",
            "Risk management is continuous throughout the project, not a one-time activity.",
            "The course summary notes: 'risk -> risk management approach and risk register should be created during process 3 (initiating a project).'",
            "Risk connects to the business case tool in the CIO toolbox, where risk is one of the four factors in utility maximisation."
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
          why: "Wrong: marketing is not a PRINCE2 theme.",
          whyExtended: [
            "The seven PRINCE2 themes are: business case, organization, quality, plans, risk, change, progress.",
            "Marketing is a business function, not a project management theme.",
            "PRINCE2 themes address concerns that must be managed throughout the project lifecycle.",
            "Marketing activities might be part of a project's deliverables, but marketing itself is not a governance theme."
          ]
        },
        {
          text: "Change",
          correct: true,
          why: "Correct: the change theme manages how changes to the project baseline are handled.",
          whyExtended: [
            "The change theme establishes how changes to the project scope, schedule or cost are assessed and approved.",
            "This is related to but different from organizational change management (Prosci/ADKAR), which is outside the CIO toolbox.",
            "In PRINCE2, change control prevents uncontrolled scope creep that could violate the triple constraint.",
            "The change theme works together with the risk theme — changes often introduce new risks."
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
          why: "Correct: the progress theme monitors and controls how the project is performing against its plans.",
          whyExtended: [
            "The progress theme establishes mechanisms for monitoring, comparing actual against planned, and reporting.",
            "It connects directly to principle 4 (manage by stages) — progress is assessed at each stage boundary.",
            "It also connects to principle 5 (manage by exception) — tolerances are set, and deviations trigger escalation.",
            "Progress tracking enables informed decision-making about whether to continue, adjust or stop the project."
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
      prompt: "Which PRINCE2 process is responsible for authorizing and directing the project at a high level throughout its lifecycle?",
      source: "Source: Course summary on PRINCE2 processes.",
      options: [
        {
          text: "Starting up a project",
          correct: false,
          why: "Wrong: starting up is the pre-project process that determines whether the project is viable enough to initiate.",
          whyExtended: [
            "Starting up a project is process 1 — it happens before the project formally begins.",
            "Its purpose is to ensure there is sufficient justification and information to decide whether to initiate the project.",
            "Starting up a project produces the project brief and stage plan for the initiation stage.",
            "It is a short, lightweight process — not the ongoing direction of the project."
          ]
        },
        {
          text: "Directing a project",
          correct: true,
          why: "Correct: directing a project is the process through which the project board oversees the project throughout its lifecycle.",
          whyExtended: [
            "Directing a project (process 2) runs from start to close and covers the project board's decision-making responsibilities.",
            "The project board authorizes initiation, authorizes each stage, gives ad hoc direction, and authorizes project closure.",
            "This process implements the 'manage by exception' principle — the board only intervenes when tolerances are exceeded.",
            "The seven processes are: starting up, directing, initiating, controlling a stage, managing product delivery, managing stage boundaries, closing."
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
          why: "Wrong: controlling a stage is the project manager's day-to-day management within a single stage.",
          whyExtended: [
            "Controlling a stage (process 4) deals with how the project manager manages work within the current stage.",
            "It covers assigning work, monitoring progress, dealing with issues and reporting to the project board.",
            "This is operational management within a stage, not the high-level direction of the entire project.",
            "The project manager controls stages; the project board directs the project."
          ]
        },
        {
          text: "Closing a project",
          correct: false,
          why: "Wrong: closing a project is a one-time process at the end, not ongoing direction.",
          whyExtended: [
            "Closing a project (process 7) is the final process that formally ends the project.",
            "It involves confirming deliverables, capturing lessons, and handing over products to operations.",
            "This process occurs once at the end, while directing a project spans the entire lifecycle.",
            "Closing connects to principle 2 (learn from experience) — lessons learned are captured for future projects."
          ]
        }
      ]
    },
    {
      id: 4,
      type: "fill",
      title: "PRINCE2 manage by stages",
      points: 1,
      prompt: "PRINCE2 principle 4 states that projects should be planned, monitored and controlled ________ by ________.",
      answers: ["stage by stage", "stage", "stages"],
      answerKey: "stage by stage",
      source: "Source: Course summary, PRINCE2 principle 4: 'manage by stages'.",
      whyCorrect: "Correct because manage by stages means the project is broken into manageable stages, each planned and authorized separately. This provides regular decision points for the project board.",
      whyWrong: "Wrong if the answer refers to 'sprint by sprint' (that is Scrum), 'year by year' (too coarse), or 'task by task' (too granular). PRINCE2 specifically uses stages as its unit of control."
    },
    {
      id: 5,
      type: "single",
      title: "PRINCE2 focus on products",
      points: 1,
      moduleId: "cio-tool-box",
      groupId: "prince2",
      prompt: "What does the PRINCE2 principle 'focus on products' mean?",
      source: "Source: Course summary, PRINCE2 principle 6.",
      options: [
        {
          text: "The project should focus on defining, delivering and meeting quality requirements for its products/deliverables",
          correct: true,
          why: "Correct: principle 6 emphasizes product definition, delivery and quality.",
          whyExtended: [
            "PRINCE2 principle 6: 'Focus on product — focus on the product definition, delivery and quality requirements.'",
            "This means the project is defined by what it produces (products), not by the activities performed.",
            "Product descriptions specify purpose, composition, quality criteria and quality methods — they drive the work.",
            "This principle ensures the project delivers tangible results, not just completed activities."
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
          text: "The project should only build physical products, not services or software",
          correct: false,
          why: "Wrong: 'products' in PRINCE2 refers to any deliverable — documents, software, services, etc.",
          whyExtended: [
            "In PRINCE2, 'product' is used broadly to mean any output or deliverable of the project.",
            "Products can be tangible (hardware, documents) or intangible (software, services, trained people).",
            "The course context is IT management — most PRINCE2 products in this context are digital, not physical.",
            "The principle is about outcome orientation, not about limiting to physical manufacturing."
          ]
        },
        {
          text: "The project team should spend most of their time on marketing the product",
          correct: false,
          why: "Wrong: 'focus on products' means defining and delivering quality outputs, not marketing them.",
          whyExtended: [
            "PRINCE2's 'focus on products' is about clear product descriptions, quality criteria and delivery standards.",
            "Marketing is a business function outside the scope of project governance.",
            "The quality theme in PRINCE2 supports this principle by establishing how quality will be verified.",
            "A project may include marketing activities as deliverables, but that is not what this principle means."
          ]
        },
        {
          text: "The project manager should decide alone what products to deliver without consulting stakeholders",
          correct: false,
          why: "Wrong: PRINCE2 emphasizes defined roles, responsibilities and stakeholder involvement.",
          whyExtended: [
            "Principle 3 (defined roles and responsibilities) ensures that stakeholders have clear accountability.",
            "The project board (not just the project manager) authorizes what the project will deliver.",
            "Product descriptions are agreed with stakeholders to ensure the deliverables meet actual needs.",
            "Excluding stakeholders would contradict both the 'defined roles' principle and the 'business case' theme."
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
      prompt: "Why does PRINCE2 include the principle 'tailor to suit the project environment'?",
      source: "Source: Course summary, PRINCE2 principle 7, and Lecture 6 caveat on frameworks.",
      options: [
        {
          text: "Because frameworks must be adapted to size, complexity, importance, capability and risk — one size does not fit all",
          correct: true,
          why: "Correct: PRINCE2 recognizes that projects vary greatly and the method must be adapted accordingly.",
          whyExtended: [
            "PRINCE2 principle 7: 'Tailor to suit the project environment — tailored to suit environment, size, complexity, importance, capability and risk.'",
            "This aligns with the CIO toolbox's core message: 'Tools are not goals in themselves — they are only meaningful if they serve their purpose.'",
            "Lecture 6 states: 'For these (and similar) frameworks, their usefulness and value is highly context-sensitive — and sometimes disputed.'",
            "A small internal project needs lighter governance than a multi-million enterprise transformation — PRINCE2 accommodates both."
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
          text: "Because PRINCE2 is only designed for UK government projects",
          correct: false,
          why: "Wrong: while PRINCE2 originated from UK government, it is designed to be universal and adaptable.",
          whyExtended: [
            "Lecture 6 notes PRINCE2's origin as 'UK government', but it is used globally across industries.",
            "The tailoring principle exists precisely to make PRINCE2 applicable beyond its original government context.",
            "The principle requires adapting to 'environment, size, complexity, importance, capability and risk' — not to a specific sector.",
            "Many private sector organizations use PRINCE2, adapted to their specific project environments."
          ]
        },
        {
          text: "Because every project should use the maximum amount of governance and documentation possible",
          correct: false,
          why: "Wrong: tailoring means right-sizing, not maximizing — more governance is not always better.",
          whyExtended: [
            "Tailoring means adjusting the level of governance, documentation and ceremony to what the project needs.",
            "A small, low-risk project should use lighter PRINCE2 governance than a large, complex one.",
            "Maximum governance for a simple project would waste resources and slow down delivery.",
            "The Cynefin meta-tool reinforces this: clear situations need simple procedures, not heavy frameworks."
          ]
        },
        {
          text: "Because the project manager should ignore all PRINCE2 principles if they seem inconvenient",
          correct: false,
          why: "Wrong: tailoring means adapting the method, not abandoning its principles.",
          whyExtended: [
            "PRINCE2 distinguishes between principles (which must be followed) and practices (which can be tailored).",
            "All seven principles remain in force — tailoring affects how they are implemented, not whether they apply.",
            "For example, 'continued business justification' always applies, but the level of formality in the business case can be tailored.",
            "Ignoring principles would mean the project is no longer using PRINCE2 — it would be unmanaged."
          ]
        }
      ]
    },
    {
      id: 7,
      type: "fill",
      title: "PRINCE2 origin",
      points: 1,
      prompt: "PRINCE2 originated from ________ government as a framework for project governance and management.",
      answers: ["UK", "British", "United Kingdom", "the UK", "the British"],
      answerKey: "UK / British",
      source: "Source: Lecture 6, CIO Toolbox 4, frameworks overview table.",
      whyCorrect: "Correct because Lecture 6's framework table explicitly lists PRINCE2 as originating from 'UK government'.",
      whyWrong: "Wrong if the answer mentions US (that is TOGAF's origin), private sector (that is SAFe), or research (that is Scrum). Each framework has a distinct origin."
    },
    // ===== BPMN (questions 8–12) =====
    {
      id: 8,
      type: "single",
      title: "BPMN purpose",
      points: 1,
      prompt: "What is the primary purpose of BPMN in the CIO toolbox?",
      source: "Source: Lecture 5, CIO Toolbox 3, slides on business process modeling.",
      options: [
        {
          text: "To model process flows with roles, activities and dependencies for analyzing and structuring the IT portfolio",
          correct: true,
          why: "Correct: BPMN is placed under the IT Architecture tool for business process modeling.",
          whyExtended: [
            "The CIO toolbox model places BPMN under tool 4 (IT Architecture) as part of 'Business process modeling — BPMN, process flows, roles/swimlanes, activities, dependencies.'",
            "Lecture 5 states that BPMN is 'the most common' among formal approaches to business process modeling.",
            "BPMN helps organizations understand, document and improve their business processes.",
            "The typical purpose of the IT Architecture tool is to 'Analyze and structure the IT portfolio — both within and among systems and services.'"
          ]
        },
        {
          text: "To calculate NPV for investment decisions",
          correct: false,
          why: "Wrong: NPV calculation belongs to the business case tool (tool 1), not to BPMN.",
          whyExtended: [
            "NPV is a financial calculation used in business case analysis to compare investment alternatives.",
            "BPMN is a visual modeling notation for business processes — it has nothing to do with financial calculations.",
            "They serve different tools: business case (tool 1) uses NPV; IT Architecture (tool 4) uses BPMN.",
            "BPMN shows how work flows through an organization; NPV shows the financial value of investment options."
          ]
        },
        {
          text: "To determine who has decision rights in IT governance",
          correct: false,
          why: "Wrong: decision rights are part of IT governance (tool 7), specifically the governance matrix.",
          whyExtended: [
            "IT governance uses archetypes and the governance matrix to determine decision rights — not BPMN.",
            "BPMN models processes (what happens and in what order), not governance structures (who decides).",
            "A BPMN diagram shows swimlanes for roles and activities, but it maps work flows, not decision authority.",
            "Governance and process modeling are complementary but distinct: governance says who decides; BPMN shows how work flows."
          ]
        },
        {
          text: "To replace the need for enterprise architecture entirely",
          correct: false,
          why: "Wrong: BPMN is one tool within enterprise architecture, not a replacement for it.",
          whyExtended: [
            "BPMN is one notation among many tools in IT architecture work — it coexists with TOGAF, operating model analysis, etc.",
            "Enterprise architecture encompasses Business, Data, Application and Technology Architecture — BPMN addresses only part of Business Architecture.",
            "Lecture 5 places BPMN under 'Business process modeling' as one component of the IT Architecture tool.",
            "Replacing all of enterprise architecture with process diagrams alone would miss data, application and technology concerns."
          ]
        }
      ]
    },
    {
      id: 9,
      type: "single",
      title: "BPMN swimlanes",
      points: 1,
      prompt: "What do swimlanes represent in a BPMN diagram?",
      source: "Source: Lecture 5, CIO Toolbox 3, slide on BPMN diagram overview.",
      options: [
        {
          text: "The management structure — divisions, departments, managers or roles that own parts of the process",
          correct: true,
          why: "Correct: swimlanes show organizational responsibility for parts of the process.",
          whyExtended: [
            "Lecture 5 states: 'The labels for the swimlanes should reflect the management structure of the organization that owns the process.'",
            "At various levels of decomposition, the boxes may represent divisions, departments, managers or supervisors.",
            "Horizontal labels can show reporting relationships between the roles involved in the process.",
            "Swimlanes make it visible which organizational unit is responsible for which activities in the process."
          ]
        },
        {
          text: "The financial cost of each activity",
          correct: false,
          why: "Wrong: swimlanes show organizational responsibility, not financial information.",
          whyExtended: [
            "BPMN swimlanes map roles and departments, not costs or financial data.",
            "Cost analysis may use process information but is done separately — typically in a business case (tool 1).",
            "Activity costs could be annotated on a process diagram but that is not what swimlanes represent.",
            "The BPMN standard defines swimlanes as partitions showing who performs which activities."
          ]
        },
        {
          text: "The Cynefin domains (clear, complicated, complex, chaotic)",
          correct: false,
          why: "Wrong: Cynefin domains are a context assessment framework, not a BPMN element.",
          whyExtended: [
            "Cynefin is a meta-tool for choosing management approach based on situational complexity.",
            "BPMN swimlanes model organizational structure within a process, not complexity assessment.",
            "Cynefin and BPMN operate at different levels: Cynefin assesses context; BPMN models workflows.",
            "A process modeled in BPMN could exist in any Cynefin domain — the diagram itself does not classify it."
          ]
        },
        {
          text: "The seven PRINCE2 processes",
          correct: false,
          why: "Wrong: PRINCE2 processes are a project governance structure, not a BPMN modeling element.",
          whyExtended: [
            "PRINCE2 processes (starting up, directing, initiating, controlling, delivering, managing boundaries, closing) structure project governance.",
            "BPMN swimlanes represent organizational roles and departments within a business process.",
            "A BPMN diagram could model a process within a PRINCE2 project, but the swimlanes would show organizational units, not PRINCE2 processes.",
            "PRINCE2 and BPMN are separate frameworks used for different purposes in the CIO toolbox."
          ]
        }
      ]
    },
    {
      id: 10,
      type: "single",
      title: "BPMN and As-Is / To-Be",
      points: 1,
      prompt: "According to Lecture 5, how is BPMN typically used in business process redesign?",
      source: "Source: Lecture 5, CIO Toolbox 3, BPMN diagram slide for analysis and redesign.",
      options: [
        {
          text: "Begin with a diagram of the process as it currently is (As-Is), then generate one or more To-Be redesigns to explore possibilities",
          correct: true,
          why: "Correct: the lecture explicitly describes this As-Is → To-Be approach.",
          whyExtended: [
            "Lecture 5 states: 'In business process modeling for redesign, we usually begin with a diagram of process as it currently is — the As-Is process — and then generate one or more To-Be redesigns to explore possibilities.'",
            "The As-Is diagram captures the current state, revealing inefficiencies and dependencies.",
            "To-Be diagrams explore improved versions of the process — this is an analytical approach to improvement.",
            "This As-Is → To-Be pattern connects to alternative analysis (tool 2): understand the situation, then synthesize options."
          ]
        },
        {
          text: "Skip all analysis and immediately implement the ideal future state",
          correct: false,
          why: "Wrong: the lecture emphasizes starting with understanding the current state before redesigning.",
          whyExtended: [
            "Understanding the As-Is state is essential — you cannot improve what you do not understand.",
            "Skipping the As-Is would be like the alternative analysis mistake of jumping to step 3 (evaluate) without step 1 (understand).",
            "The lecture specifically recommends beginning with the current state diagram.",
            "In Cynefin terms, this would be acting without sensing — appropriate only in chaotic situations, not in process redesign."
          ]
        },
        {
          text: "Use BPMN only for documenting completed projects, never for future planning",
          correct: false,
          why: "Wrong: BPMN is explicitly used for both documenting current processes and designing future ones.",
          whyExtended: [
            "The As-Is / To-Be pattern shows BPMN is used for both current state documentation and future state design.",
            "To-Be diagrams are forward-looking — they model how the process should work after redesign.",
            "The exam example from Lecture 16 asks students to 'provide an example of an important business process' and model it with BPMN — showing its active design use.",
            "BPMN is a design tool, not just a documentation tool."
          ]
        },
        {
          text: "Create exactly one BPMN diagram and never revise it",
          correct: false,
          why: "Wrong: the approach involves generating one or more To-Be redesigns — iteration is expected.",
          whyExtended: [
            "The lecture says 'generate one or more To-Be redesigns to explore possibilities' — plural alternatives are expected.",
            "Process redesign is iterative: multiple To-Be options may be evaluated before choosing one.",
            "This connects to alternative analysis: synthesize multiple options (step 2) before evaluating (step 3).",
            "Design thinking's 'Develop' phase also encourages generating multiple solutions — BPMN supports this."
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
      answers: ["activities", "activity"],
      answerKey: "activities",
      source: "Source: Lecture 5, CIO Toolbox 3, slide 'What is a business process?'.",
      whyCorrect: "Correct because the definition explicitly uses the word 'activities' — a business process combines a set of activities with a structure of logical order and dependencies to produce a result.",
      whyWrong: "Wrong if the answer says 'systems', 'projects' or 'tools'. The definition is specifically about activities — the work that people and systems perform within the process."
    },
    {
      id: 12,
      type: "single",
      title: "BPMN abstraction levels",
      points: 1,
      prompt: "At what level of detail should a BPMN diagram be drawn?",
      source: "Source: Lecture 5, CIO Toolbox 3, slide on BPMN and process modeling.",
      options: [
        {
          text: "It depends on the abstraction level and the purpose of the analysis",
          correct: true,
          why: "Correct: the lecture states that processes can be described at different levels of detail depending on the purpose.",
          whyExtended: [
            "Lecture 5 states: 'Business processes can be described at different levels of detail depending on the abstraction put into analysing the organisation, which depends in turn on the purpose of the analysis.'",
            "Pragmatic approaches focus on capturing and understanding processes, while rigorous approaches are used for deep analysis.",
            "The exam example asks for a process description 'first with words, then as a BPMN-diagram' — showing that the appropriate level varies.",
            "This aligns with PRINCE2 principle 7 (tailor to suit) — the right level of detail depends on the context and purpose."
          ]
        },
        {
          text: "Always at the maximum possible level of detail with every micro-step documented",
          correct: false,
          why: "Wrong: the level of detail should match the purpose of the analysis.",
          whyExtended: [
            "Maximum detail is not always useful — it can obscure the big picture and waste analytical effort.",
            "The lecture distinguishes between pragmatic approaches (capturing and understanding) and rigorous paradigms (deep analysis).",
            "Over-detailed diagrams are harder to communicate and maintain — right-sizing is key.",
            "The purpose of the analysis determines the abstraction level — a strategic overview needs less detail than a system requirements specification."
          ]
        },
        {
          text: "Always at the highest level with only three boxes and two arrows",
          correct: false,
          why: "Wrong: sometimes more detail is needed — the level depends on the analysis purpose.",
          whyExtended: [
            "An extremely high-level diagram may miss important dependencies, roles and activities.",
            "The lecture's own BPMN example shows multiple swimlanes, activities, messages and IT system annotations — not just three boxes.",
            "For process redesign, sufficient detail is needed to identify improvement opportunities.",
            "The appropriate level of detail is context-dependent, not fixed at either extreme."
          ]
        },
        {
          text: "BPMN only allows one fixed level of detail — no variation is possible",
          correct: false,
          why: "Wrong: the lecture explicitly states that processes can be described at different levels of detail.",
          whyExtended: [
            "BPMN supports multiple levels of abstraction — from high-level overview to detailed workflow.",
            "Sub-processes can be collapsed or expanded to show more or less detail as needed.",
            "The lecture mentions 'Subprocess/activity times can be shown at the bottom of the BPMN diagram by inserted dashed lines' — optional detail.",
            "Flexibility in abstraction level is a feature, not a limitation, of BPMN."
          ]
        }
      ]
    },
    // ===== DESIGN THINKING & DOUBLE DIAMOND (questions 13–18) =====
    {
      id: 13,
      type: "single",
      title: "Double Diamond phases",
      points: 1,
      prompt: "What are the four phases of the Double Diamond model?",
      source: "Source: Lecture 4, CIO Toolbox 2, slide on the Double Diamond.",
      options: [
        {
          text: "Discover → Define → Develop → Deliver",
          correct: true,
          why: "Correct: these are the four phases of the Double Diamond.",
          whyExtended: [
            "The CIO toolbox model lists the Double Diamond as: 'Discover → Define → Develop → Deliver.'",
            "The first diamond (Discover + Define) is about understanding the problem; the second diamond (Develop + Deliver) is about finding the solution.",
            "Discover and Develop are divergent phases (explore broadly); Define and Deliver are convergent phases (narrow down).",
            "This alternation between divergent and convergent thinking is the core structure of design thinking."
          ]
        },
        {
          text: "Plan → Build → Test → Deploy",
          correct: false,
          why: "Wrong: this resembles a traditional software development lifecycle, not the Double Diamond.",
          whyExtended: [
            "Plan-Build-Test-Deploy is a sequential delivery model — it assumes the problem is already understood.",
            "The Double Diamond starts with problem understanding (Discover, Define) before moving to solution (Develop, Deliver).",
            "Traditional SDLC focuses on execution; the Double Diamond focuses on exploration and sense-making.",
            "In Cynefin terms, SDLC fits the complicated domain; the Double Diamond fits the complex domain."
          ]
        },
        {
          text: "Sprint Planning → Daily Standup → Review → Retrospective",
          correct: false,
          why: "Wrong: these are Scrum ceremonies, not the Double Diamond phases.",
          whyExtended: [
            "Scrum ceremonies are iterative within a sprint cycle, not the overarching Double Diamond structure.",
            "Scrum is an agile framework for organizing development work; the Double Diamond is a design thinking process.",
            "Scrum assumes a product backlog already exists; the Double Diamond helps discover what should be on the backlog.",
            "Both can coexist: design thinking can inform what to build, Scrum can organize how to build it."
          ]
        },
        {
          text: "Analyze → Design → Implement → Evaluate",
          correct: false,
          why: "Wrong: this is a generic process description, not the Double Diamond.",
          whyExtended: [
            "This four-step model is more analytical and sequential than the Double Diamond's divergent-convergent rhythm.",
            "The Double Diamond emphasizes exploration and reframing before converging on solutions.",
            "The first diamond (Discover/Define) is more open-ended than 'Analyze' — it involves empathy and user research.",
            "The Double Diamond's strength is that it questions the problem before jumping to solutions."
          ]
        }
      ]
    },
    {
      id: 14,
      type: "single",
      title: "Design thinking — problem reframing",
      points: 1,
      prompt: "According to the lecture, what is the purpose of problem-reframing in the Discover phase?",
      source: "Source: Lecture 4, CIO Toolbox 2, slide 'The Discover phase' quoting Wedell-Wedellsborg.",
      options: [
        {
          text: "Not to find the 'real' problem, but to see if there is a better problem to solve",
          correct: true,
          why: "Correct: the lecture quotes Wedell-Wedellsborg on exactly this point.",
          whyExtended: [
            "Lecture 4 quotes: 'The point of reframing is not to find the \"real\" problem but, rather, to see if there is a better one to solve.'",
            "The lecture also states: 'the very idea that a single root problem exists may be misleading; problems are typically multicausal and can be addressed in many ways.'",
            "Reframing challenges assumptions about what the problem is — the initial framing may work, but alternatives may be better.",
            "This is why design thinking is used 'when the problem is unclear' — the exploration may reveal a different, more impactful problem to solve."
          ]
        },
        {
          text: "To prove that the original problem statement was wrong",
          correct: false,
          why: "Wrong: the lecture explicitly says the initial framing is 'not necessarily wrong' — reframing looks for a better alternative.",
          whyExtended: [
            "Lecture 4 states: 'the initial framing of the problem is not necessarily wrong.'",
            "Reframing is about exploration, not about proving something wrong.",
            "The goal is to expand the solution space by considering alternative problem definitions.",
            "Sometimes the original framing is the best one — reframing confirms this rather than forcing a change."
          ]
        },
        {
          text: "To immediately choose the cheapest solution available",
          correct: false,
          why: "Wrong: the Discover phase is about understanding the problem, not choosing solutions based on cost.",
          whyExtended: [
            "Cost considerations belong to the business case (tool 1), not to the Discover phase of design thinking.",
            "The Discover phase focuses on empathy, user research and understanding — not on economic evaluation.",
            "Jumping to cost-based decisions in the Discover phase would skip the essential problem understanding step.",
            "Design thinking separates problem understanding (first diamond) from solution development (second diamond)."
          ]
        },
        {
          text: "To assign governance archetypes to the problem",
          correct: false,
          why: "Wrong: governance archetypes belong to IT governance (tool 7), not to design thinking's Discover phase.",
          whyExtended: [
            "IT governance archetypes (Business Monarchy, IT Monarchy, Federal, etc.) determine who makes decisions.",
            "Design thinking's Discover phase is about understanding user needs and the problem space.",
            "These are entirely different activities in the CIO toolbox: governance is tool 7, design thinking is tool 3.",
            "Problem reframing is about what to solve; governance archetypes are about who decides."
          ]
        }
      ]
    },
    {
      id: 15,
      type: "fill",
      title: "Design thinking — Deliver phase",
      points: 1,
      prompt: "The Deliver phase of the Double Diamond involves testing out different solutions at ________-scale, rejecting those that will not work.",
      answers: ["small", "liten", "liten-"],
      answerKey: "small",
      source: "Source: Lecture 4, CIO Toolbox 2, slide on the Double Diamond — Deliver phase definition.",
      whyCorrect: "Correct because the Deliver phase definition states: 'Delivery involves testing out different solutions at small-scale, rejecting those that will not work and improving the ones that will.' Small-scale testing is central to design thinking's iterative approach.",
      whyWrong: "Wrong if the answer says 'full' or 'large'. Design thinking explicitly avoids full-scale implementation in the Deliver phase — the point is to learn cheaply through small experiments."
    },
    {
      id: 16,
      type: "multi",
      title: "Design thinking key practices",
      points: 1,
      prompt: "Which of the following are listed as key practices of design thinking in the CIO toolbox model?",
      source: "Source: CIO toolbox model, tool 3 (Design thinking).",
      options: [
        {
          text: "Problem-reframing",
          correct: true,
          why: "Correct: problem-reframing is the first listed key practice.",
          whyExtended: [
            "The CIO toolbox model lists 'Key practices: Problem-reframing, user insight, co-design, prototyping, small-scale testing.'",
            "Problem-reframing challenges the initial understanding of the problem — it is central to the Discover phase.",
            "The lecture quotes Wedell-Wedellsborg on the purpose of reframing: to see if there is a better problem to solve.",
            "Reframing is what distinguishes design thinking from traditional analytical approaches that assume the problem is known."
          ]
        },
        {
          text: "Prototyping",
          correct: true,
          why: "Correct: prototyping is one of the five key practices.",
          whyExtended: [
            "Prototyping creates tangible representations of ideas that can be tested with users.",
            "Prototypes can range from paper sketches to functional software — the fidelity matches the learning goal.",
            "Prototyping belongs primarily to the Develop and Deliver phases of the Double Diamond.",
            "It enables learning by doing — faster and cheaper than full implementation."
          ]
        },
        {
          text: "NPV calculation",
          correct: false,
          why: "Wrong: NPV is part of the business case tool (tool 1), not a design thinking practice.",
          whyExtended: [
            "NPV is a financial calculation for comparing investment alternatives — it belongs to the business case tool.",
            "Design thinking practices are qualitative and explorative: user insight, co-design, prototyping.",
            "Design thinking and business case serve different stages: design thinking discovers what to build; business case evaluates if it is worth building.",
            "The CIO toolbox keeps them as separate tools precisely because they serve different purposes."
          ]
        },
        {
          text: "Small-scale testing",
          correct: true,
          why: "Correct: small-scale testing is the final listed key practice.",
          whyExtended: [
            "Small-scale testing is central to the Deliver phase: 'testing out different solutions at small-scale, rejecting those that will not work.'",
            "Small-scale testing reduces risk by learning before committing to full-scale implementation.",
            "It connects to the Cynefin complex domain approach: Probe → Sense → Respond — try things and learn.",
            "This practice embodies the experimental, iterative nature of design thinking."
          ]
        },
        {
          text: "Co-design",
          correct: true,
          why: "Correct: co-design involves designing together with users and stakeholders.",
          whyExtended: [
            "Co-design is listed among the five key practices in the CIO toolbox model.",
            "The Develop phase 'encourages people to give different answers to the clearly defined problem, seeking inspiration from elsewhere and co-designing with a range of different people.'",
            "Co-design ensures solutions are grounded in real user needs, not just internal assumptions.",
            "It is a participatory approach that aligns with design thinking's human-centered philosophy."
          ]
        }
      ]
    },
    {
      id: 17,
      type: "single",
      title: "Design thinking in Cynefin",
      points: 1,
      prompt: "In which Cynefin domain is design thinking most appropriate?",
      source: "Source: CIO toolbox model, meta-tool Cynefin, and tool 3 purpose.",
      options: [
        {
          text: "Complex — where important factors are unknown and experimentation is necessary",
          correct: true,
          why: "Correct: design thinking is explicitly linked to the complex domain in the CIO toolbox.",
          whyExtended: [
            "The CIO toolbox model states: 'Complex → experimentation, design thinking, agile.'",
            "Design thinking is used 'when the problem is unclear' — this maps directly to the complex domain where 'several important factors influencing the outcome are unknown.'",
            "The complex domain uses Probe → Sense → Respond, which matches design thinking's iterative exploration.",
            "Cynefin connects: 'business case (analyze) ↔ design thinking (explore) ↔ projects (plan) ↔ product teams (iterate).'"
          ]
        },
        {
          text: "Clear — where problems are well-known and procedures suffice",
          correct: false,
          why: "Wrong: clear situations need procedures and best practice, not explorative design thinking.",
          whyExtended: [
            "The CIO toolbox model states: 'Clear → procedures, best practice.'",
            "In clear situations, problems are well understood and solutions are known — design thinking's exploration adds no value.",
            "Using design thinking for a clear problem would be over-engineering — established procedures are more efficient.",
            "Clear domain uses Sense → Categorize → Respond, not the exploratory Probe → Sense → Respond of design thinking."
          ]
        },
        {
          text: "Chaotic — where immediate action is needed without exploration",
          correct: false,
          why: "Wrong: chaotic situations require immediate action, not the deliberate exploration of design thinking.",
          whyExtended: [
            "The CIO toolbox model states: 'Chaotic → immediate action.'",
            "In chaotic situations, there is no time for user research, prototyping and small-scale testing.",
            "Chaotic domain uses Act → Sense → Respond — act first to stabilize, then analyze later.",
            "Design thinking's iterative, explorative approach is too slow for emergency situations."
          ]
        },
        {
          text: "It works equally well in all domains without any adaptation",
          correct: false,
          why: "Wrong: the CIO toolbox explicitly maps different tools to different Cynefin domains.",
          whyExtended: [
            "The Cynefin meta-tool exists precisely to help choose the right approach for each context.",
            "Design thinking is most valuable in the complex domain; in clear or complicated domains, other tools are more appropriate.",
            "The CIO toolbox's core principle is that tools serve a purpose — using design thinking in a clear situation wastes resources.",
            "Context-sensitivity is the fundamental message: 'Read the room' is step 1 in the CIO toolbox."
          ]
        }
      ]
    },
    {
      id: 18,
      type: "single",
      title: "Design thinking as toolkit",
      points: 1,
      prompt: "According to the course, what has design thinking become beyond just a cognitive process or mindset?",
      source: "Source: Lecture 4, CIO Toolbox 2, slide quoting Tschimmel (2012).",
      options: [
        {
          text: "An effective toolkit for any innovation process, connecting creative design to traditional business thinking",
          correct: true,
          why: "Correct: this is the Tschimmel (2012) characterization used in the lecture.",
          whyExtended: [
            "Lecture 4 quotes Tschimmel: 'Design Thinking today is not only a cognitive process or a mindset, but has become an effective toolkit for any innovation process, connecting the creative design approach to traditional business thinking, based on planning and rational problem solving.'",
            "This positions design thinking as a bridge between creative exploration and structured business analysis.",
            "It combines the explorative approach (tool 3) with the analytical approach (tools 1 and 2) in the CIO toolbox.",
            "The toolkit includes practical methods: problem-reframing, user insight, co-design, prototyping and small-scale testing."
          ]
        },
        {
          text: "A replacement for all financial analysis in organizations",
          correct: false,
          why: "Wrong: design thinking complements, not replaces, business case analysis.",
          whyExtended: [
            "The CIO toolbox has both design thinking (tool 3) and business case (tool 1) as separate, complementary tools.",
            "Design thinking discovers what to build; business case evaluates whether it is worth investing in.",
            "Financial analysis (NPV, cost-benefit) serves different purposes than creative exploration.",
            "Both are needed — one does not replace the other."
          ]
        },
        {
          text: "A strict regulatory compliance framework",
          correct: false,
          why: "Wrong: design thinking is about innovation and exploration, not regulatory compliance.",
          whyExtended: [
            "Compliance is a qualitative consideration in the business case tool, not a design thinking concern.",
            "Design thinking is described as 'an explorative approach' — the opposite of a rigid compliance framework.",
            "Regulatory compliance requires adherence to rules; design thinking requires creative exploration.",
            "They can interact (compliance may be a constraint on design), but design thinking is not itself a compliance tool."
          ]
        },
        {
          text: "A method exclusively for graphic designers",
          correct: false,
          why: "Wrong: the lecture emphasizes that design thinking is used by multidisciplinary teams in any kind of organization.",
          whyExtended: [
            "Lecture 4 quotes Tschimmel: DT 'offers new models of processes and toolkits which help to improve, accelerate and visualise every creative process, carried out not only by designers, but in multidisciplinary teams in any kind of organisation.'",
            "The 'thinking' in design thinking applies to any problem-solving context, not just visual design.",
            "In the CIO toolbox context, design thinking is used for IT management decisions — not graphic design.",
            "The course positions design thinking as a management tool, not a design-industry-specific method."
          ]
        }
      ]
    },
    // ===== TOGAF (questions 19–22) =====
    {
      id: 19,
      type: "multi",
      title: "TOGAF architecture taxonomy",
      points: 1,
      prompt: "Which of the following are the four architecture types in the TOGAF taxonomy?",
      source: "Source: Lecture 5, CIO Toolbox 3, slide 'Architecture taxonomy (according to TOGAF)'.",
      options: [
        {
          text: "Business Architecture — defines business strategy, governance, organization and key business processes",
          correct: true,
          why: "Correct: Business Architecture is one of the four TOGAF architecture types.",
          whyExtended: [
            "Lecture 5 defines Business Architecture as: 'defines the business strategy, governance, organization, and key business processes.'",
            "It is the most business-facing layer and connects architecture to organizational goals.",
            "Business Architecture shapes the requirements for the other three architecture types.",
            "It relates to the operating model concept: how business processes should be integrated and standardized."
          ]
        },
        {
          text: "Data Architecture — describes the structure of logical and physical data assets and data management resources",
          correct: true,
          why: "Correct: Data Architecture is one of the four TOGAF architecture types.",
          whyExtended: [
            "Lecture 5 defines Data Architecture as: 'describes the structure of an organization's logical and physical data assets and data management resources.'",
            "Data Architecture determines what data exists, how it is structured and how it is managed.",
            "It connects to the D4D concept of Operational Backbone, where reliable and accessible master data is a core function.",
            "Data integration is a key dimension of the operating model."
          ]
        },
        {
          text: "Application Architecture — provides a blueprint for individual applications, their interactions and their relationships to core business processes",
          correct: true,
          why: "Correct: Application Architecture is one of the four TOGAF architecture types.",
          whyExtended: [
            "Lecture 5 defines Application Architecture as: 'provides a blueprint for the individual applications to be deployed, their interactions, and their relationships to the core business processes of the organization.'",
            "Application Architecture maps the IT portfolio — which applications exist and how they relate.",
            "This connects to the IT Architecture tool's purpose: 'Analyze and structure the IT portfolio.'",
            "Understanding application interactions is essential for identifying integration needs and redundancies."
          ]
        },
        {
          text: "Technology Architecture — describes the logical software and hardware capabilities required to support business, data and application services",
          correct: true,
          why: "Correct: Technology Architecture is one of the four TOGAF architecture types.",
          whyExtended: [
            "Lecture 5 defines Technology Architecture as: 'describes the logical software and hardware capabilities that are required to support the deployment of business, data, and application services.'",
            "It includes 'IT infrastructure, middleware, networks, communications, processing, standards, etc.'",
            "Technology Architecture is the most technical layer and underpins all other architecture types.",
            "It connects to the IT governance decision domain 'IT infrastructure strategies.'"
          ]
        },
        {
          text: "Marketing Architecture — describes the organization's go-to-market strategy and advertising channels",
          correct: false,
          why: "Wrong: Marketing Architecture is not part of the TOGAF taxonomy.",
          whyExtended: [
            "The four TOGAF architecture types are Business, Data, Application and Technology — no marketing layer exists.",
            "Marketing activities might be represented within Business Architecture as processes, but they are not a separate architecture type.",
            "TOGAF focuses on the structural design of the enterprise, not on marketing strategy.",
            "Adding marketing would blur the boundary between architecture (structural design) and business function (marketing)."
          ]
        }
      ]
    },
    {
      id: 20,
      type: "single",
      title: "TOGAF ADM",
      points: 1,
      prompt: "What does ADM stand for in TOGAF, and what is its purpose?",
      source: "Source: Lecture 5, CIO Toolbox 3, and course summary on enterprise architecture.",
      options: [
        {
          text: "Architecture Development Method — a systematic method for developing enterprise architecture",
          correct: true,
          why: "Correct: ADM is TOGAF's structured process for developing and managing enterprise architecture.",
          whyExtended: [
            "The course summary mentions: 'TOGAF: the architecture development method (ADM).'",
            "ADM provides a step-by-step approach to developing architecture across all four domains (Business, Data, Application, Technology).",
            "Lecture 5 positions TOGAF as representing 'a formal, and often centralized, perspective on architecture and architecture work.'",
            "ADM includes phases for vision, requirements, migration planning and governance — it is a comprehensive process."
          ]
        },
        {
          text: "Agile Delivery Management — a lightweight method for managing sprints",
          correct: false,
          why: "Wrong: ADM stands for Architecture Development Method, and it is not an agile method.",
          whyExtended: [
            "ADM is part of TOGAF, which represents a formal, centralized perspective — not the agile perspective.",
            "Agile delivery methods include Scrum and SAFe, which are separate frameworks.",
            "The course positions TOGAF as more structured and governance-heavy than agile approaches.",
            "TOGAF and agile represent different ends of the architecture perspective spectrum."
          ]
        },
        {
          text: "Application Database Manager — a tool for managing database schemas",
          correct: false,
          why: "Wrong: ADM is a process framework, not a database management tool.",
          whyExtended: [
            "ADM addresses enterprise-wide architecture concerns across all four TOGAF domains, not just data.",
            "Database management is a technical activity within Technology or Data Architecture, not the name of the method.",
            "TOGAF is an enterprise architecture framework, not a specific technology tool.",
            "Architecture methods guide organizational decision-making; database tools support specific technical operations."
          ]
        },
        {
          text: "Advanced Decision Matrix — the same as the IT governance matrix",
          correct: false,
          why: "Wrong: the governance matrix belongs to IT governance (Weill & Ross), not to TOGAF.",
          whyExtended: [
            "The IT governance matrix combines decision domains with archetypes — it comes from Weill & Ross (2005), not TOGAF.",
            "ADM is TOGAF's architecture development process with defined phases and deliverables.",
            "TOGAF and IT governance are separate tools in the CIO toolbox: TOGAF falls under IT Architecture (tool 4); governance is tool 7.",
            "They can complement each other — TOGAF may inform governance decisions — but they are distinct concepts."
          ]
        }
      ]
    },
    {
      id: 21,
      type: "single",
      title: "Why is EA hard?",
      points: 1,
      prompt: "According to the course, why is enterprise architecture management (EAM) considered difficult?",
      source: "Source: Lecture 5 and course summary on enterprise architecture challenges.",
      options: [
        {
          text: "EA efforts tend to go on forever without concrete results, and organizations grow organically rather than being 'architected'",
          correct: true,
          why: "Correct: the course identifies both the 'endless' nature of EA efforts and the organic nature of organizations as key challenges.",
          whyExtended: [
            "The course summary states: 'they seem to go on forever without concrete results.'",
            "It also notes: 'Run in a top-down manner: a central team of enterprise architects run the process — but organizations are not \"architected\" and they grow and change organically.'",
            "This creates a tension: EA aims for rational structure, but organizations evolve through adaptation, politics and emergent change.",
            "The challenge is that EA requires long-term commitment while organizations demand short-term results."
          ]
        },
        {
          text: "EA is easy because organizations naturally follow architectural blueprints",
          correct: false,
          why: "Wrong: the course explicitly states that organizations are not 'architected' — they grow organically.",
          whyExtended: [
            "Organizations adapt to 'outer and inner pressures and changes' rather than following a blueprint.",
            "EA is a multi-disciplinary challenge spanning Business, Data, Application and Technology Architecture.",
            "The course positions EA as valuable but difficult — not as easy or straightforward.",
            "If EA were easy, it would not be identified as a major IT management challenge in the course."
          ]
        },
        {
          text: "EA is hard only because TOGAF is written in a difficult language",
          correct: false,
          why: "Wrong: the challenges are organizational and structural, not just about TOGAF's documentation.",
          whyExtended: [
            "The core difficulty is that organizations resist top-down redesign — they evolve organically.",
            "EA is hard because it requires cross-functional coordination, long-term commitment and organizational change.",
            "Even without TOGAF, enterprise architecture work would face the same organizational challenges.",
            "The course identifies systemic organizational factors, not documentation quality, as the main barrier."
          ]
        },
        {
          text: "EA has no value at all and should never be attempted",
          correct: false,
          why: "Wrong: the course describes EAM as a holistic and feasible approach — it has value but is challenging.",
          whyExtended: [
            "The course summary describes EAM as: 'a holistic and feasible approach for organizations with complex and fragmented IT portfolios; increase organizational agility.'",
            "EA's purpose is valuable: 'optimize across the enterprise the often fragmented legacy of processes into an integrated environment.'",
            "The challenge is execution, not the concept — EA is worth pursuing but requires realistic expectations.",
            "The CIO toolbox includes IT Architecture as a core tool, confirming its value in IT management."
          ]
        }
      ]
    },
    {
      id: 22,
      type: "fill",
      title: "TOGAF origin",
      points: 1,
      prompt: "TOGAF originated from ________ defence as a framework for enterprise architecture.",
      answers: ["US", "American", "United States", "the US"],
      answerKey: "US",
      source: "Source: Lecture 6, CIO Toolbox 4, frameworks overview table.",
      whyCorrect: "Correct because Lecture 6's framework table explicitly lists TOGAF's origin as 'US defence'.",
      whyWrong: "Wrong if the answer mentions UK (that is PRINCE2's origin), research (that is Scrum's origin), or private sector (that is SAFe's origin)."
    },
    // ===== CYNEFIN (questions 23–25) =====
    {
      id: 23,
      type: "multi",
      title: "Cynefin domains and approaches",
      points: 1,
      moduleId: "cio-tool-box",
      groupId: "cynefin",
      prompt: "Match the correct approach to each Cynefin domain. Which pairings are correct?",
      source: "Source: Lecture 4, CIO Toolbox 2, slide on Cynefin, and CIO toolbox model.",
      options: [
        {
          text: "Clear → Sense, Categorize, Respond → best practice",
          correct: true,
          why: "Correct: clear situations use established procedures and best practice.",
          whyExtended: [
            "Lecture 4: 'A clear situation means that the issues occurring are typically well known, and can be solved by previously agreed and often written procedures.'",
            "The approach is Sense → Categorize → Respond: recognize the type of situation, categorize it, apply the known procedure.",
            "This is the domain of best practice — answers are known and repeatable.",
            "The CIO toolbox model confirms: 'Clear → procedures, best practice.'"
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
          why: "Wrong: Probe-Sense-Respond with emergent practice is the Complex domain, not Complicated.",
          whyExtended: [
            "The Complicated domain uses Sense → Analyze → Respond with good practice (not emergent practice).",
            "Probe → Sense → Respond is the approach for the Complex domain, where experimentation is needed.",
            "In complicated situations, cause-and-effect can be analyzed in advance by experts — probing is not necessary.",
            "Emergent practice arises from complex situations where outcomes cannot be predicted; good practice comes from expert analysis in complicated situations."
          ]
        },
        {
          text: "Complex → Probe, Sense, Respond → emergent practice",
          correct: true,
          why: "Correct: complex situations require experimentation and produce emergent practice.",
          whyExtended: [
            "Lecture 4: 'In a complex situation, several important factors influencing the outcome are unknown, and experimentation is typically necessary.'",
            "The approach is Probe → Sense → Respond: try something, observe results, adapt — learning emerges from action.",
            "The CIO toolbox model states: 'Complex → experimentation, design thinking, agile.'",
            "Emergent practice means the right approach is discovered through iteration, not determined in advance."
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
          why: "Correct: chaotic situations require immediate action, producing novel responses.",
          whyExtended: [
            "Lecture 4: 'In a chaotic situation, there is typically an emergency which requires immediate action to move into a more stable state.'",
            "The approach is Act → Sense → Respond: stabilize first, then assess the situation and determine next steps.",
            "Novel practice means the response is unprecedented — the situation is too urgent for established or emergent approaches.",
            "The CIO toolbox model confirms: 'Chaotic → immediate action.'"
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
      prompt: "According to the lecture, what happens when all three elements of the triple constraint (scope, time, cost) are fixed?",
      source: "Source: Lecture 4, CIO Toolbox 2, slides on Cynefin and triple constraint mapping.",
      options: [
        {
          text: "The project becomes more complex — with 3 fixed factors and 0 added complexity, it maps to the Complex domain",
          correct: true,
          why: "Correct: fixing all three constraints removes flexibility and pushes toward higher Cynefin domains.",
          whyExtended: [
            "Lecture 4's table shows: 3 fixed constraints + 0 added complexity factors = Complex domain.",
            "The CIO toolbox model states: 'Scope, time, cost — all three fixed → vulnerable.'",
            "Fixing all constraints eliminates the ability to adjust — any unexpected issue becomes a problem that cannot be absorbed.",
            "With even 1 additional complexity factor (3 fixed + 1+), the situation escalates to Chaotic."
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
          text: "The project becomes Clear and simple because everything is defined upfront",
          correct: false,
          why: "Wrong: fixing all constraints actually increases vulnerability and complexity, not simplicity.",
          whyExtended: [
            "The Clear domain has few fixed constraints and few complexity factors — not all three locked.",
            "Fixing everything upfront creates rigidity, not clarity — any deviation becomes a crisis.",
            "The lecture explicitly warns that fixing all three makes projects 'particularly vulnerable to disappointment.'",
            "True clarity comes from understanding and predictability, not from locking all variables."
          ]
        },
        {
          text: "The triple constraint has no relationship to Cynefin domains",
          correct: false,
          why: "Wrong: the lecture explicitly maps fixed triple constraint factors to Cynefin domains.",
          whyExtended: [
            "Lecture 4 dedicates a slide to the Cynefin-triple constraint mapping with a detailed table.",
            "The mapping is a practical tool for assessing which management approach a project needs.",
            "The connection helps project managers understand why rigid projects are harder to manage.",
            "Ignoring this connection misses a key integration point between project management and contextual leadership."
          ]
        },
        {
          text: "Fixing all three constraints has no effect on project risk",
          correct: false,
          why: "Wrong: fixing all constraints significantly increases risk by removing all flexibility.",
          whyExtended: [
            "When all three constraints are fixed, any deviation in one forces a compromise in the others or the project fails.",
            "The lecture's Cynefin mapping shows that more fixed constraints push toward higher (more complex/chaotic) domains.",
            "Flexibility in at least one constraint (e.g., adjusting scope while keeping time and cost) provides a safety valve.",
            "Project management research consistently shows that rigid constraints increase failure risk."
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
      prompt: "Why is Cynefin described as a 'meta-tool' in the CIO toolbox rather than a regular tool?",
      source: "Source: CIO toolbox model, meta-tool Cynefin.",
      options: [
        {
          text: "Because it helps choose which of the other tools to use based on the complexity of the situation",
          correct: true,
          why: "Correct: Cynefin operates at a level above the other tools — it guides tool selection.",
          whyExtended: [
            "The CIO toolbox model describes Cynefin's purpose as: 'Choose management approach based on context.'",
            "Cynefin maps: 'business case (analyze) ↔ design thinking (explore) ↔ projects (plan) ↔ product teams (iterate).'",
            "A meta-tool is a tool about tools — it does not do the work itself but guides which tool should do the work.",
            "This makes Cynefin the starting point for contextual decision-making: assess the domain first, then select the appropriate approach."
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
          text: "Because it is the most expensive framework to implement",
          correct: false,
          why: "Wrong: 'meta-tool' refers to its role in guiding other tools, not to implementation cost.",
          whyExtended: [
            "Cynefin is a sense-making framework, not a large-scale implementation project.",
            "It requires understanding and judgment, not expensive software or infrastructure.",
            "The 'meta' prefix means 'about' — a meta-tool is a tool about tools, not a more expensive tool.",
            "Cost is not a dimension used to distinguish tools in the CIO toolbox."
          ]
        },
        {
          text: "Because it was invented after all the other tools",
          correct: false,
          why: "Wrong: the 'meta' label refers to its function (guiding tool selection), not to its chronological position.",
          whyExtended: [
            "Cynefin (Snowden and Boone, 2007) is not necessarily newer than all other tools in the toolbox.",
            "The 'meta' designation is about its role: it operates at a level above the other tools.",
            "Even if Cynefin were the oldest framework, it would still be a meta-tool because it guides selection among other approaches.",
            "The CIO toolbox organizes tools by function, not by chronological order."
          ]
        },
        {
          text: "Because it replaces the need for the other six tools entirely",
          correct: false,
          why: "Wrong: Cynefin helps choose among the other tools — it does not replace them.",
          whyExtended: [
            "Cynefin tells you which domain you are in; the other tools provide the methods for that domain.",
            "You still need business case for analysis, design thinking for exploration, PRINCE2 for project governance, etc.",
            "A meta-tool adds a selection layer — it does not eliminate the need for the tools being selected among.",
            "The CIO toolbox has seven tools plus one meta-tool because all are needed for different situations."
          ]
        }
      ]
    }
  ]
};
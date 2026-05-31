// src/data/exams/mockExam2_en.js
export const mockExam2_en = {
  id: "mock-exam-2-en",
  subjectId: "in5431",
  baseId: "mock-exam-2",
  lang: "en",
  title: "Practice Exam 2: Full Curriculum – Deep Dive",
  description: "Deep dive into **operating models**, **governance archetypes**, **D4D roadmap**, **sustainability** and **Cynefin**.",
  modeLabel: "FULL PRACTICE",
  estimatedMinutes: "45–60",
  sortOrder: 20,
  questions: [
    {
      id: 1,
      type: "fill",
      title: "**Digitization vs digitalization**",
      points: 1,
      prompt: "________ is a **sociotechnical process** where **digital technology** is used to change one or more **sociotechnical structures**.",
      answers: ["digitalization"],
      answerKey: "Digitalization",
      source: "Source: Lecture 7, D4D building blocks, slide 'What is the difference between digitization, digitalization and digital transformation?'.",
      whyCorrect: "**Digitalization** is defined as sociotechnical change, as opposed to **digitization** which is purely **technical conversion** from **analog to digital**.",
      whyWrong: "**Digitization** is wrong because it only concerns **technical conversion** (e.g. paper to PDF). **Digital transformation** is too broad. It describes an entire organizational change over **time**.",
      whyExtendedImageRefs: [
        "D4D-overview"
      ]
    },
    {
      id: 2,
      type: "single",
      title: "**Operating model: Coordination**",
      points: 1,
      prompt: "Which **operating model** fits best for organizations with **unique business units** that need to know each other's **transactions**, but do NOT **standardize processes**?",
      source: "Source: Lecture 5, slide 'Four operating models' (Figure A1.1 from D4D).",
      options: [
        {
          text: "**Diversification**",
          correct: false,
          why: "**Diversification** has **low integration** AND **low standardization**. Here the **integration** is high.",
          whyExtended: [
            "Figure A1.1 describes **Diversification** as '**Independent business units** with different customers and expertise'.",
            "The question specifies that units need to know each other's **transactions**, which means **high integration**. That rules out **diversification**.",
            "The four **operating models** are placed in a **2x2 matrix**: **integration** (high/low) x **standardization** (high/low)."
          ]
        },
        {
          text: "**Coordination**",
          correct: true,
          why: "**Coordination** = **high integration**, **low standardization**. Unique units that **share data**.",
          whyExtended: [
            "Figure A1.1 describes **Coordination** as '**Unique business units** with a need to know each other's **transactions**'.",
            "**Coordination** fits when units have different **processes** but need shared access to data. For example a hospital where departments have different procedures but must share patient information.",
            "The **CIO toolbox** model places **operating model** as a '**strategic bridge**' under the **IT Architecture** tool."
          ]
        },
        {
          text: "**Unification**",
          correct: false,
          why: "**Unification** has **high standardization** in addition to **high integration**.",
          whyExtended: [
            "**Unification** is described as 'Single business with global process standards and global data access'.",
            "The question says units do NOT **standardize processes**, which rules out **unification**.",
            "The difference between **coordination** and **unification** is the **standardization** dimension: **coordination** has low, **unification** has high."
          ]
        },
        {
          text: "**Replication**",
          correct: false,
          why: "**Replication** has **high standardization** but **low integration**.",
          whyExtended: [
            "**Replication** is described as 'Independent but **similar business units** sharing **best practices**'.",
            "The question requires **high integration** (units must know each other's **transactions**), which rules out **replication**.",
            "**Replication** and **coordination** are opposites: **replication** has **high standardization** + **low integration**, **coordination** has **low standardization** + **high integration**."
          ]
        }
      ],
      whyExtendedImageRefs: [
        "business_process_matrix_en"
      ]
    },
    {
      id: 3,
      type: "single",
      title: "**Operating model: Replication**",
      points: 1,
      prompt: "Which **operating model** describes independent but **similar business units** that share **best practices**?",
      source: "Source: Lecture 5, slide 'Four operating models'.",
      options: [
        {
          text: "**Coordination**",
          correct: false,
          why: "**Coordination** requires that units **share data**/**transactions** (**high integration**).",
          whyExtended: [
            "**Coordination** has **high integration**. Units need to know each other's **transactions** and **share data**.",
            "The question describes independent units, which means **low integration**. That rules out **coordination**."
          ]
        },
        {
          text: "**Unification**",
          correct: false,
          why: "**Unification** also requires **high integration** between units.",
          whyExtended: [
            "**Unification** has both **high integration** and **high standardization**. It is the most integrated model.",
            "The question describes independent units, which means **low integration**. **Unification** requires the opposite."
          ]
        },
        {
          text: "**Replication**",
          correct: true,
          why: "**Low integration**, **high standardization**. Similar **processes**, but units operate independently.",
          whyExtended: [
            "Figure A1.1 describes **Replication** as 'Independent but **similar business units** sharing **best practices**'.",
            "Units are independent (**low integration**) but standardize their **processes** (**high standardization**) by sharing **best practices**.",
            "**Replication** fits chains and franchise operations where each unit runs similar **processes** but does not need to **share data** across units."
          ]
        },
        {
          text: "**Diversification**",
          correct: false,
          why: "**Diversification** has **low standardization**, meaning different **processes**.",
          whyExtended: [
            "**Diversification** has **low integration** AND **low standardization**. Units are independent and have different **processes**.",
            "The question describes similar units sharing **best practices**, which implies **high standardization**. That rules out **diversification**."
          ]
        }
      ],
      whyExtendedImageRefs: [
        "business_process_matrix_en"
      ]
    },
    {
      id: 4,
      type: "fill",
      title: "**Digital transformation**",
      points: 1,
      prompt: "**Digital transformation** is a significant organizational change, driven or enabled by the extensive use of ________ technologies.",
      answers: ["digital"],
      answerKey: "digital",
      source: "Source: Lecture 14, slide 'What is a digital transformation': 'A significant organizational change, driven or enabled by the extensive use of digital technologies.'",
      whyCorrect: "Correct because the definition explicitly links **digital transformation** to the extensive use of **digital technologies**.",
      whyWrong: "Wrong if the answer only points to 'new **processes**' or 'leadership'. Technology is a central driver/enabler in the definition.",
      whyExtendedImageRefs: [
        "digital_strategy_model",
        "D4D-overview"
      ]
    },
    {
      id: 5,
      type: "multi",
      title: "**Contents of a digital strategy**",
      points: 1,
      prompt: "Mark the elements that according to the lecture are part of a **digital strategy**.",
      source: "Source: Lecture 14, slide 'What is a digital strategy?' and subsequent slides.",
      options: [
        {
          text: "A **digital vision**, challenging and inspiring",
          correct: true,
          why: "**Digital vision** is the first element.",
          whyExtended: [
            "Lecture 14 describes **digital transformation** as a process that includes '**Digital vision & strategy**' as a key element.",
            "The **D4D roadmap** recommends '**communicate the vision** and the journey'. The vision gives direction for the entire transformation."
          ]
        },
        {
          text: "A **portfolio of digital initiatives**",
          correct: true,
          why: "Prioritization of digital projects/initiatives.",
          whyExtended: [
            "A portfolio of initiatives connects the vision to concrete actions. It is about prioritizing what should be done.",
            "The **D4D summary** says 'assess **building blocks** to adapt to changes' and '**roadmap the journey**'. Both presuppose a portfolio of initiatives."
          ]
        },
        {
          text: "A **roadmap**",
          correct: true,
          why: "**Roadmap** is a planning tool for implementation.",
          whyExtended: [
            "The **D4D summary** says: '**roadmap the journey**'. A **roadmap** connects **digital strategy** to concrete execution with timeline and milestones.",
            "Lecture 2 on **strategy** emphasizes that an **action plan** needs 'expected ordering and timeframe for executing the activities aka **roadmap**'."
          ]
        },
        {
          text: "A definition of **responsibilities**",
          correct: true,
          why: "Clarification of who owns and follows up.",
          whyExtended: [
            "The **D4D summary** says: '**establish ownership** for each **building block**'.",
            "**Accountability Framework** as a **D4D** **building block** is about '**distribution of responsibilities** for **digital offerings** and components'."
          ]
        },
        {
          text: "A complete **BPMN** model of all **processes**",
          correct: false,
          why: "**BPMN** is a **process modeling** tool, not part of the **digital strategy** definition.",
          whyExtended: [
            "**BPMN** belongs to the **IT Architecture** tool in the **CIO toolbox**.",
            "**Digital strategy** is about vision, initiatives, **roadmap** and **responsibilities**. Not about detailed **process modeling** of all **processes**.",
            "Lecture 14 defines **digital strategy** as 'an **organizational strategy** formulated and executed by leveraging **digital resources** to create **differential value**'. That is about direction, not **process diagrams**."
          ]
        }
      ],
      whyExtendedImageRefs: [
        "digital_strategy_model"
      ]
    },
    {
      id: 6,
      type: "single",
      title: "**Governance vs management**",
      points: 1,
      prompt: "What is the difference between **IT governance** and **IT management** according to **Weill & Ross** (2004)?",
      source: "Source: Lecture 11, slide on IT governance (Weill and Ross 2004).",
      options: [
        {
          text: "**IT governance** is about making **IT decisions**; **management** is about implementing them.",
          correct: false,
          why: "**Governance** is NOT about making decisions. **Management** does that.",
          whyExtended: [
            "Lecture 11 says: '**IT governance** is not about making **IT decisions** — **management** does that.'",
            "**Governance** is about who systematically makes and contributes to decisions, not about making the decisions itself.",
            "Confusing **governance** with **decision-making** is a common misunderstanding that the course addresses directly."
          ]
        },
        {
          text: "**IT governance** determines who systematically makes and contributes to **IT decisions**. **Management** makes and executes the decisions.",
          correct: true,
          why: "**IT governance** is not about making decisions. It determines who systematically makes and contributes to them.",
          whyExtended: [
            "**Weill & Ross** (2004): '**IT governance** is not about making **IT decisions** — **management** does that — but rather determines who systematically makes and contributes to those decisions.'",
            "**Governance** defines the structure and rules. **Management** operates within that structure and takes the actual decisions.",
            "This distinction is central because it shows that **governance** is a **meta-level**: it is about designing the **decision system**, not about individual decisions."
          ]
        },
        {
          text: "There is no difference; the terms are used interchangeably.",
          correct: false,
          why: "The course clearly distinguishes them.",
          whyExtended: [
            "Lecture 11 explicitly spends **time** distinguishing **governance** from **management**.",
            "The **CIO toolbox** model has **IT governance** as its own tool (tool 7) with its own purpose and methods."
          ]
        },
        {
          text: "**Governance** is only for private companies; **management** is only for the public sector.",
          correct: false,
          why: "Both apply to all types of organizations.",
          whyExtended: [
            "Lecture 2 shows that **strategy** and **governance** apply to all organization types: private commercial, private non-profit and public.",
            "**Weill & Ross**' **governance** **framework** is developed for use in all organization types."
          ]
        }
      ],
      whyExtendedImageRefs: [
        "decision_rights_matrix"
      ]
    },
    {
      id: 7,
      type: "single",
      title: "**Federal vs IT Duopoly**",
      points: 1,
      prompt: "What distinguishes **Federal** from **IT Duopoly** as a **governance archetype**?",
      source: "Source: Lecture 6, slide 'Summary: Six archetypal approaches to IT decision making'.",
      options: [
        {
          text: "**Federal** includes C-level and all operating groups together with IT; **Duopoly** is IT executives plus a group of business leaders.",
          correct: true,
          why: "**Federal** is broader (all representatives + IT), while **Duopoly** is a two-party approach (IT executives + business leaders).",
          whyExtended: [
            "Lecture 6 defines **Federal** as: 'C-level executives and business representatives of all the operating groups collaborate with the IT department.'",
            "**IT Duopoly** is defined as: 'a two-party **decision-making** approach involves IT executives and a group of business leaders representing the operating units.'",
            "The difference is breadth of involvement: **Federal** includes all levels (C-level + all operating groups + IT). **Duopoly** is a narrower two-party approach."
          ]
        },
        {
          text: "They are identical. Both mean IT alone decides.",
          correct: false,
          why: "That would be **IT Monarchy**.",
          whyExtended: [
            "**IT Monarchy** is the archetype where 'decisions are made by an individual IT executive or a group of IT executives'.",
            "Both **Federal** and **Duopoly** involve the business side in **decision-making**. They are collaborative models, not IT monopoly."
          ]
        },
        {
          text: "**Federal** means each unit decides for itself; **Duopoly** means users decide.",
          correct: false,
          why: "This describes **Feudal** and **Anarchy** respectively.",
          whyExtended: [
            "**Feudal** is the archetype where 'business unit or process leaders make separate decisions on the basis of the unit or process needs'.",
            "**Anarchy** is the archetype where 'each individual user or small group pursues his, her or their own IT agenda'."
          ]
        },
        {
          text: "**Federal** only applies to **IT infrastructure**; **Duopoly** only applies to **IT principles**.",
          correct: false,
          why: "Archetypes can be applied to all five **decision domains** in the **governance matrix**.",
          whyExtended: [
            "The **governance matrix** links archetypes with five **decision domains**: **IT principles**, **IT architecture**, **IT infrastructure**, **business application needs** and **IT investment**.",
            "Any archetype can in principle be used for any domain. An organization might use **Federal** for **IT principles** and **IT Monarchy** for **IT infrastructure**."
          ]
        }
      ],
      whyExtendedImageRefs: [
        "it_governance_matrix"
      ]
    },
    {
      id: 8,
      type: "multi",
      title: "**Five decision domains in IT governance**",
      points: 1,
      prompt: "Mark the correct **decision domains** in **IT governance**.",
      source: "Source: Lecture 6, slide 'Styringsmatrisen' and IT governance summary.",
      options: [
        {
          text: "**IT principles**",
          correct: true,
          why: "One of the five domains.",
          whyExtended: [
            "**IT principles** is about translating **business needs** to the role of IT, **desirable behaviors** and **funding model**.",
            "**IT principles** is the most overarching domain. It sets the frame for the other domains."
          ]
        },
        {
          text: "**IT architecture**",
          correct: true,
          why: "One of the five domains.",
          whyExtended: [
            "**IT architecture** is about **core business processes**, data **integration**, **technology standardization** and **technology choices**.",
            "The **IT architecture** domain connects to the **IT Architecture** tool (tool 4) in the **CIO toolbox**."
          ]
        },
        {
          text: "**IT infrastructure strategies**",
          correct: true,
          why: "One of the five domains.",
          whyExtended: [
            "**IT infrastructure strategies** is about critical services, enterprise-wide implementation, **service levels**, **pricing** and **outsourcing**.",
            "The infrastructure domain is often one of the most centralized. It is often governed by **IT Monarchy**."
          ]
        },
        {
          text: "**Business application needs**",
          correct: true,
          why: "One of the five domains.",
          whyExtended: [
            "**Business application needs** is about **market opportunities**, **strategic experiments** and **architecture standards**.",
            "This domain is often more decentralized because business units have the best knowledge of their own needs."
          ]
        },
        {
          text: "**IT investment and prioritization**",
          correct: true,
          why: "One of the five domains.",
          whyExtended: [
            "**IT investment** is about prioritizing **process changes**, **portfolio distribution** and **business value** of IT projects.",
            "This domain connects directly to the **business case** tool (tool 1) in the **CIO toolbox**."
          ]
        },
        {
          text: "IT marketing and branding",
          correct: false,
          why: "Marketing is not an **IT governance** domain in the **Weill & Ross** **framework**.",
          whyExtended: [
            "The five **decision domains** in **Weill & Ross** are: **IT principles**, **IT architecture**, **IT infrastructure strategies**, **business application needs** and **IT investment**.",
            "The **governance matrix** in Lecture 6 explicitly shows the five domains. IT marketing is not among them."
          ]
        }
      ],
      whyExtendedImageRefs: [
        "Domene_modell_IT_beslutninger_spm"
      ]
    },
    {
      id: 9,
      type: "single",
      title: "**Transformation theory**",
      points: 1,
      moduleId: "designed-for-digital",
      groupId: "overview",
      prompt: "According to **D4D**, **dual transformation** requires three types of transformation. Which one includes **Shared Customer Insights** and **Accountability Framework**?",
      source: "Source: Lecture 13, D4D summary, slide 'Transformation theory'.",
      options: [
        {
          text: "**Business Transformation**",
          correct: false,
          why: "**Business transformation** is about **new value creation** through **digital value propositions**.",
          whyExtended: [
            "Lecture 13 defines **Business Transformation** as '**new value creation** through **digital value propositions**'.",
            "**SCI** and **AF** are **governance mechanisms**, not direct value creation. They belong to **governance transformation**."
          ]
        },
        {
          text: "**Architecture Transformation**",
          correct: false,
          why: "**Architecture transformation** covers **OB**, **DP** and **digital offerings**.",
          whyExtended: [
            "Lecture 13 places **Operational Backbone**, **Digital Platform** and **Digital Offerings** under **Architecture Transformation**.",
            "**SCI** and **AF** are organizational/**governance** capabilities, not **architecture components**."
          ]
        },
        {
          text: "**Governance Transformation**",
          correct: true,
          why: "**Governance transformation** includes **shared customer insight** and **accountability framework**.",
          whyExtended: [
            "Lecture 13 explicitly places **Shared Customer Insight** and **Accountability Framework** under **Governance Transformation**.",
            "**SCI** is about shared organizational learning about customer needs. **AF** is about **distribution of responsibilities**. Both are **governance mechanisms**.",
            "**D4D**'s **dual transformation** distinguishes between architecture (**OB**, **DP**) and **governance** (**SCI**, **AF**)."
          ],
          whyExtendedImageRefs: [
            "D4D-overview"
          ]
        },
        {
          text: "**Cultural Transformation**",
          correct: false,
          why: "**Cultural transformation** is not one of the three named transformations in the **D4D** model.",
          whyExtended: [
            "**D4D**'s **transformation theory** names three types: **Business Transformation**, **Architecture Transformation** and **Governance Transformation**.",
            "Culture matters for **digital transformation**, but **D4D** does not have '**Cultural Transformation**' as a separate category."
          ]
        }
      ]
    },
    {
      id: 10,
      type: "fill",
      title: "**Circular economy**",
      points: 1,
      prompt: "The **circular economy** is about protecting nature and the **environment** by keeping products, resources and materials in ________ as long as possible.",
      answers: ["circulation"],
      answerKey: "circulation",
      source: "Source: Lecture 15, slide 'The circular economy': 'Through keeping products, resources and materials in circulation as long as possible.'",
      whyCorrect: "Correct because **circulation** is the core of the **circular economy** definition, the opposite of **linear** '**use and discard**'.",
      whyWrong: "Wrong if the answer is about 'production' or 'consumption'. The point is that things are kept in **circulation**, not that more is produced.",
      whyExtendedImageRefs: [
        "what_is_circular_economy",
        "circular_economy_loop"
      ]
    },
    {
      id: 11,
      type: "multi",
      title: "**Scope 1, 2 and 3**",
      points: 1,
      prompt: "Mark the correct assignments of **Scope categories**.",
      source: "Source: Lecture 15, slide 'Scope 1, 2 and 3'.",
      options: [
        {
          text: "**Scope 1**: **direct emissions** from sources **owned or controlled** by the company",
          correct: true,
          why: "This is the definition of **Scope 1**.",
          whyExtended: [
            "**Scope 1** includes **emissions** from the company's own **facilities**, **vehicles** and **processes**.",
            "These are the **emissions** the company has the most direct control over."
          ]
        },
        {
          text: "**Scope 2**: **indirect emissions** from **purchased electricity**, steam, heat and cooling",
          correct: true,
          why: "This is the definition of **Scope 2**.",
          whyExtended: [
            "**Scope 2** is indirect because the **emissions** occur at the **energy supplier**, but they are caused by the company's **energy consumption**.",
            "The company can influence **Scope 2** through choice of **energy supplier** and **energy efficiency**."
          ]
        },
        {
          text: "**Scope 3**: all other **emissions** related to the company's activities",
          correct: true,
          why: "**Scope 3** covers the entire **value chain**.",
          whyExtended: [
            "**Scope 3** covers the entire **value chain**, both upstream (**suppliers**, **procurement**, **transport**) and downstream (use of products, **waste management**).",
            "**Scope 3** is typically the largest **emission category** for most companies, but also the hardest to measure and control."
          ]
        },
        {
          text: "**Scope 2**: **direct emissions** from the company's own factories",
          correct: false,
          why: "Own factories are **Scope 1**. **Scope 2** is about purchased energy.",
          whyExtended: [
            "**Direct emissions** from own factories are **Scope 1**: '**direct emissions** from sources **owned or controlled** by a company'.",
            "The difference: **Scope 1** = **emissions** that physically occur at the company's own **facilities**. **Scope 2** = **emissions** at the **energy supplier** caused by the company's **energy consumption**."
          ]
        }
      ],
      whyExtendedImageRefs: [
        "scope_1_2_3_model",
        "scope_1_2_3"
      ]
    },
    {
      id: 12,
      type: "single",
      title: "**Twin transitions**",
      points: 1,
      prompt: "What is meant by '**twin transitions**'?",
      source: "Source: Lecture 15, slide 'Twin transitions / tvilling-transformasjon'.",
      options: [
        {
          text: "Linking **digital transformation** and **sustainability transition**",
          correct: true,
          why: "**Twin transitions** links **digital transformation** and **sustainability transition**.",
          whyExtended: [
            "Lecture 15 presents **twin transitions** as the connection between **Digital Transformation** and **Sustainability Transition**.",
            "'The sweet spot' is where **digital technology** reinforces **sustainability**: '**Greening OF and BY IT & Data**'.",
            "The **twin transitions** perspective is central because it shows that **digital transformation** and **sustainability** cannot be seen in isolation."
          ]
        },
        {
          text: "Transition from **project to product team**, and from **waterfall** to **agile**",
          correct: false,
          why: "This is an organizational change, not **twin transitions**.",
          whyExtended: [
            "The project-to-product transition is discussed in Lecture 4 under the **CIO toolbox** (tools 5 and 6), not in the **sustainability** lecture.",
            "**Twin transitions** is about the interplay between **digitalization** and **sustainability** at a societal level."
          ]
        },
        {
          text: "Transition from **Scope 1 to Scope 3** **reporting**",
          correct: false,
          why: "This is about **reporting** **scope**, not the concept of **twin transitions**.",
          whyExtended: [
            "**Scope 1, 2 and 3** are categories within **sustainability reporting**. They describe different **emission types**, not a transformation.",
            "**Twin transitions** is about two simultaneous transformation **processes** (digital + **sustainability**), not about changes in **reporting** **scope**."
          ]
        },
        {
          text: "Transition from **business monarchy** to **anarchy**",
          correct: false,
          why: "These are **governance archetypes**, not **twin transitions**.",
          whyExtended: [
            "**Business monarchy** and **anarchy** are two of six **governance archetypes** in **Weill & Ross**' **framework** from Lecture 6.",
            "**Twin transitions** is about **digital transformation** + **sustainability transition**. Two macro-trends affecting society."
          ]
        }
      ],
      whyExtendedImageRefs: [
        "twin_transitions"
      ]
    },
    {
      id: 13,
      type: "single",
      title: "**Double Diamond**",
      points: 1,
      prompt: "What are the four phases of the **Double Diamond** model?",
      source: "Source: Lecture 3-4, Design thinking, CIO toolbox model.",
      options: [
        {
          text: "Plan → Build → Test → Deploy",
          correct: false,
          why: "This resembles a traditional system development lifecycle.",
          whyExtended: [
            "Plan-Build-Test-Deploy is a **linear** development model that resembles the **waterfall** approach.",
            "**Double Diamond** is explorative and iterative. It is about first exploring the problem, then exploring the solution."
          ]
        },
        {
          text: "**Discover → Define → Develop → Deliver**",
          correct: true,
          why: "These are the four phases of the **Double Diamond**.",
          whyExtended: [
            "The first diamond (**Discover** → **Define**) is about understanding and defining the problem through **user insight** and exploration.",
            "The second diamond (**Develop** → **Deliver**) is about developing and delivering the solution through **prototyping** and testing.",
            "Key practices include **problem-reframing**, **user insight**, **co-design**, **prototyping** and **small-scale testing**."
          ]
        },
        {
          text: "Analyze → Design → Implement → Evaluate",
          correct: false,
          why: "This is a generic process description, not the **Double Diamond**.",
          whyExtended: [
            "**Double Diamond**'s strength is the double expand-narrow structure: first explore broadly, then focus. Twice.",
            "The generic alternative **analysis** process in the **CIO toolbox** has three steps: Understand → Synthesize → Evaluate. That is not **Double Diamond** either."
          ]
        },
        {
          text: "Sprint Planning → Daily Standup → Review → Retrospective",
          correct: false,
          why: "These are **Scrum** ceremonies, not the **Double Diamond**.",
          whyExtended: [
            "**Scrum** is an **agile** **framework** belonging to tool 6 (**Product teams** and **agile** methods) in the **CIO toolbox**.",
            "**Double Diamond** belongs to design thinking (tool 3) and is about exploring the problem space, not sprint-based development."
          ]
        }
      ],
      whyExtendedImageRefs: [
        "double_diamond_model"
      ]
    },
    {
      id: 14,
      type: "fill",
      title: "**Triple constraint**",
      points: 1,
      prompt: "Projects where **scope**, **time** and ________ are all fixed are particularly vulnerable to disappointment.",
      answers: ["cost", "budget"],
      answerKey: "cost",
      source: "Source: Lecture 4, slide 'The triple constraint': 'Projects with fixed cost, scope and time are particularly vulnerable to disappointment.'",
      whyCorrect: "Correct because the **triple constraint** consists of **scope**, **time** and **cost**. All three fixed = **high risk**.",
      whyWrong: "Wrong if the answer points to quality, risk or resources. The model in the lecture explicitly uses **scope**, **time** and **cost**.",
      whyExtendedImageRefs: [
        "Triple-Constraint-Explained-1080x1080-1",
        "triple_constraint_1"
      ]
    },
    {
      id: 15,
      type: "single",
      title: "**TOGAF architecture taxonomy**",
      points: 1,
      prompt: "Which **TOGAF** architecture layer describes the structure of an organization's **logical and physical data assets** and **data management resources**?",
      source: "Source: Lecture 5, slide 'Architecture taxonomy (according to TOGAF)'.",
      options: [
        {
          text: "**Business Architecture**",
          correct: false,
          why: "**Business architecture** defines business **strategy**, **governance**, organization and key **processes**.",
          whyExtended: [
            "Lecture 5 defines **Business Architecture** as: 'defines the business **strategy**, **governance**, organization, and key **business processes**'.",
            "In **TOGAF**'s **ADM**, **Business Architecture** is step B, while Data/**Application Architecture** is step C."
          ]
        },
        {
          text: "**Data Architecture**",
          correct: true,
          why: "**Data architecture** describes the structure of **logical and physical data assets** and **data management resources**.",
          whyExtended: [
            "Lecture 5 defines **Data Architecture** as: 'describes the structure of an organization's **logical and physical data assets** and **data management resources**'.",
            "In the **D4D** context, data is a central part of **Operational Backbone**. '**Provide reliable and accessible master data**' is an **OB** function."
          ]
        },
        {
          text: "**Application Architecture**",
          correct: false,
          why: "**Application architecture** provides a blueprint for applications and their relationships to **business processes**.",
          whyExtended: [
            "Lecture 5 defines **Application Architecture** as: 'provides a blueprint for the individual applications to be deployed, their interactions, and their relationships to the **core business processes**'.",
            "The difference: **Data Architecture** = data structures and **management**. **Application Architecture** = **application landscape** and relationships."
          ]
        },
        {
          text: "**Technology Architecture**",
          correct: false,
          why: "**Technology architecture** describes logical software and hardware capabilities.",
          whyExtended: [
            "**Technology Architecture** is about infrastructure, middleware, networking, communication and standards.",
            "In **TOGAF**'s **ADM**, **Technology Architecture** is step D. It builds on the other layers."
          ]
        }
      ],
      whyExtendedImageRefs: [
        "togaf_arkitekturtaksonomi"
      ]
    },
    {
      id: 16,
      type: "multi",
      title: "**Autonomy & Alignment in AF**",
      points: 1,
      moduleId: "designed-for-digital",
      groupId: "accountability-framework",
      prompt: "Mark statements that fit with **Accountability Framework** thinking.",
      source: "Source: Lecture 11, slides 'AF promotes Autonomy AND alignment'.",
      options: [
        {
          text: "**Component owners**, not **project managers**. **Responsible problem solvers**",
          correct: true,
          why: "**AF** replaces project manager logic with **component ownership**.",
          whyExtended: [
            "Lecture 11 says: '**Component owners** not **project managers** — **responsible problem solvers**'.",
            "**Component owners** have long-term responsibility for their components. They know them best and are best positioned to make decisions.",
            "The course summary describes this as 'tighter relation between **decision making** and decision impact'."
          ],
          whyExtendedImageRefs: [
            "AF"
          ]
        },
        {
          text: "**Metrics, not directives**. **Data driven**",
          correct: true,
          why: "Goal **management** rather than detailed directives.",
          whyExtended: [
            "Lecture 11 says: '**Metrics, not directives** — **data driven**'.",
            "**AF** replaces top-down directives with measurable results that teams work toward themselves.",
            "Data-driven **management** gives teams **autonomy** in how they achieve goals, while **alignment** is ensured through shared objectives."
          ],
          whyExtendedImageRefs: [
            "AF"
          ]
        },
        {
          text: "**Trust, not control**",
          correct: true,
          why: "**Trust, not control** is explicitly from the lecture.",
          whyExtended: [
            "Lecture 11 says: '**Trust, not control**'.",
            "Trust is a prerequisite for **autonomy**. Without trust you cannot give teams freedom to make their own decisions.",
            "The course summary describes **AF** as 'enabling creativity while avoiding chaos'. Trust is balanced with **alignment** mechanisms."
          ],
          whyExtendedImageRefs: [
            "AF"
          ]
        },
        {
          text: "All decisions should be centralized with one person for efficiency",
          correct: false,
          why: "**AF** is about distributing responsibility and providing **autonomy** within **alignment**.",
          whyExtended: [
            "**AF** is defined as '**distribution of responsibilities** for **digital offerings** and components that balances **autonomy** and **alignment**'. **Distribution**, not **centralization**.",
            "Lecture 11 says: 'traditional hierarchical organization can generate business efficiencies, but does not foster innovativeness'.",
            "**Centralization** with one person would undermine **AF** principles of **empowered teams**, **modular architecture** and **knowledge sharing**."
          ]
        }
      ]
    },
    {
      id: 17,
      type: "single",
      title: "**Risk in digital transformation**",
      points: 1,
      prompt: "According to **D4D**, what is one of the main risks of **digital transformation**?",
      source: "Source: Lecture 13, slide 'Risks of digital transformation'.",
      options: [
        {
          text: "That the organization spreads resources across too many **building blocks** without real progress on any of them",
          correct: true,
          why: "This is risk (1) in the **D4D summary**.",
          whyExtended: [
            "The course summary lists two risks: '1. dividing resources across so many **building blocks** that none gets real progress'.",
            "The **D4D roadmap** addresses this by recommending a prioritized sequence: fix backbone first, then **DP**, then **AF**, and do not rush **ExDP**.",
            "The second risk is: '2. becoming too focused on one **building block** for too long, failing to **develop** the others'."
          ]
        },
        {
          text: "That the organization has too good an **Operational Backbone**",
          correct: false,
          why: "A strong **OB** is an advantage, not a risk.",
          whyExtended: [
            "A strong **OB** is a prerequisite for digital success. Lecture 10 says 'An **Operational Backbone** is Not Enough for Digital Success', but that does not make it a risk.",
            "The **D4D roadmap** starts with '**fix the backbone**'. A good **OB** is step 1, not a risk."
          ]
        },
        {
          text: "That the organization uses too many **agile** teams",
          correct: false,
          why: "This is not one of the two named risks in **D4D**.",
          whyExtended: [
            "**D4D** names two specific risks: (1) spreading resources too thin, and (2) focusing too narrowly for too long.",
            "**AF** promotes autonomous, fully resourced teams. It would be inconsistent to call that a risk."
          ]
        },
        {
          text: "That the organization has too clear a **digital vision**",
          correct: false,
          why: "A clear vision is recommended as positive in **D4D**.",
          whyExtended: [
            "The **D4D** to-do list says: '**communicate the vision** and the journey'. Vision is a positive.",
            "A clear vision provides direction and motivation. It is the absence of vision that is problematic."
          ]
        }
      ],
      whyExtendedImageRefs: [
        "D4D-overview"
      ]
    },
    {
      id: 18,
      type: "fill",
      title: "**Operational effectiveness**",
      points: 1,
      prompt: "**Operational effectiveness** is necessary but not ________ to achieve **sustainable competitive advantage**.",
      answers: ["sufficient", "enough"],
      answerKey: "sufficient",
      source: "Source: Lecture 2, slide 16: 'Operational effectiveness is necessary, but not sufficient to achieve sustainable competitive advantage.'",
      whyCorrect: "Correct because the Porter lecture says OE is necessary but not **sufficient**. **Strategy** requires **trade-offs** and **unique positioning**.",
      whyWrong: "Wrong if the answer suggests OE is completely unnecessary or that OE alone is **strategy**.",
      whyExtendedImageRefs: [
        "digital_strategy_model"
      ]
    },
    {
      id: 19,
      type: "single",
      title: "**Digital platform components**",
      points: 1,
      moduleId: "designed-for-digital",
      groupId: "digital-platform",
      prompt: "Which type of component in the **Digital Platform** provides access to data from various sources through **APIs**?",
      source: "Source: Lecture 10, slide 'Digital platform'.",
      options: [
        {
          text: "**Infrastructure components**",
          correct: false,
          why: "**Infrastructure components** are core services like authentication and access control.",
          whyExtended: [
            "**Infrastructure components** provide the technical foundation that other components build on, but they do not provide direct data access.",
            "Lecture 10 shows that **Digital Platform** has four types of components. **Infrastructure components** is one of them."
          ]
        },
        {
          text: "**Data components**",
          correct: true,
          why: "**Data components** provide data from various sources and access to them through **APIs**.",
          whyExtended: [
            "**Data components** are central in **DP** because they enable reuse of data across **digital offerings**.",
            "In the **D4D** context, **data components** connect to **OB**'s function of '**provide reliable and accessible master data**'. **DP** exposes this data.",
            "**API access** to data is a prerequisite for **rapid configuration** of new **digital offerings**."
          ],
          whyExtendedImageRefs: [
            "DP"
          ]
        },
        {
          text: "**Business components**",
          correct: false,
          why: "**Business components** are dashboards, customer notifications and similar.",
          whyExtended: [
            "**Business components** are higher-level components like dashboards, customer alerts and other business functions.",
            "The difference: **data components** = raw data access via API. **Business components** = pre-packaged business functions."
          ]
        },
        {
          text: "**Cloud services**",
          correct: false,
          why: "**Cloud services** are about hosting and performance **management**.",
          whyExtended: [
            "**Cloud services** provide the underlying platform that other components run on.",
            "Data access through **APIs** is specifically the role of **data components**, not **cloud services**."
          ]
        }
      ]
    },
    {
      id: 20,
      type: "multi",
      title: "**Digital roadmap sequence**",
      points: 1,
      moduleId: "designed-for-digital",
      groupId: "overview",
      prompt: "Mark statements that match **D4D**'s recommended sequence for **digital transformation**.",
      source: "Source: Lecture 13, D4D summary, slides on digital roadmap.",
      options: [
        {
          text: "**Fix the backbone** first",
          correct: true,
          why: "**OB** is the foundation that must be in place.",
          whyExtended: [
            "The **D4D roadmap** says: 'fix backbone. You need to have a proper structure on the data, **processes** and applications'.",
            "44% of executives identify **OB** as the biggest obstacle to **digital transformation**. That underscores the importance of fixing it first."
          ],
          whyExtendedImageRefs: [
            "D4D-overview"
          ]
        },
        {
          text: "**Don't postpone Digital Platform** for too long. Connect the modules",
          correct: true,
          why: "**DP** should come early after **OB**.",
          whyExtended: [
            "The **D4D roadmap** says: 'don't put off **DP** for long. Connect the modules'.",
            "Lecture 10 emphasizes that 'An **Operational Backbone** is Not Enough for Digital Success'. **DP** is necessary in addition."
          ],
          whyExtendedImageRefs: [
            "D4D-overview"
          ]
        },
        {
          text: "**Don't rush into an External Developer Platform**",
          correct: true,
          why: "**ExDP** requires mature internal capabilities first.",
          whyExtended: [
            "Lecture 12 specifies that **ExDP** requires 'a very well designed and managed internal platform'. It presupposes mature **OB** and **DP**.",
            "Opening an immature platform to **external developers** would create problems with quality, security and reliability."
          ],
          whyExtendedImageRefs: [
            "D4D-overview"
          ]
        },
        {
          text: "Start with **ExDP** before you have an **operational backbone**",
          correct: false,
          why: "The **roadmap** says 'don't rush into an **ExDP**'. **OB** and **DP** must come first.",
          whyExtended: [
            "The **D4D roadmap** says the opposite: 'fix backbone' first, then **DP**, and finally 'don't rush into an **ExDP**'.",
            "Lecture 12 shows that **ExDP** 'creates pressure on **OB** and **DP**'. That reinforces the need for internal **building blocks** to be in place."
          ]
        }
      ]
    },
    {
      id: 21,
      type: "single",
      title: "**Boundary resources**",
      points: 1,
      moduleId: "designed-for-digital",
      groupId: "external-developer-platform",
      prompt: "What are **boundary resources** in the context of **External Developer Platform**?",
      source: "Source: Lecture 12, External Development Platform.",
      options: [
        {
          text: "Internal HR documents shared with partners",
          correct: false,
          why: "**Boundary resources** are **technical interfaces**, not HR documents.",
          whyExtended: [
            "**Boundary resources** are **technical mechanisms** that enable interaction between **platform owner** and **external developers**.",
            "The course summary says **ExDP** requires 'some sort of API or similar that provides a structured access to core components (**boundary resources**)'."
          ]
        },
        {
          text: "**APIs**, **documentation** and tools that let **external parties** build on the platform",
          correct: true,
          why: "**Boundary resources** provide structured access to core components for **external parties**.",
          whyExtended: [
            "**Boundary resources** include **APIs** (for data access), **documentation** (for understanding the platform) and **developer tools** (for building on the platform).",
            "Lecture 12 shows two types of **ExDP**: one where partners use internal components (like **Google Maps API**), and one that creates a marketplace (like **Apple App Store**). Both require **boundary resources**.",
            "Without **boundary resources**, **external parties** have no structured way to interact with the platform."
          ],
          whyExtendedImageRefs: [
            "ExDP"
          ]
        },
        {
          text: "Physical offices where partners can work",
          correct: false,
          why: "**Boundary resources** are digital, not physical.",
          whyExtended: [
            "**Boundary resources** are **digital interfaces**: **APIs**, **SDKs**, **documentation**. Not physical **facilities**.",
            "**ExDP** is about opening digital components to **external parties** through **technical mechanisms**."
          ]
        },
        {
          text: "Project plans shared with subcontractors",
          correct: false,
          why: "This is project **documentation**, not platform **boundary resources**.",
          whyExtended: [
            "Project plans belong to **project management** (tool 5 in the **CIO toolbox**), not **platform strategy**.",
            "**ExDP** is about lasting **platform access** for **external developers**, not temporary project collaboration."
          ]
        }
      ]
    },
    {
      id: 22,
      type: "single",
      title: "**Double materiality**",
      points: 1,
      prompt: "What does '**double materiality**' mean in **sustainability reporting**?",
      source: "Source: Lecture 15, slide 'Double materiality (dobbel vesentlighet)'.",
      options: [
        {
          text: "That the organization must report both revenues and expenses",
          correct: false,
          why: "That is ordinary financial **reporting**, not **double materiality**.",
          whyExtended: [
            "Revenue and expense **reporting** is standard accounting that applies to all companies regardless of **sustainability**.",
            "**Double materiality** is about **sustainability** impact in two directions, not about financial **transactions**."
          ]
        },
        {
          text: "That **reporting** must consider both how the business impacts the world, and how **sustainability** impacts the business",
          correct: true,
          why: "This is the core of **double materiality**. Impact both ways.",
          whyExtended: [
            "Lecture 15 presents **double materiality** as two dimensions: '**Financial materiality**' (impact ON the company) and '**Impact materiality**' (impact FROM the company).",
            "**Financial materiality** asks: how do **climate**, **environment** and **people** affect the company's value? **Impact materiality** asks: how does the company affect **climate**, **environment** and **people**?",
            "**Corporate Sustainability Reporting Directive** (**CSRD**) requires **reporting** on both dimensions."
          ]
        },
        {
          text: "That one must use two different accounting standards",
          correct: false,
          why: "**Double materiality** is about perspective, not accounting standards.",
          whyExtended: [
            "**Double materiality** is about seeing impact in two directions (to and from the company), not about using two standards.",
            "**CSRD** integrates both perspectives in one **reporting** requirement."
          ]
        },
        {
          text: "That **sustainability** only concerns physical materials",
          correct: false,
          why: "**Materiality** in this context means **significance**, not physical materials.",
          whyExtended: [
            "'**Materiality**' in **reporting** context means '**significance**'. What is important enough to report on.",
            "**Sustainability** covers three dimensions: economic, social and environmental. It is far broader than physical materials."
          ]
        }
      ],
      whyExtendedImageRefs: [
        "double_materiality"
      ]
    },
    {
      id: 23,
      type: "fill",
      title: "**Cynefin** chaotic",
      points: 1,
      prompt: "In the **Cynefin framework**, a **chaotic situation** typically requires ________ action to move to a more stable state.",
      answers: ["immediate", "instant"],
      answerKey: "immediate",
      source: "Source: Lecture 4, slide on Cynefin: 'In a chaotic situation, there is typically an emergency which requires immediate action to move into a more stable state.'",
      whyCorrect: "Correct because the **chaotic domain** is characterized by emergencies where **immediate action** is needed.",
      whyWrong: "Wrong if the answer mentions '**analysis**' or '**experimentation**'. In chaos it is too late for thorough **analysis**. Stabilization comes first.",
      whyExtendedImageRefs: [
        "cynefin_theory_of_everything"
      ]
    },
    {
      id: 24,
      type: "multi",
      title: "**What OB does**",
      points: 1,
      moduleId: "designed-for-digital",
      groupId: "operational-backbone",
      prompt: "Mark functions that belong to the **Operational Backbone**.",
      source: "Source: Lecture 9, Operational Backbone, and the IN5431 summary.",
      options: [
        {
          text: "**Support seamless end-to-end transaction processing**",
          correct: true,
          why: "This is a core function of **OB**.",
          whyExtended: [
            "Lecture 9 lists 'Supports seamless **end-to-end transaction processing**' as the first **OB** function.",
            "This requires **integrated systems** and **standardized processes**. That is the core of the **OB** definition."
          ],
          whyExtendedImageRefs: [
            "OB"
          ]
        },
        {
          text: "**Provide reliable and accessible master data**",
          correct: true,
          why: "Reliable core data is central.",
          whyExtended: [
            "Lecture 9 lists 'Provides reliable, and accessible **master data**' as a central **OB** function.",
            "Reliable **master data** is a prerequisite for **Digital Platform**. **Data components** in **DP** build on data from **OB**."
          ],
          whyExtendedImageRefs: [
            "OB"
          ]
        },
        {
          text: "**Automate repetitive processes**",
          correct: true,
          why: "Automation of repetitive work is an **OB** function.",
          whyExtended: [
            "Lecture 9 lists '**Automate repetitive processes**' as an **OB** function.",
            "The course summary describes **OB** as 'the essence of **digitization**: produce an **OB** that replaces individual heroes with digitized **processes**'."
          ],
          whyExtendedImageRefs: [
            "OB"
          ]
        },
        {
          text: "Replace all manual **decision-making** with **AI**",
          correct: false,
          why: "**OB** is about **standardization** and **integration**, not about removing all human judgment.",
          whyExtended: [
            "**OB** is about 'eliminate or reduce **non-value-adding variability**'. It is variability that is reduced, not **decision-making** in general.",
            "**OB** gives '**visibility into transactions** and other core **processes**'. Visibility that supports human decisions, not replaces them."
          ]
        }
      ]
    },
    {
      id: 25,
      type: "single",
      title: "**Management fashion**",
      points: 1,
      prompt: "What is meant by '**management fashion**' in the lecture?",
      source: "Source: Lecture 4 / CIO toolbox model / IN5431 summary.",
      options: [
        {
          text: "A **framework** that has reached a **critical mass** and become an **intersubjective phenomenon**",
          correct: true,
          why: "**Management fashion** means a **framework** has become popular enough to become a 'fashion' in organizations.",
          whyExtended: [
            "**Management fashion** describes the phenomenon where a **management idea** spreads broadly and becomes a kind of 'trend'.",
            "The **CIO toolbox** model warns that popularity is not the same as universal validity: 'their usefulness and value is highly **context-sensitive** — and sometimes disputed'.",
            "The point is that leaders should evaluate **frameworks** critically in their context, not just adopt them because they are popular."
          ]
        },
        {
          text: "A **framework** that is scientifically proven as the best for all contexts",
          correct: false,
          why: "The lecture emphasizes that **frameworks** are **context-dependent** and sometimes disputed.",
          whyExtended: [
            "Lecture 6 says: 'their usefulness and value is highly **context-sensitive** — and sometimes disputed'.",
            "The **CIO toolbox** model starts with '**Read the room**'. There is no single **framework** that is best for all contexts."
          ]
        },
        {
          text: "A method for designing clothing in the IT industry",
          correct: false,
          why: "Fashion is used here about the popularity/spread of **management ideas**, not clothing fashion.",
          whyExtended: [
            "'Fashion' in **management fashion** is a metaphor for trends and popularity within **management** thinking.",
            "Examples of **management** fashions include **agile**, design thinking, lean. Ideas that have been broadly adopted."
          ]
        },
        {
          text: "A synonym for **IT governance**",
          correct: false,
          why: "**Management fashion** and **IT governance** are entirely different concepts.",
          whyExtended: [
            "**IT governance** is tool 7 in the **CIO toolbox**. It is about decision rights and accountability.",
            "**Management fashion** is a meta-concept about the spread and popularity of **management ideas**. It is not a **governance** tool."
          ]
        }
      ],
      whyExtendedImageRefs: [
        "cynefin_theory_of_everything"
      ]
    }
  ]
};

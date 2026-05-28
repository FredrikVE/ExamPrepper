//src/data/exams/mockExam4_en.js
export const mockExam4_en = {
  id: "mock-exam-4-en",
  subjectId: "in5431",
  baseId: "mock-exam-4",
  lang: "en",
  title: "Practice Exam 4: The CIO Toolbox",
  description: "Business case, alternative analysis, design thinking, IT architecture, projects, product teams, IT governance and Cynefin.",
  questions: [
    {
      id: 1,
      type: "single",
      title: "CIO Toolbox overview",
      points: 1,
      prompt: "What is the main message behind the 'toolbox' metaphor in the CIO toolbox?",
      source: "Source: Lecture 3, CIO Toolbox 1, introductory slide and CIO toolbox model.",
      options: [
        {
          text: "Tools are not goals in themselves — they are only meaningful if they serve their purpose",
          correct: true,
          why: "Correct: the CIO toolbox model explicitly states this as the guiding principle.",
          whyExtended: [
            "The CIO toolbox model opens with: 'Tools are not goals in themselves — they are only meaningful if they serve their purpose.'",
            "The toolbox metaphor emphasizes choosing the right tool depending on the decision — just like a craftsman picks the right tool for the job.",
            "Lecture 6 reinforces this: 'For these (and similar) frameworks and methods, their usefulness and value is highly context-sensitive — and sometimes disputed.'",
            "The three-step approach is: (1) Read the room, (2) Choose the right tool, (3) You cannot lead by theory."
          ]
        },
        {
          text: "Every organization must always use all seven tools simultaneously",
          correct: false,
          why: "Wrong: the toolbox is used selectively depending on the situation and decision.",
          whyExtended: [
            "The CIO toolbox model states: 'We use the term «CIO toolbox» informally and also subjectively. Although many CIOs use many of these tools, few will use them all.'",
            "The toolbox metaphor means you select the appropriate tool — using all tools at once would be impractical and unnecessary.",
            "Different situations require different tools: a known problem may need a business case, while an unclear problem calls for design thinking.",
            "The Cynefin meta-tool is specifically designed to help choose the right management approach based on context."
          ]
        },
        {
          text: "The toolbox replaces the need for leadership experience and judgment",
          correct: false,
          why: "Wrong: the CIO toolbox model explicitly states that leadership requires dialogue, judgment and learning.",
          whyExtended: [
            "Step 3 in the CIO toolbox model states: 'You cannot lead by theory: frameworks help, but leadership requires dialogue, judgement and learning.'",
            "Frameworks structure decision-making but cannot substitute for contextual understanding and interpersonal skills.",
            "Lecture 3 notes: 'No standard way of making choices' — there is always a human element in decision-making.",
            "The model emphasizes 'Read the room' as the first step, requiring judgment about purpose, strategy, resources, maturity and context."
          ]
        },
        {
          text: "The toolbox only applies to IT departments, not to business leaders",
          correct: false,
          why: "Wrong: the CIO toolbox addresses the intersection of business and IT leadership.",
          whyExtended: [
            "IT governance explicitly involves business leaders through archetypes like Business Monarchy and Federal system.",
            "The business case tool is about prioritizing digital services and funding — a business decision, not purely an IT decision.",
            "The operating model concept links business process integration and standardization to IT architecture — bridging business and IT.",
            "The course is about IT management challenges and strategies at the organizational level, not just within IT departments."
          ]
        }
      ]
    },
    {
      id: 2,
      type: "multi",
      title: "Business case components",
      points: 1,
      prompt: "Mark the correct statements about the business case tool in the CIO toolbox.",
      source: "Source: Lecture 3, CIO Toolbox 1, slides on utility maximisation and applying NPV.",
      options: [
        {
          text: "For each option, you should analyse expected benefit, cost, timing and risk.",
          correct: true,
          why: "Correct: these are the four factors in utility maximisation.",
          whyExtended: [
            "Lecture 3 presents utility maximisation with four factors: '(a) the expected benefit, (b) the expected cost, (c) the timing, (d) the estimated risk.'",
            "The CIO toolbox model lists these under 'Rational choices & utility maximisation' for the business case tool.",
            "Each factor addresses a different dimension: benefit is what you gain, cost is what you invest, timing is when you gain, and risk is the probability that estimates are wrong.",
            "For non-trivial initiatives, setting these values correctly is impossible — they are always estimates."
          ]
        },
        {
          text: "NPV has a strong communicative effect beyond its numerical accuracy.",
          correct: true,
          why: "Correct: the lecture explicitly highlights the communicative role of business cases.",
          whyExtended: [
            "Lecture 3 states: 'NPV has a strong communicative effect. In a decision process, NPV is often presented together with a set of non-quantifiable benefits.'",
            "The CIO toolbox model lists 'Communicative effect — Business case as communication and transparency tool, not just calculation' as a key aspect.",
            "Even when NPV estimates are imprecise, the structured format creates transparency about assumptions, making disagreements visible.",
            "This means a business case serves dual purposes: analytical (comparing options) and communicative (building shared understanding)."
          ]
        },
        {
          text: "A business case can always give a perfectly accurate prediction of outcomes.",
          correct: false,
          why: "Wrong: the lecture emphasizes that estimates are always uncertain, especially for non-trivial initiatives.",
          whyExtended: [
            "Lecture 3 explicitly states: 'For any non-trivial development initiative, setting these values correctly is impossible — they are estimates.'",
            "Benefits may be 'hard or impossible to estimate numerically — in particular if they are related to safety or security.'",
            "Lecture 3 also notes that there are 'no completely rational actors' — decisions are 'blurred by both individual's emotions and the cultural context of the organization.'",
            "The risk premium in NPV calculations is itself an estimate — the business case is a structured approximation, not a precise prediction."
          ]
        },
        {
          text: "Qualitative benefits like compliance and security should also be considered alongside NPV.",
          correct: true,
          why: "Correct: the CIO toolbox model explicitly includes non-quantifiable benefits.",
          whyExtended: [
            "The CIO toolbox model lists 'Qualitative considerations — Non-quantifiable benefits: compliance, security, safety' as part of the business case tool.",
            "Lecture 3 says NPV is 'often presented together with a set of non-quantifiable benefits for each of the options.'",
            "Some of the most important benefits (regulatory compliance, security improvements, safety) cannot be expressed as cash flows.",
            "A complete business case therefore combines quantitative NPV with qualitative assessment — pure numbers alone are insufficient."
          ]
        }
      ]
    },
    {
      id: 3,
      type: "fill",
      title: "NPV formula",
      points: 1,
      prompt: "In a business case, the ________ rate is used to account for the risk that future cash flows may not materialize as expected.",
      answers: ["discount", "discounting", "risk premium", "risiko"],
      answerKey: "discount (rate) / risk premium",
      source: "Source: Lecture 3, CIO Toolbox 1, slides on the financial business case and NPV.",
      whyCorrect: "Correct because the discount rate (which includes a risk premium) reduces the present value of future cash flows to reflect uncertainty. Higher risk means a higher discount rate, which lowers the NPV.",
      whyWrong: "Wrong if the answer refers to interest rate alone without the risk dimension, or to concepts like conversion rate, which is a specific business metric rather than the general financial adjustment mechanism."
    },
    {
      id: 4,
      type: "single",
      title: "Alternative analysis process",
      points: 1,
      moduleId: "cio-tool-box",
      groupId: "decision-making",
      prompt: "What is the correct order of steps in the generic decision-making process (alternative analysis)?",
      source: "Source: Lecture 3, CIO Toolbox 1, slide on generic decision making process.",
      options: [
        {
          text: "1. Understand the situation, 2. Synthesize options, 3. Evaluate and propose",
          correct: true,
          why: "Correct: these are the three steps in the generic decision-making process.",
          whyExtended: [
            "The CIO toolbox model describes the three steps: (1) Understand the situation (root-cause analysis), (2) Synthesize options (concepts), (3) Evaluate and propose.",
            "Step 1 focuses on understanding the 'whys' — internal competency, technical assets, cultural factors.",
            "Step 2 is about presenting alternative actions as 'concepts' — an internally consistent set of work. The goal is to ensure all relevant options are considered.",
            "Step 3 uses evaluation methods including business case (tool 1), plus/minus method, cost ranking, and real options."
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
          text: "1. Evaluate and propose, 2. Understand the situation, 3. Synthesize options",
          correct: false,
          why: "Wrong: you cannot evaluate before understanding the situation and generating options.",
          whyExtended: [
            "Evaluation requires alternatives to compare — you need to understand the problem and generate options first.",
            "Starting with evaluation would mean judging solutions without knowing what problem you are solving.",
            "The lecture places root-cause analysis first precisely because understanding the situation shapes which options are relevant.",
            "The generic process follows a logical sequence: diagnose → generate → evaluate."
          ]
        },
        {
          text: "1. Synthesize options, 2. Evaluate and propose, 3. Understand the situation",
          correct: false,
          why: "Wrong: generating options before understanding the situation leads to solving the wrong problem.",
          whyExtended: [
            "Design thinking's 'Discover' phase makes the same point: you must understand the problem before generating solutions.",
            "Without understanding the situation first, synthesized options may address symptoms rather than root causes.",
            "The CIO toolbox model places 'Understand the situation (root-cause analysis)' as step 1 for a reason — it anchors the entire process.",
            "Understanding the situation after evaluating would make the evaluation meaningless — you wouldn't know what criteria matter."
          ]
        },
        {
          text: "1. Implement the cheapest option, 2. Analyse results, 3. Try the next option",
          correct: false,
          why: "Wrong: this describes trial-and-error, not structured alternative analysis.",
          whyExtended: [
            "Alternative analysis is a structured, analytical approach — not random experimentation.",
            "Choosing the cheapest option ignores the business case logic of weighing benefit, cost, timing and risk together.",
            "The generic process requires evaluation of all relevant options before making a recommendation.",
            "Trial-and-error may fit in Cynefin's complex domain (probe-sense-respond), but alternative analysis is designed for the complicated domain."
          ]
        }
      ]
    },
    {
      id: 5,
      type: "single",
      title: "Business case vs alternative analysis",
      points: 1,
      prompt: "How are business case (tool 1) and alternative analysis (tool 2) related?",
      source: "Source: Lecture 3, CIO toolbox model, note between tool 1 and tool 2.",
      options: [
        {
          text: "Business case is one evaluation method inside alternative analysis (step 3); they are separate tools but tightly connected",
          correct: true,
          why: "Correct: the CIO toolbox model explicitly states this relationship.",
          whyExtended: [
            "The CIO toolbox model contains a note: 'Business case (tool 1) is one evaluation method inside alternative analysis (tool 2, step 3). They are separate tools but tightly connected.'",
            "Alternative analysis has three steps; business case fits into step 3 (Evaluate and propose) as one of several evaluation methods.",
            "Other evaluation methods in step 3 include plus/minus method, cost ranking, and real options.",
            "This means every business case is part of an alternative analysis, but not every alternative analysis requires a full financial business case."
          ]
        },
        {
          text: "They are completely unrelated tools used in different industries",
          correct: false,
          why: "Wrong: they are explicitly described as tightly connected in the CIO toolbox model.",
          whyExtended: [
            "The CIO toolbox model contains a specific note explaining their connection — they are not separate in that sense.",
            "Both tools fall under the 'VALG' (choice) category in the CIO toolbox, indicating they serve related purposes.",
            "Business case focuses on quantitative and qualitative evaluation; alternative analysis provides the broader process that includes evaluation.",
            "Both are used across industries — they are general management tools, not industry-specific."
          ]
        },
        {
          text: "Alternative analysis replaces business case entirely",
          correct: false,
          why: "Wrong: business case is a method within alternative analysis, not replaced by it.",
          whyExtended: [
            "Business case provides specific analytical tools (NPV, risk assessment) that alternative analysis does not replicate.",
            "Alternative analysis is a broader process; it needs evaluation methods like business case to function in step 3.",
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
      ]
    },
    {
      id: 6,
      type: "single",
      title: "Design thinking approach",
      points: 1,
      prompt: "What is the key insight of the 'Discover' phase in the Double Diamond?",
      source: "Source: Lecture 4, CIO Toolbox 2, slide 'The Discover phase'.",
      options: [
        {
          text: "The point of reframing is not to find the 'real' problem but to see if there is a better one to solve",
          correct: true,
          why: "Correct: this is a direct insight from the Discover phase, emphasizing problem-reframing.",
          whyExtended: [
            "Lecture 4 quotes Wedell-Wedellsborg: 'The point of reframing is not to find the \"real\" problem but, rather, to see if there is a better one to solve.'",
            "The lecture also states: 'the very idea that a single root problem exists may be misleading; problems are typically multicausal and can be addressed in many ways.'",
            "The Discover phase is about understanding rather than assuming what the problem is — it involves speaking to and spending time with people affected by the issues.",
            "This contrasts with the analytical approach in business case/alternative analysis, where the problem is assumed to be understood."
          ]
        },
        {
          text: "The Discover phase is about implementing the final solution at full scale",
          correct: false,
          why: "Wrong: Discover is about understanding the problem, not implementing solutions.",
          whyExtended: [
            "The Discover phase is the first diamond in the Double Diamond — it focuses on divergent exploration of the problem space.",
            "Implementation happens in the Deliver phase, which is the last phase of the Double Diamond.",
            "Full-scale implementation is explicitly avoided in design thinking; the Deliver phase involves 'testing out different solutions at small-scale'.",
            "Jumping to implementation in the Discover phase would skip understanding, defining and developing — three critical phases."
          ]
        },
        {
          text: "The Discover phase calculates the NPV for each potential solution",
          correct: false,
          why: "Wrong: NPV is part of the business case tool, not design thinking's Discover phase.",
          whyExtended: [
            "The Discover phase is qualitative and explorative — it uses techniques like user research, observation and empathy.",
            "NPV calculation belongs to the business case tool (tool 1) and the 'Evaluate' step of alternative analysis (tool 2).",
            "Design thinking and business case serve different purposes: design thinking explores what should be built, business case evaluates whether it is worth investing.",
            "In the CIO toolbox, these are separate tools with different typical purposes."
          ]
        },
        {
          text: "The Discover phase assigns governance archetypes to each business unit",
          correct: false,
          why: "Wrong: governance archetypes belong to the IT governance tool, not design thinking.",
          whyExtended: [
            "Governance archetypes (Business Monarchy, IT Monarchy, Federal, etc.) are part of tool 7 (IT governance) in the CIO toolbox.",
            "The Discover phase is about understanding user needs and the problem space, not about organizational decision structures.",
            "IT governance determines 'who systematically makes and contributes to decisions' — design thinking determines 'what problem should we solve'.",
            "These are entirely different activities serving different purposes in the CIO toolbox."
          ]
        }
      ]
    },
    {
      id: 7,
      type: "multi",
      title: "TOGAF architecture taxonomy",
      points: 1,
      prompt: "Which of the following are among the four architecture types in the TOGAF taxonomy?",
      source: "Source: Lecture 5, CIO Toolbox 3, slide 'Architecture taxonomy (according to TOGAF)'.",
      options: [
        {
          text: "Business Architecture",
          correct: true,
          why: "Correct: Business Architecture defines the business strategy, governance, organization, and key business processes.",
          whyExtended: [
            "Lecture 5 defines Business Architecture as: 'defines the business strategy, governance, organization, and key business processes.'",
            "Business Architecture is the first layer in the TOGAF taxonomy and connects architecture to business objectives.",
            "It bridges strategy (Lecture 2) with implementation by defining how the organization operates at an architectural level.",
            "Business Architecture shapes the requirements for the other three architecture types."
          ]
        },
        {
          text: "Data Architecture",
          correct: true,
          why: "Correct: Data Architecture describes the structure of an organization's logical and physical data assets.",
          whyExtended: [
            "Lecture 5 defines Data Architecture as: 'describes the structure of an organization's logical and physical data assets and data management resources.'",
            "Data Architecture is critical because data integration and standardization are key dimensions of the operating model.",
            "In D4D terms, reliable and accessible master data is a core function of the Operational Backbone.",
            "Data Architecture links to the Digital Platform building block, where data components are made available for reuse."
          ]
        },
        {
          text: "Marketing Architecture",
          correct: false,
          why: "Wrong: Marketing Architecture is not part of the TOGAF taxonomy.",
          whyExtended: [
            "The four TOGAF architectures are: Business, Data, Application and Technology Architecture.",
            "Marketing is a business function, not an architecture type in the TOGAF framework.",
            "Marketing activities might be represented within Business Architecture as business processes, but they are not a separate architecture layer.",
            "TOGAF focuses on structural views of how the enterprise is organized technically and operationally."
          ]
        },
        {
          text: "Application Architecture",
          correct: true,
          why: "Correct: Application Architecture provides a blueprint for individual applications, their interactions, and their relationships to core business processes.",
          whyExtended: [
            "Lecture 5 defines Application Architecture as: 'provides a blueprint for the individual applications to be deployed, their interactions, and their relationships to the core business processes of the organization.'",
            "Application Architecture maps which applications exist, how they interact, and how they support business processes.",
            "This is central to understanding the IT portfolio — which is the typical purpose of the IT Architecture tool in the CIO toolbox.",
            "In D4D terms, Application Architecture helps identify which components should be part of the Operational Backbone vs. the Digital Platform."
          ]
        },
        {
          text: "Technology Architecture",
          correct: true,
          why: "Correct: Technology Architecture describes the logical software and hardware capabilities required to support business, data, and application services.",
          whyExtended: [
            "Lecture 5 defines Technology Architecture as: 'describes the logical software and hardware capabilities that are required to support the deployment of business, data, and application services; this includes IT infrastructure, middleware, networks, communications, processing, standards, etc.'",
            "Technology Architecture is the most 'technical' layer, dealing with infrastructure and platforms.",
            "It connects to the IT governance decision domain 'IT infrastructure strategies' from Lecture 6.",
            "Technology Architecture underpins all other architecture layers — without appropriate infrastructure, applications and data cannot function."
          ]
        }
      ]
    },
    {
      id: 8,
      type: "single",
      title: "Operating model quadrants",
      points: 1,
      prompt: "An organization with high process standardization but low process integration operates under which operating model?",
      source: "Source: Lecture 5, CIO Toolbox 3, slide on operating model and four operating models.",
      options: [
        {
          text: "Coordination",
          correct: false,
          why: "Wrong: Coordination has high integration but low standardization.",
          whyExtended: [
            "Coordination means business units share data and customers (high integration) but operate with different processes (low standardization).",
            "Example: a financial services company where different product lines share customer data but have unit-specific processes.",
            "High integration means processes are connected and share data across units; low standardization means processes differ between units.",
            "Coordination is the opposite of Replication on the standardization axis."
          ]
        },
        {
          text: "Unification",
          correct: false,
          why: "Wrong: Unification has both high integration and high standardization.",
          whyExtended: [
            "Unification means business processes are both highly standardized and highly integrated across the organization.",
            "This model offers the greatest economies of scale but the least flexibility for local adaptation.",
            "Example: a retail chain where all stores follow identical processes and share the same systems.",
            "Unification requires the most centralized approach to IT management."
          ]
        },
        {
          text: "Diversification",
          correct: false,
          why: "Wrong: Diversification has both low integration and low standardization.",
          whyExtended: [
            "Diversification means business units operate independently with different processes and minimal data sharing.",
            "This model offers maximum local autonomy but minimal synergies across the organization.",
            "Example: a conglomerate with completely independent business lines that share little beyond corporate governance.",
            "Diversification places the fewest demands on shared IT infrastructure."
          ]
        },
        {
          text: "Replication",
          correct: true,
          why: "Correct: Replication has high standardization but low integration.",
          whyExtended: [
            "Replication means business units follow standardized processes (high standardization) but operate independently without extensive data sharing (low integration).",
            "Example: a franchise model where each location follows the same procedures but operates its own data independently.",
            "The CIO toolbox model describes the operating model as 'process integration × standardization' with four resulting models.",
            "Replication offers economies of scale through standardized processes while allowing units to operate independently."
          ]
        }
      ]
    },
    {
      id: 9,
      type: "single",
      title: "Fowler vs TOGAF",
      points: 1,
      prompt: "What is the key difference between the TOGAF perspective and the Fowler perspective on architecture?",
      source: "Source: Lecture 5, CIO Toolbox 3, slide 'Different views on architecture and architects'.",
      options: [
        {
          text: "TOGAF represents a formal, often centralized perspective; Fowler represents a more meritocratic and decentralized perspective",
          correct: true,
          why: "Correct: this is the distinction drawn in Lecture 5.",
          whyExtended: [
            "Lecture 5 states: 'The Open Group — through TOGAF — represents a formal, and often centralized, perspective on architecture and architecture work.'",
            "In contrast: 'Martin Fowler — who is the closest we get to an architecture thought leader in agile development, represents a more meritocratic and decentralized perspective.'",
            "The CIO toolbox model describes: 'TOGAF = formal architecture governance, often more centralized' vs. 'Fowler = architecture as \"the important stuff\"; collaborative, decentralized orientation'.",
            "This reflects a broader tension in IT management between structured governance and agile collaboration."
          ]
        },
        {
          text: "TOGAF is only for small startups while Fowler is for large enterprises",
          correct: false,
          why: "Wrong: TOGAF is actually more commonly associated with larger, more complex organizations.",
          whyExtended: [
            "TOGAF originated from US defence — an environment of large, complex organizations — and is used primarily by larger enterprises.",
            "Fowler's perspective is more common in agile development environments, which can include both startups and large teams.",
            "The choice between perspectives is not about company size but about management philosophy: formal governance vs. collaborative decision-making.",
            "Large organizations can use either approach — the question is about centralization vs. decentralization of architectural decisions."
          ]
        },
        {
          text: "They are identical approaches with different names",
          correct: false,
          why: "Wrong: Lecture 5 explicitly contrasts them as representing different views on architecture.",
          whyExtended: [
            "Lecture 5 presents them as alternatives on a spectrum from formal/centralized to collaborative/decentralized.",
            "TOGAF uses a structured Architecture Development Method (ADM) with defined phases and roles.",
            "Fowler views architecture as emergent — 'the important stuff' that the team collectively identifies and cares about.",
            "The CIO toolbox also mentions Open Agile Architecture as a third perspective, further showing that multiple views exist."
          ]
        },
        {
          text: "Fowler rejects the concept of architecture entirely",
          correct: false,
          why: "Wrong: Fowler defines architecture differently but does not reject it.",
          whyExtended: [
            "Fowler defines architecture as 'the important stuff' — he reframes what architecture means rather than rejecting it.",
            "His perspective is that architecture is what the team collectively considers important to understand and preserve.",
            "This is a pragmatic redefinition, not a rejection — it shifts architecture from formal documentation to shared understanding.",
            "Lecture 5 presents Fowler as 'the closest we get to an architecture thought leader in agile development' — he is deeply engaged with architecture, just from a different angle."
          ]
        }
      ]
    },
    {
      id: 10,
      type: "fill",
      title: "Triple constraint",
      points: 1,
      prompt: "Projects with fixed cost, scope and ________ are particularly vulnerable to disappointment.",
      answers: ["time", "tid", "schedule", "deadline"],
      answerKey: "time",
      source: "Source: Lecture 4, CIO Toolbox 2, slide 'The triple constraint'.",
      whyCorrect: "Correct because the triple constraint consists of scope, cost and time. When all three are fixed, there is no flexibility to adjust, making the project highly vulnerable to disappointment.",
      whyWrong: "Wrong if the answer refers to quality, risk or resources — while these are important project concerns, the triple constraint specifically consists of scope, cost and time."
    },
    {
      id: 11,
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
          why: "Correct: a justifiable reason is required throughout the project's life.",
          whyExtended: [
            "PRINCE2 principle 1: 'Continued business justification — a justifiable reason required to run a project.'",
            "This means the business case must remain valid throughout the project — if justification disappears, the project should be stopped.",
            "This connects to the business case tool in the CIO toolbox: the business case is not just an upfront exercise but an ongoing concern.",
            "PRINCE2 has 'business case' as one of its seven themes, reinforcing the link to continued justification."
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
          text: "Manage by stages",
          correct: true,
          why: "Correct: projects should be planned, monitored and controlled stage by stage.",
          whyExtended: [
            "PRINCE2 principle 4: 'Manage by stages — should be planned, monitored and controlled stage by stage.'",
            "Stage-based management allows for regular decision points where the project board can authorize the next stage.",
            "This provides natural checkpoints to reassess the business case and adjust plans based on learning.",
            "Managing by stages balances detailed planning (near-term) with higher-level planning (later stages)."
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
          text: "Always maximize the number of team members",
          correct: false,
          why: "Wrong: this is not a PRINCE2 principle. PRINCE2 focuses on defined roles, justification and tailoring.",
          whyExtended: [
            "The seven PRINCE2 principles are: continued business justification, learn from experience, defined roles and responsibilities, manage by stages, manage by exception, focus on products, tailor to suit the project environment.",
            "None of these relate to maximizing team size — that would contradict the principle of tailoring to the project environment.",
            "PRINCE2 principle 3 is about 'defined roles and responsibilities: clear organizational structure; accountability' — quality of roles, not quantity of people.",
            "Adding more team members often introduces communication overhead that can slow projects down."
          ]
        },
        {
          text: "Tailor to suit the project environment",
          correct: true,
          why: "Correct: PRINCE2 should be tailored to the specific environment, size, complexity and risk.",
          whyExtended: [
            "PRINCE2 principle 7: 'Tailor to suit the project environment — tailored to suit environment, size, complexity, importance, capability and risk.'",
            "This aligns with the CIO toolbox's overarching message that frameworks are context-dependent.",
            "A small, low-risk project should use a lighter PRINCE2 implementation than a large, complex one.",
            "This tailoring principle connects to Cynefin: the management approach should match the complexity of the situation."
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
          text: "Ignore previous lessons to maintain a fresh perspective",
          correct: false,
          why: "Wrong: PRINCE2 explicitly requires learning from experience.",
          whyExtended: [
            "PRINCE2 principle 2: 'Learn from experience — continually seek and draw lessons.'",
            "This is the opposite of ignoring previous lessons — PRINCE2 mandates capturing and applying lessons learned.",
            "Learning from experience connects to the broader agile/product team principle of pivots and learning.",
            "The course summary identifies lesson 2 as a key principle for project success."
          ]
        }
      ]
    },
    {
      id: 12,
      type: "single",
      title: "Projects vs product teams",
      points: 1,
      prompt: "What is a key difference between the project approach and the product team approach?",
      source: "Source: Lecture 4, CIO Toolbox 2, slides on projects and product teams.",
      options: [
        {
          text: "Projects are temporary organizations; product teams have lasting ownership of a digital product or service",
          correct: true,
          why: "Correct: this is the fundamental difference between the two approaches.",
          whyExtended: [
            "The CIO toolbox model defines a project as 'temporary organization — Specified results within a specified period.'",
            "Product teams are described as having 'Lasting ownership of a digital product/service' with 'Continuous development and operations.'",
            "Lecture 4 summarizes: 'Ensure continuity by creating lasting product teams instead of projects.'",
            "This distinction is central: projects dissolve after delivery, while product teams persist and continuously improve their product."
          ]
        },
        {
          text: "Projects focus on outcome while product teams focus on output",
          correct: false,
          why: "Wrong: it is the other way around — product teams focus on outcome over output.",
          whyExtended: [
            "The CIO toolbox model states that product team logic includes 'Outcome over output.'",
            "Outcome means the business result or customer value achieved; output means the deliverables produced.",
            "Projects typically measure success by delivering the specified scope on time and budget (output), while product teams measure success by the value created (outcome).",
            "Lecture 4 emphasizes that product teams should focus on 'what difference does it make' rather than 'how much did we deliver'."
          ]
        },
        {
          text: "Product teams never use any form of planning or estimation",
          correct: false,
          why: "Wrong: product teams use planning, but at a different level — such as sprint-level planning in Scrum.",
          whyExtended: [
            "The course summary states that Scrum 'requires planning at the sprint level' — product teams do plan.",
            "Product teams plan iteratively, adapting based on feedback and learning, rather than creating a complete upfront plan.",
            "Agile planning is about prioritizing by value and adjusting course, not about having no plan at all.",
            "The distinction is not planning vs. no planning, but detailed upfront planning (projects) vs. adaptive iterative planning (product teams)."
          ]
        },
        {
          text: "Projects always fail while product teams always succeed",
          correct: false,
          why: "Wrong: the lecture states both approaches can be useful or troublesome.",
          whyExtended: [
            "Lecture 4 concludes: 'Both projects or autonomous product teams can be useful or troublesome.'",
            "Projects have clear advantages: multiple stakeholders can be easily involved, and complex dependencies can be resolved through careful planning.",
            "Product teams face challenges: balancing autonomy and alignment, determining the right degree of autonomy, and adjusting agile practices.",
            "The choice depends on context — which connects to Cynefin as a meta-tool for choosing the right management approach."
          ]
        }
      ]
    },
    {
      id: 13,
      type: "single",
      title: "Governance dilemma",
      points: 1,
      prompt: "What is the core dilemma in IT governance?",
      source: "Source: Lecture 6, CIO Toolbox 4, slides on IT governance and centralization vs decentralization.",
      options: [
        {
          text: "Centralization (scale, compliance) versus decentralization (agility, local fit)",
          correct: true,
          why: "Correct: this is the fundamental governance dilemma described in the CIO toolbox model.",
          whyExtended: [
            "The CIO toolbox model lists 'Governance dilemma: Centralization (scale, compliance) vs. decentralization (agility, local fit).'",
            "Centralization offers economies of scale, consistency and compliance with standards, but can reduce responsiveness.",
            "Decentralization enables agility and local adaptation, but can lead to fragmentation, duplication and lack of standards.",
            "The governance matrix allows organizations to use different archetypes for different decision domains — IT infrastructure may be centralized while business application needs are decentralized."
          ]
        },
        {
          text: "Whether to use Scrum or PRINCE2",
          correct: false,
          why: "Wrong: the choice of development method is an operational decision, not the core governance dilemma.",
          whyExtended: [
            "Scrum and PRINCE2 are frameworks for organizing development (tools 5 and 6 in the CIO toolbox), not governance mechanisms.",
            "IT governance is about 'who systematically makes and contributes to decisions', not about which method to use.",
            "The governance dilemma is structural — it is about how to distribute decision authority across the organization.",
            "Method choice is a consequence of governance decisions, not the governance dilemma itself."
          ]
        },
        {
          text: "Whether to invest in IT at all",
          correct: false,
          why: "Wrong: IT governance assumes IT investments exist and focuses on how to govern them.",
          whyExtended: [
            "IT governance is defined as 'aligning IT investments with overall business priorities' — it assumes investments are being made.",
            "The question of whether to invest in IT is a strategic business decision, not a governance dilemma.",
            "The governance dilemma is about how to organize decision-making for IT, not whether IT should exist.",
            "One of the five governance decision domains is 'IT investment and prioritization' — which is about allocating investments, not eliminating them."
          ]
        },
        {
          text: "Whether the CIO should report to the CEO or the CFO",
          correct: false,
          why: "Wrong: this is an organizational reporting line question, not the core governance dilemma.",
          whyExtended: [
            "The core governance dilemma is about the balance between centralized and decentralized decision-making across the entire organization.",
            "CIO reporting lines may influence governance outcomes, but the dilemma is broader than a single reporting relationship.",
            "The governance matrix involves all business units and multiple decision domains — not just the CIO's position.",
            "Governance archetypes like Federal and IT Duopoly involve many stakeholders beyond the CIO."
          ]
        }
      ]
    },
    {
      id: 14,
      type: "multi",
      title: "Five IT governance decision domains",
      points: 1,
      prompt: "Mark all five decision domains in IT governance according to Weill & Ross.",
      source: "Source: Lecture 6, CIO Toolbox 4, slide 'Categories of important IT decisions'.",
      options: [
        {
          text: "IT principles",
          correct: true,
          why: "Correct: IT principles is one of the five decision domains.",
          whyExtended: [
            "IT principles cover: the role of IT in business, desirable behaviors, and funding approach.",
            "This domain sets the overarching direction for how IT should operate in the organization.",
            "It translates business strategy into high-level IT guidelines that shape all other decisions.",
            "The course summary describes IT principles as: 'how to translate from business; role of IT in business; desirable behaviors; funding.'"
          ]
        },
        {
          text: "IT architecture",
          correct: true,
          why: "Correct: IT architecture is one of the five decision domains.",
          whyExtended: [
            "IT architecture decisions cover: standardization of processes, data integration, and technology choices.",
            "This connects directly to tool 4 (IT Architecture) in the CIO toolbox, including operating model, BPMN and TOGAF.",
            "Architecture decisions determine how tightly coupled or loosely coupled systems are across the organization.",
            "The course summary lists: 'core business process + relates; what data + how integration; tech capability standardization.'"
          ]
        },
        {
          text: "IT infrastructure strategies",
          correct: true,
          why: "Correct: IT infrastructure strategies is one of the five decision domains.",
          whyExtended: [
            "IT infrastructure decisions cover: critical services, service-level requirements, pricing, and outsourcing.",
            "Infrastructure decisions often benefit from centralization to achieve economies of scale.",
            "The course summary describes: 'critical services to achieve strategic goals; what should be implemented enterprise-wide; pricing; plan for keeping tech up-to-date; what services should be outsourced.'"
          ]
        },
        {
          text: "Business application needs",
          correct: true,
          why: "Correct: business application needs is one of the five decision domains.",
          whyExtended: [
            "Business application needs cover: market opportunities, strategic experiments, and decisions within architectural standards.",
            "This domain is often more decentralized because business units best understand their own application needs.",
            "The course summary describes: 'market and business process opportunities; strategic experiments design; how to address within architectural standards; accountability on outcomes.'"
          ]
        },
        {
          text: "IT investment and prioritization",
          correct: true,
          why: "Correct: IT investment and prioritization is one of the five decision domains.",
          whyExtended: [
            "IT investment decisions cover: most important process changes, distribution in the IT portfolio, and relative importance of enterprise-wide vs. business unit investment.",
            "This domain directly connects to the business case tool (tool 1) — prioritization of digital services and funding.",
            "Investment decisions are often the most politically sensitive because they determine resource allocation.",
            "The course summary describes: 'most important process changes; distribution in the current IT portfolio; relative importance of enterprise-wide vs business unit investment; business value of IT projects.'"
          ]
        },
        {
          text: "IT marketing and branding",
          correct: false,
          why: "Wrong: marketing and branding is not one of the five IT governance decision domains.",
          whyExtended: [
            "The five domains according to Weill & Ross are: IT principles, IT architecture, IT infrastructure, business application needs, and IT investment.",
            "Marketing is a business function, not an IT governance concern in the Weill & Ross framework.",
            "IT governance focuses on the structural question of who decides about IT resources, not about how to market IT internally.",
            "The governance matrix uses these five specific domains matched against six archetypes."
          ]
        }
      ]
    },
    {
      id: 15,
      type: "single",
      title: "Governance vs management",
      points: 1,
      prompt: "According to Weill and Ross, what is the key distinction between IT governance and IT management?",
      source: "Source: Lecture 6 and Lecture 11, slides on IT governance definition.",
      options: [
        {
          text: "Governance determines who systematically makes and contributes to IT decisions; management actually makes and implements them",
          correct: true,
          why: "Correct: this is the distinction from Weill and Ross (2004).",
          whyExtended: [
            "Lecture 11 quotes: 'IT governance is not about making IT decisions — management does that — but rather determines who systematically makes and contributes to those decisions.'",
            "Governance is the structural framework: who has decision rights and accountability.",
            "Management is the operational activity: actually analyzing, deciding and implementing.",
            "The governance matrix specifies the structure; managers operate within that structure to make actual decisions."
          ]
        },
        {
          text: "There is no difference; the terms are interchangeable",
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
          text: "Governance is only for the IT department; management is for the rest of the organization",
          correct: false,
          why: "Wrong: governance involves both business and IT stakeholders.",
          whyExtended: [
            "The governance archetypes include Business Monarchy and Federal system — both heavily involving business leaders.",
            "The five decision domains include 'business application needs' — a domain where business stakeholders have primary input.",
            "Governance is an organizational capability, not an IT-only function.",
            "The whole point of the governance matrix is to determine the right balance of IT and business involvement across different decision domains."
          ]
        },
        {
          text: "Management always precedes governance in time",
          correct: false,
          why: "Wrong: governance structures should be established to guide management decisions.",
          whyExtended: [
            "Governance sets the framework within which management operates — the structure should exist before decisions are made.",
            "Without governance structures, management decisions may be inconsistent, duplicated or conflicting.",
            "The governance matrix is designed to be established proactively, not as an afterthought.",
            "Management activities occur continuously within the governance framework — it is not a sequential relationship."
          ]
        }
      ]
    },
    {
      id: 16,
      type: "single",
      title: "Cynefin and the CIO toolbox",
      points: 1,
      moduleId: "cio-tool-box",
      groupId: "cynefin",
      prompt: "How does Cynefin connect to the other tools in the CIO toolbox?",
      source: "Source: Lecture 4 and CIO toolbox model, meta-tool Cynefin.",
      options: [
        {
          text: "Cynefin connects business case (analyze) ↔ design thinking (explore) ↔ projects (plan) ↔ product teams (iterate)",
          correct: true,
          why: "Correct: the CIO toolbox model explicitly shows this connection chain.",
          whyExtended: [
            "The CIO toolbox model states: 'Connects business case (analyze) ↔ design thinking (explore) ↔ projects (plan) ↔ product teams (iterate).'",
            "In a complicated situation (analyzable), a business case and structured planning are appropriate.",
            "In a complex situation (unknown factors), design thinking and agile/product teams with experimentation are needed.",
            "Cynefin serves as a meta-tool that helps decide which of the other tools is most appropriate for the given context."
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
          text: "Cynefin replaces all other tools in the CIO toolbox",
          correct: false,
          why: "Wrong: Cynefin is a meta-tool that helps choose among the other tools, not a replacement.",
          whyExtended: [
            "Cynefin is labeled as a 'META-TOOL' in the CIO toolbox model, meaning it operates at a level above the other tools.",
            "Its purpose is 'Choose management approach based on context' — it guides tool selection, not tool execution.",
            "You still need the actual tools (business case, design thinking, PRINCE2, etc.) to do the work.",
            "Cynefin provides the contextual awareness; the other tools provide the methods and frameworks."
          ]
        },
        {
          text: "Cynefin is only relevant for IT infrastructure decisions",
          correct: false,
          why: "Wrong: Cynefin applies to any management situation across all CIO toolbox contexts.",
          whyExtended: [
            "Cynefin is a general framework for choosing management approaches based on situational complexity.",
            "It was introduced in the Projects lecture but 'connects across the toolbox' according to the CIO toolbox model.",
            "Cynefin applies equally to strategic decisions, development approaches, governance structures and operational challenges.",
            "The four domains (Clear, Complicated, Complex, Chaotic) describe general situational characteristics, not specific IT domains."
          ]
        },
        {
          text: "Cynefin is identical to the TOGAF Architecture Development Method",
          correct: false,
          why: "Wrong: Cynefin is a sense-making framework; TOGAF ADM is an architecture development method.",
          whyExtended: [
            "Cynefin (Snowden and Boone, 2007) categorizes situations by complexity level to guide management approach.",
            "TOGAF ADM is a structured method for developing enterprise architecture through defined phases.",
            "They serve completely different purposes: Cynefin helps decide how to approach a situation; TOGAF ADM specifies how to do architecture work.",
            "Cynefin is a meta-tool; TOGAF is an operational framework within the IT Architecture tool."
          ]
        }
      ]
    },
    {
      id: 17,
      type: "single",
      title: "Cynefin domains",
      points: 1,
      moduleId: "cio-tool-box",
      groupId: "cynefin",
      prompt: "In which Cynefin domain is cause-and-effect still possible to analyze in advance, making it the 'domain of experts'?",
      source: "Source: Lecture 4, CIO Toolbox 2, slide on Cynefin.",
      options: [
        {
          text: "Clear",
          correct: false,
          why: "Wrong: the clear domain is for well-known issues with established procedures — no expert analysis needed.",
          whyExtended: [
            "Lecture 4 defines clear: 'issues occurring are typically well known, and can be solved by previously agreed and often written procedures.'",
            "Clear situations use Sense → Categorize → Respond — recognize the pattern and apply the standard response.",
            "Clear is the domain of best practice, not expert analysis — the answers are already known.",
            "Clear situations have the least complexity: few fixed constraints and few complexity factors."
          ]
        },
        {
          text: "Complicated",
          correct: true,
          why: "Correct: the complicated domain is explicitly called the 'domain of experts' where analysis is possible.",
          whyExtended: [
            "Lecture 4 defines complicated: 'a lot of non-trivial decisions have to be made — however, the cause-and-effect relationships are still possible to analyze in advance. This is said to be the \"domain of experts\".'",
            "Complicated situations use Sense → Analyze → Respond — apply expertise to analyze the situation and determine the right approach.",
            "The key distinction from complex is that in complicated situations, the answer can be found through analysis — it just requires expertise.",
            "Examples include engineering challenges, detailed planning, and structured decision-making where the problem is understood but the solution requires skill."
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
          text: "Complex",
          correct: false,
          why: "Wrong: in the complex domain, important factors are unknown and experimentation is needed.",
          whyExtended: [
            "Lecture 4 defines complex: 'several important factors influencing the outcome are unknown, and experimentation is typically necessary.'",
            "Complex situations use Probe → Sense → Respond — you must try things and learn from the results.",
            "In complex situations, cause-and-effect can only be understood in retrospect, not predicted in advance.",
            "This is the domain where design thinking and agile methods are most appropriate."
          ]
        },
        {
          text: "Chaotic",
          correct: false,
          why: "Wrong: the chaotic domain requires immediate action without prior analysis.",
          whyExtended: [
            "Lecture 4 defines chaotic: 'there is typically an emergency which requires immediate action to move into a more stable state.'",
            "Chaotic situations use Act → Sense → Respond — stabilize first, analyze later.",
            "There is no time for expert analysis in chaos — the priority is to bring the situation under control.",
            "Chaotic is the most extreme domain, with the highest number of complexity factors and fixed constraints."
          ]
        }
      ]
    },
    {
      id: 18,
      type: "fill",
      title: "IT governance definition",
      points: 1,
      prompt: "IT governance is not about making IT decisions — ________ does that — but rather determines who systematically makes and contributes to those decisions.",
      answers: ["management"],
      answerKey: "management",
      source: "Source: Lecture 11, Accountability Framework, slide 'IT governance', quoting Weill and Ross (2004).",
      whyCorrect: "Correct because the Weill and Ross definition explicitly states that management (not governance) makes decisions, while governance determines who has the right and responsibility to make them.",
      whyWrong: "Wrong if the answer is governance, the board, or the CIO. The key distinction is that governance sets the structure while management operates within it."
    },
    {
      id: 19,
      type: "single",
      title: "Federal archetype",
      points: 1,
      prompt: "Which IT governance archetype involves C-level executives and business representatives from all operating groups collaborating with the IT department?",
      source: "Source: Lecture 6, CIO Toolbox 4, slide 'Summary: Six archetypal approaches to IT decision making'.",
      options: [
        {
          text: "Business Monarchy",
          correct: false,
          why: "Wrong: Business Monarchy is senior business executives (possibly with CIO) making decisions — not all operating groups collaborating.",
          whyExtended: [
            "Lecture 6 defines Business Monarchy as: 'the most centralized approach — a senior business executive or a group of senior executives, sometimes including the CIO, makes all the IT-related decisions.'",
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
            "Federal is broader and more inclusive than Duopoly — it resembles a government where central and local levels collaborate.",
            "Duopoly is a bilateral relationship; Federal is a multilateral collaboration."
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
            "Feudal is decentralized without collaboration — each unit acts independently, not together.",
            "The difference from Federal is that Feudal lacks the collaborative element — units make isolated decisions.",
            "Feudal can lead to fragmentation and duplication because there is no coordinating mechanism across units."
          ]
        }
      ]
    },
    {
      id: 20,
      type: "single",
      title: "Management framework vs fashion",
      points: 1,
      prompt: "What is a 'management fashion' according to the course?",
      source: "Source: Lecture 4, CIO Toolbox 2, and course summary.",
      options: [
        {
          text: "A management framework that has reached a critical mass and become an intersubjective phenomenon",
          correct: true,
          why: "Correct: this is the definition of management fashion used in the course.",
          whyExtended: [
            "The course summary defines: 'Management fashion: management framework that has reached a critical mass and has become an intersubjective phenomenon.'",
            "A management fashion means a framework has become widely adopted and discussed — it has become a 'trend' in management practice.",
            "This does not necessarily mean the framework is good or bad — it means it has reached a level of popularity that makes it a shared reference point.",
            "The distinction from a management framework is scale of adoption: a framework is a structured approach; a fashion is a widely adopted framework."
          ]
        },
        {
          text: "A framework that is proven to work perfectly in every context",
          correct: false,
          why: "Wrong: the course explicitly states that frameworks are context-sensitive and sometimes disputed.",
          whyExtended: [
            "Lecture 6 states: 'For these (and similar) frameworks and methods, their usefulness and value is highly context-sensitive — and sometimes disputed.'",
            "No framework works perfectly in every context — this is a core message of the CIO toolbox.",
            "Management fashions can be overhyped: the fact that something is popular does not mean it is universally applicable.",
            "The CIO toolbox encourages 'Read the room' first — context always determines whether a framework is appropriate."
          ]
        },
        {
          text: "A synonym for management framework — the terms mean the same thing",
          correct: false,
          why: "Wrong: the course distinguishes between framework (structure) and fashion (popularity).",
          whyExtended: [
            "A management framework is: 'a combination of interlinked items that supports a particular approach to a specific objective' — it is structural.",
            "A management fashion adds the dimension of widespread adoption — a framework becomes a fashion when it reaches critical mass.",
            "Not all frameworks become fashions — some remain niche or specialized tools.",
            "The distinction matters because popularity (fashion) can create pressure to adopt a framework regardless of fit (context)."
          ]
        },
        {
          text: "A term for outdated frameworks that are no longer used",
          correct: false,
          why: "Wrong: management fashion refers to current popularity, not obsolescence.",
          whyExtended: [
            "The 'fashion' metaphor implies current widespread adoption, like trends in clothing — it is about what is popular now.",
            "A management fashion can become outdated, but the term itself describes the peak of adoption, not decline.",
            "Frameworks like Scrum and SAFe could be considered current management fashions — they are widely adopted and discussed.",
            "The course uses the term to highlight that popularity does not equal universal applicability."
          ]
        }
      ]
    },
    {
      id: 21,
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
            "Outcome = the business result or customer value achieved; output = the features, code or documents produced.",
            "Lecture 4 states: 'Focus on outcome not output' — what matters is the impact, not the activity.",
            "This principle connects to the product team takeaway: 'Give team members autonomy to innovate and explore.'"
          ]
        },
        {
          text: "All scope, time and cost are fixed from the start",
          correct: false,
          why: "Wrong: fixing all three elements of the triple constraint is a project characteristic, and makes projects vulnerable.",
          whyExtended: [
            "The CIO toolbox model states: 'Scope, time, cost — all three fixed → vulnerable' under Projects, not product teams.",
            "Product teams embrace change: 'Pivots and learning expected' is listed as a product team characteristic.",
            "Agile methods prioritize responding to change over following a plan — locking everything from the start contradicts this.",
            "Product teams adjust scope continuously based on user feedback and business priorities."
          ]
        },
        {
          text: "Pivots and learning are expected",
          correct: true,
          why: "Correct: product teams are designed to learn and change direction as needed.",
          whyExtended: [
            "The CIO toolbox model lists 'Pivots and learning expected' as a product team characteristic.",
            "Lecture 4 takeaway: 'Expect pivotal change' — direction changes are normal, not failures.",
            "This connects to the complex domain in Cynefin, where experimentation is necessary because important factors are unknown.",
            "The Silicon Valley leadership lessons include: 'Embrace pivots' and 'Nurture a culture of innovation.'"
          ]
        },
        {
          text: "The team disbands after each sprint",
          correct: false,
          why: "Wrong: product teams have lasting ownership — they do not disband.",
          whyExtended: [
            "Product teams persist over time with continuous ownership of their product or service.",
            "Disbanding after each sprint would make the team equivalent to a very short project, losing accumulated knowledge.",
            "Sprints are iterations within the team's ongoing work, not endpoints that terminate the team.",
            "The whole point of product teams over projects is continuity — 'Ensure continuity by creating lasting product teams instead of projects.'"
          ]
        }
      ]
    },
    {
      id: 22,
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
            "Modularity enables the autonomy that product teams need; standardization enables the alignment that governance requires.",
            "Open Agile Architecture comes from The Open Group — the same organization behind TOGAF — showing evolution in their thinking."
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
            "Architecture principles guide design decisions; efficiency goals guide operational management."
          ]
        },
        {
          text: "Hierarchy, command-and-control, and fixed scope",
          correct: false,
          why: "Wrong: these describe a traditional, rigid management style — the opposite of agile architecture.",
          whyExtended: [
            "Open Agile Architecture explicitly values 'responsiveness to change' — the opposite of fixed scope.",
            "Modularity 'facilitates team autonomy' — the opposite of command-and-control.",
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
      ]
    },
    {
      id: 23,
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
            "A project with 3 fixed factors and 0 added complexity is Complex; with 3 fixed factors and 1+ added complexity it becomes Chaotic.",
            "A project with 1 fixed factor and 2 added complexity factors is Clear; with 1 fixed factor and 3+ it becomes Complex.",
            "The key insight is that fixing all constraints removes flexibility, while complexity factors add unknowns — together they escalate the management challenge."
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
            "The CIO toolbox model states: 'Scope, time, cost — all three fixed → vulnerable.'",
            "Clear situations have low complexity and few fixed constraints — they are well-understood problems with known solutions.",
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
      id: 24,
      type: "fill",
      title: "Governance matrix",
      points: 1,
      prompt: "The governance matrix combines decision ________ with governance archetypes to clarify who decides what in IT governance.",
      answers: ["domains", "domain", "areas"],
      answerKey: "domains",
      source: "Source: Lecture 6, CIO Toolbox 4, slide 'Styringsmatrisen'.",
      whyCorrect: "Correct because the governance matrix (styringsmatrisen) has the five decision domains (IT principles, IT architecture, IT infrastructure, business application needs, IT investment) on one axis and the six archetypes on the other.",
      whyWrong: "Wrong if the answer refers to tools, methods or archetypes. The matrix combines domains (what is being decided) with archetypes (who decides), not with other structural elements."
    },
    {
      id: 25,
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
            "Change management deals with how people adopt and adapt to organizational changes — a critical success factor for IT initiatives.",
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
            "Business case includes NPV, qualitative considerations and communicative effect — it is fully inside the toolbox.",
            "The 'outside the toolbox' category contains supporting disciplines that complement the seven core tools."
          ]
        },
        {
          text: "Design thinking",
          correct: false,
          why: "Wrong: design thinking is tool 3 inside the CIO toolbox.",
          whyExtended: [
            "Design thinking is the third numbered tool, with purpose 'Prioritization and product choice — when the problem is unclear.'",
            "It includes the Double Diamond process, problem-reframing, user insight and prototyping — all inside the toolbox.",
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
            "IT governance includes the five decision domains, six archetypes and the governance matrix — all inside the toolbox.",
            "IT governance is categorized under 'STYRING' (governance/steering) in the CIO toolbox model."
          ]
        }
      ]
    }

    ,{
      id: 26,
      type: "dragDrop",
      title: "IT Governance matrix",
      points: 3,
      prompt: "Drag each IT governance archetype into the most fitting description.",
      source: "Source: Lecture 6, CIO Toolbox 4, slides on six archetypal approaches and the governance matrix; Weill & Ross (2004).",
      cards: [
        { id: "business-monarchy", text: "Business Monarchy" },
        { id: "it-monarchy", text: "IT Monarchy" },
        { id: "federal", text: "Federal" },
        { id: "duopoly", text: "Duopoly" },
        { id: "feudal", text: "Feudal" },
        { id: "anarchy", text: "Anarchy" }
      ],
      targets: [
        {
          id: "business-monarchy",
          description: "Top business executives make IT decisions",
          correctCardId: "business-monarchy",
          correctLabel: "Business Monarchy",
          whyCorrect: "Business monarchy means that senior business executives make the decision for the enterprise.",
          whyWrong: "This row describes business monarchy, because authority sits with top business executives rather than IT leaders, business units or individual users.",
          whyExtended: [
            "The key cue is 'top business executives'.",
            "The CIO may be involved, but the archetype is still business-led rather than IT-led.",
            "In the governance matrix this describes who decides within a given IT decision domain."
          ]
        },
        {
          id: "it-monarchy",
          description: "IT leaders make the decisions",
          correctCardId: "it-monarchy",
          correctLabel: "IT Monarchy",
          whyCorrect: "IT monarchy means that one IT leader or a group of IT leaders make the decision.",
          whyWrong: "This row describes IT monarchy, because the decision rights are placed with IT leaders, not with business executives or local business units.",
          whyExtended: [
            "The key cue is 'IT leaders'.",
            "This differs from business monarchy, where top business executives make the decisions.",
            "It also differs from duopoly, where IT shares authority with business representatives."
          ]
        },
        {
          id: "feudal",
          description: "Business units decide independently",
          correctCardId: "feudal",
          correctLabel: "Feudal",
          whyCorrect: "Feudal governance means that business unit or process leaders make separate decisions based on their own unit's needs.",
          whyWrong: "This row describes a feudal model: local business units decide separately and independently.",
          whyExtended: [
            "The key cue is 'business units decide independently'.",
            "Feudal governance is decentralized, but it is decentralized to business units or processes.",
            "This differs from anarchy, where individual users or small groups follow their own IT agenda."
          ]
        },
        {
          id: "duopoly",
          description: "IT and business representatives decide together",
          correctCardId: "duopoly",
          correctLabel: "Duopoly",
          whyCorrect: "IT duopoly means that IT leaders and business representatives share decision authority.",
          whyWrong: "This row describes duopoly, because decision-making is shared specifically between IT and business representatives.",
          whyExtended: [
            "The key cue is the two-party structure: IT + business.",
            "Duopoly is not the same as federal: federal combines corporate-level leadership and business units more broadly.",
            "Duopoly is useful when decisions require both technical expertise and business ownership."
          ]
        },
        {
          id: "anarchy",
          description: "Each individual user follows their own IT agenda",
          correctCardId: "anarchy",
          correctLabel: "Anarchy",
          whyCorrect: "Anarchy is the most decentralized archetype: individual users or small groups pursue their own IT agenda.",
          whyWrong: "This row describes anarchy, because the decision rights are not assigned to executives, IT leaders or business units, but effectively to individual users.",
          whyExtended: [
            "The key cue is 'each individual user'.",
            "Anarchy can increase local freedom, but usually creates problems with standardization, integration and security.",
            "It is the opposite extreme of monarchy-style centralized decision-making."
          ]
        },
        {
          id: "federal",
          description: "Central and local actors share decision authority",
          correctCardId: "federal",
          correctLabel: "Federal",
          whyCorrect: "Federal governance combines central/corporate actors with representatives from business units.",
          whyWrong: "This row describes a federal model, because it mixes central authority with local business-unit representation.",
          whyExtended: [
            "The key cue is the combination of central and local actors.",
            "The lecture compares this to a federal political system with central and local levels.",
            "Federal governance tries to balance enterprise-wide coordination with local knowledge."
          ]
        }
      ]
    },
    {
      id: 27,
      type: "drag-categorize",
      title: "Frameworks and best practice",
      points: 3,
      prompt: "Drag each framework to the CIO toolbox tool it is mapped to in the slide. Frameworks without an arrow should be placed under 'Not used in CIO-toolbox'.",
      source: "Source: Lecture 6, CIO Toolbox 4, slide 'Frameworks and «best practice»'.",
      moduleId: "cio-tool-box",
      groupId: "framewoks",
      items: [
        { id: "togaf", label: "TOGAF" },
        { id: "prince2", label: "Prince 2" },
        { id: "scrum", label: "Scrum" },
        { id: "safe", label: "SAFe" },
        { id: "itil", label: "ITIL" },
        { id: "prosci-adkar", label: "Prosci / ADKAR model" }
      ],
      categories: [
        { id: "it-architecture", label: "IT Architecture" },
        { id: "projects", label: "Projects" },
        { id: "product-teams-agile", label: "Product teams and agile methods" },
        { id: "not-used-in-cio-toolbox", label: "Not used in CIO-toolbox" }
      ],
      correctAnswer: {
        "it-architecture": ["togaf"],
        projects: ["prince2"],
        "product-teams-agile": ["scrum", "safe"],
        "not-used-in-cio-toolbox": ["itil", "prosci-adkar"]
      },
      itemFeedback: {
        togaf: {
          whyCorrect: "TOGAF is mapped by the slide arrow to IT Architecture.",
          whyWrong: "TOGAF should be placed under IT Architecture, because the slide connects enterprise architecture / TOGAF to the IT Architecture tool in the CIO toolbox.",
          whyExtended: [
            "The framework table lists TOGAF as intended for enterprise architecture.",
            "The CIO toolbox table lists IT Architecture as the tool for analyzing and structuring the IT portfolio.",
            "That is why TOGAF maps to IT Architecture, not to projects, agile delivery or the 'not used' category."
          ]
        },
        prince2: {
          whyCorrect: "Prince 2 is mapped by the slide arrow to Projects.",
          whyWrong: "Prince 2 should be placed under Projects, because it is the project governance and management framework shown in the slide.",
          whyExtended: [
            "The framework table lists Prince 2 as intended for project governance and management.",
            "The CIO toolbox table lists Projects as the tool for planning and organizing development.",
            "This makes Prince 2 a project-oriented framework rather than an architecture or agile delivery framework."
          ]
        },
        scrum: {
          whyCorrect: "Scrum is mapped by the slide arrow to Product teams and agile methods.",
          whyWrong: "Scrum should be placed under Product teams and agile methods, because it is the agile software delivery framework in the slide.",
          whyExtended: [
            "The framework table lists Scrum as intended for agile software delivery.",
            "The CIO toolbox table lists Product teams and agile methods as a way to plan and organize development.",
            "Scrum is therefore part of the agile/product-team side of the toolbox, not a project governance framework like Prince 2."
          ]
        },
        safe: {
          whyCorrect: "SAFe is mapped by the slide arrow to Product teams and agile methods.",
          whyWrong: "SAFe should be placed under Product teams and agile methods, because it is the scaled agile software delivery framework in the slide.",
          whyExtended: [
            "The framework table lists SAFe as intended for scaled agile software delivery.",
            "Like Scrum, it belongs with Product teams and agile methods in the CIO toolbox mapping.",
            "The distinction is that Scrum is agile at team level, while SAFe is scaled agile for larger organizations or programs."
          ]
        },
        itil: {
          whyCorrect: "ITIL has no arrow into the CIO toolbox in this slide, so it belongs under Not used in CIO-toolbox.",
          whyWrong: "ITIL should not be placed under IT Architecture, Projects or Product teams. In the slide, ITIL appears as IT Service Management in the frameworks/best-practice table, but it has no arrow into the CIO toolbox table.",
          whyExtended: [
            "ITIL is relevant to IT Service Management: operation, delivery and management of IT services.",
            "However, the slide does not map ITIL to one of the CIO toolbox tools on the right-hand side.",
            "This is the exam point: ITIL is relevant for IT management, but it is not one of the core CIO toolbox tools shown by the arrows."
          ]
        },
        "prosci-adkar": {
          whyCorrect: "Prosci / ADKAR has no arrow into the CIO toolbox in this slide, so it belongs under Not used in CIO-toolbox.",
          whyWrong: "Prosci / ADKAR should not be placed under IT Architecture, Projects or Product teams. In the slide, it is listed as a change management framework/best practice, but it has no arrow into the CIO toolbox table.",
          whyExtended: [
            "Prosci / ADKAR is associated with change management.",
            "Change management is relevant around IT initiatives, but it is not mapped by an arrow to a core CIO toolbox tool in the slide.",
            "Placing it under 'Not used in CIO-toolbox' preserves the visual logic of the slide."
          ]
        }
      }
    },
    {
      "id": 28,
      "type": "dragDrop",
      "title": "Designed for Digital building blocks",
      "points": 3,
      "prompt": "Drag each definition to the correct Designed for Digital building block.",
      "source": "Source: Designed for Digital lectures, D4D building block definitions.",
      "moduleId": "designed-for-digital",
      "groupId": "overview",
      "cards": [
        {
          "id": "d4d-def-ob",
          "text": "A coherent set of standardized, integrated systems, processes and data supporting core operations"
        },
        {
          "id": "d4d-def-sci",
          "text": "Organizational learning about what customers will pay for and how digital technologies can deliver to their demands"
        },
        {
          "id": "d4d-def-dp",
          "text": "A repository of business, data and infrastructure components used to rapidly configure digital offerings"
        },
        {
          "id": "d4d-def-af",
          "text": "A distribution of responsibilities for digital offerings and components that balances autonomy and alignment"
        },
        {
          "id": "d4d-def-exdp",
          "text": "A repository of digital components open to external parties"
        }
      ],
      "targets": [
        {
          "id": "operational-backbone",
          "description": "Operational Backbone",
          "correctCardId": "d4d-def-ob",
          "correctLabel": "A coherent set of standardized, integrated systems, processes and data supporting core operations",
          "whyCorrect": "Operational Backbone is the standardized and integrated core of systems, processes and data.",
          "whyWrong": "This definition belongs to Operational Backbone: it is about stable core operations, not customer learning or ecosystem access.",
          "whyExtended": [
            "Operational Backbone supports reliable end-to-end transaction processing and accessible master data.",
            "It is the exploit/stability side of digital business design."
          ]
        },
        {
          "id": "shared-customer-insights",
          "description": "Shared Customer Insights",
          "correctCardId": "d4d-def-sci",
          "correctLabel": "Organizational learning about what customers will pay for and how digital technologies can deliver to their demands",
          "whyCorrect": "Shared Customer Insights is organizational learning about customer demand and digital possibilities.",
          "whyWrong": "This definition belongs to Shared Customer Insights because the key cue is what customers will pay for.",
          "whyExtended": [
            "The building block helps the organization discover which digital offerings customers actually value.",
            "It is built through experiments, co-creation and shared learning."
          ]
        },
        {
          "id": "digital-platform",
          "description": "Digital Platform",
          "correctCardId": "d4d-def-dp",
          "correctLabel": "A repository of business, data and infrastructure components used to rapidly configure digital offerings",
          "whyCorrect": "Digital Platform is a repository of reusable business, data and infrastructure components.",
          "whyWrong": "This definition belongs to Digital Platform because it describes reusable components for rapidly configuring digital offerings.",
          "whyExtended": [
            "Digital Platform makes experimentation and rapid innovation easier by giving teams access to reusable components.",
            "It differs from Operational Backbone: OB runs the core business reliably, while DP enables new digital offerings."
          ]
        },
        {
          "id": "accountability-framework",
          "description": "Accountability Framework",
          "correctCardId": "d4d-def-af",
          "correctLabel": "A distribution of responsibilities for digital offerings and components that balances autonomy and alignment",
          "whyCorrect": "Accountability Framework distributes responsibility while balancing autonomy and alignment.",
          "whyWrong": "This definition belongs to Accountability Framework because it is about roles, decision rights and ownership.",
          "whyExtended": [
            "AF helps teams innovate without creating chaos.",
            "It defines who owns digital offerings and digital components."
          ]
        },
        {
          "id": "external-developer-platform",
          "description": "External Developer Platform",
          "correctCardId": "d4d-def-exdp",
          "correctLabel": "A repository of digital components open to external parties",
          "whyCorrect": "External Developer Platform opens digital components to external parties.",
          "whyWrong": "This definition belongs to External Developer Platform because the key cue is external parties.",
          "whyExtended": [
            "ExDP often uses APIs or other boundary resources to let partners build on the company's components.",
            "It should normally come after the internal platform is sufficiently mature."
          ]
        }
      ]
    },
    {
      id: 29,
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
            "It is not only a data or architecture issue; it concerns how the organization learns what to build.",
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
      }
    },
    {
      "id": 30,
      "type": "dragDrop",
      "title": "IT governance archetypes",
      "points": 3,
      "prompt": "Drag each description to the correct IT governance archetype.",
      "source": "Source: Lecture 6, IT governance, Weill and Ross governance archetypes.",
      "moduleId": "cio-tool-box",
      "groupId": "it-governance",
      "cards": [
        {
          "id": "business-monarchy-desc",
          "text": "Senior business executives make the decision for the enterprise"
        },
        {
          "id": "it-monarchy-desc",
          "text": "IT executives make the decision"
        },
        {
          "id": "feudal-desc",
          "text": "Business units or process owners make separate local decisions"
        },
        {
          "id": "federal-desc",
          "text": "Corporate-level leaders and business-unit representatives share authority"
        },
        {
          "id": "it-duopoly-desc",
          "text": "IT leaders and one business group decide together"
        },
        {
          "id": "anarchy-desc",
          "text": "Individual users or small groups pursue their own IT agenda"
        }
      ],
      "targets": [
        {
          "id": "business-monarchy",
          "description": "Business Monarchy",
          "correctCardId": "business-monarchy-desc",
          "correctLabel": "Senior business executives make the decision for the enterprise",
          "whyCorrect": "Business Monarchy means senior business executives make the decision.",
          "whyWrong": "This description belongs to Business Monarchy because the decision rights sit with top business leadership.",
          "whyExtended": [
            "The CIO may be involved, but the archetype is still business-led.",
            "This is a centralized governance archetype."
          ]
        },
        {
          "id": "it-monarchy",
          "description": "IT Monarchy",
          "correctCardId": "it-monarchy-desc",
          "correctLabel": "IT executives make the decision",
          "whyCorrect": "IT Monarchy means IT leaders make the decision.",
          "whyWrong": "This description belongs to IT Monarchy because the decision rights sit with IT executives.",
          "whyExtended": [
            "It is centralized like business monarchy, but authority is placed in the IT function.",
            "It differs from IT duopoly, where IT shares authority with business representatives."
          ]
        },
        {
          "id": "feudal",
          "description": "Feudal",
          "correctCardId": "feudal-desc",
          "correctLabel": "Business units or process owners make separate local decisions",
          "whyCorrect": "Feudal means business units make separate local decisions.",
          "whyWrong": "This description belongs to Feudal because authority is decentralized to business units or processes.",
          "whyExtended": [
            "Feudal governance gives local units autonomy.",
            "The risk is fragmentation across the enterprise."
          ]
        },
        {
          "id": "federal",
          "description": "Federal",
          "correctCardId": "federal-desc",
          "correctLabel": "Corporate-level leaders and business-unit representatives share authority",
          "whyCorrect": "Federal combines central/corporate actors with business-unit representatives.",
          "whyWrong": "This description belongs to Federal because it mixes central and local authority.",
          "whyExtended": [
            "The lecture compares it to a federal political system.",
            "It tries to balance enterprise coordination with local knowledge."
          ]
        },
        {
          "id": "it-duopoly",
          "description": "IT Duopoly",
          "correctCardId": "it-duopoly-desc",
          "correctLabel": "IT leaders and one business group decide together",
          "whyCorrect": "IT Duopoly means IT and business representatives decide together.",
          "whyWrong": "This description belongs to IT Duopoly because it is specifically a two-party IT + business arrangement.",
          "whyExtended": [
            "The key cue is that IT shares decision rights with one business group.",
            "It differs from Federal, which combines broader central and local representation."
          ]
        },
        {
          "id": "anarchy",
          "description": "Anarchy",
          "correctCardId": "anarchy-desc",
          "correctLabel": "Individual users or small groups pursue their own IT agenda",
          "whyCorrect": "Anarchy means individual users or small groups follow their own IT agenda.",
          "whyWrong": "This description belongs to Anarchy because decision rights are effectively left to individuals or small groups.",
          "whyExtended": [
            "Anarchy is the most decentralized archetype.",
            "It can create problems for standardization, integration and security."
          ]
        }
      ]
    },
    {
      "id": 31,
      "type": "dragDrop",
      "title": "IT governance decision domains",
      "points": 3,
      "prompt": "Drag each description to the correct IT governance decision domain.",
      "source": "Source: Lecture 6, IT governance, Weill and Ross decision domains.",
      "moduleId": "cio-tool-box",
      "groupId": "it-governance",
      "cards": [
        {
          "id": "principles-domain-desc",
          "text": "IT's role in the enterprise and the high-level principles for using IT"
        },
        {
          "id": "architecture-domain-desc",
          "text": "Core processes, data integration and standardization of technical capabilities"
        },
        {
          "id": "infrastructure-domain-desc",
          "text": "Shared technical services and foundational IT capabilities"
        },
        {
          "id": "business-app-domain-desc",
          "text": "Business requirements and needs for applications"
        },
        {
          "id": "investment-domain-desc",
          "text": "Which IT initiatives should be funded and prioritized"
        }
      ],
      "targets": [
        {
          "id": "it-principles",
          "description": "IT Principles",
          "correctCardId": "principles-domain-desc",
          "correctLabel": "IT's role in the enterprise and the high-level principles for using IT",
          "whyCorrect": "IT Principles concerns IT's role and high-level direction in the enterprise.",
          "whyWrong": "This description belongs to IT Principles because it is about the overall role and principles of IT.",
          "whyExtended": [
            "IT principles translate business principles into guidelines for IT.",
            "They are broader than application needs or infrastructure services."
          ]
        },
        {
          "id": "it-architecture",
          "description": "IT Architecture",
          "correctCardId": "architecture-domain-desc",
          "correctLabel": "Core processes, data integration and standardization of technical capabilities",
          "whyCorrect": "IT Architecture concerns core processes, data integration and standardization.",
          "whyWrong": "This description belongs to IT Architecture because the key cues are integration and standardization.",
          "whyExtended": [
            "Architecture decisions define shared technical capabilities and process/data logic across the enterprise.",
            "This is where operating model concerns become relevant."
          ]
        },
        {
          "id": "it-infrastructure",
          "description": "IT Infrastructure",
          "correctCardId": "infrastructure-domain-desc",
          "correctLabel": "Shared technical services and foundational IT capabilities",
          "whyCorrect": "IT Infrastructure concerns shared technical services and foundational capabilities.",
          "whyWrong": "This description belongs to IT Infrastructure because it is about shared technical services.",
          "whyExtended": [
            "Examples include networks, identity, security services, cloud platforms and shared operations capabilities.",
            "Infrastructure decisions enable application and business capabilities."
          ]
        },
        {
          "id": "business-application-needs",
          "description": "Business Application Needs",
          "correctCardId": "business-app-domain-desc",
          "correctLabel": "Business requirements and needs for applications",
          "whyCorrect": "Business Application Needs concerns the applications required by business units and processes.",
          "whyWrong": "This description belongs to Business Application Needs because it starts from business requirements for applications.",
          "whyExtended": [
            "This domain is about what the business needs applications to do.",
            "It differs from architecture, which focuses on integration and standardization logic."
          ]
        },
        {
          "id": "it-investment",
          "description": "IT Investment",
          "correctCardId": "investment-domain-desc",
          "correctLabel": "Which IT initiatives should be funded and prioritized",
          "whyCorrect": "IT Investment concerns funding and prioritization of IT initiatives.",
          "whyWrong": "This description belongs to IT Investment because the key cue is funding and prioritization.",
          "whyExtended": [
            "Investment decisions determine which IT initiatives receive resources.",
            "This links governance to business case and portfolio prioritization."
          ]
        }
      ]
    },
    {
      "id": 32,
      "type": "dragDrop",
      "title": "Cynefin and management approach",
      "points": 2,
      "prompt": "Drag each management approach to the Cynefin domain where it best fits.",
      "source": "Source: CIO Toolbox lectures, Cynefin as a meta-tool for choosing management approach.",
      "moduleId": "cio-tool-box",
      "groupId": "cynefin",
      "cards": [
        {
          "id": "procedure-best-practice",
          "text": "Use procedures and best practice"
        },
        {
          "id": "expert-analysis-planning",
          "text": "Use expert analysis and planning"
        },
        {
          "id": "experimentation-learning",
          "text": "Use experimentation, design thinking and learning"
        },
        {
          "id": "immediate-action",
          "text": "Act immediately to stabilize the situation"
        }
      ],
      "targets": [
        {
          "id": "clear",
          "description": "Clear",
          "correctCardId": "procedure-best-practice",
          "correctLabel": "Use procedures and best practice",
          "whyCorrect": "Clear contexts are suited to procedures and best practice.",
          "whyWrong": "Procedures and best practice belong to Clear contexts, where cause and effect are obvious.",
          "whyExtended": [
            "In clear contexts the manager can sense, categorize and respond.",
            "The point is not to overcomplicate a routine situation."
          ]
        },
        {
          "id": "complicated",
          "description": "Complicated",
          "correctCardId": "expert-analysis-planning",
          "correctLabel": "Use expert analysis and planning",
          "whyCorrect": "Complicated contexts require expert analysis and planning.",
          "whyWrong": "Expert analysis and planning belong to Complicated contexts, where cause and effect exist but require expertise.",
          "whyExtended": [
            "Business case and alternative analysis fit this logic when the problem can be analyzed.",
            "There may be several good practices rather than one obvious best practice."
          ]
        },
        {
          "id": "complex",
          "description": "Complex",
          "correctCardId": "experimentation-learning",
          "correctLabel": "Use experimentation, design thinking and learning",
          "whyCorrect": "Complex contexts require experimentation, learning and iteration.",
          "whyWrong": "Experimentation belongs to Complex contexts, where the answer cannot be fully known in advance.",
          "whyExtended": [
            "Design thinking and agile/product-team approaches are useful when the problem or solution is uncertain.",
            "The manager probes, senses and responds."
          ]
        },
        {
          "id": "chaotic",
          "description": "Chaotic",
          "correctCardId": "immediate-action",
          "correctLabel": "Act immediately to stabilize the situation",
          "whyCorrect": "Chaotic contexts require immediate action to stabilize the situation.",
          "whyWrong": "Immediate action belongs to Chaotic contexts, where there is no time for detailed analysis before acting.",
          "whyExtended": [
            "The first goal is to establish enough order to move the situation out of chaos.",
            "Long analysis is usually inappropriate in the first response."
          ]
        }
      ]
    },
    {
      "id": 33,
      "type": "dragDrop",
      "title": "CIO toolbox tools and purposes",
      "points": 3,
      "prompt": "Drag each CIO toolbox tool to its typical purpose.",
      "source": "Source: CIO Toolbox lectures, overview table of tools and typical purposes.",
      "moduleId": "cio-tool-box",
      "groupId": "decision-making",
      "cards": [
        {
          "id": "tool-business-case",
          "text": "Business case"
        },
        {
          "id": "tool-alternative-analysis",
          "text": "Alternative analysis"
        },
        {
          "id": "tool-design-thinking",
          "text": "Design thinking"
        },
        {
          "id": "tool-it-architecture",
          "text": "IT Architecture"
        },
        {
          "id": "tool-projects",
          "text": "Projects"
        },
        {
          "id": "tool-product-teams",
          "text": "Product teams and agile methods"
        },
        {
          "id": "tool-it-governance",
          "text": "IT governance"
        }
      ],
      "targets": [
        {
          "id": "purpose-prioritization-funding",
          "description": "Prioritization of digital services and funding",
          "correctCardId": "tool-business-case",
          "correctLabel": "Business case",
          "whyCorrect": "Business case is used to prioritize digital services and funding.",
          "whyWrong": "Business case belongs with prioritization and funding because it compares expected benefit, cost, timing and risk.",
          "whyExtended": [
            "It is a decision-support and communication tool.",
            "It can include both NPV and non-quantifiable benefits."
          ]
        },
        {
          "id": "purpose-vendor-product-choice",
          "description": "Vendor selection and product choice",
          "correctCardId": "tool-alternative-analysis",
          "correctLabel": "Alternative analysis",
          "whyCorrect": "Alternative analysis is used for vendor selection and product choice.",
          "whyWrong": "Alternative analysis belongs with vendor/product choice because it structures options and evaluates alternatives.",
          "whyExtended": [
            "The generic process is: understand the situation, synthesize options, evaluate and propose.",
            "Business case can be one evaluation method inside alternative analysis."
          ]
        },
        {
          "id": "purpose-unclear-problem",
          "description": "Exploration when the problem is unclear",
          "correctCardId": "tool-design-thinking",
          "correctLabel": "Design thinking",
          "whyCorrect": "Design thinking is used when the problem is unclear and needs exploration.",
          "whyWrong": "Design thinking belongs with exploration because it uses user insight, reframing, prototyping and testing.",
          "whyExtended": [
            "It is useful when the organization is not sure what problem to solve.",
            "The Double Diamond is the core model in the lecture."
          ]
        },
        {
          "id": "purpose-structure-portfolio",
          "description": "Analyze and structure the IT portfolio",
          "correctCardId": "tool-it-architecture",
          "correctLabel": "IT Architecture",
          "whyCorrect": "IT Architecture is used to analyze and structure the IT portfolio.",
          "whyWrong": "IT Architecture belongs with structuring the IT portfolio within and among systems and services.",
          "whyExtended": [
            "Relevant subtopics are operating model, business process modeling and enterprise architecture.",
            "TOGAF is a framework connected to this tool."
          ]
        },
        {
          "id": "purpose-plan-organize-development",
          "description": "Plan and organize development",
          "correctCardId": "tool-projects",
          "correctLabel": "Projects",
          "whyCorrect": "Projects are used to plan and organize development as temporary organizations.",
          "whyWrong": "Projects belong with planning and organizing development because they deliver specified results within a specified period.",
          "whyExtended": [
            "PRINCE2 is an example of a project governance and management framework.",
            "Projects are especially relevant when work can be planned around a defined delivery."
          ]
        },
        {
          "id": "purpose-continuous-product-development",
          "description": "Continuous product development and operations",
          "correctCardId": "tool-product-teams",
          "correctLabel": "Product teams and agile methods",
          "whyCorrect": "Product teams and agile methods support continuous product development and operations.",
          "whyWrong": "Product teams belong with continuous product development because they have lasting ownership of a product or service.",
          "whyExtended": [
            "The key contrast with projects is lasting ownership rather than temporary delivery.",
            "Scrum and SAFe are examples of agile frameworks connected to this area."
          ]
        },
        {
          "id": "purpose-distribute-responsibility",
          "description": "Distribute responsibility for IT among organizational units",
          "correctCardId": "tool-it-governance",
          "correctLabel": "IT governance",
          "whyCorrect": "IT governance distributes responsibility for IT among organizational units.",
          "whyWrong": "IT governance belongs with distributing responsibility because it determines who makes IT decisions and who is accountable.",
          "whyExtended": [
            "Weill and Ross describe decision domains, archetypes and a governance matrix.",
            "The central dilemma is often centralization versus decentralization."
          ]
        }
      ]
    },
    {
      id: 34,
      type: "drag-categorize",
      title: "Project vs product team",
      points: 2,
      prompt: "Drag each statement to the organizing logic it best describes.",
      source: "Source: CIO Toolbox 2, projects, product teams and agile methods.",
      moduleId: "cio-tool-box",
      groupId: "triple-constraint",
      items: [
        { id: "temporary-organization", label: "Temporary organization" },
        { id: "specified-result-period", label: "Specified result within a specified period" },
        { id: "triple-constraint", label: "Scope, time and cost are central constraints" },
        { id: "lasting-ownership", label: "Lasting ownership of a digital product or service" },
        { id: "continuous-development-operations", label: "Continuous development and operations" },
        { id: "outcome-over-output", label: "Outcome over output; pivots and learning are expected" }
      ],
      categories: [
        { id: "project", label: "Project" },
        { id: "product-team", label: "Product team / agile methods" }
      ],
      correctAnswer: {
        project: ["temporary-organization", "specified-result-period", "triple-constraint"],
        "product-team": ["lasting-ownership", "continuous-development-operations", "outcome-over-output"]
      },
      itemFeedback: {
        "temporary-organization": {
          whyCorrect: "A project is a temporary organization.",
          whyWrong: "Temporary organization belongs to Project, not product team, because projects are established for a limited period.",
          whyExtended: [
            "The lecture defines a project as a temporary organization created to deliver one or more specified results or products.",
            "Product teams are more lasting structures."
          ]
        },
        "specified-result-period": {
          whyCorrect: "Specified result within a specified period is project logic.",
          whyWrong: "This belongs to Project because projects are defined around a deliverable and a time boundary.",
          whyExtended: [
            "Project planning often uses roadmaps, estimates, budgets and defined milestones.",
            "Product-team work is more continuous and outcome-oriented."
          ]
        },
        "triple-constraint": {
          whyCorrect: "Scope, time and cost are central to project management.",
          whyWrong: "Triple constraint belongs to Project because project delivery is often managed through scope, time and cost.",
          whyExtended: [
            "The lecture warns that projects where all three are fixed are especially vulnerable to disappointment.",
            "Product teams typically expect learning and adaptation rather than locking all constraints."
          ]
        },
        "lasting-ownership": {
          whyCorrect: "Lasting ownership is product-team logic.",
          whyWrong: "Lasting ownership belongs to Product team / agile methods, not temporary project logic.",
          whyExtended: [
            "Product teams own a digital product or service over time.",
            "They are responsible for continuous improvement, not just one delivery."
          ]
        },
        "continuous-development-operations": {
          whyCorrect: "Continuous development and operations is product-team logic.",
          whyWrong: "Continuous development and operations belongs to Product team / agile methods because the work continues after initial launch.",
          whyExtended: [
            "This is closer to DevOps/product thinking than project closure.",
            "The team keeps learning from use and improving the product."
          ]
        },
        "outcome-over-output": {
          whyCorrect: "Outcome over output, pivots and learning are product-team logic.",
          whyWrong: "Outcome over output belongs to Product team / agile methods because product teams optimize for value and learning, not only delivery of predefined outputs.",
          whyExtended: [
            "Product teams balance autonomy with alignment.",
            "Pivots are expected when learning shows that the original plan was wrong."
          ]
        }
      }
    },
    {
      "id": 35,
      "type": "dragDrop",
      "title": "Design thinking and the Double Diamond",
      "points": 2,
      "prompt": "Drag each activity to the correct Double Diamond phase.",
      "source": "Source: CIO Toolbox 2, Design thinking and the Double Diamond model.",
      "moduleId": "cio-tool-box",
      "groupId": "design-thinking",
      "cards": [
        {
          "id": "user-research",
          "text": "User research and understanding the situation"
        },
        {
          "id": "problem-reframing",
          "text": "Problem reframing and defining the challenge"
        },
        {
          "id": "generate-solution-ideas",
          "text": "Generate alternative solution ideas and co-design"
        },
        {
          "id": "prototype-test",
          "text": "Prototype, test, reject or improve solutions"
        }
      ],
      "targets": [
        {
          "id": "discover",
          "description": "Discover",
          "correctCardId": "user-research",
          "correctLabel": "User research and understanding the situation",
          "whyCorrect": "Discover is about understanding users and the situation.",
          "whyWrong": "User research belongs to Discover because this phase opens up the problem space.",
          "whyExtended": [
            "The aim is to learn from the people affected before defining the problem too narrowly.",
            "This is the first diverging phase of the Double Diamond."
          ]
        },
        {
          "id": "define",
          "description": "Define",
          "correctCardId": "problem-reframing",
          "correctLabel": "Problem reframing and defining the challenge",
          "whyCorrect": "Define is about reframing and specifying the challenge.",
          "whyWrong": "Problem reframing belongs to Define because this phase converges on a clearer problem statement.",
          "whyExtended": [
            "The point is not necessarily to find the one 'true' problem, but a better problem to solve.",
            "Define bridges insight and solution development."
          ]
        },
        {
          "id": "develop",
          "description": "Develop",
          "correctCardId": "generate-solution-ideas",
          "correctLabel": "Generate alternative solution ideas and co-design",
          "whyCorrect": "Develop is about generating solution ideas and co-designing alternatives.",
          "whyWrong": "Generating solution ideas belongs to Develop because this phase opens up the solution space.",
          "whyExtended": [
            "Teams explore possible answers to the defined problem.",
            "Co-design and external inspiration are typical practices."
          ]
        },
        {
          "id": "deliver",
          "description": "Deliver",
          "correctCardId": "prototype-test",
          "correctLabel": "Prototype, test, reject or improve solutions",
          "whyCorrect": "Deliver is about prototyping, testing and improving or rejecting solutions.",
          "whyWrong": "Prototype and testing belongs to Deliver because this phase narrows solutions through small-scale testing.",
          "whyExtended": [
            "Deliver does not mean launching blindly; it means testing which solution works.",
            "Poor solutions should be rejected or improved."
          ]
        }
      ]
    },
    {
      id: 36,
      type: "drag-categorize",
      title: "Business case factors",
      points: 2,
      prompt: "Drag each card to the correct business case category.",
      source: "Source: CIO Toolbox 1, business case, utility maximisation and non-quantifiable benefits.",
      moduleId: "cio-tool-box",
      groupId: "business-case",
      items: [
        { id: "expected-benefit", label: "Expected benefit" },
        { id: "expected-cost", label: "Expected cost" },
        { id: "timing", label: "Timing: when benefits and costs occur" },
        { id: "risk", label: "Risk that benefits or costs differ from estimates" },
        { id: "compliance", label: "Compliance with legal or regulatory requirements" },
        { id: "security-safety", label: "Security or safety improvements" }
      ],
      categories: [
        { id: "business-case-factor", label: "Business case factor" },
        { id: "non-quantifiable-benefit", label: "Non-quantifiable benefit" }
      ],
      correctAnswer: {
        "business-case-factor": ["expected-benefit", "expected-cost", "timing", "risk"],
        "non-quantifiable-benefit": ["compliance", "security-safety"]
      },
      itemFeedback: {
        "expected-benefit": {
          whyCorrect: "Expected benefit is one of the core factors in utility maximisation.",
          whyWrong: "Expected benefit belongs to Business case factor because it is one of the four main factors: benefit, cost, timing and risk.",
          whyExtended: [
            "Benefits may be monetary or non-monetary.",
            "The difficult part is estimating them realistically."
          ]
        },
        "expected-cost": {
          whyCorrect: "Expected cost is one of the core factors in utility maximisation.",
          whyWrong: "Expected cost belongs to Business case factor because cost is part of comparing options.",
          whyExtended: [
            "Cost includes investment and often operating/maintenance costs.",
            "Cost estimates are uncertain and should be treated as assumptions."
          ]
        },
        timing: {
          whyCorrect: "Timing is one of the core factors because benefits in the future are discounted.",
          whyWrong: "Timing belongs to Business case factor because when benefits and costs happen affects value.",
          whyExtended: [
            "This is why present value and NPV matter in financial business cases.",
            "Benefits later in time are worth less today than immediate benefits."
          ]
        },
        risk: {
          whyCorrect: "Risk is one of the core factors because estimates may be wrong.",
          whyWrong: "Risk belongs to Business case factor because decision-makers must consider uncertainty in benefits and costs.",
          whyExtended: [
            "Risk can be reflected in a risk premium or a higher discount rate.",
            "Qualitative risk discussion is often necessary when numbers are uncertain."
          ]
        },
        compliance: {
          whyCorrect: "Compliance is a non-quantifiable benefit often considered alongside NPV.",
          whyWrong: "Compliance belongs to Non-quantifiable benefit because it can be crucial even when it is hard to price directly.",
          whyExtended: [
            "Some initiatives are necessary to meet legal or regulatory requirements.",
            "The business case is therefore not only about financial returns."
          ]
        },
        "security-safety": {
          whyCorrect: "Security and safety improvements are non-quantifiable benefits.",
          whyWrong: "Security or safety belongs to Non-quantifiable benefit because the value may be hard to express as cash flow.",
          whyExtended: [
            "Avoided incidents, resilience and safety can be strategically important.",
            "They should be presented alongside quantitative calculations."
          ]
        }
      }
    },
    {
      id: 37,
      type: "drag-categorize",
      title: "Sustainability reporting: Scope 1, 2 and 3",
      points: 2,
      prompt: "Drag each emissions example to the correct reporting scope.",
      source: "Source: Sustainability lecture, sustainability reporting and Scope 1, 2 and 3.",
      moduleId: "sustainability",
      groupId: "reporting",
      items: [
        { id: "company-vehicles", label: "Fuel burned by company-owned vehicles" },
        { id: "onsite-boilers", label: "Emissions from company-controlled boilers or generators" },
        { id: "purchased-electricity", label: "Purchased electricity used in offices or data centers" },
        { id: "purchased-heating-cooling", label: "Purchased heating, cooling or steam" },
        { id: "supplier-emissions", label: "Emissions from suppliers and purchased goods" },
        { id: "business-travel", label: "Business travel and employee commuting" },
        { id: "customer-use", label: "Customer use of the organization's products" }
      ],
      categories: [
        { id: "scope-1", label: "Scope 1: Direct emissions" },
        { id: "scope-2", label: "Scope 2: Purchased energy" },
        { id: "scope-3", label: "Scope 3: Value-chain emissions" }
      ],
      correctAnswer: {
        "scope-1": ["company-vehicles", "onsite-boilers"],
        "scope-2": ["purchased-electricity", "purchased-heating-cooling"],
        "scope-3": ["supplier-emissions", "business-travel", "customer-use"]
      },
      itemFeedback: {
        "company-vehicles": {
          whyCorrect: "Company-owned vehicles create direct emissions, so they are Scope 1.",
          whyWrong: "Company-owned vehicle emissions belong to Scope 1 because the organization directly controls the source.",
          whyExtended: [
            "Scope 1 covers direct emissions from sources owned or controlled by the organization.",
            "The key cue is direct control of the emitting asset."
          ]
        },
        "onsite-boilers": {
          whyCorrect: "Company-controlled boilers or generators create direct Scope 1 emissions.",
          whyWrong: "On-site company-controlled combustion belongs to Scope 1 because the organization directly emits the greenhouse gases.",
          whyExtended: [
            "Scope 1 includes direct emissions from owned or controlled facilities.",
            "This differs from purchased electricity, which is Scope 2."
          ]
        },
        "purchased-electricity": {
          whyCorrect: "Purchased electricity is Scope 2.",
          whyWrong: "Purchased electricity belongs to Scope 2 because the emissions are indirect but energy-related.",
          whyExtended: [
            "The organization uses the electricity, but the emissions occur where the electricity is generated.",
            "This is the classic Scope 2 example."
          ]
        },
        "purchased-heating-cooling": {
          whyCorrect: "Purchased heating, cooling or steam is Scope 2.",
          whyWrong: "Purchased heating/cooling belongs to Scope 2 because it is purchased energy.",
          whyExtended: [
            "Scope 2 covers indirect emissions from purchased electricity, heat, steam or cooling.",
            "The organization consumes the energy even if it does not directly emit at the generation site."
          ]
        },
        "supplier-emissions": {
          whyCorrect: "Supplier emissions are Scope 3 value-chain emissions.",
          whyWrong: "Supplier emissions belong to Scope 3 because they occur in the upstream value chain.",
          whyExtended: [
            "Scope 3 includes indirect emissions outside Scope 2, such as purchased goods and services.",
            "These emissions are often difficult to measure but important for reporting."
          ]
        },
        "business-travel": {
          whyCorrect: "Business travel and commuting are Scope 3 value-chain emissions.",
          whyWrong: "Business travel and commuting belong to Scope 3 because they are indirect value-chain emissions.",
          whyExtended: [
            "They are caused by the organization's activity but usually occur in assets not owned or controlled by the organization.",
            "This makes them neither Scope 1 nor Scope 2."
          ]
        },
        "customer-use": {
          whyCorrect: "Customer use of products is Scope 3 downstream value-chain emissions.",
          whyWrong: "Customer use belongs to Scope 3 because it happens downstream in the value chain.",
          whyExtended: [
            "Scope 3 can include both upstream and downstream emissions.",
            "For some products, customer use is the largest part of lifecycle emissions."
          ]
        }
      }
    },
    {
      "id": 38,
      "type": "dragDrop",
      "title": "Digital strategy elements",
      "points": 2,
      "prompt": "Drag each meaning to the correct element of a digital strategy.",
      "source": "Source: Digital strategy lecture, content of a digital strategy.",
      "moduleId": "strategy",
      "groupId": "digital-strategy",
      "cards": [
        {
          "id": "vision-meaning",
          "text": "A challenging and inspiring direction for digital change"
        },
        {
          "id": "portfolio-meaning",
          "text": "A prioritized set of digital initiatives"
        },
        {
          "id": "roadmap-meaning",
          "text": "A planning tool for timing and sequencing initiatives"
        },
        {
          "id": "responsibility-meaning",
          "text": "A definition of who owns and is accountable for what"
        }
      ],
      "targets": [
        {
          "id": "digital-vision",
          "description": "Digital vision",
          "correctCardId": "vision-meaning",
          "correctLabel": "A challenging and inspiring direction for digital change",
          "whyCorrect": "A digital vision gives a challenging and inspiring direction.",
          "whyWrong": "This meaning belongs to Digital vision because it is about direction and ambition.",
          "whyExtended": [
            "A digital vision should guide digital initiatives, not just describe a system purchase.",
            "It connects digital resources to desired value creation."
          ]
        },
        {
          "id": "portfolio-of-initiatives",
          "description": "Portfolio of digital initiatives",
          "correctCardId": "portfolio-meaning",
          "correctLabel": "A prioritized set of digital initiatives",
          "whyCorrect": "A portfolio of digital initiatives is the prioritized set of digital efforts.",
          "whyWrong": "This meaning belongs to Portfolio of digital initiatives because it is about choosing and prioritizing initiatives.",
          "whyExtended": [
            "The portfolio turns the vision into a set of concrete initiatives.",
            "It creates a bridge to prioritization and funding decisions."
          ]
        },
        {
          "id": "roadmap",
          "description": "Roadmap",
          "correctCardId": "roadmap-meaning",
          "correctLabel": "A planning tool for timing and sequencing initiatives",
          "whyCorrect": "A roadmap is a planning tool for timing and sequencing.",
          "whyWrong": "This meaning belongs to Roadmap because it is about when and in what order initiatives should happen.",
          "whyExtended": [
            "The roadmap does not only list initiatives; it sequences them over time.",
            "It helps coordinate dependencies and communicate the journey."
          ]
        },
        {
          "id": "definition-of-responsibility",
          "description": "Definition of responsibility",
          "correctCardId": "responsibility-meaning",
          "correctLabel": "A definition of who owns and is accountable for what",
          "whyCorrect": "Definition of responsibility clarifies ownership and accountability.",
          "whyWrong": "This meaning belongs to Definition of responsibility because it answers who owns what.",
          "whyExtended": [
            "Without responsibility, a digital strategy can become a wish list rather than an execution plan.",
            "This connects digital strategy to governance and accountability."
          ]
        }
      ]
    },
    {
      "id": 39,
      "type": "drag-categorize",
      "title": "Course structure: three parts of IN5431",
      "points": 3,
      "prompt": "Drag each topic to the part of the IN5431 curriculum where it primarily belongs.",
      "source": "Source: Lecture 2, course outline: Strategy and strategic context; Management tools and frameworks — the CIO toolkit; Designed for digital.",
      "moduleId": "strategy",
      "groupId": "action-plan",
      "items": [
        { "id": "purpose", "label": "Purpose" },
        { "id": "strategic-goals", "label": "Strategic goals" },
        { "id": "stakeholders", "label": "Stakeholders" },
        { "id": "operational-effectiveness", "label": "Operational effectiveness" },
        { "id": "strategic-positioning", "label": "Strategic positioning" },
        { "id": "action-plan-roadmap", "label": "Action plan / roadmap" },
        { "id": "business-case", "label": "Business case" },
        { "id": "alternative-analysis", "label": "Alternative analysis" },
        { "id": "design-thinking", "label": "Design thinking" },
        { "id": "it-architecture-tool", "label": "IT Architecture" },
        { "id": "projects", "label": "Projects" },
        { "id": "product-teams-agile", "label": "Product teams and agile methods" },
        { "id": "it-governance-tool", "label": "IT governance" },
        { "id": "cynefin", "label": "Cynefin" },
        { "id": "digital-business-design", "label": "Digital business design" },
        { "id": "digital-offerings", "label": "Digital offerings" },
        { "id": "shared-customer-insights", "label": "Shared Customer Insights" },
        { "id": "operational-backbone", "label": "Operational Backbone" },
        { "id": "digital-platform", "label": "Digital Platform" },
        { "id": "accountability-framework", "label": "Accountability Framework" },
        { "id": "external-developer-platform", "label": "External Developer Platform" }
      ],
      "categories": [
        { "id": "strategy-context", "label": "Strategy and strategic context" },
        { "id": "cio-toolkit", "label": "Management tools and frameworks — the CIO toolkit" },
        { "id": "designed-for-digital", "label": "Designed for digital" }
      ],
      "correctAnswer": {
        "strategy-context": [
          "purpose",
          "strategic-goals",
          "stakeholders",
          "operational-effectiveness",
          "strategic-positioning",
          "action-plan-roadmap"
        ],
        "cio-toolkit": [
          "business-case",
          "alternative-analysis",
          "design-thinking",
          "it-architecture-tool",
          "projects",
          "product-teams-agile",
          "it-governance-tool",
          "cynefin"
        ],
        "designed-for-digital": [
          "digital-business-design",
          "digital-offerings",
          "shared-customer-insights",
          "operational-backbone",
          "digital-platform",
          "accountability-framework",
          "external-developer-platform"
        ]
      },
      "itemFeedback": {
        "purpose": {
          "whyCorrect": "Purpose belongs to Strategy and strategic context.",
          "whyWrong": "Purpose belongs to Strategy and strategic context, because this part of the course asks what the organization is trying to achieve and for whom.",
          "whyExtended": [
            "The strategy lecture links purpose to goals, stakeholders and alignment.",
            "It frames later choices about IT initiatives and management tools."
          ]
        },
        "strategic-goals": {
          "whyCorrect": "Strategic goals belong to Strategy and strategic context.",
          "whyWrong": "Strategic goals belong to Strategy and strategic context, because they define what the organization should improve or achieve before tools are selected.",
          "whyExtended": [
            "The course first establishes the strategic context: what should be improved in the coming years?",
            "CIO toolbox methods are then used to analyze, prioritize and organize initiatives that support those goals."
          ]
        },
        "stakeholders": {
          "whyCorrect": "Stakeholders belong to Strategy and strategic context.",
          "whyWrong": "Stakeholders belong to Strategy and strategic context, because the strategy lecture discusses owners, members, citizens, politicians, boards and administration as sources of goals and expectations.",
          "whyExtended": [
            "Stakeholders explain who the organization is working for and who can define or constrain strategic goals.",
            "This context matters before deciding which IT initiatives or frameworks make sense."
          ]
        },
        "operational-effectiveness": {
          "whyCorrect": "Operational effectiveness belongs to Strategy and strategic context.",
          "whyWrong": "Operational effectiveness belongs to Strategy and strategic context, especially in the Porter distinction between operational effectiveness and strategic positioning.",
          "whyExtended": [
            "Operational effectiveness means performing similar activities better than rivals.",
            "The strategy lecture stresses that operational effectiveness is necessary, but not the same as strategy."
          ]
        },
        "strategic-positioning": {
          "whyCorrect": "Strategic positioning belongs to Strategy and strategic context.",
          "whyWrong": "Strategic positioning belongs to Strategy and strategic context, because it concerns performing different activities or similar activities in different ways.",
          "whyExtended": [
            "This comes from the strategy part of the course, especially Porter's view of strategy.",
            "It provides context for deciding what digital and IT initiatives should support."
          ]
        },
        "action-plan-roadmap": {
          "whyCorrect": "Action plan / roadmap belongs to Strategy and strategic context.",
          "whyWrong": "Action plan / roadmap belongs to Strategy and strategic context here, because the strategy process should produce activities, responsibilities, sequencing and estimates.",
          "whyExtended": [
            "The action plan translates strategic goals into concrete work.",
            "Later CIO toolbox methods can help evaluate, organize and govern that work."
          ]
        },
        "business-case": {
          "whyCorrect": "Business case belongs to Management tools and frameworks — the CIO toolkit.",
          "whyWrong": "Business case belongs to the CIO toolkit, because it is a decision tool for prioritizing digital services and funding.",
          "whyExtended": [
            "The business case is used to compare benefits, costs, timing and risk.",
            "It is a management tool, not one of the D4D building blocks."
          ]
        },
        "alternative-analysis": {
          "whyCorrect": "Alternative analysis belongs to Management tools and frameworks — the CIO toolkit.",
          "whyWrong": "Alternative analysis belongs to the CIO toolkit, because it supports vendor selection, product choice and evaluation of alternative concepts.",
          "whyExtended": [
            "The generic decision-making process moves from understanding the situation to synthesizing options and evaluating them.",
            "Business case can be one method inside the evaluation step."
          ]
        },
        "design-thinking": {
          "whyCorrect": "Design thinking belongs to Management tools and frameworks — the CIO toolkit.",
          "whyWrong": "Design thinking belongs to the CIO toolkit, because it is an explorative approach for unclear problems and product/service choices.",
          "whyExtended": [
            "Design thinking is especially relevant when the problem is not yet well understood.",
            "It connects to discovery, reframing, prototyping and testing."
          ]
        },
        "it-architecture-tool": {
          "whyCorrect": "IT Architecture belongs to Management tools and frameworks — the CIO toolkit.",
          "whyWrong": "IT Architecture belongs to the CIO toolkit, because it is used to analyze and structure the IT portfolio, systems and services.",
          "whyExtended": [
            "This includes operating models, business processes and enterprise architecture perspectives such as TOGAF.",
            "It is part of the management toolbox even though architecture also connects to Designed for Digital."
          ]
        },
        "projects": {
          "whyCorrect": "Projects belongs to Management tools and frameworks — the CIO toolkit.",
          "whyWrong": "Projects belongs to the CIO toolkit, because projects are a way to plan and organize development work.",
          "whyExtended": [
            "A project is a temporary organization established to deliver specified results within a specified period.",
            "Project governance frameworks such as PRINCE2 are discussed in this part of the course."
          ]
        },
        "product-teams-agile": {
          "whyCorrect": "Product teams and agile methods belongs to Management tools and frameworks — the CIO toolkit.",
          "whyWrong": "Product teams and agile methods belongs to the CIO toolkit, because it concerns how to organize development and operations around lasting digital products.",
          "whyExtended": [
            "Product teams emphasize lasting ownership, continuous development and outcome over output.",
            "Scrum and SAFe are examples of agile frameworks associated with this area."
          ]
        },
        "it-governance-tool": {
          "whyCorrect": "IT governance belongs to Management tools and frameworks — the CIO toolkit.",
          "whyWrong": "IT governance belongs to the CIO toolkit, because it concerns who makes IT decisions and who is accountable for outcomes.",
          "whyExtended": [
            "The course uses Weill and Ross to discuss decision domains and governance archetypes.",
            "IT governance distributes responsibility for IT among organizational units."
          ]
        },
        "cynefin": {
          "whyCorrect": "Cynefin belongs to Management tools and frameworks — the CIO toolkit.",
          "whyWrong": "Cynefin belongs to the CIO toolkit area in this course, because it helps choose a management approach based on context.",
          "whyExtended": [
            "Cynefin connects analysis, planning, experimentation and immediate action to different types of situations.",
            "It functions as a meta-tool for choosing among other management approaches."
          ]
        },
        "digital-business-design": {
          "whyCorrect": "Digital business design belongs to Designed for digital.",
          "whyWrong": "Digital business design belongs to Designed for digital, because it is the central organizing idea in the D4D part of the course.",
          "whyExtended": [
            "It concerns the holistic configuration of people, processes and technology to deliver digital value propositions.",
            "It is broader than IT architecture alone."
          ]
        },
        "digital-offerings": {
          "whyCorrect": "Digital offerings belongs to Designed for digital.",
          "whyWrong": "Digital offerings belongs to Designed for digital, because D4D focuses on new software-enabled offerings and value propositions.",
          "whyExtended": [
            "Digital offerings are specific solutions that deliver a company's digital value proposition.",
            "They sit at the intersection of customer desires and digitally inspired solutions."
          ]
        },
        "shared-customer-insights": {
          "whyCorrect": "Shared Customer Insights belongs to Designed for digital.",
          "whyWrong": "Shared Customer Insights belongs to Designed for digital, because it is one of the five D4D building blocks.",
          "whyExtended": [
            "It is organizational learning about what customers will pay for and how digital technologies can meet customer demands.",
            "It supports experimentation and discovery of valuable digital offerings."
          ]
        },
        "operational-backbone": {
          "whyCorrect": "Operational Backbone belongs to Designed for digital.",
          "whyWrong": "Operational Backbone belongs to Designed for digital, because it is one of the five D4D building blocks.",
          "whyExtended": [
            "It is the standardized and integrated foundation of systems, processes and data supporting core operations.",
            "It provides reliability and efficiency for digital business."
          ]
        },
        "digital-platform": {
          "whyCorrect": "Digital Platform belongs to Designed for digital.",
          "whyWrong": "Digital Platform belongs to Designed for digital, because it is one of the five D4D building blocks.",
          "whyExtended": [
            "It is a repository of reusable business, data and infrastructure components.",
            "It enables faster configuration of new digital offerings."
          ]
        },
        "accountability-framework": {
          "whyCorrect": "Accountability Framework belongs to Designed for digital.",
          "whyWrong": "Accountability Framework belongs to Designed for digital, because it is one of the five D4D building blocks.",
          "whyExtended": [
            "It distributes responsibilities for digital offerings and components.",
            "It balances autonomy and alignment in digital business design."
          ]
        },
        "external-developer-platform": {
          "whyCorrect": "External Developer Platform belongs to Designed for digital.",
          "whyWrong": "External Developer Platform belongs to Designed for digital, because it is one of the five D4D building blocks.",
          "whyExtended": [
            "It opens digital components to external partners, often through APIs or other boundary resources.",
            "It is relevant when the company wants partners or ecosystems to extend its digital offerings."
          ]
        }
      }
    },
    {
      "id": 40,
      "type": "dragDrop",
      "title": "TOGAF architecture taxonomy",
      "points": 3,
      "prompt": "Drag each TOGAF architecture type to the description it fits best.",
      "source": "Source: Lecture 5, CIO Toolbox 3, slide 'Architecture taxonomy (according to TOGAF)'.",
      "moduleId": "cio-tool-box",
      "groupId": "enterprise-architecture",
      "cards": [
        {
          "id": "togaf-business-architecture",
          "text": "Business Architecture"
        },
        {
          "id": "togaf-data-architecture",
          "text": "Data Architecture"
        },
        {
          "id": "togaf-application-architecture",
          "text": "Application Architecture"
        },
        {
          "id": "togaf-technology-architecture",
          "text": "Technology Architecture"
        }
      ],
      "targets": [
        {
          "id": "business-architecture",
          "description": "Defines business strategy, governance, organization and key business processes",
          "correctCardId": "togaf-business-architecture",
          "correctLabel": "Business Architecture",
          "whyCorrect": "Business Architecture describes the business side of the enterprise: strategy, governance, organization and key business processes.",
          "whyWrong": "This description belongs to Business Architecture, because it concerns the organization's strategy, governance, structure and business processes rather than data, applications or infrastructure.",
          "whyExtended": [
            "In the TOGAF taxonomy, Business Architecture is the architecture layer closest to strategy and organizational design.",
            "It defines how the business works before specifying which data, applications and technology are needed to support it.",
            "This connects TOGAF to the CIO toolbox purpose of understanding and structuring the IT portfolio in relation to business needs."
          ]
        },
        {
          "id": "data-architecture",
          "description": "Describes logical and physical data assets and data management resources",
          "correctCardId": "togaf-data-architecture",
          "correctLabel": "Data Architecture",
          "whyCorrect": "Data Architecture describes the structure of data assets and data management resources.",
          "whyWrong": "This description belongs to Data Architecture, because it is about data assets and data management, not business processes, application interaction or technical infrastructure.",
          "whyExtended": [
            "Data Architecture matters because integration and standardization often depend on shared definitions of data and master data.",
            "It links naturally to topics such as the operating model and the Operational Backbone in Designed for Digital.",
            "Without a shared data architecture, application integration and enterprise-wide reporting become much harder."
          ]
        },
        {
          "id": "application-architecture",
          "description": "Provides a blueprint for applications, their interactions and their relationship to core business processes",
          "correctCardId": "togaf-application-architecture",
          "correctLabel": "Application Architecture",
          "whyCorrect": "Application Architecture describes applications, how they interact and how they support core business processes.",
          "whyWrong": "This description belongs to Application Architecture, because it is about the application portfolio and its relationship to business processes.",
          "whyExtended": [
            "Application Architecture is central when analyzing and structuring an organization's systems portfolio.",
            "It helps distinguish which applications support core processes, which applications should interact, and where duplication or fragmentation exists.",
            "This is why TOGAF appears under IT Architecture in the CIO toolbox."
          ]
        },
        {
          "id": "technology-architecture",
          "description": "Describes software and hardware capabilities such as infrastructure, middleware, networks and standards",
          "correctCardId": "togaf-technology-architecture",
          "correctLabel": "Technology Architecture",
          "whyCorrect": "Technology Architecture describes the technical capabilities needed to support business, data and application services.",
          "whyWrong": "This description belongs to Technology Architecture, because it concerns infrastructure, middleware, networks, processing and standards.",
          "whyExtended": [
            "Technology Architecture is the most technical layer in the TOGAF taxonomy.",
            "It supports the deployment of business, data and application services.",
            "It should not be confused with Application Architecture: applications are software systems and interactions; technology architecture is the underlying technical capability."
          ]
        }
      ]
    },
    {
      "id": 41,
      "type": "dragDrop",
      "title": "Architecture perspectives: TOGAF, Fowler and Open Agile Architecture",
      "points": 3,
      "prompt": "Drag each architecture perspective to the description that best captures it in the course.",
      "source": "Source: Lecture 5, CIO Toolbox 3, slides on different views on architecture and Open Agile Architecture.",
      "moduleId": "cio-tool-box",
      "groupId": "enterprise-architecture",
      "cards": [
        {
          "id": "perspective-togaf",
          "text": "TOGAF"
        },
        {
          "id": "perspective-fowler",
          "text": "Martin Fowler"
        },
        {
          "id": "perspective-open-agile",
          "text": "Open Agile Architecture"
        },
        {
          "id": "perspective-enterprise-architecture",
          "text": "Enterprise Architecture"
        }
      ],
      "targets": [
        {
          "id": "formal-centralized",
          "description": "Formal and often centralized perspective on architecture work",
          "correctCardId": "perspective-togaf",
          "correctLabel": "TOGAF",
          "whyCorrect": "TOGAF represents the formal, often centralized view of architecture work in the lecture.",
          "whyWrong": "This description belongs to TOGAF, because the lecture explicitly contrasts TOGAF's formal/centralized orientation with Fowler's more decentralized perspective.",
          "whyExtended": [
            "TOGAF is presented as an enterprise architecture framework from The Open Group.",
            "It is associated with architecture governance and structured methods such as ADM.",
            "This is why it maps to the IT Architecture tool in the CIO toolbox."
          ]
        },
        {
          "id": "important-stuff",
          "description": "Architecture is 'the important stuff'; collaborative and more decentralized orientation",
          "correctCardId": "perspective-fowler",
          "correctLabel": "Martin Fowler",
          "whyCorrect": "Fowler's perspective is that architecture is about what developers and stakeholders regard as important.",
          "whyWrong": "This description belongs to Martin Fowler, because the lecture uses Fowler to represent a more meritocratic and decentralized perspective on architecture.",
          "whyExtended": [
            "The lecture contrasts Fowler with TOGAF: Fowler is closer to agile development thinking.",
            "His view emphasizes judgment, collaboration and attention to what actually matters in a given system.",
            "This does not mean architecture is unimportant; it means the architectural boundary depends on context."
          ]
        },
        {
          "id": "modularity-standardization-responsiveness",
          "description": "Modularity, standardization and built-in responsiveness to change",
          "correctCardId": "perspective-open-agile",
          "correctLabel": "Open Agile Architecture",
          "whyCorrect": "Open Agile Architecture is summarized in the lecture by modularity, standardization and responsiveness to change.",
          "whyWrong": "This description belongs to Open Agile Architecture, because the lecture presents it as an alternative to TOGAF with modularity, standardization and built-in responsiveness to change.",
          "whyExtended": [
            "Modularity supports team autonomy and resilience.",
            "Standardization supports reconfiguration of products and operating models.",
            "Responsiveness to change keeps architecture from becoming a static control mechanism."
          ]
        },
        {
          "id": "optimize-fragmented-legacy",
          "description": "Optimize fragmented processes into an integrated environment that supports business strategy",
          "correctCardId": "perspective-enterprise-architecture",
          "correctLabel": "Enterprise Architecture",
          "whyCorrect": "Enterprise Architecture is presented as an approach for optimizing fragmented processes and systems into an integrated environment that supports strategy.",
          "whyWrong": "This description belongs to Enterprise Architecture as a broader field, not to one specific named framework or author.",
          "whyExtended": [
            "Enterprise Architecture is broader than TOGAF, although TOGAF is a major framework for doing enterprise architecture work.",
            "The lecture emphasizes that organizations often have fragmented legacy processes and systems.",
            "EA aims to create an integrated environment responsive to change and supportive of business strategy."
          ]
        }
      ]
    },
    {
      "id": 42,
      "type": "single",
      "title": "TOGAF ADM",
      "points": 1,
      "prompt": "In the TOGAF context, what is ADM?",
      "source": "Source: Lecture 5, CIO Toolbox 3, slide 'TOGAF: The Architecture Development Method (ADM)'.",
      "moduleId": "cio-tool-box",
      "groupId": "enterprise-architecture",
      "options": [
        {
          "text": "Architecture Development Method — a structured method for developing and managing enterprise architecture",
          "correct": true,
          "why": "Correct: ADM stands for Architecture Development Method and is the core structured method in TOGAF.",
          "whyExtended": [
            "The lecture presents TOGAF through the Architecture Development Method (ADM).",
            "ADM structures architecture work through phases and governance rather than treating architecture as an ad hoc activity.",
            "In the CIO toolbox, this belongs under IT Architecture because it helps analyze and structure the IT portfolio and architecture work.",
            "A key exam cue is the word 'method': TOGAF is not only a taxonomy of architecture layers, but also a method for architecture development."
          ]
        },
        {
          "text": "Agile Delivery Model — a Scrum method for sprint planning",
          "correct": false,
          "why": "Wrong: ADM is not a Scrum or sprint-planning method.",
          "whyExtended": [
            "Scrum belongs to agile software delivery and product teams, not to TOGAF's enterprise architecture method.",
            "ADM stands for Architecture Development Method, not Agile Delivery Model.",
            "TOGAF is mapped to IT Architecture, while Scrum is mapped to Product teams and agile methods in the frameworks slide.",
            "This distinction is important because both are frameworks, but they support different management problems."
          ]
        },
        {
          "text": "Application Data Matrix — a list of database tables for one application",
          "correct": false,
          "why": "Wrong: TOGAF includes Data and Application Architecture, but ADM does not mean Application Data Matrix.",
          "whyExtended": [
            "ADM is a method for architecture development across the enterprise, not a local database artifact.",
            "The TOGAF taxonomy includes Business, Data, Application and Technology Architecture, but ADM refers to the process/method side of TOGAF.",
            "Application and data concerns may appear within ADM work, but they are not the meaning of ADM itself.",
            "Do not confuse architecture layers with the Architecture Development Method."
          ]
        },
        {
          "text": "Automated Decision Management — a governance model for replacing architects with automated rules",
          "correct": false,
          "why": "Wrong: ADM is about structured architecture development, not automating away architectural judgment.",
          "whyExtended": [
            "The lecture emphasizes that architecture work still requires judgment about what should be coordinated centrally and what can be decentralized.",
            "TOGAF may be formal and centralized, but it is not described as automated decision-making.",
            "Frameworks guide architecture work; they do not replace leadership, dialogue and contextual judgment.",
            "The correct expansion is Architecture Development Method."
          ]
        }
      ]
    },
    {
      "id": 43,
      "type": "multi",
      "title": "TOGAF and enterprise architecture caveats",
      "points": 1,
      "prompt": "Mark the statements that fit how TOGAF and enterprise architecture are presented in the course.",
      "source": "Source: Lecture 5, CIO Toolbox 3, slides on TOGAF, Enterprise Architecture and different architecture perspectives.",
      "moduleId": "cio-tool-box",
      "groupId": "enterprise-architecture",
      "options": [
        {
          "text": "TOGAF is associated with enterprise architecture and a formal, often centralized perspective on architecture work.",
          "correct": true,
          "why": "Correct: the lecture explicitly presents TOGAF as formal and often centralized.",
          "whyExtended": [
            "TOGAF is introduced as a framework for enterprise architecture.",
            "The Open Group, through TOGAF, represents the formal and often centralized perspective in the lecture.",
            "This contrasts with Fowler's more meritocratic and decentralized architecture perspective.",
            "The point is not that TOGAF is always wrong, but that its usefulness depends on context."
          ]
        },
        {
          "text": "Enterprise architecture aims to reduce fragmentation and create an integrated environment that supports business strategy.",
          "correct": true,
          "why": "Correct: this is the purpose of enterprise architecture presented in the lecture.",
          "whyExtended": [
            "The lecture defines the purpose of enterprise architecture as optimizing fragmented legacy processes into an integrated environment.",
            "The target environment should be responsive to change and supportive of business strategy delivery.",
            "This explains why enterprise architecture sits between business processes and IT architecture in the CIO toolbox.",
            "It is not just technical documentation; it is supposed to support strategic execution."
          ]
        },
        {
          "text": "TOGAF replaces the need to understand business processes because it is only about hardware and networks.",
          "correct": false,
          "why": "Wrong: TOGAF includes Business Architecture and Application/Data layers, not only hardware and networks.",
          "whyExtended": [
            "The TOGAF taxonomy includes Business, Data, Application and Technology Architecture.",
            "Business Architecture explicitly covers business strategy, governance, organization and key business processes.",
            "Technology Architecture is only one of the four layers, not the whole framework.",
            "The lecture places TOGAF in the broader context of business processes and IT architecture."
          ]
        },
        {
          "text": "Enterprise architecture initiatives can become too top-down and continue without producing concrete business value.",
          "correct": true,
          "why": "Correct: the course notes that EA can be hard, top-down and sometimes criticized for limited concrete results.",
          "whyExtended": [
            "The course summary notes that enterprise architecture management can be holistic and useful for complex portfolios, but difficult in practice.",
            "A common challenge is that EA initiatives can seem to go on forever without concrete results.",
            "The lecture also contrasts central coordination with more decentralized architecture thinking.",
            "This is why the exam point is not 'TOGAF is always best', but 'TOGAF is one formal architecture framework whose value is context-sensitive'."
          ]
        },
        {
          "text": "Fowler and TOGAF are presented as identical views with different names.",
          "correct": false,
          "why": "Wrong: the lecture explicitly contrasts TOGAF and Fowler as different architecture perspectives.",
          "whyExtended": [
            "TOGAF is the formal, often centralized perspective.",
            "Fowler represents a more meritocratic and decentralized perspective associated with agile development.",
            "Fowler's phrase 'architecture is about the important stuff' signals context-sensitive judgment rather than a fixed formal taxonomy alone.",
            "Understanding this contrast is more important than memorizing TOGAF as a universally correct method."
          ]
        }
      ]
    }


  ]
};

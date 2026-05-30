// src/data/exams/mockExamDigitalStrategy_en.js
export const mockExamDigitalStrategy_en = {
  "id": "mock-exam-digital-strategy-en",
  "subjectId": "in5431",
  "baseId": "mock-exam-digital-strategy",
  "lang": "en",
  "title": "Practice Exam: Digital strategy and digital transformation",
  "description": "Practice exam for the Danilova lecture on digital strategy, digital transformation, barriers, organizational inertia, leadership and CDO.",
  "modeLabel": "LECTURE DRILL",
  "estimatedMinutes": "40–55",
  "sortOrder": 140,
  "questions": [
    {
      "id": 1,
      "type": "single",
      "title": "Digital technology as a strategic resource",
      "moduleId": "strategy",
      "groupId": "digital-strategy",
      "points": 1,
      "prompt": "What is the best academic point in the opening of the lecture, where the Solow/Carr problem is contrasted with digital technology as a resource?",
      "source": "Answer key: Lecture 14, Digital strategy and the digital transformation, slides 2, 10–12.",
      "options": [
        {
          "text": "Digital technology automatically gives sustained competitive advantage as long as the technology is new.",
          "correct": false,
          "why": "Wrong: the lecture problematizes the idea that technology automatically has strategic effect by itself.",
          "whyExtended": [
            "Carr’s point at the start is that IT can become a commodity if everyone uses the same standardized solutions.",
            "Strategic value does not come from owning technology alone, but from how digital resources are connected to organization, processes, value propositions and competitive position.",
            "This is why the lecture later distinguishes between business strategy, IT-strategy and digital strategy."
          ]
        },
        {
          "text": "Digital technology becomes strategically significant when the organization uses digital resources to create differential value.",
          "correct": true,
          "why": "Correct: this captures the core of the digital strategy definition and connects technology to strategic value creation.",
          "whyExtended": [
            "The lecture defines digital strategy as an organizational strategy formulated and executed by leveraging digital resources to create differential value.",
            "The point is not just technology procurement, but using digital resources to change value creation, customer interaction, processes or ecosystem position.",
            "Leaders therefore need to understand the characteristics, opportunities, prerequisites and consequences of digital technology."
          ],
          "whyExtendedImageRefs": [
            {
              "moduleId": "strategy",
              "groupId": "digital-strategy",
              "imageId": "digital_strategy_definition"
            }
          ]
        },
        {
          "text": "Digital technology is only operational infrastructure and therefore belongs only in IT-strategy.",
          "correct": false,
          "why": "Wrong: the lecture distinguishes IT-strategy from digital strategy, but shows that digital technology can also be strategic.",
          "whyExtended": [
            "IT-strategy can concern technology choices and IT capabilities, but digital strategy concerns organizational value creation through digital resources.",
            "When digital technology changes customer interaction, business models or ecosystem position, it is more than internal IT infrastructure.",
            "This is also why digitalization is analyzed at the macro, meso and micro level."
          ]
        },
        {
          "text": "Digital technology is strategic only when the CIO alone owns all decisions about the technology.",
          "correct": false,
          "why": "Wrong: the lecture emphasizes cross-functional involvement, not that the CIO alone should own everything.",
          "whyExtended": [
            "Digital business strategy is described as trans-functional, and the lecture explicitly asks why the whole organization must be involved.",
            "CIO/CDO can be important roles, but digital transformation also requires leadership, culture, competence and cross-unit collaboration.",
            "Isolating digital strategy to one role would weaken the connection to business, processes and people."
          ]
        }
      ]
    },
    {
      "id": 2,
      "type": "dragDrop",
      "title": "Business strategy, IT-strategy and digital strategy",
      "moduleId": "strategy",
      "groupId": "digital-strategy",
      "points": 2,
      "prompt": "Drag each statement to the correct strategy type.",
      "source": "Answer key: Lecture 14, slides 12–13, 'What is a digital strategy?' and the customer service/customer management system example.",
      "cards": [
        {
          "id": "business-strategy",
          "text": "Business strategy"
        },
        {
          "id": "it-strategy",
          "text": "IT-strategy"
        },
        {
          "id": "digital-strategy",
          "text": "Digital strategy"
        }
      ],
      "targets": [
        {
          "id": "business-strategy",
          "description": "We will be the best in our sector at customer service.",
          "correctCardId": "business-strategy",
          "correctLabel": "Business strategy",
          "whyCorrect": "This is business strategy because the statement describes an overall business position and competitive ambition.",
          "whyWrong": "The statement is not primarily about which technology to buy, but about the value and position the organization wants.",
          "whyExtended": [
            "Business strategy sets direction for what the organization wants to achieve in the market or sector.",
            "Digital strategy can support this ambition, but it is not identical to the overall business strategy."
          ]
        },
        {
          "id": "it-strategy",
          "description": "We will acquire the best customer management system in the market.",
          "correctCardId": "it-strategy",
          "correctLabel": "IT-strategy",
          "whyCorrect": "This is IT-strategy because the statement concerns procurement or choice of a specific IT system.",
          "whyWrong": "A system purchase can support a digital strategy, but is not in itself a strategy for digital value creation.",
          "whyExtended": [
            "The lecture example places this as IT-strategy. The focus is system procurement and technology choice.",
            "Without a connection to customer interaction, processes and differential value, this is too narrow to be digital strategy."
          ]
        },
        {
          "id": "digital-strategy",
          "description": "We will use digital technology to renew how we interact with customers.",
          "correctCardId": "digital-strategy",
          "correctLabel": "Digital strategy",
          "whyCorrect": "This is digital strategy because digital resources are used to change customer interaction and value creation.",
          "whyWrong": "The statement is not only about business goals or system procurement, but about using digital resources strategically.",
          "whyExtended": [
            "The lecture uses this as the digital strategy example. Digital technology is connected to renewal of customer interaction.",
            "This is broader than IT procurement and more specifically digital than a general business strategy."
          ]
        }
      ],
      "whyExtendedImageRefs": [
        {
          "moduleId": "strategy",
          "groupId": "digital-strategy",
          "imageId": "digital_strategy_model"
        }
      ]
    },
    {
      "id": 3,
      "type": "fill",
      "title": "Definition of digital strategy",
      "moduleId": "strategy",
      "groupId": "digital-strategy",
      "points": 1,
      "prompt": "Digital strategy is an organizational strategy formulated and executed by leveraging digital ________ to create differential value.",
      "answers": [
        "resources",
        "digital resources"
      ],
      "answerKey": "digital resources",
      "source": "Answer key: Lecture 14, slide 12, definition from Bharadwaj et al. (2013).",
      "whyCorrect": "Correct: the definition uses digital resources as what the strategy leverages to create differential value.",
      "whyWrong": "Wrong if the answer only points to systems, the IT department or projects. The definition concerns digital resources as the strategic basis.",
      "whyExtended": [
        "The main point is that digital strategy is not a pure IT plan, but an organizational strategy.",
        "Digital resources can include technology, data, digital components, platforms and competencies used to create new or differentiating value."
      ],
      "whyExtendedImageRefs": [
        {
          "moduleId": "strategy",
          "groupId": "digital-strategy",
          "imageId": "digital_strategy_definition"
        }
      ]
    },
    {
      "id": 4,
      "type": "multi",
      "title": "The content of a digital strategy",
      "moduleId": "strategy",
      "groupId": "digital-strategy",
      "points": 2,
      "prompt": "Select the elements the lecture describes as content in a digital strategy.",
      "source": "Answer key: Lecture 14, slide 14, 'The content of a digital strategy'.",
      "options": [
        {
          "text": "A digital vision",
          "correct": true,
          "why": "Correct: a digital vision should be challenging and inspiring.",
          "whyExtended": [
            "Digital vision gives direction and meaning to digital development.",
            "In the Nordic Choice/Strawberry case, this is expressed as the ambition of 'the best digital guest journey in the Nordic market'."
          ],
          "whyExtendedImageRefs": [
            {
              "moduleId": "strategy",
              "groupId": "digital-strategy",
              "imageId": "digital_strategy_content"
            }
          ]
        },
        {
          "text": "A portfolio of digital initiatives",
          "correct": true,
          "why": "Correct: the strategy must prioritize concrete digital initiatives and projects.",
          "whyExtended": [
            "A strategy without prioritized initiatives can easily become a vision without implementation.",
            "The portfolio logic connects digital strategy to prioritization and actual change."
          ]
        },
        {
          "text": "A roadmap",
          "correct": true,
          "why": "Correct: the roadmap is the planning tool that shows order and timeline.",
          "whyExtended": [
            "The roadmap makes the strategy more executable by connecting initiatives to time and dependencies.",
            "In the lecture, this is connected to digital initiatives and roadmap."
          ]
        },
        {
          "text": "A definition of responsibility",
          "correct": true,
          "why": "Correct: responsibility must be defined for the strategy to be implemented.",
          "whyExtended": [
            "Digital strategy requires governance and clear roles. Lack of clear roles and responsibilities is also a barrier to digital transformation.",
            "Allocation of responsibility connects strategy to execution, accountability and leadership."
          ]
        },
        {
          "text": "A complete list of all old systems that must never be changed",
          "correct": false,
          "why": "Wrong: this is not a strategic content element and conflicts with the idea of development and transformation.",
          "whyExtended": [
            "A system overview can be useful in IT architecture, but is not by itself digital strategy.",
            "Digital strategy concerns vision, initiatives, roadmap and responsibility, not freezing the existing systems portfolio."
          ]
        },
        {
          "text": "A promise that all digital initiatives will be implemented at the same time",
          "correct": false,
          "why": "Wrong: the strategy requires prioritization, not uncritical maximization of the number of initiatives.",
          "whyExtended": [
            "Portfolio and roadmap are exactly about choosing, prioritizing and sequencing digital initiatives.",
            "Doing everything at the same time increases the risk of unclear responsibility, resource shortages and weak coordination."
          ]
        }
      ]
    },
    {
      "id": 5,
      "type": "drag-categorize",
      "title": "Macro, meso and micro level",
      "moduleId": "strategy",
      "groupId": "digital-strategy",
      "points": 2,
      "prompt": "Drag each example to the correct level of digitalization impact.",
      "source": "Answer key: Lecture 14, slides 4 and 40, 'The impact of digital technology and digitalization on organizations'.",
      "items": [
        {
          "id": "business-models",
          "label": "Changes business models and ecosystem position"
        },
        {
          "id": "ecosystem",
          "label": "Changes the organization's position in an ecosystem"
        },
        {
          "id": "processes",
          "label": "Changes business processes and reporting lines"
        },
        {
          "id": "governance",
          "label": "Changes leadership, governance, values and culture"
        },
        {
          "id": "tasks",
          "label": "Changes the content and character of work tasks"
        },
        {
          "id": "skills",
          "label": "Creates new requirements for competence and skills"
        }
      ],
      "categories": [
        {
          "id": "macro",
          "label": "Macro level"
        },
        {
          "id": "meso",
          "label": "Meso level"
        },
        {
          "id": "micro",
          "label": "Micro level"
        }
      ],
      "correctAnswer": {
        "macro": [
          "business-models",
          "ecosystem"
        ],
        "meso": [
          "processes",
          "governance"
        ],
        "micro": [
          "tasks",
          "skills"
        ]
      },
      "itemFeedback": {
        "business-models": {
          "whyCorrect": "Business models belong to the macro level because this concerns the organization's strategic position and value creation.",
          "whyWrong": "This is broader than process level or individual work tasks.",
          "whyExtended": [
            "Macro level concerns strategy, business models and ecosystems."
          ]
        },
        "ecosystem": {
          "whyCorrect": "Ecosystem position belongs to the macro level.",
          "whyWrong": "Ecosystem position is not just an internal process or competence change.",
          "whyExtended": [
            "The lecture says that digitalization alters business models and the organization's position within an ecosystem."
          ]
        },
        "processes": {
          "whyCorrect": "Business processes and reporting lines belong to the meso level.",
          "whyWrong": "These are organizational structures and processes, not individual tasks alone.",
          "whyExtended": [
            "Meso level concerns business processes, organization and reporting lines."
          ]
        },
        "governance": {
          "whyCorrect": "Leadership, governance, values and culture are on the meso level in the figure.",
          "whyWrong": "This concerns organization and governance, not primarily ecosystem position or single tasks.",
          "whyExtended": [
            "Meso level describes how the organization must change its internal structures and governance forms."
          ]
        },
        "tasks": {
          "whyCorrect": "The content of work tasks belongs to the micro level.",
          "whyWrong": "This is the concrete workday, not the whole business model.",
          "whyExtended": [
            "Micro level concerns tasks, communication, collaboration and decision processes."
          ]
        },
        "skills": {
          "whyCorrect": "New requirements for competence and skills belong to the micro level.",
          "whyWrong": "Competence requirements are felt by people and roles, even if they also have organizational consequences.",
          "whyExtended": [
            "Digitalization changes what employees must know and how they collaborate and make decisions."
          ]
        }
      },
      "whyExtendedImageRefs": [
        {
          "moduleId": "strategy",
          "groupId": "digital-strategy",
          "imageId": "macro_meso_micro_impact"
        }
      ]
    },
    {
      "id": 6,
      "type": "multi",
      "title": "Leaders' questions about digital technology",
      "moduleId": "strategy",
      "groupId": "digital-strategy",
      "points": 1,
      "prompt": "Which questions should leaders be able to ask about digital technology according to the lecture?",
      "source": "Answer key: Lecture 14, slide 11, 'The questions leaders should be able to ask about digital technology'.",
      "options": [
        {
          "text": "Characteristics",
          "correct": true,
          "why": "Correct: leaders must understand the characteristics of the technology.",
          "whyExtended": [
            "Without understanding characteristics, it is difficult to assess what the technology can and cannot actually do."
          ]
        },
        {
          "text": "Opportunities",
          "correct": true,
          "why": "Correct: leaders must be able to see opportunities for value creation and change.",
          "whyExtended": [
            "Digital strategy is about using digital resources for differential value, not only understanding the technology technically."
          ]
        },
        {
          "text": "Prerequisites",
          "correct": true,
          "why": "Correct: leaders must understand prerequisites for success.",
          "whyExtended": [
            "Prerequisites can include competence, governance, processes, data, culture and digital foundation."
          ]
        },
        {
          "text": "Consequences",
          "correct": true,
          "why": "Correct: leaders must understand consequences for organization, processes, competence and strategy.",
          "whyExtended": [
            "Consequences can be at the macro, meso and micro level."
          ]
        },
        {
          "text": "Which vendor is cheapest right now?",
          "correct": false,
          "why": "Wrong: price can be relevant in procurement, but this is not one of the four overarching leader questions in the lecture.",
          "whyExtended": [
            "The lecture moves the leader perspective from procurement to strategic questions about characteristics, opportunities, prerequisites and consequences."
          ]
        }
      ]
    },
    {
      "id": 7,
      "type": "single",
      "title": "What is digital transformation?",
      "moduleId": "strategy",
      "groupId": "digital-strategy",
      "points": 1,
      "prompt": "Which statement best describes digital transformation in the lecture?",
      "source": "Answer key: Lecture 14, slides 18–19, 'What is a digital transformation' and Kane et al. quote.",
      "options": [
        {
          "text": "Implementing more and better technologies without changing the organization.",
          "correct": false,
          "why": "Wrong: the lecture explicitly says that digital transformation is not only about more and better technology.",
          "whyExtended": [
            "Technology can be necessary, but not sufficient.",
            "The lecture emphasizes alignment between culture, people, structure and tasks."
          ]
        },
        {
          "text": "Significant organizational change, driven or enabled by extensive use of digital technologies.",
          "correct": true,
          "why": "Correct: this is the core definition from the lecture.",
          "whyExtended": [
            "Digital transformation can involve extensive process redesign, business model innovation and changed organizational identity.",
            "It is therefore an organizational change, not just an IT delivery.",
            "Kane et al.’s point is that people, culture, structure and tasks must be aligned with the technology."
          ],
          "whyExtendedImageRefs": [
            {
              "moduleId": "strategy",
              "groupId": "digital-strategy",
              "imageId": "digital_transformation_process"
            }
          ]
        },
        {
          "text": "Replacing a paper process with a PDF without changing work practice.",
          "correct": false,
          "why": "Wrong: this is digitization or digital support, not digital transformation.",
          "whyExtended": [
            "Pure technical conversion of information is too narrow to be transformation.",
            "Digital transformation requires significant organizational change over time."
          ]
        },
        {
          "text": "Creating an IT-strategy that only describes system procurement.",
          "correct": false,
          "why": "Wrong: IT-strategy and digital transformation are not the same.",
          "whyExtended": [
            "System procurement can be part of transformation, but not the whole transformation.",
            "Digital transformation affects business models, processes, culture, competence and organization."
          ]
        }
      ]
    },
    {
      "id": 8,
      "type": "SequenceOrder",
      "title": "Digital transformation as a process",
      "moduleId": "strategy",
      "groupId": "digital-strategy",
      "points": 2,
      "prompt": "Place the elements in the order the lecture uses when digital transformation is described as a process.",
      "source": "Answer key: Lecture 14, slide 20, 'Digital transformation can be described as a process'.",
      "items": [
        {
          "id": "realization",
          "label": "Realization that change is necessary"
        },
        {
          "id": "vision-strategy",
          "label": "Digital vision & strategy"
        },
        {
          "id": "projects",
          "label": "Digitalization projects"
        },
        {
          "id": "investment",
          "label": "Investment in digital technology and competence"
        },
        {
          "id": "cdo-unit",
          "label": "CDO and/or a digital unit"
        }
      ],
      "correctOrder": [
        "realization",
        "vision-strategy",
        "projects",
        "investment",
        "cdo-unit"
      ],
      "itemFeedback": {
        "realization": {
          "whyCorrect": "The lecture starts the process with a realization that change is necessary.",
          "whyWrong": "Before the strategy can be formulated, the organization must recognize the need for change.",
          "whyExtended": [
            "This can be triggered by the market, technology, competition, customer behavior or internal problems."
          ]
        },
        "vision-strategy": {
          "whyCorrect": "Digital vision & strategy comes after recognition of the need for change.",
          "whyWrong": "The strategy should give direction before projects and investments are started.",
          "whyExtended": [
            "Without digital vision & strategy, digitalization projects can become fragmented local initiatives."
          ]
        },
        "projects": {
          "whyCorrect": "Digitalization projects are the concrete initiatives that follow from vision and strategy.",
          "whyWrong": "Projects should not come before the need for change and strategic direction are sufficiently clear.",
          "whyExtended": [
            "The projects translate strategy into concrete changes in processes, services or offerings."
          ]
        },
        "investment": {
          "whyCorrect": "Investment in digital technology and competence is needed to carry out the change.",
          "whyWrong": "Investments should be connected to the strategy and initiatives, not made in isolation.",
          "whyExtended": [
            "The lecture points to both technology and competence, not only system procurement."
          ]
        },
        "cdo-unit": {
          "whyCorrect": "CDO and/or digital unit is the last point in the lecture’s process list.",
          "whyWrong": "CDO/digital unit is a possible organizational response, but should be understood in relation to strategy, initiatives and investments.",
          "whyExtended": [
            "The role can contribute coordination, change capacity and connection between business and technology."
          ]
        }
      },
      "whyCorrect": "The order is realization, digital vision & strategy, digitalization projects, investment, CDO/digital unit.",
      "whyExtended": [
        "This is not a mechanical recipe that must always be carried out the same way, but the lecture presents it as a typical process logic for digital transformation.",
        "The point is to connect the need for change, strategic direction, concrete initiatives, resources and organizational responsibility."
      ],
      "whyExtendedImageRefs": [
        {
          "moduleId": "strategy",
          "groupId": "digital-strategy",
          "imageId": "digital_transformation_process"
        }
      ]
    },
    {
      "id": 9,
      "type": "single",
      "title": "Nordic Choice / Strawberry-caset",
      "moduleId": "strategy",
      "groupId": "digital-strategy",
      "points": 1,
      "prompt": "What does the Nordic Choice / Strawberry case best illustrate in the lecture?",
      "source": "Answer key: Lecture 14, slides 21–25, hotel sector, digital vision, chronology and digital guest journey.",
      "options": [
        {
          "text": "That digital transformation can be driven by a clear digital vision, organizational moves and several coordinated digital initiatives over multiple years.",
          "correct": true,
          "why": "Correct: the case shows a multi-year transformation with digital business strategy, CDO/eBerry, platform, app, new website and self-service check-in/out.",
          "whyExtended": [
            "The digital vision was 'The best digital guest journey in the Nordic market'.",
            "The chronology does not show one isolated IT delivery, but a series of organizational and technological initiatives from 2014 to 2019.",
            "The case is used to show digital transformation in the hotel sector, where channels and the customer journey change."
          ]
        },
        {
          "text": "That digital transformation is always completed in less than one year if you just hire a CDO.",
          "correct": false,
          "why": "Wrong: the case shows multi-year development, not a quick one-off activity.",
          "whyExtended": [
            "The lecture concludes that digital transformation usually takes years and is often difficult to delimit.",
            "CDO/eBerry are important moves in the case, but not the whole transformation alone."
          ]
        },
        {
          "text": "That IT-strategy and digital strategy are identical because both are about buying systems.",
          "correct": false,
          "why": "Wrong: the case shows exactly that digital strategy is broader than system procurement.",
          "whyExtended": [
            "Digital guest journey, organization, eBerry, app, website and self-service connect as a change in customer interaction.",
            "This is more than buying one customer management system."
          ]
        },
        {
          "text": "That culture is irrelevant as long as the technical platform works.",
          "correct": false,
          "why": "Wrong: the lecture also shows the cultural tension between the established organization and eBerry.",
          "whyExtended": [
            "Culture and organization can be both enablers and obstacles in digital transformation.",
            "The lecture later uses culture as a central barrier theme."
          ]
        }
      ]
    },
    {
      "id": 10,
      "type": "multi",
      "title": "Conclusions about digital transformation",
      "moduleId": "strategy",
      "groupId": "digital-strategy",
      "points": 2,
      "prompt": "Select the statements that fit the lecture’s conclusions about digital transformation.",
      "source": "Answer key: Lecture 14, slide 26, 'What might we conclude on the digital transformation?'.",
      "options": [
        {
          "text": "Digital transformation can be systematically driven from the top through a clear digital strategy.",
          "correct": true,
          "why": "Correct: this is explicitly mentioned as one possible driver.",
          "whyExtended": [
            "Top-down digital strategy can provide direction, prioritization and coordination."
          ],
          "whyExtendedImageRefs": [
            {
              "moduleId": "strategy",
              "groupId": "digital-strategy",
              "imageId": "digital_transformation_process"
            }
          ]
        },
        {
          "text": "Digital transformation can also be the result of many local digitalization efforts.",
          "correct": true,
          "why": "Correct: the lecture allows for both top-down and local drivers.",
          "whyExtended": [
            "Local digitalization efforts can accumulate into larger transformation, but can also create a need for coordination."
          ]
        },
        {
          "text": "Digital transformation can involve the whole organization, parts of the organization or an entire sector.",
          "correct": true,
          "why": "Correct: the scope can vary.",
          "whyExtended": [
            "The hotel sector example shows how new booking channels and ecosystems can affect an entire sector."
          ]
        },
        {
          "text": "Digital transformation involves significant changes and often takes years to carry out.",
          "correct": true,
          "why": "Correct: the lecture says that transformation usually takes years and is often difficult to delimit.",
          "whyExtended": [
            "This distinguishes transformation from simple implementation of an IT system."
          ]
        },
        {
          "text": "Digital transformation is always a pure IT project with a clear start and end.",
          "correct": false,
          "why": "Wrong: the lecture says that digital transformation is often difficult to delimit and can involve the whole organization or sector.",
          "whyExtended": [
            "A pure IT project is too narrow. Transformation concerns people, structure, culture, processes and value creation."
          ]
        }
      ]
    },
    {
      "id": 11,
      "type": "multi",
      "title": "Barriers to digital transformation",
      "moduleId": "strategy",
      "groupId": "digital-strategy",
      "points": 2,
      "prompt": "Which of these are barriers to digital transformation according to the lecture?",
      "source": "Answer key: Lecture 14, slide 28, 'What makes it hard to succeed?'.",
      "options": [
        {
          "text": "Lack of a coherent digital strategy",
          "correct": true,
          "why": "Correct: the lecture points out that transformation can fail when it is not strategically anchored.",
          "whyExtended": [
            "Without a coherent digital strategy, initiatives can become fragmented and lack prioritization.",
            "This connects the barriers section directly back to the digital strategy section of the lecture."
          ],
          "whyExtendedImageRefs": [
            {
              "moduleId": "strategy",
              "groupId": "digital-strategy",
              "imageId": "digital_transformation_barriers"
            }
          ]
        },
        {
          "text": "Lack of governance & management",
          "correct": true,
          "why": "Correct: unclear roles and responsibilities are a central barrier.",
          "whyExtended": [
            "Digital transformation requires clear responsibility, coordination and managerial follow-up."
          ]
        },
        {
          "text": "Lack of cross-unit collaboration",
          "correct": true,
          "why": "Correct: insufficient cross-unit collaboration is a repeated challenge in the lecture.",
          "whyExtended": [
            "This becomes especially important because digital business strategy is described as trans-functional."
          ]
        },
        {
          "text": "Underestimated cultural barriers",
          "correct": true,
          "why": "Correct: culture can be a major obstacle to digital maturity.",
          "whyExtended": [
            "Technical tools can be underused if the culture does not support new ways of working."
          ]
        },
        {
          "text": "Organizational inertia",
          "correct": true,
          "why": "Correct: inertia is a separate barrier that the lecture examines in detail.",
          "whyExtended": [
            "Inertia means that the organization continues in the same track even when the environment changes."
          ]
        },
        {
          "text": "Too much continuous learning and experimentation",
          "correct": false,
          "why": "Wrong: the lecture presents continuous learning and experimentation as part of a culture for digitalization, not as barriers.",
          "whyExtended": [
            "The opposite, lack of learning, experimentation and collaboration, makes transformation more difficult."
          ]
        }
      ]
    },
    {
      "id": 12,
      "type": "drag-categorize",
      "title": "Barriers vs. digitalization culture",
      "moduleId": "strategy",
      "groupId": "digital-strategy",
      "points": 2,
      "prompt": "Sort each statement as either a barrier to digital transformation or part of a culture for digitalization.",
      "source": "Answer key: Lecture 14, slides 28–30, barriers and 'A culture for digitalization'.",
      "items": [
        {
          "id": "unclear-roles",
          "label": "Unclear roles and responsibilities"
        },
        {
          "id": "inertia",
          "label": "Organizational inertia"
        },
        {
          "id": "lack-competence",
          "label": "Lack of competence/skills/understanding"
        },
        {
          "id": "flexibility",
          "label": "Flexibility"
        },
        {
          "id": "experimentation",
          "label": "Experimentation"
        },
        {
          "id": "knowledge-sharing",
          "label": "Knowledge sharing"
        },
        {
          "id": "room-failure",
          "label": "Room for failure"
        }
      ],
      "categories": [
        {
          "id": "barrier",
          "label": "Barrier"
        },
        {
          "id": "culture",
          "label": "Culture for digitalization"
        }
      ],
      "correctAnswer": {
        "barrier": [
          "unclear-roles",
          "inertia",
          "lack-competence"
        ],
        "culture": [
          "flexibility",
          "experimentation",
          "knowledge-sharing",
          "room-failure"
        ]
      },
      "itemFeedback": {
        "unclear-roles": {
          "whyCorrect": "Unclear roles and responsibilities belong to lack of governance & management, which is a barrier.",
          "whyWrong": "This is not a culture capability. It is a governance problem.",
          "whyExtended": [
            "Digital transformation requires clear responsibility because initiatives cut across units."
          ]
        },
        "inertia": {
          "whyCorrect": "Organizational inertia is explicitly listed as a barrier.",
          "whyWrong": "Inertia means stickiness and resistance to change, not a culture for digitalization.",
          "whyExtended": [
            "Inertia can provide stability, but can also lock the organization into old tracks."
          ]
        },
        "lack-competence": {
          "whyCorrect": "Lack of competence/skills/understanding is a barrier.",
          "whyWrong": "Lack of competence is the opposite of learning and knowledge sharing.",
          "whyExtended": [
            "Digital transformation requires both technical and organizational competence."
          ]
        },
        "flexibility": {
          "whyCorrect": "Flexibility is part of culture for digitalization.",
          "whyWrong": "Flexibility is an enabler, not a barrier.",
          "whyExtended": [
            "Flexibility makes it easier to respond to changed environments."
          ]
        },
        "experimentation": {
          "whyCorrect": "Experimentation is part of culture for digitalization.",
          "whyWrong": "Experimentation helps the organization learn, test and reduce uncertainty.",
          "whyExtended": [
            "The lecture also connects experimentation to ways of addressing inertia."
          ]
        },
        "knowledge-sharing": {
          "whyCorrect": "Knowledge sharing is part of culture for digitalization.",
          "whyWrong": "Knowledge sharing is an enabler for trans-functional transformation, not an obstacle.",
          "whyExtended": [
            "This counteracts silo thinking and different local understandings."
          ]
        },
        "room-failure": {
          "whyCorrect": "Room for failure is part of culture for digitalization.",
          "whyWrong": "A culture with room for failure makes experimentation possible.",
          "whyExtended": [
            "Without room for failure, the organization often becomes more risk averse and less learning-oriented."
          ]
        }
      },
      "whyExtendedImageRefs": [
        {
          "moduleId": "strategy",
          "groupId": "digital-strategy",
          "imageId": "digital_transformation_barriers"
        },
        {
          "moduleId": "strategy",
          "groupId": "digital-strategy",
          "imageId": "culture_for_digitalization"
        }
      ]
    },
    {
      "id": 13,
      "type": "single",
      "title": "Culture challenge",
      "moduleId": "strategy",
      "groupId": "digital-strategy",
      "points": 1,
      "prompt": "An organization introduces a good collaboration platform, but employees use it little because the culture is very hierarchical and decisions are made through long consensus processes. What is the best interpretation?",
      "source": "Answer key: Lecture 14, slide 29, quotes about culture as a barrier to digital transformation.",
      "options": [
        {
          "text": "The problem is only technical. The platform must be replaced with a newer solution.",
          "correct": false,
          "why": "Wrong: the case says that the platform works, but the culture prevents use.",
          "whyExtended": [
            "The lecture points out that digital tools can be underused if the prevailing culture does not support the new way of working.",
            "Changing technology does not necessarily solve behavior, norms and decision patterns."
          ]
        },
        {
          "text": "This shows that digital transformation requires change in behavior and 'how things are done', not only technology.",
          "correct": true,
          "why": "Correct: this is the core point in the culture slide.",
          "whyExtended": [
            "The lecture shows that culture can be a main reason for weak digital transformation performance.",
            "Digital transformation succeeds only when people change how they work, interact and make decisions.",
            "Culture is therefore an enabler or obstacle for digital maturity."
          ],
          "whyExtendedImageRefs": [
            {
              "moduleId": "strategy",
              "groupId": "digital-strategy",
              "imageId": "culture_for_digitalization"
            }
          ]
        },
        {
          "text": "This shows that governance and leadership are not relevant once the platform has already been chosen.",
          "correct": false,
          "why": "Wrong: governance and leadership are precisely needed to change practice and responsibility.",
          "whyExtended": [
            "Leaders’ role is to develop culture, create understanding and enable collective efforts.",
            "The technology choice is only one part of transformation."
          ]
        },
        {
          "text": "This is only a micro-level problem and has no connection to meso-level culture or organization.",
          "correct": false,
          "why": "Wrong: individual use is affected by culture and organization at the meso level.",
          "whyExtended": [
            "The lecture’s macro/meso/micro model shows that tasks and collaboration at the micro level are affected by organization, leadership, governance and culture at the meso level.",
            "The problem therefore cannot be understood in isolation as individual technology use."
          ]
        }
      ]
    },
    {
      "id": 14,
      "type": "fill",
      "title": "Organizational inertia",
      "moduleId": "strategy",
      "groupId": "digital-strategy",
      "points": 1,
      "prompt": "The lecture uses the term organizational ________ for the organization's 'stickiness' and tendency to continue in the same track even when the environment changes.",
      "answers": [
        "inertia",
        "organizational inertia"
      ],
      "answerKey": "inertia / organizational inertia",
      "source": "Answer key: Lecture 14, slide 31, 'Organizational Inertia'.",
      "whyCorrect": "Correct: organizational inertia describes the resistance or stickiness that makes the organization continue in the same trajectory.",
      "whyWrong": "Wrong if the answer points only to strategy, roadmap or governance. The term in the lecture is inertia.",
      "whyExtended": [
        "The lecture describes inertia as the difficulty of changing socio-technical systems as quickly as the environment changes.",
        "Inertia can be necessary and positive because it provides stability, but it can also become a barrier to digital transformation."
      ],
      "whyExtendedImageRefs": [
        {
          "moduleId": "strategy",
          "groupId": "digital-strategy",
          "imageId": "organizational_inertia_definition"
        }
      ]
    },
    {
      "id": 15,
      "type": "drag-categorize",
      "title": "Inertia at individual and organizational level",
      "moduleId": "strategy",
      "groupId": "digital-strategy",
      "points": 2,
      "prompt": "Drag each example to the correct category of inertia mechanism.",
      "source": "Answer key: Lecture 14, slides 33–34, 'Inertia – individual level' and 'Inertia – organizational level'.",
      "items": [
        {
          "id": "fear-change",
          "label": "Fear of change and uncertainty"
        },
        {
          "id": "status-quo",
          "label": "Status quo bias"
        },
        {
          "id": "schemas",
          "label": "Cognitive schemas"
        },
        {
          "id": "socio-tech-path",
          "label": "Socio-technical path-dependencies"
        },
        {
          "id": "economic-path",
          "label": "Economic path-dependencies"
        },
        {
          "id": "complexity",
          "label": "Organizational complexity"
        },
        {
          "id": "power",
          "label": "Power structures and incentives"
        },
        {
          "id": "formal-rules",
          "label": "Formal rules and routines"
        }
      ],
      "categories": [
        {
          "id": "individual-psych",
          "label": "Individual: psychological / behavioral"
        },
        {
          "id": "individual-cognitive",
          "label": "Individual: socio-cognitive"
        },
        {
          "id": "org-sociotech",
          "label": "Organizational: socio-technical"
        },
        {
          "id": "org-economic",
          "label": "Organizational: economic / structural"
        },
        {
          "id": "org-political",
          "label": "Organizational: political / cultural"
        }
      ],
      "correctAnswer": {
        "individual-psych": [
          "fear-change"
        ],
        "individual-cognitive": [
          "status-quo",
          "schemas"
        ],
        "org-sociotech": [
          "socio-tech-path"
        ],
        "org-economic": [
          "economic-path",
          "complexity"
        ],
        "org-political": [
          "power",
          "formal-rules"
        ]
      },
      "itemFeedback": {
        "fear-change": {
          "whyCorrect": "Fear of change and uncertainty is an individual psychological/behavioral barrier mechanism.",
          "whyWrong": "This concerns the individual’s reaction to uncertainty, not the organization’s formal structures.",
          "whyExtended": [
            "The lecture mentions negative psychology such as fear of change, uncertainty and identity threats."
          ]
        },
        "status-quo": {
          "whyCorrect": "Status quo bias is an individual socio-cognitive inertia mechanism.",
          "whyWrong": "This is a cognitive bias in individuals, not an economic path-dependency.",
          "whyExtended": [
            "Status quo bias means that we overvalue what we already have compared with possible gains from change."
          ]
        },
        "schemas": {
          "whyCorrect": "Cognitive schemas are individual socio-cognitive inertia.",
          "whyWrong": "This concerns established mental models, not primarily formal rules.",
          "whyExtended": [
            "Established schemas make new information interpreted through old frames of understanding."
          ]
        },
        "socio-tech-path": {
          "whyCorrect": "Socio-technical path-dependencies belong to organizational socio-technical inertia.",
          "whyWrong": "This concerns the interplay between competence, processes and technology at the organizational level.",
          "whyExtended": [
            "Old processes and technology choices can lock the organization into existing practices."
          ]
        },
        "economic-path": {
          "whyCorrect": "Economic path-dependencies belong to economic and structural inertia.",
          "whyWrong": "Business model, resources and technology are economic/structural bindings.",
          "whyExtended": [
            "Previous investments and resource commitments can make it difficult to change direction."
          ]
        },
        "complexity": {
          "whyCorrect": "Organizational complexity belongs to economic and structural inertia.",
          "whyWrong": "Complexity is a structural obstacle, not only individual reluctance.",
          "whyExtended": [
            "The more complex the organization is, the harder transformation can be to coordinate."
          ]
        },
        "power": {
          "whyCorrect": "Power structures and incentives belong to political and cultural inertia.",
          "whyWrong": "This concerns power and incentives, not only technology or competence.",
          "whyExtended": [
            "Existing power structures can have an interest in preserving current practice."
          ]
        },
        "formal-rules": {
          "whyCorrect": "Formal rules and routines belong to political and cultural inertia.",
          "whyWrong": "Rules and routines can stabilize the organization, but also prevent new practice.",
          "whyExtended": [
            "This shows why transformation often requires change in both formal and informal structures."
          ]
        }
      },
      "whyExtendedImageRefs": [
        {
          "moduleId": "strategy",
          "groupId": "digital-strategy",
          "imageId": "organizational_inertia_levels"
        }
      ]
    },
    {
      "id": 16,
      "type": "multi",
      "title": "How to address inertia",
      "moduleId": "strategy",
      "groupId": "digital-strategy",
      "points": 2,
      "prompt": "Which actions fit the lecture’s suggestions for how to address inertia?",
      "source": "Answer key: Lecture 14, slide 35, 'How to address inertia'.",
      "options": [
        {
          "text": "Awareness, competence building and communication",
          "correct": true,
          "why": "Correct: these are explicitly mentioned in the lecture.",
          "whyExtended": [
            "Inertia must first be made visible and understandable before it can be changed."
          ],
          "whyExtendedImageRefs": [
            {
              "moduleId": "strategy",
              "groupId": "digital-strategy",
              "imageId": "addressing_inertia"
            }
          ]
        },
        {
          "text": "Change management",
          "correct": true,
          "why": "Correct: change management is an explicit action.",
          "whyExtended": [
            "Digital transformation is organizational change, not only technical implementation."
          ]
        },
        {
          "text": "Building structures and culture for experimentation and learning",
          "correct": true,
          "why": "Correct: experimentation and learning counteract lock-in and status quo.",
          "whyExtended": [
            "This is also connected to culture for digitalization: experimentation, learning and room for failure."
          ]
        },
        {
          "text": "Running pilot projects that demonstrate gains and reduce perceived risk",
          "correct": true,
          "why": "Correct: pilot projects can reduce perceived risk and make gains concrete.",
          "whyExtended": [
            "This is especially relevant when status quo bias and fear of change make change difficult."
          ]
        },
        {
          "text": "Investing in a more flexible digital foundation",
          "correct": true,
          "why": "Correct: a more flexible digital foundation can reduce technological and structural lock-in.",
          "whyExtended": [
            "Technological flexibility can make it easier to support new digital initiatives."
          ]
        },
        {
          "text": "Ban local experiments and only protect existing routines",
          "correct": false,
          "why": "Wrong: this would normally reinforce inertia.",
          "whyExtended": [
            "The lecture recommends structures for experimentation, learning, collaboration and ambidexterity, not pure preservation of status quo."
          ]
        }
      ]
    },
    {
      "id": 17,
      "type": "multi",
      "title": "Leadership in digital transformation",
      "moduleId": "strategy",
      "groupId": "digital-strategy",
      "points": 2,
      "prompt": "Which statements describe the leadership role in digital transformation according to the lecture?",
      "source": "Answer key: Lecture 14, slides 37–38, 'What is the role of leaders?' and trans-functional digital business strategy.",
      "options": [
        {
          "text": "Leader engagement at all levels is a prerequisite for success.",
          "correct": true,
          "why": "Correct: the lecture explicitly says that leader engagement at all levels is necessary.",
          "whyExtended": [
            "Digital transformation happens across functions and levels, so leadership cannot be isolated to the top alone."
          ],
          "whyExtendedImageRefs": [
            {
              "moduleId": "strategy",
              "groupId": "digital-strategy",
              "imageId": "leadership_role_digital_transformation"
            }
          ]
        },
        {
          "text": "Leaders must be able to handle both technical and organizational changes.",
          "correct": true,
          "why": "Correct: the lecture connects the leadership role to both technical and organizational changes.",
          "whyExtended": [
            "This follows from digital transformation not being only technology, but also culture, structure, tasks and processes."
          ]
        },
        {
          "text": "Leaders should develop a culture characterized by flexibility, collaboration, openness, autonomy, learning and experimentation.",
          "correct": true,
          "why": "Correct: this is directly connected to the leadership role and culture for digitalization.",
          "whyExtended": [
            "The culture should make the organization more learning-oriented and capable of change."
          ]
        },
        {
          "text": "Leaders must develop ambidexterity: exploitation and exploration.",
          "correct": true,
          "why": "Correct: the lecture mentions ambidextrous organization as part of the leadership role.",
          "whyExtended": [
            "Exploitation means using and improving existing operations. Exploration means innovation and new opportunities."
          ]
        },
        {
          "text": "Digital strategy should be limited to the IT department because digital business strategy is not trans-functional.",
          "correct": false,
          "why": "Wrong: the lecture cites that digital business strategy can be seen as inherently trans-functional.",
          "whyExtended": [
            "Leadership across the organization and involvement of multiple groups are therefore needed."
          ]
        }
      ]
    },
    {
      "id": 18,
      "type": "dragDrop",
      "title": "CDO roles",
      "moduleId": "strategy",
      "groupId": "digital-strategy",
      "points": 2,
      "prompt": "Drag each CDO role to the best explanation.",
      "source": "Answer key: Lecture 14, slide 47, 'Why do we need a CDO?' and slide 48, 'The contribution of the CDO'.",
      "cards": [
        {
          "id": "entrepreneur",
          "text": "Entrepreneurs / Digital Innovators"
        },
        {
          "id": "evangelist",
          "text": "Digital Evangelists / Digital Advocates"
        },
        {
          "id": "coordinator",
          "text": "Coordinators / Digital Harmonizers"
        },
        {
          "id": "accelerator",
          "text": "Digital Accelerators"
        }
      ],
      "targets": [
        {
          "id": "entrepreneur",
          "description": "Drives new digital opportunities, offerings or business innovation.",
          "correctCardId": "entrepreneur",
          "correctLabel": "Entrepreneurs / Digital Innovators",
          "whyCorrect": "The entrepreneur/innovator role is about creating and initiating digital innovation.",
          "whyWrong": "This explanation best fits the innovation role, not harmonization or advocacy.",
          "whyExtended": [
            "The CDO can function as a dedicated change agent in digital transformation."
          ]
        },
        {
          "id": "evangelist",
          "description": "Creates understanding, enthusiasm and legitimacy for digitalization across the organization.",
          "correctCardId": "evangelist",
          "correctLabel": "Digital Evangelists / Digital Advocates",
          "whyCorrect": "The evangelist/advocate role is about promoting digital direction and bringing the organization along.",
          "whyWrong": "This is more about advocacy and sensemaking than technical coordination alone.",
          "whyExtended": [
            "The role is important because digital transformation requires people to understand and support the need for change."
          ]
        },
        {
          "id": "coordinator",
          "description": "Coordinates digitalization efforts and builds bridges between business and technology and between groups.",
          "correctCardId": "coordinator",
          "correctLabel": "Coordinators / Digital Harmonizers",
          "whyCorrect": "The coordinator/harmonizer role fits when the organization needs cross-unit coordination.",
          "whyWrong": "This explanation concerns harmonization and coordination, not primarily evangelism or fast execution.",
          "whyExtended": [
            "The lecture says the CDO can help integrate the perspectives of business and technology and build bridges between groups."
          ]
        },
        {
          "id": "accelerator",
          "description": "Increases the pace of digital transformation and helps the organization move faster from idea to change.",
          "correctCardId": "accelerator",
          "correctLabel": "Digital Accelerators",
          "whyCorrect": "The accelerator role is about increasing the pace of digital transformation.",
          "whyWrong": "This is not primarily about defining vision, but about accelerating change.",
          "whyExtended": [
            "This can be important in competitive sectors or when there is a clear need for central coordination."
          ]
        }
      ],
      "whyExtendedImageRefs": [
        {
          "moduleId": "strategy",
          "groupId": "digital-strategy",
          "imageId": "cdo_roles"
        },
        {
          "moduleId": "strategy",
          "groupId": "digital-strategy",
          "imageId": "cdo_contribution"
        }
      ]
    },
    {
      "id": 19,
      "type": "single",
      "title": "Why involve the whole organization?",
      "moduleId": "strategy",
      "groupId": "digital-strategy",
      "points": 1,
      "prompt": "Why does the lecture argue for involving and engaging the whole organization in digital transformation?",
      "source": "Answer key: Lecture 14, slides 39–44, involvement, cross-functional processes, collaboration challenge and organization as network of groups.",
      "options": [
        {
          "text": "Because digitalization often affects cross-functional business processes, synergies, competence and the understanding of why change is necessary.",
          "correct": true,
          "why": "Correct: this summarizes slide 41 and connects to trans-functional strategy.",
          "whyExtended": [
            "Digitalization changes not only IT, but processes, organization, collaboration, decisions and competence needs.",
            "The organization consists of groups with different perspectives, interests, goals, cultures and identities, which makes cross-functional involvement demanding but necessary.",
            "The whole organization must therefore understand both the big picture and local contributions."
          ],
          "whyExtendedImageRefs": [
            {
              "moduleId": "strategy",
              "groupId": "digital-strategy",
              "imageId": "whole_organization_involvement"
            },
            {
              "moduleId": "strategy",
              "groupId": "digital-strategy",
              "imageId": "organization_as_network_groups"
            }
          ]
        },
        {
          "text": "Because digital transformation is only about getting all employees to use the same hardware.",
          "correct": false,
          "why": "Wrong: this reduces transformation to technical standardization.",
          "whyExtended": [
            "The lecture emphasizes processes, culture, organization, competence and value creation."
          ]
        },
        {
          "text": "Because local groups always have identical goals, cultures and interests.",
          "correct": false,
          "why": "Wrong: the lecture says the opposite.",
          "whyExtended": [
            "The organization is described as a network of groups, often with different perspectives, interests, goals, cultures, identities and agendas."
          ]
        },
        {
          "text": "Because digital strategy works best when no one has responsibility and everyone runs local initiatives independently.",
          "correct": false,
          "why": "Wrong: the lecture emphasizes the need for strategy, governance, responsibility and coordination.",
          "whyExtended": [
            "Local initiatives can contribute to transformation, but without coordination they can also become fragmented."
          ]
        }
      ]
    },
    {
      "id": 20,
      "type": "single",
      "title": "When can CDO be especially important?",
      "moduleId": "strategy",
      "groupId": "digital-strategy",
      "points": 1,
      "prompt": "An organization operates in a highly competitive sector and has many uncoordinated digitalization efforts across units. Which role or organizational solution does the lecture point to as especially relevant?",
      "source": "Answer key: Lecture 14, slides 46–48, CDO, roles and contribution.",
      "options": [
        {
          "text": "Chief Digital Officer (CDO) as change agent and coordinator for digital transformation",
          "correct": true,
          "why": "Correct: the lecture says that CDO can be especially important in competitive sectors and when central coordination is needed.",
          "whyExtended": [
            "CDO can be digital innovator, advocate, harmonizer and accelerator.",
            "The lecture describes the CDO contribution as integrating business and technology perspectives, establishing common goals, building bridges between groups and strengthening a holistic perspective.",
            "This fits especially when digital initiatives must be coordinated across the organization."
          ],
          "whyExtendedImageRefs": [
            {
              "moduleId": "strategy",
              "groupId": "digital-strategy",
              "imageId": "cdo_roles"
            },
            {
              "moduleId": "strategy",
              "groupId": "digital-strategy",
              "imageId": "cdo_contribution"
            }
          ]
        },
        {
          "text": "Remove all central coordination so that each unit can build its own digital strategy independently.",
          "correct": false,
          "why": "Wrong: the case describes a clear need for central coordination, not less coordination.",
          "whyExtended": [
            "Uncoordinated initiatives can create fragmentation, duplicate work and weaker common direction."
          ]
        },
        {
          "text": "Replace digital strategy with a pure IT procurement plan.",
          "correct": false,
          "why": "Wrong: this is too narrow and does not solve the need for trans-functional transformation.",
          "whyExtended": [
            "Digital strategy concerns organizational value creation through digital resources, not only procurement."
          ]
        },
        {
          "text": "Let existing inertia determine the pace of change.",
          "correct": false,
          "why": "Wrong: organizational inertia is a barrier that must be addressed, not a governance mechanism.",
          "whyExtended": [
            "The lecture suggests awareness, competence building, communication, change management, pilots and a flexible digital foundation to address inertia."
          ]
        }
      ]
    }
  ]
};

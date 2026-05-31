// src/data/exams/mockExamDigitalTransformation_en.js
export const mockExamDigitalTransformation_en = {
  "id": "mock-exam-digital-transformation-en",
  "subjectId": "in5431",
  "baseId": "mock-exam-digital-transformation",
  "lang": "en",
  "title": "Practice Exam: Digital transformation",
  "description": "Short practice set on the definition of digital transformation in the Danilova lecture.",
  "modeLabel": "CONCEPT DRILL",
  "estimatedMinutes": "12–18",
  "sortOrder": 141,
  "questions": [
    {
      "id": 1,
      "type": "single",
      "title": "What is digital transformation?",
      "moduleId": "strategy",
      "groupId": "digital-transformation",
      "points": 1,
      "prompt": "Which statement best describes digital transformation in the Danilova lecture?",
      "source": "Answer key: Lecture 14, Digital strategy and the digital transformation, slide 'What is a digital transformation'.",
      "options": [
        {
          "text": "A significant organizational change, driven or enabled by the extensive use of digital technologies.",
          "correct": true,
          "why": "Correct: the definition connects digital transformation to significant organizational change and extensive use of digital technologies.",
          "whyExtended": [
            "The point is not that the organization buys more technology.",
            "The change can concern processes, business model or organizational identity."
          ]
        },
        {
          "text": "A technical upgrade of existing IT systems without organizational change.",
          "correct": false,
          "why": "Wrong: digital transformation requires significant organizational change, not just a technical upgrade.",
          "whyExtended": [
            "This can be an IT initiative, but it does not match the definition of digital transformation.",
            "The Kane quote also says that transformation concerns culture, people, structure and tasks."
          ]
        },
        {
          "text": "Making analog data digital without changing processes or organization.",
          "correct": false,
          "why": "Wrong: this is closer to digitization than digital transformation.",
          "whyExtended": [
            "Digitization can be useful, but this definition concerns extensive organizational change."
          ]
        },
        {
          "text": "A digital strategy that only describes which systems the IT department should buy.",
          "correct": false,
          "why": "Wrong: digital transformation is broader than a purchasing plan for IT systems.",
          "whyExtended": [
            "The definition points to organizational change, not only technology or vendor choices."
          ]
        }
      ],
      whyExtendedImageRefs: [
        "digital_transformation_process"
      ]
    },
    {
      "id": 2,
      "type": "multi",
      "title": "What can digital transformation involve?",
      "moduleId": "strategy",
      "groupId": "digital-transformation",
      "points": 2,
      "prompt": "Select the statements supported by the definition and the Kane quote.",
      "source": "Answer key: Lecture 14, slides 'What is a digital transformation' and the Kane quote from The Technology Fallacy, p. 14.",
      "options": [
        {
          "text": "Digital transformation can involve extensive process redesign.",
          "correct": true,
          "why": "Correct: extensive process redesign is listed as one possible element in the definition.",
          "whyExtended": [
            "Process redesign means that workflows and routines change, not only that a system is replaced."
          ]
        },
        {
          "text": "Digital transformation can involve business model innovation.",
          "correct": true,
          "why": "Correct: business model innovation is listed as one possible element in the definition.",
          "whyExtended": [
            "This concerns how the organization creates, delivers or captures value."
          ]
        },
        {
          "text": "Digital transformation can involve changed organizational identity.",
          "correct": true,
          "why": "Correct: the definition mentions changed or transformed organizational identity.",
          "whyExtended": [
            "This points to a change in what the organization understands itself to be."
          ]
        },
        {
          "text": "Digital transformation is only about implementing more and better technologies.",
          "correct": false,
          "why": "Wrong: the Kane quote explicitly says that it is not just about more and better technologies.",
          "whyExtended": [
            "Technology is a driver or enabler, but the transformation lies in the organization."
          ]
        },
        {
          "text": "Digital transformation involves aligning culture, people, structure and tasks.",
          "correct": true,
          "why": "Correct: the Kane quote says that digital transformation involves alignment of culture, people, structure and tasks.",
          "whyExtended": [
            "This explains why digital transformation is a management and organization issue."
          ]
        },
        {
          "text": "Digital transformation can be completed without affecting people, tasks or structure.",
          "correct": false,
          "why": "Wrong: this contradicts the Kane quote about culture, people, structure and tasks.",
          "whyExtended": [
            "If the change does not affect the organization, it is hard to call it digital transformation in this definition."
          ]
        }
      ],
      whyExtendedImageRefs: [
        "digital_transformation_process"
      ]
    },
    {
      "id": 3,
      "type": "fill",
      "title": "Definition of digital transformation",
      "moduleId": "strategy",
      "groupId": "digital-transformation",
      "points": 1,
      "prompt": "Digital transformation is a significant organizational change, driven or enabled by the extensive use of ________ technologies.",
      "answers": ["digital", "digital technologies"],
      "answerKey": "digital technologies",
      "source": "Answer key: Lecture 14, slide 'What is a digital transformation'.",
      "whyCorrect": "Correct: the definition says that the change is driven or enabled by the extensive use of digital technologies.",
      "whyWrong": "Wrong if the answer does not point to digital technologies. Technology is the driver or enabler in the definition.",
      "whyExtended": [
        "Notice that the definition also requires significant organizational change.",
        "Extensive technology use alone is therefore not enough."
      ],
      whyExtendedImageRefs: [
        "digital_transformation_process"
      ]
    },
    {
      "id": 4,
      "type": "dragDrop",
      "title": "Terms in the definition",
      "moduleId": "strategy",
      "groupId": "digital-transformation",
      "points": 2,
      "prompt": "Drag each term to the correct description.",
      "source": "Answer key: Lecture 14, slides 'What is a digital transformation' and 'Digital transformation can be described as a process'.",
      "cards": [
        {
          "id": "digital-transformation",
          "text": "Digital transformation"
        },
        {
          "id": "process-redesign",
          "text": "Process redesign"
        },
        {
          "id": "business-model-innovation",
          "text": "Business model innovation"
        },
        {
          "id": "organizational-identity",
          "text": "Organizational identity"
        },
        {
          "id": "digital-vision-strategy",
          "text": "Digital vision & strategy"
        }
      ],
      "targets": [
        {
          "id": "digital-transformation",
          "description": "Significant organizational change driven or enabled by the extensive use of digital technologies.",
          "correctCardId": "digital-transformation",
          "correctLabel": "Digital transformation",
          "whyCorrect": "Correct: this is the definition of digital transformation in the lecture.",
          "whyWrong": "This description concerns the whole transformation, not only one possible element in it.",
          "whyExtended": [
            "The definition combines organizational change and extensive use of digital technology."
          ]
        },
        {
          "id": "process-redesign",
          "description": "Extensive change to work processes and the way work is organized.",
          "correctCardId": "process-redesign",
          "correctLabel": "Process redesign",
          "whyCorrect": "Correct: extensive process redesign is one of the elements digital transformation can involve.",
          "whyWrong": "This description concerns processes, not business model or organizational identity.",
          "whyExtended": [
            "Process redesign points to changes in workflows, routines and tasks."
          ]
        },
        {
          "id": "business-model-innovation",
          "description": "Change in how the organization creates, delivers or captures value.",
          "correctCardId": "business-model-innovation",
          "correctLabel": "Business model innovation",
          "whyCorrect": "Correct: business model innovation is one of the elements digital transformation can involve.",
          "whyWrong": "This description concerns value creation and the business model, not only internal processes.",
          "whyExtended": [
            "In digital transformation, technology can enable new value propositions or new ways of earning revenue."
          ]
        },
        {
          "id": "organizational-identity",
          "description": "Change in what the organization understands itself to be.",
          "correctCardId": "organizational-identity",
          "correctLabel": "Organizational identity",
          "whyCorrect": "Correct: the definition mentions changed or transformed organizational identity.",
          "whyWrong": "This description concerns identity, not a digitalization activity or an IT project alone.",
          "whyExtended": [
            "A transformation can change the organization's self-understanding, role and way of working."
          ]
        },
        {
          "id": "digital-vision-strategy",
          "description": "Direction for the change after the organization has realized that change is necessary.",
          "correctCardId": "digital-vision-strategy",
          "correctLabel": "Digital vision & strategy",
          "whyCorrect": "Correct: the lecture describes digital vision & strategy as part of the process for digital transformation.",
          "whyWrong": "This description concerns direction and strategy in the process, not the definition alone.",
          "whyExtended": [
            "Digital vision & strategy comes after the realization that change is necessary."
          ]
        }
      ],
      whyExtendedImageRefs: [
        "digital_transformation_process"
      ]
    },
    {
      "id": 5,
      "type": "drag-categorize",
      "title": "Elements in digital transformation",
      "moduleId": "strategy",
      "groupId": "digital-transformation",
      "points": 2,
      "prompt": "Drag each example to the correct element in the definition.",
      "source": "Answer key: Lecture 14, slide 'What is a digital transformation'.",
      "items": [
        {
          "id": "redesign-order-flow",
          "label": "Change the whole order process from departmental work to a shared digital flow"
        },
        {
          "id": "redesign-tasks",
          "label": "Change tasks and responsibilities because the workflow is automated"
        },
        {
          "id": "subscription-model",
          "label": "Move from product sales to a digital subscription model"
        },
        {
          "id": "platform-revenue",
          "label": "Create revenue through a digital platform with partners"
        },
        {
          "id": "from-retailer-to-service",
          "label": "See the company as a digital service provider instead of only a product supplier"
        },
        {
          "id": "new-self-understanding",
          "label": "Change the organization's self-understanding after a digital initiative"
        }
      ],
      "categories": [
        {
          "id": "process-redesign",
          "label": "Extensive process redesign"
        },
        {
          "id": "business-model-innovation",
          "label": "Business model innovation"
        },
        {
          "id": "organizational-identity",
          "label": "Changed organizational identity"
        }
      ],
      "correctAnswer": {
        "process-redesign": ["redesign-order-flow", "redesign-tasks"],
        "business-model-innovation": ["subscription-model", "platform-revenue"],
        "organizational-identity": ["from-retailer-to-service", "new-self-understanding"]
      },
      "itemFeedback": {
        "redesign-order-flow": {
          "whyCorrect": "Correct: the example concerns extensive change to the work process.",
          "whyWrong": "This primarily concerns process redesign, not revenue model or identity.",
          "whyExtended": [
            "Process redesign is one of the elements digital transformation can involve."
          ]
        },
        "redesign-tasks": {
          "whyCorrect": "Correct: when tasks and responsibilities change because of a new workflow, this is process redesign.",
          "whyWrong": "This concerns how work is done, not a new business model.",
          "whyExtended": [
            "The Kane quote also connects transformation to tasks and structure."
          ]
        },
        "subscription-model": {
          "whyCorrect": "Correct: subscription model changes how the organization captures value.",
          "whyWrong": "This concerns business model innovation, not only process change.",
          "whyExtended": [
            "Business model innovation is one of the elements mentioned in the lecture."
          ]
        },
        "platform-revenue": {
          "whyCorrect": "Correct: revenue through a digital platform with partners concerns business model innovation.",
          "whyWrong": "This concerns value creation and revenue model, not primarily organizational identity.",
          "whyExtended": [
            "Digital technology can open new ways to create and capture value."
          ]
        },
        "from-retailer-to-service": {
          "whyCorrect": "Correct: this points to changed organizational identity.",
          "whyWrong": "The example concerns what the organization understands itself to be, not only a new process.",
          "whyExtended": [
            "Changed organizational identity is one of the elements digital transformation can involve."
          ]
        },
        "new-self-understanding": {
          "whyCorrect": "Correct: changed self-understanding is the core of organizational identity.",
          "whyWrong": "This concerns identity, not process redesign or business model alone.",
          "whyExtended": [
            "Organizational identity can change when digital technologies change the organization's role and work."
          ]
        }
      },
      whyExtendedImageRefs: [
        "digital_transformation_process"
      ]
    },
    {
      "id": 6,
      "type": "matrix-placement",
      "title": "Two criteria in the definition",
      "moduleId": "strategy",
      "groupId": "digital-transformation",
      "points": 3,
      "prompt": "Place the cases according to the two criteria in the definition of digital transformation.",
      "source": "Answer key: Lecture 14, slide 'What is a digital transformation'. The matrix uses the two criteria significant organizational change and extensive use of digital technologies.",
      "matrix": {
        "xAxis": {
          "label": "Use of digital technologies",
          "lowLabel": "Limited",
          "highLabel": "Extensive"
        },
        "yAxis": {
          "label": "Organizational change",
          "lowLabel": "Low",
          "highLabel": "Significant"
        },
        "quadrants": [
          {
            "id": "low-change-low-tech",
            "x": "low",
            "y": "low",
            "title": "Low change / Limited technology use",
            "description": "Minor improvement without extensive digital technology and without organizational transformation"
          },
          {
            "id": "low-change-high-tech",
            "x": "high",
            "y": "low",
            "title": "Low change / Extensive technology use",
            "description": "Much technology, but little change in culture, structure, people or tasks"
          },
          {
            "id": "high-change-low-tech",
            "x": "low",
            "y": "high",
            "title": "Significant change / Limited technology use",
            "description": "Large organizational change, but not primarily driven or enabled by digital technology"
          },
          {
            "id": "high-change-high-tech",
            "x": "high",
            "y": "high",
            "title": "Significant change / Extensive technology use",
            "description": "Digital transformation according to the definition"
          }
        ]
      },
      "items": [
        {
          "id": "scan-archive",
          "label": "Scans the archive and stores the files as PDFs. The way of working is otherwise unchanged.",
          "correctQuadrantId": "low-change-low-tech",
          "whyCorrect": "Correct: the case has low organizational change and limited digital technology use.",
          "whyWrong": "Wrong: this is not digital transformation because the organization barely changes.",
          "whyExtended": [
            "The case is closer to digitization than digital transformation."
          ]
        },
        {
          "id": "new-tools-same-work",
          "label": "Introduces several new digital systems, but keeps the same structure, responsibilities and work processes.",
          "correctQuadrantId": "low-change-high-tech",
          "whyCorrect": "Correct: the case has extensive technology use, but low organizational change.",
          "whyWrong": "Wrong: much technology alone is not enough for digital transformation in this definition.",
          "whyExtended": [
            "The Kane quote says that transformation also concerns culture, people, structure and tasks."
          ]
        },
        {
          "id": "reorg-no-digital-driver",
          "label": "Carries out a major reorganization, but the change is not driven or enabled by digital technologies.",
          "correctQuadrantId": "high-change-low-tech",
          "whyCorrect": "Correct: the case has significant organizational change, but limited digital technology use.",
          "whyWrong": "Wrong: the definition requires that the change is driven or enabled by digital technologies.",
          "whyExtended": [
            "Not all organizational change is digital transformation."
          ]
        },
        {
          "id": "new-digital-business",
          "label": "Uses digital technologies to redesign processes, change the business model and establish new roles.",
          "correctQuadrantId": "high-change-high-tech",
          "whyCorrect": "Correct: the case combines extensive digital technology use with significant organizational change.",
          "whyWrong": "Wrong: this matches both criteria in the definition of digital transformation.",
          "whyExtended": [
            "The case includes process redesign, business model innovation and changes in structure and tasks."
          ]
        }
      ],
      whyExtendedImageRefs: [
        "digital_transformation_process"
      ]
    },
    {
      "id": 7,
      "type": "SequenceOrder",
      "title": "Digital transformation as a process",
      "moduleId": "strategy",
      "groupId": "digital-transformation",
      "points": 2,
      "prompt": "Put the elements in the same order as the process description in the lecture.",
      "source": "Answer key: Lecture 14, slide 'Digital transformation can be described as a process'.",
      "items": [
        {
          "id": "realization",
          "label": "Triggered by a realization that change is necessary"
        },
        {
          "id": "vision-strategy",
          "label": "Digital vision & strategy"
        },
        {
          "id": "digitalization-projects",
          "label": "Digitalization projects"
        },
        {
          "id": "investment",
          "label": "Investment in digital technology and competence"
        },
        {
          "id": "cdo-unit",
          "label": "Chief Digital Officer and/or a digital unit"
        }
      ],
      "correctOrder": [
        "realization",
        "vision-strategy",
        "digitalization-projects",
        "investment",
        "cdo-unit"
      ],
      "itemFeedback": {
        "realization": {
          "whyCorrect": "Correct: the process starts with a realization that change is necessary.",
          "whyWrong": "This should be first. The lecture describes the process as triggered by a realization that change is necessary.",
          "whyExtended": [
            "Without the realization that change is needed, digital transformation can easily be reduced to individual projects."
          ]
        },
        "vision-strategy": {
          "whyCorrect": "Correct: digital vision & strategy comes after the realization that change is necessary.",
          "whyWrong": "Digital vision & strategy comes before concrete digitalization projects in the slide sequence.",
          "whyExtended": [
            "Vision and strategy give direction for the changes and projects the organization should carry out."
          ]
        },
        "digitalization-projects": {
          "whyCorrect": "Correct: digitalization projects follow digital vision & strategy in the process description.",
          "whyWrong": "Digitalization projects come after direction has been set through digital vision & strategy.",
          "whyExtended": [
            "The projects are concrete initiatives that should realize parts of the transformation."
          ]
        },
        "investment": {
          "whyCorrect": "Correct: investment in digital technology and competence comes after digitalization projects in the slide sequence.",
          "whyWrong": "This element should be placed after digitalization projects in the lecture list.",
          "whyExtended": [
            "The investments concern both digital technology and competence."
          ]
        },
        "cdo-unit": {
          "whyCorrect": "Correct: Chief Digital Officer and/or a digital unit is last in the process list on the slide.",
          "whyWrong": "This element is last in the lecture's process description.",
          "whyExtended": [
            "CDO or digital unit points to the organization of digital transformation."
          ]
        }
      },
      whyExtendedImageRefs: [
        "digital_transformation_process"
      ]
    }
  ]
};

// src/data/exams/mockExamSustainability_en.js
export const mockExamSustainability_en = {
  id: "mock-exam-sustainability-en",
  subjectId: "in5431",
  baseId: "mock-exam-sustainability",
  lang: "en",
  title: "Practice Exam: Sustainability, Reporting and IT Management",
  description: "Exam-oriented questions from the lecture Sustainability: Implications for management. Emphasis on sustainability concepts, the double role of digitalization, circular economy, the shipping case, CSRD, double materiality, Scope 1-3 and implications for IT governance.",
  modeLabel: "SUSTAINABILITY",
  estimatedMinutes: "45-60",
  sortOrder: 95,
  questions: [
    {
      id: 1,
      type: "multi",
      title: "Why sustainability concerns IT management",
      points: 1,
      moduleId: "sustainability",
      groupId: "management",
      prompt: "Select the statements that best explain why sustainability is relevant for organizations and IT managers in the lecture.",
      source: "Source: IN5431 Sustainability: Implications for management, slide 5.",
      options: [
        {
          text: "Companies should employ digital technology responsibly.",
          correct: true,
          why: "Correct: the lecture explicitly points to responsible use of digital technology.",
          whyExtended: [
            "Digital technology can support sustainability, but it also has materiality, energy use, e-waste and social consequences.",
            "IT management is therefore not only about efficiency. It is also about responsible use, governance and prioritization.",
            "This connects sustainability directly to governance, data quality and decisions about digital solutions."
          ]
        },
        {
          text: "Sustainability transitions require and enable innovation.",
          correct: true,
          why: "Correct: sustainability transitions can require new solutions and open up innovation.",
          whyExtended: [
            "The lecture discusses circular economy, digital product passports, route optimization in shipping and new data-driven reporting regimes.",
            "Such changes often require new processes, data flows, platforms and forms of collaboration.",
            "Sustainability is therefore not only compliance. It can also drive digital and organizational innovation."
          ]
        },
        {
          text: "Top-down sustainability policies can rely on data reporting.",
          correct: true,
          why: "Correct: the lecture connects policy, reporting requirements and data.",
          whyExtended: [
            "CSRD, MRV, ETS and FuelEU Maritime show that regulation often requires data capture, reporting, verification and traceability.",
            "IT systems and data governance become central when organizations must document emissions and sustainability work.",
            "IT governance matters because reported data can lead to financial benefits or sanctions."
          ]
        },
        {
          text: "Sustainability is mainly a communication and branding topic without a link to IT systems.",
          correct: false,
          why: "Wrong: the lecture shows several concrete links to IT systems, data and governance.",
          whyExtended: [
            "Digital product passports, noon reports, reporting systems, data verification and route optimization are technological and organizational examples.",
            "Sustainability policy has practical consequences through data requirements, reporting duties and governance systems.",
            "Reducing the topic to communication misses both the innovation and governance dimensions."
          ]
        }
      ]
    },
    {
      id: 2,
      type: "drag-categorize",
      title: "Digital technology: contributions and burdens",
      points: 2,
      moduleId: "sustainability",
      groupId: "digital-technology",
      prompt: "Drag each statement to the correct category: positive contribution to sustainability transition or negative sustainability burden.",
      source: "Source: IN5431 Sustainability, slides 3-4.",
      items: [
        { id: "virtualization", label: "Virtualization: digital solutions can replace physical activities" },
        { id: "optimization", label: "Optimization: reduce waste through better decisions" },
        { id: "monitoring", label: "Monitoring and measurement that inform action" },
        { id: "innovation", label: "New technologies can drive sustainability innovation" },
        { id: "rare-earth", label: "Extraction of rare earth minerals and conflict minerals" },
        { id: "e-waste", label: "Electronic waste" },
        { id: "energy", label: "Energy consumption in digital infrastructure" },
        { id: "social-disruption", label: "Social disruption, for example around platform services in neighborhoods" }
      ],
      categories: [
        { id: "positive", label: "Positive contribution" },
        { id: "negative", label: "Negative burden" }
      ],
      correctAnswer: {
        positive: ["virtualization", "optimization", "monitoring", "innovation"],
        negative: ["rare-earth", "e-waste", "energy", "social-disruption"]
      },
      itemFeedback: {
        virtualization: {
          whyCorrect: "Virtualization is a positive contribution because digital solutions can replace physical processes or travel.",
          whyWrong: "This is not primarily a burden. It is one of the lecture's examples of how digital technology can support transition.",
          whyExtended: ["The point is not that digital technology is always sustainable. The effect must be assessed in context."]
        },
        optimization: {
          whyCorrect: "Optimization is a positive contribution because better data and analysis can reduce waste.",
          whyWrong: "Optimization is placed on the contribution side in the lecture, not as a direct negative effect.",
          whyExtended: ["The shipping case shows this through route optimization and reduced fuel consumption."]
        },
        monitoring: {
          whyCorrect: "Monitoring can support sustainability because measurement makes it possible to act and document development.",
          whyWrong: "Monitoring and measurement are enabling contributions, especially in regulation and reporting.",
          whyExtended: ["Sustainability policy often depends on data that can be reported, validated and verified."]
        },
        innovation: {
          whyCorrect: "New technologies can drive innovation that supports sustainability transitions.",
          whyWrong: "Innovation is not a negative burden in itself, although the technology used must also be assessed critically.",
          whyExtended: ["Sustainability transitions can open up new services, new business models and new digital infrastructures."]
        },
        "rare-earth": {
          whyCorrect: "Rare earth minerals, mining and conflict minerals show that ICTs are also material artefacts.",
          whyWrong: "This is a negative burden, not an example of digital technology reducing resource use.",
          whyExtended: ["The lecture warns against understanding ICT as only virtual."]
        },
        "e-waste": {
          whyCorrect: "Electronic waste is a concrete environmental burden from digital technology.",
          whyWrong: "E-waste is not a positive sustainability contribution. It is a problem that must be handled.",
          whyExtended: ["This connects directly to circular economy and the need to keep materials in circulation as long as possible."]
        },
        energy: {
          whyCorrect: "Energy consumption is a negative burden because digital infrastructure needs electricity and physical equipment.",
          whyWrong: "Energy consumption is not automatically sustainable just because the service is digital.",
          whyExtended: ["The lecture explicitly points to energy consumption as a negative environmental consequence."]
        },
        "social-disruption": {
          whyCorrect: "Social disruption is a negative social effect of some digital services and platforms.",
          whyWrong: "This is not about efficiency. It is about social consequences of digitalization.",
          whyExtended: ["Sustainability is multidimensional: social effects must be assessed together with economy and environment."]
        }
      }
    },
    {
      id: 3,
      type: "dragDrop",
      title: "Core sustainability concepts",
      points: 2,
      moduleId: "sustainability",
      groupId: "core-concepts",
      prompt: "Drag each concept to the most precise explanation.",
      source: "Source: IN5431 Sustainability, slides 8-23.",
      cards: [
        { id: "sdg", text: "Sustainable Development Goals" },
        { id: "planetary-boundaries", text: "Planetary boundaries" },
        { id: "doughnut", text: "Doughnut economics" },
        { id: "degrowth", text: "Degrowth / postgrowth" },
        { id: "netzero", text: "Net Zero" },
        { id: "twin-transition", text: "Twin transitions" }
      ],
      targets: [
        {
          id: "sdg",
          description: "The UN agenda for 2015-2030 with 17 goals and 169 targets",
          correctCardId: "sdg",
          correctLabel: "Sustainable Development Goals",
          whyCorrect: "The SDGs are the UN Sustainable Development Goals in Agenda 2030.",
          whyWrong: "This explanation concerns the UN goal structure, not planetary boundaries or reporting.",
          whyExtended: ["The lecture uses the SDGs as an entry point to sustainability as a field of governance and policy."]
        },
        {
          id: "planetary-boundaries",
          description: "Framework for biophysical boundaries that human activity should not exceed",
          correctCardId: "planetary-boundaries",
          correctLabel: "Planetary boundaries",
          whyCorrect: "Planetary boundaries concern environmental limits.",
          whyWrong: "This is not a reporting directive or a critique of economic growth. It is a model of planetary limits.",
          whyExtended: ["The lecture shows development from 2009 to 2023, where several boundaries are crossed."]
        },
        {
          id: "doughnut",
          description: "Model that combines a social foundation with planetary boundaries",
          correctCardId: "doughnut",
          correctLabel: "Doughnut economics",
          whyCorrect: "Doughnut economics connects welfare goals and ecological limits.",
          whyWrong: "This explanation concerns Raworth's doughnut model, not only emissions accounting.",
          whyExtended: ["The point is to develop society within a safe and just space."]
        },
        {
          id: "degrowth",
          description: "Critique of growth ideology and search for alternatives to GDP growth as a measure of improvement",
          correctCardId: "degrowth",
          correctLabel: "Degrowth / postgrowth",
          whyCorrect: "Degrowth separates the understanding of development from a requirement for economic growth.",
          whyWrong: "This explanation concerns growth critique, not Net Zero.",
          whyExtended: ["The lecture also mentions postgrowth and steady-state economics as related concepts."]
        },
        {
          id: "netzero",
          description: "Greenhouse gas emissions are balanced with the amount removed from the atmosphere",
          correctCardId: "netzero",
          correctLabel: "Net Zero",
          whyCorrect: "Net Zero means that emissions are balanced by removal or uptake.",
          whyWrong: "This is not just digital transformation. It is a climate target linked to greenhouse gases.",
          whyExtended: ["The lecture clarifies that GHG is broader than only CO2."]
        },
        {
          id: "twin-transition",
          description: "Digital transformation and sustainability transition must be understood together",
          correctCardId: "twin-transition",
          correctLabel: "Twin transitions",
          whyCorrect: "Twin transitions concern the interaction between digital and green transition.",
          whyWrong: "This is not one emissions category. It is a perspective on simultaneous digital and sustainability transformation.",
          whyExtended: ["The lecture is critical: digital efficiency gains must be weighed against electricity use and rare materials."]
        }
      ]
    },
    {
      id: 4,
      type: "drag-categorize",
      title: "Three dimensions of sustainability",
      points: 2,
      moduleId: "sustainability",
      groupId: "three-dimensions",
      prompt: "Drag each statement to the correct area in the model of the three sustainability dimensions.",
      source: "Source: IN5431 Sustainability, slide 12.",
      items: [
        { id: "profit", label: "Economic dimension / profit" },
        { id: "people", label: "Social dimension / people" },
        { id: "planet", label: "Environmental dimension / planet" },
        { id: "equitable", label: "Economic + social: equitable" },
        { id: "bearable", label: "Environmental + social: bearable" },
        { id: "viable", label: "Economic + environmental: viable" },
        { id: "sustainable", label: "All three dimensions: sustainable" }
      ],
      categories: [
        { id: "single-dimension", label: "One dimension" },
        { id: "two-dimensions", label: "Two dimensions" },
        { id: "all-dimensions", label: "All three dimensions" }
      ],
      correctAnswer: {
        "single-dimension": ["profit", "people", "planet"],
        "two-dimensions": ["equitable", "bearable", "viable"],
        "all-dimensions": ["sustainable"]
      },
      itemFeedback: {
        profit: { whyCorrect: "Economy is one of the three basic dimensions.", whyWrong: "Profit is not an overlap between dimensions. It is the economic dimension in triple bottom line.", whyExtended: ["Triple bottom line is summarized as profit, people and planet."] },
        people: { whyCorrect: "Social sustainability is one of the three basic dimensions.", whyWrong: "People is not a combination. It is the social dimension.", whyExtended: ["Social effects of digital technology, such as platform conflicts, belong here."] },
        planet: { whyCorrect: "Environment is one of the three basic dimensions.", whyWrong: "Planet is not a combination. It is the environmental dimension.", whyExtended: ["Energy, e-waste, material use and emissions belong especially here."] },
        equitable: { whyCorrect: "Equitable is the overlap between the economic and social dimensions.", whyWrong: "This is not all three dimensions. It is a two-dimensional overlap.", whyExtended: ["The lecture places economic + social as equitable."] },
        bearable: { whyCorrect: "Bearable is the overlap between the environmental and social dimensions.", whyWrong: "This is not only environmental or only social. It is the interaction between the two.", whyExtended: ["The model shows that a solution must be socially acceptable and environmentally bearable."] },
        viable: { whyCorrect: "Viable is the overlap between the economic and environmental dimensions.", whyWrong: "This is not all three dimensions. It is a two-dimensional overlap.", whyExtended: ["A solution can be economically and environmentally viable without necessarily covering social justice."] },
        sustainable: { whyCorrect: "Sustainable is the overlap between economic, social and environmental dimensions.", whyWrong: "In the model, sustainability requires that all three dimensions are handled at the same time.", whyExtended: ["This is why sustainability assessments are often multidimensional and full of trade-offs."] }
      },
      whyCorrect: "The model distinguishes economic, social and environmental sustainability, and shows how the overlaps have different meanings.",
      whyExtended: [
        "The lecture connects the model to triple bottom line: profit, people and planet.",
        "An exam-oriented understanding is being able to apply the model to concrete cases, not only repeat the words."
      ],
      whyExtendedImageRefs: [
        { moduleId: "sustainability", groupId: "three-dimensions", imageId: "sustainability_three_dimensions" }
      ]
    },
    {
      id: 5,
      type: "single",
      title: "Net Zero and greenhouse gases",
      points: 1,
      moduleId: "sustainability",
      groupId: "core-concepts",
      prompt: "An organization says it will become Net Zero. Which statement is most precise according to the lecture?",
      source: "Source: IN5431 Sustainability, slide 22.",
      options: [
        {
          text: "Net Zero means that the organization balances greenhouse gas emissions with the amount removed from the atmosphere.",
          correct: true,
          why: "Correct: Net Zero concerns the balance between emissions and removal or uptake.",
          whyExtended: [
            "The lecture also uses terms such as net zero, carbon neutral and climate neutral.",
            "It is important that GHG includes more greenhouse gases than only CO2.",
            "Practical measures can include phasing out fossil energy, carbon capture and storage, tree planting, regenerative agriculture and protection of wetlands."
          ]
        },
        {
          text: "Net Zero means that all digital technology is removed from the organization.",
          correct: false,
          why: "Wrong: Net Zero concerns emissions and uptake of greenhouse gases, not shutting down digital technology.",
          whyExtended: ["Digital technology can both support and harm sustainability. The point is governed and responsible use.", "Net Zero is a climate target, not an IT shutdown strategy."]
        },
        {
          text: "Net Zero only means that CO2 emissions are reported, regardless of other greenhouse gases.",
          correct: false,
          why: "Wrong: the lecture clarifies that GHG is broader than CO2.",
          whyExtended: ["Scope reporting and greenhouse gas accounting must be understood more broadly than carbon dioxide alone.", "Ignoring other greenhouse gases would give a too narrow picture."]
        },
        {
          text: "Net Zero means that economic growth must always be prioritized over emission reductions.",
          correct: false,
          why: "Wrong: this contradicts the sustainability perspective in the lecture.",
          whyExtended: ["The lecture also discusses degrowth and postgrowth as critiques of growth as the only goal.", "Net Zero is linked to climate targets, not to prioritizing growth over emission cuts."]
        }
      ]
    },
    {
      id: 6,
      type: "single",
      title: "Circular economy",
      points: 1,
      moduleId: "sustainability",
      groupId: "circular-economy",
      prompt: "Which description best fits circular economy as presented in the lecture?",
      source: "Source: IN5431 Sustainability, slide 27.",
      options: [
        {
          text: "Keeping products, resources and materials in circulation for as long as possible to minimize resource use, waste and pollution.",
          correct: true,
          why: "Correct: this is the core of circular economy in the lecture.",
          whyExtended: ["The lecture contrasts circular economy with linear take-make-dispose economy.", "It concerns environmental protection and redesign of processes, products and value chains.", "Digital technology can support this through information about materials, markets, sharing platforms and product passports."]
        },
        {
          text: "Producing as much new equipment as possible, as long as it is digital.",
          correct: false,
          why: "Wrong: circular economy concerns reducing resource use and waste, not increasing production without critique.",
          whyExtended: ["Digital equipment also has materiality, energy use and waste problems.", "Circular economy is therefore especially relevant for ICT and electronics."]
        },
        {
          text: "Separating economic assessments completely from environmental assessments.",
          correct: false,
          why: "Wrong: sustainability requires economic, social and environmental considerations to be seen together.",
          whyExtended: ["Circular economy tries to change economic logics to reduce environmental burden.", "This can create new business models, for example X-as-a-service."]
        },
        {
          text: "Replacing all reporting with voluntary marketing.",
          correct: false,
          why: "Wrong: the lecture emphasizes data, reporting and regulation.",
          whyExtended: ["Circular economy is linked to LCA, MFA, EPD and Digital Product Passport.", "These require documentation, standards and data, not only communication."]
        }
      ]
    },
    {
      id: 7,
      type: "dragDrop",
      title: "Tools for circular economy",
      points: 2,
      moduleId: "sustainability",
      groupId: "circular-economy",
      prompt: "Drag each tool or framework to the correct explanation.",
      source: "Source: IN5431 Sustainability, slides 35 and 37.",
      cards: [
        { id: "lca", text: "Life Cycle Assessment (LCA)" },
        { id: "mfa", text: "Material Flow Analysis (MFA)" },
        { id: "epd", text: "Environmental Product Declaration (EPD)" },
        { id: "dpp", text: "Digital Product Passport" }
      ],
      targets: [
        { id: "lca", description: "Assessment of environmental data from raw material extraction, production, use phase and disposal", correctCardId: "lca", correctLabel: "Life Cycle Assessment (LCA)", whyCorrect: "LCA assesses environmental impact through the life cycle.", whyWrong: "This explanation concerns life cycle assessment, not product passport or material flow accounting.", whyExtended: ["The lecture says that an EPD is made based on an LCA."] },
        { id: "mfa", description: "Analysis of material flows and material costs in processes or value chains", correctCardId: "mfa", correctLabel: "Material Flow Analysis (MFA)", whyCorrect: "MFA concerns material flows.", whyWrong: "This explanation points to material flow, not life cycle declaration.", whyExtended: ["The lecture mentions ISO 14052:2017 Material flow cost accounting."] },
        { id: "epd", description: "Environmental declaration for a product, made on the basis of LCA", correctCardId: "epd", correctLabel: "Environmental Product Declaration (EPD)", whyCorrect: "EPD is an environmental declaration based on life cycle assessment.", whyWrong: "This is not a general market solution. It is documentation of a product's environmental data.", whyExtended: ["The lecture connects EPD to ISO 14025 Type III Environmental Labels and Declarations."] },
        { id: "dpp", description: "Digital documentation of origin, materials, production process and environmental impact", correctCardId: "dpp", correctLabel: "Digital Product Passport", whyCorrect: "Digital Product Passport makes product data digitally available.", whyWrong: "This is not a manual life cycle assessment. It is digital product documentation.", whyExtended: ["The lecture connects DPP to the EU and coming requirements for several product groups, including ICT and electronics."] }
      ]
    },
    {
      id: 8,
      type: "multi",
      title: "Digital technology in circular economy",
      points: 1,
      moduleId: "sustainability",
      groupId: "circular-economy",
      prompt: "Which examples show how digital technology can support circular economy?",
      source: "Source: IN5431 Sustainability, slide 38.",
      options: [
        { text: "Information about materials, components and quality.", correct: true, why: "Correct: information about materials is a central digital support function.", whyExtended: ["Circular models require actors to know what products contain and what quality the resources have."] },
        { text: "Digital product passports with data about origin, materials and environmental impact.", correct: true, why: "Correct: Digital Product Passports are explicitly mentioned in the lecture.", whyExtended: ["DPP can make it easier to repair, reuse, recycle and document products."] },
        { text: "Markets that connect supply and demand for materials.", correct: true, why: "Correct: digital markets can connect actors that have and need materials.", whyExtended: ["This can reduce waste by giving surplus materials new use."] },
        { text: "Sharing platforms and X-as-a-service models.", correct: true, why: "Correct: the lecture mentions both sharing platforms and servitization.", whyExtended: ["Servitization can shift focus from selling new products to access, maintenance and better resource use."] },
        { text: "Removing all data about materials so products become easier to resell.", correct: false, why: "Wrong: circular economy requires more information about materials and products, not less.", whyExtended: ["Without material data, repair, reuse, sorting and documentation become harder."] }
      ]
    },
    {
      id: 9,
      type: "drag-categorize",
      title: "The shipping case: three levels of digitalization",
      points: 2,
      moduleId: "sustainability",
      groupId: "shipping",
      prompt: "Drag each example to the part of the shipping case where it fits best.",
      source: "Source: IN5431 Sustainability, slides 43-56.",
      items: [
        { id: "sensor-speed", label: "Sensors are used to choose fuel-efficient speed" },
        { id: "hull-cleaning", label: "Predictive hull cleaning to reduce friction" },
        { id: "noon-reports", label: "Noon reports are sent from ship to shore" },
        { id: "route-weather", label: "Route optimization connects weather, ocean and fuel data" },
        { id: "mrv", label: "MRV requires Monitoring, Reporting and Verification" },
        { id: "ets", label: "ETS creates costs and incentives linked to emissions" }
      ],
      categories: [
        { id: "digital-ship", label: "The digital ship" },
        { id: "connected-ship", label: "The connected ship" },
        { id: "regulatory-context", label: "Regulatory context" }
      ],
      correctAnswer: {
        "digital-ship": ["sensor-speed", "hull-cleaning"],
        "connected-ship": ["noon-reports", "route-weather"],
        "regulatory-context": ["mrv", "ets"]
      },
      itemFeedback: {
        "sensor-speed": { whyCorrect: "This fits the digital ship: data about ship performance is used to reduce fuel consumption.", whyWrong: "This is onboard and performance optimization, not primarily regulation.", whyExtended: ["The lecture mentions speed relative to wave height, engine setup and trim."] },
        "hull-cleaning": { whyCorrect: "Predictive hull cleaning fits the digital ship because sensor data and models are used for operational decisions.", whyWrong: "This is not reporting to authorities. It is optimization of hull friction and fuel consumption.", whyExtended: ["Biofouling on the hull increases friction and fuel use."] },
        "noon-reports": { whyCorrect: "Noon reports show the connected ship: data is sent from ship to shore.", whyWrong: "This concerns data sharing and connectivity, not only local sensors onboard.", whyExtended: ["The reports include position, speed, weather, ETA and amounts of fuel and oil onboard."] },
        "route-weather": { whyCorrect: "Route optimization connects ship data with global data infrastructures.", whyWrong: "This is more than isolated ship technology. It builds on connectivity and external data sources.", whyExtended: ["The lecture mentions weather data, ocean data, iceberg warnings and typhoons."] },
        mrv: { whyCorrect: "MRV is part of the regulatory landscape: Monitoring, Reporting and Verification.", whyWrong: "MRV primarily concerns reporting and verification, not route choice itself.", whyExtended: ["Regulation requires data that documents fuel use and emissions."] },
        ets: { whyCorrect: "ETS is a regulatory regime that connects economic costs to emissions.", whyWrong: "ETS is not a sensor or route algorithm. It is a cap-and-trade system extended to maritime transport.", whyExtended: ["The lecture says that ETS drives actors toward more frequent reporting and continuous verification."] }
      }
    },
    {
      id: 10,
      type: "single",
      title: "Route optimization in shipping",
      points: 1,
      moduleId: "sustainability",
      groupId: "shipping",
      prompt: "A shipping company wants to reduce fuel consumption through digital route choices. Which assessment is most in line with the lecture?",
      source: "Source: IN5431 Sustainability, slide 54.",
      options: [
        { text: "Route optimization must balance time requirements against fuel costs and connect ship data with external data such as weather and ocean conditions.", correct: true, why: "Correct: the lecture describes this trade-off and data connection.", whyExtended: ["The OptiRoute example uses routing algorithms, weather forecasts and fuel models.", "Route optimization is used before and during the voyage, with dynamic recalculations based on updated weather.", "This is a good example of twin transitions: digitalization is used to support emission reduction."] },
        { text: "Route optimization is only about choosing the shortest geographical route.", correct: false, why: "Wrong: the shortest route is not necessarily the lowest-emission or lowest-cost route.", whyExtended: ["Weather, waves, currents, engine load and time requirements affect fuel consumption.", "Route choice must therefore be seen as a dynamic optimization task."] },
        { text: "Route optimization does not require external data infrastructures.", correct: false, why: "Wrong: the lecture emphasizes the connection to weather data, ocean data and other global infrastructures.", whyExtended: ["GPS, satellite communication, weather data and ocean data are important underlying infrastructures.", "Without such data sources, route optimization becomes much weaker."] },
        { text: "Route optimization is only a reporting requirement and has no operational value.", correct: false, why: "Wrong: route optimization has direct operational value through reduced fuel use and better planning.", whyExtended: ["Regulatory reporting is another part of the shipping case.", "Route optimization is primarily an operational use of data, even though data can also have regulatory and financial secondary effects."] }
      ]
    },
    {
      id: 11,
      type: "multi",
      title: "Noon reports and multiple use of data",
      points: 1,
      moduleId: "sustainability",
      groupId: "shipping",
      prompt: "Which claims about noon reports and ship data are correct according to the lecture?",
      source: "Source: IN5431 Sustainability, slides 49 and 52.",
      options: [
        { text: "Data can be used by the crew onboard for operational assessments.", correct: true, why: "Correct: data is used to calculate time to destination, bunkering needs and performance.", whyExtended: ["This shows that the same data can have local operational value before it gets broader organizational or regulatory use."] },
        { text: "Data can be sent to ship management on shore to monitor operations and optimize performance.", correct: true, why: "Correct: noon reports connect the ship to shore-based management.", whyExtended: ["The lecture shows that historical data from one ship and comparison at fleet level enable analysis."] },
        { text: "Data can be used for regulatory compliance, for example fuel and emissions reporting.", correct: true, why: "Correct: regulation is a central secondary use of operational data.", whyExtended: ["This is the connection from operational data to global governance and sustainability policy."] },
        { text: "Data can be shared with third parties such as service providers.", correct: true, why: "Correct: the lecture mentions sharing with third parties.", whyExtended: ["This can enable platform services, performance analysis and other data-driven services."] },
        { text: "Noon reports contain only the ship's name and never position, weather or fuel data.", correct: false, why: "Wrong: the lecture lists many data types, including position, speed, wind, sea conditions and fuel amounts.", whyExtended: ["The reports are data-rich. That is why they can be used for several purposes."] }
      ]
    },
    {
      id: 12,
      type: "single",
      title: "Regulation as a data driver",
      points: 1,
      moduleId: "sustainability",
      groupId: "shipping",
      prompt: "What is the most important IT management implication when ETS introduces new costs for ship voyages?",
      source: "Source: IN5431 Sustainability, slide 56.",
      options: [
        { text: "Actors get stronger incentives for more frequent data reporting and more continuous verification.", correct: true, why: "Correct: the lecture says that ETS drives more frequent reporting and continuous verification.", whyExtended: ["When emissions have direct economic consequences, requirements for data capture, data quality and traceability increase.", "This connects regulatory goals to concrete IT systems and governance practices.", "It is not enough to have data. The data must be validated and used in reporting and decisions."] },
        { text: "IT systems become less relevant because ETS is a purely legal framework.", correct: false, why: "Wrong: a legal framework can create major requirements for data and system support.", whyExtended: ["Regulation is often implemented through reporting requirements, data standards, verification and economic incentives.", "IT management therefore becomes central for compliance."] },
        { text: "Shipping companies can stop collecting operational data as long as they pay allowances.", correct: false, why: "Wrong: allowances and costs require emissions to be measured and documented.", whyExtended: ["Without data, emissions, costs and compliance cannot be calculated credibly."] },
        { text: "Regulation removes the need for data verification because authorities always know emissions directly.", correct: false, why: "Wrong: the lecture emphasizes reporting and verification.", whyExtended: ["MRV stands for Monitoring, Reporting and Verification."] }
      ]
    },
    {
      id: 13,
      type: "drag-categorize",
      title: "Infrastructures in the shipping case",
      points: 2,
      moduleId: "sustainability",
      groupId: "shipping",
      prompt: "Drag each infrastructure or platform to the correct level.",
      source: "Source: IN5431 Sustainability, slide 59.",
      items: [
        { id: "gps", label: "The GPS system" },
        { id: "satellite", label: "Satellite communication and internet" },
        { id: "weather-ocean", label: "Weather data and ocean data" },
        { id: "ais", label: "The AIS system for ship position" },
        { id: "ship-registries", label: "Ship registries, for example Lloyds" },
        { id: "imo-dcs", label: "IMO DCS and EMSA THETIS for reporting" },
        { id: "vesselinsight", label: "Kongsberg VesselInsight" },
        { id: "veracity", label: "Veritas Veracity" }
      ],
      categories: [
        { id: "universal", label: "Universal infrastructures" },
        { id: "sector", label: "Maritime sector infrastructures" },
        { id: "corporate", label: "Corporate/platform infrastructures" }
      ],
      correctAnswer: {
        universal: ["gps", "satellite", "weather-ocean"],
        sector: ["ais", "ship-registries", "imo-dcs"],
        corporate: ["vesselinsight", "veracity"]
      },
      itemFeedback: {
        gps: { whyCorrect: "GPS is a universal infrastructure that many sectors build on.", whyWrong: "GPS is not specific to the maritime sector or one organization.", whyExtended: ["The shipping case shows how digital services often build on layers of infrastructures."] },
        satellite: { whyCorrect: "Satellite communication and internet are universal infrastructures.", whyWrong: "This is not one corporate platform. It is general communication infrastructure.", whyExtended: ["Connectivity is a prerequisite for the connected ship and data sharing."] },
        "weather-ocean": { whyCorrect: "Weather and ocean data are universal data infrastructures used in route optimization.", whyWrong: "This is not a reporting regime. It is external data that many actors can use.", whyExtended: ["Route optimization connects ship data with global weather and ocean data."] },
        ais: { whyCorrect: "AIS is a maritime sector infrastructure for ship position.", whyWrong: "AIS is not a general internet infrastructure or one corporate platform.", whyExtended: ["AIS provides position data that is especially important in the maritime sector."] },
        "ship-registries": { whyCorrect: "Ship registries are maritime sector infrastructures.", whyWrong: "This is not a universal infrastructure like GPS. It is sector-specific registration.", whyExtended: ["The lecture mentions Lloyds as an example."] },
        "imo-dcs": { whyCorrect: "IMO DCS and EMSA THETIS are sector infrastructures for reporting.", whyWrong: "This is not a corporate platform. It is reporting infrastructure linked to the sector and regulation.", whyExtended: ["DCS stands for Data Collection System for fuel consumption."] },
        vesselinsight: { whyCorrect: "VesselInsight is an example of corporate/platform infrastructure.", whyWrong: "This is a specific platform actor, not a global base infrastructure.", whyExtended: ["The lecture mentions Kongsberg as an example of corporate infrastructure."] },
        veracity: { whyCorrect: "Veracity is an example of corporate/platform infrastructure.", whyWrong: "This is not a universal infrastructure or public reporting regime.", whyExtended: ["Such platforms can collect, analyze and share data in the ecosystem."] }
      }
    },
    {
      id: 14,
      type: "single",
      title: "From SOX to CSRD: governance logic",
      points: 1,
      moduleId: "sustainability",
      groupId: "reporting",
      prompt: "The lecture compares Enron/SOX with sustainability reporting. What is the main point of the comparison?",
      source: "Source: IN5431 Sustainability, slides 62-63.",
      options: [
        { text: "Stronger reporting requirements can drive investments in information systems, internal control, data integrity and IT governance.", correct: true, why: "Correct: the SOX example is used to show how reporting can reshape governance and system landscapes.", whyExtended: ["After Enron, leaders had to certify the accuracy of financial reports, auditor independence was strengthened, and internal controls became more important.", "The lecture asks whether sustainability reporting requirements can drive a similar expansion and strengthening of IT governance.", "CSRD can therefore be understood as more than a reporting duty. It can change systems, data practices and lines of responsibility."] },
        { text: "SOX shows that reporting requirements always reduce the need for IT governance.", correct: false, why: "Wrong: the lecture describes the opposite. Stronger reporting can strengthen governance.", whyExtended: ["Data integrity and internal control become more central when reported data matters."] },
        { text: "Sustainability reporting is completely different from financial reporting because data quality does not matter.", correct: false, why: "Wrong: data veracity, validation and verification are central points in the lecture.", whyExtended: ["When reported sustainability data can lead to benefits or sanctions, data quality becomes critical."] },
        { text: "Enron/SOX is used only as a historical example without relevance for IT management.", correct: false, why: "Wrong: the comparison is explicitly linked to IT governance.", whyExtended: ["The lecture shows that financial reporting drove information systems and governance, and asks whether CSRD can have similar effects."] }
      ]
    },
    {
      id: 15,
      type: "dragDrop",
      title: "Double materiality",
      points: 2,
      moduleId: "sustainability",
      groupId: "reporting",
      prompt: "Drag each concept to the most precise explanation in the model of double materiality.",
      source: "Source: IN5431 Sustainability, slide 72.",
      cards: [
        { id: "financial-materiality", text: "Financial materiality" },
        { id: "impact-materiality", text: "Impact materiality" },
        { id: "double-materiality", text: "Double materiality" },
        { id: "company-affected", text: "Impact on the company" },
        { id: "company-affects", text: "Impact from the company" }
      ],
      targets: [
        { id: "financial-materiality", description: "How climate, environment and people affect the company's financial situation and investor-relevant risk", correctCardId: "financial-materiality", correctLabel: "Financial materiality", whyCorrect: "Financial materiality concerns impact on the company and is primarily relevant for investors.", whyWrong: "This explanation concerns outside-in risk for the company, not the company's impact on the outside world.", whyExtended: ["In the figure, the arrow goes from climate, environment and people toward the company."] },
        { id: "impact-materiality", description: "How the company's activities affect climate, environment and people", correctCardId: "impact-materiality", correctLabel: "Impact materiality", whyCorrect: "Impact materiality concerns the company's impact on the outside world.", whyWrong: "This is the inside-out perspective, not primarily the investor's risk for the company.", whyExtended: ["In the figure, the arrow goes from the company toward climate, environment and people."] },
        { id: "double-materiality", description: "Reporting must assess both financial materiality and impact materiality", correctCardId: "double-materiality", correctLabel: "Double materiality", whyCorrect: "Double materiality combines both directions.", whyWrong: "This is not only one perspective. It is the combination of both.", whyExtended: ["CSRD builds on organizations assessing both how sustainability issues affect them and how they affect the outside world."] },
        { id: "company-affected", description: "Outside-in: external sustainability issues affect the company", correctCardId: "company-affected", correctLabel: "Impact on the company", whyCorrect: "Impact on the company describes the financial materiality direction.", whyWrong: "This is not the company's outward impact. It is impact from the outside world into the company.", whyExtended: ["Example: climate change can affect costs, risk or valuation."] },
        { id: "company-affects", description: "Inside-out: the company's operations affect climate, environment and people", correctCardId: "company-affects", correctLabel: "Impact from the company", whyCorrect: "Impact from the company describes impact materiality.", whyWrong: "This is not financial risk into the company. It is the company's effect on the outside world.", whyExtended: ["Example: emissions, resource use or working conditions in the value chain."] }
      ],
      whyCorrect: "Double materiality requires reporting to cover both impact on the company and impact from the company.",
      whyExtended: [
        "Financial materiality is primarily relevant for investors.",
        "Impact materiality is also relevant for consumers, civil society, employees and investors.",
        "This makes reporting a broader governance issue than traditional financial risk alone."
      ],
      whyExtendedImageRefs: [
        { moduleId: "sustainability", groupId: "reporting", imageId: "double_materiality" }
      ]
    },
    {
      id: 16,
      type: "single",
      title: "Case: materiality in an IT portfolio",
      points: 1,
      moduleId: "sustainability",
      groupId: "reporting",
      prompt: "An IT manager maps that extreme weather can make data center operations more expensive and less stable. Which part of double materiality does this describe best?",
      source: "Source: IN5431 Sustainability, slide 72.",
      options: [
        { text: "Financial materiality, because external climate and environmental conditions affect the company.", correct: true, why: "Correct: this is impact on the company.", whyExtended: ["Extreme weather is an external sustainability issue that can affect costs, risk and operations.", "This is the outside-in direction in double materiality.", "For IT governance, infrastructure, preparedness, costs and supplier risk can become part of sustainability reporting."], whyExtendedImageRefs: [ { moduleId: "sustainability", groupId: "reporting", imageId: "double_materiality" } ] },
        { text: "Impact materiality, because the company directly affects environment and people in this example.", correct: false, why: "Wrong: the case primarily describes how environmental conditions affect the company.", whyExtended: ["Impact materiality would for example be the data center's energy use or emissions effects on the outside world."] },
        { text: "Scope 2, because extreme weather is always purchased electricity.", correct: false, why: "Wrong: Scope 2 is an emissions category, not a materiality direction.", whyExtended: ["Extreme weather can affect electricity prices or availability, but the materiality assessment here is financial."] },
        { text: "Degrowth, because all data center operations must stop immediately.", correct: false, why: "Wrong: the case concerns risk assessment and reporting, not a general claim about postgrowth.", whyExtended: ["Degrowth is a broader socio-economic perspective, not the answer to this concrete materiality case."] }
      ]
    },
    {
      id: 17,
      type: "drag-categorize",
      title: "Scope 1, 2 and 3",
      points: 2,
      moduleId: "sustainability",
      groupId: "reporting",
      prompt: "Drag each emissions example to the correct scope category.",
      source: "Source: IN5431 Sustainability, slides 73-74.",
      items: [
        { id: "company-vehicles", label: "Emissions from the company's own vehicles" },
        { id: "owned-boiler", label: "Emissions from a boiler or factory the company owns and controls" },
        { id: "purchased-electricity", label: "Emissions linked to purchased electricity" },
        { id: "purchased-heating", label: "Emissions linked to purchased district heating, steam or cooling" },
        { id: "supplier-components", label: "Emissions from suppliers' production of purchased components" },
        { id: "business-travel", label: "Emissions from employees' business travel" },
        { id: "use-of-products", label: "Emissions from use of products the company has sold" },
        { id: "end-of-life", label: "Emissions from end-of-life treatment of sold products" }
      ],
      categories: [
        { id: "scope1", label: "Scope 1" },
        { id: "scope2", label: "Scope 2" },
        { id: "scope3", label: "Scope 3" }
      ],
      correctAnswer: {
        scope1: ["company-vehicles", "owned-boiler"],
        scope2: ["purchased-electricity", "purchased-heating"],
        scope3: ["supplier-components", "business-travel", "use-of-products", "end-of-life"]
      },
      itemFeedback: {
        "company-vehicles": { whyCorrect: "Own vehicles are direct emissions from sources the company owns or controls.", whyWrong: "This is not purchased energy or value chain emissions. It is direct emissions.", whyExtended: ["Scope 1 covers direct emissions from owned or controlled sources."] },
        "owned-boiler": { whyCorrect: "An owned and controlled boiler or factory creates direct emissions and belongs to Scope 1.", whyWrong: "This is direct emissions from the company's own source, not indirect emissions from purchased energy.", whyExtended: ["Control or ownership is the key distinction for Scope 1."] },
        "purchased-electricity": { whyCorrect: "Purchased electricity belongs to Scope 2.", whyWrong: "This is indirect emissions from purchased energy, not direct emissions from own sources.", whyExtended: ["The lecture defines Scope 2 as indirect emissions from purchased electricity, steam, heat and cooling."] },
        "purchased-heating": { whyCorrect: "Purchased heat, steam or cooling belongs to Scope 2.", whyWrong: "This is energy the company purchases, not other value chain emissions.", whyExtended: ["Scope 2 covers purchased energy used by the organization."] },
        "supplier-components": { whyCorrect: "Supplier production is other emissions linked to the company's activities and belongs to Scope 3.", whyWrong: "This is not a source the company owns or controls.", whyExtended: ["Scope 3 includes other emissions in the value chain, both upstream and downstream."] },
        "business-travel": { whyCorrect: "Business travel is usually Scope 3 because emissions occur outside the company's directly controlled sources.", whyWrong: "This is not purchased electricity, and it is not necessarily the company's own vehicles.", whyExtended: ["In the scope figure, business travel is under Scope 3."] },
        "use-of-products": { whyCorrect: "Use of sold products is downstream Scope 3.", whyWrong: "This happens after the product is sold and is not direct emissions from the company's own sources.", whyExtended: ["Downstream Scope 3 is important in double materiality because products can affect emissions among customers and society."] },
        "end-of-life": { whyCorrect: "End-of-life treatment of sold products is downstream Scope 3.", whyWrong: "This is not purchased energy. It is a value chain effect after product use.", whyExtended: ["This connects Scope 3 to circular economy and product design."] }
      },
      whyCorrect: "Scope 1 is direct emissions, Scope 2 is indirect emissions from purchased energy, and Scope 3 is other emissions linked to the organization's activities.",
      whyExtended: [
        "For IT managers, this is relevant because emissions data must be collected from own systems, energy providers, supplier chains, travel data and product data.",
        "Scope 3 is often hardest because the data lies outside the organization's direct control."
      ],
      whyExtendedImageRefs: [
        { moduleId: "sustainability", groupId: "reporting", imageId: "scope_1_2_3_model" },
        { moduleId: "sustainability", groupId: "reporting", imageId: "scope_1_2_3" }
      ]
    },
    {
      id: 18,
      type: "fill",
      title: "Scope concept",
      points: 1,
      moduleId: "sustainability",
      groupId: "reporting",
      prompt: "Scope ________ includes all other emissions associated with the organization's activities, beyond direct emissions and purchased energy.",
      answers: ["3", "three", "scope 3"],
      answerKey: "3 / three / scope 3",
      source: "Source: IN5431 Sustainability, slide 73.",
      whyCorrect: "Scope 3 is defined as all other emissions associated with the company's activities.",
      whyWrong: "Scope 1 is direct emissions from owned or controlled sources, and Scope 2 is indirect emissions from purchased electricity, heat, steam and cooling.",
      whyExtendedImageRefs: [
        { moduleId: "sustainability", groupId: "reporting", imageId: "scope_1_2_3_model" },
        { moduleId: "sustainability", groupId: "reporting", imageId: "scope_1_2_3" }
      ]
    },
    {
      id: 19,
      type: "multi",
      title: "Sustainability reporting and IT governance",
      points: 1,
      moduleId: "sustainability",
      groupId: "reporting",
      prompt: "Select the correct implications for IT governance when sustainability reporting becomes more important.",
      source: "Source: IN5431 Sustainability, slide 77.",
      options: [
        { text: "More types of data must be collected and reported.", correct: true, why: "Correct: the lecture says that the types of data collected and reported are expanded.", whyExtended: ["Sustainability data can include energy, emissions, supplier chains, materials, products, social conditions and governance data.", "This requires data models, system integration, ownership and processes for data collection."] },
        { text: "Data veracity becomes critical, so validation and verification become core activities.", correct: true, why: "Correct: this is a main point on slide 77.", whyExtended: ["When reported data can lead to benefits or sanctions, traceability and reliability become more important.", "IT governance must therefore clarify responsibility for data sources, controls, quality and audit."] },
        { text: "Financial incentives and sanctions can be linked to reported data.", correct: true, why: "Correct: the lecture points to significant financial incentives linked to the data.", whyExtended: ["The shipping case shows this clearly: emissions data can affect costs, financing and regulation.", "This makes data a governance object, not only a reporting exercise."] },
        { text: "IT governance becomes less relevant because sustainability reporting is only done by the communications department.", correct: false, why: "Wrong: the lecture argues that reporting requirements can expand and strengthen IT governance.", whyExtended: ["Communication can be part of reporting, but data capture, system support, verification and control are governance challenges.", "Sustainability reporting can resemble financial reporting by making internal control and data integrity central."] },
        { text: "Reported sustainability data does not need to be traceable back to sources.", correct: false, why: "Wrong: traceability, verification and data quality are central when data has governance and reporting functions.", whyExtended: ["Without traceability, the risk of errors, greenwashing and compliance failure increases."] }
      ]
    },
    {
      id: 20,
      type: "single",
      title: "Dieselgate as a warning",
      points: 1,
      moduleId: "sustainability",
      groupId: "reporting",
      prompt: "Why is Dieselgate used as a relevant point in the lecture on sustainability reporting and policy?",
      source: "Source: IN5431 Sustainability, slide 76.",
      options: [
        { text: "It shows the risk that strict rules and financial incentives can lead to manipulation if data and verification fail.", correct: true, why: "Correct: Dieselgate illustrates the risk of control software and the gap between testing and actual use.", whyExtended: ["The lecture describes emissions control software that was activated only under test conditions, while real NOx emissions were much higher.", "The IT governance point is that reporting systems, measurement methods and verification must be resistant to manipulation.", "When sustainability data has financial consequences, the risk of strategic reporting or cheating increases."] },
        { text: "It shows that digital systems always provide perfect emissions data.", correct: false, why: "Wrong: Dieselgate shows that digital systems can be used to manipulate measurements.", whyExtended: ["Technology does not automatically produce truth. Governance and control are necessary."] },
        { text: "It shows that reporting should be abolished because no data can be verified.", correct: false, why: "Wrong: the point is the need for better verification, not to abolish reporting.", whyExtended: ["Without reporting, regulation becomes hard. Without verification, reporting becomes unreliable."] },
        { text: "It shows that Scope 2 is always more important than Scope 1 and 3.", correct: false, why: "Wrong: Dieselgate does not rank scope categories.", whyExtended: ["The case concerns reporting risk, incentives and measurement under test versus actual operation."] }
      ]
    },
    {
      id: 21,
      type: "SequenceOrder",
      title: "From regulation to IT governance",
      points: 2,
      moduleId: "sustainability",
      groupId: "reporting",
      prompt: "Put the steps in a logical order for how sustainability policy can become IT governance work in an organization.",
      source: "Source: IN5431 Sustainability, slides 5, 62-63 and 77.",
      items: [
        { id: "policy", label: "Top-down sustainability policy or regulation is established" },
        { id: "reporting-duty", label: "The organization gets reporting or documentation requirements" },
        { id: "data-needs", label: "New data types and data sources must be identified" },
        { id: "systems-controls", label: "System support, controls, validation and verification are established" },
        { id: "governance", label: "Responsibility, decision rights and IT governance are strengthened" }
      ],
      correctOrder: ["policy", "reporting-duty", "data-needs", "systems-controls", "governance"],
      itemFeedback: {
        policy: { whyCorrect: "Policy or regulation comes first because it creates the requirements that the organization must respond to.", whyWrong: "Without a policy or regulatory driver, it is unclear why new reporting requirements arise.", whyExtended: ["The lecture says that top-down sustainability policy can depend on data reporting."] },
        "reporting-duty": { whyCorrect: "The reporting requirement follows from regulation and means that the organization must document sustainability issues.", whyWrong: "Reporting comes before system and governance changes because the requirements define what must be collected and documented.", whyExtended: ["CSRD and maritime MRV/ETS are examples of requirements that make data operational and governance-relevant."] },
        "data-needs": { whyCorrect: "When the reporting requirements are known, the organization must identify relevant data types and sources.", whyWrong: "Data needs cannot be specified well before one knows what must be reported.", whyExtended: ["Scope 1, 2 and 3 illustrate that data can come from own sources, energy providers and the value chain."] },
        "systems-controls": { whyCorrect: "System support and controls are established to collect, validate and verify the data.", whyWrong: "Controls should be built after data needs are understood, but before governance can work stably.", whyExtended: ["Data veracity, validation and verification are core activities in the lecture."] },
        governance: { whyCorrect: "Finally, responsibility, decision rights and governance must be anchored in IT governance.", whyWrong: "Governance should not be an afterthought. In this logic, it is the outcome of operationalizing the requirements.", whyExtended: ["The lecture suggests that sustainability reporting can drive further expansion and strengthening of IT governance."] }
      },
      whyCorrect: "A typical chain is regulation, reporting requirement, data needs, systems and controls, strengthened IT governance.",
      whyExtended: [
        "This mirrors the lecture's comparison with financial reporting after Enron/SOX.",
        "The point is not only to make reports, but to build governance capacity for reliable sustainability data."
      ]
    },
    {
      id: 22,
      type: "multi",
      title: "Twin transitions: critical understanding",
      points: 1,
      moduleId: "sustainability",
      groupId: "twin-transitions",
      prompt: "Which statements show a good and critical understanding of twin transitions?",
      source: "Source: IN5431 Sustainability, slide 23 and the shipping case, slides 39-59.",
      options: [
        { text: "Digital transformation and sustainability transition can reinforce each other, but must be analyzed together.", correct: true, why: "Correct: twin transitions concern the interaction between digital and sustainability transformation.", whyExtended: ["The shipping case shows how digitalization, data capture and sharing can support lower fuel consumption and reporting.", "At the same time, digitalization has its own environmental and social costs."] },
        { text: "Efficiency gains from digitalization must be assessed against increased electricity use and use of rare materials.", correct: true, why: "Correct: the lecture quotes uncertainty about whether digital gains compensate for increased electricity and material use.", whyExtended: ["This is a core point for responsible IT management: digitalization is not automatically green."] },
        { text: "Digitalization is always sustainable because it is virtual.", correct: false, why: "Wrong: the lecture emphasizes that ICTs are also material artefacts.", whyExtended: ["Rare earth minerals, e-waste, energy consumption and social disruption show why this claim is too simple."] },
        { text: "Twin transitions can require new data flows, platforms and governance mechanisms.", correct: true, why: "Correct: circular economy, the shipping case and CSRD all point to this.", whyExtended: ["Data becomes necessary for optimization, reporting, verification and incentives."] },
        { text: "When a solution is digital, it does not need to be included in scope or materiality assessments.", correct: false, why: "Wrong: digital solutions can have direct, indirect and value-chain emissions as well as social consequences.", whyExtended: ["Double materiality and Scope 1-3 make digital solutions relevant for reporting and governance."] }
      ]
    },
    {
      id: 23,
      type: "single",
      title: "Case: Digital Product Passport for electronics",
      points: 1,
      moduleId: "sustainability",
      groupId: "circular-economy",
      prompt: "An electronics producer is preparing Digital Product Passport. Which data logic is most relevant?",
      source: "Source: IN5431 Sustainability, slides 35 and 38.",
      options: [
        { text: "Collect and make available data about origin, materials, production process and environmental impact to support circular economy.", correct: true, why: "Correct: this is the core of Digital Product Passport as the lecture describes it.", whyExtended: ["Digital Product Passport makes product information available through the life cycle.", "For electronics, this is especially relevant because products contain materials, components and environmental impact that must be documented.", "The lecture shows that requirements are planned for ICT, electronics, metals and batteries from 2028."] },
        { text: "Delete material data when the product is sold to protect the supplier chain from insight.", correct: false, why: "Wrong: DPP concerns making more product information available, not less.", whyExtended: ["Without material data, repair, reuse, recycling and environmental reporting become harder."] },
        { text: "Only register marketing images and sales price because environmental data is not relevant.", correct: false, why: "Wrong: environmental impact, materials and production process are central.", whyExtended: ["A product passport is not only a sales catalog. It is documentation that can support circular value chains."] },
        { text: "Replace LCA and EPD with oral assessments without traceable data.", correct: false, why: "Wrong: the lecture connects circular economy to standardized analyses and documentation.", whyExtended: ["LCA, EPD, MFA and DPP point toward a more structured data basis, not less."] }
      ]
    },
    {
      id: 24,
      type: "single",
      title: "Secondary effects of data",
      points: 1,
      moduleId: "sustainability",
      groupId: "shipping",
      prompt: "In the shipping case, data reported for regulatory compliance is also used in Poseidon Principles. What is the most important point?",
      source: "Source: IN5431 Sustainability, slide 58.",
      options: [
        { text: "Operational and regulatory data can have secondary effects, for example through financing and incentives for greener operations.", correct: true, why: "Correct: the lecture says that operational data also flows to other actors and has secondary impact.", whyExtended: ["Poseidon Principles uses data reported for regulatory compliance in the IMO DCS system.", "Banks can use the data for climate alignment in loan portfolios and offer sustainability-linked loans with better terms.", "This shows how data can move from operational work to governance, regulation and financial incentives."] },
        { text: "Data collected for compliance can never be used outside authority reporting.", correct: false, why: "Wrong: Poseidon Principles is an example of secondary use of such data.", whyExtended: ["The lecture shows that the same data can be used by crew, management, regulators, service providers and financial actors."] },
        { text: "Sustainability-linked loans are irrelevant for data quality because banks do not use reported data.", correct: false, why: "Wrong: the lecture describes that data is used in financial assessments.", whyExtended: ["When data affects loan terms, veracity and verification become even more important."] },
        { text: "Poseidon Principles shows that emissions data is only technical data without governance significance.", correct: false, why: "Wrong: the point is precisely that technical and operational data gets governance significance.", whyExtended: ["Data can create incentives, affect financing and support global governance."] }
      ]
    },
    {
      id: 25,
      type: "multi",
      title: "Digital technology and sustainability transition",
      points: 1,
      moduleId: "sustainability",
      groupId: "digital-technology",
      prompt: "Which ways can digital technology support sustainability transitions, as described in the lecture?",
      source: "Source: IN5431 Sustainability: Implications for management, slide 3.",
      options: [
        { text: "Virtualization, where digital solutions replace physical activities.", correct: true, why: "Correct: the lecture mentions virtualization as a way digital technology can support sustainability transition.", whyExtended: ["The point is that digital solutions can in some cases reduce the need for physical products, travel or processes.", "The effect must still be assessed in context, since digital solutions also have environmental burdens."] },
        { text: "Optimization, where data and digital systems are used to reduce waste.", correct: true, why: "Correct: the lecture describes optimization as reduce waste.", whyExtended: ["Digital systems can support better planning, resource use and coordination.", "In a sustainability context, this is relevant when technology actually reduces energy use, material use or unnecessary activities."] },
        { text: "Monitoring, where measurement and information are used to inform action.", correct: true, why: "Correct: the lecture describes monitoring as informing action.", whyExtended: ["Measurement and data collection can make emissions, resource use or deviations visible.", "The organization can then use the information for governance, reporting and improvement."] },
        { text: "Drive innovation, where new technologies make new solutions possible.", correct: true, why: "Correct: the lecture mentions drive innovation through new technologies.", whyExtended: ["Sustainability transitions can require new technologies, new services and new ways of organizing work.", "This connects sustainability to innovation, not only reporting and compliance."] },
        { text: "Electronic waste, where more digital technology automatically makes waste handling sustainable.", correct: false, why: "Wrong: electronic waste is a negative environmental consequence of ICT, not a support form in the list on slide 3.", whyExtended: ["The lecture points out that digital technology also has negative environmental impacts.", "E-waste shows that ICT is not only virtual, but also consists of material artefacts."] },
        { text: "Energy consumption, where more digital infrastructure by itself creates lower emissions.", correct: false, why: "Wrong: energy consumption is a possible negative effect, not an automatic sustainability contribution.", whyExtended: ["Digital solutions can reduce waste in some contexts.", "But data centers, networks, devices and digital infrastructure also use energy."] }
      ]
    },
    {
      id: 26,
      type: "dragDrop",
      title: "Four ways digital technology can support sustainability",
      points: 2,
      moduleId: "sustainability",
      groupId: "digital-technology",
      prompt: "Drag each concept to the correct explanation.",
      source: "Source: IN5431 Sustainability: Implications for management, slide 3.",
      cards: [
        { id: "virtualization", text: "Virtualization" },
        { id: "optimization", text: "Optimization" },
        { id: "monitoring", text: "Monitoring" },
        { id: "drive-innovation", text: "Drive innovation" }
      ],
      targets: [
        { id: "digital-replace-physical", description: "Digital solutions replace physical activities, products or processes.", correctCardId: "virtualization", correctLabel: "Virtualization", whyCorrect: "Virtualization means that digital can replace physical.", whyWrong: "This explanation concerns replacing something physical with a digital solution.", whyExtended: ["Examples can include digital meetings, digital documents or digital services that reduce the need for physical transport or material.", "The effect is not automatically positive. It must be weighed against energy use, equipment and other consequences."] },
        { id: "reduce-waste", description: "Digital systems are used to reduce waste through better governance and decisions.", correctCardId: "optimization", correctLabel: "Optimization", whyCorrect: "Optimization concerns reducing waste.", whyWrong: "This explanation is not primarily about measurement or new technologies. It concerns better resource use.", whyExtended: ["Optimization can concern routes, logistics, energy use, inventory management or process flow.", "The sustainability point is that better use of data can reduce unnecessary resource use."] },
        { id: "informing-action", description: "Data is collected and used to inform action.", correctCardId: "monitoring", correctLabel: "Monitoring", whyCorrect: "Monitoring concerns measurement as a basis for action.", whyWrong: "This explanation concerns making conditions visible through data, not replacing physical activity.", whyExtended: ["Monitoring can make emissions, consumption or deviations measurable.", "This can support reporting, governance and practical improvement measures."] },
        { id: "new-technologies", description: "New technologies open up new solutions, services or ways of working.", correctCardId: "drive-innovation", correctLabel: "Drive innovation", whyCorrect: "Drive innovation means that new technologies can enable new solutions.", whyWrong: "This explanation concerns innovation, not only efficiency in existing processes.", whyExtended: ["Sustainability transitions can require new digital solutions and new organizational practices.", "This makes sustainability relevant for IT management, strategy and innovation work."] }
      ]
    },
    {
      id: 27,
      type: "dragDrop",
      title: "Sustainability and IT management",
      points: 2,
      moduleId: "sustainability",
      groupId: "management",
      prompt: "Drag each point to the correct explanation.",
      source: "Source: IN5431 Sustainability: Implications for management, slide 5.",
      cards: [
        { id: "responsible-technology", text: "Responsible use of digital technology" },
        { id: "sustainability-innovation", text: "Innovation in sustainability transitions" },
        { id: "data-reporting", text: "Data reporting in top-down policies" }
      ],
      targets: [
        {
          id: "responsible-technology",
          description: "Organizations must consider how digital technology is used and what consequences that use has.",
          correctCardId: "responsible-technology",
          correctLabel: "Responsible use of digital technology",
          whyCorrect: "Correct: the lecture says that companies should employ digital technology responsibly.",
          whyWrong: "Wrong: this explanation is about responsible technology use, not innovation or reporting.",
          whyExtended: [
            "Digital technology can support sustainability, but it can also create environmental and social burdens.",
            "That makes responsible use a topic for IT management."
          ]
        },
        {
          id: "sustainability-innovation",
          description: "Transitions may require new solutions and open up new ways to organize technology, processes and services.",
          correctCardId: "sustainability-innovation",
          correctLabel: "Innovation in sustainability transitions",
          whyCorrect: "Correct: the lecture says that sustainability transitions require and enable innovation.",
          whyWrong: "Wrong: this explanation is about innovation, not only responsible use or reporting.",
          whyExtended: [
            "Sustainability is not only about following rules.",
            "It can also drive new digital solutions, new processes and new forms of collaboration."
          ]
        },
        {
          id: "data-reporting",
          description: "Steering from authorities and management needs data that can be collected, reported and used as a basis for decisions.",
          correctCardId: "data-reporting",
          correctLabel: "Data reporting in top-down policies",
          whyCorrect: "Correct: the lecture says that top-down sustainability policies rely on data reporting.",
          whyWrong: "Wrong: this explanation is about data reporting, not innovation or general technology use.",
          whyExtended: [
            "Reporting requirements make data, IT systems and governance important.",
            "IT managers therefore need to understand how sustainability policy is operationalized through reporting."
          ]
        }
      ]
    },
    {
      id: 28,
      type: "multi",
      title: "Why sustainability matters for IT management",
      points: 1,
      moduleId: "sustainability",
      groupId: "management",
      prompt: "Select the statements that are part of the lecture's short version of today's message.",
      source: "Source: IN5431 Sustainability: Implications for management, slide 5.",
      options: [
        {
          text: "Companies should employ digital technology responsibly.",
          correct: true,
          why: "Correct: this is one of the three points on slide 5.",
          whyExtended: [
            "The point connects sustainability to choices about the use, operation and governance of digital technologies."
          ]
        },
        {
          text: "Sustainability transitions require and enable innovation.",
          correct: true,
          why: "Correct: the lecture points to innovation as part of sustainability transitions.",
          whyExtended: [
            "Sustainability may require new digital solutions, new processes and new forms of organization."
          ]
        },
        {
          text: "Top-down sustainability policies rely on data reporting.",
          correct: true,
          why: "Correct: slide 5 connects top-down policies to data reporting.",
          whyExtended: [
            "This makes data quality, reporting systems and IT governance relevant for sustainability."
          ]
        },
        {
          text: "Sustainability is mainly a topic for communication and branding.",
          correct: false,
          why: "Wrong: the lecture connects sustainability to technology use, innovation and reporting.",
          whyExtended: [
            "This is more concrete than communication.",
            "It also concerns data, governance and organizational choices."
          ]
        },
        {
          text: "IT managers can leave sustainability to top management because it does not affect IT systems.",
          correct: false,
          why: "Wrong: slide 5 shows that sustainability is relevant for IT managers.",
          whyExtended: [
            "When policy relies on data reporting, IT systems and data governance become part of sustainability work."
          ]
        }
      ]

    }
  ]
};

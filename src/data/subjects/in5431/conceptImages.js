// src/data/subjects/in5431/conceptImages.js
// Subject-scoped concept image catalog for IN5431.
// Flat list — src is derived from the key segments by ConceptImageDataSource.
// Each entry maps to /public/subjects/{subjectId}/{moduleId}/{groupId}/{imageId}.{ext}
// ext defaults to "svg" if omitted.

export const in5431ConceptImages = [

    // ── Strategy (forelesning 2) ────────────────────────────
    {
        moduleId: "strategy",
        groupId: "action-plan",
        imageId: "strategy_action_plan_model",
        title: { no: "Handlingsplan fra strategi", en: "Strategy action plan" },
        alt: { no: "Modell for handlingsplanens innhold", en: "Model for strategy action plan content" },
        caption: { no: "Strategiprosessen resulterer i en handlingsplan med aktiviteter, ansvar, roadmap og estimater.", en: "The strategy process results in an action plan with activities, responsibilities, roadmap and estimates." }
    },

    // ── CIO Toolbox: Decision making (forelesning 3) ───────
    {
        moduleId: "cio-tool-box",
        groupId: "decision-making",
        imageId: "generic_decision_making_process_no",
        title: { no: "Generisk beslutningsprosess", en: "Generic decision making process" },
        alt: { no: "Tre steg: forstå situasjonen, syntetiser alternativer, evaluer og anbefal", en: "Three steps: understand situation, synthesize options, evaluate and propose" },
        caption: { no: "Beslutningsprosessen går fra situasjonsforståelse via alternativer til anbefaling, med iterasjon.", en: "The decision process moves from understanding through alternatives to recommendation, with iteration." }
    },
    {
        moduleId: "cio-tool-box",
        groupId: "decision-making",
        imageId: "generic_decision_making_process",
        ext: "png",
        title: { no: "Generisk beslutningsprosess", en: "Generic decision making process" },
        alt: { no: "Tre steg i beslutningsprosessen: forstå situasjonen, syntetiser alternativer, evaluer og anbefal", en: "Three steps in the decision process: understand the situation, synthesize options, evaluate and propose" },
        caption: { no: "Beslutningsprosessen brukes i alternativanalyse for å bevege seg fra situasjonsforståelse til anbefaling.", en: "The decision process is used in alternative analysis to move from understanding the situation to a recommendation." }
    },

    // ── CIO Toolbox: Triple constraint (forelesning 4) ─────
    {
        moduleId: "cio-tool-box",
        groupId: "triple-constraint",
        imageId: "triple_constraint_1",
        ext: "png",
        title: { no: "Triple constraint", en: "Triple constraint" },
        alt: { no: "Trekanten scope, time og cost", en: "The triangle of scope, time and cost" },
        caption: { no: "Prosjekter der alle tre er fastlåst er særlig sårbare for skuffelse.", en: "Projects where all three are fixed are particularly vulnerable to disappointment." }
    },

    // ── CIO Toolbox: Cynefin (forelesning 4) ───────────────
    {
        moduleId: "cio-tool-box",
        groupId: "cynefin",
        imageId: "cynefin_theory_of_everything",
        title: { no: "Cynefin-metoden", en: "The Cynefin method" },
        alt: { no: "Fra triple constraint via kompleksitetsfaktorer til Cynefin-kontekst og styringsmetode", en: "From triple constraint through complexity factors to Cynefin context and management approach" },
        caption: { no: "Cynefin kobler prosjektets egenskaper (faste constraints + kompleksitet) til anbefalt styringsmetode.", en: "Cynefin connects project characteristics (fixed constraints + complexity) to recommended management approach." }
    },

    // ── CIO Toolbox: PRINCE2 (forelesning 4) ───────────────
    {
        moduleId: "cio-tool-box",
        groupId: "prince2",
        imageId: "prince2_framework_model",
        title: { no: "PRINCE2-rammeverket", en: "The PRINCE2 framework" },
        alt: { no: "PRINCE2 sine prinsipper, temaer og prosesser", en: "PRINCE2 principles, themes and processes" },
        caption: { no: "PRINCE2 strukturerer prosjektstyring i tre lag: 7 prinsipper, 7 temaer og 7 prosesser.", en: "PRINCE2 structures project governance in three layers: 7 principles, 7 themes and 7 processes." }
    },

    // ── CIO Toolbox: Frameworks and best practice (forelesning 6) ─
    {
        moduleId: "cio-tool-box",
        groupId: "framewoks",
        imageId: "framewoks_and_best_practices",
        ext: "png",
        title: { no: "Rammeverk og beste praksis", en: "Frameworks and best practice" },
        alt: { no: "Lysbilde som kobler rammeverk som TOGAF, PRINCE2, Scrum, SAFe, ITIL og Prosci/ADKAR til bruksområder", en: "Slide mapping frameworks such as TOGAF, PRINCE2, Scrum, SAFe, ITIL and Prosci/ADKAR to intended uses" },
        caption: { no: "ITIL vises som IT Service Management under rammeverk/beste praksis, ved siden av CIO toolboxen — ikke som et kjerneverktøy i toolboxen.", en: "ITIL is shown as IT Service Management under frameworks/best practice, next to the CIO toolbox — not as a core toolbox tool." }
    },
    {
        moduleId: "cio-tool-box",
        groupId: "framewoks",
        imageId: "ITIL",
        ext: "png",
        title: { no: "ITIL", en: "ITIL" },
        alt: { no: "Utsnitt av rammeverkstabellen der ITIL er koblet til IT Service Management", en: "Excerpt of the framework table where ITIL is linked to IT Service Management" },
        caption: { no: "ITIL er relevant for drift, leveranse og styring av IT-tjenester, men er ikke ett av de syv hovedverktøyene i CIO toolboxen.", en: "ITIL is relevant for operation, delivery and management of IT services, but is not one of the seven core CIO toolbox tools." }
    },

    // ── D4D building blocks (forelesning 7–12) ─────────────
    {
        moduleId: "designed-for-digital",
        groupId: "overview",
        imageId: "D4D-overview",
        ext: "png",
        title: { no: "D4D-byggeklossene", en: "D4D building blocks" },
        alt: { no: "Oversikt over de fem Designed for Digital-byggeklossene", en: "Overview of the five Designed for Digital building blocks" },
        caption: { no: "De fem byggeklossene viser hvilke organisatoriske kapabiliteter som trengs for digital forretningsutvikling.", en: "The five building blocks show the organizational capabilities needed for digital business design." }
    },
    {
        moduleId: "designed-for-digital",
        groupId: "operational-backbone",
        imageId: "OB",
        ext: "png",
        title: { no: "Operational Backbone", en: "Operational Backbone" },
        alt: { no: "Operational Backbone i praksis", en: "Operational Backbone in practice" },
        caption: { no: "Stabile, standardiserte og integrerte kjerneprosesser gjør digital innovasjon tryggere å bygge videre på.", en: "Stable, standardized and integrated core operations make digital innovation safer to build on." }
    },
    {
        moduleId: "designed-for-digital",
        groupId: "digital-platform",
        imageId: "DP",
        ext: "png",
        title: { no: "Digital Platform", en: "Digital Platform" },
        alt: { no: "Digital Platform som D4D-byggekloss", en: "Digital Platform as a D4D building block" },
        caption: { no: "Digitale plattformer samler gjenbrukbare business-, data- og teknologikomponenter for raskere innovasjon.", en: "Digital platforms collect reusable business, data and technology components for faster innovation." }
    },
    {
        moduleId: "designed-for-digital",
        groupId: "accountability-framework",
        imageId: "AF",
        ext: "png",
        title: { no: "Accountability Framework", en: "Accountability Framework" },
        alt: { no: "Accountability Framework som D4D-byggekloss", en: "Accountability Framework as a D4D building block" },
        caption: { no: "Accountability Framework fordeler ansvar slik at team får autonomi uten å miste felles retning.", en: "The accountability framework distributes responsibility so teams get autonomy without losing alignment." }
    },
    {
        moduleId: "designed-for-digital",
        groupId: "shared-customer-insights",
        imageId: "SCI",
        ext: "png",
        title: { no: "Shared Customer Insights", en: "Shared Customer Insights" },
        alt: { no: "Shared Customer Insights som D4D-byggekloss", en: "Shared Customer Insights as a D4D building block" },
        caption: { no: "Felles kundeinnsikt gjør det lettere å prioritere digitale tilbud som faktisk skaper kundeverdi.", en: "Shared customer insight helps teams prioritize digital offerings that create real customer value." }
    },
    {
        moduleId: "designed-for-digital",
        groupId: "external-developer-platform",
        imageId: "ExDP",
        ext: "png",
        title: { no: "External Developer Platform", en: "External Developer Platform" },
        alt: { no: "External Developer Platform som D4D-byggekloss", en: "External Developer Platform as a D4D building block" },
        caption: { no: "External Developer Platform åpner digitale komponenter for partnere og eksterne utviklere.", en: "The external developer platform opens digital components to partners and external developers." }
    },

    {
        moduleId: "cio-tool-box",
        groupId: "business-case",
        imageId: "NPV_formula",
        ext: "png",
        title: { no: "Net Present Value (NPV)", en: "Net Present Value (NPV)" },
        alt: { no: "NPV-formel for diskonterte kontantstrømmer", en: "NPV formula for discounted cash flows" },
        caption: { no: "NPV brukes i business case for å sammenligne forventet nytte, kostnad, timing og risiko.", en: "NPV is used in business cases to compare expected benefits, costs, timing and risk." }
    },
    {
        moduleId: "cio-tool-box",
        groupId: "business-case",
        imageId: "PV_formula",
        ext: "png",
        title: { no: "Present Value (PV)", en: "Present Value (PV)" },
        alt: { no: "PV-formel for nåverdi av en fremtidig kontantstrøm", en: "PV formula for the present value of a future cash flow" },
        caption: { no: "PV viser hvorfor timing betyr noe: fremtidige gevinster diskonteres tilbake til verdi i dag.", en: "PV shows why timing matters: future benefits are discounted back to today's value." }
    },
    {
        moduleId: "cio-tool-box",
        groupId: "design-thinking",
        imageId: "double_diamond_model",
        ext: "png",
        title: { no: "Double Diamond", en: "Double Diamond" },
        alt: { no: "Double Diamond-modellen med Discover, Define, Develop og Deliver", en: "The Double Diamond model with Discover, Define, Develop and Deliver" },
        caption: { no: "Double Diamond viser design thinking som utforskning av problemrom og løsningsrom gjennom divergens og konvergens.", en: "The Double Diamond shows design thinking as exploration of problem space and solution space through divergence and convergence." }
    },
    {
        moduleId: "cio-tool-box",
        groupId: "operating-model",
        imageId: "business_process_matrix_en",
        ext: "png",
        title: { no: "Operating model matrix", en: "Operating model matrix" },
        alt: { no: "Matrise for prosessintegrasjon og prosessstandardisering", en: "Matrix for process integration and process standardization" },
        caption: { no: "Operating model beskriver ønsket nivå av prosessintegrasjon og standardisering: diversification, coordination, replication og unification.", en: "The operating model describes the desired level of process integration and standardization: diversification, coordination, replication and unification." }
    },
    {
        moduleId: "cio-tool-box",
        groupId: "operating-model",
        imageId: "operating_model_matrix_no",
        ext: "png",
        title: { no: "Operating model-matrisen", en: "Operating model matrix" },
        alt: { no: "Norsk operating model-matrise for integrasjon og standardisering", en: "Norwegian operating model matrix for integration and standardization" },
        caption: { no: "Matrisen brukes til å plassere Coordination, Unification, Diversification og Replication.", en: "The matrix is used to place Coordination, Unification, Diversification and Replication." }
    },
    {
        moduleId: "cio-tool-box",
        groupId: "business-process-modeling",
        imageId: "umbrella_heaven_and_process_model",
        ext: "png",
        title: { no: "Umbrella Heaven og prosessmodell", en: "Umbrella Heaven and process model" },
        alt: { no: "Kobling mellom Umbrella Heaven-caset og prosessmodellering", en: "Connection between the Umbrella Heaven case and process modeling" },
        caption: { no: "Caset viser hvordan strategi, prosesser og IT-arkitektur henger sammen i praksis.", en: "The case shows how strategy, processes and IT architecture connect in practice." }
    },
    {
        moduleId: "cio-tool-box",
        groupId: "business-process-modeling",
        imageId: "umbrella_heaven_ordering_process",
        ext: "png",
        title: { no: "Umbrella Heaven bestillingsprosess", en: "Umbrella Heaven ordering process" },
        alt: { no: "BPMN-lignende swimlane-prosess for bestilling i Umbrella Heaven", en: "BPMN-like swimlane process for ordering in Umbrella Heaven" },
        caption: { no: "Prosessmodellen viser aktiviteter, roller/swimlanes, avhengigheter og flyt fra kunde til lager og betalingsleverandør.", en: "The process model shows activities, roles/swimlanes, dependencies and flow from customer to warehouse and payment provider." }
    },
    {
        moduleId: "cio-tool-box",
        groupId: "business-process-modeling",
        imageId: "umbrella_heaven_return_process",
        ext: "png",
        title: { no: "Umbrella Heaven returprosess", en: "Umbrella Heaven return process" },
        alt: { no: "Prosessmodell for retur og refundering", en: "Process model for returns and refunds" },
        caption: { no: "Returprosessen viser hvordan en prosess kan modelleres med manuelle og automatiske aktiviteter på tvers av aktører.", en: "The return process shows how a process can be modeled with manual and automated activities across actors." }
    },
    {
        moduleId: "cio-tool-box",
        groupId: "enterprise-architecture",
        imageId: "togaf_arkitekturtaksonomi",
        ext: "png",
        title: { no: "TOGAF arkitekturtaksonomi", en: "TOGAF architecture taxonomy" },
        alt: { no: "TOGAFs nivåer: Business, Data, Application og Technology Architecture", en: "TOGAF levels: Business, Data, Application and Technology Architecture" },
        caption: { no: "TOGAF deler enterprise architecture inn i Business, Data, Application og Technology Architecture.", en: "TOGAF divides enterprise architecture into Business, Data, Application and Technology Architecture." }
    },
    {
        moduleId: "cio-tool-box",
        groupId: "enterprise-architecture",
        imageId: "togaf_levels_model",
        ext: "png",
        title: { no: "TOGAF-nivåer", en: "TOGAF levels" },
        alt: { no: "Modell over arkitekturlag i TOGAF", en: "Model of architecture layers in TOGAF" },
        caption: { no: "Arkitekturlagene hjelper å strukturere sammenhengen mellom virksomhet, data, applikasjoner og teknologi.", en: "The architecture layers help structure the relationship between business, data, applications and technology." }
    },
    {
        moduleId: "cio-tool-box",
        groupId: "enterprise-architecture",
        imageId: "togaf_adm_en",
        ext: "png",
        title: { no: "TOGAF ADM", en: "TOGAF ADM" },
        alt: { no: "Architecture Development Method i TOGAF", en: "The Architecture Development Method in TOGAF" },
        caption: { no: "ADM viser TOGAF som en styrt metode for å utvikle og forvalte enterprise architecture.", en: "ADM shows TOGAF as a governed method for developing and managing enterprise architecture." }
    },
    {
        moduleId: "cio-tool-box",
        groupId: "enterprise-architecture",
        imageId: "togaf_adm_no",
        title: { no: "TOGAF ADM", en: "TOGAF ADM" },
        alt: { no: "Norsk modell av Architecture Development Method", en: "Norwegian model of the Architecture Development Method" },
        caption: { no: "TOGAF ADM strukturerer arkitekturarbeid i faser med styring og iterasjon.", en: "TOGAF ADM structures architecture work into phases with governance and iteration." }
    },
    {
        moduleId: "cio-tool-box",
        groupId: "it-governance",
        imageId: "it_governance_matrix",
        ext: "png",
        title: { no: "IT governance-matrisen", en: "IT governance matrix" },
        alt: { no: "Matrise som kobler IT-beslutningsdomener med styringsarketyper", en: "Matrix connecting IT decision domains with governance archetypes" },
        caption: { no: "Styringsmatrisen viser hvem som bør ha beslutningsrettigheter for ulike typer IT-beslutninger.", en: "The governance matrix shows who should have decision rights for different types of IT decisions." }
    },
    {
        moduleId: "cio-tool-box",
        groupId: "it-governance",
        imageId: "decision_rights_matrix",
        ext: "png",
        title: { no: "Decision rights matrix", en: "Decision rights matrix" },
        alt: { no: "Oversikt over beslutningsrettigheter i IT governance", en: "Overview of decision rights in IT governance" },
        caption: { no: "IT governance handler om å avgjøre hvem som tar og bidrar til IT-beslutninger, og hvem som holdes ansvarlig.", en: "IT governance determines who makes and contributes to IT decisions, and who is accountable." }
    },
    {
        moduleId: "cio-tool-box",
        groupId: "it-governance",
        imageId: "Domene_modell_IT_beslutninger_spm",
        ext: "png",
        title: { no: "Domener for IT-beslutninger", en: "IT decision domains" },
        alt: { no: "Modell over sentrale domener for IT-beslutninger", en: "Model of key IT decision domains" },
        caption: { no: "De fem beslutningsdomenene er IT-prinsipper, IT-arkitektur, IT-infrastruktur, business application needs og IT-investeringer.", en: "The five decision domains are IT principles, IT architecture, IT infrastructure, business application needs and IT investments." }
    },
    {
        moduleId: "cio-tool-box",
        groupId: "it-governance",
        imageId: "it_beslutninger_sentrale_domener_handler_om",
        ext: "png",
        title: { no: "Hva IT-beslutningsdomener handler om", en: "What IT decision domains concern" },
        alt: { no: "Forklaring av hva de sentrale IT-beslutningsdomenene handler om", en: "Explanation of what the key IT decision domains concern" },
        caption: { no: "Figuren utdyper innholdet i de sentrale IT-beslutningsdomenene i Weill og Ross-modellen.", en: "The figure elaborates the content of the key IT decision domains in the Weill and Ross model." }
    },
    {
        moduleId: "cio-tool-box",
        groupId: "it-governance",
        imageId: "performance_based_IT-governance_model",
        ext: "png",
        title: { no: "Performance-basert IT governance", en: "Performance-based IT governance" },
        alt: { no: "Modell som kobler governance-design med mål som lønnsomhet, ressursutnyttelse og vekst", en: "Model connecting governance design with goals such as profitability, asset utilization and growth" },
        caption: { no: "Governance-design må vurderes opp mot ønskede resultater som lønnsomhet, ressursutnyttelse og vekst.", en: "Governance design must be assessed against desired outcomes such as profitability, asset utilization and growth." }
    },
    {
        moduleId: "strategy",
        groupId: "digital-strategy",
        imageId: "digital_strategy_model",
        title: { no: "Digital strategi", en: "Digital strategy" },
        alt: { no: "Modell som skiller mellom forretningsstrategi, IT-strategi og digital strategi", en: "Model distinguishing business strategy, IT strategy and digital strategy" },
        caption: { no: "Digital strategi handler om å bruke digitale ressurser til å skape differensierende verdi, ikke bare å anskaffe IT-systemer.", en: "Digital strategy is about using digital resources to create differential value, not merely acquiring IT systems." }
    },
    {
        moduleId: "sustainability",
        groupId: "three-dimensions",
        imageId: "sustainability_three_dimensions",
        title: { no: "Tre dimensjoner av bærekraft", en: "Three dimensions of sustainability" },
        alt: { no: "Økonomisk, sosial og miljømessig bærekraft / triple bottom line", en: "Economic, social and environmental sustainability / triple bottom line" },
        caption: { no: "Bærekraft vurderes ofte langs økonomiske, sosiale og miljømessige dimensjoner — profit, people and planet.", en: "Sustainability is often assessed along economic, social and environmental dimensions — profit, people and planet." }
    },
    {
        moduleId: "sustainability",
        groupId: "reporting",
        imageId: "double_materiality",
        title: { no: "Dobbel vesentlighet", en: "Double materiality" },
        alt: { no: "Dobbel vesentlighet i bærekraftsrapportering", en: "Double materiality in sustainability reporting" },
        caption: { no: "Dobbel vesentlighet kombinerer hvordan virksomheten påvirker omgivelsene og hvordan bærekraftsforhold påvirker virksomheten.", en: "Double materiality combines how the organization impacts its surroundings and how sustainability matters affect the organization." }
    },
    {
        moduleId: "sustainability",
        groupId: "reporting",
        imageId: "scope_1_2_3",
        title: { no: "Scope 1, 2 og 3", en: "Scope 1, 2 and 3" },
        alt: { no: "Utslippskategoriene Scope 1, Scope 2 og Scope 3", en: "The emission categories Scope 1, Scope 2 and Scope 3" },
        caption: { no: "Scope 1, 2 og 3 skiller mellom direkte utslipp, indirekte energirelaterte utslipp og andre verdikjedeutslipp.", en: "Scope 1, 2 and 3 distinguish direct emissions, indirect energy-related emissions and other value-chain emissions." }
    }
];

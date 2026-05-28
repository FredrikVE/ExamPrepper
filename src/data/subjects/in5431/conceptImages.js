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
    }
];

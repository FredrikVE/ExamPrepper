// src/data/subjects/in5431/defaultQuestionImageRefs.js
// Central fallback mapping for concept images in extended explanations.
// Option/target/item-level whyExtendedImageRefs still win; these defaults are
// only used when the explanation entity does not provide more specific refs.

const ref = (moduleId, groupId, imageId) => ({ moduleId, groupId, imageId });

const ACTION_PLAN = ref("strategy", "action-plan", "strategy_action_plan_model");
const DIGITAL_STRATEGY = ref("strategy", "digital-strategy", "digital_strategy_model");

const DECISION_PROCESS_EN = ref("cio-tool-box", "decision-making", "generic_decision_making_process");
const DECISION_PROCESS_NO = ref("cio-tool-box", "decision-making", "generic_decision_making_process_no");
const TRIPLE_CONSTRAINT = ref("cio-tool-box", "triple-constraint", "triple_constraint_1");
const CYNEFIN = ref("cio-tool-box", "cynefin", "cynefin_theory_of_everything");
const PRINCE2 = ref("cio-tool-box", "prince2", "prince2_framework_model");
const FRAMEWORKS_AND_BEST_PRACTICES = ref("cio-tool-box", "framewoks", "framewoks_and_best_practices");
const ITIL = ref("cio-tool-box", "framewoks", "ITIL");
const NPV = ref("cio-tool-box", "business-case", "NPV_formula");
const PV = ref("cio-tool-box", "business-case", "PV_formula");
const DOUBLE_DIAMOND = ref("cio-tool-box", "design-thinking", "double_diamond_model");
const OPERATING_MODEL_EN = ref("cio-tool-box", "operating-model", "business_process_matrix_en");
const OPERATING_MODEL_NO = ref("cio-tool-box", "operating-model", "operating_model_matrix_no");
const UMBRELLA_ORDERING_PROCESS = ref("cio-tool-box", "business-process-modeling", "umbrella_heaven_ordering_process");
const UMBRELLA_RETURN_PROCESS = ref("cio-tool-box", "business-process-modeling", "umbrella_heaven_return_process");
const TOGAF_TAXONOMY = ref("cio-tool-box", "enterprise-architecture", "togaf_arkitekturtaksonomi");
const TOGAF_LEVELS = ref("cio-tool-box", "enterprise-architecture", "togaf_levels_model");
const TOGAF_ADM_EN = ref("cio-tool-box", "enterprise-architecture", "togaf_adm_en");
const TOGAF_ADM_NO = ref("cio-tool-box", "enterprise-architecture", "togaf_adm_no");
const IT_GOVERNANCE_MATRIX = ref("cio-tool-box", "it-governance", "it_governance_matrix");
const DECISION_RIGHTS_MATRIX = ref("cio-tool-box", "it-governance", "decision_rights_matrix");
const IT_DECISION_DOMAINS = ref("cio-tool-box", "it-governance", "Domene_modell_IT_beslutninger_spm");
const PERFORMANCE_BASED_GOVERNANCE = ref("cio-tool-box", "it-governance", "performance_based_IT-governance_model");

const D4D_OVERVIEW = ref("designed-for-digital", "overview", "D4D-overview");
const OB = ref("designed-for-digital", "operational-backbone", "OB");
const SCI = ref("designed-for-digital", "shared-customer-insights", "SCI");
const DP = ref("designed-for-digital", "digital-platform", "DP");
const AF = ref("designed-for-digital", "accountability-framework", "AF");
const EXDP = ref("designed-for-digital", "external-developer-platform", "ExDP");

const SUSTAINABILITY_THREE_DIMENSIONS = ref("sustainability", "three-dimensions", "sustainability_three_dimensions");
const DOUBLE_MATERIALITY = ref("sustainability", "reporting", "double_materiality");
const SCOPE_1_2_3 = ref("sustainability", "reporting", "scope_1_2_3");

const COMMON_MOCK_EXAM_1 = {
    1: [UMBRELLA_ORDERING_PROCESS],
    2: [NPV, PV],
    3: [NPV],
    5: [D4D_OVERVIEW],
    6: [D4D_OVERVIEW],
    7: [OB],
    8: [DP],
    9: [SCI],
    10: [AF],
    11: [EXDP],
    12: [DECISION_RIGHTS_MATRIX],
    13: [IT_GOVERNANCE_MATRIX],
    14: [TOGAF_TAXONOMY],
    16: [TRIPLE_CONSTRAINT],
    17: [CYNEFIN],
    18: [DOUBLE_DIAMOND],
    19: [ACTION_PLAN],
    20: [D4D_OVERVIEW],
    21: [DIGITAL_STRATEGY],
    22: [SUSTAINABILITY_THREE_DIMENSIONS],
    23: [CYNEFIN],
    24: [OB, DP],
    25: [CYNEFIN]
};

const COMMON_MOCK_EXAM_2 = {
    101: [D4D_OVERVIEW],
    104: [DIGITAL_STRATEGY, D4D_OVERVIEW],
    105: [DIGITAL_STRATEGY],
    106: [DECISION_RIGHTS_MATRIX],
    107: [IT_GOVERNANCE_MATRIX],
    108: [IT_DECISION_DOMAINS],
    109: [D4D_OVERVIEW],
    110: [SUSTAINABILITY_THREE_DIMENSIONS],
    111: [SCOPE_1_2_3],
    112: [SUSTAINABILITY_THREE_DIMENSIONS],
    113: [DOUBLE_DIAMOND],
    114: [TRIPLE_CONSTRAINT],
    115: [TOGAF_TAXONOMY],
    116: [AF],
    117: [D4D_OVERVIEW],
    118: [DIGITAL_STRATEGY],
    119: [DP],
    120: [D4D_OVERVIEW, OB, DP, EXDP],
    121: [EXDP],
    122: [DOUBLE_MATERIALITY],
    123: [CYNEFIN],
    124: [OB],
    125: [CYNEFIN]
};

const COMMON_MOCK_EXAM_3 = {
    201: [ACTION_PLAN],
    202: [ACTION_PLAN],
    203: [ACTION_PLAN],
    205: [DECISION_PROCESS_EN],
    207: [PRINCE2],
    208: [PRINCE2],
    209: [PRINCE2],
    210: [TOGAF_TAXONOMY, TOGAF_LEVELS],
    211: [TOGAF_LEVELS],
    212: [UMBRELLA_ORDERING_PROCESS],
    213: [DIGITAL_STRATEGY],
    214: [DIGITAL_STRATEGY, D4D_OVERVIEW],
    215: [DIGITAL_STRATEGY],
    216: [DIGITAL_STRATEGY],
    217: [SCI],
    218: [SCI],
    219: [OB],
    220: [DP],
    221: [EXDP],
    222: [SUSTAINABILITY_THREE_DIMENSIONS],
    223: [PERFORMANCE_BASED_GOVERNANCE],
    224: [CYNEFIN],
    225: [DIGITAL_STRATEGY]
};

const COMMON_MOCK_EXAM_4 = {
    1: [DECISION_PROCESS_EN],
    2: [NPV, PV],
    3: [NPV, PV],
    5: [DECISION_PROCESS_EN, NPV],
    6: [DOUBLE_DIAMOND],
    7: [TOGAF_TAXONOMY],
    9: [TOGAF_TAXONOMY, TOGAF_LEVELS],
    10: [TRIPLE_CONSTRAINT],
    11: [PRINCE2],
    12: [PRINCE2, CYNEFIN],
    13: [IT_GOVERNANCE_MATRIX],
    14: [IT_DECISION_DOMAINS],
    15: [DECISION_RIGHTS_MATRIX],
    16: [CYNEFIN],
    17: [CYNEFIN],
    18: [DECISION_RIGHTS_MATRIX],
    19: [IT_GOVERNANCE_MATRIX],
    20: [CYNEFIN],
    21: [CYNEFIN],
    22: [TOGAF_LEVELS],
    23: [CYNEFIN, TRIPLE_CONSTRAINT],
    24: [IT_GOVERNANCE_MATRIX],
    25: [PRINCE2],
    27: [FRAMEWORKS_AND_BEST_PRACTICES, ITIL]
};

export const in5431DefaultQuestionImageRefsByExamKey = {
    "mock-exam-1:en": {
        ...COMMON_MOCK_EXAM_1,
        4: [DECISION_PROCESS_EN],
        15: [OPERATING_MODEL_EN]
    },
    "mock-exam-1:no": {
        ...COMMON_MOCK_EXAM_1,
        4: [DECISION_PROCESS_NO],
        15: [OPERATING_MODEL_NO]
    },
    "mock-exam-2:en": {
        ...COMMON_MOCK_EXAM_2,
        102: [OPERATING_MODEL_EN],
        103: [OPERATING_MODEL_EN]
    },
    "mock-exam-2:no": {
        ...COMMON_MOCK_EXAM_2,
        102: [OPERATING_MODEL_NO],
        103: [OPERATING_MODEL_NO]
    },
    "mock-exam-3:en": {
        ...COMMON_MOCK_EXAM_3,
        204: [DECISION_PROCESS_EN],
        206: [DECISION_PROCESS_EN]
    },
    "mock-exam-3:no": {
        ...COMMON_MOCK_EXAM_3,
        204: [DECISION_PROCESS_NO],
        205: [DECISION_PROCESS_NO],
        206: [DECISION_PROCESS_NO]
    },
    "mock-exam-4:en": {
        ...COMMON_MOCK_EXAM_4,
        4: [DECISION_PROCESS_EN],
        8: [OPERATING_MODEL_EN],
        26: [IT_GOVERNANCE_MATRIX]
    },
    "mock-exam-4:no": {
        ...COMMON_MOCK_EXAM_4,
        1: [DECISION_PROCESS_NO],
        4: [DECISION_PROCESS_NO],
        5: [DECISION_PROCESS_NO, NPV],
        8: [OPERATING_MODEL_NO]
    },
    "mock-exam-5:en": {
        1: [PRINCE2],
        2: [PRINCE2],
        3: [PRINCE2],
        4: [PRINCE2],
        5: [PRINCE2],
        6: [PRINCE2],
        7: [PRINCE2],
        8: [UMBRELLA_ORDERING_PROCESS],
        9: [UMBRELLA_ORDERING_PROCESS],
        10: [UMBRELLA_ORDERING_PROCESS, UMBRELLA_RETURN_PROCESS],
        11: [UMBRELLA_ORDERING_PROCESS],
        12: [UMBRELLA_ORDERING_PROCESS],
        13: [DOUBLE_DIAMOND],
        14: [DOUBLE_DIAMOND],
        15: [DOUBLE_DIAMOND],
        16: [DOUBLE_DIAMOND],
        17: [DOUBLE_DIAMOND, CYNEFIN],
        18: [DOUBLE_DIAMOND],
        19: [TOGAF_TAXONOMY],
        20: [TOGAF_ADM_EN],
        21: [TOGAF_ADM_EN, TOGAF_LEVELS],
        22: [TOGAF_ADM_EN],
        23: [CYNEFIN],
        24: [CYNEFIN, TRIPLE_CONSTRAINT],
        25: [CYNEFIN]
    },
    "mock-exam-drag-categorize:no": {
        1: [DECISION_PROCESS_NO, DOUBLE_DIAMOND, IT_GOVERNANCE_MATRIX],
        2: [D4D_OVERVIEW, OB, SCI, DP, AF, EXDP],
        3: [IT_DECISION_DOMAINS],
        4: [D4D_OVERVIEW],
        5: [OPERATING_MODEL_NO]
    }
};

export function getIn5431DefaultQuestionImageRefs({ baseId, language, questionId } = {}) {
    if (!baseId || !language || questionId === undefined || questionId === null) {
        return [];
    }

    const refsByQuestionId = in5431DefaultQuestionImageRefsByExamKey[`${baseId}:${language}`];

    if (!refsByQuestionId) {
        return [];
    }

    return refsByQuestionId[String(questionId)] ?? [];
}

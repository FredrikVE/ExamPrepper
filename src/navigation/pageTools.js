// src/navigation/pageTools.js
import { NAV_SCREENS } from "./navGraph.js";

export const PAGE_TOOL_SURFACES = {
    DESKTOP_POPOUT: "desktop-popout",
    MOBILE_BOTTOM_SHEET: "mobile-bottom-sheet"
};

export const PAGE_TOOL_PRIMARY_SLOTS = {
    SEARCH: "search",
    FOOTER_PAGER: "footer-pager",
    NONE: "none"
};

export const PAGE_TOOL_GROUP_IDS = {
    SUBJECT_SELECT: "subject-select",
    LEARNING_CONTENT_SELECT: "learning-content-select",
    EXAM: "exam",
    FLIPCARDS: "flipcards",
    STATISTICS: "statistics"
};

export const PAGE_TOOL_ICON_KEYS = {
    BAR_CHART_3: "bar-chart-3",
    BOOK_OPEN: "book-open",
    BUG: "bug",
    CHEVRON_LEFT: "chevron-left",
    CHEVRON_RIGHT: "chevron-right",
    CLOCK_3: "clock-3",
    FILE_TEXT: "file-text",
    FINGERPRINT: "fingerprint",
    GALLERY_HORIZONTAL_END: "gallery-horizontal-end",
    KEY: "key",
    LEAF: "leaf",
    LIST: "list",
    NETWORK: "network",
    PANELS_TOP_LEFT: "panels-top-left",
    PIE_CHART: "pie-chart",
    PLUS: "plus",
    REFRESH_CW: "refresh-cw",
    ROTATE_CCW: "rotate-ccw",
    SEND: "send",
    SHIELD_CHECK: "shield-check",
    SHUFFLE: "shuffle",
    SPARKLES: "sparkles",
    TOOLBOX: "toolbox",
    USER_COG: "user-cog"
};

export const PAGE_TOOL_AVAILABILITY = {
    AVAILABLE: "available",
    UNAVAILABLE: "unavailable"
};

export const PAGE_TOOL_ACTION_IDS = {
    CREATE_EXAM: "exam.create",
    CREATE_CONCEPT_LIST: "curriculum.createConceptList",
    CREATE_CURRICULUM_GRAPHS: "curriculum.createGraphs",
    CREATE_CURRICULUM_FIGURE: "curriculum.createFigure",
    CREATE_AI_EXAM: "exam.createAiExam",
    CREATE_SUBJECT: "subject.create",
    IMPORT_SUBJECT_MATERIALS: "subject.importMaterials",
    EXAM_PREVIOUS_QUESTION: "exam.previousQuestion",
    EXAM_NEXT_QUESTION: "exam.nextQuestion",
    EXAM_SUBMIT: "exam.submit",
    EXAM_RESET: "exam.reset",
    FLIPCARDS_SHOW_ALL_CARDS: "flipcards.showAllCards",
    FLIPCARDS_SHUFFLE: "flipcards.shuffle",
    FLIPCARDS_REPEAT_DIFFICULT: "flipcards.repeatDifficult",
    FLIPCARDS_ADD_CARD: "flipcards.addCard"
};

export const PAGE_TOOL_ITEM_IDS = {
    APP_CREATE_EXAM: "app-create-exam",
    APP_CONCEPT_LIST: "app-concept-list",
    APP_CURRICULUM_GRAPHS: "app-curriculum-graphs",
    APP_CURRICULUM_FIGURE: "app-curriculum-figure",
    APP_AI_EXAM: "app-ai-exam",
    APP_CREATE_SUBJECT: "app-create-subject",
    APP_IMPORT_SUBJECT_MATERIALS: "app-import-subject-materials",
    EXAM_PREVIOUS_QUESTION: "exam-previous-question",
    EXAM_NEXT_QUESTION: "exam-next-question",
    EXAM_SUBMIT: "exam-submit",
    EXAM_RESET: "exam-reset",
    FLIPCARDS_ALL_CARDS: "all-cards",
    FLIPCARDS_SHUFFLE: "shuffle",
    FLIPCARDS_REPEAT_DIFFICULT: "repeat-difficult",
    FLIPCARDS_ADD_CARD: "add-card"
};

const SUBJECT_SELECT_WORKSPACE_ACTION_TOOL_ITEMS = [
    {
        id: PAGE_TOOL_ITEM_IDS.APP_CREATE_SUBJECT,
        actionId: PAGE_TOOL_ACTION_IDS.CREATE_SUBJECT,
        labelKey: "pageToolsCreateSubjectLabel",
        iconKey: PAGE_TOOL_ICON_KEYS.PLUS,
        availability: PAGE_TOOL_AVAILABILITY.UNAVAILABLE
    },
    {
        id: PAGE_TOOL_ITEM_IDS.APP_IMPORT_SUBJECT_MATERIALS,
        actionId: PAGE_TOOL_ACTION_IDS.IMPORT_SUBJECT_MATERIALS,
        labelKey: "pageToolsImportSubjectMaterialsLabel",
        iconKey: PAGE_TOOL_ICON_KEYS.FILE_TEXT,
        availability: PAGE_TOOL_AVAILABILITY.UNAVAILABLE
    }
];

const WORKSPACE_ACTION_TOOL_ITEMS = [
    {
        id: PAGE_TOOL_ITEM_IDS.APP_CREATE_EXAM,
        actionId: PAGE_TOOL_ACTION_IDS.CREATE_EXAM,
        labelKey: "pageToolsCreateExamLabel",
        iconKey: PAGE_TOOL_ICON_KEYS.PLUS,
        availability: PAGE_TOOL_AVAILABILITY.UNAVAILABLE
    },
    {
        id: PAGE_TOOL_ITEM_IDS.APP_CONCEPT_LIST,
        actionId: PAGE_TOOL_ACTION_IDS.CREATE_CONCEPT_LIST,
        labelKey: "pageToolsConceptListLabel",
        iconKey: PAGE_TOOL_ICON_KEYS.LIST,
        availability: PAGE_TOOL_AVAILABILITY.UNAVAILABLE
    },
    {
        id: PAGE_TOOL_ITEM_IDS.APP_CURRICULUM_GRAPHS,
        actionId: PAGE_TOOL_ACTION_IDS.CREATE_CURRICULUM_GRAPHS,
        labelKey: "pageToolsCurriculumGraphsLabel",
        iconKey: PAGE_TOOL_ICON_KEYS.BAR_CHART_3,
        availability: PAGE_TOOL_AVAILABILITY.UNAVAILABLE
    },
    {
        id: PAGE_TOOL_ITEM_IDS.APP_CURRICULUM_FIGURE,
        actionId: PAGE_TOOL_ACTION_IDS.CREATE_CURRICULUM_FIGURE,
        labelKey: "pageToolsCurriculumFigureLabel",
        iconKey: PAGE_TOOL_ICON_KEYS.PIE_CHART,
        availability: PAGE_TOOL_AVAILABILITY.UNAVAILABLE
    },
    {
        id: PAGE_TOOL_ITEM_IDS.APP_AI_EXAM,
        actionId: PAGE_TOOL_ACTION_IDS.CREATE_AI_EXAM,
        labelKey: "pageToolsAiExamLabel",
        iconKey: PAGE_TOOL_ICON_KEYS.SPARKLES,
        availability: PAGE_TOOL_AVAILABILITY.UNAVAILABLE
    }
];

const LEARNING_CONTENT_SELECT_WORKSPACE_ACTION_TOOL_ITEMS = [
    {
        id: PAGE_TOOL_ITEM_IDS.APP_IMPORT_SUBJECT_MATERIALS,
        actionId: PAGE_TOOL_ACTION_IDS.IMPORT_SUBJECT_MATERIALS,
        labelKey: "pageToolsImportSubjectMaterialsLabel",
        iconKey: PAGE_TOOL_ICON_KEYS.FILE_TEXT,
        availability: PAGE_TOOL_AVAILABILITY.UNAVAILABLE
    }
];

const EXAM_TOOL_ITEMS = [
    {
        id: PAGE_TOOL_ITEM_IDS.EXAM_PREVIOUS_QUESTION,
        actionId: PAGE_TOOL_ACTION_IDS.EXAM_PREVIOUS_QUESTION,
        labelKey: "pageToolsExamPreviousQuestionLabel",
        iconKey: PAGE_TOOL_ICON_KEYS.CHEVRON_LEFT,
        availability: PAGE_TOOL_AVAILABILITY.AVAILABLE
    },
    {
        id: PAGE_TOOL_ITEM_IDS.EXAM_NEXT_QUESTION,
        actionId: PAGE_TOOL_ACTION_IDS.EXAM_NEXT_QUESTION,
        labelKey: "pageToolsExamNextQuestionLabel",
        iconKey: PAGE_TOOL_ICON_KEYS.CHEVRON_RIGHT,
        availability: PAGE_TOOL_AVAILABILITY.AVAILABLE
    },
    {
        id: PAGE_TOOL_ITEM_IDS.EXAM_SUBMIT,
        actionId: PAGE_TOOL_ACTION_IDS.EXAM_SUBMIT,
        labelKey: "pageToolsExamSubmitLabel",
        iconKey: PAGE_TOOL_ICON_KEYS.SEND,
        availability: PAGE_TOOL_AVAILABILITY.AVAILABLE
    },
    {
        id: PAGE_TOOL_ITEM_IDS.EXAM_RESET,
        actionId: PAGE_TOOL_ACTION_IDS.EXAM_RESET,
        labelKey: "pageToolsExamResetLabel",
        iconKey: PAGE_TOOL_ICON_KEYS.ROTATE_CCW,
        availability: PAGE_TOOL_AVAILABILITY.AVAILABLE
    }
];

const FLIPCARDS_DECK_TOOL_ITEMS = [
    {
        id: PAGE_TOOL_ITEM_IDS.FLIPCARDS_ALL_CARDS,
        actionId: PAGE_TOOL_ACTION_IDS.FLIPCARDS_SHOW_ALL_CARDS,
        labelKey: "flipcardsToolMenuAllCardsLabel",
        viewModelLabelKey: "toolMenuAllCardsLabel",
        iconKey: PAGE_TOOL_ICON_KEYS.LIST,
        availability: PAGE_TOOL_AVAILABILITY.AVAILABLE
    },
    {
        id: PAGE_TOOL_ITEM_IDS.FLIPCARDS_SHUFFLE,
        actionId: PAGE_TOOL_ACTION_IDS.FLIPCARDS_SHUFFLE,
        labelKey: "flipcardsToolMenuShuffleLabel",
        viewModelLabelKey: "toolMenuShuffleLabel",
        iconKey: PAGE_TOOL_ICON_KEYS.SHUFFLE,
        availability: PAGE_TOOL_AVAILABILITY.AVAILABLE
    },
    {
        id: PAGE_TOOL_ITEM_IDS.FLIPCARDS_REPEAT_DIFFICULT,
        actionId: PAGE_TOOL_ACTION_IDS.FLIPCARDS_REPEAT_DIFFICULT,
        labelKey: "flipcardsToolMenuRepeatDifficultLabel",
        viewModelLabelKey: "toolMenuRepeatDifficultLabel",
        iconKey: PAGE_TOOL_ICON_KEYS.REFRESH_CW,
        availability: PAGE_TOOL_AVAILABILITY.AVAILABLE
    },
    {
        id: PAGE_TOOL_ITEM_IDS.FLIPCARDS_ADD_CARD,
        actionId: PAGE_TOOL_ACTION_IDS.FLIPCARDS_ADD_CARD,
        labelKey: "flipcardsToolMenuAddCardLabel",
        viewModelLabelKey: "toolMenuAddCardLabel",
        iconKey: PAGE_TOOL_ICON_KEYS.PLUS,
        availability: PAGE_TOOL_AVAILABILITY.UNAVAILABLE
    }
];

const PAGE_TOOL_GROUPS_BY_SCREEN = {
    [NAV_SCREENS.SUBJECTS]: {
        id: PAGE_TOOL_GROUP_IDS.SUBJECT_SELECT,
        screen: NAV_SCREENS.SUBJECTS,
        titleKey: "pageToolsSubjectWorkspaceTitle",
        subtitleKey: "pageToolsWorkspaceSubtitle",
        actionsLabelKey: "pageToolsWorkspaceActionsLabel",
        desktopSurface: PAGE_TOOL_SURFACES.DESKTOP_POPOUT,
        mobileSurface: PAGE_TOOL_SURFACES.MOBILE_BOTTOM_SHEET,
        mobilePrimarySlot: PAGE_TOOL_PRIMARY_SLOTS.SEARCH,
        items: SUBJECT_SELECT_WORKSPACE_ACTION_TOOL_ITEMS
    },
    [NAV_SCREENS.SELECT]: {
        id: PAGE_TOOL_GROUP_IDS.LEARNING_CONTENT_SELECT,
        screen: NAV_SCREENS.SELECT,
        titleKey: "pageToolsWorkspaceTitle",
        subtitleKey: "pageToolsWorkspaceSubtitle",
        actionsLabelKey: "pageToolsWorkspaceActionsLabel",
        desktopSurface: PAGE_TOOL_SURFACES.DESKTOP_POPOUT,
        mobileSurface: PAGE_TOOL_SURFACES.MOBILE_BOTTOM_SHEET,
        mobilePrimarySlot: PAGE_TOOL_PRIMARY_SLOTS.SEARCH,
        items: LEARNING_CONTENT_SELECT_WORKSPACE_ACTION_TOOL_ITEMS
    },
    [NAV_SCREENS.EXAM]: {
        id: PAGE_TOOL_GROUP_IDS.EXAM,
        screen: NAV_SCREENS.EXAM,
        titleKey: "pageToolsExamTitle",
        subtitleKey: "pageToolsExamSubtitle",
        actionsLabelKey: "pageToolsExamActionsLabel",
        desktopSurface: PAGE_TOOL_SURFACES.DESKTOP_POPOUT,
        mobileSurface: PAGE_TOOL_SURFACES.MOBILE_BOTTOM_SHEET,
        mobilePrimarySlot: PAGE_TOOL_PRIMARY_SLOTS.FOOTER_PAGER,
        items: EXAM_TOOL_ITEMS
    },
    [NAV_SCREENS.FLIPCARDS]: {
        id: PAGE_TOOL_GROUP_IDS.FLIPCARDS,
        screen: NAV_SCREENS.FLIPCARDS,
        titleKey: "flipcardsToolMenuTitle",
        subtitleKey: "flipcardsToolMenuSubtitle",
        actionsLabelKey: "flipcardsToolMenuActionsLabel",
        desktopSurface: PAGE_TOOL_SURFACES.DESKTOP_POPOUT,
        mobileSurface: PAGE_TOOL_SURFACES.MOBILE_BOTTOM_SHEET,
        mobilePrimarySlot: PAGE_TOOL_PRIMARY_SLOTS.FOOTER_PAGER,
        items: FLIPCARDS_DECK_TOOL_ITEMS
    },
    [NAV_SCREENS.OVERVIEW]: {
        id: PAGE_TOOL_GROUP_IDS.STATISTICS,
        screen: NAV_SCREENS.OVERVIEW,
        titleKey: "pageToolsStatisticsTitle",
        subtitleKey: "pageToolsStatisticsSubtitle",
        actionsLabelKey: "pageToolsStatisticsActionsLabel",
        desktopSurface: PAGE_TOOL_SURFACES.DESKTOP_POPOUT,
        mobileSurface: PAGE_TOOL_SURFACES.MOBILE_BOTTOM_SHEET,
        mobilePrimarySlot: PAGE_TOOL_PRIMARY_SLOTS.NONE,
        items: []
    }
};
export function getSubjectSelectWorkspaceActionToolItems() {
    return SUBJECT_SELECT_WORKSPACE_ACTION_TOOL_ITEMS;
}

export function getLearningContentSelectWorkspaceActionToolItems() {
    return LEARNING_CONTENT_SELECT_WORKSPACE_ACTION_TOOL_ITEMS;
}


export function getPageToolGroup(screen) {
    return PAGE_TOOL_GROUPS_BY_SCREEN[screen] ?? null;
}

export function getPageToolItems(screen) {
    const pageToolGroup = getPageToolGroup(screen);

    if (!pageToolGroup) {
        return [];
    }

    return pageToolGroup.items;
}

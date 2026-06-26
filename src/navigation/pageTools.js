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
    EXAM_SELECT: "exam-select",
    EXAM: "exam",
    FLIPCARDS: "flipcards",
    STATISTICS: "statistics"
};

export const PAGE_TOOL_ICON_KEYS = {
    BAR_CHART_3: "bar-chart-3",
    BOOK_OPEN: "book-open",
    CLOCK_3: "clock-3",
    FILE_TEXT: "file-text",
    LIST: "list",
    PANELS_TOP_LEFT: "panels-top-left",
    PIE_CHART: "pie-chart",
    PLUS: "plus",
    REFRESH_CW: "refresh-cw",
    SHUFFLE: "shuffle",
    SPARKLES: "sparkles"
};

export const PAGE_TOOL_AVAILABILITY = {
    AVAILABLE: "available",
    UNAVAILABLE: "unavailable"
};

export const PAGE_TOOL_ACTION_IDS = {
    SHOW_EXAMS: "navigation.showExams",
    SHOW_PRACTICE_TESTS: "navigation.showPracticeTests",
    SHOW_FLIPCARDS: "navigation.showFlipcards",
    CREATE_EXAM: "exam.create",
    CREATE_CONCEPT_LIST: "curriculum.createConceptList",
    CREATE_CURRICULUM_GRAPHS: "curriculum.createGraphs",
    CREATE_CURRICULUM_FIGURE: "curriculum.createFigure",
    CREATE_AI_EXAM: "exam.createAiExam",
    FLIPCARDS_SHOW_ALL_CARDS: "flipcards.showAllCards",
    FLIPCARDS_SHUFFLE: "flipcards.shuffle",
    FLIPCARDS_REPEAT_DIFFICULT: "flipcards.repeatDifficult",
    FLIPCARDS_ADD_CARD: "flipcards.addCard"
};

export const PAGE_TOOL_ITEM_IDS = {
    APP_EXAMS: "app-exams",
    APP_PRACTICE_TESTS: "app-practice-tests",
    APP_FLIPCARDS: "app-flipcards",
    APP_CREATE_EXAM: "app-create-exam",
    APP_CONCEPT_LIST: "app-concept-list",
    APP_CURRICULUM_GRAPHS: "app-curriculum-graphs",
    APP_CURRICULUM_FIGURE: "app-curriculum-figure",
    APP_AI_EXAM: "app-ai-exam",
    FLIPCARDS_ALL_CARDS: "all-cards",
    FLIPCARDS_SHUFFLE: "shuffle",
    FLIPCARDS_REPEAT_DIFFICULT: "repeat-difficult",
    FLIPCARDS_ADD_CARD: "add-card"
};

const APP_DISCOVERY_TOOL_ITEMS = [
    {
        id: PAGE_TOOL_ITEM_IDS.APP_EXAMS,
        actionId: PAGE_TOOL_ACTION_IDS.SHOW_EXAMS,
        labelKey: "pageToolsExamsLabel",
        iconKey: PAGE_TOOL_ICON_KEYS.FILE_TEXT,
        availability: PAGE_TOOL_AVAILABILITY.AVAILABLE
    },
    {
        id: PAGE_TOOL_ITEM_IDS.APP_PRACTICE_TESTS,
        actionId: PAGE_TOOL_ACTION_IDS.SHOW_PRACTICE_TESTS,
        labelKey: "pageToolsPracticeTestsLabel",
        iconKey: PAGE_TOOL_ICON_KEYS.CLOCK_3,
        availability: PAGE_TOOL_AVAILABILITY.AVAILABLE
    },
    {
        id: PAGE_TOOL_ITEM_IDS.APP_FLIPCARDS,
        actionId: PAGE_TOOL_ACTION_IDS.SHOW_FLIPCARDS,
        labelKey: "pageToolsFlipcardsLabel",
        iconKey: PAGE_TOOL_ICON_KEYS.PANELS_TOP_LEFT,
        availability: PAGE_TOOL_AVAILABILITY.AVAILABLE
    },
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

export const PAGE_TOOL_GROUPS_BY_SCREEN = {
    [NAV_SCREENS.SUBJECTS]: {
        id: PAGE_TOOL_GROUP_IDS.SUBJECT_SELECT,
        screen: NAV_SCREENS.SUBJECTS,
        titleKey: "pageToolsWorkspaceTitle",
        subtitleKey: "pageToolsWorkspaceSubtitle",
        actionsLabelKey: "pageToolsWorkspaceActionsLabel",
        desktopSurface: PAGE_TOOL_SURFACES.DESKTOP_POPOUT,
        mobileSurface: PAGE_TOOL_SURFACES.MOBILE_BOTTOM_SHEET,
        mobilePrimarySlot: PAGE_TOOL_PRIMARY_SLOTS.SEARCH,
        items: APP_DISCOVERY_TOOL_ITEMS
    },
    [NAV_SCREENS.SELECT]: {
        id: PAGE_TOOL_GROUP_IDS.EXAM_SELECT,
        screen: NAV_SCREENS.SELECT,
        titleKey: "pageToolsWorkspaceTitle",
        subtitleKey: "pageToolsWorkspaceSubtitle",
        actionsLabelKey: "pageToolsWorkspaceActionsLabel",
        desktopSurface: PAGE_TOOL_SURFACES.DESKTOP_POPOUT,
        mobileSurface: PAGE_TOOL_SURFACES.MOBILE_BOTTOM_SHEET,
        mobilePrimarySlot: PAGE_TOOL_PRIMARY_SLOTS.SEARCH,
        items: APP_DISCOVERY_TOOL_ITEMS
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
        items: []
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

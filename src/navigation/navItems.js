// src/navigation/navItems.js
import { NAV_SCREENS } from "./navGraph.js";

export const SIDEBAR_NAV_ITEMS = [
    {
        id: "subjects",
        section: "primary",
        screen: NAV_SCREENS.SUBJECTS,
        labelKey: "sidebarSubjects",
        fallbackLabel: "Velg fag fra hjemskjerm",
        activeScreens: [NAV_SCREENS.SUBJECTS]
    },
    {
        id: "exams",
        section: "primary",
        screen: NAV_SCREENS.SELECT,
        labelKey: "sidebarExams",
        fallbackLabel: "Velg eksamen",
        activeScreens: [NAV_SCREENS.SELECT, NAV_SCREENS.EXAM]
    },
    {
        id: "flipcards",
        section: "primary",
        screen: NAV_SCREENS.FLIPCARDS,
        labelKey: "sidebarFlipcards",
        fallbackLabel: "Flipcards",
        activeScreens: [NAV_SCREENS.FLIPCARDS],
        requiresSubject: true
    },
    {
        id: "overview",
        section: "secondary",
        screen: NAV_SCREENS.OVERVIEW,
        labelKey: "sidebarStatistics",
        fallbackLabel: "Din statistikk",
        activeScreens: [NAV_SCREENS.OVERVIEW]
    }
];

export const PAGE_NAV_TOOL_IDS = {
    EXAMS: "app-exams",
    PRACTICE_TESTS: "app-practice-tests",
    FLIPCARDS: "app-flipcards"
};

export const PAGE_NAV_TOOL_ITEMS = [
    {
        id: PAGE_NAV_TOOL_IDS.EXAMS,
        screen: NAV_SCREENS.SELECT,
        labelKey: "pageToolsExamsLabel",
        fallbackLabel: "Eksamner",
        iconKey: "file-text",
        requiresSubject: true
    },
    {
        id: PAGE_NAV_TOOL_IDS.PRACTICE_TESTS,
        screen: NAV_SCREENS.SELECT,
        labelKey: "pageToolsPracticeTestsLabel",
        fallbackLabel: "Øveprøver",
        iconKey: "clock-3",
        requiresSubject: true
    },
    {
        id: PAGE_NAV_TOOL_IDS.FLIPCARDS,
        screen: NAV_SCREENS.FLIPCARDS,
        labelKey: "pageToolsFlipcardsLabel",
        fallbackLabel: "Flipcards",
        iconKey: "gallery-horizontal-end",
        requiresSubject: true
    }
];

export function getSubjectSelectPageNavToolItems() {
    return [];
}

export function getExamSelectPageNavToolItems() {
    return PAGE_NAV_TOOL_ITEMS.filter((navItem) => (
        navItem.id === PAGE_NAV_TOOL_IDS.EXAMS
        || navItem.id === PAGE_NAV_TOOL_IDS.FLIPCARDS
    ));
}

export function getSelectionPageNavToolItems() {
    return getExamSelectPageNavToolItems();
}

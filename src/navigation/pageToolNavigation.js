// src/navigation/pageToolNavigation.js
import { NAV_SCREENS } from "./navGraph.js";
import { PAGE_TOOL_ACTION_IDS } from "./pageTools.js";

export const PAGE_TOOL_NAVIGATION_TARGETS_BY_ACTION_ID = {
    [PAGE_TOOL_ACTION_IDS.SHOW_EXAMS]: NAV_SCREENS.SELECT,
    [PAGE_TOOL_ACTION_IDS.SHOW_PRACTICE_TESTS]: NAV_SCREENS.SELECT,
    [PAGE_TOOL_ACTION_IDS.SHOW_FLIPCARDS]: NAV_SCREENS.FLIPCARDS
};

export const PAGE_TOOL_CONTEXT_DISABLED_LABEL_KEYS_BY_SCREEN = {
    [NAV_SCREENS.SUBJECTS]: {
        [PAGE_TOOL_ACTION_IDS.SHOW_EXAMS]: "pageToolsSelectSubjectFirstLabel",
        [PAGE_TOOL_ACTION_IDS.SHOW_PRACTICE_TESTS]: "pageToolsSelectSubjectFirstLabel",
        [PAGE_TOOL_ACTION_IDS.SHOW_FLIPCARDS]: "pageToolsSelectSubjectFirstLabel"
    }
};

export function createPageToolNavigationActionHandlers(changeScreen) {
    return Object.fromEntries(
        Object.entries(PAGE_TOOL_NAVIGATION_TARGETS_BY_ACTION_ID).map(([actionId, screen]) => [
            actionId,
            () => changeScreen(screen)
        ])
    );
}

export function createPageToolContextDisabledLabelKeys(screen, hasSelectedSubject) {
    if (hasSelectedSubject) {
        return {};
    }

    return PAGE_TOOL_CONTEXT_DISABLED_LABEL_KEYS_BY_SCREEN[screen] ?? {};
}

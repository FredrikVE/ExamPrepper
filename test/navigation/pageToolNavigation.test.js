import { describe, expect, jest, test } from "@jest/globals";
import { NAV_SCREENS } from "../../src/navigation/navGraph.js";
import { PAGE_TOOL_ACTION_IDS } from "../../src/navigation/pageTools.js";
import { PAGE_TOOL_CONTEXT_DISABLED_LABEL_KEYS_BY_SCREEN, PAGE_TOOL_NAVIGATION_TARGETS_BY_ACTION_ID, createPageToolContextDisabledLabelKeys, createPageToolNavigationActionHandlers } from "../../src/navigation/pageToolNavigation.js";

describe("pageToolNavigation", () => {
    test("keeps navigation targets in the navigation layer", () => {
        expect(PAGE_TOOL_NAVIGATION_TARGETS_BY_ACTION_ID).toEqual({
            [PAGE_TOOL_ACTION_IDS.SHOW_EXAMS]: NAV_SCREENS.SELECT,
            [PAGE_TOOL_ACTION_IDS.SHOW_PRACTICE_TESTS]: NAV_SCREENS.SELECT,
            [PAGE_TOOL_ACTION_IDS.SHOW_FLIPCARDS]: NAV_SCREENS.FLIPCARDS
        });
    });

    test("creates action handlers from navigation targets", () => {
        const changeScreen = jest.fn();
        const actionHandlers = createPageToolNavigationActionHandlers(changeScreen);

        actionHandlers[PAGE_TOOL_ACTION_IDS.SHOW_EXAMS]();
        actionHandlers[PAGE_TOOL_ACTION_IDS.SHOW_FLIPCARDS]();

        expect(changeScreen).toHaveBeenNthCalledWith(1, NAV_SCREENS.SELECT);
        expect(changeScreen).toHaveBeenNthCalledWith(2, NAV_SCREENS.FLIPCARDS);
    });

    test("keeps select-subject-first rules out of App", () => {
        expect(PAGE_TOOL_CONTEXT_DISABLED_LABEL_KEYS_BY_SCREEN[NAV_SCREENS.SUBJECTS]).toEqual({
            [PAGE_TOOL_ACTION_IDS.SHOW_EXAMS]: "pageToolsSelectSubjectFirstLabel",
            [PAGE_TOOL_ACTION_IDS.SHOW_PRACTICE_TESTS]: "pageToolsSelectSubjectFirstLabel",
            [PAGE_TOOL_ACTION_IDS.SHOW_FLIPCARDS]: "pageToolsSelectSubjectFirstLabel"
        });

        expect(createPageToolContextDisabledLabelKeys(NAV_SCREENS.SUBJECTS, false)).toEqual(PAGE_TOOL_CONTEXT_DISABLED_LABEL_KEYS_BY_SCREEN[NAV_SCREENS.SUBJECTS]);
        expect(createPageToolContextDisabledLabelKeys(NAV_SCREENS.SUBJECTS, true)).toEqual({});
        expect(createPageToolContextDisabledLabelKeys(NAV_SCREENS.SELECT, false)).toEqual({});
    });
});

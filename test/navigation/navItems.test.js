import { describe, expect, test } from "@jest/globals";
import { NAV_SCREENS } from "../../src/navigation/navGraph.js";
import { PAGE_NAV_TOOL_IDS, PAGE_NAV_TOOL_ITEMS, SIDEBAR_NAV_ITEMS, getLearningContentSelectPageNavToolItems } from "../../src/navigation/navItems.js";

describe("navItems", () => {
    test("keeps Flipcards out of the left sidebar navigation", () => {
        expect(SIDEBAR_NAV_ITEMS.map((navItem) => navItem.id)).toEqual([
            "subjects",
            "exams",
            "overview"
        ]);

        expect(SIDEBAR_NAV_ITEMS.some((navItem) => navItem.screen === NAV_SCREENS.FLIPCARDS)).toBe(false);
    });

    test("keeps page navigation tools in the navigation model", () => {
        expect(PAGE_NAV_TOOL_ITEMS.map((navItem) => navItem.id)).toEqual([
            PAGE_NAV_TOOL_IDS.EXAMS,
            PAGE_NAV_TOOL_IDS.PRACTICE_TESTS,
            PAGE_NAV_TOOL_IDS.FLIPCARDS
        ]);

        expect(PAGE_NAV_TOOL_ITEMS.map((navItem) => navItem.screen)).toEqual([
            NAV_SCREENS.SELECT,
            NAV_SCREENS.SELECT,
            NAV_SCREENS.FLIPCARDS
        ]);

        expect(PAGE_NAV_TOOL_ITEMS.every((navItem) => navItem.requiresSubject)).toBe(true);
    });

    test("returns learning content select page navigation tools", () => {
        expect(getLearningContentSelectPageNavToolItems().map((navItem) => navItem.id)).toEqual([
            PAGE_NAV_TOOL_IDS.EXAMS,
            PAGE_NAV_TOOL_IDS.FLIPCARDS
        ]);
    });
});

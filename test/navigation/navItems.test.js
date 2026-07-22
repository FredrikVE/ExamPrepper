import { describe, expect, test } from "@jest/globals";
import { NAV_SCREENS } from "../../src/navigation/navGraph.js";
import { SIDEBAR_NAV_ITEMS } from "../../src/navigation/navItems.js";

describe("navItems", () => {
	test("keeps Flipcards out of the left sidebar navigation", () => {
		expect(SIDEBAR_NAV_ITEMS.map((navItem) => navItem.id)).toEqual([
			"subjects",
			"exams",
			"overview"
		]);

		expect(SIDEBAR_NAV_ITEMS.some((navItem) => navItem.screen === NAV_SCREENS.FLIPCARDS)).toBe(false);
	});
});

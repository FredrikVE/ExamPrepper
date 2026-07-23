import { describe, expect, test } from "@jest/globals";
import { NAV_SCREENS } from "../../src/navigation/navGraph.js";
import { SIDEBAR_NAV_ITEMS } from "../../src/navigation/navItems.js";

describe("navItems", () => {
	test("keeps Flipcards out of the left sidebar navigation", () => {
		expect(SIDEBAR_NAV_ITEMS.map((navItem) => navItem.id)).toEqual([
			"subjects",
			"overview"
		]);

		expect(SIDEBAR_NAV_ITEMS.some((navItem) => navItem.screen === NAV_SCREENS.FLIPCARDS)).toBe(false);
	});

	test("sidebaren tilbyr ingen direkte rute til eksamenslisten", () => {
		expect(SIDEBAR_NAV_ITEMS.some((navItem) => navItem.screen === NAV_SCREENS.SELECT)).toBe(false);
	});

	test("alle sidebar-skjermer finnes i navigasjonsgrafen", () => {
		for (const navItem of SIDEBAR_NAV_ITEMS) {
			expect(Object.values(NAV_SCREENS)).toContain(navItem.screen);
		}
	});
});

// test/ui/view/components/Sidebar/SidebarNavigation.test.js
import { describe, expect, test } from "@jest/globals";
import { NAV_ITEMS, NAV_SCREENS } from "../../../../../src/navigation/navigation.js";
import { getSidebarIcon, shouldShowNavigationItem } from "../../../../../src/ui/view/components/Sidebar/sidebarNavigationModel.js";

describe("shouldShowNavigationItem", () => {
	test("uses the item hiddenOnScreens contract", () => {
		const item = { hiddenOnScreens: [NAV_SCREENS.SUBJECTS] };

		expect(shouldShowNavigationItem(item, NAV_SCREENS.SUBJECTS)).toBe(false);
		expect(shouldShowNavigationItem(item, NAV_SCREENS.SELECT)).toBe(true);
	});
});


describe("getSidebarIcon", () => {
	test("resolves every icon key declared by sidebar navigation config", () => {
		for (const item of NAV_ITEMS.sidebarItems) {
			expect(() => getSidebarIcon(item.iconKey)).not.toThrow();
		}
	});

	test("fails clearly for an unknown sidebar icon key", () => {
		expect(() => getSidebarIcon("unknown-icon")).toThrow("Unknown sidebar icon key: unknown-icon");
	});
});

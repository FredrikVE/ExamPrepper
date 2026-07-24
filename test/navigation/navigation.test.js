import { describe, expect, test } from "@jest/globals";
import { getScreenConfig, LEARNING_CONTENT_TYPES, NAV_ITEMS, NAV_SCREENS, SCREEN_CONFIG } from "../../src/navigation/navigation.js";

describe("navigation configuration", () => {
	test("contains only the screens rendered by App", () => {
		expect(NAV_SCREENS).toEqual({
			SUBJECTS: "subjects",
			SELECT: "select",
			EXAM: "exam",
			FLIPCARDS: "flipcards",
			MATCHCARDS: "matchcards",
			GLOSSARY: "glossary",
			OVERVIEW: "overview"
		});
	});

	test("uses unique screen ids", () => {
		const screens = Object.values(NAV_SCREENS);

		expect(new Set(screens).size).toBe(screens.length);
	});

	test("keeps the sidebar limited to subjects and statistics", () => {
		expect(NAV_ITEMS.sidebarItems.map((item) => item.id)).toEqual(["subjects", "overview"]);
		expect(NAV_ITEMS.sidebarItems.some((item) => item.screen === NAV_SCREENS.SELECT)).toBe(false);
		expect(NAV_ITEMS.sidebarItems.some((item) => item.screen === NAV_SCREENS.FLIPCARDS)).toBe(false);
	});

	test("defines every toggle-button item once", () => {
		expect(NAV_ITEMS.toggleButtonItems.map((item) => item.id)).toEqual([
			LEARNING_CONTENT_TYPES.EXAMS,
			LEARNING_CONTENT_TYPES.FLIPCARDS,
			LEARNING_CONTENT_TYPES.MATCHCARDS,
			LEARNING_CONTENT_TYPES.GLOSSARY
		]);

		for (const item of NAV_ITEMS.toggleButtonItems) {
			expect(item).toEqual(expect.objectContaining({
				labelKey: expect.any(String),
				titleKey: expect.any(String),
				subtitleKey: expect.any(String),
				subtitleFallbackKey: expect.any(String),
				searchPlaceholderKey: expect.any(String),
				targetScreen: expect.any(String),
				isDisabled: expect.any(Boolean)
			}));
		}
	});

	test("keeps pop-out menu definitions separate from glossary navigation", () => {
		expect(Object.keys(NAV_ITEMS.popOutMenuItems)).toEqual([
			NAV_SCREENS.SUBJECTS,
			NAV_SCREENS.SELECT,
			NAV_SCREENS.FLIPCARDS
		]);
		expect(NAV_ITEMS.popOutMenuItems[NAV_SCREENS.GLOSSARY]).toBeUndefined();
	});

	test("uses direct ids and explicit action properties", () => {
		expect(NAV_ITEMS.popOutMenuItems[NAV_SCREENS.SUBJECTS].items.map((item) => item.id)).toEqual([
			"app-create-subject",
			"app-import-subject-materials"
		]);
		expect(NAV_ITEMS.popOutMenuItems[NAV_SCREENS.SELECT].items.map((item) => item.id)).toEqual([
			"app-import-subject-materials"
		]);
		expect(NAV_ITEMS.popOutMenuItems[NAV_SCREENS.FLIPCARDS].items.map((item) => item.id)).toEqual([
			"all-cards",
			"shuffle",
			"repeat-difficult",
			"add-card"
		]);

		for (const menu of Object.values(NAV_ITEMS.popOutMenuItems)) {
			for (const item of menu.items) {
				expect(item).toEqual(expect.objectContaining({
					iconKey: expect.any(String),
					isDisabled: expect.any(Boolean),
					onSelect: null
				}));
			}
		}
	});
	test("defines stable policy for every screen", () => {
		expect(Object.keys(SCREEN_CONFIG).sort()).toEqual(Object.values(NAV_SCREENS).sort());

		for (const screen of Object.values(NAV_SCREENS)) {
			const screenConfig = getScreenConfig(screen);
			expect(typeof screenConfig.requiresSubject).toBe("boolean");
			expect(typeof screenConfig.requiresExam).toBe("boolean");
			expect(typeof screenConfig.showsSubjectSwitcher).toBe("boolean");
			expect(typeof screenConfig.pageClassName).toBe("string");
			expect(typeof screenConfig.shellClassName).toBe("string");

			if (screenConfig.backTo !== null) {
				expect(Object.values(NAV_SCREENS)).toContain(screenConfig.backTo);
			}
		}
	});

	test("uses valid screen references in navigation items", () => {
		const validScreens = Object.values(NAV_SCREENS);

		for (const item of NAV_ITEMS.sidebarItems) {
			expect(validScreens).toContain(item.screen);
			expect(Array.isArray(item.hiddenOnScreens)).toBe(true);

			for (const hiddenScreen of item.hiddenOnScreens) {
				expect(validScreens).toContain(hiddenScreen);
			}
		}
	});

	test("fails clearly for an unknown screen", () => {
		expect(() => getScreenConfig("missing-screen")).toThrow("Unknown navigation screen: missing-screen");
	});

});

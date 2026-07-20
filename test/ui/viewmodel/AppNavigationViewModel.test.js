import { describe, expect, jest, test } from "@jest/globals";
import { NAV_SCREENS, createAppBackContract } from "../../../src/navigation/navGraph.js";
import { createAppLayoutClassNames } from "../../../src/ui/viewmodel/AppNavigationViewModel.js";

describe("createAppBackContract", () => {
	test("hides back on the subjects root screen", () => {
		const onBack = jest.fn();

		expect(createAppBackContract({
			activeScreen: NAV_SCREENS.SUBJECTS,
			backLabel: "Tilbake",
			navigationLabel: "Navigasjon",
			onBack
		})).toEqual({
			showBackButton: false,
			backLabel: "Tilbake",
			navigationLabel: "Navigasjon",
			onBack
		});
	});

	test.each([
		NAV_SCREENS.SELECT,
		NAV_SCREENS.EXAM,
		NAV_SCREENS.FLIPCARDS,
		NAV_SCREENS.MATCHCARDS,
		NAV_SCREENS.OVERVIEW
	])("shows back on non-root screen %s", (activeScreen) => {
		const onBack = jest.fn();

		expect(createAppBackContract({
			activeScreen,
			backLabel: "Tilbake",
			navigationLabel: "Navigasjon",
			onBack
		})).toEqual({
			showBackButton: true,
			backLabel: "Tilbake",
			navigationLabel: "Navigasjon",
			onBack
		});
	});
});

describe("createAppLayoutClassNames", () => {
	test.each([
		[NAV_SCREENS.SUBJECTS, "exam-select-page", "exam-select-shell"],
		[NAV_SCREENS.SELECT, "exam-select-page", "exam-select-shell"],
		[NAV_SCREENS.OVERVIEW, "exam-select-page", "exam-select-shell"],
		[NAV_SCREENS.EXAM, "exam-page", "exam-shell"]
	])("returns standard layout classes for %s", (activeScreen, pageClassName, shellClassName) => {
		expect(createAppLayoutClassNames(activeScreen)).toEqual({
			pageClassName,
			shellClassName
		});
	});

	test("adds the flipcards theme scope to card practice routes", () => {
		expect(createAppLayoutClassNames(NAV_SCREENS.FLIPCARDS)).toEqual({
			pageClassName: "exam-page flipcards-theme-scope",
			shellClassName: "exam-shell"
		});

		expect(createAppLayoutClassNames(NAV_SCREENS.MATCHCARDS)).toEqual({
			pageClassName: "exam-page flipcards-theme-scope",
			shellClassName: "exam-shell"
		});
	});
});

import { describe, expect, jest, test } from "@jest/globals";
import { NAV_SCREENS } from "../../../src/navigation/navGraph.js";
import { createAppBackContract } from "../../../src/ui/viewmodel/AppNavigationViewModel.js";

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
		NAV_SCREENS.OVERVIEW,
		NAV_SCREENS.NOTES
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

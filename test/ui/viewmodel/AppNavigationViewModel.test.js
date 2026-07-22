import { describe, expect, jest, test } from "@jest/globals";
import { NAV_SCREENS, createAppBackContract } from "../../../src/navigation/navGraph.js";

describe("createAppBackContract", () => {
	test("hides back on the subjects root screen", () => {
		const onBack = jest.fn();

		expect(createAppBackContract({
			screen: NAV_SCREENS.SUBJECTS,
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
		NAV_SCREENS.GLOSSARY,
		NAV_SCREENS.OVERVIEW
	])("shows back on non-root screen %s", (activeScreen) => {
		const onBack = jest.fn();

		expect(createAppBackContract({
			screen: activeScreen,
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

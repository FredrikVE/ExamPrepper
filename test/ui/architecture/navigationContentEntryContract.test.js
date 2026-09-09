// test/ui/architecture/navigationContentEntryContract.test.js
import { describe, expect, test } from "@jest/globals";
import { DEFAULT_SELECT_CONTENT_ENTRY_ID, getLearningContentNavigationEntry, LEARNING_CONTENT_TYPES, NAV_ITEMS, NAV_SCREENS } from "../../../src/navigation/navigation.js";

describe("select content entry contract", () => {
	test("hver entry som targeter SELECT har komplett heading-kontrakt", () => {
		for (const entry of NAV_ITEMS.toggleButtonItems) {
			if (entry.targetScreen !== NAV_SCREENS.SELECT) {
				continue;
			}

			expect(entry.titleKey).not.toBeNull();
			expect(entry.subtitleKey).not.toBeNull();
			expect(entry.subtitleFallbackKey).not.toBeNull();
		}
	});

	test("standardentryen targeter SELECT og er ikke deaktivert", () => {
		const defaultEntry = getLearningContentNavigationEntry(DEFAULT_SELECT_CONTENT_ENTRY_ID);

		expect(defaultEntry.targetScreen).toBe(NAV_SCREENS.SELECT);
		expect(defaultEntry.isDisabled).toBe(false);
	});

	test("learning-path og glossary targeter ikke SELECT", () => {
		expect(getLearningContentNavigationEntry(LEARNING_CONTENT_TYPES.LEARNING_PATH).targetScreen).not.toBe(NAV_SCREENS.SELECT);
		expect(getLearningContentNavigationEntry(LEARNING_CONTENT_TYPES.GLOSSARY).targetScreen).not.toBe(NAV_SCREENS.SELECT);
	});

	test("hver entry som targeter SELECT har en contentTypeId SELECT faktisk rendrer", () => {
		const selectContentTypeIds = [
			LEARNING_CONTENT_TYPES.EXAMS,
			LEARNING_CONTENT_TYPES.FLIPCARDS,
			LEARNING_CONTENT_TYPES.MATCHCARDS
		];

		for (const entry of NAV_ITEMS.toggleButtonItems) {
			if (entry.targetScreen !== NAV_SCREENS.SELECT) {
				continue;
			}

			expect(selectContentTypeIds).toContain(entry.contentTypeId);
		}
	});
});

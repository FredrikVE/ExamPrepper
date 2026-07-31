//test/navigation/learningPathNavigation.test.js
import { describe, expect, test } from "@jest/globals";
import { LEARNING_CONTENT_TYPES, NAV_ITEMS, NAV_SCREENS, getScreenConfig } from "../../src/navigation/navigation.js";

describe("LearningPath navigation contract", () => {
	test("registers complete path and session screen configs", () => {
		expect(getScreenConfig(NAV_SCREENS.LEARNING_PATH)).toEqual({ requiresSubject: true, requiresExam: false, backTo: NAV_SCREENS.SUBJECTS, showsSubjectSwitcher: true, pageClassName: "exam-select-page", shellClassName: "exam-select-shell" });
		expect(getScreenConfig(NAV_SCREENS.LEARNING_SESSION)).toEqual({ requiresSubject: true, requiresExam: false, backTo: NAV_SCREENS.LEARNING_PATH, showsSubjectSwitcher: false, pageClassName: "exam-page", shellClassName: "exam-shell" });
	});

	test("returns from LearningPath directly to SubjectSelectPage", () => {
		expect(getScreenConfig(NAV_SCREENS.LEARNING_PATH).backTo).toBe(NAV_SCREENS.SUBJECTS);
	});

	test("enables both LearningPath entries and keeps them direct", () => {
		const desktop = NAV_ITEMS.toggleButtonItems.find((item) => item.id === LEARNING_CONTENT_TYPES.LEARNING_PATH);
		const mobile = NAV_ITEMS.mobileToggleButtonItems.find((item) => item.id === LEARNING_CONTENT_TYPES.LEARNING_PATH);

		expect(desktop).toMatchObject({ contentTypeId: LEARNING_CONTENT_TYPES.LEARNING_PATH, targetScreen: NAV_SCREENS.LEARNING_PATH, isDisabled: false });
		expect(mobile).toMatchObject({ contentTypeId: LEARNING_CONTENT_TYPES.LEARNING_PATH, entryIds: [], isDisabled: false });
	});
});

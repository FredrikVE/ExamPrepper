// test/ui/viewmodel/LearningSession/createLearningSessionHeaderModel.test.js
import { describe, expect, test } from "@jest/globals";
import createLearningSessionHeaderModel from "../../../../src/ui/viewmodel/LearningSession/createLearningSessionHeaderModel.js";

const t = {
	learningSessionModuleTitle: (position, title) => `Module ${position}: ${title}`,
	learningSessionQuestionCounter: (current, total) => `${current} / ${total}`,
	learningSessionResultHeaderLabel: "Result",
	learningSessionReviewLabel: "Review",
	learningSessionRepairLabel: "Repair",
	learningSessionCoverageLabel: "Coverage",
	learningSessionAuthoredLabel: "Learning"
};

function createModel(overrides = {}) {
	return createLearningSessionHeaderModel({
		modulePosition: 2,
		moduleTitle: "Protocols",
		activityKind: "authored",
		submitResult: null,
		currentIndex: 1,
		questionCount: 4,
		t,
		...overrides
	});
}

describe("createLearningSessionHeaderModel", () => {
	test("presents authored and legacy sessions with the authored label", () => {
		expect(createModel()).toMatchObject({
		title: "Module 2: Protocols",
		counterLabel: "2 / 4",
		contextLabel: "Learning"
	});

		expect(createModel({
		activityKind: "legacy-round"
	})).toMatchObject({
		contextLabel: "Learning"
	});
	});

	test("uses explicit adaptive activity labels", () => {
		expect(createModel({ activityKind: "review" }).contextLabel).toBe("Review");
		expect(createModel({ activityKind: "repair" }).contextLabel).toBe("Repair");
		expect(createModel({ activityKind: "coverage" }).contextLabel).toBe("Coverage");
	});

	test("uses the result label after submit succeeds", () => {
		expect(createModel({
			submitResult: {
				score: {}
			}
		}).counterLabel).toBe("Result");
	});

	test("fails fast for unknown activity kinds", () => {
		expect(() => createModel({
			activityKind: "unexpected"
		})).toThrow("Unknown learning session activity kind: unexpected");
	});
});

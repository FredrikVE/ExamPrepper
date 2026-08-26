// test/ui/viewmodel/LearningSession/createLearningSessionHeaderModel.test.js
import { describe, expect, test } from "@jest/globals";
import createLearningSessionHeaderModel from "../../../../src/ui/viewmodel/LearningSession/createLearningSessionHeaderModel.js";

const t = {
	learningSessionModuleTitle: (position, title) => `Module ${position}: ${title}`,
	learningSessionQuestionCounter: (current, total) => `${current} / ${total}`,
	learningSessionResultHeaderLabel: "Result"
};

function createModel(overrides = {}) {
	return createLearningSessionHeaderModel({
		modulePosition: 2,
		moduleTitle: "Protocols",
		submitResult: null,
		currentIndex: 1,
		questionCount: 4,
		t,
		...overrides
	});
}

describe("createLearningSessionHeaderModel", () => {
	test("presents the module and question counter without a session mode label", () => {
		expect(createModel()).toEqual({
			title: "Module 2: Protocols",
			counterLabel: "2 / 4"
		});
	});

	test("uses the result label after submit succeeds", () => {
		expect(createModel({
			submitResult: {
				score: {}
			}
		}).counterLabel).toBe("Result");
	});
});

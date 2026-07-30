//test/ui/viewmodel/LearningPath/createContinueLearningModel.test.js
import { describe, expect, test } from "@jest/globals";
import createContinueLearningModel from "../../../../src/ui/viewmodel/LearningPath/createContinueLearningModel.js";

const t = {
	learningPathResumeTitle: "Resume",
	learningPathResumeBody: (position, title, question) => `${position}:${title}:${question}`,
	learningPathResumeLabel: "Resume path",
	learningPathContinueTitle: "Continue",
	learningPathContinueBody: (position, title) => `${position}:${title}`
};

function createEntry(actionModel) {
	return { id: "module-1", position: 1, title: "Concepts", actionModel };
}

describe("createContinueLearningModel", () => {
	test("reuses the active module resume action", () => {
		const actionModel = { intent: "resume", moduleId: "module-1", sessionId: "session-1", isDisabled: false };
		const model = createContinueLearningModel({ activeEntry: createEntry(actionModel), resumableSession: { sessionId: "session-1", moduleId: "module-1", currentQuestionPosition: 2, questionCount: 6 }, t });
		expect(model).toMatchObject({ description: "1:Concepts:3", buttonLabel: "Resume path" });
		expect(model.actionModel).toBe(actionModel);
	});

	test("reuses the active module start action", () => {
		const actionModel = { intent: "start", moduleId: "module-1", sessionId: null, isDisabled: false };
		const model = createContinueLearningModel({ activeEntry: createEntry(actionModel), resumableSession: null, t });
		expect(model).toMatchObject({ description: "1:Concepts", buttonLabel: "Resume path" });
		expect(model.actionModel).toBe(actionModel);
	});
});

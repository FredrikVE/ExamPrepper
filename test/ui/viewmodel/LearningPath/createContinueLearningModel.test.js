//test/ui/viewmodel/LearningPath/createContinueLearningModel.test.js
import { describe, expect, test } from "@jest/globals";
import createContinueLearningModel from "../../../../src/ui/viewmodel/LearningPath/createContinueLearningModel.js";

const t = {
	learningPathResumeTitle: "Resume",
	learningPathResumeBody: (position, title, question) => `${position}:${title}:${question}`,
	learningPathResumeLabel: "Resume path",
	learningPathContinueTitle: "Continue",
	learningPathContinueBody: (position, title) => `${position}:${title}`,
	learningPathAdaptiveTitle: "Adaptive",
	learningPathAdaptiveInitialExposureBody: (position, title) => `initial:${position}:${title}`,
	learningPathAdaptivePracticeBody: (position, title) => `practice:${position}:${title}`,
	learningPathAdaptiveProgressionBody: (position, title) => `progress:${position}:${title}`,
	learningPathAdaptiveRevisitBody: (position, title) => `revisit:${position}:${title}`,
	learningPathAdaptiveRepairBody: (position, title) => `repair:${position}:${title}`
};

function createEntry(actionModel) {
	return { id: "module-1", position: 1, title: "Concepts", actionModel };
}

describe("createContinueLearningModel", () => {
	test("reuses the active module resume action", () => {
		const actionModel = { intent: "resume", moduleId: "module-1", sessionId: "session-1", isDisabled: false };
		const model = createContinueLearningModel({ activeEntry: createEntry(actionModel), resumableSession: { sessionId: "session-1", moduleId: "module-1", currentQuestionPosition: 2, questionCount: 6 }, nextActivity: { kind: "resume-session", moduleId: "module-1", sessionId: "session-1" }, t });
		expect(model).toMatchObject({ description: "1:Concepts:3", buttonLabel: "Resume path" });
		expect(model.actionModel).toBe(actionModel);
	});

	test("reuses the active module start action", () => {
		const actionModel = { intent: "start", moduleId: "module-1", sessionId: null, round: 1, label: "Start 1", isDisabled: false };
		const model = createContinueLearningModel({ activeEntry: createEntry(actionModel), resumableSession: null, nextActivity: null, t });
		expect(model).toMatchObject({ description: "1:Concepts", buttonLabel: "Start 1" });
		expect(model.actionModel).toBe(actionModel);
	});
	test("uses the backend adaptive focus without recalculating mastery", () => {
		const actionModel = { intent: "start", moduleId: "module-1", sessionId: null, round: 2, label: "Start 2", isDisabled: false };
		const nextActivity = { kind: "start-round", moduleId: "module-1", round: 2, focus: "practice" };
		const model = createContinueLearningModel({ activeEntry: createEntry(actionModel), resumableSession: null, nextActivity, t });

		expect(model).toMatchObject({ title: "Adaptive", description: "practice:1:Concepts", buttonLabel: "Start 2" });
	});

	test("presents backend repair focus without deriving prerequisite policy in the frontend", () => {
		const actionModel = { intent: "start", moduleId: "module-1", sessionId: null, round: 2, label: "Start 2", isDisabled: false };
		const nextActivity = { kind: "start-round", moduleId: "module-1", round: 2, focus: "repair" };
		const model = createContinueLearningModel({ activeEntry: createEntry(actionModel), resumableSession: null, nextActivity, t });

		expect(model).toMatchObject({ title: "Adaptive", description: "repair:1:Concepts", buttonLabel: "Start 2" });
	});

});

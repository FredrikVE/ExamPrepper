//test/ui/viewmodel/LearningPath/createContinueLearningModel.test.js
import { describe, expect, test } from "@jest/globals";
import createContinueLearningModel from "../../../../src/ui/viewmodel/LearningPath/createContinueLearningModel.js";

const t = {
	learningPathResumeTitle: "Resume",
	learningPathResumeBody: (position, title, question) => `${position}:${title}:${question}`,
	learningPathResumeLabel: "Resume path",
	learningPathContinueTitle: "Continue",
	learningPathContinueBody: (position, title) => `${position}:${title}`,
	learningPathStartRoundLabel: (round) => `Start ${round}`
};

const activeModule = { id: "module-1", position: 1, title: "Concepts", availability: { isUnlocked: true }, progress: { nextRound: 2 } };

describe("createContinueLearningModel", () => {
	test("resumes an existing active session", () => {
		const model = createContinueLearningModel({ activeModule, resumableSession: { sessionId: "session-1", moduleId: "module-1", currentQuestionPosition: 2, questionCount: 6 }, isStarting: false, t });
		expect(model).toMatchObject({ intent: "resume", sessionId: "session-1", description: "1:Concepts:3", buttonLabel: "Resume path" });
	});

	test("starts the backend-provided active module when no session can be resumed", () => {
		const model = createContinueLearningModel({ activeModule, resumableSession: null, isStarting: false, t });
		expect(model).toMatchObject({ intent: "start", moduleId: "module-1", description: "1:Concepts", buttonLabel: "Start 2" });
	});
});

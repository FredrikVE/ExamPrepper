//test/ui/viewmodel/LearningPath/createLearningPathActionModel.test.js
import { describe, expect, test } from "@jest/globals";
import createLearningPathActionModel from "../../../../src/ui/viewmodel/LearningPath/createLearningPathActionModel.js";

const t = {
	learningPathContinueRoundLabel: (round) => `Continue ${round}`,
	learningPathRetryModuleLabel: "Retry",
	learningPathStartRoundLabel: (round) => `Start ${round}`
};

function createModule(overrides = {}) {
	return {
		id: "module-1",
		availability: { isUnlocked: true },
		progress: { completedRounds: 0, nextRound: 1 },
		...overrides
	};
}

describe("createLearningPathActionModel", () => {
	test("resumes the active session for the same module", () => {
		const model = createLearningPathActionModel({ module: createModule(), resumableSession: { sessionId: "session-1", moduleId: "module-1" }, startingModuleId: null, t });
		expect(model).toEqual({ intent: "resume", moduleId: "module-1", sessionId: "session-1", round: 1, label: "Continue 1", isDisabled: false, isPending: false });
	});

	test("starts the module when there is no matching active session", () => {
		const model = createLearningPathActionModel({ module: createModule(), resumableSession: null, startingModuleId: null, t });
		expect(model).toMatchObject({ intent: "start", moduleId: "module-1", sessionId: null, label: "Start 1", isDisabled: false });
	});

	test("disables a locked module", () => {
		const module = createModule({ availability: { isUnlocked: false } });
		const model = createLearningPathActionModel({ module, resumableSession: null, startingModuleId: null, t });
		expect(model.isDisabled).toBe(true);
	});
});

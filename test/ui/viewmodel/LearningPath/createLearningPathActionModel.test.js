//test/ui/viewmodel/LearningPath/createLearningPathActionModel.test.js
import { describe, expect, test } from "@jest/globals";
import createLearningPathActionModel from "../../../../src/ui/viewmodel/LearningPath/createLearningPathActionModel.js";

const t = {
	learningPathContinueRoundLabel: (round) => `Continue ${round}`,
	learningPathStartRoundLabel: (round) => `Start ${round}`
};

function createModule(overrides) {
	return {
		id: "module-1",
		availability: { isUnlocked: true },
		progress: { completedRounds: 0 },
		...overrides
	};
}

describe("createLearningPathActionModel", () => {
	test("resumes the active session using the session-owned round", () => {
		const model = createLearningPathActionModel({ module: createModule({}), resumableSession: { sessionId: "session-1", moduleId: "module-1", round: 2 }, nextActivity: { kind: "resume-session", moduleId: "module-1", sessionId: "session-1" }, startingModuleId: null, t });
		expect(model).toEqual({ intent: "resume", moduleId: "module-1", sessionId: "session-1", round: 2, label: "Continue 2", isDisabled: false, isPending: false });
	});

	test("starts only from the backend next activity", () => {
		const nextActivity = { kind: "start-round", moduleId: "module-1", round: 1, focus: "practice" };
		const model = createLearningPathActionModel({ module: createModule({ progress: { completedRounds: 3 } }), resumableSession: null, nextActivity, startingModuleId: null, t });
		expect(model).toMatchObject({ intent: "start", moduleId: "module-1", round: 1, label: "Start 1" });
	});

	test("does not synthesize a start or retry action from legacy module progress", () => {
		const model = createLearningPathActionModel({ module: createModule({ progress: { completedRounds: 3 } }), resumableSession: null, nextActivity: null, startingModuleId: null, t });
		expect(model).toBeNull();
	});

	test("disables a backend-selected action for a locked module", () => {
		const module = createModule({ availability: { isUnlocked: false } });
		const nextActivity = { kind: "start-round", moduleId: "module-1", round: 1, focus: "practice" };
		const model = createLearningPathActionModel({ module, resumableSession: null, nextActivity, startingModuleId: null, t });
		expect(model.isDisabled).toBe(true);
	});
});

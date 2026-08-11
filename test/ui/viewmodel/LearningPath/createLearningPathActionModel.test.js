//test/ui/viewmodel/LearningPath/createLearningPathActionModel.test.js
import { describe, expect, test } from "@jest/globals";
import createLearningPathActionModel from "../../../../src/ui/viewmodel/LearningPath/createLearningPathActionModel.js";

const t = {
	learningPathContinueRoundLabel: (round) => `Continue ${round}`,
	learningPathRetryModuleLabel: "Retry",
	learningPathStartRoundLabel: (round) => `Start ${round}`
};

function createModule(overrides) {
	return {
		id: "module-1",
		availability: { isUnlocked: true },
		progress: { completedRounds: 0, nextRound: 1 },
		...overrides
	};
}

describe("createLearningPathActionModel", () => {
	test("resumes the active session for the same module", () => {
		const model = createLearningPathActionModel({ module: createModule({}), resumableSession: { sessionId: "session-1", moduleId: "module-1" }, nextActivity: { kind: "resume-session", moduleId: "module-1", sessionId: "session-1" }, startingModuleId: null, t });
		expect(model).toEqual({ intent: "resume", moduleId: "module-1", sessionId: "session-1", round: 1, label: "Continue 1", isDisabled: false, isPending: false });
	});

	test("starts the module when there is no matching active session", () => {
		const model = createLearningPathActionModel({ module: createModule({}), resumableSession: null, nextActivity: null, startingModuleId: null, t });
		expect(model).toMatchObject({ intent: "start", moduleId: "module-1", sessionId: null, label: "Start 1", isDisabled: false });
	});

	test("restarts a completed module at round one", () => {
		const module = createModule({ progress: { completedRounds: 3, nextRound: 3 } });
		const model = createLearningPathActionModel({ module, resumableSession: null, nextActivity: null, startingModuleId: null, t });
		expect(model).toMatchObject({ intent: "restart", moduleId: "module-1", sessionId: null, round: 1, label: "Retry", isDisabled: false });
	});

	test("disables a locked module", () => {
		const module = createModule({ availability: { isUnlocked: false } });
		const model = createLearningPathActionModel({ module, resumableSession: null, nextActivity: null, startingModuleId: null, t });
		expect(model.isDisabled).toBe(true);
	});
	test("uses the backend next activity round instead of stale module progress", () => {
		const module = createModule({ progress: { completedRounds: 3, nextRound: 3 } });
		const nextActivity = { kind: "start-round", moduleId: "module-1", round: 1, focus: "practice" };
		const model = createLearningPathActionModel({ module, resumableSession: null, nextActivity, startingModuleId: null, t });

		expect(model).toMatchObject({ intent: "start", moduleId: "module-1", round: 1, label: "Start 1" });
	});

});

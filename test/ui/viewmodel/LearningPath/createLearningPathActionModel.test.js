// test/ui/viewmodel/LearningPath/createLearningPathActionModel.test.js
import { describe, expect, test } from "@jest/globals";
import createLearningPathActionModel from "../../../../src/ui/viewmodel/LearningPath/createLearningPathActionModel.js";

const t = {
	learningPathResumeLabel: "Resume",
	learningPathContinueLabel: "Continue",
	learningPathStartReviewLabel: "Review",
	learningPathStartRepairLabel: "Repair",
	learningPathStartCoverageLabel: "Coverage",
	learningPathReplayModuleLabel: "Take again",
	learningPathContinueReplayLabel: (completed, total) => `Replay ${completed}/${total}`
};
const module = { id: "module-1", isReplayAvailable: false, availability: { isUnlocked: true, isCurrent: true }, progress: { completedSessions: 1, totalSessions: 4 }, currentRun: null };

describe("createLearningPathActionModel", () => {
	test("resumes an active backend session without round state", () => {
		expect(createLearningPathActionModel({ module, resumableSession: { sessionId: "s1", moduleId: "module-1" }, nextActivity: null, startingActionKey: null, canStartLearningSessions: true, t })).toEqual({ intent: "resume", moduleId: "module-1", sessionId: "s1", target: null, label: "Resume", isDisabled: false, isPending: false });
	});

	test("starts a backend-selected authored or adaptive activity through the module target", () => {
		expect(createLearningPathActionModel({ module, resumableSession: null, nextActivity: { kind: "start-authored-session", moduleId: "module-1" }, startingActionKey: null, canStartLearningSessions: true, t })).toMatchObject({ intent: "start", actionKey: "module:module-1:start", target: { kind: "module" }, label: "Continue" });
		expect(createLearningPathActionModel({ module, resumableSession: null, nextActivity: { kind: "start-adaptive-session", moduleId: "module-1", activityKind: "repair" }, startingActionKey: null, canStartLearningSessions: true, t })).toMatchObject({ actionKey: "module:module-1:start", target: { kind: "module" }, label: "Repair" });
	});

	test("lets backend nextActivity win over replay availability", () => {
		const replayAvailableModule = { ...module, isReplayAvailable: true };
		const action = createLearningPathActionModel({ module: replayAvailableModule, resumableSession: null, nextActivity: { kind: "start-adaptive-session", moduleId: "module-1", activityKind: "review", questionCount: 4 }, startingActionKey: null, canStartLearningSessions: true, t });

		expect(action).toMatchObject({ intent: "start", actionKey: "module:module-1:start", target: { kind: "module" }, label: "Review" });
	});

	test("disables start actions when auth does not allow LearningSession creation", () => {
		const action = createLearningPathActionModel({ module, resumableSession: null, nextActivity: { kind: "start-authored-session", moduleId: "module-1" }, startingActionKey: null, canStartLearningSessions: false, t });

		expect(action).toMatchObject({ intent: "start", isDisabled: true });
	});

	test("uses backend replay availability without reconstructing completion", () => {
		const replayAvailable = { ...module, isReplayAvailable: true, progress: { completedSessions: 1, totalSessions: 4 } };
		const replayUnavailable = { ...module, isReplayAvailable: false, progress: { completedSessions: 4, totalSessions: 4 } };

		expect(createLearningPathActionModel({ module: replayAvailable, resumableSession: null, nextActivity: null, startingActionKey: null, canStartLearningSessions: true, t })).toMatchObject({ actionKey: "module:module-1:replay", target: { kind: "module-replay" }, label: "Take again" });
		expect(createLearningPathActionModel({ module: { ...replayAvailable, currentRun: { completedSessions: 2, totalSessions: 4 } }, resumableSession: null, nextActivity: null, startingActionKey: null, canStartLearningSessions: true, t })).toMatchObject({ actionKey: "module:module-1:replay", target: { kind: "module-replay" }, label: "Replay 2/4" });
		expect(createLearningPathActionModel({ module: replayUnavailable, resumableSession: null, nextActivity: null, startingActionKey: null, canStartLearningSessions: true, t })).toBeNull();
	});

	test("fails fast for an unknown adaptive activity kind", () => {
		expect(() => createLearningPathActionModel({ module, resumableSession: null, nextActivity: { kind: "start-adaptive-session", moduleId: "module-1", activityKind: "unknown" }, startingActionKey: null, canStartLearningSessions: true, t })).toThrow("Unknown LearningPath adaptive activity 'unknown'");
	});

	test("does not synthesize a module start when backend nextActivity is null", () => {
		expect(createLearningPathActionModel({ module, resumableSession: null, nextActivity: null, startingActionKey: null, canStartLearningSessions: true, t })).toBeNull();
	});
});

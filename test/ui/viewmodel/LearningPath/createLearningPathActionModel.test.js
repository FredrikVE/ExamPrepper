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
const module = { id: "module-1", availability: { isUnlocked: true, isCurrent: true }, progress: { completedSessions: 1, totalSessions: 4 }, currentRun: null };

describe("createLearningPathActionModel", () => {
	test("resumes an active backend session without round state", () => {
		expect(createLearningPathActionModel({ module, resumableSession: { sessionId: "s1", moduleId: "module-1" }, nextActivity: null, startingModuleId: null, t })).toEqual({ intent: "resume", moduleId: "module-1", sessionId: "s1", target: null, label: "Resume", isDisabled: false, isPending: false });
	});

	test("starts a backend-selected authored or adaptive activity through the module target", () => {
		expect(createLearningPathActionModel({ module, resumableSession: null, nextActivity: { kind: "start-authored-session", moduleId: "module-1" }, startingModuleId: null, t })).toMatchObject({ intent: "start", target: { kind: "module" }, activityKind: "authored", label: "Continue" });
		expect(createLearningPathActionModel({ module, resumableSession: null, nextActivity: { kind: "start-adaptive-session", moduleId: "module-1", activityKind: "repair" }, startingModuleId: null, t })).toMatchObject({ target: { kind: "module" }, activityKind: "repair", label: "Repair" });
	});

	test("uses the explicit replay target for a historically completed module", () => {
		const completed = { ...module, progress: { completedSessions: 4, totalSessions: 4 } };
		expect(createLearningPathActionModel({ module: completed, resumableSession: null, nextActivity: null, startingModuleId: null, t })).toMatchObject({ target: { kind: "module-replay" }, label: "Take again" });
		expect(createLearningPathActionModel({ module: { ...completed, currentRun: { completedSessions: 2, totalSessions: 4 } }, resumableSession: null, nextActivity: null, startingModuleId: null, t })).toMatchObject({ target: { kind: "module-replay" }, label: "Replay 2/4" });
	});
});

import { describe, expect, test } from "@jest/globals";
import createLearningPathActionModel from "../../../../src/ui/viewmodel/LearningPath/createLearningPathActionModel.js";
const t = { learningPathResumeLabel: "Resume", learningPathStartLabel: "Start", learningPathContinueLabel: "Continue", learningPathStartReviewLabel: "Review", learningPathStartRepairLabel: "Repair", learningPathStartCoverageLabel: "Coverage" };
const module = { id: "module-1", availability: { isUnlocked: true, isCurrent: true } };

describe("createLearningPathActionModel", () => {
	test("resumes an active backend session without round state", () => {
		expect(createLearningPathActionModel({ module, resumableSession: { sessionId: "s1", moduleId: "module-1" }, nextActivity: null, startingModuleId: null, t })).toEqual({ intent: "resume", moduleId: "module-1", sessionId: "s1", label: "Resume", isDisabled: false, isPending: false });
	});
	test("starts a backend-selected authored or adaptive activity", () => {
		expect(createLearningPathActionModel({ module, resumableSession: null, nextActivity: { kind: "start-authored-session", moduleId: "module-1" }, startingModuleId: null, t })).toMatchObject({ intent: "start", activityKind: "authored", label: "Continue" });
		expect(createLearningPathActionModel({ module, resumableSession: null, nextActivity: { kind: "start-adaptive-session", moduleId: "module-1", activityKind: "repair" }, startingModuleId: null, t })).toMatchObject({ activityKind: "repair", label: "Repair" });
	});
	test("keeps the backend-current module actionable when the read response has no nextActivity", () => {
		expect(createLearningPathActionModel({ module, resumableSession: null, nextActivity: null, startingModuleId: null, t })).toEqual({ intent: "start", moduleId: "module-1", sessionId: null, activityKind: null, label: "Continue", isDisabled: false, isPending: false });
		expect(createLearningPathActionModel({ module: { ...module, availability: { isUnlocked: true, isCurrent: false } }, resumableSession: null, nextActivity: null, startingModuleId: null, t })).toBeNull();
	});
});

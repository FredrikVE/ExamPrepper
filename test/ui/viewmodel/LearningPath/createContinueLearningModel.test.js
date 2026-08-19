// test/ui/viewmodel/LearningPath/createContinueLearningModel.test.js
import { describe, expect, test } from "@jest/globals";
import createContinueLearningModel from "../../../../src/ui/viewmodel/LearningPath/createContinueLearningModel.js";
const t = { learningPathResumeTitle: "Resume", learningPathResumeBody: (p,t,q)=>`${p}:${t}:${q}`, learningPathResumeLabel: "Resume path", learningPathContinueTitle: "Continue where you left off", learningPathContinueBody: (p,t)=>`${p}:${t}:continue`, learningPathContinueNowLabel: "Continue now", learningPathReviewBody: ()=>"review", learningPathRepairBody: ()=>"repair", learningPathCoverageBody: ()=>"coverage" };
const entry = (actionModel) => ({ position: 1, title: "Concepts", actionModel });

describe("createContinueLearningModel", () => {
	test("presents the active backend module as the stable continue surface", () => {
		const actionModel = { intent: "start", label: "Continue" };
		expect(createContinueLearningModel({ activeEntry: entry(actionModel), resumableSession: null, nextActivity: { kind: "start-authored-session" }, t })).toMatchObject({ title: "Continue where you left off", description: "1:Concepts:continue", buttonLabel: "Continue now", actionModel });
	});
	test("keeps the continue surface visible when the read response has no nextActivity", () => {
		const actionModel = { intent: "start", label: "Continue" };
		expect(createContinueLearningModel({ activeEntry: entry(actionModel), resumableSession: null, nextActivity: null, t })).toMatchObject({ isVisible: true, title: "Continue where you left off", description: "1:Concepts:continue", buttonLabel: "Continue now", actionModel });
	});
	test("presents adaptive kind without deriving policy", () => {
		const actionModel = { intent: "start", label: "Repair" };
		expect(createContinueLearningModel({ activeEntry: entry(actionModel), resumableSession: null, nextActivity: { kind: "start-adaptive-session", activityKind: "repair" }, t }).description).toBe("repair");
	});
});

//test/ui/viewmodel/LearningSessionPageRetry.test.js
import { describe, expect, test } from "@jest/globals";
import sessionReducer, { createInitialSessionState, SESSION_ACTIONS } from "../../../src/ui/viewmodel/LearningSession/sessionReducer.js";

describe("LearningSession submit retry", () => {
	test("preserves local answers and results after a temporary submit failure", () => {
		const state = { ...createInitialSessionState(), sessionId: "session-1", answersBySessionQuestionId: { q1: "answer" }, resultsBySessionQuestionId: { q1: { isCorrect: true } }, submitStatus: "submitting" };
		const failed = sessionReducer(state, { type: SESSION_ACTIONS.SUBMIT_FAILED, errorMessage: "temporary" });
		expect(failed.answersBySessionQuestionId).toEqual(state.answersBySessionQuestionId);
		expect(failed.resultsBySessionQuestionId).toEqual(state.resultsBySessionQuestionId);
		expect(failed.submitStatus).toBe("failed");
	});
});

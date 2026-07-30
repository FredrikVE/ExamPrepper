//test/ui/viewmodel/LearningSessionReducer.test.js
import { describe, expect, test } from "@jest/globals";
import sessionReducer, { createInitialSessionState, SESSION_ACTIONS } from "../../../src/ui/viewmodel/LearningSession/sessionReducer.js";

describe("learning session reducer", () => {
	test("loads asynchronous questions through SESSION_LOADED", () => {
		const state = sessionReducer(createInitialSessionState(), { type: SESSION_ACTIONS.SESSION_LOADED, session: { sessionId: "s1", questions: [{ sessionQuestionId: "q1", question: { options: [] } }] } });
		expect(state.sessionId).toBe("s1");
		expect(state.questions).toHaveLength(1);
	});

	test("stores complete grading result and preserves answers on submit failure", () => {
		let state = { ...createInitialSessionState(), answersBySessionQuestionId: { q1: "answer" } };
		state = sessionReducer(state, { type: SESSION_ACTIONS.ANSWER_CHECKED, sessionQuestionId: "q1", result: { isCorrect: false, pointsAwarded: 0.5, maxPoints: 1 } });
		state = sessionReducer(state, { type: SESSION_ACTIONS.SUBMIT_FAILED, errorMessage: "failed" });
		expect(state.resultsBySessionQuestionId.q1).toEqual({ isCorrect: false, pointsAwarded: 0.5, maxPoints: 1 });
		expect(state.answersBySessionQuestionId.q1).toBe("answer");
	});

	test("throws for unknown actions", () => {
		expect(() => sessionReducer(createInitialSessionState(), { type: "missing" })).toThrow("Unknown learning session action");
	});
});

//test/ui/viewmodel/LearningSessionReducer.test.js
import { describe, expect, test } from "@jest/globals";
import sessionReducer, { createInitialSessionState, SESSION_ACTIONS } from "../../../src/ui/viewmodel/LearningSession/sessionReducer.js";

describe("learning session reducer", () => {
	test("loads asynchronous questions through SESSION_LOADED", () => {
		const state = sessionReducer(createInitialSessionState(), { type: SESSION_ACTIONS.SESSION_LOADED, session: { sessionId: "s1", moduleId: "m1", modulePosition: 1, moduleTitle: "Concepts", round: 1, questions: [{ sessionQuestionId: "q1", question: { options: [] } }] } });
		expect(state.sessionId).toBe("s1");
		expect(state.questions).toHaveLength(1);
		expect(state).toMatchObject({ status: "answering", modulePosition: 1, moduleTitle: "Concepts", round: 1 });
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
	test("moves through explicit answering, checked, submitting and completed states", () => {
		let state = sessionReducer(createInitialSessionState(), { type: SESSION_ACTIONS.SESSION_LOADED, session: { sessionId: "s1", moduleId: "m1", modulePosition: 1, moduleTitle: "Concepts", round: 1, questions: [{ sessionQuestionId: "q1", question: { options: [] } }] } });
		state = sessionReducer(state, { type: SESSION_ACTIONS.ANSWER_CHECKED, sessionQuestionId: "q1", result: { isCorrect: true, pointsAwarded: 1, maxPoints: 1 } });
		expect(state.status).toBe("checked");
		state = sessionReducer(state, { type: SESSION_ACTIONS.SUBMIT_STARTED });
		expect(state.status).toBe("submitting");
		state = sessionReducer(state, { type: SESSION_ACTIONS.SUBMIT_SUCCEEDED, result: { score: {}, moduleProgress: {} } });
		expect(state.status).toBe("completed");
	});

	test("opens a combo reward only when another question remains", () => {
		const questions = Array.from({ length: 4 }, (_value, index) => ({ sessionQuestionId: `q${index + 1}`, question: { options: [] } }));
		const state = { ...createInitialSessionState(), questions, currentIndex: 2, combo: 2, xp: 20 };
		const nextState = sessionReducer(state, { type: SESSION_ACTIONS.ANSWER_CHECKED, sessionQuestionId: "q3", result: { isCorrect: true, pointsAwarded: 1, maxPoints: 1 } });

		expect(nextState).toMatchObject({ combo: 3, xp: 30, pendingRewardKind: "combo" });
	});

	test("does not interrupt the final question with a combo reward", () => {
		const questions = Array.from({ length: 3 }, (_value, index) => ({ sessionQuestionId: `q${index + 1}`, question: { options: [] } }));
		const state = { ...createInitialSessionState(), questions, currentIndex: 2, combo: 2, xp: 20 };
		const nextState = sessionReducer(state, { type: SESSION_ACTIONS.ANSWER_CHECKED, sessionQuestionId: "q3", result: { isCorrect: true, pointsAwarded: 1, maxPoints: 1 } });

		expect(nextState).toMatchObject({ combo: 3, xp: 30, pendingRewardKind: null });
	});

});

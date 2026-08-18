import { describe, expect, test } from "@jest/globals";
import sessionReducer, { createInitialSessionState, SESSION_ACTIONS } from "../../../src/ui/viewmodel/LearningSession/sessionReducer.js";

describe("learning session reducer", () => {
	test("loads activity metadata without round progression", () => {
		const state = sessionReducer(createInitialSessionState(), { type: SESSION_ACTIONS.SESSION_LOADED, session: { sessionId: "s1", moduleId: "m1", modulePosition: 1, moduleTitle: "Concepts", activityKind: "authored", questions: [{ sessionQuestionId: "q1", question: { options: [] } }] } });
		expect(state).toMatchObject({ status: "answering", activityKind: "authored", moduleTitle: "Concepts" });
		expect(state).not.toHaveProperty("round");
	});
	test("preserves answers on submit failure", () => {
		let state = { ...createInitialSessionState(), answersBySessionQuestionId: { q1: "answer" } };
		state = sessionReducer(state, { type: SESSION_ACTIONS.SUBMIT_FAILED, errorMessage: "failed" });
		expect(state.answersBySessionQuestionId.q1).toBe("answer");
	});
});

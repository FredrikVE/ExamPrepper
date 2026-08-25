// test/ui/viewmodel/LearningSessionPageRetry.test.js
import { describe, expect, test } from "@jest/globals";
import sessionReducer, { createInitialSessionState, SESSION_ACTIONS } from "../../../src/ui/viewmodel/LearningSession/sessionReducer.js";

describe("LearningSession submit retry", () => {
	test("preserves local answers and results after a temporary submit failure", () => {
		const loaded = sessionReducer(createInitialSessionState(), {
			type: SESSION_ACTIONS.SESSION_LOADED,
			session: {
				sessionId: "session-1",
				moduleId: "module-1",
				modulePosition: 1,
				moduleTitle: "Concepts",
				activityKind: "authored",
				questions: []
			}
		});
		const state = {
			status: "submitting",
			session: {
				...loaded.session,
				answersBySessionQuestionId: { q1: "answer" },
				resultsBySessionQuestionId: { q1: { isCorrect: true } }
			}
		};

		const failed = sessionReducer(state, {
			type: SESSION_ACTIONS.SUBMIT_FAILED,
			errorMessage: "temporary"
		});

		expect(failed.session.answersBySessionQuestionId).toEqual(state.session.answersBySessionQuestionId);
		expect(failed.session.resultsBySessionQuestionId).toEqual(state.session.resultsBySessionQuestionId);
		expect(failed.status).toBe("submitFailed");
		expect(failed.errorMessage).toBe("temporary");
	});
});

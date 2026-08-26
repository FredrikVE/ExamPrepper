import { describe, expect, test } from "@jest/globals";
import sessionReducer, { createInitialSessionState, SESSION_ACTIONS } from "../../../src/ui/viewmodel/LearningSession/sessionReducer.js";

function createLoadedState() {
	return sessionReducer(createInitialSessionState(), {
		type: SESSION_ACTIONS.SESSION_LOADED,
		session: {
			sessionId: "s1",
			moduleId: "m1",
			modulePosition: 1,
			moduleTitle: "Concepts",
			questions: [
				{
					sessionQuestionId: "q1",
					question: {
						options: [{ id: "a" }, { id: "b" }]
					}
				},
				{
					sessionQuestionId: "q2",
					question: {
						options: []
					}
				}
			]
		}
	});
}

describe("learning session reducer", () => {
	test("represents loading without nullable session placeholders", () => {
		expect(createInitialSessionState()).toEqual({
			status: "loading"
		});
	});

	test("represents load failure without pretending a session exists", () => {
		const state = sessionReducer(createInitialSessionState(), {
			type: SESSION_ACTIONS.LOAD_FAILED,
			errorMessage: "Could not load"
		});

		expect(state).toEqual({
			status: "loadFailed",
			errorMessage: "Could not load"
		});
	});

	test("loads complete session data and resets transient state", () => {
		const state = createLoadedState();

		expect(state).toEqual({
			status: "answering",
			session: {
				sessionId: "s1",
				moduleId: "m1",
				modulePosition: 1,
				moduleTitle: "Concepts",
					questions: expect.any(Array),
				currentIndex: 0,
				answersBySessionQuestionId: {},
				resultsBySessionQuestionId: {},
				answerOptionOrderBySessionQuestionId: {
					q1: [0, 1],
					q2: null
				},
				combo: 0,
				xp: 0,
				pendingRewardKind: null,
				scrollToTopRequestId: 0
			}
		});

		expect(state).not.toHaveProperty("submitStatus");
		expect(state).not.toHaveProperty("submitResult");
		expect(state).not.toHaveProperty("submitErrorMessage");
	});

	test("records checked answer, awards xp, and surfaces every third combo before the final question", () => {
		const loaded = createLoadedState();
		const state = {
			...loaded,
			session: {
				...loaded.session,
				questions: [{}, {}, {}, {}],
				currentIndex: 2,
				combo: 2,
				xp: 10,
				resultsBySessionQuestionId: {
					q1: {
						isCorrect: true
					}
				}
			}
		};

		const result = {
			isCorrect: true,
			pointsAwarded: 2
		};

		const checked = sessionReducer(state, {
			type: SESSION_ACTIONS.ANSWER_CHECKED,
			sessionQuestionId: "q3",
			result
		});

		expect(checked).toMatchObject({
			status: "checked",
			session: {
				combo: 3,
				xp: 30,
				pendingRewardKind: "combo"
			}
		});

		expect(checked.session.resultsBySessionQuestionId).toEqual({
			q1: {
				isCorrect: true
			},
			q3: result
		});
	});

	test("wrong checked answer resets combo without replacing previous results", () => {
		const loaded = createLoadedState();
		const state = {
			...loaded,
			session: {
				...loaded.session,
				combo: 2,
				resultsBySessionQuestionId: {
					q1: {
						isCorrect: true
					}
				}
			}
		};

		const checked = sessionReducer(state, {
			type: SESSION_ACTIONS.ANSWER_CHECKED,
			sessionQuestionId: "q2",
			result: {
				isCorrect: false,
				pointsAwarded: 0
			}
		});

		expect(checked.session.combo).toBe(0);
		expect(checked.session.pendingRewardKind).toBeNull();
		expect(checked.session.resultsBySessionQuestionId.q1).toEqual({
			isCorrect: true
		});
	});

	test("continues to the next question and clears pending reward state", () => {
		const loaded = createLoadedState();
		const state = {
			status: "checked",
			session: {
				...loaded.session,
				currentIndex: 0,
				pendingRewardKind: "combo",
				scrollToTopRequestId: 4
			}
		};

		const continued = sessionReducer(state, {
			type: SESSION_ACTIONS.CONTINUED
		});

		expect(continued).toMatchObject({
			status: "answering",
			session: {
				currentIndex: 1,
				pendingRewardKind: null,
				scrollToTopRequestId: 5
			}
		});
	});

	test("represents submit progress with the lifecycle status only", () => {
		const state = sessionReducer(createLoadedState(), {
			type: SESSION_ACTIONS.SUBMIT_STARTED
		});

		expect(state).toMatchObject({
			status: "submitting",
			session: {
				sessionId: "s1"
			}
		});
		expect(state).not.toHaveProperty("submitStatus");
	});

	test("completes the session only after submit succeeds", () => {
		const submitting = sessionReducer(createLoadedState(), {
			type: SESSION_ACTIONS.SUBMIT_STARTED
		});
		const result = {
			score: {
				percentage: 100
			}
		};

		const completed = sessionReducer(submitting, {
			type: SESSION_ACTIONS.SUBMIT_SUCCEEDED,
			result
		});

		expect(completed).toMatchObject({
			status: "completed",
			session: {
				currentIndex: 2,
				pendingRewardKind: null
			},
			result
		});
		expect(completed).not.toHaveProperty("submitResult");
	});

	test("preserves session data on submit failure and removes the error on retry", () => {
		const loaded = createLoadedState();
		const answered = {
			...loaded,
			session: {
				...loaded.session,
				answersBySessionQuestionId: {
					q1: "answer"
				}
			}
		};

		const failed = sessionReducer(answered, {
			type: SESSION_ACTIONS.SUBMIT_FAILED,
			errorMessage: "failed"
		});

		expect(failed).toMatchObject({
			status: "submitFailed",
			errorMessage: "failed",
			session: {
				answersBySessionQuestionId: {
					q1: "answer"
				}
			}
		});

		const retrying = sessionReducer(failed, {
			type: SESSION_ACTIONS.SUBMIT_STARTED
		});

		expect(retrying.status).toBe("submitting");
		expect(retrying).not.toHaveProperty("errorMessage");
		expect(retrying.session.answersBySessionQuestionId.q1).toBe("answer");
	});

	test("fails fast when a session action is dispatched before loading", () => {
		expect(() => {
			sessionReducer(createInitialSessionState(), {
				type: SESSION_ACTIONS.CONTINUED
			});
		}).toThrow("Learning session action requires loaded session: continued");
	});

	test("fails fast for unknown actions", () => {
		expect(() => {
			sessionReducer(createInitialSessionState(), {
				type: "unexpected"
			});
		}).toThrow("Unknown learning session action: unexpected");
	});
});

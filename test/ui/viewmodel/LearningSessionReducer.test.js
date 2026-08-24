import { describe, expect, test } from "@jest/globals";
import sessionReducer, { createInitialSessionState, SESSION_ACTIONS } from "../../../src/ui/viewmodel/LearningSession/sessionReducer.js";

describe("learning session reducer", () => {
	test("loads session metadata and resets transient session state", () => {
		const previousState = {
			...createInitialSessionState(),
			combo: 3,
			xp: 50,
			pendingRewardKind: "combo",
			submitStatus: "failed",
			submitErrorMessage: "temporary"
		};

		const session = {
			sessionId: "s1",
			moduleId: "m1",
			modulePosition: 1,
			moduleTitle: "Concepts",
			activityKind: "authored",
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
		};

		const state = sessionReducer(previousState, {
			type: SESSION_ACTIONS.SESSION_LOADED,
			session
		});

		expect(state).toMatchObject({
			status: "answering",
			sessionId: "s1",
			moduleId: "m1",
			modulePosition: 1,
			moduleTitle: "Concepts",
			activityKind: "authored",
			combo: 0,
			xp: 0,
			pendingRewardKind: null,
			submitStatus: "idle",
			submitErrorMessage: null,
			answerOptionOrderBySessionQuestionId: {
				q1: [0, 1],
				q2: null
			}
		});

		expect(state).not.toHaveProperty("round");
	});

	test("records checked answer, awards xp, and surfaces every third combo before the final question", () => {
		const state = {
			...createInitialSessionState(),
			status: "answering",
			questions: [{}, {}, {}, {}],
			currentIndex: 2,
			combo: 2,
			xp: 10,
			resultsBySessionQuestionId: {
				q1: {
					isCorrect: true
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
			combo: 3,
			xp: 30,
			pendingRewardKind: "combo"
		});

		expect(checked.resultsBySessionQuestionId).toEqual({
			q1: {
				isCorrect: true
			},
			q3: result
		});
	});

	test("wrong checked answer resets combo without replacing previous results", () => {
		const state = {
			...createInitialSessionState(),
			questions: [{}, {}],
			combo: 2,
			resultsBySessionQuestionId: {
				q1: {
					isCorrect: true
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

		expect(checked.combo).toBe(0);
		expect(checked.pendingRewardKind).toBeNull();
		expect(checked.resultsBySessionQuestionId.q1).toEqual({
			isCorrect: true
		});
	});

	test("continues to the next question and clears pending reward state", () => {
		const state = {
			...createInitialSessionState(),
			status: "checked",
			currentIndex: 1,
			pendingRewardKind: "combo",
			scrollToTopRequestId: 4
		};

		const continued = sessionReducer(state, {
			type: SESSION_ACTIONS.CONTINUED
		});

		expect(continued).toMatchObject({
			status: "answering",
			currentIndex: 2,
			pendingRewardKind: null,
			scrollToTopRequestId: 5
		});
	});

	test("preserves answers on submit failure", () => {
		const state = {
			...createInitialSessionState(),
			answersBySessionQuestionId: {
				q1: "answer"
			}
		};

		const failed = sessionReducer(state, {
			type: SESSION_ACTIONS.SUBMIT_FAILED,
			errorMessage: "failed"
		});

		expect(failed).toMatchObject({
			status: "error",
			submitStatus: "failed",
			submitErrorMessage: "failed"
		});

		expect(failed.answersBySessionQuestionId.q1).toBe("answer");
	});

	test("fails fast for unknown actions", () => {
		expect(() => {
			sessionReducer(createInitialSessionState(), {
				type: "unexpected"
			});
		}).toThrow("Unknown learning session action: unexpected");
	});
});

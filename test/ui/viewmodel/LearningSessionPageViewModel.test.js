// test/ui/viewmodel/LearningSessionPageViewModel.test.js
import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import { QUESTION_TYPES } from "../../../src/constants/QuestionTypes.js";
import { LANGUAGES, translations } from "../../../src/i18n/translations.js";
import sessionReducer, { createInitialSessionState, SESSION_ACTIONS } from "../../../src/ui/viewmodel/LearningSession/sessionReducer.js";

const dispatch = jest.fn();
let reducerState;

const useCallback = jest.fn((callback) => callback);
const useEffect = jest.fn();
const useReducer = jest.fn(() => [reducerState, dispatch]);

jest.unstable_mockModule("react", () => ({ useCallback, useEffect, useReducer }));

const { default: useLearningSessionPageViewModel } = await import("../../../src/ui/viewmodel/LearningSessionPageViewModel.js");

const t = translations[LANGUAGES.EN];

const question = {
	type: QUESTION_TYPES.FILL,
	points: 1,
	acceptedAnswers: ["discount rate"]
};

function createViewModel({ gradeAnswerUseCase, submitLearningSessionUseCase }) {
	return useLearningSessionPageViewModel({
		getLearningSessionUseCase: { execute: jest.fn() },
		submitLearningSessionUseCase,
		gradeAnswerUseCase,
		sessionId: "session-1",
		t,
		isActive: true,
		backContract: { onBack: jest.fn() }
	});
}

function createLoadedReducerState(loadedQuestion = question) {
	const state = sessionReducer(createInitialSessionState(), {
		type: SESSION_ACTIONS.SESSION_LOADED,
		session: {
			sessionId: "session-1",
			moduleId: "module-1",
			modulePosition: 1,
			moduleTitle: "Concepts",
			activityKind: "authored",
			questions: [{ sessionQuestionId: "session-question-1", question: loadedQuestion }]
		}
	});

	return {
		...state,
		session: {
			...state.session,
			answersBySessionQuestionId: { "session-question-1": "discount rat" }
		}
	};
}

describe("useLearningSessionPageViewModel behavior", () => {
	beforeEach(() => {
		dispatch.mockClear();
		useCallback.mockClear();
		useEffect.mockClear();
		useReducer.mockClear();
		reducerState = createLoadedReducerState();
	});

	test("preserves fuzzy fill feedback in the checked answer result", () => {
		const gradeAnswerUseCase = {
			execute: jest.fn(() => true),
			getQuestionScore: jest.fn(() => 1),
			getFillMatchType: jest.fn(() => "fuzzy")
		};

		const viewModel = createViewModel({
			gradeAnswerUseCase,
			submitLearningSessionUseCase: { execute: jest.fn() }
		});

		viewModel.actionPanelModel.onPrimaryPressed();

		expect(dispatch).toHaveBeenCalledWith({
			type: SESSION_ACTIONS.ANSWER_CHECKED,
			sessionQuestionId: "session-question-1",
			result: {
				isCorrect: true,
				pointsAwarded: 1,
				maxPoints: 1,
				fillMatchType: "fuzzy"
			}
		});
	});

	test("keeps the final question and action panel visible while submit is pending", () => {
		reducerState = {
			status: "submitting",
			session: {
				...reducerState.session,
				resultsBySessionQuestionId: {
					"session-question-1": {
						isCorrect: true,
						pointsAwarded: 1,
						maxPoints: 1,
						fillMatchType: "fuzzy"
					}
				}
			}
		};

		const viewModel = createViewModel({
			gradeAnswerUseCase: {
				execute: jest.fn(),
				getQuestionScore: jest.fn(),
				getFillMatchType: jest.fn()
			},
			submitLearningSessionUseCase: { execute: jest.fn() }
		});

		expect(viewModel.questionCardModel).not.toBeNull();
		expect(viewModel.actionPanelModel).toMatchObject({
			primaryLabel: t.learningSessionSubmittingLabel,
			isPrimaryDisabled: true
		});
		expect(viewModel.isSessionComplete).toBe(false);
	});

	test("serializes answers before submitting the LearningSession", () => {
		const choiceQuestion = {
			type: QUESTION_TYPES.SINGLE,
			points: 1,
			options: [
				{ id: "option-a" },
				{ id: "option-b" }
			]
		};

		reducerState = createLoadedReducerState(choiceQuestion);
		reducerState = {
			...reducerState,
			session: {
				...reducerState.session,
				answersBySessionQuestionId: { "session-question-1": 1 },
				resultsBySessionQuestionId: {
					"session-question-1": {
						isCorrect: true,
						pointsAwarded: 1,
						maxPoints: 1,
						fillMatchType: "none"
					}
				}
			}
		};

		const submitLearningSessionUseCase = {
			execute: jest.fn(() => new Promise(() => {}))
		};

		const viewModel = createViewModel({
			gradeAnswerUseCase: {
				execute: jest.fn(),
				getQuestionScore: jest.fn(),
				getFillMatchType: jest.fn()
			},
			submitLearningSessionUseCase
		});

		viewModel.actionPanelModel.onPrimaryPressed();

		expect(dispatch).toHaveBeenCalledWith({
			type: SESSION_ACTIONS.SUBMIT_STARTED
		});
		expect(dispatch).not.toHaveBeenCalledWith({
			type: SESSION_ACTIONS.CONTINUED
		});
		expect(submitLearningSessionUseCase.execute).toHaveBeenCalledWith({
			sessionId: "session-1",
			answers: [
				{
					sessionQuestionId: "session-question-1",
					answer: "option-b"
				}
			]
		});
	});
});

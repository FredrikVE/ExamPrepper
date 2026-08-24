import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import { QUESTION_TYPES } from "../../../src/constants/QuestionTypes.js";
import { LANGUAGES, translations } from "../../../src/i18n/translations.js";
import { createInitialSessionState, SESSION_ACTIONS } from "../../../src/ui/viewmodel/LearningSession/sessionReducer.js";

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
	answers: ["discount rate"]
};

function createViewModel(gradeAnswerUseCase) {
	return useLearningSessionPageViewModel({
		getLearningSessionUseCase: { execute: jest.fn() },
		submitLearningSessionUseCase: { execute: jest.fn() },
		gradeAnswerUseCase,
		sessionId: "session-1",
		t,
		isActive: true,
		backContract: { onBack: jest.fn() }
	});
}

describe("useLearningSessionPageViewModel checked answer result", () => {
	beforeEach(() => {
		dispatch.mockClear();
		useCallback.mockClear();
		useEffect.mockClear();
		useReducer.mockClear();

		reducerState = {
			...createInitialSessionState(),
			sessionId: "session-1",
			modulePosition: 1,
			moduleTitle: "Concepts",
			activityKind: "authored",
			questions: [{ sessionQuestionId: "session-question-1", question }],
			answersBySessionQuestionId: { "session-question-1": "discount rat" }
		};
	});

	test("preserves fuzzy fill feedback in the checked answer result", () => {
		const gradeAnswerUseCase = {
			execute: jest.fn(() => true),
			getQuestionScore: jest.fn(() => 1),
			getFillMatchType: jest.fn(() => "fuzzy")
		};

		const viewModel = createViewModel(gradeAnswerUseCase);

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
});

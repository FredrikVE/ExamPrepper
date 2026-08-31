// test/ui/viewmodel/LearningSessionPageViewModel.test.js
import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import { QUESTION_TYPES } from "../../../src/constants/QuestionTypes.js";
import { LANGUAGES, translations } from "../../../src/i18n/translations.js";
import sessionReducer, { createInitialSessionState, SESSION_ACTIONS } from "../../../src/ui/viewmodel/LearningSession/sessionReducer.js";

const dispatch = jest.fn();
let reducerState;

const useCallback = jest.fn((callback) => callback);
const useMemo = jest.fn((factory) => factory());
const useReducer = jest.fn(() => [reducerState, dispatch]);
const useLoadModel = jest.fn();
const useMatchCardsRoundModel = jest.fn();

jest.unstable_mockModule("react", () => ({ useCallback, useMemo, useReducer }));
jest.unstable_mockModule("../../../src/ui/viewmodel/LoadState/useLoadModel.js", () => ({ default: useLoadModel }));
jest.unstable_mockModule("../../../src/ui/viewmodel/MatchCards/useMatchCardsRoundModel.js", () => ({ default: useMatchCardsRoundModel }));

const { default: useLearningSessionPageViewModel } = await import("../../../src/ui/viewmodel/LearningSessionPageViewModel.js");

const t = translations[LANGUAGES.EN];
const MATCH_CARDS_TASK = {
	pairs: [
		{
			glossaryEntryKey: "glossary-a",
			term: { no: "Begrep A", en: "Concept A" },
			explanation: { no: "Forklaring A", en: "Explanation A" }
		},
		{
			glossaryEntryKey: "glossary-b",
			term: { no: "Begrep B", en: "Concept B" },
			explanation: { no: "Forklaring B", en: "Explanation B" }
		}
	]
};

const question = {
	type: QUESTION_TYPES.FILL,
	points: 1,
	acceptedAnswers: ["discount rate"]
};

function createCompletedMatchCardsRoundModel() {
	return {
		session: {},
		termSlots: [],
		explanationSlots: [],
		boardStyle: {},
		isInteractionLocked: false,
		isRoundComplete: true,
		selectSlot: jest.fn()
	};
}

function createViewModel({ gradeAnswerUseCase, submitLearningSessionUseCase }) {
	return useLearningSessionPageViewModel({
		getLearningSessionUseCase: { execute: jest.fn() },
		submitLearningSessionUseCase,
		gradeAnswerUseCase,
		sessionId: "session-1",
		language: LANGUAGES.EN,
		t,
		backContract: { onBack: jest.fn() },
		authScopeKey: "user:user-1"
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
			matchCardsTask: MATCH_CARDS_TASK,
			questions: [{ sessionQuestionId: "session-question-1", question: loadedQuestion }]
		}
	});

	return {
		...state,
		session: {
			...state.session,
			matchCardResults: MATCH_CARDS_TASK.pairs.map((pair) => ({
				glossaryEntryKey: pair.glossaryEntryKey,
				wrongAttemptCount: 0
			})),
			answersBySessionQuestionId: { "session-question-1": "discount rat" }
		}
	};
}

describe("useLearningSessionPageViewModel behavior", () => {
	beforeEach(() => {
		dispatch.mockClear();
		useCallback.mockClear();
		useMemo.mockClear();
		useReducer.mockClear();
		useLoadModel.mockReset();
		useLoadModel.mockReturnValue({ status: "ready", error: null });
		useMatchCardsRoundModel.mockReset();
		useMatchCardsRoundModel.mockReturnValue(createCompletedMatchCardsRoundModel());
		reducerState = createLoadedReducerState();
	});

	test("loads technical session state through useLoadModel with auth-scoped identity", () => {
		let loadInput = null;
		useLoadModel.mockImplementation((input) => {
			loadInput = input;
			return { status: "ready", error: null };
		});

		createViewModel({
			gradeAnswerUseCase: { execute: jest.fn(), getQuestionScore: jest.fn(), getFillMatchType: jest.fn() },
			submitLearningSessionUseCase: { execute: jest.fn() }
		});

		expect(loadInput.resourceKey).toBe("session-1:user:user-1");
		expect(loadInput.isEnabled).toBe(true);
		expect(loadInput.emptyData).toBeNull();

		const loadedData = { sessionId: "session-1" };
		loadInput.onLoaded({ loadedData });

		expect(dispatch).toHaveBeenCalledWith({
			type: SESSION_ACTIONS.SESSION_LOADED,
			session: loadedData
		});
	});

	test("uses recorded MatchCards results as progression truth instead of visual round timing", () => {
		useMatchCardsRoundModel.mockReturnValue({
			session: {},
			termSlots: [],
			explanationSlots: [],
			boardStyle: {},
			isInteractionLocked: true,
			isRoundComplete: false,
			selectSlot: jest.fn()
		});

		const viewModel = createViewModel({
			gradeAnswerUseCase: { execute: jest.fn(), getQuestionScore: jest.fn(), getFillMatchType: jest.fn() },
			submitLearningSessionUseCase: { execute: jest.fn() }
		});

		expect(viewModel.matchCardsModel).toBeNull();
		expect(viewModel.questionCardModel).not.toBeNull();
		expect(viewModel.actionPanelModel).not.toBeNull();
	});

	test("starts with MatchCards and hides question actions until the round is complete", () => {
		reducerState = {
			...reducerState,
			session: {
				...reducerState.session,
				matchCardResults: []
			}
		};
		const selectSlot = jest.fn();
		useMatchCardsRoundModel.mockReturnValue({
			session: {},
			termSlots: [{ slotId: "term-a" }],
			explanationSlots: [{ slotId: "explanation-a" }],
			boardStyle: { "--matchcards-visible-pair-count": 2 },
			isInteractionLocked: false,
			isRoundComplete: false,
			selectSlot
		});

		const viewModel = createViewModel({
			gradeAnswerUseCase: { execute: jest.fn(), getQuestionScore: jest.fn(), getFillMatchType: jest.fn() },
			submitLearningSessionUseCase: { execute: jest.fn() }
		});

		expect(viewModel.matchCardsModel).toMatchObject({
			termSlots: [{ slotId: "term-a" }],
			explanationSlots: [{ slotId: "explanation-a" }],
			isInteractionLocked: false,
			onSelectSlot: selectSlot
		});
		expect(viewModel.questionCardModel).toBeNull();
		expect(viewModel.actionPanelModel).toBeNull();
		expect(viewModel.currentQuestionRenderKey).toBeNull();
		expect(viewModel.headerModel.counterLabel).toBe(t.learningSessionMatchCardsCounter);
		expect(viewModel.progressBarModel.points.at(-1).label).toBe(t.learningSessionProgressStepLabel(2, 2));
		expect(viewModel.progressBarModel.fillPercent).toBe(0);
	});

	test("records a successful MatchCards pair through the LearningSession reducer", () => {
		let roundModelInput = null;
		useMatchCardsRoundModel.mockImplementation((input) => {
			roundModelInput = input;
			return createCompletedMatchCardsRoundModel();
		});
		createViewModel({
			gradeAnswerUseCase: { execute: jest.fn(), getQuestionScore: jest.fn(), getFillMatchType: jest.fn() },
			submitLearningSessionUseCase: { execute: jest.fn() }
		});
		const result = { glossaryEntryKey: "glossary-a", wrongAttemptCount: 2 };

		roundModelInput.onSuccessfulMatch(result);

		expect(roundModelInput.glossaryEntries).toEqual(MATCH_CARDS_TASK.pairs);
		expect(roundModelInput.roundPairCount).toBe(MATCH_CARDS_TASK.pairs.length);
		expect(dispatch).toHaveBeenCalledWith({
			type: SESSION_ACTIONS.MATCH_CARD_RESULT_RECORDED,
			result
		});
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

		expect(viewModel.matchCardsModel).toBeNull();
		expect(viewModel.questionCardModel).not.toBeNull();
		expect(viewModel.actionPanelModel).toMatchObject({
			primaryLabel: t.learningSessionSubmittingLabel,
			isPrimaryDisabled: true
		});
		expect(viewModel.isSessionComplete).toBe(false);
	});

	test("serializes MatchCards results in authored order before question answers", () => {
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
				matchCardResults: [
					{ glossaryEntryKey: "glossary-b", wrongAttemptCount: 1 },
					{ glossaryEntryKey: "glossary-a", wrongAttemptCount: 0 }
				],
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
			matchCardResults: [
				{ glossaryEntryKey: "glossary-a", wrongAttemptCount: 0 },
				{ glossaryEntryKey: "glossary-b", wrongAttemptCount: 1 }
			],
			answers: [
				{
					sessionQuestionId: "session-question-1",
					answer: "option-b"
				}
			]
		});
	});
});

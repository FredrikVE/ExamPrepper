//test/ui/viewmodel/ExamPageViewModel.test.js
import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import { LOAD_STATUS } from "../../../src/ui/viewmodel/LoadState/loadStatus.js";
import { WORKSPACE_STATE_KINDS } from "../../../src/ui/viewmodel/WorkspaceState/workspaceStateKinds.js";
import { QUESTION_TYPES } from "../../../src/constants/QuestionTypes.js";

const stateValues = [];
const useState = jest.fn((initialValue) => {
	const defaultValue = typeof initialValue === "function" ? initialValue() : initialValue;
	const value = stateValues.length > 0 ? stateValues.shift() : defaultValue;
	return [value, jest.fn()];
});
const useCallback = jest.fn((callback) => callback);
const useMemo = jest.fn((createValue) => createValue());
const resetElapsedSeconds = jest.fn();
let questionLoadModel;

const useExamQuestionLoadModel = jest.fn(() => questionLoadModel);
const useExamElapsedTimerModel = jest.fn(() => ({
	elapsedSeconds: 0,
	elapsedTimeLabel: "00:00",
	resetElapsedSeconds
}));
let attemptReviewModel;
const useExamAttemptReviewModel = jest.fn(() => attemptReviewModel);
const useExamSubmitModel = jest.fn(() => ({
	savedAttempt: null,
	attemptSaving: false,
	attemptSaveError: null,
	isSubmitConfirmOpen: false,
	resetSubmitModel: jest.fn(),
	submitExamAttempt: jest.fn(),
	openSubmitConfirmation: jest.fn(),
	closeSubmitConfirmation: jest.fn(),
	confirmSubmitExamAttempt: jest.fn()
}));

jest.unstable_mockModule("react", () => ({
	useCallback,
	useMemo,
	useState
}));

jest.unstable_mockModule("../../../src/ui/settings/SettingsContext.jsx", () => ({
	useSettings: () => ({ randomizeAnswerOptions: false })
}));

jest.unstable_mockModule("../../../src/ui/viewmodel/ExamPage/useExamElapsedTimerModel.js", () => ({
	default: useExamElapsedTimerModel
}));

jest.unstable_mockModule("../../../src/ui/viewmodel/ExamPage/useExamQuestionLoadModel.js", () => ({
	default: useExamQuestionLoadModel
}));

jest.unstable_mockModule("../../../src/ui/viewmodel/ExamPage/useExamSubmitModel.js", () => ({
	default: useExamSubmitModel
}));

jest.unstable_mockModule("../../../src/ui/viewmodel/ExamPage/useExamAttemptReviewModel.js", () => ({
	default: useExamAttemptReviewModel
}));

const { default: useExamPageViewModel } = await import("../../../src/ui/viewmodel/ExamPageViewModel.js");

const translations = {
	examAttemptSaveErrorMessage: "Kunne ikke lagre forsøket.",
	examLoadErrorMessage: "Kunne ikke laste spørsmål.",
	loadingMessage: "Laster...",
	errorPrefix: "Feil",
	emptyMessage: "Ingen spørsmål.",
	examAnsweredLabel: "besvart",
	examProgressAriaLabel: "Eksamensfremdrift",
	examProgressStartLabel: "Start",
	examAttemptSavingMessage: "Lagrer...",
	examAttemptLoadErrorMessage: "Kunne ikke laste forsøket.",
	examReviewChangedQuestionsNotice: "Noen oppgaver er endret.",
	examReviewUnavailableMessage: "Prøven finnes ikke lenger."
};

const createViewModel = (overrides = {}) => {
	return useExamPageViewModel({
		getExamQuestionsUseCase: { execute: jest.fn() },
		getExamAttemptUseCase: { execute: jest.fn() },
		gradeAnswerUseCase: { execute: jest.fn(), getFillMatchType: jest.fn(() => "none") },
		calculateExamScoreUseCase: { execute: jest.fn(() => ({ score: 0, totalPoints: 1, percentage: 0 })) },
		submitExamAttemptUseCase: { execute: jest.fn() },
		examId: "exam-1",
		language: "no",
		t: translations,
		backContract: { onBack: jest.fn() },
		onAttemptSaved: jest.fn(),
		...overrides
	});
};

const setExamState = (answers, submitted, showAllFeedback, currentQuestionIndex) => {
	stateValues.push(answers, submitted, showAllFeedback, currentQuestionIndex, {}, {}, null);
};

describe("useExamPageViewModel questionCardModel", () => {
	beforeEach(() => {
		stateValues.length = 0;
		questionLoadModel = {
			questions: [],
			questionsStatus: LOAD_STATUS.LOADING,
			questionsError: null
		};
		useState.mockClear();
		useCallback.mockClear();
		useMemo.mockClear();
		useExamQuestionLoadModel.mockClear();
		useExamElapsedTimerModel.mockClear();
		useExamSubmitModel.mockClear();
		useExamAttemptReviewModel.mockClear();
		resetElapsedSeconds.mockClear();
		attemptReviewModel = { attempt: null, attemptStatus: LOAD_STATUS.READY, attemptError: null };
	});

	test("does not load an attempt outside review mode", () => {
		createViewModel();

		expect(useExamAttemptReviewModel).toHaveBeenCalledWith(expect.objectContaining({ attemptId: null }));
	});

	test("returns null while questions are loading", () => {
		const viewModel = createViewModel();

		expect(viewModel.workspaceState.kind).toBe(WORKSPACE_STATE_KINDS.LOADING);
		expect(viewModel.questionCardModel).toBe(null);
		expect(viewModel.currentQuestionRenderKey).toBe(null);
	});

	test("returns null for an empty ready question set", () => {
		questionLoadModel = {
			questions: [],
			questionsStatus: LOAD_STATUS.READY,
			questionsError: null
		};

		const viewModel = createViewModel();

		expect(viewModel.workspaceState.kind).toBe(WORKSPACE_STATE_KINDS.EMPTY);
		expect(viewModel.questionCardModel).toBe(null);
		expect(viewModel.currentQuestionRenderKey).toBe(null);
	});

	test("contains the current answer and existing QuestionCard contract", () => {
		const currentQuestion = {
			id: "q-1",
			type: QUESTION_TYPES.SINGLE,
			options: [{ id: "option-1" }]
		};
		questionLoadModel = {
			questions: [currentQuestion],
			questionsStatus: LOAD_STATUS.READY,
			questionsError: null
		};
		setExamState({ "q-1": "option-1" }, false, true, 0);

		const viewModel = createViewModel();

		expect(viewModel.workspaceState.kind).toBe(WORKSPACE_STATE_KINDS.CONTENT);
		expect(viewModel.currentQuestionRenderKey).toBe("q-1");
		expect(viewModel.questionCardModel).toEqual({
			question: currentQuestion,
			questionNumber: 1,
			answer: "option-1",
			answerOptionOrder: null,
			submitted: false,
			showAllFeedback: true,
			correct: false,
			fillMatchType: "none",
			expandedAnswerOptionIndexes: [],
			onToggleAnswerOptionExpanded: viewModel.toggleAnswerOptionExpanded,
			onSingleAnswer: viewModel.setSingleAnswer,
			onToggleMultiAnswer: viewModel.toggleMultiAnswer,
			onDropdownFillAnswer: viewModel.selectDropdownFillAnswer,
			onRadioButtonGridAnswer: viewModel.selectRadioButtonGridAnswer,
			onMultipleBlankAnswer: viewModel.selectDropdownFillAnswer
		});
	});

	test("normalizes a missing current answer to null", () => {
		questionLoadModel = {
			questions: [{ id: "q-1", type: QUESTION_TYPES.SINGLE, options: [] }],
			questionsStatus: LOAD_STATUS.READY,
			questionsError: null
		};
		setExamState({}, false, true, 0);

		const viewModel = createViewModel();

		expect(viewModel.questionCardModel.answer).toBe(null);
	});
});

describe("useExamPageViewModel review mode", () => {
	const reviewedQuestion = {
		id: "q-1",
		type: QUESTION_TYPES.SINGLE,
		options: [{ id: "option-1" }, { id: "option-2" }]
	};
	const reviewedAttempt = {
		attemptId: "attempt-1",
		examId: "exam-1",
		scorePoints: 1,
		totalPoints: 2,
		percentage: 50,
		submittedAt: "2026-11-16T10:00:00.000Z",
		results: [
			{ questionKey: "q-1", submittedAnswer: "option-2", pointsAwarded: 1, maxPoints: 2, isCorrect: true }
		]
	};

	beforeEach(() => {
		stateValues.length = 0;
		useExamAttemptReviewModel.mockClear();
		questionLoadModel = {
			questions: [reviewedQuestion],
			questionsStatus: LOAD_STATUS.READY,
			questionsError: null
		};
		attemptReviewModel = { attempt: reviewedAttempt, attemptStatus: LOAD_STATUS.READY, attemptError: null };
	});

	const createReviewViewModel = (gradeResult) => {
		return createViewModel({
			reviewAttempt: { attemptId: "attempt-1", durationSeconds: 125 },
			gradeAnswerUseCase: { execute: jest.fn(() => gradeResult), getFillMatchType: jest.fn(() => "none") }
		});
	};

	test("shows the stored answers as a submitted, read-only attempt", () => {
		const viewModel = createReviewViewModel(true);

		expect(useExamAttemptReviewModel).toHaveBeenCalledWith(expect.objectContaining({ attemptId: "attempt-1" }));
		expect(viewModel.isReview).toBe(true);
		expect(viewModel.submitted).toBe(true);
		expect(viewModel.questionCardModel.answer).toBe(1);
		expect(viewModel.questionCardModel.submitted).toBe(true);
		expect(viewModel.canSubmitExam).toBe(false);
		expect(viewModel.showSubmitButton).toBe(false);
	});

	test("uses the recorded score and time instead of the live values", () => {
		const viewModel = createReviewViewModel(true);

		expect(viewModel.scoreLabel).toBe("1/2");
		expect(viewModel.score).toBe(1);
		expect(viewModel.totalPoints).toBe(2);
		expect(viewModel.elapsedTimeLabel).toBe("02:05");
		expect(viewModel.reviewNotice).toBe(null);
	});

	test("flags questions that grade differently today than when the attempt was submitted", () => {
		const viewModel = createReviewViewModel(false);

		expect(viewModel.reviewNotice).toBe(translations.examReviewChangedQuestionsNotice);
		expect(viewModel.scoreLabel).toBe("1/2");
	});

	test("waits for the attempt before showing the questions", () => {
		attemptReviewModel = { attempt: null, attemptStatus: LOAD_STATUS.LOADING, attemptError: null };

		const viewModel = createReviewViewModel(true);

		expect(viewModel.workspaceState.kind).toBe(WORKSPACE_STATE_KINDS.LOADING);
	});

	test("explains that a removed test cannot be shown", () => {
		questionLoadModel = { questions: [], questionsStatus: LOAD_STATUS.READY, questionsError: null };

		const viewModel = createReviewViewModel(true);

		expect(viewModel.workspaceState.kind).toBe(WORKSPACE_STATE_KINDS.EMPTY);
		expect(viewModel.workspaceState.title).toBe(translations.examReviewUnavailableMessage);
	});

	test("shows an error when the attempt cannot be loaded", () => {
		attemptReviewModel = { attempt: null, attemptStatus: LOAD_STATUS.ERROR, attemptError: translations.examAttemptLoadErrorMessage };

		const viewModel = createReviewViewModel(true);

		expect(viewModel.workspaceState.kind).toBe(WORKSPACE_STATE_KINDS.ERROR);
	});
});

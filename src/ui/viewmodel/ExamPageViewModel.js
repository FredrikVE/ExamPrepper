//src/ui/viewmodel/ExamPageViewModel.js
import { useCallback, useMemo, useState } from "react";
import { useSettings } from "../settings/SettingsContext.jsx";
import toggleExpandedAnswerOptionIndexes from "./Utils/toggleExpandedAnswerOptionIndexes.js";
import deriveWorkspaceClassName from "./Utils/deriveWorkspaceClassName.js";
import { shouldUseCompactDotsByQuestionCount, shouldAllowResponsiveCompactDots } from "./Utils/questionDotPagination.js";
import { resetExamAttemptState } from "./ExamPage/createExamAttemptResetActions.js";
import createExamFeedbackModel from "./ExamPage/createExamFeedbackModel.js";
import getCurrentAnswerOptionOrder from "./ExamPage/getCurrentAnswerOptionOrder.js";
import createExamProgressNavigationModel, { clampExamQuestionIndex } from "./ExamPage/createExamProgressNavigationModel.js";
import createExamStatusModel from "./ExamPage/createExamStatusModel.js";
import { buildProgressBarModel } from "./Shared/ProgressBar/buildProgressBarModel.js";
import useExamElapsedTimerModel from "./ExamPage/useExamElapsedTimerModel.js";
import useExamQuestionLoadModel from "./ExamPage/useExamQuestionLoadModel.js";
import useExamSubmitModel from "./ExamPage/useExamSubmitModel.js";
import useExamAttemptReviewModel from "./ExamPage/useExamAttemptReviewModel.js";
import createExamAttemptReview from "./ExamPage/createExamAttemptReview.js";
import formatElapsedTime from "./ExamPage/formatElapsedTime.js";
import getScoreLabel from "./Utils/getScoreLabel.js";
import combineLoadStatuses from "./LoadState/combineLoadStatuses.js";
import { createWorkspaceState } from "./WorkspaceState/createWorkspaceState.js";
import { WORKSPACE_STATE_KINDS } from "./WorkspaceState/workspaceStateKinds.js";
import { toggleMultiAnswerSelection, updateObjectAnswerSelection, updateSingleAnswerSelection } from "./ExamPage/updateExamAnswers.js";

function formatExamProgressStepLabel(stepNumber, totalSteps) {
	return `${stepNumber}/${totalSteps}`;
}

export default function useExamPageViewModel(props) {
	const { randomizeAnswerOptions } = useSettings();

	const [workingAnswers, setAnswers] = useState({});
	const [workingSubmitted, setSubmitted] = useState(false);
	const [showAllFeedback, setShowAllFeedback] = useState(true);
	const [rawCurrentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [expandedAnswerOptionIndexesByQuestionId, setExpandedAnswerOptionIndexesByQuestionId] = useState({});
	const [answerOptionOrderByQuestionId, setAnswerOptionOrderByQuestionId] = useState({});
	const [scrollToTopRequestId, setScrollToTopRequestId] = useState(null);

	/* Lesemodus: et levert forsøk fra historikken vises som en innlevert prøve.
	   Svar og innlevert-tilstand avledes da fra forsøket i stedet for fra state,
	   slik at ingenting kan endres eller leveres på nytt. */
	const reviewAttempt = props.reviewAttempt ?? null;
	const isReview = reviewAttempt !== null;
	const submitted = isReview || workingSubmitted;

	const requestScrollToTop = useCallback(() => {
		setScrollToTopRequestId((requestId) => requestId === null ? 1 : requestId + 1);
	}, []);

	const markExamSubmitted = useCallback(() => {
		setSubmitted(true);
	}, []);

	const { elapsedSeconds, elapsedTimeLabel, resetElapsedSeconds } = useExamElapsedTimerModel({
		isPaused: submitted
	});

	const {
		savedAttempt,
		attemptSaving,
		attemptSaveError,
		isSubmitConfirmOpen,
		resetSubmitModel,
		submitExamAttempt,
		openSubmitConfirmation,
		closeSubmitConfirmation,
		confirmSubmitExamAttempt
	} = useExamSubmitModel({
		attemptSaveErrorMessage: props.t.examAttemptSaveErrorMessage,
		isSubmitted: submitted,
		submitExamAttemptUseCase: props.submitExamAttemptUseCase,
		onExamSubmitted: markExamSubmitted,
		onSubmitStarted: requestScrollToTop,
		onAttemptSaved: props.onAttemptSaved
	});

	/* SSOT for hard reset av eksamensforsøket: svar, submit-tilstand, feedback,
	   indeks, timer, expansion og alternativ-rekkefølge nullstilles samlet.
	   Kallstedene definerer scenarioene:
	   - nytt question-set etter load  → hardResetExamAttempt(loadedQuestions)
	   - manuell reset-knapp           → hardResetExamAttempt(questions) + scroll
	   Soft reload (samme question-set, f.eks. språkbytte) skal ALDRI hit —
	   den avgjøres av shouldPreserveExamAttemptOnQuestionReload i load-modellen. */
	const hardResetExamAttempt = useCallback((questionSet) => {
		resetExamAttemptState({
			questionSet,
			setAnswers,
			setSubmitted,
			setShowAllFeedback,
			setCurrentQuestionIndex,
			resetElapsedSeconds,
			setExpandedAnswerOptionIndexesByQuestionId,
			setAnswerOptionOrderByQuestionId,
			resetSubmitModel
		});
	}, [resetElapsedSeconds, resetSubmitModel]);

	const handleQuestionsLoaded = useCallback(({ loadedQuestions, shouldPreserveAttempt }) => {
		if (shouldPreserveAttempt) {
			return;
		}

		hardResetExamAttempt(loadedQuestions);
	}, [hardResetExamAttempt]);

	const {
		questions,
		questionsStatus,
		questionsError
	} = useExamQuestionLoadModel({
		getExamQuestionsUseCase: props.getExamQuestionsUseCase,
		examId: props.examId,
		questionsLoadErrorMessage: props.t.examLoadErrorMessage,
		onQuestionsLoaded: handleQuestionsLoaded
	});

	const {
		attempt: reviewedAttempt,
		attemptStatus,
		attemptError
	} = useExamAttemptReviewModel({
		getExamAttemptUseCase: props.getExamAttemptUseCase,
		attemptId: isReview ? reviewAttempt.attemptId : null,
		attemptLoadErrorMessage: props.t.examAttemptLoadErrorMessage
	});

	const attemptReview = useMemo(() => {
		if (!isReview) {
			return null;
		}

		return createExamAttemptReview({
			questions,
			attempt: reviewedAttempt,
			gradeAnswerUseCase: props.gradeAnswerUseCase
		});
	}, [isReview, questions, reviewedAttempt, props.gradeAnswerUseCase]);

	const answers = attemptReview === null ? workingAnswers : attemptReview.answers;

	const workspaceState = createWorkspaceState({
		loadStatus: combineLoadStatuses([questionsStatus, attemptStatus]),
		isEmpty: questions.length === 0,
		labels: {
			loading: props.t.loadingMessage,
			errorTitle: props.t.errorPrefix,
			errorBody: questionsError ?? attemptError,
			emptyTitle: isReview ? props.t.examReviewUnavailableMessage : props.t.emptyMessage,
			emptyBody: ""
		},
		errorAction: null
	});
	const shouldShowExamChrome = workspaceState.kind === WORKSPACE_STATE_KINDS.CONTENT;

	const visibleQuestions = questions;
	const visibleQuestionCount = visibleQuestions.length;

	/* Klampes ved avledning i stedet for setState-i-effekt: når visibleQuestionCount
	   krymper (f.eks. nytt question-set) er indeksen alltid gyldig i samme render,
	   uten kaskaderende re-render (react-hooks/set-state-in-effect). */
	const currentQuestionIndex = clampExamQuestionIndex(rawCurrentQuestionIndex, visibleQuestionCount);

	const currentQuestion = visibleQuestions[currentQuestionIndex] ?? null;
	const currentQuestionRenderKey = currentQuestion?.id ?? null;

	const workspaceClassName = useMemo(() => {
		return deriveWorkspaceClassName(currentQuestion, submitted, isSubmitConfirmOpen);
	}, [currentQuestion, submitted, isSubmitConfirmOpen]);

	const expandedAnswerOptionIndexes = currentQuestion
		? expandedAnswerOptionIndexesByQuestionId[currentQuestion.id] ?? []
		: [];

	const progressNavigationModel = useMemo(() => {
		return createExamProgressNavigationModel({
			currentQuestionIndex,
			visibleQuestionCount
		});
	}, [currentQuestionIndex, visibleQuestionCount]);

	const {
		currentQuestionNumber,
		canGoPrevious,
		canGoNext,
		isFooterNavigationEnabled,
		isLastQuestion
	} = progressNavigationModel;
	const showSubmitButton = isLastQuestion && !submitted;

	const shouldUseCompactDots = shouldUseCompactDotsByQuestionCount(visibleQuestionCount);
	const shouldUseResponsiveCompactDots = shouldAllowResponsiveCompactDots(visibleQuestionCount);

	const feedbackModel = useMemo(() => {
		return createExamFeedbackModel({
			submitted,
			currentQuestion,
			questions,
			visibleQuestions,
			currentQuestionIndex,
			answers,
			gradeAnswerUseCase: props.gradeAnswerUseCase
		});
	}, [
		submitted,
		currentQuestion,
		questions,
		visibleQuestions,
		currentQuestionIndex,
		answers,
		props.gradeAnswerUseCase
	]);

	const {
		questionDotEntries,
		filledCompactQuestionDotEntries,
		minimalCompactQuestionDotEntries,
		currentQuestionIsCorrect,
		currentQuestionFillMatchType
	} = feedbackModel;

	const currentAnswerOptionOrder = useMemo(() => {
		return getCurrentAnswerOptionOrder(
			currentQuestion,
			randomizeAnswerOptions,
			answerOptionOrderByQuestionId
		);
	}, [currentQuestion, randomizeAnswerOptions, answerOptionOrderByQuestionId]);

	let displayedElapsedTimeLabel = elapsedTimeLabel;

	if (isReview) {
		displayedElapsedTimeLabel = formatElapsedTime(reviewAttempt.durationSeconds ?? 0);
	}

	const statusModel = useMemo(() => {
		return createExamStatusModel({
			questions,
			visibleQuestions,
			currentQuestionIndex,
			answers,
			submitted,
			showAllFeedback,
			elapsedTimeLabel: displayedElapsedTimeLabel,
			calculateExamScoreUseCase: props.calculateExamScoreUseCase,
			answeredLabel: props.t.examAnsweredLabel
		});
	}, [
		questions,
		visibleQuestions,
		currentQuestionIndex,
		answers,
		submitted,
		showAllFeedback,
		displayedElapsedTimeLabel,
		props.calculateExamScoreUseCase,
		props.t.examAnsweredLabel
	]);

	const {
		examScore,
		answeredCount,
		answeredCountLabel,
		answeredPercentLabel,
		scoreLabel,
		questionProgressLabel,
		feedbackToggleLabel,
		mobileWorkStatusLabel,
		canSubmitExam
	} = statusModel;

	/* I lesemodus er den registrerte poengsummen fasit, også om en oppgave
	   er endret etter at forsøket ble levert. */
	let displayedScore = examScore;
	let displayedScoreLabel = scoreLabel;

	if (isReview && reviewedAttempt !== null) {
		displayedScore = {
			score: reviewedAttempt.scorePoints,
			totalPoints: reviewedAttempt.totalPoints,
			percentage: reviewedAttempt.percentage
		};
		displayedScoreLabel = getScoreLabel(true, reviewedAttempt.scorePoints, reviewedAttempt.totalPoints);
	}

	let reviewNotice = null;

	if (attemptReview !== null && attemptReview.hasChangedQuestions) {
		reviewNotice = props.t.examReviewChangedQuestionsNotice;
	}

	const previousQuestion = useCallback(() => {
		setCurrentQuestionIndex((previousIndex) => {
			const normalizedIndex = clampExamQuestionIndex(previousIndex, visibleQuestionCount);
			return Math.max(normalizedIndex - 1, 0);
		});

		requestScrollToTop();
	}, [visibleQuestionCount, requestScrollToTop]);

	const nextQuestion = useCallback(() => {
		setCurrentQuestionIndex((previousIndex) => {
			const normalizedIndex = clampExamQuestionIndex(previousIndex, visibleQuestionCount);
			return clampExamQuestionIndex(normalizedIndex + 1, visibleQuestionCount);
		});

		requestScrollToTop();
	}, [visibleQuestionCount, requestScrollToTop]);

	const goToQuestion = useCallback((index) => {
		if (index < 0 || index >= visibleQuestionCount) {
			return;
		}

		setCurrentQuestionIndex(index);
		requestScrollToTop();
	}, [visibleQuestionCount, requestScrollToTop]);

	const activateExamProgressStep = useCallback((stepNumber) => {
		goToQuestion(stepNumber - 1);
	}, [goToQuestion]);

	const examProgressBarModel = useMemo(() => {
		if (visibleQuestionCount === 0) {
			return null;
		}

		return buildProgressBarModel({
			totalSteps: visibleQuestionCount,
			currentStep: currentQuestionNumber,
			ariaLabel: props.t.examProgressAriaLabel,
			startLabel: props.t.examProgressStartLabel,
			formatStepLabel: formatExamProgressStepLabel,
			onActivateStep: activateExamProgressStep
		});
	}, [visibleQuestionCount, currentQuestionNumber, props.t.examProgressAriaLabel, props.t.examProgressStartLabel, activateExamProgressStep]);

	const setSingleAnswer = useCallback((questionId, selectedValue) => {
		if (submitted) {
			return;
		}

		setAnswers((previousAnswers) => {
			return updateSingleAnswerSelection(previousAnswers, questionId, selectedValue);
		});
	}, [submitted]);

	const toggleMultiAnswer = useCallback((questionId, selectedValue) => {
		if (submitted) {
			return;
		}

		setAnswers((previousAnswers) => {
			return toggleMultiAnswerSelection(previousAnswers, questionId, selectedValue);
		});
	}, [submitted]);

	const selectDropdownFillAnswer = useCallback((questionId, itemId, optionId) => {
		if (submitted) {
			return;
		}

		setAnswers((previousAnswers) => {
			return updateObjectAnswerSelection(previousAnswers, questionId, itemId, optionId);
		});
	}, [submitted]);

	const selectRadioButtonGridAnswer = useCallback((questionId, rowId, columnId) => {
		if (submitted) {
			return;
		}

		setAnswers((previousAnswers) => {
			return updateObjectAnswerSelection(previousAnswers, questionId, rowId, columnId);
		});
	}, [submitted]);

	const toggleAnswerOptionExpanded = useCallback((questionId, optionIndex) => {
		setExpandedAnswerOptionIndexesByQuestionId((previousExpandedIndexesByQuestionId) => {
			const nextExpandedIndexes = toggleExpandedAnswerOptionIndexes(
				previousExpandedIndexesByQuestionId[questionId],
				optionIndex
			);
			const nextExpandedIndexesByQuestionId = { ...previousExpandedIndexesByQuestionId };

			if (nextExpandedIndexes.length === 0) {
				delete nextExpandedIndexesByQuestionId[questionId];
				return nextExpandedIndexesByQuestionId;
			}

			nextExpandedIndexesByQuestionId[questionId] = nextExpandedIndexes;
			return nextExpandedIndexesByQuestionId;
		});
	}, []);

	const createSubmitAttemptInput = useCallback(() => {
		return {
			answers,
			examId: props.examId,
			language: props.language,
			questions,
			durationSeconds: elapsedSeconds
		};
	}, [answers, elapsedSeconds, props.examId, props.language, questions]);

	const submitExam = useCallback(async () => {
		await submitExamAttempt(createSubmitAttemptInput());
	}, [createSubmitAttemptInput, submitExamAttempt]);

	const confirmSubmitExam = useCallback(async () => {
		await confirmSubmitExamAttempt(createSubmitAttemptInput());
	}, [confirmSubmitExamAttempt, createSubmitAttemptInput]);

	const resetExam = useCallback(() => {
		hardResetExamAttempt(questions);
		requestScrollToTop();
	}, [hardResetExamAttempt, questions, requestScrollToTop]);

	const toggleShowAllFeedback = useCallback(() => {
		setShowAllFeedback((shouldShowAllFeedback) => !shouldShowAllFeedback);
	}, []);

	const questionCardModel = currentQuestion === null ? null : {
		question: currentQuestion,
		questionNumber: currentQuestionNumber,
		answer: answers[currentQuestion.id] ?? null,
		answerOptionOrder: currentAnswerOptionOrder,
		submitted,
		showAllFeedback,
		correct: currentQuestionIsCorrect,
		fillMatchType: currentQuestionFillMatchType,
		expandedAnswerOptionIndexes,
		onToggleAnswerOptionExpanded: toggleAnswerOptionExpanded,
		onSingleAnswer: setSingleAnswer,
		onToggleMultiAnswer: toggleMultiAnswer,
		onDropdownFillAnswer: selectDropdownFillAnswer,
		onRadioButtonGridAnswer: selectRadioButtonGridAnswer,
		onMultipleBlankAnswer: selectDropdownFillAnswer
	};

	return {
		questions,
		visibleQuestions,
		currentQuestion,
		currentQuestionRenderKey,
		currentQuestionIndex,
		currentQuestionNumber,
		currentQuestionIsCorrect,
		currentQuestionFillMatchType,
		answers,
		questionCardModel,

		workspaceState,
		shouldShowExamChrome,
		attemptSavingMessage: props.t.examAttemptSavingMessage,

		submitted,
		showAllFeedback,
		currentAnswerOptionOrder,
		workspaceClassName,
		examProgressBarModel,
		backContract: props.backContract,

		isReview,
		reviewNotice,

		score: displayedScore.score,
		totalPoints: displayedScore.totalPoints,
		percentage: displayedScore.percentage,
		savedAttempt,
		attemptSaving,
		attemptSaveError,
		answeredCount,
		answeredCountLabel,
		answeredPercentLabel,
		scoreLabel: displayedScoreLabel,
		questionProgressLabel,
		feedbackToggleLabel,
		elapsedTimeLabel: displayedElapsedTimeLabel,
		mobileWorkStatusLabel,
		canSubmitExam,
		isSubmitConfirmOpen,

		expandedAnswerOptionIndexes,
		questionDotEntries,
		scrollToTopRequestId,

		canGoPrevious,
		canGoNext,
		isFooterNavigationEnabled,
		isLastQuestion,
		showSubmitButton,
		shouldUseCompactDots,
		shouldUseResponsiveCompactDots,
		filledCompactQuestionDotEntries,
		minimalCompactQuestionDotEntries,
		previousQuestion,
		nextQuestion,
		goToQuestion,

		setSingleAnswer,
		toggleMultiAnswer,
		selectDropdownFillAnswer,
		selectRadioButtonGridAnswer,
		toggleAnswerOptionExpanded,
		submitExam,
		openSubmitConfirmation,
		closeSubmitConfirmation,
		confirmSubmitExam,
		resetExam,
		toggleShowAllFeedback
	};
}

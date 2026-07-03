// src/ui/viewmodel/ExamPageViewModel.js
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSettings } from "../settings/SettingsContext.jsx";
import toggleExpandedAnswerOptionIndexes from "./Utils/toggleExpandedAnswerOptionIndexes.js";
import deriveWorkspaceClassName from "./Utils/deriveWorkspaceClassName.js";
import createAnswerOptionOrderByQuestionId from "./Utils/answerOptionOrder.js";
import { shouldUseCompactDotsByQuestionCount, shouldAllowResponsiveCompactDots } from "./Utils/questionDotPagination.js";
import createExamPageCopy from "./ExamPage/createExamPageCopy.js";
import createExamFeedbackModel from "./ExamPage/createExamFeedbackModel.js";
import getCurrentAnswerOptionOrder from "./ExamPage/getCurrentAnswerOptionOrder.js";
import createExamProgressNavigationModel, { clampExamQuestionIndex } from "./ExamPage/createExamProgressNavigationModel.js";
import createExamStatusModel from "./ExamPage/createExamStatusModel.js";
import useExamElapsedTimerModel from "./ExamPage/useExamElapsedTimerModel.js";
import useExamQuestionLoadModel from "./ExamPage/useExamQuestionLoadModel.js";
import useExamSubmitModel from "./ExamPage/useExamSubmitModel.js";
import { toggleMultiAnswerSelection, updateObjectAnswerSelection, updateSingleAnswerSelection } from "./ExamPage/updateExamAnswers.js";

export default function useExamPageViewModel(getExamQuestionsUseCase, gradeAnswerUseCase, calculateExamScoreUseCase, submitExamAttemptUseCase, examId, language, t) {
	const { randomizeAnswerOptions } = useSettings();

	const [answers, setAnswers] = useState({});
	const [submitted, setSubmitted] = useState(false);
	const [showAllFeedback, setShowAllFeedback] = useState(true);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [expandedAnswerOptionIndexesByQuestionId, setExpandedAnswerOptionIndexesByQuestionId] = useState({});
	const [answerOptionOrderByQuestionId, setAnswerOptionOrderByQuestionId] = useState({});
	const [scrollToTopRequestId, setScrollToTopRequestId] = useState(0);

	const copy = useMemo(() => {
		return createExamPageCopy(t);
	}, [t]);

	const requestScrollToTop = useCallback(() => {
		setScrollToTopRequestId((requestId) => requestId + 1);
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
		attemptSaveErrorMessage: copy.attemptSaveErrorMessage,
		isSubmitted: submitted,
		submitExamAttemptUseCase,
		onExamSubmitted: markExamSubmitted,
		onSubmitStarted: requestScrollToTop
	});

	const handleQuestionsLoaded = useCallback(({ loadedQuestions, shouldPreserveAttempt }) => {
		if (shouldPreserveAttempt) {
			return;
		}

		setAnswers({});
		setSubmitted(false);
		setShowAllFeedback(true);
		setCurrentQuestionIndex(0);
		resetElapsedSeconds();
		setExpandedAnswerOptionIndexesByQuestionId({});
		setAnswerOptionOrderByQuestionId(createAnswerOptionOrderByQuestionId(loadedQuestions));
		resetSubmitModel();
	}, [resetElapsedSeconds, resetSubmitModel]);

	const {
		questions,
		questionsLoading,
		questionsLoadError,
		isInitialQuestionsLoad
	} = useExamQuestionLoadModel({
		getExamQuestionsUseCase,
		examId,
		questionsLoadErrorMessage: copy.questionsLoadErrorMessage,
		onQuestionsLoaded: handleQuestionsLoaded
	});

	const visibleQuestions = questions;
	const visibleQuestionCount = visibleQuestions.length;
	const questionCount = questions.length;

	const currentQuestion = visibleQuestions[currentQuestionIndex] ?? null;

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
			gradeAnswerUseCase
		});
	}, [
		submitted,
		currentQuestion,
		questions,
		visibleQuestions,
		currentQuestionIndex,
		answers,
		gradeAnswerUseCase
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

	const statusModel = useMemo(() => {
		return createExamStatusModel({
			questions,
			visibleQuestions,
			currentQuestionIndex,
			answers,
			submitted,
			showAllFeedback,
			elapsedTimeLabel,
			calculateExamScoreUseCase,
			copy
		});
	}, [
		questions,
		visibleQuestions,
		currentQuestionIndex,
		answers,
		submitted,
		showAllFeedback,
		elapsedTimeLabel,
		calculateExamScoreUseCase,
		copy
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

	const previousQuestion = useCallback(() => {
		setCurrentQuestionIndex((previousIndex) => {
			return Math.max(previousIndex - 1, 0);
		});

		requestScrollToTop();
	}, [requestScrollToTop]);

	const nextQuestion = useCallback(() => {
		setCurrentQuestionIndex((previousIndex) => {
			return clampExamQuestionIndex(previousIndex + 1, visibleQuestionCount);
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
			examId,
			language,
			questions,
			durationSeconds: elapsedSeconds
		};
	}, [answers, elapsedSeconds, examId, language, questions]);

	const submitExam = useCallback(async () => {
		await submitExamAttempt(createSubmitAttemptInput());
	}, [createSubmitAttemptInput, submitExamAttempt]);

	const confirmSubmitExam = useCallback(async () => {
		await confirmSubmitExamAttempt(createSubmitAttemptInput());
	}, [confirmSubmitExamAttempt, createSubmitAttemptInput]);

	const resetExam = useCallback(() => {
		setAnswers({});
		setSubmitted(false);
		setShowAllFeedback(true);
		setCurrentQuestionIndex(0);
		resetElapsedSeconds();
		setExpandedAnswerOptionIndexesByQuestionId({});
		setAnswerOptionOrderByQuestionId(createAnswerOptionOrderByQuestionId(questions));
		resetSubmitModel();

		requestScrollToTop();
	}, [questions, requestScrollToTop, resetElapsedSeconds, resetSubmitModel]);

	const toggleShowAllFeedback = useCallback(() => {
		setShowAllFeedback((shouldShowAllFeedback) => !shouldShowAllFeedback);
	}, []);

	const clampCurrentQuestionIndex = useCallback(() => {
		setCurrentQuestionIndex((previousIndex) => {
			return clampExamQuestionIndex(previousIndex, visibleQuestionCount);
		});
	}, [visibleQuestionCount]);

	useEffect(clampCurrentQuestionIndex, [clampCurrentQuestionIndex]);


	return {
		questions,
		visibleQuestions,
		currentQuestion,
		currentQuestionIndex,
		currentQuestionNumber,
		currentQuestionIsCorrect,
		currentQuestionFillMatchType,
		answers,

		loadingMessage: copy.loadingMessage,
		errorPrefix: copy.errorPrefix,
		emptyMessage: copy.emptyMessage,
		attemptSavingMessage: copy.attemptSavingMessage,

		questionsLoading,
		isInitialQuestionsLoad,
		questionsLoadError,
		submitted,
		showAllFeedback,
		currentAnswerOptionOrder,
		workspaceClassName,

		score: examScore.score,
		totalPoints: examScore.totalPoints,
		percentage: examScore.percentage,
		savedAttempt,
		attemptSaving,
		attemptSaveError,
		answeredCount,
		answeredCountLabel,
		answeredPercentLabel,
		scoreLabel,
		questionProgressLabel,
		feedbackToggleLabel,
		elapsedTimeLabel,
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

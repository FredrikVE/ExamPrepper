// src/ui/viewmodel/ExamPageViewModel.js
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSettings } from "../settings/SettingsContext.jsx";
import getAnsweredCountLabel from "./Utils/getAnsweredCountLabel.js";
import getScoreLabel from "./Utils/getScoreLabel.js";
import getQuestionProgressLabel from "./Utils/getQuestionProgressLabel.js";
import getFeedbackToggleLabel from "./Utils/getFeedbackToggleLabel.js";
import toggleExpandedAnswerOptionIndexes from "./Utils/toggleExpandedAnswerOptionIndexes.js";
import deriveWorkspaceClassName from "./Utils/deriveWorkspaceClassName.js";
import isQuestionAnswered from "./Utils/isQuestionAnswered.js";
import createAnswerOptionOrderByQuestionId from "./Utils/answerOptionOrder.js";
import shouldHandleFooterNavigationKeyDown from "./Utils/keyboardNavigation.js";
import transformAnswersForApi from "./Utils/transformAnswersForApi.js";
import { shouldUseCompactDotsByQuestionCount, shouldAllowResponsiveCompactDots, getFilledCompactQuestionDotEntries, getMinimalCompactQuestionDotEntries } from "./Utils/questionDotPagination.js";
import createExamPageCopy from "./ExamPage/createExamPageCopy.js";
import createQuestionCorrectnessByQuestionId from "./ExamPage/createQuestionCorrectnessByQuestionId.js";
import { createCompactQuestionDotEntries, createQuestionDotEntries } from "./ExamPage/createQuestionDotEntries.js";
import getCurrentAnswerOptionOrder from "./ExamPage/getCurrentAnswerOptionOrder.js";

export default function useExamPageViewModel(getExamQuestionsUseCase, gradeAnswerUseCase, calculateExamScoreUseCase, submitExamAttemptUseCase, examId, language, t) {
	const { randomizeAnswerOptions } = useSettings();

	const [questions, setQuestions] = useState([]);
	const [answers, setAnswers] = useState({});
	const [submitted, setSubmitted] = useState(false);
	const [showAllFeedback, setShowAllFeedback] = useState(true);
	const [questionsLoading, setQuestionsLoading] = useState(true);
	const [questionsLoadError, setQuestionsLoadError] = useState(null);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [elapsedSeconds, setElapsedSeconds] = useState(0);
	const [expandedAnswerOptionIndexesByQuestionId, setExpandedAnswerOptionIndexesByQuestionId] = useState({});
	const [answerOptionOrderByQuestionId, setAnswerOptionOrderByQuestionId] = useState({});
	const [savedAttempt, setSavedAttempt] = useState(null);
	const [attemptSaveError, setAttemptSaveError] = useState(null);
	const [attemptSaving, setAttemptSaving] = useState(false);
	const [scrollToTopRequestId, setScrollToTopRequestId] = useState(0);
	const [isSubmitConfirmOpen, setIsSubmitConfirmOpen] = useState(false);

	const copy = useMemo(() => {
		return createExamPageCopy(t);
	}, [t]);

	const requestScrollToTop = useCallback(() => {
		setScrollToTopRequestId((requestId) => requestId + 1);
	}, []);

	const examScore = useMemo(() => {
		return calculateExamScoreUseCase.execute(questions, answers);
	}, [questions, answers, calculateExamScoreUseCase]);

	const answeredCount = useMemo(() => {
		return questions.filter((question) => {
			return isQuestionAnswered(question, answers[question.id]);
		}).length;
	}, [questions, answers]);

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

	const currentQuestionNumber = currentQuestionIndex + 1;

	const canGoPrevious = currentQuestionIndex > 0;
	const canGoNext = currentQuestionIndex < visibleQuestionCount - 1;

	const isLastQuestion = !canGoNext;
	const showSubmitButton = isLastQuestion && !submitted;

	const shouldUseCompactDots = shouldUseCompactDotsByQuestionCount(visibleQuestionCount);
	const shouldUseResponsiveCompactDots = shouldAllowResponsiveCompactDots(visibleQuestionCount);

	const questionCorrectnessByQuestionId = useMemo(() => {
		if (!submitted) {
			return {};
		}

		return createQuestionCorrectnessByQuestionId(
			questions,
			answers,
			gradeAnswerUseCase
		);
	}, [submitted, questions, answers, gradeAnswerUseCase]);

	const questionDotEntries = useMemo(() => {
		return createQuestionDotEntries(
			visibleQuestions,
			currentQuestionIndex,
			questionCorrectnessByQuestionId
		);
	}, [visibleQuestions, currentQuestionIndex, questionCorrectnessByQuestionId]);

	const filledCompactQuestionDotEntries = useMemo(() => {
		return createCompactQuestionDotEntries(
			getFilledCompactQuestionDotEntries(visibleQuestions, currentQuestionIndex),
			visibleQuestions,
			currentQuestionIndex,
			questionCorrectnessByQuestionId
		);
	}, [visibleQuestions, currentQuestionIndex, questionCorrectnessByQuestionId]);

	const minimalCompactQuestionDotEntries = useMemo(() => {
		return createCompactQuestionDotEntries(
			getMinimalCompactQuestionDotEntries(visibleQuestions, currentQuestionIndex),
			visibleQuestions,
			currentQuestionIndex,
			questionCorrectnessByQuestionId
		);
	}, [visibleQuestions, currentQuestionIndex, questionCorrectnessByQuestionId]);

	const currentQuestionIsCorrect = currentQuestion
		? questionCorrectnessByQuestionId[currentQuestion.id] ?? false
		: false;

	const currentQuestionFillMatchType = getCurrentQuestionFillMatchType(
		submitted,
		currentQuestion,
		answers,
		gradeAnswerUseCase
	);

	const currentAnswerOptionOrder = useMemo(() => {
		return getCurrentAnswerOptionOrder(
			currentQuestion,
			randomizeAnswerOptions,
			answerOptionOrderByQuestionId
		);
	}, [currentQuestion, randomizeAnswerOptions, answerOptionOrderByQuestionId]);

	const answeredCountLabel = getAnsweredCountLabel(
		answeredCount,
		questionCount
	);

	const scoreLabel = getScoreLabel(
		submitted,
		examScore.score,
		examScore.totalPoints
	);

	const questionProgressLabel = getQuestionProgressLabel(
		currentQuestionIndex,
		visibleQuestionCount
	);

	const feedbackToggleLabel = getFeedbackToggleLabel(showAllFeedback);

	const elapsedTimeLabel = useMemo(() => {
		return formatElapsedTime(elapsedSeconds);
	}, [elapsedSeconds]);

	const answeredPercent = useMemo(() => {
		const total = Math.max(visibleQuestions.length, 1);
		return Math.round((answeredCount / total) * 100);
	}, [answeredCount, visibleQuestions.length]);

	const answeredPercentLabel = `${answeredPercent}%`;
	const mobileWorkStatusLabel = `${elapsedTimeLabel} · ${answeredPercentLabel} ${copy.answeredLabel}`;
	const canSubmitExam = !submitted && questions.length > 0;

	const previousQuestion = useCallback(() => {
		setCurrentQuestionIndex((previousIndex) => {
			return Math.max(previousIndex - 1, 0);
		});

		requestScrollToTop();
	}, [requestScrollToTop]);

	const nextQuestion = useCallback(() => {
		setCurrentQuestionIndex((previousIndex) => {
			if (visibleQuestionCount === 0) {
				return 0;
			}

			return Math.min(previousIndex + 1, visibleQuestionCount - 1);
		});

		requestScrollToTop();
	}, [visibleQuestionCount, requestScrollToTop]);

	const handleFooterNavigationKeyDown = useCallback((event) => {
		if (!shouldHandleFooterNavigationKeyDown(event)) {
			return;
		}

		if (event.key === "ArrowLeft" && canGoPrevious) {
			event.preventDefault();
			previousQuestion();
			return;
		}

		if (event.key === "ArrowRight" && canGoNext) {
			event.preventDefault();
			nextQuestion();
			return;
		}

		if (event.key === "Enter" && !submitted && canGoNext) {
			event.preventDefault();
			nextQuestion();
		}
	}, [submitted, canGoPrevious, canGoNext, previousQuestion, nextQuestion]);

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
			return {
				...previousAnswers,
				[questionId]: selectedValue
			};
		});
	}, [submitted]);

	const toggleMultiAnswer = useCallback((questionId, selectedValue) => {
		if (submitted) {
			return;
		}

		setAnswers((previousAnswers) => {
			const currentAnswer = Array.isArray(previousAnswers[questionId])
				? previousAnswers[questionId]
				: [];

			const nextAnswer = currentAnswer.includes(selectedValue)
				? currentAnswer.filter((answerValue) => answerValue !== selectedValue)
				: [...currentAnswer, selectedValue];

			return {
				...previousAnswers,
				[questionId]: nextAnswer
			};
		});
	}, [submitted]);


	const selectDropdownFillAnswer = useCallback((questionId, itemId, optionId) => {
		if (submitted) {
			return;
		}

		setAnswers((previousAnswers) => {
			const currentQuestionAnswer = isPlainObject(previousAnswers[questionId])
				? previousAnswers[questionId]
				: {};
			const nextQuestionAnswer = { ...currentQuestionAnswer };

			if (optionId) {
				nextQuestionAnswer[itemId] = optionId;
			} else {
				delete nextQuestionAnswer[itemId];
			}

			return {
				...previousAnswers,
				[questionId]: nextQuestionAnswer
			};
		});
	}, [submitted]);


	const selectRadioButtonGridAnswer = useCallback((questionId, rowId, columnId) => {
		if (submitted) {
			return;
		}

		setAnswers((previousAnswers) => {
			const currentQuestionAnswer = isPlainObject(previousAnswers[questionId])
				? previousAnswers[questionId]
				: {};
			const nextQuestionAnswer = { ...currentQuestionAnswer };

			if (columnId) {
				nextQuestionAnswer[rowId] = columnId;
			} else {
				delete nextQuestionAnswer[rowId];
			}

			return {
				...previousAnswers,
				[questionId]: nextQuestionAnswer
			};
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

	const submitExam = useCallback(async () => {
		setSubmitted(true);
		setAttemptSaving(true);
		setAttemptSaveError(null);
		requestScrollToTop();

		try {
			const attempt = await submitExamAttemptUseCase.execute({
				examId,
				lang: language,
				durationSeconds: elapsedSeconds,
				answers: transformAnswersForApi(questions, answers)
			});

			setSavedAttempt(attempt);
		} catch (error) {
			setAttemptSaveError(error?.message ?? copy.attemptSaveErrorMessage);
		} finally {
			setAttemptSaving(false);
		}
	}, [answers, copy.attemptSaveErrorMessage, elapsedSeconds, examId, language, questions, requestScrollToTop, submitExamAttemptUseCase]);

	const openSubmitConfirmation = useCallback(() => {
		setIsSubmitConfirmOpen(true);
	}, []);

	const closeSubmitConfirmation = useCallback(() => {
		setIsSubmitConfirmOpen(false);
	}, []);

	const confirmSubmitExam = useCallback(async () => {
		setIsSubmitConfirmOpen(false);
		await submitExam();
	}, [submitExam]);

	const resetExam = useCallback(() => {
		setAnswers({});
		setSubmitted(false);
		setShowAllFeedback(true);
		setCurrentQuestionIndex(0);
		setElapsedSeconds(0);
		setExpandedAnswerOptionIndexesByQuestionId({});
		setAnswerOptionOrderByQuestionId(createAnswerOptionOrderByQuestionId(questions));
		setSavedAttempt(null);
		setAttemptSaveError(null);
		setAttemptSaving(false);
		setIsSubmitConfirmOpen(false);

		requestScrollToTop();
	}, [questions, requestScrollToTop]);

	const toggleShowAllFeedback = useCallback(() => {
		setShowAllFeedback((shouldShowAllFeedback) => !shouldShowAllFeedback);
	}, []);

	const loadQuestions = useCallback(() => {
		let cancelled = false;

		const run = async () => {
			try {
				setQuestionsLoading(true);
				setQuestionsLoadError(null);

				const loadedQuestions = await getExamQuestionsUseCase.execute({
					examId,
					language
				});

				if (!cancelled) {
					setQuestions(loadedQuestions);
					setAnswers({});
					setSubmitted(false);
					setShowAllFeedback(true);
					setCurrentQuestionIndex(0);
					setElapsedSeconds(0);
					setExpandedAnswerOptionIndexesByQuestionId({});
					setAnswerOptionOrderByQuestionId(createAnswerOptionOrderByQuestionId(loadedQuestions));
					setSavedAttempt(null);
					setAttemptSaveError(null);
					setAttemptSaving(false);
					setIsSubmitConfirmOpen(false);
				}
			}

			catch (questionsError) {
				if (!cancelled) {
					setQuestionsLoadError(questionsError?.message ?? copy.questionsLoadErrorMessage);
				}
			}

			finally {
				if (!cancelled) {
					setQuestionsLoading(false);
				}
			}
		};

		run();

		return () => {
			cancelled = true;
		};
	}, [copy.questionsLoadErrorMessage, getExamQuestionsUseCase, examId, language]);

	const clampCurrentQuestionIndex = useCallback(() => {
		if (visibleQuestionCount === 0) {
			setCurrentQuestionIndex(0);
			return;
		}

		if (currentQuestionIndex > visibleQuestionCount - 1) {
			setCurrentQuestionIndex(visibleQuestionCount - 1);
		}
	}, [visibleQuestionCount, currentQuestionIndex]);

	useEffect(loadQuestions, [loadQuestions]);
	useEffect(clampCurrentQuestionIndex, [clampCurrentQuestionIndex]);

	useEffect(() => {
		window.addEventListener("keydown", handleFooterNavigationKeyDown);

		return () => window.removeEventListener("keydown", handleFooterNavigationKeyDown);
	}, [handleFooterNavigationKeyDown]);

	useEffect(() => {
		if (submitted) {
			return;
		}

		const intervalId = window.setInterval(() => {
			setElapsedSeconds((elapsedSecondCount) => elapsedSecondCount + 1);
		}, 1000);

		return () => window.clearInterval(intervalId);
	}, [submitted]);

	useEffect(() => {
		if (submitted) {
			setIsSubmitConfirmOpen(false);
		}
	}, [submitted]);

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

const formatElapsedTime = (seconds) => {
	const safeSeconds = Math.max(seconds, 0);
	const minutes = Math.floor(safeSeconds / 60);
	const remainingSeconds = safeSeconds % 60;

	return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
};

const getCurrentQuestionFillMatchType = (submitted, currentQuestion, answers, gradeAnswerUseCase) => {
	if (!submitted || !currentQuestion) {
		return "none";
	}

	return gradeAnswerUseCase.getFillMatchType(
		currentQuestion,
		answers[currentQuestion.id]
	);
};


const isPlainObject = (value) => {
	return Boolean(value && typeof value === "object" && !Array.isArray(value));
};

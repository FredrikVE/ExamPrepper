// src/ui/viewmodel/ExamPageViewModel.js
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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

const LOAD_ERROR_MESSAGE = "Kunne ikke laste eksamen";		// Mer SSOT på dette med feilhåndteringer.. dette er ikke brå nok

export default function useExamPageViewModel(getExamQuestionsUseCase, gradeAnswerUseCase, calculateExamScoreUseCase, submitExamAttemptUseCase, examId, language) {
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

	const examWorkspaceRef = useRef(null);

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
		return deriveWorkspaceClassName(currentQuestion, submitted);
	}, [currentQuestion, submitted]);

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

	const filledCompactQuestionDotEntries = useMemo(() => {
		return getFilledCompactQuestionDotEntries(visibleQuestions, currentQuestionIndex);
	}, [visibleQuestions, currentQuestionIndex]);

	const minimalCompactQuestionDotEntries = useMemo(() => {
		return getMinimalCompactQuestionDotEntries(visibleQuestions, currentQuestionIndex);
	}, [visibleQuestions, currentQuestionIndex]);

	const currentQuestionIsCorrect = getCurrentQuestionIsCorrect(
		submitted,
		currentQuestion,
		answers,
		gradeAnswerUseCase
	);

	const currentQuestionFillMatchType = getCurrentQuestionFillMatchType(
		submitted,
		currentQuestion,
		answers,
		gradeAnswerUseCase
	);

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

	const previousQuestion = useCallback(() => {
		setCurrentQuestionIndex((previousIndex) => {
			return Math.max(previousIndex - 1, 0);
		});

		scrollExamWorkspaceToTop(examWorkspaceRef);
	}, [examWorkspaceRef]);

	const nextQuestion = useCallback(() => {
		setCurrentQuestionIndex((previousIndex) => {
			if (visibleQuestionCount === 0) {
				return 0;
			}

			return Math.min(previousIndex + 1, visibleQuestionCount - 1);
		});

		scrollExamWorkspaceToTop(examWorkspaceRef);
	}, [visibleQuestionCount, examWorkspaceRef]);

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
		scrollExamWorkspaceToTop(examWorkspaceRef);
	}, [visibleQuestionCount, examWorkspaceRef]);

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
		scrollExamWorkspaceToTop(examWorkspaceRef);

		try {
			const attempt = await submitExamAttemptUseCase.execute({
				examId,
				lang: language,
				answers: transformAnswersForApi(questions, answers)
			});

			setSavedAttempt(attempt);
		} catch (error) {
			setAttemptSaveError(error?.message ?? "Kunne ikke lagre forsøket");
		} finally {
			setAttemptSaving(false);
		}
	}, [answers, examId, examWorkspaceRef, language, questions, submitExamAttemptUseCase]);

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

		scrollExamWorkspaceToTop(examWorkspaceRef);
	}, [examWorkspaceRef, questions]);

	const toggleShowAllFeedback = useCallback(() => {
		setShowAllFeedback((shouldShowAllFeedback) => !shouldShowAllFeedback);
	}, []);

	const isAnswerCorrect = useCallback((question) => {
		return gradeAnswerUseCase.execute(question, answers[question.id]);
	}, [gradeAnswerUseCase, answers]);

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
				}
			}

			catch (questionsError) {
				if (!cancelled) {
					setQuestionsLoadError(questionsError?.message ?? LOAD_ERROR_MESSAGE);
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
	}, [getExamQuestionsUseCase, examId, language]);

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

	return {
		questions,
		visibleQuestions,
		currentQuestion,
		currentQuestionIndex,
		currentQuestionNumber,
		currentQuestionIsCorrect,
		currentQuestionFillMatchType,
		answers,

		questionsLoading,
		questionsLoadError,
		submitted,
		showAllFeedback,
		randomizeAnswerOptions,
		answerOptionOrderByQuestionId,
		workspaceClassName,

		score: examScore.score,
		totalPoints: examScore.totalPoints,
		percentage: examScore.percentage,
		savedAttempt,
		attemptSaving,
		attemptSaveError,
		answeredCount,
		answeredCountLabel,
		scoreLabel,
		questionProgressLabel,
		feedbackToggleLabel,
		elapsedTimeLabel,

		expandedAnswerOptionIndexes,

		examWorkspaceRef,

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
		toggleAnswerOptionExpanded,
		submitExam,
		resetExam,
		toggleShowAllFeedback,
		setShowAllFeedback,
		isAnswerCorrect
	};
}

const scrollExamWorkspaceToTop = (examWorkspaceRef) => {
	window.requestAnimationFrame(() => {
		examWorkspaceRef.current?.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	});
};

const formatElapsedTime = (seconds) => {
	const safeSeconds = Math.max(seconds, 0);
	const minutes = Math.floor(safeSeconds / 60);
	const remainingSeconds = safeSeconds % 60;

	return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
};

const getCurrentQuestionIsCorrect = (submitted, currentQuestion, answers, gradeAnswerUseCase) => {
	if (!submitted) {
		return false;
	}

	if (!currentQuestion) {
		return false;
	}

	return gradeAnswerUseCase.execute(
		currentQuestion,
		answers[currentQuestion.id]
	);
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

// src/ui/viewmodel/ExamPageViewModel.js
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSettings } from "../settings/SettingsContext.jsx";
import getAnsweredCountLabel from "./Utils/getAnsweredCountLabel.js";
import getScoreLabel from "./Utils/getScoreLabel.js";
import getQuestionProgressLabel from "./Utils/getQuestionProgressLabel.js";
import getFeedbackToggleLabel from "./Utils/getFeedbackToggleLabel.js";
import { QUESTION_TYPES } from "../../constants/QuestionTypes.js";

const LOAD_ERROR_MESSAGE = "Kunne ikke laste eksamen";

export default function useExamPageViewModel(getExamQuestionsUseCase, gradeAnswerUseCase, calculateExamScoreUseCase, examId, language) {
	const { randomizeAnswerOptions } = useSettings();

	const [questions, setQuestions] = useState([]);
	const [answers, setAnswers] = useState({});
	const [submitted, setSubmitted] = useState(false);
	const [showAllFeedback, setShowAllFeedback] = useState(true);
	const [questionsLoading, setQuestionsLoading] = useState(true);
	const [questionsLoadError, setQuestionsLoadError] = useState(null);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [elapsedSeconds, setElapsedSeconds] = useState(0);
	const [expandedAnswerOptionByQuestionId, setExpandedAnswerOptionByQuestionId] = useState({});
	const [answerOptionOrderByQuestionId, setAnswerOptionOrderByQuestionId] = useState({});

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

	const expandedAnswerOptionIndex = currentQuestion
		? expandedAnswerOptionByQuestionId[currentQuestion.id] ?? null
		: null;

	const canGoPrevious = currentQuestionIndex > 0;
	const canGoNext = currentQuestionIndex < visibleQuestionCount - 1;

	const currentQuestionIsCorrect = getCurrentQuestionIsCorrect(
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
		setExpandedAnswerOptionByQuestionId((previousExpandedByQuestionId) => {
			const currentExpandedIndex = previousExpandedByQuestionId[questionId];

			if (currentExpandedIndex === optionIndex) {
				const nextExpandedByQuestionId = { ...previousExpandedByQuestionId };
				delete nextExpandedByQuestionId[questionId];
				return nextExpandedByQuestionId;
			}

			return {
				...previousExpandedByQuestionId,
				[questionId]: optionIndex
			};
		});
	}, []);

	const submitExam = useCallback(() => {
		setSubmitted(true);
		scrollExamWorkspaceToTop(examWorkspaceRef);
	}, [examWorkspaceRef]);

	const resetExam = useCallback(() => {
		setAnswers({});
		setSubmitted(false);
		setShowAllFeedback(true);
		setCurrentQuestionIndex(0);
		setElapsedSeconds(0);
		setExpandedAnswerOptionByQuestionId({});
		setAnswerOptionOrderByQuestionId(createAnswerOptionOrderByQuestionId(questions));

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
					setExpandedAnswerOptionByQuestionId({});
					setAnswerOptionOrderByQuestionId(createAnswerOptionOrderByQuestionId(loadedQuestions));
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
		currentQuestionIsCorrect,
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
		answeredCount,
		answeredCountLabel,
		scoreLabel,
		questionProgressLabel,
		feedbackToggleLabel,
		elapsedTimeLabel,

		expandedAnswerOptionIndex,

		examWorkspaceRef,

		canGoPrevious,
		canGoNext,
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

const isQuestionAnswered = (question, answer) => {
	if (question.type === QUESTION_TYPES.MULTI) {
		return Array.isArray(answer) && answer.length > 0;
	}

	if (question.type === QUESTION_TYPES.DRAG_DROP || question.type === QUESTION_TYPES.DRAG_CATEGORIZE) {
		return answerHasAtLeastOneObjectValue(answer);
	}

	if (question.type === QUESTION_TYPES.MATRIX_PLACEMENT) {
		return answerHasAtLeastOneObjectValue(answer?.placements ?? answer);
	}

	return answer !== undefined && String(answer).trim() !== "";
};

const answerHasAtLeastOneObjectValue = (answer) => {
	return Boolean(
		answer &&
		typeof answer === "object" &&
		!Array.isArray(answer) &&
		Object.values(answer).some(Boolean)
	);
};

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

const deriveWorkspaceClassName = (question, submitted) => {
	const shouldUseScrollFooter = shouldQuestionUseScrollFooter(question, submitted);
	const shouldUseWideQuestionLayout = shouldQuestionUseWideLayout(question);
	const shouldUseExtraWideQuestionLayout = shouldQuestionUseExtraWideLayout(question);
	const shouldUseDenseDragCategorizeLayout = shouldQuestionUseDenseDragCategorizeLayout(question);
	const isMatrixPlacementQuestion = question?.type === QUESTION_TYPES.MATRIX_PLACEMENT;

	return [
		"exam-workspace",
		submitted ? "exam-workspace-feedback-mode" : "",
		shouldUseScrollFooter ? "exam-workspace-scroll-footer-mode" : "",
		shouldUseWideQuestionLayout ? "exam-workspace-wide-question-mode" : "",
		shouldUseExtraWideQuestionLayout ? "exam-workspace-extra-wide-question-mode" : "",
		shouldUseDenseDragCategorizeLayout ? "exam-workspace-dense-drag-categorize-mode" : "",
		isMatrixPlacementQuestion ? "exam-workspace-matrix-placement-mode" : ""
	].filter(Boolean).join(" ");
};

const shouldQuestionUseScrollFooter = (question, submitted) => {
	if (submitted) {
		return false;
	}

	const optionCount = question?.options?.length ?? 0;
	const dragDropTargetCount = question?.targets?.length ?? 0;
	const dragCategorizeCategoryCount = question?.categories?.length ?? 0;
	const matrixQuadrantCount = getMatrixPlacementQuadrantCount(question);
	const isDragDropQuestion = question?.type === QUESTION_TYPES.DRAG_DROP;
	const isDragCategorizeQuestion = question?.type === QUESTION_TYPES.DRAG_CATEGORIZE;
	const isMatrixPlacementQuestion = question?.type === QUESTION_TYPES.MATRIX_PLACEMENT;

	return optionCount >= 6 ||
		isDragDropQuestion ||
		isDragCategorizeQuestion ||
		isMatrixPlacementQuestion ||
		dragDropTargetCount >= 5 ||
		dragCategorizeCategoryCount >= 4 ||
		matrixQuadrantCount >= 4;
};

const shouldQuestionUseWideLayout = (question) => {
	if (question?.type === QUESTION_TYPES.DRAG_CATEGORIZE) {
		return question.categories?.length >= 5 || getLongestDragCategorizeTextLength(question) >= 34;
	}

	if (question?.type === QUESTION_TYPES.MATRIX_PLACEMENT) {
		return getMatrixPlacementQuadrantCount(question) >= 4 || getLongestMatrixPlacementTextLength(question) >= 34;
	}

	return false;
};

const shouldQuestionUseExtraWideLayout = (question) => {
	if (question?.type === QUESTION_TYPES.DRAG_CATEGORIZE) {
		const categoryCount = question.categories?.length ?? 0;
		const longestTextLength = getLongestDragCategorizeTextLength(question);

		return (categoryCount >= 5 && longestTextLength >= 44) || longestTextLength >= 62;
	}

	if (question?.type === QUESTION_TYPES.MATRIX_PLACEMENT) {
		return getLongestMatrixPlacementTextLength(question) >= 70;
	}

	return false;
};

const shouldQuestionUseDenseDragCategorizeLayout = (question) => {
	if (question?.type !== QUESTION_TYPES.DRAG_CATEGORIZE) {
		return false;
	}

	return question.categories?.length >= 5 || getLongestDragCategorizeTextLength(question) >= 44;
};

const getMatrixPlacementQuadrantCount = (question) => {
	return question?.matrix?.quadrants?.length ?? question?.quadrants?.length ?? 0;
};

const getLongestDragCategorizeTextLength = (question) => {
	if (question?.type !== QUESTION_TYPES.DRAG_CATEGORIZE) {
		return 0;
	}

	const itemLengths = (question.items ?? []).map((questionItem) => String(questionItem?.label ?? "").length);
	const categoryLengths = (question.categories ?? []).map((category) => String(category?.label ?? "").length);

	return Math.max(0, ...itemLengths, ...categoryLengths);
};

const getLongestMatrixPlacementTextLength = (question) => {
	if (question?.type !== QUESTION_TYPES.MATRIX_PLACEMENT) {
		return 0;
	}

	const quadrants = question.matrix?.quadrants ?? question.quadrants ?? [];
	const itemLengths = (question.items ?? []).map((questionItem) => String(questionItem?.label ?? questionItem?.text ?? questionItem?.title ?? "").length);
	const quadrantLengths = quadrants.flatMap((quadrant) => [
		String(quadrant?.title ?? quadrant?.label ?? "").length,
		String(quadrant?.description ?? quadrant?.text ?? "").length
	]);
	const axisLengths = [
		String(question.matrix?.xAxis?.label ?? "").length,
		String(question.matrix?.yAxis?.label ?? "").length
	];

	return Math.max(0, ...itemLengths, ...quadrantLengths, ...axisLengths);
};

const createAnswerOptionOrderByQuestionId = (questions) => {
	return questions.reduce((answerOptionOrderByQuestionId, question) => {
		if (!Array.isArray(question.options) || question.options.length === 0) {
			return answerOptionOrderByQuestionId;
		}

		answerOptionOrderByQuestionId[question.id] = shuffleIndexes(question.options.length);

		return answerOptionOrderByQuestionId;
	}, {});
};

const shuffleIndexes = (length) => {
	const indexes = Array.from({ length }, (_, index) => index);

	for (let index = indexes.length - 1; index > 0; index -= 1) {
		const randomIndex = Math.floor(Math.random() * (index + 1));
		[indexes[index], indexes[randomIndex]] = [indexes[randomIndex], indexes[index]];
	}

	return indexes;
};

//src/ui/viewmodel/ExamPageViewModel.js
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import getAnsweredCountLabel from "../../utils/viewmodelutils/getAnsweredCountLabel.js";
import getScoreLabel from "../../utils/viewmodelutils/getScoreLabel.js";
import getQuestionProgressLabel from "../../utils/viewmodelutils/getQuestionProgressLabel.js";
import getFeedbackToggleLabel from "../../utils/viewmodelutils/getFeedbackToggleLabel.js";

const LOAD_ERROR_MESSAGE = "Kunne ikke laste eksamen";

export default function useExamPageViewModel(getExamQuestionsUseCase, gradeAnswerUseCase, calculateExamScoreUseCase, examId, randomizeAnswerOptions = false) {
	//Statevariabler
	const [questions, setQuestions] = useState([]);
	const [answers, setAnswers] = useState({});
	const [submitted, setSubmitted] = useState(false);
	const [showAllFeedback, setShowAllFeedback] = useState(true);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [elapsedSeconds, setElapsedSeconds] = useState(0);
	const [expandedAnswerOptionByQuestionId, setExpandedAnswerOptionByQuestionId] = useState({});
	const [answerOptionOrderByQuestionId, setAnswerOptionOrderByQuestionId] = useState({});

	const examWorkspaceRef = useRef(null);

	//UseMemo for data
	const result = useMemo(() => {
		return calculateExamScoreUseCase.execute(questions, answers);
	}, [questions, answers, calculateExamScoreUseCase]);

	const answeredCount = useMemo(() => {
		return questions.filter((question) => {
			const answer = answers[question.id];

			if (question.type === "multi") {
				return Array.isArray(answer) && answer.length > 0;
			}

			return answer !== undefined && String(answer).trim() !== "";
		}).length;
	}, [questions, answers]);

	const visibleQuestions = questions;
	const visibleQuestionCount = visibleQuestions.length;
	const questionCount = questions.length;

	const currentQuestion = visibleQuestions[currentQuestionIndex] ?? null;

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
		result.score,
		result.totalPoints
	);

	const questionProgressLabel = getQuestionProgressLabel(
		currentQuestionIndex,
		visibleQuestionCount
	);

	const feedbackToggleLabel = getFeedbackToggleLabel(showAllFeedback);

	const elapsedTimeLabel = useMemo(() => {
		return formatElapsedTime(elapsedSeconds);
	}, [elapsedSeconds]);

	//Handlers og navigasjon
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

	//Handlefunksjoner for svar
	const setSingleAnswer = useCallback((questionId, value) => {
		if (submitted) {
			return;
		}

		setAnswers((previousAnswers) => {
			return {
				...previousAnswers,
				[questionId]: value
			};
		});
	}, [submitted]);

	const toggleMultiAnswer = useCallback((questionId, value) => {
		if (submitted) {
			return;
		}

		setAnswers((previousAnswers) => {
			const currentAnswer = Array.isArray(previousAnswers[questionId])
				? previousAnswers[questionId]
				: [];

			const nextAnswer = currentAnswer.includes(value)
				? currentAnswer.filter((item) => item !== value)
				: [...currentAnswer, value];

			return {
				...previousAnswers,
				[questionId]: nextAnswer
			};
		});
	}, [submitted]);

	//Handlefunksjon for åpne/lukke svarkort
	const toggleAnswerOptionExpanded = useCallback((questionId, optionIndex) => {
		setExpandedAnswerOptionByQuestionId((previous) => {
			const currentExpandedIndex = previous[questionId];

			if (currentExpandedIndex === optionIndex) {
				const next = { ...previous };
				delete next[questionId];
				return next;
			}

			return {
				...previous,
				[questionId]: optionIndex
			};
		});
	}, []);

	//Handler for eksamen
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
		setShowAllFeedback((value) => !value);
	}, []);

	const isAnswerCorrect = useCallback((question) => {
		return gradeAnswerUseCase.execute(question, answers[question.id]);
	}, [gradeAnswerUseCase, answers]);

	//Effekter for datahåndtering
	const loadQuestions = useCallback(() => {
		let cancelled = false;

		const run = async () => {
			try {
				setLoading(true);
				setError(null);

				const result = await getExamQuestionsUseCase.execute(examId);

				if (!cancelled) {
					setQuestions(result);
					setAnswers({});
					setSubmitted(false);
					setShowAllFeedback(true);
					setCurrentQuestionIndex(0);
					setElapsedSeconds(0);
					setExpandedAnswerOptionByQuestionId({});
					setAnswerOptionOrderByQuestionId(createAnswerOptionOrderByQuestionId(result));
				}
			}

			catch (error) {
				if (!cancelled) {
					setError(error?.message ?? LOAD_ERROR_MESSAGE);
				}
			}

			finally {
				if (!cancelled) {
					setLoading(false);
				}
			}
		};

		run();

		return () => {
			cancelled = true;
		};
	}, [getExamQuestionsUseCase, examId]);

	//Effekter for navigasjon mellom sidene
	const onVisibleQuestionsChangedClampCurrentIndex = useCallback(() => {
		if (visibleQuestionCount === 0) {
			setCurrentQuestionIndex(0);
			return;
		}

		if (currentQuestionIndex > visibleQuestionCount - 1) {
			setCurrentQuestionIndex(visibleQuestionCount - 1);
		}
	}, [visibleQuestionCount, currentQuestionIndex]);

	useEffect(loadQuestions, [loadQuestions]);
	useEffect(onVisibleQuestionsChangedClampCurrentIndex, [onVisibleQuestionsChangedClampCurrentIndex]);

	useEffect(() => {
		if (submitted) {
			return;
		}

		const intervalId = window.setInterval(() => {
			setElapsedSeconds((value) => value + 1);
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

		loading,
		error,
		submitted,
		showAllFeedback,
		randomizeAnswerOptions,
		answerOptionOrderByQuestionId,

		score: result.score,
		totalPoints: result.totalPoints,
		percentage: result.percentage,
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

const createAnswerOptionOrderByQuestionId = (questions) => {
	return questions.reduce((orders, question) => {
		if (!Array.isArray(question.options) || question.options.length === 0) {
			return orders;
		}

		orders[question.id] = shuffleIndexes(question.options.length);

		return orders;
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

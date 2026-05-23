// src/ui/viewmodel/useExamViewModel.js
import { useCallback, useEffect, useMemo, useState } from "react";
import getAnsweredCountLabel from "../../utils/viewmodelutils/getAnsweredCountLabel.js";
import getScoreLabel from "../../utils/viewmodelutils/getScoreLabel.js";
import getQuestionProgressLabel from "../../utils/viewmodelutils/getQuestionProgressLabel.js";
import getFeedbackToggleLabel from "../../utils/viewmodelutils/getFeedbackToggleLabel.js";

const INITIAL_FILTER = "all";
const LOAD_ERROR_MESSAGE = "Kunne ikke laste eksamen";

export default function useExamViewModel( getExamQuestionsUseCase, gradeAnswerUseCase, calculateExamScoreUseCase) {
	
	//Statevariabler
	const [questions, setQuestions] = useState([]);
	const [answers, setAnswers] = useState({});
	const [submitted, setSubmitted] = useState(false);
	const [showAllFeedback, setShowAllFeedback] = useState(true);
	const [filter, setFilter] = useState(INITIAL_FILTER);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);


	//Usememo for data
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

	const visibleQuestions = useMemo(() => {
		if (!submitted || filter === INITIAL_FILTER) {
			return questions;
		}

		return questions.filter((question) => {
			const correct = gradeAnswerUseCase.execute(
				question,
				answers[question.id]
			);

			if (filter === "wrong") {
				return !correct;
			}

			if (filter === "right") {
				return correct;
			}

			return true;
		});
	}, [questions, answers, submitted, filter, gradeAnswerUseCase]);

	const visibleQuestionCount = visibleQuestions.length;
	const questionCount = questions.length;

	const currentQuestion = visibleQuestions[currentQuestionIndex] ?? null;

	const canGoPrevious = currentQuestionIndex > 0;
	const canGoNext = currentQuestionIndex < visibleQuestionCount - 1;

	const answeredCountLabel = getAnsweredCountLabel(answeredCount, questionCount);

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


	//Handlers og navigasjon
	const previousQuestion = useCallback(() => {
		setCurrentQuestionIndex((previousIndex) => {
			return Math.max(previousIndex - 1, 0);
		});
	}, []);

	const nextQuestion = useCallback(() => {
		setCurrentQuestionIndex((previousIndex) => {
			if (visibleQuestionCount === 0) {
				return 0;
			}

			return Math.min(previousIndex + 1, visibleQuestionCount - 1);
		});
	}, [visibleQuestionCount]);

	const goToQuestion = useCallback((index) => {
		if (index < 0 || index >= visibleQuestionCount) {
			return;
		}

		setCurrentQuestionIndex(index);
	}, [visibleQuestionCount]);


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


	//Handler for eksamen
	const submitExam = useCallback(() => {
		setSubmitted(true);
	}, []);

	const resetExam = useCallback(() => {
		setAnswers({});
		setSubmitted(false);
		setShowAllFeedback(true);
		setFilter(INITIAL_FILTER);
		setCurrentQuestionIndex(0);

		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	}, []);

	const toggleShowAllFeedback = useCallback(() => {
		setShowAllFeedback((value) => !value);
	}, []);

	const isAnswerCorrect = useCallback((question) => {
		return gradeAnswerUseCase.execute(question, answers[question.id]);
	}, [gradeAnswerUseCase, answers]);


	// Effekter for datahåntering
	const onMountedLoadQuestions = useCallback(() => {
		let cancelled = false;

		const run = async () => {
			try {
				setLoading(true);
				setError(null);

				const result = await getExamQuestionsUseCase.execute();

				if (!cancelled) {
					setQuestions(result);
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
	}, [getExamQuestionsUseCase]);


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

	useEffect(onMountedLoadQuestions, [onMountedLoadQuestions]);
	useEffect(onVisibleQuestionsChangedClampCurrentIndex, [onVisibleQuestionsChangedClampCurrentIndex]);

	return {
		questions,
		visibleQuestions,
		currentQuestion,
		currentQuestionIndex,
		answers,

		loading,
		error,
		submitted,
		showAllFeedback,
		filter,

		score: result.score,
		totalPoints: result.totalPoints,
		percentage: result.percentage,
		answeredCount,
		answeredCountLabel,
		scoreLabel,
		questionProgressLabel,
		feedbackToggleLabel,

		canGoPrevious,
		canGoNext,
		previousQuestion,
		nextQuestion,
		goToQuestion,

		setSingleAnswer,
		toggleMultiAnswer,
		submitExam,
		resetExam,
		toggleShowAllFeedback,
		setShowAllFeedback,
		setFilter,
		isAnswerCorrect
	};
}
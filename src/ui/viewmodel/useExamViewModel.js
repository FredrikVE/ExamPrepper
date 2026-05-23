// src/ui/viewmodel/useExamViewModel.js
import { useEffect, useMemo, useState } from "react";

export default function useExamViewModel(
	getExamQuestionsUseCase,
	gradeAnswerUseCase,
	calculateExamScoreUseCase
) {
	const [questions, setQuestions] = useState([]);
	const [answers, setAnswers] = useState({});
	const [submitted, setSubmitted] = useState(false);
	const [showAllFeedback, setShowAllFeedback] = useState(true);
	const [filter, setFilter] = useState("all");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

	useEffect(() => {
		let cancelled = false;

		async function loadQuestions() {
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
					setError(error?.message ?? "Kunne ikke laste eksamen");
				}
			}

			finally {
				if (!cancelled) {
					setLoading(false);
				}
			}
		}

		loadQuestions();

		return () => {
			cancelled = true;
		};
	}, [getExamQuestionsUseCase]);

	const result = useMemo(
		() => calculateExamScoreUseCase.execute(questions, answers),
		[questions, answers, calculateExamScoreUseCase]
	);

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
		if (!submitted || filter === "all") {
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

	useEffect(() => {
		if (visibleQuestions.length === 0) {
			setCurrentQuestionIndex(0);
			return;
		}

		if (currentQuestionIndex > visibleQuestions.length - 1) {
			setCurrentQuestionIndex(visibleQuestions.length - 1);
		}
	}, [visibleQuestions, currentQuestionIndex]);

	const currentQuestion = visibleQuestions[currentQuestionIndex] ?? null;

	const canGoPrevious = currentQuestionIndex > 0;
	const canGoNext = currentQuestionIndex < visibleQuestions.length - 1;

	const answeredCountLabel = `${answeredCount}/${questions.length}`;
	const scoreLabel = submitted ? `${result.score}/${result.totalPoints}` : "—";

	function previousQuestion() {
		setCurrentQuestionIndex((previousIndex) => {
			return Math.max(previousIndex - 1, 0);
		});
	}

	function nextQuestion() {
		setCurrentQuestionIndex((previousIndex) => {
			return Math.min(previousIndex + 1, visibleQuestions.length - 1);
		});
	}

	function goToQuestion(index) {
		if (index < 0 || index >= visibleQuestions.length) {
			return;
		}

		setCurrentQuestionIndex(index);
	}

	function setSingleAnswer(questionId, value) {
		if (submitted) {
			return;
		}

		setAnswers((previousAnswers) => {
			return {
				...previousAnswers,
				[questionId]: value
			};
		});
	}

	function toggleMultiAnswer(questionId, value) {
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
	}

	function submitExam() {
		setSubmitted(true);
	}

	function resetExam() {
		setAnswers({});
		setSubmitted(false);
		setShowAllFeedback(true);
		setFilter("all");
		setCurrentQuestionIndex(0);

		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	}

	function toggleShowAllFeedback() {
		setShowAllFeedback((value) => !value);
	}

	function isAnswerCorrect(question) {
		return gradeAnswerUseCase.execute(question, answers[question.id]);
	}

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
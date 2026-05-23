// src/ui/viewmodel/useExamViewModel.js
import { useEffect, useMemo, useState } from "react";

export default function useExamViewModel(getExamQuestionsUseCase, gradeAnswerUseCase, calculateExamScoreUseCase) {
	
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

	const visibleQuestionCount = visibleQuestions.length;
	const questionCount = questions.length;

	useEffect(() => {
		if (visibleQuestionCount === 0) {
			setCurrentQuestionIndex(0);
			return;
		}

		if (currentQuestionIndex > visibleQuestionCount - 1) {
			setCurrentQuestionIndex(visibleQuestionCount - 1);
		}
	}, [visibleQuestionCount, currentQuestionIndex]);

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

	function previousQuestion() {
		setCurrentQuestionIndex((previousIndex) => {
			return Math.max(previousIndex - 1, 0);
		});
	}

	function nextQuestion() {
		setCurrentQuestionIndex((previousIndex) => {
			if (visibleQuestionCount === 0) {
				return 0;
			}

			return Math.min(previousIndex + 1, visibleQuestionCount - 1);
		});
	}

	function goToQuestion(index) {
		if (index < 0 || index >= visibleQuestionCount) {
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
		questionProgressLabel,

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

function getAnsweredCountLabel(answeredCount, questionCount) {
	return `${answeredCount}/${questionCount}`;
}

function getScoreLabel(submitted, score, totalPoints) {
	if (submitted) {
		return `${score}/${totalPoints}`;
	}

	return "—";
}

function getQuestionProgressLabel(currentQuestionIndex, questionCount) {
	if (questionCount === 0) {
		return "0 / 0";
	}

	return `${currentQuestionIndex + 1} / ${questionCount}`;
}
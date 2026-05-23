//src/ui/viewmodel/useExamViewModel.js
import { useEffect, useMemo, useState } from "react";

export default function useExamViewModel(getExamQuestionsUseCase, gradeAnswerUseCase, calculateExamScoreUseCase) {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [showAllFeedback, setShowAllFeedback] = useState(true);
    const [filter, setFilter] = useState("all");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;

        async function loadQuestions() {
            try {
                setLoading(true);
                setError(null);
                const result = await getExamQuestionsUseCase.execute();
                if (!cancelled) setQuestions(result);
            } catch (error) {
                if (!cancelled) setError(error?.message ?? "Kunne ikke laste eksamen");
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        loadQuestions();
        return () => { cancelled = true; };
    }, [getExamQuestionsUseCase]);

    const result = useMemo(() => calculateExamScoreUseCase.execute(questions, answers), [questions, answers, calculateExamScoreUseCase]);

    const answeredCount = useMemo(() => {
        return questions.filter((question) => {
            const answer = answers[question.id];
            if (question.type === "multi") return Array.isArray(answer) && answer.length > 0;
            return answer !== undefined && String(answer).trim() !== "";
        }).length;
    }, [questions, answers]);

    const visibleQuestions = useMemo(() => {
        if (!submitted || filter === "all") return questions;
        return questions.filter((question) => {
            const correct = gradeAnswerUseCase.execute(question, answers[question.id]);
            if (filter === "wrong") return !correct;
            if (filter === "right") return correct;
            return true;
        });
    }, [questions, answers, submitted, filter, gradeAnswerUseCase]);

    function setSingleAnswer(questionId, value) {
        if (submitted) return;
        setAnswers((previous) => ({ ...previous, [questionId]: value }));
    }

    function toggleMultiAnswer(questionId, value) {
        if (submitted) return;
        setAnswers((previous) => {
            const current = Array.isArray(previous[questionId]) ? previous[questionId] : [];
            const next = current.includes(value) ? current.filter((item) => item !== value) : [...current, value];
            return { ...previous, [questionId]: next };
        });
    }

    function submitExam() { setSubmitted(true); }

    function resetExam() {
        setAnswers({});
        setSubmitted(false);
        setShowAllFeedback(true);
        setFilter("all");
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function isAnswerCorrect(question) {
        return gradeAnswerUseCase.execute(question, answers[question.id]);
    }

    return {
        questions,
        visibleQuestions,
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
        setSingleAnswer,
        toggleMultiAnswer,
        submitExam,
        resetExam,
        setShowAllFeedback,
        setFilter,
        isAnswerCorrect
    };
}

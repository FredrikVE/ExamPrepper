// src/ui/viewmodel/ExamSelectPageViewModel.js
import { useCallback, useEffect, useMemo, useState } from "react";

function normalizeExamResult(result) {
    if (Array.isArray(result)) {
        return result;
    }

    if (Array.isArray(result?.exams)) {
        return result.exams;
    }

    if (Array.isArray(result?.availableExams)) {
        return result.availableExams;
    }

    return [];
}

export default function useExamSelectPageViewModel(getAvailableExamsUseCase, language, t, selectedSubject, onSelectExam, onShowStatistics = () => {}) {
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const subjectId = selectedSubject?.id ?? null;

    useEffect(() => {
        if (!subjectId) {
            setExams([]);
            setLoading(false);
            setError(null);
            return;
        }

        let cancelled = false;

        const fetchExams = async () => {
            try {
                setLoading(true);
                setError(null);

                const result = await getAvailableExamsUseCase.execute({
                    subjectId,
                    language
                });

                if (cancelled) {
                    return;
                }

                setExams(normalizeExamResult(result));
            } 
            catch (error) {
                console.error("Feil ved henting av eksamener:", error);

                if (!cancelled) {
                    setExams([]);
                    setError(t.selectErrorMessage ?? "Kunne ikke laste inn eksamener.");
                }
            } 
            finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        fetchExams();

        return () => {
            cancelled = true;
        };
    }, [getAvailableExamsUseCase, subjectId, language, t]);

    const subtitle = useMemo(() => {
        if (!selectedSubject?.code) {
            return t.selectSubtitleFallback ?? "Velg en øvingsprøve for å starte";
        }

        if (typeof t.selectSubtitle === "function") {
            return t.selectSubtitle(selectedSubject.code);
        }

        return `Velg en øvingsprøve for ${selectedSubject.code}`;
    }, [selectedSubject, t]);

    const selectExam = useCallback((examId) => {
        onSelectExam(examId);
    }, [onSelectExam]);

    const showStatistics = useCallback(() => {
        onShowStatistics();
    }, [onShowStatistics]);

    return {
        // Data
        exams,
        selectedSubject,
        loading,
        error,

        // Tekster
        t,
        title: t.selectTitle ?? "Eksamens-emulator",            // å ha "magic strenger" sånn som dette er jalla. Aldri gjør dette.
        introTitle: t.selectIntroTitle ?? "Velg eksamen",
        subtitle,

        // Derived UI-state
        hasExams: exams.length > 0,
        examCount: exams.length,

        // Handlers
        selectExam,
        showStatistics
    };
}
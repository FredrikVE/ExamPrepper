//src/ui/viewmodel/ExamSelectPageViewModel.js
import { useCallback, useEffect, useMemo, useState } from "react";

const LOAD_ERROR_MESSAGE = "Kunne ikke laste eksamener";

export default function useExamSelectPageViewModel(getAvailableExamsUseCase, language, t, selectedSubject, onSelectExam) {
    // Statevariabler for eksamens-data, loading og error
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const subjectId = selectedSubject?.id ?? null;

    // Henter eksamener for valgt fag og aktivt språk
    useEffect(() => {
        let cancelled = false;

        const fetchExams = async () => {
            if (!subjectId) {
                setExams([]);
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);

                const result = await getAvailableExamsUseCase.execute({
                    lang: language,
                    subjectId
                });

                if (!cancelled) {
                    setExams(result);
                }
            }
            catch (error) {
                console.error("Feil ved henting av eksamener:", error);

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

        fetchExams();

        return () => {
            cancelled = true;
        };
    }, [getAvailableExamsUseCase, language, subjectId]);

    const examCount = exams.length;
    const hasExams = examCount > 0;

    const pageTitle = useMemo(() => {
        if (!selectedSubject?.code) {
            return t.selectTitle;
        }

        return t.selectSubtitle(selectedSubject.code);
    }, [selectedSubject, t]);

    const selectExam = useCallback((examId) => {
        onSelectExam(examId);
    }, [onSelectExam]);

    return {
        // Data
        exams,
        selectedSubject,
        examCount,
        hasExams,
        pageTitle,
        loading,
        error,
        t,

        // Handlers
        selectExam
    };
}

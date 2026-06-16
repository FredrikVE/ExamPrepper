// src/ui/viewmodel/ExamSelectPageViewModel.js
import { useCallback, useEffect, useMemo, useState } from "react";
import createExamSelectPageCopy from "./ExamSelectPage/createExamSelectPageCopy.js";

export default function useExamSelectPageViewModel(getAvailableExamsUseCase, language, t, selectedSubject, onSelectExam) {
    const [exams, setExams] = useState([]);
    const [examsLoading, setExamsLoading] = useState(false);
    const [examsLoadError, setExamsLoadError] = useState(null);

    const subjectId = selectedSubject?.id ?? null;

    useEffect(() => {
        if (!subjectId) {
            setExams([]);
            setExamsLoading(false);
            setExamsLoadError(null);
            return;
        }

        let cancelled = false;

        async function loadExams() {
            try {
                setExamsLoading(true);
                setExamsLoadError(null);

                const loadedExams = await getAvailableExamsUseCase.execute({
                    subjectId,
                    language
                });

                if (!cancelled) {
                    setExams(loadedExams);
                }
            }
            catch (error) {
                console.error("Feil ved henting av eksamener:", error);

                if (!cancelled) {
                    setExams([]);
                    setExamsLoadError(t.selectErrorMessage);
                }
            }
            finally {
                if (!cancelled) {
                    setExamsLoading(false);
                }
            }
        }

        loadExams();

        return () => {
            cancelled = true;
        };
    }, [getAvailableExamsUseCase, subjectId, language, t.selectErrorMessage]);

    const pageCopy = useMemo(() => {
        return createExamSelectPageCopy(t, selectedSubject);
    }, [t, selectedSubject]);

    const selectExam = useCallback((examId) => {
        onSelectExam(examId);
    }, [onSelectExam]);

    return {
        exams,
        selectedSubject,
        examsLoading,
        examsLoadError,
        ...pageCopy,
        selectExam
    };
}

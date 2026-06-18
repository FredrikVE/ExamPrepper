// src/ui/viewmodel/ExamSelectPageViewModel.js
import { useCallback, useEffect, useMemo, useState } from "react";
import createExamSelectPageCopy from "./ExamSelectPage/createExamSelectPageCopy.js";
import { ALL_CATEGORIES, buildExamCategories, filterExams } from "./ExamSelectPage/examSelectPageFilters.js";

export default function useExamSelectPageViewModel(getAvailableExamsUseCase, language, t, selectedSubject, onSelectExam) {
    const [exams, setExams] = useState([]);
    const [examsLoading, setExamsLoading] = useState(false);
    const [examsLoadError, setExamsLoadError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState(ALL_CATEGORIES);
    const [isSearchFocused, setIsSearchFocused] = useState(false);

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

    const categories = useMemo(() => {
        return buildExamCategories(exams);
    }, [exams]);

    const filteredExams = useMemo(() => {
        return filterExams(exams, searchTerm, category);
    }, [exams, searchTerm, category]);

    const searchSuggestions = useMemo(() => {
        if (!searchTerm.trim()) {
            return [];
        }

        return filteredExams.map((exam) => ({
            id: exam.id,
            label: exam.title
        }));
    }, [filteredExams, searchTerm]);

    const changeSearchTerm = useCallback((nextSearchTerm) => {
        setSearchTerm(nextSearchTerm);
    }, []);

    const changeCategory = useCallback((nextCategory) => {
        setCategory(nextCategory);
    }, []);

    const focusSearch = useCallback(() => {
        setIsSearchFocused(true);
    }, []);

    const blurSearch = useCallback(() => {
        setIsSearchFocused(false);
    }, []);

    const selectExam = useCallback((examId) => {
        onSelectExam(examId);
    }, [onSelectExam]);

    return {
        // Data
        exams: filteredExams,
        selectedSubject,
        examsLoading,
        examsLoadError,
        categories,
        ...pageCopy,

        // Søk og filter
        searchTerm,
        category,
        isSearchFocused,
        searchSuggestions,

        // Handlers
        changeSearchTerm,
        changeCategory,
        focusSearch,
        blurSearch,
        selectExam
    };
}

// src/ui/viewmodel/ExamSelectPageViewModel.js
import { useCallback, useEffect, useMemo, useState } from "react";
import createExamSelectPageCopy from "./ExamSelectPage/createExamSelectPageCopy.js";
import { ALL_CATEGORIES, buildExamCategories, filterExams } from "./ExamSelectPage/examSelectPageFilters.js";

export default function useExamSelectPageViewModel(getAvailableExamsUseCase, language, t, selectedSubject, onSelectExam, isActive) {
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

    const categoryLabel = useMemo(() => {
        return category === ALL_CATEGORIES ? t.filterAllLabel : category;
    }, [category, t.filterAllLabel]);

    const closeSearch = useCallback(() => {
        setIsSearchFocused(false);
    }, []);

    useEffect(() => {
        if (!isActive) {
            closeSearch();
        }
    }, [isActive, closeSearch]);

    const changeSearchTerm = useCallback((nextSearchTerm) => {
        setSearchTerm(nextSearchTerm);
    }, []);

    const changeCategory = useCallback((nextCategory) => {
        closeSearch();
        setCategory(nextCategory);
    }, [closeSearch]);

    const focusSearch = useCallback(() => {
        setIsSearchFocused(true);
    }, []);

    const blurSearch = closeSearch;

    const selectExam = useCallback((examId) => {
        closeSearch();
        onSelectExam(examId);
    }, [closeSearch, onSelectExam]);

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
        categoryLabel,
        isSearchFocused,
        searchSuggestions,
        searchCloseLabel: t.searchCloseLabel,
        searchLabel: t.examSearchLabel,
        searchPlaceholder: t.examSearchPlaceholder,
        categoryAriaLabel: t.examCategoryLabel,
        allCategoriesLabel: t.examAllCategories,

        // Handlers
        changeSearchTerm,
        changeCategory,
        focusSearch,
        blurSearch,
        closeSearch,
        selectExam
    };
}

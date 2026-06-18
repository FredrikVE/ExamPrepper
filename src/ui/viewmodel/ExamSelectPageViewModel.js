// src/ui/viewmodel/ExamSelectPageViewModel.js
import { useCallback, useEffect, useMemo, useState } from "react";
import createExamSelectPageCopy from "./ExamSelectPage/createExamSelectPageCopy.js";
import { ALL_CATEGORIES, buildExamCategories, filterExams } from "./ExamSelectPage/examSelectPageFilters.js";

const SEARCH_SHEET_MODES = {
    SEARCH_SUGGESTIONS: "searchSuggestions",
    FILTER_OPTIONS: "filterOptions"
};

const SEARCH_SUGGESTION_LIMIT = 6;

export default function useExamSelectPageViewModel(getAvailableExamsUseCase, language, t, selectedSubject, onSelectExam, isActive) {
    const [exams, setExams] = useState([]);
    const [examsLoading, setExamsLoading] = useState(false);
    const [examsLoadError, setExamsLoadError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState(ALL_CATEGORIES);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [isSearchSheetOpen, setIsSearchSheetOpen] = useState(false);
    const [searchSheetMode, setSearchSheetMode] = useState(SEARCH_SHEET_MODES.SEARCH_SUGGESTIONS);

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
        return filteredExams.slice(0, SEARCH_SUGGESTION_LIMIT).map((exam) => ({
            id: exam.id,
            label: exam.title
        }));
    }, [filteredExams]);

    const categoryFilterOptions = useMemo(() => {
        return [
            {
                id: ALL_CATEGORIES,
                value: ALL_CATEGORIES,
                label: t.examAllCategoriesSheetOption ?? t.examAllCategories
            },
            ...categories.map((categoryOption) => ({
                id: categoryOption,
                value: categoryOption,
                label: categoryOption
            }))
        ];
    }, [categories, t.examAllCategories, t.examAllCategoriesSheetOption]);

    const isSearchSuggestionsMode = searchSheetMode === SEARCH_SHEET_MODES.SEARCH_SUGGESTIONS;
    const isFilterOptionsMode = searchSheetMode === SEARCH_SHEET_MODES.FILTER_OPTIONS;

    const categoryLabel = useMemo(() => {
        return category === ALL_CATEGORIES ? t.filterAllLabel : category;
    }, [category, t.filterAllLabel]);

    const closeExamSearchSheet = useCallback(() => {
        setIsSearchFocused(false);
        setIsSearchSheetOpen(false);
        setSearchSheetMode(SEARCH_SHEET_MODES.SEARCH_SUGGESTIONS);
    }, []);

    const closeSearch = closeExamSearchSheet;

    useEffect(() => {
        if (!isActive) {
            closeSearch();
        }
    }, [isActive, closeSearch]);

    const openExamSearchSuggestions = useCallback(() => {
        setIsSearchFocused(true);
        setIsSearchSheetOpen(true);
        setSearchSheetMode(SEARCH_SHEET_MODES.SEARCH_SUGGESTIONS);
    }, []);

    const openExamCategoryOptions = useCallback(() => {
        setIsSearchFocused(false);
        setIsSearchSheetOpen(true);
        setSearchSheetMode(SEARCH_SHEET_MODES.FILTER_OPTIONS);
    }, []);

    const changeExamSearchTerm = useCallback((nextSearchTerm) => {
        setSearchTerm(nextSearchTerm);
        setIsSearchFocused(true);
        setIsSearchSheetOpen(true);
        setSearchSheetMode(SEARCH_SHEET_MODES.SEARCH_SUGGESTIONS);
    }, []);

    const changeSearchTerm = changeExamSearchTerm;

    const changeCategory = useCallback((nextCategory) => {
        closeExamSearchSheet();
        setCategory(nextCategory);
    }, [closeExamSearchSheet]);

    const selectCategoryFilterOption = useCallback((nextCategory) => {
        setIsSearchFocused(false);
        setCategory(nextCategory);
        setIsSearchSheetOpen(true);
        setSearchSheetMode(SEARCH_SHEET_MODES.SEARCH_SUGGESTIONS);
    }, []);

    const focusSearch = openExamSearchSuggestions;

    const blurSearch = closeExamSearchSheet;

    const selectExam = useCallback((examId) => {
        closeExamSearchSheet();
        onSelectExam(examId);
    }, [closeExamSearchSheet, onSelectExam]);

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
        isSearchSheetOpen,
        isSearchSuggestionsMode,
        isFilterOptionsMode,
        searchSuggestions,
        categoryFilterOptions,
        searchCloseLabel: t.searchCloseLabel,
        searchLabel: t.examSearchLabel,
        searchPlaceholder: t.examSearchPlaceholder,
        categoryAriaLabel: t.examCategoryLabel,
        allCategoriesLabel: t.examAllCategories,

        // Handlers
        changeSearchTerm,
        changeExamSearchTerm,
        changeCategory,
        selectCategoryFilterOption,
        focusSearch,
        openExamSearchSuggestions,
        openExamCategoryOptions,
        blurSearch,
        closeSearch,
        closeExamSearchSheet,
        selectExam
    };
}

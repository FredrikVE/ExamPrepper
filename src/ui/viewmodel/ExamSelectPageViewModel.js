// src/ui/viewmodel/ExamSelectPageViewModel.js
import { useCallback, useEffect, useMemo, useState } from "react";
import { getExamSelectPageNavToolItems } from "../../navigation/navItems.js";
import { getExamSelectWorkspaceActionToolItems, getPageToolGroup } from "../../navigation/pageTools.js";
import { NAV_SCREENS } from "../../navigation/navGraph.js";
import createExamSelectPageCopy from "./ExamSelectPage/createExamSelectPageCopy.js";
import createWorkspaceToolsModel from "./Utils/createWorkspaceToolsModel.js";
import useSearchSheetModel, { SEARCH_SUGGESTION_LIMIT } from "./Search/useSearchSheetModel.js";
import { ALL_CATEGORIES, buildExamCategories, filterExams } from "./ExamSelectPage/examSelectPageFilters.js";

export default function useExamSelectPageViewModel(getAvailableExamsUseCase, language, t, selectedSubject, onSelectExam, isActive, onChangeScreen, showBackButton, backLabel, navigationLabel, onBack) {
    const [exams, setExams] = useState([]);
    const [examsLoading, setExamsLoading] = useState(false);
    const [examsLoadError, setExamsLoadError] = useState(null);
    const examSearchSheet = useSearchSheetModel({
        isActive,
        defaultFilterValue: ALL_CATEGORIES
    });
    const {
        searchTerm,
        filterValue: category,
        isSearchSheetOpen,
        isSearchSuggestionsMode,
        isFilterOptionsMode,
        changeSearchTerm: changeExamSearchTerm,
        changeFilterValue: changeCategory,
        selectFilterOption: selectCategoryFilterOption,
        openSearchSuggestions: openExamSearchSuggestions,
        openFilterOptions: openExamCategoryOptions,
        closeSearchSheet: closeExamSearchSheet
    } = examSearchSheet;

    const subjectId = selectedSubject?.id ?? null;

    useEffect(() => {
        if (!isActive || !subjectId) {
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
    }, [getAvailableExamsUseCase, isActive, subjectId, language, t.selectErrorMessage]);

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

    const categoryLabel = useMemo(() => {
        return category === ALL_CATEGORIES ? t.filterAllLabel : category;
    }, [category, t.filterAllLabel]);

    const selectExam = useCallback((examId) => {
        closeExamSearchSheet();
        onSelectExam(examId);
    }, [closeExamSearchSheet, onSelectExam]);

    const pageTools = useMemo(() => {
        return createWorkspaceToolsModel({
            pageToolGroup: getPageToolGroup(NAV_SCREENS.SELECT),
            t,
            navToolItems: getExamSelectPageNavToolItems(),
            workspaceActionToolItems: getExamSelectWorkspaceActionToolItems(),
            hasSelectedSubject: Boolean(subjectId),
            onChangeScreen
        });
    }, [onChangeScreen, subjectId, t]);

    return {
        // Data
        exams: filteredExams,
        selectedSubject,
        examsLoading,
        examsLoadError,
        categories,
        pageTools,
        ...pageCopy,

        addPlaceholderCode: t.examAddPlaceholderCode,
        addPlaceholderTitle: t.examAddPlaceholderTitle,
        addPlaceholderDescription: t.examAddPlaceholderDescription,
        addPlaceholderNote: t.examAddPlaceholderNote,

        // Navigasjon
        showBackButton,
        backLabel,
        navigationLabel,
        onBack,

        // Søk og filter
        searchTerm,
        category,
        categoryLabel,
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
        changeExamSearchTerm,
        changeCategory,
        selectCategoryFilterOption,
        openExamSearchSuggestions,
        openExamCategoryOptions,
        closeExamSearchSheet,
        selectExam
    };
}

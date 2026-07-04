// src/ui/viewmodel/ExamSelectPageViewModel.js
import { useCallback, useEffect, useMemo, useState } from "react";
import { getExamSelectWorkspaceActionToolItems, getPageToolGroup, PAGE_TOOL_AVAILABILITY } from "../../navigation/pageTools.js";
import { NAV_SCREENS } from "../../navigation/navGraph.js";
import { LEARNING_CONTENT_ENTRIES, LEARNING_CONTENT_TYPES } from "../../navigation/learningContent.js";
import createExamSelectPageCopy from "./ExamSelectPage/createExamSelectPageCopy.js";
import createWorkspaceToolsModel from "./Utils/createWorkspaceToolsModel.js";
import useSearchSheetModel, { SEARCH_SUGGESTION_LIMIT } from "./Search/useSearchSheetModel.js";
import { ALL_TOPIC_AREAS, filterExams } from "./ExamSelectPage/examSelectPageFilters.js";
import { filterDeckSummaries } from "./ExamSelectPage/flashcardDeckFilters.js";

export default function useExamSelectPageViewModel(
    getAvailableExamsUseCase,
    getTopicAreasUseCase,
    getFlashcardDeckSummariesUseCase,
    language,
    t,
    selectedSubject,
    onSelectExam,
    onSelectFlashcardDeck,
    isActive,
    onChangeScreen,
    showBackButton,
    backLabel,
    navigationLabel,
    onBack
) {
    const [exams, setExams] = useState([]);
    const [examsLoading, setExamsLoading] = useState(false);
    const [examsLoadError, setExamsLoadError] = useState(null);
    const [topicAreas, setTopicAreas] = useState([]);
    const [topicAreasLoading, setTopicAreasLoading] = useState(false);
    const [flashcardDeckSummaries, setFlashcardDeckSummaries] = useState([]);
    const [flashcardDecksLoading, setFlashcardDecksLoading] = useState(false);
    const [activeContentType, setActiveContentType] = useState(LEARNING_CONTENT_TYPES.EXAMS);

    const examSearchSheet = useSearchSheetModel({
        isActive,
        defaultFilterValue: ALL_TOPIC_AREAS
    });
    const {
        searchTerm,
        filterValue: topicAreaKey,
        isSearchSheetOpen,
        isSearchSuggestionsMode,
        isFilterOptionsMode,
        isFooterSheetOpen,
        isFooterOpen,
        changeSearchTerm: changeExamSearchTerm,
        changeFilterValue: changeTopicAreaKey,
        resetSearchSheet,
        selectFilterOption: selectTopicAreaFilterOption,
        openSearchSuggestions: openExamSearchSuggestions,
        openFilterOptions: openTopicAreaOptions,
        openFooterSheet: openExamFooterSheet,
        changeFooterSheetOpen: changeExamFooterSheetOpen,
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

    useEffect(() => {
        if (!isActive || !subjectId) {
            setTopicAreas([]);
            setTopicAreasLoading(false);
            return;
        }

        let cancelled = false;

        async function loadTopicAreas() {
            try {
                setTopicAreasLoading(true);

                const loadedTopicAreas = await getTopicAreasUseCase.execute({
                    subjectId,
                    language
                });

                if (!cancelled) {
                    setTopicAreas(loadedTopicAreas);
                }
            }
            catch (error) {
                console.error("Feil ved henting av fagområder:", error);

                if (!cancelled) {
                    setTopicAreas([]);
                }
            }
            finally {
                if (!cancelled) {
                    setTopicAreasLoading(false);
                }
            }
        }

        loadTopicAreas();

        return () => {
            cancelled = true;
        };
    }, [getTopicAreasUseCase, isActive, subjectId, language]);

    useEffect(() => {
        if (!isActive || !subjectId) {
            setFlashcardDeckSummaries([]);
            setFlashcardDecksLoading(false);
            return;
        }

        let cancelled = false;

        async function loadFlashcardDeckSummaries() {
            try {
                setFlashcardDecksLoading(true);

                const loadedDeckSummaries = await getFlashcardDeckSummariesUseCase.execute({
                    subjectId,
                    language
                });

                if (!cancelled) {
                    setFlashcardDeckSummaries(loadedDeckSummaries);
                }
            }
            catch (error) {
                console.error("Feil ved henting av flipcard-bunker:", error);

                if (!cancelled) {
                    setFlashcardDeckSummaries([]);
                }
            }
            finally {
                if (!cancelled) {
                    setFlashcardDecksLoading(false);
                }
            }
        }

        loadFlashcardDeckSummaries();

        return () => {
            cancelled = true;
        };
    }, [getFlashcardDeckSummariesUseCase, isActive, subjectId, language]);

    const pageCopy = useMemo(() => {
        return createExamSelectPageCopy(t, selectedSubject);
    }, [t, selectedSubject]);

    const selectContentType = useCallback((contentTypeId) => {
        const contentTypeEntry = findContentTypeEntry(contentTypeId);

        if (!contentTypeEntry || contentTypeEntry.availability === PAGE_TOOL_AVAILABILITY.UNAVAILABLE) {
            return;
        }

        setActiveContentType(contentTypeId);
        resetSearchSheet(ALL_TOPIC_AREAS);
    }, [resetSearchSheet]);

    const selectTopicAreaKey = useCallback((nextTopicAreaKey) => {
        changeTopicAreaKey(nextTopicAreaKey);
    }, [changeTopicAreaKey]);

    const contentToggleEntries = useMemo(() => {
        const entries = [];

        for (const entry of LEARNING_CONTENT_ENTRIES) {
            entries.push({
                id: entry.id,
                label: t[entry.labelKey],
                isDisabled: entry.availability === PAGE_TOOL_AVAILABILITY.UNAVAILABLE
            });
        }

        return entries;
    }, [t]);

    const visibleExams = useMemo(() => {
        return filterExams(exams, searchTerm, topicAreaKey);
    }, [exams, searchTerm, topicAreaKey]);

    const visibleFlashcardDecks = useMemo(() => {
        return filterDeckSummaries(flashcardDeckSummaries, searchTerm, topicAreaKey);
    }, [flashcardDeckSummaries, searchTerm, topicAreaKey]);

    const isExamsContentActive = activeContentType === LEARNING_CONTENT_TYPES.EXAMS;
    const isFlipcardsContentActive = activeContentType === LEARNING_CONTENT_TYPES.FLIPCARDS;
    const isConceptListsContentActive = activeContentType === LEARNING_CONTENT_TYPES.CONCEPT_LISTS;

    const searchSuggestions = useMemo(() => {
        if (isFlipcardsContentActive) {
            return createDeckSearchSuggestions(visibleFlashcardDecks);
        }

        return createExamSearchSuggestions(visibleExams);
    }, [isFlipcardsContentActive, visibleExams, visibleFlashcardDecks]);

    const topicAreaFilterOptions = useMemo(() => {
        const filterOptions = [
            {
                id: ALL_TOPIC_AREAS,
                value: ALL_TOPIC_AREAS,
                label: t.topicAreaAllLabel
            }
        ];

        for (const topicArea of topicAreas) {
            filterOptions.push({
                id: topicArea.key,
                value: topicArea.key,
                label: topicArea.label
            });
        }

        return filterOptions;
    }, [topicAreas, t.topicAreaAllLabel]);

    const topicAreaLabel = useMemo(() => {
        if (topicAreaKey === ALL_TOPIC_AREAS) {
            return t.filterAllLabel;
        }

        const topicArea = findTopicArea(topicAreas, topicAreaKey);

        return topicArea?.label ?? t.filterAllLabel;
    }, [topicAreas, topicAreaKey, t.filterAllLabel]);

    const searchPlaceholder = useMemo(() => {
        const activeEntry = findContentTypeEntry(activeContentType);

        return t[activeEntry?.searchPlaceholderKey] ?? t.examSearchPlaceholder;
    }, [activeContentType, t]);

    const selectExam = useCallback((examId) => {
        closeExamSearchSheet();
        onSelectExam(examId);
    }, [closeExamSearchSheet, onSelectExam]);

    const selectFlashcardDeck = useCallback((nextTopicAreaKey) => {
        closeExamSearchSheet();
        onSelectFlashcardDeck(nextTopicAreaKey);
    }, [closeExamSearchSheet, onSelectFlashcardDeck]);

    const selectSearchSuggestion = useCallback((suggestionId) => {
        if (isFlipcardsContentActive) {
            selectFlashcardDeck(suggestionId);
            return;
        }

        selectExam(suggestionId);
    }, [isFlipcardsContentActive, selectExam, selectFlashcardDeck]);

    const topicAreaToolItems = useMemo(() => {
        return createTopicAreaToolItems({
            topicAreas,
            t,
            selectedStatusLabel: t.pageToolsSelectedLabel,
            onSelectTopicArea: selectTopicAreaKey
        });
    }, [selectTopicAreaKey, t, topicAreas]);

    const pageTools = useMemo(() => {
        return createWorkspaceToolsModel({
            pageToolGroup: getPageToolGroup(NAV_SCREENS.SELECT),
            t,
            workspaceActionToolItems: getExamSelectWorkspaceActionToolItems(),
            topicAreaToolItems,
            activeTopicAreaKey: topicAreaKey,
            hasSelectedSubject: Boolean(subjectId),
            onChangeScreen
        });
    }, [onChangeScreen, subjectId, t, topicAreaKey, topicAreaToolItems]);

    const examsLoadingOrAuxiliaryLoading = examsLoading || topicAreasLoading || flashcardDecksLoading;

    return {
        // Data
        exams: visibleExams,
        visibleExams,
        visibleFlashcardDecks,
        selectedSubject,
        examsLoading: examsLoadingOrAuxiliaryLoading,
        examsLoadError,
        topicAreas,
        topicAreaKey,
        pageTools,
        ...pageCopy,

        addPlaceholderCode: t.examAddPlaceholderCode,
        addPlaceholderTitle: t.examAddPlaceholderTitle,
        addPlaceholderDescription: t.examAddPlaceholderDescription,
        addPlaceholderNote: t.examAddPlaceholderNote,

        // Innholdstyper
        activeContentType,
        contentToggleEntries,
        contentToggleAriaLabel: t.contentToggleAriaLabel,
        isExamsContentActive,
        isFlipcardsContentActive,
        isConceptListsContentActive,
        conceptListPlaceholderCode: t.contentToggleConceptListsLabel,
        conceptListPlaceholderTitle: t.conceptListPlaceholderTitle,
        conceptListPlaceholderDescription: t.conceptListPlaceholderDescription,
        conceptListPlaceholderNote: t.conceptListPlaceholderNote,
        deckCardCountLabel: t.deckCardCountLabel,
        deckCardUnitLabel: t.deckCardUnitLabel,
        deckEmptyTitle: t.deckEmptyTitle,
        deckEmptyMessage: t.deckEmptyMessage,
        flipcardsDeckEyebrow: t.contentToggleFlipcardsLabel,

        // Navigasjon
        showBackButton,
        backLabel,
        navigationLabel,
        onBack,

        // Søk og filter
        searchTerm,
        category: topicAreaKey,
        categoryLabel: topicAreaLabel,
        topicAreaKey,
        topicAreaLabel,
        isSearchSheetOpen,
        isSearchSuggestionsMode,
        isFilterOptionsMode,
        isFooterSheetOpen,
        isFooterOpen,
        searchSuggestions,
        categoryFilterOptions: topicAreaFilterOptions,
        topicAreaFilterOptions,
        searchCloseLabel: t.searchCloseLabel,
        searchLabel: t.examSearchLabel,
        searchPlaceholder,
        categoryAriaLabel: t.topicAreaFilterAriaLabel,
        allCategoriesLabel: t.topicAreaAllLabel,

        // Handlers
        changeExamSearchTerm,
        changeCategory: changeTopicAreaKey,
        changeTopicAreaKey,
        selectCategoryFilterOption: selectTopicAreaFilterOption,
        selectTopicAreaFilterOption,
        openExamSearchSuggestions,
        openExamCategoryOptions: openTopicAreaOptions,
        openTopicAreaOptions,
        openExamFooterSheet,
        changeExamFooterSheetOpen,
        closeExamSearchSheet,
        selectExam,
        selectFlashcardDeck,
        selectContentType,
        selectTopicAreaKey,
        selectSearchSuggestion
    };
}

function findContentTypeEntry(contentTypeId) {
    for (const entry of LEARNING_CONTENT_ENTRIES) {
        if (entry.id === contentTypeId) {
            return entry;
        }
    }

    return null;
}

function findTopicArea(topicAreas, topicAreaKey) {
    for (const topicArea of topicAreas) {
        if (topicArea.key === topicAreaKey) {
            return topicArea;
        }
    }

    return null;
}

function createExamSearchSuggestions(exams) {
    const searchSuggestions = [];

    for (const exam of exams) {
        if (searchSuggestions.length >= SEARCH_SUGGESTION_LIMIT) {
            break;
        }

        searchSuggestions.push({
            id: exam.id,
            label: exam.title
        });
    }

    return searchSuggestions;
}

function createDeckSearchSuggestions(deckSummaries) {
    const searchSuggestions = [];

    for (const deckSummary of deckSummaries) {
        if (searchSuggestions.length >= SEARCH_SUGGESTION_LIMIT) {
            break;
        }

        searchSuggestions.push({
            id: deckSummary.topicAreaKey,
            label: deckSummary.title
        });
    }

    return searchSuggestions;
}

function createTopicAreaToolItems(params) {
    const items = [
        {
            id: `topic-area-${ALL_TOPIC_AREAS}`,
            topicAreaKey: ALL_TOPIC_AREAS,
            iconKey: "list",
            label: params.t.topicAreaAllLabel,
            selectedStatusLabel: params.selectedStatusLabel,
            onSelect: () => params.onSelectTopicArea(ALL_TOPIC_AREAS)
        }
    ];

    for (const topicArea of params.topicAreas) {
        items.push({
            id: `topic-area-${topicArea.key}`,
            topicAreaKey: topicArea.key,
            iconKey: topicArea.iconKey,
            label: topicArea.label,
            selectedStatusLabel: params.selectedStatusLabel,
            onSelect: () => params.onSelectTopicArea(topicArea.key)
        });
    }

    return items;
}

// src/ui/viewmodel/LearningContentSelectPageViewModel.js
import { useCallback, useMemo, useState } from "react";
import { getLearningContentSelectWorkspaceActionToolItems, getPageToolGroup, PAGE_TOOL_AVAILABILITY } from "../../navigation/pageTools.js";
import { NAV_SCREENS } from "../../navigation/navGraph.js";
import { LEARNING_CONTENT_ENTRIES, LEARNING_CONTENT_TYPES } from "../../navigation/learningContent.js";
import createLearningContentSelectPageCopy from "./LearningContentSelectPage/createLearningContentSelectPageCopy.js";
import createWorkspaceToolsModel from "./Utils/createWorkspaceToolsModel.js";
import useSearchSheetModel, { SEARCH_SUGGESTION_LIMIT } from "./Search/useSearchSheetModel.js";
import { ALL_TOPIC_AREAS, filterExams } from "./LearningContentSelectPage/examFilters.js";
import { filterDeckSummaries } from "./LearningContentSelectPage/flashcardDeckFilters.js";
import useLoadModel from "./LoadState/useLoadModel.js";
import combineLoadStatuses from "./LoadState/combineLoadStatuses.js";

export default function useLearningContentSelectPageViewModel(
	getAvailableExamsUseCase,
	getTopicAreasUseCase,
	getFlashcardDeckSummariesUseCase,
	language,
	t,
	selectedSubject,
	onSelectExam,
	onSelectFlashcardDeck,
	onSelectMatchCardsDeck,
	isActive,
	onChangeScreen,
	showBackButton,
	backLabel,
	navigationLabel,
	onBack
) {
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

	const executeExamLoad = useCallback(() => {
		if (!isActive || !subjectId) {
			return Promise.resolve([]);
		}

		return getAvailableExamsUseCase.execute({
			subjectId,
			language
		});
	}, [getAvailableExamsUseCase, isActive, subjectId, language]);

	const executeTopicAreaLoad = useCallback(() => {
		if (!isActive || !subjectId) {
			return Promise.resolve([]);
		}

		return getTopicAreasUseCase.execute({
			subjectId,
			language
		});
	}, [getTopicAreasUseCase, isActive, subjectId, language]);

	const executeFlashcardDeckLoad = useCallback(() => {
		if (!isActive || !subjectId) {
			return Promise.resolve([]);
		}

		return getFlashcardDeckSummariesUseCase.execute({
			subjectId,
			language
		});
	}, [getFlashcardDeckSummariesUseCase, isActive, subjectId, language]);

	const examLoad = useLoadModel({
		execute: executeExamLoad,
		emptyData: [],
		errorMessage: t.selectErrorMessage,
		onLoaded: noteLearningContentResourceLoaded
	});

	const topicAreaLoad = useLoadModel({
		execute: executeTopicAreaLoad,
		emptyData: [],
		errorMessage: t.selectErrorMessage,
		onLoaded: noteLearningContentResourceLoaded
	});

	const flashcardDeckLoad = useLoadModel({
		execute: executeFlashcardDeckLoad,
		emptyData: [],
		errorMessage: t.selectErrorMessage,
		onLoaded: noteLearningContentResourceLoaded
	});

	const exams = examLoad.data;
	const topicAreas = topicAreaLoad.data;
	const flashcardDeckSummaries = flashcardDeckLoad.data;
	const pageStatus = combineLoadStatuses([
		examLoad.status,
		topicAreaLoad.status,
		flashcardDeckLoad.status
	]);
	const pageErrorMessage = resolveLearningContentPageErrorMessage(
		examLoad,
		topicAreaLoad,
		flashcardDeckLoad,
		t.selectErrorMessage
	);

	const pageCopy = useMemo(() => {
		return createLearningContentSelectPageCopy(t, selectedSubject, activeContentType);
	}, [t, selectedSubject, activeContentType]);

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
	const isMatchCardsContentActive = activeContentType === LEARNING_CONTENT_TYPES.MATCHCARDS;
	const isConceptListsContentActive = activeContentType === LEARNING_CONTENT_TYPES.CONCEPT_LISTS;

	const searchSuggestions = useMemo(() => {
		if (isFlipcardsContentActive || isMatchCardsContentActive) {
			return createDeckSearchSuggestions(visibleFlashcardDecks);
		}

		return createExamSearchSuggestions(visibleExams);
	}, [isFlipcardsContentActive, isMatchCardsContentActive, visibleExams, visibleFlashcardDecks]);

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

	const selectMatchCardsDeck = useCallback((nextTopicAreaKey) => {
		closeExamSearchSheet();
		onSelectMatchCardsDeck(nextTopicAreaKey);
	}, [closeExamSearchSheet, onSelectMatchCardsDeck]);

	const selectSearchSuggestion = useCallback((suggestionId) => {
		if (isFlipcardsContentActive) {
			selectFlashcardDeck(suggestionId);
			return;
		}

		if (isMatchCardsContentActive) {
			selectMatchCardsDeck(suggestionId);
			return;
		}

		selectExam(suggestionId);
	}, [isFlipcardsContentActive, isMatchCardsContentActive, selectExam, selectFlashcardDeck, selectMatchCardsDeck]);

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
			workspaceActionToolItems: getLearningContentSelectWorkspaceActionToolItems(),
			topicAreaToolItems,
			activeTopicAreaKey: topicAreaKey,
			hasSelectedSubject: Boolean(subjectId),
			onChangeScreen
		});
	}, [onChangeScreen, subjectId, t, topicAreaKey, topicAreaToolItems]);

	return {
		// Data
		exams: visibleExams,
		visibleExams,
		visibleFlashcardDecks,
		selectedSubject,
		pageStatus,
		pageErrorMessage,
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
		isMatchCardsContentActive,
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
		matchCardsDeckEyebrow: t.contentToggleMatchCardsLabel,

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
		selectMatchCardsDeck,
		selectContentType,
		selectTopicAreaKey,
		selectSearchSuggestion
	};
}

function noteLearningContentResourceLoaded() {}

function resolveLearningContentPageErrorMessage(examLoad, topicAreaLoad, flashcardDeckLoad, fallbackMessage) {
	const loadModels = [examLoad, topicAreaLoad, flashcardDeckLoad];

	for (const loadModel of loadModels) {
		if (loadModel.error) {
			return loadModel.error;
		}
	}

	return fallbackMessage;
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

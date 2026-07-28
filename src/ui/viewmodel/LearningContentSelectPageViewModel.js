// src/ui/viewmodel/LearningContentSelectPageViewModel.js
import { useCallback, useMemo, useState } from "react";
import { LEARNING_CONTENT_TYPES, NAV_ITEMS, NAV_SCREENS, TEST_TYPES } from "../../navigation/navigation.js";
import createLearningContentSelectPageHeading from "./LearningContentSelectPage/createLearningContentSelectPageHeading.js";
import createWorkspaceToolsModel from "./Utils/createWorkspaceToolsModel.js";
import useSearchSheetModel from "./Search/useSearchSheetModel.js";
import { SEARCH_SUGGESTION_LIMIT } from "./Search/searchSuggestionContract.js";
import { ALL_TOPIC_AREAS, findTopicAreaByKey } from "../../model/domain/utils/topicAreaFilters.js";
import { filterExams } from "./LearningContentSelectPage/examFilters.js";
import { filterDeckSummaries } from "./LearningContentSelectPage/flashcardDeckFilters.js";
import useLoadModel from "./LoadState/useLoadModel.js";
import combineLoadStatuses from "./LoadState/combineLoadStatuses.js";
import { createWorkspaceState } from "./WorkspaceState/createWorkspaceState.js";
import resolveFirstLoadError from "./Utils/resolveFirstLoadError.js";

export default function useLearningContentSelectPageViewModel(getAvailableExamsUseCase, getTopicAreasUseCase, getFlipcardDeckSummariesUseCase, language, t, selectedSubject, onSelectExam, onSelectFlipcardDeck, onSelectMatchCardsDeck, isActive, onChangeScreen, backContract, actionErrorMessage) {
	const [activeContentType, setActiveContentType] = useState(LEARNING_CONTENT_TYPES.EXAMS);
	const [selectedTestType, setSelectedTestType] = useState(TEST_TYPES.EXAM);

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
		changeFooterSheetOpen: changeExamFooterSheetOpen,
		closeSearchSheet: closeExamSearchSheet
	} = examSearchSheet;

	const subjectId = selectedSubject?.id ?? null;
	const loadResourceKey = subjectId === null ? "no-subject" : `${subjectId}:${language}`;
	const isLoadEnabled = isActive && subjectId !== null;

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

	const executeFlipcardDeckLoad = useCallback(() => {
		if (!isActive || !subjectId) {
			return Promise.resolve([]);
		}

		return getFlipcardDeckSummariesUseCase.execute({
			subjectId,
			language
		});
	}, [getFlipcardDeckSummariesUseCase, isActive, subjectId, language]);

	const examLoad = useLoadModel({
		execute: executeExamLoad,
		emptyData: [],
		errorMessage: t.selectErrorMessage,
		resourceKey: loadResourceKey,
		isEnabled: isLoadEnabled,
		onLoaded: null
	});

	const topicAreaLoad = useLoadModel({
		execute: executeTopicAreaLoad,
		emptyData: [],
		errorMessage: t.selectErrorMessage,
		resourceKey: loadResourceKey,
		isEnabled: isLoadEnabled,
		onLoaded: null
	});

	const flipcardDeckLoad = useLoadModel({
		execute: executeFlipcardDeckLoad,
		emptyData: [],
		errorMessage: t.selectErrorMessage,
		resourceKey: loadResourceKey,
		isEnabled: isLoadEnabled,
		onLoaded: null
	});

	const exams = examLoad.data;
	const topicAreas = topicAreaLoad.data;
	const flipcardDeckSummaries = flipcardDeckLoad.data;
	const pageStatus = combineLoadStatuses([
		examLoad.status,
		topicAreaLoad.status,
		flipcardDeckLoad.status
	]);
	const pageErrorMessage = resolveFirstLoadError([
		examLoad,
		topicAreaLoad,
		flipcardDeckLoad
	], t.selectErrorMessage);

	const activeToggleEntryId = resolveActiveToggleEntryId(activeContentType, selectedTestType);
	const pageHeading = useMemo(() => {
		return createLearningContentSelectPageHeading(t, selectedSubject, activeToggleEntryId);
	}, [t, selectedSubject, activeToggleEntryId]);

	const selectContentType = useCallback((entryId) => {
		const toggleEntry = findToggleEntryConfig(entryId);

		if (toggleEntry?.isDisabled) {
			return;
		}

		const contentTypeId = toggleEntry?.contentTypeId ?? entryId;
		const contentType = findContentTypeEntry(contentTypeId);

		if (!contentType) {
			return;
		}

		resetSearchSheet(ALL_TOPIC_AREAS);
		setSelectedTestType(toggleEntry?.testType ?? null);

		if (contentType.targetScreen !== NAV_SCREENS.SELECT) {
			onChangeScreen(contentType.targetScreen);
			return;
		}

		setActiveContentType(contentType.id);

		if (!isActive) {
			onChangeScreen(contentType.targetScreen);
		}
	}, [isActive, onChangeScreen, resetSearchSheet]);

	const selectTopicAreaKey = useCallback((nextTopicAreaKey) => {
		changeTopicAreaKey(nextTopicAreaKey);
	}, [changeTopicAreaKey]);

	const contentToggleEntries = useMemo(() => {
		return NAV_ITEMS.toggleButtonItems.map((entry) => ({
			id: entry.id,
			label: t[entry.labelKey],
			isDisabled: entry.isDisabled
		}));
	}, [t]);

	const mobileToggleButtonItems = [];

	for (const item of NAV_ITEMS.mobileToggleButtonItems) {
		const entries = [];

		for (const entryId of item.entryIds) {
			entries.push(findMobileToggleEntry(contentToggleEntries, entryId, t));
		}

		mobileToggleButtonItems.push({
			id: item.id,
			label: t[item.labelKey],
			contentTypeId: item.contentTypeId,
			isDisabled: item.isDisabled,
			isActive: isMobileToggleButtonItemActive(item, activeContentType, selectedTestType),
			entries
		});
	}

	const visibleExams = useMemo(() => {
		return filterExams(exams, searchTerm, topicAreaKey, selectedTestType);
	}, [exams, searchTerm, selectedTestType, topicAreaKey]);

	const visibleFlipcardDecks = useMemo(() => {
		return filterDeckSummaries(flipcardDeckSummaries, searchTerm, topicAreaKey);
	}, [flipcardDeckSummaries, searchTerm, topicAreaKey]);

	const desktopActiveEntryId = activeToggleEntryId;
	const mobileActiveEntryId = activeToggleEntryId;
	const isExamsContentActive = activeContentType === LEARNING_CONTENT_TYPES.EXAMS;
	const isFlipcardsContentActive = activeContentType === LEARNING_CONTENT_TYPES.FLIPCARDS;
	const isMatchCardsContentActive = activeContentType === LEARNING_CONTENT_TYPES.MATCHCARDS;

	const activeContentItems = isExamsContentActive ? visibleExams : visibleFlipcardDecks;
	const activeEmptyTitle = isExamsContentActive
		? selectedTestType === TEST_TYPES.CHAPTER_TEST
			? t.selectChapterTestsEmptyTitle
			: t.selectEmptyTitle
		: isMatchCardsContentActive
			? t.matchCardsDeckEmptyTitle
			: t.deckEmptyTitle;
	const activeEmptyBody = isExamsContentActive
		? selectedTestType === TEST_TYPES.CHAPTER_TEST
			? t.selectChapterTestsEmptyMessage
			: t.selectEmptyMessage
		: isMatchCardsContentActive
			? t.matchCardsDeckEmptyMessage
			: t.deckEmptyMessage;
	const workspaceState = createWorkspaceState({
		loadStatus: pageStatus,
		isEmpty: activeContentItems.length === 0,
		labels: {
			loading: t.selectLoadingMessage,
			errorTitle: t.errorPrefix,
			errorBody: pageErrorMessage,
			emptyTitle: activeEmptyTitle,
			emptyBody: activeEmptyBody
		},
		errorAction: null
	});

	const searchSuggestions = useMemo(() => {
		if (isFlipcardsContentActive || isMatchCardsContentActive) {
			return createDeckSearchSuggestions(visibleFlipcardDecks);
		}

		return createExamSearchSuggestions(visibleExams);
	}, [isFlipcardsContentActive, isMatchCardsContentActive, visibleExams, visibleFlipcardDecks]);

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

		const topicArea = findTopicAreaByKey(topicAreas, topicAreaKey);

		return topicArea?.label ?? t.filterAllLabel;
	}, [topicAreas, topicAreaKey, t.filterAllLabel]);

	const searchPlaceholder = useMemo(() => {
		const activeEntry = findContentTypeEntry(activeContentType);

		return t[activeEntry?.searchPlaceholderKey] ?? t.examSearchPlaceholder;
	}, [activeContentType, t]);

	const selectExam = useCallback((examId) => {
		closeExamSearchSheet();
		changeExamFooterSheetOpen(false);
		onSelectExam(examId);
	}, [changeExamFooterSheetOpen, closeExamSearchSheet, onSelectExam]);

	const selectFlipcardDeck = useCallback((nextTopicAreaKey) => {
		closeExamSearchSheet();
		changeExamFooterSheetOpen(false);
		onSelectFlipcardDeck(nextTopicAreaKey);
	}, [changeExamFooterSheetOpen, closeExamSearchSheet, onSelectFlipcardDeck]);

	const selectMatchCardsDeck = useCallback((nextTopicAreaKey) => {
		closeExamSearchSheet();
		changeExamFooterSheetOpen(false);
		onSelectMatchCardsDeck(nextTopicAreaKey);
	}, [changeExamFooterSheetOpen, closeExamSearchSheet, onSelectMatchCardsDeck]);

	const selectSearchSuggestion = useCallback((suggestionId) => {
		if (isFlipcardsContentActive) {
			selectFlipcardDeck(suggestionId);
			return;
		}

		if (isMatchCardsContentActive) {
			selectMatchCardsDeck(suggestionId);
			return;
		}

		selectExam(suggestionId);
	}, [isFlipcardsContentActive, isMatchCardsContentActive, selectExam, selectFlipcardDeck, selectMatchCardsDeck]);

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
			pageToolGroup: NAV_ITEMS.popOutMenuItems[NAV_SCREENS.SELECT],
			t,
			topicAreaToolItems,
			activeTopicAreaKey: topicAreaKey
		});
	}, [t, topicAreaKey, topicAreaToolItems]);

	return {
		// Data
		exams: visibleExams,
		visibleExams,
		visibleFlipcardDecks,
		workspaceState,
		actionErrorMessage,
		topicAreas,
		topicAreaKey,
		pageTools,
		...pageHeading,
		practiceExamLabel: t.selectPracticeExamLabel,
		questionLabel: t.selectQuestionLabel,
		minuteLabel: t.selectMinuteLabel,

		addPlaceholderCode: t.examAddPlaceholderCode,
		addPlaceholderTitle: t.examAddPlaceholderTitle,
		addPlaceholderDescription: t.examAddPlaceholderDescription,
		addPlaceholderNote: t.examAddPlaceholderNote,

		// Innholdstyper
		activeContentType,
		selectedTestType,
		desktopActiveEntryId,
		mobileActiveEntryId,
		contentToggleEntries,
		mobileToggleButtonItems,
		contentToggleBackLabel: t.contentToggleBackLabel,
		contentToggleAriaLabel: t.contentToggleAriaLabel,
		isExamsContentActive,
		isFlipcardsContentActive,
		isMatchCardsContentActive,
		deckCardCountLabel: t.deckCardCountLabel,
		deckCardUnitLabel: t.deckCardUnitLabel,
		flipcardsDeckEyebrow: t.contentToggleFlipcardsLabel,
		matchCardsDeckEyebrow: t.contentToggleMatchCardsLabel,

		// Navigasjon
		backContract,

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
		changeExamFooterSheetOpen,
		closeExamSearchSheet,
		selectExam,
		selectFlipcardDeck,
		selectMatchCardsDeck,
		selectContentType,
		selectTopicAreaKey,
		selectSearchSuggestion
	};
}

function findMobileToggleEntry(entries, entryId, t) {
	for (const entry of entries) {
		if (entry.id === entryId) {
			return entry;
		}
	}

	for (const entry of NAV_ITEMS.mobileToggleEntryItems) {
		if (entry.id === entryId) {
			return {
				id: entry.id,
				label: t[entry.labelKey],
				isDisabled: entry.isDisabled
			};
		}
	}

	throw new Error(`Unknown mobile toggle entry: ${String(entryId)}`);
}

function isMobileToggleButtonItemActive(item, activeContentType, selectedTestType) {
	if (item.contentTypeId !== null) {
		return item.contentTypeId === activeContentType;
	}

	for (const entryId of item.entryIds) {
		if (entryId === activeContentType || entryId === selectedTestType) {
			return true;
		}

		const toggleEntry = findToggleEntryConfig(entryId);

		if (toggleEntry?.contentTypeId === activeContentType) {
			return true;
		}
	}

	return false;
}

function findToggleEntryConfig(entryId) {
	for (const entry of NAV_ITEMS.toggleButtonItems) {
		if (entry.id === entryId) {
			return entry;
		}
	}

	for (const entry of NAV_ITEMS.mobileToggleEntryItems) {
		if (entry.id === entryId) {
			return entry;
		}
	}

	return null;
}

function resolveActiveToggleEntryId(activeContentType, selectedTestType) {
	if (activeContentType !== LEARNING_CONTENT_TYPES.EXAMS) {
		return activeContentType;
	}

	if (selectedTestType === TEST_TYPES.CHAPTER_TEST) {
		return TEST_TYPES.CHAPTER_TEST;
	}

	return LEARNING_CONTENT_TYPES.EXAMS;
}

function findContentTypeEntry(contentTypeId) {
	for (const entry of NAV_ITEMS.toggleButtonItems) {
		if (entry.id === contentTypeId) {
			return entry;
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

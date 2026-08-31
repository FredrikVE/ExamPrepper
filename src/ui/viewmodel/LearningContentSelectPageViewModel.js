//src/ui/viewmodel/LearningContentSelectPageViewModel.js
import { useCallback, useMemo } from "react";
import { LEARNING_CONTENT_TYPES, NAV_ITEMS, NAV_SCREENS, TEST_TYPES } from "../../navigation/navigation.js";
import createWorkspaceToolsModel from "./Utils/createWorkspaceToolsModel.js";
import useSearchSheetModel from "./Search/useSearchSheetModel.js";
import { SEARCH_SUGGESTION_LIMIT } from "./Search/searchSuggestionContract.js";
import { CONTENT_ICON_KEYS } from "../../constants/ContentIconKeys.js";
import { ALL_TOPIC_AREAS } from "../../constants/TopicAreas.js";
import { filterTestSets } from "./LearningContentSelectPage/testSetFilters.js";
import { filterDeckSummaries } from "./LearningContentSelectPage/flashcardDeckFilters.js";
import useLoadModel from "./LoadState/useLoadModel.js";
import combineLoadStatuses from "./LoadState/combineLoadStatuses.js";
import { createWorkspaceState } from "./WorkspaceState/createWorkspaceState.js";
import { createContentToggleEntries, createMobileToggleButtonItems, findToggleEntryConfig } from "./Shared/contentToggleModel.js";
import resolveFirstLoadError from "./Utils/resolveFirstLoadError.js";

export default function useLearningContentSelectPageViewModel(props) {
	const activeEntry = findToggleEntryConfig(props.activeEntryId);

	if (activeEntry === null || activeEntry.isDisabled) {
		throw new Error(`Invalid active SELECT content entry: ${String(props.activeEntryId)}`);
	}

	if (activeEntry.contentTypeId === null) {
		throw new Error(`Active SELECT content entry has no content type: ${String(props.activeEntryId)}`);
	}

	const activeContentType = activeEntry.contentTypeId;
	const selectedTestType = activeEntry.testType;

	const examSearchSheet = useSearchSheetModel({
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

	const subjectId = props.selectedSubject?.id ?? null;
	const loadResourceKey = subjectId === null ? "no-subject" : `${subjectId}:${props.language}`;
	const isLoadEnabled = subjectId !== null;
	const isTestSetContentActive = activeContentType === LEARNING_CONTENT_TYPES.EXAMS;
	const isFlipcardsContentActive = activeContentType === LEARNING_CONTENT_TYPES.FLIPCARDS;
	const isMatchCardsContentActive = activeContentType === LEARNING_CONTENT_TYPES.MATCHCARDS;
	const isDeckContentActive = isFlipcardsContentActive || isMatchCardsContentActive;
	const isExamLoadEnabled = isLoadEnabled
		&& isTestSetContentActive
		&& selectedTestType === TEST_TYPES.EXAM;
	const isChapterTestLoadEnabled = isLoadEnabled
		&& isTestSetContentActive
		&& selectedTestType === TEST_TYPES.CHAPTER_TEST;
	const isFlipcardDeckLoadEnabled = isLoadEnabled && isDeckContentActive;

	const executeExamLoad = useCallback(() => {
		if (!isExamLoadEnabled) {
			return Promise.resolve([]);
		}

		return props.getAvailableExamsUseCase.execute({
			subjectId,
			language: props.language
		});
	}, [props.getAvailableExamsUseCase, isExamLoadEnabled, subjectId, props.language]);

	const executeChapterTestLoad = useCallback(() => {
		if (!isChapterTestLoadEnabled) {
			return Promise.resolve([]);
		}

		return props.getAvailableChapterTestsUseCase.execute({
			subjectId,
			language: props.language
		});
	}, [props.getAvailableChapterTestsUseCase, isChapterTestLoadEnabled, subjectId, props.language]);

	const executeTopicAreaLoad = useCallback(() => {
		if (!isLoadEnabled) {
			return Promise.resolve([]);
		}

		return props.getTopicAreasUseCase.execute({
			subjectId,
			language: props.language
		});
	}, [props.getTopicAreasUseCase, isLoadEnabled, subjectId, props.language]);

	const executeFlipcardDeckLoad = useCallback(() => {
		if (!isFlipcardDeckLoadEnabled) {
			return Promise.resolve([]);
		}

		return props.getFlipcardDeckSummariesUseCase.execute({
			subjectId,
			language: props.language
		});
	}, [props.getFlipcardDeckSummariesUseCase, isFlipcardDeckLoadEnabled, subjectId, props.language]);

	const examLoad = useLoadModel({
		execute: executeExamLoad,
		emptyData: [],
		errorMessage: props.t.selectErrorMessage,
		resourceKey: loadResourceKey,
		isEnabled: isExamLoadEnabled,
		onLoaded: null
	});

	const chapterTestLoad = useLoadModel({
		execute: executeChapterTestLoad,
		emptyData: [],
		errorMessage: props.t.selectErrorMessage,
		resourceKey: loadResourceKey,
		isEnabled: isChapterTestLoadEnabled,
		onLoaded: null
	});

	const topicAreaLoad = useLoadModel({
		execute: executeTopicAreaLoad,
		emptyData: [],
		errorMessage: props.t.selectErrorMessage,
		resourceKey: loadResourceKey,
		isEnabled: isLoadEnabled,
		onLoaded: null
	});

	const flipcardDeckLoad = useLoadModel({
		execute: executeFlipcardDeckLoad,
		emptyData: [],
		errorMessage: props.t.selectErrorMessage,
		resourceKey: loadResourceKey,
		isEnabled: isFlipcardDeckLoadEnabled,
		onLoaded: null
	});

	const activeTestSetLoad = selectedTestType === TEST_TYPES.CHAPTER_TEST
		? chapterTestLoad
		: examLoad;
	const activeTestSets = isTestSetContentActive
		? activeTestSetLoad.data
		: [];
	const topicAreas = topicAreaLoad.data;
	const flipcardDeckSummaries = flipcardDeckLoad.data;
	const activeContentLoad = isTestSetContentActive ? activeTestSetLoad : flipcardDeckLoad;
	const pageStatus = combineLoadStatuses([
		activeContentLoad.status,
		topicAreaLoad.status
	]);
	const pageErrorMessage = resolveFirstLoadError([
		activeContentLoad,
		topicAreaLoad
	], props.t.selectErrorMessage);

	const pageHeading = useMemo(() => {
		return createLearningContentSelectPageHeading(props.t, props.selectedSubject, props.activeEntryId);
	}, [props.t, props.selectedSubject, props.activeEntryId]);

	const selectContentType = useCallback((entryId) => {
		resetSearchSheet();
		props.onSelectContentType(entryId);
	}, [props.onSelectContentType, resetSearchSheet]);

	const selectTopicAreaKey = useCallback((nextTopicAreaKey) => {
		changeTopicAreaKey(nextTopicAreaKey);
	}, [changeTopicAreaKey]);

	const contentToggleEntries = useMemo(() => createContentToggleEntries(props.t), [props.t]);
	const mobileToggleButtonItems = useMemo(() => createMobileToggleButtonItems({
		contentToggleEntries,
		activeContentType,
		selectedTestType,
		t: props.t
	}), [activeContentType, contentToggleEntries, selectedTestType, props.t]);

	const visibleTestSets = useMemo(() => {
		return filterTestSets(activeTestSets, searchTerm, topicAreaKey);
	}, [activeTestSets, searchTerm, topicAreaKey]);

	const visibleFlipcardDecks = useMemo(() => {
		return filterDeckSummaries(flipcardDeckSummaries, searchTerm, topicAreaKey);
	}, [flipcardDeckSummaries, searchTerm, topicAreaKey]);

	const desktopActiveEntryId = props.activeEntryId;
	const mobileActiveEntryId = props.activeEntryId;

	const activeContentItems = isTestSetContentActive ? visibleTestSets : visibleFlipcardDecks;
	const isTestSetFilterActive = searchTerm.trim().length > 0 || topicAreaKey !== ALL_TOPIC_AREAS;
	const isFilteredToNothing = isTestSetContentActive
		&& isTestSetFilterActive
		&& activeTestSets.length > 0
		&& visibleTestSets.length === 0;
	const activeEmptyTitle = isTestSetContentActive
		? isFilteredToNothing
			? props.t.selectFilteredEmptyTitle
			: selectedTestType === TEST_TYPES.CHAPTER_TEST
				? props.t.selectChapterTestsEmptyTitle
				: props.t.selectEmptyTitle
		: isMatchCardsContentActive
			? props.t.matchCardsDeckEmptyTitle
			: props.t.deckEmptyTitle;
	const activeEmptyBody = isTestSetContentActive
		? isFilteredToNothing
			? props.t.selectFilteredEmptyMessage
			: selectedTestType === TEST_TYPES.CHAPTER_TEST
				? props.t.selectChapterTestsEmptyMessage
				: props.t.selectEmptyMessage
		: isMatchCardsContentActive
			? props.t.matchCardsDeckEmptyMessage
			: props.t.deckEmptyMessage;
	const workspaceState = createWorkspaceState({
		loadStatus: pageStatus,
		isEmpty: activeContentItems.length === 0,
		labels: {
			loading: props.t.selectLoadingMessage,
			errorTitle: props.t.errorPrefix,
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

		return createTestSetSearchSuggestions(visibleTestSets);
	}, [isFlipcardsContentActive, isMatchCardsContentActive, visibleFlipcardDecks, visibleTestSets]);

	const topicAreaFilterOptions = useMemo(() => {
		const filterOptions = [
			{
				id: ALL_TOPIC_AREAS,
				value: ALL_TOPIC_AREAS,
				label: props.t.topicAreaAllLabel
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
	}, [topicAreas, props.t.topicAreaAllLabel]);

	const topicAreaLabel = useMemo(() => {
		if (topicAreaKey === ALL_TOPIC_AREAS) {
			return props.t.filterAllLabel;
		}

		const topicArea = topicAreas.find((candidate) => candidate.key === topicAreaKey) ?? null;

		return topicArea?.label ?? props.t.filterAllLabel;
	}, [topicAreas, topicAreaKey, props.t.filterAllLabel]);

	const searchPlaceholder = useMemo(() => {
		return props.t[activeEntry.searchPlaceholderKey];
	}, [activeEntry.searchPlaceholderKey, props.t]);

	const selectTestSet = useCallback((testSetId) => {
		if (selectedTestType !== TEST_TYPES.EXAM && selectedTestType !== TEST_TYPES.CHAPTER_TEST) {
			throw new Error(`Unknown selected test type: ${String(selectedTestType)}`);
		}

		closeExamSearchSheet();
		changeExamFooterSheetOpen(false);
		props.onSelectTestSet(testSetId, selectedTestType);
	}, [changeExamFooterSheetOpen, closeExamSearchSheet, props.onSelectTestSet, selectedTestType]);

	const selectFlipcardDeck = useCallback((nextTopicAreaKey) => {
		closeExamSearchSheet();
		changeExamFooterSheetOpen(false);
		props.onSelectFlipcardDeck(nextTopicAreaKey);
	}, [changeExamFooterSheetOpen, closeExamSearchSheet, props.onSelectFlipcardDeck]);

	const selectMatchCardsDeck = useCallback((nextTopicAreaKey) => {
		closeExamSearchSheet();
		changeExamFooterSheetOpen(false);
		props.onSelectMatchCardsDeck(nextTopicAreaKey);
	}, [changeExamFooterSheetOpen, closeExamSearchSheet, props.onSelectMatchCardsDeck]);

	const selectSearchSuggestion = useCallback((suggestionId) => {
		if (isFlipcardsContentActive) {
			selectFlipcardDeck(suggestionId);
			return;
		}

		if (isMatchCardsContentActive) {
			selectMatchCardsDeck(suggestionId);
			return;
		}

		selectTestSet(suggestionId);
	}, [isFlipcardsContentActive, isMatchCardsContentActive, selectFlipcardDeck, selectMatchCardsDeck, selectTestSet]);

	const topicAreaToolItems = useMemo(() => {
		return createTopicAreaToolItems({
			topicAreas,
			t: props.t,
			selectedStatusLabel: props.t.pageToolsSelectedLabel,
			onSelectTopicArea: selectTopicAreaKey
		});
	}, [selectTopicAreaKey, props.t, topicAreas]);

	const pageTools = useMemo(() => {
		return createWorkspaceToolsModel({
			pageToolGroup: NAV_ITEMS.popOutMenuItems[NAV_SCREENS.SELECT],
			t: props.t,
			topicAreaToolItems,
			activeTopicAreaKey: topicAreaKey
		});
	}, [props.t, topicAreaKey, topicAreaToolItems]);

	return {
		// Data
		visibleTestSets,
		visibleFlipcardDecks,
		workspaceState,
		actionErrorMessage: props.actionErrorMessage,
		pageTools,
		...pageHeading,
		practiceExamLabel: props.t.selectPracticeExamLabel,
		questionLabel: props.t.selectQuestionLabel,
		minuteLabel: props.t.selectMinuteLabel,

		addPlaceholderCode: props.t.examAddPlaceholderCode,
		addPlaceholderTitle: props.t.examAddPlaceholderTitle,
		addPlaceholderDescription: props.t.examAddPlaceholderDescription,
		addPlaceholderNote: props.t.examAddPlaceholderNote,

		// Innholdstyper
		activeContentType,
		selectedTestType,
		desktopActiveEntryId,
		mobileActiveEntryId,
		contentToggleEntries,
		mobileToggleButtonItems,
		contentToggleBackLabel: props.t.contentToggleBackLabel,
		contentToggleAriaLabel: props.t.contentToggleAriaLabel,
		isTestSetContentActive,
		isFlipcardsContentActive,
		isMatchCardsContentActive,
		deckCardCountLabel: props.t.deckCardCountLabel,
		deckCardUnitLabel: props.t.deckCardUnitLabel,
		flipcardsDeckEyebrow: props.t.contentToggleFlipcardsLabel,
		matchCardsDeckEyebrow: props.t.contentToggleMatchCardsLabel,

		// Navigasjon
		backContract: props.backContract,

		// Søk og filter
		searchTerm,
		category: topicAreaKey,
		categoryLabel: topicAreaLabel,
		isSearchSheetOpen,
		isSearchSuggestionsMode,
		isFilterOptionsMode,
		isFooterSheetOpen,
		isFooterOpen,
		searchSuggestions,
		categoryFilterOptions: topicAreaFilterOptions,
		searchCloseLabel: props.t.searchCloseLabel,
		searchLabel: props.t.examSearchLabel,
		searchPlaceholder,
		categoryAriaLabel: props.t.topicAreaFilterAriaLabel,
		allCategoriesLabel: props.t.topicAreaAllLabel,

		// Handlers
		changeExamSearchTerm,
		changeCategory: changeTopicAreaKey,
		selectCategoryFilterOption: selectTopicAreaFilterOption,
		openExamSearchSuggestions,
		openExamCategoryOptions: openTopicAreaOptions,
		changeExamFooterSheetOpen,
		closeExamSearchSheet,
		selectTestSet,
		selectFlipcardDeck,
		selectMatchCardsDeck,
		selectContentType,
		selectTopicAreaKey,
		selectSearchSuggestion
	};
}

function createTestSetSearchSuggestions(testSets) {
	const searchSuggestions = [];

	for (const testSet of testSets) {
		if (searchSuggestions.length >= SEARCH_SUGGESTION_LIMIT) {
			break;
		}

		searchSuggestions.push({
			id: testSet.id,
			label: testSet.title
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
			iconKey: CONTENT_ICON_KEYS.LIST,
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

function createLearningContentSelectPageHeading(t, selectedSubject, activeContentType) {
	const activeEntry = findLearningContentEntry(activeContentType);
	const subtitle = selectedSubject === null
		? t[activeEntry.subtitleFallbackKey]
		: t[activeEntry.subtitleKey](selectedSubject.code);

	return {
		title: t[activeEntry.titleKey],
		subtitle
	};
}

function findLearningContentEntry(activeContentType) {
	for (const entry of NAV_ITEMS.toggleButtonItems) {
		if (entry.id === activeContentType) {
			if (entry.titleKey === null || entry.subtitleKey === null || entry.subtitleFallbackKey === null) {
				throw new Error(`Learning content entry '${String(activeContentType)}' has no SELECT heading contract`);
			}

			return entry;
		}
	}

	throw new Error(`Unknown learning content entry: ${String(activeContentType)}`);
}

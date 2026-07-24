// src/ui/viewmodel/LearningContentSelectPageViewModel.js
import { useCallback, useMemo, useState } from "react";
import { LEARNING_CONTENT_TYPES, NAV_ITEMS, NAV_SCREENS } from "../../navigation/navigation.js";
import createLearningContentSelectPageHeading from "./LearningContentSelectPage/createLearningContentSelectPageHeading.js";
import createWorkspaceToolsModel from "./Utils/createWorkspaceToolsModel.js";
import useSearchSheetModel, { SEARCH_SUGGESTION_LIMIT } from "./Search/useSearchSheetModel.js";
import { ALL_TOPIC_AREAS, findTopicAreaByKey } from "../../model/domain/utils/topicAreaFilters.js";
import { filterExams } from "./LearningContentSelectPage/examFilters.js";
import { filterDeckSummaries } from "./LearningContentSelectPage/flashcardDeckFilters.js";
import useLoadModel from "./LoadState/useLoadModel.js";
import combineLoadStatuses from "./LoadState/combineLoadStatuses.js";
import { createWorkspaceState } from "./WorkspaceState/createWorkspaceState.js";
import resolveFirstLoadError from "./Utils/resolveFirstLoadError.js";

export default function useLearningContentSelectPageViewModel(getAvailableExamsUseCase, getTopicAreasUseCase, getFlipcardDeckSummariesUseCase, language, t, selectedSubject, onSelectExam, onSelectFlipcardDeck, onSelectMatchCardsDeck, isActive, onChangeScreen, showBackButton, backLabel, navigationLabel, onBack) {
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

	const pageHeading = useMemo(() => {
		return createLearningContentSelectPageHeading(t, selectedSubject, activeContentType);
	}, [t, selectedSubject, activeContentType]);

	const selectContentType = useCallback((contentTypeId) => {
		const contentType = findContentTypeEntry(contentTypeId);

		if (!contentType) {
			return;
		}

		resetSearchSheet(ALL_TOPIC_AREAS);

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

	const visibleExams = useMemo(() => {
		return filterExams(exams, searchTerm, topicAreaKey);
	}, [exams, searchTerm, topicAreaKey]);

	const visibleFlipcardDecks = useMemo(() => {
		return filterDeckSummaries(flipcardDeckSummaries, searchTerm, topicAreaKey);
	}, [flipcardDeckSummaries, searchTerm, topicAreaKey]);

	const isExamsContentActive = activeContentType === LEARNING_CONTENT_TYPES.EXAMS;
	const isFlipcardsContentActive = activeContentType === LEARNING_CONTENT_TYPES.FLIPCARDS;
	const isMatchCardsContentActive = activeContentType === LEARNING_CONTENT_TYPES.MATCHCARDS;

	const activeContentItems = isExamsContentActive ? visibleExams : visibleFlipcardDecks;
	const activeEmptyTitle = isExamsContentActive
		? t.selectEmptyTitle
		: isMatchCardsContentActive
			? t.matchCardsDeckEmptyTitle
			: t.deckEmptyTitle;
	const activeEmptyBody = isExamsContentActive
		? t.selectEmptyMessage
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
		onSelectExam(examId);
	}, [closeExamSearchSheet, onSelectExam]);

	const selectFlipcardDeck = useCallback((nextTopicAreaKey) => {
		closeExamSearchSheet();
		onSelectFlipcardDeck(nextTopicAreaKey);
	}, [closeExamSearchSheet, onSelectFlipcardDeck]);

	const selectMatchCardsDeck = useCallback((nextTopicAreaKey) => {
		closeExamSearchSheet();
		onSelectMatchCardsDeck(nextTopicAreaKey);
	}, [closeExamSearchSheet, onSelectMatchCardsDeck]);

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
		contentToggleEntries,
		contentToggleAriaLabel: t.contentToggleAriaLabel,
		isExamsContentActive,
		isFlipcardsContentActive,
		isMatchCardsContentActive,
		deckCardCountLabel: t.deckCardCountLabel,
		deckCardUnitLabel: t.deckCardUnitLabel,
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
		selectFlipcardDeck,
		selectMatchCardsDeck,
		selectContentType,
		selectTopicAreaKey,
		selectSearchSuggestion
	};
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

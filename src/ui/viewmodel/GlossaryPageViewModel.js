// src/ui/viewmodel/GlossaryPageViewModel.js
import { useCallback, useEffect, useMemo, useState } from "react";
import { LEARNING_CONTENT_TYPES, NAV_ITEMS } from "../../navigation/navigation.js";
import { ALL_TOPIC_AREAS } from "../../model/domain/utils/topicAreaFilters.js";
import { LOAD_STATUS } from "./LoadState/loadStatus.js";
import useLoadModel from "./LoadState/useLoadModel.js";
import combineLoadStatuses from "./LoadState/combineLoadStatuses.js";
import resolveFirstLoadError from "./Utils/resolveFirstLoadError.js";
import { createWorkspaceState } from "./WorkspaceState/createWorkspaceState.js";
import { WORKSPACE_STATE_KINDS } from "./WorkspaceState/workspaceStateKinds.js";
import { GLOSSARY_AUTOCOMPLETE_LIST_ID, GLOSSARY_AUTOCOMPLETE_MIN_LENGTH, createGlossaryAutocompleteSuggestions } from "./GlossaryPage/glossarySearchModel.js";
import normalizeSearchTerm from "./Utils/normalizeSearchTerm.js";
import { applyGlossaryTopicAreaInteractionState, createGlossaryAllTopicAreaListItem, createGlossaryTopicAreaListItems } from "./GlossaryPage/glossaryTopicAreaListModel.js";
import { createGlossaryTableRows } from "./GlossaryPage/glossaryTableModel.js";

export default function useGlossaryPageViewModel(getGlossaryEntriesForSubjectUseCase, getTopicAreasUseCase, subjectId, selectedSubject, initialTopicAreaKey, language, t, isActive, backContract, onSelectContentType) {
	const [glossarySearchTerm, setGlossarySearchTerm] = useState("");
	const [selectedTopicAreaKeys, setSelectedTopicAreaKeys] = useState(null);
	const [searchKeyboardIndex, setSearchKeyboardIndex] = useState(-1);
	const [isSearchFilterOptionsOpen, setIsSearchFilterOptionsOpen] = useState(false);
	const [isSearchAutocompleteOpen, setIsSearchAutocompleteOpen] = useState(false);
	const [selectedGlossaryEntryKey, setSelectedGlossaryEntryKey] = useState(null);

	useEffect(() => {
		setGlossarySearchTerm("");
		setSelectedTopicAreaKeys(null);
		setSearchKeyboardIndex(-1);
		setIsSearchFilterOptionsOpen(false);
		setIsSearchAutocompleteOpen(false);
		setSelectedGlossaryEntryKey(null);
	}, [initialTopicAreaKey, subjectId]);

	const executeGlossaryEntryLoad = useCallback(() => {
		if (!isActive || !subjectId) {
			return Promise.resolve([]);
		}

		return getGlossaryEntriesForSubjectUseCase.execute({
			subjectId,
			topicAreaKey: ALL_TOPIC_AREAS
		});
	}, [getGlossaryEntriesForSubjectUseCase, isActive, subjectId]);

	const executeTopicAreaLoad = useCallback(() => {
		if (!isActive || !subjectId) {
			return Promise.resolve([]);
		}

		return getTopicAreasUseCase.execute({
			subjectId,
			language
		});
	}, [getTopicAreasUseCase, isActive, language, subjectId]);

	const glossaryResourceKey = subjectId;
	const topicAreaResourceKey = subjectId === null ? "no-subject" : `${subjectId}:${language}`;
	const isLoadEnabled = isActive && subjectId !== null;

	const glossaryEntryLoad = useLoadModel({
		execute: executeGlossaryEntryLoad,
		emptyData: [],
		errorMessage: t.glossaryPageErrorMessage,
		resourceKey: glossaryResourceKey,
		isEnabled: isLoadEnabled,
		onLoaded: null
	});

	const topicAreaLoad = useLoadModel({
		execute: executeTopicAreaLoad,
		emptyData: [],
		errorMessage: t.glossaryPageErrorMessage,
		resourceKey: topicAreaResourceKey,
		isEnabled: isLoadEnabled,
		onLoaded: null
	});

	const glossaryEntries = glossaryEntryLoad.data;
	const topicAreas = topicAreaLoad.data;
	const pageStatus = combineLoadStatuses([
		glossaryEntryLoad.status,
		topicAreaLoad.status
	]);
	const pageErrorMessage = resolveFirstLoadError([
		glossaryEntryLoad,
		topicAreaLoad
	], t.glossaryPageErrorMessage);

	const localizedEntries = useMemo(() => {
		return localizeGlossaryEntries(glossaryEntries, language);
	}, [glossaryEntries, language]);

	const entriesByTopicAreaKey = useMemo(() => {
		return groupGlossaryEntriesByTopicAreaKey(localizedEntries);
	}, [localizedEntries]);

	const topicAreaByKey = useMemo(() => {
		return createTopicAreaByKey(topicAreas);
	}, [topicAreas]);

	const resolvedSelectedTopicAreaKeys = useMemo(() => {
		return resolveSelectedTopicAreaKeys({
			selectedTopicAreaKeys,
			topicAreas,
			initialTopicAreaKey
		});
	}, [initialTopicAreaKey, selectedTopicAreaKeys, topicAreas]);

	const isAllTopicAreasSelected = topicAreas.length > 0
		&& resolvedSelectedTopicAreaKeys.size === topicAreas.length;
	const isTopicAreaSelectionMode = !isAllTopicAreasSelected;
	const selectedTopicAreaCount = resolvedSelectedTopicAreaKeys.size;

	const normalizedSearchTerm = useMemo(() => {
		return normalizeSearchTerm(glossarySearchTerm);
	}, [glossarySearchTerm]);
	const isSearching = normalizedSearchTerm.length > 0;

	const baseTopicAreaListItems = useMemo(() => {
		return createGlossaryTopicAreaListItems({
			topicAreas,
			entriesByTopicAreaKey,
			labels: {
				chapterSubtitle: t.glossaryPageChapterSubtitle
			}
		});
	}, [entriesByTopicAreaKey, t.glossaryPageChapterSubtitle, topicAreas]);

	const topicAreaListItems = useMemo(() => {
		return applyGlossaryTopicAreaInteractionState({
			topicAreaListItems: baseTopicAreaListItems,
			selectedTopicAreaKeys: resolvedSelectedTopicAreaKeys,
			searchKeyboardIndex: -1,
			showsSelectionControls: isTopicAreaSelectionMode
		});
	}, [baseTopicAreaListItems, isTopicAreaSelectionMode, resolvedSelectedTopicAreaKeys]);

	const allTopicAreaListItem = useMemo(() => {
		return createGlossaryAllTopicAreaListItem({
			entryCount: localizedEntries.length,
			isSelected: isAllTopicAreasSelected,
			labels: {
				allTopicAreas: t.glossaryPageAllChaptersHeading,
				chapterSubtitle: t.glossaryPageChapterSubtitle
			}
		});
	}, [isAllTopicAreasSelected, localizedEntries.length, t.glossaryPageAllChaptersHeading, t.glossaryPageChapterSubtitle]);

	const topicAreaReferenceByKey = useMemo(() => {
		return createTopicAreaReferenceByKey(topicAreas, t.glossaryPageChapterReference);
	}, [t.glossaryPageChapterReference, topicAreas]);

	const selectedTopicAreaEntries = useMemo(() => {
		return collectSelectedTopicAreaEntries({
			topicAreas,
			selectedTopicAreaKeys: resolvedSelectedTopicAreaKeys,
			entriesByTopicAreaKey
		});
	}, [entriesByTopicAreaKey, resolvedSelectedTopicAreaKeys, topicAreas]);

	const visibleGlossaryEntries = useMemo(() => {
		return selectGlossaryEntriesForPresentation(selectedTopicAreaEntries, selectedGlossaryEntryKey);
	}, [selectedGlossaryEntryKey, selectedTopicAreaEntries]);

	const glossaryTableRows = useMemo(() => {
		return createGlossaryTableRows({
			localizedEntries: visibleGlossaryEntries,
			topicAreaReferenceByKey
		});
	}, [topicAreaReferenceByKey, visibleGlossaryEntries]);

	const glossaryPanelHeading = useMemo(() => {
		return createGlossaryPanelHeading({
			topicAreaByKey,
			selectedTopicAreaKeys: resolvedSelectedTopicAreaKeys,
			isAllTopicAreasSelected,
			visibleEntryCount: visibleGlossaryEntries.length,
			t
		});
	}, [isAllTopicAreasSelected, resolvedSelectedTopicAreaKeys, t, topicAreaByKey, visibleGlossaryEntries.length]);

	const autocompleteSuggestions = useMemo(() => {
		return createGlossaryAutocompleteSuggestions({
			localizedEntries,
			selectedTopicAreaKeys: resolvedSelectedTopicAreaKeys,
			normalizedSearchTerm,
			topicAreaReferenceByKey
		});
	}, [localizedEntries, normalizedSearchTerm, resolvedSelectedTopicAreaKeys, topicAreaReferenceByKey]);
	const isSearchAutocompleteActive = isSearchAutocompleteOpen && autocompleteSuggestions.length > 0;
	const resolvedSearchKeyboardIndex = resolveSearchKeyboardIndex({
		searchKeyboardIndex,
		suggestionCount: autocompleteSuggestions.length,
		isAutocompleteOpen: isSearchAutocompleteActive
	});
	const searchActiveDescendantId = isSearchAutocompleteActive
		? autocompleteSuggestions[resolvedSearchKeyboardIndex]?.optionId ?? null
		: null;
	const isSearchPopupOpen = isSearchFilterOptionsOpen || isSearchAutocompleteActive;

	const chapterFilterOptions = useMemo(() => {
		const options = [
			{
				id: ALL_TOPIC_AREAS,
				value: ALL_TOPIC_AREAS,
				label: t.glossaryPageAllChaptersHeading
			}
		];

		for (const topicArea of topicAreas) {
			options.push({
				id: topicArea.key,
				value: topicArea.key,
				label: topicArea.label
			});
		}

		return options;
	}, [t.glossaryPageAllChaptersHeading, topicAreas]);
	const selectedChapterFilterValue = resolveSelectedChapterFilterValue({
		selectedTopicAreaKeys: resolvedSelectedTopicAreaKeys,
		topicAreaCount: topicAreas.length
	});
	const chapterFilterLabel = resolveChapterFilterLabel({
		selectedChapterFilterValue,
		selectedTopicAreaCount,
		topicAreaByKey,
		t
	});

	const pageEmptyStateKind = resolvePageEmptyStateKind({
		pageStatus,
		topicAreas,
		localizedEntries
	});
	const pageEmptyState = createGlossaryEmptyState({
		emptyStateKind: pageEmptyStateKind,
		t
	});
	const pageEmptyTitle = pageEmptyState === null ? "" : pageEmptyState.title;
	const pageEmptyBody = pageEmptyState === null ? "" : pageEmptyState.body;
	const workspaceState = createWorkspaceState({
		loadStatus: pageStatus,
		isEmpty: pageEmptyState !== null,
		labels: {
			loading: t.glossaryPageLoadingTitle,
			errorTitle: t.glossaryPageErrorTitle,
			errorBody: pageErrorMessage,
			emptyTitle: pageEmptyTitle,
			emptyBody: pageEmptyBody
		},
		errorAction: null
	});
	const shouldShowWorkspaceFooter = workspaceState.kind === WORKSPACE_STATE_KINDS.CONTENT;
	const glossaryPanelEmptyStateKind = resolveGlossaryPanelEmptyStateKind(visibleGlossaryEntries.length);
	const glossaryPanelEmptyState = createGlossaryEmptyState({
		emptyStateKind: glossaryPanelEmptyStateKind,
		t
	});

	const contentToggleEntries = useMemo(() => {
		return NAV_ITEMS.toggleButtonItems.map((entry) => ({
			id: entry.id,
			label: t[entry.labelKey],
			isDisabled: entry.isDisabled
		}));
	}, [t]);

	const changeGlossarySearchTerm = useCallback((nextSearchTerm) => {
		const shouldOpenAutocomplete = normalizeSearchTerm(nextSearchTerm).length >= GLOSSARY_AUTOCOMPLETE_MIN_LENGTH;

		setGlossarySearchTerm(nextSearchTerm);
		setSelectedGlossaryEntryKey(null);
		setSearchKeyboardIndex(shouldOpenAutocomplete ? 0 : -1);
		setIsSearchFilterOptionsOpen(false);
		setIsSearchAutocompleteOpen(shouldOpenAutocomplete);
	}, []);

	const focusGlossarySearch = useCallback(() => {
		setIsSearchFilterOptionsOpen(false);
		setIsSearchAutocompleteOpen(normalizedSearchTerm.length >= GLOSSARY_AUTOCOMPLETE_MIN_LENGTH);
	}, [normalizedSearchTerm.length]);

	const clearGlossarySearch = useCallback(() => {
		setGlossarySearchTerm("");
		setSelectedGlossaryEntryKey(null);
		setSearchKeyboardIndex(-1);
		setIsSearchFilterOptionsOpen(false);
		setIsSearchAutocompleteOpen(false);
	}, []);

	const openGlossarySearchFilterOptions = useCallback(() => {
		setSearchKeyboardIndex(-1);
		setIsSearchAutocompleteOpen(false);
		setIsSearchFilterOptionsOpen((previousIsOpen) => !previousIsOpen);
	}, []);

	const closeGlossarySearchPopup = useCallback(() => {
		setSearchKeyboardIndex(-1);
		setIsSearchFilterOptionsOpen(false);
		setIsSearchAutocompleteOpen(false);
	}, []);

	const selectGlossaryChapterFilter = useCallback((nextTopicAreaKey) => {
		if (nextTopicAreaKey === ALL_TOPIC_AREAS) {
			setSelectedTopicAreaKeys(createAllTopicAreaKeySet(topicAreas));
		} else if (topicAreaByKey.has(nextTopicAreaKey)) {
			setSelectedTopicAreaKeys(new Set([nextTopicAreaKey]));
		} else {
			return;
		}

		setSelectedGlossaryEntryKey(null);
		const shouldOpenAutocomplete = normalizedSearchTerm.length >= GLOSSARY_AUTOCOMPLETE_MIN_LENGTH;
		setSearchKeyboardIndex(shouldOpenAutocomplete ? 0 : -1);
		setIsSearchFilterOptionsOpen(false);
		setIsSearchAutocompleteOpen(shouldOpenAutocomplete);
	}, [normalizedSearchTerm.length, topicAreaByKey, topicAreas]);

	const selectTopicArea = useCallback((topicAreaKey) => {
		setSelectedGlossaryEntryKey(null);

		if (topicAreaKey === ALL_TOPIC_AREAS) {
			setSelectedTopicAreaKeys(createAllTopicAreaKeySet(topicAreas));
			setSearchKeyboardIndex(isSearchAutocompleteActive ? 0 : -1);
			return;
		}

		if (!topicAreaByKey.has(topicAreaKey)) {
			return;
		}

		setSelectedTopicAreaKeys((previousSelectedTopicAreaKeys) => {
			const currentSelectedTopicAreaKeys = resolveSelectedTopicAreaKeys({
				selectedTopicAreaKeys: previousSelectedTopicAreaKeys,
				topicAreas,
				initialTopicAreaKey
			});

			if (currentSelectedTopicAreaKeys.size === topicAreas.length) {
				return new Set([topicAreaKey]);
			}

			const nextSelectedTopicAreaKeys = new Set(currentSelectedTopicAreaKeys);

			if (nextSelectedTopicAreaKeys.has(topicAreaKey)) {
				nextSelectedTopicAreaKeys.delete(topicAreaKey);
			} else {
				nextSelectedTopicAreaKeys.add(topicAreaKey);
			}

			return nextSelectedTopicAreaKeys.size === 0
				? createAllTopicAreaKeySet(topicAreas)
				: nextSelectedTopicAreaKeys;
		});
		setSearchKeyboardIndex(isSearchAutocompleteActive ? 0 : -1);
	}, [initialTopicAreaKey, isSearchAutocompleteActive, topicAreaByKey, topicAreas]);

	const moveSearchSelection = useCallback((direction) => {
		if (!isSearchAutocompleteActive || autocompleteSuggestions.length === 0) {
			return;
		}

		setSearchKeyboardIndex((previousIndex) => calculateNextSearchKeyboardIndex({
			previousIndex,
			direction,
			suggestionCount: autocompleteSuggestions.length
		}));
	}, [autocompleteSuggestions.length, isSearchAutocompleteActive]);

	const moveSearchSelectionDown = useCallback(() => {
		moveSearchSelection(1);
	}, [moveSearchSelection]);

	const moveSearchSelectionUp = useCallback(() => {
		moveSearchSelection(-1);
	}, [moveSearchSelection]);

	const selectAutocompleteSuggestion = useCallback((glossaryEntryKey) => {
		const suggestion = autocompleteSuggestions.find((entry) => entry.id === glossaryEntryKey);

		if (!suggestion) {
			return;
		}

		setGlossarySearchTerm(suggestion.label);
		setSelectedGlossaryEntryKey(suggestion.id);
		setSelectedTopicAreaKeys(new Set([suggestion.topicAreaKey]));
		setSearchKeyboardIndex(-1);
		setIsSearchFilterOptionsOpen(false);
		setIsSearchAutocompleteOpen(false);
	}, [autocompleteSuggestions]);

	const openSearchKeyboardSelection = useCallback(() => {
		const selectedSuggestion = autocompleteSuggestions[resolvedSearchKeyboardIndex];

		if (!isSearchAutocompleteActive || !selectedSuggestion) {
			return;
		}

		selectAutocompleteSuggestion(selectedSuggestion.id);
	}, [autocompleteSuggestions, isSearchAutocompleteActive, resolvedSearchKeyboardIndex, selectAutocompleteSuggestion]);

	const selectContentType = useCallback((contentTypeId) => {
		if (contentTypeId === LEARNING_CONTENT_TYPES.GLOSSARY) {
			return;
		}

		onSelectContentType(contentTypeId);
	}, [onSelectContentType]);

	return {
		pageTitle: t.glossaryPageTitle,
		pageSubtitle: createGlossaryPageSubtitle(t, selectedSubject),
		searchPlaceholder: t.glossaryPageSearchPlaceholder,
		searchLabel: t.glossaryPageSearchLabel,
		searchFilterAriaLabel: t.glossaryPageChapterFilterAriaLabel,
		searchCloseLabel: t.searchCloseLabel,
		searchClearLabel: t.glossaryPageSearchClearLabel,
		searchKeyboardHint: t.glossaryPageSearchKeyboardHint,
		searchSuggestionListAriaLabel: t.glossaryPageAutocompleteAriaLabel,
		termColumnHeader: t.glossaryPageTermColumnHeader,
		explanationColumnHeader: t.glossaryPageExplanationColumnHeader,
		mobileChapterSheetTitle: t.glossaryPageMobileChapterSheetTitle,
		mobileChapterSheetSubtitle: t.glossaryPageMobileChapterSheetSubtitle,
		mobileChapterSheetOpenLabel: t.glossaryPageMobileChapterSheetOpenLabel,
		mobileChapterSheetCloseLabel: t.glossaryPageMobileChapterSheetCloseLabel,
		contentToggleAriaLabel: t.contentToggleAriaLabel,

		workspaceState,
		shouldShowWorkspaceFooter,
		glossaryPanelEmptyState,

		glossarySearchTerm,
		chapterFilterValue: selectedChapterFilterValue,
		chapterFilterLabel,
		chapterFilterOptions,
		isSearchPopupOpen,
		isSearchFilterOptionsOpen,
		isSearchAutocompleteActive,
		isSearching,
		autocompleteSuggestions,
		autocompleteListId: GLOSSARY_AUTOCOMPLETE_LIST_ID,
		searchActiveDescendantId,
		allTopicAreaListItem,
		topicAreaListItems,
		glossaryPanelHeading,
		glossaryTableRows,
		contentToggleEntries,
		pageTools: null,
		activeContentType: LEARNING_CONTENT_TYPES.GLOSSARY,

		backContract,

		changeGlossarySearchTerm,
		focusGlossarySearch,
		clearGlossarySearch,
		openGlossarySearchFilterOptions,
		closeGlossarySearchPopup,
		selectGlossaryChapterFilter,
		selectAutocompleteSuggestion,
		moveSearchSelectionDown,
		moveSearchSelectionUp,
		openSearchKeyboardSelection,
		selectTopicArea,
		selectContentType
	};
}

function createGlossaryPageSubtitle(t, selectedSubject) {
	if (!selectedSubject?.code) {
		return t.glossaryPageSubtitleFallback;
	}

	return t.glossaryPageSubtitle(selectedSubject.code);
}

function localizeGlossaryEntries(glossaryEntries, language) {
	return glossaryEntries.map((glossaryEntry) => ({
		glossaryEntryKey: glossaryEntry.glossaryEntryKey,
		topicAreaKey: glossaryEntry.topicAreaKey,
		term: resolveLocalizedText(glossaryEntry.term, language),
		explanation: resolveLocalizedText(glossaryEntry.explanation, language),
		position: glossaryEntry.position
	}));
}

function resolveLocalizedText(localizedText, language) {
	if (typeof localizedText === "string") {
		return localizedText;
	}

	return localizedText?.[language]
		?? localizedText?.no
		?? localizedText?.en
		?? "";
}

function groupGlossaryEntriesByTopicAreaKey(localizedEntries) {
	const entriesByTopicAreaKey = new Map();

	for (const localizedEntry of localizedEntries) {
		if (!entriesByTopicAreaKey.has(localizedEntry.topicAreaKey)) {
			entriesByTopicAreaKey.set(localizedEntry.topicAreaKey, []);
		}

		entriesByTopicAreaKey.get(localizedEntry.topicAreaKey).push(localizedEntry);
	}

	for (const topicAreaEntries of entriesByTopicAreaKey.values()) {
		topicAreaEntries.sort(compareGlossaryEntries);
	}

	return entriesByTopicAreaKey;
}

function compareGlossaryEntries(leftEntry, rightEntry) {
	const positionDifference = leftEntry.position - rightEntry.position;

	if (positionDifference !== 0) {
		return positionDifference;
	}

	return leftEntry.glossaryEntryKey.localeCompare(rightEntry.glossaryEntryKey);
}

function createTopicAreaByKey(topicAreas) {
	return new Map(topicAreas.map((topicArea) => [topicArea.key, topicArea]));
}

function createTopicAreaReferenceByKey(topicAreas, createChapterReference) {
	return new Map(topicAreas.map((topicArea) => [
		topicArea.key,
		createChapterReference(topicArea.position)
	]));
}

function resolveSelectedTopicAreaKeys({
	selectedTopicAreaKeys,
	topicAreas,
	initialTopicAreaKey
}) {
	const validTopicAreaKeys = new Set(topicAreas.map((topicArea) => topicArea.key));

	if (selectedTopicAreaKeys === null) {
		if (validTopicAreaKeys.has(initialTopicAreaKey)) {
			return new Set([initialTopicAreaKey]);
		}

		return validTopicAreaKeys;
	}

	const resolvedTopicAreaKeys = new Set();

	for (const topicAreaKey of selectedTopicAreaKeys) {
		if (validTopicAreaKeys.has(topicAreaKey)) {
			resolvedTopicAreaKeys.add(topicAreaKey);
		}
	}

	return resolvedTopicAreaKeys.size === 0
		? validTopicAreaKeys
		: resolvedTopicAreaKeys;
}

function createAllTopicAreaKeySet(topicAreas) {
	return new Set(topicAreas.map((topicArea) => topicArea.key));
}

function collectSelectedTopicAreaEntries({ topicAreas, selectedTopicAreaKeys, entriesByTopicAreaKey }) {
	const selectedEntries = [];

	for (const topicArea of topicAreas) {
		if (!selectedTopicAreaKeys.has(topicArea.key)) {
			continue;
		}

		const topicAreaEntries = entriesByTopicAreaKey.get(topicArea.key) ?? [];
		selectedEntries.push(...topicAreaEntries);
	}

	return selectedEntries;
}

function selectGlossaryEntriesForPresentation(selectedEntries, selectedGlossaryEntryKey) {
	if (selectedGlossaryEntryKey === null) {
		return selectedEntries;
	}

	const selectedEntry = selectedEntries.find((entry) => entry.glossaryEntryKey === selectedGlossaryEntryKey);

	return selectedEntry === undefined ? selectedEntries : [selectedEntry];
}

function createGlossaryPanelHeading({
	topicAreaByKey,
	selectedTopicAreaKeys,
	isAllTopicAreasSelected,
	visibleEntryCount,
	t
}) {
	if (isAllTopicAreasSelected) {
		return {
			title: t.glossaryPageAllChaptersHeading,
			subtitle: t.glossaryPageChapterSubtitle(visibleEntryCount)
		};
	}

	if (selectedTopicAreaKeys.size === 1) {
		const selectedTopicAreaKey = selectedTopicAreaKeys.values().next().value;
		const selectedTopicArea = topicAreaByKey.get(selectedTopicAreaKey);

		return {
			title: selectedTopicArea?.label ?? t.glossaryPageSelectedChaptersHeading(1),
			subtitle: t.glossaryPageChapterSubtitle(visibleEntryCount)
		};
	}

	return {
		title: t.glossaryPageSelectedChaptersHeading(selectedTopicAreaKeys.size),
		subtitle: t.glossaryPageChapterSubtitle(visibleEntryCount)
	};
}

function resolveSearchKeyboardIndex({ searchKeyboardIndex, suggestionCount, isAutocompleteOpen }) {
	if (!isAutocompleteOpen || suggestionCount === 0) {
		return -1;
	}

	if (searchKeyboardIndex < 0 || searchKeyboardIndex >= suggestionCount) {
		return 0;
	}

	return searchKeyboardIndex;
}

function resolveSelectedChapterFilterValue({ selectedTopicAreaKeys, topicAreaCount }) {
	if (selectedTopicAreaKeys.size === topicAreaCount) {
		return ALL_TOPIC_AREAS;
	}

	if (selectedTopicAreaKeys.size === 1) {
		return selectedTopicAreaKeys.values().next().value;
	}

	return null;
}

function resolveChapterFilterLabel({ selectedChapterFilterValue, selectedTopicAreaCount, topicAreaByKey, t }) {
	if (selectedChapterFilterValue === ALL_TOPIC_AREAS) {
		return t.glossaryPageAllChaptersHeading;
	}

	if (selectedChapterFilterValue !== null) {
		return topicAreaByKey.get(selectedChapterFilterValue)?.label
			?? t.glossaryPageSelectedChaptersHeading(1);
	}

	return t.glossaryPageSelectedChaptersHeading(selectedTopicAreaCount);
}

function resolvePageEmptyStateKind({
	pageStatus,
	topicAreas,
	localizedEntries
}) {
	if (pageStatus !== LOAD_STATUS.READY) {
		return null;
	}

	if (topicAreas.length === 0) {
		return "no-topic-areas";
	}

	if (localizedEntries.length === 0) {
		return "no-glossary-entries";
	}

	return null;
}

function resolveGlossaryPanelEmptyStateKind(selectedEntryCount) {
	return selectedEntryCount === 0 ? "no-entries-in-selection" : null;
}

function createGlossaryEmptyState({ emptyStateKind, t }) {
	if (emptyStateKind === "no-topic-areas") {
		return {
			kind: emptyStateKind,
			title: t.glossaryPageNoTopicAreasTitle,
			body: t.glossaryPageNoTopicAreasBody
		};
	}

	if (emptyStateKind === "no-glossary-entries") {
		return {
			kind: emptyStateKind,
			title: t.glossaryPageNoEntriesTitle,
			body: t.glossaryPageNoEntriesBody
		};
	}

	if (emptyStateKind === "no-entries-in-selection") {
		return {
			kind: emptyStateKind,
			title: t.glossaryPageNoEntriesInSelectionTitle,
			body: t.glossaryPageNoEntriesInSelectionBody
		};
	}

	return null;
}

const calculateNextSearchKeyboardIndex = ({ previousIndex, direction, suggestionCount }) => {
	if (previousIndex < 0) {
		return direction > 0 ? 0 : suggestionCount - 1;
	}

	return (previousIndex + direction + suggestionCount) % suggestionCount;
};

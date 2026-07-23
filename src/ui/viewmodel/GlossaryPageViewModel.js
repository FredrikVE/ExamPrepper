// src/ui/viewmodel/GlossaryPageViewModel.js
import { useCallback, useEffect, useMemo, useState } from "react";
import { LEARNING_CONTENT_ENTRIES, LEARNING_CONTENT_TYPES } from "../../navigation/learningContent.js";
import { LEARNING_CONTENT_SELECT_PAGE_TOOLS } from "../pageTools/pageTools.js";
import { ALL_TOPIC_AREAS } from "../../model/domain/utils/topicAreaFilters.js";
import { LOAD_STATUS } from "./LoadState/loadStatus.js";
import useLoadModel from "./LoadState/useLoadModel.js";
import combineLoadStatuses from "./LoadState/combineLoadStatuses.js";
import resolveFirstLoadError from "./Utils/resolveFirstLoadError.js";
import createWorkspaceToolsModel from "./Utils/createWorkspaceToolsModel.js";
import { createWorkspaceState } from "./WorkspaceState/createWorkspaceState.js";
import { WORKSPACE_STATE_KINDS } from "./WorkspaceState/workspaceStateKinds.js";
import { GLOSSARY_SEARCH_SCOPES, countEntryMatchesByTopicAreaForNormalizedSearchTerm, doesGlossarySearchScopeIncludeTerms, filterEntriesByNormalizedSearchTerm, normalizeSearchTerm } from "./GlossaryPage/glossarySearchModel.js";
import { applyGlossaryTopicAreaInteractionState, createGlossaryAllTopicAreaListItem, createGlossaryTopicAreaListItems, GLOSSARY_TOPIC_AREA_LIST_ID } from "./GlossaryPage/glossaryTopicAreaListModel.js";
import { createGlossaryTableRows } from "./GlossaryPage/glossaryTableModel.js";

export default function useGlossaryPageViewModel(
	getGlossaryEntriesForSubjectUseCase,
	getTopicAreasUseCase,
	subjectId,
	selectedSubject,
	initialTopicAreaKey,
	language,
	t,
	isActive,
	backContract,
	onSelectContentType
) {
	const [glossarySearchTerm, setGlossarySearchTerm] = useState("");
	const [glossarySearchScope, setGlossarySearchScope] = useState(GLOSSARY_SEARCH_SCOPES.ALL);
	const [selectedTopicAreaKeys, setSelectedTopicAreaKeys] = useState(null);
	const [searchKeyboardIndex, setSearchKeyboardIndex] = useState(-1);
	const [isSearchFilterOptionsOpen, setIsSearchFilterOptionsOpen] = useState(false);

	useEffect(() => {
		setGlossarySearchTerm("");
		setGlossarySearchScope(GLOSSARY_SEARCH_SCOPES.ALL);
		setSelectedTopicAreaKeys(null);
		setSearchKeyboardIndex(-1);
		setIsSearchFilterOptionsOpen(false);
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

	const matchCountsByTopicAreaKey = useMemo(() => {
		if (!doesGlossarySearchScopeIncludeTerms(glossarySearchScope)) {
			return new Map();
		}

		return countEntryMatchesByTopicAreaForNormalizedSearchTerm(localizedEntries, normalizedSearchTerm);
	}, [glossarySearchScope, localizedEntries, normalizedSearchTerm]);

	const baseTopicAreaListItems = useMemo(() => {
		return createGlossaryTopicAreaListItems({
			topicAreas,
			entriesByTopicAreaKey,
			matchCountsByTopicAreaKey,
			normalizedSearchTerm,
			searchScope: glossarySearchScope,
			labels: {
				chapterMatchCount: t.glossaryPageChapterMatchCount,
				chapterReference: t.glossaryPageChapterReference,
				chapterSubtitle: t.glossaryPageChapterSubtitle,
				chapterSearchSubtitle: t.glossaryPageChapterSearchSubtitle
			}
		});
	}, [entriesByTopicAreaKey, glossarySearchScope, matchCountsByTopicAreaKey, normalizedSearchTerm, t, topicAreas]);

	const resolvedSearchKeyboardIndex = resolveSearchKeyboardIndex({
		searchKeyboardIndex,
		topicAreaCount: baseTopicAreaListItems.length,
		isSearching
	});

	const topicAreaListItems = useMemo(() => {
		return applyGlossaryTopicAreaInteractionState({
			topicAreaListItems: baseTopicAreaListItems,
			selectedTopicAreaKeys: resolvedSelectedTopicAreaKeys,
			searchKeyboardIndex: resolvedSearchKeyboardIndex,
			showsSelectionControls: isTopicAreaSelectionMode
		});
	}, [baseTopicAreaListItems, isTopicAreaSelectionMode, resolvedSearchKeyboardIndex, resolvedSelectedTopicAreaKeys]);

	const allTopicAreaListItem = useMemo(() => {
		return createGlossaryAllTopicAreaListItem({
			topicAreaCount: topicAreas.length,
			selectedTopicAreaCount,
			entryCount: localizedEntries.length,
			isSelected: isAllTopicAreasSelected,
			labels: {
				allTopicAreas: t.glossaryPageSelectAllChaptersLabel,
				allTopicAreasEyebrow: t.glossaryPageAllChaptersEyebrow,
				topicAreaSelectionEyebrow: t.glossaryPageChapterSelectionEyebrow,
				allTopicAreasSelected: t.glossaryPageAllChaptersSelectedSummary,
				topicAreaSelection: t.glossaryPageChapterSelectionSummary
			}
		});
	}, [isAllTopicAreasSelected, localizedEntries.length, selectedTopicAreaCount, t, topicAreas.length]);

	const visibleTopicAreaListItemByKey = useMemo(() => {
		return createTopicAreaListItemByKey(baseTopicAreaListItems);
	}, [baseTopicAreaListItems]);

	const selectedTopicAreaEntries = useMemo(() => {
		return collectSelectedTopicAreaEntries({
			topicAreas,
			selectedTopicAreaKeys: resolvedSelectedTopicAreaKeys,
			entriesByTopicAreaKey,
			visibleTopicAreaListItemByKey,
			normalizedSearchTerm,
			isSearching
		});
	}, [entriesByTopicAreaKey, isSearching, normalizedSearchTerm, resolvedSelectedTopicAreaKeys, topicAreas, visibleTopicAreaListItemByKey]);

	const topicAreaReferenceByKey = useMemo(() => {
		return createTopicAreaReferenceByKey(topicAreas, t.glossaryPageChapterReference);
	}, [t.glossaryPageChapterReference, topicAreas]);

	const glossaryTableRows = useMemo(() => {
		return createGlossaryTableRows({
			localizedEntries: selectedTopicAreaEntries,
			normalizedSearchTerm: doesGlossarySearchScopeIncludeTerms(glossarySearchScope)
				? normalizedSearchTerm
				: "",
			topicAreaReferenceByKey
		});
	}, [glossarySearchScope, normalizedSearchTerm, selectedTopicAreaEntries, topicAreaReferenceByKey]);

	const glossaryPanelHeading = useMemo(() => {
		return createGlossaryPanelHeading({
			topicAreaByKey,
			selectedTopicAreaKeys: resolvedSelectedTopicAreaKeys,
			isAllTopicAreasSelected,
			visibleEntryCount: selectedTopicAreaEntries.length,
			t
		});
	}, [isAllTopicAreasSelected, resolvedSelectedTopicAreaKeys, selectedTopicAreaEntries.length, t, topicAreaByKey]);

	const searchSummaryLabel = useMemo(() => {
		if (!isSearching) {
			return "";
		}

		if (glossarySearchScope === GLOSSARY_SEARCH_SCOPES.CHAPTERS) {
			return t.glossaryPageChapterSearchSummary(topicAreaListItems.length);
		}

		return t.glossaryPageSearchSummary(
			topicAreaListItems.length,
			sumMatchCounts(matchCountsByTopicAreaKey)
		);
	}, [glossarySearchScope, isSearching, matchCountsByTopicAreaKey, t, topicAreaListItems.length]);

	const pageEmptyStateKind = resolvePageEmptyStateKind({
		pageStatus,
		topicAreas,
		localizedEntries
	});
	const pageEmptyState = createGlossaryEmptyState({
		emptyStateKind: pageEmptyStateKind,
		searchTerm: glossarySearchTerm,
		searchScope: glossarySearchScope,
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
	const glossaryPanelEmptyStateKind = resolveGlossaryPanelEmptyStateKind({
		selectedEntryCount: selectedTopicAreaEntries.length,
		isSearching
	});
	const glossaryPanelEmptyState = createGlossaryEmptyState({
		emptyStateKind: glossaryPanelEmptyStateKind,
		searchTerm: glossarySearchTerm,
		searchScope: glossarySearchScope,
		t
	});
	const isSearchComboboxActive = isSearching && topicAreaListItems.length > 0;
	const searchActiveDescendantId = isSearchComboboxActive
		? topicAreaListItems[resolvedSearchKeyboardIndex]?.id ?? null
		: null;
	const searchPlaceholder = resolveGlossarySearchPlaceholder(glossarySearchScope, t);
	const searchScopeLabel = resolveGlossarySearchScopeLabel(glossarySearchScope, t);
	const searchScopeOptions = useMemo(() => ([
		{
			id: GLOSSARY_SEARCH_SCOPES.ALL,
			value: GLOSSARY_SEARCH_SCOPES.ALL,
			label: t.glossaryPageSearchScopeAllLabel
		},
		{
			id: GLOSSARY_SEARCH_SCOPES.TERMS,
			value: GLOSSARY_SEARCH_SCOPES.TERMS,
			label: t.glossaryPageSearchScopeTermsLabel
		},
		{
			id: GLOSSARY_SEARCH_SCOPES.CHAPTERS,
			value: GLOSSARY_SEARCH_SCOPES.CHAPTERS,
			label: t.glossaryPageSearchScopeChaptersLabel
		}
	]), [t.glossaryPageSearchScopeAllLabel, t.glossaryPageSearchScopeChaptersLabel, t.glossaryPageSearchScopeTermsLabel]);

	const contentToggleEntries = useMemo(() => {
		return LEARNING_CONTENT_ENTRIES.map((entry) => ({
			id: entry.id,
			label: t[entry.labelKey],
			isDisabled: false
		}));
	}, [t]);

	const pageTools = useMemo(() => {
		return createWorkspaceToolsModel({
			pageToolGroup: LEARNING_CONTENT_SELECT_PAGE_TOOLS,
			t
		});
	}, [t]);

	const changeGlossarySearchTerm = useCallback((nextSearchTerm) => {
		setGlossarySearchTerm(nextSearchTerm);
		setSearchKeyboardIndex(nextSearchTerm.trim().length > 0 ? 0 : -1);
		setIsSearchFilterOptionsOpen(false);
	}, []);

	const clearGlossarySearch = useCallback(() => {
		setGlossarySearchTerm("");
		setSearchKeyboardIndex(-1);
		setIsSearchFilterOptionsOpen(false);
	}, []);

	const openGlossarySearchFilterOptions = useCallback(() => {
		setIsSearchFilterOptionsOpen((previousIsOpen) => !previousIsOpen);
	}, []);

	const closeGlossarySearchFilterOptions = useCallback(() => {
		setIsSearchFilterOptionsOpen(false);
	}, []);

	const selectGlossarySearchScope = useCallback((nextSearchScope) => {
		if (!Object.values(GLOSSARY_SEARCH_SCOPES).includes(nextSearchScope)) {
			return;
		}

		setGlossarySearchScope(nextSearchScope);
		setSearchKeyboardIndex(isSearching ? 0 : -1);
		setIsSearchFilterOptionsOpen(false);
	}, [isSearching]);

	const selectTopicArea = useCallback((topicAreaKey) => {
		if (topicAreaKey === ALL_TOPIC_AREAS) {
			setSelectedTopicAreaKeys(createAllTopicAreaKeySet(topicAreas));
			setSearchKeyboardIndex(-1);
			return;
		}

		const topicAreaIndex = findTopicAreaListItemIndexByKey(topicAreaListItems, topicAreaKey);

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
		setSearchKeyboardIndex(isSearching && topicAreaIndex >= 0 ? topicAreaIndex : -1);
	}, [initialTopicAreaKey, isSearching, topicAreaByKey, topicAreaListItems, topicAreas]);

	const moveSearchSelection = useCallback((direction) => {
		if (!isSearching || topicAreaListItems.length === 0) {
			return;
		}

		setSearchKeyboardIndex((previousIndex) => calculateNextSearchKeyboardIndex({
			previousIndex,
			direction,
			topicAreaCount: topicAreaListItems.length
		}));
	}, [isSearching, topicAreaListItems.length]);

	const moveSearchSelectionDown = useCallback(() => {
		moveSearchSelection(1);
	}, [moveSearchSelection]);

	const moveSearchSelectionUp = useCallback(() => {
		moveSearchSelection(-1);
	}, [moveSearchSelection]);

	const selectContentType = useCallback((contentTypeId) => {
		if (contentTypeId === LEARNING_CONTENT_TYPES.GLOSSARY) {
			return;
		}

		onSelectContentType(contentTypeId);
	}, [onSelectContentType]);

	const openSearchKeyboardSelection = useCallback(() => {
		const selectedTopicArea = topicAreaListItems[resolvedSearchKeyboardIndex];

		if (!isSearching || !selectedTopicArea) {
			return;
		}

		selectTopicArea(selectedTopicArea.topicAreaKey);
	}, [isSearching, resolvedSearchKeyboardIndex, selectTopicArea, topicAreaListItems]);

	return {
		pageTitle: t.glossaryPageTitle,
		pageSubtitle: createGlossaryPageSubtitle(t, selectedSubject),
		searchPlaceholder,
		searchLabel: t.glossaryPageSearchLabel,
		searchScopeAriaLabel: t.glossaryPageSearchScopeAriaLabel,
		searchClearLabel: t.glossaryPageSearchClearLabel,
		searchKeyboardHint: t.glossaryPageSearchKeyboardHint,
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
		glossarySearchScope,
		searchScopeLabel,
		searchScopeOptions,
		isSearchFilterOptionsOpen,
		isSearching,
		isSearchComboboxActive,
		searchActiveDescendantId,
		searchSummaryLabel,
		topicAreaListId: GLOSSARY_TOPIC_AREA_LIST_ID,
		allTopicAreaListItem,
		topicAreaListItems,
		glossaryPanelHeading,
		glossaryTableRows,
		contentToggleEntries,
		pageTools,
		activeContentType: LEARNING_CONTENT_TYPES.GLOSSARY,

		showBackButton: backContract.showBackButton,
		backLabel: backContract.backLabel,
		navigationLabel: backContract.navigationLabel,
		onBack: backContract.onBack,

		changeGlossarySearchTerm,
		clearGlossarySearch,
		openGlossarySearchFilterOptions,
		closeGlossarySearchFilterOptions,
		selectGlossarySearchScope,
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

function createTopicAreaListItemByKey(topicAreaListItems) {
	return new Map(topicAreaListItems.map((topicAreaListItem) => [
		topicAreaListItem.topicAreaKey,
		topicAreaListItem
	]));
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

function collectSelectedTopicAreaEntries({
	topicAreas,
	selectedTopicAreaKeys,
	entriesByTopicAreaKey,
	visibleTopicAreaListItemByKey,
	normalizedSearchTerm,
	isSearching
}) {
	const selectedEntries = [];

	for (const topicArea of topicAreas) {
		if (!selectedTopicAreaKeys.has(topicArea.key)) {
			continue;
		}

		const topicAreaEntries = entriesByTopicAreaKey.get(topicArea.key) ?? [];

		if (!isSearching) {
			selectedEntries.push(...topicAreaEntries);
			continue;
		}

		const visibleTopicAreaListItem = visibleTopicAreaListItemByKey.get(topicArea.key);

		if (!visibleTopicAreaListItem) {
			continue;
		}

		if (visibleTopicAreaListItem.showsAllEntries) {
			selectedEntries.push(...topicAreaEntries);
			continue;
		}

		selectedEntries.push(...filterEntriesByNormalizedSearchTerm(
			topicAreaEntries,
			normalizedSearchTerm
		));
	}

	return selectedEntries;
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

function resolveSearchKeyboardIndex({
	searchKeyboardIndex,
	topicAreaCount,
	isSearching
}) {
	if (!isSearching || topicAreaCount === 0) {
		return -1;
	}

	if (searchKeyboardIndex < 0 || searchKeyboardIndex >= topicAreaCount) {
		return 0;
	}

	return searchKeyboardIndex;
}

function findTopicAreaListItemIndexByKey(topicAreaListItems, topicAreaKey) {
	return topicAreaListItems.findIndex((topicAreaListItem) => (
		topicAreaListItem.topicAreaKey === topicAreaKey
	));
}

function sumMatchCounts(matchCountsByTopicAreaKey) {
	let totalMatchCount = 0;

	for (const matchCount of matchCountsByTopicAreaKey.values()) {
		totalMatchCount += matchCount;
	}

	return totalMatchCount;
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

function resolveGlossaryPanelEmptyStateKind({
	selectedEntryCount,
	isSearching
}) {
	if (selectedEntryCount === 0 && isSearching) {
		return "no-search-results";
	}

	if (selectedEntryCount === 0) {
		return "no-entries-in-selection";
	}

	return null;
}

function createGlossaryEmptyState({ emptyStateKind, searchTerm, searchScope, t }) {
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

	if (emptyStateKind === "no-search-results") {
		return {
			kind: emptyStateKind,
			title: t.glossaryPageNoSearchResultsTitle,
			body: resolveGlossaryNoSearchResultsBody(searchScope, searchTerm, t)
		};
	}

	return null;
}

function resolveGlossarySearchPlaceholder(searchScope, t) {
	if (searchScope === GLOSSARY_SEARCH_SCOPES.CHAPTERS) {
		return t.glossaryPageSearchChaptersPlaceholder;
	}

	if (searchScope === GLOSSARY_SEARCH_SCOPES.TERMS) {
		return t.glossaryPageSearchTermsPlaceholder;
	}

	return t.glossaryPageSearchAllPlaceholder;
}

function resolveGlossarySearchScopeLabel(searchScope, t) {
	if (searchScope === GLOSSARY_SEARCH_SCOPES.CHAPTERS) {
		return t.glossaryPageSearchScopeChaptersLabel;
	}

	if (searchScope === GLOSSARY_SEARCH_SCOPES.TERMS) {
		return t.glossaryPageSearchScopeTermsLabel;
	}

	return t.glossaryPageSearchScopeAllLabel;
}

function resolveGlossaryNoSearchResultsBody(searchScope, searchTerm, t) {
	if (searchScope === GLOSSARY_SEARCH_SCOPES.CHAPTERS) {
		return t.glossaryPageNoChapterSearchResultsBody(searchTerm);
	}

	if (searchScope === GLOSSARY_SEARCH_SCOPES.TERMS) {
		return t.glossaryPageNoTermSearchResultsBody(searchTerm);
	}

	return t.glossaryPageNoAllSearchResultsBody(searchTerm);
}

const calculateNextSearchKeyboardIndex = ({ previousIndex, direction, topicAreaCount }) => {
	if (previousIndex < 0) {
		return direction > 0 ? 0 : topicAreaCount - 1;
	}

	return (previousIndex + direction + topicAreaCount) % topicAreaCount;
};

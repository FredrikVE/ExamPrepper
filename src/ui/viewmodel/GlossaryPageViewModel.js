// src/ui/viewmodel/GlossaryPageViewModel.js
import { useCallback, useEffect, useMemo, useState } from "react";
import { ALL_TOPIC_AREAS } from "../../model/domain/utils/topicAreaFilters.js";
import { LOAD_STATUS } from "../loadStatus/loadStatus.js";
import useLoadModel from "./LoadState/useLoadModel.js";
import combineLoadStatuses from "./LoadState/combineLoadStatuses.js";
import resolveFirstLoadError from "./Utils/resolveFirstLoadError.js";
import { countEntryMatchesByTopicAreaForNormalizedSearchTerm, filterEntriesByNormalizedSearchTerm, normalizeSearchTerm } from "./GlossaryPage/glossarySearchModel.js";
import { applyGlossaryTopicAreaInteractionState, createGlossaryTopicAreaListItems, GLOSSARY_TOPIC_AREA_LIST_ID } from "./GlossaryPage/glossaryTopicAreaListModel.js";
import { createGlossaryTableRows } from "./GlossaryPage/glossaryTableModel.js";

export default function useGlossaryPageViewModel(
	getGlossaryEntriesForSubjectUseCase,
	getTopicAreasUseCase,
	subjectId,
	initialTopicAreaKey,
	language,
	t,
	isActive,
	backContract
) {
	const [glossarySearchTerm, setGlossarySearchTerm] = useState("");
	const [activeTopicAreaKey, setActiveTopicAreaKey] = useState(initialTopicAreaKey ?? null);
	const [searchKeyboardIndex, setSearchKeyboardIndex] = useState(-1);

	useEffect(() => {
		setGlossarySearchTerm("");
		setActiveTopicAreaKey(initialTopicAreaKey ?? null);
		setSearchKeyboardIndex(-1);
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

	const glossaryEntryLoad = useLoadModel({
		execute: executeGlossaryEntryLoad,
		emptyData: [],
		errorMessage: t.glossaryPageErrorMessage,
		onLoaded: null
	});

	const topicAreaLoad = useLoadModel({
		execute: executeTopicAreaLoad,
		emptyData: [],
		errorMessage: t.glossaryPageErrorMessage,
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

	const normalizedSearchTerm = useMemo(() => {
		return normalizeSearchTerm(glossarySearchTerm);
	}, [glossarySearchTerm]);
	const isSearching = normalizedSearchTerm.length > 0;

	const matchCountsByTopicAreaKey = useMemo(() => {
		return countEntryMatchesByTopicAreaForNormalizedSearchTerm(localizedEntries, normalizedSearchTerm);
	}, [localizedEntries, normalizedSearchTerm]);

	const baseTopicAreaListItems = useMemo(() => {
		return createGlossaryTopicAreaListItems({
			topicAreas,
			entriesByTopicAreaKey,
			matchCountsByTopicAreaKey,
			normalizedSearchTerm,
			labels: {
				chapterMatchCount: t.glossaryPageChapterMatchCount,
				chapterSubtitle: t.glossaryPageChapterSubtitle,
				chapterSearchSubtitle: t.glossaryPageChapterSearchSubtitle
			}
		});
	}, [
		entriesByTopicAreaKey,
		matchCountsByTopicAreaKey,
		normalizedSearchTerm,
		t,
		topicAreas
	]);

	const resolvedActiveTopicAreaKey = useMemo(() => {
		return resolveActiveTopicAreaKey({
			topicAreaListItems: baseTopicAreaListItems,
			activeTopicAreaKey
		});
	}, [activeTopicAreaKey, baseTopicAreaListItems]);

	const resolvedSearchKeyboardIndex = resolveSearchKeyboardIndex({
		searchKeyboardIndex,
		topicAreaCount: baseTopicAreaListItems.length,
		isSearching
	});

	const topicAreaListItems = useMemo(() => {
		return applyGlossaryTopicAreaInteractionState({
			topicAreaListItems: baseTopicAreaListItems,
			activeTopicAreaKey: resolvedActiveTopicAreaKey,
			searchKeyboardIndex: resolvedSearchKeyboardIndex
		});
	}, [
		baseTopicAreaListItems,
		resolvedActiveTopicAreaKey,
		resolvedSearchKeyboardIndex
	]);

	const activeTopicAreaListItem = useMemo(() => {
		return findTopicAreaListItemByKey(
			topicAreaListItems,
			resolvedActiveTopicAreaKey
		);
	}, [resolvedActiveTopicAreaKey, topicAreaListItems]);

	const activeTopicAreaEntries = useMemo(() => {
		if (!activeTopicAreaListItem) {
			return [];
		}

		const topicAreaEntries = entriesByTopicAreaKey.get(
			activeTopicAreaListItem.topicAreaKey
		) ?? [];

		if (activeTopicAreaListItem.showsAllEntries) {
			return topicAreaEntries;
		}

		return filterEntriesByNormalizedSearchTerm(topicAreaEntries, normalizedSearchTerm);
	}, [
		activeTopicAreaListItem,
		entriesByTopicAreaKey,
		normalizedSearchTerm
	]);

	const glossaryPanelHeading = useMemo(() => {
		if (!activeTopicAreaListItem) {
			return null;
		}

		return {
			title: activeTopicAreaListItem.label,
			subtitle: activeTopicAreaListItem.subtitle,
			iconKey: activeTopicAreaListItem.iconKey
		};
	}, [activeTopicAreaListItem]);

	const glossaryTableRows = useMemo(() => {
		return createGlossaryTableRows({
			localizedEntries: activeTopicAreaEntries,
			normalizedSearchTerm
		});
	}, [activeTopicAreaEntries, normalizedSearchTerm]);

	const searchSummaryLabel = useMemo(() => {
		if (!isSearching) {
			return "";
		}

		return t.glossaryPageSearchSummary(
			topicAreaListItems.length,
			sumMatchCounts(matchCountsByTopicAreaKey)
		);
	}, [isSearching, matchCountsByTopicAreaKey, t, topicAreaListItems.length]);

	const hasNoSearchMatches = isSearching && topicAreaListItems.length === 0;
	const emptyStateKind = resolveEmptyStateKind({
		pageStatus,
		topicAreas,
		localizedEntries,
		hasNoSearchMatches
	});
	const emptyState = createGlossaryEmptyState({
		emptyStateKind,
		searchTerm: glossarySearchTerm,
		t
	});
	const isSearchComboboxActive = isSearching && topicAreaListItems.length > 0;
	const searchActiveDescendantId = isSearchComboboxActive
		? topicAreaListItems[resolvedSearchKeyboardIndex]?.id ?? null
		: null;

	const changeGlossarySearchTerm = useCallback((nextSearchTerm) => {
		setGlossarySearchTerm(nextSearchTerm);
		setSearchKeyboardIndex(nextSearchTerm.length > 0 ? 0 : -1);
	}, []);

	const clearGlossarySearch = useCallback(() => {
		setGlossarySearchTerm("");
		setSearchKeyboardIndex(-1);
	}, []);

	const selectTopicArea = useCallback((topicAreaKey) => {
		const topicAreaIndex = findTopicAreaListItemIndexByKey(
			topicAreaListItems,
			topicAreaKey
		);

		if (topicAreaIndex === -1) {
			return;
		}

		setActiveTopicAreaKey(topicAreaKey);
		setSearchKeyboardIndex(isSearching ? topicAreaIndex : -1);
	}, [isSearching, topicAreaListItems]);

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

	const openSearchKeyboardSelection = useCallback(() => {
		const selectedTopicArea = topicAreaListItems[resolvedSearchKeyboardIndex];

		if (!isSearching || !selectedTopicArea) {
			return;
		}

		setActiveTopicAreaKey(selectedTopicArea.topicAreaKey);
	}, [isSearching, resolvedSearchKeyboardIndex, topicAreaListItems]);

	const pageEmptyState = emptyStateKind === "no-search-results" ? null : emptyState;
	const glossaryPanelEmptyState = emptyStateKind === "no-search-results" ? emptyState : null;

	return {
		pageTitle: t.glossaryPageTitle,
		searchPlaceholder: t.glossaryPageSearchPlaceholder,
		searchClearLabel: t.glossaryPageSearchClearLabel,
		searchKeyboardHint: t.glossaryPageSearchKeyboardHint,
		termColumnHeader: t.glossaryPageTermColumnHeader,
		explanationColumnHeader: t.glossaryPageExplanationColumnHeader,
		mobileChapterSheetTitle: t.glossaryPageMobileChapterSheetTitle,
		mobileChapterSheetSubtitle: t.glossaryPageMobileChapterSheetSubtitle,
		mobileChapterSheetOpenLabel: t.glossaryPageMobileChapterSheetOpenLabel,
		mobileChapterSheetCloseLabel: t.glossaryPageMobileChapterSheetCloseLabel,
		loadingTitle: t.glossaryPageLoadingTitle,
		errorTitle: t.glossaryPageErrorTitle,

		pageStatus,
		pageErrorMessage,
		pageEmptyState,
		glossaryPanelEmptyState,

		glossarySearchTerm,
		isSearching,
		isSearchComboboxActive,
		searchActiveDescendantId,
		searchSummaryLabel,
		topicAreaListId: GLOSSARY_TOPIC_AREA_LIST_ID,
		topicAreaListItems,
		resolvedActiveTopicAreaKey,
		glossaryPanelHeading,
		glossaryTableRows,

		showBackButton: backContract.showBackButton,
		backLabel: backContract.backLabel,
		navigationLabel: backContract.navigationLabel,
		onBack: backContract.onBack,

		changeGlossarySearchTerm,
		clearGlossarySearch,
		moveSearchSelectionDown,
		moveSearchSelectionUp,
		openSearchKeyboardSelection,
		selectTopicArea
	};
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

function resolveActiveTopicAreaKey({ topicAreaListItems, activeTopicAreaKey }) {
	if (findTopicAreaListItemByKey(topicAreaListItems, activeTopicAreaKey)) {
		return activeTopicAreaKey;
	}

	return topicAreaListItems[0]?.topicAreaKey ?? null;
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

function findTopicAreaListItemByKey(topicAreaListItems, topicAreaKey) {
	return topicAreaListItems.find((topicAreaListItem) => (
		topicAreaListItem.topicAreaKey === topicAreaKey
	)) ?? null;
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

function resolveEmptyStateKind({
	pageStatus,
	topicAreas,
	localizedEntries,
	hasNoSearchMatches
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

	if (hasNoSearchMatches) {
		return "no-search-results";
	}

	return null;
}

function createGlossaryEmptyState({ emptyStateKind, searchTerm, t }) {
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

	if (emptyStateKind === "no-search-results") {
		return {
			kind: emptyStateKind,
			title: t.glossaryPageNoSearchResultsTitle,
			body: t.glossaryPageNoSearchResultsBody(searchTerm)
		};
	}

	return null;
}

const calculateNextSearchKeyboardIndex = ({ previousIndex, direction, topicAreaCount }) => {
	if (previousIndex < 0) {
		return direction > 0 ? 0 : topicAreaCount - 1;
	}

	return (previousIndex + direction + topicAreaCount) % topicAreaCount;
};

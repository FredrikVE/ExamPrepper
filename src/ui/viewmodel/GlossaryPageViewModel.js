// src/ui/viewmodel/GlossaryPageViewModel.js
import { useCallback, useEffect, useMemo, useState } from "react";
import { LEARNING_CONTENT_TYPES } from "../../navigation/navigation.js";
import { GLOSSARY_TABLE_SORT_DIRECTIONS, GLOSSARY_TABLE_SORT_KEYS } from "../../constants/GlossaryTableSort.js";
import { ALL_TOPIC_AREAS } from "../../constants/TopicAreas.js";
import { createWorkspaceState } from "./WorkspaceState/createWorkspaceState.js";
import { createContentToggleEntries, createMobileToggleButtonItems } from "./Shared/contentToggleModel.js";
import { WORKSPACE_STATE_KINDS } from "./WorkspaceState/workspaceStateKinds.js";
import { GLOSSARY_AUTOCOMPLETE_LIST_ID, GLOSSARY_AUTOCOMPLETE_MIN_LENGTH, SEARCH_POPUP_CONTENT, createGlossaryAutocompleteSuggestions, resolveGlossarySearchPopupContent } from "./GlossaryPage/glossarySearchModel.js";
import normalizeSearchTerm from "./Utils/normalizeSearchTerm.js";
import { applyGlossaryTopicAreaInteractionState, createGlossaryAllTopicAreaListItem, createGlossaryTopicAreaListItems } from "./GlossaryPage/glossaryTopicAreaListModel.js";
import { createGlossaryTableRows, getInitialGlossaryTableSortDirection, sortGlossaryTableRows } from "./GlossaryPage/glossaryTableModel.js";
import { createGlossaryNetworkDisplay, createGlossaryNetworkPresentation } from "./GlossaryPage/glossaryNetworkModel.js";
import { assertGlossaryEntriesReferenceKnownTopicAreas } from "./GlossaryPage/glossaryDataContract.js";
import { createGlossaryDetailPresentation } from "./GlossaryPage/glossaryDetailModel.js";
import useGlossarySearchModel from "./GlossaryPage/useGlossarySearchModel.js";
import useGlossaryDetailModel from "./GlossaryPage/useGlossaryDetailModel.js";
import useGlossaryPageResources from "./GlossaryPage/useGlossaryPageResources.js";
import { calculateNextSearchKeyboardIndex, collectSelectedTopicAreaEntries, createAllTopicAreaKeySet, createGlossaryEmptyState, createGlossaryEntryByKey, createGlossaryPageSubtitle, createGlossaryPanelHeading, createTopicAreaByKey, createTopicAreaReferenceByKey, groupGlossaryEntriesByTopicAreaKey, localizeGlossaryEntries, resolveChapterFilterLabel, resolveGlossaryPanelEmptyStateKind, resolvePageEmptyStateKind, resolveSearchKeyboardIndex, resolveSelectedChapterFilterValue, resolveSelectedTopicAreaKeys, selectGlossaryEntriesForPresentation } from "./GlossaryPage/glossaryPageDerivations.js";
import { bindGlossaryDetailInteractions, bindGlossaryTableInteractions, bindTopicAreaInteraction, createGlossaryDetailClosingSnapshot, createGlossaryTableHeaderPresentations } from "./GlossaryPage/glossaryInteractionBindings.js";

const DEFAULT_GLOSSARY_TABLE_SORT = Object.freeze({
	key: GLOSSARY_TABLE_SORT_KEYS.DIRECT_NEIGHBOR_COUNT,
	direction: GLOSSARY_TABLE_SORT_DIRECTIONS.DESCENDING
});

export default function useGlossaryPageViewModel(props) {
	const {
		glossarySearchTerm,
		setGlossarySearchTerm,
		searchKeyboardIndex,
		setSearchKeyboardIndex,
		isSearchFilterOptionsOpen,
		setIsSearchFilterOptionsOpen,
		isSearchAutocompleteOpen,
		setIsSearchAutocompleteOpen,
		searchNarrowedGlossaryEntryKey,
		setSearchNarrowedGlossaryEntryKey
	} = useGlossarySearchModel();
	const [selectedTopicAreaKeys, setSelectedTopicAreaKeys] = useState(null);
	const {
		expandedGlossaryEntryKey,
		setExpandedGlossaryEntryKey,
		glossaryDetailTrailKeys,
		setGlossaryDetailTrailKeys,
		glossaryDetailRenderSnapshot,
		setGlossaryDetailRenderSnapshot,
		areGlossaryDetailRelationsExpanded,
		setAreGlossaryDetailRelationsExpanded,
		glossaryDetailOriginEntryKeyRef,
		glossaryDetailTitleFocusRequestKeyRef,
		glossaryDetailTitleElementRef,
		glossaryDetailTriggerElementByKey,
		resolveGlossaryDetailTriggerRef
	} = useGlossaryDetailModel();
	const [glossaryTableSort, setGlossaryTableSort] = useState(DEFAULT_GLOSSARY_TABLE_SORT);

	const {
		glossaryEntries,
		topicAreas,
		pageStatus,
		isPageContentReady,
		activeGlossaryDetailEntryKey,
		glossaryNetworkLoad,
		pageErrorMessage
	} = useGlossaryPageResources({
		getGlossaryOverviewUseCase: props.getGlossaryOverviewUseCase,
		getGlossaryNetworkUseCase: props.getGlossaryNetworkUseCase,
		getTopicAreasUseCase: props.getTopicAreasUseCase,
		subjectId: props.subjectId,
		language: props.language,
		authScopeKey: props.authScopeKey,
		isActive: props.isActive,
		expandedGlossaryEntryKey,
		t: props.t
	});

	const localizedEntries = useMemo(() => {
		const entries = localizeGlossaryEntries(glossaryEntries, props.language);

		if (isPageContentReady) {
			assertGlossaryEntriesReferenceKnownTopicAreas({ localizedEntries: entries, topicAreas });
		}

		return entries;
	}, [glossaryEntries, isPageContentReady, props.language, topicAreas]);

	const localizedEntryByKey = useMemo(() => {
		return createGlossaryEntryByKey(localizedEntries);
	}, [localizedEntries]);

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
			initialTopicAreaKey: props.initialTopicAreaKey
		});
	}, [props.initialTopicAreaKey, selectedTopicAreaKeys, topicAreas]);

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
				chapterSubtitle: props.t.glossaryPageChapterSubtitle
			}
		});
	}, [entriesByTopicAreaKey, props.t.glossaryPageChapterSubtitle, topicAreas]);

	const baseTopicAreaListItemsWithInteractionState = useMemo(() => {
		return applyGlossaryTopicAreaInteractionState({
			topicAreaListItems: baseTopicAreaListItems,
			selectedTopicAreaKeys: resolvedSelectedTopicAreaKeys,
			searchKeyboardIndex: -1,
			showsSelectionControls: isTopicAreaSelectionMode
		});
	}, [baseTopicAreaListItems, isTopicAreaSelectionMode, resolvedSelectedTopicAreaKeys]);

	const baseAllTopicAreaListItem = useMemo(() => {
		return createGlossaryAllTopicAreaListItem({
			entryCount: localizedEntries.length,
			isSelected: isAllTopicAreasSelected,
			labels: {
				allTopicAreas: props.t.glossaryPageAllChaptersHeading,
				chapterSubtitle: props.t.glossaryPageChapterSubtitle
			}
		});
	}, [isAllTopicAreasSelected, localizedEntries.length, props.t.glossaryPageAllChaptersHeading, props.t.glossaryPageChapterSubtitle]);

	const topicAreaReferenceByKey = useMemo(() => {
		return createTopicAreaReferenceByKey(topicAreas, props.t.glossaryPageChapterReference);
	}, [props.t.glossaryPageChapterReference, topicAreas]);

	const selectedTopicAreaEntries = useMemo(() => {
		return collectSelectedTopicAreaEntries({
			topicAreas,
			selectedTopicAreaKeys: resolvedSelectedTopicAreaKeys,
			entriesByTopicAreaKey
		});
	}, [entriesByTopicAreaKey, resolvedSelectedTopicAreaKeys, topicAreas]);

	const visibleGlossaryEntries = useMemo(() => {
		return selectGlossaryEntriesForPresentation(selectedTopicAreaEntries, searchNarrowedGlossaryEntryKey);
	}, [searchNarrowedGlossaryEntryKey, selectedTopicAreaEntries]);

	const glossaryNetwork = useMemo(() => {
		return createGlossaryNetworkPresentation({
			network: isPageContentReady ? glossaryNetworkLoad.data : null,
			language: props.language,
			topicAreaReferenceByKey,
			t: props.t
		});
	}, [glossaryNetworkLoad.data, isPageContentReady, props.language, props.t, topicAreaReferenceByKey]);

	const glossaryNetworkDisplay = useMemo(() => {
		return createGlossaryNetworkDisplay({
			expandedGlossaryEntryKey: activeGlossaryDetailEntryKey,
			loadStatus: glossaryNetworkLoad.status,
			network: glossaryNetwork,
			error: glossaryNetworkLoad.error
		});
	}, [activeGlossaryDetailEntryKey, glossaryNetwork, glossaryNetworkLoad.error, glossaryNetworkLoad.status]);

	const baseGlossaryTableRows = useMemo(() => {
		const rows = createGlossaryTableRows({
			localizedEntries: visibleGlossaryEntries,
			topicAreaReferenceByKey,
			t: props.t
		});

		return sortGlossaryTableRows({
			rows,
			sortKey: glossaryTableSort.key,
			sortDirection: glossaryTableSort.direction,
			language: props.language
		});
	}, [glossaryTableSort.direction, glossaryTableSort.key, props.language, props.t, topicAreaReferenceByKey, visibleGlossaryEntries]);

	const visibleGlossaryEntryKeys = useMemo(() => {
		return baseGlossaryTableRows.map((row) => row.glossaryEntryKey);
	}, [baseGlossaryTableRows]);

	const glossaryDetailPresentation = useMemo(() => {
		return createGlossaryDetailPresentation({
			activeGlossaryEntryKey: activeGlossaryDetailEntryKey,
			localizedEntryByKey,
			topicAreaByKey,
			topicAreaReferenceByKey,
			networkDisplay: glossaryNetworkDisplay,
			visibleGlossaryEntryKeys,
			trailKeys: glossaryDetailTrailKeys,
			areRelationsExpanded: areGlossaryDetailRelationsExpanded,
			t: props.t
		});
	}, [activeGlossaryDetailEntryKey, areGlossaryDetailRelationsExpanded, glossaryDetailTrailKeys, glossaryNetworkDisplay, localizedEntryByKey, props.t, topicAreaByKey, topicAreaReferenceByKey, visibleGlossaryEntryKeys]);

	const glossaryPanelHeading = useMemo(() => {
		return createGlossaryPanelHeading({
			topicAreaByKey,
			selectedTopicAreaKeys: resolvedSelectedTopicAreaKeys,
			isAllTopicAreasSelected,
			visibleEntryCount: visibleGlossaryEntries.length,
			t: props.t
		});
	}, [isAllTopicAreasSelected, resolvedSelectedTopicAreaKeys, props.t, topicAreaByKey, visibleGlossaryEntries.length]);

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

	const chapterFilterOptions = useMemo(() => {
		const options = [
			{
				id: ALL_TOPIC_AREAS,
				value: ALL_TOPIC_AREAS,
				label: props.t.glossaryPageAllChaptersHeading
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
	}, [props.t.glossaryPageAllChaptersHeading, topicAreas]);
	const selectedChapterFilterValue = resolveSelectedChapterFilterValue({
		selectedTopicAreaKeys: resolvedSelectedTopicAreaKeys,
		topicAreaCount: topicAreas.length
	});
	const chapterFilterLabel = resolveChapterFilterLabel({
		selectedChapterFilterValue,
		selectedTopicAreaCount,
		topicAreaByKey,
		t: props.t
	});
	const searchPopupContent = resolveGlossarySearchPopupContent({
		isFilterOptionsOpen: isSearchFilterOptionsOpen,
		isAutocompleteActive: isSearchAutocompleteActive,
		filterOptionCount: chapterFilterOptions.length,
		suggestionCount: autocompleteSuggestions.length
	});
	const isSearchPopupOpen = searchPopupContent !== SEARCH_POPUP_CONTENT.NONE;

	const pageEmptyStateKind = resolvePageEmptyStateKind({
		pageStatus,
		topicAreas,
		localizedEntries
	});
	const pageEmptyState = createGlossaryEmptyState({
		emptyStateKind: pageEmptyStateKind,
		t: props.t
	});
	const pageEmptyTitle = pageEmptyState === null ? "" : pageEmptyState.title;
	const pageEmptyBody = pageEmptyState === null ? "" : pageEmptyState.body;
	const workspaceState = createWorkspaceState({
		loadStatus: pageStatus,
		isEmpty: pageEmptyState !== null,
		labels: {
			loading: props.t.glossaryPageLoadingTitle,
			errorTitle: props.t.glossaryPageErrorTitle,
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
		t: props.t
	});

	const activeContentType = LEARNING_CONTENT_TYPES.GLOSSARY;

	const contentToggleEntries = useMemo(() => createContentToggleEntries(props.t), [props.t]);
	const mobileToggleButtonItems = useMemo(() => createMobileToggleButtonItems({
		contentToggleEntries,
		activeContentType,
		selectedTestType: null,
		t: props.t
	}), [activeContentType, contentToggleEntries, props.t]);

	const changeGlossarySearchTerm = useCallback((nextSearchTerm) => {
		const shouldOpenAutocomplete = normalizeSearchTerm(nextSearchTerm).length >= GLOSSARY_AUTOCOMPLETE_MIN_LENGTH;

		setGlossarySearchTerm(nextSearchTerm);
		setSearchNarrowedGlossaryEntryKey(null);
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
		setSearchNarrowedGlossaryEntryKey(null);
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
		}

		else if (topicAreaByKey.has(nextTopicAreaKey)) {
			setSelectedTopicAreaKeys(new Set([nextTopicAreaKey]));
		}

		else {
			return;
		}

		setSearchNarrowedGlossaryEntryKey(null);

		const shouldOpenAutocomplete = normalizedSearchTerm.length >= GLOSSARY_AUTOCOMPLETE_MIN_LENGTH;
		let nextKeyboardIndex = -1;

		if (shouldOpenAutocomplete) {
			nextKeyboardIndex = 0;
		}

		setSearchKeyboardIndex(nextKeyboardIndex);
		setIsSearchFilterOptionsOpen(false);
		setIsSearchAutocompleteOpen(shouldOpenAutocomplete);
	}, [normalizedSearchTerm.length, topicAreaByKey, topicAreas]);

	const selectTopicArea = useCallback((topicAreaKey) => {
		setSearchNarrowedGlossaryEntryKey(null);

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
				initialTopicAreaKey: props.initialTopicAreaKey
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
	}, [props.initialTopicAreaKey, isSearchAutocompleteActive, topicAreaByKey, topicAreas]);

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
		setSearchNarrowedGlossaryEntryKey(suggestion.id);
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

	const changeGlossaryTableSort = useCallback((sortKey) => {
		const initialDirection = getInitialGlossaryTableSortDirection(sortKey);

		setGlossaryTableSort((currentSort) => {
			if (currentSort.key !== sortKey) {
				return {
					key: sortKey,
					direction: initialDirection
				};
			}

			let direction;

			if (currentSort.direction === GLOSSARY_TABLE_SORT_DIRECTIONS.ASCENDING) {
				direction = GLOSSARY_TABLE_SORT_DIRECTIONS.DESCENDING;
			}

			else {
				direction = GLOSSARY_TABLE_SORT_DIRECTIONS.ASCENDING;
			}

			return {
				key: sortKey,
				direction
			};
		});
	}, []);


	const openGlossaryDetailFromTable = useCallback((glossaryEntryKey) => {
		if (!localizedEntryByKey.has(glossaryEntryKey)) {
			throw new Error(`Cannot open unknown glossary entry: ${glossaryEntryKey}`);
		}

		glossaryDetailOriginEntryKeyRef.current = glossaryEntryKey;
		setAreGlossaryDetailRelationsExpanded(false);
		glossaryDetailTitleFocusRequestKeyRef.current = null;
		setGlossaryDetailTrailKeys([]);
		setExpandedGlossaryEntryKey(glossaryEntryKey);
	}, [localizedEntryByKey]);

	const closeGlossaryDetail = useCallback(() => {
		setAreGlossaryDetailRelationsExpanded(false);
		setGlossaryDetailTrailKeys([]);
		glossaryDetailTitleFocusRequestKeyRef.current = null;
		setExpandedGlossaryEntryKey(null);
	}, []);

	const handleGlossaryDetailOpenChange = useCallback((nextIsOpen) => {
		if (nextIsOpen) {
			return;
		}

		closeGlossaryDetail();
	}, [closeGlossaryDetail]);

	const completeGlossaryDetailOpenChange = useCallback((isOpen) => {
		if (isOpen) {
			return;
		}

		glossaryDetailOriginEntryKeyRef.current = null;
		glossaryDetailTitleFocusRequestKeyRef.current = null;
		setGlossaryDetailRenderSnapshot(null);
	}, []);

	const resolveGlossaryDetailFinalFocus = useCallback(() => {
		const originGlossaryEntryKey = glossaryDetailOriginEntryKeyRef.current;

		if (originGlossaryEntryKey === null) {
			return false;
		}

		const triggerElement = glossaryDetailTriggerElementByKey.current.get(originGlossaryEntryKey);

		if (triggerElement === undefined) {
			return false;
		}

		return triggerElement;
	}, []);

	const exploreGlossaryDetailConcept = useCallback((targetGlossaryEntryKey) => {
		if (!localizedEntryByKey.has(targetGlossaryEntryKey)) {
			throw new Error(`Cannot navigate to unknown glossary entry: ${targetGlossaryEntryKey}`);
		}

		if (expandedGlossaryEntryKey === null) {
			throw new Error("Cannot explore glossary detail without an active detail entry.");
		}

		if (expandedGlossaryEntryKey === targetGlossaryEntryKey) {
			return;
		}

		setAreGlossaryDetailRelationsExpanded(false);
		setGlossaryDetailTrailKeys((currentTrailKeys) => [
			...currentTrailKeys,
			expandedGlossaryEntryKey
		]);
		glossaryDetailTitleFocusRequestKeyRef.current = targetGlossaryEntryKey;
		setExpandedGlossaryEntryKey(targetGlossaryEntryKey);
	}, [expandedGlossaryEntryKey, localizedEntryByKey]);

	const navigateBackGlossaryDetailTrail = useCallback(() => {
		if (glossaryDetailTrailKeys.length === 0) {
			return;
		}

		const targetGlossaryEntryKey = glossaryDetailTrailKeys[glossaryDetailTrailKeys.length - 1];
		setAreGlossaryDetailRelationsExpanded(false);
		glossaryDetailTitleFocusRequestKeyRef.current = targetGlossaryEntryKey;
		setGlossaryDetailTrailKeys((currentTrailKeys) => currentTrailKeys.slice(0, -1));
		setExpandedGlossaryEntryKey(targetGlossaryEntryKey);
	}, [glossaryDetailTrailKeys]);

	const openPreviousGlossaryDetail = useCallback(() => {
		const currentIndex = visibleGlossaryEntryKeys.indexOf(expandedGlossaryEntryKey);

		if (currentIndex <= 0) {
			return;
		}

		const targetGlossaryEntryKey = visibleGlossaryEntryKeys[currentIndex - 1];
		setAreGlossaryDetailRelationsExpanded(false);
		setGlossaryDetailTrailKeys([]);
		glossaryDetailTitleFocusRequestKeyRef.current = targetGlossaryEntryKey;
		setExpandedGlossaryEntryKey(targetGlossaryEntryKey);
	}, [expandedGlossaryEntryKey, visibleGlossaryEntryKeys]);

	const openNextGlossaryDetail = useCallback(() => {
		const currentIndex = visibleGlossaryEntryKeys.indexOf(expandedGlossaryEntryKey);

		if (currentIndex === -1 || currentIndex >= visibleGlossaryEntryKeys.length - 1) {
			return;
		}

		const targetGlossaryEntryKey = visibleGlossaryEntryKeys[currentIndex + 1];
		setAreGlossaryDetailRelationsExpanded(false);
		setGlossaryDetailTrailKeys([]);
		glossaryDetailTitleFocusRequestKeyRef.current = targetGlossaryEntryKey;
		setExpandedGlossaryEntryKey(targetGlossaryEntryKey);
	}, [expandedGlossaryEntryKey, visibleGlossaryEntryKeys]);

	const toggleGlossaryDetailRelations = useCallback(() => {
		setAreGlossaryDetailRelationsExpanded((isExpanded) => !isExpanded);
	}, []);

	const search = useMemo(() => ({
		term: glossarySearchTerm,
		placeholder: props.t.glossaryPageSearchPlaceholder,
		label: props.t.glossaryPageSearchLabel,
		closeLabel: props.t.searchCloseLabel,
		clearLabel: props.t.glossaryPageSearchClearLabel,
		keyboardHint: props.t.glossaryPageSearchKeyboardHint,
		suggestionListAriaLabel: props.t.glossaryPageAutocompleteAriaLabel,
		filterAriaLabel: props.t.glossaryPageChapterFilterAriaLabel,
		filterLabel: chapterFilterLabel,
		filterValue: selectedChapterFilterValue,
		filterOptions: chapterFilterOptions,
		suggestions: autocompleteSuggestions,
		listId: GLOSSARY_AUTOCOMPLETE_LIST_ID,
		activeDescendantId: searchActiveDescendantId,
		isPopupOpen: isSearchPopupOpen,
		hasPopupContent: searchPopupContent !== SEARCH_POPUP_CONTENT.NONE,
		isFilterOptionsMode: isSearchFilterOptionsOpen,
		isAutocompleteActive: isSearchAutocompleteActive,
		isSearching,
		popupContent: searchPopupContent,
		onChangeTerm: changeGlossarySearchTerm,
		onFocus: focusGlossarySearch,
		onClear: clearGlossarySearch,
		onRequestClose: closeGlossarySearchPopup,
		onOpenFilterOptions: openGlossarySearchFilterOptions,
		onSelectFilterOption: selectGlossaryChapterFilter,
		onSelectSuggestion: selectAutocompleteSuggestion,
		onMoveDown: moveSearchSelectionDown,
		onMoveUp: moveSearchSelectionUp,
		onSelectActive: openSearchKeyboardSelection
	}), [autocompleteSuggestions, changeGlossarySearchTerm, chapterFilterLabel, chapterFilterOptions, clearGlossarySearch, closeGlossarySearchPopup, focusGlossarySearch, isSearchAutocompleteActive, isSearchFilterOptionsOpen, isSearchPopupOpen, isSearching, moveSearchSelectionDown, moveSearchSelectionUp, openGlossarySearchFilterOptions, openSearchKeyboardSelection, searchActiveDescendantId, searchPopupContent, selectAutocompleteSuggestion, selectGlossaryChapterFilter, selectedChapterFilterValue, props.t]);

	const selectContentType = useCallback((contentTypeId) => {
		if (contentTypeId === LEARNING_CONTENT_TYPES.GLOSSARY) {
			return;
		}

		props.onSelectContentType(contentTypeId);
	}, [props.onSelectContentType]);

	const allTopicAreaListItem = useMemo(() => {
		return bindTopicAreaInteraction(baseAllTopicAreaListItem, selectTopicArea);
	}, [baseAllTopicAreaListItem, selectTopicArea]);

	const topicAreaListItems = useMemo(() => {
		return baseTopicAreaListItemsWithInteractionState.map((item) => bindTopicAreaInteraction(item, selectTopicArea));
	}, [baseTopicAreaListItemsWithInteractionState, selectTopicArea]);

	const glossaryTableHeaders = useMemo(() => {
		return createGlossaryTableHeaderPresentations({
			tableSort: glossaryTableSort,
			t: props.t,
			onSort: changeGlossaryTableSort
		});
	}, [changeGlossaryTableSort, glossaryTableSort, props.t]);

	const glossaryTableRows = useMemo(() => {
		return bindGlossaryTableInteractions({
			rows: baseGlossaryTableRows,
			onOpenDetail: openGlossaryDetailFromTable,
			resolveDetailTriggerRef: resolveGlossaryDetailTriggerRef
		});
	}, [baseGlossaryTableRows, openGlossaryDetailFromTable, resolveGlossaryDetailTriggerRef]);

	const interactiveGlossaryDetailPresentation = useMemo(() => {
		return bindGlossaryDetailInteractions({
			presentation: glossaryDetailPresentation,
			onExploreConcept: exploreGlossaryDetailConcept,
			onToggleRelations: toggleGlossaryDetailRelations,
			onNavigateTrailBack: navigateBackGlossaryDetailTrail,
			onNavigatePrevious: openPreviousGlossaryDetail,
			onNavigateNext: openNextGlossaryDetail,
			titleRef: glossaryDetailTitleElementRef
		});
	}, [exploreGlossaryDetailConcept, glossaryDetailPresentation, navigateBackGlossaryDetailTrail, openNextGlossaryDetail, openPreviousGlossaryDetail, toggleGlossaryDetailRelations]);


	const isGlossaryDetailModalOpen = activeGlossaryDetailEntryKey !== null;

	useEffect(() => {
		if (!isGlossaryDetailModalOpen || interactiveGlossaryDetailPresentation === null) {
			return;
		}

		setGlossaryDetailRenderSnapshot(interactiveGlossaryDetailPresentation);
	}, [interactiveGlossaryDetailPresentation, isGlossaryDetailModalOpen]);

	const glossaryDetailModalContent = useMemo(() => {
		if (isGlossaryDetailModalOpen) {
			return interactiveGlossaryDetailPresentation;
		}

		return createGlossaryDetailClosingSnapshot(glossaryDetailRenderSnapshot);
	}, [interactiveGlossaryDetailPresentation, glossaryDetailRenderSnapshot, isGlossaryDetailModalOpen]);

	const glossaryDetailModal = useMemo(() => ({
		isOpen: isGlossaryDetailModalOpen,
		content: glossaryDetailModalContent,
		initialFocus: glossaryDetailTitleElementRef,
		finalFocus: resolveGlossaryDetailFinalFocus,
		onOpenChange: handleGlossaryDetailOpenChange,
		onOpenChangeComplete: completeGlossaryDetailOpenChange
	}), [completeGlossaryDetailOpenChange, glossaryDetailModalContent, handleGlossaryDetailOpenChange, isGlossaryDetailModalOpen, resolveGlossaryDetailFinalFocus]);


	return {
		pageTitle: props.t.glossaryPageTitle,
		pageSubtitle: createGlossaryPageSubtitle(props.t, props.selectedSubject),
		termColumnHeader: props.t.glossaryPageTermColumnHeader,
		explanationColumnHeader: props.t.glossaryPageExplanationColumnHeader,
		directNeighborColumnHeader: props.t.glossaryPageConnectionsColumnHeader,
		tableSortAscendingLabel: props.t.glossaryPageTableSortAscendingLabel,
		tableSortDescendingLabel: props.t.glossaryPageTableSortDescendingLabel,
		contentToggleAriaLabel: props.t.contentToggleAriaLabel,
		contentToggleBackLabel: props.t.contentToggleBackLabel,

		workspaceState,
		shouldShowWorkspaceFooter,
		glossaryPanelEmptyState,

		search,
		allTopicAreaListItem,
		topicAreaListItems,
		glossaryPanelHeading,
		glossaryTableRows,
		glossaryTableHeaders,
		expandedGlossaryEntryKey,
		glossaryDetailTrailKeys,
		glossaryDetailPresentation,
		glossaryDetailModal,
		isGlossaryDetailModalOpen,
		contentToggleEntries,
		mobileToggleButtonItems,
		mobileActiveEntryId: activeContentType,
		pageTools: null,
		activeContentType,

		backContract: props.backContract,

		selectTopicArea,
		changeGlossaryTableSort,
		openGlossaryDetailFromTable,
		closeGlossaryDetail,
		exploreGlossaryDetailConcept,
		navigateBackGlossaryDetailTrail,
		openPreviousGlossaryDetail,
		openNextGlossaryDetail,
		selectContentType
	};
}

// src/ui/viewmodel/GlossaryPageViewModel.js
import { useCallback, useEffect, useMemo, useState } from "react";
import { APP_SHELL_MODE } from "../presentation/appShellMode.js";
import useAppShellMode from "../presentation/useAppShellMode.js";
import { PRESENTATION_MODE } from "../presentation/presentationMode.js";
import usePresentationMode from "../presentation/usePresentationMode.js";
import { LEARNING_CONTENT_TYPES } from "../../navigation/navigation.js";
import { resolveLocalizedText } from "./GlossaryPage/resolveLocalizedText.js";
import { ALL_TOPIC_AREAS } from "../../constants/TopicAreas.js";
import { LOAD_STATUS } from "./LoadState/loadStatus.js";
import useLoadModel from "./LoadState/useLoadModel.js";
import combineLoadStatuses from "./LoadState/combineLoadStatuses.js";
import resolveFirstLoadError from "./Utils/resolveFirstLoadError.js";
import { createWorkspaceState } from "./WorkspaceState/createWorkspaceState.js";
import { createContentToggleEntries, createMobileToggleButtonItems } from "./Shared/contentToggleModel.js";
import { WORKSPACE_STATE_KINDS } from "./WorkspaceState/workspaceStateKinds.js";
import { GLOSSARY_AUTOCOMPLETE_LIST_ID, GLOSSARY_AUTOCOMPLETE_MIN_LENGTH, SEARCH_POPUP_CONTENT, createGlossaryAutocompleteSuggestions, resolveGlossarySearchPopupContent } from "./GlossaryPage/glossarySearchModel.js";
import normalizeSearchTerm from "./Utils/normalizeSearchTerm.js";
import { applyGlossaryTopicAreaInteractionState, createGlossaryAllTopicAreaListItem, createGlossaryTopicAreaListItems } from "./GlossaryPage/glossaryTopicAreaListModel.js";
import { GLOSSARY_TABLE_SORT_DIRECTIONS, GLOSSARY_TABLE_SORT_KEYS, createGlossaryTableRows, sortGlossaryTableRows } from "./GlossaryPage/glossaryTableModel.js";
import { GLOSSARY_NETWORK_DISPLAY_KIND, createGlossaryNetworkDisplay, createGlossaryNetworkPresentation } from "./GlossaryPage/glossaryNetworkModel.js";
import { assertGlossaryEntriesReferenceKnownTopicAreas } from "./GlossaryPage/glossaryDataContract.js";
import { createGlossaryDetailPresentation } from "./GlossaryPage/glossaryDetailModel.js";
import useGlossarySearchModel from "./GlossaryPage/useGlossarySearchModel.js";
import useGlossaryTopicAreaSelectionModel from "./GlossaryPage/useGlossaryTopicAreaSelectionModel.js";
import useGlossaryDetailModel, { useGlossaryDetailPresentationModeSync } from "./GlossaryPage/useGlossaryDetailModel.js";

export default function useGlossaryPageViewModel({
	getGlossaryOverviewUseCase,
	getGlossaryNetworkUseCase,
	getTopicAreasUseCase,
	subjectId,
	selectedSubject,
	initialTopicAreaKey,
	language,
	t,
	isActive,
	backContract,
	onSelectContentType,
	expandedMobileToggleButtonGroupId,
	openMobileToggleButtonGroup,
	closeMobileToggleButtonGroup
}) {
	const appShellMode = useAppShellMode();
	const presentationMode = usePresentationMode();
	const resetKey = `${subjectId}:${initialTopicAreaKey}`;
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
	} = useGlossarySearchModel({ resetKey });
	const { selectedTopicAreaKeys, setSelectedTopicAreaKeys } = useGlossaryTopicAreaSelectionModel({ resetKey });
	const {
		expandedGlossaryEntryKey,
		setExpandedGlossaryEntryKey,
		glossaryDetailTrailKeys,
		setGlossaryDetailTrailKeys,
		glossaryDetailRenderSnapshot,
		setGlossaryDetailRenderSnapshot,
		glossaryDetailOriginEntryKeyRef,
		glossaryDetailTitleFocusRequestKeyRef,
		previousPresentationModeRef,
		glossaryDetailTitleElementRef,
		glossaryDetailTriggerElementByKey,
		resolveGlossaryRowRef,
		resolveGlossaryDisclosureRef,
		resolveGlossaryDetailTriggerRef
	} = useGlossaryDetailModel({ presentationMode, resetKey });
	const [glossaryTableSort, setGlossaryTableSort] = useState({
		key: GLOSSARY_TABLE_SORT_KEYS.DIRECT_NEIGHBOR_COUNT,
		direction: GLOSSARY_TABLE_SORT_DIRECTIONS.DESCENDING
	});
	const [isMobileChapterSheetOpen, setIsMobileChapterSheetOpen] = useState(false);

	useEffect(() => {
		if (appShellMode === APP_SHELL_MODE.FULL) {
			setIsMobileChapterSheetOpen(false);
		}
	}, [appShellMode]);

	useEffect(() => {
		setGlossaryTableSort({
			key: GLOSSARY_TABLE_SORT_KEYS.DIRECT_NEIGHBOR_COUNT,
			direction: GLOSSARY_TABLE_SORT_DIRECTIONS.DESCENDING
		});
		setIsMobileChapterSheetOpen(false);
	}, [resetKey]);

	const executeGlossaryOverviewLoad = useCallback(() => {
		if (!isActive || !subjectId) {
			return Promise.resolve([]);
		}

		return getGlossaryOverviewUseCase.execute({ subjectId });
	}, [getGlossaryOverviewUseCase, isActive, subjectId]);

	const executeTopicAreaLoad = useCallback(() => {
		if (!isActive || !subjectId) {
			return Promise.resolve([]);
		}

		return getTopicAreasUseCase.execute({
			subjectId,
			language
		});
	}, [getTopicAreasUseCase, isActive, language, subjectId]);

	const executeGlossaryNetworkLoad = useCallback(() => {
		if (!isActive || !subjectId || !expandedGlossaryEntryKey) {
			return Promise.resolve(null);
		}

		return getGlossaryNetworkUseCase.execute({
			subjectId,
			glossaryEntryKey: expandedGlossaryEntryKey
		});
	}, [getGlossaryNetworkUseCase, isActive, expandedGlossaryEntryKey, subjectId]);

	const glossaryResourceKey = subjectId;
	const topicAreaResourceKey = subjectId === null ? "no-subject" : `${subjectId}:${language}`;
	const isLoadEnabled = isActive && subjectId !== null;

	const glossaryOverviewLoad = useLoadModel({
		execute: executeGlossaryOverviewLoad,
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

	const glossaryNetworkLoad = useLoadModel({
		execute: executeGlossaryNetworkLoad,
		emptyData: null,
		errorMessage: t.glossaryPageNetworkErrorMessage,
		resourceKey: `${subjectId ?? "no-subject"}:${expandedGlossaryEntryKey ?? "no-concept"}`,
		isEnabled: isLoadEnabled && expandedGlossaryEntryKey !== null,
		onLoaded: null
	});

	const glossaryEntries = glossaryOverviewLoad.data;
	const topicAreas = topicAreaLoad.data;
	const pageStatus = combineLoadStatuses([
		glossaryOverviewLoad.status,
		topicAreaLoad.status
	]);
	const pageErrorMessage = resolveFirstLoadError([
		glossaryOverviewLoad,
		topicAreaLoad
	], t.glossaryPageErrorMessage);

	const localizedEntries = useMemo(() => {
		const entries = localizeGlossaryEntries(glossaryEntries, language);

		if (pageStatus === LOAD_STATUS.READY) {
			assertGlossaryEntriesReferenceKnownTopicAreas({ localizedEntries: entries, topicAreas });
		}

		return entries;
	}, [glossaryEntries, language, pageStatus, topicAreas]);

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
		return selectGlossaryEntriesForPresentation(selectedTopicAreaEntries, searchNarrowedGlossaryEntryKey);
	}, [searchNarrowedGlossaryEntryKey, selectedTopicAreaEntries]);

	const glossaryNetwork = useMemo(() => {
		return createGlossaryNetworkPresentation({
			network: glossaryNetworkLoad.data,
			language,
			topicAreaReferenceByKey,
			t
		});
	}, [glossaryNetworkLoad.data, language, t, topicAreaReferenceByKey]);

	const glossaryNetworkDisplay = useMemo(() => {
		return createGlossaryNetworkDisplay({
			expandedGlossaryEntryKey,
			loadStatus: glossaryNetworkLoad.status,
			network: glossaryNetwork,
			error: glossaryNetworkLoad.error
		});
	}, [expandedGlossaryEntryKey, glossaryNetwork, glossaryNetworkLoad.error, glossaryNetworkLoad.status]);

	const baseGlossaryTableRows = useMemo(() => {
		const rows = createGlossaryTableRows({
			localizedEntries: visibleGlossaryEntries,
			topicAreaReferenceByKey,
			expandedGlossaryEntryKey,
			t
		});

		return sortGlossaryTableRows({
			rows,
			sortKey: glossaryTableSort.key,
			sortDirection: glossaryTableSort.direction,
			language
		});
	}, [expandedGlossaryEntryKey, glossaryTableSort.direction, glossaryTableSort.key, language, t, topicAreaReferenceByKey, visibleGlossaryEntries]);

	const visibleGlossaryEntryKeys = useMemo(() => {
		return baseGlossaryTableRows.map((row) => row.glossaryEntryKey);
	}, [baseGlossaryTableRows]);

	useGlossaryDetailPresentationModeSync({
		expandedGlossaryEntryKey,
		glossaryDetailOriginEntryKeyRef,
		glossaryDetailTitleFocusRequestKeyRef,
		previousPresentationModeRef,
		presentationMode,
		setExpandedGlossaryEntryKey,
		setGlossaryDetailTrailKeys,
		visibleGlossaryEntryKeys
	});

	const glossaryDetailPresentation = useMemo(() => {
		return createGlossaryDetailPresentation({
			activeGlossaryEntryKey: expandedGlossaryEntryKey,
			localizedEntryByKey,
			topicAreaByKey,
			topicAreaReferenceByKey,
			networkDisplay: glossaryNetworkDisplay,
			visibleGlossaryEntryKeys,
			trailKeys: glossaryDetailTrailKeys,
			t
		});
	}, [expandedGlossaryEntryKey, glossaryDetailTrailKeys, glossaryNetworkDisplay, localizedEntryByKey, t, topicAreaByKey, topicAreaReferenceByKey, visibleGlossaryEntryKeys]);

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

	const activeContentType = LEARNING_CONTENT_TYPES.GLOSSARY;

	const contentToggleEntries = useMemo(() => createContentToggleEntries(t), [t]);
	const mobileToggleButtonItems = useMemo(() => createMobileToggleButtonItems({
		contentToggleEntries,
		activeContentType,
		selectedTestType: null,
		t
	}), [activeContentType, contentToggleEntries, t]);

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
		} else if (topicAreaByKey.has(nextTopicAreaKey)) {
			setSelectedTopicAreaKeys(new Set([nextTopicAreaKey]));
		} else {
			return;
		}

		setSearchNarrowedGlossaryEntryKey(null);
		const shouldOpenAutocomplete = normalizedSearchTerm.length >= GLOSSARY_AUTOCOMPLETE_MIN_LENGTH;
		setSearchKeyboardIndex(shouldOpenAutocomplete ? 0 : -1);
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
		if (sortKey !== GLOSSARY_TABLE_SORT_KEYS.TERM && sortKey !== GLOSSARY_TABLE_SORT_KEYS.DIRECT_NEIGHBOR_COUNT) {
			throw new Error(`Unknown glossary table sort key: ${String(sortKey)}`);
		}

		setGlossaryTableSort((currentSort) => {
			if (currentSort.key !== sortKey) {
				return {
					key: sortKey,
					direction: GLOSSARY_TABLE_SORT_DIRECTIONS.ASCENDING
				};
			}

			return {
				key: sortKey,
				direction: currentSort.direction === GLOSSARY_TABLE_SORT_DIRECTIONS.ASCENDING
					? GLOSSARY_TABLE_SORT_DIRECTIONS.DESCENDING
					: GLOSSARY_TABLE_SORT_DIRECTIONS.ASCENDING
			};
		});
	}, []);


	const openGlossaryDetailFromTable = useCallback((glossaryEntryKey) => {
		if (!localizedEntryByKey.has(glossaryEntryKey)) {
			throw new Error(`Cannot open unknown glossary entry: ${glossaryEntryKey}`);
		}

		glossaryDetailOriginEntryKeyRef.current = glossaryEntryKey;
		glossaryDetailTitleFocusRequestKeyRef.current = null;
		setGlossaryDetailTrailKeys([]);
		setExpandedGlossaryEntryKey(glossaryEntryKey);
	}, [localizedEntryByKey]);

	const closeGlossaryDetail = useCallback(() => {
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
		if (presentationMode !== PRESENTATION_MODE.DESKTOP) {
			return false;
		}

		const originGlossaryEntryKey = glossaryDetailOriginEntryKeyRef.current;
		if (originGlossaryEntryKey === null) {
			return false;
		}

		return glossaryDetailTriggerElementByKey.current.get(originGlossaryEntryKey) ?? false;
	}, [presentationMode]);

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
		setGlossaryDetailTrailKeys([]);
		glossaryDetailTitleFocusRequestKeyRef.current = targetGlossaryEntryKey;
		setExpandedGlossaryEntryKey(targetGlossaryEntryKey);
	}, [expandedGlossaryEntryKey, visibleGlossaryEntryKeys]);

	const toggleGlossaryNetworkConcept = useCallback((glossaryEntryKey) => {
		setExpandedGlossaryEntryKey((currentGlossaryEntryKey) => (
			currentGlossaryEntryKey === glossaryEntryKey ? null : glossaryEntryKey
		));
	}, []);

	const activateGlossaryTableRow = useCallback((event, glossaryEntryKey) => {
		if (isInteractiveGlossaryRowTarget(event.target)) {
			return;
		}

		openGlossaryDetailFromTable(glossaryEntryKey);
	}, [openGlossaryDetailFromTable]);

	const activateGlossaryDisclosure = useCallback((event, glossaryEntryKey) => {
		event.stopPropagation();
		toggleGlossaryNetworkConcept(glossaryEntryKey);
	}, [toggleGlossaryNetworkConcept]);

	const handleGlossaryDisclosureKeyDown = useCallback((event, glossaryEntryKey) => {
		if (event.key !== "Escape" || expandedGlossaryEntryKey !== glossaryEntryKey) {
			return;
		}

		event.preventDefault();
		event.stopPropagation();
		setExpandedGlossaryEntryKey(null);
	}, [expandedGlossaryEntryKey]);

	const changeMobileChapterSheetOpen = useCallback((nextIsOpen) => {
		setIsMobileChapterSheetOpen(nextIsOpen);
	}, []);

	const selectGlossaryNetworkConcept = useCallback((glossaryEntryKey) => {
		const targetEntry = localizedEntryByKey.get(glossaryEntryKey);
		if (!targetEntry) {
			throw new Error(`Cannot navigate to unknown glossary entry: ${glossaryEntryKey}`);
		}

		setGlossarySearchTerm("");
		setSearchKeyboardIndex(-1);
		setIsSearchFilterOptionsOpen(false);
		setIsSearchAutocompleteOpen(false);
		setSearchNarrowedGlossaryEntryKey(null);
		setSelectedTopicAreaKeys((previousSelectedTopicAreaKeys) => {
			const nextSelectedTopicAreaKeys = resolveSelectedTopicAreaKeys({
				selectedTopicAreaKeys: previousSelectedTopicAreaKeys,
				topicAreas,
				initialTopicAreaKey
			});
			nextSelectedTopicAreaKeys.add(targetEntry.topicAreaKey);
			return nextSelectedTopicAreaKeys;
		});
		setExpandedGlossaryEntryKey(glossaryEntryKey);
	}, [initialTopicAreaKey, localizedEntryByKey, topicAreas]);


	const search = useMemo(() => ({
		term: glossarySearchTerm,
		placeholder: t.glossaryPageSearchPlaceholder,
		label: t.glossaryPageSearchLabel,
		closeLabel: t.searchCloseLabel,
		clearLabel: t.glossaryPageSearchClearLabel,
		keyboardHint: t.glossaryPageSearchKeyboardHint,
		suggestionListAriaLabel: t.glossaryPageAutocompleteAriaLabel,
		filterAriaLabel: t.glossaryPageChapterFilterAriaLabel,
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
	}), [autocompleteSuggestions, changeGlossarySearchTerm, chapterFilterLabel, chapterFilterOptions, clearGlossarySearch, closeGlossarySearchPopup, focusGlossarySearch, isSearchAutocompleteActive, isSearchFilterOptionsOpen, isSearchPopupOpen, isSearching, moveSearchSelectionDown, moveSearchSelectionUp, openGlossarySearchFilterOptions, openSearchKeyboardSelection, searchActiveDescendantId, searchPopupContent, selectAutocompleteSuggestion, selectGlossaryChapterFilter, selectedChapterFilterValue, t]);

	const selectContentType = useCallback((contentTypeId) => {
		if (contentTypeId === LEARNING_CONTENT_TYPES.GLOSSARY) {
			return;
		}

		onSelectContentType(contentTypeId);
	}, [onSelectContentType]);

	const allTopicAreaListItem = useMemo(() => {
		return bindTopicAreaInteraction(baseAllTopicAreaListItem, selectTopicArea);
	}, [baseAllTopicAreaListItem, selectTopicArea]);

	const topicAreaListItems = useMemo(() => {
		return baseTopicAreaListItemsWithInteractionState.map((item) => bindTopicAreaInteraction(item, selectTopicArea));
	}, [baseTopicAreaListItemsWithInteractionState, selectTopicArea]);

	const glossaryTableHeaders = useMemo(() => {
		return createGlossaryTableHeaderPresentations({
			tableSort: glossaryTableSort,
			t,
			onSort: changeGlossaryTableSort
		});
	}, [changeGlossaryTableSort, glossaryTableSort, t]);

	const glossaryTableRows = useMemo(() => {
		return bindGlossaryTableInteractions({
			rows: baseGlossaryTableRows,
			onActivateRow: activateGlossaryTableRow,
			onOpenDetail: openGlossaryDetailFromTable,
			onActivateDisclosure: activateGlossaryDisclosure,
			onDisclosureKeyDown: handleGlossaryDisclosureKeyDown,
			resolveRowRef: resolveGlossaryRowRef,
			resolveDisclosureRef: resolveGlossaryDisclosureRef,
			resolveDetailTriggerRef: resolveGlossaryDetailTriggerRef
		});
	}, [activateGlossaryDisclosure, activateGlossaryTableRow, baseGlossaryTableRows, handleGlossaryDisclosureKeyDown, openGlossaryDetailFromTable, resolveGlossaryDetailTriggerRef, resolveGlossaryDisclosureRef, resolveGlossaryRowRef]);

	const glossaryDesktopDetailPresentation = useMemo(() => {
		return bindGlossaryDetailInteractions({
			presentation: glossaryDetailPresentation,
			onExploreConcept: exploreGlossaryDetailConcept,
			onNavigateTrailBack: navigateBackGlossaryDetailTrail,
			onNavigatePrevious: openPreviousGlossaryDetail,
			onNavigateNext: openNextGlossaryDetail,
			titleRef: glossaryDetailTitleElementRef
		});
	}, [exploreGlossaryDetailConcept, glossaryDetailPresentation, navigateBackGlossaryDetailTrail, openNextGlossaryDetail, openPreviousGlossaryDetail]);

	const glossaryMobileDetailPresentation = useMemo(() => {
		return bindGlossaryMobileDetailPresentation({
			presentation: glossaryDetailPresentation,
			onSelectNetworkConcept: selectGlossaryNetworkConcept,
			networkHeading: t.glossaryPageNetworkInlineTitle,
			networkInstructions: t.glossaryPageNetworkInlineInstructions
		});
	}, [glossaryDetailPresentation, selectGlossaryNetworkConcept, t.glossaryPageNetworkInlineInstructions, t.glossaryPageNetworkInlineTitle]);

	const isGlossaryDetailModalOpen = presentationMode === PRESENTATION_MODE.DESKTOP && expandedGlossaryEntryKey !== null;

	useEffect(() => {
		if (!isGlossaryDetailModalOpen || glossaryDesktopDetailPresentation === null) {
			return;
		}

		setGlossaryDetailRenderSnapshot(glossaryDesktopDetailPresentation);
	}, [glossaryDesktopDetailPresentation, isGlossaryDetailModalOpen]);

	const glossaryDetailModalContent = useMemo(() => {
		if (isGlossaryDetailModalOpen) {
			return glossaryDesktopDetailPresentation;
		}

		return createGlossaryDetailClosingSnapshot(glossaryDetailRenderSnapshot);
	}, [glossaryDesktopDetailPresentation, glossaryDetailRenderSnapshot, isGlossaryDetailModalOpen]);

	const glossaryDetailModal = useMemo(() => ({
		isOpen: isGlossaryDetailModalOpen,
		content: glossaryDetailModalContent,
		initialFocus: glossaryDetailTitleElementRef,
		finalFocus: resolveGlossaryDetailFinalFocus,
		onOpenChange: handleGlossaryDetailOpenChange,
		onOpenChangeComplete: completeGlossaryDetailOpenChange
	}), [completeGlossaryDetailOpenChange, glossaryDetailModalContent, handleGlossaryDetailOpenChange, isGlossaryDetailModalOpen, resolveGlossaryDetailFinalFocus]);


	return {
		pageTitle: t.glossaryPageTitle,
		pageSubtitle: createGlossaryPageSubtitle(t, selectedSubject),
		termColumnHeader: t.glossaryPageTermColumnHeader,
		explanationColumnHeader: t.glossaryPageExplanationColumnHeader,
		directNeighborColumnHeader: t.glossaryPageConnectionsColumnHeader,
		tableSortAscendingLabel: t.glossaryPageTableSortAscendingLabel,
		tableSortDescendingLabel: t.glossaryPageTableSortDescendingLabel,
		mobileChapterSheetTitle: t.glossaryPageMobileChapterSheetTitle,
		mobileChapterSheetSubtitle: t.glossaryPageMobileChapterSheetSubtitle,
		mobileChapterSheetOpenLabel: t.glossaryPageMobileChapterSheetOpenLabel,
		mobileChapterSheetCloseLabel: t.glossaryPageMobileChapterSheetCloseLabel,
		contentToggleAriaLabel: t.contentToggleAriaLabel,
		contentToggleBackLabel: t.contentToggleBackLabel,

		presentationMode,
		usesCompactShell: appShellMode === APP_SHELL_MODE.COMPACT,
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
		glossaryMobileDetailPresentation,
		glossaryDetailModal,
		isGlossaryDetailModalOpen,
		contentToggleEntries,
		mobileToggleButtonItems,
		expandedMobileToggleButtonGroupId,
		isMobileChapterSheetOpen,
		mobileChapterSheetSearchKeyboardHint: isMobileChapterSheetOpen ? t.glossaryPageSearchKeyboardHint : null,
		mobileActiveEntryId: activeContentType,
		openMobileToggleButtonGroup,
		closeMobileToggleButtonGroup,
		pageTools: null,
		activeContentType,

		backContract,

		selectTopicArea,
		changeGlossaryTableSort,
		openGlossaryDetailFromTable,
		closeGlossaryDetail,
		exploreGlossaryDetailConcept,
		navigateBackGlossaryDetailTrail,
		openPreviousGlossaryDetail,
		openNextGlossaryDetail,
		toggleGlossaryNetworkConcept,
		selectGlossaryNetworkConcept,
		changeMobileChapterSheetOpen,
		selectContentType
	};
}

function createGlossaryTableHeaderPresentations({ tableSort, t, onSort }) {
	return [
		createSortableGlossaryTableHeader({
			key: GLOSSARY_TABLE_SORT_KEYS.TERM,
			label: t.glossaryPageTermColumnHeader,
			className: "glossary-table__sortable-header",
			tableSort,
			onSort,
			t
		}),
		{
			key: "EXPLANATION",
			label: t.glossaryPageExplanationColumnHeader,
			className: "",
			isSortable: false
		},
		createSortableGlossaryTableHeader({
			key: GLOSSARY_TABLE_SORT_KEYS.DIRECT_NEIGHBOR_COUNT,
			label: t.glossaryPageConnectionsColumnHeader,
			className: "glossary-table__sortable-header glossary-table__connections-header",
			tableSort,
			onSort,
			t
		})
	];
}

function createSortableGlossaryTableHeader({ key, label, className, tableSort, onSort, t }) {
	const isActive = tableSort.key === key;
	const isAscending = isActive && tableSort.direction === GLOSSARY_TABLE_SORT_DIRECTIONS.ASCENDING;
	const ariaSort = !isActive ? "none" : isAscending ? "ascending" : "descending";
	const sortIconKind = !isActive ? "UNSORTED" : isAscending ? "ASCENDING" : "DESCENDING";
	const actionLabel = isAscending
		? t.glossaryPageTableSortDescendingLabel(label)
		: t.glossaryPageTableSortAscendingLabel(label);

	return {
		key,
		label,
		className,
		isSortable: true,
		ariaSort,
		buttonClassName: isActive
			? "glossary-table__sort-button glossary-table__sort-button--active"
			: "glossary-table__sort-button",
		sortIconKind,
		actionLabel,
		onActivate: () => onSort(key)
	};
}

function bindGlossaryDetailInteractions(params) {
	if (params.presentation === null) {
		return null;
	}

	return {
		...params.presentation,
		isInteractive: true,
		header: {
			...params.presentation.header,
			titleRef: params.titleRef,
			trailBack: params.presentation.header.trailBack === null
				? null
				: {
					...params.presentation.header.trailBack,
					onActivate: params.onNavigateTrailBack
				}
		},
		network: bindGlossaryDetailNetwork(params.presentation.network, params.onExploreConcept),
		associations: {
			...params.presentation.associations,
			items: params.presentation.associations.items.map((item) => ({
				...item,
				onActivate: () => params.onExploreConcept(item.glossaryEntryKey)
			}))
		},
		navigation: {
			...params.presentation.navigation,
			previous: {
				...params.presentation.navigation.previous,
				onActivate: params.onNavigatePrevious
			},
			next: {
				...params.presentation.navigation.next,
				onActivate: params.onNavigateNext
			}
		}
	};
}

function createGlossaryDetailClosingSnapshot(presentation) {
	if (presentation === null) {
		return null;
	}

	return {
		...presentation,
		isInteractive: false
	};
}

function bindGlossaryDetailNetwork(network, onExploreConcept) {
	if (network.display.kind !== GLOSSARY_NETWORK_DISPLAY_KIND.CONTENT) {
		return network;
	}

	return {
		...network,
		display: {
			...network.display,
			model: bindGlossaryNetworkModel(network.display.model, onExploreConcept)
		}
	};
}

function bindGlossaryMobileDetailPresentation(params) {
	if (params.presentation === null) {
		return null;
	}

	return {
		...params.presentation,
		network: bindGlossaryDetailNetwork({
			...params.presentation.network,
			heading: params.networkHeading,
			display: {
				...params.presentation.network.display,
				instructions: params.presentation.network.display.kind === GLOSSARY_NETWORK_DISPLAY_KIND.CONTENT
					? params.networkInstructions
					: null
			}
		}, params.onSelectNetworkConcept)
	};
}

function bindGlossaryNetworkModel(model, onSelectNetworkConcept) {
	return {
		...model,
		nodes: model.nodes.map((node) => ({
			...node,
			onActivate: () => onSelectNetworkConcept(node.glossaryEntryKey)
		}))
	};
}

function bindGlossaryTableInteractions({ rows, onActivateRow, onOpenDetail, onActivateDisclosure, onDisclosureKeyDown, resolveRowRef, resolveDisclosureRef, resolveDetailTriggerRef }) {
	return rows.map((row) => ({
		...row,
		className: "glossary-table-row",
		ref: resolveRowRef(row.glossaryEntryKey),
		onActivate: (event) => onActivateRow(event, row.glossaryEntryKey),
		detailTrigger: {
			label: row.detailTriggerLabel,
			ref: resolveDetailTriggerRef(row.glossaryEntryKey),
			onActivate: () => onOpenDetail(row.glossaryEntryKey)
		},
		mobileClassName: row.isExpanded
			? "glossary-entry-card glossary-entry-card--expanded"
			: "glossary-entry-card",
		mobileDisclosure: {
			className: "glossary-entry-card__direct-neighbor-toggle",
			count: row.directNeighborCount,
			ariaExpanded: row.isExpanded,
			controlsId: row.detailsId,
			label: row.disclosureLabel,
			ref: resolveDisclosureRef(row.glossaryEntryKey),
			onActivate: (event) => onActivateDisclosure(event, row.glossaryEntryKey),
			onKeyDown: (event) => onDisclosureKeyDown(event, row.glossaryEntryKey)
		}
	}));
}

function bindTopicAreaInteraction(item, onSelectTopicArea) {
	return {
		...item,
		onActivate: () => onSelectTopicArea(item.topicAreaKey)
	};
}

function isInteractiveGlossaryRowTarget(target) {
	if (target === null || typeof target.closest !== "function") {
		return false;
	}

	return target.closest("button, a, input, select, textarea, [role=\"button\"]") !== null;
}

function createGlossaryEntryByKey(entries) {
	const entryByKey = new Map();
	for (const entry of entries) {
		entryByKey.set(entry.glossaryEntryKey, entry);
	}
	return entryByKey;
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
		position: glossaryEntry.position,
		directNeighborCount: glossaryEntry.directNeighborCount,
		directNeighborGlossaryKeys: glossaryEntry.directNeighborGlossaryKeys
	}));
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

function selectGlossaryEntriesForPresentation(selectedEntries, searchNarrowedGlossaryEntryKey) {
	if (searchNarrowedGlossaryEntryKey === null) {
		return selectedEntries;
	}

	const selectedEntry = selectedEntries.find((entry) => entry.glossaryEntryKey === searchNarrowedGlossaryEntryKey);

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

// src/ui/viewmodel/GlossaryPageViewModel.js
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
import { GLOSSARY_TABLE_SORT_DIRECTIONS, GLOSSARY_TABLE_SORT_KEYS, createGlossaryTableRows, sortGlossaryTableRows } from "./GlossaryPage/glossaryTableModel.js";
import { GLOSSARY_NETWORK_DISPLAY_KIND, createGlossaryNetworkDisplay, createGlossaryNetworkPresentation } from "./GlossaryPage/glossaryNetworkModel.js";

export default function useGlossaryPageViewModel({
	getGlossaryOverviewUseCase,
	getGlossaryNetworkUseCase,
	getTopicAreasUseCase,
	subjectId,
	selectedSubject,
	initialTopicAreaKey,
	language,
	formatDate,
	t,
	isActive,
	backContract,
	onSelectContentType,
	expandedMobileToggleButtonGroupId,
	openMobileToggleButtonGroup,
	closeMobileToggleButtonGroup
}) {
	const [glossarySearchTerm, setGlossarySearchTerm] = useState("");
	const [selectedTopicAreaKeys, setSelectedTopicAreaKeys] = useState(null);
	const [searchKeyboardIndex, setSearchKeyboardIndex] = useState(-1);
	const [isSearchFilterOptionsOpen, setIsSearchFilterOptionsOpen] = useState(false);
	const [isSearchAutocompleteOpen, setIsSearchAutocompleteOpen] = useState(false);
	const [selectedGlossaryEntryKey, setSelectedGlossaryEntryKey] = useState(null);
	const [expandedGlossaryEntryKey, setExpandedGlossaryEntryKey] = useState(null);
	const [glossaryTableSort, setGlossaryTableSort] = useState({
		key: null,
		direction: GLOSSARY_TABLE_SORT_DIRECTIONS.ASCENDING
	});
	const [isMobileChapterSheetOpen, setIsMobileChapterSheetOpen] = useState(false);
	const glossaryRowElementByKey = useRef(new Map());
	const glossaryDisclosureElementByKey = useRef(new Map());

	useEffect(() => {
		setGlossarySearchTerm("");
		setSelectedTopicAreaKeys(null);
		setSearchKeyboardIndex(-1);
		setIsSearchFilterOptionsOpen(false);
		setIsSearchAutocompleteOpen(false);
		setSelectedGlossaryEntryKey(null);
		setExpandedGlossaryEntryKey(null);
		setGlossaryTableSort({
			key: null,
			direction: GLOSSARY_TABLE_SORT_DIRECTIONS.ASCENDING
		});
		setIsMobileChapterSheetOpen(false);
	}, [initialTopicAreaKey, subjectId]);

	useEffect(() => {
		if (expandedGlossaryEntryKey === null) {
			return;
		}

		const disclosureElement = glossaryDisclosureElementByKey.current.get(expandedGlossaryEntryKey);
		const rowElement = glossaryRowElementByKey.current.get(expandedGlossaryEntryKey);
		disclosureElement?.focus({ preventScroll: true });
		rowElement?.scrollIntoView({ behavior: "smooth", block: "nearest" });
	}, [expandedGlossaryEntryKey]);

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
		return localizeGlossaryEntries(glossaryEntries, language);
	}, [glossaryEntries, language]);

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
		return selectGlossaryEntriesForPresentation(selectedTopicAreaEntries, selectedGlossaryEntryKey);
	}, [selectedGlossaryEntryKey, selectedTopicAreaEntries]);

	const glossaryNetwork = useMemo(() => {
		return createGlossaryNetworkPresentation({
			network: glossaryNetworkLoad.data,
			language,
			topicAreaReferenceByKey,
			formatDate,
			t
		});
	}, [formatDate, glossaryNetworkLoad.data, language, t, topicAreaReferenceByKey]);

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
			localizedEntryByKey,
			topicAreaReferenceByKey,
			expandedGlossaryEntryKey,
			networkDisplay: glossaryNetworkDisplay,
			t
		});

		return sortGlossaryTableRows({
			rows,
			sortKey: glossaryTableSort.key,
			sortDirection: glossaryTableSort.direction,
			language
		});
	}, [expandedGlossaryEntryKey, glossaryNetworkDisplay, glossaryTableSort.direction, glossaryTableSort.key, language, localizedEntryByKey, t, topicAreaReferenceByKey, visibleGlossaryEntries]);

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

	const activeContentType = LEARNING_CONTENT_TYPES.GLOSSARY;

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
			isActive: isMobileToggleButtonItemActive(item, activeContentType),
			entries
		});
	}

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

	const registerGlossaryRowElement = useCallback((glossaryEntryKey, element) => {
		registerElement(glossaryRowElementByKey.current, glossaryEntryKey, element);
	}, []);

	const registerGlossaryDisclosureElement = useCallback((glossaryEntryKey, element) => {
		registerElement(glossaryDisclosureElementByKey.current, glossaryEntryKey, element);
	}, []);

	const toggleGlossaryNetworkConcept = useCallback((glossaryEntryKey) => {
		setExpandedGlossaryEntryKey((currentGlossaryEntryKey) => (
			currentGlossaryEntryKey === glossaryEntryKey ? null : glossaryEntryKey
		));
	}, []);

	const activateGlossaryTableRow = useCallback((glossaryEntryKey) => {
		toggleGlossaryNetworkConcept(glossaryEntryKey);
	}, [toggleGlossaryNetworkConcept]);

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
		setSelectedGlossaryEntryKey(null);
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
			onActivateDisclosure: activateGlossaryDisclosure,
			onDisclosureKeyDown: handleGlossaryDisclosureKeyDown,
			onRegisterRow: registerGlossaryRowElement,
			onRegisterDisclosure: registerGlossaryDisclosureElement,
			onSelectNetworkConcept: selectGlossaryNetworkConcept
		});
	}, [activateGlossaryDisclosure, activateGlossaryTableRow, baseGlossaryTableRows, handleGlossaryDisclosureKeyDown, registerGlossaryDisclosureElement, registerGlossaryRowElement, selectGlossaryNetworkConcept]);


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
		importanceColumnHeader: t.glossaryPageImportanceColumnHeader,
		tableSortAscendingLabel: t.glossaryPageTableSortAscendingLabel,
		tableSortDescendingLabel: t.glossaryPageTableSortDescendingLabel,
		mobileChapterSheetTitle: t.glossaryPageMobileChapterSheetTitle,
		mobileChapterSheetSubtitle: t.glossaryPageMobileChapterSheetSubtitle,
		mobileChapterSheetOpenLabel: t.glossaryPageMobileChapterSheetOpenLabel,
		mobileChapterSheetCloseLabel: t.glossaryPageMobileChapterSheetCloseLabel,
		contentToggleAriaLabel: t.contentToggleAriaLabel,
		contentToggleBackLabel: t.contentToggleBackLabel,

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
		glossaryTableHeaders,
		expandedGlossaryEntryKey,
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
		changeGlossaryTableSort,
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
			label: t.glossaryPageImportanceColumnHeader,
			className: "glossary-table__sortable-header glossary-table__importance-header",
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

function bindGlossaryTableInteractions({ rows, onActivateRow, onActivateDisclosure, onDisclosureKeyDown, onRegisterRow, onRegisterDisclosure, onSelectNetworkConcept }) {
	return rows.map((row) => ({
		...row,
		className: row.isExpanded
			? "glossary-table-row glossary-table-row--expanded"
			: "glossary-table-row",
		ref: (element) => onRegisterRow(row.glossaryEntryKey, element),
		onActivate: () => onActivateRow(row.glossaryEntryKey),
		disclosure: {
			className: "glossary-table__importance-toggle",
			count: row.directNeighborCount,
			ariaExpanded: row.isExpanded,
			controlsId: row.detailsId,
			label: row.disclosureLabel,
			ref: (element) => onRegisterDisclosure(row.glossaryEntryKey, element),
			onActivate: (event) => onActivateDisclosure(event, row.glossaryEntryKey),
			onKeyDown: (event) => onDisclosureKeyDown(event, row.glossaryEntryKey)
		},
		mobileClassName: row.isExpanded
			? "glossary-entry-card glossary-entry-card--expanded"
			: "glossary-entry-card",
		mobileDisclosure: {
			className: "glossary-entry-card__importance-toggle",
			count: row.directNeighborCount,
			ariaExpanded: row.isExpanded,
			controlsId: row.detailsId,
			label: row.disclosureLabel,
			ref: (element) => onRegisterDisclosure(row.glossaryEntryKey, element),
			onActivate: (event) => onActivateDisclosure(event, row.glossaryEntryKey),
			onKeyDown: (event) => onDisclosureKeyDown(event, row.glossaryEntryKey)
		},
		details: row.details === null
			? null
			: {
				...row.details,
				network: bindInlineGlossaryNetwork(row.details.network, onSelectNetworkConcept)
			}
	}));
}

function bindInlineGlossaryNetwork(network, onSelectNetworkConcept) {
	if (network.kind !== GLOSSARY_NETWORK_DISPLAY_KIND.CONTENT) {
		return network;
	}

	return {
		...network,
		model: bindGlossaryNetworkModel(network.model, onSelectNetworkConcept)
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

function bindTopicAreaInteraction(item, onSelectTopicArea) {
	return {
		...item,
		onActivate: () => onSelectTopicArea(item.topicAreaKey)
	};
}

function registerElement(elementByKey, glossaryEntryKey, element) {
	if (element === null) {
		elementByKey.delete(glossaryEntryKey);
		return;
	}

	elementByKey.set(glossaryEntryKey, element);
}

function createGlossaryEntryByKey(entries) {
	const entryByKey = new Map();
	for (const entry of entries) {
		entryByKey.set(entry.glossaryEntryKey, entry);
	}
	return entryByKey;
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

function isMobileToggleButtonItemActive(item, activeContentType) {
	if (item.contentTypeId !== null) {
		return item.contentTypeId === activeContentType;
	}

	for (const entryId of item.entryIds) {
		if (entryId === activeContentType) {
			return true;
		}
	}

	return false;
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

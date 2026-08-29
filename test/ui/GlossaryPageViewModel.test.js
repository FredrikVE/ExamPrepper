//test/ui/GlossaryPageViewModel.test.js
import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import { ALL_TOPIC_AREAS } from "../../src/constants/TopicAreas.js";
import { LEARNING_CONTENT_TYPES, TEST_TYPES } from "../../src/navigation/navigation.js";
import { APP_SHELL_MODE } from "../../src/ui/presentation/appShellMode.js";
import { PRESENTATION_MODE } from "../../src/ui/presentation/presentationMode.js";
import { GLOSSARY_AUTOCOMPLETE_LIST_ID, createGlossaryAutocompleteOptionId } from "../../src/ui/viewmodel/GlossaryPage/glossarySearchModel.js";
import { LOAD_STATUS } from "../../src/ui/viewmodel/LoadState/loadStatus.js";
import { WORKSPACE_STATE_KINDS } from "../../src/ui/viewmodel/WorkspaceState/workspaceStateKinds.js";

const setGlossarySearchTerm = jest.fn();
const setSelectedTopicAreaKeys = jest.fn();
const setSearchKeyboardIndex = jest.fn();
const setIsSearchFilterOptionsOpen = jest.fn();
const setIsSearchAutocompleteOpen = jest.fn();
const setSearchNarrowedGlossaryEntryKey = jest.fn();
const setExpandedGlossaryEntryKey = jest.fn();
const setGlossaryTableSort = jest.fn();
const setIsMobileChapterSheetOpen = jest.fn();
const setGlossaryDetailTrailKeys = jest.fn();
const setGlossaryDetailRenderSnapshot = jest.fn();
const setAreGlossaryDetailRelationsExpanded = jest.fn();
const stateSetters = [
	setGlossarySearchTerm,
	setSelectedTopicAreaKeys,
	setSearchKeyboardIndex,
	setIsSearchFilterOptionsOpen,
	setIsSearchAutocompleteOpen,
	setSearchNarrowedGlossaryEntryKey,
	setExpandedGlossaryEntryKey,
	setGlossaryTableSort,
	setIsMobileChapterSheetOpen,
	setGlossaryDetailTrailKeys,
	setGlossaryDetailRenderSnapshot,
	setAreGlossaryDetailRelationsExpanded
];
let loadModelQueue = [];
let currentTableSort = { key: "DIRECT_NEIGHBOR_COUNT", direction: "DESCENDING" };
let currentMobileChapterSheetOpen = false;
let currentDetailRefs = null;

const useState = jest.fn((initialValue) => {
	if (typeof initialValue === "object" && initialValue !== null && "key" in initialValue) {
		return [currentTableSort, setGlossaryTableSort];
	}

	if (initialValue === false) {
		return [currentMobileChapterSheetOpen, setIsMobileChapterSheetOpen];
	}

	throw new Error(`Unexpected page ViewModel useState initial value: ${String(initialValue)}`);
});
const useEffect = jest.fn((effect) => effect());
const useMemo = jest.fn((factory) => factory());
const useCallback = jest.fn((callback) => callback);
const useLoadModel = jest.fn(() => loadModelQueue.shift());
const useAppShellMode = jest.fn(() => APP_SHELL_MODE.FULL);
const usePresentationMode = jest.fn(() => PRESENTATION_MODE.DESKTOP);
const useGlossarySearchModel = jest.fn();
const useGlossaryTopicAreaSelectionModel = jest.fn();
const useGlossaryDetailModel = jest.fn();
const useGlossaryDetailPresentationModeSync = jest.fn();

function resolveMobileGlossaryDetailEntryKey(params) {
	if (params.activeGlossaryEntryKey !== null && params.visibleGlossaryEntryKeys.includes(params.activeGlossaryEntryKey)) {
		return params.activeGlossaryEntryKey;
	}

	if (params.originGlossaryEntryKey !== null && params.visibleGlossaryEntryKeys.includes(params.originGlossaryEntryKey)) {
		return params.originGlossaryEntryKey;
	}

	return null;
}

jest.unstable_mockModule("react", () => ({
	useCallback,
	useEffect,
	useMemo,
	useState
}));

jest.unstable_mockModule("../../src/ui/viewmodel/LoadState/useLoadModel.js", () => ({
	default: useLoadModel
}));

jest.unstable_mockModule("../../src/ui/presentation/useAppShellMode.js", () => ({
	default: useAppShellMode
}));

jest.unstable_mockModule("../../src/ui/presentation/usePresentationMode.js", () => ({
	default: usePresentationMode
}));

jest.unstable_mockModule("../../src/ui/viewmodel/GlossaryPage/useGlossarySearchModel.js", () => ({
	default: useGlossarySearchModel
}));

jest.unstable_mockModule("../../src/ui/viewmodel/GlossaryPage/useGlossaryTopicAreaSelectionModel.js", () => ({
	default: useGlossaryTopicAreaSelectionModel
}));

jest.unstable_mockModule("../../src/ui/viewmodel/GlossaryPage/useGlossaryDetailModel.js", () => ({
	default: useGlossaryDetailModel,
	useGlossaryDetailPresentationModeSync,
	resolveMobileGlossaryDetailEntryKey
}));

const { default: useGlossaryPageViewModel } = await import(
	"../../src/ui/viewmodel/GlossaryPageViewModel.js"
);

const translations = {
	searchCloseLabel: "Lukk søk",
	filterAllLabel: "Alle",
	glossaryPageTitle: "Begrepslister",
	glossaryPageSubtitle: (subjectCode) => `Sentrale begreper og definisjoner i ${subjectCode}`,
	glossaryPageSubtitleFallback: "Sentrale begreper og definisjoner",
	glossaryPageSearchLabel: "Søk i begrepslisten",
	glossaryPageSearchPlaceholder: "Søk etter begrep",
	glossaryPageChapterFilterAriaLabel: "Filtrer etter kapittel",
	glossaryPageAutocompleteAriaLabel: "Begrepsforslag",
	glossaryPageSearchClearLabel: "Tøm",
	glossaryPageSearchKeyboardHint: "Bruk piltastene",
	glossaryPageChapterSubtitle: (entryCount) => `${entryCount} begreper`,
	glossaryPageTermColumnHeader: "Begrep",
	glossaryPageExplanationColumnHeader: "Forklaring",
	glossaryPageTableSortAscendingLabel: (label) => `Sorter ${label} stigende`,
	glossaryPageTableSortDescendingLabel: (label) => `Sorter ${label} synkende`,
	glossaryPageConnectionsColumnHeader: "Viktighet",
	glossaryPageSingleAssociationLabel: "1 assosiert begrep",
	glossaryPageMultipleAssociationsLabel: (count) => `${count} assosierte begreper`,
	glossaryPageShowAssociationsLabel: (label, term) => `Vis ${label} for ${term}`,
	glossaryPageHideAssociationsLabel: (label, term) => `Skjul ${label} for ${term}`,
	glossaryPageOpenDetailLabel: (term) => `Åpne detaljvisning for ${term}`,
	glossaryPageAssociatedWithLabel: "Assosiert med",
	glossaryPageNoAssociationsLabel: "Ingen assosierte begreper er lagt til.",
	glossaryPageDetailBackLabel: (term) => `Tilbake til ${term}`,
	glossaryPageDetailPositionLabel: (position, total) => `${position} av ${total}`,
	glossaryPageDetailOutsideSelectionLabel: "Utenfor utvalget",
	glossaryPageDetailPreviousLabel: "Forrige",
	glossaryPageDetailNextLabel: "Neste",
	glossaryPageDetailSubtitle: (chapterReference, chapterLabel, associationLabel) => `${chapterReference}, ${chapterLabel}, ${associationLabel}`,
	glossaryPageDetailCloseLabel: "Lukk detaljvisningen",
	glossaryPageDetailExplanationHeading: "Forklaring",
	glossaryPageDetailNetworkHeading: "Plass i pensum",
	glossaryPageDetailRelationsHeading: "Relasjoner",
	glossaryPageDetailRelationsLoadingLabel: "Laster relasjoner …",
	glossaryPageDetailRelationsEmptyLabel: "Ingen relasjoner er lagt til ennå.",
	glossaryPageDetailRelationsShowAllLabel: (count) => `Vis alle ${count} relasjoner`,
	glossaryPageDetailRelationsShowLessLabel: "Vis færre relasjoner",
	glossaryPageDetailNavigationAriaLabel: "Naviger mellom begreper",
	glossaryPageNetworkInlineTitle: "Sammenhengsgraf",
	glossaryPageNetworkInlineInstructions: "Valgt begrep står i sentrum.",
	glossaryPageNetworkCenterLabel: "Valgt begrep",
	glossaryPageNetworkEmptyLabel: "Ingen koblinger.",
	glossaryPageNetworkLoadingLabel: "Laster sammenhengsgraf …",
	glossaryPageNetworkDirectAssociationLabel: "Direkte assosiasjon",
	glossaryPageNetworkSecondaryAssociationLabel: "Kobling mellom relaterte begreper",
	glossaryPageNetworkLimitLabel: (count) => `${count} ekstra`,
	glossaryPageNetworkErrorMessage: "Kunne ikke laste fagnettverket.",
	glossaryPageMasteryNotAssessedLabel: "Ikke vurdert",
	glossaryPageMasteryPracticeLabel: "Øve mer",
	glossaryPageMasteryProgressLabel: "Underveis",
	glossaryPageMasteryUnderstoodLabel: "Forstått",
	glossaryPageMasteryNoScoreLabel: "Ingen score",
	glossaryPageMasteryScoreLabel: (scorePercent) => `${scorePercent}%`,
	glossaryPageMasteryCorrectIncorrectLabel: (correctCount, incorrectCount) => `${correctCount} riktig, ${incorrectCount} galt`,
	glossaryPageMasteryNeverPracticedLabel: "Ikke øvd ennå",
	glossaryPageMasteryLastPracticedLabel: (dateLabel) => `Sist øvd ${dateLabel}`,
	glossaryPageDifficultyEasyLabel: "Lett",
	glossaryPageDifficultyMediumLabel: "Middels",
	glossaryPageDifficultyHardLabel: "Vanskelig",
	glossaryPageRelationRelatedLabel: "Relatert",
	glossaryPageRelationContrastsWithLabel: "Kontrast",
	glossaryPageRelationPrerequisiteLabel: "Forutsetning",
	glossaryPageRelationPartOfLabel: "Del av",
	glossaryPageAllChaptersHeading: "Alle kapitler",
	glossaryPageSelectedChaptersHeading: (count) => `${count} valgte kapitler`,
	glossaryPageChapterReference: (position) => `Kapittel ${position}`,
	glossaryPageNoTopicAreasTitle: "Ingen kapitler",
	glossaryPageNoTopicAreasBody: "Ingen kapitler finnes.",
	glossaryPageNoEntriesTitle: "Ingen begreper",
	glossaryPageNoEntriesBody: "Ingen begreper finnes.",
	glossaryPageNoEntriesInSelectionTitle: "Ingen begreper i utvalget",
	glossaryPageNoEntriesInSelectionBody: "Velg et annet kapittel.",
	glossaryPageMobileChapterSheetTitle: "Velg kapitler",
	glossaryPageMobileChapterSheetSubtitle: "Velg ett eller flere kapitler",
	glossaryPageMobileChapterSheetOpenLabel: "Åpne kapittelvelger",
	glossaryPageMobileChapterSheetCloseLabel: "Lukk kapittelvelger",
	glossaryPageErrorTitle: "Kunne ikke laste",
	glossaryPageErrorMessage: "Prøv igjen.",
	glossaryPageLoadingTitle: "Laster",
	contentToggleAriaLabel: "Velg læringsverktøy",
	contentToggleExamsLabel: "Eksamen",
	contentToggleLearningPathLabel: "Sti",
	contentToggleLearningPathDesktopLabel: "Læringsti",
	contentTogglePracticeLabel: "Øve",
	contentToggleTestsLabel: "Tester",
	contentToggleChapterTestsLabel: "Kapitteltester",
	contentToggleBackLabel: "Tilbake",
	contentToggleFlipcardsLabel: "Flipcards",
	contentToggleMatchCardsLabel: "Begrepsmatch",
	contentToggleGlossaryLabel: "Begrepsliste"
};

const topicAreas = [
	{
		key: "networking",
		label: "Nettverk",
		iconKey: "network",
		position: 2
	},
	{
		key: "cryptography",
		label: "Kryptografi",
		iconKey: "lock-keyhole",
		position: 1
	}
];

const glossaryEntries = [
	{
		glossaryEntryKey: "transport-layer",
		topicAreaKey: "networking",
		term: { no: "Transportlag", en: "Transport layer" },
		explanation: { no: "Flytter data mellom endepunkter.", en: "Moves data between endpoints." },
		position: 2,
		directNeighborCount: 2,
		directNeighborGlossaryKeys: ["packet", "public-key"],
		mastery: {
			status: "progress",
			score: 0.75,
			evidenceCount: 4,
			correctCount: 3,
			incorrectCount: 1,
			easyCorrect: 1,
			easyIncorrect: 0,
			mediumCorrect: 2,
			mediumIncorrect: 1,
			hardCorrect: 0,
			hardIncorrect: 0,
			lastEvidenceAt: "2026-08-10T10:00:00.000Z",
			policyVersion: 1
		}
	},
	{
		glossaryEntryKey: "public-key",
		topicAreaKey: "cryptography",
		term: { no: "Offentlig nøkkel", en: "Public key" },
		explanation: { no: "Kan deles med andre.", en: "Can be shared with others." },
		position: 2,
		directNeighborCount: 1,
		directNeighborGlossaryKeys: ["transport-layer"],
		mastery: null
	},
	{
		glossaryEntryKey: "packet",
		topicAreaKey: "networking",
		term: { no: "Pakke", en: "Packet" },
		explanation: { no: "En avgrenset enhet med nettverkstrafikk.", en: "A bounded unit of network traffic." },
		position: 1,
		directNeighborCount: 1,
		directNeighborGlossaryKeys: ["transport-layer"],
		mastery: null
	},
	{
		glossaryEntryKey: "asymmetric-key",
		topicAreaKey: "cryptography",
		term: { no: "Asymmetrisk nøkkel", en: "Asymmetric key" },
		explanation: { no: "Brukes i et nøkkelpar.", en: "Used in a key pair." },
		position: 1,
		directNeighborCount: 0,
		directNeighborGlossaryKeys: [],
		mastery: null
	}
];

function createDetailRefs(presentationMode) {
	const rowElements = { current: new Map() };
	const disclosureElements = { current: new Map() };
	const detailTriggerElements = { current: new Map() };

	return {
		origin: { current: null },
		titleFocusRequest: { current: null },
		previousPresentationMode: { current: presentationMode },
		titleElement: { current: null },
		detailTriggerElements,
		resolveRowRef: createElementRefResolver(rowElements),
		resolveDisclosureRef: createElementRefResolver(disclosureElements),
		resolveDetailTriggerRef: createElementRefResolver(detailTriggerElements),
		rowElements,
		disclosureElements
	};
}

function createElementRefResolver(elementByKeyRef) {
	const refByKey = new Map();

	return jest.fn((glossaryEntryKey) => {
		const cachedRef = refByKey.get(glossaryEntryKey);
		if (cachedRef !== undefined) {
			return cachedRef;
		}

		const elementRef = (element) => {
			if (element === null) {
				elementByKeyRef.current.delete(glossaryEntryKey);
				return;
			}

			elementByKeyRef.current.set(glossaryEntryKey, element);
		};
		refByKey.set(glossaryEntryKey, elementRef);
		return elementRef;
	});
}

function createViewModel({
	searchTerm = "",
	selectedTopicAreaKeys = null,
	keyboardIndex = -1,
	isSearchFilterOptionsOpen = false,
	isSearchAutocompleteOpen = false,
	searchNarrowedGlossaryEntryKey = null,
	expandedGlossaryEntryKey = null,
	tableSort = { key: "DIRECT_NEIGHBOR_COUNT", direction: "DESCENDING" },
	loadedGlossaryEntries = glossaryEntries,
	loadedTopicAreas = topicAreas,
	loadedNetwork = null,
	glossaryStatus = LOAD_STATUS.READY,
	topicAreaStatus = LOAD_STATUS.READY,
	networkStatus = null,
	glossaryError = null,
	topicAreaError = null,
	subjectId = "in2120",
	selectedSubject = {
		id: "in2120",
		code: "IN2120",
		name: "Informasjonssikkerhet"
	},
	initialTopicAreaKey = null,
	language = "no",
	isActive = true,
	expandedMobileToggleButtonGroupId = null,
	isMobileChapterSheetOpen = false,
	glossaryDetailTrailKeys = [],
	glossaryDetailRenderSnapshot = null,
	areGlossaryDetailRelationsExpanded = false,
	presentationMode = PRESENTATION_MODE.DESKTOP,
	appShellMode = APP_SHELL_MODE.FULL
} = {}) {
	currentTableSort = tableSort;
	currentMobileChapterSheetOpen = isMobileChapterSheetOpen;
	currentDetailRefs = createDetailRefs(presentationMode);
	useGlossarySearchModel.mockReturnValue({
		glossarySearchTerm: searchTerm,
		setGlossarySearchTerm,
		searchKeyboardIndex: keyboardIndex,
		setSearchKeyboardIndex,
		isSearchFilterOptionsOpen,
		setIsSearchFilterOptionsOpen,
		isSearchAutocompleteOpen,
		setIsSearchAutocompleteOpen,
		searchNarrowedGlossaryEntryKey,
		setSearchNarrowedGlossaryEntryKey
	});
	useGlossaryTopicAreaSelectionModel.mockReturnValue({
		selectedTopicAreaKeys,
		setSelectedTopicAreaKeys
	});
	useGlossaryDetailModel.mockReturnValue({
		expandedGlossaryEntryKey,
		setExpandedGlossaryEntryKey,
		glossaryDetailTrailKeys,
		setGlossaryDetailTrailKeys,
		glossaryDetailRenderSnapshot,
		setGlossaryDetailRenderSnapshot,
		areGlossaryDetailRelationsExpanded,
		setAreGlossaryDetailRelationsExpanded,
		glossaryDetailOriginEntryKeyRef: currentDetailRefs.origin,
		glossaryDetailTitleFocusRequestKeyRef: currentDetailRefs.titleFocusRequest,
		previousPresentationModeRef: currentDetailRefs.previousPresentationMode,
		glossaryDetailTitleElementRef: currentDetailRefs.titleElement,
		glossaryDetailTriggerElementByKey: currentDetailRefs.detailTriggerElements,
		resolveGlossaryRowRef: currentDetailRefs.resolveRowRef,
		resolveGlossaryDisclosureRef: currentDetailRefs.resolveDisclosureRef,
		resolveGlossaryDetailTriggerRef: currentDetailRefs.resolveDetailTriggerRef
	});
	const resolvedNetworkStatus = networkStatus ?? (loadedNetwork === null ? LOAD_STATUS.LOADING : LOAD_STATUS.READY);

	loadModelQueue = [
		{
			status: glossaryStatus,
			data: loadedGlossaryEntries,
			error: glossaryError,
			reload: jest.fn()
		},
		{
			status: topicAreaStatus,
			data: loadedTopicAreas,
			error: topicAreaError,
			reload: jest.fn()
		},
		{
			status: resolvedNetworkStatus,
			data: loadedNetwork,
			error: resolvedNetworkStatus === LOAD_STATUS.ERROR ? "Kunne ikke laste fagnettverket." : null,
			reload: jest.fn()
		}
	];

	const getGlossaryOverviewUseCase = {
		execute: jest.fn(async () => loadedGlossaryEntries)
	};
	const getGlossaryNetworkUseCase = {
		execute: jest.fn(async () => loadedNetwork)
	};
	const getTopicAreasUseCase = {
		execute: jest.fn(async () => loadedTopicAreas)
	};
	const onSelectContentType = jest.fn();
	const onOpenMobileToggleButtonGroup = jest.fn();
	const onCloseMobileToggleButtonGroup = jest.fn();
	const backContract = {
		showBackButton: true,
		backLabel: "Tilbake",
		navigationLabel: "Navigasjon",
		onBack: jest.fn()
	};
	useAppShellMode.mockReturnValue(appShellMode);
	usePresentationMode.mockReturnValue(presentationMode);
	const viewModel = useGlossaryPageViewModel({
		getGlossaryOverviewUseCase,
		getGlossaryNetworkUseCase,
		getTopicAreasUseCase,
		subjectId,
		selectedSubject,
		initialTopicAreaKey,
		language,
		t: translations,
		isActive,
		backContract,
		onSelectContentType,
		expandedMobileToggleButtonGroupId,
		openMobileToggleButtonGroup: onOpenMobileToggleButtonGroup,
		closeMobileToggleButtonGroup: onCloseMobileToggleButtonGroup
	});

	return {
		backContract,
		getGlossaryOverviewUseCase,
		getGlossaryNetworkUseCase,
		getTopicAreasUseCase,
		onSelectContentType,
		onOpenMobileToggleButtonGroup,
		onCloseMobileToggleButtonGroup,
		viewModel
	};
}

function clearStateSetterCalls() {
	for (const stateSetter of stateSetters) {
		stateSetter.mockClear();
	}
}

function expectSetContents(actualSet, expectedValues) {
	expect(actualSet).toBeInstanceOf(Set);
	expect([...actualSet]).toEqual(expectedValues);
}

beforeEach(() => {
	loadModelQueue = [];
	currentTableSort = { key: "DIRECT_NEIGHBOR_COUNT", direction: "DESCENDING" };
	currentMobileChapterSheetOpen = false;
	currentDetailRefs = null;
	clearStateSetterCalls();
	useState.mockClear();
	useEffect.mockClear();
	useMemo.mockClear();
	useCallback.mockClear();
	useLoadModel.mockClear();
	useAppShellMode.mockReset();
	useAppShellMode.mockReturnValue(APP_SHELL_MODE.FULL);
	usePresentationMode.mockReset();
	usePresentationMode.mockReturnValue(PRESENTATION_MODE.DESKTOP);
	useGlossarySearchModel.mockReset();
	useGlossaryTopicAreaSelectionModel.mockReset();
	useGlossaryDetailModel.mockReset();
	useGlossaryDetailPresentationModeSync.mockClear();
});

describe("useGlossaryPageViewModel", () => {
	test("composes private state models behind the page ViewModel contract", () => {
		createViewModel();

		expect(useGlossarySearchModel).toHaveBeenCalledWith({ resetKey: "in2120:null" });
		expect(useGlossaryTopicAreaSelectionModel).toHaveBeenCalledWith({ resetKey: "in2120:null" });
		expect(useGlossaryDetailModel).toHaveBeenCalledWith({ presentationMode: PRESENTATION_MODE.DESKTOP, resetKey: "in2120:null" });
	});

	test("keeps narrow desktop feature presentation desktop while using the compact app shell", () => {
		const { viewModel } = createViewModel({
			presentationMode: PRESENTATION_MODE.DESKTOP,
			appShellMode: APP_SHELL_MODE.COMPACT
		});

		expect(viewModel.presentationMode).toBe(PRESENTATION_MODE.DESKTOP);
		expect(viewModel.usesCompactShell).toBe(true);
	});

	test("returns the glossary-aware mobile toggle-button contract", () => {
		const { viewModel } = createViewModel();
		const [learningPathItem, practiceItem, testsItem] = viewModel.mobileToggleButtonItems;

		expect(viewModel.activeContentType).toBe(LEARNING_CONTENT_TYPES.GLOSSARY);
		expect(viewModel.contentToggleBackLabel).toBe("Tilbake");
		expect(viewModel.mobileToggleButtonItems).toHaveLength(3);
		expect(learningPathItem).toEqual({
			id: LEARNING_CONTENT_TYPES.LEARNING_PATH,
			label: "Sti",
			contentTypeId: LEARNING_CONTENT_TYPES.LEARNING_PATH,
			isDisabled: false,
			isActive: false,
			entries: []
		});
		expect(practiceItem).toMatchObject({
			id: "practice",
			label: "Øve",
			isDisabled: false,
			isActive: true
		});
		expect(practiceItem.entries).toEqual([
			{
				id: LEARNING_CONTENT_TYPES.GLOSSARY,
				label: "Begrepsliste",
				isDisabled: false
			},
			{
				id: LEARNING_CONTENT_TYPES.FLIPCARDS,
				label: "Flipcards",
				isDisabled: false
			},
			{
				id: LEARNING_CONTENT_TYPES.MATCHCARDS,
				label: "Begrepsmatch",
				isDisabled: false
			}
		]);
		expect(testsItem).toMatchObject({
			id: "tests",
			contentTypeId: null,
			isActive: false
		});
		expect(testsItem.entries).toEqual([
			{
				id: TEST_TYPES.CHAPTER_TEST,
				label: "Kapitteltester",
				isDisabled: false
			},
			{
				id: LEARNING_CONTENT_TYPES.EXAMS,
				label: "Eksamen",
				isDisabled: false
			}
		]);
	});


	test("reuses the shared mobile disclosure state across the glossary route", () => {
		const {
			onOpenMobileToggleButtonGroup,
			onCloseMobileToggleButtonGroup,
			viewModel
		} = createViewModel({
			expandedMobileToggleButtonGroupId: "practice"
		});

		expect(viewModel.expandedMobileToggleButtonGroupId).toBe("practice");
		expect(viewModel.mobileActiveEntryId).toBe(LEARNING_CONTENT_TYPES.GLOSSARY);
		expect(viewModel.openMobileToggleButtonGroup).toBe(onOpenMobileToggleButtonGroup);
		expect(viewModel.closeMobileToggleButtonGroup).toBe(onCloseMobileToggleButtonGroup);
	});

	test("loads the canonical glossary overview once and topic areas for the active language", async () => {
		const { getGlossaryOverviewUseCase, getTopicAreasUseCase } = createViewModel();

		await useLoadModel.mock.calls[0][0].execute();
		await useLoadModel.mock.calls[1][0].execute();

		expect(getGlossaryOverviewUseCase.execute).toHaveBeenCalledWith({
			subjectId: "in2120"
		});
		expect(getTopicAreasUseCase.execute).toHaveBeenCalledWith({
			subjectId: "in2120",
			language: "no"
		});
	});

	test("selects all chapters by default and sorts the most important concepts first", () => {
		const { viewModel } = createViewModel();

		expect(viewModel.search.filterValue).toBe(ALL_TOPIC_AREAS);
		expect(viewModel.search.filterLabel).toBe("Alle kapitler");
		expect(viewModel.allTopicAreaListItem).toMatchObject({
			label: "Alle kapitler",
			subtitle: "4 begreper",
			eyebrow: null,
			entryCount: 4,
			isAllTopicAreas: true,
			isSelected: true
		});
		expect(viewModel.topicAreaListItems.map((item) => item.isSelected)).toEqual([true, true]);
		expect(viewModel.glossaryTableRows.map((row) => row.glossaryEntryKey)).toEqual([
			"transport-layer",
			"packet",
			"public-key",
			"asymmetric-key"
		]);
		expect(viewModel.glossaryTableHeaders[2]).toMatchObject({
			key: "DIRECT_NEIGHBOR_COUNT",
			ariaSort: "descending",
			sortIconKind: "DESCENDING",
			actionLabel: "Sorter Viktighet stigende"
		});
	});

	test("narrows autocomplete suggestions without filtering the glossary table while typing", () => {
		const { viewModel } = createViewModel({
			searchTerm: "p",
			selectedTopicAreaKeys: new Set(["networking"]),
			keyboardIndex: 0,
			isSearchAutocompleteOpen: true
		});

		expect(viewModel.search).toMatchObject({
			isSearching: true,
			isAutocompleteActive: true,
			isPopupOpen: true,
			listId: GLOSSARY_AUTOCOMPLETE_LIST_ID
		});
		expect(viewModel).not.toHaveProperty("searchSummaryLabel");
		expect(viewModel.search.suggestions).toEqual([
			{
				id: "packet",
				optionId: createGlossaryAutocompleteOptionId("packet"),
				label: "Pakke",
				metaLabel: "Kapittel 2",
				topicAreaKey: "networking"
			},
			{
				id: "transport-layer",
				optionId: createGlossaryAutocompleteOptionId("transport-layer"),
				label: "Transportlag",
				metaLabel: "Kapittel 2",
				topicAreaKey: "networking"
			}
		]);
		expect(viewModel.search.activeDescendantId).toBe(createGlossaryAutocompleteOptionId("packet"));
		expect(viewModel.glossaryTableRows.map((row) => row.glossaryEntryKey)).toEqual([
			"transport-layer",
			"packet"
		]);
	});

	test("shows only a committed autocomplete result after selection", () => {
		const { viewModel } = createViewModel({
			searchTerm: "Pakke",
			selectedTopicAreaKeys: new Set(["networking"]),
			searchNarrowedGlossaryEntryKey: "packet"
		});

		expect(viewModel.glossaryTableRows.map((row) => row.glossaryEntryKey)).toEqual(["packet"]);
	});

	test("keeps autocomplete closed for an empty normalized search term", () => {
		const { viewModel } = createViewModel({
			searchTerm: "   ",
			isSearchAutocompleteOpen: true
		});

		expect(viewModel.search.suggestions).toEqual([]);
		expect(viewModel.search.isAutocompleteActive).toBe(false);
		expect(viewModel.search.isPopupOpen).toBe(false);
		expect(viewModel.search.activeDescendantId).toBeNull();
	});

	test("exposes chapters as the only filter options", () => {
		const { viewModel } = createViewModel({
			selectedTopicAreaKeys: new Set(["cryptography"]),
			isSearchFilterOptionsOpen: true
		});

		expect(viewModel.search.filterOptions).toEqual([
			{ id: ALL_TOPIC_AREAS, value: ALL_TOPIC_AREAS, label: "Alle kapitler" },
			{ id: "networking", value: "networking", label: "Nettverk" },
			{ id: "cryptography", value: "cryptography", label: "Kryptografi" }
		]);
		expect(viewModel.search).toMatchObject({
			filterValue: "cryptography",
			filterLabel: "Kryptografi",
			isPopupOpen: true,
			isFilterOptionsMode: true
		});
		expect(viewModel).not.toHaveProperty("glossarySearchScope");
		expect(viewModel).not.toHaveProperty("searchScopeOptions");
	});

	test("a chapter filter replaces the current selection and preserves a qualifying search", () => {
		const { viewModel } = createViewModel({
			searchTerm: "nøk",
			selectedTopicAreaKeys: new Set(["networking"]),
			isSearchFilterOptionsOpen: true
		});
		clearStateSetterCalls();

		viewModel.search.onSelectFilterOption("cryptography");

		expectSetContents(setSelectedTopicAreaKeys.mock.calls[0][0], ["cryptography"]);
		expect(setSearchKeyboardIndex).toHaveBeenCalledWith(0);
		expect(setIsSearchFilterOptionsOpen).toHaveBeenCalledWith(false);
		expect(setIsSearchAutocompleteOpen).toHaveBeenCalledWith(true);
		expect(setSearchNarrowedGlossaryEntryKey).toHaveBeenCalledWith(null);
	});

	test("the all-chapters filter restores the complete chapter set", () => {
		const { viewModel } = createViewModel({ selectedTopicAreaKeys: new Set(["cryptography"]) });
		clearStateSetterCalls();

		viewModel.search.onSelectFilterOption(ALL_TOPIC_AREAS);

		expectSetContents(setSelectedTopicAreaKeys.mock.calls[0][0], ["networking", "cryptography"]);
	});

	test("typing, focus, clear and popup close keep search and popup state separate", () => {
		const { viewModel } = createViewModel({ searchTerm: "pak" });
		clearStateSetterCalls();

		viewModel.search.onChangeTerm("  nøk  ");
		expect(setGlossarySearchTerm).toHaveBeenCalledWith("  nøk  ");
		expect(setSearchNarrowedGlossaryEntryKey).toHaveBeenCalledWith(null);
		expect(setSearchKeyboardIndex).toHaveBeenCalledWith(0);
		expect(setIsSearchFilterOptionsOpen).toHaveBeenCalledWith(false);
		expect(setIsSearchAutocompleteOpen).toHaveBeenCalledWith(true);

		clearStateSetterCalls();
		viewModel.search.onFocus();
		expect(setIsSearchFilterOptionsOpen).toHaveBeenCalledWith(false);
		expect(setIsSearchAutocompleteOpen).toHaveBeenCalledWith(true);

		clearStateSetterCalls();
		viewModel.search.onRequestClose();
		expect(setGlossarySearchTerm).not.toHaveBeenCalled();
		expect(setSearchKeyboardIndex).toHaveBeenCalledWith(-1);
		expect(setIsSearchFilterOptionsOpen).toHaveBeenCalledWith(false);
		expect(setIsSearchAutocompleteOpen).toHaveBeenCalledWith(false);

		clearStateSetterCalls();
		viewModel.search.onClear();
		expect(setGlossarySearchTerm).toHaveBeenCalledWith("");
		expect(setSearchNarrowedGlossaryEntryKey).toHaveBeenCalledWith(null);
		expect(setIsSearchAutocompleteOpen).toHaveBeenCalledWith(false);
	});

	test("keyboard navigation wraps through autocomplete suggestions", () => {
		const { viewModel } = createViewModel({
			searchTerm: "nøk",
			keyboardIndex: 0,
			isSearchAutocompleteOpen: true
		});
		clearStateSetterCalls();

		viewModel.search.onMoveDown();
		expect(setSearchKeyboardIndex.mock.calls[0][0](0)).toBe(1);
		expect(setSearchKeyboardIndex.mock.calls[0][0](1)).toBe(0);

		clearStateSetterCalls();
		viewModel.search.onMoveUp();
		expect(setSearchKeyboardIndex.mock.calls[0][0](0)).toBe(1);
	});

	test("selecting an autocomplete suggestion selects its chapter and closes the popup", () => {
		const { viewModel } = createViewModel({
			searchTerm: "pak",
			keyboardIndex: 0,
			isSearchAutocompleteOpen: true
		});
		clearStateSetterCalls();

		viewModel.search.onSelectActive();

		expect(setGlossarySearchTerm).toHaveBeenCalledWith("Pakke");
		expect(setSearchNarrowedGlossaryEntryKey).toHaveBeenCalledWith("packet");
		expectSetContents(setSelectedTopicAreaKeys.mock.calls[0][0], ["networking"]);
		expect(setSearchKeyboardIndex).toHaveBeenCalledWith(-1);
		expect(setIsSearchAutocompleteOpen).toHaveBeenCalledWith(false);
	});

	test("chapter navigation remains a separate multi-select interaction", () => {
		const selectedKeys = new Set(["cryptography"]);
		const { viewModel } = createViewModel({ selectedTopicAreaKeys: selectedKeys });
		clearStateSetterCalls();

		viewModel.selectTopicArea("networking");
		const updateSelection = setSelectedTopicAreaKeys.mock.calls[0][0];
		expectSetContents(updateSelection(selectedKeys), ["cryptography", "networking"]);
		expectSetContents(selectedKeys, ["cryptography"]);
		expect(setSearchNarrowedGlossaryEntryKey).toHaveBeenCalledWith(null);
	});

	test("rebuilds localized rows for a language switch without reloading glossary entries", () => {
		const norwegian = createViewModel({ language: "no" });
		expect(norwegian.viewModel.glossaryTableRows[0].term).toBe("Transportlag");

		useState.mockClear();

		const english = createViewModel({ language: "en" });
		expect(english.viewModel.glossaryTableRows[0].term).toBe("Transport layer");
	});

	test.each([
		{
			name: "no topic areas",
			loadedTopicAreas: [],
			loadedGlossaryEntries: [],
			expectedWorkspaceState: {
				kind: WORKSPACE_STATE_KINDS.EMPTY,
				title: "Ingen kapitler",
				body: "Ingen kapitler finnes.",
				action: null
			}
		},
		{
			name: "topic areas without glossary entries",
			loadedTopicAreas: topicAreas,
			loadedGlossaryEntries: [],
			expectedWorkspaceState: {
				kind: WORKSPACE_STATE_KINDS.EMPTY,
				title: "Ingen begreper",
				body: "Ingen begreper finnes.",
				action: null
			}
		}
	])("returns the $name empty state", ({ loadedTopicAreas, loadedGlossaryEntries, expectedWorkspaceState }) => {
		const { viewModel } = createViewModel({ loadedTopicAreas, loadedGlossaryEntries });
		expect(viewModel.workspaceState).toEqual(expectedWorkspaceState);
	});

	test("keeps the glossary content stable when autocomplete has no matches", () => {
		const { viewModel } = createViewModel({
			searchTerm: "finnes-ikke",
			isSearchAutocompleteOpen: true
		});

		expect(viewModel.workspaceState.kind).toBe(WORKSPACE_STATE_KINDS.CONTENT);
		expect(viewModel.search.suggestions).toEqual([]);
		expect(viewModel.glossaryPanelEmptyState).toBeNull();
		expect(viewModel.glossaryTableRows).toHaveLength(glossaryEntries.length);
	});

	test("preserves direct-neighbor count and level without neighbor-key detail data in table rows", () => {
		const { viewModel } = createViewModel();
		const transportLayer = viewModel.glossaryTableRows.find((row) => row.glossaryEntryKey === "transport-layer");

		expect(transportLayer).toMatchObject({
			directNeighborCount: 2,
			directNeighborLevel: {
				value: 2,
				level: 2,
				ariaLabel: "2 assosierte begreper"
			}
		});
		expect(transportLayer).not.toHaveProperty("directNeighborGlossaryKeys");
	});

	test("sorts by direct-neighbor count through ViewModel-owned table state", () => {
		const { viewModel } = createViewModel({
			tableSort: { key: "DIRECT_NEIGHBOR_COUNT", direction: "DESCENDING" }
		});

		expect(viewModel.glossaryTableRows.map((row) => row.glossaryEntryKey)).toEqual([
			"transport-layer",
			"packet",
			"public-key",
			"asymmetric-key"
		]);
		viewModel.changeGlossaryTableSort("DIRECT_NEIGHBOR_COUNT");
		expect(setGlossaryTableSort).toHaveBeenCalledWith(expect.any(Function));
	});

	test("prepares table header interaction and accessibility in the page ViewModel", () => {
		const { viewModel } = createViewModel({
			tableSort: { key: "TERM", direction: "ASCENDING" }
		});
		const [termHeader, explanationHeader, connectionsHeader] = viewModel.glossaryTableHeaders;

		expect(termHeader).toMatchObject({
			key: "TERM",
			isSortable: true,
			ariaSort: "ascending",
			sortIconKind: "ASCENDING",
			actionLabel: "Sorter Begrep synkende",
			onActivate: expect.any(Function)
		});
		expect(explanationHeader).toEqual({
			key: "EXPLANATION",
			label: "Forklaring",
			className: "",
			isSortable: false
		});
		expect(connectionsHeader).toMatchObject({
			key: "DIRECT_NEIGHBOR_COUNT",
			isSortable: true,
			ariaSort: "none",
			sortIconKind: "UNSORTED"
		});

		clearStateSetterCalls();
		connectionsHeader.onActivate();
		expect(setGlossaryTableSort).toHaveBeenCalledWith(expect.any(Function));
	});

	test("prepares desktop modal activation and existing mobile disclosure mechanics in the page ViewModel", () => {
		const { viewModel } = createViewModel({
			expandedGlossaryEntryKey: "transport-layer",
			loadedNetwork: {
				subjectId: "in2120",
				center: glossaryEntries[0],
				nodes: [glossaryEntries[2]],
				relations: [],
				directRelations: [
					{
						subjectId: "in2120",
						sourceGlossaryKey: "transport-layer",
						targetGlossaryKey: "packet",
						type: "related"
					},
					{
						subjectId: "in2120",
						sourceGlossaryKey: "transport-layer",
						targetGlossaryKey: "public-key",
						type: "related"
					}
				],
				limit: 8,
				depth: 1
			}
		});
		const transportLayer = viewModel.glossaryTableRows.find((row) => row.glossaryEntryKey === "transport-layer");
		const rowTarget = { closest: jest.fn(() => null) };
		const interactiveTarget = { closest: jest.fn(() => ({ tagName: "BUTTON" })) };
		const escapeEvent = { key: "Escape", preventDefault: jest.fn(), stopPropagation: jest.fn() };

		expect(transportLayer).toMatchObject({
			className: "glossary-table-row",
			mobileClassName: "glossary-entry-card glossary-entry-card--expanded",
			ref: expect.any(Function),
			onActivate: expect.any(Function),
			detailTrigger: {
				label: "Åpne detaljvisning for Transportlag",
				ref: expect.any(Function),
				onActivate: expect.any(Function)
			},
			mobileDisclosure: {
				className: "glossary-entry-card__direct-neighbor-toggle",
				count: 2,
				ariaExpanded: true,
				controlsId: "glossary-details-transport-layer",
				ref: expect.any(Function),
				onActivate: expect.any(Function),
				onKeyDown: expect.any(Function)
			}
		});
		expect(transportLayer).not.toHaveProperty("disclosure");

		clearStateSetterCalls();
		transportLayer.onActivate({ target: rowTarget });
		expect(rowTarget.closest).toHaveBeenCalledWith('button, a, input, select, textarea, [role="button"]');
		expect(setGlossaryDetailTrailKeys).toHaveBeenCalledWith([]);
		expect(setExpandedGlossaryEntryKey).toHaveBeenCalledWith("transport-layer");

		clearStateSetterCalls();
		transportLayer.onActivate({ target: interactiveTarget });
		expect(setGlossaryDetailTrailKeys).not.toHaveBeenCalled();
		expect(setExpandedGlossaryEntryKey).not.toHaveBeenCalled();

		clearStateSetterCalls();
		transportLayer.detailTrigger.onActivate();
		expect(setGlossaryDetailTrailKeys).toHaveBeenCalledWith([]);
		expect(setExpandedGlossaryEntryKey).toHaveBeenCalledWith("transport-layer");

		clearStateSetterCalls();
		transportLayer.mobileDisclosure.onKeyDown(escapeEvent);
		expect(escapeEvent.preventDefault).toHaveBeenCalledTimes(1);
		expect(escapeEvent.stopPropagation).toHaveBeenCalledTimes(1);
		expect(setExpandedGlossaryEntryKey).toHaveBeenCalledWith(null);

		clearStateSetterCalls();
		const mobileDisclosureEvent = { stopPropagation: jest.fn() };
		transportLayer.mobileDisclosure.onActivate(mobileDisclosureEvent);
		expect(mobileDisclosureEvent.stopPropagation).toHaveBeenCalledTimes(1);
		expect(setExpandedGlossaryEntryKey).toHaveBeenCalledWith(expect.any(Function));
	});

	test("opens glossary detail from the table without mutating page context", () => {
		const { viewModel } = createViewModel({
			glossaryDetailTrailKeys: ["public-key"]
		});
		const originRef = currentDetailRefs.origin;
		const titleFocusRequestRef = currentDetailRefs.titleFocusRequest;
		clearStateSetterCalls();

		viewModel.openGlossaryDetailFromTable("transport-layer");

		expect(originRef.current).toBe("transport-layer");
		expect(titleFocusRequestRef.current).toBeNull();
		expect(setGlossaryDetailTrailKeys).toHaveBeenCalledWith([]);
		expect(setExpandedGlossaryEntryKey).toHaveBeenCalledWith("transport-layer");
		expect(setGlossarySearchTerm).not.toHaveBeenCalled();
		expect(setSelectedTopicAreaKeys).not.toHaveBeenCalled();
		expect(setSearchNarrowedGlossaryEntryKey).not.toHaveBeenCalled();
		expect(setGlossaryTableSort).not.toHaveBeenCalled();
	});

	test("rejects an unknown glossary detail entry opened from the table", () => {
		const { viewModel } = createViewModel();

		expect(() => viewModel.openGlossaryDetailFromTable("missing-entry"))
			.toThrow("Cannot open unknown glossary entry: missing-entry");
	});

	test("pushes the active entry onto the exploration trail without changing page context", () => {
		const { viewModel } = createViewModel({
			expandedGlossaryEntryKey: "transport-layer",
			glossaryDetailTrailKeys: ["packet"]
		});
		const titleFocusRequestRef = currentDetailRefs.titleFocusRequest;
		clearStateSetterCalls();

		viewModel.exploreGlossaryDetailConcept("public-key");

		const updateTrail = setGlossaryDetailTrailKeys.mock.calls[0][0];
		expect(updateTrail(["packet"])).toEqual(["packet", "transport-layer"]);
		expect(titleFocusRequestRef.current).toBe("public-key");
		expect(setExpandedGlossaryEntryKey).toHaveBeenCalledWith("public-key");
		expect(setGlossarySearchTerm).not.toHaveBeenCalled();
		expect(setSelectedTopicAreaKeys).not.toHaveBeenCalled();
		expect(setSearchKeyboardIndex).not.toHaveBeenCalled();
		expect(setIsSearchFilterOptionsOpen).not.toHaveBeenCalled();
		expect(setIsSearchAutocompleteOpen).not.toHaveBeenCalled();
		expect(setSearchNarrowedGlossaryEntryKey).not.toHaveBeenCalled();
		expect(setGlossaryTableSort).not.toHaveBeenCalled();
	});

	test("rejects exploration without an active detail entry and unknown targets", () => {
		const inactive = createViewModel();
		expect(() => inactive.viewModel.exploreGlossaryDetailConcept("packet"))
			.toThrow("Cannot explore glossary detail without an active detail entry.");

		useState.mockClear();
		const active = createViewModel({ expandedGlossaryEntryKey: "transport-layer" });
		expect(() => active.viewModel.exploreGlossaryDetailConcept("missing-entry"))
			.toThrow("Cannot navigate to unknown glossary entry: missing-entry");
	});

	test("does not add a trail entry when exploration selects the active concept", () => {
		const { viewModel } = createViewModel({
			expandedGlossaryEntryKey: "transport-layer",
			glossaryDetailTrailKeys: ["packet"]
		});
		clearStateSetterCalls();

		viewModel.exploreGlossaryDetailConcept("transport-layer");

		expect(setGlossaryDetailTrailKeys).not.toHaveBeenCalled();
		expect(setExpandedGlossaryEntryKey).not.toHaveBeenCalled();
	});

	test("navigates back through the exploration trail and requests title focus", () => {
		const { viewModel } = createViewModel({
			expandedGlossaryEntryKey: "transport-layer",
			glossaryDetailTrailKeys: ["asymmetric-key", "public-key"]
		});
		const titleFocusRequestRef = currentDetailRefs.titleFocusRequest;
		clearStateSetterCalls();

		viewModel.navigateBackGlossaryDetailTrail();

		const updateTrail = setGlossaryDetailTrailKeys.mock.calls[0][0];
		expect(updateTrail(["asymmetric-key", "public-key"])).toEqual(["asymmetric-key"]);
		expect(titleFocusRequestRef.current).toBe("public-key");
		expect(setExpandedGlossaryEntryKey).toHaveBeenCalledWith("public-key");
	});

	test("keeps trail back inert when no exploration history exists", () => {
		const { viewModel } = createViewModel({
			expandedGlossaryEntryKey: "transport-layer",
			glossaryDetailTrailKeys: []
		});
		clearStateSetterCalls();

		viewModel.navigateBackGlossaryDetailTrail();

		expect(setGlossaryDetailTrailKeys).not.toHaveBeenCalled();
		expect(setExpandedGlossaryEntryKey).not.toHaveBeenCalled();
	});

	test("navigates previous and next through the current sorted visible table sequence", () => {
		const { viewModel } = createViewModel({
			expandedGlossaryEntryKey: "packet",
			glossaryDetailTrailKeys: ["public-key"],
			tableSort: { key: "TERM", direction: "ASCENDING" }
		});
		const titleFocusRequestRef = currentDetailRefs.titleFocusRequest;
		clearStateSetterCalls();

		viewModel.openPreviousGlossaryDetail();
		expect(setGlossaryDetailTrailKeys).toHaveBeenCalledWith([]);
		expect(setExpandedGlossaryEntryKey).toHaveBeenCalledWith("public-key");
		expect(titleFocusRequestRef.current).toBe("public-key");

		clearStateSetterCalls();
		viewModel.openNextGlossaryDetail();
		expect(setGlossaryDetailTrailKeys).toHaveBeenCalledWith([]);
		expect(setExpandedGlossaryEntryKey).toHaveBeenCalledWith("transport-layer");
		expect(titleFocusRequestRef.current).toBe("transport-layer");
	});

	test("keeps sequence navigation inert outside the visible table sequence", () => {
		const { viewModel } = createViewModel({
			selectedTopicAreaKeys: new Set(["networking"]),
			expandedGlossaryEntryKey: "public-key",
			glossaryDetailTrailKeys: ["packet"]
		});
		clearStateSetterCalls();

		viewModel.openPreviousGlossaryDetail();
		viewModel.openNextGlossaryDetail();

		expect(setGlossaryDetailTrailKeys).not.toHaveBeenCalled();
		expect(setExpandedGlossaryEntryKey).not.toHaveBeenCalled();
	});

	test("closes glossary detail while retaining the origin for later focus restoration", () => {
		const { viewModel } = createViewModel({
			expandedGlossaryEntryKey: "transport-layer",
			glossaryDetailTrailKeys: ["packet"]
		});
		const originRef = currentDetailRefs.origin;
		const titleFocusRequestRef = currentDetailRefs.titleFocusRequest;
		viewModel.openGlossaryDetailFromTable("transport-layer");
		clearStateSetterCalls();
		titleFocusRequestRef.current = "public-key";

		viewModel.closeGlossaryDetail();

		expect(setGlossaryDetailTrailKeys).toHaveBeenCalledWith([]);
		expect(setExpandedGlossaryEntryKey).toHaveBeenCalledWith(null);
		expect(titleFocusRequestRef.current).toBeNull();
		expect(originRef.current).toBe("transport-layer");
	});

	test("derives modal open state from desktop presentation mode and the active detail key", () => {
		const desktop = createViewModel({
			expandedGlossaryEntryKey: "packet",
			presentationMode: PRESENTATION_MODE.DESKTOP
		});
		expect(desktop.viewModel.isGlossaryDetailModalOpen).toBe(true);

		useState.mockClear();
		useEffect.mockClear();
		const mobile = createViewModel({
			expandedGlossaryEntryKey: "packet",
			presentationMode: PRESENTATION_MODE.MOBILE
		});
		expect(mobile.viewModel.isGlossaryDetailModalOpen).toBe(false);
	});

	test("prepares controlled modal focus lifecycle in the page ViewModel", () => {
		const { viewModel } = createViewModel({
			expandedGlossaryEntryKey: "transport-layer",
			presentationMode: PRESENTATION_MODE.DESKTOP
		});
		const titleElementRef = currentDetailRefs.titleElement;
		const triggerElementByKeyRef = currentDetailRefs.detailTriggerElements;
		const triggerElement = { focus: jest.fn() };

		const transportLayerRow = viewModel.glossaryTableRows.find((row) => row.glossaryEntryKey === "transport-layer");
		transportLayerRow.detailTrigger.ref(triggerElement);
		viewModel.openGlossaryDetailFromTable("transport-layer");

		expect(triggerElementByKeyRef.current.get("transport-layer")).toBe(triggerElement);
		expect(viewModel.glossaryDetailModal.content.header.titleRef).toBe(titleElementRef);
		expect(viewModel.glossaryDetailModal).toMatchObject({
			isOpen: true,
			initialFocus: titleElementRef,
			finalFocus: expect.any(Function),
			onOpenChange: expect.any(Function),
			onOpenChangeComplete: expect.any(Function)
		});
		expect(viewModel.glossaryDetailModal.finalFocus()).toBe(triggerElement);
	});

	test("does not restore a desktop trigger when final focus resolves outside desktop mode", () => {
		const { viewModel } = createViewModel({
			expandedGlossaryEntryKey: "transport-layer",
			presentationMode: PRESENTATION_MODE.MOBILE
		});
		viewModel.openGlossaryDetailFromTable("transport-layer");

		expect(viewModel.glossaryDetailModal.finalFocus()).toBe(false);
	});

	test("uses false instead of default focus restoration when the origin trigger is unavailable", () => {
		const { viewModel } = createViewModel({
			expandedGlossaryEntryKey: "transport-layer",
			presentationMode: PRESENTATION_MODE.DESKTOP
		});
		viewModel.openGlossaryDetailFromTable("transport-layer");

		expect(viewModel.glossaryDetailModal.finalFocus()).toBe(false);
	});

	test("routes controlled dialog close requests through the ViewModel and clears origin after completion", () => {
		const { viewModel } = createViewModel({
			expandedGlossaryEntryKey: "transport-layer",
			glossaryDetailTrailKeys: ["packet"]
		});
		const originRef = currentDetailRefs.origin;
		viewModel.openGlossaryDetailFromTable("transport-layer");
		clearStateSetterCalls();

		viewModel.glossaryDetailModal.onOpenChange(true);
		expect(setExpandedGlossaryEntryKey).not.toHaveBeenCalled();

		viewModel.glossaryDetailModal.onOpenChange(false);
		expect(setGlossaryDetailTrailKeys).toHaveBeenCalledWith([]);
		expect(setExpandedGlossaryEntryKey).toHaveBeenCalledWith(null);
		expect(originRef.current).toBe("transport-layer");

		viewModel.glossaryDetailModal.onOpenChangeComplete(false);
		expect(originRef.current).toBeNull();
	});

	test("retains the latest open detail presentation as the modal close snapshot", () => {
		const { viewModel } = createViewModel({
			expandedGlossaryEntryKey: "transport-layer",
			presentationMode: PRESENTATION_MODE.DESKTOP
		});

		expect(viewModel.glossaryDetailPresentation).not.toHaveProperty("isInteractive");
		expect(setGlossaryDetailRenderSnapshot).toHaveBeenCalledWith(expect.objectContaining({ isInteractive: true }));
	});

	test("renders a retained close snapshot as noninteractive content while the modal is closed", () => {
		const retainedPresentation = {
			isInteractive: true,
			header: { title: "HMAC" }
		};
		const { viewModel } = createViewModel({
			expandedGlossaryEntryKey: null,
			glossaryDetailRenderSnapshot: retainedPresentation,
			presentationMode: PRESENTATION_MODE.DESKTOP
		});

		expect(viewModel.glossaryDetailModal.isOpen).toBe(false);
		expect(viewModel.glossaryDetailModal.content).toEqual({
			...retainedPresentation,
			isInteractive: false
		});
	});

	test("clears the retained close snapshot only after the dialog close transition completes", () => {
		const { viewModel } = createViewModel({
			expandedGlossaryEntryKey: "transport-layer",
			presentationMode: PRESENTATION_MODE.DESKTOP
		});
		clearStateSetterCalls();

		viewModel.glossaryDetailModal.onOpenChange(false);
		expect(setGlossaryDetailRenderSnapshot).not.toHaveBeenCalledWith(null);

		viewModel.glossaryDetailModal.onOpenChangeComplete(false);
		expect(setGlossaryDetailRenderSnapshot).toHaveBeenCalledWith(null);
	});

	test("binds modal-local graph, association, trail and sequence interactions without mutating page context", () => {
		const { viewModel } = createViewModel({
			expandedGlossaryEntryKey: "transport-layer",
			glossaryDetailTrailKeys: ["public-key"],
			loadedNetwork: {
				subjectId: "in2120",
				center: glossaryEntries[0],
				nodes: [glossaryEntries[2]],
				relations: [],
				directRelations: [
					{
						subjectId: "in2120",
						sourceGlossaryKey: "transport-layer",
						targetGlossaryKey: "packet",
						type: "related"
					},
					{
						subjectId: "in2120",
						sourceGlossaryKey: "transport-layer",
						targetGlossaryKey: "public-key",
						type: "related"
					}
				],
				limit: 8,
				depth: 1
			}
		});

		const modalPresentation = viewModel.glossaryDetailModal.content;

		expect(modalPresentation).toMatchObject({
			header: {
				title: "Transportlag",
				trailBack: {
					targetGlossaryEntryKey: "public-key",
					onActivate: expect.any(Function)
				}
			},
			network: {
				display: {
					kind: "content",
					model: {
						nodes: [{ glossaryEntryKey: "packet", onActivate: expect.any(Function) }]
					},
					detailGraph: {
						nodes: [{ glossaryEntryKey: "packet", onActivate: expect.any(Function) }]
					}
				}
			},
			relations: {
				display: {
					items: expect.arrayContaining([
						expect.objectContaining({ glossaryEntryKey: "public-key", onActivate: expect.any(Function) })
					])
				}
			},
			associations: {
				items: expect.arrayContaining([
					expect.objectContaining({ glossaryEntryKey: "public-key", onActivate: expect.any(Function) })
				])
			},
			navigation: {
				previous: expect.objectContaining({ onActivate: expect.any(Function) }),
				next: expect.objectContaining({ onActivate: expect.any(Function) })
			}
		});

		clearStateSetterCalls();
		modalPresentation.network.display.model.nodes[0].onActivate();
		expect(setAreGlossaryDetailRelationsExpanded).toHaveBeenCalledWith(false);
		expect(setGlossaryDetailTrailKeys).toHaveBeenCalledWith(expect.any(Function));
		expect(setExpandedGlossaryEntryKey).toHaveBeenCalledWith("packet");
		expect(setGlossarySearchTerm).not.toHaveBeenCalled();
		expect(setSelectedTopicAreaKeys).not.toHaveBeenCalled();
		expect(setSearchNarrowedGlossaryEntryKey).not.toHaveBeenCalled();
		expect(setGlossaryTableSort).not.toHaveBeenCalled();

		clearStateSetterCalls();
		const publicKeyRelation = modalPresentation.relations.display.items.find((item) => item.glossaryEntryKey === "public-key");
		publicKeyRelation.onActivate();
		expect(setAreGlossaryDetailRelationsExpanded).toHaveBeenCalledWith(false);
		expect(setGlossaryDetailTrailKeys).toHaveBeenCalledWith(expect.any(Function));
		expect(setExpandedGlossaryEntryKey).toHaveBeenCalledWith("public-key");

		clearStateSetterCalls();
		const publicKeyAssociation = modalPresentation.associations.items.find((item) => item.glossaryEntryKey === "public-key");
		publicKeyAssociation.onActivate();
		expect(setGlossaryDetailTrailKeys).toHaveBeenCalledWith(expect.any(Function));
		expect(setExpandedGlossaryEntryKey).toHaveBeenCalledWith("public-key");

		clearStateSetterCalls();
		modalPresentation.header.trailBack.onActivate();
		expect(setGlossaryDetailTrailKeys).toHaveBeenCalledWith(expect.any(Function));
		expect(setExpandedGlossaryEntryKey).toHaveBeenCalledWith("public-key");

		clearStateSetterCalls();
		modalPresentation.navigation.next.onActivate();
		expect(setGlossaryDetailTrailKeys).toHaveBeenCalledWith([]);
		expect(setExpandedGlossaryEntryKey).toHaveBeenCalledWith("packet");
	});

	test("binds relation disclosure to ViewModel-owned expansion state", () => {
		const extraEntries = [
			{
				glossaryEntryKey: "neighbor-four",
				topicAreaKey: "networking",
				term: { no: "Nabo fire", en: "Neighbor four" },
				explanation: { no: "Fire.", en: "Four." },
				position: 3,
				directNeighborCount: 1,
				directNeighborGlossaryKeys: ["transport-layer"],
				mastery: null
			},
			{
				glossaryEntryKey: "neighbor-five",
				topicAreaKey: "networking",
				term: { no: "Nabo fem", en: "Neighbor five" },
				explanation: { no: "Fem.", en: "Five." },
				position: 4,
				directNeighborCount: 1,
				directNeighborGlossaryKeys: ["transport-layer"],
				mastery: null
			}
		];
		const neighborKeys = ["packet", "public-key", "asymmetric-key", "neighbor-four", "neighbor-five"];
		const center = {
			...glossaryEntries[0],
			directNeighborCount: neighborKeys.length,
			directNeighborGlossaryKeys: neighborKeys
		};
		const loadedGlossaryEntries = [center, ...glossaryEntries.slice(1), ...extraEntries];
		const entryByKey = new Map(loadedGlossaryEntries.map((entry) => [entry.glossaryEntryKey, entry]));
		const directRelations = neighborKeys.map((targetGlossaryKey) => ({
			subjectId: "in2120",
			sourceGlossaryKey: "transport-layer",
			targetGlossaryKey,
			type: "related"
		}));
		const { viewModel } = createViewModel({
			expandedGlossaryEntryKey: "transport-layer",
			loadedGlossaryEntries,
			loadedNetwork: {
				subjectId: "in2120",
				center,
				nodes: neighborKeys.map((glossaryEntryKey) => entryByKey.get(glossaryEntryKey)),
				relations: [],
				directRelations,
				limit: 8,
				depth: 1
			}
		});

		const toggle = viewModel.glossaryDetailModal.content.relations.display.toggle;
		expect(toggle).toMatchObject({
			isExpanded: false,
			label: "Vis alle 5 relasjoner",
			onActivate: expect.any(Function)
		});

		clearStateSetterCalls();
		toggle.onActivate();
		expect(setAreGlossaryDetailRelationsExpanded).toHaveBeenCalledWith(expect.any(Function));
		const updateExpanded = setAreGlossaryDetailRelationsExpanded.mock.calls[0][0];
		expect(updateExpanded(false)).toBe(true);
		expect(updateExpanded(true)).toBe(false);
	});

	test("owns mobile chapter-sheet open state in GlossaryPageViewModel", () => {
		const { viewModel } = createViewModel({ isMobileChapterSheetOpen: true });

		expect(viewModel.isMobileChapterSheetOpen).toBe(true);
		expect(viewModel.mobileChapterSheetSearchKeyboardHint).toBe("Bruk piltastene");

		clearStateSetterCalls();
		viewModel.changeMobileChapterSheetOpen(false);
		expect(setIsMobileChapterSheetOpen).toHaveBeenCalledWith(false);
	});

	test("keeps table rows independent of network presentation state", () => {
		const { viewModel } = createViewModel({ expandedGlossaryEntryKey: "transport-layer" });

		for (const row of viewModel.glossaryTableRows) {
			expect(row).not.toHaveProperty("details");
		}
		expect(viewModel.glossaryMobileDetailPresentation).not.toBeNull();
	});

	test("does not expose system mastery as glossary table-row presentation", () => {
		const { viewModel } = createViewModel();
		const transportLayer = viewModel.glossaryTableRows.find((row) => row.glossaryEntryKey === "transport-layer");

		expect(transportLayer).not.toHaveProperty("mastery");
	});

	test("loads a typed concept network only for the selected stable glossary key", async () => {
		const loadedNetwork = {
			subjectId: "in2120",
			center: glossaryEntries[0],
			nodes: [glossaryEntries[2]],
			relations: [{
				subjectId: "in2120",
				sourceGlossaryKey: "packet",
				targetGlossaryKey: "transport-layer",
				type: "prerequisite",
				role: "DIRECT"
			}],
			directRelations: [
				{
					subjectId: "in2120",
					sourceGlossaryKey: "packet",
					targetGlossaryKey: "transport-layer",
					type: "prerequisite"
				},
				{
					subjectId: "in2120",
					sourceGlossaryKey: "transport-layer",
					targetGlossaryKey: "public-key",
					type: "related"
				}
			],
			limit: 8,
			depth: 1
		};
		const { getGlossaryNetworkUseCase, viewModel } = createViewModel({
			expandedGlossaryEntryKey: "transport-layer",
			loadedNetwork
		});

		await useLoadModel.mock.calls[2][0].execute();

		expect(getGlossaryNetworkUseCase.execute).toHaveBeenCalledWith({
			subjectId: "in2120",
			glossaryEntryKey: "transport-layer"
		});
		expect(viewModel.glossaryMobileDetailPresentation.network.display).toMatchObject({
			kind: "content",
			model: {
				center: { term: "Transportlag" },
				nodes: [{ term: "Pakke", onActivate: expect.any(Function) }]
			}
		});
		expect(viewModel.glossaryMobileDetailPresentation.network.display.model.edges[0]).toMatchObject({
			relationType: "prerequisite",
			isDirectional: true,
			edgeRole: "DIRECT"
		});
		expect(viewModel.glossaryMobileDetailPresentation.network.display.model.relationItems[0]).toEqual({
			key: "packet:prerequisite:transport-layer",
			sourceTerm: "Pakke",
			label: "Forutsetning",
			targetTerm: "Transportlag"
		});

		viewModel.selectGlossaryNetworkConcept("packet");
		expect(setGlossarySearchTerm).toHaveBeenCalledWith("");
		expect(setSearchKeyboardIndex).toHaveBeenCalledWith(-1);
		expect(setIsSearchFilterOptionsOpen).toHaveBeenCalledWith(false);
		expect(setIsSearchAutocompleteOpen).toHaveBeenCalledWith(false);
		expect(setSelectedTopicAreaKeys).toHaveBeenCalledWith(expect.any(Function));
		expect(setSelectedTopicAreaKeys.mock.calls.at(-1)[0](new Set(["cryptography"]))).toEqual(new Set(["cryptography", "networking"]));
		expect(setSearchNarrowedGlossaryEntryKey).toHaveBeenCalledWith(null);
		expect(setExpandedGlossaryEntryKey).toHaveBeenCalledWith("packet");
	});

	test("exposes the shared load-status and content-navigation contracts", () => {
		const { backContract, onSelectContentType, viewModel } = createViewModel({
			glossaryStatus: LOAD_STATUS.ERROR,
			glossaryError: "Prøv igjen."
		});

		expect(viewModel).toMatchObject({
			workspaceState: {
				kind: WORKSPACE_STATE_KINDS.ERROR,
				title: "Kunne ikke laste",
				body: "Prøv igjen.",
				action: null
			},
			shouldShowWorkspaceFooter: false,
			backContract,
			search: {
				onChangeTerm: expect.any(Function),
				onFocus: expect.any(Function),
				onRequestClose: expect.any(Function),
				onSelectFilterOption: expect.any(Function),
				onSelectSuggestion: expect.any(Function)
			},
			selectTopicArea: expect.any(Function),
			selectContentType: expect.any(Function)
		});

		viewModel.selectContentType(LEARNING_CONTENT_TYPES.EXAMS);
		expect(onSelectContentType).toHaveBeenCalledWith(LEARNING_CONTENT_TYPES.EXAMS);
	});
});

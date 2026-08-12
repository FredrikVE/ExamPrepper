//test/ui/GlossaryPageViewModel.test.js
import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import { ALL_TOPIC_AREAS } from "../../src/model/domain/utils/topicAreaFilters.js";
import { LEARNING_CONTENT_TYPES, TEST_TYPES } from "../../src/navigation/navigation.js";
import { PRESENTATION_MODE } from "../../src/ui/presentation/presentationMode.js";
import { GLOSSARY_AUTOCOMPLETE_LIST_ID, createGlossaryAutocompleteOptionId } from "../../src/ui/viewmodel/GlossaryPage/glossarySearchModel.js";
import { LOAD_STATUS } from "../../src/ui/viewmodel/LoadState/loadStatus.js";
import { WORKSPACE_STATE_KINDS } from "../../src/ui/viewmodel/WorkspaceState/workspaceStateKinds.js";

const stateValues = [];
const stateSetters = [];
let loadModelQueue = [];

const useState = jest.fn((initialValue) => {
	const stateIndex = stateSetters.length;
	const fallbackValue = typeof initialValue === "function" ? initialValue() : initialValue;
	const value = stateIndex in stateValues ? stateValues[stateIndex] : fallbackValue;
	const setter = jest.fn();

	stateSetters.push(setter);

	return [value, setter];
});

const useEffect = jest.fn((effect) => effect());
const useMemo = jest.fn((factory) => factory());
const useCallback = jest.fn((callback) => callback);
const useRef = jest.fn((initialValue) => ({ current: initialValue }));
const useLoadModel = jest.fn(() => loadModelQueue.shift());
const usePresentationMode = jest.fn(() => PRESENTATION_MODE.DESKTOP);

jest.unstable_mockModule("react", () => ({
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState
}));

jest.unstable_mockModule("../../src/ui/viewmodel/LoadState/useLoadModel.js", () => ({
	default: useLoadModel
}));

jest.unstable_mockModule("../../src/ui/presentation/usePresentationMode.js", () => ({
	default: usePresentationMode
}));

const { default: useGlossaryPageViewModel, resolveMobileGlossaryDetailEntryKey } = await import(
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
	glossaryPageImportanceColumnHeader: "Viktighet",
	glossaryPageTableSortAscendingLabel: (label) => `Sorter ${label} stigende`,
	glossaryPageTableSortDescendingLabel: (label) => `Sorter ${label} synkende`,
	glossaryPageConnectionsColumnHeader: "Koblinger",
	glossaryPageMasteryColumnHeader: "Mestring",
	glossaryPageOpenNetworkLabel: "Vis nettverk",
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
	glossaryPageDetailSubtitle: (chapterReference, chapterLabel, associationLabel) => `${chapterReference} · ${chapterLabel} · ${associationLabel}`,
	glossaryPageDetailCloseLabel: "Lukk detaljvisningen",
	glossaryPageDetailExplanationHeading: "Forklaring",
	glossaryPageDetailNetworkHeading: "Plass i pensum",
	glossaryPageDetailNavigationAriaLabel: "Naviger mellom begreper",
	glossaryPageNetworkInlineTitle: "Sammenhengsgraf",
	glossaryPageNetworkInlineInstructions: "Valgt begrep står i sentrum.",
	glossaryPageNetworkCenterLabel: "Valgt begrep",
	glossaryPageNetworkEmptyLabel: "Ingen koblinger.",
	glossaryPageNetworkLoadingLabel: "Laster sammenhengsgraf …",
	glossaryPageNetworkDirectAssociationLabel: "Direkte assosiasjon",
	glossaryPageNetworkSecondaryAssociationLabel: "Kobling mellom relaterte begreper",
	glossaryPageNetworkLimitLabel: (count) => `${count} ekstra`,
	glossaryPageNetworkTitle: "Fagnettverk",
	glossaryPageNetworkInstructions: "Velg nabo",
	glossaryPageNetworkCloseLabel: "Lukk nettverk",
	glossaryPageNetworkErrorMessage: "Kunne ikke laste fagnettverket.",
	glossaryPageMasteryNotAssessedLabel: "Ikke vurdert",
	glossaryPageMasteryPracticeLabel: "Øve mer",
	glossaryPageMasteryProgressLabel: "Underveis",
	glossaryPageMasteryUnderstoodLabel: "Forstått",
	glossaryPageMasteryNoScoreLabel: "Ingen score",
	glossaryPageMasteryScoreLabel: (scorePercent) => `${scorePercent}%`,
	glossaryPageMasteryCorrectIncorrectLabel: (correctCount, incorrectCount) => `${correctCount} riktig · ${incorrectCount} galt`,
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

function createViewModel({
	searchTerm = "",
	selectedTopicAreaKeys = null,
	keyboardIndex = -1,
	isSearchFilterOptionsOpen = false,
	isSearchAutocompleteOpen = false,
	selectedGlossaryEntryKey = null,
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
	presentationMode = PRESENTATION_MODE.DESKTOP
} = {}) {
	stateValues.push(searchTerm, selectedTopicAreaKeys, keyboardIndex, isSearchFilterOptionsOpen, isSearchAutocompleteOpen, selectedGlossaryEntryKey, expandedGlossaryEntryKey, tableSort, isMobileChapterSheetOpen, glossaryDetailTrailKeys, glossaryDetailRenderSnapshot);
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
	const formatDate = jest.fn(() => "10.08.2026");
	usePresentationMode.mockReturnValue(presentationMode);
	const viewModel = useGlossaryPageViewModel({
		getGlossaryOverviewUseCase,
		getGlossaryNetworkUseCase,
		getTopicAreasUseCase,
		subjectId,
		selectedSubject,
		initialTopicAreaKey,
		language,
		formatDate,
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
	stateValues.length = 0;
	stateSetters.length = 0;
	loadModelQueue = [];
	useState.mockClear();
	useEffect.mockClear();
	useMemo.mockClear();
	useCallback.mockClear();
	useRef.mockClear();
	useLoadModel.mockClear();
	usePresentationMode.mockReset();
	usePresentationMode.mockReturnValue(PRESENTATION_MODE.DESKTOP);
});

describe("useGlossaryPageViewModel", () => {
	test("owns glossary UI state and React refs in the page ViewModel", () => {
		createViewModel();

		expect(useState).toHaveBeenCalledTimes(11);
		expect(useState).toHaveBeenNthCalledWith(1, "");
		expect(useState).toHaveBeenNthCalledWith(2, null);
		expect(useState).toHaveBeenNthCalledWith(3, -1);
		expect(useState).toHaveBeenNthCalledWith(4, false);
		expect(useState).toHaveBeenNthCalledWith(5, false);
		expect(useState).toHaveBeenNthCalledWith(6, null);
		expect(useState).toHaveBeenNthCalledWith(7, null);
		expect(useState).toHaveBeenNthCalledWith(8, { key: "DIRECT_NEIGHBOR_COUNT", direction: "DESCENDING" });
		expect(useState).toHaveBeenNthCalledWith(9, false);
		expect(useState).toHaveBeenNthCalledWith(10, []);
		expect(useState).toHaveBeenNthCalledWith(11, null);
		expect(useRef).toHaveBeenCalledTimes(7);
		expect(useRef).toHaveBeenNthCalledWith(3, null);
		expect(useRef).toHaveBeenNthCalledWith(4, null);
		expect(useRef).toHaveBeenNthCalledWith(5, PRESENTATION_MODE.DESKTOP);
		expect(useRef).toHaveBeenNthCalledWith(6, null);
		expect(useRef).toHaveBeenNthCalledWith(7, expect.any(Map));
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

		expect(viewModel.chapterFilterValue).toBe(ALL_TOPIC_AREAS);
		expect(viewModel.chapterFilterLabel).toBe("Alle kapitler");
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

		expect(viewModel).toMatchObject({
			isSearching: true,
			isSearchAutocompleteActive: true,
			isSearchPopupOpen: true,
			autocompleteListId: GLOSSARY_AUTOCOMPLETE_LIST_ID
		});
		expect(viewModel).not.toHaveProperty("searchSummaryLabel");
		expect(viewModel.autocompleteSuggestions).toEqual([
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
		expect(viewModel.searchActiveDescendantId).toBe(createGlossaryAutocompleteOptionId("packet"));
		expect(viewModel.glossaryTableRows.map((row) => row.glossaryEntryKey)).toEqual([
			"transport-layer",
			"packet"
		]);
	});

	test("shows only a committed autocomplete result after selection", () => {
		const { viewModel } = createViewModel({
			searchTerm: "Pakke",
			selectedTopicAreaKeys: new Set(["networking"]),
			selectedGlossaryEntryKey: "packet"
		});

		expect(viewModel.glossaryTableRows.map((row) => row.glossaryEntryKey)).toEqual(["packet"]);
	});

	test("keeps autocomplete closed for an empty normalized search term", () => {
		const { viewModel } = createViewModel({
			searchTerm: "   ",
			isSearchAutocompleteOpen: true
		});

		expect(viewModel.autocompleteSuggestions).toEqual([]);
		expect(viewModel.isSearchAutocompleteActive).toBe(false);
		expect(viewModel.isSearchPopupOpen).toBe(false);
		expect(viewModel.searchActiveDescendantId).toBeNull();
	});

	test("exposes chapters as the only filter options", () => {
		const { viewModel } = createViewModel({
			selectedTopicAreaKeys: new Set(["cryptography"]),
			isSearchFilterOptionsOpen: true
		});

		expect(viewModel.chapterFilterOptions).toEqual([
			{ id: ALL_TOPIC_AREAS, value: ALL_TOPIC_AREAS, label: "Alle kapitler" },
			{ id: "networking", value: "networking", label: "Nettverk" },
			{ id: "cryptography", value: "cryptography", label: "Kryptografi" }
		]);
		expect(viewModel).toMatchObject({
			chapterFilterValue: "cryptography",
			chapterFilterLabel: "Kryptografi",
			isSearchPopupOpen: true,
			isSearchFilterOptionsOpen: true
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

		viewModel.selectGlossaryChapterFilter("cryptography");

		expectSetContents(stateSetters[1].mock.calls[0][0], ["cryptography"]);
		expect(stateSetters[2]).toHaveBeenCalledWith(0);
		expect(stateSetters[3]).toHaveBeenCalledWith(false);
		expect(stateSetters[4]).toHaveBeenCalledWith(true);
		expect(stateSetters[5]).toHaveBeenCalledWith(null);
	});

	test("the all-chapters filter restores the complete chapter set", () => {
		const { viewModel } = createViewModel({ selectedTopicAreaKeys: new Set(["cryptography"]) });
		clearStateSetterCalls();

		viewModel.selectGlossaryChapterFilter(ALL_TOPIC_AREAS);

		expectSetContents(stateSetters[1].mock.calls[0][0], ["networking", "cryptography"]);
	});

	test("typing, focus, clear and popup close keep search and popup state separate", () => {
		const { viewModel } = createViewModel({ searchTerm: "pak" });
		clearStateSetterCalls();

		viewModel.changeGlossarySearchTerm("  nøk  ");
		expect(stateSetters[0]).toHaveBeenCalledWith("  nøk  ");
		expect(stateSetters[5]).toHaveBeenCalledWith(null);
		expect(stateSetters[2]).toHaveBeenCalledWith(0);
		expect(stateSetters[3]).toHaveBeenCalledWith(false);
		expect(stateSetters[4]).toHaveBeenCalledWith(true);

		clearStateSetterCalls();
		viewModel.focusGlossarySearch();
		expect(stateSetters[3]).toHaveBeenCalledWith(false);
		expect(stateSetters[4]).toHaveBeenCalledWith(true);

		clearStateSetterCalls();
		viewModel.closeGlossarySearchPopup();
		expect(stateSetters[0]).not.toHaveBeenCalled();
		expect(stateSetters[2]).toHaveBeenCalledWith(-1);
		expect(stateSetters[3]).toHaveBeenCalledWith(false);
		expect(stateSetters[4]).toHaveBeenCalledWith(false);

		clearStateSetterCalls();
		viewModel.clearGlossarySearch();
		expect(stateSetters[0]).toHaveBeenCalledWith("");
		expect(stateSetters[5]).toHaveBeenCalledWith(null);
		expect(stateSetters[4]).toHaveBeenCalledWith(false);
	});

	test("keyboard navigation wraps through autocomplete suggestions", () => {
		const { viewModel } = createViewModel({
			searchTerm: "nøk",
			keyboardIndex: 0,
			isSearchAutocompleteOpen: true
		});
		clearStateSetterCalls();

		viewModel.moveSearchSelectionDown();
		expect(stateSetters[2].mock.calls[0][0](0)).toBe(1);
		expect(stateSetters[2].mock.calls[0][0](1)).toBe(0);

		clearStateSetterCalls();
		viewModel.moveSearchSelectionUp();
		expect(stateSetters[2].mock.calls[0][0](0)).toBe(1);
	});

	test("selecting an autocomplete suggestion selects its chapter and closes the popup", () => {
		const { viewModel } = createViewModel({
			searchTerm: "pak",
			keyboardIndex: 0,
			isSearchAutocompleteOpen: true
		});
		clearStateSetterCalls();

		viewModel.openSearchKeyboardSelection();

		expect(stateSetters[0]).toHaveBeenCalledWith("Pakke");
		expect(stateSetters[5]).toHaveBeenCalledWith("packet");
		expectSetContents(stateSetters[1].mock.calls[0][0], ["networking"]);
		expect(stateSetters[2]).toHaveBeenCalledWith(-1);
		expect(stateSetters[4]).toHaveBeenCalledWith(false);
	});

	test("chapter navigation remains a separate multi-select interaction", () => {
		const selectedKeys = new Set(["cryptography"]);
		const { viewModel } = createViewModel({ selectedTopicAreaKeys: selectedKeys });
		clearStateSetterCalls();

		viewModel.selectTopicArea("networking");
		const updateSelection = stateSetters[1].mock.calls[0][0];
		expectSetContents(updateSelection(selectedKeys), ["cryptography", "networking"]);
		expectSetContents(selectedKeys, ["cryptography"]);
		expect(stateSetters[5]).toHaveBeenCalledWith(null);
	});

	test("resets the complete search contract when the subject changes", () => {
		createViewModel({
			searchTerm: "nøkkel",
			selectedTopicAreaKeys: new Set(["networking"]),
			keyboardIndex: 1,
			isSearchFilterOptionsOpen: true,
			isSearchAutocompleteOpen: true,
			selectedGlossaryEntryKey: "packet"
		});

		expect(stateSetters[0]).toHaveBeenCalledWith("");
		expect(stateSetters[1]).toHaveBeenCalledWith(null);
		expect(stateSetters[2]).toHaveBeenCalledWith(-1);
		expect(stateSetters[3]).toHaveBeenCalledWith(false);
		expect(stateSetters[4]).toHaveBeenCalledWith(false);
		expect(stateSetters[5]).toHaveBeenCalledWith(null);
		expect(stateSetters[7]).toHaveBeenCalledWith({
			key: "DIRECT_NEIGHBOR_COUNT",
			direction: "DESCENDING"
		});
		expect(stateSetters[9]).toHaveBeenCalledWith([]);
		expect(useRef.mock.results[2].value.current).toBeNull();
		expect(useRef.mock.results[3].value.current).toBeNull();
	});

	test("rebuilds localized rows for a language switch without reloading glossary entries", () => {
		const norwegian = createViewModel({ language: "no" });
		expect(norwegian.viewModel.glossaryTableRows[0].term).toBe("Transportlag");

		stateValues.length = 0;
		stateSetters.length = 0;
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
		expect(viewModel.autocompleteSuggestions).toEqual([]);
		expect(viewModel.glossaryPanelEmptyState).toBeNull();
		expect(viewModel.glossaryTableRows).toHaveLength(glossaryEntries.length);
	});

	test("preserves the direct-neighbor summary in the glossary table model", () => {
		const { viewModel } = createViewModel();
		const transportLayer = viewModel.glossaryTableRows.find((row) => row.glossaryEntryKey === "transport-layer");

		expect(transportLayer).toMatchObject({
			directNeighborCount: 2,
			directNeighborGlossaryKeys: ["packet", "public-key"]
		});
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
		expect(stateSetters[7]).toHaveBeenCalledWith(expect.any(Function));
	});

	test("prepares table header interaction and accessibility in the page ViewModel", () => {
		const { viewModel } = createViewModel({
			tableSort: { key: "TERM", direction: "ASCENDING" }
		});
		const [termHeader, explanationHeader, importanceHeader] = viewModel.glossaryTableHeaders;

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
		expect(importanceHeader).toMatchObject({
			key: "DIRECT_NEIGHBOR_COUNT",
			isSortable: true,
			ariaSort: "none",
			sortIconKind: "UNSORTED"
		});

		clearStateSetterCalls();
		importanceHeader.onActivate();
		expect(stateSetters[7]).toHaveBeenCalledWith(expect.any(Function));
	});

	test("prepares desktop modal activation and existing mobile disclosure mechanics in the page ViewModel", () => {
		const { viewModel } = createViewModel({
			expandedGlossaryEntryKey: "transport-layer",
			loadedNetwork: {
				subjectId: "in2120",
				center: glossaryEntries[0],
				nodes: [glossaryEntries[2]],
				relations: [],
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
				className: "glossary-entry-card__importance-toggle",
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
		expect(stateSetters[9]).toHaveBeenCalledWith([]);
		expect(stateSetters[6]).toHaveBeenCalledWith("transport-layer");

		clearStateSetterCalls();
		transportLayer.onActivate({ target: interactiveTarget });
		expect(stateSetters[9]).not.toHaveBeenCalled();
		expect(stateSetters[6]).not.toHaveBeenCalled();

		clearStateSetterCalls();
		transportLayer.detailTrigger.onActivate();
		expect(stateSetters[9]).toHaveBeenCalledWith([]);
		expect(stateSetters[6]).toHaveBeenCalledWith("transport-layer");

		clearStateSetterCalls();
		transportLayer.mobileDisclosure.onKeyDown(escapeEvent);
		expect(escapeEvent.preventDefault).toHaveBeenCalledTimes(1);
		expect(escapeEvent.stopPropagation).toHaveBeenCalledTimes(1);
		expect(stateSetters[6]).toHaveBeenCalledWith(null);

		clearStateSetterCalls();
		const mobileDisclosureEvent = { stopPropagation: jest.fn() };
		transportLayer.mobileDisclosure.onActivate(mobileDisclosureEvent);
		expect(mobileDisclosureEvent.stopPropagation).toHaveBeenCalledTimes(1);
		expect(stateSetters[6]).toHaveBeenCalledWith(expect.any(Function));
	});

	test("opens glossary detail from the table without mutating page context", () => {
		const { viewModel } = createViewModel({
			glossaryDetailTrailKeys: ["public-key"]
		});
		const originRef = useRef.mock.results[2].value;
		const titleFocusRequestRef = useRef.mock.results[3].value;
		clearStateSetterCalls();

		viewModel.openGlossaryDetailFromTable("transport-layer");

		expect(originRef.current).toBe("transport-layer");
		expect(titleFocusRequestRef.current).toBeNull();
		expect(stateSetters[9]).toHaveBeenCalledWith([]);
		expect(stateSetters[6]).toHaveBeenCalledWith("transport-layer");
		expect(stateSetters[0]).not.toHaveBeenCalled();
		expect(stateSetters[1]).not.toHaveBeenCalled();
		expect(stateSetters[5]).not.toHaveBeenCalled();
		expect(stateSetters[7]).not.toHaveBeenCalled();
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
		const titleFocusRequestRef = useRef.mock.results[3].value;
		clearStateSetterCalls();

		viewModel.exploreGlossaryDetailConcept("public-key");

		const updateTrail = stateSetters[9].mock.calls[0][0];
		expect(updateTrail(["packet"])).toEqual(["packet", "transport-layer"]);
		expect(titleFocusRequestRef.current).toBe("public-key");
		expect(stateSetters[6]).toHaveBeenCalledWith("public-key");
		expect(stateSetters[0]).not.toHaveBeenCalled();
		expect(stateSetters[1]).not.toHaveBeenCalled();
		expect(stateSetters[2]).not.toHaveBeenCalled();
		expect(stateSetters[3]).not.toHaveBeenCalled();
		expect(stateSetters[4]).not.toHaveBeenCalled();
		expect(stateSetters[5]).not.toHaveBeenCalled();
		expect(stateSetters[7]).not.toHaveBeenCalled();
	});

	test("rejects exploration without an active detail entry and unknown targets", () => {
		const inactive = createViewModel();
		expect(() => inactive.viewModel.exploreGlossaryDetailConcept("packet"))
			.toThrow("Cannot explore glossary detail without an active detail entry.");

		stateValues.length = 0;
		stateSetters.length = 0;
		useState.mockClear();
		useRef.mockClear();
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

		expect(stateSetters[9]).not.toHaveBeenCalled();
		expect(stateSetters[6]).not.toHaveBeenCalled();
	});

	test("navigates back through the exploration trail and requests title focus", () => {
		const { viewModel } = createViewModel({
			expandedGlossaryEntryKey: "transport-layer",
			glossaryDetailTrailKeys: ["asymmetric-key", "public-key"]
		});
		const titleFocusRequestRef = useRef.mock.results[3].value;
		clearStateSetterCalls();

		viewModel.navigateBackGlossaryDetailTrail();

		const updateTrail = stateSetters[9].mock.calls[0][0];
		expect(updateTrail(["asymmetric-key", "public-key"])).toEqual(["asymmetric-key"]);
		expect(titleFocusRequestRef.current).toBe("public-key");
		expect(stateSetters[6]).toHaveBeenCalledWith("public-key");
	});

	test("keeps trail back inert when no exploration history exists", () => {
		const { viewModel } = createViewModel({
			expandedGlossaryEntryKey: "transport-layer",
			glossaryDetailTrailKeys: []
		});
		clearStateSetterCalls();

		viewModel.navigateBackGlossaryDetailTrail();

		expect(stateSetters[9]).not.toHaveBeenCalled();
		expect(stateSetters[6]).not.toHaveBeenCalled();
	});

	test("navigates previous and next through the current sorted visible table sequence", () => {
		const { viewModel } = createViewModel({
			expandedGlossaryEntryKey: "packet",
			glossaryDetailTrailKeys: ["public-key"],
			tableSort: { key: "TERM", direction: "ASCENDING" }
		});
		const titleFocusRequestRef = useRef.mock.results[3].value;
		clearStateSetterCalls();

		viewModel.openPreviousGlossaryDetail();
		expect(stateSetters[9]).toHaveBeenCalledWith([]);
		expect(stateSetters[6]).toHaveBeenCalledWith("public-key");
		expect(titleFocusRequestRef.current).toBe("public-key");

		clearStateSetterCalls();
		viewModel.openNextGlossaryDetail();
		expect(stateSetters[9]).toHaveBeenCalledWith([]);
		expect(stateSetters[6]).toHaveBeenCalledWith("transport-layer");
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

		expect(stateSetters[9]).not.toHaveBeenCalled();
		expect(stateSetters[6]).not.toHaveBeenCalled();
	});

	test("closes glossary detail while retaining the origin for later focus restoration", () => {
		const { viewModel } = createViewModel({
			expandedGlossaryEntryKey: "transport-layer",
			glossaryDetailTrailKeys: ["packet"]
		});
		const originRef = useRef.mock.results[2].value;
		const titleFocusRequestRef = useRef.mock.results[3].value;
		viewModel.openGlossaryDetailFromTable("transport-layer");
		clearStateSetterCalls();
		titleFocusRequestRef.current = "public-key";

		viewModel.closeGlossaryDetail();

		expect(stateSetters[9]).toHaveBeenCalledWith([]);
		expect(stateSetters[6]).toHaveBeenCalledWith(null);
		expect(titleFocusRequestRef.current).toBeNull();
		expect(originRef.current).toBe("transport-layer");
	});

	test("resolves the mobile detail target from active, origin or no visible fallback", () => {
		expect(resolveMobileGlossaryDetailEntryKey({
			activeGlossaryEntryKey: "packet",
			originGlossaryEntryKey: "transport-layer",
			visibleGlossaryEntryKeys: ["packet", "transport-layer"]
		})).toBe("packet");

		expect(resolveMobileGlossaryDetailEntryKey({
			activeGlossaryEntryKey: "public-key",
			originGlossaryEntryKey: "packet",
			visibleGlossaryEntryKeys: ["packet", "transport-layer"]
		})).toBe("packet");

		expect(resolveMobileGlossaryDetailEntryKey({
			activeGlossaryEntryKey: "public-key",
			originGlossaryEntryKey: "asymmetric-key",
			visibleGlossaryEntryKeys: ["packet", "transport-layer"]
		})).toBeNull();
	});

	test("reconciles an out-of-sequence desktop detail to its visible origin when switching to mobile", () => {
		createViewModel({
			selectedTopicAreaKeys: new Set(["networking"]),
			expandedGlossaryEntryKey: "public-key",
			glossaryDetailTrailKeys: ["transport-layer"],
			presentationMode: PRESENTATION_MODE.MOBILE
		});
		const originRef = useRef.mock.results[2].value;
		const titleFocusRequestRef = useRef.mock.results[3].value;
		const previousPresentationModeRef = useRef.mock.results[4].value;
		originRef.current = "packet";
		titleFocusRequestRef.current = "public-key";
		previousPresentationModeRef.current = PRESENTATION_MODE.DESKTOP;
		clearStateSetterCalls();

		const responsiveEffect = useEffect.mock.calls[3][0];
		responsiveEffect();

		expect(stateSetters[9]).toHaveBeenCalledWith([]);
		expect(stateSetters[6]).toHaveBeenCalledWith("packet");
		expect(titleFocusRequestRef.current).toBeNull();
		expect(originRef.current).toBeNull();
	});

	test("keeps a visible active detail through desktop to mobile and closes when no visible fallback exists", () => {
		createViewModel({
			selectedTopicAreaKeys: new Set(["networking"]),
			expandedGlossaryEntryKey: "packet",
			presentationMode: PRESENTATION_MODE.MOBILE
		});
		useRef.mock.results[4].value.current = PRESENTATION_MODE.DESKTOP;
		clearStateSetterCalls();
		useEffect.mock.calls[3][0]();
		expect(stateSetters[9]).toHaveBeenCalledWith([]);
		expect(stateSetters[6]).not.toHaveBeenCalled();

		stateValues.length = 0;
		stateSetters.length = 0;
		useState.mockClear();
		useRef.mockClear();
		useEffect.mockClear();
		createViewModel({
			selectedTopicAreaKeys: new Set(["networking"]),
			expandedGlossaryEntryKey: "public-key",
			presentationMode: PRESENTATION_MODE.MOBILE
		});
		useRef.mock.results[2].value.current = "asymmetric-key";
		useRef.mock.results[4].value.current = PRESENTATION_MODE.DESKTOP;
		clearStateSetterCalls();
		useEffect.mock.calls[3][0]();
		expect(stateSetters[6]).toHaveBeenCalledWith(null);
		expect(stateSetters[9]).toHaveBeenCalledWith([]);
	});

	test("opens the corresponding desktop detail from mobile state without resetting the active key", () => {
		const { viewModel } = createViewModel({
			expandedGlossaryEntryKey: "packet",
			glossaryDetailTrailKeys: ["transport-layer"],
			presentationMode: PRESENTATION_MODE.DESKTOP
		});
		const originRef = useRef.mock.results[2].value;
		const previousPresentationModeRef = useRef.mock.results[4].value;
		previousPresentationModeRef.current = PRESENTATION_MODE.MOBILE;
		clearStateSetterCalls();

		useEffect.mock.calls[3][0]();

		expect(viewModel.presentationMode).toBe(PRESENTATION_MODE.DESKTOP);
		expect(viewModel.isGlossaryDetailModalOpen).toBe(true);
		expect(stateSetters[9]).toHaveBeenCalledWith([]);
		expect(stateSetters[6]).not.toHaveBeenCalled();
		expect(originRef.current).toBe("packet");
	});

	test("derives modal open state from desktop presentation mode and the active detail key", () => {
		const desktop = createViewModel({
			expandedGlossaryEntryKey: "packet",
			presentationMode: PRESENTATION_MODE.DESKTOP
		});
		expect(desktop.viewModel.isGlossaryDetailModalOpen).toBe(true);

		stateValues.length = 0;
		stateSetters.length = 0;
		useState.mockClear();
		useRef.mockClear();
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
		const titleElementRef = useRef.mock.results[5].value;
		const triggerElementByKeyRef = useRef.mock.results[6].value;
		const triggerElement = { focus: jest.fn() };

		viewModel.openGlossaryDetailFromTable("transport-layer");
		viewModel.registerGlossaryDetailTriggerElement("transport-layer", triggerElement);

		expect(triggerElementByKeyRef.current.get("transport-layer")).toBe(triggerElement);
		expect(viewModel.glossaryDetailPresentation.header.titleRef).toBe(titleElementRef);
		expect(viewModel.glossaryDetailModal).toMatchObject({
			isOpen: true,
			content: viewModel.glossaryDetailPresentation,
			initialFocus: titleElementRef,
			finalFocus: expect.any(Function),
			onOpenChange: expect.any(Function),
			onOpenChangeComplete: expect.any(Function)
		});
		expect(viewModel.glossaryDetailModal.finalFocus()).toBe(triggerElement);
	});

	test("keeps disclosure focus and row scrolling mobile-only after the desktop cutover", () => {
		createViewModel({
			expandedGlossaryEntryKey: "transport-layer",
			presentationMode: PRESENTATION_MODE.DESKTOP
		});
		const rowElementByKeyRef = useRef.mock.results[0].value;
		const disclosureElementByKeyRef = useRef.mock.results[1].value;
		const rowElement = { scrollIntoView: jest.fn() };
		const disclosureElement = { focus: jest.fn() };
		rowElementByKeyRef.current.set("transport-layer", rowElement);
		disclosureElementByKeyRef.current.set("transport-layer", disclosureElement);

		const disclosureFocusEffect = useEffect.mock.calls[1][0];
		disclosureFocusEffect();

		expect(disclosureElement.focus).not.toHaveBeenCalled();
		expect(rowElement.scrollIntoView).not.toHaveBeenCalled();
	});

	test("retains disclosure focus and row scrolling for the existing mobile expanded card", () => {
		createViewModel({
			expandedGlossaryEntryKey: "transport-layer",
			presentationMode: PRESENTATION_MODE.MOBILE
		});
		const rowElementByKeyRef = useRef.mock.results[0].value;
		const disclosureElementByKeyRef = useRef.mock.results[1].value;
		const rowElement = { scrollIntoView: jest.fn() };
		const disclosureElement = { focus: jest.fn() };
		rowElementByKeyRef.current.set("transport-layer", rowElement);
		disclosureElementByKeyRef.current.set("transport-layer", disclosureElement);

		const disclosureFocusEffect = useEffect.mock.calls[1][0];
		disclosureFocusEffect();

		expect(disclosureElement.focus).toHaveBeenCalledWith({ preventScroll: true });
		expect(rowElement.scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth", block: "nearest" });
	});

	test("moves focus to the new detail title after internal desktop navigation", () => {
		createViewModel({
			expandedGlossaryEntryKey: "transport-layer",
			presentationMode: PRESENTATION_MODE.DESKTOP
		});
		const titleFocusRequestRef = useRef.mock.results[3].value;
		const titleElementRef = useRef.mock.results[5].value;
		const titleElement = { focus: jest.fn() };
		titleFocusRequestRef.current = "transport-layer";
		titleElementRef.current = titleElement;

		const titleFocusEffect = useEffect.mock.calls[2][0];
		titleFocusEffect();

		expect(titleElement.focus).toHaveBeenCalledWith({ preventScroll: true });
		expect(titleFocusRequestRef.current).toBeNull();
	});

	test("does not restore a desktop trigger when final focus resolves outside desktop mode", () => {
		const { viewModel } = createViewModel({
			expandedGlossaryEntryKey: "transport-layer",
			presentationMode: PRESENTATION_MODE.MOBILE
		});
		const triggerElement = { focus: jest.fn() };
		viewModel.openGlossaryDetailFromTable("transport-layer");
		viewModel.registerGlossaryDetailTriggerElement("transport-layer", triggerElement);

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
		const originRef = useRef.mock.results[2].value;
		viewModel.openGlossaryDetailFromTable("transport-layer");
		clearStateSetterCalls();

		viewModel.glossaryDetailModal.onOpenChange(true);
		expect(stateSetters[6]).not.toHaveBeenCalled();

		viewModel.glossaryDetailModal.onOpenChange(false);
		expect(stateSetters[9]).toHaveBeenCalledWith([]);
		expect(stateSetters[6]).toHaveBeenCalledWith(null);
		expect(originRef.current).toBe("transport-layer");

		viewModel.glossaryDetailModal.onOpenChangeComplete(false);
		expect(originRef.current).toBeNull();
	});

	test("retains the latest open detail presentation as the modal close snapshot", () => {
		const { viewModel } = createViewModel({
			expandedGlossaryEntryKey: "transport-layer",
			presentationMode: PRESENTATION_MODE.DESKTOP
		});

		expect(viewModel.glossaryDetailPresentation.isInteractive).toBe(true);
		expect(stateSetters[10]).toHaveBeenCalledWith(viewModel.glossaryDetailPresentation);
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
		expect(stateSetters[10]).not.toHaveBeenCalledWith(null);

		viewModel.glossaryDetailModal.onOpenChangeComplete(false);
		expect(stateSetters[10]).toHaveBeenCalledWith(null);
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
				limit: 8,
				depth: 1
			}
		});

		expect(viewModel.glossaryDetailPresentation).toMatchObject({
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
					}
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
		viewModel.glossaryDetailPresentation.network.display.model.nodes[0].onActivate();
		expect(stateSetters[9]).toHaveBeenCalledWith(expect.any(Function));
		expect(stateSetters[6]).toHaveBeenCalledWith("packet");
		expect(stateSetters[0]).not.toHaveBeenCalled();
		expect(stateSetters[1]).not.toHaveBeenCalled();
		expect(stateSetters[5]).not.toHaveBeenCalled();
		expect(stateSetters[7]).not.toHaveBeenCalled();

		clearStateSetterCalls();
		const publicKeyAssociation = viewModel.glossaryDetailPresentation.associations.items.find((item) => item.glossaryEntryKey === "public-key");
		publicKeyAssociation.onActivate();
		expect(stateSetters[9]).toHaveBeenCalledWith(expect.any(Function));
		expect(stateSetters[6]).toHaveBeenCalledWith("public-key");

		clearStateSetterCalls();
		viewModel.glossaryDetailPresentation.header.trailBack.onActivate();
		expect(stateSetters[9]).toHaveBeenCalledWith(expect.any(Function));
		expect(stateSetters[6]).toHaveBeenCalledWith("public-key");

		clearStateSetterCalls();
		viewModel.glossaryDetailPresentation.navigation.next.onActivate();
		expect(stateSetters[9]).toHaveBeenCalledWith([]);
		expect(stateSetters[6]).toHaveBeenCalledWith("packet");
	});

	test("owns mobile chapter-sheet open state in GlossaryPageViewModel", () => {
		const { viewModel } = createViewModel({ isMobileChapterSheetOpen: true });

		expect(viewModel.isMobileChapterSheetOpen).toBe(true);
		expect(viewModel.mobileChapterSheetSearchKeyboardHint).toBe("Bruk piltastene");

		clearStateSetterCalls();
		viewModel.changeMobileChapterSheetOpen(false);
		expect(stateSetters[8]).toHaveBeenCalledWith(false);
	});

	test("builds inline detail presentation from overview neighbor keys", () => {
		const { viewModel } = createViewModel({
			expandedGlossaryEntryKey: "transport-layer",
			loadedNetwork: {
				subjectId: "in2120",
				center: glossaryEntries[0],
				nodes: [glossaryEntries[2]],
				relations: [],
				limit: 8,
				depth: 1
			}
		});
		const transportLayer = viewModel.glossaryTableRows.find((row) => row.glossaryEntryKey === "transport-layer");

		expect(transportLayer).toMatchObject({
			isExpanded: true,
			detailsId: "glossary-details-transport-layer",
			directNeighborCount: 2,
			directNeighbors: [
				{ glossaryEntryKey: "packet", term: "Pakke" },
				{ glossaryEntryKey: "public-key", term: "Offentlig nøkkel" }
			],
			details: {
				id: "glossary-details-transport-layer",
				associationsHeading: "Assosiert med",
				network: {
					kind: "content",
					title: "Sammenhengsgraf"
				}
			}
		});
		expect(transportLayer.disclosureLabel).toContain("Skjul 2 assosierte begreper");
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
				type: "prerequisite"
			}],
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
		const transportLayer = viewModel.glossaryTableRows.find((row) => row.glossaryEntryKey === "transport-layer");
		expect(transportLayer.details.network).toMatchObject({
			kind: "content",
			model: {
				center: { term: "Transportlag" },
				nodes: [{ term: "Pakke" }]
			}
		});
		expect(transportLayer.details.network.model.edges[0]).toMatchObject({
			relationType: "prerequisite",
			isDirectional: true,
			edgeRole: "DIRECT"
		});
		expect(transportLayer.details.network.model.relationItems[0]).toEqual({
			key: "packet:prerequisite:transport-layer",
			sourceTerm: "Pakke",
			label: "Forutsetning",
			targetTerm: "Transportlag"
		});

		viewModel.selectGlossaryNetworkConcept("packet");
		expect(stateSetters[0]).toHaveBeenCalledWith("");
		expect(stateSetters[2]).toHaveBeenCalledWith(-1);
		expect(stateSetters[3]).toHaveBeenCalledWith(false);
		expect(stateSetters[4]).toHaveBeenCalledWith(false);
		expect(stateSetters[1]).toHaveBeenCalledWith(expect.any(Function));
		expect(stateSetters[1].mock.calls.at(-1)[0](new Set(["cryptography"]))).toEqual(new Set(["cryptography", "networking"]));
		expect(stateSetters[5]).toHaveBeenCalledWith(null);
		expect(stateSetters[6]).toHaveBeenCalledWith("packet");
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
			changeGlossarySearchTerm: expect.any(Function),
			focusGlossarySearch: expect.any(Function),
			closeGlossarySearchPopup: expect.any(Function),
			selectGlossaryChapterFilter: expect.any(Function),
			selectAutocompleteSuggestion: expect.any(Function),
			selectTopicArea: expect.any(Function),
			selectContentType: expect.any(Function)
		});

		viewModel.selectContentType(LEARNING_CONTENT_TYPES.EXAMS);
		expect(onSelectContentType).toHaveBeenCalledWith(LEARNING_CONTENT_TYPES.EXAMS);
	});
});

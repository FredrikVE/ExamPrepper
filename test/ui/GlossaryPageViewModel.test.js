//test/ui/GlossaryPageViewModel.test.js
import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import { ALL_TOPIC_AREAS } from "../../src/model/domain/utils/topicAreaFilters.js";
import { LEARNING_CONTENT_TYPES, TEST_TYPES } from "../../src/navigation/navigation.js";
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
const useLoadModel = jest.fn(() => loadModelQueue.shift());

jest.unstable_mockModule("react", () => ({
	useCallback,
	useEffect,
	useMemo,
	useState
}));

jest.unstable_mockModule("../../src/ui/viewmodel/LoadState/useLoadModel.js", () => ({
	default: useLoadModel
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
	glossaryPageConnectionsColumnHeader: "Koblinger",
	glossaryPageMasteryColumnHeader: "Mestring",
	glossaryPageOpenNetworkLabel: "Vis nettverk",
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
		mastery: null
	},
	{
		glossaryEntryKey: "packet",
		topicAreaKey: "networking",
		term: { no: "Pakke", en: "Packet" },
		explanation: { no: "En avgrenset enhet med nettverkstrafikk.", en: "A bounded unit of network traffic." },
		position: 1,
		mastery: null
	},
	{
		glossaryEntryKey: "asymmetric-key",
		topicAreaKey: "cryptography",
		term: { no: "Asymmetrisk nøkkel", en: "Asymmetric key" },
		explanation: { no: "Brukes i et nøkkelpar.", en: "Used in a key pair." },
		position: 1,
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
	networkCenterGlossaryEntryKey = null,
	loadedGlossaryEntries = glossaryEntries,
	loadedTopicAreas = topicAreas,
	loadedNetwork = null,
	glossaryStatus = LOAD_STATUS.READY,
	topicAreaStatus = LOAD_STATUS.READY,
	networkStatus = LOAD_STATUS.READY,
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
	expandedMobileToggleButtonGroupId = null
} = {}) {
	stateValues.push(searchTerm, selectedTopicAreaKeys, keyboardIndex, isSearchFilterOptionsOpen, isSearchAutocompleteOpen, selectedGlossaryEntryKey, networkCenterGlossaryEntryKey);
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
			status: networkStatus,
			data: loadedNetwork,
			error: networkStatus === LOAD_STATUS.ERROR ? "Kunne ikke laste fagnettverket." : null,
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
	useLoadModel.mockClear();
});

describe("useGlossaryPageViewModel", () => {
	test("owns term search, chapter selection, keyboard target, filter and autocomplete state", () => {
		createViewModel();

		expect(useState).toHaveBeenCalledTimes(7);
		expect(useState).toHaveBeenNthCalledWith(1, "");
		expect(useState).toHaveBeenNthCalledWith(2, null);
		expect(useState).toHaveBeenNthCalledWith(3, -1);
		expect(useState).toHaveBeenNthCalledWith(4, false);
		expect(useState).toHaveBeenNthCalledWith(5, false);
		expect(useState).toHaveBeenNthCalledWith(6, null);
		expect(useState).toHaveBeenNthCalledWith(7, null);
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

	test("selects all chapters by default and preserves chapter order in the table", () => {
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
			"packet",
			"transport-layer",
			"asymmetric-key",
			"public-key"
		]);
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
			"packet",
			"transport-layer"
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
	});

	test("rebuilds localized rows for a language switch without reloading glossary entries", () => {
		const norwegian = createViewModel({ language: "no" });
		expect(norwegian.viewModel.glossaryTableRows[0].term).toBe("Pakke");

		stateValues.length = 0;
		stateSetters.length = 0;
		useState.mockClear();

		const english = createViewModel({ language: "en" });
		expect(english.viewModel.glossaryTableRows[0].term).toBe("Packet");
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

	test("renders canonical mastery fields in the glossary table model", () => {
		const { viewModel } = createViewModel();
		const transportLayer = viewModel.glossaryTableRows.find((row) => row.glossaryEntryKey === "transport-layer");

		expect(transportLayer.mastery).toEqual({
			status: "progress",
			statusLabel: "Underveis",
			scoreLabel: "75%",
			correctIncorrectLabel: "3 riktig · 1 galt",
			difficultyItems: [
				{ label: "Lett", correctCount: 1, incorrectCount: 0, totalCount: 1 },
				{ label: "Middels", correctCount: 2, incorrectCount: 1, totalCount: 3 },
				{ label: "Vanskelig", correctCount: 0, incorrectCount: 0, totalCount: 0 }
			],
			lastPracticedLabel: "Sist øvd 10.08.2026"
		});
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
			networkCenterGlossaryEntryKey: "transport-layer",
			loadedNetwork
		});

		await useLoadModel.mock.calls[2][0].execute();

		expect(getGlossaryNetworkUseCase.execute).toHaveBeenCalledWith({
			subjectId: "in2120",
			glossaryEntryKey: "transport-layer"
		});
		expect(viewModel.glossaryNetwork.center.term).toBe("Transportlag");
		expect(viewModel.glossaryNetwork.nodes[0].term).toBe("Pakke");
		expect(viewModel.glossaryNetwork.relations[0]).toMatchObject({
			type: "prerequisite",
			label: "Forutsetning",
			isDirectional: true
		});

		viewModel.selectGlossaryNetworkConcept("packet");
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

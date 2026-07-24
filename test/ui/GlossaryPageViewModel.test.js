// test/ui/GlossaryPageViewModel.test.js
import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import { ALL_TOPIC_AREAS } from "../../src/model/domain/utils/topicAreaFilters.js";
import { LEARNING_CONTENT_TYPES } from "../../src/navigation/navigation.js";
import { LOAD_STATUS } from "../../src/ui/viewmodel/LoadState/loadStatus.js";
import { WORKSPACE_STATE_KINDS } from "../../src/ui/viewmodel/WorkspaceState/workspaceStateKinds.js";

const stateValues = [];
const stateSetters = [];
let loadModelQueue = [];

const useState = jest.fn((initialValue) => {
	const stateIndex = stateSetters.length;
	const fallbackValue = typeof initialValue === "function"
		? initialValue()
		: initialValue;
	const value = stateIndex in stateValues
		? stateValues[stateIndex]
		: fallbackValue;
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
const {
	createGlossaryTopicAreaListItems,
	createGlossaryTopicAreaOptionId,
	GLOSSARY_TOPIC_AREA_LIST_ID
} = await import(
	"../../src/ui/viewmodel/GlossaryPage/glossaryTopicAreaListModel.js"
);
const {
	splitTextIntoHighlightSegments
} = await import(
	"../../src/ui/viewmodel/GlossaryPage/glossaryTableModel.js"
);
const {
	GLOSSARY_SEARCH_SCOPES
} = await import(
	"../../src/ui/viewmodel/GlossaryPage/glossarySearchModel.js"
);

const translations = {
	glossaryPageTitle: "Begrepslister",
	glossaryPageSubtitle: (subjectCode) => `Sentrale begreper og definisjoner i ${subjectCode}`,
	glossaryPageSubtitleFallback: "Sentrale begreper og definisjoner",
	glossaryPageSearchLabel: "Søk i begrepslisten",
	glossaryPageSearchAllPlaceholder: "Søk i alt",
	glossaryPageSearchTermsPlaceholder: "Søk i begreper",
	glossaryPageSearchChaptersPlaceholder: "Søk i kapitler",
	glossaryPageSearchScopeAriaLabel: "Avgrens søket",
	glossaryPageSearchScopeAllLabel: "Alt",
	glossaryPageSearchScopeTermsLabel: "Begreper",
	glossaryPageSearchScopeChaptersLabel: "Kapitler",
	glossaryPageSearchClearLabel: "Tøm",
	glossaryPageSearchKeyboardHint: "Bruk piltastene",
	glossaryPageSearchSummary: (chapterCount, matchCount) => `${chapterCount}/${matchCount}`,
	glossaryPageChapterSearchSummary: (chapterCount) => `${chapterCount} kapitler`,
	glossaryPageChapterMatchCount: (matchCount) => `${matchCount} treff`,
	glossaryPageChapterSubtitle: (entryCount) => `${entryCount} begreper`,
	glossaryPageChapterSearchSubtitle: (matchCount) => `${matchCount} søketreff`,
	glossaryPageTermColumnHeader: "Begrep",
	glossaryPageExplanationColumnHeader: "Forklaring",
	glossaryPageSelectAllChaptersLabel: "Velg alle",
	glossaryPageAllChaptersEyebrow: "Standardvisning",
	glossaryPageChapterSelectionEyebrow: "Kapittelutvalg",
	glossaryPageAllChaptersSelectedSummary: (count) => `Alle ${count} kapitler vises`,
	glossaryPageChapterSelectionSummary: (selected, total) => `${selected} av ${total} valgt`,
	glossaryPageAllChaptersHeading: "Alle kapitler",
	glossaryPageSelectedChaptersHeading: (count) => `${count} valgte kapitler`,
	glossaryPageChapterReference: (position) => `Kapittel ${position}`,
	glossaryPageNoTopicAreasTitle: "Ingen kapitler",
	glossaryPageNoTopicAreasBody: "Ingen kapitler finnes.",
	glossaryPageNoEntriesTitle: "Ingen begreper",
	glossaryPageNoEntriesBody: "Ingen begreper finnes.",
	glossaryPageNoEntriesInSelectionTitle: "Ingen begreper i utvalget",
	glossaryPageNoEntriesInSelectionBody: "Velg et annet kapittel.",
	glossaryPageNoSearchResultsTitle: "Ingen treff",
	glossaryPageNoAllSearchResultsBody: (searchTerm) => `Ingen treff i alt for ${searchTerm}.`,
	glossaryPageNoTermSearchResultsBody: (searchTerm) => `Ingen begrepstreff for ${searchTerm}.`,
	glossaryPageNoChapterSearchResultsBody: (searchTerm) => `Ingen kapitteltreff for ${searchTerm}.`,
	glossaryPageMobileChapterSheetTitle: "Velg kapitler",
	glossaryPageMobileChapterSheetSubtitle: "Velg ett eller flere kapitler",
	glossaryPageMobileChapterSheetOpenLabel: "Åpne kapittelvelger",
	glossaryPageMobileChapterSheetCloseLabel: "Lukk kapittelvelger",
	glossaryPageErrorTitle: "Kunne ikke laste",
	glossaryPageErrorMessage: "Prøv igjen.",
	glossaryPageLoadingTitle: "Laster",
	contentToggleAriaLabel: "Velg læringsverktøy",
	contentToggleExamsLabel: "Eksamen",
	contentToggleFlipcardsLabel: "Flipcards",
	contentToggleMatchCardsLabel: "Begrepsmatch",
	contentToggleGlossaryLabel: "Begrepslister",
	pageToolsWorkspaceTitle: "Velg læringsverktøy",
	pageToolsWorkspaceSubtitle: null,
	pageToolsWorkspaceActionsLabel: "Læringsverktøy",
	pageToolsOpenLabel: "Åpne verktøymeny",
	pageToolsCloseLabel: "Lukk verktøymeny",
	pageToolsMobileHandleLabel: "Verktøy",
	pageToolsUnavailableLabel: "Kommer senere",
	pageToolsImportSubjectMaterialsLabel: "Legg inn fagmateriale"
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
		position: 2
	},
	{
		glossaryEntryKey: "public-key",
		topicAreaKey: "cryptography",
		term: { no: "Offentlig nøkkel", en: "Public key" },
		explanation: { no: "Kan deles med andre.", en: "Can be shared with others." },
		position: 2
	},
	{
		glossaryEntryKey: "packet",
		topicAreaKey: "networking",
		term: { no: "Pakke", en: "Packet" },
		explanation: { no: "En avgrenset enhet med nettverkstrafikk.", en: "A bounded unit of network traffic." },
		position: 1
	},
	{
		glossaryEntryKey: "asymmetric-key",
		topicAreaKey: "cryptography",
		term: { no: "Asymmetrisk nøkkel", en: "Asymmetric key" },
		explanation: { no: "Brukes i et nøkkelpar.", en: "Used in a key pair." },
		position: 2
	}
];

function createViewModel({
	searchTerm = "",
	searchScope = GLOSSARY_SEARCH_SCOPES.ALL,
	selectedTopicAreaKeys = null,
	keyboardIndex = -1,
	isSearchFilterOptionsOpen = false,
	loadedGlossaryEntries = glossaryEntries,
	loadedTopicAreas = topicAreas,
	glossaryStatus = LOAD_STATUS.READY,
	topicAreaStatus = LOAD_STATUS.READY,
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
	isActive = true
} = {}) {
	stateValues.push(searchTerm, searchScope, selectedTopicAreaKeys, keyboardIndex, isSearchFilterOptionsOpen);
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
		}
	];

	const getGlossaryEntriesForSubjectUseCase = {
		execute: jest.fn(async () => loadedGlossaryEntries)
	};
	const getTopicAreasUseCase = {
		execute: jest.fn(async () => loadedTopicAreas)
	};
	const onBack = jest.fn();
	const onSelectContentType = jest.fn();
	const backContract = {
		showBackButton: true,
		backLabel: "Tilbake",
		navigationLabel: "Navigasjon",
		onBack
	};

	const viewModel = useGlossaryPageViewModel(
		getGlossaryEntriesForSubjectUseCase,
		getTopicAreasUseCase,
		subjectId,
		selectedSubject,
		initialTopicAreaKey,
		language,
		translations,
		isActive,
		backContract,
		onSelectContentType
	);

	return {
		backContract,
		getGlossaryEntriesForSubjectUseCase,
		getTopicAreasUseCase,
		onBack,
		onSelectContentType,
		viewModel
	};
}

function clearStateSetterCalls() {
	stateSetters.forEach((stateSetter) => stateSetter.mockClear());
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

describe("GlossaryPage presentation models", () => {
	test("returns a localized subtitle with the selected subject code", () => {
		const { viewModel } = createViewModel();

		expect(viewModel.pageSubtitle).toBe(
			"Sentrale begreper og definisjoner i IN2120"
		);
	});

	test("returns the subtitle fallback without a selected subject code", () => {
		const { viewModel } = createViewModel({
			selectedSubject: {
				id: "in2120",
				name: "Informasjonssikkerhet"
			}
		});

		expect(viewModel.pageSubtitle).toBe("Sentrale begreper og definisjoner");
	});

	test("escapes regular-expression characters and returns highlight segments as data", () => {
		expect(splitTextIntoHighlightSegments("C++ og c++", "c++")).toEqual([
			{ text: "C++", isMatch: true },
			{ text: " og ", isMatch: false },
			{ text: "c++", isMatch: true }
		]);
	});

	test("keeps topic-area order and exposes a stable option id", () => {
		const entriesByTopicAreaKey = new Map([
			["networking", glossaryEntries.filter((entry) => entry.topicAreaKey === "networking")],
			["cryptography", glossaryEntries.filter((entry) => entry.topicAreaKey === "cryptography")]
		]);
		const items = createGlossaryTopicAreaListItems({
			topicAreas,
			entriesByTopicAreaKey,
			matchCountsByTopicAreaKey: new Map([
				["networking", 2],
				["cryptography", 2]
			]),
			normalizedSearchTerm: "",
			searchScope: GLOSSARY_SEARCH_SCOPES.TERMS,
			labels: {
				chapterMatchCount: translations.glossaryPageChapterMatchCount,
				chapterReference: translations.glossaryPageChapterReference,
				chapterSubtitle: translations.glossaryPageChapterSubtitle,
				chapterSearchSubtitle: translations.glossaryPageChapterSearchSubtitle
			}
		});

		expect(items.map((item) => item.topicAreaKey)).toEqual([
			"networking",
			"cryptography"
		]);
		expect(items[0].id).toBe(createGlossaryTopicAreaOptionId("networking"));
	});
});

describe("useGlossaryPageViewModel", () => {
	test("owns search scope, chapter selection, keyboard state, and filter visibility", () => {
		createViewModel();

		expect(useState).toHaveBeenCalledTimes(5);
		expect(useState).toHaveBeenNthCalledWith(1, "");
		expect(useState).toHaveBeenNthCalledWith(2, GLOSSARY_SEARCH_SCOPES.ALL);
		expect(useState).toHaveBeenNthCalledWith(3, null);
		expect(useState).toHaveBeenNthCalledWith(4, -1);
		expect(useState).toHaveBeenNthCalledWith(5, false);
	});

	test("does not reuse the learning-content pop-out menu on the glossary page", () => {
		const { viewModel } = createViewModel();

		expect(viewModel.pageTools).toBeNull();
	});

	test("loads all glossary entries once and topic areas for the active language", async () => {
		const {
			getGlossaryEntriesForSubjectUseCase,
			getTopicAreasUseCase
		} = createViewModel();
		const glossaryLoadConfiguration = useLoadModel.mock.calls[0][0];
		const topicAreaLoadConfiguration = useLoadModel.mock.calls[1][0];

		await glossaryLoadConfiguration.execute();
		await topicAreaLoadConfiguration.execute();

		expect(getGlossaryEntriesForSubjectUseCase.execute).toHaveBeenCalledWith({
			subjectId: "in2120",
			topicAreaKey: ALL_TOPIC_AREAS
		});
		expect(getTopicAreasUseCase.execute).toHaveBeenCalledWith({
			subjectId: "in2120",
			language: "no"
		});
	});

	test("does not call use cases while the page is inactive", async () => {
		const {
			getGlossaryEntriesForSubjectUseCase,
			getTopicAreasUseCase
		} = createViewModel({ isActive: false });

		await expect(useLoadModel.mock.calls[0][0].execute()).resolves.toEqual([]);
		await expect(useLoadModel.mock.calls[1][0].execute()).resolves.toEqual([]);
		expect(getGlossaryEntriesForSubjectUseCase.execute).not.toHaveBeenCalled();
		expect(getTopicAreasUseCase.execute).not.toHaveBeenCalled();
	});

	test("selects all chapters by default and preserves topic-area order in the table", () => {
		const { viewModel } = createViewModel();

		expect(viewModel.allTopicAreaListItem).toMatchObject({
			topicAreaKey: ALL_TOPIC_AREAS,
			isSelected: true,
			subtitle: "Alle 2 kapitler vises"
		});
		expect(viewModel.topicAreaListItems.map((item) => item.isSelected)).toEqual([true, true]);
		expect(viewModel.topicAreaListItems.map((item) => item.isActive)).toEqual([false, false]);
		expect(viewModel.glossaryPanelHeading).toEqual({
			title: "Alle kapitler",
			subtitle: "4 begreper"
		});
		expect(viewModel.glossaryTableRows.map((row) => row.glossaryEntryKey)).toEqual([
			"packet",
			"transport-layer",
			"asymmetric-key",
			"public-key"
		]);
		expect(viewModel.glossaryTableRows.map((row) => row.topicAreaReference)).toEqual([
			"Kapittel 2",
			"Kapittel 2",
			"Kapittel 1",
			"Kapittel 1"
		]);
	});

	test("uses a valid initial chapter and falls back to all chapters for an unknown key", () => {
		const selectedViewModel = createViewModel({
			initialTopicAreaKey: "cryptography"
		}).viewModel;

		expect(selectedViewModel.topicAreaListItems.map((item) => item.isSelected)).toEqual([false, true]);
		expect(selectedViewModel.topicAreaListItems.map((item) => item.isActive)).toEqual([false, true]);
		expect(selectedViewModel.glossaryTableRows.map((row) => row.glossaryEntryKey)).toEqual([
			"asymmetric-key",
			"public-key"
		]);

		stateValues.length = 0;
		stateSetters.length = 0;
		useState.mockClear();

		const fallbackViewModel = createViewModel({
			initialTopicAreaKey: "unknown"
		}).viewModel;

		expect(fallbackViewModel.allTopicAreaListItem.isSelected).toBe(true);
	});

	test("filters only the selected chapters and keeps selection independent from search", () => {
		const { viewModel } = createViewModel({
			searchTerm: "trafikk",
			selectedTopicAreaKeys: new Set(["networking"]),
			keyboardIndex: 0
		});

		expect(viewModel).toMatchObject({
			isSearching: true,
			isSearchComboboxActive: true,
			searchSummaryLabel: "1/1",
			topicAreaListId: GLOSSARY_TOPIC_AREA_LIST_ID
		});
		expect(viewModel.searchActiveDescendantId).toBe(viewModel.topicAreaListItems[0].id);
		expect(viewModel.topicAreaListItems[0]).toMatchObject({
			topicAreaKey: "networking",
			matchCount: 1,
			subtitle: "1 søketreff",
			isSelected: true,
			showsSelectionControl: true
		});
		expect(viewModel.glossaryTableRows.map((row) => row.glossaryEntryKey)).toEqual([
			"packet"
		]);
	});

	test("does not activate search mode for a whitespace-only search term", () => {
		const { viewModel } = createViewModel({
			searchTerm: "   ",
			selectedTopicAreaKeys: new Set(["networking"]),
			keyboardIndex: 0
		});

		expect(viewModel).toMatchObject({
			isSearching: false,
			isSearchComboboxActive: false,
			searchActiveDescendantId: null,
			searchSummaryLabel: ""
		});
		expect(viewModel.topicAreaListItems).toHaveLength(topicAreas.length);
		expect(viewModel.topicAreaListItems.every((item) => !item.isKeyboardTarget)).toBe(true);
	});

	test("does not silently replace the chapter selection when search matches another chapter", () => {
		const { viewModel } = createViewModel({
			searchTerm: "offentlig",
			selectedTopicAreaKeys: new Set(["networking"])
		});

		expect(viewModel.topicAreaListItems).toHaveLength(1);
		expect(viewModel.topicAreaListItems[0]).toMatchObject({
			topicAreaKey: "cryptography",
			isSelected: false
		});
		expect(viewModel.glossaryTableRows).toEqual([]);
		expect(viewModel.glossaryPanelEmptyState).toMatchObject({
			kind: "no-search-results"
		});
	});

	test("all search includes chapter matches and shows the complete matching chapter", () => {
		const { viewModel } = createViewModel({
			searchTerm: "kryptografi",
			searchScope: GLOSSARY_SEARCH_SCOPES.ALL,
			selectedTopicAreaKeys: new Set(["cryptography"])
		});

		expect(viewModel.topicAreaListItems[0]).toMatchObject({
			topicAreaKey: "cryptography",
			matchesTopicAreaLabel: true,
			showsAllEntries: true,
			matchCount: 0,
			isSelected: true
		});
		expect(viewModel.searchSummaryLabel).toBe("1/0");
		expect(viewModel.glossaryTableRows.map((row) => row.glossaryEntryKey)).toEqual([
			"asymmetric-key",
			"public-key"
		]);
	});

	test("chapter search matches chapter labels and shows the complete selected chapter", () => {
		const { viewModel } = createViewModel({
			searchTerm: "kryptografi",
			searchScope: GLOSSARY_SEARCH_SCOPES.CHAPTERS,
			selectedTopicAreaKeys: new Set(["cryptography"])
		});

		expect(viewModel.topicAreaListItems[0]).toMatchObject({
			topicAreaKey: "cryptography",
			matchesTopicAreaLabel: true,
			showsAllEntries: true,
			matchCount: 0,
			matchCountLabel: null,
			subtitle: "2 begreper",
			isSelected: true
		});
		expect(viewModel.searchSummaryLabel).toBe("1 kapitler");
		expect(viewModel.glossaryTableRows.map((row) => row.glossaryEntryKey)).toEqual([
			"asymmetric-key",
			"public-key"
		]);
	});

	test("normalizes an empty chapter selection back to all chapters", () => {
		const { viewModel } = createViewModel({
			selectedTopicAreaKeys: new Set()
		});

		expect(viewModel.allTopicAreaListItem.isSelected).toBe(true);
		expect(viewModel.topicAreaListItems.map((item) => item.isSelected)).toEqual([true, true]);
		expect(viewModel.glossaryTableRows).toHaveLength(glossaryEntries.length);
		expect(viewModel.glossaryPanelEmptyState).toBeNull();
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
		},
		{
			name: "search without results",
			loadedTopicAreas: topicAreas,
			loadedGlossaryEntries: glossaryEntries,
			searchTerm: "finnes-ikke",
			expectedWorkspaceState: {
				kind: WORKSPACE_STATE_KINDS.CONTENT
			},
			expectedPanelKind: "no-search-results"
		}
	])("returns the $name empty state", ({
		loadedTopicAreas,
		loadedGlossaryEntries,
		searchTerm = "",
		expectedWorkspaceState,
		expectedPanelKind = null
	}) => {
		const { viewModel } = createViewModel({
			loadedTopicAreas,
			loadedGlossaryEntries,
			searchTerm
		});

		expect(viewModel.workspaceState).toEqual(expectedWorkspaceState);

		if (expectedPanelKind !== null) {
			expect(viewModel.glossaryPanelEmptyState).toMatchObject({
				kind: expectedPanelKind
			});
		}
	});

	test("rebuilds localized rows for a language switch without reloading glossary entries", () => {
		const norwegian = createViewModel({ language: "no" });

		expect(norwegian.viewModel.glossaryTableRows[0].term).toBe("Pakke");
		expect(norwegian.getGlossaryEntriesForSubjectUseCase.execute).not.toHaveBeenCalled();

		stateValues.length = 0;
		stateSetters.length = 0;
		useState.mockClear();

		const english = createViewModel({ language: "en" });

		expect(english.viewModel.glossaryTableRows[0].term).toBe("Packet");
		expect(english.getGlossaryEntriesForSubjectUseCase.execute).not.toHaveBeenCalled();
	});

	test("resets search, scope, chapter selection, keyboard state, and filter visibility when the subject contract changes", () => {
		createViewModel({
			searchTerm: "nøkkel",
			searchScope: GLOSSARY_SEARCH_SCOPES.CHAPTERS,
			selectedTopicAreaKeys: new Set(["networking"]),
			keyboardIndex: 1,
			isSearchFilterOptionsOpen: true,
			initialTopicAreaKey: "cryptography",
			subjectId: "in2120"
		});

		expect(stateSetters[0]).toHaveBeenCalledWith("");
		expect(stateSetters[1]).toHaveBeenCalledWith(GLOSSARY_SEARCH_SCOPES.ALL);
		expect(stateSetters[2]).toHaveBeenCalledWith(null);
		expect(stateSetters[3]).toHaveBeenCalledWith(-1);
		expect(stateSetters[4]).toHaveBeenCalledWith(false);
	});

	test("first chapter selection replaces the all-chapters default", () => {
		const { viewModel } = createViewModel();
		clearStateSetterCalls();

		viewModel.selectTopicArea("cryptography");

		const updateSelection = stateSetters[2].mock.calls[0][0];
		expectSetContents(updateSelection(null), ["cryptography"]);
	});

	test("subsequent chapter selections add and remove keys without mutating the previous Set", () => {
		const selectedKeys = new Set(["cryptography"]);
		const { viewModel } = createViewModel({ selectedTopicAreaKeys: selectedKeys });
		clearStateSetterCalls();

		viewModel.selectTopicArea("networking");
		const addSelection = stateSetters[2].mock.calls[0][0];
		const addedKeys = addSelection(selectedKeys);
		expectSetContents(addedKeys, ["cryptography", "networking"]);
		expectSetContents(selectedKeys, ["cryptography"]);

		clearStateSetterCalls();
		viewModel.selectTopicArea("cryptography");
		const removeSelection = stateSetters[2].mock.calls[0][0];
		expectSetContents(removeSelection(selectedKeys), ["networking", "cryptography"]);
	});

	test("the all-chapters item restores the complete selection", () => {
		const { viewModel } = createViewModel({
			selectedTopicAreaKeys: new Set(["cryptography"])
		});
		clearStateSetterCalls();

		viewModel.selectTopicArea(ALL_TOPIC_AREAS);

		expectSetContents(stateSetters[2].mock.calls[0][0], ["networking", "cryptography"]);
		expect(stateSetters[3]).toHaveBeenCalledWith(-1);
	});

	test("exposes all, term, and chapter search scopes and keeps filter state in the ViewModel", () => {
		const { viewModel } = createViewModel({
			searchTerm: "kryptografi",
			isSearchFilterOptionsOpen: true
		});
		clearStateSetterCalls();

		expect(viewModel.searchScopeOptions).toEqual([
			{ id: GLOSSARY_SEARCH_SCOPES.ALL, value: GLOSSARY_SEARCH_SCOPES.ALL, label: "Alt" },
			{ id: GLOSSARY_SEARCH_SCOPES.TERMS, value: GLOSSARY_SEARCH_SCOPES.TERMS, label: "Begreper" },
			{ id: GLOSSARY_SEARCH_SCOPES.CHAPTERS, value: GLOSSARY_SEARCH_SCOPES.CHAPTERS, label: "Kapitler" }
		]);
		expect(viewModel).toMatchObject({
			glossarySearchScope: GLOSSARY_SEARCH_SCOPES.ALL,
			searchScopeLabel: "Alt",
			searchPlaceholder: "Søk i alt",
			isSearchFilterOptionsOpen: true
		});

		viewModel.selectGlossarySearchScope(GLOSSARY_SEARCH_SCOPES.CHAPTERS);
		expect(stateSetters[1]).toHaveBeenCalledWith(GLOSSARY_SEARCH_SCOPES.CHAPTERS);
		expect(stateSetters[3]).toHaveBeenCalledWith(0);
		expect(stateSetters[4]).toHaveBeenCalledWith(false);

		clearStateSetterCalls();
		viewModel.openGlossarySearchFilterOptions();
		expect(stateSetters[4].mock.calls[0][0](false)).toBe(true);
		expect(stateSetters[4].mock.calls[0][0](true)).toBe(false);

		clearStateSetterCalls();
		viewModel.closeGlossarySearchFilterOptions();
		expect(stateSetters[4]).toHaveBeenCalledWith(false);
	});

	test("exposes named handlers and content navigation without leaking setters", () => {
		const { onSelectContentType, viewModel } = createViewModel({
			searchTerm: "e",
			selectedTopicAreaKeys: new Set(["networking"]),
			keyboardIndex: 0
		});
		clearStateSetterCalls();

		viewModel.changeGlossarySearchTerm("  pakke  ");
		expect(stateSetters[0]).toHaveBeenCalledWith("  pakke  ");
		expect(stateSetters[3]).toHaveBeenCalledWith(0);

		clearStateSetterCalls();
		viewModel.clearGlossarySearch();
		expect(stateSetters[0]).toHaveBeenCalledWith("");
		expect(stateSetters[2]).not.toHaveBeenCalled();
		expect(stateSetters[3]).toHaveBeenCalledWith(-1);

		clearStateSetterCalls();
		viewModel.moveSearchSelectionDown();
		expect(stateSetters[3].mock.calls[0][0](-1)).toBe(0);
		expect(stateSetters[3].mock.calls[0][0](0)).toBe(1);
		expect(stateSetters[3].mock.calls[0][0](1)).toBe(0);

		clearStateSetterCalls();
		viewModel.moveSearchSelectionUp();
		expect(stateSetters[3].mock.calls[0][0](-1)).toBe(1);
		expect(stateSetters[3].mock.calls[0][0](0)).toBe(1);
		expect(stateSetters[3].mock.calls[0][0](1)).toBe(0);

		clearStateSetterCalls();
		viewModel.openSearchKeyboardSelection();
		expect(stateSetters[2]).toHaveBeenCalledWith(expect.any(Function));

		viewModel.selectContentType(LEARNING_CONTENT_TYPES.EXAMS);
		expect(onSelectContentType).toHaveBeenCalledWith(LEARNING_CONTENT_TYPES.EXAMS);

		onSelectContentType.mockClear();
		viewModel.selectContentType(LEARNING_CONTENT_TYPES.GLOSSARY);
		expect(onSelectContentType).not.toHaveBeenCalled();
		expect(viewModel.activeContentType).toBe(LEARNING_CONTENT_TYPES.GLOSSARY);
		expect(viewModel.contentToggleEntries.map((entry) => entry.id)).toEqual([
			LEARNING_CONTENT_TYPES.EXAMS,
			LEARNING_CONTENT_TYPES.FLIPCARDS,
			LEARNING_CONTENT_TYPES.MATCHCARDS,
			LEARNING_CONTENT_TYPES.GLOSSARY
		]);
	});

	test("exposes the shared load-status contract without a page-specific load union", () => {
		const { backContract, viewModel } = createViewModel({
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
			glossaryPanelEmptyState: null,
			backContract,
			changeGlossarySearchTerm: expect.any(Function),
			clearGlossarySearch: expect.any(Function),
			openGlossarySearchFilterOptions: expect.any(Function),
			closeGlossarySearchFilterOptions: expect.any(Function),
			selectGlossarySearchScope: expect.any(Function),
			selectTopicArea: expect.any(Function),
			selectContentType: expect.any(Function)
		});
	});
});

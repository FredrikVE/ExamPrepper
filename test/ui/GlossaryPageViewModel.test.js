// test/ui/GlossaryPageViewModel.test.js
import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import { ALL_TOPIC_AREAS } from "../../src/model/domain/utils/topicAreaFilters.js";
import { LEARNING_CONTENT_TYPES } from "../../src/navigation/learningContent.js";
import { LOAD_STATUS } from "../../src/ui/loadStatus/loadStatus.js";

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

const translations = {
	glossaryPageTitle: "Begrepslister",
	glossaryPageSearchPlaceholder: "Søk",
	glossaryPageSearchClearLabel: "Tøm",
	glossaryPageSearchKeyboardHint: "Bruk piltastene",
	glossaryPageSearchSummary: (chapterCount, matchCount) => `${chapterCount}/${matchCount}`,
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
	glossaryPageNoChaptersSelectedHeading: "Ingen kapitler valgt",
	glossaryPageSelectChaptersPrompt: "Velg ett eller flere kapitler",
	glossaryPageChapterReference: (position) => `Kapittel ${position}`,
	glossaryPageNoTopicAreasTitle: "Ingen kapitler",
	glossaryPageNoTopicAreasBody: "Ingen kapitler finnes.",
	glossaryPageNoEntriesTitle: "Ingen begreper",
	glossaryPageNoEntriesBody: "Ingen begreper finnes.",
	glossaryPageNoSelectedChaptersTitle: "Ingen kapitler valgt",
	glossaryPageNoSelectedChaptersBody: "Velg minst ett kapittel.",
	glossaryPageNoEntriesInSelectionTitle: "Ingen begreper i utvalget",
	glossaryPageNoEntriesInSelectionBody: "Velg et annet kapittel.",
	glossaryPageNoSearchResultsTitle: "Ingen treff",
	glossaryPageNoSearchResultsBody: (searchTerm) => `Ingen treff for ${searchTerm}.`,
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
	contentToggleGlossaryLabel: "Begrepslister"
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
	selectedTopicAreaKeys = null,
	keyboardIndex = -1,
	loadedGlossaryEntries = glossaryEntries,
	loadedTopicAreas = topicAreas,
	glossaryStatus = LOAD_STATUS.READY,
	topicAreaStatus = LOAD_STATUS.READY,
	glossaryError = null,
	topicAreaError = null,
	subjectId = "in2120",
	initialTopicAreaKey = null,
	language = "no",
	isActive = true
} = {}) {
	stateValues.push(searchTerm, selectedTopicAreaKeys, keyboardIndex);
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
			labels: {
				chapterMatchCount: translations.glossaryPageChapterMatchCount,
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
	test("owns only search, selected chapters, and keyboard state", () => {
		createViewModel();

		expect(useState).toHaveBeenCalledTimes(3);
		expect(useState).toHaveBeenNthCalledWith(1, "");
		expect(useState).toHaveBeenNthCalledWith(2, null);
		expect(useState).toHaveBeenNthCalledWith(3, -1);
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

	test("shows a complete selected chapter when its localized name matches", () => {
		const { viewModel } = createViewModel({
			searchTerm: "kryptografi",
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
		expect(viewModel.searchSummaryLabel).toBe("1/0");
		expect(viewModel.glossaryTableRows.map((row) => row.glossaryEntryKey)).toEqual([
			"asymmetric-key",
			"public-key"
		]);
	});

	test("supports an explicit empty chapter selection", () => {
		const { viewModel } = createViewModel({
			selectedTopicAreaKeys: new Set()
		});

		expect(viewModel.allTopicAreaListItem.isSelected).toBe(false);
		expect(viewModel.glossaryTableRows).toEqual([]);
		expect(viewModel.glossaryPanelHeading).toEqual({
			title: "Ingen kapitler valgt",
			subtitle: "Velg ett eller flere kapitler"
		});
		expect(viewModel.glossaryPanelEmptyState).toMatchObject({
			kind: "no-selected-topic-areas"
		});
	});

	test.each([
		{
			name: "no topic areas",
			loadedTopicAreas: [],
			loadedGlossaryEntries: [],
			expectedKind: "no-topic-areas"
		},
		{
			name: "topic areas without glossary entries",
			loadedTopicAreas: topicAreas,
			loadedGlossaryEntries: [],
			expectedKind: "no-glossary-entries"
		},
		{
			name: "search without results",
			loadedTopicAreas: topicAreas,
			loadedGlossaryEntries: glossaryEntries,
			searchTerm: "finnes-ikke",
			expectedKind: "no-search-results"
		}
	])("returns the $name empty state", ({
		loadedTopicAreas,
		loadedGlossaryEntries,
		searchTerm = "",
		expectedKind
	}) => {
		const { viewModel } = createViewModel({
			loadedTopicAreas,
			loadedGlossaryEntries,
			searchTerm
		});

		if (expectedKind === "no-search-results") {
			expect(viewModel.pageEmptyState).toBeNull();
			expect(viewModel.glossaryPanelEmptyState).toMatchObject({ kind: expectedKind });
			return;
		}

		expect(viewModel.pageEmptyState).toMatchObject({ kind: expectedKind });
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

	test("resets search, chapter selection, and keyboard state when the subject contract changes", () => {
		createViewModel({
			searchTerm: "nøkkel",
			selectedTopicAreaKeys: new Set(["networking"]),
			keyboardIndex: 1,
			initialTopicAreaKey: "cryptography",
			subjectId: "in2120"
		});

		expect(stateSetters[0]).toHaveBeenCalledWith("");
		expect(stateSetters[1]).toHaveBeenCalledWith(null);
		expect(stateSetters[2]).toHaveBeenCalledWith(-1);
	});

	test("first chapter selection replaces the all-chapters default", () => {
		const { viewModel } = createViewModel();
		clearStateSetterCalls();

		viewModel.selectTopicArea("cryptography");

		const updateSelection = stateSetters[1].mock.calls[0][0];
		expectSetContents(updateSelection(null), ["cryptography"]);
	});

	test("subsequent chapter selections add and remove keys without mutating the previous Set", () => {
		const selectedKeys = new Set(["cryptography"]);
		const { viewModel } = createViewModel({ selectedTopicAreaKeys: selectedKeys });
		clearStateSetterCalls();

		viewModel.selectTopicArea("networking");
		const addSelection = stateSetters[1].mock.calls[0][0];
		const addedKeys = addSelection(selectedKeys);
		expectSetContents(addedKeys, ["cryptography", "networking"]);
		expectSetContents(selectedKeys, ["cryptography"]);

		clearStateSetterCalls();
		viewModel.selectTopicArea("cryptography");
		const removeSelection = stateSetters[1].mock.calls[0][0];
		expectSetContents(removeSelection(selectedKeys), []);
	});

	test("the all-chapters item restores the complete selection", () => {
		const { viewModel } = createViewModel({
			selectedTopicAreaKeys: new Set(["cryptography"])
		});
		clearStateSetterCalls();

		viewModel.selectTopicArea(ALL_TOPIC_AREAS);

		expectSetContents(stateSetters[1].mock.calls[0][0], ["networking", "cryptography"]);
		expect(stateSetters[2]).toHaveBeenCalledWith(-1);
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
		expect(stateSetters[2]).toHaveBeenCalledWith(0);

		clearStateSetterCalls();
		viewModel.clearGlossarySearch();
		expect(stateSetters[0]).toHaveBeenCalledWith("");
		expect(stateSetters[1]).not.toHaveBeenCalled();
		expect(stateSetters[2]).toHaveBeenCalledWith(-1);

		clearStateSetterCalls();
		viewModel.moveSearchSelectionDown();
		expect(stateSetters[2].mock.calls[0][0](-1)).toBe(0);
		expect(stateSetters[2].mock.calls[0][0](0)).toBe(1);
		expect(stateSetters[2].mock.calls[0][0](1)).toBe(0);

		clearStateSetterCalls();
		viewModel.moveSearchSelectionUp();
		expect(stateSetters[2].mock.calls[0][0](-1)).toBe(1);
		expect(stateSetters[2].mock.calls[0][0](0)).toBe(1);
		expect(stateSetters[2].mock.calls[0][0](1)).toBe(0);

		clearStateSetterCalls();
		viewModel.openSearchKeyboardSelection();
		expect(stateSetters[1]).toHaveBeenCalledWith(expect.any(Function));

		expect(viewModel.selectContentType).toBe(onSelectContentType);
		expect(viewModel.activeContentType).toBe(LEARNING_CONTENT_TYPES.GLOSSARY);
		expect(viewModel.contentToggleEntries.map((entry) => entry.id)).toEqual([
			LEARNING_CONTENT_TYPES.EXAMS,
			LEARNING_CONTENT_TYPES.FLIPCARDS,
			LEARNING_CONTENT_TYPES.MATCHCARDS,
			LEARNING_CONTENT_TYPES.GLOSSARY
		]);
	});

	test("exposes the shared load-status contract without a page-specific load union", () => {
		const { onBack, viewModel } = createViewModel({
			glossaryStatus: LOAD_STATUS.ERROR,
			glossaryError: "Prøv igjen."
		});

		expect(viewModel).toMatchObject({
			loadingTitle: "Laster",
			errorTitle: "Kunne ikke laste",
			pageStatus: LOAD_STATUS.ERROR,
			pageErrorMessage: "Prøv igjen.",
			pageEmptyState: null,
			glossaryPanelEmptyState: null,
			showBackButton: true,
			backLabel: "Tilbake",
			navigationLabel: "Navigasjon",
			onBack,
			changeGlossarySearchTerm: expect.any(Function),
			clearGlossarySearch: expect.any(Function),
			selectTopicArea: expect.any(Function),
			selectContentType: expect.any(Function)
		});
	});
});

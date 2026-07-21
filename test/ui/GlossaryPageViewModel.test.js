// test/ui/GlossaryPageViewModel.test.js
import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import { ALL_TOPIC_AREAS } from "../../src/model/domain/utils/topicAreaFilters.js";
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
    createGlossaryTopicAreaOptionId
} = await import(
    "../../src/ui/viewmodel/GlossaryPage/glossaryTopicAreaListModel.js"
);
const {
    splitTextIntoHighlightSegments
} = await import(
    "../../src/ui/viewmodel/GlossaryPage/glossaryTableModel.js"
);

const translations = {
    glossaryPageTitle: "Begrepsliste",
    glossaryPageSearchPlaceholder: "Søk",
    glossaryPageSearchClearLabel: "Tøm",
    glossaryPageSearchKeyboardHint: "Bruk piltastene",
    glossaryPageSearchSummary: (chapterCount, matchCount) => `${chapterCount}/${matchCount}`,
    glossaryPageChapterMatchCount: (matchCount) => `${matchCount} treff`,
    glossaryPageChapterSubtitle: (entryCount) => `${entryCount} begreper`,
    glossaryPageChapterSearchSubtitle: (matchCount) => `${matchCount} søketreff`,
    glossaryPageTermColumnHeader: "Begrep",
    glossaryPageExplanationColumnHeader: "Forklaring",
    glossaryPageNoTopicAreasTitle: "Ingen kapitler",
    glossaryPageNoTopicAreasBody: "Ingen kapitler finnes.",
    glossaryPageNoEntriesTitle: "Ingen begreper",
    glossaryPageNoEntriesBody: "Ingen begreper finnes.",
    glossaryPageNoSearchResultsTitle: "Ingen treff",
    glossaryPageNoSearchResultsBody: (searchTerm) => `Ingen treff for ${searchTerm}.`,
    glossaryPageErrorTitle: "Kunne ikke laste",
    glossaryPageErrorMessage: "Prøv igjen.",
    glossaryPageLoadingTitle: "Laster"
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
    activeTopicAreaKey = null,
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
    stateValues.push(searchTerm, activeTopicAreaKey, keyboardIndex);
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
    const backContract = {
        showBackButton: true,
        backLabel: "Tilbake",
        navigationLabel: "Navigasjon",
        onBack
    };

    const viewModel = useGlossaryPageViewModel({
        getGlossaryEntriesForSubjectUseCase,
        getTopicAreasUseCase,
        subjectId,
        initialTopicAreaKey,
        language,
        t: translations,
        isActive,
        backContract
    });

    return {
        backContract,
        getGlossaryEntriesForSubjectUseCase,
        getTopicAreasUseCase,
        onBack,
        viewModel
    };
}

function clearStateSetterCalls() {
    stateSetters.forEach((stateSetter) => stateSetter.mockClear());
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
    test("owns only the three explicitly planned page-state values", () => {
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

    test("uses topic-area order as authoritative and sorts entries within the active chapter", () => {
        const { viewModel } = createViewModel();
        const pageView = viewModel.pageView;

        expect(pageView.kind).toBe("content");
        expect(pageView.topicAreaPanel.navigation).toMatchObject({
            kind: "topic-tabs",
            activeTopicAreaKey: "networking"
        });
        expect(pageView.topicAreaPanel.navigation.items.map((item) => item.topicAreaKey)).toEqual([
            "networking",
            "cryptography"
        ]);
        expect(pageView.glossaryPanel.kind).toBe("table");
        expect(pageView.glossaryPanel.table.rows.map((row) => row.glossaryEntryKey)).toEqual([
            "packet",
            "transport-layer"
        ]);
    });

    test("keeps a valid initial chapter and falls back from an unknown key", () => {
        const selectedViewModel = createViewModel({
            activeTopicAreaKey: "cryptography",
            initialTopicAreaKey: "cryptography"
        }).viewModel;
        const selectedPageView = selectedViewModel.pageView;

        expect(selectedPageView.kind).toBe("content");
        expect(selectedPageView.topicAreaPanel.navigation.activeTopicAreaKey).toBe("cryptography");
        expect(selectedPageView.glossaryPanel.table.rows.map((row) => row.glossaryEntryKey)).toEqual([
            "asymmetric-key",
            "public-key"
        ]);

        stateValues.length = 0;
        stateSetters.length = 0;
        useState.mockClear();

        const fallbackPageView = createViewModel({
            activeTopicAreaKey: "unknown",
            initialTopicAreaKey: "unknown"
        }).viewModel.pageView;

        expect(fallbackPageView.kind).toBe("content");
        expect(fallbackPageView.topicAreaPanel.navigation.activeTopicAreaKey).toBe("networking");
    });

    test("filters localized entries, counts matches, and keeps a matching active chapter", () => {
        const { viewModel } = createViewModel({
            searchTerm: "trafikk",
            activeTopicAreaKey: "networking",
            keyboardIndex: 0
        });
        const pageView = viewModel.pageView;

        expect(pageView.kind).toBe("content");
        expect(pageView.topicAreaPanel.search).toMatchObject({
            isSearching: true,
            summaryLabel: "1/1",
            input: {
                kind: "combobox"
            }
        });
        expect(pageView.topicAreaPanel.navigation.kind).toBe("search-results");
        expect(pageView.topicAreaPanel.navigation.items[0]).toMatchObject({
            topicAreaKey: "networking",
            matchCount: 1,
            subtitle: "1 søketreff",
            isActive: true
        });
        expect(pageView.glossaryPanel.table.rows.map((row) => row.glossaryEntryKey)).toEqual([
            "packet"
        ]);
    });

    test("does not activate search mode for a whitespace-only search term", () => {
        const { viewModel } = createViewModel({
            searchTerm: "   ",
            activeTopicAreaKey: "networking",
            keyboardIndex: 0
        });
        const pageView = viewModel.pageView;

        expect(pageView.kind).toBe("content");
        expect(pageView.topicAreaPanel.search).toMatchObject({
            isSearching: false,
            summaryLabel: "",
            input: { kind: "searchbox" }
        });
        expect(pageView.topicAreaPanel.navigation.kind).toBe("topic-tabs");
        expect(pageView.topicAreaPanel.navigation.items).toHaveLength(topicAreas.length);
        expect(pageView.topicAreaPanel.navigation.items.every((item) => !item.isKeyboardTarget)).toBe(true);
    });

    test("falls back to the first visible chapter and keeps no-search-results inside the panel model", () => {
        const fallbackPageView = createViewModel({
            searchTerm: "offentlig",
            activeTopicAreaKey: "networking"
        }).viewModel.pageView;

        expect(fallbackPageView.kind).toBe("content");
        expect(fallbackPageView.topicAreaPanel.navigation.items[0]).toMatchObject({
            topicAreaKey: "cryptography",
            isActive: true
        });

        stateValues.length = 0;
        stateSetters.length = 0;
        useState.mockClear();

        const emptyPageView = createViewModel({
            searchTerm: "kvantefysikk",
            activeTopicAreaKey: "networking"
        }).viewModel.pageView;

        expect(emptyPageView.kind).toBe("content");
        expect(emptyPageView.topicAreaPanel.navigation.items).toEqual([]);
        expect(emptyPageView.glossaryPanel).toMatchObject({
            kind: "empty-state",
            emptyState: { kind: "no-search-results" }
        });
    });

    test("shows a complete chapter when its localized name matches without counting the name as an entry match", () => {
        const { viewModel } = createViewModel({
            searchTerm: "kryptografi",
            activeTopicAreaKey: "cryptography"
        });
        const pageView = viewModel.pageView;

        expect(pageView.topicAreaPanel.navigation.items[0]).toMatchObject({
            topicAreaKey: "cryptography",
            matchesTopicAreaLabel: true,
            showsAllEntries: true,
            matchCount: 0,
            matchCountLabel: null,
            subtitle: "2 begreper"
        });
        expect(pageView.topicAreaPanel.search.summaryLabel).toBe("1/0");
        expect(pageView.glossaryPanel.table.rows.map((row) => row.glossaryEntryKey)).toEqual([
            "asymmetric-key",
            "public-key"
        ]);
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
            expect(viewModel.pageView).toMatchObject({
                kind: "content",
                glossaryPanel: {
                    kind: "empty-state",
                    emptyState: { kind: expectedKind }
                }
            });
            return;
        }

        expect(viewModel.pageView).toMatchObject({
            kind: "empty-state",
            emptyState: { kind: expectedKind }
        });
    });

    test("rebuilds localized rows for a language switch without reloading glossary entries", () => {
        const norwegian = createViewModel({ language: "no" });

        expect(norwegian.viewModel.pageView.glossaryPanel.table.rows[0].term).toBe("Pakke");
        expect(norwegian.getGlossaryEntriesForSubjectUseCase.execute).not.toHaveBeenCalled();

        stateValues.length = 0;
        stateSetters.length = 0;
        useState.mockClear();

        const english = createViewModel({ language: "en" });

        expect(english.viewModel.pageView.glossaryPanel.table.rows[0].term).toBe("Packet");
        expect(english.getGlossaryEntriesForSubjectUseCase.execute).not.toHaveBeenCalled();
    });

    test("resets search, chapter, and keyboard state when the subject contract changes", () => {
        createViewModel({
            searchTerm: "nøkkel",
            activeTopicAreaKey: "networking",
            keyboardIndex: 1,
            initialTopicAreaKey: "cryptography",
            subjectId: "in2120"
        });

        expect(stateSetters[0]).toHaveBeenCalledWith("");
        expect(stateSetters[1]).toHaveBeenCalledWith("cryptography");
        expect(stateSetters[2]).toHaveBeenCalledWith(-1);
    });

    test("exposes cohesive action contracts without setters in the View", () => {
        const { viewModel } = createViewModel({
            searchTerm: "e",
            activeTopicAreaKey: "networking",
            keyboardIndex: 0
        });
        const actions = viewModel.actions.topicAreaPanel;

        clearStateSetterCalls();
        actions.onSearchTermChange("  pakke  ");
        expect(stateSetters[0]).toHaveBeenCalledWith("  pakke  ");
        expect(stateSetters[2]).toHaveBeenCalledWith(0);

        clearStateSetterCalls();
        actions.onClearSearch();
        expect(stateSetters[0]).toHaveBeenCalledWith("");
        expect(stateSetters[1]).not.toHaveBeenCalled();
        expect(stateSetters[2]).toHaveBeenCalledWith(-1);

        clearStateSetterCalls();
        actions.onSelectTopicArea("cryptography");
        expect(stateSetters[1]).toHaveBeenCalledWith("cryptography");
        expect(stateSetters[2]).toHaveBeenCalledWith(1);

        clearStateSetterCalls();
        actions.onMoveSearchSelectionDown();
        expect(stateSetters[2].mock.calls[0][0](-1)).toBe(0);
        expect(stateSetters[2].mock.calls[0][0](0)).toBe(1);
        expect(stateSetters[2].mock.calls[0][0](1)).toBe(0);

        clearStateSetterCalls();
        actions.onMoveSearchSelectionUp();
        expect(stateSetters[2].mock.calls[0][0](-1)).toBe(1);
        expect(stateSetters[2].mock.calls[0][0](0)).toBe(1);
        expect(stateSetters[2].mock.calls[0][0](1)).toBe(0);

        clearStateSetterCalls();
        actions.onOpenSearchKeyboardSelection();
        expect(stateSetters[1]).toHaveBeenCalledWith("networking");
    });

    test("returns a complete load-state union and a separate workspace contract", () => {
        const { onBack, viewModel } = createViewModel({
            glossaryStatus: LOAD_STATUS.ERROR,
            glossaryError: "Prøv igjen."
        });

        expect(viewModel).toEqual({
            shellModel: {
                showBackButton: true,
                backLabel: "Tilbake",
                navigationLabel: "Navigasjon"
            },
            pageView: {
                kind: "load-state",
                status: LOAD_STATUS.ERROR,
                loadingLabel: "Laster",
                errorTitle: "Kunne ikke laste",
                errorBody: "Prøv igjen."
            },
            actions: {
                shell: { onBack },
                topicAreaPanel: expect.any(Object)
            }
        });
    });

});

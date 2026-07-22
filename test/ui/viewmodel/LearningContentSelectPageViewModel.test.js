import { describe, expect, jest, test, beforeEach } from "@jest/globals";
import { LOAD_STATUS } from "../../../src/ui/viewmodel/LoadState/loadStatus.js";
import { WORKSPACE_STATE_KINDS } from "../../../src/ui/viewmodel/WorkspaceState/workspaceStateKinds.js";
import { NAV_SCREENS } from "../../../src/navigation/navGraph.js";
import { LEARNING_CONTENT_TYPES } from "../../../src/navigation/learningContent.js";

const stateSetters = [];
let loadModelQueue = [];

const useState = jest.fn((initialValue) => {
    const value = typeof initialValue === "function" ? initialValue() : initialValue;
    const setter = jest.fn();

    stateSetters.push(setter);

    return [value, setter];
});

const useEffect = jest.fn((effect) => {
    return effect();
});

const useMemo = jest.fn((factory) => factory());
const useCallback = jest.fn((callback) => callback);
const useLoadModel = jest.fn((params) => {
	params.execute();

	return loadModelQueue.shift();
});

jest.unstable_mockModule("react", () => ({
    useCallback,
    useEffect,
    useMemo,
    useState
}));

jest.unstable_mockModule("../../../src/ui/viewmodel/LoadState/useLoadModel.js", () => ({
	default: useLoadModel
}));

const { default: useLearningContentSelectPageViewModel } = await import("../../../src/ui/viewmodel/LearningContentSelectPageViewModel.js");

function createT() {
    return {
        sidebarBack: "Tilbake",
        sidebarMobileNavigation: "Navigasjon",
        selectErrorMessage: "Kunne ikke hente eksamener",
        selectSubtitleFallback: "Velg en øvingsprøve.",
        selectSubtitle: (subjectCode) => `Velg en øvingsprøve for ${subjectCode}.`,
        selectExamsSubtitle: (subjectCode) => `Velg en øvingsprøve for ${subjectCode}.`,
        selectExamsSubtitleFallback: "Velg en øvingsprøve.",
        selectFlipcardsSubtitle: (subjectCode) => `Velg Flipcards for ${subjectCode}.`,
        selectFlipcardsSubtitleFallback: "Velg Flipcards.",
        selectMatchCardsSubtitle: (subjectCode) => `Velg Begrepsmatch for ${subjectCode}.`,
        selectMatchCardsSubtitleFallback: "Velg Begrepsmatch.",
        selectGlossariesSubtitle: (subjectCode) => `Øv på nøkkelbegreper og definisjoner for ${subjectCode}.`,
        selectGlossariesSubtitleFallback: "Øv på nøkkelbegreper og definisjoner.",
        selectExamsTitle: "Velg eksamen",
        selectFlipcardsTitle: "Velg flipcards",
        selectMatchCardsTitle: "Velg begrepsmatch",
        selectGlossaryTitle: "Velg begrepsliste",
        selectLoadingMessage: "Laster eksamener",
        selectEmptyTitle: "Ingen eksamener",
        selectEmptyMessage: "Ingen eksamener funnet",
        selectPracticeExamLabel: "Øvingsprøve",
        selectQuestionLabel: "spørsmål",
        selectMinuteLabel: "min",
        examAllCategoriesSheetOption: "Alle kategorier",
        examAllCategories: "Alle",
        filterAllLabel: "Alle",
        searchCloseLabel: "Lukk søk",
        examSearchLabel: "Søk",
        examSearchPlaceholder: "Søk etter eksamen",
        examCategoryLabel: "Kategori",
        pageToolsWorkspaceTitle: "Velg læringsverktøy",
        pageToolsSubjectWorkspaceTitle: "",
        pageToolsWorkspaceSubtitle: "",
        pageToolsWorkspaceActionsLabel: "Læringsverktøy",
        pageToolsOpenLabel: "Åpne verktøymeny",
        pageToolsCloseLabel: "Lukk verktøymeny",
        pageToolsMobileHandleLabel: "Verktøy",
        pageToolsUnavailableLabel: "Kommer senere",
        pageToolsSelectedLabel: "Aktiv",
        pageToolsSelectSubjectFirstLabel: "Velg fag først",
        pageToolsExamsLabel: "Eksamener",
        pageToolsPracticeTestsLabel: "Øveprøver",
        pageToolsFlipcardsLabel: "Flipcards",
        pageToolsMatchCardsLabel: "Begrepsmatch",
        pageToolsCreateExamLabel: "Opprett ny eksamen",
        pageToolsCreateSubjectLabel: "Opprett nytt fag",
        pageToolsImportSubjectMaterialsLabel: "Legg inn notater eller forelesningsslides",
        pageToolsGlossaryLabel: "Begrepslister",
        pageToolsCurriculumGraphsLabel: "Pensumoversikt",
        pageToolsCurriculumFigureLabel: "Lag pensum-oversiktsfigur",
        pageToolsAiExamLabel: "Lag AI-generert øveeksamen",
        contentToggleExamsLabel: "Eksamener",
        contentToggleFlipcardsLabel: "Flipcards",
        contentToggleMatchCardsLabel: "Begrepsmatch",
        contentToggleGlossaryLabel: "Begrepslister",
        contentToggleAriaLabel: "Velg innholdstype",
        flipcardsSearchPlaceholder: "Søk i flipcard-bunker",
        matchCardsSearchPlaceholder: "Søk i begrepsmatch-bunker",
        glossarySearchPlaceholder: "Søk i begrepslister",
        topicAreaAllLabel: "Alle områder",
        topicAreaFilterAriaLabel: "Fagområde",
        deckCardCountLabel: (cardCount) => `${cardCount} kort`,
        deckCardUnitLabel: "kort",
        deckEmptyTitle: "Ingen bunker",
        deckEmptyMessage: "Ingen bunker funnet",
        matchCardsDeckEmptyTitle: "Ingen begrepsmatch-bunker",
        matchCardsDeckEmptyMessage: "Ingen begrepsmatch funnet",
        glossaryPlaceholderTitle: "Begrepslister kommer senere",
        glossaryPlaceholderDescription: "Ikke koblet på ennå",
        glossaryPlaceholderNote: "Kommer senere"
    };
}

function createViewModel(params = {}) {
	loadModelQueue = [
		{ status: LOAD_STATUS.READY, data: [], error: null, reload: jest.fn() },
		{ status: LOAD_STATUS.READY, data: [], error: null, reload: jest.fn() },
		{ status: LOAD_STATUS.READY, data: [], error: null, reload: jest.fn() }
	];
    const getAvailableExamsUseCase = {
        execute: jest.fn().mockResolvedValue([])
    };
    const getTopicAreasUseCase = {
        execute: jest.fn().mockResolvedValue([])
    };
    const getFlipcardDeckSummariesUseCase = {
        execute: jest.fn().mockResolvedValue([])
    };
    const goBack = jest.fn();
    const changeScreen = jest.fn();
    const selectExam = jest.fn();
    const selectFlipcardDeck = jest.fn();
    const selectMatchCardsDeck = jest.fn();

    const viewModel = useLearningContentSelectPageViewModel(
        getAvailableExamsUseCase,
        getTopicAreasUseCase,
        getFlipcardDeckSummariesUseCase,
        "nb",
        createT(),
        { id: "in5431", code: "IN5431" },
        selectExam,
        selectFlipcardDeck,
        selectMatchCardsDeck,
        params.isActive ?? true,
        changeScreen,
        params.showBackButton ?? true,
        params.backLabel ?? "Tilbake",
        params.navigationLabel ?? "Navigasjon",
        goBack
    );

    return {
        getAvailableExamsUseCase,
        getTopicAreasUseCase,
        getFlipcardDeckSummariesUseCase,
        goBack,
        changeScreen,
        selectExam,
        selectFlipcardDeck,
        selectMatchCardsDeck,
        viewModel
    };
}

describe("useLearningContentSelectPageViewModel", () => {
    beforeEach(() => {
        stateSetters.length = 0;
        useState.mockClear();
        useEffect.mockClear();
        useMemo.mockClear();
        useCallback.mockClear();
		useLoadModel.mockClear();
    });

    test("does not load exams while the page is inactive", () => {
        const { getAvailableExamsUseCase } = createViewModel({
            isActive: false
        });

        expect(getAvailableExamsUseCase.execute).not.toHaveBeenCalled();
    });

    test("loads exams while the page is active", () => {
        const { getAvailableExamsUseCase } = createViewModel({
            isActive: true
        });

        expect(getAvailableExamsUseCase.execute).toHaveBeenCalledWith({
            subjectId: "in5431",
            language: "nb"
        });
    });



    test("uses match-card-specific empty text", () => {
        useState.mockImplementationOnce(() => [LEARNING_CONTENT_TYPES.MATCHCARDS, jest.fn()]);

        const { viewModel } = createViewModel();

        expect(viewModel.workspaceState).toEqual({
            kind: WORKSPACE_STATE_KINDS.EMPTY,
            title: "Ingen begrepsmatch-bunker",
            body: "Ingen begrepsmatch funnet",
            action: null
        });
    });

	test("returns centralized empty workspace state for ready exams without content", () => {
		const { viewModel } = createViewModel();

		expect(viewModel.workspaceState).toEqual({
			kind: WORKSPACE_STATE_KINDS.EMPTY,
			title: "Ingen eksamener",
			body: "Ingen eksamener funnet",
			action: null
		});
		expect(viewModel.examsLoading).toBeUndefined();
		expect(viewModel.examsLoadError).toBeUndefined();
	});

    test("returns injected navigation props", () => {
        const { goBack, viewModel } = createViewModel({
            showBackButton: true
        });

        expect(viewModel.showBackButton).toBe(true);
        expect(viewModel.backLabel).toBe("Tilbake");
        expect(viewModel.navigationLabel).toBe("Navigasjon");
        expect(viewModel.onBack).toBe(goBack);
    });
    test("selects a flipcard deck through the public ViewModel handler", () => {
        const { selectFlipcardDeck, viewModel } = createViewModel();

        expect(typeof viewModel.selectFlipcardDeck).toBe("function");

        viewModel.selectFlipcardDeck("network-security");

        expect(selectFlipcardDeck).toHaveBeenCalledWith("network-security");
    });

    test("navigates to glossary through the shared screen navigation callback", () => {
        const { changeScreen, viewModel } = createViewModel();

        viewModel.selectContentType("glossary");

        expect(changeScreen).toHaveBeenCalledWith(NAV_SCREENS.GLOSSARY);
        expect(stateSetters[0]).not.toHaveBeenCalledWith("glossary");
    });

});

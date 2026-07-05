import { describe, expect, jest, test, beforeEach } from "@jest/globals";
import { LOAD_STATUS } from "../../../src/ui/loadStatus/loadStatus.js";

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
        selectGlossariesSubtitle: (subjectCode) => `Øv på nøkkelbegreper og definisjoner for ${subjectCode}.`,
        selectGlossariesSubtitleFallback: "Øv på nøkkelbegreper og definisjoner.",
        selectIntroTitle: "Velg eksamen",
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
        pageToolsCreateExamLabel: "Opprett ny eksamen",
        pageToolsCreateSubjectLabel: "Opprett nytt fag",
        pageToolsImportSubjectMaterialsLabel: "Legg inn notater eller forelesningsslides",
        pageToolsConceptListLabel: "Begrepslister",
        pageToolsCurriculumGraphsLabel: "Pensumoversikt",
        pageToolsCurriculumFigureLabel: "Lag pensum-oversiktsfigur",
        pageToolsAiExamLabel: "Lag AI-generert øveeksamen",
        contentToggleExamsLabel: "Eksamener",
        contentToggleFlipcardsLabel: "Flipcards",
        contentToggleConceptListsLabel: "Begrepslister",
        contentToggleAriaLabel: "Velg innholdstype",
        flipcardsSearchPlaceholder: "Søk i flipcard-bunker",
        conceptListSearchPlaceholder: "Søk i begrepslister",
        topicAreaAllLabel: "Alle områder",
        topicAreaFilterAriaLabel: "Fagområde",
        deckCardCountLabel: (cardCount) => `${cardCount} kort`,
        deckCardUnitLabel: "kort",
        deckEmptyTitle: "Ingen bunker",
        deckEmptyMessage: "Ingen bunker funnet",
        conceptListPlaceholderTitle: "Begrepslister kommer senere",
        conceptListPlaceholderDescription: "Ikke koblet på ennå",
        conceptListPlaceholderNote: "Kommer senere"
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
    const getFlashcardDeckSummariesUseCase = {
        execute: jest.fn().mockResolvedValue([])
    };
    const goBack = jest.fn();

    const viewModel = useLearningContentSelectPageViewModel(
        getAvailableExamsUseCase,
        getTopicAreasUseCase,
        getFlashcardDeckSummariesUseCase,
        "nb",
        createT(),
        { id: "in5431", code: "IN5431" },
        jest.fn(),
        jest.fn(),
        params.isActive ?? true,
        jest.fn(),
        params.showBackButton ?? true,
        params.backLabel ?? "Tilbake",
        params.navigationLabel ?? "Navigasjon",
        goBack
    );

    return {
        getAvailableExamsUseCase,
        getTopicAreasUseCase,
        getFlashcardDeckSummariesUseCase,
        goBack,
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



    test("returns centralized page load state", () => {
        const { viewModel } = createViewModel();

        expect(viewModel.pageStatus).toBe(LOAD_STATUS.READY);
        expect(viewModel.pageErrorMessage).toBe("Kunne ikke hente eksamener");
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
});

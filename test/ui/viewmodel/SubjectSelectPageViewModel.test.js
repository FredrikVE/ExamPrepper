import { describe, expect, jest, test, beforeEach } from "@jest/globals";

const stateSetters = [];

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

jest.unstable_mockModule("react", () => ({
    useCallback,
    useEffect,
    useMemo,
    useState
}));

const { default: useSubjectSelectPageViewModel } = await import("../../../src/ui/viewmodel/SubjectSelectPageViewModel.js");

function createT() {
    return {
        sidebarBack: "Tilbake",
        sidebarMobileNavigation: "Navigasjon",
        subjectErrorMessage: "Kunne ikke hente fag",
        subjectAllFaculties: "Alle fakulteter",
        filterAllLabel: "Alle",
        searchCloseLabel: "Lukk søk",
        subjectLoadingMessage: "Laster fag",
        errorPrefix: "Feil",
        subjectEmptyMessage: "Ingen fag funnet",
        pageToolsWorkspaceTitle: "Velg læringsverktøy",
        pageToolsSubjectWorkspaceTitle: "",
        pageToolsWorkspaceSubtitle: "",
        pageToolsWorkspaceActionsLabel: "Læringsverktøy",
        pageToolsOpenLabel: "Åpne verktøymeny",
        pageToolsCloseLabel: "Lukk verktøymeny",
        pageToolsMobileHandleLabel: "Verktøy",
        pageToolsUnavailableLabel: "Kommer senere",
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
        pageToolsAiExamLabel: "Lag AI-generert øveeksamen"
    };
}

describe("useSubjectSelectPageViewModel", () => {
    beforeEach(() => {
        stateSetters.length = 0;
        useState.mockClear();
        useEffect.mockClear();
        useMemo.mockClear();
        useCallback.mockClear();
    });

    test("returns root navigation props without a back action", () => {
        const viewModel = useSubjectSelectPageViewModel(
            { execute: jest.fn().mockResolvedValue([]) },
            "nb",
            createT(),
            null,
            jest.fn(),
            true,
            jest.fn()
        );

        expect(viewModel.showBackButton).toBe(false);
        expect(viewModel.backLabel).toBe("Tilbake");
        expect(viewModel.navigationLabel).toBe("Navigasjon");
        expect(viewModel.onBack).toBeNull();
    });
});

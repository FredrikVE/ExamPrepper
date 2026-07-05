// test/ui/viewmodel/SubjectSelectPageViewModel.test.js
import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import { LOAD_STATUS } from "../../../src/ui/loadStatus/loadStatus.js";

const stateSetters = [];
let subjectLoadModel;

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
const useLoadModel = jest.fn(() => subjectLoadModel);

jest.unstable_mockModule("react", () => ({
	useCallback,
	useEffect,
	useMemo,
	useState
}));

jest.unstable_mockModule("../../../src/ui/viewmodel/LoadState/useLoadModel.js", () => ({
	default: useLoadModel
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

function createViewModel({ getAvailableSubjectsUseCase }) {
	return useSubjectSelectPageViewModel(
		getAvailableSubjectsUseCase,
		"nb",
		createT(),
		null,
		jest.fn(),
		true,
		jest.fn()
	);
}

describe("useSubjectSelectPageViewModel", () => {
	beforeEach(() => {
		stateSetters.length = 0;
		subjectLoadModel = {
			status: LOAD_STATUS.LOADING,
			data: [],
			error: null,
			reload: jest.fn()
		};
		useState.mockClear();
		useEffect.mockClear();
		useMemo.mockClear();
		useCallback.mockClear();
		useLoadModel.mockClear();
	});

	test("returns root navigation props without a back action", () => {
		const viewModel = createViewModel({
			getAvailableSubjectsUseCase: { execute: jest.fn().mockResolvedValue([]) }
		});

		expect(viewModel.showBackButton).toBe(false);
		expect(viewModel.backLabel).toBe("Tilbake");
		expect(viewModel.navigationLabel).toBe("Navigasjon");
		expect(viewModel.onBack).toBeNull();
	});

	test("loads subjects through the shared load model", async () => {
		const loadedSubjects = [
			{ id: "sub-1", name: "Psykologi", code: "PSY", faculty: "HF" }
		];
		const execute = jest.fn().mockResolvedValue(loadedSubjects);

		createViewModel({
			getAvailableSubjectsUseCase: { execute }
		});

		const loadConfiguration = useLoadModel.mock.calls[0][0];
		const subjects = await loadConfiguration.execute();

		expect(subjects).toBe(loadedSubjects);
		expect(execute).toHaveBeenCalledWith({ language: "nb" });
		expect(loadConfiguration.emptyData).toEqual([]);
		expect(loadConfiguration.errorMessage).toBe("Kunne ikke hente fag");
	});

	test("exposes page status and error message from the shared load model", () => {
		subjectLoadModel = {
			status: LOAD_STATUS.ERROR,
			data: [],
			error: "Kunne ikke hente fag",
			reload: jest.fn()
		};

		const viewModel = createViewModel({
			getAvailableSubjectsUseCase: { execute: jest.fn().mockResolvedValue([]) }
		});

		expect(viewModel.pageStatus).toBe(LOAD_STATUS.ERROR);
		expect(viewModel.pageErrorMessage).toBe("Kunne ikke hente fag");
		expect(viewModel.subjectsLoading).toBeUndefined();
		expect(viewModel.subjectsLoadError).toBeUndefined();
	});
});

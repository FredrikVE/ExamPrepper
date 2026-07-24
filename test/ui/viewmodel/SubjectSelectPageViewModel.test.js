// test/ui/viewmodel/SubjectSelectPageViewModel.test.js
import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import { LOAD_STATUS } from "../../../src/ui/viewmodel/LoadState/loadStatus.js";
import { WORKSPACE_STATE_KINDS } from "../../../src/ui/viewmodel/WorkspaceState/workspaceStateKinds.js";

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
		subjectSwitcherEmptyLabel: "Ingen fag",
		subjectSwitcherSelectLabel: "Velg fag",
		pageToolsWorkspaceTitle: "Velg læringsverktøy",
		pageToolsSubjectWorkspaceTitle: null,
		pageToolsWorkspaceSubtitle: null,
		pageToolsWorkspaceActionsLabel: "Læringsverktøy",
		pageToolsOpenLabel: "Åpne verktøymeny",
		pageToolsCloseLabel: "Lukk verktøymeny",
		pageToolsMobileHandleLabel: "Verktøy",
		pageToolsUnavailableLabel: "Kommer senere",
		pageToolsExamsLabel: "Eksamener",
		pageToolsPracticeTestsLabel: "Øveprøver",
		pageToolsFlipcardsLabel: "Flipcards",
		pageToolsCreateExamLabel: "Opprett ny eksamen",
		pageToolsCreateSubjectLabel: "Opprett nytt fag",
		pageToolsImportSubjectMaterialsLabel: "Legg inn notater eller forelesningsslides",
		pageToolsGlossaryLabel: "Begrepslister",
		pageToolsCurriculumGraphsLabel: "Pensumoversikt",
		pageToolsCurriculumFigureLabel: "Lag pensum-oversiktsfigur",
		pageToolsAiExamLabel: "Lag AI-generert øveeksamen"
	};
}

function createViewModel({ getAvailableSubjectsUseCase }) {
	const backContract = {
		showBackButton: false,
		backLabel: "Tilbake",
		navigationLabel: "Navigasjon",
		onBack: null
	};

	return useSubjectSelectPageViewModel(
		getAvailableSubjectsUseCase,
		"nb",
		createT(),
		null,
		jest.fn(),
		true,
		backContract
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

		expect(viewModel.backContract).toEqual({
			showBackButton: false,
			backLabel: "Tilbake",
			navigationLabel: "Navigasjon",
			onBack: null
		});
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

		expect(viewModel.workspaceState).toEqual({
			kind: WORKSPACE_STATE_KINDS.ERROR,
			title: expect.anything(),
			body: "Kunne ikke hente fag",
			action: null
		});
		expect(viewModel.subjectSwitcher).toEqual({
			kind: "error",
			subjects: [],
			currentSubject: null,
			label: "Kunne ikke hente fag",
			canOpen: false
		});
	});
});

// test/ui/viewmodel/SubjectSelectPageViewModel.test.js
import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import { LOAD_STATUS } from "../../../src/ui/viewmodel/LoadState/loadStatus.js";
import { WORKSPACE_STATE_KINDS } from "../../../src/ui/viewmodel/WorkspaceState/workspaceStateKinds.js";

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

function createViewModel({ subjects = [], loadStatus = LOAD_STATUS.LOADING, loadError = null } = {}) {
	const backContract = {
		showBackButton: false,
		backLabel: "Tilbake",
		navigationLabel: "Navigasjon",
		onBack: null
	};

	return useSubjectSelectPageViewModel({
		subjects,
		loadStatus,
		loadError,
		t: createT(),
		onSelectSubject: jest.fn(),
		backContract
	});
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
		const viewModel = createViewModel();

		expect(viewModel.backContract).toEqual({
			showBackButton: false,
			backLabel: "Tilbake",
			navigationLabel: "Navigasjon",
			onBack: null
		});
	});

	test("uses subject catalog load status and error as page input", () => {
		const viewModel = createViewModel({
			loadStatus: LOAD_STATUS.ERROR,
			loadError: "Kunne ikke hente fag"
		});

		expect(viewModel.workspaceState).toEqual({
			kind: WORKSPACE_STATE_KINDS.ERROR,
			title: expect.anything(),
			body: "Kunne ikke hente fag",
			action: null
		});
	});

	test("filters the subjects supplied by the catalog owner", () => {
		const subjects = [
			{ id: "sub-1", name: "Psykologi", code: "PSY", faculty: "HF" }
		];
		const viewModel = createViewModel({
			subjects,
			loadStatus: LOAD_STATUS.READY
		});

		expect(viewModel.subjects).toBe(subjects);
		expect(viewModel.filteredSubjects).toEqual(subjects);
		expect(viewModel.selectedSubject).toBeUndefined();
		expect(viewModel.subjectSwitcher).toBeUndefined();
	});
});

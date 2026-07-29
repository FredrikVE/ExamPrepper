import { describe, expect, jest, test, beforeEach } from "@jest/globals";
import { LOAD_STATUS } from "../../../src/ui/viewmodel/LoadState/loadStatus.js";
import { WORKSPACE_STATE_KINDS } from "../../../src/ui/viewmodel/WorkspaceState/workspaceStateKinds.js";
import { LEARNING_CONTENT_TYPES, NAV_SCREENS, TEST_TYPES } from "../../../src/navigation/navigation.js";

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
		selectChapterTestsSubtitle: (subjectCode) => `Velg en kapitteltest for ${subjectCode}.`,
		selectChapterTestsSubtitleFallback: "Velg en kapitteltest.",
		selectFlipcardsSubtitle: (subjectCode) => `Velg Flipcards for ${subjectCode}.`,
		selectFlipcardsSubtitleFallback: "Velg Flipcards.",
		selectMatchCardsSubtitle: (subjectCode) => `Velg Begrepsmatch for ${subjectCode}.`,
		selectMatchCardsSubtitleFallback: "Velg Begrepsmatch.",
		selectGlossariesSubtitle: (subjectCode) => `Øv på nøkkelbegreper og definisjoner for ${subjectCode}.`,
		selectGlossariesSubtitleFallback: "Øv på nøkkelbegreper og definisjoner.",
		selectExamsTitle: "Velg eksamen",
		selectChapterTestsTitle: "Velg kapitteltest",
		selectFlipcardsTitle: "Velg flipcards",
		selectMatchCardsTitle: "Velg begrepsmatch",
		selectGlossaryTitle: "Velg begrepsliste",
		selectLoadingMessage: "Laster eksamener",
		selectEmptyTitle: "Ingen eksamener",
		selectEmptyMessage: "Ingen eksamener funnet",
		selectChapterTestsEmptyTitle: "Ingen kapitteltester",
		selectChapterTestsEmptyMessage: "Ingen kapitteltester funnet",
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
		pageToolsSubjectWorkspaceTitle: null,
		pageToolsWorkspaceSubtitle: null,
		pageToolsWorkspaceActionsLabel: "Læringsverktøy",
		pageToolsOpenLabel: "Åpne verktøymeny",
		pageToolsCloseLabel: "Lukk verktøymeny",
		pageToolsMobileHandleLabel: "Verktøy",
		pageToolsUnavailableLabel: "Kommer senere",
		pageToolsSelectedLabel: "Aktiv",
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
		contentToggleLearningPathLabel: "Sti",
		contentToggleLearningPathDesktopLabel: "Læringsti",
		contentTogglePracticeLabel: "Øve",
		contentToggleTestsLabel: "Tester",
		contentToggleChapterTestsLabel: "Kapitteltester",
		contentToggleBackLabel: "Tilbake",
		contentToggleFlipcardsLabel: "Flipcards",
		contentToggleMatchCardsLabel: "Begrepsmatch",
		contentToggleGlossaryLabel: "Begrepsliste",
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
		{ status: LOAD_STATUS.READY, data: params.exams ?? [], error: null, reload: jest.fn() },
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

	const backContract = {
		showBackButton: params.showBackButton ?? true,
		backLabel: params.backLabel ?? "Tilbake",
		navigationLabel: params.navigationLabel ?? "Navigasjon",
		onBack: goBack
	};
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
		backContract,
		params.actionErrorMessage ?? null
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



	test("returns resolved mobile toggle-button items for the active content type", () => {
		const { viewModel } = createViewModel();
		const [learningPathItem, practiceItem, testsItem] = viewModel.mobileToggleButtonItems;

		expect(viewModel.contentToggleBackLabel).toBe("Tilbake");
		expect(viewModel.mobileToggleButtonItems).toHaveLength(3);
		expect(learningPathItem).toEqual({
			id: "learning-path",
			label: "Sti",
			contentTypeId: null,
			isDisabled: true,
			isActive: false,
			entries: []
		});
		expect(practiceItem).toMatchObject({
			id: "practice",
			label: "Øve",
			contentTypeId: null,
			isDisabled: false,
			isActive: false
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
			label: "Tester",
			contentTypeId: null,
			isDisabled: false,
			isActive: true
		});
		expect(testsItem.entries).toEqual([
			{
				id: TEST_TYPES.CHAPTER_TEST,
				label: "Kapitteltester",
				isDisabled: false
			},
			{
				id: LEARNING_CONTENT_TYPES.EXAMS,
				label: "Eksamener",
				isDisabled: false
			}
		]);
	});


	test("keeps a mobile group expanded until the explicit close action", () => {
		const { viewModel } = createViewModel();

		expect(viewModel.expandedMobileToggleButtonGroupId).toBeNull();

		viewModel.openMobileToggleButtonGroup("practice");
		viewModel.selectContentType(LEARNING_CONTENT_TYPES.GLOSSARY);

		expect(stateSetters[2]).toHaveBeenCalledWith("practice");
		expect(stateSetters[2]).not.toHaveBeenCalledWith(null);

		viewModel.closeMobileToggleButtonGroup();

		expect(stateSetters[2]).toHaveBeenCalledWith(null);
	});

	test("shows exams by default and exposes the exam button as active on desktop and mobile", () => {
		const { viewModel } = createViewModel({
			exams: [
				{ id: "chapter", title: "Kapittel", testType: TEST_TYPES.CHAPTER_TEST, topicAreaKeys: [] },
				{ id: "exam", title: "Eksamen", testType: TEST_TYPES.EXAM, topicAreaKeys: [] }
			]
		});

		expect(viewModel.selectedTestType).toBe(TEST_TYPES.EXAM);
		expect(viewModel.desktopActiveEntryId).toBe(LEARNING_CONTENT_TYPES.EXAMS);
		expect(viewModel.mobileActiveEntryId).toBe(LEARNING_CONTENT_TYPES.EXAMS);
		expect(viewModel.visibleExams.map((exam) => exam.id)).toEqual(["exam"]);
	});

	test("keeps the disabled desktop learning-path entry inert", () => {
		const { viewModel, changeScreen } = createViewModel();

		viewModel.selectContentType("learning-path");

		expect(stateSetters[0]).not.toHaveBeenCalled();
		expect(stateSetters[1]).not.toHaveBeenCalled();
		expect(changeScreen).not.toHaveBeenCalled();
	});

	test("selects the desktop or mobile chapter-test entry through the shared content handler", () => {
		const { viewModel } = createViewModel();

		viewModel.selectContentType(TEST_TYPES.CHAPTER_TEST);

		expect(stateSetters[1]).toHaveBeenCalledWith(TEST_TYPES.CHAPTER_TEST);
		expect(stateSetters[0]).toHaveBeenCalledWith(LEARNING_CONTENT_TYPES.EXAMS);
	});

	test("selects the desktop or mobile exam entry through the shared content handler", () => {
		const { viewModel } = createViewModel();

		viewModel.selectContentType(LEARNING_CONTENT_TYPES.EXAMS);

		expect(stateSetters[1]).toHaveBeenCalledWith(TEST_TYPES.EXAM);
		expect(stateSetters[0]).toHaveBeenCalledWith(LEARNING_CONTENT_TYPES.EXAMS);
	});

	test("filters visible exams by the selected mobile test type", () => {
		useState
			.mockImplementationOnce(() => [LEARNING_CONTENT_TYPES.EXAMS, jest.fn()])
			.mockImplementationOnce(() => [TEST_TYPES.CHAPTER_TEST, jest.fn()]);

		const { viewModel } = createViewModel({
			exams: [
				{ id: "chapter", title: "Kapittel", testType: TEST_TYPES.CHAPTER_TEST, topicAreaKeys: [] },
				{ id: "exam", title: "Eksamen", testType: TEST_TYPES.EXAM, topicAreaKeys: [] }
			]
		});

		expect(viewModel.desktopActiveEntryId).toBe(TEST_TYPES.CHAPTER_TEST);
		expect(viewModel.mobileActiveEntryId).toBe(TEST_TYPES.CHAPTER_TEST);
		expect(viewModel.visibleExams.map((exam) => exam.id)).toEqual(["chapter"]);
	});

	test("uses chapter-test heading and empty-state copy while the chapter button is active", () => {
		useState
			.mockImplementationOnce(() => [LEARNING_CONTENT_TYPES.EXAMS, jest.fn()])
			.mockImplementationOnce(() => [TEST_TYPES.CHAPTER_TEST, jest.fn()]);

		const { viewModel } = createViewModel();

		expect(viewModel.title).toBe("Velg kapitteltest");
		expect(viewModel.subtitle).toBe("Velg en kapitteltest for IN5431.");
		expect(viewModel.workspaceState).toEqual({
			kind: WORKSPACE_STATE_KINDS.EMPTY,
			title: "Ingen kapitteltester",
			body: "Ingen kapitteltester funnet",
			action: null
		});
	});

	test("clears the test type when a desktop content type is selected", () => {
		const { viewModel } = createViewModel();

		viewModel.selectContentType(LEARNING_CONTENT_TYPES.FLIPCARDS);

		expect(stateSetters[1]).toHaveBeenCalledWith(null);
		expect(stateSetters[0]).toHaveBeenCalledWith(LEARNING_CONTENT_TYPES.FLIPCARDS);
	});

	test("marks the practice group active for every practice content type", () => {
		const practiceContentTypeIds = [
			LEARNING_CONTENT_TYPES.FLIPCARDS,
			LEARNING_CONTENT_TYPES.MATCHCARDS,
			LEARNING_CONTENT_TYPES.GLOSSARY
		];

		for (const contentTypeId of practiceContentTypeIds) {
			useState.mockImplementationOnce(() => {
				const setter = jest.fn();
				stateSetters.push(setter);

				return [contentTypeId, setter];
			});

			const { viewModel } = createViewModel();
			const practiceItem = viewModel.mobileToggleButtonItems[1];
			const testsItem = viewModel.mobileToggleButtonItems[2];

			expect(practiceItem.isActive).toBe(true);
			expect(testsItem.isActive).toBe(false);
		}
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

		expect(viewModel.backContract).toEqual({
			showBackButton: true,
			backLabel: "Tilbake",
			navigationLabel: "Navigasjon",
			onBack: goBack
		});
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

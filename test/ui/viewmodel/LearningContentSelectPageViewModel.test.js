//test/ui/viewmodel/LearningContentSelectPageViewModel.test.js
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
	const loadModel = loadModelQueue.shift();

	if (params.isEnabled) {
		params.execute();
	}

	return loadModel;
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
		errorPrefix: "Feil",
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
		selectFilteredEmptyTitle: "Ingen treff",
		selectFilteredEmptyMessage: "Prøv et annet søk eller fagområde",
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
		{
			status: params.examLoadStatus ?? LOAD_STATUS.READY,
			data: params.exams ?? [],
			error: params.examLoadError ?? null,
			reload: jest.fn()
		},
		{
			status: params.chapterTestLoadStatus ?? LOAD_STATUS.READY,
			data: params.chapterTests ?? [],
			error: params.chapterTestLoadError ?? null,
			reload: jest.fn()
		},
		{
			status: params.topicAreaLoadStatus ?? LOAD_STATUS.READY,
			data: params.topicAreas ?? [],
			error: params.topicAreaLoadError ?? null,
			reload: jest.fn()
		},
		{
			status: params.flipcardDeckLoadStatus ?? LOAD_STATUS.READY,
			data: params.flipcardDecks ?? [],
			error: params.flipcardDeckLoadError ?? null,
			reload: jest.fn()
		}
	];
	const getAvailableExamsUseCase = {
		execute: jest.fn().mockResolvedValue([])
	};
	const getAvailableChapterTestsUseCase = {
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
	const onSelectTestSet = jest.fn();
	const selectFlipcardDeck = jest.fn();
	const selectMatchCardsDeck = jest.fn();

	const backContract = {
		showBackButton: params.showBackButton ?? true,
		backLabel: params.backLabel ?? "Tilbake",
		navigationLabel: params.navigationLabel ?? "Navigasjon",
		onBack: goBack
	};
	const viewModel = useLearningContentSelectPageViewModel({
		getAvailableExamsUseCase,
		getAvailableChapterTestsUseCase,
		getTopicAreasUseCase,
		getFlipcardDeckSummariesUseCase,
		language: "nb",
		t: createT(),
		selectedSubject: { id: "in5431", code: "IN5431" },
		onSelectTestSet,
		onSelectFlipcardDeck: selectFlipcardDeck,
		onSelectMatchCardsDeck: selectMatchCardsDeck,
		isActive: params.isActive ?? true,
		onChangeScreen: changeScreen,
		backContract,
		actionErrorMessage: params.actionErrorMessage ?? null
	});

	return {
		getAvailableExamsUseCase,
		getAvailableChapterTestsUseCase,
		getTopicAreasUseCase,
		getFlipcardDeckSummariesUseCase,
		goBack,
		changeScreen,
		onSelectTestSet,
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

	test("does not load test sets while the page is inactive", () => {
		const { getAvailableExamsUseCase, getAvailableChapterTestsUseCase } = createViewModel({
			isActive: false
		});

		expect(getAvailableExamsUseCase.execute).not.toHaveBeenCalled();
		expect(getAvailableChapterTestsUseCase.execute).not.toHaveBeenCalled();
	});

	test("loads only exams while the Exam test type is active", () => {
		const { getAvailableExamsUseCase, getAvailableChapterTestsUseCase } = createViewModel({
			isActive: true
		});

		expect(getAvailableExamsUseCase.execute).toHaveBeenCalledWith({
			subjectId: "in5431",
			language: "nb"
		});
		expect(getAvailableChapterTestsUseCase.execute).not.toHaveBeenCalled();
	});

	test("does not load either test-set port while a deck content type is active", () => {
		useState.mockImplementationOnce(() => [LEARNING_CONTENT_TYPES.FLIPCARDS, jest.fn()]);

		const {
			getAvailableExamsUseCase,
			getAvailableChapterTestsUseCase,
			getFlipcardDeckSummariesUseCase
		} = createViewModel({ isActive: true });

		expect(getAvailableExamsUseCase.execute).not.toHaveBeenCalled();
		expect(getAvailableChapterTestsUseCase.execute).not.toHaveBeenCalled();
		expect(getFlipcardDeckSummariesUseCase.execute).toHaveBeenCalledWith({
			subjectId: "in5431",
			language: "nb"
		});
	});

	test("loads only chapter tests while the ChapterTest test type is active", () => {
		useState
			.mockImplementationOnce(() => [LEARNING_CONTENT_TYPES.EXAMS, jest.fn()])
			.mockImplementationOnce(() => [TEST_TYPES.CHAPTER_TEST, jest.fn()]);

		const { getAvailableExamsUseCase, getAvailableChapterTestsUseCase } = createViewModel({
			isActive: true
		});

		expect(getAvailableExamsUseCase.execute).not.toHaveBeenCalled();
		expect(getAvailableChapterTestsUseCase.execute).toHaveBeenCalledWith({
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
			id: LEARNING_CONTENT_TYPES.LEARNING_PATH,
			label: "Sti",
			contentTypeId: LEARNING_CONTENT_TYPES.LEARNING_PATH,
			isDisabled: false,
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
				{ id: "exam", title: "Eksamen", testType: TEST_TYPES.EXAM, topicAreaKeys: [] }
			],
			chapterTests: [
				{ id: "chapter", title: "Kapittel", testType: TEST_TYPES.CHAPTER_TEST, topicAreaKeys: [] }
			]
		});

		expect(viewModel.selectedTestType).toBe(TEST_TYPES.EXAM);
		expect(viewModel.desktopActiveEntryId).toBe(LEARNING_CONTENT_TYPES.EXAMS);
		expect(viewModel.mobileActiveEntryId).toBe(LEARNING_CONTENT_TYPES.EXAMS);
		expect(viewModel.visibleTestSets.map((testSet) => testSet.id)).toEqual(["exam"]);
	});

	test("navigates through the enabled desktop learning-path entry", () => {
		const { viewModel, changeScreen } = createViewModel();

		viewModel.selectContentType("learning-path");

		expect(stateSetters[0]).not.toHaveBeenCalled();
		expect(stateSetters[1]).not.toHaveBeenCalled();
		expect(changeScreen).toHaveBeenCalledWith(NAV_SCREENS.LEARNING_PATH);
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

	test("uses the ChapterTest scoped load when the ChapterTest entry is active", () => {
		useState
			.mockImplementationOnce(() => [LEARNING_CONTENT_TYPES.EXAMS, jest.fn()])
			.mockImplementationOnce(() => [TEST_TYPES.CHAPTER_TEST, jest.fn()]);

		const { viewModel } = createViewModel({
			exams: [
				{ id: "exam", title: "Eksamen", testType: TEST_TYPES.EXAM, topicAreaKeys: [] }
			],
			chapterTests: [
				{ id: "chapter", title: "Kapittel", testType: TEST_TYPES.CHAPTER_TEST, topicAreaKeys: [] }
			]
		});

		expect(viewModel.desktopActiveEntryId).toBe(TEST_TYPES.CHAPTER_TEST);
		expect(viewModel.mobileActiveEntryId).toBe(TEST_TYPES.CHAPTER_TEST);
		expect(viewModel.visibleTestSets.map((testSet) => testSet.id)).toEqual(["chapter"]);
	});

	test("does not source ChapterTests from the inactive Exam port", () => {
		useState
			.mockImplementationOnce(() => [LEARNING_CONTENT_TYPES.EXAMS, jest.fn()])
			.mockImplementationOnce(() => [TEST_TYPES.CHAPTER_TEST, jest.fn()]);

		const { viewModel } = createViewModel({
			exams: [
				{ id: "legacy-chapter", title: "Legacy chapter", testType: TEST_TYPES.CHAPTER_TEST, topicAreaKeys: [] }
			]
		});

		expect(viewModel.visibleTestSets).toEqual([]);
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

	test("shows filtered-empty copy when chapter tests exist but search has no matches", () => {
		useState
			.mockImplementationOnce(() => [LEARNING_CONTENT_TYPES.EXAMS, jest.fn()])
			.mockImplementationOnce(() => [TEST_TYPES.CHAPTER_TEST, jest.fn()])
			.mockImplementationOnce(() => [null, jest.fn()])
			.mockImplementationOnce(() => ["finnes-ikke", jest.fn()]);

		const { viewModel } = createViewModel({
			chapterTests: [
				{ id: "chapter", title: "Kapittel", testType: TEST_TYPES.CHAPTER_TEST, topicAreaKeys: ["security"] }
			]
		});

		expect(viewModel.visibleTestSets).toEqual([]);
		expect(viewModel.workspaceState).toEqual({
			kind: WORKSPACE_STATE_KINDS.EMPTY,
			title: "Ingen treff",
			body: "Prøv et annet søk eller fagområde",
			action: null
		});
	});

	test("shows filtered-empty copy when chapter tests exist but topic filter has no matches", () => {
		useState
			.mockImplementationOnce(() => [LEARNING_CONTENT_TYPES.EXAMS, jest.fn()])
			.mockImplementationOnce(() => [TEST_TYPES.CHAPTER_TEST, jest.fn()])
			.mockImplementationOnce(() => [null, jest.fn()])
			.mockImplementationOnce(() => ["", jest.fn()])
			.mockImplementationOnce(() => ["governance", jest.fn()]);

		const { viewModel } = createViewModel({
			chapterTests: [
				{ id: "chapter", title: "Kapittel", testType: TEST_TYPES.CHAPTER_TEST, topicAreaKeys: ["security"] }
			]
		});

		expect(viewModel.visibleTestSets).toEqual([]);
		expect(viewModel.workspaceState.title).toBe("Ingen treff");
	});

	test("ignores an inactive ChapterTest load error while Exams are active", () => {
		const { viewModel } = createViewModel({
			chapterTestLoadStatus: LOAD_STATUS.ERROR,
			chapterTestLoadError: "Kapittelprøver feilet"
		});

		expect(viewModel.workspaceState.kind).toBe(WORKSPACE_STATE_KINDS.EMPTY);
	});

	test("uses the active ChapterTest load error in page status", () => {
		useState
			.mockImplementationOnce(() => [LEARNING_CONTENT_TYPES.EXAMS, jest.fn()])
			.mockImplementationOnce(() => [TEST_TYPES.CHAPTER_TEST, jest.fn()]);

		const { viewModel } = createViewModel({
			examLoadStatus: LOAD_STATUS.ERROR,
			examLoadError: "Eksamen feilet",
			chapterTestLoadStatus: LOAD_STATUS.ERROR,
			chapterTestLoadError: "Kapittelprøver feilet"
		});

		expect(viewModel.workspaceState).toEqual({
			kind: WORKSPACE_STATE_KINDS.ERROR,
			title: "Feil",
			body: "Kapittelprøver feilet",
			action: null
		});
	});

	test("keeps the genuine empty copy when the active test type has no content", () => {
		useState
			.mockImplementationOnce(() => [LEARNING_CONTENT_TYPES.EXAMS, jest.fn()])
			.mockImplementationOnce(() => [TEST_TYPES.EXAM, jest.fn()])
			.mockImplementationOnce(() => [null, jest.fn()])
			.mockImplementationOnce(() => ["kapittel", jest.fn()]);

		const { viewModel } = createViewModel({
			chapterTests: [
				{ id: "chapter", title: "Kapittel", testType: TEST_TYPES.CHAPTER_TEST, topicAreaKeys: [] }
			]
		});

		expect(viewModel.workspaceState).toEqual({
			kind: WORKSPACE_STATE_KINDS.EMPTY,
			title: "Ingen eksamener",
			body: "Ingen eksamener funnet",
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
	test("propagates the scoped test type when a chapter test is selected", () => {
		useState
			.mockImplementationOnce(() => [LEARNING_CONTENT_TYPES.EXAMS, jest.fn()])
			.mockImplementationOnce(() => [TEST_TYPES.CHAPTER_TEST, jest.fn()]);

		const { onSelectTestSet, viewModel } = createViewModel({
			chapterTests: [
				{ id: "chapter", title: "Kapittel", topicAreaKeys: [] }
			]
		});

		viewModel.selectTestSet("chapter");

		expect(onSelectTestSet).toHaveBeenCalledWith("chapter", TEST_TYPES.CHAPTER_TEST);
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

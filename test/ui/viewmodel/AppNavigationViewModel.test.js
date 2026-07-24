// test/ui/viewmodel/AppNavigationViewModel.test.js
import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import { NAV_SCREENS } from "../../../src/navigation/navigation.js";

let hookState;
let stateIndex;

const useState = jest.fn((initialValue) => {
	const index = stateIndex++;

	if (hookState[index] === undefined) {
		hookState[index] = initialValue;
	}

	return [
		hookState[index],
		jest.fn((nextValue) => {
			hookState[index] = typeof nextValue === "function"
				? nextValue(hookState[index])
				: nextValue;
		})
	];
});
const useCallback = jest.fn((callback) => callback);

const closeSettingsPresentation = jest.fn();
const closeMobileDropDownTopBarMenu = jest.fn();
const closeMobileSubjectPicker = jest.fn();

const mobileTopBarModel = {
	isMobileDropDownTopBarMenuOpen: false,
	isMobileSubjectPickerOpen: false,
	toggleMobileDropDownTopBarMenu: jest.fn(),
	closeMobileDropDownTopBarMenu,
	toggleMobileSubjectPicker: jest.fn(),
	closeMobileSubjectPicker
};

const settingsPresentationModel = {
	isSettingsPresentationOpen: false,
	settingsPresentationMode: "closed",
	openSettingsPresentation: jest.fn(),
	closeSettingsPresentation
};

const useSyncSelectedExamWithLanguage = jest.fn();

jest.unstable_mockModule("react", () => ({
	useCallback,
	useState
}));

jest.unstable_mockModule("../../../src/ui/viewmodel/AppNavigation/useMobileDropDownTopBarModel.js", () => ({
	default: () => mobileTopBarModel
}));

jest.unstable_mockModule("../../../src/ui/viewmodel/AppNavigation/useSettingsPresentationModel.js", () => ({
	default: () => settingsPresentationModel
}));

jest.unstable_mockModule("../../../src/ui/viewmodel/AppNavigation/useSyncSelectedExamWithLanguage.js", () => ({
	default: useSyncSelectedExamWithLanguage
}));

const { default: useAppNavigationViewModel } = await import("../../../src/ui/viewmodel/AppNavigationViewModel.js");

function setNavigationState({
	activeScreen = NAV_SCREENS.SUBJECTS,
	selectedSubjectId = null,
	selectedExamId = null,
	selectedTopicAreaKey = null,
	examLanguageSyncError = null
} = {}) {
	hookState = [activeScreen, selectedSubjectId, selectedExamId, selectedTopicAreaKey, examLanguageSyncError];
}

function createViewModel() {
	stateIndex = 0;
	return useAppNavigationViewModel({
		backLabel: "Tilbake",
		navigationLabel: "Navigasjon",
		language: "nb",
		getExamByIdUseCase: {},
		getExamByBaseIdAndLangUseCase: {},
		examUnavailableMessage: "Eksamen finnes ikke på språket.",
		examSyncFailedMessage: "Kunne ikke synkronisere eksamen."
	});
}

beforeEach(() => {
	setNavigationState();
	jest.clearAllMocks();
});

describe("useAppNavigationViewModel", () => {
	test("starter på fagoversikten uten valg", () => {
		const viewModel = createViewModel();

		expect(viewModel.activeScreen).toBe(NAV_SCREENS.SUBJECTS);
		expect(viewModel.selectedSubjectId).toBeNull();
		expect(viewModel.selectedExamId).toBeNull();
		expect(viewModel.selectedTopicAreaKey).toBeNull();
		expect(viewModel.examLanguageSyncError).toBeNull();
	});

	test("valg av fag går direkte til innholdsvalg og nullstiller gamle valg", () => {
		setNavigationState({
			activeScreen: NAV_SCREENS.EXAM,
			selectedSubjectId: "old-subject",
			selectedExamId: "old-exam",
			selectedTopicAreaKey: "old-topic"
		});

		createViewModel().selectSubject("inf1010");

		expect(hookState.slice(0, 4)).toEqual([
			NAV_SCREENS.SELECT,
			"inf1010",
			null,
			null
		]);
	});

	test("valg av eksamen går direkte til eksamensskjermen", () => {
		setNavigationState({ activeScreen: NAV_SCREENS.SELECT, selectedSubjectId: "inf1010" });

		createViewModel().selectExam("exam-2");

		expect(hookState.slice(0, 4)).toEqual([
			NAV_SCREENS.EXAM,
			"inf1010",
			"exam-2",
			null
		]);
	});

	test("valg av flipcard-bunke beholder fag og lagrer topic area", () => {
		setNavigationState({
			activeScreen: NAV_SCREENS.SELECT,
			selectedSubjectId: "inf1010",
			selectedExamId: "old-exam"
		});

		createViewModel().selectFlipcardDeck("loops");

		expect(hookState.slice(0, 4)).toEqual([
			NAV_SCREENS.FLIPCARDS,
			"inf1010",
			null,
			"loops"
		]);
	});

	test("fagavhengig navigasjon uten fag går hjem", () => {
		createViewModel().changeScreen(NAV_SCREENS.GLOSSARY);

		expect(hookState.slice(0, 4)).toEqual([
			NAV_SCREENS.SUBJECTS,
			null,
			null,
			null
		]);
	});

	test("eksamensskjermen kan ikke åpnes uten valgt eksamen", () => {
		setNavigationState({ activeScreen: NAV_SCREENS.SELECT, selectedSubjectId: "inf1010" });

		createViewModel().changeScreen(NAV_SCREENS.EXAM);

		expect(hookState[0]).toBe(NAV_SCREENS.SELECT);
	});

	test("ukjent skjerm feiler tydelig", () => {
		setNavigationState({ activeScreen: NAV_SCREENS.SELECT, selectedSubjectId: "inf1010" });

		expect(() => createViewModel().changeScreen("missing-screen")).toThrow("Unknown navigation screen: missing-screen");
		expect(hookState[0]).toBe(NAV_SCREENS.SELECT);
	});

	test("tilbake fra arbeidsskjerm går til innholdsvalg", () => {
		setNavigationState({
			activeScreen: NAV_SCREENS.FLIPCARDS,
			selectedSubjectId: "inf1010",
			selectedTopicAreaKey: "loops"
		});

		createViewModel().goBack();

		expect(hookState.slice(0, 4)).toEqual([
			NAV_SCREENS.SELECT,
			"inf1010",
			null,
			null
		]);
	});

	test("tilbake fra innholdsvalg går til fagoversikten", () => {
		setNavigationState({ activeScreen: NAV_SCREENS.SELECT, selectedSubjectId: "inf1010" });

		createViewModel().goBack();

		expect(hookState.slice(0, 4)).toEqual([
			NAV_SCREENS.SUBJECTS,
			null,
			null,
			null
		]);
	});

	test("navigasjon lukker åpne overlays", () => {
		createViewModel().showAllSubjects();

		expect(closeSettingsPresentation).toHaveBeenCalledTimes(1);
		expect(closeMobileDropDownTopBarMenu).toHaveBeenCalledTimes(1);
		expect(closeMobileSubjectPicker).toHaveBeenCalledTimes(1);
	});

	test("språksynk oppdaterer valg uten å lukke overlays", () => {
		setNavigationState({
			activeScreen: NAV_SCREENS.EXAM,
			selectedSubjectId: "inf1000",
			selectedExamId: "exam-1"
		});
		createViewModel();

		const onExamResolved = useSyncSelectedExamWithLanguage.mock.calls[0][0].onExamResolved;
		onExamResolved("exam-1-en", "inf1000");

		expect(hookState[1]).toBe("inf1000");
		expect(hookState[2]).toBe("exam-1-en");
		expect(closeSettingsPresentation).not.toHaveBeenCalled();
		expect(closeMobileDropDownTopBarMenu).not.toHaveBeenCalled();
	});


	test("skiller utilgjengelig eksamen fra teknisk språksynkfeil", () => {
		setNavigationState({
			activeScreen: NAV_SCREENS.EXAM,
			selectedSubjectId: "inf1000",
			selectedExamId: "exam-1"
		});
		createViewModel();

		const syncContract = useSyncSelectedExamWithLanguage.mock.calls[0][0];
		syncContract.onExamUnavailable();
		expect(hookState[0]).toBe(NAV_SCREENS.SELECT);
		expect(hookState[2]).toBeNull();
		expect(hookState[4]).toBe("Eksamen finnes ikke på språket.");

		setNavigationState({
			activeScreen: NAV_SCREENS.EXAM,
			selectedSubjectId: "inf1000",
			selectedExamId: "exam-1"
		});
		createViewModel();
		useSyncSelectedExamWithLanguage.mock.calls.at(-1)[0].onExamSyncFailed();
		expect(hookState[0]).toBe(NAV_SCREENS.SELECT);
		expect(hookState[2]).toBeNull();
		expect(hookState[4]).toBe("Kunne ikke synkronisere eksamen.");
	});

	test.each([
		[NAV_SCREENS.SUBJECTS, "exam-select-page", "exam-select-shell", false],
		[NAV_SCREENS.SELECT, "exam-select-page", "exam-select-shell", true],
		[NAV_SCREENS.EXAM, "exam-page", "exam-shell", true],
		[NAV_SCREENS.FLIPCARDS, "exam-page flipcards-theme-scope", "exam-shell", true],
		[NAV_SCREENS.MATCHCARDS, "exam-page flipcards-theme-scope", "exam-shell", true],
		[NAV_SCREENS.GLOSSARY, "exam-select-page", "exam-select-shell", true],
		[NAV_SCREENS.OVERVIEW, "exam-select-page", "exam-select-shell", true]
	])("deriverer enkel chrome for %s", (screen, pageClassName, shellClassName, showBackButton) => {
		setNavigationState({ activeScreen: screen, selectedSubjectId: "inf1000" });

		const viewModel = createViewModel();

		expect(viewModel.pageClassName).toBe(pageClassName);
		expect(viewModel.shellClassName).toBe(shellClassName);
		expect(viewModel.backContract.showBackButton).toBe(showBackButton);
	});

	test("exposes back navigation only through backContract", () => {
		const viewModel = createViewModel();

		expect(viewModel.backContract).toEqual({
			showBackButton: false,
			backLabel: "Tilbake",
			navigationLabel: "Navigasjon",
			onBack: viewModel.goBack
		});
		expect(viewModel.showBackButton).toBeUndefined();
		expect(viewModel.backLabel).toBeUndefined();
		expect(viewModel.navigationLabel).toBeUndefined();
		expect(viewModel.onBack).toBeUndefined();
	});

	test.each([
		[NAV_SCREENS.SUBJECTS, false],
		[NAV_SCREENS.SELECT, true],
		[NAV_SCREENS.EXAM, true],
		[NAV_SCREENS.FLIPCARDS, true],
		[NAV_SCREENS.MATCHCARDS, true],
		[NAV_SCREENS.GLOSSARY, true],
		[NAV_SCREENS.OVERVIEW, false]
	])("fagbytteren vises på %s: %s", (screen, expected) => {
		setNavigationState({ activeScreen: screen });
		expect(createViewModel().shouldShowSubjectSwitcher).toBe(expected);
	});
});

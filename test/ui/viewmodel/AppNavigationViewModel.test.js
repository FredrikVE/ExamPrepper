// test/ui/viewmodel/AppNavigationViewModel.test.js
import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import { INITIAL_NAV_STATE, NAV_SCREENS } from "../../../src/navigation/navGraph.js";

let navState;
const dispatch = jest.fn();

const useReducer = jest.fn((reducer, initialState) => {
	return [navState ?? initialState, dispatch];
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
	useReducer
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

const createViewModel = () => useAppNavigationViewModel({
	backLabel: "Tilbake",
	navigationLabel: "Navigasjon",
	language: "nb",
	getExamByIdUseCase: {},
	getExamByBaseIdAndLangUseCase: {}
});

beforeEach(() => {
	navState = null;
	jest.clearAllMocks();
});

describe("useAppNavigationViewModel", () => {
	test("eksponerer navigasjonstilstanden flatt", () => {
		navState = {
			screen: NAV_SCREENS.EXAM,
			selectedSubjectId: "inf1000",
			selectedExamId: "exam-1",
			selectedTopicAreaKey: "arrays"
		};

		const viewModel = createViewModel();

		expect(viewModel.activeScreen).toBe(NAV_SCREENS.EXAM);
		expect(viewModel.selectedSubjectId).toBe("inf1000");
		expect(viewModel.selectedExamId).toBe("exam-1");
		expect(viewModel.selectedTopicAreaKey).toBe("arrays");
	});

	test("starter på fagoversikten", () => {
		expect(createViewModel().activeScreen).toBe(INITIAL_NAV_STATE.screen);
	});

	test("navigasjon dispatcher og lukker åpne overlays", () => {
		createViewModel().selectExam("exam-2");

		expect(dispatch).toHaveBeenCalledWith({
			screen: NAV_SCREENS.EXAM,
			selection: { selectedExamId: "exam-2" }
		});
		expect(closeSettingsPresentation).toHaveBeenCalledTimes(1);
		expect(closeMobileDropDownTopBarMenu).toHaveBeenCalledTimes(1);
		expect(closeMobileSubjectPicker).toHaveBeenCalledTimes(1);
	});

	test("navigatorene gjentar ikke grafens nullstilling", () => {
		const viewModel = createViewModel();

		viewModel.selectSubject("inf1010");
		viewModel.selectFlipcardDeck("loops");

		for (const call of dispatch.mock.calls) {
			expect(call[0].selection ?? {}).not.toHaveProperty("selectedExamId", null);
		}
	});

	test("språksynk dispatcher uten skjerm og uten å lukke overlays", () => {
		createViewModel();

		const onExamResolved = useSyncSelectedExamWithLanguage.mock.calls[0][0].onExamResolved;
		onExamResolved("exam-1-en", "inf1000");

		expect(dispatch).toHaveBeenCalledWith({
			selection: { selectedExamId: "exam-1-en", selectedSubjectId: "inf1000" }
		});
		expect(closeSettingsPresentation).not.toHaveBeenCalled();
		expect(closeMobileDropDownTopBarMenu).not.toHaveBeenCalled();
	});

	test("tilbake-kontrakten henter showBackButton fra grafen og teksten fra params", () => {
		navState = { ...INITIAL_NAV_STATE, screen: NAV_SCREENS.EXAM, selectedSubjectId: "inf1000", selectedExamId: "exam-1" };

		const viewModel = createViewModel();

		expect(viewModel.backContract.showBackButton).toBe(true);
		expect(viewModel.backContract.backLabel).toBe("Tilbake");
		expect(viewModel.backContract.navigationLabel).toBe("Navigasjon");
		expect(viewModel.backContract.onBack).toBe(viewModel.goBack);
	});

	test("fagoversikten har ingen tilbake-knapp", () => {
		expect(createViewModel().backContract.showBackButton).toBe(false);
	});

	test("chrome-klassene kommer fra grafen", () => {
		navState = { ...INITIAL_NAV_STATE, screen: NAV_SCREENS.EXAM, selectedSubjectId: "inf1000", selectedExamId: "exam-1" };

		const viewModel = createViewModel();

		expect(viewModel.pageClassName).toBe("exam-page");
		expect(viewModel.shellClassName).toBe("exam-shell");
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
		navState = { ...INITIAL_NAV_STATE, screen };

		expect(createViewModel().shouldShowSubjectSwitcher).toBe(expected);
	});
});

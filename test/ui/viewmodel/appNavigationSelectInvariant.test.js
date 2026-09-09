// test/ui/viewmodel/appNavigationSelectInvariant.test.js
import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import { DEFAULT_SELECT_CONTENT_ENTRY_ID, LEARNING_CONTENT_TYPES, NAV_SCREENS, TEST_TYPES } from "../../../src/navigation/navigation.js";

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

const mobileTopBarModel = {
	isMobileDropDownTopBarMenuOpen: false,
	isMobileSubjectPickerOpen: false,
	toggleMobileDropDownTopBarMenu: jest.fn(),
	closeMobileDropDownTopBarMenu: jest.fn(),
	toggleMobileSubjectPicker: jest.fn(),
	closeMobileSubjectPicker: jest.fn()
};

const settingsPresentationModel = {
	isSettingsPresentationOpen: false,
	settingsPresentationMode: "closed",
	openSettingsPresentation: jest.fn(),
	closeSettingsPresentation: jest.fn()
};

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
	default: jest.fn()
}));

const { default: useAppNavigationViewModel } = await import("../../../src/ui/viewmodel/AppNavigationViewModel.js");

function setNavigationState(activeScreen, selectedLearningContentEntryId) {
	hookState = [activeScreen, "in2120", null, null, null, null, null, null, selectedLearningContentEntryId];
}

function createViewModel() {
	stateIndex = 0;

	return useAppNavigationViewModel({
		backLabel: "Tilbake",
		navigationLabel: "Navigasjon",
		language: "nb",
		getExamByIdUseCase: { id: "exam-by-id" },
		getExamByBaseIdAndLangUseCase: { id: "exam-by-base-lang" },
		getChapterTestByIdUseCase: { id: "chapter-by-id" },
		getChapterTestByBaseIdAndLangUseCase: { id: "chapter-by-base-lang" },
		examUnavailableMessage: "Eksamen finnes ikke på språket.",
		examSyncFailedMessage: "Kunne ikke synkronisere eksamen."
	});
}

beforeEach(() => {
	setNavigationState(NAV_SCREENS.OVERVIEW, DEFAULT_SELECT_CONTENT_ENTRY_ID);
	jest.clearAllMocks();
});

describe("SELECT-invarianten gjennom offentlig navigasjonskontrakt", () => {
	test.each([
		LEARNING_CONTENT_TYPES.LEARNING_PATH,
		LEARNING_CONTENT_TYPES.GLOSSARY
	])("changeScreen(SELECT) resetter %s", (entryId) => {
		setNavigationState(NAV_SCREENS.OVERVIEW, entryId);

		createViewModel().changeScreen(NAV_SCREENS.SELECT);

		expect(hookState[0]).toBe(NAV_SCREENS.SELECT);
		expect(hookState[8]).toBe(DEFAULT_SELECT_CONTENT_ENTRY_ID);
	});

	test.each([
		LEARNING_CONTENT_TYPES.FLIPCARDS,
		LEARNING_CONTENT_TYPES.MATCHCARDS,
		TEST_TYPES.CHAPTER_TEST,
		LEARNING_CONTENT_TYPES.EXAMS
	])("changeScreen(SELECT) beholder %s", (entryId) => {
		setNavigationState(NAV_SCREENS.OVERVIEW, entryId);

		createViewModel().changeScreen(NAV_SCREENS.SELECT);

		expect(hookState[0]).toBe(NAV_SCREENS.SELECT);
		expect(hookState[8]).toBe(entryId);
	});

});

describe("Statistics tilbakekontrakt gjennom offentlig navigasjon", () => {
	test("Læringsti → Statistikk → goBack går tilbake til Læringsti uten throw", () => {
		setNavigationState(NAV_SCREENS.OVERVIEW, LEARNING_CONTENT_TYPES.LEARNING_PATH);
		const viewModel = createViewModel();

		expect(() => viewModel.goBack()).not.toThrow();
		expect(hookState[0]).toBe(NAV_SCREENS.LEARNING_PATH);
		expect(hookState[8]).toBe(LEARNING_CONTENT_TYPES.LEARNING_PATH);
	});

	test("Begrepsliste → Statistikk → goBack går til Læringsti uten SELECT-reset", () => {
		setNavigationState(NAV_SCREENS.OVERVIEW, LEARNING_CONTENT_TYPES.GLOSSARY);

		createViewModel().goBack();

		expect(hookState[0]).toBe(NAV_SCREENS.LEARNING_PATH);
		expect(hookState[8]).toBe(LEARNING_CONTENT_TYPES.GLOSSARY);
	});
});

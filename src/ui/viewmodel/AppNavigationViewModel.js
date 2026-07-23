// src/ui/viewmodel/AppNavigationViewModel.js
import { useCallback, useReducer } from "react";
import { INITIAL_NAV_STATE, NAV_SCREENS, resolveNavigation, resolveScreenChrome } from "../../navigation/navGraph.js";
import useMobileDropDownTopBarModel from "./AppNavigation/useMobileDropDownTopBarModel.js";
import useSettingsPresentationModel from "./AppNavigation/useSettingsPresentationModel.js";
import useSyncSelectedExamWithLanguage from "./AppNavigation/useSyncSelectedExamWithLanguage.js";

export default function useAppNavigationViewModel(params) {
	// resolveNavigation er allerede reducer-formet, så den brukes direkte.
	const [navState, dispatch] = useReducer(resolveNavigation, INITIAL_NAV_STATE);
	const { screen: activeScreen, selectedSubjectId, selectedExamId, selectedTopicAreaKey } = navState;

	// Layout-state
	const mobileTopBar = useMobileDropDownTopBarModel();
	const settingsPresentation = useSettingsPresentationModel();


	const closeMobileDropDownTopBarMenu = useCallback(() => {
		mobileTopBar.closeMobileDropDownTopBarMenu();
		settingsPresentation.closeSettingsPresentation();
		mobileTopBar.closeMobileSubjectPicker();
	}, [
		mobileTopBar.closeMobileDropDownTopBarMenu,
		mobileTopBar.closeMobileSubjectPicker,
		settingsPresentation.closeSettingsPresentation
	]);

	// Navigasjon lukker alltid åpne overlays. Dispatch er stabil, så
	// navigatorene under trenger ingen state-dependencies.
	const navigate = useCallback((action) => {
		dispatch(action);

		settingsPresentation.closeSettingsPresentation();
		mobileTopBar.closeMobileDropDownTopBarMenu();
		mobileTopBar.closeMobileSubjectPicker();
	}, [
		mobileTopBar.closeMobileDropDownTopBarMenu,
		mobileTopBar.closeMobileSubjectPicker,
		settingsPresentation.closeSettingsPresentation
	]);

	const changeScreen = useCallback((nextScreen) => {
		navigate({ screen: nextScreen });
	}, [navigate]);

	const selectSubject = useCallback((subjectId) => {
		navigate({ screen: NAV_SCREENS.SELECT, selection: { selectedSubjectId: subjectId } });
	}, [navigate]);

	const showAllSubjects = useCallback(() => {
		navigate({ screen: NAV_SCREENS.SUBJECTS });
	}, [navigate]);

	const selectExam = useCallback((examId) => {
		navigate({ screen: NAV_SCREENS.EXAM, selection: { selectedExamId: examId } });
	}, [navigate]);

	const selectFlipcardDeck = useCallback((topicAreaKey) => {
		navigate({ screen: NAV_SCREENS.FLIPCARDS, selection: { selectedTopicAreaKey: topicAreaKey ?? null } });
	}, [navigate]);

	const selectMatchCardsDeck = useCallback((topicAreaKey) => {
		navigate({ screen: NAV_SCREENS.MATCHCARDS, selection: { selectedTopicAreaKey: topicAreaKey ?? null } });
	}, [navigate]);

	// Intern: eneste bruk er når språkbytte gjør valgt eksamen utilgjengelig.
	const backToExamList = useCallback(() => {
		navigate({ screen: NAV_SCREENS.SELECT });
	}, [navigate]);

	const goBack = useCallback(() => {
		navigate({ back: true });
	}, [navigate]);

	// Uten screen: bli stående, bytt bare valgt eksamen. Går utenom navigate(),
	// fordi språksynk ikke skal lukke åpne overlays.
	const resolveSyncedExam = useCallback((examId, subjectId) => {
		dispatch({ selection: { selectedExamId: examId, selectedSubjectId: subjectId } });
	}, []);

	const handleSyncedExamUnavailable = useCallback(() => {
		backToExamList();
	}, [backToExamList]);

	useSyncSelectedExamWithLanguage({
		language: params.language,
		activeScreen,
		selectedExamId,
		selectedSubjectId,
		getExamByIdUseCase: params.getExamByIdUseCase,
		getExamByBaseIdAndLangUseCase: params.getExamByBaseIdAndLangUseCase,
		onExamResolved: resolveSyncedExam,
		onExamUnavailable: handleSyncedExamUnavailable
	});

	const shouldShowSubjectSwitcher =
		activeScreen === NAV_SCREENS.SELECT ||
		activeScreen === NAV_SCREENS.EXAM ||
		activeScreen === NAV_SCREENS.FLIPCARDS ||
		activeScreen === NAV_SCREENS.MATCHCARDS ||
		activeScreen === NAV_SCREENS.GLOSSARY;

	const { pageClassName, shellClassName, showBackButton } = resolveScreenChrome(activeScreen);

	// Grafen avgjør OM knappen vises, ViewModel-laget eier tekst og handler.
	const backContract = {
		showBackButton,
		backLabel: params.backLabel,
		navigationLabel: params.navigationLabel,
		onBack: goBack
	};

	return {
		// Navigasjon
		activeScreen,
		selectedSubjectId,
		selectedExamId,
		selectedTopicAreaKey,
		shouldShowSubjectSwitcher,
		backContract,
		showBackButton: backContract.showBackButton,
		backLabel: backContract.backLabel,
		navigationLabel: backContract.navigationLabel,
		onBack: backContract.onBack,
		pageClassName,
		shellClassName,

		// Layout
		isSettingsPresentationOpen: settingsPresentation.isSettingsPresentationOpen,
		isMobileDropDownTopBarMenuOpen: mobileTopBar.isMobileDropDownTopBarMenuOpen,
		isMobileSubjectPickerOpen: mobileTopBar.isMobileSubjectPickerOpen,
		settingsPresentationMode: settingsPresentation.settingsPresentationMode,

		// Handlers
		closeSettingsPresentation: settingsPresentation.closeSettingsPresentation,
		toggleMobileDropDownTopBarMenu: mobileTopBar.toggleMobileDropDownTopBarMenu,
		closeMobileDropDownTopBarMenu,
		openSettingsPresentation: settingsPresentation.openSettingsPresentation,
		backFromSettingsToMobileDropDownTopBarMenu: settingsPresentation.closeSettingsPresentation,
		toggleMobileSubjectPicker: mobileTopBar.toggleMobileSubjectPicker,
		closeMobileSubjectPicker: mobileTopBar.closeMobileSubjectPicker,
		changeScreen,
		selectSubject,
		showAllSubjects,
		selectExam,
		selectFlipcardDeck,
		selectMatchCardsDeck,
		goBack
	};
}

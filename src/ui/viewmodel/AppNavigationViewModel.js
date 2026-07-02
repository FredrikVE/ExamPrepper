// src/ui/viewmodel/AppNavigationViewModel.js
import { useCallback, useState } from "react";
import { APP_LAYOUTS, NAV_SCREENS, createAppBackContract, resolveBackNavigation, resolveScreenEntry, resolveScreenLayout } from "../../navigation/navGraph.js";
import useMobileDropDownTopBarModel from "./AppNavigation/useMobileDropDownTopBarModel.js";
import useSettingsPresentationModel from "./AppNavigation/useSettingsPresentationModel.js";
import useSyncSelectedExamWithLanguage from "./AppNavigation/useSyncSelectedExamWithLanguage.js";

export function createAppLayoutClassNames(activeScreen) {
	const appLayout = resolveScreenLayout(activeScreen);
	const usesSelectionLayout = appLayout === APP_LAYOUTS.SELECTION;
	const usesFlipcardsThemeScope = activeScreen === NAV_SCREENS.FLIPCARDS;

	return {
		pageClassName: [
			usesSelectionLayout ? "exam-select-page" : "exam-page",
			usesFlipcardsThemeScope ? "flipcards-theme-scope" : null
		].filter(Boolean).join(" "),
		shellClassName: usesSelectionLayout ? "exam-select-shell" : "exam-shell"
	};
}

export default function useAppNavigationViewModel(params) {
	// Navigasjons-state
	const [activeScreen, setActiveScreen] = useState(NAV_SCREENS.SUBJECTS);
	const [selectedSubjectId, setSelectedSubjectId] = useState(null);
	const [selectedExamId, setSelectedExamId] = useState(null);

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

	const applyNavigation = useCallback((nextNavState) => {
		if (!nextNavState) {
			return;
		}

		setActiveScreen(nextNavState.screen);
		setSelectedSubjectId(nextNavState.selectedSubjectId);
		setSelectedExamId(nextNavState.selectedExamId);

		settingsPresentation.closeSettingsPresentation();
		mobileTopBar.closeMobileDropDownTopBarMenu();
		mobileTopBar.closeMobileSubjectPicker();
	}, [
		mobileTopBar.closeMobileDropDownTopBarMenu,
		mobileTopBar.closeMobileSubjectPicker,
		settingsPresentation.closeSettingsPresentation
	]);

	const changeScreen = useCallback((nextScreen) => {
		applyNavigation(resolveScreenEntry(nextScreen, {
			selectedSubjectId,
			selectedExamId
		}));
	}, [selectedSubjectId, selectedExamId, applyNavigation]);

	const selectSubject = useCallback((subjectId) => {
		applyNavigation(resolveScreenEntry(NAV_SCREENS.SELECT, {
			selectedSubjectId: subjectId,
			selectedExamId: null
		}));
	}, [applyNavigation]);

	const showAllSubjects = useCallback(() => {
		changeScreen(NAV_SCREENS.SUBJECTS);
	}, [changeScreen]);

	const selectExam = useCallback((examId) => {
		applyNavigation(resolveScreenEntry(NAV_SCREENS.EXAM, {
			selectedSubjectId,
			selectedExamId: examId
		}));
	}, [selectedSubjectId, applyNavigation]);

	const showStatistics = useCallback(() => {
		changeScreen(NAV_SCREENS.OVERVIEW);
	}, [changeScreen]);

	const backToExamList = useCallback(() => {
		applyNavigation(resolveScreenEntry(NAV_SCREENS.SELECT, {
			selectedSubjectId,
			selectedExamId
		}));
	}, [selectedSubjectId, selectedExamId, applyNavigation]);

	const goBack = useCallback(() => {
		applyNavigation(resolveBackNavigation({
			activeScreen,
			selectedSubjectId,
			selectedExamId
		}));
	}, [activeScreen, selectedSubjectId, selectedExamId, applyNavigation]);

	const resolveSyncedExam = useCallback((examId, subjectId) => {
		setSelectedExamId(examId);
		setSelectedSubjectId(subjectId);
	}, []);

	useSyncSelectedExamWithLanguage({
		language: params.language,
		activeScreen,
		selectedExamId,
		selectedSubjectId,
		getExamByIdUseCase: params.getExamByIdUseCase,
		getExamByBaseIdAndLangUseCase: params.getExamByBaseIdAndLangUseCase,
		onExamResolved: resolveSyncedExam,
		onExamUnavailable: backToExamList
	});

	const isSelectionScreen =
		activeScreen === NAV_SCREENS.SUBJECTS ||
		activeScreen === NAV_SCREENS.SELECT;

	const shouldShowSubjectSwitcher =
		activeScreen === NAV_SCREENS.SELECT ||
		activeScreen === NAV_SCREENS.EXAM ||
		activeScreen === NAV_SCREENS.FLIPCARDS;

	const backContract = createAppBackContract({
		activeScreen,
		backLabel: params.backLabel,
		navigationLabel: params.navigationLabel,
		onBack: goBack
	});

	const { pageClassName, shellClassName } = createAppLayoutClassNames(activeScreen);

	return {
		// Navigasjon
		activeScreen,
		selectedSubjectId,
		selectedExamId,
		isSelectionScreen,
		shouldShowSubjectSwitcher,
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
		showStatistics,
		selectExam,
		backToExamList,
		goBack
	};
}

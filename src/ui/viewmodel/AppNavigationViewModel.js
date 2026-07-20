// src/ui/viewmodel/AppNavigationViewModel.js
import { useCallback, useState } from "react";
import { APP_LAYOUTS, NAV_SCREENS, createAppBackContract, resolveBackNavigation, resolveScreenEntry, resolveScreenLayout } from "../../navigation/navGraph.js";
import useMobileDropDownTopBarModel from "./AppNavigation/useMobileDropDownTopBarModel.js";
import useSettingsPresentationModel from "./AppNavigation/useSettingsPresentationModel.js";
import useSyncSelectedExamWithLanguage from "./AppNavigation/useSyncSelectedExamWithLanguage.js";

export function createAppLayoutClassNames(activeScreen) {
	const appLayout = resolveScreenLayout(activeScreen);
	const usesSelectionLayout = appLayout === APP_LAYOUTS.SELECTION;
	const usesFlipcardsThemeScope = activeScreen === NAV_SCREENS.FLIPCARDS || activeScreen === NAV_SCREENS.MATCHCARDS;

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
	const [selectedTopicAreaKey, setSelectedTopicAreaKey] = useState(null);

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
		setSelectedTopicAreaKey(nextNavState.selectedTopicAreaKey ?? null);

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
			selectedExamId,
			selectedTopicAreaKey
		}));
	}, [selectedSubjectId, selectedExamId, selectedTopicAreaKey, applyNavigation]);

	const selectSubject = useCallback((subjectId) => {
		applyNavigation(resolveScreenEntry(NAV_SCREENS.SELECT, {
			selectedSubjectId: subjectId,
			selectedExamId: null,
			selectedTopicAreaKey: null
		}));
	}, [applyNavigation]);

	const showAllSubjects = useCallback(() => {
		changeScreen(NAV_SCREENS.SUBJECTS);
	}, [changeScreen]);

	const selectExam = useCallback((examId) => {
		applyNavigation(resolveScreenEntry(NAV_SCREENS.EXAM, {
			selectedSubjectId,
			selectedExamId: examId,
			selectedTopicAreaKey
		}));
	}, [selectedSubjectId, selectedTopicAreaKey, applyNavigation]);

	const selectFlipcardDeck = useCallback((topicAreaKey) => {
		applyNavigation(resolveScreenEntry(NAV_SCREENS.FLIPCARDS, {
			selectedSubjectId,
			selectedExamId: null,
			selectedTopicAreaKey: topicAreaKey ?? null
		}));
	}, [selectedSubjectId, applyNavigation]);

	const selectMatchCardsDeck = useCallback((topicAreaKey) => {
		applyNavigation(resolveScreenEntry(NAV_SCREENS.MATCHCARDS, {
			selectedSubjectId,
			selectedExamId: null,
			selectedTopicAreaKey: topicAreaKey ?? null
		}));
	}, [selectedSubjectId, applyNavigation]);

	const selectGlossary = useCallback((topicAreaKey = null) => {
		applyNavigation(resolveScreenEntry(NAV_SCREENS.GLOSSARY, {
			selectedSubjectId,
			selectedExamId: null,
			selectedTopicAreaKey: topicAreaKey ?? null
		}));
	}, [selectedSubjectId, applyNavigation]);

	const showStatistics = useCallback(() => {
		changeScreen(NAV_SCREENS.OVERVIEW);
	}, [changeScreen]);

	const backToExamList = useCallback(() => {
		applyNavigation(resolveScreenEntry(NAV_SCREENS.SELECT, {
			selectedSubjectId,
			selectedExamId,
			selectedTopicAreaKey
		}));
	}, [selectedSubjectId, selectedExamId, selectedTopicAreaKey, applyNavigation]);

	const goBack = useCallback(() => {
		applyNavigation(resolveBackNavigation({
			activeScreen,
			selectedSubjectId,
			selectedExamId,
			selectedTopicAreaKey
		}));
	}, [activeScreen, selectedSubjectId, selectedExamId, selectedTopicAreaKey, applyNavigation]);

	const resolveSyncedExam = useCallback((examId, subjectId) => {
		setSelectedExamId(examId);
		setSelectedSubjectId(subjectId);
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

	const isSelectionScreen =
		activeScreen === NAV_SCREENS.SUBJECTS ||
		activeScreen === NAV_SCREENS.SELECT;

	const shouldShowSubjectSwitcher =
		activeScreen === NAV_SCREENS.SELECT ||
		activeScreen === NAV_SCREENS.EXAM ||
		activeScreen === NAV_SCREENS.FLIPCARDS ||
		activeScreen === NAV_SCREENS.MATCHCARDS ||
		activeScreen === NAV_SCREENS.GLOSSARY;

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
		selectedTopicAreaKey,
		isSelectionScreen,
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
		showStatistics,
		selectExam,
		selectFlipcardDeck,
		selectMatchCardsDeck,
		selectGlossary,
		backToExamList,
		goBack
	};
}

// src/ui/viewmodel/AppNavigationViewModel.js
import { useCallback, useState } from "react";
import { getScreenConfig, NAV_SCREENS } from "../../navigation/navigation.js";
import useMobileDropDownTopBarModel from "./AppNavigation/useMobileDropDownTopBarModel.js";
import useSettingsPresentationModel from "./AppNavigation/useSettingsPresentationModel.js";
import useSyncSelectedExamWithLanguage from "./AppNavigation/useSyncSelectedExamWithLanguage.js";

export default function useAppNavigationViewModel(params) {
	const [activeScreen, setActiveScreen] = useState(NAV_SCREENS.SUBJECTS);
	const [selectedSubjectId, setSelectedSubjectId] = useState(null);
	const [selectedExamId, setSelectedExamId] = useState(null);
	const [selectedTopicAreaKey, setSelectedTopicAreaKey] = useState(null);
	const [examLanguageSyncError, setExamLanguageSyncError] = useState(null);

	const mobileTopBar = useMobileDropDownTopBarModel();
	const settingsPresentation = useSettingsPresentationModel();

	const closeNavigationOverlays = useCallback(() => {
		settingsPresentation.closeSettingsPresentation();
		mobileTopBar.closeMobileDropDownTopBarMenu();
		mobileTopBar.closeMobileSubjectPicker();
	}, [
		mobileTopBar.closeMobileDropDownTopBarMenu,
		mobileTopBar.closeMobileSubjectPicker,
		settingsPresentation.closeSettingsPresentation
	]);

	const closeMobileDropDownTopBarMenu = useCallback(() => {
		closeNavigationOverlays();
	}, [closeNavigationOverlays]);

	const showAllSubjects = useCallback(() => {
		setExamLanguageSyncError(null);
		setActiveScreen(NAV_SCREENS.SUBJECTS);
		setSelectedSubjectId(null);
		setSelectedExamId(null);
		setSelectedTopicAreaKey(null);
		closeNavigationOverlays();
	}, [closeNavigationOverlays]);

	const changeScreen = useCallback((nextScreen) => {
		const nextScreenConfig = getScreenConfig(nextScreen);

		if (nextScreenConfig.requiresExam && !selectedExamId) {
			return;
		}

		if (nextScreenConfig.requiresSubject && !selectedSubjectId) {
			showAllSubjects();
			return;
		}

		if (nextScreen === NAV_SCREENS.SUBJECTS) {
			showAllSubjects();
			return;
		}

		setExamLanguageSyncError(null);

		if (nextScreen !== NAV_SCREENS.EXAM) {
			setSelectedExamId(null);
		}

		if (nextScreen === NAV_SCREENS.SELECT || nextScreen === NAV_SCREENS.GLOSSARY) {
			setSelectedTopicAreaKey(null);
		}

		setActiveScreen(nextScreen);
		closeNavigationOverlays();
	}, [closeNavigationOverlays, selectedExamId, selectedSubjectId, showAllSubjects]);

	const selectSubject = useCallback((subjectId) => {
		setExamLanguageSyncError(null);
		setSelectedSubjectId(subjectId);
		setSelectedExamId(null);
		setSelectedTopicAreaKey(null);
		setActiveScreen(NAV_SCREENS.SELECT);
		closeNavigationOverlays();
	}, [closeNavigationOverlays]);

	const selectExam = useCallback((examId) => {
		if (!examId) {
			return;
		}

		setExamLanguageSyncError(null);
		setSelectedExamId(examId);
		setActiveScreen(NAV_SCREENS.EXAM);
		closeNavigationOverlays();
	}, [closeNavigationOverlays]);

	const selectFlipcardDeck = useCallback((topicAreaKey) => {
		if (!selectedSubjectId) {
			showAllSubjects();
			return;
		}

		setExamLanguageSyncError(null);
		setSelectedExamId(null);
		setSelectedTopicAreaKey(topicAreaKey ?? null);
		setActiveScreen(NAV_SCREENS.FLIPCARDS);
		closeNavigationOverlays();
	}, [closeNavigationOverlays, selectedSubjectId, showAllSubjects]);

	const selectMatchCardsDeck = useCallback((topicAreaKey) => {
		if (!selectedSubjectId) {
			showAllSubjects();
			return;
		}

		setExamLanguageSyncError(null);
		setSelectedExamId(null);
		setSelectedTopicAreaKey(topicAreaKey ?? null);
		setActiveScreen(NAV_SCREENS.MATCHCARDS);
		closeNavigationOverlays();
	}, [closeNavigationOverlays, selectedSubjectId, showAllSubjects]);

	const goBack = useCallback(() => {
		const activeScreenConfig = getScreenConfig(activeScreen);

		if (activeScreenConfig.backTo === null) {
			return;
		}

		if (activeScreenConfig.backTo === NAV_SCREENS.SUBJECTS) {
			showAllSubjects();
			return;
		}

		changeScreen(activeScreenConfig.backTo);
	}, [activeScreen, changeScreen, showAllSubjects]);

	// Språkbytte skal oppdatere valgt eksamen uten å lukke åpne menyer.
	const resolveSyncedExam = useCallback((examId, subjectId) => {
		setExamLanguageSyncError(null);
		setSelectedExamId(examId);
		setSelectedSubjectId(subjectId);
	}, []);

	const handleSyncedExamUnavailable = useCallback(() => {
		changeScreen(NAV_SCREENS.SELECT);
		setExamLanguageSyncError(params.examUnavailableMessage);
	}, [changeScreen, params.examUnavailableMessage]);

	const handleSyncedExamSyncFailed = useCallback(() => {
		changeScreen(NAV_SCREENS.SELECT);
		setExamLanguageSyncError(params.examSyncFailedMessage);
	}, [changeScreen, params.examSyncFailedMessage]);

	useSyncSelectedExamWithLanguage({
		language: params.language,
		activeScreen,
		selectedExamId,
		selectedSubjectId,
		getExamByIdUseCase: params.getExamByIdUseCase,
		getExamByBaseIdAndLangUseCase: params.getExamByBaseIdAndLangUseCase,
		onExamResolved: resolveSyncedExam,
		onExamUnavailable: handleSyncedExamUnavailable,
		onExamSyncFailed: handleSyncedExamSyncFailed
	});

	const activeScreenConfig = getScreenConfig(activeScreen);
	const shouldShowSubjectSwitcher = activeScreenConfig.showsSubjectSwitcher;
	const pageClassName = activeScreenConfig.pageClassName;
	const shellClassName = activeScreenConfig.shellClassName;
	const showBackButton = activeScreenConfig.backTo !== null;

	const backContract = {
		showBackButton,
		backLabel: params.backLabel,
		navigationLabel: params.navigationLabel,
		onBack: goBack
	};

	return {
		activeScreen,
		selectedSubjectId,
		selectedExamId,
		selectedTopicAreaKey,
		examLanguageSyncError,
		shouldShowSubjectSwitcher,
		backContract,
		pageClassName,
		shellClassName,

		isSettingsPresentationOpen: settingsPresentation.isSettingsPresentationOpen,
		isMobileDropDownTopBarMenuOpen: mobileTopBar.isMobileDropDownTopBarMenuOpen,
		isMobileSubjectPickerOpen: mobileTopBar.isMobileSubjectPickerOpen,
		settingsPresentationMode: settingsPresentation.settingsPresentationMode,

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

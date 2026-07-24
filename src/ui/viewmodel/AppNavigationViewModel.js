// src/ui/viewmodel/AppNavigationViewModel.js
import { useCallback, useState } from "react";
import { NAV_SCREENS } from "../../navigation/navigation.js";
import useMobileDropDownTopBarModel from "./AppNavigation/useMobileDropDownTopBarModel.js";
import useSettingsPresentationModel from "./AppNavigation/useSettingsPresentationModel.js";
import useSyncSelectedExamWithLanguage from "./AppNavigation/useSyncSelectedExamWithLanguage.js";

const SUBJECT_SCREENS = new Set([
	NAV_SCREENS.SELECT,
	NAV_SCREENS.FLIPCARDS,
	NAV_SCREENS.MATCHCARDS,
	NAV_SCREENS.GLOSSARY
]);

const SUBJECT_SWITCHER_SCREENS = new Set([
	NAV_SCREENS.SELECT,
	NAV_SCREENS.EXAM,
	NAV_SCREENS.FLIPCARDS,
	NAV_SCREENS.MATCHCARDS,
	NAV_SCREENS.GLOSSARY
]);

const VALID_SCREENS = new Set(Object.values(NAV_SCREENS));

export default function useAppNavigationViewModel(params) {
	const [activeScreen, setActiveScreen] = useState(NAV_SCREENS.SUBJECTS);
	const [selectedSubjectId, setSelectedSubjectId] = useState(null);
	const [selectedExamId, setSelectedExamId] = useState(null);
	const [selectedTopicAreaKey, setSelectedTopicAreaKey] = useState(null);

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
		setActiveScreen(NAV_SCREENS.SUBJECTS);
		setSelectedSubjectId(null);
		setSelectedExamId(null);
		setSelectedTopicAreaKey(null);
		closeNavigationOverlays();
	}, [closeNavigationOverlays]);

	const changeScreen = useCallback((nextScreen) => {
		if (!VALID_SCREENS.has(nextScreen)) {
			return;
		}

		if (nextScreen === NAV_SCREENS.EXAM && !selectedExamId) {
			return;
		}

		if (SUBJECT_SCREENS.has(nextScreen) && !selectedSubjectId) {
			showAllSubjects();
			return;
		}

		if (nextScreen === NAV_SCREENS.SUBJECTS) {
			showAllSubjects();
			return;
		}

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

		setSelectedExamId(examId);
		setActiveScreen(NAV_SCREENS.EXAM);
		closeNavigationOverlays();
	}, [closeNavigationOverlays]);

	const selectFlipcardDeck = useCallback((topicAreaKey) => {
		if (!selectedSubjectId) {
			showAllSubjects();
			return;
		}

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

		setSelectedExamId(null);
		setSelectedTopicAreaKey(topicAreaKey ?? null);
		setActiveScreen(NAV_SCREENS.MATCHCARDS);
		closeNavigationOverlays();
	}, [closeNavigationOverlays, selectedSubjectId, showAllSubjects]);

	const goBack = useCallback(() => {
		if (activeScreen === NAV_SCREENS.SUBJECTS) {
			return;
		}

		if (activeScreen === NAV_SCREENS.SELECT) {
			showAllSubjects();
			return;
		}

		changeScreen(NAV_SCREENS.SELECT);
	}, [activeScreen, changeScreen, showAllSubjects]);

	// Språkbytte skal oppdatere valgt eksamen uten å lukke åpne menyer.
	const resolveSyncedExam = useCallback((examId, subjectId) => {
		setSelectedExamId(examId);
		setSelectedSubjectId(subjectId);
	}, []);

	const handleSyncedExamUnavailable = useCallback(() => {
		changeScreen(NAV_SCREENS.SELECT);
	}, [changeScreen]);

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

	const shouldShowSubjectSwitcher = SUBJECT_SWITCHER_SCREENS.has(activeScreen);
	const isPracticeScreen =
		activeScreen === NAV_SCREENS.FLIPCARDS ||
		activeScreen === NAV_SCREENS.MATCHCARDS;
	const pageClassName = isPracticeScreen
		? "exam-page flipcards-theme-scope"
		: activeScreen === NAV_SCREENS.EXAM
			? "exam-page"
			: "exam-select-page";
	const shellClassName = activeScreen === NAV_SCREENS.EXAM || isPracticeScreen
		? "exam-shell"
		: "exam-select-shell";
	const showBackButton = activeScreen !== NAV_SCREENS.SUBJECTS;

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
		shouldShowSubjectSwitcher,
		backContract,
		showBackButton,
		backLabel: backContract.backLabel,
		navigationLabel: backContract.navigationLabel,
		onBack: goBack,
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

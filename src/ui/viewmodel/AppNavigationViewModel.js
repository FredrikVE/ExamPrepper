//src/ui/viewmodel/AppNavigationViewModel.js
import { useCallback, useState } from "react";
import { getLearningContentNavigationEntry, getScreenConfig, LEARNING_CONTENT_TYPES, NAV_SCREENS, SUBJECT_SWITCH_TARGET_SCREENS, TEST_TYPES } from "../../navigation/navigation.js";
import useMobileDropDownTopBarModel from "./AppNavigation/useMobileDropDownTopBarModel.js";
import useSettingsPresentationModel from "./AppNavigation/useSettingsPresentationModel.js";
import useSyncSelectedExamWithLanguage from "./AppNavigation/useSyncSelectedExamWithLanguage.js";

export default function useAppNavigationViewModel(props) {
	const [activeScreen, setActiveScreen] = useState(NAV_SCREENS.SUBJECTS);
	const [selectedSubjectId, setSelectedSubjectId] = useState(null);
	const [selectedExamId, setSelectedExamId] = useState(null);
	const [selectedTopicAreaKey, setSelectedTopicAreaKey] = useState(null);
	const [selectedLearningSessionId, setSelectedLearningSessionId] = useState(null);
	const [examLanguageSyncError, setExamLanguageSyncError] = useState(null);
	const [selectedExamTestType, setSelectedExamTestType] = useState(null);
	const [examReturnScreen, setExamReturnScreen] = useState(null);
	const [selectedLearningContentEntryId, setSelectedLearningContentEntryId] = useState(LEARNING_CONTENT_TYPES.EXAMS);

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
		setSelectedExamTestType(null);
		setExamReturnScreen(null);
		setSelectedTopicAreaKey(null);
		setSelectedLearningSessionId(null);
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
			setSelectedExamTestType(null);
			setExamReturnScreen(null);
		}

		if (nextScreen !== NAV_SCREENS.LEARNING_SESSION) {
			setSelectedLearningSessionId(null);
		}

		if (nextScreen === NAV_SCREENS.SELECT || nextScreen === NAV_SCREENS.GLOSSARY) {
			setSelectedTopicAreaKey(null);
		}

		setActiveScreen(nextScreen);
		closeNavigationOverlays();
	}, [closeNavigationOverlays, selectedExamId, selectedSubjectId, showAllSubjects]);

	const applySubjectSelection = useCallback((subjectId, nextScreen) => {
		setExamLanguageSyncError(null);
		setSelectedSubjectId(subjectId);
		setSelectedExamId(null);
		setSelectedExamTestType(null);
		setExamReturnScreen(null);
		setSelectedTopicAreaKey(null);
		setSelectedLearningSessionId(null);
		setActiveScreen(nextScreen);
		closeNavigationOverlays();
	}, [closeNavigationOverlays]);

	const selectSubject = useCallback((subjectId) => {
		applySubjectSelection(subjectId, NAV_SCREENS.LEARNING_PATH);
	}, [applySubjectSelection]);

	const switchSubject = useCallback((subjectId) => {
		const nextScreen = SUBJECT_SWITCH_TARGET_SCREENS[activeScreen] ?? NAV_SCREENS.LEARNING_PATH;

		applySubjectSelection(subjectId, nextScreen);
	}, [activeScreen, applySubjectSelection]);

	const selectLearningContent = useCallback((entryId) => {
		const entry = getLearningContentNavigationEntry(entryId);

		if (entry.isDisabled) {
			return;
		}

		if (entry.contentTypeId === null) {
			throw new Error(`Enabled learning content entry '${String(entryId)}' has no contentTypeId`);
		}

		setExamLanguageSyncError(null);
		setSelectedLearningContentEntryId(entry.id);
		setSelectedTopicAreaKey(null);

		if (entry.targetScreen !== NAV_SCREENS.EXAM) {
			setSelectedExamId(null);
			setSelectedExamTestType(null);
			setExamReturnScreen(null);
		}

		if (entry.targetScreen !== NAV_SCREENS.LEARNING_SESSION) {
			setSelectedLearningSessionId(null);
		}

		setActiveScreen(entry.targetScreen);
		closeNavigationOverlays();
	}, [closeNavigationOverlays]);

	const selectExam = useCallback((examId, testType) => {
		if (!examId) {
			return;
		}

		if (testType !== TEST_TYPES.EXAM && testType !== TEST_TYPES.CHAPTER_TEST) {
			throw new Error(`Unknown selected test type: ${String(testType)}`);
		}

		setExamLanguageSyncError(null);
		setSelectedExamId(examId);
		setSelectedExamTestType(testType);
		setExamReturnScreen(activeScreen === NAV_SCREENS.LEARNING_PATH ? NAV_SCREENS.LEARNING_PATH : NAV_SCREENS.SELECT);
		setActiveScreen(NAV_SCREENS.EXAM);
		closeNavigationOverlays();
	}, [activeScreen, closeNavigationOverlays]);

	const selectFlipcardDeck = useCallback((topicAreaKey) => {
		if (!selectedSubjectId) {
			showAllSubjects();
			return;
		}

		setExamLanguageSyncError(null);
		setSelectedExamId(null);
		setSelectedExamTestType(null);
		setExamReturnScreen(null);
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
		setSelectedExamTestType(null);
		setExamReturnScreen(null);
		setSelectedTopicAreaKey(topicAreaKey ?? null);
		setActiveScreen(NAV_SCREENS.MATCHCARDS);
		closeNavigationOverlays();
	}, [closeNavigationOverlays, selectedSubjectId, showAllSubjects]);

	const openLearningSession = useCallback((sessionId) => {
		if (!sessionId || !selectedSubjectId) {
			return;
		}

		setExamLanguageSyncError(null);
		setSelectedExamId(null);
		setSelectedExamTestType(null);
		setExamReturnScreen(null);
		setSelectedLearningSessionId(sessionId);
		setActiveScreen(NAV_SCREENS.LEARNING_SESSION);
		closeNavigationOverlays();
	}, [closeNavigationOverlays, selectedSubjectId]);

	const goBack = useCallback(() => {
		if (activeScreen === NAV_SCREENS.EXAM && examReturnScreen !== null) {
			changeScreen(examReturnScreen);

			return;

		}

		const activeScreenConfig = getScreenConfig(activeScreen);

		if (activeScreenConfig.backTo === null) {
			return;
		}

		if (activeScreenConfig.backTo === NAV_SCREENS.SUBJECTS) {
			showAllSubjects();
			return;
		}

		changeScreen(activeScreenConfig.backTo);
	}, [activeScreen, changeScreen, examReturnScreen, showAllSubjects]);

	const completeExamAttempt = useCallback(() => {
		if (activeScreen !== NAV_SCREENS.EXAM) {

			return;

		}

		if (selectedExamTestType !== TEST_TYPES.CHAPTER_TEST) {

			return;

		}

		if (examReturnScreen !== NAV_SCREENS.LEARNING_PATH) {

			return;

		}

		changeScreen(NAV_SCREENS.LEARNING_PATH);
	}, [activeScreen, changeScreen, examReturnScreen, selectedExamTestType]);

	// Språkbytte skal oppdatere valgt eksamen uten å lukke åpne menyer.
	const resolveSyncedExam = useCallback((examId, subjectId) => {
		setExamLanguageSyncError(null);
		setSelectedExamId(examId);
		setSelectedSubjectId(subjectId);
	}, []);

	const handleSyncedExamUnavailable = useCallback(() => {
		changeScreen(NAV_SCREENS.SELECT);
		setExamLanguageSyncError(props.examUnavailableMessage);
	}, [changeScreen, props.examUnavailableMessage]);

	const handleSyncedExamSyncFailed = useCallback(() => {
		changeScreen(NAV_SCREENS.SELECT);
		setExamLanguageSyncError(props.examSyncFailedMessage);
	}, [changeScreen, props.examSyncFailedMessage]);

	const selectedTestSetReadPort = resolveSelectedTestSetReadPort(props, selectedExamTestType);

	useSyncSelectedExamWithLanguage({
		language: props.language,
		activeScreen,
		selectedExamId,
		selectedSubjectId,
		getExamByIdUseCase: selectedTestSetReadPort?.getByIdUseCase,
		getExamByBaseIdAndLangUseCase: selectedTestSetReadPort?.getByBaseIdAndLangUseCase,
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
		backLabel: props.backLabel,
		navigationLabel: props.navigationLabel,
		onBack: goBack
	};

	return {
		activeScreen,
		selectedSubjectId,
		selectedExamId,
		selectedExamTestType,
		selectedTopicAreaKey,
		selectedLearningSessionId,
		selectedLearningContentEntryId,
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
		switchSubject,
		selectLearningContent,
		showAllSubjects,
		selectExam,
		selectFlipcardDeck,
		selectMatchCardsDeck,
		openLearningSession,
		completeExamAttempt,
		goBack
	};
}

function resolveSelectedTestSetReadPort(params, testType) {
	if (testType === null) {
		return null;
	}

	if (testType === TEST_TYPES.CHAPTER_TEST) {
		return {
			getByIdUseCase: params.getChapterTestByIdUseCase,
			getByBaseIdAndLangUseCase: params.getChapterTestByBaseIdAndLangUseCase
		};
	}

	if (testType === TEST_TYPES.EXAM) {
		return {
			getByIdUseCase: params.getExamByIdUseCase,
			getByBaseIdAndLangUseCase: params.getExamByBaseIdAndLangUseCase
		};
	}

	throw new Error(`Unknown selected test type: ${String(testType)}`);
}

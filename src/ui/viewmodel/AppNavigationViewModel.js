// src/ui/viewmodel/AppNavigationViewModel.js
import { useCallback, useEffect, useRef, useState } from "react";
import { NAV_SCREENS, createAppBackContract, resolveBackNavigation, resolveScreenEntry } from "../../navigation/navGraph.js";
import { getPresentationMode, PRESENTATION_MODE, subscribeToPresentationMode } from "../presentation/presentationMode.js";
import resolveTranslatedExamId from "./Utils/resolveTranslatedExamId.js";


function resolveSettingsPresentationMode(presentationMode) {
	return presentationMode === PRESENTATION_MODE.MOBILE ? "sheet" : "sidebar";
}

function getSettingsPresentationMode() {
	return resolveSettingsPresentationMode(getPresentationMode());
}

export function createAppLayoutClassNames(activeScreen) {
	const usesSelectionLayout =
		activeScreen === NAV_SCREENS.SUBJECTS ||
		activeScreen === NAV_SCREENS.SELECT ||
		activeScreen === NAV_SCREENS.OVERVIEW;
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
	const [settingsOpen, setSettingsOpen] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isSubjectPickerOpen, setIsSubjectPickerOpen] = useState(false);
	const [settingsPresentationMode, setSettingsPresentationMode] = useState(getSettingsPresentationMode);

	const prevLanguageRef = useRef(params.language);

	const toggleMenu = useCallback(() => {
		setIsMenuOpen((wasOpen) => !wasOpen);
	}, []);

	const closeMenu = useCallback(() => {
		setIsMenuOpen(false);
		setSettingsOpen(false);
		setIsSubjectPickerOpen(false);
	}, []);

	const toggleSubjectPicker = useCallback(() => {
		setIsSubjectPickerOpen((wasOpen) => !wasOpen);
	}, []);

	const closeSubjectPicker = useCallback(() => {
		setIsSubjectPickerOpen(false);
	}, []);

	const closeSettings = useCallback(() => {
		setSettingsOpen(false);
	}, []);


	const openSettings = useCallback(() => {
		setSettingsOpen(true);
	}, []);

	const backFromSettingsToMenu = useCallback(() => {
		setSettingsOpen(false);
	}, []);

	// Settings skal ikke overleve et layout-mode-bytte. Når breakpointet krysses
	// settes presentasjonsmodus og settingsOpen i samme handler, slik at React
	// batcher dem til én commit: den nye varianten mountes lukket og rekker aldri
	// å vises i feil geometri.
	useEffect(() => {
		const handlePresentationModeChange = () => {
			setSettingsPresentationMode(getSettingsPresentationMode());
			setSettingsOpen(false);
		};

		return subscribeToPresentationMode(handlePresentationModeChange);
	}, []);

	const applyNavigation = useCallback((nextNavState) => {
		if (!nextNavState) {
			return;
		}

		setActiveScreen(nextNavState.screen);
		setSelectedSubjectId(nextNavState.selectedSubjectId);
		setSelectedExamId(nextNavState.selectedExamId);

		setSettingsOpen(false);
		setIsMenuOpen(false);
		setIsSubjectPickerOpen(false);
	}, []);

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

	const syncSelectedExamWithLanguage = useCallback(() => {
		if (prevLanguageRef.current === params.language) {
			return;
		}

		prevLanguageRef.current = params.language;

		if (activeScreen !== NAV_SCREENS.EXAM || !selectedExamId) {
			return;
		}

		let cancelled = false;

		const run = async () => {
			try {
				const resolved = await resolveTranslatedExamId(
					selectedExamId,
					params.language,
					params.getExamByIdUseCase,
					params.getExamByBaseIdAndLangUseCase
				);

				if (cancelled) {
					return;
				}

				if (resolved) {
					setSelectedExamId(resolved.examId);
					setSelectedSubjectId(resolved.subjectId ?? selectedSubjectId);
				} else {
					backToExamList();
				}
			} catch {
				if (!cancelled) {
					backToExamList();
				}
			}
		};

		run();

		return () => {
			cancelled = true;
		};
	}, [
		params.language,
		activeScreen,
		selectedExamId,
		selectedSubjectId,
		params.getExamByIdUseCase,
		params.getExamByBaseIdAndLangUseCase,
		backToExamList
	]);

	useEffect(syncSelectedExamWithLanguage, [syncSelectedExamWithLanguage]);

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
		settingsOpen,
		isMenuOpen,
		isSubjectPickerOpen,
		settingsPresentationMode,

		// Handlers
		closeSettings,
		toggleMenu,
		closeMenu,
		openSettings,
		backFromSettingsToMenu,
		toggleSubjectPicker,
		closeSubjectPicker,
		changeScreen,
		selectSubject,
		showAllSubjects,
		showStatistics,
		selectExam,
		backToExamList,
		goBack
	};
}

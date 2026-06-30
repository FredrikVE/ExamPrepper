// src/ui/viewmodel/AppNavigationViewModel.js
import { useCallback, useEffect, useRef, useState } from "react";
import { NAV_SCREENS } from "../../navigation/navGraph.js";
import { getPresentationMode, PRESENTATION_MODE, subscribeToPresentationMode } from "../presentation/presentationMode.js";
import resolveTranslatedExamId from "./Utils/resolveTranslatedExamId.js";


function resolveSettingsPresentationMode(presentationMode) {
	return presentationMode === PRESENTATION_MODE.MOBILE ? "sheet" : "sidebar";
}

function getSettingsPresentationMode() {
	return resolveSettingsPresentationMode(getPresentationMode());
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

	const selectSubject = useCallback((subjectId) => {
		setSelectedSubjectId(subjectId);
		setSelectedExamId(null);
		setActiveScreen(NAV_SCREENS.SELECT);
		setSettingsOpen(false);
		setIsMenuOpen(false);
		setIsSubjectPickerOpen(false);
	}, []);

	const showAllSubjects = useCallback(() => {
		setSelectedSubjectId(null);
		setSelectedExamId(null);
		setActiveScreen(NAV_SCREENS.SUBJECTS);
		setSettingsOpen(false);
		setIsMenuOpen(false);
	}, []);

	const selectExam = useCallback((examId) => {
		setSelectedExamId(examId);
		setActiveScreen(NAV_SCREENS.EXAM);
		setSettingsOpen(false);
		setIsMenuOpen(false);
	}, []);

	const showStatistics = useCallback(() => {
		setSelectedExamId(null);
		setActiveScreen(NAV_SCREENS.OVERVIEW);
		setSettingsOpen(false);
		setIsMenuOpen(false);
	}, []);

	const backToExamList = useCallback(() => {
		setSelectedExamId(null);

		if (selectedSubjectId) {
			setActiveScreen(NAV_SCREENS.SELECT);
		} else {
			setActiveScreen(NAV_SCREENS.SUBJECTS);
		}

		setSettingsOpen(false);
		setIsMenuOpen(false);
	}, [selectedSubjectId]);

	const goBack = useCallback(() => {
		setSettingsOpen(false);
		setIsMenuOpen(false);
		setIsSubjectPickerOpen(false);

		if (activeScreen === NAV_SCREENS.SELECT) {
			setSelectedSubjectId(null);
			setSelectedExamId(null);
			setActiveScreen(NAV_SCREENS.SUBJECTS);
			return;
		}

		if (activeScreen === NAV_SCREENS.EXAM) {
			setSelectedExamId(null);

			if (selectedSubjectId) {
				setActiveScreen(NAV_SCREENS.SELECT);
			} else {
				setActiveScreen(NAV_SCREENS.SUBJECTS);
			}

			return;
		}

		if (activeScreen === NAV_SCREENS.FLIPCARDS || activeScreen === NAV_SCREENS.OVERVIEW) {
			setSelectedExamId(null);

			if (selectedSubjectId) {
				setActiveScreen(NAV_SCREENS.SELECT);
			} else {
				setActiveScreen(NAV_SCREENS.SUBJECTS);
			}

			return;
		}

		setSelectedSubjectId(null);
		setSelectedExamId(null);
		setActiveScreen(NAV_SCREENS.SUBJECTS);
	}, [activeScreen, selectedSubjectId]);

	const changeScreen = useCallback((nextScreen) => {
		setSettingsOpen(false);
		setIsMenuOpen(false);

		if (nextScreen === NAV_SCREENS.SUBJECTS) {
			showAllSubjects();
			return;
		}

		if (nextScreen === NAV_SCREENS.SELECT) {
			setSelectedExamId(null);

			if (selectedSubjectId) {
				setActiveScreen(NAV_SCREENS.SELECT);
			} else {
				setActiveScreen(NAV_SCREENS.SUBJECTS);
			}

			return;
		}

		if (nextScreen === NAV_SCREENS.EXAM) {
			if (!selectedExamId) {
				return;
			}

			setActiveScreen(NAV_SCREENS.EXAM);
			return;
		}

		if (nextScreen === NAV_SCREENS.FLIPCARDS) {
			setSelectedExamId(null);

			if (selectedSubjectId) {
				setActiveScreen(NAV_SCREENS.FLIPCARDS);
			} else {
				setActiveScreen(NAV_SCREENS.SUBJECTS);
			}

			return;
		}

		if (nextScreen === NAV_SCREENS.OVERVIEW) {
			showStatistics();
			return;
		}

		if (nextScreen === NAV_SCREENS.NOTES) {
			setSelectedExamId(null);
			setActiveScreen(nextScreen);
			return;
		}

		if (nextScreen === NAV_SCREENS.SETTINGS) {
			setSettingsOpen(true);
		}
	}, [selectedSubjectId, selectedExamId, showAllSubjects, showStatistics]);

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

	const showBackButton = activeScreen !== NAV_SCREENS.SUBJECTS;

	const usesSelectionLayout =
		isSelectionScreen ||
		activeScreen === NAV_SCREENS.OVERVIEW;

	const pageClassName = usesSelectionLayout
		? "exam-select-page"
		: "exam-page";

	const shellClassName = usesSelectionLayout
		? "exam-select-shell"
		: "exam-shell";

	return {
		// Navigasjon
		activeScreen,
		selectedSubjectId,
		selectedExamId,
		isSelectionScreen,
		shouldShowSubjectSwitcher,
		showBackButton,
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

// src/ui/viewmodel/AppNavigationViewModel.js
import { useCallback, useEffect, useRef, useState } from "react";
import { NAV_SCREENS } from "../../navigation/navGraph.js";
import resolveTranslatedExamId from "./Utils/resolveTranslatedExamId.js";

export default function useAppNavigationViewModel(language, getExamByIdUseCase, getExamByBaseIdAndLangUseCase) {
	// Navigasjons-state
	const [activeScreen, setActiveScreen] = useState(NAV_SCREENS.SUBJECTS);
	const [selectedSubjectId, setSelectedSubjectId] = useState(null);
	const [selectedExamId, setSelectedExamId] = useState(null);

	// Layout-state
	const [settingsOpen, setSettingsOpen] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const prevLanguageRef = useRef(language);

	const toggleMenu = useCallback(() => {
		setIsMenuOpen((wasOpen) => !wasOpen);
	}, []);

	const closeMenu = useCallback(() => {
		setIsMenuOpen(false);
	}, []);


	const openSettings = useCallback(() => {
		setSettingsOpen(true);
		setIsMenuOpen(false);
	}, []);

	const selectSubject = useCallback((subjectId) => {
		setSelectedSubjectId(subjectId);
		setSelectedExamId(null);
		setActiveScreen(NAV_SCREENS.SELECT);
		setSettingsOpen(false);
		setIsMenuOpen(false);
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

	const navigateBackToList = useCallback(() => {
		setSelectedExamId(null);

		if (selectedSubjectId) {
			setActiveScreen(NAV_SCREENS.SELECT);
		} else {
			setActiveScreen(NAV_SCREENS.SUBJECTS);
		}

		setSettingsOpen(false);
		setIsMenuOpen(false);
	}, [selectedSubjectId]);

	const syncSelectedExamWithLanguage = useCallback(() => {
		if (prevLanguageRef.current === language) {
			return;
		}

		prevLanguageRef.current = language;

		if (activeScreen !== NAV_SCREENS.EXAM || !selectedExamId) {
			return;
		}

		let cancelled = false;

		const run = async () => {
			try {
				const resolved = await resolveTranslatedExamId(
					selectedExamId,
					language,
					getExamByIdUseCase,
					getExamByBaseIdAndLangUseCase
				);

				if (cancelled) {
					return;
				}

				if (resolved) {
					setSelectedExamId(resolved.examId);
					setSelectedSubjectId(resolved.subjectId ?? selectedSubjectId);
				} else {
					navigateBackToList();
				}
			} catch {
				if (!cancelled) {
					navigateBackToList();
				}
			}
		};

		run();

		return () => {
			cancelled = true;
		};
	}, [
		language,
		activeScreen,
		selectedExamId,
		selectedSubjectId,
		getExamByIdUseCase,
		getExamByBaseIdAndLangUseCase,
		navigateBackToList
	]);

	useEffect(syncSelectedExamWithLanguage, [syncSelectedExamWithLanguage]);

	const isSelectionScreen =
		activeScreen === NAV_SCREENS.SUBJECTS ||
		activeScreen === NAV_SCREENS.SELECT;

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
		pageClassName,
		shellClassName,

		// Layout
		settingsOpen,
		isMenuOpen,

		// Handlers
		setSettingsOpen,
		toggleMenu,
		closeMenu,
		openSettings,
		changeScreen,
		selectSubject,
		showAllSubjects,
		showStatistics,
		selectExam,
		backToExamList
	};
}

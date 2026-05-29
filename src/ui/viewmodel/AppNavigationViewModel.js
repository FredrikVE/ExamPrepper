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
	const [sidebarOpen, setSidebarOpen] = useState(false);

	const prevLanguageRef = useRef(language);

	const openSidebar = useCallback(() => {
		setSidebarOpen(true);
	}, []);

	const closeSidebar = useCallback(() => {
		setSidebarOpen(false);
	}, []);

	const openSettings = useCallback(() => {
		setSettingsOpen(true);
		setSidebarOpen(false);
	}, []);

	const selectSubject = useCallback((subjectId) => {
		setSelectedSubjectId(subjectId);
		setSelectedExamId(null);
		setActiveScreen(NAV_SCREENS.SELECT);
		setSettingsOpen(false);
		setSidebarOpen(false);
	}, []);

	const showAllSubjects = useCallback(() => {
		setSelectedSubjectId(null);
		setSelectedExamId(null);
		setActiveScreen(NAV_SCREENS.SUBJECTS);
		setSettingsOpen(false);
		setSidebarOpen(false);
	}, []);

	const selectExam = useCallback((examId) => {
		setSelectedExamId(examId);
		setActiveScreen(NAV_SCREENS.EXAM);
		setSettingsOpen(false);
		setSidebarOpen(false);
	}, []);

	const backToExamList = useCallback(() => {
		setSelectedExamId(null);

		if (selectedSubjectId) {
			setActiveScreen(NAV_SCREENS.SELECT);
		} else {
			setActiveScreen(NAV_SCREENS.SUBJECTS);
		}

		setSettingsOpen(false);
		setSidebarOpen(false);
	}, [selectedSubjectId]);

	const changeScreen = useCallback((nextScreen) => {
		setSettingsOpen(false);
		setSidebarOpen(false);

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

		if (nextScreen === NAV_SCREENS.OVERVIEW || nextScreen === NAV_SCREENS.NOTES) {
			setSelectedExamId(null);
			setActiveScreen(nextScreen);
			return;
		}

		if (nextScreen === NAV_SCREENS.SETTINGS) {
			setSettingsOpen(true);
		}
	}, [selectedSubjectId, selectedExamId, showAllSubjects]);

	const navigateBackToList = useCallback(() => {
		setSelectedExamId(null);

		if (selectedSubjectId) {
			setActiveScreen(NAV_SCREENS.SELECT);
		} else {
			setActiveScreen(NAV_SCREENS.SUBJECTS);
		}

		setSettingsOpen(false);
		setSidebarOpen(false);
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

	const pageClassName = isSelectionScreen
		? "exam-select-page"
		: "exam-page";

	const shellClassName = isSelectionScreen
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
		sidebarOpen,

		// Handlers
		setSettingsOpen,
		openSidebar,
		closeSidebar,
		openSettings,
		changeScreen,
		selectSubject,
		showAllSubjects,
		selectExam,
		backToExamList
	};
}

//src/ui/viewmodel/AppNavigationViewModel.js
import { useCallback, useEffect, useRef, useState } from "react";
import { getExamById } from "../../data/data.js";
import { NAV_SCREENS } from "../../navigation/navGraph.js";

export default function useAppNavigationViewModel(language, getExamByBaseIdAndLangUseCase) {
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

	const handleLanguageChangedSwitchExam = useCallback(() => {
		if (prevLanguageRef.current === language) {
			return;
		}

		prevLanguageRef.current = language;

		if (activeScreen !== NAV_SCREENS.EXAM || !selectedExamId) {
			return;
		}

		let cancelled = false;

		const switchExamLanguage = async () => {
			const currentExam = getExamById(selectedExamId);

			if (!currentExam?.baseId) {
				setSelectedExamId(null);

				if (selectedSubjectId) {
					setActiveScreen(NAV_SCREENS.SELECT);
				} else {
					setActiveScreen(NAV_SCREENS.SUBJECTS);
				}

				setSettingsOpen(false);
				setSidebarOpen(false);
				return;
			}

			const translatedExam = await getExamByBaseIdAndLangUseCase.execute({
				baseId: currentExam.baseId,
				lang: language
			});

			if (cancelled) {
				return;
			}

			if (translatedExam) {
				setSelectedExamId(translatedExam.id);
				setSelectedSubjectId(translatedExam.subjectId ?? selectedSubjectId);
				return;
			}

			setSelectedExamId(null);

			if (selectedSubjectId) {
				setActiveScreen(NAV_SCREENS.SELECT);
			} else {
				setActiveScreen(NAV_SCREENS.SUBJECTS);
			}

			setSettingsOpen(false);
			setSidebarOpen(false);
		};

		switchExamLanguage();

		return () => {
			cancelled = true;
		};
	}, [
		language,
		activeScreen,
		selectedExamId,
		selectedSubjectId,
		getExamByBaseIdAndLangUseCase
	]);

	useEffect(handleLanguageChangedSwitchExam, [handleLanguageChangedSwitchExam]);

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
// src/ui/viewmodel/AppNavigationViewModel.js
import { useCallback, useEffect, useRef, useState } from "react";
import { NAV_SCREENS } from "../../navigation/navGraph.js";
import resolveTranslatedExamId from "./Utils/resolveTranslatedExamId.js";

// Speiler navigasjonens breakpoint (mobil/topbar ≤ 932px, desktop ≥ 933px),
// slik at Settings alltid er sheet når nav er topbar og sidebar når nav er sidebar.
const MOBILE_SETTINGS_QUERY = "(max-width: 932px)";

function getInitialSettingsPresentationMode() {
	if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
		return "sidebar";
	}

	return window.matchMedia(MOBILE_SETTINGS_QUERY).matches ? "sheet" : "sidebar";
}

export default function useAppNavigationViewModel(params) {
	// Navigasjons-state
	const [activeScreen, setActiveScreen] = useState(NAV_SCREENS.SUBJECTS);
	const [selectedSubjectId, setSelectedSubjectId] = useState(null);
	const [selectedExamId, setSelectedExamId] = useState(null);

	// Layout-state
	const [settingsOpen, setSettingsOpen] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [settingsPresentationMode, setSettingsPresentationMode] = useState(getInitialSettingsPresentationMode);

	const prevLanguageRef = useRef(params.language);

	const toggleMenu = useCallback(() => {
		setIsMenuOpen((wasOpen) => !wasOpen);
	}, []);

	const closeMenu = useCallback(() => {
		setIsMenuOpen(false);
	}, []);

	const closeSettings = useCallback(() => {
		setSettingsOpen(false);
	}, []);


	const openSettings = useCallback(() => {
		setSettingsOpen(true);
		setIsMenuOpen(false);
	}, []);

	const backFromSettingsToMenu = useCallback(() => {
		setSettingsOpen(false);

		if (settingsPresentationMode === "sheet") {
			setIsMenuOpen(true);
		}
	}, [settingsPresentationMode]);

	// Settings skal ikke overleve et layout-mode-bytte. Når breakpointet krysses
	// settes presentasjonsmodus og settingsOpen i samme handler, slik at React
	// batcher dem til én commit: den nye varianten mountes lukket og rekker aldri
	// å vises i feil geometri.
	useEffect(() => {
		if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
			return undefined;
		}

		const mediaQuery = window.matchMedia(MOBILE_SETTINGS_QUERY);

		const handleChange = (event) => {
			setSettingsPresentationMode(event.matches ? "sheet" : "sidebar");
			setSettingsOpen(false);
		};

		mediaQuery.addEventListener("change", handleChange);

		return () => {
			mediaQuery.removeEventListener("change", handleChange);
		};
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
		activeScreen === NAV_SCREENS.EXAM;

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
		pageClassName,
		shellClassName,

		// Layout
		settingsOpen,
		isMenuOpen,
		settingsPresentationMode,

		// Handlers
		closeSettings,
		toggleMenu,
		closeMenu,
		openSettings,
		backFromSettingsToMenu,
		changeScreen,
		selectSubject,
		showAllSubjects,
		showStatistics,
		selectExam,
		backToExamList
	};
}

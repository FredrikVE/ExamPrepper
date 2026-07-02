// src/ui/viewmodel/AppNavigationViewModel.js
import { useCallback, useEffect, useRef, useState } from "react";
import { APP_LAYOUTS, NAV_SCREENS, createAppBackContract, resolveBackNavigation, resolveScreenEntry, resolveScreenLayout } from "../../navigation/navGraph.js";
import useMobileDropDownTopBarModel from "./AppNavigation/useMobileDropDownTopBarModel.js";
import useSettingsPresentationModel from "./AppNavigation/useSettingsPresentationModel.js";
import resolveTranslatedExamId from "./Utils/resolveTranslatedExamId.js";

export function createAppLayoutClassNames(activeScreen) {
	const appLayout = resolveScreenLayout(activeScreen);
	const usesSelectionLayout = appLayout === APP_LAYOUTS.SELECTION;
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
	const mobileTopBar = useMobileDropDownTopBarModel();
	const settingsPresentation = useSettingsPresentationModel();

	const prevLanguageRef = useRef(params.language);

	const closeMenu = useCallback(() => {
		mobileTopBar.closeMobileDropDownMenu();
		settingsPresentation.closeSettingsPresentation();
		mobileTopBar.closeMobileSubjectPicker();
	}, [
		mobileTopBar.closeMobileDropDownMenu,
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

		settingsPresentation.closeSettingsPresentation();
		mobileTopBar.closeMobileDropDownMenu();
		mobileTopBar.closeMobileSubjectPicker();
	}, [
		mobileTopBar.closeMobileDropDownMenu,
		mobileTopBar.closeMobileSubjectPicker,
		settingsPresentation.closeSettingsPresentation
	]);

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
		settingsOpen: settingsPresentation.isSettingsPresentationOpen,
		isMenuOpen: mobileTopBar.isMobileDropDownMenuOpen,
		isSubjectPickerOpen: mobileTopBar.isMobileSubjectPickerOpen,
		settingsPresentationMode: settingsPresentation.settingsPresentationMode,

		// Handlers
		closeSettings: settingsPresentation.closeSettingsPresentation,
		toggleMenu: mobileTopBar.toggleMobileDropDownMenu,
		closeMenu,
		openSettings: settingsPresentation.openSettingsPresentation,
		backFromSettingsToMenu: settingsPresentation.closeSettingsPresentation,
		toggleSubjectPicker: mobileTopBar.toggleMobileSubjectPicker,
		closeSubjectPicker: mobileTopBar.closeMobileSubjectPicker,
		changeScreen,
		selectSubject,
		showAllSubjects,
		showStatistics,
		selectExam,
		backToExamList,
		goBack
	};
}

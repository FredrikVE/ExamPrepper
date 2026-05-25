//src/ui/viewmodel/AppNavigationViewModel.js
import { useCallback, useEffect, useRef, useState } from "react";
import { DEFAULT_SUBJECT_ID, getExamById } from "../../data/data.js";
import { NAV_SCREENS } from "../../navigation/navGraph.js";

export default function useAppNavigationViewModel(language, getExamByBaseIdAndLangUseCase) {
    // Navigasjons-state
    const [activeScreen, setActiveScreen] = useState(NAV_SCREENS.SUBJECTS);
    const [selectedSubjectId, setSelectedSubjectId] = useState(DEFAULT_SUBJECT_ID);
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
        setActiveScreen(NAV_SCREENS.SELECT);
        setSettingsOpen(false);
        setSidebarOpen(false);
    }, []);

    const changeScreen = useCallback((nextScreen) => {
        setSettingsOpen(false);
        setSidebarOpen(false);

        if (nextScreen === NAV_SCREENS.SUBJECTS) {
            setSelectedExamId(null);
            setActiveScreen(NAV_SCREENS.SUBJECTS);
            return;
        }

        if (nextScreen === NAV_SCREENS.SELECT) {
            setSelectedExamId(null);
            setActiveScreen(NAV_SCREENS.SELECT);
            return;
        }

        if (nextScreen === NAV_SCREENS.EXAM && !selectedExamId) {
            return;
        }

        setActiveScreen(nextScreen);
    }, [selectedExamId]);

    const handleLanguageChangedSwitchExam = useCallback(() => {
        if (prevLanguageRef.current === language) {
            return;
        }

        prevLanguageRef.current = language;

        if (activeScreen !== NAV_SCREENS.EXAM || !selectedExamId) {
            return;
        }

        const currentExam = getExamById(selectedExamId);

        if (currentExam?.baseId) {
            const translatedExam = getExamByBaseIdAndLangUseCase.execute({
                baseId: currentExam.baseId,
                lang: language
            });

            if (translatedExam) {
                setSelectedExamId(translatedExam.id);
                setSelectedSubjectId(translatedExam.subjectId ?? DEFAULT_SUBJECT_ID);
                return;
            }
        }

        setActiveScreen(NAV_SCREENS.SELECT);
        setSelectedExamId(null);
        setSettingsOpen(false);
        setSidebarOpen(false);
    }, [language, activeScreen, selectedExamId, getExamByBaseIdAndLangUseCase]);

    useEffect(handleLanguageChangedSwitchExam, [handleLanguageChangedSwitchExam]);

    const isSelectionScreen = activeScreen === NAV_SCREENS.SUBJECTS || activeScreen === NAV_SCREENS.SELECT;
    const pageClassName = isSelectionScreen ? "exam-select-page" : "exam-page";
    const shellClassName = isSelectionScreen ? "exam-select-shell" : "exam-shell";

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

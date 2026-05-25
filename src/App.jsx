import { useState, useCallback, useEffect, useRef } from "react";
import { ThemeProvider } from "./ui/theme/ThemeContext.jsx";
import useExamViewModel from "./ui/viewmodel/useExamViewModel.js";
import ExamPage from "./ui/view/pages/ExamPage.jsx";
import ExamSelectPage from "./ui/view/pages/ExamSelectPage.jsx";
import AppSidebar from "./ui/view/components/Sidebar/AppSidebar.jsx";
import SettingsMenu from "./ui/view/components/Settings/SettingsMenu.jsx";
import { NAV_SCREENS } from "./navigation/navGraph.js";
import { getExamQuestionsUseCase, getAvailableExamsUseCase, gradeAnswerUseCase, calculateExamScoreUseCase, getExamByBaseIdAndLangUseCase } from "./di/dependencies.js";
import { LanguageProvider, useLanguage } from "./i18n/LanguageContext.jsx";
import { getExamById } from "./data/data.js";

import "./ui/style/App.css";

export default function App() {
    return (
        <ThemeProvider>
            <LanguageProvider>
                <AppContent />
            </LanguageProvider>
        </ThemeProvider>
    );
}

function AppContent() {
    const [activeScreen, setActiveScreen] = useState(NAV_SCREENS.SELECT);
    const [selectedExamId, setSelectedExamId] = useState(null);
    const [settingsOpen, setSettingsOpen] = useState(false);

    const { language, t } = useLanguage();
    const prevLanguageRef = useRef(language);

    const handleSelectExam = useCallback((examId) => {
        setSelectedExamId(examId);
        setActiveScreen(NAV_SCREENS.EXAM);
        setSettingsOpen(false);
    }, []);

    const handleBackToList = useCallback(() => {
        setSelectedExamId(null);
        setActiveScreen(NAV_SCREENS.SELECT);
        setSettingsOpen(false);
    }, []);

    const handleChangeScreen = useCallback((nextScreen) => {
        setSettingsOpen(false);

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

    const handleOpenSettings = useCallback(() => {
        setSettingsOpen(true);
    }, []);

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
            const translatedExam = getExamByBaseIdAndLangUseCase.execute(currentExam.baseId, language);

            if (translatedExam) {
                setSelectedExamId(translatedExam.id);
                return;
            }
        }

        setActiveScreen(NAV_SCREENS.SELECT);
        setSelectedExamId(null);
    }, [language, activeScreen, selectedExamId]);

    useEffect(handleLanguageChangedSwitchExam, [handleLanguageChangedSwitchExam]);

    const exams = getAvailableExamsUseCase.execute(language);
    const isSelectScreen = activeScreen === NAV_SCREENS.SELECT;

    const pageClassName = isSelectScreen ? "exam-select-page" : "exam-page";
    const shellClassName = isSelectScreen ? "exam-select-shell" : "exam-shell";

    return (
        <div className={pageClassName}>
            <div className={shellClassName}>
                <AppSidebar
                    activeScreen={activeScreen}
                    onChangeScreen={handleChangeScreen}
                    SCREENS={NAV_SCREENS}
                    settingsOpen={settingsOpen}
                    onOpenSettings={handleOpenSettings}
                />

                {activeScreen === NAV_SCREENS.SELECT && (
                    <ExamSelectPage
                        exams={exams}
                        onSelectExam={handleSelectExam}
                    />
                )}

                {activeScreen === NAV_SCREENS.EXAM && (
                    <ExamPageWrapper
                        examId={selectedExamId}
                        onBack={handleBackToList}
                    />
                )}

                {activeScreen === NAV_SCREENS.OVERVIEW && (
                    <PlaceholderPage
                        title={t.sidebarOverview}
                        description="Oversikt-siden er ikke implementert ennå."
                    />
                )}

                {activeScreen === NAV_SCREENS.NOTES && (
                    <PlaceholderPage
                        title={t.sidebarNotes}
                        description="Notater-siden er ikke implementert ennå."
                    />
                )}

                <SettingsMenu
                    isOpen={settingsOpen}
                    onOpenChange={setSettingsOpen}
                />
            </div>
        </div>
    );
}

function ExamPageWrapper({ examId, onBack }) {
    const examViewModel = useExamViewModel(
        getExamQuestionsUseCase,
        gradeAnswerUseCase,
        calculateExamScoreUseCase,
        examId
    );

    return (
        <ExamPage
            viewModel={examViewModel}
            onBack={onBack}
        />
    );
}

function PlaceholderPage({ title, description }) {
    return (
        <div className="exam-workspace">
            <main className="exam-page-main">
                <div className="exam-page-content">
                    <div className="exam-page-empty">
                        <h1>{title}</h1>
                        <p>{description}</p>
                    </div>
                </div>
            </main>
        </div>
    );
}
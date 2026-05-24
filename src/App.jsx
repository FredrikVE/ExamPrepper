//src/App.jsx
import { useState, useCallback, useEffect, useRef } from "react";
import { ThemeProvider } from "./ui/theme/ThemeContext.jsx";
import useExamViewModel from "./ui/viewmodel/useExamViewModel.js";
import ExamPage from "./ui/view/pages/ExamPage.jsx";
import ExamSelectPage from "./ui/view/pages/ExamSelectPage.jsx";
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
    const { language } = useLanguage();
    const prevLanguageRef = useRef(language);

    const handleSelectExam = useCallback((examId) => {
        setSelectedExamId(examId);
        setActiveScreen(NAV_SCREENS.EXAM);
    }, []);

    const handleBackToList = useCallback(() => {
        setSelectedExamId(null);
        setActiveScreen(NAV_SCREENS.SELECT);
    }, []);

    const onLanguageChangedSwitchExam = useCallback(() => {
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

    useEffect(onLanguageChangedSwitchExam, [onLanguageChangedSwitchExam]);

    if (activeScreen === NAV_SCREENS.SELECT) {
        const exams = getAvailableExamsUseCase.execute(language);

        return (
            <ExamSelectPage
                exams={exams}
                onSelectExam={handleSelectExam}
            />
        );
    }

    return (
        <ExamPageWrapper
            examId={selectedExamId}
            onBack={handleBackToList}
        />
    );
}

function ExamPageWrapper({ examId, onBack }) {
    const examViewModel = useExamViewModel(
        getExamQuestionsUseCase,
        gradeAnswerUseCase,
        calculateExamScoreUseCase,
        examId
    );

    return <ExamPage viewModel={examViewModel} onBack={onBack} />;
}
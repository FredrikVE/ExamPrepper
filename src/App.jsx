//src/App.jsx
import { useState, useCallback } from "react";
import useExamViewModel from "./ui/viewmodel/useExamViewModel.js";
import ExamPage from "./ui/view/pages/ExamPage.jsx";
import ExamSelectPage from "./ui/view/pages/ExamSelectPage.jsx";
import { NAV_SCREENS } from "./navigation/navGraph.js";
import { getExamQuestionsUseCase, getAvailableExamsUseCase, gradeAnswerUseCase, calculateExamScoreUseCase } from "./di/dependencies.js";
import { LanguageProvider } from "./i18n/LanguageContext.jsx";

import "./ui/style/Global.css";

export default function App() {
    return (
        <LanguageProvider>
            <AppContent />
        </LanguageProvider>
    );
}

function AppContent() {
    const [activeScreen, setActiveScreen] = useState(NAV_SCREENS.SELECT);
    const [selectedExamId, setSelectedExamId] = useState(null);

    const handleSelectExam = useCallback((examId) => {
        setSelectedExamId(examId);
        setActiveScreen(NAV_SCREENS.EXAM);
    }, []);

    const handleBackToList = useCallback(() => {
        setSelectedExamId(null);
        setActiveScreen(NAV_SCREENS.SELECT);
    }, []);

    if (activeScreen === NAV_SCREENS.SELECT) {
        const exams = getAvailableExamsUseCase.execute();

        return (
            <ExamSelectPage
                exams={exams}
                onSelectExam={handleSelectExam}
            />
        );
    }

    return (
        <ExamPageWrapper
            key={selectedExamId}
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

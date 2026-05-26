//src/App.jsx
import { ThemeProvider } from "./ui/theme/ThemeContext.jsx";
import { LanguageProvider, useLanguage } from "./i18n/LanguageContext.jsx";

import useAppNavigationViewModel from "./ui/viewmodel/AppNavigationViewModel.js";
import useSubjectSelectPageViewModel from "./ui/viewmodel/SubjectSelectPageViewModel.js";
import useExamSelectPageViewModel from "./ui/viewmodel/ExamSelectPageViewModel.js";
import useExamPageViewModel from "./ui/viewmodel/ExamPageViewModel.js";
import useSettingsMenuViewModel from "./ui/viewmodel/SettingsMenuViewModel.js";

import SubjectSelectPage from "./ui/view/pages/SubjectSelectPage.jsx";
import ExamSelectPage from "./ui/view/pages/ExamSelectPage.jsx";
import ExamPage from "./ui/view/pages/ExamPage.jsx";

import AppSidebar from "./ui/view/components/Sidebar/AppSidebar.jsx";
import SidebarMenuButton from "./ui/view/components/Sidebar/SidebarMenuButton.jsx";
import SettingsMenu from "./ui/view/components/Settings/SettingsMenu.jsx";

import { NAV_SCREENS } from "./navigation/navGraph.js";
import { getExamQuestionsUseCase, getAvailableExamsUseCase, getAvailableSubjectsUseCase, gradeAnswerUseCase, calculateExamScoreUseCase, getExamByBaseIdAndLangUseCase } from "./di/dependencies.js";

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
    const { language, t } = useLanguage();

    const settingsMenuViewModel = useSettingsMenuViewModel();

    const navigationViewModel = useAppNavigationViewModel(
        language,
        getExamByBaseIdAndLangUseCase
    );

    const subjectSelectPageViewModel = useSubjectSelectPageViewModel(
        getAvailableSubjectsUseCase,
        language,
        t,
        navigationViewModel.selectedSubjectId,
        navigationViewModel.selectSubject
    );

    const examSelectPageViewModel = useExamSelectPageViewModel(
        getAvailableExamsUseCase,
        language,
        t,
        subjectSelectPageViewModel.selectedSubject,
        navigationViewModel.selectExam
    );

    return (
        <div className={navigationViewModel.pageClassName}>
            <div className={navigationViewModel.shellClassName}>
                <SidebarMenuButton onOpenSidebar={navigationViewModel.openSidebar} />

                <AppSidebar
                    activeScreen={navigationViewModel.activeScreen}
                    onChangeScreen={navigationViewModel.changeScreen}
                    SCREENS={NAV_SCREENS}
                    settingsOpen={navigationViewModel.settingsOpen}
                    onOpenSettings={navigationViewModel.openSettings}
                    sidebarOpen={navigationViewModel.sidebarOpen}
                    onCloseSidebar={navigationViewModel.closeSidebar}
                    subjects={subjectSelectPageViewModel.subjects}
                    selectedSubject={subjectSelectPageViewModel.selectedSubject}
                    onSelectSubject={navigationViewModel.selectSubject}
                    onShowAllSubjects={navigationViewModel.showAllSubjects}
                />

                {navigationViewModel.activeScreen === NAV_SCREENS.SUBJECTS && (
                    <SubjectSelectPage viewModel={subjectSelectPageViewModel} />
                )}

                {navigationViewModel.activeScreen === NAV_SCREENS.SELECT && (
                    <ExamSelectPage viewModel={examSelectPageViewModel} />
                )}

                {navigationViewModel.activeScreen === NAV_SCREENS.EXAM && (
                    <ExamPageWrapper
                        examId={navigationViewModel.selectedExamId}
                        randomizeAnswerOptions={settingsMenuViewModel.randomizeAnswerOptions}
                    />
                )}

                <SettingsMenu
                    isOpen={navigationViewModel.settingsOpen}
                    onOpenChange={navigationViewModel.setSettingsOpen}
                    randomizeAnswerOptions={settingsMenuViewModel.randomizeAnswerOptions}
                    onToggleRandomizeAnswerOptions={settingsMenuViewModel.toggleRandomizeAnswerOptions}
                />
            </div>
        </div>
    );
}

function ExamPageWrapper({ examId, randomizeAnswerOptions }) {
    const examPageViewModel = useExamPageViewModel(
        getExamQuestionsUseCase,
        gradeAnswerUseCase,
        calculateExamScoreUseCase,
        examId,
        randomizeAnswerOptions
    );

    return (
        <ExamPage
            viewModel={examPageViewModel}
        />
    );
}
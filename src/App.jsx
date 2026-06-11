// src/App.jsx
import { lazy, Suspense } from "react";
import { useAuth } from "@clerk/clerk-react";

import { ThemeProvider } from "./ui/theme/ThemeContext.jsx";
import { LanguageProvider, useLanguage } from "./i18n/LanguageContext.jsx";
import { SettingsProvider } from "./ui/settings/SettingsContext.jsx";

import useAppNavigationViewModel from "./ui/viewmodel/AppNavigationViewModel.js";
import useSubjectSelectPageViewModel from "./ui/viewmodel/SubjectSelectPageViewModel.js";
import useExamSelectPageViewModel from "./ui/viewmodel/ExamSelectPageViewModel.js";
import useExamPageViewModel from "./ui/viewmodel/ExamPageViewModel.js";
import useStatisticsPageViewModel from "./ui/viewmodel/StatisticsPageViewModel.js";

import SubjectSelectPage from "./ui/view/pages/SubjectSelectPage.jsx";
import ExamSelectPage from "./ui/view/pages/ExamSelectPage.jsx";
import ExamPage from "./ui/view/pages/ExamPage.jsx";

import AppSidebar from "./ui/view/components/Sidebar/AppSidebar.jsx";
import SidebarMenuButton from "./ui/view/components/Sidebar/SidebarMenuButton.jsx";
import SettingsMenu from "./ui/view/components/Settings/SettingsMenu.jsx";

import { NAV_SCREENS } from "./navigation/navGraph.js";
import { calculateExamScoreUseCase, getAvailableExamsUseCase, getAvailableSubjectsUseCase, getExamByBaseIdAndLangUseCase, getExamByIdUseCase, getExamQuestionsUseCase, getMyStatisticsUseCase, gradeAnswerUseCase, submitExamAttemptUseCase } from "./di/dependencies.js";

import "./ui/style/App.css";

const StatisticsPage = lazy(() => import("./ui/view/pages/StatisticsPage.jsx"));

export default function App() {
	return (
		<ThemeProvider>
			<LanguageProvider>
				<SettingsProvider>
					<AppContent />
				</SettingsProvider>
			</LanguageProvider>
		</ThemeProvider>
	);
}

function AppContent() {
	const { language, t } = useLanguage();

	const navigationViewModel = useAppNavigationViewModel(
		language,
		getExamByIdUseCase,
		getExamByBaseIdAndLangUseCase
	);

	const subjectSelectPageViewModel = useSubjectSelectPageViewModel(
		getAvailableSubjectsUseCase,
		language,
		t,
		navigationViewModel.selectedSubjectId,
		navigationViewModel.selectSubject,
		navigationViewModel.showStatistics
	);

	const examSelectPageViewModel = useExamSelectPageViewModel(
		getAvailableExamsUseCase,
		language,
		t,
		subjectSelectPageViewModel.selectedSubject,
		navigationViewModel.selectExam,
		navigationViewModel.showStatistics
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
						language={language}
					/>
				)}

				{navigationViewModel.activeScreen === NAV_SCREENS.OVERVIEW && (
					<StatisticsPageWrapper
						language={language}
						t={t}
						onStartNewExam={navigationViewModel.showAllSubjects}
					/>
				)}

				<SettingsMenu
					isOpen={navigationViewModel.settingsOpen}
					onOpenChange={navigationViewModel.setSettingsOpen}
				/>
			</div>
		</div>
	);
}

function ExamPageWrapper({ examId, language }) {
	const examPageViewModel = useExamPageViewModel(
		getExamQuestionsUseCase,
		gradeAnswerUseCase,
		calculateExamScoreUseCase,
		submitExamAttemptUseCase,
		examId,
		language
	);

	return (
		<ExamPage
			viewModel={examPageViewModel}
		/>
	);
}

function StatisticsPageWrapper({ language, t, onStartNewExam }) {
	const hasClerkAuth = Boolean(import.meta.env?.VITE_CLERK_PUBLISHABLE_KEY);

	if (!hasClerkAuth) {
		return (
			<StatisticsPageWithViewModel
				language={language}
				t={t}
				onStartNewExam={onStartNewExam}
				authState={{ hasClerkAuth: false, isLoaded: true, isSignedIn: false }}
			/>
		);
	}

	return (
		<AuthenticatedStatisticsPageWrapper
			language={language}
			t={t}
			onStartNewExam={onStartNewExam}
		/>
	);
}

function AuthenticatedStatisticsPageWrapper({ language, t, onStartNewExam }) {
	const { isLoaded, isSignedIn } = useAuth();

	return (
		<StatisticsPageWithViewModel
			language={language}
			t={t}
			onStartNewExam={onStartNewExam}
			authState={{ hasClerkAuth: true, isLoaded, isSignedIn }}
		/>
	);
}

function StatisticsPageWithViewModel({ language, t, onStartNewExam, authState }) {
	const statisticsPageViewModel = useStatisticsPageViewModel(
		getMyStatisticsUseCase,
		language,
		t,
		authState,
		onStartNewExam
	);

	return (
		<Suspense fallback={<StatisticsPageLoadingFallback viewModel={statisticsPageViewModel} />}>
			<StatisticsPage viewModel={statisticsPageViewModel} />
		</Suspense>
	);
}

function StatisticsPageLoadingFallback({ viewModel }) {
	return (
		<main className="statistics-page-workspace">
			<section className="statistics-state">
				<h2>{viewModel.loadingTitle}</h2>
				<p>{viewModel.loadingBody}</p>
			</section>
		</main>
	);
}

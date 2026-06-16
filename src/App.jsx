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
	const { language, t, formatDate } = useLanguage();

	const navigationViewModel = useAppNavigationViewModel({ language, getExamByIdUseCase, getExamByBaseIdAndLangUseCase });

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
				<SidebarMenuButton
					isMenuOpen={navigationViewModel.isMenuOpen}
					onToggleMenu={navigationViewModel.toggleMenu}
					showSubjectSwitcher={navigationViewModel.shouldShowSubjectSwitcher}
					subjects={subjectSelectPageViewModel.subjects}
					selectedSubject={subjectSelectPageViewModel.selectedSubject}
					onSelectSubject={navigationViewModel.selectSubject}
					onShowAllSubjects={navigationViewModel.showAllSubjects}
				/>

				<AppSidebar
					activeScreen={navigationViewModel.activeScreen}
					onChangeScreen={navigationViewModel.changeScreen}
					settingsOpen={navigationViewModel.settingsOpen}
					onOpenSettings={navigationViewModel.openSettings}
					isMenuOpen={navigationViewModel.isMenuOpen}
					onCloseMenu={navigationViewModel.closeMenu}
					showSubjectSwitcher={navigationViewModel.shouldShowSubjectSwitcher}
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
						t={t}
					/>
				)}

				{navigationViewModel.activeScreen === NAV_SCREENS.OVERVIEW && (
					<StatisticsPageWrapper
						formatDate={formatDate}
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

function ExamPageWrapper({ examId, language, t }) {
	const examPageViewModel = useExamPageViewModel(
		getExamQuestionsUseCase,
		gradeAnswerUseCase,
		calculateExamScoreUseCase,
		submitExamAttemptUseCase,
		examId,
		language,
		t
	);

	return (
		<ExamPage
			viewModel={examPageViewModel}
		/>
	);
}

function StatisticsPageWrapper({ formatDate, t, onStartNewExam }) {
	const hasClerkAuth = Boolean(import.meta.env?.VITE_CLERK_PUBLISHABLE_KEY);

	if (!hasClerkAuth) {
		return (
			<StatisticsPageWithViewModel
				formatDate={formatDate}
				t={t}
				onStartNewExam={onStartNewExam}
				authState={{ hasClerkAuth: false, isLoaded: true, isSignedIn: false }}
			/>
		);
	}

	return (
		<AuthenticatedStatisticsPageWrapper
			formatDate={formatDate}
			t={t}
			onStartNewExam={onStartNewExam}
		/>
	);
}

function AuthenticatedStatisticsPageWrapper({ formatDate, t, onStartNewExam }) {
	const { isLoaded, isSignedIn } = useAuth();

	return (
		<StatisticsPageWithViewModel
			formatDate={formatDate}
			t={t}
			onStartNewExam={onStartNewExam}
			authState={{ hasClerkAuth: true, isLoaded, isSignedIn }}
		/>
	);
}

function StatisticsPageWithViewModel({ formatDate, t, onStartNewExam, authState }) {
	const statisticsPageViewModel = useStatisticsPageViewModel({
		getMyStatisticsUseCase,
		formatDate,
		t,
		authState,
		onStartNewExam
	});

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

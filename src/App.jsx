// src/App.jsx
import { useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "@clerk/clerk-react";

import { ThemeProvider } from "./ui/theme/ThemeContext.jsx";
import { LanguageProvider, useLanguage } from "./i18n/LanguageContext.jsx";
import { SettingsProvider } from "./ui/settings/SettingsContext.jsx";

import useAppNavigationViewModel from "./ui/viewmodel/AppNavigationViewModel.js";
import useSubjectSelectPageViewModel from "./ui/viewmodel/SubjectSelectPageViewModel.js";
import useExamSelectPageViewModel from "./ui/viewmodel/ExamSelectPageViewModel.js";
import useExamPageViewModel from "./ui/viewmodel/ExamPageViewModel.js";
import useStatisticsPageViewModel from "./ui/viewmodel/StatisticsPageViewModel.js";
import useFlipcardsPageViewModel from "./ui/viewmodel/FlipcardsPageViewModel.js";

import SubjectSelectPage from "./ui/view/pages/SubjectSelectPage.jsx";
import ExamSelectPage from "./ui/view/pages/ExamSelectPage.jsx";
import ExamPage from "./ui/view/pages/ExamPage.jsx";
import StatisticsPage from "./ui/view/pages/StatisticsPage.jsx";
import FlipcardsPage from "./ui/view/pages/FlipcardsPage.jsx";

import AppNavigation from "./ui/view/components/Sidebar/AppNavigation.jsx";
import SettingsPresentation from "./ui/view/components/Settings/SettingsPresentation.jsx";

import { NAV_SCREENS } from "./navigation/navGraph.js";
import { calculateExamScoreUseCase, getAvailableExamsUseCase, getAvailableSubjectsUseCase, getExamByBaseIdAndLangUseCase, getExamByIdUseCase, getExamQuestionsUseCase, getFlashcardsUseCase, getMyStatisticsUseCase, gradeAnswerUseCase, submitExamAttemptUseCase } from "./di/dependencies.js";

import "./ui/style/App.css";


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

	const [examWorkMode, setExamWorkMode] = useState(null);
	const examWorkModeActionsRef = useRef(null);

	const navigationViewModel = useAppNavigationViewModel({ language, getExamByIdUseCase, getExamByBaseIdAndLangUseCase });

	const openExamSubmitConfirm = useCallback(() => {
		examWorkModeActionsRef.current?.openConfirm();
	}, []);

	const closeExamSubmitConfirm = useCallback(() => {
		examWorkModeActionsRef.current?.closeConfirm();
	}, []);

	const confirmExamSubmit = useCallback(() => {
		navigationViewModel.closeMenu();
		examWorkModeActionsRef.current?.confirmSubmit();
	}, [navigationViewModel.closeMenu]);

	const subjectSelectPageViewModel = useSubjectSelectPageViewModel(
		getAvailableSubjectsUseCase,
		language,
		t,
		navigationViewModel.selectedSubjectId,
		navigationViewModel.selectSubject,
		navigationViewModel.activeScreen === NAV_SCREENS.SUBJECTS,
		navigationViewModel.changeScreen
	);

	const examSelectPageViewModel = useExamSelectPageViewModel(
		getAvailableExamsUseCase,
		language,
		t,
		subjectSelectPageViewModel.selectedSubject,
		navigationViewModel.selectExam,
		navigationViewModel.activeScreen === NAV_SCREENS.SELECT,
		navigationViewModel.changeScreen,
		navigationViewModel.showBackButton,
		navigationViewModel.goBack
	);


	return (
		<div className={navigationViewModel.pageClassName}>
			<div className={navigationViewModel.shellClassName}>
				<AppNavigation
					activeScreen={navigationViewModel.activeScreen}
					onChangeScreen={navigationViewModel.changeScreen}
					settingsOpen={navigationViewModel.settingsOpen}
					onOpenSettings={navigationViewModel.openSettings}
					onCloseSettings={navigationViewModel.closeSettings}
					onBackFromSettings={navigationViewModel.backFromSettingsToMenu}
					isMenuOpen={navigationViewModel.isMenuOpen}
					onToggleMenu={navigationViewModel.toggleMenu}
					onCloseMenu={navigationViewModel.closeMenu}
					isSubjectPickerOpen={navigationViewModel.isSubjectPickerOpen}
					onToggleSubjectPicker={navigationViewModel.toggleSubjectPicker}
					onCloseSubjectPicker={navigationViewModel.closeSubjectPicker}
					showSubjectSwitcher={navigationViewModel.shouldShowSubjectSwitcher}
					hasSelectedSubject={Boolean(navigationViewModel.selectedSubjectId)}
					showBackButton={navigationViewModel.showBackButton}
					onBack={navigationViewModel.goBack}
					subjects={subjectSelectPageViewModel.subjects}
					selectedSubject={subjectSelectPageViewModel.selectedSubject}
					onSelectSubject={navigationViewModel.selectSubject}
					onShowAllSubjects={navigationViewModel.showAllSubjects}
					isExamWorkMode={navigationViewModel.activeScreen === NAV_SCREENS.EXAM}
					examWorkStatusLabel={examWorkMode?.statusLabel ?? ""}
					showExamSubmitAction={Boolean(examWorkMode?.canSubmit)}
					examSubmitLabel={t.examSubmitLabel}
					isExamSubmitConfirmOpen={Boolean(examWorkMode?.isConfirmOpen)}
					examSubmitConfirmTitle={t.examSubmitConfirmTitle}
					examSubmitConfirmBody={t.examSubmitConfirmBody}
					examSubmitConfirmCancelLabel={t.examSubmitConfirmCancelLabel}
					examSubmitConfirmConfirmLabel={t.examSubmitConfirmConfirmLabel}
					onOpenExamSubmitConfirm={openExamSubmitConfirm}
					onCloseExamSubmitConfirm={closeExamSubmitConfirm}
					onConfirmExamSubmit={confirmExamSubmit}
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
						onExamWorkModeChange={setExamWorkMode}
						examWorkModeActionsRef={examWorkModeActionsRef}
					/>
				)}

				{navigationViewModel.activeScreen === NAV_SCREENS.FLIPCARDS && (
					<FlipcardsPageWrapper
						subjectId={navigationViewModel.selectedSubjectId}
						language={language}
						t={t}
						showBackButton={navigationViewModel.showBackButton}
						onBack={navigationViewModel.goBack}
					/>
				)}

				{navigationViewModel.activeScreen === NAV_SCREENS.OVERVIEW && (
					<StatisticsPageWrapper
						formatDate={formatDate}
						t={t}
						onStartNewExam={navigationViewModel.showAllSubjects}
					/>
				)}

				<SettingsPresentation
					mode={navigationViewModel.settingsPresentationMode}
					isOpen={navigationViewModel.settingsOpen}
					onClose={navigationViewModel.closeSettings}
					onBackToMenu={navigationViewModel.backFromSettingsToMenu}
				/>
			</div>
		</div>
	);
}

function ExamPageWrapper({ examId, language, t, onExamWorkModeChange, examWorkModeActionsRef }) {
	const examPageViewModel = useExamPageViewModel(
		getExamQuestionsUseCase,
		gradeAnswerUseCase,
		calculateExamScoreUseCase,
		submitExamAttemptUseCase,
		examId,
		language,
		t
	);

	useEffect(() => {
		examWorkModeActionsRef.current = {
			openConfirm: examPageViewModel.openSubmitConfirmation,
			closeConfirm: examPageViewModel.closeSubmitConfirmation,
			confirmSubmit: examPageViewModel.confirmSubmitExam
		};
	}, [
		examPageViewModel.openSubmitConfirmation,
		examPageViewModel.closeSubmitConfirmation,
		examPageViewModel.confirmSubmitExam,
		examWorkModeActionsRef
	]);

	useEffect(() => {
		onExamWorkModeChange({
			statusLabel: examPageViewModel.mobileWorkStatusLabel,
			canSubmit: examPageViewModel.canSubmitExam,
			isConfirmOpen: examPageViewModel.isSubmitConfirmOpen
		});
	}, [
		examPageViewModel.mobileWorkStatusLabel,
		examPageViewModel.canSubmitExam,
		examPageViewModel.isSubmitConfirmOpen,
		onExamWorkModeChange
	]);

	useEffect(() => {
		return () => {
			examWorkModeActionsRef.current = null;
			onExamWorkModeChange(null);
		};
	}, [examWorkModeActionsRef, onExamWorkModeChange]);

	return (
		<ExamPage viewModel={examPageViewModel} />
	);
}

function FlipcardsPageWrapper({ subjectId, language, t, showBackButton, onBack }) {
	const flipcardsPageViewModel = useFlipcardsPageViewModel(
		getFlashcardsUseCase,
		subjectId,
		language,
		t,
		true,
		showBackButton,
		onBack
	);

	return (
		<FlipcardsPage viewModel={flipcardsPageViewModel} />
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
		<StatisticsPage viewModel={statisticsPageViewModel} />
	);
}

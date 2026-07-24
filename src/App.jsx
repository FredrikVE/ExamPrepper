// src/App.jsx
import { useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "@clerk/clerk-react";

import { ThemeProvider } from "./ui/theme/ThemeContext.jsx";
import { LanguageProvider, useLanguage } from "./i18n/LanguageContext.jsx";
import { SettingsProvider } from "./ui/settings/SettingsContext.jsx";

import useAppNavigationViewModel from "./ui/viewmodel/AppNavigationViewModel.js";
import useSubjectSelectPageViewModel from "./ui/viewmodel/SubjectSelectPageViewModel.js";
import useLearningContentSelectPageViewModel from "./ui/viewmodel/LearningContentSelectPageViewModel.js";
import useExamPageViewModel from "./ui/viewmodel/ExamPageViewModel.js";
import useStatisticsPageViewModel from "./ui/viewmodel/StatisticsPageViewModel.js";
import useFlipcardsPageViewModel from "./ui/viewmodel/FlipcardsPageViewModel.js";
import useMatchCardsPageViewModel from "./ui/viewmodel/MatchCardsPageViewModel.js";
import useGlossaryPageViewModel from "./ui/viewmodel/GlossaryPageViewModel.js";

import SubjectSelectPage from "./ui/view/pages/SubjectSelectPage.jsx";
import LearningContentSelectPage from "./ui/view/pages/LearningContentSelectPage.jsx";
import ExamPage from "./ui/view/pages/ExamPage.jsx";
import StatisticsPage from "./ui/view/pages/StatisticsPage.jsx";
import FlipcardsPage from "./ui/view/pages/FlipcardsPage.jsx";
import MatchCardsPage from "./ui/view/pages/MatchCardsPage.jsx";
import GlossaryPage from "./ui/view/pages/GlossaryPage.jsx";

import AppNavigation from "./ui/view/components/Sidebar/AppNavigation.jsx";
import SettingsPresentation from "./ui/view/components/Settings/SettingsPresentation.jsx";

import { NAV_SCREENS } from "./navigation/navigation.js";
import { calculateExamScoreUseCase, getAvailableExamsUseCase, getAvailableSubjectsUseCase, getExamByBaseIdAndLangUseCase, getExamByIdUseCase, getExamQuestionsUseCase, getFlipcardDeckSummariesUseCase, getGlossaryEntriesForSubjectUseCase, getMyStatisticsUseCase, getTopicAreasUseCase, gradeAnswerUseCase, submitExamAttemptUseCase } from "./di/dependencies.js";

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
	const [headerProgressBarModel, setHeaderProgressBarModel] = useState(null);
	const examWorkModeActionsRef = useRef(null);

	const navigationViewModel = useAppNavigationViewModel({
		language,
		getExamByIdUseCase,
		getExamByBaseIdAndLangUseCase,
		backLabel: t.sidebarBack,
		navigationLabel: t.sidebarMobileNavigation
	});

	const openExamSubmitConfirm = useCallback(() => {
		examWorkModeActionsRef.current?.openConfirm();
	}, []);

	const closeExamSubmitConfirm = useCallback(() => {
		examWorkModeActionsRef.current?.closeConfirm();
	}, []);

	const confirmExamSubmit = useCallback(() => {
		navigationViewModel.closeMobileDropDownTopBarMenu();
		examWorkModeActionsRef.current?.confirmSubmit();
	}, [navigationViewModel.closeMobileDropDownTopBarMenu]);

	const subjectSelectPageViewModel = useSubjectSelectPageViewModel(
		getAvailableSubjectsUseCase,
		language,
		t,
		navigationViewModel.selectedSubjectId,
		navigationViewModel.selectSubject,
		navigationViewModel.activeScreen === NAV_SCREENS.SUBJECTS
	);

	const learningContentSelectPageViewModel = useLearningContentSelectPageViewModel(
		getAvailableExamsUseCase,
		getTopicAreasUseCase,
		getFlipcardDeckSummariesUseCase,
		language,
		t,
		subjectSelectPageViewModel.selectedSubject,
		navigationViewModel.selectExam,
		navigationViewModel.selectFlipcardDeck,
		navigationViewModel.selectMatchCardsDeck,
		navigationViewModel.activeScreen === NAV_SCREENS.SELECT,
		navigationViewModel.changeScreen,
		navigationViewModel.showBackButton,
		navigationViewModel.backLabel,
		navigationViewModel.navigationLabel,
		navigationViewModel.onBack
	);


	return (
		<div className={navigationViewModel.pageClassName}>
			<div className={navigationViewModel.shellClassName}>
				<AppNavigation
					activeScreen={navigationViewModel.activeScreen}
					onChangeScreen={navigationViewModel.changeScreen}
					isSettingsPresentationOpen={navigationViewModel.isSettingsPresentationOpen}
					onOpenSettingsPresentation={navigationViewModel.openSettingsPresentation}
					onCloseSettingsPresentation={navigationViewModel.closeSettingsPresentation}
					onBackFromSettingsToMobileDropDownTopBarMenu={navigationViewModel.backFromSettingsToMobileDropDownTopBarMenu}
					isMobileDropDownTopBarMenuOpen={navigationViewModel.isMobileDropDownTopBarMenuOpen}
					onToggleMobileDropDownTopBarMenu={navigationViewModel.toggleMobileDropDownTopBarMenu}
					onCloseMobileDropDownTopBarMenu={navigationViewModel.closeMobileDropDownTopBarMenu}
					isMobileSubjectPickerOpen={navigationViewModel.isMobileSubjectPickerOpen}
					onToggleMobileSubjectPicker={navigationViewModel.toggleMobileSubjectPicker}
					onCloseMobileSubjectPicker={navigationViewModel.closeMobileSubjectPicker}
					showSubjectSwitcher={navigationViewModel.shouldShowSubjectSwitcher}
					hasSelectedSubject={Boolean(navigationViewModel.selectedSubjectId)}
					showBackButton={navigationViewModel.showBackButton}
					backLabel={navigationViewModel.backLabel}
					navigationLabel={navigationViewModel.navigationLabel}
					onBack={navigationViewModel.onBack}
					subjects={subjectSelectPageViewModel.subjects}
					selectedSubject={subjectSelectPageViewModel.selectedSubject}
					onSelectSubject={navigationViewModel.selectSubject}
					onShowAllSubjects={navigationViewModel.showAllSubjects}
					isExamWorkMode={navigationViewModel.activeScreen === NAV_SCREENS.EXAM}
					examWorkStatusLabel={examWorkMode?.statusLabel ?? ""}
					showExamSubmitAction={Boolean(examWorkMode?.canSubmit)}
					progressBarModel={headerProgressBarModel}
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
					<LearningContentSelectPage viewModel={learningContentSelectPageViewModel} />
				)}

				{navigationViewModel.activeScreen === NAV_SCREENS.EXAM && (
					<ExamPageWrapper
						examId={navigationViewModel.selectedExamId}
						language={language}
						t={t}
						backContract={navigationViewModel.backContract}
						onExamWorkModeChange={setExamWorkMode}
						onHeaderProgressBarModelChange={setHeaderProgressBarModel}
						examWorkModeActionsRef={examWorkModeActionsRef}
					/>
				)}

				{navigationViewModel.activeScreen === NAV_SCREENS.FLIPCARDS && (
					<FlipcardsPageWrapper
						subjectId={navigationViewModel.selectedSubjectId}
						initialTopicAreaKey={navigationViewModel.selectedTopicAreaKey}
						language={language}
						t={t}
						isActive={navigationViewModel.activeScreen === NAV_SCREENS.FLIPCARDS}
						backContract={navigationViewModel.backContract}
					/>
				)}

				{navigationViewModel.activeScreen === NAV_SCREENS.MATCHCARDS && (
					<MatchCardsPageWrapper
						subjectId={navigationViewModel.selectedSubjectId}
						initialTopicAreaKey={navigationViewModel.selectedTopicAreaKey}
						language={language}
						t={t}
						isActive={navigationViewModel.activeScreen === NAV_SCREENS.MATCHCARDS}
						backContract={navigationViewModel.backContract}
						onHeaderProgressBarModelChange={setHeaderProgressBarModel}
					/>
				)}

				<GlossaryPageWrapper
					subjectId={navigationViewModel.selectedSubjectId}
					selectedSubject={subjectSelectPageViewModel.selectedSubject}
					initialTopicAreaKey={navigationViewModel.selectedTopicAreaKey}
					language={language}
					t={t}
					isActive={navigationViewModel.activeScreen === NAV_SCREENS.GLOSSARY}
					backContract={navigationViewModel.backContract}
					onSelectContentType={learningContentSelectPageViewModel.selectContentType}
				/>

				{navigationViewModel.activeScreen === NAV_SCREENS.OVERVIEW && (
					<StatisticsPageWrapper
						formatDate={formatDate}
						t={t}
						onStartNewExam={navigationViewModel.showAllSubjects}
					/>
				)}

				<SettingsPresentation
					mode={navigationViewModel.settingsPresentationMode}
					isOpen={navigationViewModel.isSettingsPresentationOpen}
					onClose={navigationViewModel.closeSettingsPresentation}
				/>
			</div>
		</div>
	);
}

function ExamPageWrapper({ examId, language, t, backContract, onExamWorkModeChange, onHeaderProgressBarModelChange, examWorkModeActionsRef }) {
	const examPageViewModel = useExamPageViewModel(
		getExamQuestionsUseCase,
		gradeAnswerUseCase,
		calculateExamScoreUseCase,
		submitExamAttemptUseCase,
		examId,
		language,
		t,
		backContract
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
		onHeaderProgressBarModelChange(examPageViewModel.examProgressBarModel);

		return () => {
			onHeaderProgressBarModelChange(null);
		};
	}, [examPageViewModel.examProgressBarModel, onHeaderProgressBarModelChange]);

	useEffect(() => {
		return () => {
			examWorkModeActionsRef.current = null;
			onExamWorkModeChange(null);
			onHeaderProgressBarModelChange(null);
		};
	}, [examWorkModeActionsRef, onExamWorkModeChange, onHeaderProgressBarModelChange]);

	return (
		<ExamPage viewModel={examPageViewModel} />
	);
}

function FlipcardsPageWrapper({ subjectId, initialTopicAreaKey, language, t, isActive, backContract }) {
	const flipcardsPageViewModel = useFlipcardsPageViewModel(
		getGlossaryEntriesForSubjectUseCase,
		getTopicAreasUseCase,
		subjectId,
		initialTopicAreaKey,
		language,
		t,
		isActive,
		backContract
	);

	return (
		<FlipcardsPage viewModel={flipcardsPageViewModel} />
	);
}

function MatchCardsPageWrapper({ subjectId, initialTopicAreaKey, language, t, isActive, backContract, onHeaderProgressBarModelChange }) {
	const matchCardsPageViewModel = useMatchCardsPageViewModel({
		getGlossaryEntriesForSubjectUseCase,
		getTopicAreasUseCase,
		subjectId,
		initialTopicAreaKey,
		language,
		t,
		isActive,
		backContract
	});

	useEffect(() => {
		onHeaderProgressBarModelChange(matchCardsPageViewModel.headerProgressBarModel);

		return () => {
			onHeaderProgressBarModelChange(null);
		};
	}, [matchCardsPageViewModel.headerProgressBarModel, onHeaderProgressBarModelChange]);

	return (
		<MatchCardsPage viewModel={matchCardsPageViewModel} />
	);
}

function GlossaryPageWrapper({ subjectId, selectedSubject, initialTopicAreaKey, language, t, isActive, backContract, onSelectContentType }) {
	const glossaryPageViewModel = useGlossaryPageViewModel(
		getGlossaryEntriesForSubjectUseCase,
		getTopicAreasUseCase,
		subjectId,
		selectedSubject,
		initialTopicAreaKey,
		language,
		t,
		isActive,
		backContract,
		onSelectContentType
	);

	if (!isActive) {
		return null;
	}

	return (
		<GlossaryPage viewModel={glossaryPageViewModel} />
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
				authState={{ hasClerkAuth: false, isLoaded: true, isSignedIn: false, userId: null }}
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
	const { isLoaded, isSignedIn, userId } = useAuth();

	return (
		<StatisticsPageWithViewModel
			formatDate={formatDate}
			t={t}
			onStartNewExam={onStartNewExam}
			authState={{ hasClerkAuth: true, isLoaded, isSignedIn, userId: userId ?? null }}
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

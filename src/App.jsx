//src/App.jsx
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
import useLearningPathPageViewModel from "./ui/viewmodel/LearningPathPageViewModel.js";
import useLearningSessionPageViewModel from "./ui/viewmodel/LearningSessionPageViewModel.js";

import SubjectSelectPage from "./ui/view/pages/SubjectSelectPage.jsx";
import LearningContentSelectPage from "./ui/view/pages/LearningContentSelectPage.jsx";
import ExamPage from "./ui/view/pages/ExamPage.jsx";
import StatisticsPage from "./ui/view/pages/StatisticsPage.jsx";
import FlipcardsPage from "./ui/view/pages/FlipcardsPage.jsx";
import MatchCardsPage from "./ui/view/pages/MatchCardsPage.jsx";
import GlossaryPage from "./ui/view/pages/GlossaryPage.jsx";
import LearningPathPage from "./ui/view/pages/LearningPathPage.jsx";
import LearningSessionPage from "./ui/view/pages/LearningSessionPage.jsx";

import AppNavigation from "./ui/view/components/Sidebar/AppNavigation.jsx";
import SettingsPresentation from "./ui/view/components/Settings/SettingsPresentation.jsx";
import AppErrorBoundary from "./ui/view/components/AppErrorBoundary/AppErrorBoundary.jsx";
import AppErrorFallback from "./ui/view/components/AppErrorBoundary/AppErrorFallback.jsx";

import { NAV_SCREENS, TEST_TYPES } from "./navigation/navigation.js";
import { calculateExamScoreUseCase, getAvailableChapterTestsUseCase, getAvailableExamsUseCase, getAvailableSubjectsUseCase, getChapterTestByBaseIdAndLangUseCase, getChapterTestByIdUseCase, getChapterTestQuestionsUseCase, getExamByBaseIdAndLangUseCase, getExamByIdUseCase, getExamQuestionsUseCase, getFlipcardDeckSummariesUseCase, getGlossaryEntriesForSubjectUseCase, getGlossaryNetworkUseCase, getGlossaryOverviewUseCase, getLearningPathUseCase, getLearningSessionUseCase, getMyStatisticsUseCase, getTopicAreasUseCase, gradeAnswerUseCase, recordFlipcardAssessmentUseCase, startLearningSessionUseCase, submitExamAttemptUseCase, submitLearningSessionUseCase } from "./di/dependencies.js";

import "./ui/style/App.css";


export default function App() {
	return (
		<ThemeProvider>
			<LanguageProvider>
				<SettingsProvider>
					<AppErrorBoundary onError={reportRenderError} fallback={<AppErrorFallback onRecover={reloadApplication} />}>
						<AppContent />
					</AppErrorBoundary>
				</SettingsProvider>
			</LanguageProvider>
		</ThemeProvider>
	);
}

function reportRenderError(error, errorInfo) {
	if (import.meta.env?.DEV === true) {
		console.error("[AppErrorBoundary] Render failed", error, errorInfo);
	}
}

function reloadApplication() {
	window.location.reload();
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
		getChapterTestByIdUseCase,
		getChapterTestByBaseIdAndLangUseCase,
		backLabel: t.sidebarBack,
		navigationLabel: t.sidebarMobileNavigation,
		examUnavailableMessage: t.examLanguageUnavailableMessage,
		examSyncFailedMessage: t.examLanguageSyncErrorMessage
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
		navigationViewModel.activeScreen === NAV_SCREENS.SUBJECTS,
		navigationViewModel.backContract
	);

	const learningContentSelectPageViewModel = useLearningContentSelectPageViewModel({
		getAvailableExamsUseCase,
		getAvailableChapterTestsUseCase,
		getTopicAreasUseCase,
		getFlipcardDeckSummariesUseCase,
		language,
		t,
		selectedSubject: subjectSelectPageViewModel.selectedSubject,
		onSelectTestSet: navigationViewModel.selectExam,
		onSelectFlipcardDeck: navigationViewModel.selectFlipcardDeck,
		onSelectMatchCardsDeck: navigationViewModel.selectMatchCardsDeck,
		isActive: navigationViewModel.activeScreen === NAV_SCREENS.SELECT,
		onChangeScreen: navigationViewModel.changeScreen,
		backContract: navigationViewModel.backContract,
		actionErrorMessage: navigationViewModel.examLanguageSyncError
	});


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
					backContract={navigationViewModel.backContract}
					subjectSwitcher={subjectSelectPageViewModel.subjectSwitcher}
					onSelectSubject={navigationViewModel.selectSubject}
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

				{navigationViewModel.activeScreen === NAV_SCREENS.LEARNING_PATH && (
					<LearningPathPageWrapper selectedSubject={subjectSelectPageViewModel.selectedSubject} language={language} t={t} isActive={true} backContract={navigationViewModel.backContract} contentSelectViewModel={learningContentSelectPageViewModel} onLearningSessionStarted={navigationViewModel.openLearningSession} onChapterTestSelected={(chapterTestId) => navigationViewModel.selectExam(chapterTestId, TEST_TYPES.CHAPTER_TEST)} />
				)}

				{navigationViewModel.activeScreen === NAV_SCREENS.LEARNING_SESSION && (
					<LearningSessionPageWrapper sessionId={navigationViewModel.selectedLearningSessionId} t={t} isActive={true} backContract={navigationViewModel.backContract} />
				)}

				{navigationViewModel.activeScreen === NAV_SCREENS.EXAM && (
					<ExamPageWrapper
						examId={navigationViewModel.selectedExamId}
						testType={navigationViewModel.selectedExamTestType}
						language={language}
						t={t}
						backContract={navigationViewModel.backContract}
						onExamWorkModeChange={setExamWorkMode}
						onHeaderProgressBarModelChange={setHeaderProgressBarModel}
						examWorkModeActionsRef={examWorkModeActionsRef}
						onAttemptSaved={navigationViewModel.completeExamAttempt}
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
					expandedMobileToggleButtonGroupId={learningContentSelectPageViewModel.expandedMobileToggleButtonGroupId}
					onOpenMobileToggleButtonGroup={learningContentSelectPageViewModel.openMobileToggleButtonGroup}
					onCloseMobileToggleButtonGroup={learningContentSelectPageViewModel.closeMobileToggleButtonGroup}
				/>

				{navigationViewModel.activeScreen === NAV_SCREENS.OVERVIEW && (
					<StatisticsPageWrapper
						formatDate={formatDate}
						t={t}
						backContract={navigationViewModel.backContract}
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

function LearningPathPageWrapper(props) {
	const hasClerkAuth = Boolean(import.meta.env?.VITE_CLERK_PUBLISHABLE_KEY);

	if (!hasClerkAuth) {
		return <LearningPathPageWithViewModel {...props} authState={{ hasClerkAuth: false, isLoaded: true, isSignedIn: false, userId: null }} />;
	}

	return <AuthenticatedLearningPathPageWrapper {...props} />;
}

function AuthenticatedLearningPathPageWrapper(props) {
	const { isLoaded, isSignedIn, userId } = useAuth();
	return <LearningPathPageWithViewModel {...props} authState={{ hasClerkAuth: true, isLoaded, isSignedIn, userId: userId ?? null }} />;
}

function LearningPathPageWithViewModel({ selectedSubject, language, t, isActive, backContract, contentSelectViewModel, onLearningSessionStarted, onChapterTestSelected, authState }) {
	const contentToggleContract = {
		entries: contentSelectViewModel.contentToggleEntries,
		activeEntryId: "learning-path",
		mobileActiveEntryId: "learning-path",
		onSelectEntry: contentSelectViewModel.selectContentType,
		ariaLabel: contentSelectViewModel.contentToggleAriaLabel,
		mobileToggleButtonItems: contentSelectViewModel.mobileToggleButtonItems,
		expandedMobileToggleButtonGroupId: contentSelectViewModel.expandedMobileToggleButtonGroupId,
		onOpenMobileToggleButtonGroup: contentSelectViewModel.openMobileToggleButtonGroup,
		onCloseMobileToggleButtonGroup: contentSelectViewModel.closeMobileToggleButtonGroup,
		contentToggleBackLabel: contentSelectViewModel.contentToggleBackLabel
	};
	const viewModel = useLearningPathPageViewModel({ getLearningPathUseCase, startLearningSessionUseCase, selectedSubject, language, t, isActive, backContract, contentToggleContract, onLearningSessionStarted, onChapterTestSelected, authState });

	return <LearningPathPage viewModel={viewModel} />;
}

function LearningSessionPageWrapper({ sessionId, t, isActive, backContract }) {
	const viewModel = useLearningSessionPageViewModel({ getLearningSessionUseCase, submitLearningSessionUseCase, gradeAnswerUseCase, sessionId, t, isActive, backContract });

	return <LearningSessionPage viewModel={viewModel} />;
}

function ExamPageWrapper({ examId, testType, language, t, backContract, onExamWorkModeChange, onHeaderProgressBarModelChange, examWorkModeActionsRef, onAttemptSaved }) {
	const testSetQuestionsUseCase = getQuestionsUseCaseForTestType(testType);
	const examPageViewModel = useExamPageViewModel({
		getExamQuestionsUseCase: testSetQuestionsUseCase,
		gradeAnswerUseCase,
		calculateExamScoreUseCase,
		submitExamAttemptUseCase,
		examId,
		language,
		t,
		backContract,
		onAttemptSaved
	});

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

function getQuestionsUseCaseForTestType(testType) {
	if (testType === TEST_TYPES.CHAPTER_TEST) {
		return getChapterTestQuestionsUseCase;
	}

	if (testType === TEST_TYPES.EXAM) {
		return getExamQuestionsUseCase;
	}

	throw new Error(`Unknown selected test type: ${String(testType)}`);
}

function FlipcardsPageWrapper(props) {
	const hasClerkAuth = Boolean(import.meta.env?.VITE_CLERK_PUBLISHABLE_KEY);

	if (!hasClerkAuth) {
		return <FlipcardsPageWithViewModel {...props} authState={{ isLoaded: true, isSignedIn: false }} />;
	}

	return <AuthenticatedFlipcardsPageWrapper {...props} />;
}

function AuthenticatedFlipcardsPageWrapper(props) {
	const { isLoaded, isSignedIn } = useAuth();

	return <FlipcardsPageWithViewModel {...props} authState={{ isLoaded, isSignedIn }} />;
}

function FlipcardsPageWithViewModel({ subjectId, initialTopicAreaKey, language, t, isActive, backContract, authState }) {
	const flipcardsPageViewModel = useFlipcardsPageViewModel({
		getGlossaryEntriesForSubjectUseCase,
		getTopicAreasUseCase,
		recordFlipcardAssessmentUseCase,
		subjectId,
		initialTopicAreaKey,
		language,
		t,
		isActive,
		backContract,
		authState
	});

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

function GlossaryPageWrapper({ subjectId, selectedSubject, initialTopicAreaKey, language, t, isActive, backContract, onSelectContentType, expandedMobileToggleButtonGroupId, onOpenMobileToggleButtonGroup, onCloseMobileToggleButtonGroup }) {
	const glossaryPageViewModel = useGlossaryPageViewModel({
		getGlossaryOverviewUseCase,
		getGlossaryNetworkUseCase,
		getTopicAreasUseCase,
		subjectId,
		selectedSubject,
		initialTopicAreaKey,
		language,
		t,
		isActive,
		backContract,
		onSelectContentType,
		expandedMobileToggleButtonGroupId,
		openMobileToggleButtonGroup: onOpenMobileToggleButtonGroup,
		closeMobileToggleButtonGroup: onCloseMobileToggleButtonGroup
	});

	if (!isActive) {
		return null;
	}

	return (
		<GlossaryPage viewModel={glossaryPageViewModel} />
	);
}

function StatisticsPageWrapper({ formatDate, t, backContract, onStartNewExam }) {
	const hasClerkAuth = Boolean(import.meta.env?.VITE_CLERK_PUBLISHABLE_KEY);

	if (!hasClerkAuth) {
		return (
			<StatisticsPageWithViewModel
				formatDate={formatDate}
				t={t}
				backContract={backContract}
				onStartNewExam={onStartNewExam}
				authState={{ hasClerkAuth: false, isLoaded: true, isSignedIn: false, userId: null }}
			/>
		);
	}

	return (
		<AuthenticatedStatisticsPageWrapper
			formatDate={formatDate}
			t={t}
			backContract={backContract}
			onStartNewExam={onStartNewExam}
		/>
	);
}

function AuthenticatedStatisticsPageWrapper({ formatDate, t, backContract, onStartNewExam }) {
	const { isLoaded, isSignedIn, userId } = useAuth();

	return (
		<StatisticsPageWithViewModel
			formatDate={formatDate}
			t={t}
			backContract={backContract}
			onStartNewExam={onStartNewExam}
			authState={{ hasClerkAuth: true, isLoaded, isSignedIn, userId: userId ?? null }}
		/>
	);
}

function StatisticsPageWithViewModel({ formatDate, t, backContract, onStartNewExam, authState }) {
	const statisticsPageViewModel = useStatisticsPageViewModel({
		getMyStatisticsUseCase,
		formatDate,
		t,
		authState,
		backContract,
		onStartNewExam
	});

	return (
		<StatisticsPage viewModel={statisticsPageViewModel} />
	);
}

// src/ui/view/pages/ExamPage.jsx
import Header from "../components/Header/Header.jsx";
import ExamToolbarActions from "../components/ExamPage/ExamToolbarActions.jsx";
import ExamFooter from "../components/ExamPage/ExamFooter.jsx";
import ExamPageContent from "../components/ExamPage/ExamPageContent.jsx";
import WorkspaceScaffold from "../components/WorkspaceScaffold/WorkspaceScaffold.jsx";
import ExamSubmitConfirmation from "../components/ExamPage/SubmitConfirmation/ExamSubmitConfirmation.jsx";
import WorkspaceState from "../components/WorkspaceState/WorkspaceState.jsx";
import useExamFooterNavigationKeys from "../components/ExamPage/useExamFooterNavigationKeys.js";
import { useLanguage } from "../../../i18n/LanguageContext.jsx";

export default function ExamPage({ viewModel }) {
	const { t } = useLanguage();

	useExamFooterNavigationKeys({
		isEnabled: viewModel.isFooterNavigationEnabled,
		canGoPrevious: viewModel.canGoPrevious,
		canGoNext: viewModel.canGoNext,
		submitted: viewModel.submitted,
		onNavigatePrevious: viewModel.previousQuestion,
		onNavigateNext: viewModel.nextQuestion
	});

	const headerToolbar = viewModel.shouldShowExamChrome ? (
		<ExamToolbarActions
			answeredPercentLabel={viewModel.answeredPercentLabel}
			scoreLabel={viewModel.scoreLabel}
			elapsedTimeLabel={viewModel.elapsedTimeLabel}
			submitted={viewModel.submitted}
			onSubmit={viewModel.openSubmitConfirmation}
			onReset={viewModel.resetExam}
		/>
	) : null;

	const header = (
		<Header
			showBackButton={viewModel.showBackButton}
			backLabel={viewModel.backLabel}
			navigationLabel={viewModel.navigationLabel}
			onBack={viewModel.onBack}
			progressBarModel={viewModel.shouldShowExamChrome ? viewModel.examProgressBarModel : null}
			tools={null}
			trailing={headerToolbar}
		/>
	);

	const examFooter = viewModel.shouldShowExamChrome ? (
		<ExamFooter
			previousQuestion={viewModel.previousQuestion}
			canGoPrevious={viewModel.canGoPrevious}
			questionDotEntries={viewModel.questionDotEntries}
			filledCompactQuestionDotEntries={viewModel.filledCompactQuestionDotEntries}
			minimalCompactQuestionDotEntries={viewModel.minimalCompactQuestionDotEntries}
			shouldUseCompactDots={viewModel.shouldUseCompactDots}
			shouldUseResponsiveCompactDots={viewModel.shouldUseResponsiveCompactDots}
			submitted={viewModel.submitted}
			questionProgressLabel={viewModel.questionProgressLabel}
			onGoToQuestion={viewModel.goToQuestion}
			showSubmitButton={viewModel.showSubmitButton}
			onSubmit={viewModel.openSubmitConfirmation}
			onNext={viewModel.nextQuestion}
			isNextDisabled={viewModel.isLastQuestion}
		/>
	) : null;

	return (
		<>
			<WorkspaceScaffold
				className={viewModel.workspaceClassName}
				contentClassName=""
				header={header}
				footer={examFooter}
				overlay={null}
				scrollToTopRequestId={viewModel.shouldShowExamChrome ? viewModel.scrollToTopRequestId : null}
			>
				<WorkspaceState state={viewModel.workspaceState}>
					<>
						{viewModel.attemptSaving && (
							<p className="exam-attempt-save-status">{viewModel.attemptSavingMessage}</p>
						)}

						{viewModel.attemptSaveError && (
							<p className="exam-attempt-save-error">{viewModel.attemptSaveError}</p>
						)}

						<div className="exam-page-main">
							<div className="exam-page-content">
								<ExamPageContent viewModel={viewModel} />
							</div>
						</div>
					</>
				</WorkspaceState>
			</WorkspaceScaffold>

			{viewModel.isSubmitConfirmOpen && (
				<ExamSubmitConfirmation
					title={t.examSubmitConfirmTitle}
					body={t.examSubmitConfirmBody}
					cancelLabel={t.examSubmitConfirmCancelLabel}
					confirmLabel={t.examSubmitConfirmConfirmLabel}
					onCancel={viewModel.closeSubmitConfirmation}
					onConfirm={viewModel.confirmSubmitExam}
				/>
			)}
		</>
	);
}

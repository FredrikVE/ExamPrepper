// src/ui/view/pages/ExamPage.jsx
import { isBlockingLoadStatus } from "../../loadStatus/loadStatus.js";
import Header from "../components/Header/Header.jsx";
import ExamToolbarActions from "../components/ExamPage/ExamToolbarActions.jsx";
import ExamFooter from "../components/ExamPage/ExamFooter.jsx";
import ExamPageContent from "../components/ExamPage/ExamPageContent.jsx";
import WorkSpaceScaffold from "../components/Shared/WorkSpaceScaffold/WorkSpaceScaffold.jsx";
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

	const header = (
		<Header
			showBackButton={viewModel.showBackButton}
			backLabel={viewModel.backLabel}
			navigationLabel={viewModel.navigationLabel}
			onBack={viewModel.onBack}
			progressBarModel={null}
			tools={null}
			trailing={null}
		/>
	);

	if (isBlockingLoadStatus(viewModel.pageStatus)) {
		return (
			<WorkSpaceScaffold
				className={viewModel.workspaceClassName}
				header={header}
				scrollToTopRequestId={0}
			>
				<WorkspaceState
					status={viewModel.pageStatus}
					loadingLabel={viewModel.loadingTitle}
					errorTitle={viewModel.errorTitle}
					errorBody={viewModel.pageErrorMessage}
					errorAction={null}
				/>
			</WorkSpaceScaffold>
		);
	}

	const headerToolbar = (
		<ExamToolbarActions
			answeredPercentLabel={viewModel.answeredPercentLabel}
			scoreLabel={viewModel.scoreLabel}
			elapsedTimeLabel={viewModel.elapsedTimeLabel}
			submitted={viewModel.submitted}
			onSubmit={viewModel.openSubmitConfirmation}
			onReset={viewModel.resetExam}
		/>
	);

	return (
		<>
			<WorkSpaceScaffold
				className={viewModel.workspaceClassName}
				header={(
					<Header
						showBackButton={viewModel.showBackButton}
						backLabel={viewModel.backLabel}
						navigationLabel={viewModel.navigationLabel}
						onBack={viewModel.onBack}
						progressBarModel={viewModel.examProgressBarModel}
						tools={null}
						trailing={headerToolbar}
					/>
				)}
				scrollToTopRequestId={viewModel.scrollToTopRequestId}
			>
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
			</WorkSpaceScaffold>

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

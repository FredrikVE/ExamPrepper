// src/ui/view/pages/ExamPage.jsx
import Header from "../components/Header/Header.jsx";
import ExamFooter from "../components/ExamPage/ExamFooter.jsx";
import ExamProgress from "../components/ExamPage/ExamProgress/ExamProgress.jsx";
import ExamPageContent from "../components/ExamPage/ExamPageContent.jsx";
import ExamPageState from "../components/ExamPage/ExamPageState.jsx";
import ExamWorkspace from "../components/ExamPage/ExamWorkspace.jsx";
import ExamSubmitConfirmation from "../components/ExamPage/SubmitConfirmation/ExamSubmitConfirmation.jsx";
import { useLanguage } from "../../../i18n/LanguageContext.jsx";

export default function ExamPage({ viewModel }) {
    const { t } = useLanguage();

    if (viewModel.questionsLoading) {
        return (
            <ExamPageState>
                <p className="exam-page-loading-message">
                    {viewModel.loadingMessage}
                </p>
            </ExamPageState>
        );
    }

    if (viewModel.questionsLoadError) {
        return (
            <ExamPageState>
                <p className="exam-page-error-message">
                    {viewModel.errorPrefix}: {viewModel.questionsLoadError}
                </p>
            </ExamPageState>
        );
    }

    return (
        <>
            <ExamWorkspace
                className={viewModel.workspaceClassName}
                scrollToTopRequestId={viewModel.scrollToTopRequestId}
            >
                <Header viewModel={viewModel} />

                {viewModel.attemptSaving && (
                    <p className="exam-attempt-save-status">{viewModel.attemptSavingMessage}</p>
                )}

                {viewModel.attemptSaveError && (
                    <p className="exam-attempt-save-error">{viewModel.attemptSaveError}</p>
                )}

                <ExamProgress
                    visibleQuestions={viewModel.visibleQuestions}
                    currentQuestionIndex={viewModel.currentQuestionIndex}
                    onGoToQuestion={viewModel.goToQuestion}
                />

                <main className="exam-page-main">
                    <div className="exam-page-content">
                        <ExamPageContent viewModel={viewModel} />
                    </div>
                </main>

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
            </ExamWorkspace>

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

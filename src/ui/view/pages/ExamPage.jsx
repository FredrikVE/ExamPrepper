// src/ui/view/pages/ExamPage.jsx
import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";
import ExamProgress from "../components/ExamPage/ExamProgress/ExamProgress.jsx";
import ExamPageContent from "../components/ExamPage/ExamPageContent.jsx";
import ExamPageState from "../components/ExamPage/ExamPageState.jsx";
import { useLanguage } from "../../../i18n/LanguageContext.jsx";

export default function ExamPage({ viewModel }) {
    const { t } = useLanguage();

    if (viewModel.questionsLoading) {
        return (
            <ExamPageState>
                <p className="exam-page-loading-message">
                    {t.loadingMessage}
                </p>
            </ExamPageState>
        );
    }

    if (viewModel.questionsLoadError) {
        return (
            <ExamPageState>
                <p className="exam-page-error-message">
                    {t.errorPrefix}: {viewModel.questionsLoadError}
                </p>
            </ExamPageState>
        );
    }

    return (
        <div
            ref={viewModel.examWorkspaceRef}
            className={viewModel.workspaceClassName}
        >
            <Header viewModel={viewModel} />

            {viewModel.attemptSaving && (
                <p className="exam-attempt-save-status">Lagrer forsøk...</p>
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
                    <ExamPageContent viewModel={viewModel} t={t} />
                </div>
            </main>

            <Footer viewModel={viewModel} />
        </div>
    );
}

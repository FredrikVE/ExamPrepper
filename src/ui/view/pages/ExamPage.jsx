// src/ui/view/pages/ExamPage.jsx
import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";
import ExamProgress from "../components/ExamPage/ExamProgress.jsx";
import ExamPageContent from "../components/ExamPage/ExamPageContent.jsx";
import ExamPageState from "../components/ExamPage/ExamPageState.jsx";
import { useLanguage } from "../../../i18n/LanguageContext.jsx";

export default function ExamPage({ viewModel }) {
    const { t } = useLanguage();
    const workspaceClassName = viewModel.submitted
        ? "exam-workspace exam-workspace-feedback-mode"
        : "exam-workspace";

    if (viewModel.loading) {
        return (
            <ExamPageState>
                <p className="exam-page-loading-message">
                    {t.loadingMessage}
                </p>
            </ExamPageState>
        );
    }

    if (viewModel.error) {
        return (
            <ExamPageState>
                <p className="exam-page-error-message">
                    {t.errorPrefix}: {viewModel.error}
                </p>
            </ExamPageState>
        );
    }

    return (
        <div className={workspaceClassName}>
            <Header viewModel={viewModel} />

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
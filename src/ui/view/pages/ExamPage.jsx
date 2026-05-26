//src/ui/view/pages/ExamPage.jsx
import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";
import ExamProgress from "../components/ExamPage/ExamProgress.jsx";
import ExamPageContent from "../components/ExamPage/ExamPageContent.jsx";
import ExamPageState from "../components/ExamPage/ExamPageState.jsx";
import { useLanguage } from "../../../i18n/LanguageContext.jsx";
import { QUESTION_TYPES } from "../../../constants/QuestionTypes.js";

export default function ExamPage({ viewModel }) {
    const { t } = useLanguage();

    const activeOptionCount = viewModel.currentQuestion?.options?.length ?? 0;
    const activeDragDropTargetCount = viewModel.currentQuestion?.targets?.length ?? 0;
    const isDragDropQuestion = viewModel.currentQuestion?.type === QUESTION_TYPES.DRAG_DROP;
    const shouldUseScrollFooter = !viewModel.submitted && (
        activeOptionCount >= 6 ||
        isDragDropQuestion ||
        activeDragDropTargetCount >= 5
    );

    const workspaceClassName = [
        "exam-workspace",
        viewModel.submitted ? "exam-workspace-feedback-mode" : "",
        shouldUseScrollFooter ? "exam-workspace-scroll-footer-mode" : ""
    ].filter(Boolean).join(" ");

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
        <div
            ref={viewModel.examWorkspaceRef}
            className={workspaceClassName}
        >
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
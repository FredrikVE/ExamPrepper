// src/ui/view/pages/ExamPage.jsx
import { Flag } from "lucide-react";
import Header from "../components/Header/Header.jsx";
import QuestionCard from "../components/ExamPage/QuestionCard.jsx";
import Footer from "../components/Footer/Footer.jsx";
import { useLanguage } from "../../../i18n/LanguageContext.jsx";

export default function ExamPage({ viewModel, onBack }) {
    const { t } = useLanguage();

    if (viewModel.loading) {
        return (
            <div className="exam-workspace">
                <div className="exam-page-state">
                    <p className="exam-page-loading-message">
                        {t.loadingMessage}
                    </p>
                </div>
            </div>
        );
    }

    if (viewModel.error) {
        return (
            <div className="exam-workspace">
                <div className="exam-page-state">
                    <p className="exam-page-error-message">
                        {t.errorPrefix}: {viewModel.error}
                    </p>
                </div>
            </div>
        );
    }

    const pageContent = getPageContent(viewModel, t);

    return (
        <div className="exam-workspace">
            <Header viewModel={viewModel}/>

            <ExamProgress viewModel={viewModel} />

            <main className="exam-page-main">
                <div className="exam-page-content">
                    {pageContent}
                </div>
            </main>

            <Footer viewModel={viewModel} />
        </div>
    );
}

function ExamProgress({ viewModel }) {
    const total = Math.max(viewModel.visibleQuestions.length, 1);
    const current = Math.min(viewModel.currentQuestionIndex + 1, total);
    const getLeft = (questionNumber) => total === 1 ? 0 : ((questionNumber - 1) / (total - 1)) * 100;
    const fillPercent = total === 1 ? 100 : getLeft(current);
    const middlePoint = Math.max(1, Math.round(total * 0.48));
    const laterPoint = Math.min(total, Math.max(middlePoint + 1, Math.round(total * 0.72)));

    const points = [
        { label: "Start", question: 1, left: 0 },
        { label: `${middlePoint}/${total}`, question: middlePoint, left: getLeft(middlePoint) },
        { label: `${laterPoint}/${total}`, question: laterPoint, left: getLeft(laterPoint) },
        { label: `${total}/${total}`, question: total, left: 100, isFlag: true }
    ];

    return (
        <div className="exam-progress" aria-label="Exam progress">
            <div className="exam-progress-track">
                <div className="exam-progress-line" />
                <div
                    className="exam-progress-fill"
                    style={{ width: `calc(${fillPercent}% - ${fillPercent === 100 ? 8 : 0}px)` }}
                />

                {points.map((point) => (
                    <button
                        key={`${point.label}-${point.question}`}
                        type="button"
                        onClick={() => viewModel.goToQuestion(point.question - 1)}
                        className={`exam-progress-point ${current >= point.question ? "exam-progress-point-active" : ""}`}
                        style={{ left: `${point.left}%` }}
                    >
                        {point.isFlag ? (
                            <Flag className="exam-progress-flag" />
                        ) : (
                            <span className="exam-progress-dot" />
                        )}
                        <span>{point.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}

const getPageContent = (viewModel, t) => {
    if (!viewModel.currentQuestion) {
        return (
            <div className="exam-page-empty">
                {t.emptyMessage}
            </div>
        );
    }

    return (
        <QuestionCard
            question={viewModel.currentQuestion}
            answer={viewModel.answers[viewModel.currentQuestion.id]}
            submitted={viewModel.submitted}
            showAllFeedback={viewModel.showAllFeedback}
            correct={viewModel.currentQuestionIsCorrect}
            expandedAnswerOptionIndex={viewModel.expandedAnswerOptionIndex}
            onToggleAnswerOptionExpanded={viewModel.toggleAnswerOptionExpanded}
            onSingleAnswer={viewModel.setSingleAnswer}
            onToggleMultiAnswer={viewModel.toggleMultiAnswer}
        />
    );
};
// src/ui/view/pages/ExamPage.jsx
import ExamHeader from "../components/ExamPage/ExamHeader.jsx";
import QuestionCard from "../components/ExamPage/QuestionCard.jsx";
import ExamFooter from "../components/ExamPage/ExamFooter.jsx";

export default function ExamPage({ viewModel }) {
    if (viewModel.loading) {
        return (
            <div className="exam-page-state">
                <p className="exam-page-loading-message">
                    Laster eksamen...
                </p>
            </div>
        );
    }

    if (viewModel.error) {
        return (
            <div className="exam-page-state">
                <p className="exam-page-error-message">
                    Feil: {viewModel.error}
                </p>
            </div>
        );
    }

    return (
        <div className="exam-page">
            <ExamHeader viewModel={viewModel} />

            <main className="exam-page-main">
                <div className="exam-page-content">
                    {viewModel.currentQuestion ? (
                        <QuestionCard
                            question={viewModel.currentQuestion}
                            answer={viewModel.answers[viewModel.currentQuestion.id]}
                            submitted={viewModel.submitted}
                            showAllFeedback={viewModel.showAllFeedback}
                            correct={
                                viewModel.submitted
                                    ? viewModel.isAnswerCorrect(viewModel.currentQuestion)
                                    : false
                            }
                            onSingleAnswer={viewModel.setSingleAnswer}
                            onToggleMultiAnswer={viewModel.toggleMultiAnswer}
                        />
                    ) : (
                        <div className="exam-page-empty">
                            Ingen spørsmål i dette filteret.
                        </div>
                    )}
                </div>
            </main>

            <ExamFooter viewModel={viewModel} />
        </div>
    );
}
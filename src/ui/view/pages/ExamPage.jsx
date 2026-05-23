// src/ui/view/pages/ExamPage.jsx
import ExamHeader from "../components/ExamPage/ExamHeader.jsx";
import QuestionCard from "../components/ExamPage/QuestionCard.jsx";
import ExamFooter from "../components/ExamPage/ExamFooter.jsx";

export default function ExamPage({ viewModel }) {
    if (viewModel.loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-neutral-100 text-neutral-950">
                <p className="rounded-2xl bg-white px-5 py-4 shadow-sm">Laster eksamen...</p>
            </div>
        );
    }

    if (viewModel.error) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-neutral-100 text-neutral-950">
                <p className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-red-800">
                    Feil: {viewModel.error}
                </p>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen flex-col bg-neutral-100 text-neutral-950">
            <ExamHeader viewModel={viewModel} />

            <main className="mx-auto flex w-full max-w-5xl flex-1 items-start px-4 py-6">
                <div className="mx-auto w-full max-w-4xl pb-24">
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
                        <div className="rounded-2xl border border-neutral-300 bg-white p-6 shadow-sm">
                            Ingen spørsmål i dette filteret.
                        </div>
                    )}
                </div>
            </main>

            <ExamFooter viewModel={viewModel} />
        </div>
    );
}
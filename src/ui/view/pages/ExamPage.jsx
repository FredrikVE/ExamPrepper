//src/ui/view/pages/ExamPage.jsx
import ExamHeader from "../components/ExamPage/ExamHeader.jsx";
import ExamInstructions from "../components/ExamPage/ExamInstructions.jsx";
import QuestionCard from "../components/ExamPage/QuestionCard.jsx";
import ExamFooter from "../components/ExamPage/ExamFooter.jsx";

export default function ExamPage({ viewModel }) {
    if (viewModel.loading) {
        return <div className="flex min-h-screen items-center justify-center bg-neutral-100 text-neutral-950"><p className="rounded-2xl bg-white px-5 py-4 shadow-sm">Laster eksamen...</p></div>;
    }

    if (viewModel.error) {
        return <div className="flex min-h-screen items-center justify-center bg-neutral-100 text-neutral-950"><p className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-red-800">Feil: {viewModel.error}</p></div>;
    }

    return (
        <div className="min-h-screen bg-neutral-100 text-neutral-950">
            <ExamHeader viewModel={viewModel} />
            <main className="mx-auto max-w-5xl px-4 py-6">
                <ExamInstructions viewModel={viewModel} />
                <div className="space-y-5">
                    {viewModel.visibleQuestions.map((question) => (
                        <QuestionCard
                            key={question.id}
                            question={question}
                            answer={viewModel.answers[question.id]}
                            submitted={viewModel.submitted}
                            showAllFeedback={viewModel.showAllFeedback}
                            correct={viewModel.submitted ? viewModel.isAnswerCorrect(question) : false}
                            onSingleAnswer={viewModel.setSingleAnswer}
                            onToggleMultiAnswer={viewModel.toggleMultiAnswer}
                        />
                    ))}
                </div>
                <ExamFooter />
            </main>
        </div>
    );
}

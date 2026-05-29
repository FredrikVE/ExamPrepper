// src/ui/view/components/ExamPage/ExamPageContent.jsx
import QuestionCard from "./QuestionCard/QuestionCard.jsx";

export default function ExamPageContent({ viewModel, t }) {
    if (!viewModel.currentQuestion) {
        return (
            <div className="exam-page-empty">
                {t.emptyMessage}
            </div>
        );
    }

    const answerOptionOrder = viewModel.randomizeAnswerOptions
        ? viewModel.answerOptionOrderByQuestionId[viewModel.currentQuestion.id]
        : null;

    return (
        <QuestionCard
            question={viewModel.currentQuestion}
            answer={viewModel.answers[viewModel.currentQuestion.id]}
            answerOptionOrder={answerOptionOrder}
            submitted={viewModel.submitted}
            showAllFeedback={viewModel.showAllFeedback}
            correct={viewModel.currentQuestionIsCorrect}
            expandedAnswerOptionIndexes={viewModel.expandedAnswerOptionIndexes}
            onToggleAnswerOptionExpanded={viewModel.toggleAnswerOptionExpanded}
            onSingleAnswer={viewModel.setSingleAnswer}
            onToggleMultiAnswer={viewModel.toggleMultiAnswer}
        />
    );
}
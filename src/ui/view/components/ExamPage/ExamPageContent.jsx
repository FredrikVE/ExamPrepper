//src/ui/view/components/ExamPage/ExamPageContent.jsx
import QuestionCard from "./QuestionCard.jsx";

export default function ExamPageContent({ viewModel, t }) {
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
}
// src/ui/view/components/ExamPage/ExamPageContent.jsx
import QuestionCard from "./QuestionCard/QuestionCard.jsx";

export default function ExamPageContent({ viewModel }) {
    if (!viewModel.currentQuestion) {
        return (
            <div className="exam-page-empty">
                {viewModel.emptyMessage}
            </div>
        );
    }

    return (
        <QuestionCard
            question={viewModel.currentQuestion}
            questionNumber={viewModel.currentQuestionNumber}
            answer={viewModel.answers[viewModel.currentQuestion.id]}
            answerOptionOrder={viewModel.currentAnswerOptionOrder}
            submitted={viewModel.submitted}
            showAllFeedback={viewModel.showAllFeedback}
            correct={viewModel.currentQuestionIsCorrect}
            fillMatchType={viewModel.currentQuestionFillMatchType}
            expandedAnswerOptionIndexes={viewModel.expandedAnswerOptionIndexes}
            onToggleAnswerOptionExpanded={viewModel.toggleAnswerOptionExpanded}
            onSingleAnswer={viewModel.setSingleAnswer}
            onToggleMultiAnswer={viewModel.toggleMultiAnswer}
            onDropdownFillAnswer={viewModel.selectDropdownFillAnswer}
        />
    );
}
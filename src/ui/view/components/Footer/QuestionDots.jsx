//src/ui/view/components/Footer/QuestionDots.jsx
import QuestionDot from "./QuestionDot.jsx";

export default function QuestionDots({ viewModel, t }) {
    return (
        <div className="exam-footer-dots" role="navigation" aria-label={t.footerQuestionNavigationLabel}>
            {viewModel.visibleQuestions.map((question, index) => (
                <QuestionDot
                    key={question.id}
                    questionNumber={index + 1}
                    isActive={index === viewModel.currentQuestionIndex}
                    submitted={viewModel.submitted}
                    isCorrect={viewModel.submitted ? viewModel.isAnswerCorrect(question) : false}
                    onClick={() => viewModel.goToQuestion(index)}
                    t={t}
                />
            ))}
        </div>
    );
}
// src/ui/view/components/Footer/QuestionDots.jsx
import QuestionDot from "./QuestionDot.jsx";
import { getQuestionDotsClassName } from "./Utils/footerClassNames.js";
import { getFilledCompactQuestionDotEntries, getMinimalCompactQuestionDotEntries, shouldAllowResponsiveCompactDots, shouldUseCompactDotsByQuestionCount } from "./Utils/questionDotPagination.js";

export default function QuestionDots({ viewModel, t }) {
    const questionCount = viewModel.visibleQuestions.length;
    const shouldUseCompactDots = shouldUseCompactDotsByQuestionCount(questionCount);
    const shouldUseResponsiveCompactDots = shouldAllowResponsiveCompactDots(questionCount);
    const questionDotsClassName = getQuestionDotsClassName(shouldUseCompactDots, shouldUseResponsiveCompactDots);
    const filledCompactQuestionDotEntries = getFilledCompactQuestionDotEntries(viewModel.visibleQuestions, viewModel.currentQuestionIndex);
    const minimalCompactQuestionDotEntries = getMinimalCompactQuestionDotEntries(viewModel.visibleQuestions, viewModel.currentQuestionIndex);

    return (
        <div className={questionDotsClassName} role="navigation" aria-label={t.footerQuestionNavigationLabel}>
            <div className="exam-footer-dot-list exam-footer-dot-list-normal">
                {viewModel.visibleQuestions.map((question, questionIndex) => (
                    <QuestionDot
                        key={question.id}
                        questionNumber={questionIndex + 1}
                        isActive={questionIndex === viewModel.currentQuestionIndex}
                        submitted={viewModel.submitted}
                        isCorrect={viewModel.submitted ? viewModel.isAnswerCorrect(question) : false}
                        onClick={() => viewModel.goToQuestion(questionIndex)}
                        t={t}
                    />
                ))}
            </div>

            <div className="exam-footer-dot-list exam-footer-dot-list-filled-compact">
                {filledCompactQuestionDotEntries.map((questionDotEntry) => 
                    renderCompactQuestionDotEntry(questionDotEntry, viewModel, t, "filled-compact")
                    )
                }
            </div>

            <div className="exam-footer-dot-list exam-footer-dot-list-compact">
                {minimalCompactQuestionDotEntries.map((questionDotEntry) => 
                    renderCompactQuestionDotEntry(questionDotEntry, viewModel, t, "compact")
                    )
                }
            </div>
        </div>
    );
}

const renderCompactQuestionDotEntry = (questionDotEntry, viewModel, t, dotDisplayMode) => {
    if (questionDotEntry.type === "ellipsis") {
        return (
            <span
                key={questionDotEntry.key}
                className={`exam-footer-dot-ellipsis exam-footer-dot-ellipsis-${dotDisplayMode}`}
                aria-hidden="true"
            >
                …
            </span>
        );
    }

    const question = viewModel.visibleQuestions[questionDotEntry.questionIndex];

    return (
        <QuestionDot
            key={questionDotEntry.key}
            questionNumber={questionDotEntry.questionIndex + 1}
            isActive={questionDotEntry.questionIndex === viewModel.currentQuestionIndex}
            submitted={viewModel.submitted}
            isCorrect={viewModel.submitted && question ? viewModel.isAnswerCorrect(question) : false}
            onClick={() => viewModel.goToQuestion(questionDotEntry.questionIndex)}
            t={t}
            dotDisplayMode={dotDisplayMode}
        />
    );
}
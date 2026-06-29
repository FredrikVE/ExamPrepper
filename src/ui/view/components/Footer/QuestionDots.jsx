// src/ui/view/components/Footer/QuestionDots.jsx
import QuestionDot from "./QuestionDot.jsx";
import { getQuestionDotsClassName } from "./Utils/footerClassNames.js";

export default function QuestionDots({
    questionDotEntries,
    filledCompactQuestionDotEntries,
    minimalCompactQuestionDotEntries,
    shouldUseCompactDots,
    shouldUseResponsiveCompactDots,
    submitted,
    onGoToQuestion,
    labels
}) {
    const questionDotsClassName = getQuestionDotsClassName(shouldUseCompactDots, shouldUseResponsiveCompactDots);

    return (
        <div className={questionDotsClassName} role="navigation" aria-label={labels.footerQuestionNavigationLabel}>
            <div className="exam-footer-dot-list exam-footer-dot-list-normal">
                {questionDotEntries.map((questionDotEntry) => (
                    <QuestionDot
                        key={questionDotEntry.key}
                        questionNumber={questionDotEntry.questionNumber}
                        isActive={questionDotEntry.isActive}
                        submitted={submitted}
                        isCorrect={questionDotEntry.isCorrect}
                        onClick={() => onGoToQuestion(questionDotEntry.questionIndex)}
                        t={labels}
                    />
                ))}
            </div>

            <div className="exam-footer-dot-list exam-footer-dot-list-filled-compact">
                {filledCompactQuestionDotEntries.map((questionDotEntry) =>
                    renderCompactQuestionDotEntry({
                        questionDotEntry,
                        submitted,
                        onGoToQuestion,
                        labels,
                        dotDisplayMode: "filled-compact"
                    })
                )}
            </div>

            <div className="exam-footer-dot-list exam-footer-dot-list-compact">
                {minimalCompactQuestionDotEntries.map((questionDotEntry) =>
                    renderCompactQuestionDotEntry({
                        questionDotEntry,
                        submitted,
                        onGoToQuestion,
                        labels,
                        dotDisplayMode: "compact"
                    })
                )}
            </div>
        </div>
    );
}

const renderCompactQuestionDotEntry = ({
    questionDotEntry,
    submitted,
    onGoToQuestion,
    labels,
    dotDisplayMode
}) => {
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

    return (
        <QuestionDot
            key={questionDotEntry.key}
            questionNumber={questionDotEntry.questionNumber}
            isActive={questionDotEntry.isActive}
            submitted={submitted}
            isCorrect={questionDotEntry.isCorrect}
            onClick={() => onGoToQuestion(questionDotEntry.questionIndex)}
            t={labels}
            dotDisplayMode={dotDisplayMode}
        />
    );
};

// src/ui/view/components/ProgressPager/ProgressDots.jsx
import ProgressDot from "./ProgressDot.jsx";
import { getProgressDotsClassName } from "./Utils/progressPagerClassNames.js";

export default function ProgressDots({
    questionDotEntries,
    filledCompactQuestionDotEntries,
    minimalCompactQuestionDotEntries,
    shouldUseCompactDots,
    shouldUseResponsiveCompactDots,
    submitted,
    onGoToQuestion,
    labels
}) {
    const progressDotsClassName = getProgressDotsClassName(shouldUseCompactDots, shouldUseResponsiveCompactDots);

    return (
        <div className={progressDotsClassName} role="navigation" aria-label={labels.footerQuestionNavigationLabel}>
            <div className="progress-pager-dot-list progress-pager-dot-list-normal">
                {questionDotEntries.map((questionDotEntry) => (
                    <ProgressDot
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

            <div className="progress-pager-dot-list progress-pager-dot-list-filled-compact">
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

            <div className="progress-pager-dot-list progress-pager-dot-list-compact">
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
                className={`progress-pager-dot-ellipsis progress-pager-dot-ellipsis-${dotDisplayMode}`}
                aria-hidden="true"
            >
                …
            </span>
        );
    }

    return (
        <ProgressDot
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

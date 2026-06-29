// src/ui/view/components/ProgressPager/ProgressDots.jsx
import ProgressDot from "./ProgressDot.jsx";
import { getProgressDotsClassName } from "./Utils/progressPagerClassNames.js";

export default function ProgressDots({
    entries,
    compactEntries,
    minimalCompactEntries,
    shouldUseCompactDots,
    shouldUseResponsiveCompactDots,
    submitted,
    onSelectEntry,
    dotsLabel,
    goToEntryLabel
}) {
    const progressDotsClassName = getProgressDotsClassName(shouldUseCompactDots, shouldUseResponsiveCompactDots);

    return (
        <div className={progressDotsClassName} role="navigation" aria-label={dotsLabel}>
            <div className="progress-pager-dot-list progress-pager-dot-list-normal">
                {entries.map((entry) => (
                    <ProgressDot
                        key={entry.key}
                        entryNumber={entry.questionNumber}
                        isActive={entry.isActive}
                        submitted={submitted}
                        isCorrect={entry.isCorrect}
                        onClick={() => onSelectEntry(entry.questionIndex)}
                        goToEntryLabel={goToEntryLabel}
                    />
                ))}
            </div>

            <div className="progress-pager-dot-list progress-pager-dot-list-filled-compact">
                {compactEntries.map((entry) =>
                    renderCompactProgressEntry({
                        entry,
                        submitted,
                        onSelectEntry,
                        goToEntryLabel,
                        dotDisplayMode: "filled-compact"
                    })
                )}
            </div>

            <div className="progress-pager-dot-list progress-pager-dot-list-compact">
                {minimalCompactEntries.map((entry) =>
                    renderCompactProgressEntry({
                        entry,
                        submitted,
                        onSelectEntry,
                        goToEntryLabel,
                        dotDisplayMode: "compact"
                    })
                )}
            </div>
        </div>
    );
}

const renderCompactProgressEntry = ({
    entry,
    submitted,
    onSelectEntry,
    goToEntryLabel,
    dotDisplayMode
}) => {
    if (entry.type === "ellipsis") {
        return (
            <span
                key={entry.key}
                className={`progress-pager-dot-ellipsis progress-pager-dot-ellipsis-${dotDisplayMode}`}
                aria-hidden="true"
            >
                …
            </span>
        );
    }

    return (
        <ProgressDot
            key={entry.key}
            entryNumber={entry.questionNumber}
            isActive={entry.isActive}
            submitted={submitted}
            isCorrect={entry.isCorrect}
            onClick={() => onSelectEntry(entry.questionIndex)}
            goToEntryLabel={goToEntryLabel}
            dotDisplayMode={dotDisplayMode}
        />
    );
};

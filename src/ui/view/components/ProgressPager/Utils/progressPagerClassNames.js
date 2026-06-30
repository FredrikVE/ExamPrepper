// src/ui/view/components/ProgressPager/Utils/progressPagerClassNames.js
export function getProgressDotClassName(isActive, submitted, isCorrect, dotDisplayMode) {
    const progressDotClassNames = ["progress-pager-dot"];

    if (dotDisplayMode === "filled-compact") {
        progressDotClassNames.push("progress-pager-dot-filled-compact");
    }

    if (dotDisplayMode === "compact") {
        progressDotClassNames.push("progress-pager-dot-compact");
    }

    if (isActive) {
        progressDotClassNames.push("progress-pager-dot-active");
    }

    if (submitted) {
        progressDotClassNames.push(isCorrect ? "progress-pager-dot-correct" : "progress-pager-dot-wrong");
    }

    return progressDotClassNames.join(" ");
}

export function getProgressDotsClassName(shouldUseCompactDots, shouldUseResponsiveCompactDots) {
    const progressDotsClassNames = ["progress-pager-dots"];

    if (shouldUseCompactDots) {
        progressDotsClassNames.push("progress-pager-dots-compact-by-count");
    }

    if (shouldUseResponsiveCompactDots) {
        progressDotsClassNames.push("progress-pager-dots-responsive-compact");
    }

    return progressDotsClassNames.join(" ");
}

// src/ui/view/components/ExamPage/ExamFooter.jsx
import { ChevronLeft } from "lucide-react";
import { useLanguage } from "../../../../i18n/LanguageContext.jsx";
import ProgressPager from "../ProgressPager/ProgressPager.jsx";
import PagerButton from "../ProgressPager/PagerButton.jsx";
import ProgressDots from "../ProgressPager/ProgressDots.jsx";
import ExamFooterActionButton from "./ExamFooterActionButton.jsx";

export default function ExamFooter({
    previousQuestion,
    canGoPrevious,
    questionDotEntries,
    filledCompactQuestionDotEntries,
    minimalCompactQuestionDotEntries,
    shouldUseCompactDots,
    shouldUseResponsiveCompactDots,
    submitted,
    questionProgressLabel,
    onGoToQuestion,
    showSubmitButton,
    onSubmit,
    onNext,
    isNextDisabled
}) {
    const { t } = useLanguage();

    return (
        <ProgressPager
            previousButton={(
                <PagerButton
                    onClick={previousQuestion}
                    disabled={!canGoPrevious}
                    variant="previous"
                    icon={<ChevronLeft className="progress-pager-icon" />}
                >
                    {t.footerPrevious}
                </PagerButton>
            )}
            counter={(
                <>
                    <ProgressDots
                        questionDotEntries={questionDotEntries}
                        filledCompactQuestionDotEntries={filledCompactQuestionDotEntries}
                        minimalCompactQuestionDotEntries={minimalCompactQuestionDotEntries}
                        shouldUseCompactDots={shouldUseCompactDots}
                        shouldUseResponsiveCompactDots={shouldUseResponsiveCompactDots}
                        submitted={submitted}
                        onGoToQuestion={onGoToQuestion}
                        labels={t}
                    />
                    <span className="progress-pager-counter-label">
                        {questionProgressLabel}
                    </span>
                </>
            )}
            actionButton={(
                <ExamFooterActionButton
                    showSubmitButton={showSubmitButton}
                    submitLabel={t.footerSubmit}
                    nextLabel={t.footerNext}
                    onSubmit={onSubmit}
                    onNext={onNext}
                    isNextDisabled={isNextDisabled}
                />
            )}
        />
    );
}

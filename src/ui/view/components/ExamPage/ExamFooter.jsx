// src/ui/view/components/ExamPage/ExamFooter.jsx
import { useLanguage } from "../../../../i18n/LanguageContext.jsx";
import ProgressPager from "../ProgressPager/ProgressPager.jsx";
import ExamFooterSubmitButton from "./ExamFooterSubmitButton.jsx";

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
    const submitButton = showSubmitButton ? (
        <ExamFooterSubmitButton
            submitLabel={t.footerSubmit}
            onSubmit={onSubmit}
        />
    ) : null;

    return (
        <ProgressPager
            className="exam-progress-pager"
            containerClassName="exam-progress-pager-container"
            ariaLabel={t.footerQuestionNavigationLabel}
            previousLabel={t.footerPrevious}
            previousDisabled={!canGoPrevious}
            previousButtonClassName="exam-progress-pager-button"
            onPrevious={previousQuestion}
            entries={questionDotEntries}
            compactEntries={filledCompactQuestionDotEntries}
            minimalCompactEntries={minimalCompactQuestionDotEntries}
            shouldUseCompactDots={shouldUseCompactDots}
            shouldUseResponsiveCompactDots={shouldUseResponsiveCompactDots}
            submitted={submitted}
            onSelectEntry={onGoToQuestion}
            dotsLabel={t.footerQuestionNavigationLabel}
            goToEntryLabel={t.footerGoToQuestion}
            counterLabel={questionProgressLabel}
            counterClassName=""
            counterLabelClassName="progress-pager-counter-label"
            nextLabel={t.footerNext}
            nextDisabled={isNextDisabled}
            nextButtonClassName="exam-progress-pager-button"
            onNext={onNext}
            hasActionButton={showSubmitButton}
            actionButton={submitButton}
        />
    );
}

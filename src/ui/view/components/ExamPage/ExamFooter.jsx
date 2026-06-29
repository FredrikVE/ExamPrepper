// src/ui/view/components/ExamPage/ExamFooter.jsx
import { ChevronLeft } from "lucide-react";
import { useLanguage } from "../../../../i18n/LanguageContext.jsx";
import Footer from "../Footer/Footer.jsx";
import FooterNavigationButton from "../Footer/FooterNavigationButton.jsx";
import QuestionDots from "../Footer/QuestionDots.jsx";
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
        <Footer
            previousButton={(
                <FooterNavigationButton
                    onClick={previousQuestion}
                    disabled={!canGoPrevious}
                    variant="previous"
                    icon={<ChevronLeft className="exam-footer-icon" />}
                >
                    {t.footerPrevious}
                </FooterNavigationButton>
            )}
            counter={(
                <>
                    <QuestionDots
                        questionDotEntries={questionDotEntries}
                        filledCompactQuestionDotEntries={filledCompactQuestionDotEntries}
                        minimalCompactQuestionDotEntries={minimalCompactQuestionDotEntries}
                        shouldUseCompactDots={shouldUseCompactDots}
                        shouldUseResponsiveCompactDots={shouldUseResponsiveCompactDots}
                        submitted={submitted}
                        onGoToQuestion={onGoToQuestion}
                        labels={t}
                    />
                    <span className="exam-footer-counter-label">
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

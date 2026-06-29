// src/ui/view/components/ExamPage/ExamFooterActionButton.jsx
import { ChevronRight, Send } from "lucide-react";
import PagerButton from "../ProgressPager/PagerButton.jsx";

export default function ExamFooterActionButton({
    showSubmitButton,
    submitLabel,
    nextLabel,
    onSubmit,
    onNext,
    isNextDisabled
}) {
    if (showSubmitButton) {
        return (
            <>
                <button
                    type="button"
                    onClick={onSubmit}
                    className="progress-pager-button exam-footer-submit-button exam-footer-submit-button-desktop"
                >
                    {submitLabel}
                    <Send className="exam-footer-submit-icon" />
                </button>

                <button
                    type="button"
                    onClick={onSubmit}
                    className="progress-pager-button exam-footer-submit-button exam-footer-submit-button-mobile"
                >
                    {submitLabel}
                    <Send className="exam-footer-submit-icon" />
                </button>
            </>
        );
    }

    return (
        <PagerButton
            onClick={onNext}
            disabled={isNextDisabled}
            variant="next"
            icon={<ChevronRight className="progress-pager-icon" />}
            className="exam-progress-pager-button"
        >
            {nextLabel}
        </PagerButton>
    );
}

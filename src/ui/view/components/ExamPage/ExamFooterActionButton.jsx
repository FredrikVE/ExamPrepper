// src/ui/view/components/ExamPage/ExamFooterActionButton.jsx
import { ChevronRight, Send } from "lucide-react";
import FooterNavigationButton from "../Footer/FooterNavigationButton.jsx";

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
                <FooterNavigationButton
                    onClick={onSubmit}
                    disabled={false}
                    variant="submit"
                    icon={<Send className="exam-footer-icon" />}
                    className="exam-footer-button-desktop-submit"
                >
                    {submitLabel}
                </FooterNavigationButton>

                <FooterNavigationButton
                    onClick={onSubmit}
                    disabled={false}
                    variant="submit"
                    icon={<Send className="exam-footer-icon" />}
                    className="exam-footer-button-mobile-next"
                >
                    {submitLabel}
                </FooterNavigationButton>
            </>
        );
    }

    return (
        <FooterNavigationButton
            onClick={onNext}
            disabled={isNextDisabled}
            variant="next"
            icon={<ChevronRight className="exam-footer-icon" />}
        >
            {nextLabel}
        </FooterNavigationButton>
    );
}

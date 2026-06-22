// src/ui/view/components/Footer/FooterActionButton.jsx
import { ChevronRight, Send } from "lucide-react";
import FooterNavigationButton from "./FooterNavigationButton.jsx";

export default function FooterActionButton({ viewModel, t }) {
    if (viewModel.showSubmitButton) {
        return (
            <>
                <FooterNavigationButton
                    onClick={viewModel.openSubmitConfirmation}
                    disabled={false}
                    variant="submit"
                    icon={<Send className="exam-footer-icon" />}
                    className="exam-footer-button-desktop-submit"
                >
                    {t.footerSubmit}
                </FooterNavigationButton>

                <FooterNavigationButton
                    onClick={viewModel.nextQuestion}
                    disabled={true}
                    variant="next"
                    icon={<ChevronRight className="exam-footer-icon" />}
                    className="exam-footer-button-mobile-next"
                >
                    {t.footerNext}
                </FooterNavigationButton>
            </>
        );
    }

    return (
        <FooterNavigationButton
            onClick={viewModel.nextQuestion}
            disabled={viewModel.isLastQuestion}
            variant="next"
            icon={<ChevronRight className="exam-footer-icon" />}
        >
            {t.footerNext}
        </FooterNavigationButton>
    );
}
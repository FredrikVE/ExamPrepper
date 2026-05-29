// src/ui/view/components/Footer/FooterActionButton.jsx
import { ChevronRight, Send } from "lucide-react";
import FooterNavigationButton from "./FooterNavigationButton.jsx";

export default function FooterActionButton({ viewModel, t }) {
    const isLastQuestion = !viewModel.canGoNext;
    const showSubmitButton = isLastQuestion && !viewModel.submitted;

    if (showSubmitButton) {
        return (
            <FooterNavigationButton
                onClick={viewModel.submitExam}
                disabled={false}
                variant="submit"
                icon={<Send className="exam-footer-icon" />}
            >
                {t.footerSubmit}
            </FooterNavigationButton>
        );
    }

    return (
        <FooterNavigationButton
            onClick={viewModel.nextQuestion}
            disabled={!viewModel.canGoNext}
            variant="next"
            icon={<ChevronRight className="exam-footer-icon" />}
        >
            {t.footerNext}
        </FooterNavigationButton>
    );
}
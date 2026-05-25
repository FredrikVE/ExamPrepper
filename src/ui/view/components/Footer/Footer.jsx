// src/ui/view/components/Footer/Footer.jsx
import { ChevronLeft, ChevronRight, Send } from "lucide-react";
import FooterNavigationButton from "./FooterNavigationButton.jsx";
import QuestionDots from "./QuestionDots.jsx";
import { useLanguage } from "../../../../i18n/LanguageContext.jsx";

export default function ExamFooter({ viewModel }) {
    const { t } = useLanguage();
    const isLastQuestion = !viewModel.canGoNext;
    const showSubmitButton = isLastQuestion && !viewModel.submitted;

    return (
        <footer className="exam-footer">
            <div className="exam-footer-container">
                <FooterNavigationButton
                    onClick={viewModel.previousQuestion}
                    disabled={!viewModel.canGoPrevious}
                    variant="previous"
                    icon={<ChevronLeft className="exam-footer-icon" />}
                >
                    {t.footerPrevious}
                </FooterNavigationButton>

                <div className="exam-footer-counter">
                    <QuestionDots viewModel={viewModel} t={t} />
                    <span className="exam-footer-counter-label">
                        {viewModel.questionProgressLabel}
                    </span>
                </div>

                {showSubmitButton ? (
                    <FooterNavigationButton
                        onClick={viewModel.submitExam}
                        disabled={false}
                        variant="submit"
                        icon={<Send className="exam-footer-icon" />}
                    >
                        {t.footerSubmit}
                    </FooterNavigationButton>
                ) : (
                    <FooterNavigationButton
                        onClick={viewModel.nextQuestion}
                        disabled={!viewModel.canGoNext}
                        variant="next"
                        icon={<ChevronRight className="exam-footer-icon" />}
                    >
                        {t.footerNext}
                    </FooterNavigationButton>
                )}
            </div>
        </footer>
    );
}
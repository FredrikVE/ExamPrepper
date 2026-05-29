// src/ui/view/components/Footer/Footer.jsx
import FooterNavigationButton from "./FooterNavigationButton.jsx";
import FooterActionButton from "./FooterActionButton.jsx";
import QuestionDots from "./QuestionDots.jsx";
import { ChevronLeft } from "lucide-react";
import { useLanguage } from "../../../../i18n/LanguageContext.jsx";

export default function ExamFooter({ viewModel }) {
    const { t } = useLanguage();

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

                <FooterActionButton viewModel={viewModel} t={t} />
            </div>
        </footer>
    );
}
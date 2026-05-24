//src/ui/view/components/Footer/Footer.jsx
import { ChevronLeft, ChevronRight } from "lucide-react";
import FooterNavigationButton from "./FooterNavigationButton.jsx";
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

                <FooterNavigationButton
                    onClick={viewModel.nextQuestion}
                    disabled={!viewModel.canGoNext}
                    variant="next"
                    icon={<ChevronRight className="exam-footer-icon" />}
                >
                    {t.footerNext}
                </FooterNavigationButton>
            </div>
        </footer>
    );
}

function QuestionDots({ viewModel, t }) {
    return (
        <div className="exam-footer-dots" role="navigation" aria-label={t.footerQuestionNavigationLabel}>
            {viewModel.visibleQuestions.map((question, index) => {
                const questionNumber = index + 1;
                const isActive = index === viewModel.currentQuestionIndex;

                return (
                    <button
                        key={question.id}
                        type="button"
                        onClick={() => viewModel.goToQuestion(index)}
                        className={`exam-footer-dot ${isActive ? "exam-footer-dot-active" : ""}`}
                        aria-current={isActive ? "step" : undefined}
                        aria-label={t.footerGoToQuestion(questionNumber)}
                        title={t.footerGoToQuestion(questionNumber)}
                        data-question-number={questionNumber}
                    />
                );
            })}
        </div>
    );
}

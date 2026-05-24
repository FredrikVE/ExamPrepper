//src/ui/view/components/ExamPage/FeedbackPanel.jsx
import { BookOpen, CheckCircle2, XCircle } from "lucide-react";
import getAnswerLabel from "../../../../utils/answerutils/getAnswerLabel.js";
import { useLanguage } from "../../../../i18n/LanguageContext.jsx";

export default function FeedbackPanel({ question, selected, correct }) {
    const { t } = useLanguage();

    return (
        <div className="feedback-panel">
            <div
                className={`feedback-panel-summary ${
                    correct
                        ? "feedback-panel-summary-correct"
                        : "feedback-panel-summary-wrong"
                }`}
            >
                <div className="feedback-panel-summary-title">
                    {correct ? (
                        <CheckCircle2 className="feedback-panel-summary-icon" />
                    ) : (
                        <XCircle className="feedback-panel-summary-icon" />
                    )}

                    {correct ? t.feedbackCorrectLabel : t.feedbackWrongLabel}
                </div>

                <p className="feedback-panel-answer">
                    <span className="feedback-panel-answer-label">{t.feedbackAnswerLabel}</span>{" "}
                    {getAnswerLabel(question)}
                </p>
            </div>

            {question.type === "fill" ? (
                <FillFeedback question={question} correct={correct} t={t} />
            ) : (
                <OptionFeedback question={question} selected={selected} t={t} />
            )}

            <div className="feedback-panel-source">
                <div className="feedback-panel-source-title">
                    <BookOpen className="feedback-panel-source-icon" />
                    {t.feedbackSourceTitle}
                </div>

                <p className="feedback-panel-source-text">
                    {question.source}
                </p>
            </div>
        </div>
    );
}

function FillFeedback({ question, correct, t }) {
    return (
        <div className="feedback-panel-box">
            <div className="feedback-panel-box-title">
                {t.feedbackWhyCorrectTitle}
            </div>

            <p>{question.whyCorrect}</p>

            {!correct && (
                <>
                    <div className="feedback-panel-box-title-spaced">
                        {t.feedbackWhyWrongTitle}
                    </div>

                    <p>{question.whyWrong}</p>
                </>
            )}
        </div>
    );
}

function OptionFeedback({ question, selected, t }) {
    return (
        <div className="feedback-panel-box">
            <div className="feedback-panel-options-title">
                {t.feedbackOptionsTitle}
            </div>

            <div className="feedback-panel-options-list">
                {question.options.map((option, index) => {
                    const wasSelected =
                        question.type === "single"
                            ? selected === index
                            : Array.isArray(selected) && selected.includes(index);

                    return (
                        <div key={index} className="feedback-panel-option">
                            <div className="feedback-panel-option-header">
                                <span>{String.fromCharCode(65 + index)}.</span>

                                <span
                                    className={
                                        option.correct
                                            ? "feedback-panel-option-correct"
                                            : "feedback-panel-option-wrong"
                                    }
                                >
                                    {option.correct
                                        ? t.feedbackOptionCorrect
                                        : t.feedbackOptionWrong}
                                </span>

                                {wasSelected && (
                                    <span className="feedback-panel-option-selected">
                                        {t.feedbackOptionSelected}
                                    </span>
                                )}
                            </div>

                            <p className="feedback-panel-option-text">
                                {option.why}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

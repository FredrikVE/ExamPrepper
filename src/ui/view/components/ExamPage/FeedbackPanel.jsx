//src/ui/view/components/ExamPage/FeedbackPanel.jsx
import { BookOpen, CheckCircle2, XCircle } from "lucide-react";
import getAnswerLabel from "../../../../utils/answerutils/getAnswerLabel.js";

export default function FeedbackPanel({ question, selected, correct }) {
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

                    Din besvarelse er {correct ? "riktig" : "feil"}
                </div>

                <p className="feedback-panel-answer">
                    <span className="feedback-panel-answer-label">Fasit:</span>{" "}
                    {getAnswerLabel(question)}
                </p>
            </div>

            {question.type === "fill" ? (
                <FillFeedback question={question} correct={correct} />
            ) : (
                <OptionFeedback question={question} selected={selected} />
            )}

            <div className="feedback-panel-source">
                <div className="feedback-panel-source-title">
                    <BookOpen className="feedback-panel-source-icon" />
                    Henvisning til fasit/pensum
                </div>

                <p className="feedback-panel-source-text">
                    {question.source}
                </p>
            </div>
        </div>
    );
}

function FillFeedback({ question, correct }) {
    return (
        <div className="feedback-panel-box">
            <div className="feedback-panel-box-title">
                Hvorfor er fasit riktig?
            </div>

            <p>{question.whyCorrect}</p>

            {!correct && (
                <>
                    <div className="feedback-panel-box-title-spaced">
                        Hvorfor ble ditt svar vurdert som galt?
                    </div>

                    <p>{question.whyWrong}</p>
                </>
            )}
        </div>
    );
}

function OptionFeedback({ question, selected }) {
    return (
        <div className="feedback-panel-box">
            <div className="feedback-panel-options-title">
                Hvorfor er alternativene riktige/gale?
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
                                        ? "Riktig alternativ"
                                        : "Galt alternativ"}
                                </span>

                                {wasSelected && (
                                    <span className="feedback-panel-option-selected">
                                        du valgte denne
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
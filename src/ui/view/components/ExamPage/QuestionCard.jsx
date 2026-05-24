//src/ui/view/components/ExamPage/QuestionCard.jsx
import { AlertTriangle, Edit3, Info } from "lucide-react";
import ResultBadge from "./ResultBadge.jsx";
import FeedbackPanel from "./FeedbackPanel.jsx";
import { useLanguage } from "../../../../i18n/LanguageContext.jsx";

const FILL_MAX_LENGTH = 80;

export default function QuestionCard({ question, answer, submitted, showAllFeedback, correct, onSingleAnswer, onToggleMultiAnswer }) {
    const { t } = useLanguage();
    const answerText = String(answer || "");
    const hasInlineFillBlank = question.type === "fill" && /_{3,}/.test(question.prompt);

    return (
        <section className="question-card">
            <div className="question-card-header">
                <div className="question-card-heading">
                    <div className="question-card-meta">
                        <span className="question-card-number">{question.id}</span>
                        <span>{t.questionMeta(question.id, question.points, getQuestionTypeLabel(question.type, t))}</span>
                    </div>

                    <div className="question-card-title-row">
                        <h3 className="question-card-title">
                            {question.title}
                        </h3>
                    </div>
                </div>

                {submitted ? (
                    <ResultBadge correct={correct} />
                ) : null}
            </div>

            <div className="question-card-body">
                <div className="question-card-divider" />

                {hasInlineFillBlank ? (
                    <div className="question-card-inline-answer-block">
                        <p className="question-card-prompt question-card-prompt-inline">
                            <PromptWithInlineAnswer
                                question={question}
                                answerText={answerText}
                                submitted={submitted}
                                onSingleAnswer={onSingleAnswer}
                                t={t}
                            />
                        </p>

                        <div className="question-card-input-meta question-card-inline-input-meta">
                            <span className="question-card-input-rule">
                                <Info />
                                {t.questionInputRule}
                            </span>

                            <span className="question-card-character-count">
                                {t.questionCharacterCount(answerText.length, FILL_MAX_LENGTH)}
                            </span>
                        </div>
                    </div>
                ) : (
                    <p className="question-card-prompt">
                        {question.prompt}
                    </p>
                )}

                {question.type === "fill" && !hasInlineFillBlank && (
                    <div className="question-card-answer-block">
                        <label className="question-card-answer-label" htmlFor={`question-${question.id}-answer`}>
                            {t.questionAnswerLabel}
                        </label>

                        <div className="question-card-input-wrap">
                            <input
                                id={`question-${question.id}-answer`}
                                disabled={submitted}
                                value={answerText}
                                maxLength={FILL_MAX_LENGTH}
                                onChange={(event) =>
                                    onSingleAnswer(question.id, event.target.value)
                                }
                                placeholder={t.questionInputPlaceholder}
                                className="question-card-input"
                            />
                            <span className="question-card-input-icon" aria-hidden="true">
                                <Edit3 />
                            </span>
                        </div>

                        <div className="question-card-input-meta">
                            <span className="question-card-input-rule">
                                <Info />
                                {t.questionInputRule}
                            </span>

                            <span className="question-card-character-count">
                                {t.questionCharacterCount(answerText.length, FILL_MAX_LENGTH)}
                            </span>
                        </div>

                    </div>
                )}

                {question.type === "single" && (
                    <OptionList
                        question={question}
                        answer={answer}
                        submitted={submitted}
                        onSingleAnswer={onSingleAnswer}
                    />
                )}

                {question.type === "multi" && (
                    <OptionList
                        question={question}
                        answer={answer}
                        submitted={submitted}
                        onToggleMultiAnswer={onToggleMultiAnswer}
                    />
                )}

                {submitted && !showAllFeedback && !correct && (
                    <div className="question-card-warning">
                        <AlertTriangle className="question-card-warning-icon" />

                        <div>
                            <div className="question-card-warning-title">
                                {t.questionWrongTitle}
                            </div>

                            <p>
                                {t.questionWrongHint}
                            </p>
                        </div>
                    </div>
                )}

                {submitted && showAllFeedback && (
                    <FeedbackPanel
                        question={question}
                        selected={answer}
                        correct={correct}
                    />
                )}
            </div>
        </section>
    );
}


function PromptWithInlineAnswer({ question, answerText, submitted, onSingleAnswer, t }) {
    const parts = question.prompt.split(/(_{3,})/g);
    let renderedInput = false;

    return parts.map((part, index) => {
        if (/^_{3,}$/.test(part) && !renderedInput) {
            renderedInput = true;

            return (
                <input
                    key={`blank-${index}`}
                    id={`question-${question.id}-answer`}
                    aria-label={t.questionAnswerLabel}
                    disabled={submitted}
                    value={answerText}
                    maxLength={FILL_MAX_LENGTH}
                    onChange={(event) =>
                        onSingleAnswer(question.id, event.target.value)
                    }
                    placeholder={t.questionInputPlaceholder}
                    className="question-card-inline-input"
                />
            );
        }

        return <span key={`text-${index}`}>{part}</span>;
    });
}

function OptionList({ question, answer, submitted, onSingleAnswer, onToggleMultiAnswer }) {
    return (
        <div className="question-card-option-list">
            {question.options.map((option, index) => {
                const isSelected =
                    question.type === "single"
                        ? answer === index
                        : Array.isArray(answer) && answer.includes(index);

                const showRight = submitted && option.correct;
                const showWrongSelection = submitted && isSelected && !option.correct;

                return (
                    <label
                        key={index}
                        className={`question-card-option ${getOptionClassName({
                            showRight,
                            showWrongSelection,
                            isSelected
                        })}`}
                    >
                        <input
                            type={question.type === "single" ? "radio" : "checkbox"}
                            disabled={submitted}
                            checked={isSelected}
                            onChange={() =>
                                question.type === "single"
                                    ? onSingleAnswer(question.id, index)
                                    : onToggleMultiAnswer(question.id, index)
                            }
                            className="question-card-option-input"
                        />

                        <span>
                            <span className="question-card-option-letter">
                                {String.fromCharCode(65 + index)}.
                            </span>{" "}
                            {option.text}
                        </span>
                    </label>
                );
            })}
        </div>
    );
}

function getQuestionTypeLabel(type, t) {
    if (type === "fill") return t.questionTypeFill;
    if (type === "multi") return t.questionTypeMulti;
    return t.questionTypeSingle;
}

function getOptionClassName({ showRight, showWrongSelection, isSelected }) {
    if (showRight) return "question-card-option-correct";
    if (showWrongSelection) return "question-card-option-wrong";
    if (isSelected) return "question-card-option-selected";
    return "question-card-option-default";
}

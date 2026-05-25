//src/ui/view/components/ExamPage/QuestionCard.jsx
import { useEffect, useState } from "react";
import { AlertTriangle, BookOpen, CheckCircle2, ChevronDown, Edit3, Info, XCircle } from "lucide-react";
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

                {submitted ? <ResultBadge correct={correct} /> : null}
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
                    <FillAnswerInput
                        question={question}
                        answerText={answerText}
                        submitted={submitted}
                        onSingleAnswer={onSingleAnswer}
                        t={t}
                    />
                )}

                {question.type !== "fill" && (
                    <OptionList
                        question={question}
                        answer={answer}
                        submitted={submitted}
                        showAllFeedback={showAllFeedback}
                        onSingleAnswer={onSingleAnswer}
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

                            <p>{t.questionWrongHint}</p>
                        </div>
                    </div>
                )}

                {submitted && showAllFeedback && question.type === "fill" && (
                    <FeedbackPanel
                        question={question}
                        selected={answer}
                        correct={correct}
                    />
                )}

                {submitted && showAllFeedback && question.type !== "fill" && question.source && (
                    <div className="feedback-panel question-card-source-panel">
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
                )}
            </div>
        </section>
    );
}

function FillAnswerInput({ question, answerText, submitted, onSingleAnswer, t }) {
    return (
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
                    onChange={(event) => onSingleAnswer(question.id, event.target.value)}
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
                    onChange={(event) => onSingleAnswer(question.id, event.target.value)}
                    placeholder={t.questionInputPlaceholder}
                    className="question-card-inline-input"
                />
            );
        }

        return <span key={`text-${index}`}>{part}</span>;
    });
}

function OptionList({ question, answer, submitted, showAllFeedback, onSingleAnswer, onToggleMultiAnswer }) {
    const { t } = useLanguage();
    const [expandedOptions, setExpandedOptions] = useState({});
    const feedbackMode = submitted && showAllFeedback;

    useEffect(() => {
        setExpandedOptions({});
    }, [question.id]);

    const toggleExpanded = (index) => {
        setExpandedOptions((previous) => ({
            ...previous,
            [index]: !previous[index]
        }));
    };

    return (
        <div className={`question-card-option-list ${feedbackMode ? "question-card-answer-card-list" : ""}`}>
            {question.options.map((option, index) => {
                const isSelected = isOptionSelected(question.type, answer, index);

                if (feedbackMode) {
                    return (
                        <AnswerOptionCard
                            key={index}
                            question={question}
                            option={option}
                            index={index}
                            isSelected={isSelected}
                            isExpanded={Boolean(expandedOptions[index])}
                            onToggleExpanded={() => toggleExpanded(index)}
                            t={t}
                        />
                    );
                }

                return (
                    <SelectableOption
                        key={index}
                        question={question}
                        option={option}
                        index={index}
                        isSelected={isSelected}
                        submitted={submitted}
                        onSingleAnswer={onSingleAnswer}
                        onToggleMultiAnswer={onToggleMultiAnswer}
                    />
                );
            })}
        </div>
    );
}

function SelectableOption({ question, option, index, isSelected, submitted, onSingleAnswer, onToggleMultiAnswer }) {
    return (
        <label
            className={`question-card-option ${getSelectableOptionClassName({ isSelected })} ${submitted ? "question-card-option-disabled" : ""}`}
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

            <span className="question-card-option-choice-text">
                <span className="question-card-option-letter">
                    {String.fromCharCode(65 + index)}.
                </span>{" "}
                {option.text}
            </span>
        </label>
    );
}

function AnswerOptionCard({ question, option, index, isSelected, isExpanded, onToggleExpanded, t }) {
    const letter = String.fromCharCode(65 + index);
    const hasExtended = Array.isArray(option.whyExtended) && option.whyExtended.length > 0;
    const expandedId = `question-${question.id}-option-${index}-extended`;
    const statusText = option.correct ? t.resultCorrect : t.resultWrong;
    const StatusIcon = option.correct ? CheckCircle2 : XCircle;

    return (
        <article
            className={`question-card-answer-card ${getAnswerCardClassName({ correct: option.correct, isSelected })}`}
        >
            <div className="question-card-answer-card-left" aria-hidden="true">
                <span className="question-card-answer-letter">{letter}.</span>
                <StatusIcon className="question-card-answer-state-icon" />
            </div>

            <div className="question-card-answer-card-main">
                <div className="question-card-answer-card-header">
                    <div className="question-card-answer-card-copy">
                        <h4 className="question-card-answer-card-title">
                            {option.text}
                        </h4>
                        <p className="question-card-answer-card-reason">
                            {option.why}
                        </p>
                    </div>

                    <div className="question-card-answer-card-actions">
                        <span
                            className={`question-card-answer-badge ${
                                option.correct
                                    ? "question-card-answer-badge-correct"
                                    : "question-card-answer-badge-wrong"
                            }`}
                        >
                            <StatusIcon />
                            {statusText}
                        </span>

                        {hasExtended ? (
                            <button
                                type="button"
                                className="question-card-answer-expand-button"
                                aria-expanded={isExpanded}
                                aria-controls={expandedId}
                                onClick={onToggleExpanded}
                            >
                                {t.feedbackExtendedLabel}
                                <ChevronDown
                                    className={`question-card-answer-expand-icon ${
                                        isExpanded ? "question-card-answer-expand-icon-open" : ""
                                    }`}
                                />
                            </button>
                        ) : null}
                    </div>
                </div>

                {isSelected ? (
                    <div className="question-card-answer-selected-pill">
                        {t.feedbackOptionSelected}
                    </div>
                ) : null}

                {hasExtended && isExpanded ? (
                    <div id={expandedId} className="question-card-answer-extended">
                        <ul className="question-card-answer-extended-list">
                            {option.whyExtended.map((point, pointIndex) => (
                                <li key={pointIndex}>{point}</li>
                            ))}
                        </ul>
                    </div>
                ) : null}
            </div>
        </article>
    );
}

function isOptionSelected(type, answer, index) {
    if (type === "single") return answer === index;
    return Array.isArray(answer) && answer.includes(index);
}

function getQuestionTypeLabel(type, t) {
    if (type === "fill") return t.questionTypeFill;
    if (type === "multi") return t.questionTypeMulti;
    return t.questionTypeSingle;
}

function getSelectableOptionClassName({ isSelected }) {
    return isSelected ? "question-card-option-selected" : "question-card-option-default";
}

function getAnswerCardClassName({ correct, isSelected }) {
    const statusClassName = correct
        ? "question-card-answer-card-correct"
        : "question-card-answer-card-wrong";

    return `${statusClassName} ${isSelected ? "question-card-answer-card-selected" : ""}`;
}

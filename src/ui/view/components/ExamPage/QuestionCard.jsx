//src/ui/view/components/ExamPage/QuestionCard.jsx
import { AlertTriangle } from "lucide-react";
import ResultBadge from "./ResultBadge.jsx";
import FeedbackPanel from "./FeedbackPanel.jsx";

export default function QuestionCard({ question, answer, submitted, showAllFeedback, correct, onSingleAnswer, onToggleMultiAnswer }) {
    return (
        <section className="question-card">
            <div className="question-card-header">
                <div>
                    <div className="question-card-meta">
                        Oppgave {question.id} · {question.points}p ·{" "}
                        {getQuestionTypeLabel(question.type)}
                    </div>

                    <h3 className="question-card-title">
                        {question.title}
                    </h3>
                </div>

                {submitted && <ResultBadge correct={correct} />}
            </div>

            <div className="question-card-body">
                <p className="question-card-prompt">
                    {question.prompt}
                </p>

                {question.type === "fill" && (
                    <input
                        disabled={submitted}
                        value={answer || ""}
                        onChange={(event) =>
                            onSingleAnswer(question.id, event.target.value)
                        }
                        placeholder="Skriv begrep her"
                        className="question-card-input"
                    />
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
                                Feil svar
                            </div>

                            <p>
                                Trykk «Vis fasit» øverst for forklaring og
                                pensumhenvisning.
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

function OptionList({
    question,
    answer,
    submitted,
    onSingleAnswer,
    onToggleMultiAnswer
}) {
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

function getQuestionTypeLabel(type) {
    if (type === "fill") return "Fyll inn";
    if (type === "multi") return "Flervalg";
    return "Ett riktig svar";
}

function getOptionClassName({ showRight, showWrongSelection, isSelected }) {
    if (showRight) return "question-card-option-correct";
    if (showWrongSelection) return "question-card-option-wrong";
    if (isSelected) return "question-card-option-selected";
    return "question-card-option-default";
}
// src/ui/view/components/ExamPage/QuestionCard/DragDrop/DragDropQuestion.jsx
import { CheckCircle2, ChevronDown, GripVertical, Info, RotateCcw, X, XCircle } from "lucide-react";
import { useMemo, useState } from "react";

export default function DragDropQuestion({ question, answer, submitted, showAllFeedback, onSingleAnswer, t }) {
    const safeAnswer = isPlainObject(answer) ? answer : {};
    const feedbackMode = submitted && showAllFeedback;
    const [selectedCardId, setSelectedCardId] = useState(null);
    const [dragOverTargetId, setDragOverTargetId] = useState(null);
    const [expandedTargetId, setExpandedTargetId] = useState(null);

    const cardsById = useMemo(() => createCardsById(question.cards), [question.cards]);
    const stats = useMemo(() => getDragDropStats(question, safeAnswer), [question, safeAnswer]);

    const assignCard = (targetId, cardId) => {
        if (submitted || !targetId || !cardId) return;

        const nextAnswer = clearCardFromOtherTargets({
            answer: safeAnswer,
            targetId,
            cardId
        });

        nextAnswer[targetId] = cardId;
        onSingleAnswer(question.id, nextAnswer);
    };

    const clearTarget = (targetId) => {
        if (submitted) return;

        const nextAnswer = { ...safeAnswer };
        delete nextAnswer[targetId];
        onSingleAnswer(question.id, nextAnswer);
    };

    const handleCardSelect = (cardId) => {
        if (submitted) return;

        setSelectedCardId((currentCardId) => currentCardId === cardId ? null : cardId);
    };

    const handleTargetClick = (targetId) => {
        if (!selectedCardId || submitted) return;

        assignCard(targetId, selectedCardId);
        setSelectedCardId(null);
    };

    const handleCardDragStart = (event, cardId) => {
        if (submitted) return;

        event.dataTransfer.setData("text/plain", cardId);
        event.dataTransfer.effectAllowed = "move";
    };

    const handleTargetDragOver = (event, targetId) => {
        if (submitted) return;

        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
        setDragOverTargetId(targetId);
    };

    const handleTargetDrop = (event, targetId) => {
        if (submitted) return;

        event.preventDefault();
        const cardId = event.dataTransfer.getData("text/plain");
        assignCard(targetId, cardId);
        setDragOverTargetId(null);
        setSelectedCardId(null);
    };

    const handleSelectChange = (targetId, value) => {
        if (!value) {
            clearTarget(targetId);
            return;
        }

        assignCard(targetId, value);
    };

    const toggleExpanded = (targetId) => {
        setExpandedTargetId((currentTargetId) => currentTargetId === targetId ? null : targetId);
    };

    return (
        <div className={feedbackMode ? "drag-drop-question drag-drop-question-feedback" : "drag-drop-question"}>
            {feedbackMode ? (
                <DragDropSummary stats={stats} t={t} />
            ) : null}

            <div className="drag-drop-layout">
                {!feedbackMode ? (
                    <CardBank
                        cards={question.cards}
                        selectedCardId={selectedCardId}
                        onCardSelect={handleCardSelect}
                        onCardDragStart={handleCardDragStart}
                        t={t}
                    />
                ) : null}

                <div className="drag-drop-table-wrap">
                    <table className="drag-drop-table">
                        <thead>
                            <tr>
                                <th className="drag-drop-number-col">#</th>
                                <th>{t.dragDropDescriptionHeader}</th>
                                <th>{t.dragDropAnswerHeader}</th>
                            </tr>
                        </thead>

                        <tbody>
                            {question.targets.map((target, index) => {
                                const selectedCardIdForTarget = safeAnswer[target.id];
                                const selectedCard = cardsById[selectedCardIdForTarget];
                                const targetIsCorrect = isTargetCorrect(target, selectedCardIdForTarget);
                                const targetIsAnswered = Boolean(selectedCardIdForTarget);
                                const isExpanded = expandedTargetId === target.id;

                                return (
                                    <tr key={target.id}>
                                        <td className="drag-drop-number-col">
                                            <span className="drag-drop-row-number">{index + 1}</span>
                                        </td>

                                        <td className="drag-drop-description-cell">
                                            {target.description}
                                        </td>

                                        <td className="drag-drop-answer-cell">
                                            {feedbackMode ? (
                                                <FeedbackTarget
                                                    target={target}
                                                    selectedCard={selectedCard}
                                                    targetIsAnswered={targetIsAnswered}
                                                    targetIsCorrect={targetIsCorrect}
                                                    isExpanded={isExpanded}
                                                    onToggleExpanded={() => toggleExpanded(target.id)}
                                                    t={t}
                                                />
                                            ) : (
                                                <DropTarget
                                                    target={target}
                                                    selectedCard={selectedCard}
                                                    selectedCardId={selectedCardIdForTarget}
                                                    isDragOver={dragOverTargetId === target.id}
                                                    onClick={() => handleTargetClick(target.id)}
                                                    onDragOver={(event) => handleTargetDragOver(event, target.id)}
                                                    onDragLeave={() => setDragOverTargetId(null)}
                                                    onDrop={(event) => handleTargetDrop(event, target.id)}
                                                    onClear={() => clearTarget(target.id)}
                                                    onSelectChange={(value) => handleSelectChange(target.id, value)}
                                                    cards={question.cards}
                                                    t={t}
                                                />
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function CardBank({ cards, selectedCardId, onCardSelect, onCardDragStart, t }) {
    return (
        <aside className="drag-drop-card-bank" aria-label={t.dragDropCardBankTitle}>
            <div className="drag-drop-card-bank-title-row">
                <h4 className="drag-drop-card-bank-title">{t.dragDropCardBankTitle}</h4>
                <Info className="drag-drop-card-bank-icon" aria-hidden="true" />
            </div>

            <div className="drag-drop-card-list">
                {cards.map((card) => {
                    const selected = selectedCardId === card.id;

                    return (
                        <button
                            key={card.id}
                            type="button"
                            className={selected ? "drag-drop-card drag-drop-card-selected" : "drag-drop-card"}
                            draggable
                            onClick={() => onCardSelect(card.id)}
                            onDragStart={(event) => onCardDragStart(event, card.id)}
                        >
                            <GripVertical className="drag-drop-card-grip" aria-hidden="true" />
                            <span>{card.text}</span>
                        </button>
                    );
                })}
            </div>

            <p className="drag-drop-card-bank-hint">
                {t.dragDropCardBankHint}
            </p>
        </aside>
    );
}

function DropTarget({ target, selectedCard, selectedCardId, isDragOver, onClick, onDragOver, onDragLeave, onDrop, onClear, onSelectChange, cards, t }) {
    const className = [
        "drag-drop-target",
        selectedCard ? "drag-drop-target-filled" : "drag-drop-target-empty",
        isDragOver ? "drag-drop-target-over" : ""
    ].filter(Boolean).join(" ");

    return (
        <div
            className={className}
            role="button"
            tabIndex={0}
            onClick={onClick}
            onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onClick();
                }
            }}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            aria-label={`${t.dragDropDropHere}: ${target.description}`}
        >
            {selectedCard ? (
                <div className="drag-drop-selected-pill">
                    <span>{selectedCard.text}</span>

                    <button
                        type="button"
                        className="drag-drop-clear-button"
                        onClick={(event) => {
                            event.stopPropagation();
                            onClear();
                        }}
                        aria-label={t.dragDropClearAnswer}
                    >
                        <X aria-hidden="true" />
                    </button>
                </div>
            ) : (
                <span className="drag-drop-placeholder">{t.dragDropDropHere}</span>
            )}

            <label className="drag-drop-select-label">
                <span className="sr-only">{t.dragDropSelectAnswer}</span>
                <select
                    className="drag-drop-select"
                    value={selectedCardId ?? ""}
                    onClick={(event) => event.stopPropagation()}
                    onChange={(event) => onSelectChange(event.target.value)}
                >
                    <option value="">{t.dragDropSelectPlaceholder}</option>
                    {cards.map((card) => (
                        <option key={card.id} value={card.id}>{card.text}</option>
                    ))}
                </select>
                <ChevronDown className="drag-drop-select-icon" aria-hidden="true" />
            </label>
        </div>
    );
}

function FeedbackTarget({ target, selectedCard, targetIsAnswered, targetIsCorrect, isExpanded, onToggleExpanded, t }) {
    const status = getTargetStatus({ targetIsAnswered, targetIsCorrect, t });
    const StatusIcon = targetIsCorrect ? CheckCircle2 : XCircle;
    const reason = targetIsCorrect ? target.whyCorrect : target.whyWrong;
    const extendedPoints = Array.isArray(target.whyExtended) ? target.whyExtended : [];
    const hasExtended = extendedPoints.length > 0;

    const className = [
        "drag-drop-feedback-target",
        targetIsCorrect ? "drag-drop-feedback-target-correct" : "",
        targetIsAnswered && !targetIsCorrect ? "drag-drop-feedback-target-wrong" : "",
        !targetIsAnswered ? "drag-drop-feedback-target-unanswered" : ""
    ].filter(Boolean).join(" ");

    return (
        <article className={className}>
            <div className="drag-drop-feedback-target-main">
                <div>
                    <div className="drag-drop-feedback-answer-title">
                        {selectedCard?.text ?? t.dragDropUnanswered}
                    </div>

                    {reason ? (
                        <p className="drag-drop-feedback-reason">{reason}</p>
                    ) : null}

                    {!targetIsCorrect ? (
                        <p className="drag-drop-feedback-correct-answer">
                            {t.feedbackCorrectAnswerLabel}: <strong>{target.correctLabel ?? target.correctCardId}</strong>
                        </p>
                    ) : null}
                </div>

                <div className="drag-drop-feedback-actions">
                    <span className="drag-drop-feedback-status">
                        <StatusIcon aria-hidden="true" />
                        {status}
                    </span>

                    {hasExtended ? (
                        <button
                            type="button"
                            className="drag-drop-feedback-expand"
                            onClick={onToggleExpanded}
                        >
                            {isExpanded ? t.dragDropHideExplanation : t.dragDropShowExplanation}
                        </button>
                    ) : null}
                </div>
            </div>

            {hasExtended && isExpanded ? (
                <ul className="drag-drop-feedback-extended-list">
                    {extendedPoints.map((point, index) => (
                        <li key={index}>{point}</li>
                    ))}
                </ul>
            ) : null}
        </article>
    );
}

function DragDropSummary({ stats, t }) {
    const title = stats.wrong > 0 || stats.unanswered > 0
        ? t.dragDropPartlyCorrect
        : t.feedbackCorrectLabel;

    return (
        <div className="drag-drop-summary" aria-label={t.dragDropSummaryTitle}>
            <h4>{title}</h4>

            <div className="drag-drop-summary-metrics">
                <div className="drag-drop-summary-metric drag-drop-summary-metric-correct">
                    <strong>{stats.correct}</strong>
                    <span>{t.dragDropCorrectShort}</span>
                </div>

                <div className="drag-drop-summary-divider" />

                <div className="drag-drop-summary-metric drag-drop-summary-metric-wrong">
                    <strong>{stats.wrong}</strong>
                    <span>{t.dragDropWrongShort}</span>
                </div>

                <div className="drag-drop-summary-divider" />

                <div className="drag-drop-summary-metric">
                    <strong>{stats.unanswered}</strong>
                    <span>{t.dragDropUnansweredShort}</span>
                </div>
            </div>
        </div>
    );
}

export function getDragDropStats(question, answer) {
    const safeAnswer = isPlainObject(answer) ? answer : {};
    const targets = Array.isArray(question?.targets) ? question.targets : [];

    return targets.reduce((stats, target) => {
        const selectedCardId = safeAnswer[target.id];

        if (!selectedCardId) {
            return {
                ...stats,
                unanswered: stats.unanswered + 1
            };
        }

        if (isTargetCorrect(target, selectedCardId)) {
            return {
                ...stats,
                correct: stats.correct + 1
            };
        }

        return {
            ...stats,
            wrong: stats.wrong + 1
        };
    }, { correct: 0, wrong: 0, unanswered: 0 });
}

function createCardsById(cards = []) {
    return cards.reduce((lookup, card) => {
        lookup[card.id] = card;
        return lookup;
    }, {});
}

function clearCardFromOtherTargets({ answer, targetId, cardId }) {
    return Object.entries(answer).reduce((nextAnswer, [currentTargetId, currentCardId]) => {
        if (currentTargetId === targetId || currentCardId === cardId) {
            return nextAnswer;
        }

        nextAnswer[currentTargetId] = currentCardId;
        return nextAnswer;
    }, {});
}

function isTargetCorrect(target, selectedCardId) {
    return Boolean(selectedCardId && target.correctCardId === selectedCardId);
}

function getTargetStatus({ targetIsAnswered, targetIsCorrect, t }) {
    if (!targetIsAnswered) return t.dragDropUnanswered;
    return targetIsCorrect ? t.resultCorrect : t.resultWrong;
}

function isPlainObject(value) {
    return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

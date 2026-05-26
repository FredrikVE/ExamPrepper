//src/ui/view/components/ExamPage/QuestionCard/DragDrop/DragDropQuestion/useDragDropQuestion.js
import { useState } from "react";
import { clearCardFromOtherTargets, createCardsById, isPlainObject } from "../Logic/dragDropAnswerLogic.js";
import { getDragDropStats } from "../Logic/dragDropFeedbackStats.js";

export function useDragDropQuestion(params) {
    const safeAnswer = getSafeAnswer(params.answer);
    const feedbackMode = params.submitted && params.showAllFeedback;

    const [selectedCardId, setSelectedCardId] = useState(null);
    const [dragOverTargetId, setDragOverTargetId] = useState(null);
    const [expandedTargetId, setExpandedTargetId] = useState(null);

    const cardsById = createCardsById(params.question.cards);
    const availableCards = getAvailableCards(params.question.cards, safeAnswer);
    const stats = getDragDropStats(params.question, safeAnswer);

    let rootClassName = "drag-drop-question";

    if (feedbackMode) {
        rootClassName += " drag-drop-question-feedback";
    }

    const assignCard = (targetId, cardId) => {
        if (params.submitted) {
            return;
        }

        if (!targetId) {
            return;
        }

        if (!cardId) {
            return;
        }

        const nextAnswer = clearCardFromOtherTargets({
            answer: safeAnswer,
            targetId,
            cardId
        });

        nextAnswer[targetId] = cardId;

        params.onSingleAnswer(params.question.id, nextAnswer);
    };

    const clearTarget = (targetId) => {
        if (params.submitted) {
            return;
        }

        const nextAnswer = { ...safeAnswer };

        delete nextAnswer[targetId];

        params.onSingleAnswer(params.question.id, nextAnswer);
    };

    const handleCardSelect = (cardId) => {
        if (params.submitted) {
            return;
        }

        if (selectedCardId === cardId) {
            setSelectedCardId(null);
        } 
        
        else {
            setSelectedCardId(cardId);
        }
    };

    const handleTargetClick = (targetId) => {
        if (params.submitted) {
            return;
        }

        if (!selectedCardId) {
            return;
        }

        assignCard(targetId, selectedCardId);
        setSelectedCardId(null);
    };

    const handleCardDragStart = (event, cardId) => {
        if (params.submitted) {
            return;
        }

        event.dataTransfer.setData("text/plain", cardId);
        event.dataTransfer.effectAllowed = "move";
    };

    const handleTargetDragOver = (event, targetId) => {
        if (params.submitted) {
            return;
        }

        event.preventDefault();

        event.dataTransfer.dropEffect = "move";
        setDragOverTargetId(targetId);
    };

    const handleTargetDragLeave = () => {
        setDragOverTargetId(null);
    };

    const handleTargetDrop = (event, targetId) => {
        if (params.submitted) {
            return;
        }

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
        if (expandedTargetId === targetId) {
            setExpandedTargetId(null);
        } else {
            setExpandedTargetId(targetId);
        }
    };

    return {
        rootClassName,
        safeAnswer,
        feedbackMode,

        selectedCardId,
        dragOverTargetId,
        expandedTargetId,

        cardsById,
        availableCards,
        stats,

        assignCard,
        clearTarget,
        handleCardSelect,
        handleTargetClick,
        handleCardDragStart,
        handleTargetDragOver,
        handleTargetDragLeave,
        handleTargetDrop,
        handleSelectChange,
        toggleExpanded
    };
}

const getSafeAnswer = (answer) => {
    if (isPlainObject(answer)) {
        return answer;
    }

    return {};
};

const getAvailableCards = (cards, answer) => {
    const usedCardIds = new Set(Object.values(answer).filter(Boolean));
    const availableCards = [];

    for (const card of cards) {
        if (!usedCardIds.has(card.id)) {
            availableCards.push(card);
        }
    }

    return availableCards;
};
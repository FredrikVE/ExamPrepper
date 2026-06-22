// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/TableMatch/Question/useTableMatchQuestion.js
import { useState } from "react";
import orderItemsByIndexOrder from "../../Shared/Utils/orderItemsByIndexOrder.js";
import { clearCardFromOtherTargets, createCardsById, isPlainObject } from "../Utils/tableMatchAnswerLogic.js";
import { getTableMatchStats } from "../Utils/tableMatchFeedbackStats.js";

export function useTableMatchQuestion(params) {
    const safeAnswer = getSafeAnswer(params.answer);
    const feedbackMode = params.submitted && params.showAllFeedback;

    const [selectedCardId, setSelectedCardId] = useState(null);
    const [expandedTargetId, setExpandedTargetId] = useState(null);

    const cardsById = createCardsById(params.question.cards);
    const availableCards = orderItemsByIndexOrder(
        getAvailableCards(params.question.cards, safeAnswer),
        params.answerOptionOrder,
        params.question.cards
    );
    const stats = getTableMatchStats(params.question, safeAnswer);

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

    const handleDndDrop = ({ sourceId, targetId }) => {
        assignCard(targetId, sourceId);
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
        expandedTargetId,

        cardsById,
        availableCards,
        stats,

        assignCard,
        clearTarget,
        handleCardSelect,
        handleTargetClick,
        handleDndDrop,
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
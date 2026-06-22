// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/SequenceOrder/Question/useSequenceOrderQuestion.js
import { useState } from "react";
import { createSequenceItemsById, getCorrectSequenceOrder, getSequenceItems, normalizeSequenceOrderAnswer, placeSequenceItemAtIndex, removeSequenceItem } from "../Utils/sequenceOrderAnswerLogic.js";
import { getSequenceOrderStats } from "../Utils/sequenceOrderFeedbackStats.js";
import orderItemsByIndexOrder from "../../Shared/Utils/orderItemsByIndexOrder.js";

export function useSequenceOrderQuestion(params) {
    const safeAnswer = normalizeSequenceOrderAnswer(params.question, params.answer);
    const feedbackMode = params.submitted && params.showAllFeedback;

    const [selectedSequenceItemId, setSelectedSequenceItemId] = useState(null);
    const [expandedSlotIndex, setExpandedSlotIndex] = useState(null);
    const [questionExplanationExpanded, setQuestionExplanationExpanded] = useState(true);

    const sourceSequenceItems = getSequenceItems(params.question);
    const sequenceItems = orderItemsByIndexOrder(
        sourceSequenceItems,
        params.answerOptionOrder,
        sourceSequenceItems
    );
    const sequenceItemsById = createSequenceItemsById(sourceSequenceItems);
    const correctOrder = getCorrectSequenceOrder(params.question);
    const stats = getSequenceOrderStats(params.question, safeAnswer);

    let rootClassName = "sequence-order-question";

    if (feedbackMode) {
        rootClassName += " sequence-order-question-feedback";
    }

    if (safeAnswer.length >= 5) {
        rootClassName += " sequence-order-question-long-sequence";
    }

    const assignSequenceItem = (targetIndex, sequenceItemId) => {
        if (params.submitted || !sequenceItemId) {
            return;
        }

        params.onSingleAnswer(
            params.question.id,
            placeSequenceItemAtIndex(params.question, safeAnswer, sequenceItemId, targetIndex)
        );
    };

    const removeSequenceItemFromAnswer = (sequenceItemId) => {
        if (params.submitted || !sequenceItemId) {
            return;
        }

        params.onSingleAnswer(
            params.question.id,
            removeSequenceItem(params.question, safeAnswer, sequenceItemId)
        );
    };

    const selectSequenceItem = (sequenceItemId) => {
        if (params.submitted) {
            return;
        }

        if (selectedSequenceItemId === sequenceItemId) {
            setSelectedSequenceItemId(null);
        } else {
            setSelectedSequenceItemId(sequenceItemId);
        }
    };

    const clearSelectedSequenceItem = () => {
        setSelectedSequenceItemId(null);
    };

    const selectDropZone = (targetIndex) => {
        if (params.submitted || !selectedSequenceItemId) {
            return;
        }

        assignSequenceItem(targetIndex, selectedSequenceItemId);
        clearSelectedSequenceItem();
    };

    const toggleSlotExpanded = (index) => {
        if (expandedSlotIndex === index) {
            setExpandedSlotIndex(null);
        } else {
            setExpandedSlotIndex(index);
        }
    };

    const toggleQuestionExplanation = () => {
        setQuestionExplanationExpanded((wasExpanded) => !wasExpanded);
    };

    return {
        rootClassName,
        safeAnswer,
        feedbackMode,

        selectedSequenceItemId,
        expandedSlotIndex,
        questionExplanationExpanded,

        sequenceItems,
        sequenceItemsById,
        correctOrder,
        stats,

        assignSequenceItem,
        removeSequenceItemFromAnswer,
        selectSequenceItem,
        clearSelectedSequenceItem,
        selectDropZone,
        toggleSlotExpanded,
        toggleQuestionExplanation
    };
}

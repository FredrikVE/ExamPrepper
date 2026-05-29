// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/SequenceOrder/Question/useSequenceOrderQuestion.js
import { useState } from "react";
import { createSequenceItemsById, getAvailableSequenceItems, getCorrectSequenceOrder, getSequenceItems, normalizeSequenceOrderAnswer, placeSequenceItemAtIndex, removeSequenceItem } from "../Utils/sequenceOrderAnswerLogic.js";
import { getSequenceOrderStats } from "../Utils/sequenceOrderFeedbackStats.js";

export function useSequenceOrderQuestion(params) {
    const safeAnswer = normalizeSequenceOrderAnswer(params.question, params.answer);
    const feedbackMode = params.submitted && params.showAllFeedback;

    const [selectedSequenceItemId, setSelectedSequenceItemId] = useState(null);
    const [dragOverIndex, setDragOverIndex] = useState(null);
    const [expandedSlotIndex, setExpandedSlotIndex] = useState(null);
    const [questionExplanationExpanded, setQuestionExplanationExpanded] = useState(true);

    const sequenceItems = getSequenceItems(params.question);
    const sequenceItemsById = createSequenceItemsById(sequenceItems);
    const availableSequenceItems = getAvailableSequenceItems(params.question, safeAnswer);
    const correctOrder = getCorrectSequenceOrder(params.question);
    const stats = getSequenceOrderStats(params.question, safeAnswer);

    let rootClassName = "sequence-order-question";

    if (feedbackMode) {
        rootClassName += " sequence-order-question-feedback";
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

    const selectDropZone = (targetIndex) => {
        if (params.submitted || !selectedSequenceItemId) {
            return;
        }

        assignSequenceItem(targetIndex, selectedSequenceItemId);
        setSelectedSequenceItemId(null);
    };

    const startSequenceItemDrag = (event, sequenceItemId) => {
        if (params.submitted) {
            return;
        }

        event.dataTransfer.setData("text/plain", sequenceItemId);
        event.dataTransfer.effectAllowed = "move";
    };

    const markDropZoneOver = (event, targetIndex) => {
        if (params.submitted) {
            return;
        }

        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
        setDragOverIndex(targetIndex);
    };

    const clearDragOverIndex = () => {
        setDragOverIndex(null);
    };

    const dropSequenceItemInZone = (event, targetIndex) => {
        if (params.submitted) {
            return;
        }

        event.preventDefault();

        const sequenceItemId = event.dataTransfer.getData("text/plain");

        assignSequenceItem(targetIndex, sequenceItemId);
        setDragOverIndex(null);
        setSelectedSequenceItemId(null);
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
        dragOverIndex,
        expandedSlotIndex,
        questionExplanationExpanded,

        sequenceItemsById,
        availableSequenceItems,
        correctOrder,
        stats,

        assignSequenceItem,
        removeSequenceItemFromAnswer,
        selectSequenceItem,
        selectDropZone,
        startSequenceItemDrag,
        markDropZoneOver,
        clearDragOverIndex,
        dropSequenceItemInZone,
        toggleSlotExpanded,
        toggleQuestionExplanation
    };
}

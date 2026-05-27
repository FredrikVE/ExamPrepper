// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/MatrixPlacement/Question/useMatrixPlacementQuestion.js
import { useState } from "react";
import { createItemsById, getUnplacedItems, normalizeMatrixPlacementAnswer, placeItemInQuadrant, removeItemFromMatrix } from "../Utils/matrixPlacementAnswerLogic.js";
import { getMatrixPlacementStats } from "../Utils/matrixPlacementFeedbackStats.js";

export function useMatrixPlacementQuestion(params) {
    const safeAnswer = normalizeMatrixPlacementAnswer(params.question, params.answer);
    const feedbackMode = params.submitted && params.showAllFeedback;

    const [selectedItemId, setSelectedItemId] = useState(null);
    const [dragOverQuadrantId, setDragOverQuadrantId] = useState(null);
    const [expandedItemId, setExpandedItemId] = useState(null);

    const itemsById = createItemsById(params.question?.items);
    const availableItems = getUnplacedItems(params.question, safeAnswer);
    const stats = getMatrixPlacementStats(params.question, safeAnswer);

    let rootClassName = "matrix-placement-question";

    if (feedbackMode) {
        rootClassName += " matrix-placement-question-feedback";
    }

    const assignItem = (quadrantId, itemId) => {
        if (params.submitted || !quadrantId || !itemId) {
            return;
        }

        params.onSingleAnswer(
            params.question.id,
            placeItemInQuadrant(params.question, safeAnswer, itemId, quadrantId)
        );
    };

    const removeItem = (itemId) => {
        if (params.submitted || !itemId) {
            return;
        }

        params.onSingleAnswer(
            params.question.id,
            removeItemFromMatrix(params.question, safeAnswer, itemId)
        );
    };

    const handleItemSelect = (itemId) => {
        if (params.submitted) {
            return;
        }

        if (selectedItemId === itemId) {
            setSelectedItemId(null);
        } else {
            setSelectedItemId(itemId);
        }
    };

    const handleQuadrantClick = (quadrantId) => {
        if (params.submitted || !selectedItemId) {
            return;
        }

        assignItem(quadrantId, selectedItemId);
        setSelectedItemId(null);
    };

    const handleItemDragStart = (event, itemId) => {
        if (params.submitted) {
            return;
        }

        event.dataTransfer.setData("text/plain", itemId);
        event.dataTransfer.effectAllowed = "move";
    };

    const handleQuadrantDragOver = (event, quadrantId) => {
        if (params.submitted) {
            return;
        }

        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
        setDragOverQuadrantId(quadrantId);
    };

    const handleQuadrantDragLeave = () => {
        setDragOverQuadrantId(null);
    };

    const handleQuadrantDrop = (event, quadrantId) => {
        if (params.submitted) {
            return;
        }

        event.preventDefault();

        const itemId = event.dataTransfer.getData("text/plain");

        assignItem(quadrantId, itemId);
        setDragOverQuadrantId(null);
        setSelectedItemId(null);
    };

    const toggleExpanded = (itemId) => {
        if (expandedItemId === itemId) {
            setExpandedItemId(null);
        } else {
            setExpandedItemId(itemId);
        }
    };

    return {
        rootClassName,
        safeAnswer,
        feedbackMode,

        selectedItemId,
        dragOverQuadrantId,
        expandedItemId,

        itemsById,
        availableItems,
        stats,

        assignItem,
        removeItem,
        handleItemSelect,
        handleQuadrantClick,
        handleItemDragStart,
        handleQuadrantDragOver,
        handleQuadrantDragLeave,
        handleQuadrantDrop,
        toggleExpanded
    };
}

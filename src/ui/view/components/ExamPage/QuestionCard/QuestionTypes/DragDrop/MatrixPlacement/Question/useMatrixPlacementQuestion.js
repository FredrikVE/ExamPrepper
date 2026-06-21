// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/MatrixPlacement/Question/useMatrixPlacementQuestion.js
import { useState } from "react";
import orderItemsByIndexOrder from "../../Shared/Utils/orderItemsByIndexOrder.js";
import { createItemsById, getPlacedItemIds, getUnplacedItems, normalizeMatrixPlacementAnswer, placeItemInQuadrant, removeItemFromMatrix } from "../Utils/matrixPlacementAnswerLogic.js";
import { getMatrixPlacementStats } from "../Utils/matrixPlacementFeedbackStats.js";

export function useMatrixPlacementQuestion(params) {
    const safeAnswer = normalizeMatrixPlacementAnswer(params.question, params.answer);
    const feedbackMode = params.submitted && params.showAllFeedback;

    const [selectedItemId, setSelectedItemId] = useState(null);
    const [expandedItemId, setExpandedItemId] = useState(null);

    const itemsById = createItemsById(params.question?.items);
    const placedItemIds = getPlacedItemIds(safeAnswer);
    const availableItems = orderItemsByIndexOrder(
        getUnplacedItems(params.question, safeAnswer),
        params.answerOptionOrder,
        params.question?.items
    );
    const itemBankItems = orderItemsByIndexOrder(
        params.question?.items ?? [],
        params.answerOptionOrder,
        params.question?.items
    ).map((item) => ({ item, placed: placedItemIds.has(item.id) }));
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

    const clearSelectedItem = () => {
        setSelectedItemId(null);
    };

    const handleQuadrantClick = (quadrantId) => {
        if (params.submitted || !selectedItemId) {
            return;
        }

        assignItem(quadrantId, selectedItemId);
        clearSelectedItem();
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
        expandedItemId,

        itemsById,
        availableItems,
        itemBankItems,
        stats,

        assignItem,
        removeItem,
        handleItemSelect,
        clearSelectedItem,
        handleQuadrantClick,
        toggleExpanded
    };
}

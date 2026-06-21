// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/CategorySort/Question/useCategorySortQuestion.js
import { useState } from "react";
import orderItemsByIndexOrder from "../../Shared/Utils/orderItemsByIndexOrder.js";
import { clearItemFromAllCategories, createItemsById, getSafeArray, getUnplacedItems, normalizeCategoryAnswer } from "../Utils/categorySortAnswerLogic.js";
import { getCategorySortStats } from "../Utils/categorySortFeedbackStats.js";

export function useCategorySortQuestion(params) {
    const safeAnswer = normalizeCategoryAnswer(params.question, params.answer);
    const feedbackMode = params.submitted && params.showAllFeedback;

    const [selectedItemId, setSelectedItemId] = useState(null);
    const [expandedItemId, setExpandedItemId] = useState(null);

    const itemsById = createItemsById(params.question?.items);
    const availableItems = orderItemsByIndexOrder(
        getUnplacedItems(params.question, safeAnswer),
        params.answerOptionOrder,
        params.question.items
    );
    const stats = getCategorySortStats(params.question, safeAnswer);

    let rootClassName = "drag-categorize-question";

    if (feedbackMode) {
        rootClassName += " drag-categorize-question-feedback";
    }

    const assignItem = (categoryId, itemId) => {
        if (params.submitted || !categoryId || !itemId) {
            return;
        }

        const nextAnswer = clearItemFromAllCategories(safeAnswer, itemId);
        const nextCategoryItems = getSafeArray(nextAnswer[categoryId]);

        nextAnswer[categoryId] = [...nextCategoryItems, itemId];

        params.onSingleAnswer(params.question.id, nextAnswer);
    };

    const removeItem = (itemId) => {
        if (params.submitted || !itemId) {
            return;
        }

        params.onSingleAnswer(
            params.question.id,
            clearItemFromAllCategories(safeAnswer, itemId)
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

    const handleCategoryClick = (categoryId) => {
        if (params.submitted || !selectedItemId) {
            return;
        }

        assignItem(categoryId, selectedItemId);
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
        stats,

        assignItem,
        removeItem,
        handleItemSelect,
        clearSelectedItem,
        handleCategoryClick,
        toggleExpanded
    };
}

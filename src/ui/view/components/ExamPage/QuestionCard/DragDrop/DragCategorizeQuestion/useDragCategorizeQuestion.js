//src/ui/view/components/ExamPage/QuestionCard/DragDrop/DragCategorizeQuestion/useDragCategorizeQuestion.js
import { useState } from "react";
import { clearItemFromAllCategories, createItemsById, getSafeArray, getUnplacedItems, normalizeCategoryAnswer } from "../CategoryLogic/dragCategorizeAnswerLogic.js";
import { getDragCategorizeStats } from "../CategoryLogic/dragCategorizeFeedbackStats.js";

export function useDragCategorizeQuestion(params) {
    const safeAnswer = normalizeCategoryAnswer(params.question, params.answer);
    const feedbackMode = params.submitted && params.showAllFeedback;

    const [selectedItemId, setSelectedItemId] = useState(null);
    const [dragOverCategoryId, setDragOverCategoryId] = useState(null);
    const [expandedItemId, setExpandedItemId] = useState(null);

    const itemsById = createItemsById(params.question?.items);
    const availableItems = getUnplacedItems(params.question, safeAnswer);
    const stats = getDragCategorizeStats(params.question, safeAnswer);

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

    const handleCategoryClick = (categoryId) => {
        if (params.submitted || !selectedItemId) {
            return;
        }

        assignItem(categoryId, selectedItemId);
        setSelectedItemId(null);
    };

    const handleItemDragStart = (event, itemId) => {
        if (params.submitted) {
            return;
        }

        event.dataTransfer.setData("text/plain", itemId);
        event.dataTransfer.effectAllowed = "move";
    };

    const handleCategoryDragOver = (event, categoryId) => {
        if (params.submitted) {
            return;
        }

        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
        setDragOverCategoryId(categoryId);
    };

    const handleCategoryDragLeave = () => {
        setDragOverCategoryId(null);
    };

    const handleCategoryDrop = (event, categoryId) => {
        if (params.submitted) {
            return;
        }

        event.preventDefault();

        const itemId = event.dataTransfer.getData("text/plain");

        assignItem(categoryId, itemId);
        setDragOverCategoryId(null);
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
        dragOverCategoryId,
        expandedItemId,

        itemsById,
        availableItems,
        stats,

        assignItem,
        removeItem,
        handleItemSelect,
        handleCategoryClick,
        handleItemDragStart,
        handleCategoryDragOver,
        handleCategoryDragLeave,
        handleCategoryDrop,
        toggleExpanded
    };
}

// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/CategorySort/Board/CategorySortCategoryGrid.jsx
import { getPlacedItemIds, getSafeArray, isPlainObject } from "../Utils/categorySortAnswerLogic.js";
import CategorySortCategoryColumn from "./CategorySortCategoryColumn.jsx";

export default function CategorySortCategoryGrid(props) {
    const categories = getSafeArray(props.question?.categories);
    const categoryCount = Math.max(categories.length, 1);
    const placedItemIds = getPlacedItemIds(props.safeAnswer);
    const correctAnswer = isPlainObject(props.question?.correctAnswer)
        ? props.question.correctAnswer
        : {};

    const className = getCategoryGridClassName(categoryCount);

    return (
        <div
            className={className}
            style={{ "--drag-categorize-category-count": String(categoryCount) }}
        >
            {categories.map((category) => (
                <CategorySortCategoryColumn
                    key={category.id}
                    question={props.question}
                    category={category}
                    itemIds={props.safeAnswer[category.id]}
                    unansweredSlotCount={getUnansweredSlotCount({
                        categoryId: category.id,
                        correctAnswer,
                        placedItemIds,
                        feedbackMode: props.feedbackMode
                    })}
                    itemsById={props.itemsById}
                    feedbackMode={props.feedbackMode}
                    isDragOver={props.dragOverCategoryId === category.id}
                    selectedItemId={props.selectedItemId}
                    expandedItemId={props.expandedItemId}
                    onCategoryClick={() => props.onCategoryClick(category.id)}
                    onCategoryDragOver={(event) => props.onCategoryDragOver(event, category.id)}
                    onCategoryDragLeave={props.onCategoryDragLeave}
                    onCategoryDrop={(event) => props.onCategoryDrop(event, category.id)}
                    onItemSelect={props.onItemSelect}
                    onItemDragStart={props.onItemDragStart}
                    onItemRemove={props.onItemRemove}
                    onToggleExpanded={props.onToggleExpanded}
                    t={props.t}
                />
            ))}
        </div>
    );
}

function getUnansweredSlotCount({ categoryId, correctAnswer, placedItemIds, feedbackMode }) {
    if (!feedbackMode) {
        return 0;
    }

    const expectedItemIds = getSafeArray(correctAnswer[categoryId]);

    return expectedItemIds.filter((itemId) => !placedItemIds.has(itemId)).length;
}


function getCategoryGridClassName(categoryCount) {
    let className = "drag-categorize-category-grid";

    if (categoryCount > 4) {
        className += " drag-categorize-category-grid-transposable";
    }

    return className;
}

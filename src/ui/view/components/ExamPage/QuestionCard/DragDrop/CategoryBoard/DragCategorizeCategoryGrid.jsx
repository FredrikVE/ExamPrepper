//src/ui/view/components/ExamPage/QuestionCard/DragDrop/CategoryBoard/DragCategorizeCategoryGrid.jsx
import { getPlacedItemIds, getSafeArray, isPlainObject } from "../CategoryLogic/dragCategorizeAnswerLogic.js";
import DragCategorizeCategoryColumn from "./DragCategorizeCategoryColumn.jsx";

export default function DragCategorizeCategoryGrid(props) {
    const categories = getSafeArray(props.question?.categories);
    const categoryCount = Math.max(categories.length, 1);
    const placedItemIds = getPlacedItemIds(props.safeAnswer);
    const correctAnswer = isPlainObject(props.question?.correctAnswer)
        ? props.question.correctAnswer
        : {};

    return (
        <div
            className="drag-categorize-category-grid"
            style={{ "--drag-categorize-category-count": String(categoryCount) }}
        >
            {categories.map((category) => (
                <DragCategorizeCategoryColumn
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

//src/ui/view/components/ExamPage/QuestionCard/DragDrop/CategoryBoard/DragCategorizeCategoryGrid.jsx
import { getSafeArray } from "../CategoryLogic/dragCategorizeAnswerLogic.js";
import DragCategorizeCategoryColumn from "./DragCategorizeCategoryColumn.jsx";

export default function DragCategorizeCategoryGrid(props) {
    const categories = getSafeArray(props.question?.categories);

    return (
        <div className="drag-categorize-category-grid">
            {categories.map((category) => (
                <DragCategorizeCategoryColumn
                    key={category.id}
                    question={props.question}
                    category={category}
                    itemIds={props.safeAnswer[category.id]}
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

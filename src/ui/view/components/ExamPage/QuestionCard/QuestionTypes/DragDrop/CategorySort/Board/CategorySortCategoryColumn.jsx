//src/ui/view/components/ExamPage/QuestionCard/DragDrop/CategoryBoard/CategorySortCategoryColumn.jsx
import { getSafeArray } from "../Logic/categorySortAnswerLogic.js";
import CategorySortDropZone from "./CategorySortDropZone.jsx";

export default function CategorySortCategoryColumn(props) {
    return (
        <section className="drag-categorize-category-column">
            <header className="drag-categorize-category-header">
                {props.category.label}
            </header>

            <CategorySortDropZone
                question={props.question}
                category={props.category}
                itemIds={getSafeArray(props.itemIds)}
                unansweredSlotCount={props.unansweredSlotCount}
                itemsById={props.itemsById}
                feedbackMode={props.feedbackMode}
                isDragOver={props.isDragOver}
                selectedItemId={props.selectedItemId}
                expandedItemId={props.expandedItemId}
                onClick={props.onCategoryClick}
                onDragOver={props.onCategoryDragOver}
                onDragLeave={props.onCategoryDragLeave}
                onDrop={props.onCategoryDrop}
                onItemSelect={props.onItemSelect}
                onItemDragStart={props.onItemDragStart}
                onItemRemove={props.onItemRemove}
                onToggleExpanded={props.onToggleExpanded}
                t={props.t}
            />
        </section>
    );
}

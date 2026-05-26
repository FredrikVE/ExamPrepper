//src/ui/view/components/ExamPage/QuestionCard/DragDrop/CategoryBoard/DragCategorizeCategoryColumn.jsx
import { getSafeArray } from "../CategoryLogic/dragCategorizeAnswerLogic.js";
import DragCategorizeDropZone from "./DragCategorizeDropZone.jsx";

export default function DragCategorizeCategoryColumn(props) {
    return (
        <section className="drag-categorize-category-column">
            <header className="drag-categorize-category-header">
                {props.category.label}
            </header>

            <DragCategorizeDropZone
                question={props.question}
                category={props.category}
                itemIds={getSafeArray(props.itemIds)}
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

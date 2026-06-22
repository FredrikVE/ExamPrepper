// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/CategorySort/Board/CategorySortCategoryColumn.jsx
import { getSafeArray } from "../Utils/categorySortAnswerLogic.js";
import CategorySortDropZone from "./CategorySortDropZone.jsx";
import FormattedText from "../../../../../../Shared/FormattedText.jsx";

export default function CategorySortCategoryColumn(props) {
    return (
        <section className="drag-categorize-category-column">
            <header className="drag-categorize-category-header">
                <FormattedText text={props.category.label} />
            </header>

            <CategorySortDropZone
                question={props.question}
                category={props.category}
                itemIds={getSafeArray(props.itemIds)}
                unansweredSlotCount={props.unansweredSlotCount}
                itemsById={props.itemsById}
                feedbackMode={props.feedbackMode}
                selectedItemId={props.selectedItemId}
                expandedItemId={props.expandedItemId}
                accept={props.accept}
                categoryDropTargetIdPrefix={props.categoryDropTargetIdPrefix}
                onClick={props.onCategoryClick}
                onItemSelect={props.onItemSelect}
                onItemRemove={props.onItemRemove}
                onToggleExpanded={props.onToggleExpanded}
                t={props.t}
            />
        </section>
    );
}

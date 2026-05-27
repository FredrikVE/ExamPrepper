//src/ui/view/components/ExamPage/QuestionCard/DragDrop/CategorySortQuestion/CategorySortQuestion.jsx
import CategorySortCategoryGrid from "../Board/CategorySortCategoryGrid.jsx";
import CategorySortItemBank from "../ItemBank/CategorySortItemBank.jsx";
import { useCategorySortQuestion } from "./useCategorySortQuestion.js";

export { getCategorySortStats } from "../Logic/categorySortFeedbackStats.js";

export default function CategorySortQuestion(props) {
    const categorySort = useCategorySortQuestion(props);

    return (
        <div className={categorySort.rootClassName}>
            <CategorySortItemBank
                question={props.question}
                items={categorySort.availableItems}
                feedbackMode={categorySort.feedbackMode}
                selectedItemId={categorySort.selectedItemId}
                expandedItemId={categorySort.expandedItemId}
                disabled={categorySort.feedbackMode}
                onItemSelect={categorySort.handleItemSelect}
                onItemDragStart={categorySort.handleItemDragStart}
                onToggleExpanded={categorySort.toggleExpanded}
                t={props.t}
            />

            <CategorySortCategoryGrid
                question={props.question}
                safeAnswer={categorySort.safeAnswer}
                itemsById={categorySort.itemsById}
                feedbackMode={categorySort.feedbackMode}
                selectedItemId={categorySort.selectedItemId}
                dragOverCategoryId={categorySort.dragOverCategoryId}
                expandedItemId={categorySort.expandedItemId}
                onCategoryClick={categorySort.handleCategoryClick}
                onCategoryDragOver={categorySort.handleCategoryDragOver}
                onCategoryDragLeave={categorySort.handleCategoryDragLeave}
                onCategoryDrop={categorySort.handleCategoryDrop}
                onItemSelect={categorySort.handleItemSelect}
                onItemDragStart={categorySort.handleItemDragStart}
                onItemRemove={categorySort.removeItem}
                onToggleExpanded={categorySort.toggleExpanded}
                t={props.t}
            />
        </div>
    );
}

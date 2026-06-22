// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/CategorySort/Question/CategorySortQuestion.jsx
import CategorySortCategoryGrid from "../Board/CategorySortCategoryGrid.jsx";
import CategorySortItemBank from "../ItemBank/CategorySortItemBank.jsx";
import { getItemLabel } from "../Utils/categorySortAnswerLogic.js";
import DndProvider from "../../Shared/Dnd/DndProvider.jsx";
import DragOverlay from "../../Shared/Dnd/DragOverlay.jsx";
import FormattedText from "../../../../../../Shared/FormattedText.jsx";
import { useCategorySortQuestion } from "./useCategorySortQuestion.js";
import DragGrip from "../../Shared/Dnd/DragGrip.jsx";

export { getCategorySortStats } from "../Utils/categorySortFeedbackStats.js";

const CATEGORY_SORT_ITEM_TYPE = "category-sort-item";
const CATEGORY_SORT_ITEM_BANK_DROP_TARGET_ID = "category-sort-item-bank";
const CATEGORY_SORT_CATEGORY_DROP_TARGET_ID_PREFIX = "category-sort-category-";

export default function CategorySortQuestion(props) {
    const categorySort = useCategorySortQuestion(props);

    return (
        <DndProvider onDndDrop={handleCategorySortDndDrop(categorySort)}>
            <div className={categorySort.rootClassName}>
                <CategorySortItemBank
                    question={props.question}
                    items={categorySort.availableItems}
                    itemBankItems={categorySort.itemBankItems}
                    feedbackMode={categorySort.feedbackMode}
                    selectedItemId={categorySort.selectedItemId}
                    expandedItemId={categorySort.expandedItemId}
                    disabled={categorySort.feedbackMode}
                    itemBankDropTargetId={CATEGORY_SORT_ITEM_BANK_DROP_TARGET_ID}
                    acceptedDragSourceType={CATEGORY_SORT_ITEM_TYPE}
                    onItemSelect={categorySort.handleItemSelect}
                    onToggleExpanded={categorySort.toggleExpanded}
                    t={props.t}
                />

                <CategorySortCategoryGrid
                    question={props.question}
                    safeAnswer={categorySort.safeAnswer}
                    itemsById={categorySort.itemsById}
                    feedbackMode={categorySort.feedbackMode}
                    selectedItemId={categorySort.selectedItemId}
                    expandedItemId={categorySort.expandedItemId}
                    acceptedDragSourceType={CATEGORY_SORT_ITEM_TYPE}
                    categoryDropTargetIdPrefix={CATEGORY_SORT_CATEGORY_DROP_TARGET_ID_PREFIX}
                    onCategoryClick={categorySort.handleCategoryClick}
                    onItemSelect={categorySort.handleItemSelect}
                    onItemRemove={categorySort.removeItem}
                    onToggleExpanded={categorySort.toggleExpanded}
                    t={props.t}
                />

                {!categorySort.feedbackMode ? (
                    <DragOverlay>
                        {({ dragSourceContext }) => {
                            if (!dragSourceContext?.item) {
                                return null;
                            }

                            return <CategorySortDragOverlayCard item={dragSourceContext.item} />;
                        }}
                    </DragOverlay>
                ) : null}
            </div>
        </DndProvider>
    );
}

function CategorySortDragOverlayCard(props) {
    return (
        <div className="drag-categorize-item-card drag-categorize-drag-overlay-card">
            <DragGrip className="drag-categorize-item-card-grip" />

            <span className="drag-categorize-item-card-text">
                <FormattedText text={getItemLabel(props.item)} />
            </span>
        </div>
    );
}

const handleCategorySortDndDrop = (categorySort) => {
    return ({ dragSourceId, dropTargetId, dragSourceContext, dropTargetContext }) => {
        const itemId = dragSourceContext?.item?.id ?? dragSourceId;

        if (!itemId) {
            return;
        }

        if (dropTargetId === CATEGORY_SORT_ITEM_BANK_DROP_TARGET_ID) {
            if (dragSourceContext?.sourceCategoryId) {
                categorySort.removeItem(itemId);
            }

            categorySort.clearSelectedItem();
            return;
        }

        if (!dropTargetContext?.categoryId) {
            return;
        }

        categorySort.assignItem(dropTargetContext.categoryId, itemId);
        categorySort.clearSelectedItem();
    };
};

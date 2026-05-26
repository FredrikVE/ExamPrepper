//src/ui/view/components/ExamPage/QuestionCard/DragDrop/DragCategorizeQuestion/DragCategorizeQuestion.jsx
import DragDropScoreSummary from "../Feedback/DragDropScoreSummary.jsx";
import DragCategorizeCategoryGrid from "../CategoryBoard/DragCategorizeCategoryGrid.jsx";
import DragCategorizeItemBank from "../CategoryItemBank/DragCategorizeItemBank.jsx";
import { useDragCategorizeQuestion } from "./useDragCategorizeQuestion.js";

export { getDragCategorizeStats } from "../CategoryLogic/dragCategorizeFeedbackStats.js";

export default function DragCategorizeQuestion(props) {
    const dragCategorize = useDragCategorizeQuestion(props);

    return (
        <div className={dragCategorize.rootClassName}>
            {dragCategorize.feedbackMode ? (
                <DragDropScoreSummary stats={dragCategorize.stats} t={props.t} />
            ) : null}

            <DragCategorizeItemBank
                items={dragCategorize.availableItems}
                selectedItemId={dragCategorize.selectedItemId}
                disabled={dragCategorize.feedbackMode}
                onItemSelect={dragCategorize.handleItemSelect}
                onItemDragStart={dragCategorize.handleItemDragStart}
                t={props.t}
            />

            <DragCategorizeCategoryGrid
                question={props.question}
                safeAnswer={dragCategorize.safeAnswer}
                itemsById={dragCategorize.itemsById}
                feedbackMode={dragCategorize.feedbackMode}
                selectedItemId={dragCategorize.selectedItemId}
                dragOverCategoryId={dragCategorize.dragOverCategoryId}
                expandedItemId={dragCategorize.expandedItemId}
                onCategoryClick={dragCategorize.handleCategoryClick}
                onCategoryDragOver={dragCategorize.handleCategoryDragOver}
                onCategoryDragLeave={dragCategorize.handleCategoryDragLeave}
                onCategoryDrop={dragCategorize.handleCategoryDrop}
                onItemSelect={dragCategorize.handleItemSelect}
                onItemDragStart={dragCategorize.handleItemDragStart}
                onItemRemove={dragCategorize.removeItem}
                onToggleExpanded={dragCategorize.toggleExpanded}
                t={props.t}
            />
        </div>
    );
}

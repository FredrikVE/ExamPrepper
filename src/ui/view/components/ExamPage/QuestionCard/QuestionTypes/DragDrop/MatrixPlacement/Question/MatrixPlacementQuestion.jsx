// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/MatrixPlacement/Question/MatrixPlacementQuestion.jsx
import MatrixPlacementGrid from "../Matrix/MatrixPlacementGrid.jsx";
import MatrixPlacementItemBank from "../ItemBank/MatrixPlacementItemBank.jsx";
import { useMatrixPlacementQuestion } from "./useMatrixPlacementQuestion.js";

export { getMatrixPlacementStats } from "../Utils/matrixPlacementFeedbackStats.js";

export default function MatrixPlacementQuestion(props) {
    const matrixPlacement = useMatrixPlacementQuestion(props);

    return (
        <div className={matrixPlacement.rootClassName}>
            <div className={getLayoutClassName(matrixPlacement.feedbackMode, matrixPlacement.availableItems.length)}>
                <MatrixPlacementItemBank
                    question={props.question}
                    items={matrixPlacement.availableItems}
                    safeAnswer={matrixPlacement.safeAnswer}
                    feedbackMode={matrixPlacement.feedbackMode}
                    selectedItemId={matrixPlacement.selectedItemId}
                    expandedItemId={matrixPlacement.expandedItemId}
                    disabled={matrixPlacement.feedbackMode}
                    onItemSelect={matrixPlacement.handleItemSelect}
                    onItemDragStart={matrixPlacement.handleItemDragStart}
                    onToggleExpanded={matrixPlacement.toggleExpanded}
                    t={props.t}
                />

                <MatrixPlacementGrid
                    question={props.question}
                    safeAnswer={matrixPlacement.safeAnswer}
                    itemsById={matrixPlacement.itemsById}
                    feedbackMode={matrixPlacement.feedbackMode}
                    selectedItemId={matrixPlacement.selectedItemId}
                    dragOverQuadrantId={matrixPlacement.dragOverQuadrantId}
                    expandedItemId={matrixPlacement.expandedItemId}
                    onQuadrantClick={matrixPlacement.handleQuadrantClick}
                    onQuadrantDragOver={matrixPlacement.handleQuadrantDragOver}
                    onQuadrantDragLeave={matrixPlacement.handleQuadrantDragLeave}
                    onQuadrantDrop={matrixPlacement.handleQuadrantDrop}
                    onItemSelect={matrixPlacement.handleItemSelect}
                    onItemDragStart={matrixPlacement.handleItemDragStart}
                    onItemRemove={matrixPlacement.removeItem}
                    onToggleExpanded={matrixPlacement.toggleExpanded}
                    t={props.t}
                />
            </div>
        </div>
    );
}

function getLayoutClassName(feedbackMode, availableItemCount) {
    let className = "matrix-placement-layout";

    if (feedbackMode && availableItemCount === 0) {
        className += " matrix-placement-layout-no-bank";
    }

    return className;
}

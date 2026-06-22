// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/MatrixPlacement/Question/MatrixPlacementQuestion.jsx
import MatrixPlacementGrid from "../Matrix/MatrixPlacementGrid.jsx";
import MatrixPlacementItemBank from "../ItemBank/MatrixPlacementItemBank.jsx";
import { getItemLabel } from "../Utils/matrixPlacementAnswerLogic.js";
import DndProvider from "../../Shared/Dnd/DndProvider.jsx";
import DragOverlay from "../../Shared/Dnd/DragOverlay.jsx";
import FormattedText from "../../../../../../Shared/FormattedText.jsx";
import { useMatrixPlacementQuestion } from "./useMatrixPlacementQuestion.js";
import DragGrip from "../../Shared/Dnd/DragGrip.jsx";

export { getMatrixPlacementStats } from "../Utils/matrixPlacementFeedbackStats.js";

const MATRIX_PLACEMENT_ITEM_TYPE = "matrix-placement-item";
const MATRIX_PLACEMENT_ITEM_BANK_DROP_TARGET_ID = "matrix-placement-item-bank";
const MATRIX_PLACEMENT_QUADRANT_DROP_TARGET_ID_PREFIX = "matrix-placement-quadrant-";

export default function MatrixPlacementQuestion(props) {
    const matrixPlacement = useMatrixPlacementQuestion(props);

    return (
        <DndProvider onDrop={handleMatrixPlacementDndDrop(matrixPlacement)}>
            <div className={matrixPlacement.rootClassName}>
                <div className={getLayoutClassName(matrixPlacement.feedbackMode, matrixPlacement.availableItems.length)}>
                    <MatrixPlacementItemBank
                        question={props.question}
                        items={matrixPlacement.availableItems}
                        itemBankItems={matrixPlacement.itemBankItems}
                        safeAnswer={matrixPlacement.safeAnswer}
                        feedbackMode={matrixPlacement.feedbackMode}
                        selectedItemId={matrixPlacement.selectedItemId}
                        expandedItemId={matrixPlacement.expandedItemId}
                        disabled={matrixPlacement.feedbackMode}
                        itemBankDropTargetId={MATRIX_PLACEMENT_ITEM_BANK_DROP_TARGET_ID}
                        accept={MATRIX_PLACEMENT_ITEM_TYPE}
                        onItemSelect={matrixPlacement.handleItemSelect}
                        onToggleExpanded={matrixPlacement.toggleExpanded}
                        t={props.t}
                    />

                    <MatrixPlacementGrid
                        question={props.question}
                        safeAnswer={matrixPlacement.safeAnswer}
                        itemsById={matrixPlacement.itemsById}
                        feedbackMode={matrixPlacement.feedbackMode}
                        selectedItemId={matrixPlacement.selectedItemId}
                        expandedItemId={matrixPlacement.expandedItemId}
                        accept={MATRIX_PLACEMENT_ITEM_TYPE}
                        quadrantDropTargetIdPrefix={MATRIX_PLACEMENT_QUADRANT_DROP_TARGET_ID_PREFIX}
                        onQuadrantClick={matrixPlacement.handleQuadrantClick}
                        onItemSelect={matrixPlacement.handleItemSelect}
                        onItemRemove={matrixPlacement.removeItem}
                        onToggleExpanded={matrixPlacement.toggleExpanded}
                        t={props.t}
                    />
                </div>

                {!matrixPlacement.feedbackMode ? (
                    <DragOverlay>
                        {({ sourceData }) => {
                            if (!sourceData?.item) {
                                return null;
                            }

                            return <MatrixPlacementDragOverlayCard item={sourceData.item} />;
                        }}
                    </DragOverlay>
                ) : null}
            </div>
        </DndProvider>
    );
}

function MatrixPlacementDragOverlayCard(props) {
    return (
        <div className="matrix-placement-item-card matrix-placement-drag-overlay-card">
            <DragGrip className="matrix-placement-item-card-grip" />

            <span><FormattedText text={getItemLabel(props.item)} /></span>
        </div>
    );
}

const handleMatrixPlacementDndDrop = (matrixPlacement) => {
    return ({ sourceId, targetId, sourceData, targetData }) => {
        const itemId = sourceData?.item?.id ?? sourceId;

        if (!itemId) {
            return;
        }

        if (targetId === MATRIX_PLACEMENT_ITEM_BANK_DROP_TARGET_ID) {
            if (sourceData?.sourceQuadrantId) {
                matrixPlacement.removeItem(itemId);
            }

            matrixPlacement.clearSelectedItem();
            return;
        }

        if (!targetData?.quadrantId) {
            return;
        }

        matrixPlacement.assignItem(targetData.quadrantId, itemId);
        matrixPlacement.clearSelectedItem();
    };
};

function getLayoutClassName(feedbackMode, availableItemCount) {
    let className = "matrix-placement-layout";

    if (feedbackMode && availableItemCount === 0) {
        className += " matrix-placement-layout-no-bank";
    }

    return className;
}

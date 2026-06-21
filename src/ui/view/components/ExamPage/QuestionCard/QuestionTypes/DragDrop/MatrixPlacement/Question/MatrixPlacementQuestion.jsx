// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/MatrixPlacement/Question/MatrixPlacementQuestion.jsx
import MatrixPlacementGrid from "../Matrix/MatrixPlacementGrid.jsx";
import MatrixPlacementItemBank from "../ItemBank/MatrixPlacementItemBank.jsx";
import { getItemLabel } from "../Utils/matrixPlacementAnswerLogic.js";
import MobileDndProvider from "../../Shared/MobileDnd/MobileDndProvider.jsx";
import MobileDragOverlay from "../../Shared/MobileDnd/MobileDragOverlay.jsx";
import FormattedText from "../../../../../../Shared/FormattedText.jsx";
import { useMatrixPlacementQuestion } from "./useMatrixPlacementQuestion.js";

export { getMatrixPlacementStats } from "../Utils/matrixPlacementFeedbackStats.js";

const MATRIX_PLACEMENT_ITEM_TYPE = "matrix-placement-item";
const MATRIX_PLACEMENT_ITEM_BANK_DROP_TARGET_ID = "matrix-placement-item-bank";
const MATRIX_PLACEMENT_QUADRANT_DROP_TARGET_ID_PREFIX = "matrix-placement-quadrant-";

export default function MatrixPlacementQuestion(props) {
    const matrixPlacement = useMatrixPlacementQuestion(props);

    return (
        <MobileDndProvider onMobileDndDrop={handleMatrixPlacementDndDrop(matrixPlacement)}>
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
                        acceptedDragSourceType={MATRIX_PLACEMENT_ITEM_TYPE}
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
                        acceptedDragSourceType={MATRIX_PLACEMENT_ITEM_TYPE}
                        quadrantDropTargetIdPrefix={MATRIX_PLACEMENT_QUADRANT_DROP_TARGET_ID_PREFIX}
                        onQuadrantClick={matrixPlacement.handleQuadrantClick}
                        onItemSelect={matrixPlacement.handleItemSelect}
                        onItemRemove={matrixPlacement.removeItem}
                        onToggleExpanded={matrixPlacement.toggleExpanded}
                        t={props.t}
                    />
                </div>

                {!matrixPlacement.feedbackMode ? (
                    <MobileDragOverlay>
                        {({ dragSourceContext }) => {
                            if (!dragSourceContext?.item) {
                                return null;
                            }

                            return <MatrixPlacementDragOverlayCard item={dragSourceContext.item} />;
                        }}
                    </MobileDragOverlay>
                ) : null}
            </div>
        </MobileDndProvider>
    );
}

function MatrixPlacementDragOverlayCard(props) {
    return (
        <div className="matrix-placement-item-card matrix-placement-drag-overlay-card">
            <MatrixPlacementDragOverlayGrip />

            <span><FormattedText text={getItemLabel(props.item)} /></span>
        </div>
    );
}

function MatrixPlacementDragOverlayGrip() {
    return (
        <span className="matrix-placement-item-card-grip" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
        </span>
    );
}

const handleMatrixPlacementDndDrop = (matrixPlacement) => {
    return ({ dragSourceId, dropTargetId, dragSourceContext, dropTargetContext }) => {
        const itemId = dragSourceContext?.item?.id ?? dragSourceId;

        if (!itemId) {
            return;
        }

        if (dropTargetId === MATRIX_PLACEMENT_ITEM_BANK_DROP_TARGET_ID) {
            if (dragSourceContext?.sourceQuadrantId) {
                matrixPlacement.removeItem(itemId);
            }

            matrixPlacement.clearSelectedItem();
            return;
        }

        if (!dropTargetContext?.quadrantId) {
            return;
        }

        matrixPlacement.assignItem(dropTargetContext.quadrantId, itemId);
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

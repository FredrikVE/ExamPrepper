// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/SequenceOrder/Question/SequenceOrderQuestion.jsx
import SequenceOrderBoard from "../Board/SequenceOrderBoard.jsx";
import SequenceOrderFeedbackPanel from "../Feedback/SequenceOrderFeedbackPanel.jsx";
import SequenceOrderItemBank from "../ItemBank/SequenceOrderItemBank.jsx";
import { getSequenceItemLabel } from "../Utils/sequenceOrderAnswerLogic.js";
import TableMatchScoreSummary from "../../TableMatch/Feedback/TableMatchScoreSummary.jsx";
import MobileDndProvider from "../../Shared/MobileDnd/MobileDndProvider.jsx";
import MobileDragOverlay from "../../Shared/MobileDnd/MobileDragOverlay.jsx";
import FormattedText from "../../../../../../Shared/FormattedText.jsx";
import { useSequenceOrderQuestion } from "./useSequenceOrderQuestion.js";

export { getSequenceOrderStats } from "../Utils/sequenceOrderFeedbackStats.js";

const SEQUENCE_ORDER_ITEM_TYPE = "sequence-order-item";
const SEQUENCE_ORDER_ITEM_BANK_DROP_TARGET_ID = "sequence-order-item-bank";
const SEQUENCE_ORDER_SLOT_DROP_TARGET_ID_PREFIX = "sequence-order-slot-";

export default function SequenceOrderQuestion(props) {
    const sequenceOrder = useSequenceOrderQuestion(props);

    return (
        <MobileDndProvider onMobileDndDrop={handleSequenceOrderDndDrop(sequenceOrder)}>
            <div className={sequenceOrder.rootClassName}>
                {sequenceOrder.feedbackMode ? (
                    <TableMatchScoreSummary stats={sequenceOrder.stats} t={props.t} />
                ) : null}

                {!sequenceOrder.feedbackMode ? (
                    <>
                        <SequenceOrderItemBank
                            sequenceItems={sequenceOrder.availableSequenceItems}
                            feedbackMode={sequenceOrder.feedbackMode}
                            selectedSequenceItemId={sequenceOrder.selectedSequenceItemId}
                            disabled={sequenceOrder.feedbackMode}
                            cardBankDropTargetId={SEQUENCE_ORDER_ITEM_BANK_DROP_TARGET_ID}
                            acceptedDragSourceType={SEQUENCE_ORDER_ITEM_TYPE}
                            onSequenceItemSelect={sequenceOrder.selectSequenceItem}
                            t={props.t}
                        />

                        <SequenceOrderBoard
                            safeAnswer={sequenceOrder.safeAnswer}
                            sequenceItemsById={sequenceOrder.sequenceItemsById}
                            feedbackMode={sequenceOrder.feedbackMode}
                            selectedSequenceItemId={sequenceOrder.selectedSequenceItemId}
                            acceptedDragSourceType={SEQUENCE_ORDER_ITEM_TYPE}
                            slotDropTargetIdPrefix={SEQUENCE_ORDER_SLOT_DROP_TARGET_ID_PREFIX}
                            onDropZoneClick={sequenceOrder.selectDropZone}
                            t={props.t}
                        />

                        <MobileDragOverlay>
                            {({ dragSourceContext }) => {
                                if (!dragSourceContext?.sequenceItem) {
                                    return null;
                                }

                                return <SequenceOrderDragOverlayCard sequenceItem={dragSourceContext.sequenceItem} />;
                            }}
                        </MobileDragOverlay>
                    </>
                ) : (
                    <SequenceOrderFeedbackPanel
                        question={props.question}
                        safeAnswer={sequenceOrder.safeAnswer}
                        correctOrder={sequenceOrder.correctOrder}
                        sequenceItemsById={sequenceOrder.sequenceItemsById}
                        expandedSlotIndex={sequenceOrder.expandedSlotIndex}
                        questionExplanationExpanded={sequenceOrder.questionExplanationExpanded}
                        onToggleSlotExpanded={sequenceOrder.toggleSlotExpanded}
                        onToggleQuestionExplanation={sequenceOrder.toggleQuestionExplanation}
                        t={props.t}
                    />
                )}
            </div>
        </MobileDndProvider>
    );
}

function SequenceOrderDragOverlayCard(props) {
    return (
        <div className="sequence-order-item-card sequence-order-drag-overlay-card">
            <span className="sequence-order-item-card-text">
                <FormattedText text={getSequenceItemLabel(props.sequenceItem)} />
            </span>

            <SequenceOrderDragOverlayGrip />
        </div>
    );
}

function SequenceOrderDragOverlayGrip() {
    return (
        <span className="sequence-order-item-card-grip" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
        </span>
    );
}

const handleSequenceOrderDndDrop = (sequenceOrder) => {
    return ({ dragSourceId, dropTargetId, dragSourceContext, dropTargetContext }) => {
        const sequenceItemId = dragSourceContext?.sequenceItem?.id ?? dragSourceId;

        if (!sequenceItemId) {
            return;
        }

        if (dropTargetId === SEQUENCE_ORDER_ITEM_BANK_DROP_TARGET_ID) {
            if (Number.isInteger(dragSourceContext?.sourceIndex)) {
                sequenceOrder.removeSequenceItemFromAnswer(sequenceItemId);
            }

            sequenceOrder.clearSelectedSequenceItem();
            return;
        }

        if (!Number.isInteger(dropTargetContext?.targetIndex)) {
            return;
        }

        sequenceOrder.assignSequenceItem(dropTargetContext.targetIndex, sequenceItemId);
        sequenceOrder.clearSelectedSequenceItem();
    };
};

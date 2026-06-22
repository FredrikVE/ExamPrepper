// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/SequenceOrder/Question/SequenceOrderQuestion.jsx
import SequenceOrderBoard from "../Board/SequenceOrderBoard.jsx";
import SequenceOrderFeedbackPanel from "../Feedback/SequenceOrderFeedbackPanel.jsx";
import SequenceOrderItemBank from "../ItemBank/SequenceOrderItemBank.jsx";
import { getSequenceItemLabel } from "../Utils/sequenceOrderAnswerLogic.js";
import TableMatchScoreSummary from "../../TableMatch/Feedback/TableMatchScoreSummary.jsx";
import DndProvider from "../../Shared/Dnd/DndProvider.jsx";
import DragOverlay from "../../Shared/Dnd/DragOverlay.jsx";
import FormattedText from "../../../../../../Shared/FormattedText.jsx";
import { useSequenceOrderQuestion } from "./useSequenceOrderQuestion.js";
import DragGrip from "../../Shared/Dnd/DragGrip.jsx";

export { getSequenceOrderStats } from "../Utils/sequenceOrderFeedbackStats.js";

const SEQUENCE_ORDER_ITEM_TYPE = "sequence-order-item";
const SEQUENCE_ORDER_ITEM_BANK_DROP_TARGET_ID = "sequence-order-item-bank";
const SEQUENCE_ORDER_SLOT_DROP_TARGET_ID_PREFIX = "sequence-order-slot-";

export default function SequenceOrderQuestion(props) {
    const sequenceOrder = useSequenceOrderQuestion(props);

    return (
        <DndProvider onDndDrop={handleSequenceOrderDndDrop(sequenceOrder)}>
            <div className={sequenceOrder.rootClassName}>
                {sequenceOrder.feedbackMode ? (
                    <TableMatchScoreSummary stats={sequenceOrder.stats} t={props.t} />
                ) : null}

                {!sequenceOrder.feedbackMode ? (
                    <>
                        <SequenceOrderItemBank
                            sequenceItems={sequenceOrder.sequenceItems}
                            placedSequenceItemIds={sequenceOrder.safeAnswer}
                            feedbackMode={sequenceOrder.feedbackMode}
                            selectedSequenceItemId={sequenceOrder.selectedSequenceItemId}
                            disabled={sequenceOrder.feedbackMode}
                            cardBankDropTargetId={SEQUENCE_ORDER_ITEM_BANK_DROP_TARGET_ID}
                            accept={SEQUENCE_ORDER_ITEM_TYPE}
                            onSequenceItemSelect={sequenceOrder.selectSequenceItem}
                            t={props.t}
                        />

                        <SequenceOrderBoard
                            safeAnswer={sequenceOrder.safeAnswer}
                            sequenceItemsById={sequenceOrder.sequenceItemsById}
                            feedbackMode={sequenceOrder.feedbackMode}
                            selectedSequenceItemId={sequenceOrder.selectedSequenceItemId}
                            accept={SEQUENCE_ORDER_ITEM_TYPE}
                            slotDropTargetIdPrefix={SEQUENCE_ORDER_SLOT_DROP_TARGET_ID_PREFIX}
                            onDropZoneClick={sequenceOrder.selectDropZone}
                            onSequenceItemRemove={sequenceOrder.removeSequenceItemFromAnswer}
                            t={props.t}
                        />

                        <DragOverlay>
                            {({ sourceData }) => {
                                if (!sourceData?.sequenceItem) {
                                    return null;
                                }

                                return <SequenceOrderDragOverlayCard sequenceItem={sourceData.sequenceItem} />;
                            }}
                        </DragOverlay>
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
        </DndProvider>
    );
}

function SequenceOrderDragOverlayCard(props) {
    return (
        <div className="sequence-order-item-card sequence-order-drag-overlay-card">
            <span className="sequence-order-item-card-text">
                <FormattedText text={getSequenceItemLabel(props.sequenceItem)} />
            </span>

            <DragGrip className="sequence-order-item-card-grip" />
        </div>
    );
}

const handleSequenceOrderDndDrop = (sequenceOrder) => {
    return ({ sourceId, targetId, sourceData, targetData }) => {
        const sequenceItemId = sourceData?.sequenceItem?.id ?? sourceId;

        if (!sequenceItemId) {
            return;
        }

        if (targetId === SEQUENCE_ORDER_ITEM_BANK_DROP_TARGET_ID) {
            if (Number.isInteger(sourceData?.sourceIndex)) {
                sequenceOrder.removeSequenceItemFromAnswer(sequenceItemId);
            }

            sequenceOrder.clearSelectedSequenceItem();
            return;
        }

        if (!Number.isInteger(targetData?.targetIndex)) {
            return;
        }

        sequenceOrder.assignSequenceItem(targetData.targetIndex, sequenceItemId);
        sequenceOrder.clearSelectedSequenceItem();
    };
};

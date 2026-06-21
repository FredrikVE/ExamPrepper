// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/SequenceOrder/ItemBank/SequenceOrderItemBank.jsx
import { ListOrdered } from "lucide-react";
import MobileDroppable from "../../Shared/MobileDnd/MobileDroppable.jsx";
import SequenceOrderItemCard from "./SequenceOrderItemCard.jsx";

export default function SequenceOrderItemBank(props) {
    if (props.feedbackMode) {
        return null;
    }

    return (
        <section className="sequence-order-item-bank" aria-label={props.t.sequenceOrderAlternativeBankTitle}>
            <div className="sequence-order-item-bank-title-row">
                <h4 className="sequence-order-item-bank-title">
                    {props.t.sequenceOrderAlternativeBankTitle}
                </h4>

                <ListOrdered className="sequence-order-item-bank-icon" aria-hidden="true" />
            </div>

            <MobileDroppable
                dropTargetId={props.cardBankDropTargetId}
                acceptedDragSourceType={props.acceptedDragSourceType}
            >
                {({ droppableRef, isDropTarget }) => (
                    <div ref={droppableRef} className={getItemListClassName(isDropTarget)}>
                        {props.sequenceItems.map((sequenceItem) => (
                            <SequenceOrderItemCard
                                key={sequenceItem.id}
                                sequenceItem={sequenceItem}
                                selected={props.selectedSequenceItemId === sequenceItem.id}
                                disabled={props.disabled}
                                dragSourceType={props.acceptedDragSourceType}
                                onSequenceItemSelect={props.onSequenceItemSelect}
                            />
                        ))}
                    </div>
                )}
            </MobileDroppable>

            <p className="sequence-order-item-bank-hint">
                {props.t.sequenceOrderAlternativeBankHint}
            </p>
        </section>
    );
}

function getItemListClassName(isDropTarget) {
    let className = "sequence-order-item-list";

    if (isDropTarget) {
        className += " sequence-order-item-list-over";
    }

    return className;
}

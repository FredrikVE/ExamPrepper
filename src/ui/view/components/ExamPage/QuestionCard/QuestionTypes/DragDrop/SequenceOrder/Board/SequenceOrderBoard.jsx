// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/SequenceOrder/Board/SequenceOrderBoard.jsx
import { ArrowRight } from "lucide-react";
import SequenceOrderDropZone from "./SequenceOrderDropZone.jsx";

export default function SequenceOrderBoard(props) {
    return (
        <section className="sequence-order-board" aria-label={props.t.sequenceOrderCorrectSequenceTitle}>
            <h4 className="sequence-order-section-title">
                {props.t.sequenceOrderCorrectSequenceTitle}
            </h4>

            <div className="sequence-order-slots">
                {props.safeAnswer.map((sequenceItemId, index) => (
                    <SequenceOrderSlotGroup
                        key={index}
                        index={index}
                        positionNumber={index + 1}
                        selectedSequenceItem={props.sequenceItemsById[sequenceItemId]}
                        selectedSequenceItemId={props.selectedSequenceItemId}
                        feedbackMode={props.feedbackMode}
                        isLastSlot={index === props.safeAnswer.length - 1}
                        acceptedDragSourceType={props.acceptedDragSourceType}
                        slotDropTargetIdPrefix={props.slotDropTargetIdPrefix}
                        onDropZoneClick={props.onDropZoneClick}
                        t={props.t}
                    />
                ))}
            </div>
        </section>
    );
}

function SequenceOrderSlotGroup(props) {
    return (
        <>
            <SequenceOrderDropZone
                index={props.index}
                positionNumber={props.positionNumber}
                selectedSequenceItem={props.selectedSequenceItem}
                selectedSequenceItemId={props.selectedSequenceItemId}
                feedbackMode={props.feedbackMode}
                acceptedDragSourceType={props.acceptedDragSourceType}
                slotDropTargetIdPrefix={props.slotDropTargetIdPrefix}
                onDropZoneClick={props.onDropZoneClick}
                t={props.t}
            />

            {!props.isLastSlot ? (
                <ArrowRight className="sequence-order-arrow" aria-hidden="true" />
            ) : null}
        </>
    );
}

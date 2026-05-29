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
                        selectedSequenceItem={props.sequenceItemsById[sequenceItemId]}
                        selectedSequenceItemId={props.selectedSequenceItemId}
                        isDragOver={props.dragOverIndex === index}
                        feedbackMode={props.feedbackMode}
                        isLastSlot={index === props.safeAnswer.length - 1}
                        onDropZoneClick={props.onDropZoneClick}
                        onDropZoneDragOver={props.onDropZoneDragOver}
                        onDropZoneDragLeave={props.onDropZoneDragLeave}
                        onDropZoneDrop={props.onDropZoneDrop}
                        onSequenceItemDragStart={props.onSequenceItemDragStart}
                        onSequenceItemRemove={props.onSequenceItemRemove}
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
                selectedSequenceItem={props.selectedSequenceItem}
                selectedSequenceItemId={props.selectedSequenceItemId}
                isDragOver={props.isDragOver}
                feedbackMode={props.feedbackMode}
                onDropZoneClick={props.onDropZoneClick}
                onDropZoneDragOver={props.onDropZoneDragOver}
                onDropZoneDragLeave={props.onDropZoneDragLeave}
                onDropZoneDrop={props.onDropZoneDrop}
                onSequenceItemDragStart={props.onSequenceItemDragStart}
                onSequenceItemRemove={props.onSequenceItemRemove}
                t={props.t}
            />

            {!props.isLastSlot ? (
                <ArrowRight className="sequence-order-arrow" aria-hidden="true" />
            ) : null}
        </>
    );
}

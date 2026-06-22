// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/SequenceOrder/Board/SequenceOrderPlacedItemCard.jsx
import { X } from "lucide-react";
import { getSequenceItemLabel } from "../Utils/sequenceOrderAnswerLogic.js";
import Draggable from "../../Shared/Dnd/Draggable.jsx";
import FormattedText from "../../../../../../Shared/FormattedText.jsx";
import DragGrip from "../../Shared/Dnd/DragGrip.jsx";

export default function SequenceOrderPlacedItemCard(props) {
    const handleRemoveClick = (event) => {
        event.stopPropagation();
        props.onRemove();
    };

    const stopRemovePointerDown = (event) => {
        event.stopPropagation();
    };

    return (
        <Draggable
            id={props.sequenceItem.id}
            type={props.type}
            data={{ sequenceItem: props.sequenceItem, sourceIndex: props.sourceIndex }}
            disabled={props.disabled}
        >
            {({ ref: dndRef, isDragging }) => (
                <div ref={dndRef} className={getPlacedCardClassName(isDragging)}>
                    <span className="sequence-order-placed-card-number" aria-hidden="true">
                        {props.sequencePositionNumber}
                    </span>

                    <span className="sequence-order-placed-card-text">
                        <FormattedText text={getSequenceItemLabel(props.sequenceItem)} />
                    </span>

                    <DragGrip className="sequence-order-placed-card-grip" />

                    <button
                        type="button"
                        className="sequence-order-placed-card-remove"
                        onPointerDown={stopRemovePointerDown}
                        onClick={handleRemoveClick}
                        aria-label={props.removeLabel}
                    >
                        <X aria-hidden="true" />
                    </button>
                </div>
            )}
        </Draggable>
    );
}

function getPlacedCardClassName(isDragging) {
    let className = "sequence-order-placed-card";

    if (isDragging) {
        className += " sequence-order-placed-card-dragging";
    }

    return className;
}


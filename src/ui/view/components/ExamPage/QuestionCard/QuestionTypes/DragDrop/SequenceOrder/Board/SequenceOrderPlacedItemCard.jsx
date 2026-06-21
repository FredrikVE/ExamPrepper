// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/SequenceOrder/Board/SequenceOrderPlacedItemCard.jsx
import { X } from "lucide-react";
import { getSequenceItemLabel } from "../Utils/sequenceOrderAnswerLogic.js";
import MobileDraggable from "../../Shared/MobileDnd/MobileDraggable.jsx";
import FormattedText from "../../../../../../Shared/FormattedText.jsx";

export default function SequenceOrderPlacedItemCard(props) {
    return (
        <MobileDraggable
            dragSourceId={props.sequenceItem.id}
            dragSourceType={props.dragSourceType}
            dragSourceContext={{ sequenceItem: props.sequenceItem, sourceIndex: props.sourceIndex }}
            disabled={props.disabled}
        >
            {({ draggableRef, isDragging }) => (
                <div ref={draggableRef} className={getPlacedCardClassName(isDragging)}>
                    <span className="sequence-order-placed-card-number" aria-hidden="true">
                        {props.sequencePositionNumber}
                    </span>

                    <span className="sequence-order-placed-card-text">
                        <FormattedText text={getSequenceItemLabel(props.sequenceItem)} />
                    </span>

                    <SequenceOrderPlacedCardGrip />

                    {!props.disabled ? (
                        <button
                            type="button"
                            className="sequence-order-remove-button"
                            onClick={removeItem(props)}
                            aria-label={props.t.sequenceOrderRemoveAnswer}
                        >
                            <X aria-hidden="true" />
                        </button>
                    ) : null}
                </div>
            )}
        </MobileDraggable>
    );
}

const removeItem = (props) => {
    return (event) => {
        event.stopPropagation();
        props.onSequenceItemRemove(props.sequenceItem.id);
    };
};

function getPlacedCardClassName(isDragging) {
    let className = "sequence-order-placed-card";

    if (isDragging) {
        className += " sequence-order-placed-card-dragging";
    }

    return className;
}

function SequenceOrderPlacedCardGrip() {
    return (
        <span className="sequence-order-placed-card-grip" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
        </span>
    );
}

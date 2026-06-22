// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/SequenceOrder/Board/SequenceOrderPlacedItemCard.jsx
import { getSequenceItemLabel } from "../Utils/sequenceOrderAnswerLogic.js";
import MobileDraggable from "../../Shared/MobileDnd/MobileDraggable.jsx";
import FormattedText from "../../../../../../Shared/FormattedText.jsx";
import MobileDragGrip from "../../Shared/MobileDnd/MobileDragGrip.jsx";

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

                    <MobileDragGrip className="sequence-order-placed-card-grip" />
                </div>
            )}
        </MobileDraggable>
    );
}

function getPlacedCardClassName(isDragging) {
    let className = "sequence-order-placed-card";

    if (isDragging) {
        className += " sequence-order-placed-card-dragging";
    }

    return className;
}


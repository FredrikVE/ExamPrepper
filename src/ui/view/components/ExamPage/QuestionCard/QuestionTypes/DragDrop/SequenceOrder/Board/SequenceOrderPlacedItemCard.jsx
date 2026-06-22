// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/SequenceOrder/Board/SequenceOrderPlacedItemCard.jsx
import { getSequenceItemLabel } from "../Utils/sequenceOrderAnswerLogic.js";
import Draggable from "../../Shared/Dnd/Draggable.jsx";
import FormattedText from "../../../../../../Shared/FormattedText.jsx";
import DragGrip from "../../Shared/Dnd/DragGrip.jsx";

export default function SequenceOrderPlacedItemCard(props) {
    return (
        <Draggable
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

                    <DragGrip className="sequence-order-placed-card-grip" />
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


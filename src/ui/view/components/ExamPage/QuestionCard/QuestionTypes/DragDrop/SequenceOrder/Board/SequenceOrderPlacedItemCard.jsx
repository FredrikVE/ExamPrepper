// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/SequenceOrder/Board/SequenceOrderPlacedItemCard.jsx
import { GripVertical, X } from "lucide-react";
import { getSequenceItemLabel } from "../Utils/sequenceOrderAnswerLogic.js";

export default function SequenceOrderPlacedItemCard(props) {
    const startItemDrag = (event) => {
        props.onSequenceItemDragStart(event, props.sequenceItem.id);
    };

    const removeItem = (event) => {
        event.stopPropagation();
        props.onSequenceItemRemove(props.sequenceItem.id);
    };

    return (
        <div
            className="sequence-order-placed-card"
            draggable={!props.disabled}
            onDragStart={startItemDrag}
        >
            <GripVertical className="sequence-order-placed-card-grip" aria-hidden="true" />

            <span>{getSequenceItemLabel(props.sequenceItem)}</span>

            {!props.disabled ? (
                <button
                    type="button"
                    className="sequence-order-remove-button"
                    onClick={removeItem}
                    aria-label={props.t.sequenceOrderRemoveAnswer}
                >
                    <X aria-hidden="true" />
                </button>
            ) : null}
        </div>
    );
}

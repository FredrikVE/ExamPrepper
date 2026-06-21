// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/SequenceOrder/ItemBank/SequenceOrderItemCard.jsx
import { GripVertical } from "lucide-react";
import { getSequenceItemLabel } from "../Utils/sequenceOrderAnswerLogic.js";
import MobileDraggable from "../../Shared/MobileDnd/MobileDraggable.jsx";
import FormattedText from "../../../../../../Shared/FormattedText.jsx";

export default function SequenceOrderItemCard(props) {
    return (
        <MobileDraggable
            dragSourceId={props.sequenceItem.id}
            dragSourceType={props.dragSourceType}
            dragSourceContext={{ sequenceItem: props.sequenceItem, sourceIndex: null }}
            disabled={props.disabled}
        >
            {({ draggableRef, isDragging }) => {
                const className = getItemCardClassName({
                    selected: props.selected,
                    disabled: props.disabled,
                    isDragging
                });

                return (
                    <button
                        ref={draggableRef}
                        type="button"
                        className={className}
                        onClick={selectItem(props)}
                        disabled={props.disabled}
                    >
                        <GripVertical className="sequence-order-item-card-grip" aria-hidden="true" />
                        <span><FormattedText text={getSequenceItemLabel(props.sequenceItem)} /></span>
                    </button>
                );
            }}
        </MobileDraggable>
    );
}

const selectItem = (props) => {
    return () => {
        if (props.disabled) {
            return;
        }

        props.onSequenceItemSelect(props.sequenceItem.id);
    };
};

function getItemCardClassName({ selected, disabled, isDragging }) {
    let className = "sequence-order-item-card";

    if (selected) {
        className += " sequence-order-item-card-selected";
    }

    if (disabled) {
        className += " sequence-order-item-card-disabled";
    }

    if (isDragging) {
        className += " sequence-order-item-card-dragging";
    }

    return className;
}

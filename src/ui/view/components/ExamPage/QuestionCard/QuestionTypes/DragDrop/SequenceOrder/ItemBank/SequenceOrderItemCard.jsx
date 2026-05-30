// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/SequenceOrder/ItemBank/SequenceOrderItemCard.jsx
import { GripVertical } from "lucide-react";
import { getSequenceItemLabel } from "../Utils/sequenceOrderAnswerLogic.js";
import FormattedText from "../../../../../../Shared/FormattedText.jsx";

export default function SequenceOrderItemCard(props) {
    const className = getItemCardClassName({
        selected: props.selected,
        disabled: props.disabled
    });

    const selectItem = () => {
        if (props.disabled) {
            return;
        }

        props.onSequenceItemSelect(props.sequenceItem.id);
    };

    const startItemDrag = (event) => {
        props.onSequenceItemDragStart(event, props.sequenceItem.id);
    };

    return (
        <button
            type="button"
            className={className}
            draggable={!props.disabled}
            onClick={selectItem}
            onDragStart={startItemDrag}
            disabled={props.disabled}
        >
            <GripVertical className="sequence-order-item-card-grip" aria-hidden="true" />
            <span><FormattedText text={getSequenceItemLabel(props.sequenceItem)} /></span>
        </button>
    );
}

function getItemCardClassName({ selected, disabled }) {
    let className = "sequence-order-item-card";

    if (selected) {
        className += " sequence-order-item-card-selected";
    }

    if (disabled) {
        className += " sequence-order-item-card-disabled";
    }

    return className;
}

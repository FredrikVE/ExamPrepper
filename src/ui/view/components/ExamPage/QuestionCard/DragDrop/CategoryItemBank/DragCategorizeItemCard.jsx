//src/ui/view/components/ExamPage/QuestionCard/DragDrop/CategoryItemBank/DragCategorizeItemCard.jsx
import { GripVertical } from "lucide-react";
import { getItemLabel } from "../CategoryLogic/dragCategorizeAnswerLogic.js";

export default function DragCategorizeItemCard(props) {
    const className = getCardClassName({
        selected: props.selected,
        disabled: props.disabled
    });

    return (
        <button
            type="button"
            className={className}
            draggable={!props.disabled}
            onClick={props.disabled ? undefined : props.onSelect}
            onDragStart={props.disabled ? undefined : props.onDragStart}
        >
            <GripVertical className="drag-categorize-item-card-grip" aria-hidden="true" />
            <span>{getItemLabel(props.item)}</span>
        </button>
    );
}

const getCardClassName = ({ selected, disabled }) => {
    let className = "drag-categorize-item-card";

    if (selected) {
        className += " drag-categorize-item-card-selected";
    }

    if (disabled) {
        className += " drag-categorize-item-card-disabled";
    }

    return className;
};

// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/MatrixPlacement/ItemBank/MatrixPlacementItemCard.jsx
import { GripVertical } from "lucide-react";
import { getItemLabel } from "../Utils/matrixPlacementAnswerLogic.js";

export default function MatrixPlacementItemCard(props) {
    const label = getItemLabel(props.item);
    const className = getCardClassName({ selected: props.selected, disabled: props.disabled });

    return (
        <button
            type="button"
            className={className}
            draggable={!props.disabled}
            onClick={props.disabled ? undefined : props.onSelect}
            onDragStart={props.disabled ? undefined : props.onDragStart}
        >
            <GripVertical className="matrix-placement-item-card-grip" aria-hidden="true" />
            <span>{label}</span>
        </button>
    );
}

function getCardClassName({ selected, disabled }) {
    let className = "matrix-placement-item-card";

    if (selected) {
        className += " matrix-placement-item-card-selected";
    }

    if (disabled) {
        className += " matrix-placement-item-card-disabled";
    }

    return className;
}

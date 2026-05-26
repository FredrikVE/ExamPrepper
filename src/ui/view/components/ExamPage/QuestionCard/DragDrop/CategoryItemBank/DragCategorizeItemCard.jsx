//src/ui/view/components/ExamPage/QuestionCard/DragDrop/CategoryItemBank/DragCategorizeItemCard.jsx
import { GripVertical } from "lucide-react";
import { getItemLabel } from "../CategoryLogic/dragCategorizeAnswerLogic.js";

export default function DragCategorizeItemCard(props) {
    const label = getItemLabel(props.item);
    const className = getCardClassName({
        label,
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
            <span>{label}</span>
        </button>
    );
}

const getCardClassName = ({ label, selected, disabled }) => {
    let className = `drag-categorize-item-card ${getLabelLengthClassName(label)}`;

    if (selected) {
        className += " drag-categorize-item-card-selected";
    }

    if (disabled) {
        className += " drag-categorize-item-card-disabled";
    }

    return className;
};

const getLabelLengthClassName = (label) => {
    const length = String(label ?? "").trim().length;

    if (length >= 72) {
        return "drag-categorize-item-card-extra-long";
    }

    if (length >= 44) {
        return "drag-categorize-item-card-long";
    }

    if (length >= 24) {
        return "drag-categorize-item-card-medium";
    }

    return "drag-categorize-item-card-short";
};

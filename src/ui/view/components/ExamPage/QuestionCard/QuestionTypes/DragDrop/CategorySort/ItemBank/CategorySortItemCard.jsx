// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/CategorySort/ItemBank/CategorySortItemCard.jsx
import { getItemLabel } from "../Utils/categorySortAnswerLogic.js";
import Draggable from "../../Shared/Dnd/Draggable.jsx";
import FormattedText from "../../../../../../Shared/FormattedText.jsx";
import DragGrip from "../../Shared/Dnd/DragGrip.jsx";

export default function CategorySortItemCard(props) {
    const label = getItemLabel(props.item);

    return (
        <Draggable
            id={props.item.id}
            type={props.type}
            data={{ item: props.item, sourceCategoryId: null }}
            disabled={props.disabled}
        >
            {({ ref: dndRef, handleRef, isDragging }) => {
                const className = getCardClassName({
                    label,
                    selected: props.selected,
                    disabled: props.disabled,
                    isDragging
                });

                return (
                    <button
                        ref={dndRef}
                        type="button"
                        className={className}
                        onClick={props.disabled ? undefined : props.onSelect}
                    >
                        <DragGrip handleRef={handleRef} className="drag-categorize-item-card-grip" />

                        <span className="drag-categorize-item-card-text"><FormattedText text={label} /></span>
                    </button>
                );
            }}
        </Draggable>
    );
}

const getCardClassName = ({ label, selected, disabled, isDragging }) => {
    let className = `drag-categorize-item-card ${getLabelLengthClassName(label)}`;

    if (selected) {
        className += " drag-categorize-item-card-selected";
    }

    if (disabled) {
        className += " drag-categorize-item-card-disabled";
    }

    if (isDragging) {
        className += " drag-categorize-item-card-dragging";
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

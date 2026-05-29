// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/CategorySort/Board/CategorySortPlacedItemCard.jsx
import { GripVertical, X } from "lucide-react";
import { getItemLabel } from "../Utils/categorySortAnswerLogic.js";

export default function CategorySortPlacedItemCard(props) {
    let className = "drag-categorize-placed-card";

    if (props.selected) {
        className += " drag-categorize-placed-card-selected";
    }

    const handleCardClick = (event) => {
        event.stopPropagation();
        props.onSelect();
    };

    const handleKeyDown = (event) => {
        const userPressedEnter = event.key === "Enter";
        const userPressedSpace = event.key === " ";

        if (!userPressedEnter && !userPressedSpace) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();
        props.onSelect();
    };

    const handleRemoveClick = (event) => {
        event.stopPropagation();
        props.onRemove();
    };

    return (
        <div
            className={className}
            draggable
            role="button"
            tabIndex={0}
            onClick={handleCardClick}
            onKeyDown={handleKeyDown}
            onDragStart={props.onDragStart}
        >
            <GripVertical className="drag-categorize-placed-card-grip" aria-hidden="true" />

            <span>{getItemLabel(props.item)}</span>

            <button
                type="button"
                className="drag-categorize-placed-card-remove"
                onClick={handleRemoveClick}
                aria-label={props.t.dragCategorizeRemoveAnswer}
            >
                <X aria-hidden="true" />
            </button>
        </div>
    );
}

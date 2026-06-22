// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/CategorySort/Board/CategorySortPlacedItemCard.jsx
import { X } from "lucide-react";
import { getItemLabel } from "../Utils/categorySortAnswerLogic.js";
import MobileDraggable from "../../Shared/MobileDnd/MobileDraggable.jsx";
import FormattedText from "../../../../../../Shared/FormattedText.jsx";
import MobileDragGrip from "../../Shared/MobileDnd/MobileDragGrip.jsx";

export default function CategorySortPlacedItemCard(props) {
    return (
        <MobileDraggable
            dragSourceId={props.item.id}
            dragSourceType={props.dragSourceType}
            dragSourceContext={{ item: props.item, sourceCategoryId: props.sourceCategoryId }}
        >
            {({ draggableRef, isDragging }) => (
                <CategorySortPlacedItemCardContent
                    {...props}
                    draggableRef={draggableRef}
                    isDragging={isDragging}
                />
            )}
        </MobileDraggable>
    );
}

function CategorySortPlacedItemCardContent(props) {
    const className = getPlacedCardClassName({
        selected: props.selected,
        isDragging: props.isDragging
    });

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
            ref={props.draggableRef}
            className={className}
            role="button"
            tabIndex={0}
            onClick={handleCardClick}
            onKeyDown={handleKeyDown}
        >
            <MobileDragGrip className="drag-categorize-placed-card-grip" />

            <span className="drag-categorize-placed-card-text"><FormattedText text={getItemLabel(props.item)} /></span>

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

function getPlacedCardClassName({ selected, isDragging }) {
    let className = "drag-categorize-placed-card";

    if (selected) {
        className += " drag-categorize-placed-card-selected";
    }

    if (isDragging) {
        className += " drag-categorize-placed-card-dragging";
    }

    return className;
}


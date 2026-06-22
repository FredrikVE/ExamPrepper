// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/MatrixPlacement/Matrix/MatrixPlacementPlacedItemCard.jsx
import { X } from "lucide-react";
import { getItemLabel } from "../Utils/matrixPlacementAnswerLogic.js";
import Draggable from "../../Shared/Dnd/Draggable.jsx";
import FormattedText from "../../../../../../Shared/FormattedText.jsx";
import DragGrip from "../../Shared/Dnd/DragGrip.jsx";

export default function MatrixPlacementPlacedItemCard(props) {
    return (
        <Draggable
            dragSourceId={props.item.id}
            dragSourceType={props.dragSourceType}
            dragSourceContext={{ item: props.item, sourceQuadrantId: props.sourceQuadrantId }}
        >
            {({ draggableRef, isDragging }) => (
                <MatrixPlacementPlacedItemCardContent
                    {...props}
                    draggableRef={draggableRef}
                    isDragging={isDragging}
                />
            )}
        </Draggable>
    );
}

function MatrixPlacementPlacedItemCardContent(props) {
    const className = getPlacedCardClassName({ selected: props.selected, isDragging: props.isDragging });

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
            <DragGrip className="matrix-placement-placed-card-grip" />

            <span><FormattedText text={getItemLabel(props.item)} /></span>

            <button
                type="button"
                className="matrix-placement-placed-card-remove"
                onClick={handleRemoveClick}
                aria-label={props.t.matrixPlacementRemoveAnswer}
            >
                <X aria-hidden="true" />
            </button>
        </div>
    );
}

function getPlacedCardClassName({ selected, isDragging }) {
    let className = "matrix-placement-placed-card";

    if (selected) {
        className += " matrix-placement-placed-card-selected";
    }

    if (isDragging) {
        className += " matrix-placement-placed-card-dragging";
    }

    return className;
}

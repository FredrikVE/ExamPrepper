// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/MatrixPlacement/ItemBank/MatrixPlacementItemCard.jsx
import { getItemLabel } from "../Utils/matrixPlacementAnswerLogic.js";
import MobileDraggable from "../../Shared/MobileDnd/MobileDraggable.jsx";
import FormattedText from "../../../../../../Shared/FormattedText.jsx";
import MobileDragGrip from "../../Shared/MobileDnd/MobileDragGrip.jsx";

export default function MatrixPlacementItemCard(props) {
    const label = getItemLabel(props.item);

    return (
        <MobileDraggable
            dragSourceId={props.item.id}
            dragSourceType={props.dragSourceType}
            dragSourceContext={{ item: props.item, sourceQuadrantId: null }}
            disabled={props.disabled}
        >
            {({ draggableRef, isDragging }) => {
                const className = getCardClassName({ selected: props.selected, disabled: props.disabled, isDragging });

                return (
                    <button
                        ref={draggableRef}
                        type="button"
                        className={className}
                        onClick={props.disabled ? undefined : props.onSelect}
                    >
                        <MobileDragGrip className="matrix-placement-item-card-grip" />
                        <span><FormattedText text={label} /></span>
                    </button>
                );
            }}
        </MobileDraggable>
    );
}

function getCardClassName({ selected, disabled, isDragging }) {
    let className = "matrix-placement-item-card";

    if (selected) {
        className += " matrix-placement-item-card-selected";
    }

    if (disabled) {
        className += " matrix-placement-item-card-disabled";
    }

    if (isDragging) {
        className += " matrix-placement-item-card-dragging";
    }

    return className;
}


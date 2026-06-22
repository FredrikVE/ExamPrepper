// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/MatrixPlacement/ItemBank/MatrixPlacementItemCard.jsx
import { getItemLabel } from "../Utils/matrixPlacementAnswerLogic.js";
import Draggable from "../../Shared/Dnd/Draggable.jsx";
import FormattedText from "../../../../../../Shared/FormattedText.jsx";
import DragGrip from "../../Shared/Dnd/DragGrip.jsx";

export default function MatrixPlacementItemCard(props) {
    const label = getItemLabel(props.item);

    return (
        <Draggable
            id={props.item.id}
            type={props.type}
            data={{ item: props.item, sourceQuadrantId: null }}
            disabled={props.disabled}
        >
            {({ ref: dndRef, handleRef, isDragging }) => {
                const className = getCardClassName({ selected: props.selected, disabled: props.disabled, isDragging });

                return (
                    <button
                        ref={dndRef}
                        type="button"
                        className={className}
                        onClick={props.disabled ? undefined : props.onSelect}
                    >
                        <DragGrip handleRef={handleRef} className="matrix-placement-item-card-grip" />
                        <span><FormattedText text={label} /></span>
                    </button>
                );
            }}
        </Draggable>
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


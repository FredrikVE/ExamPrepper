// src/ui/view/components/QuestionCard/QuestionTypes/DragDrop/MatrixPlacement/Matrix/MatrixPlacementPlacedItemCard.jsx
import { getItemLabel } from "../Utils/matrixPlacementAnswerLogic.js";
import Draggable from "../../Shared/Dnd/Draggable.jsx";
import FormattedText from "../../../../../Shared/FormattedText.jsx";
import DragGrip from "../../Shared/Dnd/DragGrip.jsx";
import ClearButton from "../../Shared/Dnd/ClearButton.jsx";
import isActivationKey from "../../../../../../KeyboardNavigation/isActivationKey.js";

export default function MatrixPlacementPlacedItemCard(props) {
    return (
        <Draggable
            id={props.item.id}
            type={props.type}
            data={{ item: props.item, sourceQuadrantId: props.sourceQuadrantId }}
        >
            {({ ref: dndRef, isDragging }) => (
                <MatrixPlacementPlacedItemCardContent
                    {...props}
                    dndRef={dndRef}
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
        if (!isActivationKey(event.key)) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();
        props.onSelect();
    };

    return (
        <div
            ref={props.dndRef}
            className={className}
            role="button"
            tabIndex={0}
            onClick={handleCardClick}
            onKeyDown={handleKeyDown}
        >
            <DragGrip className="matrix-placement-placed-card-grip" />

            <span><FormattedText text={getItemLabel(props.item)} /></span>

            <ClearButton
                className="matrix-placement-placed-card-remove"
                label={props.t.matrixPlacementRemoveAnswer}
                onClear={props.onRemove}
            />
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

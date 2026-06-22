// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/SequenceOrder/Board/SequenceOrderDropZone.jsx
import Droppable from "../../Shared/Dnd/Droppable.jsx";
import SequenceOrderPlacedItemCard from "./SequenceOrderPlacedItemCard.jsx";

export default function SequenceOrderDropZone(props) {
    return (
        <Droppable
            id={`${props.slotDropTargetIdPrefix}${props.index}`}
            accept={props.accept}
            data={{ targetIndex: props.index }}
        >
            {({ ref: dndRef, isDropTarget }) => (
                <SequenceOrderDropZoneContent
                    {...props}
                    dndRef={dndRef}
                    isDropTarget={isDropTarget}
                />
            )}
        </Droppable>
    );
}

function SequenceOrderDropZoneContent(props) {
    const className = getDropZoneClassName({
        hasSelectedSequenceItem: Boolean(props.selectedSequenceItem),
        isDropTarget: props.isDropTarget,
        canReceiveSelectedItem: Boolean(props.selectedSequenceItemId)
    });

    const selectDropZone = () => {
        props.onDropZoneClick(props.index);
    };

    const activateDropZoneWithKeyboard = (event) => {
        const userPressedEnter = event.key === "Enter";
        const userPressedSpace = event.key === " ";

        if (!userPressedEnter && !userPressedSpace) {
            return;
        }

        event.preventDefault();
        selectDropZone();
    };

    return (
        <div
            ref={props.dndRef}
            className={className}
            role="button"
            tabIndex={0}
            onClick={selectDropZone}
            onKeyDown={activateDropZoneWithKeyboard}
            aria-label={`${props.t.dragDropDropHere} ${props.positionNumber}`}
        >
            {props.selectedSequenceItem ? (
                <SequenceOrderPlacedItemCard
                    sequenceItem={props.selectedSequenceItem}
                    sourceIndex={props.index}
                    sequencePositionNumber={props.positionNumber}
                    disabled={props.feedbackMode}
                    type={props.accept}
                    onRemove={() => props.onSequenceItemRemove(props.selectedSequenceItem.id)}
                    removeLabel={props.t.sequenceOrderRemoveAnswer}
                />
            ) : (
                <>
                    <span className="sequence-order-slot-number" aria-hidden="true">
                        {props.positionNumber}
                    </span>
                    <span className="sequence-order-drop-placeholder">
                        {props.t.dragDropDropHere}
                    </span>
                </>
            )}
        </div>
    );
}

function getDropZoneClassName({ hasSelectedSequenceItem, isDropTarget, canReceiveSelectedItem }) {
    let className = "sequence-order-drop-zone";

    if (hasSelectedSequenceItem) {
        className += " sequence-order-drop-zone-filled";
    }

    if (isDropTarget) {
        className += " sequence-order-drop-zone-over";
    }

    if (canReceiveSelectedItem) {
        className += " sequence-order-drop-zone-selectable";
    }

    return className;
}

// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/SequenceOrder/Board/SequenceOrderDropZone.jsx
import MobileDroppable from "../../Shared/MobileDnd/MobileDroppable.jsx";
import SequenceOrderPlacedItemCard from "./SequenceOrderPlacedItemCard.jsx";

export default function SequenceOrderDropZone(props) {
    return (
        <MobileDroppable
            dropTargetId={`${props.slotDropTargetIdPrefix}${props.index}`}
            acceptedDragSourceType={props.acceptedDragSourceType}
            dropTargetContext={{ targetIndex: props.index }}
        >
            {({ droppableRef, isDropTarget }) => (
                <SequenceOrderDropZoneContent
                    {...props}
                    droppableRef={droppableRef}
                    isDropTarget={isDropTarget}
                />
            )}
        </MobileDroppable>
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
            ref={props.droppableRef}
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
                    dragSourceType={props.acceptedDragSourceType}
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

// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/SequenceOrder/Board/SequenceOrderDropZone.jsx
import SequenceOrderPlacedItemCard from "./SequenceOrderPlacedItemCard.jsx";

export default function SequenceOrderDropZone(props) {
    const className = getDropZoneClassName({
        hasSelectedSequenceItem: Boolean(props.selectedSequenceItem),
        isDragOver: props.isDragOver,
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
            className={className}
            role="button"
            tabIndex={0}
            onClick={selectDropZone}
            onKeyDown={activateDropZoneWithKeyboard}
            onDragOver={(event) => props.onDropZoneDragOver(event, props.index)}
            onDragLeave={props.onDropZoneDragLeave}
            onDrop={(event) => props.onDropZoneDrop(event, props.index)}
            aria-label={`${props.t.dragDropDropHere} ${props.index + 1}`}
        >
            {props.selectedSequenceItem ? (
                <SequenceOrderPlacedItemCard
                    sequenceItem={props.selectedSequenceItem}
                    disabled={props.feedbackMode}
                    onSequenceItemDragStart={props.onSequenceItemDragStart}
                    onSequenceItemRemove={props.onSequenceItemRemove}
                    t={props.t}
                />
            ) : (
                <span className="sequence-order-drop-placeholder">
                    {props.t.dragDropDropHere}
                </span>
            )}
        </div>
    );
}

function getDropZoneClassName({ hasSelectedSequenceItem, isDragOver, canReceiveSelectedItem }) {
    let className = "sequence-order-drop-zone";

    if (hasSelectedSequenceItem) {
        className += " sequence-order-drop-zone-filled";
    }

    if (isDragOver) {
        className += " sequence-order-drop-zone-over";
    }

    if (canReceiveSelectedItem) {
        className += " sequence-order-drop-zone-selectable";
    }

    return className;
}

// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/MatrixPlacement/Matrix/MatrixPlacementDropZone.jsx
import MatrixPlacementFeedbackCard from "../Feedback/MatrixPlacementFeedbackCard.jsx";
import { getItemsInQuadrant } from "../Utils/matrixPlacementAnswerLogic.js";
import MatrixPlacementPlacedItemCard from "./MatrixPlacementPlacedItemCard.jsx";

export default function MatrixPlacementDropZone(props) {
    const items = getItemsInQuadrant(props.question, props.safeAnswer, props.quadrant.id);
    const className = getDropZoneClassName({
        isDragOver: props.isDragOver,
        empty: items.length === 0,
        selectable: Boolean(props.selectedItemId) && !props.feedbackMode,
        feedbackMode: props.feedbackMode
    });

    const handleKeyDown = (event) => {
        const userPressedEnter = event.key === "Enter";
        const userPressedSpace = event.key === " ";

        if (!userPressedEnter && !userPressedSpace) {
            return;
        }

        event.preventDefault();
        props.onClick();
    };

    return (
        <div
            className={className}
            role="button"
            tabIndex={props.feedbackMode ? -1 : 0}
            onClick={props.feedbackMode ? undefined : props.onClick}
            onKeyDown={props.feedbackMode ? undefined : handleKeyDown}
            onDragOver={props.feedbackMode ? undefined : props.onDragOver}
            onDragLeave={props.feedbackMode ? undefined : props.onDragLeave}
            onDrop={props.feedbackMode ? undefined : props.onDrop}
            aria-label={`${props.t.matrixPlacementDropHere}: ${props.quadrant.title ?? props.quadrant.label}`}
        >
            {items.map((item) => renderItem(props, item))}

            {items.length === 0 && !props.feedbackMode ? (
                <div className="matrix-placement-empty-slot">
                    {props.t.matrixPlacementDropHere}
                </div>
            ) : null}

            {items.length === 0 && props.feedbackMode ? (
                <div className="matrix-placement-empty-slot matrix-placement-empty-slot-feedback">
                    {props.t.matrixPlacementNoPlacedItems}
                </div>
            ) : null}
        </div>
    );
}

function renderItem(props, item) {
    if (props.feedbackMode) {
        return (
            <MatrixPlacementFeedbackCard
                key={item.id}
                question={props.question}
                item={item}
                answer={props.safeAnswer}
                isExpanded={props.expandedItemId === item.id}
                onToggleExpanded={() => props.onToggleExpanded(item.id)}
                t={props.t}
            />
        );
    }

    return (
        <MatrixPlacementPlacedItemCard
            key={item.id}
            item={item}
            selected={props.selectedItemId === item.id}
            onSelect={() => props.onItemSelect(item.id)}
            onDragStart={(event) => props.onItemDragStart(event, item.id)}
            onRemove={() => props.onItemRemove(item.id)}
            t={props.t}
        />
    );
}

function getDropZoneClassName({ isDragOver, empty, selectable, feedbackMode }) {
    let className = "matrix-placement-drop-zone";

    if (isDragOver) {
        className += " matrix-placement-drop-zone-over";
    }

    if (empty) {
        className += " matrix-placement-drop-zone-empty";
    }

    if (selectable) {
        className += " matrix-placement-drop-zone-selectable";
    }

    if (feedbackMode) {
        className += " matrix-placement-drop-zone-feedback";
    }

    return className;
}

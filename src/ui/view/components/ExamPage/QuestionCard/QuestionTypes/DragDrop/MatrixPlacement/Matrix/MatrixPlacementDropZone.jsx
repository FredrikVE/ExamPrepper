// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/MatrixPlacement/Matrix/MatrixPlacementDropZone.jsx
import { CheckCircle2 } from "lucide-react";
import Droppable from "../../Shared/Dnd/Droppable.jsx";
import MatrixPlacementFeedbackCard from "../Feedback/MatrixPlacementFeedbackCard.jsx";
import { getItemLabel, getItemsInQuadrant, getMissingCorrectItemsInQuadrant } from "../Utils/matrixPlacementAnswerLogic.js";
import MatrixPlacementPlacedItemCard from "./MatrixPlacementPlacedItemCard.jsx";
import FormattedText from "../../../../../../Shared/FormattedText.jsx";

export default function MatrixPlacementDropZone(props) {
    if (props.feedbackMode) {
        return <MatrixPlacementDropZoneContent {...props} isDropTarget={false} />;
    }

    return (
        <Droppable
            id={`${props.quadrantDropTargetIdPrefix}${props.quadrant.id}`}
            accept={props.accept}
            data={{ quadrantId: props.quadrant.id }}
        >
            {({ ref: dndRef, isDropTarget }) => (
                <MatrixPlacementDropZoneContent
                    {...props}
                    dndRef={dndRef}
                    isDropTarget={isDropTarget}
                />
            )}
        </Droppable>
    );
}

function MatrixPlacementDropZoneContent(props) {
    const items = getItemsInQuadrant(props.question, props.safeAnswer, props.quadrant.id);
    const answerKeyItems = props.feedbackMode
        ? getMissingCorrectItemsInQuadrant(props.question, props.safeAnswer, props.quadrant.id)
        : [];
    const hasVisibleItems = items.length > 0 || answerKeyItems.length > 0;
    const className = getDropZoneClassName({
        isDropTarget: props.isDropTarget,
        empty: !hasVisibleItems,
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
            ref={props.dndRef}
            className={className}
            role="button"
            tabIndex={props.feedbackMode ? -1 : 0}
            onClick={props.feedbackMode ? undefined : props.onClick}
            onKeyDown={props.feedbackMode ? undefined : handleKeyDown}
            aria-label={`${props.t.matrixPlacementDropHere}: ${props.quadrant.title ?? props.quadrant.label}`}
        >
            {items.map((item) => renderItem(props, item))}
            {answerKeyItems.map((item) => renderAnswerKeyItem(props, item))}

            {!hasVisibleItems && !props.feedbackMode ? (
                <div className="matrix-placement-empty-slot">
                    <span className="matrix-placement-empty-slot-arrow" aria-hidden="true">↓</span>
                    <span>{props.t.matrixPlacementDropHere}</span>
                </div>
            ) : null}

            {!hasVisibleItems && props.feedbackMode ? (
                <div className="matrix-placement-empty-slot matrix-placement-empty-slot-feedback">
                    {props.t.matrixPlacementNoPlacedItems}
                </div>
            ) : null}
        </div>
    );
}

function renderAnswerKeyItem(props, item) {
    return (
        <article
            key={`answer-key-${item.id}`}
            className="matrix-placement-answer-key-card"
            aria-label={`${props.t.feedbackCorrectAnswerLabel}: ${getItemLabel(item)}`}
        >
            <div className="matrix-placement-answer-key-title-row">
                <CheckCircle2 className="matrix-placement-answer-key-icon" aria-hidden="true" />
                <span className="matrix-placement-answer-key-title">
                    <FormattedText text={getItemLabel(item)} />
                </span>
            </div>

            <span className="matrix-placement-answer-key-pill">
                {props.t.matrixPlacementAnswerKeyPill}
            </span>
        </article>
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
                isUserPlacementCard
            />
        );
    }

    return (
        <MatrixPlacementPlacedItemCard
            key={item.id}
            item={item}
            selected={props.selectedItemId === item.id}
            sourceQuadrantId={props.quadrant.id}
            type={props.accept}
            onSelect={() => props.onItemSelect(item.id)}
            onRemove={() => props.onItemRemove(item.id)}
            t={props.t}
        />
    );
}

function getDropZoneClassName({ isDropTarget, empty, selectable, feedbackMode }) {
    let className = "matrix-placement-drop-zone";

    if (isDropTarget) {
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

// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/CategorySort/Board/CategorySortDropZone.jsx
import Droppable from "../../Shared/Dnd/Droppable.jsx";
import CategorySortFeedbackCard from "../Feedback/CategorySortFeedbackCard.jsx";
import CategorySortPlacedItemCard from "./CategorySortPlacedItemCard.jsx";

export default function CategorySortDropZone(props) {
    if (props.feedbackMode) {
        return <CategorySortDropZoneContent {...props} isDropTarget={false} />;
    }

    return (
        <Droppable
            id={`${props.categoryDropTargetIdPrefix}${props.category.id}`}
            accept={props.accept}
            data={{ categoryId: props.category.id }}
        >
            {({ ref: dndRef, isDropTarget }) => (
                <CategorySortDropZoneContent
                    {...props}
                    dndRef={dndRef}
                    isDropTarget={isDropTarget}
                />
            )}
        </Droppable>
    );
}

function CategorySortDropZoneContent(props) {
    const className = getDropZoneClassName({
        isDropTarget: props.isDropTarget,
        empty: props.itemIds.length === 0
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
            tabIndex={0}
            onClick={props.onClick}
            onKeyDown={handleKeyDown}
            aria-label={`${props.t.dragCategorizeDropHere}: ${props.category.label}`}
        >
            {props.itemIds.map((itemId) => {
                const item = props.itemsById[itemId];

                if (!item) {
                    return null;
                }

                if (props.feedbackMode) {
                    return (
                        <CategorySortFeedbackCard
                            key={itemId}
                            question={props.question}
                            category={props.category}
                            item={item}
                            isExpanded={props.expandedItemId === itemId}
                            onToggleExpanded={() => props.onToggleExpanded(itemId)}
                            t={props.t}
                        />
                    );
                }

                return (
                    <CategorySortPlacedItemCard
                        key={itemId}
                        item={item}
                        selected={props.selectedItemId === itemId}
                        sourceCategoryId={props.category.id}
                        type={props.accept}
                        onSelect={() => props.onItemSelect(itemId)}
                        onRemove={() => props.onItemRemove(itemId)}
                        t={props.t}
                    />
                );
            })}

            {renderEmptySlots(props)}
        </div>
    );
}

function renderEmptySlots(props) {
    if (props.feedbackMode) {
        return Array.from({ length: props.unansweredSlotCount }, (_, index) => (
            <div
                key={`unanswered-${index}`}
                className="drag-categorize-empty-slot drag-categorize-empty-slot-feedback"
            >
                {props.t.dragDropUnanswered}
            </div>
        ));
    }

    return (
        <div className="drag-categorize-empty-slot">
            {props.t.dragCategorizeDropHere}
        </div>
    );
}

const getDropZoneClassName = ({ isDropTarget, empty }) => {
    let className = "drag-categorize-drop-zone";

    if (isDropTarget) {
        className += " drag-categorize-drop-zone-over";
    }

    if (empty) {
        className += " drag-categorize-drop-zone-empty";
    }

    return className;
};

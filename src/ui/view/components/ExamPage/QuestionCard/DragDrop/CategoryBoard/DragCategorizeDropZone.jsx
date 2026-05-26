//src/ui/view/components/ExamPage/QuestionCard/DragDrop/CategoryBoard/DragCategorizeDropZone.jsx
import DragCategorizeFeedbackCard from "../CategoryFeedback/DragCategorizeFeedbackCard.jsx";
import DragCategorizePlacedItemCard from "./DragCategorizePlacedItemCard.jsx";

export default function DragCategorizeDropZone(props) {
    const className = getDropZoneClassName({
        isDragOver: props.isDragOver,
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
            className={className}
            role="button"
            tabIndex={0}
            onClick={props.onClick}
            onKeyDown={handleKeyDown}
            onDragOver={props.onDragOver}
            onDragLeave={props.onDragLeave}
            onDrop={props.onDrop}
            aria-label={`${props.t.dragCategorizeDropHere}: ${props.category.label}`}
        >
            {props.itemIds.map((itemId) => {
                const item = props.itemsById[itemId];

                if (!item) {
                    return null;
                }

                if (props.feedbackMode) {
                    return (
                        <DragCategorizeFeedbackCard
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
                    <DragCategorizePlacedItemCard
                        key={itemId}
                        item={item}
                        selected={props.selectedItemId === itemId}
                        onSelect={() => props.onItemSelect(itemId)}
                        onDragStart={(event) => props.onItemDragStart(event, itemId)}
                        onRemove={() => props.onItemRemove(itemId)}
                        t={props.t}
                    />
                );
            })}

            <div className="drag-categorize-empty-slot">
                {props.t.dragCategorizeDropHere}
            </div>
        </div>
    );
}

const getDropZoneClassName = ({ isDragOver, empty }) => {
    let className = "drag-categorize-drop-zone";

    if (isDragOver) {
        className += " drag-categorize-drop-zone-over";
    }

    if (empty) {
        className += " drag-categorize-drop-zone-empty";
    }

    return className;
};

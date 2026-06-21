// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/CategorySort/ItemBank/CategorySortItemBank.jsx
import MobileDroppable from "../../Shared/MobileDnd/MobileDroppable.jsx";
import CategorySortFeedbackCard from "../Feedback/CategorySortFeedbackCard.jsx";
import CategorySortItemCard from "./CategorySortItemCard.jsx";

export default function CategorySortItemBank(props) {
    if (props.feedbackMode && props.items.length === 0) {
        return null;
    }

    return (
        <aside
            className={getItemBankClassName(props.feedbackMode)}
            aria-label={props.t.dragCategorizeItemBankTitle}
        >
            <div className="drag-categorize-item-bank-title-row">
                <h2 className="drag-categorize-item-bank-title">{props.t.dragCategorizeItemBankTitle}</h2>
            </div>

            {props.feedbackMode ? (
                <div className="drag-categorize-item-list">
                    {props.items.map((item) => renderItem(props, item))}
                </div>
            ) : (
                <MobileDroppable
                    dropTargetId={props.itemBankDropTargetId}
                    acceptedDragSourceType={props.acceptedDragSourceType}
                >
                    {({ droppableRef, isDropTarget }) => (
                        <div ref={droppableRef} className={getItemListClassName(isDropTarget)}>
                            {props.itemBankItems.map((itemBankEntry) => renderItemBankEntry(props, itemBankEntry))}
                        </div>
                    )}
                </MobileDroppable>
            )}

            <p className="drag-categorize-item-bank-hint">
                {props.feedbackMode ? props.t.dragCategorizeFeedbackBankHint : props.t.dragCategorizeItemBankHint}
            </p>
        </aside>
    );
}

function renderItemBankEntry(props, itemBankEntry) {
    if (itemBankEntry.placed) {
        return (
            <CategorySortItemBankPlaceholder
                key={itemBankEntry.item.id}
                label={props.t.dragCategorizeReturnToBank}
            />
        );
    }

    return renderItem(props, itemBankEntry.item);
}

function renderItem(props, item) {
    if (props.feedbackMode) {
        return (
            <CategorySortFeedbackCard
                key={item.id}
                question={props.question}
                item={item}
                unanswered
                isExpanded={props.expandedItemId === item.id}
                onToggleExpanded={() => props.onToggleExpanded(item.id)}
                t={props.t}
            />
        );
    }

    return (
        <CategorySortItemCard
            key={item.id}
            item={item}
            selected={props.selectedItemId === item.id}
            disabled={props.disabled}
            dragSourceType={props.acceptedDragSourceType}
            onSelect={() => props.onItemSelect(item.id)}
            t={props.t}
        />
    );
}

function CategorySortItemBankPlaceholder(props) {
    return (
        <div className="drag-categorize-item-bank-placeholder" aria-hidden="true">
            {props.label}
        </div>
    );
}

const getItemBankClassName = (feedbackMode) => {
    let className = "drag-categorize-item-bank";

    if (feedbackMode) {
        className += " drag-categorize-item-bank-feedback";
    }

    return className;
};

function getItemListClassName(isDropTarget) {
    let className = "drag-categorize-item-list";

    if (isDropTarget) {
        className += " drag-categorize-item-list-over";
    }

    return className;
}

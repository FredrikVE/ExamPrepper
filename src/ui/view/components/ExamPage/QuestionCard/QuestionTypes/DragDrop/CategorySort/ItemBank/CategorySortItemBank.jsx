//src/ui/view/components/ExamPage/QuestionCard/DragDrop/CategoryItemBank/CategorySortItemBank.jsx
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
            <div className="drag-categorize-item-list">
                {props.items.map((item) => renderItem(props, item))}
            </div>
        </aside>
    );
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
            onSelect={() => props.onItemSelect(item.id)}
            onDragStart={(event) => props.onItemDragStart(event, item.id)}
            t={props.t}
        />
    );
}

const getItemBankClassName = (feedbackMode) => {
    let className = "drag-categorize-item-bank";

    if (feedbackMode) {
        className += " drag-categorize-item-bank-feedback";
    }

    return className;
};

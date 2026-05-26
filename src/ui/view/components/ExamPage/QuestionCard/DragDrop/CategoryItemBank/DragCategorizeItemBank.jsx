//src/ui/view/components/ExamPage/QuestionCard/DragDrop/CategoryItemBank/DragCategorizeItemBank.jsx
import DragCategorizeItemCard from "./DragCategorizeItemCard.jsx";

export default function DragCategorizeItemBank(props) {
    return (
        <aside
            className="drag-categorize-item-bank"
            aria-label={props.t.dragCategorizeItemBankTitle}
        >
            <div className="drag-categorize-item-list">
                {props.items.map((item) => (
                    <DragCategorizeItemCard
                        key={item.id}
                        item={item}
                        selected={props.selectedItemId === item.id}
                        disabled={props.disabled}
                        onSelect={() => props.onItemSelect(item.id)}
                        onDragStart={(event) => props.onItemDragStart(event, item.id)}
                        t={props.t}
                    />
                ))}
            </div>
        </aside>
    );
}

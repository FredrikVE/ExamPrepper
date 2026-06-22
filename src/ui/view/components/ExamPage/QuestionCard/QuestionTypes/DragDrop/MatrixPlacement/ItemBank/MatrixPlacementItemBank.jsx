// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/MatrixPlacement/ItemBank/MatrixPlacementItemBank.jsx
import Droppable from "../../Shared/Dnd/Droppable.jsx";
import MatrixPlacementFeedbackCard from "../Feedback/MatrixPlacementFeedbackCard.jsx";
import MatrixPlacementItemCard from "./MatrixPlacementItemCard.jsx";

export default function MatrixPlacementItemBank(props) {
    if (props.feedbackMode && props.items.length === 0) {
        return null;
    }

    const totalCount = props.question?.items?.length ?? 0;
    const placedCount = Math.max(totalCount - props.items.length, 0);

    return (
        <aside
            className={getItemBankClassName(props.feedbackMode)}
            aria-label={props.t.matrixPlacementItemBankTitle}
        >
            <div className="matrix-placement-item-bank-title-row">
                <h4 className="matrix-placement-item-bank-title">
                    {props.question?.itemBankTitle ?? props.t.matrixPlacementItemBankTitle}
                </h4>
                {!props.feedbackMode ? (
                    <span className="matrix-placement-placed-count">
                        {placedCount} / {totalCount} {props.t.matrixPlacementPlacedSuffix}
                    </span>
                ) : null}
            </div>

            {!props.feedbackMode ? (
                <p className="matrix-placement-item-bank-subtitle">
                    {props.question?.itemBankSubtitle ?? props.t.matrixPlacementItemBankSubtitle}
                </p>
            ) : null}

            {props.feedbackMode ? (
                <div className="matrix-placement-item-list">
                    {props.items.map((item) => renderItem(props, item))}
                </div>
            ) : (
                <Droppable
                    id={props.itemBankDropTargetId}
                    accept={props.accept}
                >
                    {({ ref: dndRef, isDropTarget }) => (
                        <div ref={dndRef} className={getItemListClassName(isDropTarget)}>
                            {props.itemBankItems.map((itemBankEntry) => renderItemBankEntry(props, itemBankEntry))}
                        </div>
                    )}
                </Droppable>
            )}

            {!props.feedbackMode ? (
                <p className="matrix-placement-item-bank-hint">
                    {props.question?.itemBankHint ?? props.t.matrixPlacementItemBankHint}
                </p>
            ) : null}
        </aside>
    );
}

function renderItemBankEntry(props, itemBankEntry) {
    if (itemBankEntry.placed) {
        return (
            <MatrixPlacementItemBankPlaceholder
                key={itemBankEntry.item.id}
                label={props.t.matrixPlacementReturnToBank}
            />
        );
    }

    return renderItem(props, itemBankEntry.item);
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
        <MatrixPlacementItemCard
            key={item.id}
            item={item}
            selected={props.selectedItemId === item.id}
            disabled={props.disabled}
            type={props.accept}
            onSelect={() => props.onItemSelect(item.id)}
            t={props.t}
        />
    );
}

function MatrixPlacementItemBankPlaceholder(props) {
    return (
        <div className="matrix-placement-item-bank-placeholder" aria-hidden="true">
            {props.label}
        </div>
    );
}

function getItemBankClassName(feedbackMode) {
    let className = "matrix-placement-item-bank";

    if (feedbackMode) {
        className += " matrix-placement-item-bank-feedback";
    }

    return className;
}

function getItemListClassName(isDropTarget) {
    let className = "matrix-placement-item-list";

    if (isDropTarget) {
        className += " matrix-placement-item-list-over";
    }

    return className;
}

// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/TableMatch/AnswerTable/TableMatchAnswerSlot.jsx
import { ChevronDown } from "lucide-react";
import FormattedText from "../../../../../../Shared/FormattedText.jsx";
import ClearButton from "../../Shared/Dnd/ClearButton.jsx";
import Draggable from "../../Shared/Dnd/Draggable.jsx";
import DragGrip from "../../Shared/Dnd/DragGrip.jsx";
import Droppable from "../../Shared/Dnd/Droppable.jsx";

export default function TableMatchAnswerSlot(props) {
    return (
        <Droppable
            id={props.target.id}
            accept={props.dndType}
            data={{ target: props.target }}
        >
            {({ ref: dndRef, isDropTarget }) => (
                <TableMatchAnswerSlotContent
                    {...props}
                    dndRef={dndRef}
                    isDropTarget={isDropTarget}
                />
            )}
        </Droppable>
    );
}

function TableMatchAnswerSlotContent(props) {
    const className = getAnswerSlotClassName({
        hasSelectedCard: Boolean(props.selectedCard),
        isDragOver: props.isDropTarget
    });

    const selectedValue = props.selectedCardId ?? "";
    const ariaLabel = `${props.t.dragDropDropHere}: ${props.target.description}`;

    const handleKeyDown = (event) => {
        const userPressedEnter = event.key === "Enter";
        const userPressedSpace = event.key === " ";

        if (!userPressedEnter && !userPressedSpace) {
            return;
        }

        event.preventDefault();
        props.onClick();
    };

    const handleSelectClick = (event) => {
        event.stopPropagation();
    };

    const handleSelectChange = (event) => {
        props.onSelectChange(event.target.value);
    };

    let answerContent;

    if (props.selectedCard) {
        answerContent = (
            <SelectedAnswerPill
                selectedCard={props.selectedCard}
                dndType={props.dndType}
                sourceTargetId={props.target.id}
                onClear={props.onClear}
                clearLabel={props.t.dragDropClearAnswer}
            />
        );
    } else {
        answerContent = (
            <EmptyAnswerPlaceholder label={props.t.dragDropDropHere} />
        );
    }

    return (
        <div
            ref={props.dndRef}
            className={className}
            role="button"
            tabIndex={0}
            onClick={props.onClick}
            onKeyDown={handleKeyDown}
            aria-label={ariaLabel}
        >
            {answerContent}

            <AnswerSelect
                cards={props.cards}
                value={selectedValue}
                placeholder={props.t.dragDropSelectPlaceholder}
                label={props.t.dragDropSelectAnswer}
                onClick={handleSelectClick}
                onChange={handleSelectChange}
            />
        </div>
    );
}

const SelectedAnswerPill = ({ selectedCard, dndType, sourceTargetId, onClear, clearLabel }) => {
    return (
        <Draggable
            id={selectedCard.id}
            type={dndType}
            data={{ card: selectedCard, sourceTargetId }}
        >
            {({ ref: dndRef }) => (
                <div
                    ref={dndRef}
                    className="drag-drop-selected-pill"
                >
                    <span className="drag-drop-selected-pill-text">
                        <FormattedText text={selectedCard.text} />
                    </span>

                    <DragGrip className="drag-drop-selected-pill-grip" />

                    <ClearButton
                        className="drag-drop-clear-button"
                        label={clearLabel}
                        onClear={onClear}
                    />
                </div>
            )}
        </Draggable>
    );
};

const EmptyAnswerPlaceholder = ({ label }) => {
    return (
        <span className="drag-drop-placeholder">
            {label}
        </span>
    );
};

const AnswerSelect = ({ cards, value, placeholder, label, onClick, onChange }) => {
    return (
        <label className="drag-drop-select-label">
            <span className="sr-only">{label}</span>

            <select
                className="drag-drop-select"
                value={value}
                onClick={onClick}
                onChange={onChange}
            >
                <option value="">{placeholder}</option>

                {cards.map((card) => (
                    <option key={card.id} value={card.id}>
                        {card.text}
                    </option>
                ))}
            </select>

            <ChevronDown className="drag-drop-select-icon" aria-hidden="true" />
        </label>
    );
};

const getAnswerSlotClassName = ({ hasSelectedCard, isDragOver }) => {
    let className = "drag-drop-target";

    if (hasSelectedCard) {
        className += " drag-drop-target-filled";
    } else {
        className += " drag-drop-target-empty";
    }

    if (isDragOver) {
        className += " drag-drop-target-over";
    }

    return className;
};

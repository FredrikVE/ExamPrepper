// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/SequenceOrder/ItemBank/SequenceOrderItemCard.jsx
import { getSequenceItemLabel } from "../Utils/sequenceOrderAnswerLogic.js";
import Draggable from "../../Shared/Dnd/Draggable.jsx";
import FormattedText from "../../../../../../Shared/FormattedText.jsx";
import DragGrip from "../../Shared/Dnd/DragGrip.jsx";

export default function SequenceOrderItemCard(props) {
    return (
        <Draggable
            id={props.sequenceItem.id}
            type={props.type}
            data={{ sequenceItem: props.sequenceItem, sourceIndex: null }}
            disabled={props.disabled}
        >
            {({ ref: dndRef, handleRef, isDragging }) => {
                const className = getItemCardClassName({
                    selected: props.selected,
                    disabled: props.disabled,
                    isDragging
                });

                return (
                    <button
                        ref={dndRef}
                        type="button"
                        className={className}
                        onClick={selectItem(props)}
                        disabled={props.disabled}
                    >
                        <span className="sequence-order-item-card-text">
                            <FormattedText text={getSequenceItemLabel(props.sequenceItem)} />
                        </span>

                        <DragGrip handleRef={handleRef} className="sequence-order-item-card-grip" />
                    </button>
                );
            }}
        </Draggable>
    );
}

const selectItem = (props) => {
    return () => {
        if (props.disabled) {
            return;
        }

        props.onSequenceItemSelect(props.sequenceItem.id);
    };
};

function getItemCardClassName({ selected, disabled, isDragging }) {
    let className = "sequence-order-item-card";

    if (selected) {
        className += " sequence-order-item-card-selected";
    }

    if (disabled) {
        className += " sequence-order-item-card-disabled";
    }

    if (isDragging) {
        className += " sequence-order-item-card-dragging";
    }

    return className;
}


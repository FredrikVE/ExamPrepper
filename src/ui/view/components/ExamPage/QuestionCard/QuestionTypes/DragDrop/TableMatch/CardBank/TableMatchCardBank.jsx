// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/TableMatch/CardBank/TableMatchCardBank.jsx
import { Info } from "lucide-react";
import FormattedText from "../../../../../../Shared/FormattedText.jsx";
import Draggable from "../../Shared/Dnd/Draggable.jsx";
import DragGrip from "../../Shared/Dnd/DragGrip.jsx";

export default function TableMatchCardBank(props) {
    const cardButtons = [];

    for (const card of props.cards) {
        const isSelected = props.selectedCardId === card.id;

        cardButtons.push(
            <Draggable
                key={card.id}
                id={card.id}
                type={props.dndType}
                data={{ card, sourceTargetId: null }}
            >
                {({ ref: dndRef }) => {
                    let className = "drag-drop-card";

                    if (isSelected) {
                        className += " drag-drop-card-selected";
                    }

                    return (
                        <button
                            ref={dndRef}
                            type="button"
                            className={className}
                            onClick={() => props.onCardSelect(card.id)}
                        >
                            <span className="drag-drop-card-text">
                                <FormattedText text={card.text} />
                            </span>

                            <DragGrip className="drag-drop-card-grip" />
                        </button>
                    );
                }}
            </Draggable>
        );
    }

    return (
        <aside
            className="drag-drop-card-bank"
            aria-label={props.t.dragDropCardBankTitle}
        >
            <div className="drag-drop-card-bank-title-row">
                <h4 className="drag-drop-card-bank-title">
                    {props.t.dragDropCardBankTitle}
                </h4>

                <Info className="drag-drop-card-bank-icon" aria-hidden="true" />
            </div>

            <div className="drag-drop-card-list">
                {cardButtons}
            </div>

            <p className="drag-drop-card-bank-hint">
                {props.t.dragDropCardBankHint}
            </p>
        </aside>
    );
}

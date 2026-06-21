// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/TableMatch/CardBank/TableMatchCardBank.jsx
import { Info } from "lucide-react";
import FormattedText from "../../../../../../Shared/FormattedText.jsx";

export default function TableMatchCardBank(props) {
    const cardButtons = [];

    for (const card of props.cards) {
        const isSelected = props.selectedCardId === card.id;

        let className = "drag-drop-card";

        if (isSelected) {
            className += " drag-drop-card-selected";
        }

        cardButtons.push(
            <button
                key={card.id}
                type="button"
                className={className}
                draggable
                onClick={() => props.onCardSelect(card.id)}
                onDragStart={(event) => props.onCardDragStart(event, card.id)}
            >
                <span className="drag-drop-card-text">
                    <FormattedText text={card.text} />
                </span>

                <DesktopGripHandle />
            </button>
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
const DesktopGripHandle = () => {
    return (
        <span className="drag-drop-card-grip" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
        </span>
    );
};

// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/TableMatch/AnswerTable/TableMatchAnswerTable.jsx
import TableMatchAnswerRow from "./TableMatchAnswerRow.jsx";

export default function TableMatchAnswerTable(props) {
    const targets = Array.isArray(props.question?.targets)
        ? props.question.targets
        : [];

    const cards = Array.isArray(props.question?.cards)
        ? props.question.cards
        : [];

    return (
        <div className="drag-drop-table-wrap">
            <table className="drag-drop-table">
                <thead>
                    <tr>
                        <th className="drag-drop-number-col">#</th>
                        <th>{props.t.dragDropDescriptionHeader}</th>
                        <th>{props.t.dragDropAnswerHeader}</th>
                    </tr>
                </thead>

                <tbody>
                    {targets.map((target, index) => {
                        const selectedCardId = props.safeAnswer[target.id];

                        return (
                            <TableMatchAnswerRow
                                key={target.id}
                                target={target}
                                index={index}
                                selectedCardId={selectedCardId}
                                selectedCard={props.cardsById[selectedCardId]}
                                isDragOver={props.dragOverTargetId === target.id}
                                isExpanded={props.expandedTargetId === target.id}
                                feedbackMode={props.feedbackMode}
                                cards={cards}
                                onTargetClick={props.onTargetClick}
                                onTargetDragOver={props.onTargetDragOver}
                                onTargetDragLeave={props.onTargetDragLeave}
                                onTargetDrop={props.onTargetDrop}
                                onCardDragStart={props.onCardDragStart}
                                onClearTarget={props.onClearTarget}
                                onSelectChange={props.onSelectChange}
                                onToggleExpanded={props.onToggleExpanded}
                                t={props.t}
                            />
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
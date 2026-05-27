//src/ui/view/components/ExamPage/QuestionCard/DragDrop/AnswerTable/TableMatchAnswerRow.jsx
import TableMatchFeedbackCard from "../Feedback/TableMatchFeedbackCard.jsx";
import { isTargetCorrect } from "../Utils/tableMatchAnswerLogic.js";
import TableMatchAnswerSlot from "./TableMatchAnswerSlot.jsx";

export default function TableMatchAnswerRow(props) {
    const targetIsCorrect = isTargetCorrect(
        props.target,
        props.selectedCardId
    );

    const targetIsAnswered = Boolean(props.selectedCardId);

    let answerCellContent;

    if (props.feedbackMode) {
        answerCellContent = (
            <TableMatchFeedbackCard
                target={props.target}
                selectedCard={props.selectedCard}
                targetIsAnswered={targetIsAnswered}
                targetIsCorrect={targetIsCorrect}
                isExpanded={props.isExpanded}
                onToggleExpanded={() => props.onToggleExpanded(props.target.id)}
                t={props.t}
            />
        );
    } else {
        answerCellContent = (
            <TableMatchAnswerSlot
                target={props.target}
                selectedCard={props.selectedCard}
                selectedCardId={props.selectedCardId}
                isDragOver={props.isDragOver}
                onClick={() => props.onTargetClick(props.target.id)}
                onDragOver={(event) => props.onTargetDragOver(event, props.target.id)}
                onDragLeave={props.onTargetDragLeave}
                onDrop={(event) => props.onTargetDrop(event, props.target.id)}
                onClear={() => props.onClearTarget(props.target.id)}
                onSelectChange={(value) => props.onSelectChange(props.target.id, value)}
                cards={props.cards}
                t={props.t}
            />
        );
    }

    return (
        <tr>
            <td className="drag-drop-number-col">
                <span className="drag-drop-row-number">
                    {props.index + 1}
                </span>
            </td>

            <td className="drag-drop-description-cell">
                {props.target.description}
            </td>

            <td className="drag-drop-answer-cell">
                {answerCellContent}
            </td>
        </tr>
    );
}
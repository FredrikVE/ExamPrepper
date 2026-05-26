//src/ui/view/components/ExamPage/QuestionCard/DragDrop/AnswerTable/DragDropAnswerRow.jsx
import DragDropFeedbackCard from "../Feedback/DragDropFeedbackCard.jsx";
import { isTargetCorrect } from "../Logic/dragDropAnswerLogic.js";
import DragDropAnswerSlot from "./DragDropAnswerSlot.jsx";

export default function DragDropAnswerRow(props) {
    const targetIsCorrect = isTargetCorrect(
        props.target,
        props.selectedCardId
    );

    const targetIsAnswered = Boolean(props.selectedCardId);

    let answerCellContent;

    if (props.feedbackMode) {
        answerCellContent = (
            <DragDropFeedbackCard
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
            <DragDropAnswerSlot
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
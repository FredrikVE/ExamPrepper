// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/SequenceOrder/Question/SequenceOrderQuestion.jsx
import SequenceOrderBoard from "../Board/SequenceOrderBoard.jsx";
import SequenceOrderFeedbackPanel from "../Feedback/SequenceOrderFeedbackPanel.jsx";
import SequenceOrderItemBank from "../ItemBank/SequenceOrderItemBank.jsx";
import TableMatchScoreSummary from "../../TableMatch/Feedback/TableMatchScoreSummary.jsx";
import { useSequenceOrderQuestion } from "./useSequenceOrderQuestion.js";

export { getSequenceOrderStats } from "../Utils/sequenceOrderFeedbackStats.js";

export default function SequenceOrderQuestion(props) {
    const sequenceOrder = useSequenceOrderQuestion(props);

    return (
        <div className={sequenceOrder.rootClassName}>
            {sequenceOrder.feedbackMode ? (
                <TableMatchScoreSummary stats={sequenceOrder.stats} t={props.t} />
            ) : null}

            {!sequenceOrder.feedbackMode ? (
                <>
                    <SequenceOrderItemBank
                        sequenceItems={sequenceOrder.availableSequenceItems}
                        feedbackMode={sequenceOrder.feedbackMode}
                        selectedSequenceItemId={sequenceOrder.selectedSequenceItemId}
                        disabled={sequenceOrder.feedbackMode}
                        onSequenceItemSelect={sequenceOrder.selectSequenceItem}
                        onSequenceItemDragStart={sequenceOrder.startSequenceItemDrag}
                        t={props.t}
                    />

                    <SequenceOrderBoard
                        safeAnswer={sequenceOrder.safeAnswer}
                        sequenceItemsById={sequenceOrder.sequenceItemsById}
                        feedbackMode={sequenceOrder.feedbackMode}
                        selectedSequenceItemId={sequenceOrder.selectedSequenceItemId}
                        dragOverIndex={sequenceOrder.dragOverIndex}
                        onDropZoneClick={sequenceOrder.selectDropZone}
                        onDropZoneDragOver={sequenceOrder.markDropZoneOver}
                        onDropZoneDragLeave={sequenceOrder.clearDragOverIndex}
                        onDropZoneDrop={sequenceOrder.dropSequenceItemInZone}
                        onSequenceItemDragStart={sequenceOrder.startSequenceItemDrag}
                        onSequenceItemRemove={sequenceOrder.removeSequenceItemFromAnswer}
                        t={props.t}
                    />
                </>
            ) : (
                <SequenceOrderFeedbackPanel
                    question={props.question}
                    safeAnswer={sequenceOrder.safeAnswer}
                    correctOrder={sequenceOrder.correctOrder}
                    sequenceItemsById={sequenceOrder.sequenceItemsById}
                    expandedSlotIndex={sequenceOrder.expandedSlotIndex}
                    questionExplanationExpanded={sequenceOrder.questionExplanationExpanded}
                    onToggleSlotExpanded={sequenceOrder.toggleSlotExpanded}
                    onToggleQuestionExplanation={sequenceOrder.toggleQuestionExplanation}
                    t={props.t}
                />
            )}
        </div>
    );
}

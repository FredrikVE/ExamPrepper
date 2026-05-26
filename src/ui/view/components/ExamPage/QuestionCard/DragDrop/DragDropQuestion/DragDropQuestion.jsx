//src/ui/view/components/ExamPage/QuestionCard/DragDrop/DragDropQuestion/DragDropQuestion.jsx
import DragDropAnswerTable from "../AnswerTable/DragDropAnswerTable.jsx";
import DragDropCardBank from "../CardBank/DragDropCardBank.jsx";
import DragDropScoreSummary from "../Feedback/DragDropScoreSummary.jsx";
import { useDragDropQuestion } from "./useDragDropQuestion.js";

export { getDragDropStats } from "../Logic/dragDropFeedbackStats.js";

export default function DragDropQuestion(props) {
    const { question, t } = props;
    const dragDrop = useDragDropQuestion(props);

    return (
        <div className={dragDrop.rootClassName}>
            {dragDrop.feedbackMode ? (
                <DragDropScoreSummary stats={dragDrop.stats} t={t} />
            ) : null}

            <div className="drag-drop-layout">
                {!dragDrop.feedbackMode ? (
                    <DragDropCardBank
                        cards={dragDrop.availableCards}
                        selectedCardId={dragDrop.selectedCardId}
                        onCardSelect={dragDrop.handleCardSelect}
                        onCardDragStart={dragDrop.handleCardDragStart}
                        t={t}
                    />
                ) : null}

                <DragDropAnswerTable
                    question={question}
                    safeAnswer={dragDrop.safeAnswer}
                    cardsById={dragDrop.cardsById}
                    feedbackMode={dragDrop.feedbackMode}
                    dragOverTargetId={dragDrop.dragOverTargetId}
                    expandedTargetId={dragDrop.expandedTargetId}
                    onTargetClick={dragDrop.handleTargetClick}
                    onTargetDragOver={dragDrop.handleTargetDragOver}
                    onTargetDragLeave={dragDrop.handleTargetDragLeave}
                    onTargetDrop={dragDrop.handleTargetDrop}
                    onClearTarget={dragDrop.clearTarget}
                    onSelectChange={dragDrop.handleSelectChange}
                    onToggleExpanded={dragDrop.toggleExpanded}
                    t={t}
                />
            </div>
        </div>
    );
}

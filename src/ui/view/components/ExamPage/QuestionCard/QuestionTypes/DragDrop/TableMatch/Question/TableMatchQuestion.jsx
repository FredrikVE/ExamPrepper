// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/TableMatch/Question/TableMatchQuestion.jsx
import TableMatchAnswerTable from "../AnswerTable/TableMatchAnswerTable.jsx";
import TableMatchCardBank from "../CardBank/TableMatchCardBank.jsx";
import TableMatchScoreSummary from "../Feedback/TableMatchScoreSummary.jsx";
import TableMatchMobileBoard from "../Mobile/TableMatchMobileBoard.jsx";
import { useTableMatchQuestion } from "./useTableMatchQuestion.js";

export { getTableMatchStats } from "../Utils/tableMatchFeedbackStats.js";

export default function TableMatchQuestion(props) {
    const { question, t } = props;
    const tableMatch = useTableMatchQuestion(props);

    return (
        <div className={tableMatch.rootClassName}>
            {tableMatch.feedbackMode ? (
                <TableMatchScoreSummary stats={tableMatch.stats} t={t} />
            ) : null}

            <div className="drag-drop-layout table-match-desktop-board">
                {!tableMatch.feedbackMode ? (
                    <TableMatchCardBank
                        cards={tableMatch.availableCards}
                        selectedCardId={tableMatch.selectedCardId}
                        onCardSelect={tableMatch.handleCardSelect}
                        onCardDragStart={tableMatch.handleCardDragStart}
                        t={t}
                    />
                ) : null}

                <TableMatchAnswerTable
                    question={question}
                    safeAnswer={tableMatch.safeAnswer}
                    cardsById={tableMatch.cardsById}
                    feedbackMode={tableMatch.feedbackMode}
                    dragOverTargetId={tableMatch.dragOverTargetId}
                    expandedTargetId={tableMatch.expandedTargetId}
                    onTargetClick={tableMatch.handleTargetClick}
                    onTargetDragOver={tableMatch.handleTargetDragOver}
                    onTargetDragLeave={tableMatch.handleTargetDragLeave}
                    onTargetDrop={tableMatch.handleTargetDrop}
                    onCardDragStart={tableMatch.handleCardDragStart}
                    onClearTarget={tableMatch.clearTarget}
                    onSelectChange={tableMatch.handleSelectChange}
                    onToggleExpanded={tableMatch.toggleExpanded}
                    t={t}
                />
            </div>

            {!tableMatch.feedbackMode ? (
                <TableMatchMobileBoard
                    question={question}
                    cards={tableMatch.availableCards}
                    safeAnswer={tableMatch.safeAnswer}
                    cardsById={tableMatch.cardsById}
                    selectedCardId={tableMatch.selectedCardId}
                    onCardSelect={tableMatch.handleCardSelect}
                    onTargetClick={tableMatch.handleTargetClick}
                    onCardDrop={tableMatch.assignCard}
                    onClearTarget={tableMatch.clearTarget}
                    t={t}
                />
            ) : null}
        </div>
    );
}

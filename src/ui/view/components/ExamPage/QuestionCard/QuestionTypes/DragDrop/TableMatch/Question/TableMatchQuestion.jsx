// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/TableMatch/Question/TableMatchQuestion.jsx
import FormattedText from "../../../../../../Shared/FormattedText.jsx";
import DragGrip from "../../Shared/Dnd/DragGrip.jsx";
import DragOverlay from "../../Shared/Dnd/DragOverlay.jsx";
import DndProvider from "../../Shared/Dnd/DndProvider.jsx";
import TableMatchAnswerTable from "../AnswerTable/TableMatchAnswerTable.jsx";
import TableMatchCardBank from "../CardBank/TableMatchCardBank.jsx";
import TableMatchScoreSummary from "../Feedback/TableMatchScoreSummary.jsx";
import TableMatchMobileBoard from "../Mobile/TableMatchMobileBoard.jsx";
import { useTableMatchQuestion } from "./useTableMatchQuestion.js";

const TABLE_MATCH_DESKTOP_CARD_TYPE = "table-match-desktop-card";

export { getTableMatchStats } from "../Utils/tableMatchFeedbackStats.js";

export default function TableMatchQuestion(props) {
    const { question, t } = props;
    const tableMatch = useTableMatchQuestion(props);

    return (
        <div className={tableMatch.rootClassName}>
            {tableMatch.feedbackMode ? (
                <TableMatchScoreSummary stats={tableMatch.stats} t={t} />
            ) : null}

            <DndProvider onDrop={tableMatch.handleDndDrop}>
                <div className="drag-drop-layout table-match-desktop-board">
                    {!tableMatch.feedbackMode ? (
                        <TableMatchCardBank
                            cards={tableMatch.availableCards}
                            dndType={TABLE_MATCH_DESKTOP_CARD_TYPE}
                            selectedCardId={tableMatch.selectedCardId}
                            onCardSelect={tableMatch.handleCardSelect}
                            t={t}
                        />
                    ) : null}

                    <TableMatchAnswerTable
                        question={question}
                        dndType={TABLE_MATCH_DESKTOP_CARD_TYPE}
                        safeAnswer={tableMatch.safeAnswer}
                        cardsById={tableMatch.cardsById}
                        feedbackMode={tableMatch.feedbackMode}
                        expandedTargetId={tableMatch.expandedTargetId}
                        onTargetClick={tableMatch.handleTargetClick}
                        onClearTarget={tableMatch.clearTarget}
                        onSelectChange={tableMatch.handleSelectChange}
                        onToggleExpanded={tableMatch.toggleExpanded}
                        t={t}
                    />
                </div>

                <DragOverlay>
                    {({ sourceData }) => {
                        if (!sourceData?.card) {
                            return null;
                        }

                        return <TableMatchDesktopDragOverlayCard card={sourceData.card} />;
                    }}
                </DragOverlay>
            </DndProvider>

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

const TableMatchDesktopDragOverlayCard = ({ card }) => {
    return (
        <div className="drag-drop-card drag-drop-card-overlay">
            <span className="drag-drop-card-text">
                <FormattedText text={card.text} />
            </span>

            <DragGrip className="drag-drop-card-grip" />
        </div>
    );
};

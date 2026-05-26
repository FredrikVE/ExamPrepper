//src/ui/view/components/ExamPage/QuestionCard/DragDrop/Feedback/DragDropScoreSummary.jsx
export default function DragDropScoreSummary(props) {
    let title = props.t.feedbackCorrectLabel;

    if (props.stats.wrong > 0 || props.stats.unanswered > 0) {
        title = props.t.dragDropPartlyCorrect;
    }

    return (
        <div className="drag-drop-summary" aria-label={props.t.dragDropSummaryTitle}>
            <h4>{title}</h4>

            <div className="drag-drop-summary-metrics">
                <div className="drag-drop-summary-metric drag-drop-summary-metric-correct">
                    <strong>{props.stats.correct}</strong>
                    <span>{props.t.dragDropCorrectShort}</span>
                </div>

                <div className="drag-drop-summary-divider" />

                <div className="drag-drop-summary-metric drag-drop-summary-metric-wrong">
                    <strong>{props.stats.wrong}</strong>
                    <span>{props.t.dragDropWrongShort}</span>
                </div>

                <div className="drag-drop-summary-divider" />

                <div className="drag-drop-summary-metric">
                    <strong>{props.stats.unanswered}</strong>
                    <span>{props.t.dragDropUnansweredShort}</span>
                </div>
            </div>
        </div>
    );
}
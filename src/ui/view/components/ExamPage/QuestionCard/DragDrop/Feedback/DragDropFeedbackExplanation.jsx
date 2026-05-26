//src/ui/view/components/ExamPage/QuestionCard/DragDrop/Feedback/DragDropFeedbackExplanation.jsx
export default function DragDropFeedbackExplanation(props) {
    let reasonContent = null;

    if (props.reason) {
        reasonContent = (
            <p className="drag-drop-feedback-reason">
                {props.reason}
            </p>
        );
    }

    let correctAnswerContent = null;

    if (props.showCorrectAnswer) {
        correctAnswerContent = (
            <p className="drag-drop-feedback-correct-answer">
                {props.correctAnswerPrefix}: <strong>{props.correctAnswerLabel}</strong>
            </p>
        );
    }

    let extendedPointsContent = null;

    if (props.extendedPoints.length > 0) {
        extendedPointsContent = (
            <ul className="drag-drop-feedback-extended-list">
                {props.extendedPoints.map((point, index) => (
                    <li key={index}>
                        {point}
                    </li>
                ))}
            </ul>
        );
    }

    return (
        <div className="drag-drop-feedback-explanation">
            {reasonContent}
            {correctAnswerContent}
            {extendedPointsContent}
        </div>
    );
}
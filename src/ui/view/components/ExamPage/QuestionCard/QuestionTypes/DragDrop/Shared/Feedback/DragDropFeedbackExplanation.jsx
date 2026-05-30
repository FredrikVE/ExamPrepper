// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/Shared/Feedback/DragDropFeedbackExplanation.jsx
import FormattedText from "../../../../../../Shared/FormattedText.jsx";
export default function DragDropFeedbackExplanation(props) {
    const images = Array.isArray(props.images) ? props.images : [];
    let reasonContent = null;

    if (props.reason) {
        reasonContent = (
            <p className="drag-drop-feedback-reason">
                <FormattedText text={props.reason} />
            </p>
        );
    }

    let correctAnswerContent = null;

    if (props.showCorrectAnswer) {
        correctAnswerContent = (
            <p className="drag-drop-feedback-correct-answer">
                {props.correctAnswerPrefix}: <strong><FormattedText text={props.correctAnswerLabel} /></strong>
            </p>
        );
    }

    let extendedPointsContent = null;

    if (props.extendedPoints.length > 0) {
        extendedPointsContent = (
            <ul className="drag-drop-feedback-extended-list">
                {props.extendedPoints.map((point, index) => (
                    <li key={index}>
                        <FormattedText text={point} />
                    </li>
                ))}
            </ul>
        );
    }

    let imagesContent = null;

    if (images.length > 0) {
        imagesContent = (
            <div className="question-card-answer-extended-images drag-drop-feedback-extended-images">
                {images.map((image) => (
                    <figure
                        key={image.id ?? image.src}
                        className="question-card-answer-extended-figure drag-drop-feedback-extended-figure"
                    >
                        {image.title ? (
                            <figcaption className="question-card-answer-extended-figure-title">
                                {image.title}
                            </figcaption>
                        ) : null}

                        <img
                            className="question-card-answer-extended-image"
                            src={image.src}
                            alt={image.alt ?? ""}
                            loading="lazy"
                            decoding="async"
                        />

                        {image.caption ? (
                            <p className="question-card-answer-extended-figure-caption">
                                {image.caption}
                            </p>
                        ) : null}
                    </figure>
                ))}
            </div>
        );
    }

    return (
        <div className="drag-drop-feedback-explanation">
            {reasonContent}
            {correctAnswerContent}
            {extendedPointsContent}
            {imagesContent}
        </div>
    );
}

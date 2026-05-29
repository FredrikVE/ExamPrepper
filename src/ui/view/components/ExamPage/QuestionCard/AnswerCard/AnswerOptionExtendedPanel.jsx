// src/ui/view/components/ExamPage/QuestionCard/AnswerCard/AnswerOptionExtendedPanel.jsx
import { Info } from "lucide-react";

export default function AnswerOptionExtendedPanel({ expandedId, points, images = [], t }) {
    const hasPoints = points.length > 0;
    const hasImages = images.length > 0;

    return (
        <div
            id={expandedId}
            className="question-card-answer-extended"
        >
            <div className="question-card-answer-extended-title-row">
                <Info className="question-card-answer-extended-title-icon" />

                <h5 className="question-card-answer-extended-title">
                    {t?.feedbackExtendedLabel ?? "Utvidet forklaring"}
                </h5>
            </div>

            <div className="question-card-answer-extended-divider" />

            {hasPoints ? (
                <ul className="question-card-answer-extended-list">
                    {points.map((point, pointIndex) => (
                        <li key={pointIndex}>
                            {point}
                        </li>
                    ))}
                </ul>
            ) : null}

            {hasImages ? (
                <div className="question-card-answer-extended-images">
                    {images.map((image) => (
                        <figure
                            key={image.id ?? image.src}
                            className={`question-card-answer-extended-figure ${
                                hasPoints
                                    ? ""
                                    : "question-card-answer-extended-figure-first"
                            }`}
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
            ) : null}
        </div>
    );
}

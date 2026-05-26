//src/ui/view/components/ExamPage/QuestionCard/AnswerCard/AnswerOptionExtendedPanel.jsx
import { Info } from "lucide-react";

export default function AnswerOptionExtendedPanel({ expandedId, points, t }) {
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

            <ul className="question-card-answer-extended-list">
                {points.map((point, pointIndex) => (
                    <li key={pointIndex}>
                        {point}
                    </li>
                ))}
            </ul>
        </div>
    );
}
// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/FillBlankInputField/FillBlankInputFieldMeta.jsx
import { Info } from "lucide-react";
import { QUESTION_CONFIG } from "../../../../../../../constants/QuestionConfig.js";

export default function FillBlankInputFieldMeta({ answerLength, className = "", t }) {
    return (
        <div className={`question-card-input-meta ${className}`.trim()}>
            <span className="question-card-input-rule">
                <Info />
                {t.questionInputRule}
            </span>

            <span className="question-card-character-count">
                {t.questionCharacterCount(answerLength, QUESTION_CONFIG.FILL_MAX_LENGTH)}
            </span>
        </div>
    );
}

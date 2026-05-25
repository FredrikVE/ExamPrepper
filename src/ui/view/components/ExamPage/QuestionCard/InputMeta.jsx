import { Info } from "lucide-react";
import { FILL_MAX_LENGTH } from "./constants.js";

export default function InputMeta({ answerLength, className = "", t }) {
    return (
        <div className={`question-card-input-meta ${className}`.trim()}>
            <span className="question-card-input-rule">
                <Info />
                {t.questionInputRule}
            </span>

            <span className="question-card-character-count">
                {t.questionCharacterCount(answerLength, FILL_MAX_LENGTH)}
            </span>
        </div>
    );
}

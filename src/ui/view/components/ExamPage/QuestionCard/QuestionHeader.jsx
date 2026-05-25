import ResultBadge from "../ResultBadge.jsx";
import { getQuestionTypeLabel } from "./questionCardUtils.js";

export default function QuestionHeader({ question, submitted, correct, t }) {
    return (
        <div className="question-card-header">
            <div className="question-card-heading">
                <div className="question-card-meta">
                    <span className="question-card-number">{question.id}</span>
                    <span>
                        {t.questionMeta(
                            question.id,
                            question.points,
                            getQuestionTypeLabel(question.type, t)
                        )}
                    </span>
                </div>

                <div className="question-card-title-row">
                    <h3 className="question-card-title">
                        {question.title}
                    </h3>
                </div>
            </div>

            {submitted ? <ResultBadge correct={correct} /> : null}
        </div>
    );
}

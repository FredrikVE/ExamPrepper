// src/ui/view/components/ExamPage/QuestionCard/Shared/QuestionHeader/QuestionHeader.jsx
import { QUESTION_TYPES } from "../../../../../../../constants/QuestionTypes.js";
import ResultBadge from "../../../ResultBadge/ResultBadge.jsx";

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

function getQuestionTypeLabel(type, t) {
    if (type === QUESTION_TYPES.FILL) return t.questionTypeFill;
    if (type === QUESTION_TYPES.MULTI) return t.questionTypeMulti;
    if (type === QUESTION_TYPES.DRAG_DROP) return t.questionTypeDragDrop;
    if (type === QUESTION_TYPES.DRAG_CATEGORIZE) return t.questionTypeDragCategorize;
    if (type === QUESTION_TYPES.MATRIX_PLACEMENT) return t.questionTypeMatrixPlacement;
    return t.questionTypeSingle;
}

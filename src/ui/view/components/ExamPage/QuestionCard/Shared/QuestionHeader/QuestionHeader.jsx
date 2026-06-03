// src/ui/view/components/ExamPage/QuestionCard/Shared/QuestionHeader/QuestionHeader.jsx
import { getQuestionTypeLabel } from "../../../../../../viewmodel/Utils/questionCardViewState.js";
import ResultBadge from "../../../ResultBadge/ResultBadge.jsx";
import FormattedText from "../../../../Shared/FormattedText.jsx";

export default function QuestionHeader({ question, questionNumber, submitted, correct, t }) {
    return (
        <div className="question-card-header">
            <div className="question-card-heading">
                <div className="question-card-meta">
                    <span className="question-card-number">{questionNumber}</span>
                    <span>
                        {t.questionMeta(
                            questionNumber,
                            question.points,
                            getQuestionTypeLabel(question.type, t)
                        )}
                    </span>
                </div>

                <div className="question-card-title-row">
                    <h3 className="question-card-title">
                        <FormattedText text={question.title} />
                    </h3>
                </div>
            </div>

            {submitted ? <ResultBadge correct={correct} /> : null}
        </div>
    );
}

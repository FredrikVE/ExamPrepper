// src/ui/view/components/ExamPage/QuestionCard/Shared/Prompt/PromptSection.jsx
import FillBlankInputFieldMeta from "../../QuestionTypes/FillBlankInputField/FillBlankInputFieldMeta.jsx";
import FillBlankInputFieldPrompt from "../../QuestionTypes/FillBlankInputField/FillBlankInputFieldPrompt.jsx";
import FormattedText from "../../../../Shared/FormattedText.jsx";

export default function PromptSection({ question, answerText, submitted, correct, hasInlineFillBlank, onSingleAnswer, t }) {
    if (!hasInlineFillBlank) {
        return (
            <p className="question-card-prompt">
                <FormattedText text={question.prompt} />
            </p>
        );
    }

    return (
        <div className="question-card-inline-answer-block">
            <p className="question-card-prompt question-card-prompt-inline">
                <FillBlankInputFieldPrompt
                    question={question}
                    answerText={answerText}
                    submitted={submitted}
                    correct={correct}
                    onSingleAnswer={onSingleAnswer}
                    t={t}
                />
            </p>

            <FillBlankInputFieldMeta
                answerLength={answerText.length}
                className="question-card-inline-input-meta"
                t={t}
            />
        </div>
    );
}
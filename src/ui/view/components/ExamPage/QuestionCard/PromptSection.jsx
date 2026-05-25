// src/ui/view/components/ExamPage/QuestionCard/PromptSection.jsx
import InputMeta from "./InputMeta.jsx";
import PromptWithInlineAnswer from "./PromptWithInlineAnswer.jsx";

export default function PromptSection({ question, answerText, submitted, hasInlineFillBlank, onSingleAnswer, t }) {
    if (!hasInlineFillBlank) {
        return <p className="question-card-prompt">{question.prompt}</p>;
    }

    return (
        <div className="question-card-inline-answer-block">
            <p className="question-card-prompt question-card-prompt-inline">
                <PromptWithInlineAnswer
                    question={question}
                    answerText={answerText}
                    submitted={submitted}
                    onSingleAnswer={onSingleAnswer}
                    t={t}
                />
            </p>

            <InputMeta
                answerLength={answerText.length}
                className="question-card-inline-input-meta"
                t={t}
            />
        </div>
    );
}

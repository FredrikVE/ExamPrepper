// src/ui/view/components/ExamPage/QuestionCard.jsx
import { useLanguage } from "../../../../i18n/LanguageContext.jsx";
import { getQuestionViewState } from "../../../../utils/questionutils/questionViewStateUtils.js";
import FeedbackPanel from "./FeedbackPanel.jsx";
import FillAnswerInput from "./QuestionCard/FillAnswerInput.jsx";
import OptionList from "./QuestionCard/OptionList.jsx";
import PromptSection from "./QuestionCard/PromptSection.jsx";
import QuestionFeedback from "./QuestionCard/QuestionFeedback.jsx";
import QuestionHeader from "./QuestionCard/QuestionHeader.jsx";

export default function QuestionCard({ question, answer, submitted, showAllFeedback, correct, expandedAnswerOptionIndex, onToggleAnswerOptionExpanded, onSingleAnswer, onToggleMultiAnswer }) {
    const { t } = useLanguage();
    const answerText = String(answer ?? "");
    const viewState = getQuestionViewState({
        question,
        submitted,
        showAllFeedback,
        correct
    });

    return (
        <section className="question-card">
            <QuestionHeader
                question={question}
                submitted={submitted}
                correct={correct}
                t={t}
            />

            <div className="question-card-body">
                <div className="question-card-divider" />

                <PromptSection
                    question={question}
                    answerText={answerText}
                    submitted={submitted}
                    hasInlineFillBlank={viewState.hasInlineFillBlank}
                    onSingleAnswer={onSingleAnswer}
                    t={t}
                />

                {viewState.shouldShowFillInput ? (
                    <FillAnswerInput
                        question={question}
                        answerText={answerText}
                        submitted={submitted}
                        onSingleAnswer={onSingleAnswer}
                        t={t}
                    />
                ) : null}

                {viewState.shouldShowOptions ? (
                    <OptionList
                        question={question}
                        answer={answer}
                        submitted={submitted}
                        showAllFeedback={showAllFeedback}
                        expandedAnswerOptionIndex={expandedAnswerOptionIndex}
                        onToggleAnswerOptionExpanded={onToggleAnswerOptionExpanded}
                        onSingleAnswer={onSingleAnswer}
                        onToggleMultiAnswer={onToggleMultiAnswer}
                    />
                ) : null}

                <QuestionFeedback
                    question={question}
                    t={t}
                    shouldShowWarning={viewState.shouldShowWarning}
                    shouldShowSource={viewState.shouldShowSource}
                />

                {viewState.shouldShowFillFeedback ? (
                    <FeedbackPanel
                        question={question}
                        selected={answer}
                        correct={correct}
                    />
                ) : null}
            </div>
        </section>
    );
}
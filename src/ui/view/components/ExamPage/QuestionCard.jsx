import { useLanguage } from "../../../../i18n/LanguageContext.jsx";
import FeedbackPanel from "./FeedbackPanel.jsx";
import FillAnswerInput from "./QuestionCard/FillAnswerInput.jsx";
import OptionList from "./QuestionCard/OptionList.jsx";
import PromptSection from "./QuestionCard/PromptSection.jsx";
import QuestionFeedback from "./QuestionCard/QuestionFeedback.jsx";
import QuestionHeader from "./QuestionCard/QuestionHeader.jsx";
import { getQuestionViewState } from "./QuestionCard/questionCardUtils.js";

export default function QuestionCard({ question, answer, submitted, showAllFeedback, correct, onSingleAnswer, onToggleMultiAnswer }) {
    const { t } = useLanguage();
    const viewState = getQuestionViewState({ question, submitted, showAllFeedback, correct });
    const answerText = String(answer ?? "");

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

                {viewState.shouldShowFillInput && (
                    <FillAnswerInput
                        question={question}
                        answerText={answerText}
                        submitted={submitted}
                        onSingleAnswer={onSingleAnswer}
                        t={t}
                    />
                )}

                {viewState.shouldShowOptions && (
                    <OptionList
                        question={question}
                        answer={answer}
                        feedbackMode={viewState.feedbackMode}
                        submitted={submitted}
                        onSingleAnswer={onSingleAnswer}
                        onToggleMultiAnswer={onToggleMultiAnswer}
                        t={t}
                    />
                )}

                <QuestionFeedback
                    question={question}
                    t={t}
                    shouldShowWarning={viewState.shouldShowWarning}
                    shouldShowSource={viewState.shouldShowSource}
                />

                {viewState.shouldShowFillFeedback && (
                    <FeedbackPanel
                        question={question}
                        selected={answer}
                        correct={correct}
                    />
                )}
            </div>
        </section>
    );
}

// src/ui/view/components/ExamPage/QuestionCard.jsx
import { useLanguage } from "../../../../i18n/LanguageContext.jsx";
import { getQuestionViewState } from "../../../../utils/questionutils/questionViewStateUtils.js";
import FeedbackPanel from "./FeedbackPanel.jsx";
import FillAnswerInput from "./QuestionCard/InputField/FillAnswerInput.jsx";
import OptionList from "./QuestionCard/Options/OptionList.jsx";
import PromptSection from "./QuestionCard/Prompt/PromptSection.jsx";
import QuestionFeedback from "./QuestionCard/Feedback/QuestionFeedback.jsx";
import QuestionHeader from "./QuestionCard/Header/QuestionHeader.jsx";
import DragDropQuestion from "./QuestionCard/DragDrop/DragDropQuestion.jsx";

export default function QuestionCard({ question, answer, answerOptionOrder, submitted, showAllFeedback, correct, expandedAnswerOptionIndex, onToggleAnswerOptionExpanded, onSingleAnswer, onToggleMultiAnswer }) {
    const { t } = useLanguage();
    const answerText = String(answer ?? "");

    const viewState = getQuestionViewState({
        question,
        submitted,
        showAllFeedback,
        correct
    });

    const cardClassName = viewState.feedbackMode
        ? "question-card question-card-feedback-mode"
        : "question-card";

    return (
        <section className={cardClassName}>
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
                    correct={correct}
                    hasInlineFillBlank={viewState.hasInlineFillBlank}
                    onSingleAnswer={onSingleAnswer}
                    t={t}
                />

                {viewState.shouldShowFillInput ? (
                    <FillAnswerInput
                        question={question}
                        answerText={answerText}
                        submitted={submitted}
                        correct={correct}
                        onSingleAnswer={onSingleAnswer}
                        t={t}
                    />
                ) : null}

                {viewState.shouldShowDragDrop ? (
                    <DragDropQuestion
                        question={question}
                        answer={answer}
                        submitted={submitted}
                        showAllFeedback={showAllFeedback}
                        onSingleAnswer={onSingleAnswer}
                        t={t}
                    />
                ) : null}

                {viewState.shouldShowOptions ? (
                    <OptionList
                        question={question}
                        answer={answer}
                        answerOptionOrder={answerOptionOrder}
                        submitted={submitted}
                        showAllFeedback={showAllFeedback}
                        expandedAnswerOptionIndex={expandedAnswerOptionIndex}
                        onToggleAnswerOptionExpanded={onToggleAnswerOptionExpanded}
                        onSingleAnswer={onSingleAnswer}
                        onToggleMultiAnswer={onToggleMultiAnswer}
                        t={t}
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
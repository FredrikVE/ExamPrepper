// src/ui/view/components/ExamPage/QuestionCard/QuestionCard.jsx
import { useLanguage } from "../../../../../i18n/LanguageContext.jsx";
import { getQuestionViewState } from "./Shared/Utils/questionCardViewState.js";
import { QUESTION_TYPES } from "../../../../../constants/QuestionTypes.js";
import FeedbackPanel from "../FeedbackPanel/FeedbackPanel.jsx";
import FillBlankInputFieldQuestion from "./QuestionTypes/FillBlankInputField/FillBlankInputFieldQuestion.jsx";
import CategorySortQuestion from "./QuestionTypes/DragDrop/CategorySort/Question/CategorySortQuestion.jsx";
import TableMatchQuestion from "./QuestionTypes/DragDrop/TableMatch/Question/TableMatchQuestion.jsx";
import MatrixPlacementQuestion from "./QuestionTypes/DragDrop/MatrixPlacement/Question/MatrixPlacementQuestion.jsx";
import MultiCheckboxSelectQuestion from "./QuestionTypes/MultiCheckboxSelect/MultiCheckboxSelectQuestion.jsx";
import SingleRadioButtonChoiceQuestion from "./QuestionTypes/SingleRadioButtonChoice/SingleRadioButtonChoiceQuestion.jsx";
import PromptSection from "./Shared/Prompt/PromptSection.jsx";
import QuestionFeedback from "./Shared/Feedback/QuestionFeedback.jsx";
import QuestionHeader from "./Shared/QuestionHeader/QuestionHeader.jsx";


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

                {viewState.shouldShowPrompt ? (
                    <PromptSection
                        question={question}
                        answerText={answerText}
                        submitted={submitted}
                        correct={correct}
                        hasInlineFillBlank={viewState.hasInlineFillBlank}
                        onSingleAnswer={onSingleAnswer}
                        t={t}
                    />
                ) : null}

                {viewState.shouldShowFillInput ? (
                    <FillBlankInputFieldQuestion
                        question={question}
                        answerText={answerText}
                        submitted={submitted}
                        correct={correct}
                        onSingleAnswer={onSingleAnswer}
                        t={t}
                    />
                ) : null}

                {viewState.shouldShowDragCategorize ? (
                    <CategorySortQuestion
                        question={question}
                        answer={answer}
                        submitted={submitted}
                        showAllFeedback={showAllFeedback}
                        onSingleAnswer={onSingleAnswer}
                        t={t}
                    />
                ) : null}

                {viewState.shouldShowMatrixPlacement ? (
                    <MatrixPlacementQuestion
                        question={question}
                        answer={answer}
                        submitted={submitted}
                        showAllFeedback={showAllFeedback}
                        onSingleAnswer={onSingleAnswer}
                        t={t}
                    />
                ) : null}

                {viewState.shouldShowDragDrop && !viewState.shouldShowDragCategorize && !viewState.shouldShowMatrixPlacement ? (
                    <TableMatchQuestion
                        question={question}
                        answer={answer}
                        submitted={submitted}
                        showAllFeedback={showAllFeedback}
                        onSingleAnswer={onSingleAnswer}
                        t={t}
                    />
                ) : null}

                {viewState.shouldShowOptions && question.type === QUESTION_TYPES.MULTI ? (
                    <MultiCheckboxSelectQuestion
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

                {viewState.shouldShowOptions && question.type === QUESTION_TYPES.SINGLE ? (
                    <SingleRadioButtonChoiceQuestion
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
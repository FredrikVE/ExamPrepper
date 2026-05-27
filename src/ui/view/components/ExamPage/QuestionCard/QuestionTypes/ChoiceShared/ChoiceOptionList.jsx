// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/ChoiceShared/ChoiceOptionList.jsx
import isOptionSelected from "../../../../../../../utils/answerutils/isOptionSelected.js";
import AnswerOptionCard from "../../AnswerCard/AnswerOptionCard.jsx";
import ChoiceSelectableOption from "./ChoiceSelectableOption.jsx";

export default function ChoiceOptionList({ question, answer, answerOptionOrder, submitted, showAllFeedback, expandedAnswerOptionIndex, onToggleAnswerOptionExpanded, onSingleAnswer, onToggleMultiAnswer, t }) {
    const feedbackMode = submitted && showAllFeedback;
    const optionItems = createOptionDisplayItems(question, answerOptionOrder);

    const listClassName = feedbackMode
        ? "question-card-option-list question-card-answer-card-list"
        : "question-card-option-list";

    return (
        <div className={listClassName}>
            {optionItems.map(({ option, optionIndex, displayIndex }) => {
                const selected = isOptionSelected(question.type, answer, optionIndex);

                if (feedbackMode) {
                    return (
                        <AnswerOptionCard
                            key={optionIndex}
                            questionId={question.id}
                            option={option}
                            optionIndex={optionIndex}
                            displayIndex={displayIndex}
                            isSelected={selected}
                            isExpanded={expandedAnswerOptionIndex === optionIndex}
                            onToggleExpanded={() => onToggleAnswerOptionExpanded(question.id, optionIndex)}
                            t={t}
                        />
                    );
                }

                return (
                    <ChoiceSelectableOption
                        key={optionIndex}
                        question={question}
                        option={option}
                        optionIndex={optionIndex}
                        displayIndex={displayIndex}
                        isSelected={selected}
                        submitted={submitted}
                        onSingleAnswer={onSingleAnswer}
                        onToggleMultiAnswer={onToggleMultiAnswer}
                    />
                );
            })}
        </div>
    );
}

function createOptionDisplayItems(question, answerOptionOrder) {
    const fallbackOrder = question.options.map((_, index) => index);
    const order = isValidOptionOrder(answerOptionOrder, question.options.length)
        ? answerOptionOrder
        : fallbackOrder;

    return order.map((optionIndex, displayIndex) => ({
        option: question.options[optionIndex],
        optionIndex,
        displayIndex
    }));
}

function isValidOptionOrder(answerOptionOrder, optionCount) {
    if (!Array.isArray(answerOptionOrder) || answerOptionOrder.length !== optionCount) {
        return false;
    }

    const uniqueIndexes = new Set(answerOptionOrder);

    return answerOptionOrder.every((index) => {
        return Number.isInteger(index) && index >= 0 && index < optionCount;
    }) && uniqueIndexes.size === optionCount;
}

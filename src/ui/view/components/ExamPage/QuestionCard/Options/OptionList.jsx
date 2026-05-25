// src/ui/view/components/ExamPage/QuestionCard/Options/OptionList.jsx
import isOptionSelected from "../../../../../../utils/answerutils/isOptionSelected.js";
import AnswerOptionCard from "../AnswerCard/AnswerOptionCard.jsx";
import SelectableOption from "./SelectableOption.jsx";

export default function OptionList({ question, answer, submitted, showAllFeedback, expandedAnswerOptionIndex, onToggleAnswerOptionExpanded, onSingleAnswer, onToggleMultiAnswer, t }) {
    const feedbackMode = submitted && showAllFeedback;

    const listClassName = feedbackMode
        ? "question-card-option-list question-card-answer-card-list"
        : "question-card-option-list";

    return (
        <div className={listClassName}>
            {question.options.map((option, index) => {
                const selected = isOptionSelected(question.type, answer, index);

                if (feedbackMode) {
                    return (
                        <AnswerOptionCard
                            key={index}
                            questionId={question.id}
                            option={option}
                            index={index}
                            isSelected={selected}
                            isExpanded={expandedAnswerOptionIndex === index}
                            onToggleExpanded={() => onToggleAnswerOptionExpanded(question.id, index)}
                            t={t}
                        />
                    );
                }

                return (
                    <SelectableOption
                        key={index}
                        question={question}
                        option={option}
                        index={index}
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
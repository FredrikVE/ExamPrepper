import AnswerOptionCard from "./AnswerOptionCard.jsx";
import SelectableOption from "./SelectableOption.jsx";
import { isOptionSelected } from "./questionCardUtils.js";
import { useExpandedOptions } from "./useExpandedOptions.js";

export default function OptionList({
    question,
    answer,
    feedbackMode,
    submitted,
    onSingleAnswer,
    onToggleMultiAnswer,
    t
}) {
    const { isExpanded, toggleExpanded } = useExpandedOptions(question.id);
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
                            isExpanded={isExpanded(index)}
                            onToggleExpanded={() => toggleExpanded(index)}
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

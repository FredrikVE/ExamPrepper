// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/ChoiceShared/Utils/isOptionSelected.js
export default function isOptionSelected(inputType, answer, index) {
    if (inputType === "radio") {
        return answer === index;
    }

    return Array.isArray(answer) && answer.includes(index);
}

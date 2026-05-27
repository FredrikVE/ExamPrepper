// src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/ChoiceShared/Utils/isOptionSelected.js
import { QUESTION_TYPES } from "../../../../../../../../constants/QuestionTypes.js";

export default function isOptionSelected(type, answer, index) {
    if (type === QUESTION_TYPES.SINGLE) {
        return answer === index;
    }

    return Array.isArray(answer) && answer.includes(index);
}

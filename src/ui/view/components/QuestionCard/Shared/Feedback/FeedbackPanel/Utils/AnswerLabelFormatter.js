// src/ui/view/components/QuestionCard/Shared/Feedback/FeedbackPanel/Utils/AnswerLabelFormatter.js
import { QUESTION_TYPES } from "../../../../../../../../constants/QuestionTypes.js";
import getFillBlankCorrectAnswer from "../../../../QuestionTypes/FillBlankInputField/Utils/getFillBlankCorrectAnswer.js";

export default class AnswerLabelFormatter {
    constructor(separator = " | ") {
        this.separator = separator;
    }

    format(question) {
        if (question.type === QUESTION_TYPES.FILL) {
            return getFillBlankCorrectAnswer(question);
        }

        const correctOptionLabels = this.#getCorrectOptionLabels(question);

        return correctOptionLabels.join(this.separator);
    }

    #getCorrectOptionLabels(question) {
        if (!question.options) {
            return [];
        }

        const correctOptionLabels = [];

        question.options.forEach((option, index) => {
            if (option.isCorrect) {
                const optionLabel = this.#createOptionLabel(option, index);

                correctOptionLabels.push(optionLabel);
            }
        });

        return correctOptionLabels;
    }

    #createOptionLabel(option, index) {
        const optionLetter = getOptionLetter(index);

        return `${optionLetter}. ${option.text}`;
    }
}

function getOptionLetter(index) {
    return String.fromCharCode(65 + index);
}

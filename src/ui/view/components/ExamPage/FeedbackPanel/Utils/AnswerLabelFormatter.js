// src/ui/view/components/ExamPage/FeedbackPanel/Utils/AnswerLabelFormatter.js
export default class AnswerLabelFormatter {
    constructor(separator = " | ") {
        this.separator = separator;
    }

    format(question) {
        if (question.type === "fill") {
            return question.answerKey;
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
            if (option.correct) {
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

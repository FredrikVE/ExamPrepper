// src/model/domain/questions/toPracticeQuestion.js
import { QUESTION_TYPES } from "../../../constants/QuestionTypes.js";

export default function toPracticeQuestion(question) {
	const mappedQuestion = { ...question };

	if (question.type === QUESTION_TYPES.FILL) {
		if (!Array.isArray(question.acceptedAnswers)) {

			throw new Error(`Invalid canonical practice question ${String(question.id)}: fill requires acceptedAnswers`);

		}

		mappedQuestion.answers = [...question.acceptedAnswers];
	}

	if (question.type === QUESTION_TYPES.SINGLE || question.type === QUESTION_TYPES.MULTI) {
		if (!Array.isArray(question.options)) {

			throw new Error(`Invalid canonical practice question ${String(question.id)}: ${question.type} requires options`);

		}

		mappedQuestion.options = question.options.map((option) => toAnswerOption(question, option));
	}

	return mappedQuestion;
}

function toAnswerOption(question, option) {
	if (typeof option.isCorrect !== "boolean") {

		throw new Error(`Invalid canonical practice question ${String(question.id)}: option ${String(option.id)} requires isCorrect`);

	}

	const mappedOption = {
		...option,
		correct: option.isCorrect
	};

	if (Object.hasOwn(option, "feedback")) {
		mappedOption.why = option.feedback;
	}

	return mappedOption;
}

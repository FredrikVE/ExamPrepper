//src/ui/viewmodel/QuestionSession/transformAnswerForApi.js
import { QUESTION_TYPES } from "../../../constants/QuestionTypes.js";

export default function transformAnswerForApi(question, answer) {
	if (!question || !Array.isArray(question.options)) {
		return answer;
	}

	if (question.type === QUESTION_TYPES.SINGLE) {
		return resolveOptionId(question.options, answer);
	}

	if (question.type === QUESTION_TYPES.MULTI) {
		return Array.isArray(answer)
			? answer.map((index) => resolveOptionId(question.options, index))
			: answer;
	}

	return answer;
}

function resolveOptionId(options, index) {
	if (typeof index !== "number") {
		return index;
	}

	const option = options[index];
	return option ? option.id : index;
}

// src/ui/viewmodel/Utils/transformAnswersForApi.js

/**
 * Transforms internal frontend answers (option indices) to API-compatible
 * answers (option IDs) before submission.
 *
 * Frontend uses numeric indices for single/multi choice internally because
 * the local grading system indexes into question.options[].
 * Backend expects option IDs like "q3-opt-2".
 *
 * Other question types (fill, dragDrop, drag-categorize, matrix, sequence)
 * already use string IDs internally and are passed through unchanged.
 */
export default function transformAnswersForApi(questions, answers) {
	const questionsById = Object.fromEntries(
		questions.map((question) => [question.id, question])
	);
	const apiAnswers = {};

	for (const questionId in answers) {
		const question = questionsById[questionId];
		const answer = answers[questionId];

		if (!question || !Array.isArray(question.options)) {
			apiAnswers[questionId] = answer;
			continue;
		}

		if (question.type === "single") {
			apiAnswers[questionId] = resolveOptionId(question.options, answer);
			continue;
		}

		if (question.type === "multi") {
			apiAnswers[questionId] = Array.isArray(answer)
				? answer.map((index) => resolveOptionId(question.options, index))
				: answer;
			continue;
		}

		apiAnswers[questionId] = answer;
	}

	return apiAnswers;
}

function resolveOptionId(options, index) {
	if (typeof index !== "number") {
		return index;
	}

	const option = options[index];
	return option ? option.id : index;
}

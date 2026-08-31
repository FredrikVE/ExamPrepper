//src/ui/viewmodel/Utils/transformAnswersForApi.js
import transformAnswerForApi from "../QuestionSession/transformAnswerForApi.js";

export default function transformAnswersForApi(questions, answers) {
	const questionsById = Object.fromEntries(
		questions.map((question) => [question.id, question])
	);
	const apiAnswers = {};

	for (const questionId in answers) {
		apiAnswers[questionId] = transformAnswerForApi(questionsById[questionId], answers[questionId]);
	}

	return apiAnswers;
}

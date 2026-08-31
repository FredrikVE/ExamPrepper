//src/ui/viewmodel/QuestionSession/transformLearningSessionAnswersForApi.js
import transformAnswerForApi from "./transformAnswerForApi.js";

export default function transformLearningSessionAnswersForApi(questions, answersBySessionQuestionId) {
	const questionsBySessionQuestionId = Object.fromEntries(
		questions.map((entry) => [entry.sessionQuestionId, entry.question])
	);

	return Object.entries(answersBySessionQuestionId).map(([sessionQuestionId, answer]) => ({
		sessionQuestionId,
		answer: transformAnswerForApi(questionsBySessionQuestionId[sessionQuestionId], answer)
	}));
}

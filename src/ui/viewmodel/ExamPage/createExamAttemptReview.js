// src/ui/viewmodel/ExamPage/createExamAttemptReview.js
import restoreAnswerFromApi from "../QuestionSession/restoreAnswerFromApi.js";

/* Bygger svarene til et levert forsøk i frontendformat.
   hasChangedQuestions er sann når en oppgave er endret siden forsøket ble levert:
   oppgaven mangler i forsøket eller i settet, eller dagens retting gir et annet
   resultat enn det som ble registrert. Da er den lagrede poengsummen fasit. */
export default function createExamAttemptReview({ questions, attempt, gradeAnswerUseCase }) {
	if (!attempt || !Array.isArray(questions)) {
		return { answers: {}, hasChangedQuestions: false };
	}

	const resultsByQuestionKey = new Map(attempt.results.map((result) => [result.questionKey, result]));
	const questionIds = new Set(questions.map((question) => question.id));
	const answers = {};
	let hasChangedQuestions = attempt.results.some((result) => !questionIds.has(result.questionKey));

	for (const question of questions) {
		const result = resultsByQuestionKey.get(question.id);

		if (result === undefined) {
			hasChangedQuestions = true;
			continue;
		}

		const answer = restoreAnswerFromApi(question, result.submittedAnswer);

		if (answer !== null) {
			answers[question.id] = answer;
		}

		if (gradeAnswerUseCase.execute(question, answer) !== result.isCorrect) {
			hasChangedQuestions = true;
		}
	}

	return { answers, hasChangedQuestions };
}

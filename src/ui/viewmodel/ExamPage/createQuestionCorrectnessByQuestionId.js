// src/ui/viewmodel/ExamPage/createQuestionCorrectnessByQuestionId.js
export default function createQuestionCorrectnessByQuestionId(questions, answers, gradeAnswerUseCase) {
	const questionCorrectnessByQuestionId = {};

	for (const question of questions) {
		questionCorrectnessByQuestionId[question.id] = gradeAnswerUseCase.execute(
			question,
			answers[question.id]
		);
	}

	return questionCorrectnessByQuestionId;
}

// src/ui/viewmodel/ExamPage/createQuestionDotEntries.js
export function createQuestionDotEntries(questions, currentQuestionIndex, questionCorrectnessByQuestionId) {
	const questionDotEntries = [];

	for (let questionIndex = 0; questionIndex < questions.length; questionIndex += 1) {
		const question = questions[questionIndex];

		questionDotEntries.push(
			createQuestionDotEntry(
				question.id,
				questionIndex,
				currentQuestionIndex,
				questionCorrectnessByQuestionId[question.id]
			)
		);
	}

	return questionDotEntries;
}

export function createCompactQuestionDotEntries(compactQuestionDotEntries, questions, currentQuestionIndex, questionCorrectnessByQuestionId) {
	const enrichedQuestionDotEntries = [];

	for (const compactQuestionDotEntry of compactQuestionDotEntries) {
		if (compactQuestionDotEntry.type === "ellipsis") {
			enrichedQuestionDotEntries.push(compactQuestionDotEntry);
			continue;
		}

		const question = questions[compactQuestionDotEntry.questionIndex] ?? null;
		const questionId = question?.id ?? compactQuestionDotEntry.key;
		const isCorrect = question ? questionCorrectnessByQuestionId[question.id] : false;

		enrichedQuestionDotEntries.push({
			...compactQuestionDotEntry,
			questionNumber: compactQuestionDotEntry.questionIndex + 1,
			isActive: compactQuestionDotEntry.questionIndex === currentQuestionIndex,
			isCorrect: isCorrect ?? false,
			questionId
		});
	}

	return enrichedQuestionDotEntries;
}

function createQuestionDotEntry(questionId, questionIndex, currentQuestionIndex, isCorrect) {
	return {
		key: questionId,
		questionId,
		questionIndex,
		questionNumber: questionIndex + 1,
		isActive: questionIndex === currentQuestionIndex,
		isCorrect: isCorrect ?? false
	};
}

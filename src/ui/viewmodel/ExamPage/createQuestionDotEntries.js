// src/ui/viewmodel/ExamPage/createQuestionDotEntries.js
const FIRST_QUESTION_INDEX = 0;
const QUESTION_INDEX_STEP = 1;
const ENTRY_NUMBER_OFFSET = 1;

export function createQuestionDotEntries(questions, currentQuestionIndex, questionCorrectnessByQuestionId) {
	const questionDotEntries = [];

	for (let questionIndex = FIRST_QUESTION_INDEX; questionIndex < questions.length; questionIndex += QUESTION_INDEX_STEP) {
		const question = questions[questionIndex];

		questionDotEntries.push(createQuestionDotEntry(
			question.id,
			questionIndex,
			currentQuestionIndex,
			questionCorrectnessByQuestionId[question.id]
		));
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

		const questionIndex = compactQuestionDotEntry.questionIndex;
		const question = questions[questionIndex] ?? null;
		const questionId = question?.id ?? compactQuestionDotEntry.key;
		const isCorrect = question ? questionCorrectnessByQuestionId[question.id] : false;

		enrichedQuestionDotEntries.push({
			key: compactQuestionDotEntry.key,
			entryIndex: questionIndex,
			entryNumber: questionIndex + ENTRY_NUMBER_OFFSET,
			isActive: questionIndex === currentQuestionIndex,
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
		entryIndex: questionIndex,
		entryNumber: questionIndex + ENTRY_NUMBER_OFFSET,
		isActive: questionIndex === currentQuestionIndex,
		isCorrect: isCorrect ?? false
	};
}

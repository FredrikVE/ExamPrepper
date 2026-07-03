// src/ui/viewmodel/ExamPage/updateExamAnswers.js
const isPlainObject = (value) => {
	return Boolean(value && typeof value === "object" && !Array.isArray(value));
};

export const updateSingleAnswerSelection = (answers, questionId, selectedValue) => {
	return {
		...answers,
		[questionId]: selectedValue
	};
};

export const toggleMultiAnswerSelection = (answers, questionId, selectedValue) => {
	const currentAnswer = Array.isArray(answers[questionId])
		? answers[questionId]
		: [];

	const nextAnswer = currentAnswer.includes(selectedValue)
		? currentAnswer.filter((answerValue) => answerValue !== selectedValue)
		: [...currentAnswer, selectedValue];

	return {
		...answers,
		[questionId]: nextAnswer
	};
};

export const updateObjectAnswerSelection = (answers, questionId, itemId, selectedValue) => {
	const currentQuestionAnswer = isPlainObject(answers[questionId])
		? answers[questionId]
		: {};
	const nextQuestionAnswer = { ...currentQuestionAnswer };

	if (selectedValue) {
		nextQuestionAnswer[itemId] = selectedValue;
	} else {
		delete nextQuestionAnswer[itemId];
	}

	return {
		...answers,
		[questionId]: nextQuestionAnswer
	};
};

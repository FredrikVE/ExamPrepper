// src/ui/view/components/QuestionCard/QuestionTypes/FillBlankInputField/Utils/getFillBlankCorrectAnswer.js
export default function getFillBlankCorrectAnswer(question) {
	if (!Array.isArray(question?.acceptedAnswers)) {
		return "";
	}

	const correctAnswer = question.acceptedAnswers.find((acceptedAnswer) => {
		return typeof acceptedAnswer === "string" && acceptedAnswer.trim().length > 0;
	});

	return correctAnswer?.trim() ?? "";
}

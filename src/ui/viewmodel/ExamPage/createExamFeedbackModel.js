// src/ui/viewmodel/ExamPage/createExamFeedbackModel.js
import { getFilledCompactQuestionDotEntries, getMinimalCompactQuestionDotEntries } from "../Utils/questionDotPagination.js";
import createQuestionCorrectnessByQuestionId from "./createQuestionCorrectnessByQuestionId.js";
import { createCompactQuestionDotEntries, createQuestionDotEntries } from "./createQuestionDotEntries.js";

export default function createExamFeedbackModel({
	submitted,
	currentQuestion,
	questions,
	visibleQuestions,
	currentQuestionIndex,
	answers,
	gradeAnswerUseCase
}) {
	const questionCorrectnessByQuestionId = submitted
		? createQuestionCorrectnessByQuestionId(questions, answers, gradeAnswerUseCase)
		: {};

	const questionDotEntries = createQuestionDotEntries(
		visibleQuestions,
		currentQuestionIndex,
		questionCorrectnessByQuestionId
	);

	const filledCompactQuestionDotEntries = createCompactQuestionDotEntries(
		getFilledCompactQuestionDotEntries(visibleQuestions, currentQuestionIndex),
		visibleQuestions,
		currentQuestionIndex,
		questionCorrectnessByQuestionId
	);

	const minimalCompactQuestionDotEntries = createCompactQuestionDotEntries(
		getMinimalCompactQuestionDotEntries(visibleQuestions, currentQuestionIndex),
		visibleQuestions,
		currentQuestionIndex,
		questionCorrectnessByQuestionId
	);

	return {
		questionCorrectnessByQuestionId,
		questionDotEntries,
		filledCompactQuestionDotEntries,
		minimalCompactQuestionDotEntries,
		currentQuestionIsCorrect: getCurrentQuestionIsCorrect(
			currentQuestion,
			questionCorrectnessByQuestionId
		),
		currentQuestionFillMatchType: getCurrentQuestionFillMatchType(
			submitted,
			currentQuestion,
			answers,
			gradeAnswerUseCase
		)
	};
}

function getCurrentQuestionIsCorrect(currentQuestion, questionCorrectnessByQuestionId) {
	if (!currentQuestion) {
		return false;
	}

	return questionCorrectnessByQuestionId[currentQuestion.id] ?? false;
}

function getCurrentQuestionFillMatchType(submitted, currentQuestion, answers, gradeAnswerUseCase) {
	if (!submitted || !currentQuestion) {
		return "none";
	}

	return gradeAnswerUseCase.getFillMatchType(
		currentQuestion,
		answers[currentQuestion.id]
	);
}

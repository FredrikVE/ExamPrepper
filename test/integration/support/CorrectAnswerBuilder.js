// test/integration/support/CorrectAnswerBuilder.js
import { QUESTION_TYPES } from "../../../src/constants/QuestionTypes.js";

export default class CorrectAnswerBuilder {
	build(question) {
		if (!question) {
			throw new Error("Cannot build correct answer because question is missing.");
		}

		if (question.type === QUESTION_TYPES.SINGLE) {
			return this.buildSingleChoiceAnswer(question);
		}

		if (question.type === QUESTION_TYPES.MULTI) {
			return this.buildMultipleChoiceAnswer(question);
		}

		if (question.type === QUESTION_TYPES.FILL) {
			return this.buildFillAnswer(question);
		}

		if (question.type === QUESTION_TYPES.MATRIX_PLACEMENT) {
			return this.buildMatrixPlacementAnswer(question);
		}

		throw new Error(`Unsupported question type in API integration test: ${question.type}`);
	}

	buildSingleChoiceAnswer(question) {
		const options = question.options || [];

		for (let optionIndex = 0; optionIndex < options.length; optionIndex += 1) {
			const option = options[optionIndex];

			if (option.correct === true) {
				return optionIndex;
			}
		}

		throw new Error(`No correct option found for single-choice question: ${question.id}`);
	}

	buildMultipleChoiceAnswer(question) {
		const correctOptionIndexes = [];
		const options = question.options || [];

		for (let optionIndex = 0; optionIndex < options.length; optionIndex += 1) {
			const option = options[optionIndex];

			if (option.correct === true) {
				correctOptionIndexes.push(optionIndex);
			}
		}

		if (correctOptionIndexes.length === 0) {
			throw new Error(`No correct options found for multiple-choice question: ${question.id}`);
		}

		return correctOptionIndexes;
	}

	buildFillAnswer(question) {
		if (question.answers && question.answers.length > 0) {
			return question.answers[0];
		}

		if (question.acceptedAnswers && question.acceptedAnswers.length > 0) {
			return question.acceptedAnswers[0];
		}

		throw new Error(`No accepted fill answers found for question: ${question.id}`);
	}

	buildMatrixPlacementAnswer(question) {
		const answerByItemId = {};
		const items = question.items || [];

		if (items.length === 0) {
			throw new Error(`No matrix placement items found for question: ${question.id}`);
		}

		for (const item of items) {
			const correctQuadrantId = this.getCorrectQuadrantId(item);

			answerByItemId[item.id] = correctQuadrantId;
		}

		return answerByItemId;
	}

	getCorrectQuadrantId(item) {
		if (item.correctQuadrantId) {
			return item.correctQuadrantId;
		}

		if (item.quadrantId) {
			return item.quadrantId;
		}

		throw new Error(`No correct quadrant found for matrix placement item: ${item.id}`);
	}
}

//test/contracts/gradingFixtureAdapter.js
import { QUESTION_TYPES } from "../../src/constants/QuestionTypes.js";

function getOptionIndex(question, optionId) {
	const optionIndex = question.options.findIndex((option) => option.id === optionId);

	if (optionIndex === -1) {
		throw new Error(`Unknown grading fixture option: ${String(optionId)}`);
	}

	return optionIndex;
}

function mapOptions(options) {
	return options.map((option) => ({
		id: option.id,
		correct: option.isCorrect === true,
		label: option.label ?? null
	}));
}

function mapDragDropQuestion(question) {
	const correctCardIdByTargetId = new Map();

	for (const match of question.correctMatches) {
		correctCardIdByTargetId.set(match.targetId, match.cardId);
	}

	return {
		id: question.id,
		type: question.type,
		points: question.points,
		targets: question.targets.map((target) => ({
			id: target.id,
			correctCardId: correctCardIdByTargetId.get(target.id) ?? null
		}))
	};
}

function mapDragDropAnswer(answer) {
	const frontendAnswer = {};

	for (const cardId in answer) {
		frontendAnswer[answer[cardId]] = cardId;
	}

	return frontendAnswer;
}

function mapCategorizeAnswer(question, answer) {
	const frontendAnswer = {};

	for (const category of question.categories) {
		frontendAnswer[category.id] = [];
	}

	for (const itemId in answer) {
		const categoryId = answer[itemId];

		if (!Object.hasOwn(frontendAnswer, categoryId)) {
			throw new Error(`Unknown grading fixture category: ${String(categoryId)}`);
		}

		frontendAnswer[categoryId].push(itemId);
	}

	return frontendAnswer;
}

export function mapGradingFixtureQuestionToFrontend(question) {
	if (question.type === QUESTION_TYPES.SINGLE || question.type === QUESTION_TYPES.MULTI) {
		return {
			id: question.id,
			type: question.type,
			points: question.points,
			options: mapOptions(question.options)
		};
	}

	if (question.type === QUESTION_TYPES.FILL) {
		return {
			id: question.id,
			type: question.type,
			points: question.points,
			answers: question.acceptedAnswers
		};
	}

	if (question.type === QUESTION_TYPES.DRAG_DROP) {
		return mapDragDropQuestion(question);
	}

	if (question.type === QUESTION_TYPES.DRAG_CATEGORIZE) {
		return {
			id: question.id,
			type: question.type,
			points: question.points,
			categories: question.categories,
			items: question.items
		};
	}

	if (question.type === QUESTION_TYPES.MATRIX_PLACEMENT) {
		return {
			id: question.id,
			type: question.type,
			points: question.points,
			matrix: { quadrants: question.quadrants },
			items: question.items
		};
	}

	if (question.type === QUESTION_TYPES.SEQUENCE_ORDER) {
		return {
			id: question.id,
			type: question.type,
			points: question.points,
			items: question.items
		};
	}

	if (question.type === QUESTION_TYPES.DROPDOWN_FILL || question.type === QUESTION_TYPES.TAP_TO_FILL_MULTIPLE_BLANK || question.type === QUESTION_TYPES.WRITE_TO_FILL_MULTIPLE_BLANK) {
		return {
			id: question.id,
			type: question.type,
			points: question.points,
			options: question.options,
			items: question.items
		};
	}

	if (question.type === QUESTION_TYPES.RADIO_BUTTON_GRID) {
		return {
			id: question.id,
			type: question.type,
			points: question.points,
			columns: question.columns,
			rows: question.rows
		};
	}

	throw new Error(`Unknown grading fixture question type: ${String(question.type)}`);
}

export function mapGradingFixtureAnswerToFrontend(question, answer) {
	if (question.type === QUESTION_TYPES.SINGLE) {
		return getOptionIndex(question, answer);
	}

	if (question.type === QUESTION_TYPES.MULTI) {
		return answer.map((optionId) => getOptionIndex(question, optionId));
	}

	if (question.type === QUESTION_TYPES.DRAG_DROP) {
		return mapDragDropAnswer(answer);
	}

	if (question.type === QUESTION_TYPES.DRAG_CATEGORIZE) {
		return mapCategorizeAnswer(question, answer);
	}

	return answer;
}

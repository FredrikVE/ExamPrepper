// test/ui/viewmodel/LearningSession/createLearningSessionQuestionCardModel.test.js
import { describe, expect, jest, test } from "@jest/globals";
import createLearningSessionQuestionCardModel from "../../../../src/ui/viewmodel/LearningSession/createLearningSessionQuestionCardModel.js";

function createModel(overrides = {}) {
	const currentQuestion = {
		sessionQuestionId: "session-question-1",
		question: {
			id: "question-1",
			type: "fill"
		}
	};

	return createLearningSessionQuestionCardModel({
		currentQuestion,
		currentResult: null,
		currentIndex: 1,
		answer: "answer",
		answerOptionOrderBySessionQuestionId: {
			"session-question-1": [1, 0]
		},
		setSingleAnswer: jest.fn(),
		toggleMultiAnswer: jest.fn(),
		selectObjectAnswer: jest.fn(),
		...overrides
	});
}

describe("createLearningSessionQuestionCardModel", () => {
	test("returns null without a current question", () => {
		expect(createModel({
			currentQuestion: null
		})).toBeNull();
	});

	test("creates the unchecked question presentation", () => {
		expect(createModel()).toMatchObject({
		questionNumber: 2,
		answer: "answer",
		answerOptionOrder: [1, 0],
		submitted: false,
		showAllFeedback: false,
		correct: false,
		fillMatchType: null
	});
	});

	test("preserves checked answer feedback in the question model", () => {
		expect(createModel({
			currentResult: {
				isCorrect: true,
				fillMatchType: "fuzzy"
			}
		})).toMatchObject({
			submitted: true,
			showAllFeedback: true,
			correct: true,
			fillMatchType: "fuzzy"
		});
	});
});

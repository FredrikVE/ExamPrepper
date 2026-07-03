import { jest } from "@jest/globals";
import { createExamAttemptResetState, resetExamAttemptState } from "../../../../src/ui/viewmodel/ExamPage/createExamAttemptResetActions.js";

const questionSet = [
	{ id: "q1" },
	{ id: "q2" }
];

describe("createExamAttemptResetState", () => {
	it("creates the hard-reset state for a fresh exam attempt", () => {
		expect(createExamAttemptResetState(questionSet)).toEqual({
			answers: {},
			submitted: false,
			showAllFeedback: true,
			currentQuestionIndex: 0,
			expandedAnswerOptionIndexesByQuestionId: {},
			answerOptionOrderByQuestionId: {}
		});
	});
});

describe("resetExamAttemptState", () => {
	it("applies the hard-reset state and runs timer and submit resets", () => {
		const setters = {
			setAnswers: jest.fn(),
			setSubmitted: jest.fn(),
			setShowAllFeedback: jest.fn(),
			setCurrentQuestionIndex: jest.fn(),
			resetElapsedSeconds: jest.fn(),
			setExpandedAnswerOptionIndexesByQuestionId: jest.fn(),
			setAnswerOptionOrderByQuestionId: jest.fn(),
			resetSubmitModel: jest.fn()
		};

		resetExamAttemptState({
			questionSet,
			...setters
		});

		expect(setters.setAnswers).toHaveBeenCalledWith({});
		expect(setters.setSubmitted).toHaveBeenCalledWith(false);
		expect(setters.setShowAllFeedback).toHaveBeenCalledWith(true);
		expect(setters.setCurrentQuestionIndex).toHaveBeenCalledWith(0);
		expect(setters.resetElapsedSeconds).toHaveBeenCalledTimes(1);
		expect(setters.setExpandedAnswerOptionIndexesByQuestionId).toHaveBeenCalledWith({});
		expect(setters.setAnswerOptionOrderByQuestionId).toHaveBeenCalledWith({});
		expect(setters.resetSubmitModel).toHaveBeenCalledTimes(1);
	});
});

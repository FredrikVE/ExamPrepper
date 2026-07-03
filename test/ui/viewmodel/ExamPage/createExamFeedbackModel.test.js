import { jest } from "@jest/globals";
import createExamFeedbackModel from "../../../../src/ui/viewmodel/ExamPage/createExamFeedbackModel.js";

const firstQuestion = { id: "q1" };
const secondQuestion = { id: "q2" };

function createGradeAnswerUseCase(correctnessByQuestionId = {}) {
	return {
		execute: jest.fn((question) => Boolean(correctnessByQuestionId[question.id])),
		getFillMatchType: jest.fn(() => "exact")
	};
}

describe("createExamFeedbackModel", () => {
	it("returns neutral feedback before the exam is submitted", () => {
		const gradeAnswerUseCase = createGradeAnswerUseCase({ q1: true });

		const feedbackModel = createExamFeedbackModel({
			submitted: false,
			currentQuestion: firstQuestion,
			questions: [firstQuestion, secondQuestion],
			visibleQuestions: [firstQuestion, secondQuestion],
			currentQuestionIndex: 0,
			answers: { q1: "a" },
			gradeAnswerUseCase
		});

		expect(feedbackModel.questionCorrectnessByQuestionId).toEqual({});
		expect(feedbackModel.currentQuestionIsCorrect).toBe(false);
		expect(feedbackModel.currentQuestionFillMatchType).toBe("none");
		expect(feedbackModel.questionDotEntries).toEqual([
			{
				key: "q1",
				questionId: "q1",
				questionIndex: 0,
				questionNumber: 1,
				isActive: true,
				isCorrect: false
			},
			{
				key: "q2",
				questionId: "q2",
				questionIndex: 1,
				questionNumber: 2,
				isActive: false,
				isCorrect: false
			}
		]);
		expect(gradeAnswerUseCase.execute).not.toHaveBeenCalled();
		expect(gradeAnswerUseCase.getFillMatchType).not.toHaveBeenCalled();
	});

	it("returns correctness and current fill-match feedback after submission", () => {
		const gradeAnswerUseCase = createGradeAnswerUseCase({ q1: false, q2: true });

		const feedbackModel = createExamFeedbackModel({
			submitted: true,
			currentQuestion: secondQuestion,
			questions: [firstQuestion, secondQuestion],
			visibleQuestions: [firstQuestion, secondQuestion],
			currentQuestionIndex: 1,
			answers: { q1: "a", q2: "b" },
			gradeAnswerUseCase
		});

		expect(feedbackModel.questionCorrectnessByQuestionId).toEqual({
			q1: false,
			q2: true
		});
		expect(feedbackModel.currentQuestionIsCorrect).toBe(true);
		expect(feedbackModel.currentQuestionFillMatchType).toBe("exact");
		expect(feedbackModel.questionDotEntries).toEqual([
			{
				key: "q1",
				questionId: "q1",
				questionIndex: 0,
				questionNumber: 1,
				isActive: false,
				isCorrect: false
			},
			{
				key: "q2",
				questionId: "q2",
				questionIndex: 1,
				questionNumber: 2,
				isActive: true,
				isCorrect: true
			}
		]);
		expect(gradeAnswerUseCase.execute).toHaveBeenCalledTimes(2);
		expect(gradeAnswerUseCase.getFillMatchType).toHaveBeenCalledWith(secondQuestion, "b");
	});
});

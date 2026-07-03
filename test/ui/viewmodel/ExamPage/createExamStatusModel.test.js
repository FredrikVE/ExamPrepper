import { jest } from "@jest/globals";
import { QUESTION_TYPES } from "../../../../src/constants/QuestionTypes.js";
import createExamStatusModel from "../../../../src/ui/viewmodel/ExamPage/createExamStatusModel.js";

function createCalculateExamScoreUseCase(scoreModel = { score: 2, totalPoints: 3, percentage: 67 }) {
	return {
		execute: jest.fn(() => scoreModel)
	};
}

const copy = {
	answeredLabel: "besvart"
};

describe("createExamStatusModel", () => {
	it("creates unanswered in-progress labels", () => {
		const calculateExamScoreUseCase = createCalculateExamScoreUseCase();
		const questions = [
			{ id: "q1", type: QUESTION_TYPES.SINGLE },
			{ id: "q2", type: QUESTION_TYPES.MULTI }
		];

		const statusModel = createExamStatusModel({
			questions,
			visibleQuestions: questions,
			currentQuestionIndex: 0,
			answers: {},
			submitted: false,
			showAllFeedback: true,
			elapsedTimeLabel: "00:12",
			calculateExamScoreUseCase,
			copy
		});

		expect(statusModel).toEqual({
			examScore: { score: 2, totalPoints: 3, percentage: 67 },
			answeredCount: 0,
			answeredCountLabel: "0/2",
			answeredPercentLabel: "0%",
			scoreLabel: "—",
			questionProgressLabel: "1 / 2",
			feedbackToggleLabel: "Skjul fasit",
			mobileWorkStatusLabel: "00:12 · 0% besvart",
			canSubmitExam: true
		});
		expect(calculateExamScoreUseCase.execute).toHaveBeenCalledWith(questions, {});
	});

	it("creates submitted labels from answered count and score", () => {
		const calculateExamScoreUseCase = createCalculateExamScoreUseCase({ score: 1.5, totalPoints: 2, percentage: 75 });
		const questions = [
			{ id: "q1", type: QUESTION_TYPES.SINGLE },
			{ id: "q2", type: QUESTION_TYPES.MULTI }
		];

		const statusModel = createExamStatusModel({
			questions,
			visibleQuestions: questions,
			currentQuestionIndex: 1,
			answers: {
				q1: "a",
				q2: ["b"]
			},
			submitted: true,
			showAllFeedback: false,
			elapsedTimeLabel: "03:45",
			calculateExamScoreUseCase,
			copy
		});

		expect(statusModel).toEqual({
			examScore: { score: 1.5, totalPoints: 2, percentage: 75 },
			answeredCount: 2,
			answeredCountLabel: "2/2",
			answeredPercentLabel: "100%",
			scoreLabel: "1.5/2",
			questionProgressLabel: "2 / 2",
			feedbackToggleLabel: "Vis fasit",
			mobileWorkStatusLabel: "03:45 · 100% besvart",
			canSubmitExam: false
		});
	});

	it("keeps empty exams non-submittable with zero progress", () => {
		const statusModel = createExamStatusModel({
			questions: [],
			visibleQuestions: [],
			currentQuestionIndex: 0,
			answers: {},
			submitted: false,
			showAllFeedback: true,
			elapsedTimeLabel: "00:00",
			calculateExamScoreUseCase: createCalculateExamScoreUseCase({ score: 0, totalPoints: 0, percentage: 0 }),
			copy
		});

		expect(statusModel.answeredCountLabel).toBe("0/0");
		expect(statusModel.answeredPercentLabel).toBe("0%");
		expect(statusModel.questionProgressLabel).toBe("0 / 0");
		expect(statusModel.canSubmitExam).toBe(false);
	});
});

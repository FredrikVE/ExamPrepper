// test/ui/viewmodel/ExamPage/createExamAttemptReview.test.js
import { describe, expect, jest, test } from "@jest/globals";
import { QUESTION_TYPES } from "../../../../src/constants/QuestionTypes.js";
import createExamAttemptReview from "../../../../src/ui/viewmodel/ExamPage/createExamAttemptReview.js";

const questions = [
	{ id: "q-1", type: QUESTION_TYPES.SINGLE, options: [{ id: "a" }, { id: "b" }] },
	{ id: "q-2", type: QUESTION_TYPES.MULTI, options: [{ id: "a" }, { id: "b" }] }
];

const createAttempt = (results) => ({
	attemptId: "attempt-1",
	examId: "exam-1",
	scorePoints: 1,
	totalPoints: 2,
	percentage: 50,
	submittedAt: "2026-11-16T10:00:00.000Z",
	results
});

describe("createExamAttemptReview", () => {
	test("restores the stored answers per question", () => {
		const gradeAnswerUseCase = { execute: jest.fn((question) => question.id === "q-1") };
		const attempt = createAttempt([
			{ questionKey: "q-1", submittedAnswer: "b", pointsAwarded: 1, maxPoints: 1, isCorrect: true },
			{ questionKey: "q-2", submittedAnswer: ["a"], pointsAwarded: 0, maxPoints: 1, isCorrect: false }
		]);

		expect(createExamAttemptReview({ questions, attempt, gradeAnswerUseCase })).toEqual({
			answers: { "q-1": 1, "q-2": [0] },
			hasChangedQuestions: false
		});
	});

	test("leaves out unanswered questions", () => {
		const gradeAnswerUseCase = { execute: jest.fn(() => false) };
		const attempt = createAttempt([
			{ questionKey: "q-1", submittedAnswer: null, pointsAwarded: 0, maxPoints: 1, isCorrect: false },
			{ questionKey: "q-2", submittedAnswer: null, pointsAwarded: 0, maxPoints: 1, isCorrect: false }
		]);

		expect(createExamAttemptReview({ questions, attempt, gradeAnswerUseCase }).answers).toEqual({});
	});

	test("flags a question that grades differently today", () => {
		const gradeAnswerUseCase = { execute: jest.fn(() => false) };
		const attempt = createAttempt([
			{ questionKey: "q-1", submittedAnswer: "b", pointsAwarded: 1, maxPoints: 1, isCorrect: true },
			{ questionKey: "q-2", submittedAnswer: ["a"], pointsAwarded: 0, maxPoints: 1, isCorrect: false }
		]);

		expect(createExamAttemptReview({ questions, attempt, gradeAnswerUseCase }).hasChangedQuestions).toBe(true);
	});

	test("flags a question that was added to the set after the attempt", () => {
		const gradeAnswerUseCase = { execute: jest.fn(() => true) };
		const attempt = createAttempt([
			{ questionKey: "q-1", submittedAnswer: "b", pointsAwarded: 1, maxPoints: 1, isCorrect: true }
		]);

		expect(createExamAttemptReview({ questions, attempt, gradeAnswerUseCase }).hasChangedQuestions).toBe(true);
	});

	test("flags a question that was removed from the set after the attempt", () => {
		const gradeAnswerUseCase = { execute: jest.fn(() => true) };
		const attempt = createAttempt([
			{ questionKey: "q-1", submittedAnswer: "b", pointsAwarded: 1, maxPoints: 1, isCorrect: true },
			{ questionKey: "q-2", submittedAnswer: ["a"], pointsAwarded: 1, maxPoints: 1, isCorrect: true },
			{ questionKey: "q-removed", submittedAnswer: "a", pointsAwarded: 1, maxPoints: 1, isCorrect: true }
		]);

		expect(createExamAttemptReview({ questions, attempt, gradeAnswerUseCase }).hasChangedQuestions).toBe(true);
	});

	test("returns no answers before the attempt is loaded", () => {
		expect(createExamAttemptReview({ questions, attempt: null, gradeAnswerUseCase: { execute: jest.fn() } })).toEqual({
			answers: {},
			hasChangedQuestions: false
		});
	});
});

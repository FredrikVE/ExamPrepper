// test/model/domain/exams/GetExamAttemptUseCase.test.js
import { describe, expect, jest, test } from "@jest/globals";
import GetExamAttemptUseCase from "../../../../src/model/domain/exams/GetExamAttemptUseCase.js";

describe("GetExamAttemptUseCase", () => {
	test("maps a stored attempt with numeric points from Postgres strings", async () => {
		const repository = {
			getAttemptById: jest.fn(async () => ({
				id: "attempt-1",
				examId: "exam-1",
				lang: "no",
				userId: "user-1",
				scorePoints: "3.50",
				totalPoints: "4.00",
				percentage: "87.50",
				startedAt: "2026-11-16T09:50:00.000Z",
				submittedAt: "2026-11-16T10:00:00.000Z",
				results: [
					{ questionKey: "q-1", questionId: "uuid-1", submittedAnswer: "a", pointsAwarded: "2.00", maxPoints: "2.00", isCorrect: true },
					{ questionKey: "q-2", questionId: "uuid-2", submittedAnswer: null, pointsAwarded: 1.5, maxPoints: 2, isCorrect: false }
				]
			}))
		};

		const attempt = await new GetExamAttemptUseCase(repository).execute("attempt-1");

		expect(repository.getAttemptById).toHaveBeenCalledWith("attempt-1");
		expect(attempt).toEqual({
			attemptId: "attempt-1",
			examId: "exam-1",
			scorePoints: 3.5,
			totalPoints: 4,
			percentage: 87.5,
			submittedAt: "2026-11-16T10:00:00.000Z",
			results: [
				{ questionKey: "q-1", submittedAnswer: "a", pointsAwarded: 2, maxPoints: 2, isCorrect: true },
				{ questionKey: "q-2", submittedAnswer: null, pointsAwarded: 1.5, maxPoints: 2, isCorrect: false }
			]
		});
	});

	test("keeps a missing percentage as null", async () => {
		const repository = {
			getAttemptById: jest.fn(async () => ({ id: "attempt-1", examId: "exam-1", scorePoints: 0, totalPoints: 0, percentage: null, submittedAt: "x", results: [] }))
		};

		const attempt = await new GetExamAttemptUseCase(repository).execute("attempt-1");

		expect(attempt.percentage).toBe(null);
	});

	test("rejects a missing attempt id", async () => {
		const repository = { getAttemptById: jest.fn() };

		await expect(new GetExamAttemptUseCase(repository).execute("")).rejects.toThrow("attemptId");
		expect(repository.getAttemptById).not.toHaveBeenCalled();
	});

	test("rejects an attempt without results", async () => {
		const repository = { getAttemptById: jest.fn(async () => ({ id: "attempt-1" })) };

		await expect(new GetExamAttemptUseCase(repository).execute("attempt-1")).rejects.toThrow("no results");
	});
});

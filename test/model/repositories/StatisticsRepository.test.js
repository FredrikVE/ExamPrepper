// test/model/repositories/StatisticsRepository.test.js
import { describe, expect, jest, test } from "@jest/globals";
import StatisticsRepository from "../../../src/model/repositories/StatisticsRepository.js";

const TIMESTAMP = "2026-09-07T10:00:00.000Z";

function createResponse() {
	return {
		subjectId: "in2120",
		completedAttemptCount: 1,
		developmentPeriods: [
			{
				period: "3m",
				windowStartAt: "2026-06-07T12:00:00.000Z",
				windowEndAt: "2026-09-07T12:00:00.000Z",
				averageScorePercentage: 75,
				progressPercentagePoints: 20,
				progressAttemptCount: 1,
				chartPoints: [{ attemptId: "attempt-1", submittedAt: TIMESTAMP, percentage: 75 }]
			}
		],
		attempts: [
			{
				attemptId: "attempt-1",
				examId: "exam-1",
				baseId: "base-1",
				testType: "exam",
				title: "Exam 1",
				submittedAt: TIMESTAMP,
				scorePoints: 3,
				totalPoints: 4,
				percentage: 75,
				performanceBand: "progress",
				correctCount: 3,
				incorrectCount: 1,
				durationSeconds: 90
			}
		],
		chapters: [
			{
				topicAreaKey: "chapter-1",
				labelNo: "Kapittel 1",
				labelEn: "Chapter 1",
				iconKey: null,
				position: 1,
				masteryPercentage: 75,
				performanceBand: "progress"
			}
		]
	};
}

describe("StatisticsRepository", () => {
	test("maps backend-computed Statistics Overview values without recalculating them", async () => {
		const response = createResponse();
		const statisticsDataSource = { fetchSubjectStatistics: jest.fn().mockResolvedValue(response) };
		const repository = new StatisticsRepository(statisticsDataSource);

		const result = await repository.getSubjectStatistics("in2120");

		expect(statisticsDataSource.fetchSubjectStatistics).toHaveBeenCalledWith("in2120");
		expect(result.completedAttemptCount).toBe(1);
		expect(result.developmentPeriods[0]).toMatchObject({
			period: "3m",
			windowStartAt: "2026-06-07T12:00:00.000Z",
			windowEndAt: "2026-09-07T12:00:00.000Z",
			averageScorePercentage: 75,
			progressPercentagePoints: 20,
			progressAttemptCount: 1
		});
		expect(result.developmentPeriods[0].chartPoints[0].submittedAtEpochMs).toBe(Date.parse(TIMESTAMP));
		expect(result.attempts[0]).toMatchObject({
			percentage: 75,
			performanceBand: "progress",
			submittedAtEpochMs: Date.parse(TIMESTAMP)
		});
		expect(result.chapters[0]).toEqual({ topicAreaKey: "chapter-1", labelNo: "Kapittel 1", labelEn: "Chapter 1", iconKey: null, position: 1, masteryPercentage: 75, performanceBand: "progress" });
	});

	test("fails fast when a backend zoom-window timestamp is invalid", async () => {
		const response = createResponse();
		response.developmentPeriods[0].windowStartAt = "invalid";
		const statisticsDataSource = { fetchSubjectStatistics: jest.fn().mockResolvedValue(response) };
		const repository = new StatisticsRepository(statisticsDataSource);

		await expect(repository.getSubjectStatistics("in2120")).rejects.toThrow("Invalid statistics timestamp");
	});

	test("fails fast when a mapped Statistics timestamp is invalid", async () => {
		const response = createResponse();
		response.developmentPeriods[0].chartPoints[0].submittedAt = "invalid";
		const statisticsDataSource = { fetchSubjectStatistics: jest.fn().mockResolvedValue(response) };
		const repository = new StatisticsRepository(statisticsDataSource);

		await expect(repository.getSubjectStatistics("in2120")).rejects.toThrow("Invalid statistics timestamp");
	});
});

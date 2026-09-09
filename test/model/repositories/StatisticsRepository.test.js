// test/model/repositories/StatisticsRepository.test.js
import { describe, expect, jest, test } from "@jest/globals";
import StatisticsRepository from "../../../src/model/repositories/StatisticsRepository.js";

const TIMESTAMP = "2026-09-07T10:00:00.000Z";

function createDevelopmentPeriod() {
	return {
		period: "3m",
		windowStartAt: "2026-06-07T12:00:00.000Z",
		windowEndAt: "2026-09-07T12:00:00.000Z",
		progressPercentagePoints: 20,
		progressEvidenceCount: 2,
		chartPoints: [{ key: "learning-session:one", occurredAt: TIMESTAMP, percentage: 75, evidenceCount: 1 }]
	};
}

function createResponse() {
	return {
		subjectId: "in2120",
		completedAttemptCount: 1,
		subjectMastery: {
			masteryPercentage: 37.5,
			performanceBand: "practice",
			developmentPeriods: [createDevelopmentPeriod()]
		},
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
				performanceBand: "progress",
				developmentPeriods: [createDevelopmentPeriod()]
			}
		]
	};
}

describe("StatisticsRepository", () => {
	test("maps subject and chapter mastery history without recalculating backend policy", async () => {
		const response = createResponse();
		const statisticsDataSource = { fetchSubjectStatistics: jest.fn().mockResolvedValue(response) };
		const repository = new StatisticsRepository(statisticsDataSource);

		const result = await repository.getSubjectStatistics("in2120");

		expect(statisticsDataSource.fetchSubjectStatistics).toHaveBeenCalledWith("in2120");
		expect(result.subjectMastery).toMatchObject({ masteryPercentage: 37.5, performanceBand: "practice" });
		expect(result.subjectMastery.developmentPeriods[0]).toMatchObject({ progressPercentagePoints: 20, progressEvidenceCount: 2 });
		expect(result.subjectMastery.developmentPeriods[0].chartPoints[0].occurredAtEpochMs).toBe(Date.parse(TIMESTAMP));
		expect(result.attempts[0].submittedAtEpochMs).toBe(Date.parse(TIMESTAMP));
		expect(result.chapters[0]).toMatchObject({ topicAreaKey: "chapter-1", masteryPercentage: 75, performanceBand: "progress" });
		expect(result.chapters[0].developmentPeriods[0].chartPoints[0].key).toBe("learning-session:one");
	});

	test("fails fast when a backend mastery-window timestamp is invalid", async () => {
		const response = createResponse();
		response.subjectMastery.developmentPeriods[0].windowStartAt = "invalid";
		const statisticsDataSource = { fetchSubjectStatistics: jest.fn().mockResolvedValue(response) };
		const repository = new StatisticsRepository(statisticsDataSource);

		await expect(repository.getSubjectStatistics("in2120")).rejects.toThrow("Invalid statistics timestamp");
	});

	test("fails fast when a mapped mastery point timestamp is invalid", async () => {
		const response = createResponse();
		response.chapters[0].developmentPeriods[0].chartPoints[0].occurredAt = "invalid";
		const statisticsDataSource = { fetchSubjectStatistics: jest.fn().mockResolvedValue(response) };
		const repository = new StatisticsRepository(statisticsDataSource);

		await expect(repository.getSubjectStatistics("in2120")).rejects.toThrow("Invalid statistics timestamp");
	});
});

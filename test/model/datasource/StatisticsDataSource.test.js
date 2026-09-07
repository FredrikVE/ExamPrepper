// test/model/datasource/StatisticsDataSource.test.js
import { afterEach, describe, expect, jest, test } from "@jest/globals";
import StatisticsDataSource from "../../../src/model/datasource/StatisticsDataSource.js";

const SUBJECT_ID = "in2120";

function createPayload() {
	return {
		subjectId: SUBJECT_ID,
		completedAttemptCount: 1,
		developmentPeriods: [
			createDevelopmentPeriod("1w"),
			createDevelopmentPeriod("1m"),
			createDevelopmentPeriod("3m"),
			createDevelopmentPeriod("6m"),
			createDevelopmentPeriod("1y"),
			createDevelopmentPeriod("all")
		],
		attempts: [
			{
				attemptId: "attempt-1",
				examId: "exam-1",
				baseId: "base-1",
				testType: "exam",
				title: "Exam 1",
				submittedAt: "2026-09-07T10:00:00.000Z",
				scorePoints: 8,
				totalPoints: 10,
				percentage: 80,
				performanceBand: "understood",
				correctCount: 8,
				incorrectCount: 2,
				durationSeconds: 120
			}
		],
		chapters: [
			{
				topicAreaKey: "chapter-1",
				labelNo: "Kapittel 1",
				labelEn: "Chapter 1",
				iconKey: "shield",
				position: 1,
				scorePercentage: 80,
				performanceBand: "understood",
				evidenceCount: 4
			}
		]
	};
}

function createDevelopmentPeriod(period) {
	return {
		period,
		averageScorePercentage: 80,
		progressPercentagePoints: 10,
		chartPoints: [
			{
				attemptId: "attempt-1",
				submittedAt: "2026-09-07T10:00:00.000Z",
				percentage: 80
			}
		]
	};
}

afterEach(() => jest.restoreAllMocks());

describe("StatisticsDataSource", () => {
	test("accepts the complete backend Statistics Overview contract", async () => {
		const payload = createPayload();
		jest.spyOn(globalThis, "fetch").mockResolvedValue({ ok: true, status: 200, text: async () => JSON.stringify(payload) });
		const dataSource = new StatisticsDataSource({ baseUrl: "https://example.test/api", getToken: async () => "token" });

		await expect(dataSource.fetchSubjectStatistics(SUBJECT_ID)).resolves.toEqual(payload);
	});

	test("rejects an incomplete development period contract", async () => {
		const payload = createPayload();
		payload.developmentPeriods = payload.developmentPeriods.filter((developmentPeriod) => developmentPeriod.period !== "1y");
		jest.spyOn(globalThis, "fetch").mockResolvedValue({ ok: true, status: 200, text: async () => JSON.stringify(payload) });
		const dataSource = new StatisticsDataSource({ baseUrl: "https://example.test/api", getToken: async () => "token" });

		await expect(dataSource.fetchSubjectStatistics(SUBJECT_ID)).rejects.toThrow("Missing statistics period 1y");
	});

	test("rejects a performance band that disagrees with an unmeasurable score", async () => {
		const payload = createPayload();
		payload.attempts[0].percentage = null;
		payload.attempts[0].performanceBand = "practice";
		jest.spyOn(globalThis, "fetch").mockResolvedValue({ ok: true, status: 200, text: async () => JSON.stringify(payload) });
		const dataSource = new StatisticsDataSource({ baseUrl: "https://example.test/api", getToken: async () => "token" });

		await expect(dataSource.fetchSubjectStatistics(SUBJECT_ID)).rejects.toThrow("Invalid statistics attempt performanceBand");
	});
});

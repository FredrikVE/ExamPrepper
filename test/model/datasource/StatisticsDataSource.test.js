// test/model/datasource/StatisticsDataSource.test.js
import { afterEach, describe, expect, jest, test } from "@jest/globals";
import StatisticsDataSource from "../../../src/model/datasource/StatisticsDataSource.js";

const SUBJECT_ID = "in2120";

function createPayload() {
	const developmentPeriods = ["1w", "1m", "3m", "6m", "1y", "all"].map(createDevelopmentPeriod);

	return {
		subjectId: SUBJECT_ID,
		completedAttemptCount: 1,
		subjectMastery: {
			masteryPercentage: 40,
			performanceBand: "progress",
			developmentPeriods
		},
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
				masteryPercentage: 80,
				performanceBand: "understood",
				developmentPeriods
			}
		]
	};
}

function createDevelopmentPeriod(period) {
	return {
		period,
		windowStartAt: "2026-08-31T12:00:00.000Z",
		windowEndAt: "2026-09-07T12:00:00.000Z",
		progressPercentagePoints: 10,
		progressEvidenceCount: 1,
		chartPoints: [
			{
				key: "learning-session:one",
				occurredAt: "2026-09-07T10:00:00.000Z",
				percentage: 80,
				evidenceCount: 1
			}
		]
	};
}

afterEach(() => jest.restoreAllMocks());

describe("StatisticsDataSource", () => {
	test("accepts subject and chapter mastery scopes with backend-owned history", async () => {
		const payload = createPayload();
		jest.spyOn(globalThis, "fetch").mockResolvedValue({ ok: true, status: 200, text: async () => JSON.stringify(payload) });
		const dataSource = new StatisticsDataSource({ baseUrl: "https://example.test/api", getToken: async () => "token" });

		await expect(dataSource.fetchSubjectStatistics(SUBJECT_ID)).resolves.toEqual(payload);
	});

	test("rejects a subject mastery scope with an incomplete period contract", async () => {
		const payload = createPayload();
		payload.subjectMastery.developmentPeriods = payload.subjectMastery.developmentPeriods.filter((developmentPeriod) => developmentPeriod.period !== "1y");
		jest.spyOn(globalThis, "fetch").mockResolvedValue({ ok: true, status: 200, text: async () => JSON.stringify(payload) });
		const dataSource = new StatisticsDataSource({ baseUrl: "https://example.test/api", getToken: async () => "token" });

		await expect(dataSource.fetchSubjectStatistics(SUBJECT_ID)).rejects.toThrow("Missing statistics period 1y");
	});

	test("rejects a mastery period without its backend-owned evidence count", async () => {
		const payload = createPayload();
		delete payload.subjectMastery.developmentPeriods[0].progressEvidenceCount;
		jest.spyOn(globalThis, "fetch").mockResolvedValue({ ok: true, status: 200, text: async () => JSON.stringify(payload) });
		const dataSource = new StatisticsDataSource({ baseUrl: "https://example.test/api", getToken: async () => "token" });

		await expect(dataSource.fetchSubjectStatistics(SUBJECT_ID)).rejects.toThrow("Invalid statistics progressEvidenceCount");
	});

	test("rejects a chapter mastery band that disagrees with an unassessed percentage", async () => {
		const payload = createPayload();
		payload.chapters[0].masteryPercentage = null;
		payload.chapters[0].performanceBand = "practice";
		jest.spyOn(globalThis, "fetch").mockResolvedValue({ ok: true, status: 200, text: async () => JSON.stringify(payload) });
		const dataSource = new StatisticsDataSource({ baseUrl: "https://example.test/api", getToken: async () => "token" });

		await expect(dataSource.fetchSubjectStatistics(SUBJECT_ID)).rejects.toThrow("Invalid statistics chapter performanceBand");
	});
});

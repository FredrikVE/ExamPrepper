// test/model/domain/statistics/GetSubjectStatisticsUseCase.test.js
import { describe, expect, jest, test } from "@jest/globals";
import GetSubjectStatisticsUseCase from "../../../../src/model/domain/statistics/GetSubjectStatisticsUseCase.js";

describe("GetSubjectStatisticsUseCase", () => {
	test("requires a non-empty string subject id", async () => {
		const repository = { getSubjectStatistics: jest.fn() };
		const useCase = new GetSubjectStatisticsUseCase(repository);

		await expect(useCase.execute({ subjectId: "" })).rejects.toThrow("requires subjectId");
		await expect(useCase.execute({ subjectId: null })).rejects.toThrow("requires subjectId");
		await expect(useCase.execute({ subjectId: 2120 })).rejects.toThrow("requires subjectId");
		expect(repository.getSubjectStatistics).not.toHaveBeenCalled();
	});

	test("loads statistics only for the requested subject", async () => {
		const statistics = { subjectId: "in2120", completedAttemptCount: 0, developmentPeriods: [], attempts: [], chapters: [] };
		const repository = { getSubjectStatistics: jest.fn().mockResolvedValue(statistics) };
		const useCase = new GetSubjectStatisticsUseCase(repository);

		await expect(useCase.execute({ subjectId: "in2120" })).resolves.toBe(statistics);
		expect(repository.getSubjectStatistics).toHaveBeenCalledWith("in2120");
	});
});

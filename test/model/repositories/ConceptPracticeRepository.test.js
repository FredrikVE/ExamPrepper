// test/model/repositories/ConceptPracticeRepository.test.js
import { describe, expect, jest, test } from "@jest/globals";
import ConceptPracticeRepository from "../../../src/model/repositories/ConceptPracticeRepository.js";

describe("ConceptPracticeRepository", () => {
	test("maps fetch-prefixed DataSource methods to matching get-prefixed Repository methods", async () => {
		const flipcardRawResult = { raw: "flipcard" };
		const matchCardRawResult = { raw: "match-card" };
		const dataSource = {
			fetchRecordFlipcardAssessment: jest.fn().mockResolvedValue(flipcardRawResult),
			fetchRecordMatchCardResult: jest.fn().mockResolvedValue(matchCardRawResult)
		};
		const repository = new ConceptPracticeRepository(dataSource);
		const flipcardCommand = {
			eventId: "event-1",
			subjectId: "in2120",
			glossaryEntryKey: "concept-a",
			assessment: "practice"
		};
		const matchCardCommand = {
			eventId: "event-2",
			subjectId: "in2120",
			glossaryEntryKey: "concept-b",
			wrongAttemptCount: 1
		};

		await expect(repository.getRecordFlipcardAssessment(flipcardCommand)).resolves.toBe(flipcardRawResult);
		await expect(repository.getRecordMatchCardResult(matchCardCommand)).resolves.toBe(matchCardRawResult);

		expect(dataSource.fetchRecordFlipcardAssessment).toHaveBeenCalledWith(flipcardCommand);
		expect(dataSource.fetchRecordMatchCardResult).toHaveBeenCalledWith(matchCardCommand);
	});
});

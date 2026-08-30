// test/model/domain/mastery/RecordMatchCardResultUseCase.test.js
import { describe, expect, jest, test } from "@jest/globals";
import RecordMatchCardResultUseCase from "../../../../src/model/domain/mastery/RecordMatchCardResultUseCase.js";

describe("RecordMatchCardResultUseCase", () => {
	test("forwards a complete MatchCards result command", async () => {
		const repository = { getRecordMatchCardResult: jest.fn().mockResolvedValue(undefined) };
		const useCase = new RecordMatchCardResultUseCase(repository);
		const command = {
			eventId: "event-2",
			subjectId: "in2120",
			glossaryEntryKey: "concept-b",
			wrongAttemptCount: 2
		};

		await useCase.execute(command);

		expect(repository.getRecordMatchCardResult).toHaveBeenCalledWith(command);
	});

	test("rejects missing identity and invalid wrong-attempt counts", async () => {
		const repository = { getRecordMatchCardResult: jest.fn() };
		const useCase = new RecordMatchCardResultUseCase(repository);

		await expect(useCase.execute({
			eventId: "event-2",
			subjectId: "",
			glossaryEntryKey: "concept-b",
			wrongAttemptCount: 0
		})).rejects.toThrow("subjectId must be a non-empty string");
		await expect(useCase.execute({
			eventId: "event-2",
			subjectId: "in2120",
			glossaryEntryKey: "concept-b",
			wrongAttemptCount: -1
		})).rejects.toThrow("wrongAttemptCount must be a non-negative integer");
		expect(repository.getRecordMatchCardResult).not.toHaveBeenCalled();
	});
});

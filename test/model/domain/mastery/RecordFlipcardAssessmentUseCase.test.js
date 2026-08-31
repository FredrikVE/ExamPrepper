// test/model/domain/mastery/RecordFlipcardAssessmentUseCase.test.js
import { describe, expect, jest, test } from "@jest/globals";
import RecordFlipcardAssessmentUseCase from "../../../../src/model/domain/mastery/RecordFlipcardAssessmentUseCase.js";

describe("RecordFlipcardAssessmentUseCase", () => {
	test("forwards a complete concept-practice command", async () => {
		const repository = { getRecordFlipcardAssessment: jest.fn().mockResolvedValue(undefined) };
		const useCase = new RecordFlipcardAssessmentUseCase(repository);
		const command = {
			eventId: "event-1",
			subjectId: "in2120",
			glossaryEntryKey: "concept-a",
			assessment: "understood"
		};

		await useCase.execute(command);

		expect(repository.getRecordFlipcardAssessment).toHaveBeenCalledWith(command);
	});

	test("fails fast instead of hiding missing identity or invalid assessment", async () => {
		const repository = { getRecordFlipcardAssessment: jest.fn() };
		const useCase = new RecordFlipcardAssessmentUseCase(repository);

		await expect(useCase.execute({
			eventId: "",
			subjectId: "in2120",
			glossaryEntryKey: "concept-a",
			assessment: "understood"
		})).rejects.toThrow("eventId must be a non-empty string");
		await expect(useCase.execute({
			eventId: "event-1",
			subjectId: "in2120",
			glossaryEntryKey: "concept-a",
			assessment: "progress"
		})).rejects.toThrow("Flipcard assessment must be practice or understood");
		expect(repository.getRecordFlipcardAssessment).not.toHaveBeenCalled();
	});
});

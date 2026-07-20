// test/model/domain/GetGlossaryEntriesForSubjectUseCase.test.js
import { describe, expect, jest, test, beforeEach } from "@jest/globals";
import GetGlossaryEntriesForSubjectUseCase from "../../../src/model/domain/GetGlossaryEntriesForSubjectUseCase.js";
import { ALL_TOPIC_AREAS } from "../../../src/model/domain/utils/topicAreaFilters.js";

describe("GetGlossaryEntriesForSubjectUseCase", () => {
	let glossaryRepository;
	let useCase;

	beforeEach(() => {
		glossaryRepository = {
			getGlossaryEntriesBySubject: jest.fn().mockResolvedValue([]),
			getGlossaryEntriesBySubjectAndTopicArea: jest.fn().mockResolvedValue([])
		};
		useCase = new GetGlossaryEntriesForSubjectUseCase(glossaryRepository);
	});

	test("returns empty list without subject id", async () => {
		const result = await useCase.execute({ subjectId: null, topicAreaKey: ALL_TOPIC_AREAS });

		expect(result).toEqual([]);
		expect(glossaryRepository.getGlossaryEntriesBySubject).not.toHaveBeenCalled();
	});

	test("fetches all glossary entries for all topic areas", async () => {
		await useCase.execute({ subjectId: "in2120", topicAreaKey: ALL_TOPIC_AREAS });

		expect(glossaryRepository.getGlossaryEntriesBySubject).toHaveBeenCalledWith({ subjectId: "in2120" });
	});

	test("fetches glossary entries for selected topic area", async () => {
		await useCase.execute({ subjectId: "in2120", topicAreaKey: "kryptografi" });

		expect(glossaryRepository.getGlossaryEntriesBySubjectAndTopicArea).toHaveBeenCalledWith({
			subjectId: "in2120",
			topicAreaKey: "kryptografi"
		});
	});
});

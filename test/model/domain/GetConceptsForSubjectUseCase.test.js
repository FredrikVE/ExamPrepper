// test/model/domain/GetConceptsForSubjectUseCase.test.js
import { describe, expect, jest, test, beforeEach } from "@jest/globals";
import GetConceptsForSubjectUseCase from "../../../src/model/domain/GetConceptsForSubjectUseCase.js";
import { ALL_TOPIC_AREAS } from "../../../src/model/domain/utils/topicAreaFilters.js";

describe("GetConceptsForSubjectUseCase", () => {
	let conceptRepository;
	let useCase;

	beforeEach(() => {
		conceptRepository = {
			getConceptsBySubject: jest.fn().mockResolvedValue([]),
			getConceptsBySubjectAndTopicArea: jest.fn().mockResolvedValue([])
		};
		useCase = new GetConceptsForSubjectUseCase(conceptRepository);
	});

	test("returns empty list without subject id", async () => {
		const result = await useCase.execute({ subjectId: null, topicAreaKey: ALL_TOPIC_AREAS });

		expect(result).toEqual([]);
		expect(conceptRepository.getConceptsBySubject).not.toHaveBeenCalled();
	});

	test("fetches all concepts for all topic areas", async () => {
		await useCase.execute({ subjectId: "in2120", topicAreaKey: ALL_TOPIC_AREAS });

		expect(conceptRepository.getConceptsBySubject).toHaveBeenCalledWith({ subjectId: "in2120" });
	});

	test("fetches concepts for selected topic area", async () => {
		await useCase.execute({ subjectId: "in2120", topicAreaKey: "kryptografi" });

		expect(conceptRepository.getConceptsBySubjectAndTopicArea).toHaveBeenCalledWith({
			subjectId: "in2120",
			topicAreaKey: "kryptografi"
		});
	});
});

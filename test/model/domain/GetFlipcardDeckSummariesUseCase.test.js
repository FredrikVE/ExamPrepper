// test/model/domain/GetFlipcardDeckSummariesUseCase.test.js
import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import GetFlipcardDeckSummariesUseCase from "../../../src/model/domain/GetFlipcardDeckSummariesUseCase.js";

const concepts = [
	{ id: "concept-a", topicAreaKey: "iam" },
	{ id: "concept-b", topicAreaKey: "iam" },
	{ id: "concept-c", topicAreaKey: "crypto" }
];

const topicAreas = [
	{
		key: "crypto",
		label: { no: "Kryptografi", en: "Cryptography" },
		iconKey: "key",
		position: 2
	},
	{
		key: "iam",
		label: { no: "Identitet", en: "Identity" },
		iconKey: "shield",
		position: 1
	},
	{
		key: "unused",
		label: { no: "Tom", en: "Empty" },
		iconKey: "archive",
		position: 3
	}
];

describe("GetFlipcardDeckSummariesUseCase", () => {
	let conceptRepository;
	let subjectRepository;
	let useCase;

	beforeEach(() => {
		conceptRepository = {
			getConceptsBySubject: jest.fn().mockResolvedValue(concepts)
		};
		subjectRepository = {
			getTopicAreasBySubject: jest.fn().mockResolvedValue(topicAreas)
		};
		useCase = new GetFlipcardDeckSummariesUseCase(conceptRepository, subjectRepository);
	});

	test("returns empty list when subject id is missing", async () => {
		const result = await useCase.execute({ subjectId: null, language: "no" });

		expect(result).toEqual([]);
		expect(conceptRepository.getConceptsBySubject).not.toHaveBeenCalled();
		expect(subjectRepository.getTopicAreasBySubject).not.toHaveBeenCalled();
	});

	test("builds localized flipcard deck summaries from concepts", async () => {
		const result = await useCase.execute({ subjectId: "in2120", language: "en" });

		expect(conceptRepository.getConceptsBySubject).toHaveBeenCalledWith({ subjectId: "in2120" });
		expect(subjectRepository.getTopicAreasBySubject).toHaveBeenCalledWith("in2120");
		expect(result).toEqual([
			{
				key: "iam",
				topicAreaKey: "iam",
				title: "Identity",
				cardCount: 2,
				estimatedMinutes: 5,
				iconKey: "shield",
				position: 1
			},
			{
				key: "crypto",
				topicAreaKey: "crypto",
				title: "Cryptography",
				cardCount: 1,
				estimatedMinutes: 5,
				iconKey: "key",
				position: 2
			}
		]);
	});
});

// test/model/domain/GetFlipcardDeckSummariesUseCase.test.js
import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import GetFlipcardDeckSummariesUseCase from "../../../src/model/domain/GetFlipcardDeckSummariesUseCase.js";

const glossaryEntries = [
	{ id: "entry-a", topicAreaKey: "iam" },
	{ id: "entry-b", topicAreaKey: "iam" },
	{ id: "entry-c", topicAreaKey: "crypto" }
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
	let glossaryRepository;
	let subjectRepository;
	let useCase;

	beforeEach(() => {
		glossaryRepository = {
			getGlossaryEntriesBySubject: jest.fn().mockResolvedValue(glossaryEntries)
		};
		subjectRepository = {
			getTopicAreasBySubject: jest.fn().mockResolvedValue(topicAreas)
		};
		useCase = new GetFlipcardDeckSummariesUseCase(glossaryRepository, subjectRepository);
	});

	test("returns empty list when subject id is missing", async () => {
		const result = await useCase.execute({ subjectId: null, language: "no" });

		expect(result).toEqual([]);
		expect(glossaryRepository.getGlossaryEntriesBySubject).not.toHaveBeenCalled();
		expect(subjectRepository.getTopicAreasBySubject).not.toHaveBeenCalled();
	});

	test("builds localized flipcard deck summaries from glossary entries", async () => {
		const result = await useCase.execute({ subjectId: "in2120", language: "en" });

		expect(glossaryRepository.getGlossaryEntriesBySubject).toHaveBeenCalledWith({ subjectId: "in2120" });
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

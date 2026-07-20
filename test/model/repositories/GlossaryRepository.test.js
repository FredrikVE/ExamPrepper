// test/model/repositories/GlossaryRepository.test.js
import { describe, expect, jest, test } from "@jest/globals";
import GlossaryRepository from "../../../src/model/repositories/GlossaryRepository.js";

describe("GlossaryRepository", () => {
	test("maps glossary entries from the glossary API response", async () => {
		const glossaryDataSource = {
			fetchGlossaryEntriesBySubject: jest.fn().mockResolvedValue({
				glossaryEntries: [
					{
						glossaryEntryKey: "kap1-konfidensialitet",
						topicAreaKey: "begreper",
						term: { no: "Konfidensialitet", en: "Confidentiality" },
						explanation: { no: "Norsk", en: "English" },
						position: 4
					}
				]
			})
		};
		const repository = new GlossaryRepository(glossaryDataSource);

		const result = await repository.getGlossaryEntriesBySubject({ subjectId: "in2120" });

		expect(glossaryDataSource.fetchGlossaryEntriesBySubject).toHaveBeenCalledWith({
			subjectId: "in2120"
		});
		expect(result).toEqual([
			{
				id: "kap1-konfidensialitet",
				glossaryEntryKey: "kap1-konfidensialitet",
				topicAreaKey: "begreper",
				term: { no: "Konfidensialitet", en: "Confidentiality" },
				explanation: { no: "Norsk", en: "English" },
				position: 4
			}
		]);
	});
});

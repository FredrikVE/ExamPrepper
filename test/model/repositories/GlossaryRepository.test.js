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
	test("maps canonical overview mastery and typed network relations", async () => {
		const concept = {
			glossaryEntryKey: "kap1-konfidensialitet",
			topicAreaKey: "begreper",
			term: { no: "Konfidensialitet", en: "Confidentiality" },
			explanation: { no: "Norsk", en: "English" },
			position: 4,
			mastery: null
		};
		const relation = {
			subjectId: "in2120",
			sourceGlossaryKey: "kap1-konfidensialitet",
			targetGlossaryKey: "kap1-integritet",
			type: "contrasts-with"
		};
		const glossaryDataSource = {
			fetchGlossaryOverview: jest.fn().mockResolvedValue({
				subjectId: "in2120",
				concepts: [concept]
			}),
			fetchGlossaryNetwork: jest.fn().mockResolvedValue({
				subjectId: "in2120",
				center: concept,
				nodes: [concept],
				relations: [relation],
				limit: 8,
				depth: 1
			})
		};
		const repository = new GlossaryRepository(glossaryDataSource);

		const overview = await repository.getGlossaryOverview({ subjectId: "in2120" });
		const network = await repository.getGlossaryNetwork({
			subjectId: "in2120",
			glossaryEntryKey: "kap1-konfidensialitet"
		});

		expect(overview[0]).toMatchObject({
			id: "kap1-konfidensialitet",
			glossaryEntryKey: "kap1-konfidensialitet",
			mastery: null
		});
		expect(network.relations).toEqual([relation]);
		expect(network.limit).toBe(8);
		expect(network.depth).toBe(1);
	});

});

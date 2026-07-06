// test/model/repositories/ConceptRepository.test.js
import { describe, expect, jest, test } from "@jest/globals";
import ConceptRepository from "../../../src/model/repositories/ConceptRepository.js";

describe("ConceptRepository", () => {
	test("maps concepts from the concepts API response", async () => {
		const conceptDataSource = {
			fetchConceptsBySubject: jest.fn().mockResolvedValue({
				concepts: [
					{
						conceptKey: "kap1-konfidensialitet",
						topicAreaKey: "begreper",
						term: { no: "Konfidensialitet", en: "Confidentiality" },
						explanation: { no: "Norsk", en: "English" },
						position: 4
					}
				]
			})
		};
		const repository = new ConceptRepository(conceptDataSource);

		const result = await repository.getConceptsBySubject({ subjectId: "in2120" });

		expect(conceptDataSource.fetchConceptsBySubject).toHaveBeenCalledWith("in2120");
		expect(result).toEqual([
			{
				id: "kap1-konfidensialitet",
				conceptKey: "kap1-konfidensialitet",
				topicAreaKey: "begreper",
				term: { no: "Konfidensialitet", en: "Confidentiality" },
				explanation: { no: "Norsk", en: "English" },
				position: 4
			}
		]);
	});
});

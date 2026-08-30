// test/model/datasource/ConceptPracticeDataSource.test.js
import { afterEach, describe, expect, jest, test } from "@jest/globals";
import ConceptPracticeDataSource from "../../../src/model/datasource/ConceptPracticeDataSource.js";

afterEach(() => jest.restoreAllMocks());

describe("ConceptPracticeDataSource", () => {
	test("posts a FlipCard assessment with auth and stable event identity", async () => {
		const fetchMock = jest.spyOn(globalThis, "fetch").mockResolvedValue(createNoContentResponse());
		const dataSource = new ConceptPracticeDataSource({
			baseUrl: "https://api.example.test/api/",
			getToken: async () => "token-1"
		});

		const result = await dataSource.fetchRecordFlipcardAssessment({
			eventId: "10000000-0000-4000-8000-000000000001",
			subjectId: "in 2120",
			glossaryEntryKey: "concept-a",
			assessment: "understood"
		});

		expect(result).toBeUndefined();
		expect(fetchMock).toHaveBeenCalledWith(
			"https://api.example.test/api/subjects/in%202120/concept-practice/flipcards",
			{
				method: "POST",
				headers: {
					Accept: "application/json",
					Authorization: "Bearer token-1",
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					eventId: "10000000-0000-4000-8000-000000000001",
					glossaryEntryKey: "concept-a",
					assessment: "understood"
				})
			}
		);
	});

	test("posts a MatchCards result with its wrong-attempt count", async () => {
		const fetchMock = jest.spyOn(globalThis, "fetch").mockResolvedValue(createNoContentResponse());
		const dataSource = new ConceptPracticeDataSource({
			baseUrl: "https://api.example.test/api",
			getToken: async () => "token-2"
		});

		const result = await dataSource.fetchRecordMatchCardResult({
			eventId: "10000000-0000-4000-8000-000000000002",
			subjectId: "in2120",
			glossaryEntryKey: "concept-b",
			wrongAttemptCount: 2
		});

		expect(result).toBeUndefined();
		const [, options] = fetchMock.mock.calls[0];
		expect(JSON.parse(options.body)).toEqual({
			eventId: "10000000-0000-4000-8000-000000000002",
			glossaryEntryKey: "concept-b",
			wrongAttemptCount: 2
		});
	});
});

function createNoContentResponse() {
	return {
		ok: true,
		status: 204,
		text: async () => ""
	};
}

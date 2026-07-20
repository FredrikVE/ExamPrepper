// test/model/datasource/ApiGlossaryDataSource.test.js
import { afterEach, beforeEach, describe, expect, jest, test } from "@jest/globals";
import ApiGlossaryDataSource from "../../../src/model/datasource/ApiGlossaryDataSource.js";

const glossaryEntries = [
	{
		glossaryEntryKey: "kap1-konfidensialitet",
		topicAreaKey: "begreper",
		term: { no: "Konfidensialitet", en: "Confidentiality" },
		explanation: { no: "Norsk", en: "English" },
		position: 4
	}
];

function createResponse({ status = 200, payload }) {
	return {
		ok: status >= 200 && status < 300,
		status,
		text: jest.fn().mockResolvedValue(payload === null ? "" : JSON.stringify(payload))
	};
}

describe("ApiGlossaryDataSource", () => {
	let originalFetch;

	beforeEach(() => {
		originalFetch = global.fetch;
		global.fetch = jest.fn();
	});

	afterEach(() => {
		global.fetch = originalFetch;
	});

	test("fetches and preserves the glossary response for a subject", async () => {
		global.fetch.mockResolvedValue(createResponse({
			payload: { glossaryEntries }
		}));
		const dataSource = new ApiGlossaryDataSource({
			baseUrl: "https://api.example.test/"
		});

		const response = await dataSource.fetchGlossaryEntriesBySubject({
			subjectId: "in2120"
		});

		expect(global.fetch).toHaveBeenCalledWith(
			"https://api.example.test/subjects/in2120/glossary",
			{
				method: "GET",
				headers: { Accept: "application/json" }
			}
		);
		expect(response).toEqual({ glossaryEntries });
	});

	test("URL-encodes the subject and optional topic-area keys", async () => {
		global.fetch.mockResolvedValue(createResponse({
			payload: { glossaryEntries }
		}));
		const dataSource = new ApiGlossaryDataSource({
			baseUrl: "https://api.example.test"
		});

		await dataSource.fetchGlossaryEntriesBySubjectAndTopicArea({
			subjectId: "in 2120",
			topicAreaKey: "sikker utvikling/iam"
		});

		expect(global.fetch).toHaveBeenCalledWith(
			"https://api.example.test/subjects/in%202120/glossary?topicArea=sikker%20utvikling%2Fiam",
			expect.objectContaining({ method: "GET" })
		);
	});

	test.each([
		[404, "Subject not found"],
		[500, "Glossary unavailable"]
	])("surfaces controlled API errors for status %i", async (status, errorMessage) => {
		global.fetch.mockResolvedValue(createResponse({
			status,
			payload: { error: errorMessage }
		}));
		const dataSource = new ApiGlossaryDataSource({
			baseUrl: "https://api.example.test"
		});

		await expect(dataSource.fetchGlossaryEntriesBySubject({
			subjectId: "in2120"
		})).rejects.toThrow(errorMessage);
	});

	test.each([
		null,
		{},
		{ glossaryEntries: {} },
		{ glossaryEntries: [{ glossaryEntryKey: "incomplete" }] }
	])("rejects an invalid glossary response shape", async (payload) => {
		global.fetch.mockResolvedValue(createResponse({ payload }));
		const dataSource = new ApiGlossaryDataSource({
			baseUrl: "https://api.example.test"
		});

		await expect(dataSource.fetchGlossaryEntriesBySubject({
			subjectId: "in2120"
		})).rejects.toThrow("Invalid glossary response");
	});
});

//test/model/datasource/GlossaryDataSource.test.js
import { afterEach, beforeEach, describe, expect, jest, test } from "@jest/globals";
import GlossaryDataSource from "../../../src/model/datasource/GlossaryDataSource.js";

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

describe("GlossaryDataSource", () => {
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
		const dataSource = new GlossaryDataSource({
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
		const dataSource = new GlossaryDataSource({
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
		const dataSource = new GlossaryDataSource({
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
		const dataSource = new GlossaryDataSource({
			baseUrl: "https://api.example.test"
		});

		await expect(dataSource.fetchGlossaryEntriesBySubject({
			subjectId: "in2120"
		})).rejects.toThrow("Invalid glossary response");
	});
	test("fetches the canonical glossary overview with optional mastery", async () => {
		const concepts = [{
			...glossaryEntries[0],
			directNeighborCount: 1,
			directNeighborGlossaryKeys: ["kap2-aes"],
			mastery: {
				status: "understood",
				score: 0.9,
				evidenceCount: 5,
				correctCount: 4,
				incorrectCount: 1,
				easyCorrect: 1,
				easyIncorrect: 0,
				mediumCorrect: 2,
				mediumIncorrect: 1,
				hardCorrect: 1,
				hardIncorrect: 0,
				lastEvidenceAt: "2026-08-10T10:00:00.000Z",
				policyVersion: 1
			}
		}];
		global.fetch.mockResolvedValue(createResponse({
			payload: { subjectId: "in2120", concepts }
		}));
		const dataSource = new GlossaryDataSource({ baseUrl: "https://api.example.test" });

		const response = await dataSource.fetchGlossaryOverview({ subjectId: "in2120" });

		expect(global.fetch).toHaveBeenCalledWith(
			"https://api.example.test/subjects/in2120/glossary/overview",
			expect.objectContaining({ method: "GET" })
		);
		expect(response).toEqual({ subjectId: "in2120", concepts });
	});

	test.each([
		{ directNeighborCount: 1 },
		{ directNeighborGlossaryKeys: [] },
		{ directNeighborCount: -1, directNeighborGlossaryKeys: [] },
		{ directNeighborCount: 1.5, directNeighborGlossaryKeys: [] },
		{ directNeighborCount: 0, directNeighborGlossaryKeys: {} },
		{ directNeighborCount: 1, directNeighborGlossaryKeys: [""] },
		{ directNeighborCount: 1, directNeighborGlossaryKeys: [42] }
	])("rejects an overview concept with an invalid direct-neighbor summary", async (summary) => {
		const concept = { ...glossaryEntries[0], mastery: null, ...summary };
		global.fetch.mockResolvedValue(createResponse({
			payload: { subjectId: "in2120", concepts: [concept] }
		}));
		const dataSource = new GlossaryDataSource({ baseUrl: "https://api.example.test" });

		await expect(dataSource.fetchGlossaryOverview({ subjectId: "in2120" })).rejects.toThrow("Invalid glossary response");
	});

	test("fetches and validates a typed glossary network", async () => {
		const center = { ...glossaryEntries[0], mastery: null };
		const payload = {
			subjectId: "in2120",
			center,
			nodes: [center],
			relations: [{
				subjectId: "in2120",
				sourceGlossaryKey: "kap1-konfidensialitet",
				targetGlossaryKey: "kap1-integritet",
				type: "related"
			}],
			limit: 8,
			depth: 1
		};
		global.fetch.mockResolvedValue(createResponse({ payload }));
		const dataSource = new GlossaryDataSource({ baseUrl: "https://api.example.test" });

		const response = await dataSource.fetchGlossaryNetwork({
			subjectId: "in 2120",
			glossaryEntryKey: "kap1/konfidensialitet"
		});

		expect(global.fetch).toHaveBeenCalledWith(
			"https://api.example.test/subjects/in%202120/glossary/kap1%2Fkonfidensialitet/network",
			expect.objectContaining({ method: "GET" })
		);
		expect(response).toEqual(payload);
	});

});

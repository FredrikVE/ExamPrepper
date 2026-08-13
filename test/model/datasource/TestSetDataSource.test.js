// test/model/datasource/TestSetDataSource.test.js
import { afterEach, beforeEach, describe, expect, jest, test } from "@jest/globals";
import TestSetDataSource from "../../../src/model/datasource/TestSetDataSource.js";

function createResponse(payload) {
	return {
		ok: true,
		status: 200,
		text: jest.fn().mockResolvedValue(JSON.stringify(payload))
	};
}

describe("TestSetDataSource", () => {
	let originalFetch;

	beforeEach(() => {
		originalFetch = global.fetch;
		global.fetch = jest.fn();
	});

	afterEach(() => {
		global.fetch = originalFetch;
	});

	test("owns test-set list and detail transport without a question method", async () => {
		global.fetch
			.mockResolvedValueOnce(createResponse([{ id: "in2120" }]))
			.mockResolvedValueOnce(createResponse([{ id: "chapter-no" }]))
			.mockResolvedValueOnce(createResponse({ id: "chapter-no" }));

		const dataSource = new TestSetDataSource({
			baseUrl: "https://api.example.test",
			collectionPath: "/exams",
			subjectCollectionPathSuffix: "/exams"
		});

		await expect(dataSource.fetchAllTestSets()).resolves.toEqual([{ id: "chapter-no" }]);
		await expect(dataSource.fetchTestSetById("chapter/no")).resolves.toEqual({ id: "chapter-no" });
		expect(dataSource.fetchQuestions).toBeUndefined();
		expect(dataSource.fetchPracticeQuestions).toBeUndefined();

		expect(global.fetch.mock.calls.map(([url]) => url)).toEqual([
			"https://api.example.test/subjects",
			"https://api.example.test/subjects/in2120/exams",
			"https://api.example.test/exams/chapter%2Fno"
		]);
	});

	test("uses the explicit ChapterTest list and detail paths when configured", async () => {
		global.fetch
			.mockResolvedValueOnce(createResponse([{ id: "chapter-no" }]))
			.mockResolvedValueOnce(createResponse({ id: "chapter-no" }));
		const dataSource = new TestSetDataSource({
			baseUrl: "https://api.example.test",
			collectionPath: "/chapter-tests",
			subjectCollectionPathSuffix: "/chapter-tests"
		});

		await dataSource.fetchTestSetsBySubject("in2120");
		await dataSource.fetchTestSetById("chapter-1");

		expect(global.fetch.mock.calls.map(([url]) => url)).toEqual([
			"https://api.example.test/subjects/in2120/chapter-tests",
			"https://api.example.test/chapter-tests/chapter-1"
		]);
	});

	test("requires explicit collection paths", () => {
		expect(() => new TestSetDataSource({
			baseUrl: "https://api.example.test",
			collectionPath: "/exams"
		})).toThrow("TestSetDataSource requires subjectCollectionPathSuffix");
	});
});

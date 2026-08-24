// test/model/datasource/SubjectDataSource.test.js
import { afterEach, beforeEach, describe, expect, jest, test } from "@jest/globals";
import SubjectDataSource from "../../../src/model/datasource/SubjectDataSource.js";

function createResponse(payload) {
	return {
		ok: true,
		status: 200,
		text: jest.fn().mockResolvedValue(JSON.stringify(payload))
	};
}

describe("SubjectDataSource", () => {
	let originalFetch;

	beforeEach(() => {
		originalFetch = global.fetch;
		global.fetch = jest.fn().mockResolvedValue(createResponse({ id: "in2120" }));
	});

	afterEach(() => {
		global.fetch = originalFetch;
	});

	test("uses backend-owned practice-test count list and direct detail reads", async () => {
		const dataSource = new SubjectDataSource({ baseUrl: "https://api.example.test" });

		await dataSource.fetchSubjects({ language: "no" });
		await dataSource.fetchSubjectById({ subjectId: "in/2120", language: "en" });

		expect(global.fetch.mock.calls.map(([url]) => url)).toEqual([
			"https://api.example.test/subjects?lang=no",
			"https://api.example.test/subjects/in%2F2120?lang=en"
		]);
	});

	test("omits the language query when language is not provided", async () => {
		const dataSource = new SubjectDataSource({ baseUrl: "https://api.example.test" });

		await dataSource.fetchSubjects();
		await dataSource.fetchSubjectById({ subjectId: "in2120" });

		expect(global.fetch.mock.calls.map(([url]) => url)).toEqual([
			"https://api.example.test/subjects",
			"https://api.example.test/subjects/in2120"
		]);
	});
});

// test/model/datasource/TestSetQuestionDataSource.test.js
import { afterEach, beforeEach, describe, expect, jest, test } from "@jest/globals";
import TestSetQuestionDataSource from "../../../src/model/datasource/TestSetQuestionDataSource.js";

function createResponse(payload) {
	return {
		ok: true,
		status: 200,
		text: jest.fn().mockResolvedValue(JSON.stringify(payload))
	};
}

describe("TestSetQuestionDataSource", () => {
	let originalFetch;

	beforeEach(() => {
		originalFetch = global.fetch;
		global.fetch = jest.fn();
	});

	afterEach(() => {
		global.fetch = originalFetch;
	});

	test("fetches canonical practice questions without normalizing the transport shape", async () => {
		const payload = [{
			id: "q1",
			type: "single",
			options: [{ id: "a", isCorrect: true, feedback: "Riktig" }]
		}];
		global.fetch.mockResolvedValue(createResponse(payload));
		const dataSource = new TestSetQuestionDataSource({
			baseUrl: "https://api.example.test",
			collectionPath: "/exams"
		});

		const result = await dataSource.fetchPracticeQuestions("exam/1");

		expect(result).toEqual(payload);
		expect(result[0].options[0]).not.toHaveProperty("correct");
		expect(global.fetch).toHaveBeenCalledWith(
			"https://api.example.test/exams/exam%2F1/questions?mode=practice",
			{
				method: "GET",
				headers: { Accept: "application/json" }
			}
		);
	});

	test("uses the explicit ChapterTest question path when configured", async () => {
		global.fetch.mockResolvedValue(createResponse([]));
		const dataSource = new TestSetQuestionDataSource({
			baseUrl: "https://api.example.test",
			collectionPath: "/chapter-tests"
		});

		await dataSource.fetchPracticeQuestions("chapter-1");

		expect(global.fetch).toHaveBeenCalledWith(
			"https://api.example.test/chapter-tests/chapter-1/questions?mode=practice",
			expect.objectContaining({ method: "GET" })
		);
	});
});

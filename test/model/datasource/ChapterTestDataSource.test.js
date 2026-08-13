// test/model/datasource/ChapterTestDataSource.test.js
import { afterEach, beforeEach, describe, expect, jest, test } from "@jest/globals";
import ChapterTestDataSource from "../../../src/model/datasource/ChapterTestDataSource.js";

function createResponse(payload) {
    return {
        ok: true,
        status: 200,
        text: jest.fn().mockResolvedValue(JSON.stringify(payload))
    };
}

describe("ChapterTestDataSource", () => {
    let originalFetch;

    beforeEach(() => {
        originalFetch = global.fetch;
        global.fetch = jest.fn();
    });

    afterEach(() => {
        global.fetch = originalFetch;
    });

    test("owns the ChapterTest list and detail endpoints", async () => {
        global.fetch
            .mockResolvedValueOnce(createResponse([{ id: "chapter-no" }]))
            .mockResolvedValueOnce(createResponse({ id: "chapter-no" }));

        const dataSource = new ChapterTestDataSource({
            baseUrl: "https://api.example.test"
        });

        await expect(dataSource.fetchTestSetsBySubject({
            subjectId: "in2120",
            language: "en"
        })).resolves.toEqual([{ id: "chapter-no" }]);
        await expect(dataSource.fetchTestSetById("chapter/1")).resolves.toEqual({ id: "chapter-no" });

        expect(dataSource.fetchAllTestSets).toBeUndefined();
        expect(dataSource.fetchQuestions).toBeUndefined();
        expect(dataSource.fetchPracticeQuestions).toBeUndefined();
        expect(global.fetch.mock.calls.map(([url]) => url)).toEqual([
            "https://api.example.test/subjects/in2120/chapter-tests?lang=en",
            "https://api.example.test/chapter-tests/chapter%2F1"
        ]);
    });
});

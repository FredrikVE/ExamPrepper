// test/model/datasource/ChapterTestQuestionDataSource.test.js
import { afterEach, beforeEach, describe, expect, jest, test } from "@jest/globals";
import ChapterTestQuestionDataSource from "../../../src/model/datasource/ChapterTestQuestionDataSource.js";

function createResponse(payload) {
    return {
        ok: true,
        status: 200,
        text: jest.fn().mockResolvedValue(JSON.stringify(payload))
    };
}

describe("ChapterTestQuestionDataSource", () => {
    let originalFetch;

    beforeEach(() => {
        originalFetch = global.fetch;
        global.fetch = jest.fn();
    });

    afterEach(() => {
        global.fetch = originalFetch;
    });

    test("fetches canonical practice questions from the ChapterTest resource", async () => {
        global.fetch.mockResolvedValue(createResponse([]));
        const dataSource = new ChapterTestQuestionDataSource({
            baseUrl: "https://api.example.test",
            getToken: null
        });

        await dataSource.fetchPracticeQuestions("chapter/1");

        expect(global.fetch).toHaveBeenCalledWith(
            "https://api.example.test/chapter-tests/chapter%2F1/questions?mode=practice",
            {
                method: "GET",
                headers: { Accept: "application/json" }
            }
        );
    });
});

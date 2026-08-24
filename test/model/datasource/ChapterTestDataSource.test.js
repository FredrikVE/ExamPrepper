// test/model/datasource/ChapterTestDataSource.test.js
import { afterEach, beforeEach, describe, expect, jest, test } from "@jest/globals";
import ChapterTestDataSource from "../../../src/model/datasource/ChapterTestDataSource.js";

const chapterTestDto = {
    id: "chapter-no",
    baseId: "chapter",
    subjectId: "in2120",
    testType: "chapter-test",
    lang: "en",
    title: "Chapter test",
    description: "Chapter",
    modeLabel: "CHAPTER 1",
    estimatedMinutes: 30,
    questionCount: 7,
    sortOrder: 10,
    topicAreaKeys: ["kryptografi"]
};

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
            .mockResolvedValueOnce(createResponse([chapterTestDto]))
            .mockResolvedValueOnce(createResponse(chapterTestDto));

        const dataSource = new ChapterTestDataSource({
            baseUrl: "https://api.example.test",
            getToken: null
        });

        await expect(dataSource.fetchTestSetsBySubject({
            subjectId: "in2120",
            language: "en"
        })).resolves.toEqual([chapterTestDto]);
        await expect(dataSource.fetchTestSetById("chapter/1")).resolves.toEqual(chapterTestDto);

        expect(dataSource.fetchAllTestSets).toBeUndefined();
        expect(dataSource.fetchQuestions).toBeUndefined();
        expect(dataSource.fetchPracticeQuestions).toBeUndefined();
        expect(global.fetch.mock.calls.map(([url]) => url)).toEqual([
            "https://api.example.test/subjects/in2120/chapter-tests?lang=en",
            "https://api.example.test/chapter-tests/chapter%2F1"
        ]);
    });
});

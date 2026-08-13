// test/model/datasource/ExamDataSource.test.js
import { afterEach, beforeEach, describe, expect, jest, test } from "@jest/globals";
import ExamDataSource from "../../../src/model/datasource/ExamDataSource.js";

const examDto = {
    id: "exam-no",
    baseId: "exam",
    subjectId: "in2120",
    testType: "exam",
    lang: "no",
    title: "Eksamen",
    description: null,
    modeLabel: null,
    estimatedMinutes: null,
    questionCount: 3,
    sortOrder: 10,
    topicAreaKeys: []
};

function createResponse(payload) {
    return {
        ok: true,
        status: 200,
        text: jest.fn().mockResolvedValue(JSON.stringify(payload))
    };
}

describe("ExamDataSource", () => {
    let originalFetch;

    beforeEach(() => {
        originalFetch = global.fetch;
        global.fetch = jest.fn();
    });

    afterEach(() => {
        global.fetch = originalFetch;
    });

    test("owns the Exam list and detail endpoints", async () => {
        global.fetch
            .mockResolvedValueOnce(createResponse([examDto]))
            .mockResolvedValueOnce(createResponse(examDto));

        const dataSource = new ExamDataSource({
            baseUrl: "https://api.example.test"
        });

        await expect(dataSource.fetchTestSetsBySubject({
            subjectId: "in2120",
            language: "no"
        })).resolves.toEqual([examDto]);
        await expect(dataSource.fetchTestSetById("exam/no")).resolves.toEqual(examDto);

        expect(dataSource.fetchAllTestSets).toBeUndefined();
        expect(dataSource.fetchQuestions).toBeUndefined();
        expect(dataSource.fetchPracticeQuestions).toBeUndefined();
        expect(global.fetch.mock.calls.map(([url]) => url)).toEqual([
            "https://api.example.test/subjects/in2120/exams?lang=no",
            "https://api.example.test/exams/exam%2Fno"
        ]);
    });
});

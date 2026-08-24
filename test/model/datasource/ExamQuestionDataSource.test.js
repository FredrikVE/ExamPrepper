// test/model/datasource/ExamQuestionDataSource.test.js
import { afterEach, beforeEach, describe, expect, jest, test } from "@jest/globals";
import ExamQuestionDataSource from "../../../src/model/datasource/ExamQuestionDataSource.js";

function createResponse(payload) {
    return {
        ok: true,
        status: 200,
        text: jest.fn().mockResolvedValue(JSON.stringify(payload))
    };
}

describe("ExamQuestionDataSource", () => {
    let originalFetch;

    beforeEach(() => {
        originalFetch = global.fetch;
        global.fetch = jest.fn();
    });

    afterEach(() => {
        global.fetch = originalFetch;
    });

    test("fetches canonical practice questions from the Exam resource", async () => {
        const payload = [{
            id: "q1",
            type: "single",
            options: [{ id: "a", isCorrect: true, feedback: "Riktig" }]
        }];
        global.fetch.mockResolvedValue(createResponse(payload));
        const dataSource = new ExamQuestionDataSource({
            baseUrl: "https://api.example.test",
            getToken: null
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
});

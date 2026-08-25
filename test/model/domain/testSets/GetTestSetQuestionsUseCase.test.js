// test/model/domain/testSets/GetTestSetQuestionsUseCase.test.js
import { describe, expect, jest, test, beforeEach } from "@jest/globals";
import GetTestSetQuestionsUseCase from "../../../../src/model/domain/testSets/GetTestSetQuestionsUseCase.js";

describe("GetTestSetQuestionsUseCase", () => {
    let testSetRepository;
    let useCase;

    beforeEach(() => {
        testSetRepository = {
            getTestSetQuestions: jest.fn()
        };

        useCase = new GetTestSetQuestionsUseCase(testSetRepository);
    });

    test("returns empty list when testSetId is missing", async () => {
        const result = await useCase.execute(null);

        expect(result).toEqual([]);
        expect(testSetRepository.getTestSetQuestions).not.toHaveBeenCalled();
    });

    test("returns questions from repository", async () => {
        const questions = [
            { id: 1, prompt: "Question 1" },
            { id: 2, prompt: "Question 2" }
        ];

        testSetRepository.getTestSetQuestions.mockResolvedValue(questions);

        const result = await useCase.execute("mock-exam-1-no");

        expect(result).toBe(questions);
        expect(testSetRepository.getTestSetQuestions).toHaveBeenCalledWith({
            testSetId: "mock-exam-1-no",
            language: undefined
        });
    });
});

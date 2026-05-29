// test/model/domain/GetExamQuestionsUseCase.test.js
import { describe, expect, jest, test, beforeEach } from "@jest/globals";
import GetExamQuestionsUseCase from "../../../src/model/domain/GetExamQuestionsUseCase.js";

describe("GetExamQuestionsUseCase", () => {
    let examRepository;
    let useCase;

    beforeEach(() => {
        examRepository = {
            getExamQuestions: jest.fn()
        };

        useCase = new GetExamQuestionsUseCase(examRepository);
    });

    test("returns empty list when examId is missing", async () => {
        const result = await useCase.execute(null);

        expect(result).toEqual([]);
        expect(examRepository.getExamQuestions).not.toHaveBeenCalled();
    });

    test("returns questions from repository", async () => {
        const questions = [
            { id: 1, prompt: "Question 1" },
            { id: 2, prompt: "Question 2" }
        ];

        examRepository.getExamQuestions.mockResolvedValue(questions);

        const result = await useCase.execute("mock-exam-1-no");

        expect(result).toBe(questions);
        expect(examRepository.getExamQuestions).toHaveBeenCalledWith({
            examId: "mock-exam-1-no",
            language: undefined
        });
    });
});

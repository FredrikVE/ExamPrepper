//test/model/domain/GetExamByBaseIdAndLangUseCase.test.js
import { describe, expect, jest, test, beforeEach } from "@jest/globals";
import GetExamByBaseIdAndLangUseCase from "../../../src/model/domain/GetExamByBaseIdAndLangUseCase.js";

describe("GetExamByBaseIdAndLangUseCase", () => {
    let repository;
    let useCase;

    beforeEach(() => {
        repository = {
            getExamByBaseIdAndLang: jest.fn()
        };

        useCase = new GetExamByBaseIdAndLangUseCase(repository);
    });

    test("delegates baseId and language to repository", async () => {
        repository.getExamByBaseIdAndLang.mockResolvedValue({ id: "mock-exam-1-en" });

        const result = await useCase.execute("mock-exam-1", "en");

        expect(result).toEqual({ id: "mock-exam-1-en" });
        expect(repository.getExamByBaseIdAndLang).toHaveBeenCalledWith("mock-exam-1", "en");
    });

    test("also accepts object input from AppNavigationViewModel", async () => {
        repository.getExamByBaseIdAndLang.mockResolvedValue({ id: "mock-exam-1-no" });

        const result = await useCase.execute({
            baseId: "mock-exam-1",
            lang: "no",
            language: "no"
        });

        expect(result).toEqual({ id: "mock-exam-1-no" });
        expect(repository.getExamByBaseIdAndLang).toHaveBeenCalledWith("mock-exam-1", "no");
    });

    test("returns null when baseId or language is missing", () => {
        expect(useCase.execute(null, "en")).toBeNull();
        expect(useCase.execute("mock-exam-1")).toBeNull();
    });
});

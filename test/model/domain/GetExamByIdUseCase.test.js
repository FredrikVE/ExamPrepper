//test/model/domain/GetExamByIdUseCase.test.js
import { describe, expect, jest, test, beforeEach } from "@jest/globals";
import GetExamByIdUseCase from "../../../src/model/domain/GetExamByIdUseCase.js";

describe("GetExamByIdUseCase", () => {
    const exam = {
        id: "exam-no",
        baseId: "exam",
        subjectId: "in5431",
        lang: "no",
        title: "Norsk eksamen"
    };

    let examRepository;
    let useCase;

    beforeEach(() => {
        examRepository = {
            getExamById: jest.fn().mockResolvedValue(exam)
        };

        useCase = new GetExamByIdUseCase(examRepository);
    });

    test("returns exam from repository when id is provided", async () => {
        const result = await useCase.execute("exam-no");

        expect(examRepository.getExamById).toHaveBeenCalledWith("exam-no");
        expect(result).toEqual(exam);
    });

    test("returns null when examId is null", async () => {
        const result = await useCase.execute(null);

        expect(result).toBeNull();
    });

    test("returns null when examId is undefined", async () => {
        const result = await useCase.execute(undefined);

        expect(result).toBeNull();
    });

    test("returns null when examId is empty string", async () => {
        const result = await useCase.execute("");

        expect(result).toBeNull();
    });
});

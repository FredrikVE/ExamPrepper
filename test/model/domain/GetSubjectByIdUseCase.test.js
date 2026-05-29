// test/model/domain/GetSubjectByIdUseCase.test.js
import { describe, expect, jest, test, beforeEach } from "@jest/globals";
import GetSubjectByIdUseCase from "../../../src/model/domain/GetSubjectByIdUseCase.js";

describe("GetSubjectByIdUseCase", () => {
    let subjectRepository;
    let useCase;

    beforeEach(() => {
        subjectRepository = {
            getSubjectByIdWithExamCount: jest.fn()
        };

        useCase = new GetSubjectByIdUseCase(subjectRepository);
    });

    test("returns null when subjectId is missing", async () => {
        const result = await useCase.execute({ language: "no" });

        expect(result).toBeNull();
        expect(subjectRepository.getSubjectByIdWithExamCount).not.toHaveBeenCalled();
    });

    test("accepts subject id as string", async () => {
        subjectRepository.getSubjectByIdWithExamCount.mockResolvedValue({ id: "in5431" });

        const result = await useCase.execute("in5431");

        expect(result).toEqual({ id: "in5431" });
        expect(subjectRepository.getSubjectByIdWithExamCount).toHaveBeenCalledWith({
            subjectId: "in5431",
            language: undefined
        });
    });

    test("accepts subject id and language as object", async () => {
        subjectRepository.getSubjectByIdWithExamCount.mockResolvedValue({ id: "in5431", examCount: 3 });

        const result = await useCase.execute({ subjectId: "in5431", language: "en" });

        expect(result).toEqual({ id: "in5431", examCount: 3 });
        expect(subjectRepository.getSubjectByIdWithExamCount).toHaveBeenCalledWith({
            subjectId: "in5431",
            language: "en"
        });
    });
});

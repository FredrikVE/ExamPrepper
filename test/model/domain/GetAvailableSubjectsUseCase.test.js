// test/model/domain/GetAvailableSubjectsUseCase.test.js
import { describe, expect, jest, test, beforeEach } from "@jest/globals";
import GetAvailableSubjectsUseCase from "../../../src/model/domain/GetAvailableSubjectsUseCase.js";

describe("GetAvailableSubjectsUseCase", () => {
    let subjectRepository;
    let useCase;

    beforeEach(() => {
        subjectRepository = {
            getSubjectsWithExamCount: jest.fn()
        };

        useCase = new GetAvailableSubjectsUseCase(subjectRepository);
    });

    test("passes language to repository", async () => {
        subjectRepository.getSubjectsWithExamCount.mockResolvedValue([]);

        await useCase.execute({ language: "no" });

        expect(subjectRepository.getSubjectsWithExamCount).toHaveBeenCalledWith({
            language: "no"
        });
    });

    test("returns only visible subjects", async () => {
        subjectRepository.getSubjectsWithExamCount.mockResolvedValue([
            { id: "visible", isVisible: true },
            { id: "hidden", isVisible: false }
        ]);

        const result = await useCase.execute({ language: "en" });

        expect(result).toEqual({
            subjects: [
                { id: "visible", isVisible: true }
            ]
        });
    });
});

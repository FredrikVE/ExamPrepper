// test/model/domain/subjects/GetAvailableSubjectsUseCase.test.js
import { describe, expect, jest, test, beforeEach } from "@jest/globals";
import GetAvailableSubjectsUseCase from "../../../../src/model/domain/subjects/GetAvailableSubjectsUseCase.js";

describe("GetAvailableSubjectsUseCase", () => {
    let subjectRepository;
    let useCase;

    beforeEach(() => {
        subjectRepository = {
            getSubjectsWithPracticeTestCount: jest.fn()
        };

        useCase = new GetAvailableSubjectsUseCase(subjectRepository);
    });

    test("passes language to repository", async () => {
        subjectRepository.getSubjectsWithPracticeTestCount.mockResolvedValue([]);

        await useCase.execute({ language: "no" });

        expect(subjectRepository.getSubjectsWithPracticeTestCount).toHaveBeenCalledWith({
            language: "no"
        });
    });

    test("returns only visible subjects", async () => {
        subjectRepository.getSubjectsWithPracticeTestCount.mockResolvedValue([
            { id: "visible", isVisible: true },
            { id: "hidden", isVisible: false }
        ]);

        const result = await useCase.execute({ language: "en" });

        expect(result).toEqual([
            { id: "visible", isVisible: true }
        ]);
    });
});

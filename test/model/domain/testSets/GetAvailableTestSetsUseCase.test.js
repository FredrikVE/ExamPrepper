// test/model/domain/testSets/GetAvailableTestSetsUseCase.test.js
import { describe, expect, jest, test, beforeEach } from "@jest/globals";
import GetAvailableTestSetsUseCase from "../../../../src/model/domain/testSets/GetAvailableTestSetsUseCase.js";

describe("GetAvailableTestSetsUseCase", () => {
    let testSetRepository;
    let useCase;

    beforeEach(() => {
        testSetRepository = {
            getAvailableTestSets: jest.fn()
        };

        useCase = new GetAvailableTestSetsUseCase(testSetRepository);
    });

    test("returns empty list when subjectId is missing", async () => {
        const result = await useCase.execute({ language: "no" });

        expect(result).toEqual([]);
        expect(testSetRepository.getAvailableTestSets).not.toHaveBeenCalled();
    });

    test("passes subjectId and language to repository", async () => {
        testSetRepository.getAvailableTestSets.mockResolvedValue([
            { id: "exam-1", questionCount: 10 }
        ]);

        await useCase.execute({ subjectId: "in5431", language: "no" });

        expect(testSetRepository.getAvailableTestSets).toHaveBeenCalledWith({
            subjectId: "in5431",
            language: "no"
        });
    });

    test("filters out testSets without questions", async () => {
        testSetRepository.getAvailableTestSets.mockResolvedValue([
            { id: "empty-exam", questionCount: 0 },
            { id: "real-exam", questionCount: 25 }
        ]);

        const result = await useCase.execute({ subjectId: "in5431", language: "en" });

        expect(result).toEqual([
            { id: "real-exam", questionCount: 25 }
        ]);
    });
});

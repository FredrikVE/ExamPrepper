// test/model/domain/GetAvailableExamsUseCase.test.js
import { describe, expect, jest, test, beforeEach } from "@jest/globals";
import GetAvailableExamsUseCase from "../../../src/model/domain/GetAvailableExamsUseCase.js";

describe("GetAvailableExamsUseCase", () => {
    let examRepository;
    let useCase;

    beforeEach(() => {
        examRepository = {
            getAvailableExams: jest.fn()
        };

        useCase = new GetAvailableExamsUseCase(examRepository);
    });

    test("returns empty list when subjectId is missing", async () => {
        const result = await useCase.execute({ language: "no" });

        expect(result).toEqual([]);
        expect(examRepository.getAvailableExams).not.toHaveBeenCalled();
    });

    test("passes subjectId and language to repository", async () => {
        examRepository.getAvailableExams.mockResolvedValue([
            { id: "exam-1", questionCount: 10 }
        ]);

        await useCase.execute({ subjectId: "in5431", language: "no" });

        expect(examRepository.getAvailableExams).toHaveBeenCalledWith({
            subjectId: "in5431",
            language: "no"
        });
    });

    test("filters out exams without questions", async () => {
        examRepository.getAvailableExams.mockResolvedValue([
            { id: "empty-exam", questionCount: 0 },
            { id: "real-exam", questionCount: 25 }
        ]);

        const result = await useCase.execute({ subjectId: "in5431", language: "en" });

        expect(result).toEqual([
            { id: "real-exam", questionCount: 25 }
        ]);
    });
});

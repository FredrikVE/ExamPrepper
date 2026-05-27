//test/ui/viewmodel/resolveTranslatedExamId.test.js
import { describe, expect, jest, test, beforeEach } from "@jest/globals";
import resolveTranslatedExamId from "../../../src/ui/viewmodel/Utils/resolveTranslatedExamId.js";

describe("resolveTranslatedExamId", () => {
    let getExamByIdUseCase;
    let getExamByBaseIdAndLangUseCase;

    beforeEach(() => {
        getExamByIdUseCase = {
            execute: jest.fn()
        };

        getExamByBaseIdAndLangUseCase = {
            execute: jest.fn()
        };
    });

    test("returns translated exam id and subject id", async () => {
        getExamByIdUseCase.execute.mockResolvedValue({
            id: "exam-no",
            baseId: "exam",
            subjectId: "in5431"
        });

        getExamByBaseIdAndLangUseCase.execute.mockResolvedValue({
            id: "exam-en",
            subjectId: "in5431"
        });

        const result = await resolveTranslatedExamId(
            "exam-no",
            "en",
            getExamByIdUseCase,
            getExamByBaseIdAndLangUseCase
        );

        expect(result).toEqual({
            examId: "exam-en",
            subjectId: "in5431"
        });

        expect(getExamByIdUseCase.execute).toHaveBeenCalledWith("exam-no");
        expect(getExamByBaseIdAndLangUseCase.execute).toHaveBeenCalledWith({
            baseId: "exam",
            lang: "en"
        });
    });

    test("returns null when current exam has no baseId", async () => {
        getExamByIdUseCase.execute.mockResolvedValue({
            id: "standalone-exam"
        });

        const result = await resolveTranslatedExamId(
            "standalone-exam",
            "en",
            getExamByIdUseCase,
            getExamByBaseIdAndLangUseCase
        );

        expect(result).toBeNull();
        expect(getExamByBaseIdAndLangUseCase.execute).not.toHaveBeenCalled();
    });

    test("returns null when current exam is not found", async () => {
        getExamByIdUseCase.execute.mockResolvedValue(null);

        const result = await resolveTranslatedExamId(
            "missing",
            "en",
            getExamByIdUseCase,
            getExamByBaseIdAndLangUseCase
        );

        expect(result).toBeNull();
    });

    test("returns null when no translation exists", async () => {
        getExamByIdUseCase.execute.mockResolvedValue({
            id: "exam-no",
            baseId: "exam",
            subjectId: "in5431"
        });

        getExamByBaseIdAndLangUseCase.execute.mockResolvedValue(null);

        const result = await resolveTranslatedExamId(
            "exam-no",
            "fr",
            getExamByIdUseCase,
            getExamByBaseIdAndLangUseCase
        );

        expect(result).toBeNull();
    });
});

// test/model/domain/GetFlashcardsUseCase.test.js
import { describe, expect, jest, test, beforeEach } from "@jest/globals";
import GetFlashcardsUseCase from "../../../src/model/domain/GetFlashcardsUseCase.js";

describe("GetFlashcardsUseCase", () => {
    let flashcardRepository;
    let useCase;

    beforeEach(() => {
        flashcardRepository = {
            getFlashcardsBySubject: jest.fn()
        };

        useCase = new GetFlashcardsUseCase(flashcardRepository);
    });

    test("returns empty list when subject id is missing", async () => {
        const result = await useCase.execute({ language: "no" });

        expect(result).toEqual([]);
        expect(flashcardRepository.getFlashcardsBySubject).not.toHaveBeenCalled();
    });

    test("passes subject id and language to repository", async () => {
        flashcardRepository.getFlashcardsBySubject.mockResolvedValue([]);

        await useCase.execute({
            subjectId: "in5431",
            language: "en"
        });

        expect(flashcardRepository.getFlashcardsBySubject).toHaveBeenCalledWith({
            subjectId: "in5431",
            language: "en"
        });
    });

    test("returns flashcards from repository", async () => {
        const flashcards = [
            {
                id: "card-1",
                term: "Digitalisering",
                definition: "Overgang fra analogt til digitalt."
            }
        ];
        flashcardRepository.getFlashcardsBySubject.mockResolvedValue(flashcards);

        const result = await useCase.execute({
            subjectId: "in5431",
            language: "no"
        });

        expect(result).toBe(flashcards);
    });
});

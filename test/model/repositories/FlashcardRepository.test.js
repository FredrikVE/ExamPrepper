// test/model/repositories/FlashcardRepository.test.js
import { describe, expect, jest, test, beforeEach } from "@jest/globals";
import FlashcardRepository from "../../../src/model/repositories/FlashcardRepository.js";

describe("FlashcardRepository", () => {
    let flashcardDataSource;
    let repository;

    beforeEach(() => {
        flashcardDataSource = {
            fetchFlashcardsBySubject: jest.fn().mockResolvedValue([
                {
                    id: "card-1",
                    term: {
                        no: "Begrep",
                        en: "Term"
                    },
                    definition: {
                        no: "Norsk forklaring",
                        en: "English explanation"
                    }
                },
                {
                    id: "card-2",
                    term: {
                        no: "Fallback-begrep"
                    },
                    definition: {
                        no: "Fallback-forklaring"
                    }
                }
            ])
        };

        repository = new FlashcardRepository(flashcardDataSource);
    });

    test("fetches flashcards for subject", async () => {
        await repository.getFlashcardsBySubject({
            subjectId: "in5431",
            language: "no"
        });

        expect(flashcardDataSource.fetchFlashcardsBySubject).toHaveBeenCalledWith("in5431");
    });

    test("returns localized flashcards for selected language", async () => {
        const result = await repository.getFlashcardsBySubject({
            subjectId: "in5431",
            language: "en"
        });

        expect(result[0]).toEqual({
            id: "card-1",
            term: "Term",
            definition: "English explanation"
        });
    });

    test("falls back to Norwegian text when selected language is missing", async () => {
        const result = await repository.getFlashcardsBySubject({
            subjectId: "in5431",
            language: "en"
        });

        expect(result[1]).toEqual({
            id: "card-2",
            term: "Fallback-begrep",
            definition: "Fallback-forklaring"
        });
    });
});

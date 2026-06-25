// test/model/datasource/FlashcardDataSource.test.js
import { describe, expect, test } from "@jest/globals";
import FlashcardDataSource from "../../../src/model/datasource/FlashcardDataSource.js";

describe("FlashcardDataSource", () => {
    test("returns flashcards for multiple subject ids", async () => {
        const dataSource = new FlashcardDataSource();

        const in5431Flashcards = await dataSource.fetchFlashcardsBySubject("in5431");
        const in2120Flashcards = await dataSource.fetchFlashcardsBySubject("in2120");

        expect(in5431Flashcards.length).toBeGreaterThan(0);
        expect(in2120Flashcards.length).toBeGreaterThan(0);
    });

    test("returns empty list for subjects without local flashcards", async () => {
        const dataSource = new FlashcardDataSource();

        const flashcards = await dataSource.fetchFlashcardsBySubject("unknown-subject");

        expect(flashcards).toEqual([]);
    });
});

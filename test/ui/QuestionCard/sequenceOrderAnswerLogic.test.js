// test/ui/QuestionCard/sequenceOrderAnswerLogic.test.js
import { describe, expect, test } from "@jest/globals";
import { getAvailableSequenceItems, getCorrectSequenceOrder, normalizeSequenceOrderAnswer, placeSequenceItemAtIndex, removeSequenceItem } from "../../../src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/SequenceOrder/Utils/sequenceOrderAnswerLogic.js";

const question = {
    items: [
        { id: "a", label: "Alternative A" },
        { id: "b", label: "Alternative B" },
        { id: "c", label: "Alternative C" },
        { id: "d", label: "Alternative D" }
    ],
    correctOrder: ["a", "b", "c", "d"]
};

describe("sequenceOrderAnswerLogic", () => {
    test("normalizes array answers to the correct sequence length", () => {
        expect(normalizeSequenceOrderAnswer(question, ["a", "c"])).toEqual([
            "a",
            "c",
            null,
            null
        ]);
    });

    test("ignores duplicate and unknown item ids", () => {
        expect(normalizeSequenceOrderAnswer(question, ["a", "a", "unknown", "d"])).toEqual([
            "a",
            null,
            null,
            "d"
        ]);
    });

    test("places an item at one position and clears the previous position", () => {
        expect(placeSequenceItemAtIndex(question, ["a", "b", null, null], "a", 2)).toEqual([
            null,
            "b",
            "a",
            null
        ]);
    });

    test("removes an item from the sequence", () => {
        expect(removeSequenceItem(question, ["a", "b", null, null], "b")).toEqual([
            "a",
            null,
            null,
            null
        ]);
    });

    test("returns only unplaced items", () => {
        expect(getAvailableSequenceItems(question, ["a", "b", null, null]).map((item) => item.id)).toEqual([
            "c",
            "d"
        ]);
    });

    test("falls back to item order when correctOrder is missing", () => {
        expect(getCorrectSequenceOrder({ items: question.items })).toEqual([
            "a",
            "b",
            "c",
            "d"
        ]);
    });
});

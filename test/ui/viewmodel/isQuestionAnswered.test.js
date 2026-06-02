// test/ui/viewmodel/isQuestionAnswered.test.js
import { describe, expect, test } from "@jest/globals";
import isQuestionAnswered from "../../../src/ui/viewmodel/Utils/isQuestionAnswered.js";

describe("isQuestionAnswered", () => {

    describe("single choice", () => {
        const question = { type: "single" };

        test("returns true when an option index is selected", () => {
            expect(isQuestionAnswered(question, 0)).toBe(true);
        });

        test("returns true when a string answer is given", () => {
            expect(isQuestionAnswered(question, "a")).toBe(true);
        });

        test("returns false when answer is undefined", () => {
            expect(isQuestionAnswered(question, undefined)).toBe(false);
        });

        test("returns false when answer is empty string", () => {
            expect(isQuestionAnswered(question, "")).toBe(false);
        });

        test("returns false when answer is whitespace only", () => {
            expect(isQuestionAnswered(question, "   ")).toBe(false);
        });
    });

    describe("multi choice", () => {
        const question = { type: "multi" };

        test("returns true when at least one option is selected", () => {
            expect(isQuestionAnswered(question, [0])).toBe(true);
        });

        test("returns true when multiple options are selected", () => {
            expect(isQuestionAnswered(question, [0, 2])).toBe(true);
        });

        test("returns false when answer is empty array", () => {
            expect(isQuestionAnswered(question, [])).toBe(false);
        });

        test("returns false when answer is not an array", () => {
            expect(isQuestionAnswered(question, 0)).toBe(false);
        });

        test("returns false when answer is undefined", () => {
            expect(isQuestionAnswered(question, undefined)).toBe(false);
        });
    });

    describe("fill blank", () => {
        const question = { type: "fill" };

        test("returns true when text is entered", () => {
            expect(isQuestionAnswered(question, "Digitalization")).toBe(true);
        });

        test("returns false when answer is empty string", () => {
            expect(isQuestionAnswered(question, "")).toBe(false);
        });

        test("returns false when answer is undefined", () => {
            expect(isQuestionAnswered(question, undefined)).toBe(false);
        });
    });

    describe("dragDrop", () => {
        const question = { type: "dragDrop" };

        test("returns true when at least one target has a card placed", () => {
            expect(isQuestionAnswered(question, { t1: "c1" })).toBe(true);
        });

        test("returns false when answer is empty object", () => {
            expect(isQuestionAnswered(question, {})).toBe(false);
        });

        test("returns false when answer is undefined", () => {
            expect(isQuestionAnswered(question, undefined)).toBe(false);
        });

        test("returns false when answer is null", () => {
            expect(isQuestionAnswered(question, null)).toBe(false);
        });

        test("returns false when all values are falsy", () => {
            expect(isQuestionAnswered(question, { t1: null, t2: "" })).toBe(false);
        });
    });

    describe("drag-categorize", () => {
        const question = { type: "drag-categorize" };

        test("returns true when at least one category has items", () => {
            expect(isQuestionAnswered(question, { c1: "i1" })).toBe(true);
        });

        test("returns false when answer is empty object", () => {
            expect(isQuestionAnswered(question, {})).toBe(false);
        });

        test("returns false when answer is undefined", () => {
            expect(isQuestionAnswered(question, undefined)).toBe(false);
        });
    });

    describe("SequenceOrder", () => {
        const question = { type: "SequenceOrder" };

        test("returns true when sequence array has at least one truthy entry", () => {
            expect(isQuestionAnswered(question, { sequence: ["item-1"] })).toBe(true);
        });

        test("returns true when order array has at least one truthy entry", () => {
            expect(isQuestionAnswered(question, { order: ["item-1"] })).toBe(true);
        });

        test("returns true when answer is a plain array with entries", () => {
            expect(isQuestionAnswered(question, ["item-1", "item-2"])).toBe(true);
        });

        test("returns false when sequence array is empty", () => {
            expect(isQuestionAnswered(question, { sequence: [] })).toBe(false);
        });

        test("returns false when sequence array has only null entries", () => {
            expect(isQuestionAnswered(question, { sequence: [null, null] })).toBe(false);
        });

        test("returns false when answer is undefined", () => {
            expect(isQuestionAnswered(question, undefined)).toBe(false);
        });
    });

    describe("matrix-placement", () => {
        const question = { type: "matrix-placement" };

        test("returns true when placements object has at least one value", () => {
            expect(isQuestionAnswered(question, { placements: { i1: "q1" } })).toBe(true);
        });

        test("returns true when answer is a flat object with values", () => {
            expect(isQuestionAnswered(question, { i1: "q1" })).toBe(true);
        });

        test("returns false when placements is empty", () => {
            expect(isQuestionAnswered(question, { placements: {} })).toBe(false);
        });

        test("returns false when answer is undefined", () => {
            expect(isQuestionAnswered(question, undefined)).toBe(false);
        });

        test("returns false when all placement values are falsy", () => {
            expect(isQuestionAnswered(question, { placements: { i1: null } })).toBe(false);
        });
    });
});

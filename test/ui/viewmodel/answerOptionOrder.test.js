// test/ui/viewmodel/answerOptionOrder.test.js
import { describe, expect, test } from "@jest/globals";
import createAnswerOptionOrderByQuestionId from "../../../src/ui/viewmodel/Utils/answerOptionOrder.js";

describe("createAnswerOptionOrderByQuestionId", () => {

    test("creates a shuffled index array for each question with options", () => {
        const questions = [
            { id: "q1", type: "single", options: [{ text: "A" }, { text: "B" }, { text: "C" }] },
            { id: "q2", type: "multi", options: [{ text: "X" }, { text: "Y" }] }
        ];

        const result = createAnswerOptionOrderByQuestionId(questions);

        expect(result.q1).toHaveLength(3);
        expect(result.q2).toHaveLength(2);
    });

    test("index array contains all original indexes exactly once", () => {
        const questions = [
            { id: "q1", type: "single", options: Array.from({ length: 5 }, (_, i) => ({ text: `Opt ${i}` })) }
        ];

        const result = createAnswerOptionOrderByQuestionId(questions);

        expect([...result.q1].sort()).toEqual([0, 1, 2, 3, 4]);
    });

    test("skips questions with no options", () => {
        const questions = [
            { id: "q1", type: "fill" }
        ];

        const result = createAnswerOptionOrderByQuestionId(questions);

        expect(result.q1).toBeUndefined();
    });


    test("uses dropdownFill items and keeps options out of the shuffle count", () => {
        const questions = [
            {
                id: "q1",
                type: "dropdownFill",
                options: [{ id: "a" }, { id: "b" }],
                items: [{ id: "i1" }, { id: "i2" }, { id: "i3" }]
            }
        ];

        const result = createAnswerOptionOrderByQuestionId(questions);

        expect(result.q1).toHaveLength(3);
        expect([...result.q1].sort()).toEqual([0, 1, 2]);
    });


    test("uses radioButtonGrid rows and keeps columns out of the shuffle count", () => {
        const questions = [
            {
                id: "q1",
                type: "radioButtonGrid",
                columns: [{ id: "a" }, { id: "b" }],
                rows: [{ id: "r1" }, { id: "r2" }, { id: "r3" }, { id: "r4" }]
            }
        ];

        const result = createAnswerOptionOrderByQuestionId(questions);

        expect(result.q1).toHaveLength(4);
        expect([...result.q1].sort()).toEqual([0, 1, 2, 3]);
    });

    test("uses items array for drag-categorize questions", () => {
        const questions = [
            { id: "q1", type: "drag-categorize", items: [{ id: "i1" }, { id: "i2" }, { id: "i3" }] }
        ];

        const result = createAnswerOptionOrderByQuestionId(questions);

        expect(result.q1).toHaveLength(3);
        expect([...result.q1].sort()).toEqual([0, 1, 2]);
    });

    test("uses cards array for dragDrop questions", () => {
        const questions = [
            { id: "q1", type: "dragDrop", cards: [{ id: "c1" }, { id: "c2" }] }
        ];

        const result = createAnswerOptionOrderByQuestionId(questions);

        expect(result.q1).toHaveLength(2);
        expect([...result.q1].sort()).toEqual([0, 1]);
    });


    test("uses items array for matrix-placement questions", () => {
        const questions = [
            { id: "q1", type: "matrix-placement", items: [{ id: "i1" }, { id: "i2" }, { id: "i3" }, { id: "i4" }] }
        ];

        const result = createAnswerOptionOrderByQuestionId(questions);

        expect(result.q1).toHaveLength(4);
        expect([...result.q1].sort()).toEqual([0, 1, 2, 3]);
    });

    test("uses sequence source arrays for sequence-order questions", () => {
        const questions = [
            { id: "q1", type: "SequenceOrder", alternatives: [{ id: "a1" }, { id: "a2" }, { id: "a3" }] }
        ];

        const result = createAnswerOptionOrderByQuestionId(questions);

        expect(result.q1).toHaveLength(3);
        expect([...result.q1].sort()).toEqual([0, 1, 2]);
    });

    test("returns empty object for empty questions array", () => {
        const result = createAnswerOptionOrderByQuestionId([]);

        expect(result).toEqual({});
    });

    test("prefers options over items for questions that have both", () => {
        const questions = [
            {
                id: "q1",
                type: "single",
                options: [{ text: "A" }, { text: "B" }],
                items: [{ id: "i1" }, { id: "i2" }, { id: "i3" }]
            }
        ];

        const result = createAnswerOptionOrderByQuestionId(questions);

        expect(result.q1).toHaveLength(2);
    });
});

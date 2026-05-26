//test/model/domain/GradeAnswerUseCase.test.js
import { describe, expect, test, beforeEach } from "@jest/globals";
import GradeAnswerUseCase from "../../../src/model/domain/GradeAnswerUseCase.js";
import { QUESTION_TYPES } from "../../../src/constants/QuestionTypes.js";

describe("GradeAnswerUseCase", () => {
    let useCase;

    beforeEach(() => {
        useCase = new GradeAnswerUseCase();
    });

    describe("single choice", () => {
        const question = {
            type: QUESTION_TYPES.SINGLE,
            options: [
                { text: "Wrong", correct: false },
                { text: "Correct", correct: true },
                { text: "Also wrong", correct: false }
            ]
        };

        test("returns true when selected option is correct", () => {
            expect(useCase.execute(question, 1)).toBe(true);
        });

        test("returns false when selected option is wrong", () => {
            expect(useCase.execute(question, 0)).toBe(false);
        });

        test("returns false when selected option does not exist", () => {
            expect(useCase.execute(question, 99)).toBe(false);
        });
    });

    describe("multi choice", () => {
        const question = {
            type: QUESTION_TYPES.MULTI,
            options: [
                { text: "A", correct: true },
                { text: "B", correct: false },
                { text: "C", correct: true }
            ]
        };

        test("returns true when all correct alternatives are selected", () => {
            expect(useCase.execute(question, [0, 2])).toBe(true);
        });

        test("ignores order of selected alternatives", () => {
            expect(useCase.execute(question, [2, 0])).toBe(true);
        });

        test("returns false when one correct alternative is missing", () => {
            expect(useCase.execute(question, [0])).toBe(false);
        });

        test("returns false when an extra wrong alternative is selected", () => {
            expect(useCase.execute(question, [0, 1, 2])).toBe(false);
        });

        test("returns false when answer is not an array", () => {
            expect(useCase.execute(question, 0)).toBe(false);
        });
    });

    describe("fill in", () => {
        const question = {
            type: QUESTION_TYPES.FILL,
            answers: ["Digitalization", "digital transformation"]
        };

        test("returns true for accepted answer", () => {
            expect(useCase.execute(question, "Digitalization")).toBe(true);
        });

        test("normalizes case, whitespace and punctuation", () => {
            expect(useCase.execute(question, "  DIGITALIZATION!!!  ")).toBe(true);
        });

        test("returns false for unaccepted answer", () => {
            expect(useCase.execute(question, "digitization")).toBe(false);
        });
    });


    describe("drag and drop", () => {
        const question = {
            type: QUESTION_TYPES.DRAG_DROP,
            points: 3,
            targets: [
                { id: "row-1", correctCardId: "a" },
                { id: "row-2", correctCardId: "b" },
                { id: "row-3", correctCardId: "c" }
            ]
        };

        test("returns true only when all targets match", () => {
            expect(useCase.execute(question, {
                "row-1": "a",
                "row-2": "b",
                "row-3": "c"
            })).toBe(true);

            expect(useCase.execute(question, {
                "row-1": "a",
                "row-2": "c",
                "row-3": "b"
            })).toBe(false);
        });

        test("calculates partial score from correct target matches", () => {
            expect(useCase.getQuestionScore(question, {
                "row-1": "a",
                "row-2": "wrong",
                "row-3": "c"
            })).toBe(2);
        });

        test("returns drag and drop stats", () => {
            expect(useCase.getDragDropStats(question, {
                "row-1": "a",
                "row-2": "wrong"
            })).toEqual({
                correct: 1,
                wrong: 1,
                unanswered: 1
            });
        });
    });

    test("returns false when question is missing", () => {
        expect(useCase.execute(null, 0)).toBe(false);
    });

    test("returns false for unknown question type", () => {
        expect(useCase.execute({ type: "unknown" }, "anything")).toBe(false);
    });
});

// test/model/domain/GradeAnswerUseCase.test.js
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


    describe("drag categorize", () => {
        const question = {
            type: QUESTION_TYPES.DRAG_CATEGORIZE,
            points: 4,
            items: [
                { id: "business-case", label: "Business case" },
                { id: "design-thinking", label: "Design thinking" },
                { id: "it-governance", label: "IT governance" },
                { id: "projects", label: "Projects" }
            ],
            categories: [
                { id: "choice", label: "VALG" },
                { id: "innovation", label: "UTFORSKNING" },
                { id: "governance", label: "STYRING" },
                { id: "organizing", label: "ORGANISERING" }
            ],
            correctAnswer: {
                choice: ["business-case"],
                innovation: ["design-thinking"],
                governance: ["it-governance"],
                organizing: ["projects"]
            }
        };

        test("returns true only when all items are placed in the correct categories", () => {
            expect(useCase.execute(question, {
                choice: ["business-case"],
                innovation: ["design-thinking"],
                governance: ["it-governance"],
                organizing: ["projects"]
            })).toBe(true);

            expect(useCase.execute(question, {
                choice: ["business-case", "design-thinking"],
                governance: ["it-governance"],
                organizing: ["projects"]
            })).toBe(false);
        });

        test("calculates partial score from correctly categorized items", () => {
            expect(useCase.getQuestionScore(question, {
                choice: ["business-case", "design-thinking"],
                governance: ["it-governance"]
            })).toBe(2);
        });

        test("returns drag categorize stats", () => {
            expect(useCase.getDragCategorizeStats(question, {
                choice: ["business-case", "design-thinking"],
                governance: ["it-governance"]
            })).toEqual({
                correct: 2,
                wrong: 1,
                unanswered: 1
            });
        });
    });


    describe("matrix placement", () => {
        const question = {
            type: QUESTION_TYPES.MATRIX_PLACEMENT,
            points: 3,
            matrix: {
                quadrants: [
                    { id: "low-standardization-low-integration", title: "Low standardization / Low integration" },
                    { id: "low-standardization-high-integration", title: "Low standardization / High integration" },
                    { id: "high-standardization-low-integration", title: "High standardization / Low integration" },
                    { id: "high-standardization-high-integration", title: "High standardization / High integration" }
                ]
            },
            items: [
                { id: "diversification", label: "Diversification", correctQuadrantId: "low-standardization-low-integration" },
                { id: "coordination", label: "Coordination", correctQuadrantId: "low-standardization-high-integration" },
                { id: "replication", label: "Replication", correctQuadrantId: "high-standardization-low-integration" }
            ]
        };

        test("returns true only when all items are placed in the correct quadrants", () => {
            expect(useCase.execute(question, {
                diversification: "low-standardization-low-integration",
                coordination: "low-standardization-high-integration",
                replication: "high-standardization-low-integration"
            })).toBe(true);

            expect(useCase.execute(question, {
                diversification: "low-standardization-low-integration",
                coordination: "high-standardization-low-integration",
                replication: "low-standardization-high-integration"
            })).toBe(false);
        });

        test("supports the wrapped placements answer shape", () => {
            expect(useCase.execute(question, {
                placements: {
                    diversification: "low-standardization-low-integration",
                    coordination: "low-standardization-high-integration",
                    replication: "high-standardization-low-integration"
                }
            })).toBe(true);
        });

        test("calculates partial score from correctly placed items", () => {
            expect(useCase.getQuestionScore(question, {
                diversification: "low-standardization-low-integration",
                coordination: "wrong-quadrant",
                replication: "high-standardization-low-integration"
            })).toBe(2);
        });

        test("returns matrix placement stats", () => {
            expect(useCase.getMatrixPlacementStats(question, {
                diversification: "low-standardization-low-integration",
                coordination: "high-standardization-low-integration"
            })).toEqual({
                correct: 1,
                wrong: 1,
                unanswered: 1
            });
        });


        test("treats null, undefined and empty answers as unanswered", () => {
            expect(useCase.execute(question, null)).toBe(false);
            expect(useCase.execute(question, undefined)).toBe(false);
            expect(useCase.getQuestionScore(question, {})).toBe(0);
            expect(useCase.getMatrixPlacementStats(question, {})).toEqual({
                correct: 0,
                wrong: 0,
                unanswered: 3
            });
        });

        test("ignores unknown items and unknown quadrants", () => {
            expect(useCase.getMatrixPlacementStats(question, {
                diversification: "unknown-quadrant",
                unknownItem: "low-standardization-low-integration",
                coordination: "low-standardization-high-integration"
            })).toEqual({
                correct: 1,
                wrong: 0,
                unanswered: 2
            });
        });

        test("does not allow a partial answer to count as fully correct", () => {
            expect(useCase.execute(question, {
                diversification: "low-standardization-low-integration",
                coordination: "low-standardization-high-integration"
            })).toBe(false);
        });
    });

    describe("sequence order", () => {
        const question = {
            type: QUESTION_TYPES.SEQUENCE_ORDER,
            points: 4,
            items: [
                { id: "strategy", label: "Service Strategy" },
                { id: "design", label: "Service Design" },
                { id: "transition", label: "Service Transition" },
                { id: "operation", label: "Service Operation" }
            ],
            correctOrder: ["strategy", "design", "transition", "operation"]
        };

        test("returns true only when all items are in the correct order", () => {
            expect(useCase.execute(question, [
                "strategy",
                "design",
                "transition",
                "operation"
            ])).toBe(true);

            expect(useCase.execute(question, [
                "strategy",
                "transition",
                "design",
                "operation"
            ])).toBe(false);
        });

        test("supports the wrapped sequence answer shape", () => {
            expect(useCase.execute(question, {
                sequence: ["strategy", "design", "transition", "operation"]
            })).toBe(true);
        });

        test("calculates partial score from correctly ordered items", () => {
            expect(useCase.getQuestionScore(question, [
                "strategy",
                "transition",
                "design",
                "operation"
            ])).toBe(2);
        });

        test("returns sequence order stats", () => {
            expect(useCase.getSequenceOrderStats(question, [
                "strategy",
                "transition",
                null,
                "operation"
            ])).toEqual({
                correct: 2,
                wrong: 1,
                unanswered: 1
            });
        });

        test("ignores duplicate and unknown items", () => {
            expect(useCase.getSequenceOrderStats(question, [
                "strategy",
                "strategy",
                "unknown",
                "operation"
            ])).toEqual({
                correct: 2,
                wrong: 0,
                unanswered: 2
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

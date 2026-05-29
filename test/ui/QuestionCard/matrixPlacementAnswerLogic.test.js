// test/ui/QuestionCard/matrixPlacementAnswerLogic.test.js
import { describe, expect, test } from "@jest/globals";
import { getMatrixQuadrantsForDisplay, normalizeMatrixPlacementAnswer } from "../../../src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/MatrixPlacement/Utils/matrixPlacementAnswerLogic.js";

describe("matrixPlacementAnswerLogic", () => {
    test("supports directional axis labels for non low/high matrices", () => {
        const question = {
            matrix: {
                xAxis: {
                    label: "Measurement accuracy",
                    leftLabel: "High",
                    rightLabel: "Low"
                },
                yAxis: {
                    label: "Risk awareness",
                    topLabel: "High",
                    bottomLabel: "Low"
                },
                quadrants: [
                    { id: "low-awareness-low-accuracy", row: 1, column: 1 },
                    { id: "high-awareness-high-accuracy", row: 0, column: 0 },
                    { id: "high-awareness-low-accuracy", row: 0, column: 1 },
                    { id: "low-awareness-high-accuracy", row: 1, column: 0 }
                ]
            }
        };

        expect(getMatrixQuadrantsForDisplay(question).map((quadrant) => quadrant.id)).toEqual([
            "high-awareness-high-accuracy",
            "high-awareness-low-accuracy",
            "low-awareness-high-accuracy",
            "low-awareness-low-accuracy"
        ]);
    });

    test("keeps backwards compatibility with lowLabel and highLabel", () => {
        const question = {
            matrix: {
                xAxis: {
                    label: "Business process integration",
                    lowLabel: "Low",
                    highLabel: "High"
                },
                yAxis: {
                    label: "Business process standardization",
                    lowLabel: "Low",
                    highLabel: "High"
                },
                quadrants: [
                    { id: "low-standardization-low-integration" },
                    { id: "high-standardization-high-integration" },
                    { id: "low-standardization-high-integration" },
                    { id: "high-standardization-low-integration" }
                ]
            }
        };

        expect(getMatrixQuadrantsForDisplay(question).map((quadrant) => quadrant.id)).toEqual([
            "high-standardization-low-integration",
            "high-standardization-high-integration",
            "low-standardization-low-integration",
            "low-standardization-high-integration"
        ]);
    });

    test("normalizes invalid matrix answers defensively", () => {
        const question = {
            matrix: {
                quadrants: [
                    { id: "top-left" },
                    { id: "top-right" }
                ]
            },
            items: [
                { id: "item-a" },
                { id: "item-b" }
            ]
        };

        expect(normalizeMatrixPlacementAnswer(question, {
            placements: {
                "item-a": "top-left",
                "item-b": "missing-quadrant",
                "unknown-item": "top-right"
            }
        })).toEqual({
            "item-a": "top-left"
        });
    });
});

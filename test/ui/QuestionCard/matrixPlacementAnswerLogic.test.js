// test/ui/QuestionCard/matrixPlacementAnswerLogic.test.js
import { describe, expect, test } from "@jest/globals";
import { getMatrixAxis, getMatrixQuadrantsForDisplay, normalizeMatrixPlacementAnswer, placeItemInQuadrant } from "../../../src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DragDrop/MatrixPlacement/Utils/matrixPlacementAnswerLogic.js";

describe("matrixPlacementAnswerLogic", () => {

    test("infers Norwegian low/high axes from persisted quadrant labels", () => {
        const question = {
            quadrants: [
                { id: "lav-lav", label: "Lav sannsynlighet / Lav konsekvens" },
                { id: "hoy-lav", label: "Høy sannsynlighet / Lav konsekvens" },
                { id: "lav-hoy", label: "Lav sannsynlighet / Høy konsekvens" },
                { id: "hoy-hoy", label: "Høy sannsynlighet / Høy konsekvens" }
            ]
        };

        expect(getMatrixAxis(question, "xAxis")).toEqual({
            label: "Sannsynlighet",
            lowLabel: "Lav",
            highLabel: "Høy"
        });
        expect(getMatrixAxis(question, "yAxis")).toEqual({
            label: "Konsekvens",
            lowLabel: "Lav",
            highLabel: "Høy"
        });
        expect(getMatrixQuadrantsForDisplay(question).map((quadrant) => quadrant.id)).toEqual([
            "lav-hoy",
            "hoy-hoy",
            "lav-lav",
            "hoy-lav"
        ]);
    });
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

    test("keeps only one item per quadrant when normalizing answers", () => {
        const question = {
            matrix: {
                quadrants: [
                    { id: "top-left" },
                    { id: "top-right" }
                ]
            },
            items: [
                { id: "item-a" },
                { id: "item-b" },
                { id: "item-c" }
            ]
        };

        expect(normalizeMatrixPlacementAnswer(question, {
            "item-a": "top-left",
            "item-b": "top-left",
            "item-c": "top-right"
        })).toEqual({
            "item-b": "top-left",
            "item-c": "top-right"
        });
    });

    test("moves the previous occupant back to the bank when placing into an occupied quadrant", () => {
        const question = {
            matrix: {
                quadrants: [
                    { id: "top-left" },
                    { id: "top-right" }
                ]
            },
            items: [
                { id: "item-a" },
                { id: "item-b" },
                { id: "item-c" }
            ]
        };

        expect(placeItemInQuadrant(question, {
            "item-a": "top-left",
            "item-b": "top-right"
        }, "item-c", "top-left")).toEqual({
            "item-b": "top-right",
            "item-c": "top-left"
        });
    });
});

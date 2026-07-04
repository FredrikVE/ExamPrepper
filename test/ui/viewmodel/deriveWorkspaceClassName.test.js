// test/ui/viewmodel/deriveWorkspaceClassName.test.js
import { describe, expect, test } from "@jest/globals";
import deriveWorkspaceClassName from "../../../src/ui/viewmodel/Utils/deriveWorkspaceClassName.js";

describe("deriveWorkspaceClassName", () => {

    test("returns base class for a simple single-choice question", () => {
        const question = { type: "single", options: [{ text: "A" }, { text: "B" }] };

        expect(deriveWorkspaceClassName(question, false)).toBe("exam-workspace");
    });

    test("adds feedback-mode when submitted", () => {
        const question = { type: "single", options: [{ text: "A" }] };
        const result = deriveWorkspaceClassName(question, true);

        expect(result).toContain("exam-workspace-feedback-mode");
    });

    test("does not add feedback-mode when not submitted", () => {
        const question = { type: "single", options: [{ text: "A" }] };
        const result = deriveWorkspaceClassName(question, false);

        expect(result).not.toContain("exam-workspace-feedback-mode");
    });

    test("adds scroll-footer-mode for question with 6 or more options", () => {
        const question = {
            type: "single",
            options: Array.from({ length: 6 }, (_, i) => ({ text: `Option ${i}` }))
        };
        const result = deriveWorkspaceClassName(question, false);

        expect(result).toContain("exam-workspace-scroll-footer-mode");
    });

    test("does not add scroll-footer-mode for question with fewer than 6 options", () => {
        const question = {
            type: "single",
            options: Array.from({ length: 5 }, (_, i) => ({ text: `Option ${i}` }))
        };
        const result = deriveWorkspaceClassName(question, false);

        expect(result).not.toContain("exam-workspace-scroll-footer-mode");
    });

    test("adds scroll-footer-mode for multi-choice question with five options", () => {
        const question = {
            type: "multi",
            options: Array.from({ length: 5 }, (_, i) => ({ text: `Option ${i}` }))
        };
        const result = deriveWorkspaceClassName(question, false);

        expect(result).toContain("exam-workspace-scroll-footer-mode");
    });

    test("does not add scroll-footer-mode when submitted", () => {
        const question = {
            type: "single",
            options: Array.from({ length: 8 }, (_, i) => ({ text: `Option ${i}` }))
        };
        const result = deriveWorkspaceClassName(question, true);

        expect(result).not.toContain("exam-workspace-scroll-footer-mode");
    });

    test("adds scroll-footer-mode for dragDrop question", () => {
        const question = { type: "dragDrop", targets: [{ id: "t1" }], cards: [{ id: "c1" }] };
        const result = deriveWorkspaceClassName(question, false);

        expect(result).toContain("exam-workspace-scroll-footer-mode");
    });

    test("adds scroll-footer-mode for drag-categorize question", () => {
        const question = { type: "drag-categorize", categories: [{ id: "c1" }], items: [{ id: "i1" }] };
        const result = deriveWorkspaceClassName(question, false);

        expect(result).toContain("exam-workspace-scroll-footer-mode");
    });

    test("adds scroll-footer-mode for matrix-placement question", () => {
        const question = { type: "matrix-placement", items: [], matrix: { quadrants: [] } };
        const result = deriveWorkspaceClassName(question, false);

        expect(result).toContain("exam-workspace-scroll-footer-mode");
    });

    test("adds scroll-footer-mode for SequenceOrder question", () => {
        const question = { type: "SequenceOrder", items: [] };
        const result = deriveWorkspaceClassName(question, false);

        expect(result).toContain("exam-workspace-scroll-footer-mode");
    });

    test("adds sequence-order-mode for SequenceOrder question", () => {
        const question = { type: "SequenceOrder", items: [] };
        const result = deriveWorkspaceClassName(question, false);

        expect(result).toContain("exam-workspace-sequence-order-mode");
    });

    test("adds matrix-placement-mode for matrix-placement question", () => {
        const question = { type: "matrix-placement", items: [], matrix: { quadrants: [] } };
        const result = deriveWorkspaceClassName(question, false);

        expect(result).toContain("exam-workspace-matrix-placement-mode");
    });

    test("adds wide-question-mode for drag-categorize with 5 or more categories", () => {
        const question = {
            type: "drag-categorize",
            categories: Array.from({ length: 5 }, (_, i) => ({ id: `c${i}`, label: "Short" })),
            items: [{ id: "i1", label: "Item" }]
        };
        const result = deriveWorkspaceClassName(question, false);

        expect(result).toContain("exam-workspace-wide-question-mode");
    });

    test("adds wide-question-mode for drag-categorize with long text", () => {
        const question = {
            type: "drag-categorize",
            categories: [{ id: "c1", label: "A".repeat(34) }],
            items: [{ id: "i1", label: "Item" }]
        };
        const result = deriveWorkspaceClassName(question, false);

        expect(result).toContain("exam-workspace-wide-question-mode");
    });

    test("does not add wide-question-mode for drag-categorize with short text and few categories", () => {
        const question = {
            type: "drag-categorize",
            categories: [{ id: "c1", label: "Short" }, { id: "c2", label: "Also short" }],
            items: [{ id: "i1", label: "Item" }]
        };
        const result = deriveWorkspaceClassName(question, false);

        expect(result).not.toContain("exam-workspace-wide-question-mode");
    });

    test("adds extra-wide-question-mode for drag-categorize with very long text", () => {
        const question = {
            type: "drag-categorize",
            categories: [{ id: "c1", label: "A".repeat(62) }],
            items: [{ id: "i1", label: "Item" }]
        };
        const result = deriveWorkspaceClassName(question, false);

        expect(result).toContain("exam-workspace-extra-wide-question-mode");
    });

    test("adds dense-drag-categorize-mode for drag-categorize with 5 or more categories", () => {
        const question = {
            type: "drag-categorize",
            categories: Array.from({ length: 5 }, (_, i) => ({ id: `c${i}`, label: "Cat" })),
            items: [{ id: "i1", label: "Item" }]
        };
        const result = deriveWorkspaceClassName(question, false);

        expect(result).toContain("exam-workspace-dense-drag-categorize-mode");
    });

    test("adds wide-question-mode for matrix-placement with 4 or more quadrants", () => {
        const question = {
            type: "matrix-placement",
            items: [{ id: "i1" }],
            matrix: {
                quadrants: Array.from({ length: 4 }, (_, i) => ({ id: `q${i}`, title: "Q" })),
                xAxis: { label: "" },
                yAxis: { label: "" }
            }
        };
        const result = deriveWorkspaceClassName(question, false);

        expect(result).toContain("exam-workspace-wide-question-mode");
    });

    test("adds wide-question-mode for SequenceOrder with 5 or more items", () => {
        const question = {
            type: "SequenceOrder",
            items: Array.from({ length: 5 }, (_, itemIndex) => ({
                id: `item-${itemIndex}`,
                label: "Phase"
            }))
        };
        const result = deriveWorkspaceClassName(question, false);

        expect(result).toContain("exam-workspace-wide-question-mode");
    });

    test("adds wide-question-mode for SequenceOrder with long item text", () => {
        const question = {
            type: "SequenceOrder",
            items: [{ id: "item-1", label: "A".repeat(34) }]
        };
        const result = deriveWorkspaceClassName(question, false);

        expect(result).toContain("exam-workspace-wide-question-mode");
    });

    test("handles null question", () => {
        expect(deriveWorkspaceClassName(null, false)).toBe("exam-workspace");
    });

    test("handles undefined question", () => {
        expect(deriveWorkspaceClassName(undefined, false)).toBe("exam-workspace");
    });
});

// test/ui/viewmodel/deriveWorkspaceClassName.test.js
import { describe, expect, test } from "@jest/globals";
import deriveWorkspaceClassName from "../../../src/ui/viewmodel/Utils/deriveWorkspaceClassName.js";
import { QUESTION_TYPES } from "../../../src/constants/QuestionTypes.js";

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


describe("deriveWorkspaceClassName layout boundaries", () => {
	const hasClass = (question, className) => deriveWorkspaceClassName(question, false, false).split(" ").includes(className);
	const createOptions = (optionCount) => Array.from({ length: optionCount }, (_, optionIndex) => ({ id: `option-${optionIndex}` }));
	const createCategories = (categoryCount, labelLength) => Array.from({ length: categoryCount }, (_, categoryIndex) => ({ id: `category-${categoryIndex}`, label: "C".repeat(labelLength) }));
	const createSequenceItems = (itemCount) => Array.from({ length: itemCount }, (_, itemIndex) => ({ id: `item-${itemIndex}`, label: "Item" }));
	const createQuadrants = (quadrantCount, titleLength) => Array.from({ length: quadrantCount }, (_, quadrantIndex) => ({ id: `quadrant-${quadrantIndex}`, title: "Q".repeat(titleLength) }));

	test("locks the option-count boundaries at 4, 5 and 6", () => {
		expect(hasClass({ type: QUESTION_TYPES.MULTI, options: createOptions(4) }, "exam-workspace-scroll-footer-mode")).toBe(false);
		expect(hasClass({ type: QUESTION_TYPES.MULTI, options: createOptions(5) }, "exam-workspace-scroll-footer-mode")).toBe(true);
		expect(hasClass({ type: QUESTION_TYPES.SINGLE, options: createOptions(5) }, "exam-workspace-scroll-footer-mode")).toBe(false);
		expect(hasClass({ type: QUESTION_TYPES.SINGLE, options: createOptions(6) }, "exam-workspace-scroll-footer-mode")).toBe(true);
	});

	test("locks the category-count boundaries at 3, 4 and 5", () => {
		for (const categoryCount of [3, 4]) {
			const question = { type: QUESTION_TYPES.DRAG_CATEGORIZE, categories: createCategories(categoryCount, 5), items: [] };
			expect(hasClass(question, "exam-workspace-wide-question-mode")).toBe(false);
			expect(hasClass(question, "exam-workspace-dense-drag-categorize-mode")).toBe(false);
		}

		const question = { type: QUESTION_TYPES.DRAG_CATEGORIZE, categories: createCategories(5, 5), items: [] };
		expect(hasClass(question, "exam-workspace-wide-question-mode")).toBe(true);
		expect(hasClass(question, "exam-workspace-dense-drag-categorize-mode")).toBe(true);
	});

	test("locks the wide-text boundary at 33 and 34 characters", () => {
		const createQuestion = (labelLength) => ({ type: QUESTION_TYPES.DRAG_CATEGORIZE, categories: createCategories(1, labelLength), items: [] });

		expect(hasClass(createQuestion(33), "exam-workspace-wide-question-mode")).toBe(false);
		expect(hasClass(createQuestion(34), "exam-workspace-wide-question-mode")).toBe(true);
	});

	test("locks the dense-text boundary at 43 and 44 characters", () => {
		const createQuestion = (labelLength) => ({ type: QUESTION_TYPES.DRAG_CATEGORIZE, categories: createCategories(1, labelLength), items: [] });

		expect(hasClass(createQuestion(43), "exam-workspace-dense-drag-categorize-mode")).toBe(false);
		expect(hasClass(createQuestion(44), "exam-workspace-dense-drag-categorize-mode")).toBe(true);
	});

	test("locks the extra-wide text boundary at 61 and 62 characters", () => {
		const createQuestion = (labelLength) => ({ type: QUESTION_TYPES.DRAG_CATEGORIZE, categories: createCategories(1, labelLength), items: [] });

		expect(hasClass(createQuestion(61), "exam-workspace-extra-wide-question-mode")).toBe(false);
		expect(hasClass(createQuestion(62), "exam-workspace-extra-wide-question-mode")).toBe(true);
	});

	test("locks the matrix extra-wide boundary at 69 and 70 characters", () => {
		const createQuestion = (titleLength) => ({ type: QUESTION_TYPES.MATRIX_PLACEMENT, items: [], matrix: { quadrants: createQuadrants(1, titleLength), xAxis: { label: "" }, yAxis: { label: "" } } });

		expect(hasClass(createQuestion(69), "exam-workspace-extra-wide-question-mode")).toBe(false);
		expect(hasClass(createQuestion(70), "exam-workspace-extra-wide-question-mode")).toBe(true);
	});

	test("locks the matrix quadrant boundary at 3 and 4", () => {
		const createQuestion = (quadrantCount) => ({ type: QUESTION_TYPES.MATRIX_PLACEMENT, items: [], matrix: { quadrants: createQuadrants(quadrantCount, 1), xAxis: { label: "" }, yAxis: { label: "" } } });

		expect(hasClass(createQuestion(3), "exam-workspace-wide-question-mode")).toBe(false);
		expect(hasClass(createQuestion(4), "exam-workspace-wide-question-mode")).toBe(true);
	});

	test("locks the sequence item boundary at 4 and 5", () => {
		const createQuestion = (itemCount) => ({ type: QUESTION_TYPES.SEQUENCE_ORDER, items: createSequenceItems(itemCount) });

		expect(hasClass(createQuestion(4), "exam-workspace-wide-question-mode")).toBe(false);
		expect(hasClass(createQuestion(5), "exam-workspace-wide-question-mode")).toBe(true);
	});
});

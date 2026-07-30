//test/ui/viewmodel/QuestionCard/TapToFillMultipleBlank/tapToFillMultipleBlankState.test.js
import { describe, expect, test } from "@jest/globals";
import { createTapToFillAnswerPreview, createTapToFillMultipleBlankViewState, findFirstEmptyTapToFillItemId, resolveTapToFillTargetItemId } from "../../../../../src/ui/viewmodel/QuestionCard/TapToFillMultipleBlank/tapToFillMultipleBlankState.js";

const question = {
	items: [
		{ id: "one", beforeText: "First", afterText: ".", correctOptionId: "a" },
		{ id: "two", beforeText: "Second", afterText: ".", correctOptionId: "b" }
	],
	options: [{ id: "a", label: "Alpha" }, { id: "b", label: "Beta" }]
};

describe("tapToFillMultipleBlankState", () => {
	test("builds inline sentences and marks used options", () => {
		const model = createTapToFillMultipleBlankViewState({ question, answer: { one: "a" }, activeItemId: "two" });
		expect(model.lines[0]).toMatchObject({ selectedLabel: "Alpha", isActive: false });
		expect(model.lines[1]).toMatchObject({ selectedLabel: "", isActive: true });
		expect(model.options[0].isUsed).toBe(true);
	});

	test("targets the active blank before the first empty blank", () => {
		expect(resolveTapToFillTargetItemId({ question, answer: {}, activeItemId: "two" })).toBe("two");
		expect(resolveTapToFillTargetItemId({ question, answer: { one: "a" }, activeItemId: null })).toBe("two");
	});

	test("moves an option instead of duplicating it", () => {
		expect(createTapToFillAnswerPreview({ answer: { one: "a" }, itemId: "two", optionId: "a" })).toEqual({ two: "a" });
	});

	test("finds the first empty item", () => {
		expect(findFirstEmptyTapToFillItemId({ question, answer: { one: "a" } })).toBe("two");
	});
});

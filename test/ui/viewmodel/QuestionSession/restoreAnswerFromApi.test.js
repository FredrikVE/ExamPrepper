// test/ui/viewmodel/QuestionSession/restoreAnswerFromApi.test.js
import { describe, expect, test } from "@jest/globals";
import { QUESTION_TYPES } from "../../../../src/constants/QuestionTypes.js";
import restoreAnswerFromApi from "../../../../src/ui/viewmodel/QuestionSession/restoreAnswerFromApi.js";
import transformAnswerForApi from "../../../../src/ui/viewmodel/QuestionSession/transformAnswerForApi.js";

const singleQuestion = {
	id: "q-single",
	type: QUESTION_TYPES.SINGLE,
	options: [{ id: "option-a" }, { id: "option-b" }, { id: "option-c" }]
};

const multiQuestion = {
	id: "q-multi",
	type: QUESTION_TYPES.MULTI,
	options: [{ id: "option-a" }, { id: "option-b" }, { id: "option-c" }]
};

const dragDropQuestion = {
	id: "q-drag",
	type: QUESTION_TYPES.DRAG_DROP,
	cards: [{ id: "card-1" }, { id: "card-2" }],
	targets: [{ id: "target-1" }, { id: "target-2" }]
};

const categorizeQuestion = {
	id: "q-categorize",
	type: QUESTION_TYPES.DRAG_CATEGORIZE,
	categories: [{ id: "lean" }, { id: "agile" }],
	items: [{ id: "item-1" }, { id: "item-2" }, { id: "item-3" }]
};

describe("restoreAnswerFromApi", () => {
	test("restores a single choice answer from option id to option index", () => {
		expect(restoreAnswerFromApi(singleQuestion, "option-c")).toBe(2);
	});

	test("returns null when the chosen option no longer exists", () => {
		expect(restoreAnswerFromApi(singleQuestion, "option-removed")).toBe(null);
	});

	test("restores multi choice answers and drops options that no longer exist", () => {
		expect(restoreAnswerFromApi(multiQuestion, ["option-c", "option-removed", "option-a"])).toEqual([2, 0]);
	});

	test("restores drag and drop answers from card to target into target to card", () => {
		expect(restoreAnswerFromApi(dragDropQuestion, { "card-1": "target-2", "card-2": "target-1" })).toEqual({
			"target-2": "card-1",
			"target-1": "card-2"
		});
	});

	test("restores drag categorize answers into category lists in item order", () => {
		expect(restoreAnswerFromApi(categorizeQuestion, { "item-3": "lean", "item-1": "lean", "item-2": "agile" })).toEqual({
			lean: ["item-1", "item-3"],
			agile: ["item-2"]
		});
	});

	test("keeps answers for types that use the same shape in the API", () => {
		const dropdownQuestion = { id: "q-dropdown", type: QUESTION_TYPES.DROPDOWN_FILL };
		const answer = { "item-1": "option-a" };

		expect(restoreAnswerFromApi(dropdownQuestion, answer)).toBe(answer);
	});

	test("returns null for a missing answer", () => {
		expect(restoreAnswerFromApi(singleQuestion, null)).toBe(null);
		expect(restoreAnswerFromApi(singleQuestion, undefined)).toBe(null);
	});

	test.each([
		[singleQuestion, 1],
		[multiQuestion, [0, 2]],
		[dragDropQuestion, { "target-1": "card-2", "target-2": "card-1" }],
		[categorizeQuestion, { lean: ["item-1", "item-3"], agile: ["item-2"] }]
	])("is the inverse of transformAnswerForApi for %#", (question, answer) => {
		expect(restoreAnswerFromApi(question, transformAnswerForApi(question, answer))).toEqual(answer);
	});
});

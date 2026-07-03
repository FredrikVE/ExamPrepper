// test/ui/viewmodel/ExamPage/updateExamAnswers.test.js
import { describe, expect, test } from "@jest/globals";
import { toggleMultiAnswerSelection, updateObjectAnswerSelection, updateSingleAnswerSelection } from "../../../../src/ui/viewmodel/ExamPage/updateExamAnswers.js";

describe("updateExamAnswers", () => {
	test("updates single-answer questions without mutating previous answers", () => {
		const previousAnswers = { q2: "B" };
		const result = updateSingleAnswerSelection(previousAnswers, "q1", "A");

		expect(result).toEqual({
			q1: "A",
			q2: "B"
		});
		expect(previousAnswers).toEqual({ q2: "B" });
	});

	test("adds and removes multi-answer values", () => {
		const withAddedAnswer = toggleMultiAnswerSelection({ q1: ["A"] }, "q1", "B");
		const withRemovedAnswer = toggleMultiAnswerSelection(withAddedAnswer, "q1", "A");

		expect(withAddedAnswer).toEqual({ q1: ["A", "B"] });
		expect(withRemovedAnswer).toEqual({ q1: ["B"] });
	});

	test("starts multi-answer questions from an empty array when previous answer is not an array", () => {
		expect(toggleMultiAnswerSelection({ q1: "A" }, "q1", "B")).toEqual({
			q1: ["B"]
		});
	});

	test("updates nested object answers for dropdown fill and radio grid questions", () => {
		expect(updateObjectAnswerSelection(
			{ q1: { row1: "A" }, q2: "unchanged" },
			"q1",
			"row2",
			"B"
		)).toEqual({
			q1: {
				row1: "A",
				row2: "B"
			},
			q2: "unchanged"
		});
	});

	test("removes nested object answers when selected value is empty", () => {
		expect(updateObjectAnswerSelection(
			{ q1: { row1: "A", row2: "B" } },
			"q1",
			"row1",
			null
		)).toEqual({
			q1: { row2: "B" }
		});
	});

	test("starts nested object answers from an empty object when previous answer is not a plain object", () => {
		expect(updateObjectAnswerSelection({ q1: ["A"] }, "q1", "row1", "B")).toEqual({
			q1: { row1: "B" }
		});
	});
});

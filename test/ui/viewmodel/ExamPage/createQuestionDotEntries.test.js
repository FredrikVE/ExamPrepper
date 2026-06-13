// test/ui/viewmodel/ExamPage/createQuestionDotEntries.test.js
import { describe, expect, test } from "@jest/globals";
import { createCompactQuestionDotEntries, createQuestionDotEntries } from "../../../../src/ui/viewmodel/ExamPage/createQuestionDotEntries.js";

describe("createQuestionDotEntries", () => {
	test("returns ready-to-render dot entries", () => {
		const result = createQuestionDotEntries(
			[
				{ id: "q1" },
				{ id: "q2" }
			],
			1,
			{ q1: true }
		);

		expect(result).toEqual([
			{
				key: "q1",
				questionId: "q1",
				questionIndex: 0,
				questionNumber: 1,
				isActive: false,
				isCorrect: true
			},
			{
				key: "q2",
				questionId: "q2",
				questionIndex: 1,
				questionNumber: 2,
				isActive: true,
				isCorrect: false
			}
		]);
	});
});

describe("createCompactQuestionDotEntries", () => {
	test("keeps ellipsis entries and enriches question entries", () => {
		const result = createCompactQuestionDotEntries(
			[
				{ key: "q1", questionIndex: 0 },
				{ key: "ellipsis-1", type: "ellipsis" },
				{ key: "q3", questionIndex: 2 }
			],
			[
				{ id: "q1" },
				{ id: "q2" },
				{ id: "q3" }
			],
			2,
			{ q3: true }
		);

		expect(result).toEqual([
			{
				key: "q1",
				questionIndex: 0,
				questionNumber: 1,
				isActive: false,
				isCorrect: false,
				questionId: "q1"
			},
			{ key: "ellipsis-1", type: "ellipsis" },
			{
				key: "q3",
				questionIndex: 2,
				questionNumber: 3,
				isActive: true,
				isCorrect: true,
				questionId: "q3"
			}
		]);
	});
});

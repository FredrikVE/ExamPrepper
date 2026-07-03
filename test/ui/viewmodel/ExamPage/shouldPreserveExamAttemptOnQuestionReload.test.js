// test/ui/viewmodel/ExamPage/shouldPreserveExamAttemptOnQuestionReload.test.js
import { describe, expect, test } from "@jest/globals";
import shouldPreserveExamAttemptOnQuestionReload from "../../../../src/ui/viewmodel/ExamPage/shouldPreserveExamAttemptOnQuestionReload.js";

describe("shouldPreserveExamAttemptOnQuestionReload", () => {
	test("preserves attempt state when loaded questions keep the same ordered ids", () => {
		expect(shouldPreserveExamAttemptOnQuestionReload(
			[
				{ id: "q1", text: "Norwegian question" },
				{ id: "q2", text: "Norwegian question" }
			],
			[
				{ id: "q1", text: "English question" },
				{ id: "q2", text: "English question" }
			]
		)).toBe(true);
	});

	test("resets attempt state on initial question load", () => {
		expect(shouldPreserveExamAttemptOnQuestionReload(
			[],
			[{ id: "q1" }]
		)).toBe(false);
	});

	test("resets attempt state when question counts differ", () => {
		expect(shouldPreserveExamAttemptOnQuestionReload(
			[{ id: "q1" }],
			[{ id: "q1" }, { id: "q2" }]
		)).toBe(false);
	});

	test("resets attempt state when question ids differ", () => {
		expect(shouldPreserveExamAttemptOnQuestionReload(
			[{ id: "q1" }],
			[{ id: "q2" }]
		)).toBe(false);
	});

	test("resets attempt state when the same question ids are reordered", () => {
		expect(shouldPreserveExamAttemptOnQuestionReload(
			[{ id: "q1" }, { id: "q2" }],
			[{ id: "q2" }, { id: "q1" }]
		)).toBe(false);
	});
});

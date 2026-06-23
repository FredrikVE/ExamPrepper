// test/ui/viewmodel/transformAnswersForApi.test.js
import { describe, expect, test } from "@jest/globals";
import transformAnswersForApi from "../../../src/ui/viewmodel/Utils/transformAnswersForApi.js";

describe("transformAnswersForApi", () => {
	test("converts single choice answer from option index to option ID", () => {
		const questions = [
			{
				id: "q1",
				type: "single",
				options: [
					{ id: "q1-opt-A", text: "Wrong" },
					{ id: "q1-opt-B", text: "Correct" }
				]
			}
		];

		const result = transformAnswersForApi(questions, { q1: 1 });

		expect(result).toEqual({ q1: "q1-opt-B" });
	});

	test("converts multi choice answer from option indices to option IDs", () => {
		const questions = [
			{
				id: "q2",
				type: "multi",
				options: [
					{ id: "q2-opt-A", text: "First" },
					{ id: "q2-opt-B", text: "Second" },
					{ id: "q2-opt-C", text: "Third" }
				]
			}
		];

		const result = transformAnswersForApi(questions, { q2: [0, 2] });

		expect(result).toEqual({ q2: ["q2-opt-A", "q2-opt-C"] });
	});

	test("passes fill answers through unchanged", () => {
		const questions = [
			{
				id: "q3",
				type: "fill",
				options: null
			}
		];

		const result = transformAnswersForApi(questions, { q3: "prosess" });

		expect(result).toEqual({ q3: "prosess" });
	});

	test("passes drag-drop answers through unchanged", () => {
		const questions = [
			{
				id: "q4",
				type: "dragDrop",
				options: null,
				targets: [{ id: "t1" }],
				cards: [{ id: "c1" }]
			}
		];

		const result = transformAnswersForApi(questions, { q4: { t1: "c1" } });

		expect(result).toEqual({ q4: { t1: "c1" } });
	});

	test("passes sequence order answers through unchanged", () => {
		const questions = [
			{
				id: "q5",
				type: "SequenceOrder",
				options: null
			}
		];

		const result = transformAnswersForApi(questions, { q5: ["item-b", "item-a"] });

		expect(result).toEqual({ q5: ["item-b", "item-a"] });
	});


	test("passes dropdown fill answers through unchanged", () => {
		const questions = [
			{
				id: "q6",
				type: "dropdownFill",
				options: [
					{ id: "confidentiality", label: "Confidentiality" },
					{ id: "availability", label: "Availability" }
				]
			}
		];

		const answer = { "before-exam": "confidentiality", "during-exam": "availability" };
		const result = transformAnswersForApi(questions, { q6: answer });

		expect(result).toEqual({ q6: answer });
	});


    test("passes radio button grid answers through unchanged", () => {
        const questions = [
            {
                id: "q7",
                type: "radioButtonGrid",
                columns: [
                    { id: "symmetric", label: "Symmetric" },
                    { id: "hash", label: "Hash" }
                ]
            }
        ];

        const answer = { "shared-secret": "symmetric", "one-way": "hash" };
        const result = transformAnswersForApi(questions, { q7: answer });

        expect(result).toEqual({ q7: answer });
    });

	test("handles mixed question types in one submission", () => {
		const questions = [
			{
				id: "q1",
				type: "single",
				options: [{ id: "q1-A" }, { id: "q1-B" }]
			},
			{ id: "q2", type: "fill", options: null },
			{
				id: "q3",
				type: "multi",
				options: [{ id: "q3-A" }, { id: "q3-B" }, { id: "q3-C" }]
			}
		];

		const result = transformAnswersForApi(questions, {
			q1: 0,
			q2: "teknologi",
			q3: [1, 2]
		});

		expect(result).toEqual({
			q1: "q1-A",
			q2: "teknologi",
			q3: ["q3-B", "q3-C"]
		});
	});

	test("passes answer through if question is not found", () => {
		const result = transformAnswersForApi([], { unknown: "value" });

		expect(result).toEqual({ unknown: "value" });
	});
});

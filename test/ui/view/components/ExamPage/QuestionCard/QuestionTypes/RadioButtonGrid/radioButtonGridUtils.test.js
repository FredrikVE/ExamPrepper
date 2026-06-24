import { describe, expect, test } from "@jest/globals";
import { getRadioButtonGridColumns, getRadioButtonGridRows } from "../../../../../../../../src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/RadioButtonGrid/radioButtonGridUtils.js";

describe("radioButtonGridUtils", () => {
	test("keeps columns sorted by position", () => {
		const question = {
			columns: [
				{ id: "hash", label: "Hash", position: 2 },
				{ id: "symmetric", label: "Symmetrisk", position: 1 },
				{ id: "signature", label: "Signatur", position: 3 }
			]
		};

		expect(getRadioButtonGridColumns(question).map((column) => column.id)).toEqual([
			"symmetric",
			"hash",
			"signature"
		]);
	});

	test("applies random order to rows after position sorting", () => {
		const question = {
			rows: [
				{ id: "row-b", text: "B", position: 2 },
				{ id: "row-a", text: "A", position: 1 },
				{ id: "row-c", text: "C", position: 3 }
			]
		};

		expect(getRadioButtonGridRows(question, [2, 0, 1]).map((row) => row.id)).toEqual([
			"row-c",
			"row-a",
			"row-b"
		]);
	});

	test("keeps rows sorted by position when random order is invalid", () => {
		const question = {
			rows: [
				{ id: "row-b", text: "B", position: 2 },
				{ id: "row-a", text: "A", position: 1 }
			]
		};

		expect(getRadioButtonGridRows(question, [0]).map((row) => row.id)).toEqual(["row-a", "row-b"]);
	});
});

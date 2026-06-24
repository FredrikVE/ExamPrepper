import { describe, expect, test } from "@jest/globals";
import { getDropdownFillItems, getDropdownFillOptions } from "../../../../../../../../src/ui/view/components/ExamPage/QuestionCard/QuestionTypes/DropdownFill/dropdownFillUtils.js";

describe("dropdownFillUtils", () => {
	test("keeps dropdown options sorted by position", () => {
		const question = {
			options: [
				{ id: "availability", label: "Tilgjengelighet", position: 3 },
				{ id: "confidentiality", label: "Konfidensialitet", position: 1 },
				{ id: "integrity", label: "Integritet", position: 2 }
			]
		};

		expect(getDropdownFillOptions(question).map((option) => option.id)).toEqual([
			"confidentiality",
			"integrity",
			"availability"
		]);
	});

	test("applies random order to dropdownFill items after position sorting", () => {
		const question = {
			items: [
				{ id: "during-exam", position: 2 },
				{ id: "before-exam", position: 1 },
				{ id: "after-exam", position: 3 }
			]
		};

		expect(getDropdownFillItems(question, [2, 0, 1]).map((item) => item.id)).toEqual([
			"after-exam",
			"before-exam",
			"during-exam"
		]);
	});

	test("keeps dropdownFill items sorted by position when random order is invalid", () => {
		const question = {
			items: [
				{ id: "b", position: 2 },
				{ id: "a", position: 1 }
			]
		};

		expect(getDropdownFillItems(question, [0]).map((item) => item.id)).toEqual(["a", "b"]);
	});
});

//test/ui/viewmodel/QuestionCard/WriteToFillMultipleBlank/writeToFillMultipleBlankState.test.js
import { describe, expect, test } from "@jest/globals";
import { createWriteToFillMultipleBlankViewState } from "../../../../../src/ui/viewmodel/QuestionCard/WriteToFillMultipleBlank/writeToFillMultipleBlankState.js";

const t = { writeToFillMultipleBlankInputLabel: (index) => `Blank ${index}` };
const question = {
	options: [{ id: "short", label: "integrity" }, { id: "long", label: "confidentiality principle" }],
	items: [
		{ id: "one", beforeText: "First", afterText: ".", correctOptionId: "short" },
		{ id: "two", beforeText: "Second", afterText: ".", correctOptionId: "long" }
	]
};

describe("createWriteToFillMultipleBlankViewState", () => {
	test("builds inline input lines from canonical answers", () => {
		const model = createWriteToFillMultipleBlankViewState({ question, answer: { one: "integrity" }, t });
		expect(model.lines[0]).toEqual({ id: "one", beforeText: "First", afterText: ".", value: "integrity", accessibleLabel: "Blank 1", inputSize: "normal" });
		expect(model.lines[1]).toMatchObject({ id: "two", value: "", accessibleLabel: "Blank 2", inputSize: "long" });
	});

	test("normalizes a missing answer to empty values", () => {
		const model = createWriteToFillMultipleBlankViewState({ question, answer: null, t });
		expect(model.lines.map((line) => line.value)).toEqual(["", ""]);
	});
});

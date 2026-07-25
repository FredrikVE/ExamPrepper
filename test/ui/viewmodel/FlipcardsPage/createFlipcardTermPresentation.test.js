// test/ui/viewmodel/FlipcardsPage/createFlipcardTermPresentation.test.js
import { describe, expect, test } from "@jest/globals";
import createFlipcardTermPresentation from "../../../../src/ui/viewmodel/FlipcardsPage/createFlipcardTermPresentation.js";
import { createNorwegianCompoundLexicon } from "../../../../src/ui/viewmodel/FlipcardsPage/norwegianCompoundSegmentation.js";

const lexicon = createNorwegianCompoundLexicon({
	terms: ["MAC", "O(n)"],
	supportingTexts: []
});

describe("createFlipcardTermPresentation", () => {
	test("moves a trailing parenthetical explanation to its own presentation segment", () => {
		expect(createFlipcardTermPresentation("MAC (message authentication code)", lexicon)).toEqual({
			primaryText: "MAC",
			parentheticalText: "(message authentication code)"
		});
	});

	test("keeps non-Norwegian terms unchanged when no Norwegian lexicon is active", () => {
		expect(createFlipcardTermPresentation("Block cipher", null)).toEqual({
			primaryText: "Block cipher",
			parentheticalText: null
		});
	});

	test("does not split notation without a separating space", () => {
		expect(createFlipcardTermPresentation("O(n)", lexicon)).toEqual({
			primaryText: "O(n)",
			parentheticalText: null
		});
	});

	test("does not split parentheses that are followed by more term text", () => {
		expect(createFlipcardTermPresentation("OSI (Open Systems Interconnection) model", lexicon)).toEqual({
			primaryText: "OSI (Open Systems Interconnection) model",
			parentheticalText: null
		});
	});
});

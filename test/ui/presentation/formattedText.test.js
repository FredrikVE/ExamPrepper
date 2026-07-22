// test/ui/presentation/formattedText.test.js
import { describe, expect, test } from "@jest/globals";
import { createFormattedTextSegments, createHighlightedFormattedTextSegments, createPlainFormattedText } from "../../../src/ui/presentation/formattedText.js";

describe("formattedText", () => {
	test("creates bold segments from double-asterisk markup", () => {
		expect(createFormattedTextSegments("Kan **omgå normal autentisering** ved feil konfigurasjon.")).toEqual([
			{
				text: "Kan ",
				isBold: false,
				sourceStart: 0,
				sourceEnd: 4
			},
			{
				text: "omgå normal autentisering",
				isBold: true,
				sourceStart: 6,
				sourceEnd: 31
			},
			{
				text: " ved feil konfigurasjon.",
				isBold: false,
				sourceStart: 33,
				sourceEnd: 57
			}
		]);
	});

	test("keeps bold formatting when a glossary search match splits the marked text", () => {
		expect(createHighlightedFormattedTextSegments([
			{ text: "Kan **omgå ", isMatch: false },
			{ text: "normal", isMatch: true },
			{ text: " autentisering** ved feil.", isMatch: false }
		])).toEqual([
			{ text: "Kan ", isBold: false, isMatch: false },
			{ text: "omgå ", isBold: true, isMatch: false },
			{ text: "normal", isBold: true, isMatch: true },
			{ text: " autentisering", isBold: true, isMatch: false },
			{ text: " ved feil.", isBold: false, isMatch: false }
		]);
	});

	test("creates plain accessible text without formatting markers", () => {
		expect(createPlainFormattedText("Kan **omgå normal autentisering**.")).toBe("Kan omgå normal autentisering.");
	});
});

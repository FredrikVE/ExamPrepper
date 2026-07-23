import { describe, expect, test } from "@jest/globals";
import { LEARNING_CONTENT_ENTRIES, LEARNING_CONTENT_TYPES } from "../../src/navigation/learningContent.js";

describe("learning content configuration", () => {
	test("lists every supported content type once", () => {
		expect(LEARNING_CONTENT_ENTRIES.map((entry) => entry.id)).toEqual([
		LEARNING_CONTENT_TYPES.EXAMS,
		LEARNING_CONTENT_TYPES.FLIPCARDS,
		LEARNING_CONTENT_TYPES.MATCHCARDS,
		LEARNING_CONTENT_TYPES.GLOSSARY
	]);
	});

	test("contains the text keys needed by the select page", () => {
		for (const entry of LEARNING_CONTENT_ENTRIES) {
			expect(entry).toEqual(expect.objectContaining({
				labelKey: expect.any(String),
				titleKey: expect.any(String),
				searchPlaceholderKey: expect.any(String),
				subtitleKey: expect.any(String),
				subtitleFallbackKey: expect.any(String)
			}));
		}
	});
});

// test/navigation/learningContent.test.js
import { describe, expect, test } from "@jest/globals";
import { NAV_SCREENS } from "../../src/navigation/navGraph.js";
import { LEARNING_CONTENT_TYPES, resolveContentTypeNavigation } from "../../src/navigation/learningContent.js";

describe("resolveContentTypeNavigation", () => {
	test.each([
		LEARNING_CONTENT_TYPES.EXAMS,
		LEARNING_CONTENT_TYPES.FLIPCARDS,
		LEARNING_CONTENT_TYPES.MATCHCARDS
	])("routes %s through the selection screen", (contentTypeId) => {
		expect(resolveContentTypeNavigation(contentTypeId)).toEqual({
			screen: NAV_SCREENS.SELECT,
			contentTypeId
		});
	});

	test("routes glossary directly to the glossary screen", () => {
		expect(resolveContentTypeNavigation(LEARNING_CONTENT_TYPES.GLOSSARY)).toEqual({
			screen: NAV_SCREENS.GLOSSARY,
			contentTypeId: null
		});
	});

	test("throws for an unknown content type", () => {
		expect(() => resolveContentTypeNavigation("unknown")).toThrow("Ukjent innholdstype: unknown");
	});
});

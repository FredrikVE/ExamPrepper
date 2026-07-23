import { describe, expect, test } from "@jest/globals";
import { NAV_SCREENS } from "../../src/navigation/navGraph.js";

describe("NAV_SCREENS", () => {
	test("contains only the screens rendered by App", () => {
		expect(NAV_SCREENS).toEqual({
			SUBJECTS: "subjects",
			SELECT: "select",
			EXAM: "exam",
			FLIPCARDS: "flipcards",
			MATCHCARDS: "matchcards",
			GLOSSARY: "glossary",
			OVERVIEW: "overview"
		});
	});

	test("uses unique screen ids", () => {
		const screens = Object.values(NAV_SCREENS);
		expect(new Set(screens).size).toBe(screens.length);
	});
});

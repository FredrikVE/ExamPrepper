import { describe, expect, test } from "@jest/globals";
import normalizeSearchTerm from "../../../../src/ui/viewmodel/Utils/normalizeSearchTerm.js";

describe("normalizeSearchTerm", () => {
	test("trims and lowercases a search string", () => {
		expect(normalizeSearchTerm("  KRYPTOGRAFI  ")).toBe("kryptografi");
		expect(normalizeSearchTerm("")).toBe("");
	});

	test.each([null, undefined, 42, {}, []])("rejects non-string input: %p", (value) => {
		expect(() => normalizeSearchTerm(value)).toThrow(TypeError);
	});
});

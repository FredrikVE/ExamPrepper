// test/ui/viewmodel/Utils/resolveFirstLoadError.test.js
import { describe, expect, test } from "@jest/globals";
import resolveFirstLoadError from "../../../../src/ui/viewmodel/Utils/resolveFirstLoadError.js";

describe("resolveFirstLoadError", () => {
	test("returns the first load error", () => {
		const loadModels = [
			{ error: null },
			{ error: "Topic areas failed" },
			{ error: "Concepts failed" }
		];

		expect(resolveFirstLoadError(loadModels, "Fallback")).toBe("Topic areas failed");
	});

	test("returns the fallback message when no load model has an error", () => {
		const loadModels = [
			{ error: null },
			{ error: null }
		];

		expect(resolveFirstLoadError(loadModels, "Fallback")).toBe("Fallback");
	});
});

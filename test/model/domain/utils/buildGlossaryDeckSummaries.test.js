// test/model/domain/utils/buildGlossaryDeckSummaries.test.js
import { describe, expect, test } from "@jest/globals";
import { buildGlossaryDeckSummaries } from "../../../../src/model/domain/utils/buildGlossaryDeckSummaries.js";

describe("buildGlossaryDeckSummaries", () => {
	test("counts glossary entries by topic area and skips empty topic areas", () => {
		const glossaryEntries = [
			{ id: "a", topicAreaKey: "crypto" },
			{ id: "b", topicAreaKey: "crypto" },
			{ id: "c", topicAreaKey: "iam" }
		];
		const topicAreas = [
			{ key: "crypto" },
			{ key: "iam" },
			{ key: "unused" }
		];

		const result = buildGlossaryDeckSummaries(glossaryEntries, topicAreas);

		expect(result).toEqual([
			{ topicAreaKey: "crypto", cardCount: 2, estimatedMinutes: 5 },
			{ topicAreaKey: "iam", cardCount: 1, estimatedMinutes: 5 }
		]);
	});
});

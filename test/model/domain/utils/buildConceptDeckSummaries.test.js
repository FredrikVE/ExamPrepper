// test/model/domain/utils/buildConceptDeckSummaries.test.js
import { describe, expect, test } from "@jest/globals";
import { buildConceptDeckSummaries } from "../../../../src/model/domain/utils/buildConceptDeckSummaries.js";

describe("buildConceptDeckSummaries", () => {
	test("counts concepts by topic area and skips empty topic areas", () => {
		const concepts = [
			{ id: "a", topicAreaKey: "crypto" },
			{ id: "b", topicAreaKey: "crypto" },
			{ id: "c", topicAreaKey: "iam" }
		];
		const topicAreas = [
			{ key: "crypto" },
			{ key: "iam" },
			{ key: "unused" }
		];

		const result = buildConceptDeckSummaries(concepts, topicAreas);

		expect(result).toEqual([
			{ topicAreaKey: "crypto", cardCount: 2, estimatedMinutes: 5 },
			{ topicAreaKey: "iam", cardCount: 1, estimatedMinutes: 5 }
		]);
	});
});

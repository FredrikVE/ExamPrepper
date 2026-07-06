// test/model/domain/utils/topicAreaFilters.test.js
import { describe, expect, test } from "@jest/globals";
import { findTopicAreaByKey } from "../../../../src/model/domain/utils/topicAreaFilters.js";

describe("findTopicAreaByKey", () => {
	test("returns the matching topic area", () => {
		const topicAreas = [
			{ key: "begreper", label: "Begreper" },
			{ key: "kryptografi", label: "Kryptografi" }
		];

		expect(findTopicAreaByKey(topicAreas, "kryptografi")).toEqual({
			key: "kryptografi",
			label: "Kryptografi"
		});
	});

	test("returns null when no topic area matches", () => {
		const topicAreas = [
			{ key: "begreper", label: "Begreper" }
		];

		expect(findTopicAreaByKey(topicAreas, "kryptografi")).toBeNull();
	});
});

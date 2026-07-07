// test/model/domain/utils/filterConceptCardsByTopicArea.test.js
import { describe, expect, test } from "@jest/globals";
import { filterConceptCardsByTopicArea } from "../../../../src/model/domain/utils/filterConceptCardsByTopicArea.js";

describe("filterConceptCardsByTopicArea", () => {
	const conceptCards = [
		{ id: "a", topicAreaKey: "crypto" },
		{ id: "b", topicAreaKey: "iam" }
	];

	test("returns all concept cards when all topic areas are selected", () => {
		expect(filterConceptCardsByTopicArea(conceptCards, "all")).toEqual(conceptCards);
	});

	test("returns concept cards for the selected topic area", () => {
		expect(filterConceptCardsByTopicArea(conceptCards, "crypto")).toEqual([
			{ id: "a", topicAreaKey: "crypto" }
		]);
	});
});

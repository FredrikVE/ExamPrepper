// test/model/domain/utils/filterFlipcardsByTopicArea.test.js
import { describe, expect, test } from "@jest/globals";
import { filterFlipcardsByTopicArea } from "../../../../src/model/domain/utils/filterFlipcardsByTopicArea.js";

describe("filterFlipcardsByTopicArea", () => {
	const flipcards = [
		{ id: "a", topicAreaKey: "crypto" },
		{ id: "b", topicAreaKey: "iam" }
	];

	test("returns all flipcards when all topic areas are selected", () => {
		expect(filterFlipcardsByTopicArea(flipcards, "all")).toEqual(flipcards);
	});

	test("returns flipcards for the selected topic area", () => {
		expect(filterFlipcardsByTopicArea(flipcards, "crypto")).toEqual([
			{ id: "a", topicAreaKey: "crypto" }
		]);
	});
});

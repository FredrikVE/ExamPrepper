// test/ui/viewmodel/LearningContentSelectPage/testSetFilters.test.js
import { describe, expect, test } from "@jest/globals";
import { ALL_TOPIC_AREAS } from "../../../../src/model/domain/utils/topicAreaFilters.js";
import { filterTestSets } from "../../../../src/ui/viewmodel/LearningContentSelectPage/testSetFilters.js";

const testSets = [
	{
		id: "security",
		title: "Sikkerhet",
		description: "Grunnleggende sikkerhet",
		modeLabel: "Del 1",
		topicAreaKeys: ["security"]
	},
	{
		id: "governance",
		title: "Governance",
		description: "Styring og ledelse",
		modeLabel: "Del 2",
		topicAreaKeys: ["governance"]
	},
	{
		id: "without-topics",
		title: "Uten fagområde",
		description: "Ingen topicAreaKeys"
	}
];

describe("filterTestSets", () => {
	test("returns the scoped resource unchanged when no search or topic filter is active", () => {
		expect(filterTestSets(testSets, "", ALL_TOPIC_AREAS)).toEqual(testSets);
	});

	test("filters by topic area without inspecting test-set type", () => {
		expect(filterTestSets(testSets, "", "security")
			.map((testSet) => testSet.id)).toEqual(["security"]);
	});

	test("filters by normalized search across title, description and mode label", () => {
		expect(filterTestSets(testSets, "sikkerhet", ALL_TOPIC_AREAS)
			.map((testSet) => testSet.id)).toEqual(["security"]);
		expect(filterTestSets(testSets, "styring", ALL_TOPIC_AREAS)
			.map((testSet) => testSet.id)).toEqual(["governance"]);
		expect(filterTestSets(testSets, "del 2", ALL_TOPIC_AREAS)
			.map((testSet) => testSet.id)).toEqual(["governance"]);
	});

	test("combines search and topic-area filtering", () => {
		expect(filterTestSets(testSets, "sikkerhet", "security")
			.map((testSet) => testSet.id)).toEqual(["security"]);
		expect(filterTestSets(testSets, "governance", "security")).toEqual([]);
	});

	test("does not match a concrete topic when topicAreaKeys is missing", () => {
		expect(filterTestSets([testSets[2]], "", "security")).toEqual([]);
	});
});

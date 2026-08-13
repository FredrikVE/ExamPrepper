// test/ui/architecture/scopedTestSetFilterOwnership.test.js
import fs from "node:fs";
import path from "node:path";
import { describe, expect, test } from "@jest/globals";

const filterPath = path.resolve("src/ui/viewmodel/LearningContentSelectPage/testSetFilters.js");
const viewModelPath = path.resolve("src/ui/viewmodel/LearningContentSelectPageViewModel.js");
const testSetCardPath = path.resolve("src/ui/view/components/LearningContentSelectPage/TestSetCard.jsx");
const testSetGridPath = path.resolve("src/ui/view/components/LearningContentSelectPage/TestSetGrid.jsx");
const pagePath = path.resolve("src/ui/view/pages/LearningContentSelectPage.jsx");

describe("scoped test-set filter ownership", () => {
	test("frontend filtering owns search and topic area, not test-set classification", () => {
		const filterSource = fs.readFileSync(filterPath, "utf8");
		const viewModelSource = fs.readFileSync(viewModelPath, "utf8");
		const combinedSource = `${filterSource}\n${viewModelSource}`;

		expect(filterSource).toContain("export function filterTestSets(testSets, searchTerm, topicAreaKey)");
		expect(filterSource).toContain("testSetMatchesTopicArea");
		expect(filterSource).toContain("testSetMatchesSearchTerm");
		expect(combinedSource).not.toContain("filterExamsByTestType");
		expect(combinedSource).not.toContain("examMatchesTestType");
		expect(filterSource).not.toContain("TEST_TYPES");
		expect(filterSource).not.toContain("testType ===");
		expect(filterSource).not.toContain("export { ALL_TOPIC_AREAS }");
	});
	test("routes selection from ViewModel-owned selectedTestType, not DTO metadata", () => {
		const viewModelSource = fs.readFileSync(viewModelPath, "utf8");
		const testSetCardSource = fs.readFileSync(testSetCardPath, "utf8");

		expect(viewModelSource).toContain("onSelectTestSet(testSetId, selectedTestType);");
		expect(viewModelSource).not.toContain("selectedExam?.testType");
		expect(viewModelSource).not.toContain("resolvedTestType");
		expect(testSetCardSource).toContain("onSelectTestSet(testSet.id)");
		expect(testSetCardSource).not.toContain("testSet.testType");
	});

	test("uses type-neutral select presentation for the scoped resources", () => {
		const pageSource = fs.readFileSync(pagePath, "utf8");
		const testSetGridSource = fs.readFileSync(testSetGridPath, "utf8");

		expect(fs.existsSync(path.resolve("src/ui/view/components/LearningContentSelectPage/ExamGrid.jsx"))).toBe(false);
		expect(fs.existsSync(path.resolve("src/ui/view/components/LearningContentSelectPage/ExamCard.jsx"))).toBe(false);
		expect(pageSource).toContain("<TestSetGrid");
		expect(pageSource).toContain("testSets={viewModel.visibleTestSets}");
		expect(pageSource).toContain("onSelectTestSet={viewModel.selectTestSet}");
		expect(testSetGridSource).toContain("testSets.map((testSet, index)");
	});

});

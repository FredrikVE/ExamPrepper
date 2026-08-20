//test/ui/view/components/LearningPathPage/LearningPathRoadmap.test.js
import fs from "node:fs";
import path from "node:path";
import { describe, expect, test } from "@jest/globals";

const ROADMAP_PATH = path.resolve("src/ui/view/components/LearningPathPage/LearningPathRoadmap.jsx");
const STEP_PATH = path.resolve("src/ui/view/components/LearningPathPage/LearningPathStep.jsx");
const MASTERY_RING_PATH = path.resolve("src/ui/view/components/LearningPathPage/LearningPathMasteryRing.jsx");

function readSource(filePath) {
	return fs.readFileSync(filePath, "utf8");
}

describe("LearningPathRoadmap", () => {
	test("keeps roadmap composition in dedicated feature components", () => {
		const roadmapSource = readSource(ROADMAP_PATH);
		const stepSource = readSource(STEP_PATH);

		expect(roadmapSource).toContain("<LearningPathExamGate");
		expect(roadmapSource).toContain("<LearningPathStep");
		expect(stepSource).toContain("<LearningPathNode");
		expect(stepSource).toContain("<LearningPathModuleCard");
		expect(stepSource).toContain("<LearningPathModuleDetail");
	});

	test("renders mastery as a percentage-based SVG ring", () => {
		const masteryRingSource = readSource(MASTERY_RING_PATH);

		expect(masteryRingSource).toContain('strokeDasharray={`${model.percentage} 100`}');
		expect(masteryRingSource).toContain("{model.compactDisplayValue}");
		expect(masteryRingSource).toContain("aria-label={model.accessibleLabel}");
	});
});

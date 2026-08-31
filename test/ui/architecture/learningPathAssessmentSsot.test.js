// test/ui/architecture/learningPathAssessmentSsot.test.js
import fs from "node:fs";
import path from "node:path";
import { describe, expect, test } from "@jest/globals";

const read = (relativePath) => fs.readFileSync(path.resolve(relativePath), "utf8");

const assessmentViewModels = [
	"src/ui/viewmodel/LearningSession/LearningSessionPagePresentation.js",
	"src/ui/viewmodel/LearningPathPagePresentation.js"
];

describe("LearningPath assessment and start-authority SSOT", () => {
	test("never classifies assessment bands from percentages in frontend consumers", () => {
		for (const file of assessmentViewModels) {
			const source = read(file);
			expect(source).not.toMatch(/(?:>=|>)\s*(?:40|55|80)\b/);
		}
		expect(read("src/ui/viewmodel/LearningSession/LearningSessionPagePresentation.js")).toContain("percentage === 100");
	});

	test("keeps session icon selection out of the View", () => {
		const view = read("src/ui/view/components/LearningPathPage/LearningPathRoadmap.jsx");

		expect(view).toContain("model.iconKey");
		expect(view).not.toMatch(/model\.status\s*===/);
	});

	test("scopes donut rotation and assessment colors to canonical selectors and tokens", () => {
		const sessionNodeCss = read("src/ui/style/LearningPathPage/learning-path-session-node.css");
		const moduleCardCss = read("src/ui/style/LearningPathPage/learning-path-module-card.css");
		const roadmapCss = read("src/ui/style/LearningPathPage/learning-path-roadmap.css");
		const sessionCss = read("src/ui/style/LearningSessionPage/learning-session.css");
		expect(sessionNodeCss).toMatch(/\.learning-path-session-score__ring\s*\{[\s\S]*?transform:\s*rotate\(-90deg\)/);
		expect(sessionNodeCss).not.toMatch(/(^|\n)\s*svg\s*\{[\s\S]*?rotate\(-90deg\)/);
		for (const band of ["practice", "progress", "understood", "not-assessed"]) {
			expect(moduleCardCss).toContain(`.learning-path-mastery-ring--${band} .learning-path-mastery-ring__value { stroke: var(--assessment-${band}); }`);
		}
		for (const band of ["practice", "progress", "understood"]) {
			expect(roadmapCss).toContain(`var(--assessment-${band})`);
		}
		expect(sessionNodeCss).toContain("var(--assessment-progress)");
		expect(sessionCss).toContain("var(--assessment-progress)");
	});
});

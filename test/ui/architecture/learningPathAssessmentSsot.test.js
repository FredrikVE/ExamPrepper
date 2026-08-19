// test/ui/architecture/learningPathAssessmentSsot.test.js
import fs from "node:fs";
import path from "node:path";
import { describe, expect, test } from "@jest/globals";

const read = (relativePath) => fs.readFileSync(path.resolve(relativePath), "utf8");

const assessmentViewModels = [
	"src/ui/viewmodel/LearningSession/createSessionResultModel.js",
	"src/ui/viewmodel/LearningPath/createLearningPathProgressModel.js",
	"src/ui/viewmodel/LearningPath/createLearningPathSessionModel.js"
];

describe("LearningPath assessment and start-authority SSOT", () => {
	test("never classifies assessment bands from percentages in frontend consumers", () => {
		for (const file of assessmentViewModels) {
			const source = read(file);
			expect(source).not.toMatch(/(?:>=|>)\s*(?:40|55|80)\b/);
		}
		expect(read("src/ui/viewmodel/LearningSession/createSessionResultModel.js")).toContain("percentage === 100");
	});

	test("renders module performance directly from the backend module progress", () => {
		const source = read("src/ui/viewmodel/LearningPath/createLearningPathModuleModel.js");
		expect(source).toContain("performancePercent: module.progress.performancePercent");
		expect(source).not.toMatch(/sessions\.(?:reduce|map).*performancePercent/s);
		expect(source).not.toMatch(/createLearningPathProgressModel\(\{[^}]*completionPercent/s);
	});

	test("keeps session icon selection in the ViewModel", () => {
		const model = read("src/ui/viewmodel/LearningPath/createLearningPathSessionModel.js");
		const view = read("src/ui/view/components/LearningPathPage/LearningPathSessionNode.jsx");
		expect(model).toContain("iconKey:");
		expect(view).toContain("model.iconKey");
		expect(view).not.toMatch(/model\.status\s*===/);
	});

	test("scopes donut rotation and assessment colors to canonical selectors and tokens", () => {
		const pathCss = read("src/ui/style/LearningPathPage/learning-path-session-node.css");
		const sessionCss = read("src/ui/style/LearningSessionPage/learning-session.css");
		expect(pathCss).toMatch(/\.learning-path-session-score__ring\s*\{[\s\S]*?transform:\s*rotate\(-90deg\)/);
		expect(pathCss).not.toMatch(/(^|\n)\s*svg\s*\{[\s\S]*?rotate\(-90deg\)/);
		expect(pathCss).toContain("var(--assessment-progress)");
		expect(sessionCss).toContain("var(--assessment-progress)");
	});

	test("derives frontend selectability only from backend isStartable", () => {
		const source = read("src/ui/viewmodel/LearningPath/createLearningPathSessionModel.js");
		expect(source).toContain("const isSelectable = session.isStartable");
		expect(source).not.toMatch(/isSelectable\s*=.*status/);
	});
});

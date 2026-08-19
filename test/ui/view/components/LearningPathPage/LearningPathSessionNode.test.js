// test/ui/view/components/LearningPathPage/LearningPathSessionNode.test.js
import fs from "node:fs";
import path from "node:path";
import { describe, expect, test } from "@jest/globals";

const NODE_PATH = path.resolve("src/ui/view/components/LearningPathPage/LearningPathSessionNode.jsx");
const SCORE_PATH = path.resolve("src/ui/view/components/LearningPathPage/LearningPathSessionScore.jsx");

describe("LearningPathSessionNode", () => {
	test("renders ViewModel-owned icon state without making sessions interactive", () => {
		const source = fs.readFileSync(NODE_PATH, "utf8");
		expect(source).toContain('model.iconKey === "score"');
		expect(source).toContain("<LearningPathSessionScore");
		expect(source).not.toMatch(/<button|onClick|onSelected/);
	});

	test("scopes donut rotation to the score ring class", () => {
		const source = fs.readFileSync(SCORE_PATH, "utf8");
		expect(source).toContain('className="learning-path-session-score__ring"');
		expect(source).toContain('strokeDasharray={`${model.percentage} 100`}');
	});
});

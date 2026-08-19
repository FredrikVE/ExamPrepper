// test/ui/view/components/LearningPathPage/LearningPathSessionNode.test.js
import fs from "node:fs";
import path from "node:path";
import { describe, expect, test } from "@jest/globals";

const NODE_PATH = path.resolve("src/ui/view/components/LearningPathPage/LearningPathSessionNode.jsx");
const SCORE_PATH = path.resolve("src/ui/view/components/LearningPathPage/LearningPathSessionScore.jsx");

describe("LearningPathSessionNode", () => {
	test("makes only backend-startable sessions interactive", () => {
		const source = fs.readFileSync(NODE_PATH, "utf8");
		expect(source).toContain("model.isSelectable");
		expect(source).toContain("<button");
		expect(source).toContain("onSelected(model.actionModel)");
		expect(source).toContain("learning-path-session-node__hover-play");
	});

	test("scopes donut rotation to the score ring class", () => {
		const source = fs.readFileSync(SCORE_PATH, "utf8");
		expect(source).toContain('className="learning-path-session-score__ring"');
		expect(source).toContain('strokeDasharray={`${model.percentage} 100`}');
	});
});

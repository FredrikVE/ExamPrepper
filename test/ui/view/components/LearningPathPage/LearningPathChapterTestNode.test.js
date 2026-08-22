import fs from "node:fs";
import path from "node:path";
import { describe, expect, test } from "@jest/globals";

const NODE_PATH = path.resolve("src/ui/view/components/LearningPathPage/LearningPathChapterTestNode.jsx");

describe("LearningPathChapterTestNode", () => {
	test("reuses the LearningSession score donut for assessed ChapterTests", () => {
		const source = fs.readFileSync(NODE_PATH, "utf8");
		expect(source).toContain('import LearningPathSessionScore from "./LearningPathSessionScore.jsx";');
		expect(source).toContain("<LearningPathSessionScore model={model.scoreModel} />");
		expect(source).not.toContain("LearningPathProgressRow");
	});
});

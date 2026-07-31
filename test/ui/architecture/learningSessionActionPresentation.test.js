//test/ui/architecture/learningSessionActionPresentation.test.js
import fs from "node:fs";
import path from "node:path";
import { describe, expect, test } from "@jest/globals";

describe("LearningSession action presentation", () => {
	test("keeps feedback optional and renders one full-width primary action", () => {
		const source = fs.readFileSync(path.resolve("src/ui/view/components/LearningSessionPage/SessionActionPanel.jsx"), "utf8");
		expect(source).toContain("const hasFeedback");
		expect(source).toContain("<ArrowRight aria-hidden=\"true\" />");
		expect(source.match(/learning-session-primary/g)).toHaveLength(2);
	});

	test("removes the question action during the final submit transition", () => {
		const source = fs.readFileSync(path.resolve("src/ui/viewmodel/LearningSessionPageViewModel.js"), "utf8");
		expect(source).toContain("shouldShowSessionActionPanel");
		expect(source).toContain("const showActionPanel");
		expect(source).toContain("const actionPanelModel = showActionPanel ?");
	});
});

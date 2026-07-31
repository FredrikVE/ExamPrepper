//test/ui/architecture/learningSessionResultPresentation.test.js
import fs from "node:fs";
import path from "node:path";
import { describe, expect, test } from "@jest/globals";

function read(relativePath) {
	return fs.readFileSync(path.resolve(relativePath), "utf8");
}

describe("LearningSession result presentation", () => {
	test("labels the round score and module mastery instead of rendering unexplained percentages", () => {
		const source = read("src/ui/view/components/LearningSessionPage/SessionResultPanel.jsx");
		expect(source).toContain('className="learning-session-result__stats"');
		expect(source).toContain('className="learning-session-result__module-progress"');
		expect(source).toContain("pointsLabel");
		expect(source).toContain("roundScoreLabel");
		expect(source).toContain("moduleMasteryLabel");
		expect(source).toContain("nextStepBody");
		expect(source).toContain("<ArrowRight aria-hidden=\"true\" />");
	});

	test("uses score-dependent strong, medium and weak result appearances", () => {
		const model = read("src/ui/viewmodel/LearningSession/createSessionResultModel.js");
		const css = read("src/ui/style/LearningSessionPage/learning-session.css");
		expect(model).toContain('STRONG: "strong"');
		expect(model).toContain('MEDIUM: "medium"');
		expect(model).toContain('WEAK: "weak"');
		expect(css).toContain(".learning-session-result--strong");
		expect(css).toContain(".learning-session-result--medium");
		expect(css).toContain(".learning-session-result--weak");
	});

	test("replaces the final question counter with a completion label", () => {
		const viewModel = read("src/ui/viewmodel/LearningSessionPageViewModel.js");
		expect(viewModel).toContain("state.submitResult === null ? t.learningSessionQuestionCounter");
		expect(viewModel).toContain(": t.learningSessionResultHeaderLabel");
	});
});

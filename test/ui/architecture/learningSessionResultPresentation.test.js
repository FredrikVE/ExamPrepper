// test/ui/architecture/learningSessionResultPresentation.test.js
import fs from "node:fs";
import path from "node:path";
import { describe, expect, test } from "@jest/globals";

function read(relativePath) {
	return fs.readFileSync(path.resolve(relativePath), "utf8");
}

describe("LearningSession result presentation", () => {
	test("shows the completed Session result and returns progression ownership to Learning Path", () => {
		const source = read("src/ui/view/components/LearningSessionPage/SessionResultPanel.jsx");
		const model = read("src/ui/viewmodel/LearningSession/createSessionResultModel.js");

		expect(source).toContain('className="learning-session-result__stats"');
		expect(source).toContain('className="learning-session-result__module-progress"');
		expect(source).toContain("pointsLabel");
		expect(source).toContain("scoreLabel");
		expect(source).toContain("nextStepBody");
		expect(source).toContain("<ArrowRight aria-hidden=\"true\" />");
		expect(model).toContain("learningSessionResultContinuePathBody");
		expect(model).toContain("onPrimary: onBack");
		expect(model).not.toMatch(/nextRound|roundScore|moduleMastery/);
	});

	test("consumes backend assessment bands without local percentage thresholds", () => {
		const model = read("src/ui/viewmodel/LearningSession/createSessionResultModel.js");
		const css = read("src/ui/style/LearningSessionPage/learning-session.css");
		const tokens = read("src/ui/style/Tokens.css");
		expect(model).toContain('PRACTICE: "practice"');
		expect(model).toContain('PROGRESS: "progress"');
		expect(model).toContain('UNDERSTOOD: "understood"');
		expect(model).toContain('NOT_ASSESSED: "not-assessed"');
		expect(model).not.toMatch(/percentage\s*>=\s*(?:80|55)/);
		expect(css).toContain(".learning-session-result--practice");
		expect(css).toContain(".learning-session-result--progress");
		expect(css).toContain(".learning-session-result--understood");
		expect(css).toContain(".learning-session-result--not-assessed");
		expect(tokens).toContain("--assessment-practice:");
		expect(tokens).toContain("--assessment-progress:");
		expect(tokens).toContain("--assessment-understood:");
		expect(tokens).toContain("--assessment-not-assessed:");
	});

	test("replaces the final question counter with a completion label", () => {
		const viewModel = read("src/ui/viewmodel/LearningSessionPageViewModel.js");
		expect(viewModel).toContain("state.submitResult === null ? t.learningSessionQuestionCounter");
		expect(viewModel).toContain(": t.learningSessionResultHeaderLabel");
	});
});

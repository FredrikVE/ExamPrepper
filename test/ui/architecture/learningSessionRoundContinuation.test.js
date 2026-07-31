//test/ui/architecture/learningSessionRoundContinuation.test.js
import fs from "node:fs";
import path from "node:path";
import { describe, expect, test } from "@jest/globals";

function read(relativePath) {
	return fs.readFileSync(path.resolve(relativePath), "utf8");
}

describe("LearningSession round continuation", () => {
	test("starts the next backend session without navigating through LearningPath", () => {
		const app = read("src/App.jsx");
		const viewModel = read("src/ui/viewmodel/LearningSessionPageViewModel.js");
		expect(app).toContain("startLearningSessionUseCase");
		expect(app).toContain("onLearningSessionStarted={navigationViewModel.openLearningSession}");
		expect(viewModel).toContain("createNextRoundStartCommand");
		expect(viewModel).toContain("await startLearningSessionUseCase.execute(command)");
		expect(viewModel).toContain("onLearningSessionStarted(session.sessionId)");
	});

	test("renders both exit and continue actions only between rounds", () => {
		const panel = read("src/ui/view/components/LearningSessionPage/SessionResultPanel.jsx");
		expect(panel).toContain("secondaryLabel !== null");
		expect(panel).toContain('className="learning-session-result__secondary"');
		expect(panel).toContain('className="learning-session-result__continue"');
		expect(panel).toContain("actionErrorMessage");
	});
});

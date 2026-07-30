//test/ui/architecture/learningPathActionContract.test.js
import fs from "node:fs";
import path from "node:path";
import { describe, expect, test } from "@jest/globals";

function read(relativePath) {
	return fs.readFileSync(path.resolve(relativePath), "utf8");
}

describe("LearningPath action contract", () => {
	test("reuses the active roadmap entry action in the continue panel", () => {
		const source = read("src/ui/viewmodel/LearningPath/createContinueLearningModel.js");
		expect(source).toContain("actionModel: activeEntry.actionModel");
		expect(source).not.toMatch(/startLearningSessionUseCase|moduleId\s*:\s*activeEntry\.id/);
	});

	test("routes both LearningPath entry points through one ViewModel handler", () => {
		const page = read("src/ui/view/pages/LearningPathPage.jsx");
		const viewModel = read("src/ui/viewmodel/LearningPathPageViewModel.js");
		expect(page.match(/onActionPressed=\{viewModel\.onLearningPathAction\}/g)).toHaveLength(2);
		expect(viewModel).toContain("const executeLearningPathAction");
		expect(viewModel).toContain("onLearningPathAction: executeLearningPathAction");
		expect(page).not.toMatch(/onStartModule|onContinue=/);
	});

	test("uses the action round so completed modules restart from round one", () => {
		const actionModel = read("src/ui/viewmodel/LearningPath/createLearningPathActionModel.js");
		const viewModel = read("src/ui/viewmodel/LearningPathPageViewModel.js");
		expect(actionModel).toContain('intent: isCompleted ? "restart" : "start"');
		expect(actionModel).toContain("round: isCompleted ? 1 : module.progress.nextRound");
		expect(viewModel).toContain("round: actionModel.round");
		expect(viewModel).toContain("await startSession(actionModel)");
	});

	test("passes the complete action model from module detail", () => {
		const detail = read("src/ui/view/components/LearningPathPage/LearningPathModuleDetail.jsx");
		const step = read("src/ui/view/components/LearningPathPage/LearningPathStep.jsx");
		expect(detail).toContain("onActionPressed(model.actionModel)");
		expect(step).toContain("onActionPressed={onActionPressed}");
		expect(detail).not.toMatch(/onStartPressed|onStartModule/);
	});
});

import fs from "node:fs";
import path from "node:path";
import { describe, expect, test } from "@jest/globals";
const read = (relativePath) => fs.readFileSync(path.resolve(relativePath), "utf8");

describe("LearningPath action contract", () => {
	test("does not let frontend own authored progression", () => {
		const dataSource = read("src/model/datasource/LearningPathDataSource.js");
		const viewModel = read("src/ui/viewmodel/LearningPathPageViewModel.js");
		const action = read("src/ui/viewmodel/LearningPath/createLearningPathActionModel.js");
		expect(dataSource).not.toMatch(/round|planKey|sessionPosition/);
		expect(viewModel).toContain("startLearningSessionUseCase.execute({ subjectId: selectedSubject.id, moduleId: actionModel.moduleId, language })");
		expect(viewModel).not.toMatch(/completedRounds|nextRound|round:/);
		expect(action).toContain('nextActivity.kind === "start-authored-session"');
		expect(action).toContain('module.availability.isCurrent && module.availability.isUnlocked');
		expect(action).not.toMatch(/planKey|sessionPosition|completedSessions/);
	});

	test("waits for auth before loading the actionable LearningPath", () => {
		const app = read("src/App.jsx");
		const viewModel = read("src/ui/viewmodel/LearningPathPageViewModel.js");
		expect(app).toContain("AuthenticatedLearningPathPageWrapper");
		expect(app).toContain("authState={{ hasClerkAuth: true, isLoaded, isSignedIn, userId: userId ?? null }}");
		expect(viewModel).toContain("const canLoadLearningPath = isActive && subjectId !== null && isAuthLoaded");
		expect(viewModel).toContain("${subjectId}:${language}:${isAuthLoaded ? authIdentity : \"auth-loading\"}");
	});

	test("renders chapter tests from backend identities", () => {
		const detail = read("src/ui/view/components/LearningPathPage/LearningPathSection.jsx");
		expect(detail).toContain("model.chapterTests.map");
		expect(detail).toContain("LearningPathChapterTestNode");
	});
});

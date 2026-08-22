// test/ui/architecture/learningPathActionContract.test.js
import fs from "node:fs";
import path from "node:path";
import { describe, expect, test } from "@jest/globals";
const read = (relativePath) => fs.readFileSync(path.resolve(relativePath), "utf8");

describe("LearningPath action contract", () => {
	test("sends explicit backend-owned targets without recreating authored progression", () => {
		const dataSource = read("src/model/datasource/LearningPathDataSource.js");
		const viewModel = read("src/ui/viewmodel/LearningPathPageViewModel.js");
		const action = read("src/ui/viewmodel/LearningPath/createLearningPathActionModel.js");
		expect(dataSource).toContain("target: command.target");
		expect(dataSource).toContain("discardActiveSession: command.discardActiveSession");
		expect(dataSource).not.toContain("command.target ??");
		expect(dataSource).not.toContain("command.discardActiveSession ??");
		expect(viewModel).toContain("target: actionModel.target");
		expect(viewModel).not.toContain("target: actionModel.target ??");
		expect(viewModel).toContain("discardActiveSession: false");
		expect(viewModel).not.toMatch(/completedRounds|nextRound|round:/);
		expect(action).toContain('{ kind: "module-replay" }');
		expect(action).not.toMatch(/planKey.*nextActivity|sessionPosition/);
	});

	test("takes session selectability from backend isStartable", () => {
		const mapper = read("src/model/repositories/LearningPath/toLearningPath.js");
		const sessionModel = read("src/ui/viewmodel/LearningPath/createLearningPathSessionModel.js");
		const sectionModel = read("src/ui/viewmodel/LearningPath/createLearningPathSectionModel.js");
		expect(mapper).toContain('typeof session.isStartable === "boolean"');
		expect(sessionModel).toContain("const isSelectable = session.isStartable");
		expect(sectionModel).toContain("section.sessions.some((session) => session.isStartable)");
		expect(sessionModel).not.toMatch(/status\s*!==\s*["']locked["']/);
	});

	test("always resumes the active LearningSession instead of offering a discard choice", () => {
		const viewModel = read("src/ui/viewmodel/LearningPathPageViewModel.js");
		const page = read("src/ui/view/pages/LearningPathPage.jsx");
		const styles = read("src/ui/style/LearningPathPage/index.css");
		expect(viewModel).toContain('LEARNING_SESSION_RESUME_CONFLICT = "learning_session_resume_conflict"');
		expect(viewModel).toContain("if (learningPath.resumableSession !== null)");
		expect(viewModel).toContain("onLearningSessionStarted(learningPath.resumableSession.sessionId)");
		expect(viewModel).toContain("onLearningSessionStarted(activeSessionId)");
		expect(viewModel).not.toContain("discardActiveSession: true");
		expect(viewModel).not.toContain("sessionConflictDialogModel");
		expect(page).not.toContain("LearningPathSessionConflictDialog");
		expect(styles).not.toContain("learning-path-conflict-dialog.css");
		expect(fs.existsSync(path.resolve("src/ui/view/components/LearningPathPage/LearningPathSessionConflictDialog.jsx"))).toBe(false);
	});

	test("waits for auth before loading the actionable LearningPath", () => {
		const app = read("src/App.jsx");
		const viewModel = read("src/ui/viewmodel/LearningPathPageViewModel.js");
		expect(app).toContain("AuthenticatedLearningPathPageWrapper");
		expect(app).toContain("authState={{ hasClerkAuth: true, isLoaded, isSignedIn, userId: userId ?? null }}");
		expect(viewModel).toContain("const canLoadLearningPath = isActive && subjectId !== null && isAuthLoaded");
		expect(viewModel).toContain("${subjectId}:${language}:${isAuthLoaded ? authIdentity : \"auth-loading\"}");
	});

	test("opens chapter tests using backend concrete ids", () => {
		const app = read("src/App.jsx");
		const detail = read("src/ui/view/components/LearningPathPage/LearningPathSection.jsx");
		const node = read("src/ui/view/components/LearningPathPage/LearningPathChapterTestNode.jsx");

		expect(detail).toContain("model.chapterTests.map");
		expect(detail).toContain("key={test.id}");
		expect(node).toContain("onSelected(model.id)");
		expect(node).not.toContain("model.baseId");
		expect(app).toContain("onChapterTestSelected={(chapterTestId) => navigationViewModel.selectExam(chapterTestId, TEST_TYPES.CHAPTER_TEST)}");
	});
});

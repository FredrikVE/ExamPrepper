import fs from "node:fs";
import path from "node:path";
import { describe, expect, test } from "@jest/globals";

const SUBMIT_MODEL_PATH = path.resolve("src/ui/viewmodel/ExamPage/useExamSubmitModel.js");
const EXAM_VIEW_MODEL_PATH = path.resolve("src/ui/viewmodel/ExamPageViewModel.js");

describe("exam error lifecycle", () => {
	test("keeps submit failures as local product-text action state", () => {
		const submitSource = fs.readFileSync(SUBMIT_MODEL_PATH, "utf8");
		expect(submitSource).toContain("setAttemptSaveError(attemptSaveErrorMessage)");
		expect(submitSource).not.toMatch(/error\?\.message|submitError\.message/);
		expect(submitSource).toContain('console.error("[ExamSubmit] Submit failed", submitError)');
	});

	test("leaves page-load errors in the established workspace-state pipeline", () => {
		const viewModelSource = fs.readFileSync(EXAM_VIEW_MODEL_PATH, "utf8");
		expect(viewModelSource).toContain("useExamQuestionLoadModel");
		expect(viewModelSource).toContain("createWorkspaceState");
		expect(viewModelSource).toContain("errorBody: questionsError");
	});
});

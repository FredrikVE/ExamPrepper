//test/ui/architecture/learningSessionAnswerSerialization.test.js
import fs from "node:fs";
import path from "node:path";
import { describe, expect, test } from "@jest/globals";

function read(relativePath) {
	return fs.readFileSync(path.resolve(relativePath), "utf8");
}

describe("LearningSession answer serialization", () => {
	test("serializes answers at the API boundary instead of sending raw choice indices", () => {
		const viewModel = read("src/ui/viewmodel/LearningSessionPageViewModel.js");
		expect(viewModel).toContain('import transformLearningSessionAnswersForApi from "./QuestionSession/transformLearningSessionAnswersForApi.js";');
		expect(viewModel).toContain("transformLearningSessionAnswersForApi(state.questions, state.answersBySessionQuestionId)");
		expect(viewModel).not.toContain("Object.entries(state.answersBySessionQuestionId).map");
	});

	test("shares the complete per-question transformation with exam submission", () => {
		const examTransform = read("src/ui/viewmodel/Utils/transformAnswersForApi.js");
		const sessionTransform = read("src/ui/viewmodel/QuestionSession/transformLearningSessionAnswersForApi.js");
		const answerTransform = read("src/ui/viewmodel/QuestionSession/transformAnswerForApi.js");
		expect(examTransform).toContain('import transformAnswerForApi from "../QuestionSession/transformAnswerForApi.js";');
		expect(sessionTransform).toContain('import transformAnswerForApi from "./transformAnswerForApi.js";');
		expect(answerTransform).toContain("QUESTION_TYPES.DRAG_DROP");
		expect(answerTransform).toContain("QUESTION_TYPES.DRAG_CATEGORIZE");
	});
});

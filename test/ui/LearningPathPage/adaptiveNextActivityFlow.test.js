import fs from "node:fs";
import path from "node:path";
import { describe, expect, test } from "@jest/globals";
import LearningPathRepository from "../../../src/model/repositories/LearningPathRepository.js";
import FakeLearningPathDataSource from "../../fakes/FakeLearningPathDataSource.js";
import createLearningPathActionModel from "../../../src/ui/viewmodel/LearningPath/createLearningPathActionModel.js";

const t = { learningPathResumeLabel: "Resume", learningPathStartLabel: "Start", learningPathStartReviewLabel: "Review", learningPathStartRepairLabel: "Repair", learningPathStartCoverageLabel: "Coverage" };

describe("adaptive next activity frontend flow", () => {
	test("preserves backend adaptive kind without calculating it in frontend", async () => {
		const response = JSON.parse(fs.readFileSync(path.resolve("test/fixtures/learning-path/learning-path-response.json"), "utf8"));
		response.nextActivity = { kind: "start-adaptive-session", moduleId: response.modules[0].id, activityKind: "repair", questionCount: 4 };
		const repository = new LearningPathRepository(new FakeLearningPathDataSource({ learningPathResponse: response, learningSessionResponse: null, submitSessionResponse: null }));
		const pathModel = await repository.getLearningPath({ subjectId: "in2120", language: "no" });
		const action = createLearningPathActionModel({ module: pathModel.modules[0], resumableSession: null, nextActivity: pathModel.nextActivity, startingModuleId: null, t });
		expect(pathModel.nextActivity.activityKind).toBe("repair");
		expect(action).toMatchObject({ intent: "start", activityKind: "repair", label: "Repair" });
	});
});

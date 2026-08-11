// test/ui/LearningPathPage/adaptiveNextActivityFlow.test.js
import fs from "node:fs";
import path from "node:path";
import { describe, expect, test } from "@jest/globals";
import GetLearningPathUseCase from "../../../src/model/domain/GetLearningPathUseCase.js";
import LearningPathRepository from "../../../src/model/repositories/LearningPathRepository.js";
import createContinueLearningModel from "../../../src/ui/viewmodel/LearningPath/createContinueLearningModel.js";
import createLearningPathRoadmapModel from "../../../src/ui/viewmodel/LearningPath/createLearningPathRoadmapModel.js";
import FakeLearningPathDataSource from "../../fakes/FakeLearningPathDataSource.js";

const t = {
	learningPathPartLabel: (position) => `Part ${position}`,
	learningPathMasteryLabel: (percentage) => `${percentage}%`,
	learningPathToggleDetailsLabel: (title) => `Toggle ${title}`,
	learningPathStatusActiveRound: (round) => `Active ${round}`,
	learningPathStatusStrongRound: (round) => `Strong ${round}`,
	learningPathStatusMediumRound: (round) => `Medium ${round}`,
	learningPathStatusWeakRound: (round) => `Weak ${round}`,
	learningPathStatusLocked: "Locked",
	learningPathStatusNotStartedRound: (round) => `Not started ${round}`,
	learningPathDetailHeading: "Progress",
	learningPathNoTopicProgressLabel: "Not started",
	learningPathTopicNotMeasuredLabel: "Not measured",
	learningPathTopicProgressLabel: (percentage) => `${percentage}%`,
	learningPathRetryModuleLabel: "Retry",
	learningPathStartRoundLabel: (round) => `Start ${round}`,
	learningPathContinueRoundLabel: (round) => `Continue ${round}`,
	learningPathExamTitle: "Exam",
	learningPathExamUnlockedLabel: "Unlocked",
	learningPathExamLockedLabel: (rounds) => `Locked ${rounds}`,
	learningPathModulesLabel: "Modules",
	learningPathResumeTitle: "Resume",
	learningPathResumeBody: () => "Resume body",
	learningPathResumeLabel: "Resume",
	learningPathContinueTitle: "Continue",
	learningPathContinueBody: () => "Continue body",
	learningPathAdaptiveTitle: "Adaptive",
	learningPathAdaptiveInitialExposureBody: () => "Initial exposure",
	learningPathAdaptivePracticeBody: () => "Practice",
	learningPathAdaptiveProgressionBody: () => "Progression",
	learningPathAdaptiveRevisitBody: () => "Revisit",
	learningPathAdaptiveRepairBody: (position, title) => `Repair ${position} ${title}`
};

describe("adaptive next activity frontend flow", () => {
	test("preserves the backend repair focus and round through repository and presentation", async () => {
		const response = JSON.parse(fs.readFileSync(path.resolve("test/fixtures/learning-path/learning-path-response.json"), "utf8"));
		response.nextActivity = { kind: "start-round", moduleId: response.modules[0].id, round: 1, focus: "repair" };
		response.modules[0].progress = { ...response.modules[0].progress, completedRounds: 3, nextRound: 3 };
		const dataSource = new FakeLearningPathDataSource({ learningPathResponse: response, learningSessionResponse: null, submitSessionResponse: null });
		const learningPath = await new GetLearningPathUseCase(new LearningPathRepository(dataSource)).execute({ subjectId: "in2120", language: "no" });
		const roadmap = createLearningPathRoadmapModel({ learningPath, expandedModuleId: learningPath.activeModuleId, startingModuleId: null, t });
		const activeEntry = roadmap.entries.find((entry) => entry.kind === "module" && entry.id === learningPath.activeModuleId);
		const continueModel = createContinueLearningModel({ activeEntry, resumableSession: learningPath.resumableSession, nextActivity: learningPath.nextActivity, t });

		expect(learningPath.nextActivity).toEqual({ kind: "start-round", moduleId: response.modules[0].id, round: 1, focus: "repair" });
		expect(activeEntry.actionModel).toMatchObject({ intent: "start", round: 1, label: "Start 1" });
		expect(continueModel).toMatchObject({ title: "Adaptive", description: "Repair 1 Grunnbegreper", actionModel: activeEntry.actionModel });
	});
});

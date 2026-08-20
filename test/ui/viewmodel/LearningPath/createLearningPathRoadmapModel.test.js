// test/ui/viewmodel/LearningPath/createLearningPathRoadmapModel.test.js
import fs from "node:fs";
import path from "node:path";
import { describe, expect, test } from "@jest/globals";
import createLearningPathRoadmapModel from "../../../../src/ui/viewmodel/LearningPath/createLearningPathRoadmapModel.js";

const learningPath = JSON.parse(fs.readFileSync(path.resolve("test/fixtures/learning-path/learning-path-response.json"), "utf8"));
const t = {
	learningPathPartLabel: (position) => `Part ${position}`,
	learningPathProgressStatus: (completed, total) => `${completed}/${total}`,
	learningPathPerformanceTitle: "Result",
	learningPathPerformanceNotAssessedLabel: "Not assessed",
	learningPathProgressHistoryHeading: "Progress and history",
	learningPathSessionScoreLabel: (position, percentage) => `Session ${position}: ${percentage}% result`,
	learningPathSessionNotAssessedScoreLabel: (position) => `Session ${position}: not assessed`,
	learningPathToggleDetailsLabel: (title) => `Toggle ${title}`,
	learningPathStatusActive: "Active",
	learningPathStatusCompleted: "Completed",
	learningPathStatusLocked: "Locked",
	learningPathStatusNotStarted: "Not started",
	learningPathDetailHeading: "Sections",
	learningPathResumeLabel: "Resume",
	learningPathContinueLabel: "Continue",
	learningPathReplayModuleLabel: "Take again",
	learningPathContinueReplayLabel: (completed, total) => `Replay ${completed}/${total}`,
	learningPathPracticeSectionLabel: "Practice section",
	learningPathJumpToSectionLabel: "Jump to section",
	learningPathSessionOpenLabel: (position) => `Start session ${position}`,
	learningPathStartReviewLabel: "Review",
	learningPathStartRepairLabel: "Repair",
	learningPathStartCoverageLabel: "Coverage",
	learningPathSectionLabel: (position) => `Section ${position}`,
	learningPathSectionProgressLabel: (completed, total) => `${completed}/${total}`,
	learningPathSessionLabel: (position) => `Session ${position}`,
	learningPathSessionQuestionCount: (count) => `${count} questions`,
	learningPathSessionCompletedLabel: "Completed",
	learningPathSessionCurrentLabel: "Next",
	learningPathSessionAvailableLabel: "Ready",
	learningPathChapterTestLabel: (position) => `Chapter test ${position}`,
	learningPathChapterTestAvailableLabel: "Ready",
	learningPathExamTitle: "Exam",
	learningPathExamUnlockedLabel: "Unlocked",
	learningPathExamLockedLabel: "Locked",
	learningPathModulesLabel: "Modules"
};

describe("createLearningPathRoadmapModel", () => {
	test("renders backend-owned sections sessions and chapter tests", () => {
		const model = createLearningPathRoadmapModel({ learningPath, expandedModuleId: learningPath.modules[0].id, startingModuleId: null, t });
		const module = model.entries[0];
		expect(module.detailModel.sections[0].sessions).toHaveLength(2);
		expect(module.cardModel).toMatchObject({ statusLabel: "Active", progressSummaryLabel: "1/4" });
		expect(module.cardModel.masteryRingModel).toMatchObject({ percentage: 67.5, displayValue: "68%", compactDisplayValue: "68%", appearance: "progress" });
		expect(module.detailModel).toMatchObject({ heading: "Progress and history", sectionsHeading: "Sections", progressModel: { percentage: 67.5, displayValue: "68%", appearance: "progress" } });
		expect(module.detailModel.sections[0].sessions[0]).toMatchObject({ iconKey: "score", scoreModel: { percentage: 65.38, displayValue: "65%", appearance: "progress" } });
		expect(module.detailModel.sections[0].sessions[1]).toMatchObject({ status: "current", iconKey: "play", label: "Session 2" });
		expect(module.detailModel.sections[0].chapterTests).toHaveLength(2);
		expect(module.actionModel).toMatchObject({ intent: "start", activityKind: "authored" });
	});
	test("preserves multiple IN5431-style ChapterTests in authored order", () => {
		const chapterTests = [1, 2, 3, 4].map((position) => ({
			baseId: `in5431-chapter-1${String.fromCharCode(96 + position)}-test`,
			position,
			status: "available"
		}));
		const in5431Shape = {
			...learningPath,
			modules: learningPath.modules.map((module, moduleIndex) => moduleIndex === 0 ? {
				...module,
				sections: module.sections.map((section, sectionIndex) => sectionIndex === 0 ? { ...section, chapterTests } : section)
			} : module)
		};

		const model = createLearningPathRoadmapModel({ learningPath: in5431Shape, expandedModuleId: in5431Shape.modules[0].id, startingModuleId: null, t });

		expect(model.entries[0].detailModel.sections[0].chapterTests.map((test) => test.baseId)).toEqual(chapterTests.map((test) => test.baseId));
	});

});

// test/ui/viewmodel/LearningPath/createLearningPathRoadmapModel.test.js
import fs from "node:fs";
import path from "node:path";
import { describe, expect, test } from "@jest/globals";
import { LANGUAGES, translations } from "../../../../src/i18n/translations.js";
import createLearningPathRoadmapModel from "../../../../src/ui/viewmodel/LearningPath/createLearningPathRoadmapModel.js";

const learningPath = JSON.parse(fs.readFileSync(path.resolve("test/fixtures/learning-path/learning-path-response.json"), "utf8"));
const t = {
	learningPathPartLabel: (position) => `Part ${position}`,
	learningPathProgressStatus: (completed, total) => `${completed}/${total}`,
	learningPathPerformanceTitle: "Result",
	learningPathPerformanceNotAssessedLabel: "Not assessed",
	learningPathModuleMasteryLabel: (title) => `Mastery of ${title}`,
	learningPathSessionScoreLabel: (position, percentage) => `Session ${position}: ${percentage}% result`,
	learningPathSessionNotAssessedScoreLabel: (position) => `Session ${position}: not assessed`,
	learningPathToggleDetailsLabel: (title) => `Toggle ${title}`,
	learningPathStatusLocked: "Locked",
	learningPathDetailHeading: "Sections",
	learningPathResumeLabel: "Resume",
	learningPathContinueLabel: "Continue",
	learningPathReplayModuleLabel: "Take again",
	learningPathContinueReplayLabel: (completed, total) => `Replay ${completed}/${total}`,
	learningPathPracticeSectionLabel: "Practice section",
	learningPathJumpToSectionLabel: "Jump to section",
	learningPathSessionOpenLabel: (position) => `Start session ${position}`,
	learningPathSessionReplayLabel: "Take session again",
	learningPathSectionLabel: (position) => `Section ${position}`,
	learningPathSectionProgressLabel: (completed, total) => `${completed}/${total}`,
	learningPathChapterTestsHeading: "Chapter tests",
	learningPathSessionLabel: (position) => `Session ${position}`,
	learningPathSessionQuestionCount: (count) => `${count} questions`,
	learningPathSessionCompletedLabel: "Completed",
	learningPathSessionCurrentLabel: "Next",
	learningPathSessionAvailableLabel: "Ready",
	learningPathChapterTestLabel: (position) => `Chapter test ${position}`,
	learningPathChapterTestCompletedLabel: "Completed",
	learningPathChapterTestCurrentLabel: "Next chapter test",
	learningPathChapterTestAvailableLabel: "Ready",
	learningPathChapterTestStartLabel: "Start chapter test",
	learningPathExamTitle: "Exam",
	learningPathExamUnlockedLabel: translations[LANGUAGES.EN].learningPathExamUnlockedLabel,
	learningPathExamLockedLabel: "Locked",
	learningPathModulesLabel: "Modules"
};

describe("createLearningPathRoadmapModel", () => {
	test("renders backend-owned sections sessions and chapter tests", () => {
		const model = createLearningPathRoadmapModel({ learningPath, expandedModuleId: learningPath.modules[0].id, startingActionKey: null, canStartLearningSessions: true, t });
		const module = model.entries[0];
		expect(module.detailModel.sections[0].sessions).toHaveLength(2);
		expect(module.cardModel).toMatchObject({ progressSummaryLabel: "1/4", appearance: "active" });
		expect(module.cardModel.masteryRingModel).toMatchObject({ percentage: 67.5, displayValue: "68%", compactDisplayValue: "68%", appearance: "progress" });
		expect(module.detailModel).toMatchObject({ sectionsHeading: "Sections", progressModel: { label: "Mastery of Grunnbegreper", percentage: 67.5, displayValue: "68%", appearance: "progress" } });
		expect(module.detailModel.sections[0].sessions[0]).toMatchObject({ iconKey: "score", scoreModel: { percentage: 65.38, displayValue: "65%", appearance: "progress" } });
		expect(module.detailModel.sections[0].sessions[1]).toMatchObject({ status: "current", iconKey: "play", label: "Session 2" });
		expect(module.detailModel.sections[0]).toMatchObject({ chapterTestsHeading: "Chapter tests" });
		expect(module.detailModel.sections[0].chapterTests).toHaveLength(2);
		expect(module.detailModel.sections[0].chapterTests[0].scoreModel).toMatchObject({ percentage: 82.5, displayValue: "83%", appearance: "understood" });
		expect(module.detailModel.sections[0].chapterTests[1].scoreModel).toBeNull();
		expect(module.actionModel).toMatchObject({ intent: "start", target: { kind: "module" }, label: "Continue" });
	});
	test("uses backend completion facts for module and section presentation", () => {
		const backendComplete = {
			...learningPath,
			modules: learningPath.modules.map((module, moduleIndex) => moduleIndex === 0 ? {
				...module,
				availability: { ...module.availability, isCurrent: false },
				progress: { ...module.progress, isComplete: true, completionPercent: 25, completedSessions: 1, totalSessions: 4 },
				sections: module.sections.map((section, sectionIndex) => sectionIndex === 0 ? {
					...section,
					progress: { ...section.progress, isComplete: true, completedSessions: 1, totalSessions: 2 }
				} : section)
			} : module)
		};

		const model = createLearningPathRoadmapModel({ learningPath: backendComplete, expandedModuleId: backendComplete.modules[0].id, startingActionKey: null, canStartLearningSessions: true, t });

		expect(model.entries[0]).toMatchObject({ appearance: "completed", cardModel: { appearance: "completed" } });
		expect(model.entries[0].detailModel.sections[0].actionModel).toMatchObject({ label: "Practice section" });
	});

	test("preserves multiple IN5431-style ChapterTests in authored order", () => {
		const chapterTests = [1, 2, 3, 4].map((position) => ({
			id: `in5431-chapter-1${String.fromCharCode(96 + position)}-test-no`,
			position,
			isStartable: true,
			status: "available",
			performancePercent: null,
			performanceBand: "not-assessed"
		}));
		const in5431Shape = {
			...learningPath,
			modules: learningPath.modules.map((module, moduleIndex) => moduleIndex === 0 ? {
				...module,
				sections: module.sections.map((section, sectionIndex) => sectionIndex === 0 ? { ...section, chapterTests } : section)
			} : module)
		};

		const model = createLearningPathRoadmapModel({ learningPath: in5431Shape, expandedModuleId: in5431Shape.modules[0].id, startingActionKey: null, canStartLearningSessions: true, t });

		expect(model.entries[0].detailModel.sections[0].chapterTests.map((test) => test.id)).toEqual(chapterTests.map((test) => test.id));
	});

	test("fails fast for an unknown chapter test status", () => {
		const invalidPath = structuredClone(learningPath);
		invalidPath.modules[0].sections[0].chapterTests[0].status = "unknown";

		expect(() => createLearningPathRoadmapModel({ learningPath: invalidPath, expandedModuleId: invalidPath.modules[0].id, startingActionKey: null, canStartLearningSessions: true, t })).toThrow("Unknown LearningPath chapter test status 'unknown'");
	});

	test("presents the unlocked exam gate as informational status", () => {
		const unlockedPath = {
			...learningPath,
			examGate: {
				isUnlocked: true
			}
		};

		const model = createLearningPathRoadmapModel({ learningPath: unlockedPath, expandedModuleId: null, startingActionKey: null, canStartLearningSessions: true, t });
		const examGate = model.entries[model.entries.length - 1];

		expect(examGate).toMatchObject({
			kind: "examGate",
			appearance: "active",
			nodeModel: {
				iconKey: "check"
			},
			cardModel: {
				statusLabel: "Exam is available",
				isDisabled: false
			}
		});
	});

});

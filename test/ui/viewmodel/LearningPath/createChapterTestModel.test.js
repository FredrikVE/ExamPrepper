// test/ui/viewmodel/LearningPath/createChapterTestModel.test.js
import { describe, expect, test } from "@jest/globals";
import createLearningPathSectionModel from "../../../../src/ui/viewmodel/LearningPath/createLearningPathSectionModel.js";

const t = {
	learningPathSectionLabel: (position) => `Section ${position}`,
	learningPathSectionProgressLabel: (completed, total) => `${completed}/${total}`,
	learningPathChapterTestsHeading: "Chapter tests",
	learningPathPracticeSectionLabel: "Practice section",
	learningPathJumpToSectionLabel: "Jump to section",
	learningPathChapterTestLabel: (position) => `Chapter test ${position}`,
	learningPathChapterTestCompletedLabel: "Completed",
	learningPathChapterTestCurrentLabel: "Next chapter test",
	learningPathChapterTestAvailableLabel: "Ready",
	learningPathStatusLocked: "Locked",
	learningPathPerformanceTitle: "Result",
	learningPathPerformanceNotAssessedLabel: "Not assessed"
};

function createSection(status, performancePercent = null, performanceBand = "not-assessed", isStartable = status !== "locked") {
	return {
		id: "section-1",
		sectionKey: "chapter-1",
		position: 1,
		label: "Concepts",
		progress: {
			completedSessions: 0,
			totalSessions: 0,
			completionPercent: 100,
			isComplete: false
		},
		sessions: [],
		chapterTests: [{
			id: "chapter-1-test-no",
			position: 1,
			isStartable,
			status,
			performancePercent,
			performanceBand
		}]
	};
}

function createModel(status, performancePercent = null, performanceBand = "not-assessed", isStartable = status !== "locked") {
	return createLearningPathSectionModel({
		section: createSection(status, performancePercent, performanceBand, isStartable),
		moduleId: "module-1",
		startingActionKey: null,
		canStartLearningSessions: true,
		t
	}).chapterTests[0];
}

describe("LearningPath ChapterTest presentation", () => {
	test("provides the localized ChapterTest group heading", () => {
		const model = createLearningPathSectionModel({
			section: createSection("available"),
			moduleId: "module-1",
			startingActionKey: null,
			canStartLearningSessions: true,
			t
		});

		expect(model.chapterTestsHeading).toBe("Chapter tests");
	});

	test.each([
		["completed", "Completed", false],
		["current", "Next chapter test", false],
		["available", "Ready", false],
		["locked", "Locked", true]
	])("presents %s status", (status, statusLabel, isDisabled) => {
		expect(createModel(status)).toMatchObject({ status, statusLabel, isDisabled });
	});

	test("supports completed ChapterTest without localized score", () => {
		expect(createModel("completed")).toMatchObject({ status: "completed", scoreModel: null });
	});

	test("disables a completed ChapterTest when backend marks the placement not startable", () => {
		expect(createModel("completed", null, "not-assessed", false)).toMatchObject({ status: "completed", isDisabled: true });
	});

	test("keeps localized score presentation when available", () => {
		expect(createModel("completed", 82.5, "understood").scoreModel).toMatchObject({ percentage: 82.5, displayValue: "83%", appearance: "understood" });
	});

	test("fails fast for unknown status", () => {
		expect(() => createModel("unknown")).toThrow("Unknown LearningPath chapter test status 'unknown'");
	});
});

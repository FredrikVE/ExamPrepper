//test/ui/viewmodel/LearningPath/createLearningPathRoadmapModel.test.js
import { describe, expect, test } from "@jest/globals";
import createLearningPathRoadmapModel from "../../../../src/ui/viewmodel/LearningPath/createLearningPathRoadmapModel.js";

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
	learningPathTopicProgressLabel: (percentage) => `${percentage}%`,
	learningPathRetryModuleLabel: "Retry",
	learningPathStartRoundLabel: (round) => `Start ${round}`,
	learningPathExamTitle: "Exam",
	learningPathExamUnlockedLabel: "Unlocked",
	learningPathExamLockedLabel: (rounds) => `Locked ${rounds}`,
	learningPathModulesLabel: "Modules"
};

const learningPath = {
	subjectId: "in2120",
	activeModuleId: "module-1",
	resumableSession: null,
	modules: [{ id: "module-1", moduleKey: "concepts", position: 1, title: "Concepts", description: "Description", availability: { isUnlocked: true, isCurrent: true, lockReason: null }, topics: [{ key: "topic", label: "Topic", masteryPercent: 55 }], progress: { masteryPercent: 55, completedRounds: 1, nextRound: 2, lastSessionAt: null } }],
	examGate: { isUnlocked: false, requiredCompletedRounds: 3 }
};

describe("createLearningPathRoadmapModel", () => {
	test("builds presentation-only module and exam entries", () => {
		const model = createLearningPathRoadmapModel({ learningPath, expandedModuleId: "module-1", startingModuleId: null, t });
		expect(model.entries).toHaveLength(2);
		expect(model.entries[0]).toMatchObject({ kind: "module", appearance: "active", nodeModel: { iconKey: "play" }, cardModel: { statusLabel: "Active 2", isExpanded: true }, detailModel: { heading: "Progress" } });
		expect(model.entries[0].detailModel.topics[0]).toMatchObject({ percentage: 55, appearance: "medium" });
		expect(model.entries[1]).toMatchObject({ kind: "examGate", appearance: "locked" });
	});
});

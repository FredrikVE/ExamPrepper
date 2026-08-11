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
	learningPathTopicNotMeasuredLabel: "Not measured",
	learningPathTopicProgressLabel: (percentage) => `${percentage}%`,
	learningPathRetryModuleLabel: "Retry",
	learningPathStartRoundLabel: (round) => `Start ${round}`,
	learningPathContinueRoundLabel: (round) => `Continue ${round}`,
	learningPathExamTitle: "Exam",
	learningPathExamUnlockedLabel: "Unlocked",
	learningPathExamLockedLabel: (rounds) => `Locked ${rounds}`,
	learningPathModulesLabel: "Modules"
};

const learningPath = {
	subjectId: "in2120",
	activeModuleId: "module-1",
	resumableSession: null,
	nextActivity: null,
	modules: [{ id: "module-1", moduleKey: "concepts", position: 1, title: "Concepts", description: "Description", availability: { isUnlocked: true, isCurrent: true, lockReason: null }, topics: [{ key: "topic", label: "Topic", masteryPercent: 55 }], progress: { masteryPercent: 55, completedRounds: 1, nextRound: 2, lastSessionAt: null } }],
	examGate: { isUnlocked: false, requiredCompletedRounds: 3 }
};

describe("createLearningPathRoadmapModel", () => {
	test("builds presentation-only module and exam entries", () => {
		const model = createLearningPathRoadmapModel({ learningPath, expandedModuleId: "module-1", startingModuleId: null, t });
		expect(model.entries).toHaveLength(2);
		expect(model.entries[0]).toMatchObject({ kind: "module", position: 1, title: "Concepts", appearance: "active", nodeModel: { iconKey: "play" }, cardModel: { statusLabel: "Active 2", isExpanded: true }, detailModel: { heading: "Progress" } });
		expect(model.entries[0].detailModel.topics[0]).toMatchObject({ percentage: 55, appearance: "medium" });
		expect(model.entries[1]).toMatchObject({ kind: "examGate", appearance: "locked" });
	});
	test("does not call a previously attempted topic not started when topic scoring is unavailable", () => {
		const startedPath = {
			...learningPath,
			modules: [{
				...learningPath.modules[0],
				topics: [{ key: "topic", label: "Topic", masteryPercent: null }]
			}]
		};

		const model = createLearningPathRoadmapModel({ learningPath: startedPath, expandedModuleId: "module-1", startingModuleId: null, t });

		expect(model.entries[0].detailModel.topics[0]).toMatchObject({ percentage: null, percentageLabel: "Not measured" });
	});

	test("keeps not started for a topic before the module has any activity", () => {
		const untouchedPath = {
			...learningPath,
			modules: [{
				...learningPath.modules[0],
				topics: [{ key: "topic", label: "Topic", masteryPercent: null }],
				progress: { masteryPercent: 0, completedRounds: 0, nextRound: 1, lastSessionAt: null }
			}]
		};

		const model = createLearningPathRoadmapModel({ learningPath: untouchedPath, expandedModuleId: "module-1", startingModuleId: null, t });

		expect(model.entries[0].detailModel.topics[0]).toMatchObject({ percentage: null, percentageLabel: "Not started" });
	});

	test("binds the active module action to the backend next activity", () => {
		const adaptivePath = {
			...learningPath,
			nextActivity: { kind: "start-round", moduleId: "module-1", round: 1, focus: "practice" },
			modules: [{ ...learningPath.modules[0], progress: { masteryPercent: 55, completedRounds: 3, nextRound: 3, lastSessionAt: null } }]
		};

		const model = createLearningPathRoadmapModel({ learningPath: adaptivePath, expandedModuleId: "module-1", startingModuleId: null, t });

		expect(model.entries[0].actionModel).toMatchObject({ intent: "start", round: 1, label: "Start 1" });
		expect(model.entries[0].detailModel.actionModel).toBe(model.entries[0].actionModel);
	});

});

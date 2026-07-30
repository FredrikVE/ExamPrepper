//src/ui/viewmodel/LearningPath/createLearningPathRoadmapModel.js
import createLearningPathModuleModel from "./createLearningPathModuleModel.js";

export default function createLearningPathRoadmapModel({ learningPath, expandedModuleId, startingModuleId, t }) {
	const entries = learningPath.modules.map((module) => createLearningPathModuleModel({ module, expandedModuleId, startingModuleId, t }));
	entries.push({
		kind: "examGate",
		id: "learning-path-exam-gate",
		appearance: learningPath.examGate.isUnlocked ? "active" : "locked",
		nodeModel: { appearance: learningPath.examGate.isUnlocked ? "active" : "locked", iconKey: learningPath.examGate.isUnlocked ? "play" : "lock", label: t.learningPathExamTitle, value: learningPath.modules.length + 1, isCurrentStep: false },
		cardModel: { eyebrow: t.learningPathPartLabel(learningPath.modules.length + 1), title: t.learningPathExamTitle, statusLabel: learningPath.examGate.isUnlocked ? t.learningPathExamUnlockedLabel : t.learningPathExamLockedLabel(learningPath.examGate.requiredCompletedRounds), isDisabled: !learningPath.examGate.isUnlocked }
	});

	return { accessibleLabel: t.learningPathModulesLabel, entries };
}

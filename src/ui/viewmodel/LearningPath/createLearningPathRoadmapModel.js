//src/ui/viewmodel/LearningPath/createLearningPathRoadmapModel.js
import createLearningPathModuleModel from "./createLearningPathModuleModel.js";

export default function createLearningPathRoadmapModel({ learningPath, expandedModuleId, startingActionKey, canStartLearningSessions, t }) {
	const entries = learningPath.modules.map((module) => createLearningPathModuleModel({ module, resumableSession: learningPath.resumableSession, nextActivity: learningPath.nextActivity, expandedModuleId, startingActionKey, canStartLearningSessions, t }));
	entries.push({
		kind: "examGate",
		id: "learning-path-exam-gate",
		appearance: learningPath.examGate.isUnlocked ? "active" : "locked",
		nodeModel: { appearance: learningPath.examGate.isUnlocked ? "active" : "locked", iconKey: learningPath.examGate.isUnlocked ? "play" : "lock", label: t.learningPathExamTitle, value: learningPath.modules.length + 1, isCurrentStep: false },
		cardModel: { eyebrow: t.learningPathPartLabel(learningPath.modules.length + 1), title: t.learningPathExamTitle, statusLabel: learningPath.examGate.isUnlocked ? t.learningPathExamUnlockedLabel : t.learningPathExamLockedLabel, isDisabled: !learningPath.examGate.isUnlocked }
	});
	return { accessibleLabel: t.learningPathModulesLabel, entries };
}

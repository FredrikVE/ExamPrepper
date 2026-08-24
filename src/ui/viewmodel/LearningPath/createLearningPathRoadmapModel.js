// src/ui/viewmodel/LearningPath/createLearningPathRoadmapModel.js
import createLearningPathModuleModel from "./createLearningPathModuleModel.js";

export default function createLearningPathRoadmapModel({ learningPath, expandedModuleId, startingActionKey, canStartLearningSessions, t }) {
	const entries = learningPath.modules.map((module) => {
		return createLearningPathModuleModel({
			module,
			resumableSession: learningPath.resumableSession,
			nextActivity: learningPath.nextActivity,
			expandedModuleId,
			startingActionKey,
			canStartLearningSessions,
			t
		});
	});

	let examGateAppearance;
	let examGateIconKey;
	let examGateStatusLabel;

	if (learningPath.examGate.isUnlocked) {
		examGateAppearance = "active";
		examGateIconKey = "check";
		examGateStatusLabel = t.learningPathExamUnlockedLabel;
	}

	else {
		examGateAppearance = "locked";
		examGateIconKey = "lock";
		examGateStatusLabel = t.learningPathExamLockedLabel;
	}

	const examGatePosition = learningPath.modules.length + 1;

	entries.push({
		kind: "examGate",
		id: "learning-path-exam-gate",
		appearance: examGateAppearance,

		nodeModel: {
			appearance: examGateAppearance,
			iconKey: examGateIconKey,
			label: t.learningPathExamTitle,
			value: examGatePosition,
			isCurrentStep: false
		},

		cardModel: {
			eyebrow: t.learningPathPartLabel(examGatePosition),
			title: t.learningPathExamTitle,
			statusLabel: examGateStatusLabel,
			isDisabled: !learningPath.examGate.isUnlocked
		}
	});

	return {
		accessibleLabel: t.learningPathModulesLabel,
		entries
	};
}
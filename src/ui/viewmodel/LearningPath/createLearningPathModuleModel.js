// src/ui/viewmodel/LearningPath/createLearningPathModuleModel.js
import createLearningPathActionModel from "./createLearningPathActionModel.js";
import createLearningPathModuleNodeModel from "./createLearningPathModuleNodeModel.js";
import createLearningPathProgressModel from "./createLearningPathProgressModel.js";
import createLearningPathSectionModel from "./createLearningPathSectionModel.js";
import createModuleStatus from "./createModuleStatus.js";

export default function createLearningPathModuleModel({ module, resumableSession, nextActivity, expandedModuleId, startingModuleId, t }) {
	const status = createModuleStatus({ isComplete: module.progress.isComplete, completedSessions: module.progress.completedSessions, isCurrent: module.availability.isCurrent, isUnlocked: module.availability.isUnlocked });
	const isExpanded = expandedModuleId === module.id && module.availability.isUnlocked;
	const actionModel = createLearningPathActionModel({ module, resumableSession, nextActivity, startingModuleId, t });
	const progressModel = createLearningPathProgressModel({ performancePercent: module.progress.performancePercent, performanceBand: module.progress.performanceBand, t });

	return {
		kind: "module",
		id: module.id,
		position: module.position,
		title: module.title,
		appearance: status.appearance,
		nodeModel: createLearningPathModuleNodeModel({ module, status, t }),
		cardModel: {
			id: module.id,
			eyebrow: t.learningPathPartLabel(module.position),
			title: module.title,
			statusLabel: createStatusLabel(status.statusKey, module.progress, t),
			progressSummaryLabel: t.learningPathProgressStatus(module.progress.completedSessions, module.progress.totalSessions),
			appearance: status.appearance,
			isCurrentStep: module.availability.isCurrent,
			isExpanded,
			isDisabled: !module.availability.isUnlocked,
			masteryRingModel: progressModel,
			chevronLabel: t.learningPathToggleDetailsLabel(module.title)
		},
		detailModel: isExpanded ? {
			headingId: `learning-path-module-detail-${module.id}`,
			heading: t.learningPathProgressHistoryHeading,
			progressModel,
			sectionsHeading: t.learningPathDetailHeading,
			description: module.description,
			sections: module.sections.map((section) => createLearningPathSectionModel({ section, moduleId: module.id, startingModuleId, t })),
			actionModel
		} : null,
		actionModel
	};
}

function createStatusLabel(statusKey, progress, t) {
	if (statusKey === "active") return t.learningPathStatusActive;
	if (statusKey === "completed") return t.learningPathStatusCompleted;
	if (statusKey === "progress") return t.learningPathProgressStatus(progress.completedSessions, progress.totalSessions);
	if (statusKey === "locked") return t.learningPathStatusLocked;
	return t.learningPathStatusNotStarted;
}

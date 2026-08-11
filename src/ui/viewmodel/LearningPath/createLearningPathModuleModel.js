//src/ui/viewmodel/LearningPath/createLearningPathModuleModel.js
import createLearningPathActionModel from "./createLearningPathActionModel.js";
import createMasteryAppearance from "./createMasteryAppearance.js";
import createModuleStatus from "./createModuleStatus.js";

export default function createLearningPathModuleModel({ module, resumableSession, nextActivity, expandedModuleId, startingModuleId, t }) {
	const status = createModuleStatus({ completedRounds: module.progress.completedRounds, isCurrent: module.availability.isCurrent, isUnlocked: module.availability.isUnlocked });
	const isExpanded = expandedModuleId === module.id && module.availability.isUnlocked;
	const hasModuleActivity = module.progress.completedRounds > 0 || module.progress.lastSessionAt !== null || resumableSession?.moduleId === module.id;
	const actionModel = createLearningPathActionModel({ module, resumableSession, nextActivity, startingModuleId, t });
	const activeRound = resolveActiveRound(module.id, resumableSession, nextActivity);

	return {
		kind: "module",
		id: module.id,
		position: module.position,
		title: module.title,
		appearance: status.appearance,
		nodeModel: {
			appearance: status.appearance,
			iconKey: status.iconKey,
			label: t.learningPathPartLabel(module.position),
			value: module.position,
			isCurrentStep: module.availability.isCurrent
		},
		cardModel: {
			id: module.id,
			eyebrow: t.learningPathPartLabel(module.position),
			title: module.title,
			statusLabel: createStatusLabel({ statusKey: status.statusKey, round: activeRound, t }),
			appearance: status.appearance,
			isCurrentStep: module.availability.isCurrent,
			isExpanded,
			isDisabled: !module.availability.isUnlocked,
			masteryRingModel: {
				percentage: module.progress.masteryPercent,
				appearance: module.availability.isCurrent ? "active" : createMasteryAppearance(module.progress.masteryPercent),
				accessibleLabel: t.learningPathMasteryLabel(module.progress.masteryPercent)
			},
			chevronLabel: t.learningPathToggleDetailsLabel(module.title)
		},
		detailModel: isExpanded ? {
			headingId: `learning-path-module-detail-${module.id}`,
			heading: t.learningPathDetailHeading,
			description: module.description,
			topics: module.topics.map((topic) => ({
				key: topic.key,
				label: topic.label,
				percentage: topic.masteryPercent,
				percentageLabel: createTopicProgressLabel({ masteryPercent: topic.masteryPercent, hasModuleActivity, t }),
				appearance: createMasteryAppearance(topic.masteryPercent ?? 0)
			})),
			actionModel
		} : null,
		actionModel
	};
}

function createTopicProgressLabel({ masteryPercent, hasModuleActivity, t }) {
	if (masteryPercent !== null) return t.learningPathTopicProgressLabel(masteryPercent);
	return hasModuleActivity ? t.learningPathTopicNotMeasuredLabel : t.learningPathNoTopicProgressLabel;
}

function resolveActiveRound(moduleId, resumableSession, nextActivity) {
	if (resumableSession !== null && resumableSession.moduleId === moduleId) return resumableSession.round;
	if (nextActivity !== null && nextActivity.kind === "start-round" && nextActivity.moduleId === moduleId) return nextActivity.round;
	return null;
}

function createStatusLabel({ statusKey, round, t }) {
	if (statusKey === "active") return round === null ? t.learningPathStatusActive : t.learningPathStatusActiveRound(round);
	if (statusKey === "completed") return t.learningPathStatusCompleted;
	if (statusKey === "progress") return t.learningPathStatusProgress;
	if (statusKey === "locked") return t.learningPathStatusLocked;
	return t.learningPathStatusNotStarted;
}
